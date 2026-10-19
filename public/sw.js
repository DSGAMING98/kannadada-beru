const CACHE_NAME = "kannadada-beru-public-v5";
const APP_SHELL = ["/", "/explore", "/language", "/dictionary", "/play", "/compare", "/about", "/offline", "/icon-192.png", "/brand/kannadada-beru-logo.webp", "/maplibre-gl-worker.mjs", "/data/karnataka-districts-2011.geojson", "/data/alar/manifest.json"];
const PRIVATE_PATH_PREFIXES = ["/api/", "/admin", "/moderation", "/auth", "/contribute"];
const PUBLIC_DATA_PATHS = ["/maplibre-gl-worker.mjs", "/data/karnataka-districts-2011.geojson"];

function isPublicNavigation(pathname) {
  if (PRIVATE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false;
  return pathname === "/" || ["/explore", "/language", "/dictionary", "/play", "/compare", "/about", "/offline"].includes(pathname)
    || /^\/(districts|regions)\/[^/]+$/.test(pathname);
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    if (!isPublicNavigation(url.pathname)) return;
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match("/offline")),
    );
    return;
  }

  if (!PRIVATE_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix)) && (PUBLIC_DATA_PATHS.includes(url.pathname) || url.pathname.startsWith("/data/alar/") || ["style", "script", "image", "font", "worker"].includes(request.destination))) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        return response;
      })),
    );
  }
});
