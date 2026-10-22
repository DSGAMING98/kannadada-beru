[CmdletBinding()]
param(
  [string]$ResearchRoot = (Join-Path $PSScriptRoot '..\.research-data\kannada-audio')
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$userAgent = 'KannadadaBeruResearch/1.0 (https://github.com/DSGAMING98/kannadada-beru)'
$commonsApi = 'https://commons.wikimedia.org/w/api.php'
$commonsCategory = 'Files uploaded by spell4wiki in kn'
$wikimediaRoot = Join-Path $ResearchRoot 'wikimedia-commons'
$openSlrRoot = Join-Path $ResearchRoot 'openslr-79'

$requestedFiles = @(
  @{ slug = 'akka'; word = 'ಅಕ್ಕ'; title = 'File:Kn-ಅಕ್ಕ.ogg' },
  @{ slug = 'kannada'; word = 'ಕನ್ನಡ'; title = 'File:Kn-ಕನ್ನಡ.ogg' },
  @{ slug = 'gaali'; word = 'ಗಾಳಿ'; title = 'File:Kn-ಗಾಳಿ.ogg' },
  @{ slug = 'taayi'; word = 'ತಾಯಿ'; title = 'File:Kn-ತಾಯಿ.ogg' },
  @{ slug = 'tande'; word = 'ತಂದೆ'; title = 'File:Kn-ತಂದೆ.ogg' },
  @{ slug = 'neeru'; word = 'ನೀರು'; title = 'File:Kn-ನೀರು.ogg' },
  @{ slug = 'pustaka'; word = 'ಪುಸ್ತಕ'; title = 'File:Kn-ಪುಸ್ತಕ.ogg' },
  @{ slug = 'preeti'; word = 'ಪ್ರೀತಿ'; title = 'File:Kn-ಪ್ರೀತಿ.ogg' },
  @{ slug = 'magu'; word = 'ಮಗು'; title = 'File:Kn-ಮಗು.ogg' },
  @{ slug = 'male'; word = 'ಮಳೆ'; title = 'File:Kn-ಮಳೆ.ogg' },
  @{ slug = 'shaale'; word = 'ಶಾಲೆ'; title = 'File:Kn-ಶಾಲೆ.ogg' },
  @{ slug = 'haalu'; word = 'ಹಾಲು'; title = 'File:Kn-ಹಾಲು.ogg' }
)

function Invoke-WithRetry {
  param([scriptblock]$Operation, [string]$Label)
  $delays = @(0, 2, 5, 10, 20)
  foreach ($delay in $delays) {
    if ($delay -gt 0) { Start-Sleep -Seconds $delay }
    try { return & $Operation } catch {
      if ($delay -eq $delays[-1]) { throw }
      Write-Warning "$Label failed; retrying after backoff. $($_.Exception.Message)"
    }
  }
}

function Save-ResumableFile {
  param([string]$Url, [string]$Destination)
  $partial = "$Destination.partial"
  & curl.exe --location --fail --silent --show-error --user-agent $userAgent --retry 5 --retry-all-errors --retry-delay 5 --continue-at - --output $partial $Url
  if ($LASTEXITCODE -ne 0) { throw "Download failed: $Url" }
  Move-Item -LiteralPath $partial -Destination $Destination -Force
}

function Test-OggFile {
  param([string]$Path)
  $stream = [IO.File]::OpenRead($Path)
  try {
    $signature = New-Object byte[] 4
    if ($stream.Read($signature, 0, 4) -ne 4) { return $false }
    return [Text.Encoding]::ASCII.GetString($signature) -eq 'OggS'
  } finally { $stream.Dispose() }
}

New-Item -ItemType Directory -Force -Path $wikimediaRoot, $openSlrRoot | Out-Null
$drive = Get-PSDrive -Name ([IO.Path]::GetPathRoot((Resolve-Path $ResearchRoot).Path).TrimEnd(':','\'))
Write-Host ("Research root: {0}`nFree disk: {1:N2} GB" -f (Resolve-Path $ResearchRoot).Path, ($drive.Free / 1GB))

$query = @{
  action = 'query'
  format = 'json'
  formatversion = '2'
  prop = 'imageinfo|categories'
  titles = (($requestedFiles | ForEach-Object title) -join '|')
  iiprop = 'url|size|mime|sha1|timestamp|user|extmetadata'
  cllimit = 'max'
}
$queryString = ($query.GetEnumerator() | ForEach-Object {
  [uri]::EscapeDataString($_.Key) + '=' + [uri]::EscapeDataString([string]$_.Value)
}) -join '&'
$commonsResponse = Invoke-WithRetry -Label 'Wikimedia metadata request' -Operation {
  Invoke-RestMethod -Uri "$commonsApi`?$queryString" -Headers @{ 'User-Agent' = $userAgent }
}

$pagesByTitle = @{}
foreach ($page in $commonsResponse.query.pages) { $pagesByTitle[$page.title] = $page }
$manifestItems = @()

foreach ($requested in $requestedFiles) {
  $page = $pagesByTitle[$requested.title]
  if (-not $page -or $page.PSObject.Properties.Name -contains 'missing') { throw "Wikimedia file not found: $($requested.title)" }
  $info = $page.imageinfo[0]
  $categories = @($page.categories | ForEach-Object { $_.title -replace '^Category:', '' })
  $license = $info.extmetadata.LicenseShortName.value
  $description = $info.extmetadata.ImageDescription.value -replace '<[^>]+>', ''
  $artist = $info.extmetadata.Artist.value -replace '<[^>]+>', ''
  if ($license -ne 'CC0') { throw "Unexpected licence for $($requested.title): $license" }
  if ($categories -notcontains $commonsCategory) { throw "File is not in the expected Kannada Spell4Wiki category: $($requested.title)" }
  if ($description -notmatch 'Kannada Language') { throw "Kannada language is not explicit in the description: $($requested.title)" }

  $sourceAudioUrl = ([string]$info.url).Split('?')[0]
  $destination = Join-Path $wikimediaRoot "$($requested.slug).ogg"
  if (-not (Test-Path -LiteralPath $destination)) {
    Save-ResumableFile -Url $sourceAudioUrl -Destination $destination
    Start-Sleep -Milliseconds 900
  }
  $localSha1 = (Get-FileHash -LiteralPath $destination -Algorithm SHA1).Hash.ToLowerInvariant()
  if ($localSha1 -ne $info.sha1.ToLowerInvariant()) { throw "SHA-1 mismatch: $destination" }
  if ((Get-Item -LiteralPath $destination).Length -ne [int64]$info.size) { throw "Size mismatch: $destination" }
  if (-not (Test-OggFile -Path $destination)) { throw "Invalid Ogg signature: $destination" }

  $fileName = $requested.title -replace '^File:', ''
  $manifestItems += [ordered]@{
    slug = $requested.slug
    kannada_word = $requested.word
    local_file = $destination
    source_file_page = 'https://commons.wikimedia.org/wiki/File:' + [uri]::EscapeDataString($fileName).Replace('%20', '_')
    source_audio_url = $sourceAudioUrl
    source_dataset = 'Wikimedia Commons / Spell4Wiki'
    source_category = $commonsCategory
    spoken_language = 'Kannada'
    speaker = $artist
    uploaded_by = $info.user
    source_recording_date = $info.timestamp
    licence = $license
    sha1 = $localSha1
    bytes = [int64]$info.size
    mime = $info.mime
    description = $description
    speaker_region = $null
    recording_location = $null
    regional_provenance = 'not documented'
    verification_status = 'source metadata and file integrity checked; listening review required'
  }
}

$openSlrFiles = @(
  @{ name = 'line_index_female.tsv'; url = 'https://openslr.trmal.net/resources/79/line_index_female.tsv' },
  @{ name = 'line_index_male.tsv'; url = 'https://openslr.trmal.net/resources/79/line_index_male.tsv' }
)
$openSlrItems = @()
foreach ($item in $openSlrFiles) {
  $destination = Join-Path $openSlrRoot $item.name
  if (-not (Test-Path -LiteralPath $destination)) { Save-ResumableFile -Url $item.url -Destination $destination }
  $lineCount = (Get-Content -LiteralPath $destination).Count
  $openSlrItems += [ordered]@{
    file = $destination
    source_url = $item.url
    sha256 = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
    bytes = (Get-Item -LiteralPath $destination).Length
    transcript_rows = $lineCount
    licence = 'CC BY-SA 4.0'
    regional_labels = $false
  }
}

$manifest = [ordered]@{
  schema_version = 1
  generated_at = (Get-Date).ToUniversalTime().ToString('o')
  research_root = (Resolve-Path $ResearchRoot).Path
  free_disk_bytes_after = $drive.Free
  wikimedia = [ordered]@{
    api = $commonsApi
    item_count = $manifestItems.Count
    items = $manifestItems
  }
  openslr_79 = [ordered]@{
    page = 'https://www.openslr.org/79/'
    archives_downloaded = $false
    note = 'Only transcript indexes were downloaded. They contain sentence recordings without verified regional labels.'
    files = $openSlrItems
  }
}
$manifestPath = Join-Path $ResearchRoot 'source-manifest.json'
$manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $manifestPath -Encoding utf8
Write-Host "Verified $($manifestItems.Count) CC0 Kannada word recordings."
Write-Host "Downloaded $($openSlrItems.Count) OpenSLR transcript indexes; no audio archives downloaded."
Write-Host "Manifest: $manifestPath"
