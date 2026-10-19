import { z } from "zod";

const bilingualTextSchema = z.object({ kn: z.string().min(1), en: z.string().min(1) });
const districtHighlightSchema = z.object({
  name: bilingualTextSchema,
  description: bilingualTextSchema,
});

export const districtLearningSchema = z.object({
  history: bilingualTextSchema,
  character: bilingualTextSchema,
  highlights: z.array(districtHighlightSchema).min(3),
});

export type DistrictLearning = z.infer<typeof districtLearningSchema>;

export const districtLearningProfiles = {
  bagalkote: {
    history: { kn: "ಮಲಪ್ರಭಾ ಕಣಿವೆಯ ಈ ನೆಲವು ಪ್ರಾಗೈತಿಹಾಸಿಕ ವಾಸಸ್ಥಳಗಳಿಂದ ಬಾದಾಮಿ ಚಾಲುಕ್ಯರ ರಾಜಧಾನಿಯವರೆಗಿನ ದೀರ್ಘ ಇತಿಹಾಸವನ್ನು ಹೊತ್ತಿದೆ. ಇಂದಿನ ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ 1997ರಲ್ಲಿ ಪ್ರತ್ಯೇಕ ಜಿಲ್ಲೆಯಾಯಿತು.", en: "This Malaprabha valley landscape carries a long history, from prehistoric settlements to the capital of the Badami Chalukyas. The present Bagalkote district became a separate district in 1997." },
    character: { kn: "ಕೆಂಪು ಮರಳುಗಲ್ಲು, ಚಾಲುಕ್ಯ ಶಿಲ್ಪಕಲೆ, ನದಿಸಂಗಮಗಳು ಮತ್ತು ಉತ್ತರ ಕರ್ನಾಟಕದ ಆಹಾರ-ಜನಪದ ಪರಂಪರೆ ಇಲ್ಲಿ ಒಂದಾಗುತ್ತವೆ.", en: "Red sandstone, Chalukyan architecture, river confluences, and North Karnataka food and folk traditions meet here." },
    highlights: [
      { name: { kn: "ಬಾದಾಮಿ", en: "Badami" }, description: { kn: "ಗುಹಾಲಯಗಳು, ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಮತ್ತು ಚಾಲುಕ್ಯರ ಶಿಲ್ಪಕಲೆಯನ್ನು ನೋಡಿ.", en: "Explore the rock-cut cave temples, Agastya lake, and Chalukyan stone craft." } },
      { name: { kn: "ಐಹೊಳೆ ಮತ್ತು ಪಟ್ಟದಕಲ್ಲು", en: "Aihole & Pattadakal" }, description: { kn: "ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ಪ್ರಯೋಗಭೂಮಿ ಮತ್ತು ಯುನೆಸ್ಕೋ ವಿಶ್ವಪಾರಂಪರ್ಯ ಸಮೂಹ.", en: "Visit an early laboratory of temple architecture and a UNESCO World Heritage ensemble." } },
      { name: { kn: "ಕೂಡಲ ಸಂಗಮ", en: "Kudala Sangama" }, description: { kn: "ಕೃಷ್ಣಾ–ಮಲಪ್ರಭಾ ಸಂಗಮ ಮತ್ತು ಬಸವಣ್ಣನವರ ಸ್ಮರಣೆಯ ಪ್ರಮುಖ ತಾಣ.", en: "See the Krishna–Malaprabha confluence and an important centre associated with Basavanna." } },
    ],
  },
  ballari: {
    history: { kn: "‘ಬಲ್ಲಾರೆ’ ಎಂಬ ಹೆಸರು 12ನೇ ಶತಮಾನದ ಶಾಸನಗಳಲ್ಲಿಯೇ ಕಾಣುತ್ತದೆ. ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಸ್ಮೃತಿಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ಗಣಿಗಾರಿಕೆಯ ಆಧುನಿಕ ಇತಿಹಾಸ ಬಳ್ಳಾರಿಯ ಸ್ವರೂಪವನ್ನು ರೂಪಿಸಿವೆ.", en: "The name ‘Ballare’ appears in inscriptions from at least the 12th century. Memories of the Vijayanagara empire, forts, and the modern mining economy have shaped Ballari." },
    character: { kn: "ಬಂಡೆಗುಡ್ಡಗಳು, ಒಣ ದಖನ್ ಭೂದೃಶ್ಯ, ಉಕ್ಕು-ಗಣಿಗಾರಿಕೆ ಮತ್ತು ಜೀವಂತ ಜಾನಪದ ಸಂಸ್ಕೃತಿ ಜಿಲ್ಲೆಯ ಗುರುತುಗಳು.", en: "Granite hills, the dry Deccan landscape, steel and mining, and living folk culture define the district." },
    highlights: [
      { name: { kn: "ಬಳ್ಳಾರಿ ಕೋಟೆ", en: "Ballari Fort" }, description: { kn: "ನಗರದ ಮೇಲಿನ ಬಂಡೆಗುಡ್ಡದಲ್ಲಿ ಕಟ್ಟಿದ ಮೇಲ್ಕೋಟೆ ಮತ್ತು ಕೆಳಕೋಟೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.", en: "Explore the upper and lower forts built around the great rocky hill above the city." } },
      { name: { kn: "ದಾರೋಜಿ ಕರಡಿ ಧಾಮ", en: "Daroji Sloth Bear Sanctuary" }, description: { kn: "ಒಣ ಬಂಡೆ ಪ್ರದೇಶದ ಕರಡಿಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ವನ್ಯಜೀವಿಗಳನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ನೋಡಿ.", en: "Observe sloth bears and dry-zone wildlife responsibly in their rocky habitat." } },
      { name: { kn: "ಸಂಡೂರು", en: "Sandur" }, description: { kn: "ಗುಡ್ಡಗಳು, ಕಣಿವೆಗಳು, ಕರಕುಶಲ ಮತ್ತು ಕುಮಾರಸ್ವಾಮಿ ದೇವಾಲಯದ ಸುತ್ತಲಿನ ಭೂದೃಶ್ಯ ನೋಡಿ.", en: "Discover hills, valleys, local craft, and the landscape around Kumaraswamy Temple." } },
    ],
  },
  belagavi: {
    history: { kn: "ಪ್ರಾಚೀನ ವೇಣುಗ್ರಾಮದಿಂದ ಇಂದಿನ ಬೆಳಗಾವಿವರೆಗೆ, ಈ ಗಡಿನಾಡು ಚಾಲುಕ್ಯರು, ರಟ್ಟರು, ಮರಾಠರು ಮತ್ತು ಬ್ರಿಟಿಷ್ ಕಂಟೋನ್ಮೆಂಟ್‌ನ ಪದರಗಳನ್ನು ಉಳಿಸಿಕೊಂಡಿದೆ.", en: "From ancient Venugrama to present-day Belagavi, this borderland preserves layers of Chalukya, Ratta, Maratha, and British cantonment history." },
    character: { kn: "ಕನ್ನಡ, ಮರಾಠಿ ಮತ್ತು ಕೊಂಕಣಿ ಸಂಸ್ಕೃತಿಗಳ ಸಂವಾದ, ಮಲೆನಾಡಿನ ಹಸಿರು ಮತ್ತು ಸಿಹಿತಿಂಡಿ-ಆಹಾರ ಪರಂಪರೆ ಇದರ ವಿಶೇಷತೆ.", en: "Its identity grows from Kannada, Marathi, and Konkani cultural exchange, green uplands, and a distinctive food tradition." },
    highlights: [
      { name: { kn: "ಬೆಳಗಾವಿ ಕೋಟೆ", en: "Belagavi Fort" }, description: { kn: "ಕಮಲ ಬಸದಿ, ಧಾರ್ಮಿಕ ಸ್ಮಾರಕಗಳು ಮತ್ತು ಬಹುಪದರದ ಕೋಟೆ ಇತಿಹಾಸ ನೋಡಿ.", en: "See Kamal Basadi, sacred monuments, and the fort’s many historical layers." } },
      { name: { kn: "ಗೋಕಾಕ್ ಜಲಪಾತ", en: "Gokak Falls" }, description: { kn: "ಘಟಪ್ರಭಾ ನದಿಯ ಜಲಪಾತ, ಕಣಿವೆ ಮತ್ತು ಐತಿಹಾಸಿಕ ತೂಗುಸೇತುವೆಯನ್ನು ನೋಡಿ.", en: "Experience the Ghataprabha waterfall, gorge, and historic suspension bridge." } },
      { name: { kn: "ಸವದತ್ತಿ ಮತ್ತು ಯಲ್ಲಮ್ಮಗುಡ್ಡ", en: "Saundatti & Yellamma hill" }, description: { kn: "ಕೋಟೆ, ದೇವಾಲಯ ಮತ್ತು ದೊಡ್ಡ ಜಾತ್ರೆಯ ಸಾಮಾಜಿಕ ಪರಂಪರೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Explore the fort, temple landscape, and the social history of a major pilgrimage fair." } },
    ],
  },
  "bengaluru-rural": {
    history: { kn: "ಬೆಂಗಳೂರು ನಗರದ ಸುತ್ತಲಿನ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳನ್ನು ಆಡಳಿತಾತ್ಮಕವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಿ ರೂಪಿಸಿದ ಜಿಲ್ಲೆ ಇದು; ಇಂದು ಇದರ ಕೇಂದ್ರ ದೇವನಹಳ್ಳಿ.", en: "This district was formed by administratively separating rural areas around Bengaluru city; Devanahalli is its present headquarters." },
    character: { kn: "ಹಳೆಯ ಕೋಟೆ-ದೇವಾಲಯಗಳು, ರೇಷ್ಮೆ ಮತ್ತು ದ್ರಾಕ್ಷಿ ಬೆಳೆ, ವೇಗವಾಗಿ ಬದಲಾಗುತ್ತಿರುವ ನಗರಪರಿಸರ—ಇವೆಲ್ಲ ಇಲ್ಲಿ ಜೊತೆಯಾಗಿವೆ.", en: "Old forts and temples, silk and grape cultivation, and a rapidly changing peri-urban landscape coexist here." },
    highlights: [
      { name: { kn: "ದೇವನಹಳ್ಳಿ ಕೋಟೆ", en: "Devanahalli Fort" }, description: { kn: "ಕಲ್ಲಿನ ಕೋಟೆ, ಹಳೆಯ ಪಟ್ಟಣ ಮತ್ತು ಟಿಪ್ಪು ಸುಲ್ತಾನರ ಜನ್ಮಸ್ಥಳದ ನೆನಪುಗಳನ್ನು ನೋಡಿ.", en: "Walk through the stone fort, old town, and the landscape associated with Tipu Sultan’s birthplace." } },
      { name: { kn: "ಘಾಟಿ ಸುಬ್ರಹ್ಮಣ್ಯ", en: "Ghati Subramanya" }, description: { kn: "ದೊಡ್ಡಬಳ್ಳಾಪುರದ ಬಳಿಯ ಪುರಾತನ ದೇವಾಲಯ ಮತ್ತು ಗ್ರಾಮೀಣ ಪರಿಸರ ನೋಡಿ.", en: "Visit the historic temple and rural setting near Doddaballapura." } },
      { name: { kn: "ದ್ರಾಕ್ಷಿ ಮತ್ತು ರೇಷ್ಮೆನಾಡು", en: "Grape & silk country" }, description: { kn: "ದೇವನಹಳ್ಳಿ–ದೊಡ್ಡಬಳ್ಳಾಪುರ ಸುತ್ತಲಿನ ಕೃಷಿ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಕೈಗಾರಿಕಾ ಬದಲಾವಣೆಗಳನ್ನು ಅರಿಯಿರಿ.", en: "Learn about farming, markets, and industrial change around Devanahalli and Doddaballapura." } },
    ],
  },
  "bengaluru-south": {
    history: { kn: "ಹಿಂದಿನ ರಾಮನಗರ ಜಿಲ್ಲೆಯನ್ನು 2025ರಲ್ಲಿ ಬೆಂಗಳೂರು ದಕ್ಷಿಣ ಎಂದು ಮರುನಾಮಕರಣ ಮಾಡಲಾಯಿತು; ಜಿಲ್ಲಾ ಕೇಂದ್ರ ರಾಮನಗರದಲ್ಲಿಯೇ ಉಳಿದಿದೆ. ಈ ಪ್ರದೇಶವು ಗಂಗರು, ಮೈಸೂರು ಸಂಸ್ಥಾನ ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟದ ನೆನಪುಗಳನ್ನು ಹೊಂದಿದೆ.", en: "The former Ramanagara district was renamed Bengaluru South in 2025, while its headquarters remained at Ramanagara. The area carries memories of the Gangas, Mysore state, and the freedom movement." },
    character: { kn: "ರೇಷ್ಮೆ ಮಾರುಕಟ್ಟೆ, ಗ್ರಾನೈಟ್ ಬೆಟ್ಟಗಳು, ಜಾನಪದ ಕಲೆ ಮತ್ತು ಕಾವೇರಿ ಕಣಿವೆಯ ಪ್ರಕೃತಿ ಇದರ ಗುರುತು.", en: "Silk markets, granite hills, folk culture, and the Cauvery valley shape its identity." },
    highlights: [
      { name: { kn: "ರಾಮದೇವರ ಬೆಟ್ಟ", en: "Ramadevara Betta" }, description: { kn: "ಬಂಡೆಗುಡ್ಡ, ದೇವಾಲಯ ಮತ್ತು ರಣಹದ್ದು ಸಂರಕ್ಷಣಾ ಪ್ರದೇಶವನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ನೋಡಿ.", en: "Explore the rocky hill, temple, and vulture habitat responsibly." } },
      { name: { kn: "ಜಾನಪದ ಲೋಕ", en: "Janapada Loka" }, description: { kn: "ಕರ್ನಾಟಕದ ಜನಪದ ವಸ್ತು, ಸಂಗೀತ, ನೃತ್ಯ ಮತ್ತು ಗ್ರಾಮೀಣ ಜೀವನದ ಸಂಗ್ರಹವನ್ನು ನೋಡಿ.", en: "Discover a major collection of Karnataka folk objects, music, dance, and rural traditions." } },
      { name: { kn: "ಸಂಗಮ ಮತ್ತು ಮೇಕೆದಾಟು", en: "Sangama & Mekedatu" }, description: { kn: "ನದಿಸಂಗಮ ಮತ್ತು ಕಾವೇರಿಯ ಕಲ್ಲುಕಣಿವೆಯನ್ನು ಸುರಕ್ಷತಾ ನಿಯಮಗಳೊಂದಿಗೆ ಅನುಭವಿಸಿ.", en: "Experience the river confluence and Cauvery gorge while following local safety rules." } },
    ],
  },
  "bengaluru-urban": {
    history: { kn: "16ನೇ ಶತಮಾನದಲ್ಲಿ ಕೆಂಪೇಗೌಡರು ರೂಪಿಸಿದ ಪೇಟೆಯಿಂದ ಮೈಸೂರು ಸಂಸ್ಥಾನ, ಬ್ರಿಟಿಷ್ ಕಂಟೋನ್ಮೆಂಟ್ ಮತ್ತು ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನ ಮಹಾನಗರದವರೆಗೆ ಬೆಂಗಳೂರು ಹಲವು ಪದರಗಳಲ್ಲಿ ಬೆಳೆದಿದೆ.", en: "Bengaluru grew in layers—from Kempe Gowda’s 16th-century pete, through Mysore and the British cantonment, into a modern technology metropolis." },
    character: { kn: "ಪೇಟೆ, ಉದ್ಯಾನಗಳು, ವಿಜ್ಞಾನ ಸಂಸ್ಥೆಗಳು, ಬಹುಭಾಷಿಕ ಬೀದಿಗಳು ಮತ್ತು ಸಮಕಾಲೀನ ಕಲೆ-ತಂತ್ರಜ್ಞಾನ ಇದರ ಜೀವಂತ ಸ್ವರೂಪ.", en: "Its living character combines the old pete, gardens, science institutions, multilingual streets, contemporary arts, and technology." },
    highlights: [
      { name: { kn: "ಬೆಂಗಳೂರು ಕೋಟೆ ಮತ್ತು ಟಿಪ್ಪು ಅರಮನೆ", en: "Bengaluru Fort & Tipu’s Palace" }, description: { kn: "ಹಳೆಯ ಪೇಟೆಯ ರಾಜಕೀಯ ಮತ್ತು ವಾಸ್ತು ಇತಿಹಾಸವನ್ನು ಕಾಲ್ನಡಿಗೆಯಲ್ಲಿ ಅರಿಯಿರಿ.", en: "Walk through the political and architectural history of the old pete." } },
      { name: { kn: "ಲಾಲ್‌ಬಾಗ್ ಮತ್ತು ಕಬ್ಬನ್ ಉದ್ಯಾನ", en: "Lalbagh & Cubbon Park" }, description: { kn: "ನಗರದ ಸಸ್ಯಶಾಸ್ತ್ರ, ಸಾರ್ವಜನಿಕ ಉದ್ಯಾನ ಪರಂಪರೆ ಮತ್ತು ಹಸಿರು ವಲಯಗಳನ್ನು ನೋಡಿ.", en: "Explore the city’s botanical collections, public-garden heritage, and green spaces." } },
      { name: { kn: "ಸಂಗ್ರಹಾಲಯ ಮತ್ತು ವಿಜ್ಞಾನ ವಲಯ", en: "Museums & science quarter" }, description: { kn: "ವಿಶ್ವೇಶ್ವರಯ್ಯ ಸಂಗ್ರಹಾಲಯ, ಸರ್ಕಾರಿ ಮ್ಯೂಸಿಯಂ ಮತ್ತು ಸುತ್ತಲಿನ ಸಾಂಸ್ಕೃತಿಕ ಸಂಸ್ಥೆಗಳನ್ನು ನೋಡಿ.", en: "Visit Visvesvaraya Museum, Government Museum, and nearby cultural institutions." } },
    ],
  },
  bidar: {
    history: { kn: "ಮಧ್ಯಯುಗದಲ್ಲಿ ಬಹಮನಿ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿದ್ದ ಬೀದರ್, ನಂತರ ಬರೀದ್ ಶಾಹಿಗಳ ಕೇಂದ್ರವಾಯಿತು. ಅದರ ಕೋಟೆ, ಮದರಸಾ ಮತ್ತು ಸಮಾಧಿಗಳು ದಖನಿ ಸಂಸ್ಕೃತಿಯ ಗುರುತುಗಳನ್ನು ಉಳಿಸಿವೆ.", en: "Bidar was a medieval capital of the Bahmani kingdom and later the Barid Shahi centre. Its fort, madrasa, and tombs preserve a rich Deccani legacy." },
    character: { kn: "ಕೆಂಪು ಲ್ಯಾಟರೈಟ್ ನೆಲ, ದಖನಿ-ಕನ್ನಡ ಸಂಸ್ಕೃತಿ, ಸೂಫಿ ಪರಂಪರೆ ಮತ್ತು ಬೆಳ್ಳಿಚಿತ್ತಾರದ ಬಿದ್ರಿ ಕಲೆ ಇಲ್ಲಿ ಒಂದಾಗುತ್ತವೆ.", en: "Red laterite earth, Deccani-Kannada culture, Sufi traditions, and silver-inlaid Bidri craft meet here." },
    highlights: [
      { name: { kn: "ಬೀದರ್ ಕೋಟೆ", en: "Bidar Fort" }, description: { kn: "ಅರಮನೆಗಳು, ಮಹಲ್‌ಗಳು, ಮಸೀದಿಗಳು ಮತ್ತು ವಿಶಾಲ ರಕ್ಷಣಾ ಗೋಡೆಗಳನ್ನು ನೋಡಿ.", en: "Explore palaces, halls, mosques, and the fort’s extensive defensive walls." } },
      { name: { kn: "ಮಹಮೂದ್ ಗವಾನ್ ಮದರಸಾ", en: "Mahmud Gawan Madrasa" }, description: { kn: "15ನೇ ಶತಮಾನದ ವಿದ್ಯಾಕೇಂದ್ರದ ಬಣ್ಣದ ಟೈಲ್‌ಗಳು ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ನೋಡಿ.", en: "See the coloured tilework and architecture of a renowned 15th-century centre of learning." } },
      { name: { kn: "ಬಿದ್ರಿ ಕರಕುಶಲ", en: "Bidri craft" }, description: { kn: "ಲೋಹದ ಮೇಲೆ ಬೆಳ್ಳಿ ತಂತಿ ಜೋಡಿಸುವ ಜೀವಂತ ಕಲೆಯನ್ನು ಸ್ಥಳೀಯ ಕರ್ಮಗಾರರಿಂದ ಅರಿಯಿರಿ.", en: "Learn from local artisans about the living craft of silver inlay on darkened metal." } },
    ],
  },
  chamarajanagar: {
    history: { kn: "ಮೈಸೂರು ರಾಜ್ಯದ ದಕ್ಷಿಣ ಗಡಿಭಾಗವಾಗಿದ್ದ ಈ ಪ್ರದೇಶವು 1997ರಲ್ಲಿ ಪ್ರತ್ಯೇಕ ಜಿಲ್ಲೆಯಾಯಿತು. ಗಂಗರು, ಚೋಳರು, ಹೊಯ್ಸಳರು ಮತ್ತು ಮೈಸೂರು ಒಡೆಯರ ಇತಿಹಾಸದ ಗುರುತುಗಳು ಇಲ್ಲಿವೆ.", en: "Long part of Mysore’s southern frontier, the area became a separate district in 1997. It retains traces of Ganga, Chola, Hoysala, and Wadiyar history." },
    character: { kn: "ಅರಣ್ಯಗಳು, ಸೋಲಿಗ ಸಮುದಾಯದ ಜ್ಞಾನ, ಪವಿತ್ರ ಬೆಟ್ಟಗಳು ಮತ್ತು ವನ್ಯಜೀವಿ ಸಂರಕ್ಷಣೆ ಜಿಲ್ಲೆಯ ಕೇಂದ್ರ ಗುರುತುಗಳು.", en: "Forests, Soliga community knowledge, sacred hills, and wildlife conservation are central to the district’s identity." },
    highlights: [
      { name: { kn: "ಬಂಡೀಪುರ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ", en: "Bandipur National Park" }, description: { kn: "ಸಂರಕ್ಷಿತ ಅರಣ್ಯದಲ್ಲಿ ಮಾರ್ಗದರ್ಶಿತ ಸಫಾರಿಯಿಂದ ವನ್ಯಜೀವಿ ಮತ್ತು ಭೂದೃಶ್ಯ ನೋಡಿ.", en: "Experience wildlife and forest landscapes through regulated, guided safaris." } },
      { name: { kn: "ಬಿಳಿಗಿರಿರಂಗನ ಬೆಟ್ಟ", en: "Biligirirangana Hills" }, description: { kn: "ಪೂರ್ವ ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ಸೇರುವ ಜೀವವೈವಿಧ್ಯ ಪ್ರದೇಶ ಮತ್ತು ಸೋಲಿಗ ಸಂಸ್ಕೃತಿಯನ್ನು ಗೌರವದಿಂದ ಅರಿಯಿರಿ.", en: "Explore the biodiverse meeting zone of the Ghats and learn respectfully about Soliga culture." } },
      { name: { kn: "ಮಲೆ ಮಹದೇಶ್ವರ ಬೆಟ್ಟ", en: "Male Mahadeshwara Hills" }, description: { kn: "ಯಾತ್ರಾ ಪರಂಪರೆ, ಕಾಡುಮಾರ್ಗಗಳು ಮತ್ತು ಜನಪದ ಕಾವ್ಯಗಳ ನೆಲವನ್ನು ನೋಡಿ.", en: "Discover a pilgrimage landscape of forest routes and a deep oral-folk tradition." } },
    ],
  },
  chikkaballapur: {
    history: { kn: "ಕೋಲಾರದಿಂದ ಬೇರ್ಪಟ್ಟು 2007ರಲ್ಲಿ ರೂಪಗೊಂಡ ಜಿಲ್ಲೆ ಇದು. ನಂದಿದುರ್ಗದ ಕೋಟೆ ಇತಿಹಾಸ, ಪಾಳೇಗಾರರ ನೆನಪು ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯಪೂರ್ವ ಚಳವಳಿಗಳ ತಾಣಗಳು ಇಲ್ಲಿವೆ.", en: "Formed from Kolar district in 2007, Chikkaballapur carries the fort history of Nandidurga, local chieftain traditions, and sites linked to pre-independence reform." },
    character: { kn: "ಗುಡ್ಡಗಳು, ದ್ರಾಕ್ಷಿ ತೋಟಗಳು, ಕೆರೆಗಳು ಮತ್ತು ಬೆಂಗಳೂರಿನ ಸಮೀಪದ ಗ್ರಾಮೀಣ ಜೀವನ ಇದರ ವೈಶಿಷ್ಟ್ಯ.", en: "Hills, vineyards, tanks, and rural life close to Bengaluru give the district its character." },
    highlights: [
      { name: { kn: "ನಂದಿ ಬೆಟ್ಟ", en: "Nandi Hills" }, description: { kn: "ಕೋಟೆ ಅವಶೇಷ, ದೇವಾಲಯ, ಮುಂಜಾನೆ ದೃಶ್ಯ ಮತ್ತು ಮಿತವಾದ ಪ್ರಕೃತಿ ನಡಿಗೆಯನ್ನು ಅನುಭವಿಸಿ.", en: "See fort remains and temples, and enjoy dawn views and gentle nature walks." } },
      { name: { kn: "ಭೋಗ ನಂದೀಶ್ವರ ದೇವಾಲಯ", en: "Bhoga Nandeeshwara Temple" }, description: { kn: "ನಂದಿ ಗ್ರಾಮದ ಬಹುಯುಗದ ದ್ರಾವಿಡ ದೇವಾಲಯ ಸಮೂಹವನ್ನು ನೋಡಿ.", en: "Explore a layered Dravidian temple complex at the foot of Nandi Hills." } },
      { name: { kn: "ಮುದ್ದೇನಹಳ್ಳಿ", en: "Muddenahalli" }, description: { kn: "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯರ ಜನ್ಮಸ್ಥಳ ಮತ್ತು ಸ್ಮಾರಕ ಸಂಗ್ರಹಾಲಯ ನೋಡಿ.", en: "Visit the birthplace and memorial museum of Sir M. Visvesvaraya." } },
    ],
  },
  chikkamagaluru: {
    history: { kn: "1947ರವರೆಗೆ ಕಡೂರು ಜಿಲ್ಲೆ ಎಂದು ಕರೆಯಲ್ಪಟ್ಟ ಈ ಮಲೆನಾಡು, ಹೊಯ್ಸಳರ ಆರಂಭಿಕ ನೆಲೆಗಳು ಮತ್ತು ಭಾರತದ ಕಾಫಿ ಬೆಳೆಯ ಇತಿಹಾಸದೊಂದಿಗೆ ಜೋಡಿದೆ.", en: "Known as Kadur district until 1947, this Malnad region is linked to early Hoysala history and the story of coffee cultivation in India." },
    character: { kn: "ಮೋಡ ಮುಸುಕಿದ ಪರ್ವತಗಳು, ಕಾಫಿ ತೋಟಗಳು, ಪಶ್ಚಿಮ ಘಟ್ಟದ ನದಿಮೂಲಗಳು ಮತ್ತು ಬಹುಧಾರ್ಮಿಕ ಯಾತ್ರಾಸ್ಥಳಗಳು ಇದರ ಗುರುತು.", en: "Cloudy peaks, coffee estates, Western Ghats river sources, and multi-faith pilgrimage landscapes define it." },
    highlights: [
      { name: { kn: "ಮುಳ್ಳಯ್ಯನಗಿರಿ ಮತ್ತು ಬಾಬಾಬುಡನ್‌ಗಿರಿ", en: "Mullayanagiri & Baba Budangiri" }, description: { kn: "ಎತ್ತರದ ಶಿಖರಗಳು, ಹುಲ್ಲುಗಾವಲು ಮತ್ತು ಕಾಫಿ ಕಥೆಯೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದ ಬೆಟ್ಟಗಳನ್ನು ನೋಡಿ.", en: "Explore high peaks, grasslands, and hills associated with Karnataka’s coffee story." } },
      { name: { kn: "ಕುದುರೆಮುಖ", en: "Kudremukh" }, description: { kn: "ಪಶ್ಚಿಮ ಘಟ್ಟದ ಅರಣ್ಯ, ನದಿಮೂಲ ಮತ್ತು ಅನುಮತಿಯೊಂದಿಗೆ ಪಾದಯಾತ್ರೆಯನ್ನು ಅನುಭವಿಸಿ.", en: "Experience Western Ghats forests, headwaters, and permitted trekking routes." } },
      { name: { kn: "ಶೃಂಗೇರಿ", en: "Sringeri" }, description: { kn: "ತುಂಗಾ ನದಿತೀರದ ವಿದ್ಯಾ, ಮಠ ಮತ್ತು ದೇವಾಲಯ ಪರಂಪರೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Discover a long tradition of learning, monastic life, and temples on the Tunga river." } },
    ],
  },
  chitradurga: {
    history: { kn: "ಶಿಲಾಯುಗದ ನೆಲೆಗಳಿಂದ ಮೌರ್ಯರು, ಚಾಲುಕ್ಯರು, ವಿಜಯನಗರ ಮತ್ತು ಚಿತ್ರದುರ್ಗದ ಪಾಳೇಗಾರರ ಕಾಲದವರೆಗೆ ಜಿಲ್ಲೆಯ ಇತಿಹಾಸ ಹರಡಿದೆ. ಒನಕೆ ಓಬವ್ವೆಯ ಕಥೆ ಅದರ ಜನಸ್ಮೃತಿಯ ಪ್ರಮುಖ ಭಾಗ.", en: "The district’s history stretches from Stone Age habitation through the Mauryas, Chalukyas, Vijayanagara, and the Nayakas of Chitradurga. The story of Onake Obavva remains central to public memory." },
    character: { kn: "ಗಾಳಿಬೀಸುವ ಬಂಡೆಭೂಮಿ, ಕೋಟೆ, ನಾಯಕನಕಟ್ಟೆ ಪರಂಪರೆ ಮತ್ತು ವೀರಗಾಸೆ-ಜನಪದ ಕಲೆಗಳು ಜಿಲ್ಲೆಯ ಸ್ವಭಾವವನ್ನು ರೂಪಿಸುತ್ತವೆ.", en: "Wind-shaped rocky country, the fort, Nayaka heritage, and folk forms such as Veeragase shape its character." },
    highlights: [
      { name: { kn: "ಚಿತ್ರದುರ್ಗ ಕೋಟೆ", en: "Chitradurga Fort" }, description: { kn: "ಏಳು ಸುತ್ತಿನ ಕೋಟೆ, ಗುಪ್ತ ದಾರಿಗಳು, ದೇವಾಲಯಗಳು ಮತ್ತು ಮಳೆನೀರು ವ್ಯವಸ್ಥೆಯನ್ನು ನೋಡಿ.", en: "Explore seven defensive circuits, passages, temples, and ingenious rainwater systems." } },
      { name: { kn: "ಚಂದ್ರವಳ್ಳಿ", en: "Chandravalli" }, description: { kn: "ಪುರಾತತ್ವ ತಾಣ, ಗುಹೆ ಮತ್ತು ಪ್ರಾಚೀನ ವ್ಯಾಪಾರದ ಗುರುತುಗಳನ್ನು ಅರಿಯಿರಿ.", en: "Learn about an archaeological landscape of caves, settlement, and ancient trade." } },
      { name: { kn: "ವಾಣಿ ವಿಲಾಸ ಸಾಗರ", en: "Vani Vilasa Sagara" }, description: { kn: "ವೇದಾವತಿ ನದಿಯ ಐತಿಹಾಸಿಕ ಅಣೆಕಟ್ಟು ಮತ್ತು ಸುತ್ತಲಿನ ಗುಡ್ಡಗಳನ್ನು ನೋಡಿ.", en: "Visit the historic dam across the Vedavati and its surrounding hills." } },
    ],
  },
  "dakshina-kannada": {
    history: { kn: "ಆಳುಪರ ದೀರ್ಘ ಆಳ್ವಿಕೆಯಿಂದ ವಿಜಯನಗರ, ಕೆಳದಿ, ಮೈಸೂರು ಮತ್ತು ಬ್ರಿಟಿಷ್ ಕಾಲದವರೆಗೆ ಈ ಕರಾವಳಿ ಸಾಗರ ವ್ಯಾಪಾರದ ಕೇಂದ್ರವಾಗಿತ್ತು. 1997ರಲ್ಲಿ ಉಡುಪಿ ಪ್ರತ್ಯೇಕವಾದ ಬಳಿಕ ಇಂದಿನ ಜಿಲ್ಲೆ ರೂಪುಗೊಂಡಿತು.", en: "From the long rule of the Alupas through Vijayanagara, Keladi, Mysore, and British periods, this coast was a maritime trading centre. The present district took shape when Udupi separated in 1997." },
    character: { kn: "ಇದು ತುಳುನಾಡಿನ ಪ್ರಮುಖ ಭಾಗ. ಕನ್ನಡದ ಜೊತೆಗೆ ತುಳು, ಕೊಂಕಣಿ ಮತ್ತು ಬ್ಯಾರಿ ಭಾಷೆಗಳು; ಭೂತಕೋಲ, ಕಂಬಳ, ಯಕ್ಷಗಾನ, ಬಂದರು ಮತ್ತು ಮಂಗಳೂರು ಟೈಲುಗಳ ಪರಂಪರೆ ಇಲ್ಲಿ ಜೀವಂತವಾಗಿದೆ.", en: "This is a core part of Tulunadu. Kannada lives alongside Tulu, Konkani, and Beary, with traditions including Bhoota Kola, Kambala, Yakshagana, port culture, and Mangaluru tiles." },
    highlights: [
      { name: { kn: "ಮಂಗಳೂರು", en: "Mangaluru" }, description: { kn: "ಪುರಾತನ ಬಂದರು, ಮಾರುಕಟ್ಟೆ, ದೇವಾಲಯ-ಮಸೀದಿ-ಚರ್ಚುಗಳು ಮತ್ತು ಕರಾವಳಿ ಆಹಾರ ಸಂಸ್ಕೃತಿಯನ್ನು ನೋಡಿ.", en: "Explore an old port city of markets, temples, mosques, churches, and coastal cuisine." } },
      { name: { kn: "ಮೂಡುಬಿದಿರೆ", en: "Moodabidri" }, description: { kn: "ಜೈನ ಬಸದಿ, ಸಾವಿರ ಕಂಬದ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ತಾಳೆಗರಿ ಪರಂಪರೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Discover Jain basadis, the Thousand Pillar temple, and manuscript traditions." } },
      { name: { kn: "ಧರ್ಮಸ್ಥಳ ಮತ್ತು ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ", en: "Dharmasthala & Kukke Subrahmanya" }, description: { kn: "ಪಶ್ಚಿಮ ಘಟ್ಟದ ಅಂಚಿನ ಯಾತ್ರಾಸ್ಥಳಗಳು ಮತ್ತು ಸೇವಾ ಪರಂಪರೆಯನ್ನು ಗೌರವದಿಂದ ಅನುಭವಿಸಿ.", en: "Visit major pilgrimage centres and their service traditions at the edge of the Western Ghats." } },
    ],
  },
  davanagere: {
    history: { kn: "ಚಿತ್ರದುರ್ಗ, ಶಿವಮೊಗ್ಗ ಮತ್ತು ಬಳ್ಳಾರಿ ಜಿಲ್ಲೆಗಳ ಭಾಗಗಳನ್ನು ಸೇರಿಸಿ 1997ರಲ್ಲಿ ದಾವಣಗೆರೆ ಜಿಲ್ಲೆಯನ್ನು ರಚಿಸಲಾಯಿತು. ಹತ್ತಿ ವ್ಯಾಪಾರ ಮತ್ತು ಜವಳಿ ಗಿರಣಿಗಳು ನಗರವನ್ನು ಪ್ರಮುಖ ವಾಣಿಜ್ಯ ಕೇಂದ್ರವನ್ನಾಗಿಸಿವೆ.", en: "Davanagere district was created in 1997 from parts of Chitradurga, Shivamogga, and Ballari. Cotton trade and textile mills helped make the city a major commercial centre." },
    character: { kn: "ಕರ್ನಾಟಕದ ಮಧ್ಯಭಾಗದ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ, ಜವಳಿ ನೆನಪು, ತುಂಗಭದ್ರಾ ತೀರ ಮತ್ತು ಬೆಣ್ಣೆ ದೋಸೆಯ ಆಹಾರ ಗುರುತು ಇಲ್ಲಿ ಸೇರಿವೆ.", en: "A central Karnataka farm market, textile memory, the Tungabhadra river, and the celebrated benne dose define the district." },
    highlights: [
      { name: { kn: "ಹರಿಹರ", en: "Harihara" }, description: { kn: "ತುಂಗಭದ್ರಾ ತೀರದ ಹೊಯ್ಸಳ ಕಾಲದ ಹರಿಹರೇಶ್ವರ ದೇವಾಲಯವನ್ನು ನೋಡಿ.", en: "Visit the Hoysala-era Harihareshwara Temple on the Tungabhadra." } },
      { name: { kn: "ಸಂತೆಬೆನ್ನೂರು ಪುಷ್ಕರಣಿ", en: "Santhebennur Pushkarini" }, description: { kn: "ಅಲಂಕೃತ ಮಂಟಪವಿರುವ ವಿಶಾಲ ಐತಿಹಾಸಿಕ ಕಲ್ಯಾಣಿಯನ್ನು ನೋಡಿ.", en: "Explore a large historic stepped tank with an ornate pavilion." } },
      { name: { kn: "ದಾವಣಗೆರೆ ಆಹಾರ ನಡಿಗೆ", en: "Davanagere food trail" }, description: { kn: "ಬೆಣ್ಣೆ ದೋಸೆ ಮತ್ತು ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಗಳ ಮೂಲಕ ನಗರದ ಕಾರ್ಮಿಕ-ವಾಣಿಜ್ಯ ಕಥೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Taste benne dose and read the city’s working and trading history through its markets." } },
    ],
  },
  dharwad: {
    history: { kn: "ಧಾರವಾಡವು ಚಾಲುಕ್ಯ-ವಿಜಯನಗರ ಕಾಲದ ನೆಲೆಗಳಿಂದ ಮರಾಠ, ಪೇಶ್ವೆ ಮತ್ತು ಬ್ರಿಟಿಷ್ ಆಡಳಿತದವರೆಗೆ ಬೆಳೆದ ವಿದ್ಯಾ-ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ. ಹುಬ್ಬಳ್ಳಿ–ಧಾರವಾಡ ಜೋಡಿ ನಗರಗಳು ವಾಣಿಜ್ಯ ಮತ್ತು ಕಲೆಯನ್ನು ಜೋಡಿಸುತ್ತವೆ.", en: "Dharwad grew from Chalukya and Vijayanagara roots through Maratha, Peshwa, and British rule into a major centre of education and culture. The Hubballi–Dharwad twin cities connect commerce and the arts." },
    character: { kn: "ಹಿಂದೂಸ್ತಾನಿ ಸಂಗೀತ, ಕನ್ನಡ ಸಾಹಿತ್ಯ, ಧಾರವಾಡ ಪೇಡಾ ಮತ್ತು ಉತ್ತರ ಕರ್ನಾಟಕದ ಮಾತಿನ ಲಯ ಜಿಲ್ಲೆಯ ವಿಶೇಷತೆ.", en: "Hindustani music, Kannada literature, Dharwad peda, and the cadence of North Karnataka speech give the district its distinct identity." },
    highlights: [
      { name: { kn: "ಧಾರವಾಡದ ಸಂಗೀತ-ಸಾಹಿತ್ಯ ವಲಯ", en: "Dharwad’s music & literary quarter" }, description: { kn: "ಕರ್ನಾಟಕ ವಿದ್ಯಾವರ್ಧಕ ಸಂಘ, ವಿಶ್ವವಿದ್ಯಾಲಯ ಪರಿಸರ ಮತ್ತು ಸಂಗೀತ ಪರಂಪರೆಯ ಗುರುತುಗಳನ್ನು ನೋಡಿ.", en: "Explore institutions and neighbourhoods tied to Kannada letters and Hindustani music." } },
      { name: { kn: "ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಾಲಯ", en: "Chandramouleshwara Temple" }, description: { kn: "ಉಣಕಲ್‌ನ ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯ ಶೈಲಿಯ ಅಪರೂಪದ ದೇವಾಲಯ ನೋಡಿ.", en: "Visit an unusual Western Chalukya-style temple at Unkal." } },
      { name: { kn: "ನೃಪತುಂಗ ಬೆಟ್ಟ", en: "Nrupatunga Betta" }, description: { kn: "ಹುಬ್ಬಳ್ಳಿ ನಗರ ಮತ್ತು ಸುತ್ತಲಿನ ಸಮತಟ್ಟಿನ ವಿಶಾಲ ದೃಶ್ಯ ನೋಡಿ.", en: "Take in broad views over Hubballi and the surrounding plains." } },
    ],
  },
  gadag: {
    history: { kn: "ಗದಗ ಪ್ರದೇಶವು ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯರ ವಾಸ್ತುಶಿಲ್ಪದ ಪ್ರಮುಖ ಕೇಂದ್ರವಾಗಿದ್ದು, ಲಕ್ಕುಂಡಿಯ ದೇವಾಲಯ-ಬಾವಿಗಳು ಅದರ ಉನ್ನತ ಶಿಲ್ಪಪರಂಪರೆಯನ್ನು ತೋರಿಸುತ್ತವೆ. ಜಿಲ್ಲೆ 1997ರಲ್ಲಿ ಧಾರವಾಡದಿಂದ ಬೇರ್ಪಟ್ಟಿತು.", en: "Gadag was a major centre of Western Chalukya architecture, with Lakkundi’s temples and stepwells displaying its refined craft. The district separated from Dharwad in 1997." },
    character: { kn: "ಕಲ್ಲಿನ ದೇವಾಲಯಗಳು, ವಚನ-ಸಂಗೀತ ಪರಂಪರೆ, ಒಣಭೂಮಿ ಕೃಷಿ ಮತ್ತು ಮುದ್ರಣ-ಶಿಕ್ಷಣದ ಇತಿಹಾಸ ಇಲ್ಲಿ ಬೆಸೆದುಕೊಂಡಿದೆ.", en: "Stone temples, vachana and music traditions, dryland farming, and a history of print and education are woven together here." },
    highlights: [
      { name: { kn: "ಲಕ್ಕುಂಡಿ", en: "Lakkundi" }, description: { kn: "ಚಾಲುಕ್ಯ ದೇವಾಲಯಗಳು, ಅಲಂಕೃತ ಮೆಟ್ಟಿಲುಬಾವಿಗಳು ಮತ್ತು ಶಿಲ್ಪಗಳನ್ನು ಕಾಲ್ನಡಿಗೆಯಲ್ಲಿ ನೋಡಿ.", en: "Walk among Chalukya temples, ornate stepwells, and detailed sculpture." } },
      { name: { kn: "ತ್ರಿಕೂಟೇಶ್ವರ ದೇವಾಲಯ", en: "Trikuteshwara Temple" }, description: { kn: "ಗದಗ ನಗರದ ಶಿಲ್ಪ, ದೇವಾಲಯ ಸಮೂಹ ಮತ್ತು ಸರಸ್ವತಿ ಮಂದಿರ ನೋಡಿ.", en: "Explore the temple complex, sculptural details, and Saraswati shrine in Gadag city." } },
      { name: { kn: "ಡಂಬಳ", en: "Dambal" }, description: { kn: "ದೊಡ್ಡಬಸಪ್ಪ ದೇವಾಲಯದ ನಕ್ಷತ್ರಾಕಾರದ ಯೋಜನೆ ಮತ್ತು ಹಳೆಯ ಕೆರೆ ವ್ಯವಸ್ಥೆಯನ್ನು ನೋಡಿ.", en: "See the star-shaped Doddabasappa Temple and the historic tank landscape." } },
    ],
  },
  hassan: {
    history: { kn: "ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ಹೃದಯಭಾಗವಾಗಿದ್ದ ಹಾಸನ ಜಿಲ್ಲೆ, ಬೇಲೂರು-ಹಳೇಬೀಡಿನ ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಶ್ರವಣಬೆಳಗೊಳದ ಜೈನ ಪರಂಪರೆಯಿಂದ ವಿಶ್ವಪ್ರಸಿದ್ಧವಾಗಿದೆ.", en: "At the heart of the Hoysala realm, Hassan is renowned for the sculpture of Belur and Halebidu and the Jain heritage of Shravanabelagola." },
    character: { kn: "ಮಲೆನಾಡು-ಮೈದಾನದ ಸಂಗಮ, ಕಾಫಿ-ಮೆಣಸು ತೋಟಗಳು, ಹೊಯ್ಸಳ ಶಿಲ್ಪ ಮತ್ತು ಜೈನ-ವೈಷ್ಣವ-ಶೈವ ಪರಂಪರೆಗಳು ಇಲ್ಲಿ ಸೇರಿವೆ.", en: "The meeting of Malnad and plains, coffee and pepper estates, Hoysala art, and Jain, Vaishnava, and Shaiva traditions defines the district." },
    highlights: [
      { name: { kn: "ಬೇಲೂರು", en: "Belur" }, description: { kn: "ಚೆನ್ನಕೇಶವ ದೇವಾಲಯದ ಸೂಕ್ಷ್ಮ ಹೊಯ್ಸಳ ಶಿಲ್ಪಗಳನ್ನು ನಿಧಾನವಾಗಿ ಗಮನಿಸಿ.", en: "Spend time with the intricate Hoysala sculpture of the Chennakeshava Temple." } },
      { name: { kn: "ಹಳೇಬೀಡು", en: "Halebidu" }, description: { kn: "ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ, ಜೈನ ಬಸದಿ ಮತ್ತು ಹಳೆಯ ದ್ವಾರಸಮುದ್ರದ ಅವಶೇಷ ನೋಡಿ.", en: "Explore Hoysaleshwara Temple, Jain basadis, and remains of old Dwarasamudra." } },
      { name: { kn: "ಶ್ರವಣಬೆಳಗೊಳ", en: "Shravanabelagola" }, description: { kn: "ವಿಂಧ್ಯಗಿರಿ ಏರಿ ಗೊಮ್ಮಟೇಶ್ವರ ಮೂರ್ತಿ, ಶಾಸನಗಳು ಮತ್ತು ಜೈನ ತೀರ್ಥವನ್ನು ನೋಡಿ.", en: "Climb Vindhyagiri to see Gommateshwara, inscriptions, and a major Jain pilgrimage centre." } },
    ],
  },
  haveri: {
    history: { kn: "ಹಾವೇರಿ ಪ್ರದೇಶವು ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯ ಮತ್ತು ವಿಜಯನಗರ ಪರಂಪರೆಯ ದೇವಾಲಯ-ಶಾಸನಗಳನ್ನು ಹೊಂದಿದೆ. 1997ರಲ್ಲಿ ಧಾರವಾಡದಿಂದ ಬೇರ್ಪಟ್ಟು ಜಿಲ್ಲೆಯಾಯಿತು.", en: "Haveri preserves temples and inscriptions from the Western Chalukya and Vijayanagara worlds. It became a separate district from Dharwad in 1997." },
    character: { kn: "ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ, ಏಲಕ್ಕಿ ಮಾಲೆ, ಜನಪದ ಸಂಗೀತ ಮತ್ತು ಚಾಲುಕ್ಯ ದೇವಾಲಯಗಳ ಗ್ರಾಮೀಣ ಭೂದೃಶ್ಯ ಇದರ ಗುರುತು.", en: "Byadgi chillies, cardamom garlands, folk music, and Chalukya temples in a rural landscape define it." },
    highlights: [
      { name: { kn: "ಹಾನಗಲ್", en: "Hangal" }, description: { kn: "ತಾರಕೇಶ್ವರ ದೇವಾಲಯದ ಅಲಂಕೃತ ಕಂಬಗಳು ಮತ್ತು ಚಾಲುಕ್ಯ ವಾಸ್ತು ನೋಡಿ.", en: "See the ornate pillars and Chalukya architecture of Tarakeshwara Temple." } },
      { name: { kn: "ಬಂಕಾಪುರ", en: "Bankapura" }, description: { kn: "ನವಿಲು ಅಭಯಾರಣ್ಯ, ಕೋಟೆ ಗುರುತುಗಳು ಮತ್ತು ನಾಗರೇಶ್ವರ ದೇವಾಲಯ ನೋಡಿ.", en: "Visit the peacock sanctuary, fort remains, and Nagareshwara Temple." } },
      { name: { kn: "ಗೋಟಗೋಡಿ ಉತ್ಸವ ರಾಕ್ ಗಾರ್ಡನ್", en: "Utsav Rock Garden, Gotagodi" }, description: { kn: "ಶಿಲ್ಪಗಳ ಮೂಲಕ ಉತ್ತರ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಬದುಕು ಮತ್ತು ವೃತ್ತಿಗಳನ್ನು ನೋಡಿ.", en: "See North Karnataka village life and occupations interpreted through sculpture." } },
    ],
  },
  kalaburagi: {
    history: { kn: "ಹಳೆಯ ಕಲಬುರಗಿ ರಾಷ್ಟ್ರಕೂಟ-ಚಾಲುಕ್ಯ ನೆಲೆಗಳಿಂದ ಬಹಮನಿ ಸಾಮ್ರಾಜ್ಯದ ಮೊದಲ ರಾಜಧಾನಿಯಾಗಿ ಬೆಳೆದಿತು. ಸೂಫಿ ದರ್ಗಾಗಳು ಮತ್ತು ಶರಣ ಪರಂಪರೆಗಳು ಅದರ ದಖನಿ ಸಂಸ್ಕೃತಿಯನ್ನು ರೂಪಿಸಿವೆ.", en: "Kalaburagi grew from Rashtrakuta-Chalukya foundations into the first capital of the Bahmani kingdom. Sufi shrines and Sharana traditions shaped its Deccani culture." },
    character: { kn: "ದಖನಿ, ಕನ್ನಡ ಮತ್ತು ಉರ್ದು ಸಂಸ್ಕೃತಿಗಳ ಸಂವಾದ, ತೊಗರಿಬೇಳೆ ಕೃಷಿ, ಕೋಟೆ-ಗುಮ್ಮಟಗಳು ಮತ್ತು ಧಾರ್ಮಿಕ ಸಹಬಾಳ್ವೆ ಇದರ ಗುರುತು.", en: "Deccani, Kannada, and Urdu cultural exchange, red-gram farming, forts and domes, and shared sacred traditions define it." },
    highlights: [
      { name: { kn: "ಕಲಬುರಗಿ ಕೋಟೆ", en: "Kalaburagi Fort" }, description: { kn: "ಬಹಮನಿ ಕಾಲದ ಜಾಮಾ ಮಸೀದಿ, ಗೋಡೆಗಳು ಮತ್ತು ಕೋಟೆಯ ನಗರ ಇತಿಹಾಸ ನೋಡಿ.", en: "Explore the Bahmani-era Jami Masjid, walls, and urban history of the fort." } },
      { name: { kn: "ಖ್ವಾಜಾ ಬಂದಾ ನವಾಜ್ ದರ್ಗಾ", en: "Khwaja Banda Nawaz Dargah" }, description: { kn: "ಸೂಫಿ ಯಾತ್ರೆ, ದಖನಿ ಸಾಹಿತ್ಯ ಮತ್ತು ವಾರ್ಷಿಕ ಉರುಸ್ ಪರಂಪರೆಯನ್ನು ಗೌರವದಿಂದ ಅರಿಯಿರಿ.", en: "Learn respectfully about Sufi pilgrimage, Deccani literature, and the annual urs." } },
      { name: { kn: "ಸನ್ನತಿ", en: "Sannati" }, description: { kn: "ಕನಗನಹಳ್ಳಿಯ ಬೌದ್ಧ ಪುರಾತತ್ವ ಮತ್ತು ಅಶೋಕ ಕಾಲದ ಶಿಲ್ಪ ಅವಶೇಷಗಳನ್ನು ಅರಿಯಿರಿ.", en: "Discover the Buddhist archaeology and Mauryan-period sculptural remains around Kanaganahalli." } },
    ],
  },
  kodagu: {
    history: { kn: "ಹಾಲೇರಿ ರಾಜರ ಆಳ್ವಿಕೆ, ಬ್ರಿಟಿಷ್ ಕಾಲದ ಕೂರ್ಗ್ ಪ್ರಾಂತ್ಯ ಮತ್ತು ಕರ್ನಾಟಕ ಏಕೀಕರಣದ ಪದರಗಳನ್ನು ಕೊಡಗು ಹೊಂದಿದೆ. ಕೊಡವ ಸಮುದಾಯದ ವಿಶಿಷ್ಟ ಸಾಮಾಜಿಕ-ಯೋಧ ಪರಂಪರೆ ಇಲ್ಲಿ ಬೆಳೆದಿದೆ.", en: "Kodagu carries the layered history of the Haleri rulers, the British province of Coorg, and integration with Karnataka. A distinct Kodava social and martial tradition developed here." },
    character: { kn: "ಕಾವೇರಿ ನದಿಮೂಲ, ಮಳೆಕಾಡು, ಕಾಫಿ-ಮೆಣಸು ತೋಟಗಳು ಮತ್ತು ಕೊಡವ ಭಾಷೆ-ಉಡುಪು-ಹಬ್ಬಗಳು ಜಿಲ್ಲೆಯ ಗುರುತು.", en: "The Cauvery’s source, rainforests, coffee and pepper estates, and Kodava language, dress, and festivals define the district." },
    highlights: [
      { name: { kn: "ಮಡಿಕೇರಿ", en: "Madikeri" }, description: { kn: "ಕೋಟೆ, ರಾಜಾಸೀಟ್, ಹಳೆಯ ಪಟ್ಟಣ ಮತ್ತು ಮಳೆನಾಡಿನ ದೃಶ್ಯಗಳನ್ನು ನೋಡಿ.", en: "Explore the fort, Raja’s Seat, old town, and broad views across the hills." } },
      { name: { kn: "ತಲಕಾವೇರಿ ಮತ್ತು ಭಾಗಮಂಡಲ", en: "Talacauvery & Bhagamandala" }, description: { kn: "ಕಾವೇರಿಯ ಉದ್ಭವದ ಪವಿತ್ರ ಭೂದೃಶ್ಯ ಮತ್ತು ನದಿಸಂಗಮವನ್ನು ನೋಡಿ.", en: "Visit the sacred headwater landscape of the Cauvery and the river confluence." } },
      { name: { kn: "ನಾಗರಹೊಳೆ", en: "Nagarahole" }, description: { kn: "ನಿಯಂತ್ರಿತ ಸಫಾರಿಯಲ್ಲಿ ಅರಣ್ಯ-ವನ್ಯಜೀವಿಗಳನ್ನು ನೋಡಿ; ಸ್ಥಳೀಯ ಸಮುದಾಯ ಮತ್ತು ಸಂರಕ್ಷಣಾ ನಿಯಮಗಳನ್ನು ಗೌರವಿಸಿ.", en: "Experience forest wildlife on regulated safaris while respecting communities and conservation rules." } },
    ],
  },
  kolar: {
    history: { kn: "ಗಂಗರ ಆರಂಭಿಕ ರಾಜಧಾನಿಯಾಗಿದ್ದ ಕೋಲಾರವು ಚೋಳ, ವಿಜಯನಗರ ಮತ್ತು ಮೈಸೂರು ಕಾಲದ ಗುರುತುಗಳನ್ನು ಹೊಂದಿದೆ. ಕೋಲಾರ ಗೋಲ್ಡ್ ಫೀಲ್ಡ್ಸ್‌ನ ಆಧುನಿಕ ಗಣಿಗಾರಿಕಾ ಇತಿಹಾಸ ಜಿಲ್ಲೆಯ ಮತ್ತೊಂದು ಪದರ.", en: "An early capital of the Gangas, Kolar retains Chola, Vijayanagara, and Mysore layers. The modern mining history of Kolar Gold Fields adds another distinctive chapter." },
    character: { kn: "ರೇಷ್ಮೆ, ಮಾವು-ಟೊಮೇಟೊ ಕೃಷಿ, ಗ್ರಾನೈಟ್ ಬೆಟ್ಟಗಳು, ದೇವಾಲಯಗಳು ಮತ್ತು ಚಿನ್ನದ ಗಣಿ ಪಟ್ಟಣಗಳ ನೆನಪುಗಳು ಇಲ್ಲಿ ಸೇರಿವೆ.", en: "Silk, mango and tomato farming, granite hills, temples, and memories of gold-mining towns shape the district." },
    highlights: [
      { name: { kn: "ಕೋಲಾರಮ್ಮ ಮತ್ತು ಸೋಮೇಶ್ವರ ದೇವಾಲಯಗಳು", en: "Kolaramma & Someshwara temples" }, description: { kn: "ಕೋಲಾರ ನಗರದ ಚೋಳ ಮತ್ತು ವಿಜಯನಗರ ಕಾಲದ ಕಲ್ಲಿನ ಕಲೆಯನ್ನು ನೋಡಿ.", en: "Explore Chola- and Vijayanagara-period stone architecture in Kolar town." } },
      { name: { kn: "ಕೋಲಾರ ಗೋಲ್ಡ್ ಫೀಲ್ಡ್ಸ್", en: "Kolar Gold Fields" }, description: { kn: "ಗಣಿಗಾರರ ವಸತಿ, ಕಾರ್ಮಿಕ ಇತಿಹಾಸ ಮತ್ತು ಕೈಗಾರಿಕಾ ಪರಂಪರೆಯನ್ನು ಹೊರಗಿನಿಂದ ಅರಿಯಿರಿ; ಪ್ರವೇಶ ನಿರ್ಬಂಧಗಳನ್ನು ಪಾಲಿಸಿ.", en: "Read the mining town’s labour and industrial heritage from public areas and respect access restrictions." } },
      { name: { kn: "ಅವನಿ ಮತ್ತು ಅಂತರಗಂಗೆ", en: "Avani & Antharagange" }, description: { kn: "ಶಿಲಾಶ್ರಯ, ದೇವಾಲಯಗಳು ಮತ್ತು ಬೆಟ್ಟದ ನಡಿಗೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಅನುಭವಿಸಿ.", en: "Explore rock shelters, temples, and hill walks with suitable safety precautions." } },
    ],
  },
  koppal: {
    history: { kn: "ಕೊಪ್ಪಳವು ಮೌರ್ಯ, ಚಾಲುಕ್ಯ, ರಾಷ್ಟ್ರಕೂಟ ಮತ್ತು ವಿಜಯನಗರ ಕಾಲದ ತಾಣಗಳನ್ನು ಹೊಂದಿರುವ ತುಂಗಭದ್ರಾ ಕಣಿವೆಯ ಐತಿಹಾಸಿಕ ಜಿಲ್ಲೆ. 1997ರಲ್ಲಿ ರಾಯಚೂರಿನಿಂದ ಪ್ರತ್ಯೇಕವಾಯಿತು.", en: "Koppal is a historic Tungabhadra-valley district with Mauryan, Chalukya, Rashtrakuta, and Vijayanagara sites. It separated from Raichur in 1997." },
    character: { kn: "ಬಂಡೆಭೂಮಿ, ನೀರಾವರಿ ಕೃಷಿ, ವಿಜಯನಗರದ ಪೂರ್ವ ರಾಜಧಾನಿ ಆನೆಗುಂದಿ ಮತ್ತು ಚಾಲುಕ್ಯ ದೇವಾಲಯಗಳು ಇದರ ಗುರುತು.", en: "Granite landscapes, irrigated farming, Anegundi—the pre-Vijayanagara capital—and Chalukya temples define it." },
    highlights: [
      { name: { kn: "ಆನೆಗುಂದಿ", en: "Anegundi" }, description: { kn: "ತುಂಗಭದ್ರಾ ತೀರದ ಹಳೆಯ ವಸತಿ, ಕೋಟೆ ಬಾಗಿಲು ಮತ್ತು ವಿಜಯನಗರಪೂರ್ವ ಇತಿಹಾಸ ನೋಡಿ.", en: "Explore an old riverside settlement, fort gateways, and pre-Vijayanagara history." } },
      { name: { kn: "ಇಟಗಿ ಮಹಾದೇವ ದೇವಾಲಯ", en: "Mahadeva Temple, Itagi" }, description: { kn: "ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯ ವಾಸ್ತುಶಿಲ್ಪದ ಸೂಕ್ಷ್ಮ ಕಲ್ಲಿನ ಕೆಲಸ ನೋಡಿ.", en: "See exceptionally refined stonework from the Western Chalukya period." } },
      { name: { kn: "ಕೊಪ್ಪಳ ಕೋಟೆ ಮತ್ತು ಗವಿಮಠ", en: "Koppal Fort & Gavimath" }, description: { kn: "ಬೆಟ್ಟದ ಕೋಟೆ, ಪಟ್ಟಣದ ದೃಶ್ಯ ಮತ್ತು ಸ್ಥಳೀಯ ಧಾರ್ಮಿಕ-ಸಾಮಾಜಿಕ ಪರಂಪರೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Discover the hill fort, town views, and a local religious and social institution." } },
    ],
  },
  mandya: {
    history: { kn: "ಕಾವೇರಿ ನೀರಾವರಿಯಿಂದ ರೂಪುಗೊಂಡ ಮಂಡ್ಯವು ಮೈಸೂರು ಸಂಸ್ಥಾನದ ಕಾಲದಲ್ಲಿ ಸಕ್ಕರೆ ಮತ್ತು ಕೃಷಿಯ ಪ್ರಮುಖ ಜಿಲ್ಲೆಯಾಯಿತು. ಶ್ರೀರಂಗಪಟ್ಟಣವು ಮೈಸೂರು ರಾಜಕೀಯ ಇತಿಹಾಸದ ಕೇಂದ್ರವಾಗಿತ್ತು.", en: "Shaped by Cauvery irrigation, Mandya became a major sugar and farming district under Mysore. Srirangapatna was a centre of Mysore’s political history." },
    character: { kn: "ಭತ್ತ-ಕಬ್ಬಿನ ಹೊಲಗಳು, ಕಾವೇರಿ ನದಿ, ಜಾನಪದ ಹಾಡುಗಳು, ಮೇಲುಕೋಟೆಯ ಜ್ಞಾನಪರಂಪರೆ ಮತ್ತು ರಂಗನತಿಟ್ಟು ಪಕ್ಷಿಜೀವನ ಇದರ ಗುರುತು.", en: "Paddy and sugarcane fields, the Cauvery, folk songs, Melukote’s learning traditions, and Ranganathittu’s birdlife define it." },
    highlights: [
      { name: { kn: "ಶ್ರೀರಂಗಪಟ್ಟಣ", en: "Srirangapatna" }, description: { kn: "ಕೋಟೆ, ದರಿಯಾ ದೌಲತ್ ಬಾಗ್, ದೇವಸ್ಥಾನ ಮತ್ತು ಟಿಪ್ಪು ಕಾಲದ ಇತಿಹಾಸ ನೋಡಿ.", en: "Explore the fort, Daria Daulat Bagh, temple, and sites from Tipu Sultan’s period." } },
      { name: { kn: "ಮೇಲುಕೋಟೆ", en: "Melukote" }, description: { kn: "ಬೆಟ್ಟದ ದೇವಾಲಯಗಳು, ಕಲ್ಯಾಣಿ ಮತ್ತು ದೀರ್ಘ ವೈಷ್ಣವ ವಿದ್ಯಾ ಪರಂಪರೆಯನ್ನು ನೋಡಿ.", en: "Visit hill temples, the great tank, and a long Vaishnava scholarly tradition." } },
      { name: { kn: "ರಂಗನತಿಟ್ಟು ಮತ್ತು ಶಿವನಸಮುದ್ರ", en: "Ranganathittu & Shivanasamudra" }, description: { kn: "ಪಕ್ಷಿಧಾಮ ಮತ್ತು ಕಾವೇರಿಯ ಜಲಪಾತಗಳನ್ನು ಋತು-ಸುರಕ್ಷತೆ ಗಮನಿಸಿ ನೋಡಿ.", en: "Experience the bird sanctuary and Cauvery waterfalls with seasonal and safety conditions in mind." } },
    ],
  },
  mysuru: {
    history: { kn: "ಮೈಸೂರು ಒಡೆಯರ ರಾಜಧಾನಿಯಾಗಿ ಬೆಳೆದ ನಗರ-ಜಿಲ್ಲೆ, ದಸರಾ, ಅರಮನೆ, ಸಂಗೀತ, ಚಿತ್ರಕಲೆ ಮತ್ತು ಆಡಳಿತ ಸುಧಾರಣೆಯ ದೀರ್ಘ ಪರಂಪರೆಯನ್ನು ಹೊಂದಿದೆ.", en: "As the capital of the Wadiyars, Mysuru developed a lasting legacy of Dasara, palace culture, music, painting, and public administration." },
    character: { kn: "ರಾಜಪರಂಪರೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸಂಸ್ಕೃತಿ, ಮೈಸೂರು ಚಿತ್ರಕಲೆ, ಯೋಗ, ಮಲ್ಲಿಗೆ, ರೇಷ್ಮೆ ಮತ್ತು ಬಹುಭಾಷಿಕ ನಗರ ಜೀವನ ಇಲ್ಲಿ ಒಂದಾಗುತ್ತವೆ.", en: "Royal and civic heritage, Mysore painting, yoga, jasmine, silk, and multilingual urban life come together here." },
    highlights: [
      { name: { kn: "ಮೈಸೂರು ಅರಮನೆ", en: "Mysuru Palace" }, description: { kn: "ಒಡೆಯರ ಇತಿಹಾಸ, ಇಂಡೋ-ಸಾರಸೆನಿಕ್ ವಾಸ್ತು ಮತ್ತು ದಸರಾ ಪರಂಪರೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Discover Wadiyar history, Indo-Saracenic architecture, and the Dasara tradition." } },
      { name: { kn: "ಚಾಮುಂಡಿ ಬೆಟ್ಟ", en: "Chamundi Hill" }, description: { kn: "ದೇವಾಲಯ, ನಂದಿ ಮತ್ತು ನಗರವನ್ನು ನೋಡುವ ಬೆಟ್ಟದ ಸಾಂಸ್ಕೃತಿಕ ಭೂದೃಶ್ಯ ನೋಡಿ.", en: "Explore the temple, Nandi, and a hill landscape overlooking the city." } },
      { name: { kn: "ಸೋಮನಾಥಪುರ", en: "Somanathapura" }, description: { kn: "ಕೇಶವ ದೇವಾಲಯದ ಸಮಮಿತಿ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಹೊಯ್ಸಳ ಶಿಲ್ಪಗಳನ್ನು ನೋಡಿ.", en: "Study the symmetry and intricate Hoysala sculpture of the Keshava Temple." } },
    ],
  },
  raichur: {
    history: { kn: "ಕೃಷ್ಣಾ ಮತ್ತು ತುಂಗಭದ್ರಾ ನಡುವಿನ ರಾಯಚೂರು ದೋಆಬ್ ಶತಮಾನಗಳ ಕಾಲ ದಕ್ಷಿಣ ಭಾರತದ ಸಾಮ್ರಾಜ್ಯಗಳ ನಡುವೆ ಸ್ಪರ್ಧಿತ ಪ್ರದೇಶವಾಗಿತ್ತು. ಅಶೋಕನ ಶಾಸನಗಳಿಂದ ವಿಜಯನಗರ-ಬಹಮನಿ ಸಂಘರ್ಷಗಳವರೆಗೆ ಇಲ್ಲಿ ಅನೇಕ ಪದರಗಳಿವೆ.", en: "The Raichur Doab between the Krishna and Tungabhadra was contested by South Indian powers for centuries. Its layers range from Ashokan inscriptions to Vijayanagara–Bahmani conflicts." },
    character: { kn: "ಕೋಟೆಗಳು, ಬಿಸಿಲಿನ ದಖನ್ ಭೂಮಿ, ನೀರಾವರಿ ಹತ್ತಿ-ಭತ್ತ, ಉರ್ದು-ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪುರಾತತ್ವ ತಾಣಗಳು ಇದರ ಗುರುತು.", en: "Forts, a sun-baked Deccan landscape, irrigated cotton and paddy, Urdu-Kannada culture, and archaeology define it." },
    highlights: [
      { name: { kn: "ರಾಯಚೂರು ಕೋಟೆ", en: "Raichur Fort" }, description: { kn: "ಬೃಹತ್ ಕಲ್ಲುಗೋಡೆ, ಶಾಸನಗಳು ಮತ್ತು ದೋಆಬ್‌ನ ಯುದ್ಧ ಇತಿಹಾಸ ನೋಡಿ.", en: "Explore massive stone walls, inscriptions, and the military history of the doab." } },
      { name: { kn: "ಮಸ್ಕಿ", en: "Maski" }, description: { kn: "‘ದೇವಾನಾಂಪ್ರಿಯ ಅಶೋಕ’ ಗುರುತಿಗೆ ನೆರವಾದ ಪ್ರಸಿದ್ಧ ಶಾಸನದ ಪುರಾತತ್ವ ನೆಲವನ್ನು ಅರಿಯಿರಿ.", en: "Learn about the inscription that helped connect the title Devanampriya with Ashoka." } },
      { name: { kn: "ಹಟ್ಟಿ ಚಿನ್ನದ ಗಣಿ", en: "Hutti Gold Mines" }, description: { kn: "ಭಾರತದ ಪುರಾತನ ಹಾಗೂ ಆಧುನಿಕ ಚಿನ್ನದ ಗಣಿಗಾರಿಕೆಯ ಪಟ್ಟಣಕಥೆಯನ್ನು ಸಾರ್ವಜನಿಕ ವಲಯಗಳಿಂದ ಅರಿಯಿರಿ.", en: "Understand an old and modern gold-mining town from public areas, respecting operational restrictions." } },
    ],
  },
  shivamogga: {
    history: { kn: "ಕದಂಬ, ಚಾಲುಕ್ಯ, ಕೆಳದಿ ನಾಯಕ ಮತ್ತು ಮೈಸೂರು ಆಳ್ವಿಕೆಯ ಗುರುತುಗಳನ್ನು ಶಿವಮೊಗ್ಗ ಹೊತ್ತಿದೆ. ಮಲೆನಾಡಿನ ನದಿಗಳು, ಅಡಿಕೆ ವ್ಯಾಪಾರ ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯ ಚಳವಳಿಯ ನೆನಪುಗಳು ಜಿಲ್ಲೆಯ ಬೆಳವಣಿಗೆಯನ್ನು ರೂಪಿಸಿವೆ.", en: "Shivamogga carries Kadamba, Chalukya, Keladi Nayaka, and Mysore layers. Malnad rivers, areca trade, and memories of the freedom movement shaped the district." },
    character: { kn: "ತುಂಗಾ ನದಿ, ಪಶ್ಚಿಮ ಘಟ್ಟದ ಮಳೆಕಾಡು, ಅಡಿಕೆ ತೋಟಗಳು, ಯಕ್ಷಗಾನ-ಜನಪದ ಮತ್ತು ಸಾಹಿತ್ಯ ಪರಂಪರೆ ಇದರ ಗುರುತು.", en: "The Tunga river, Western Ghats rainforest, areca gardens, folk and Yakshagana traditions, and literature define it." },
    highlights: [
      { name: { kn: "ಜೋಗ ಜಲಪಾತ", en: "Jog Falls" }, description: { kn: "ಶರಾವತಿ ನದಿಯ ಮಹಾಜಲಪಾತವನ್ನು ಋತು ಮತ್ತು ವೀಕ್ಷಣಾ ಸುರಕ್ಷತೆಯನ್ನು ಗಮನಿಸಿ ನೋಡಿ.", en: "See the great Sharavathi waterfall, keeping seasonal flow and viewing safety in mind." } },
      { name: { kn: "ಕೆಳದಿ ಮತ್ತು ಇಕ್ಕೇರಿ", en: "Keladi & Ikkeri" }, description: { kn: "ನಾಯಕ ಅರಮನೆ-ಸಂಗ್ರಹ ಮತ್ತು ಅಘೋರೇಶ್ವರ ದೇವಾಲಯದ ಇತಿಹಾಸ ನೋಡಿ.", en: "Explore the Nayaka palace museum and Aghoreshwara Temple." } },
      { name: { kn: "ಆಗುಂಬೆ", en: "Agumbe" }, description: { kn: "ಮಳೆಕಾಡು, ಸೂರ್ಯಾಸ್ತ ಮತ್ತು ಸಂರಕ್ಷಣಾ ಸಂಶೋಧನೆಯ ನೆಲವನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ಅನುಭವಿಸಿ.", en: "Experience rainforest, sunset viewpoints, and a conservation landscape responsibly." } },
    ],
  },
  tumakuru: {
    history: { kn: "ಗಂಗ, ಚೋಳ, ಹೊಯ್ಸಳ ಮತ್ತು ವಿಜಯನಗರ ಕಾಲದ ಗುರುತುಗಳಿರುವ ತುಮಕೂರು, ಬೆಂಗಳೂರನ್ನು ಉತ್ತರ-ಪಶ್ಚಿಮ ಕರ್ನಾಟಕದೊಂದಿಗೆ ಜೋಡಿಸಿದ ಪ್ರಮುಖ ಮಾರ್ಗಪ್ರದೇಶವಾಗಿ ಬೆಳೆದಿದೆ.", en: "With Ganga, Chola, Hoysala, and Vijayanagara traces, Tumakuru grew as a strategic corridor linking Bengaluru with north-western Karnataka." },
    character: { kn: "ತೆಂಗು-ಅಡಿಕೆ ತೋಟಗಳು, ಗ್ರಾನೈಟ್ ಬೆಟ್ಟಗಳು, ಮಠ-ಶಿಕ್ಷಣ ಪರಂಪರೆ ಮತ್ತು ಕೈಗಾರಿಕಾ ಬೆಳವಣಿಗೆ ಜಿಲ್ಲೆಯ ಸ್ವರೂಪ.", en: "Coconut and areca gardens, granite hills, monastic and educational traditions, and industrial growth shape the district." },
    highlights: [
      { name: { kn: "ದೇವರಾಯನದುರ್ಗ", en: "Devarayanadurga" }, description: { kn: "ಬೆಟ್ಟದ ಕೋಟೆ ಗುರುತುಗಳು, ದೇವಾಲಯಗಳು ಮತ್ತು ಕಾಡಿನ ನಡಿಗೆ ನೋಡಿ.", en: "Explore hill-fort remains, temples, and forested walking routes." } },
      { name: { kn: "ಸಿದ್ಧಗಂಗಾ", en: "Siddaganga" }, description: { kn: "ದಾಸೋಹ, ಶಿಕ್ಷಣ ಮತ್ತು ಮಠದ ಸಾಮಾಜಿಕ ಸೇವಾ ಪರಂಪರೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Learn about a major tradition of education, community meals, and social service." } },
      { name: { kn: "ಮಧುಗಿರಿ", en: "Madhugiri" }, description: { kn: "ಏಕಶಿಲಾ ಬೆಟ್ಟದ ಕೋಟೆಯ ಏರುಗಡೆಯನ್ನು ಹವಾಮಾನ ಮತ್ತು ಸುರಕ್ಷತೆ ಗಮನಿಸಿ ಅನುಭವಿಸಿ.", en: "Climb the monolithic hill fort with weather, fitness, and safety in mind." } },
    ],
  },
  udupi: {
    history: { kn: "ತುಳುವಿನಲ್ಲಿ ‘ಒಡಿಪು’ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಉಡುಪಿ, ಮಧ್ವಾಚಾರ್ಯರ ಕೃಷ್ಣ ಮಠ ಪರಂಪರೆ, ಕರಾವಳಿ ವ್ಯಾಪಾರ ಮತ್ತು ಜೈನ-ಹಿಂದೂ ಸ್ಮಾರಕಗಳ ನೆಲ. 1997ರಲ್ಲಿ ದಕ್ಷಿಣ ಕನ್ನಡದಿಂದ ಪ್ರತ್ಯೇಕ ಜಿಲ್ಲೆಯಾಯಿತು.", en: "Known as Odipu in Tulu, Udupi is shaped by Madhvacharya’s Krishna Matha tradition, coastal trade, and Jain and Hindu heritage. It became a separate district from Dakshina Kannada in 1997." },
    character: { kn: "ತುಳು, ಕನ್ನಡ, ಕೊಂಕಣಿ ಮತ್ತು ಬ್ಯಾರಿ ಭಾಷೆಗಳು; ಯಕ್ಷಗಾನ, ಭೂತಕೋಲ, ಉಡುಪಿ ಅಡುಗೆ, ಮೀನುಗಾರಿಕೆ ಮತ್ತು ಸಮುದ್ರಜೀವನ ಇಲ್ಲಿ ಒಂದಾಗುತ್ತವೆ.", en: "Tulu, Kannada, Konkani, and Beary; Yakshagana, Bhoota Kola, Udupi cuisine, fishing, and maritime life all meet here." },
    highlights: [
      { name: { kn: "ಉಡುಪಿ ಕೃಷ್ಣ ಮಠ", en: "Udupi Sri Krishna Matha" }, description: { kn: "ಅಷ್ಟಮಠ ವ್ಯವಸ್ಥೆ, ಕನಕನ ಕಿಂಡಿ ಮತ್ತು ಜೀವಂತ ಮಠ-ನಗರ ಸಂಸ್ಕೃತಿಯನ್ನು ನೋಡಿ.", en: "Learn about the eight-matha system, Kanakana Kindi, and a living temple-town culture." } },
      { name: { kn: "ಮಲ್ಪೆ ಮತ್ತು ಸೇಂಟ್ ಮೇರೀಸ್ ದ್ವೀಪ", en: "Malpe & St Mary’s Island" }, description: { kn: "ಮೀನುಗಾರಿಕಾ ಬಂದರು, ಕಡಲತೀರ ಮತ್ತು ವಿಶಿಷ್ಟ ಬಸಾಲ್ಟ್ ಶಿಲಾರಚನೆ ನೋಡಿ; ದೋಣಿ-ಹವಾಮಾನ ಸೂಚನೆ ಪಾಲಿಸಿ.", en: "See the fishing harbour, beach, and unusual basalt formations; follow boat and weather advisories." } },
      { name: { kn: "ಕರ್ಕಳ ಮತ್ತು ಬಾರಕೂರು", en: "Karkala & Barkur" }, description: { kn: "ಗೊಮ್ಮಟೇಶ್ವರ, ಜೈನ ಬಸದಿ, ದೇವಾಲಯಗಳು ಮತ್ತು ಹಳೆಯ ತುಳುನಾಡಿನ ರಾಜಕೀಯ ನೆನಪುಗಳನ್ನು ನೋಡಿ.", en: "Explore Gommateshwara, Jain basadis, temples, and memories of old Tulunadu polities." } },
    ],
  },
  "uttara-kannada": {
    history: { kn: "ಪ್ರಾಚೀನ ಬನವಾಸಿ ಕದಂಬರ ರಾಜಧಾನಿಯಾಗಿತ್ತು; ನಂತರ ಈ ಪ್ರದೇಶ ವಿಜಯನಗರ, ಸೋಂದೆ, ಕೆಳದಿ, ಮರಾಠ ಮತ್ತು ಬ್ರಿಟಿಷ್ ಕಾಲಗಳನ್ನು ಕಂಡಿತು. ಕರಾವಳಿ ಬಂದರುಗಳು ಮತ್ತು ಘಟ್ಟಮಾರ್ಗಗಳು ಅದರ ಇತಿಹಾಸವನ್ನು ಜೋಡಿಸಿವೆ.", en: "Ancient Banavasi was a Kadamba capital; the region later passed through Vijayanagara, Sonda, Keladi, Maratha, and British periods. Coastal ports and ghat routes connect its history." },
    character: { kn: "ಅರಬ್ಬೀ ಸಮುದ್ರ, ದಟ್ಟ ಪಶ್ಚಿಮ ಘಟ್ಟ, ಕಾಳಿ-ಶರಾವತಿ ನದಿಗಳು, ಕನ್ನಡ-ಕೊಂಕಣಿ ಸಮುದಾಯಗಳು ಮತ್ತು ಯಕ್ಷಗಾನ ಸಂಸ್ಕೃತಿ ಇದರ ಗುರುತು.", en: "The Arabian Sea, dense Western Ghats, Kali and Sharavathi rivers, Kannada-Konkani communities, and Yakshagana define it." },
    highlights: [
      { name: { kn: "ಗೋಕರ್ಣ", en: "Gokarna" }, description: { kn: "ಪ್ರಾಚೀನ ದೇವಾಲಯ ಪಟ್ಟಣ, ಕಡಲತೀರಗಳು ಮತ್ತು ಬದಲಾಗುತ್ತಿರುವ ಯಾತ್ರೆ-ಪ್ರವಾಸ ಸಂಸ್ಕೃತಿಯನ್ನು ನೋಡಿ.", en: "Explore an old temple town, beaches, and the changing meeting of pilgrimage and tourism." } },
      { name: { kn: "ದಾಂಡೇಲಿ ಮತ್ತು ಕಾಳಿ ನದಿ", en: "Dandeli & Kali River" }, description: { kn: "ಅರಣ್ಯ, ಪಕ್ಷಿಜೀವನ ಮತ್ತು ನಿಯಂತ್ರಿತ ಸಾಹಸ ಚಟುವಟಿಕೆಗಳನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ಅನುಭವಿಸಿ.", en: "Experience forests, birdlife, and regulated river activities responsibly." } },
      { name: { kn: "ಬನವಾಸಿ ಮತ್ತು ಯಾಣ", en: "Banavasi & Yana" }, description: { kn: "ಕದಂಬರ ಸ್ಮೃತಿ, ಮಧುಕೇಶ್ವರ ದೇವಾಲಯ ಮತ್ತು ಕಪ್ಪು ಸುಣ್ಣಗಲ್ಲಿನ ಶಿಖರಗಳನ್ನು ನೋಡಿ.", en: "Discover Kadamba memory, Madhukeshwara Temple, and Yana’s dark limestone formations." } },
    ],
  },
  vijayanagara: {
    history: { kn: "2021ರಲ್ಲಿ ಬಳ್ಳಾರಿಯಿಂದ ಪ್ರತ್ಯೇಕಗೊಂಡ ವಿಜಯನಗರ ಜಿಲ್ಲೆ, ಹಂಪಿಯ ವಿಶ್ವಪಾರಂಪರ್ಯ ಮತ್ತು ತುಂಗಭದ್ರಾ ಕಣಿವೆಯ ಮೂಲಕ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಹೃದಯಭೂಮಿಯನ್ನು ಒಳಗೊಂಡಿದೆ.", en: "Created from Ballari in 2021, Vijayanagara district contains the imperial heartland of the Vijayanagara empire around Hampi and the Tungabhadra valley." },
    character: { kn: "ವಿಶಾಲ ಬಂಡೆಭೂಮಿ, ಸಾಮ್ರಾಜ್ಯದ ಅವಶೇಷಗಳು, ಬಾಳೆ ತೋಟಗಳು, ಲಂಬಾಣಿ ಕರಕುಶಲ ಮತ್ತು ಜೀವಂತ ಗ್ರಾಮ-ಯಾತ್ರಾ ಸಂಸ್ಕೃತಿ ಇದರ ಗುರುತು.", en: "A vast boulder landscape, imperial ruins, banana fields, Lambani craft, and living village and pilgrimage cultures define it." },
    highlights: [
      { name: { kn: "ಹಂಪಿ", en: "Hampi" }, description: { kn: "ವಿರೂಪಾಕ್ಷ, ವಿಠ್ಠಲ, ಅರಮನೆ ವಲಯ ಮತ್ತು ತುಂಗಭದ್ರಾ ತೀರವನ್ನು ಹಲವು ದಿನಗಳಲ್ಲಿ ನಿಧಾನವಾಗಿ ಅನ್ವೇಷಿಸಿ.", en: "Explore Virupaksha, Vittala, the royal centre, and the Tungabhadra river landscape over more than one day." } },
      { name: { kn: "ದಾರೋಜಿ ಮತ್ತು ಕಮಲಾಪುರ", en: "Daroji & Kamalapura" }, description: { kn: "ಕರಡಿ ಸಂರಕ್ಷಣಾ ಭೂದೃಶ್ಯ ಮತ್ತು ಪುರಾತತ್ವ ಸಂಗ್ರಹಾಲಯವನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ನೋಡಿ.", en: "Visit the sloth-bear conservation landscape and archaeological museum responsibly." } },
      { name: { kn: "ಕೊಟ್ಟೂರು ಮತ್ತು ಹಗರಿಬೊಮ್ಮನಹಳ್ಳಿ", en: "Kotturu & Hagaribommanahalli" }, description: { kn: "ಜಿಲ್ಲೆಯ ಗ್ರಾಮೀಣ ಜಾತ್ರೆ, ಕೃಷಿ ಮತ್ತು ಸ್ಥಳೀಯ ಆಹಾರ ಜೀವನವನ್ನು ಅರಿಯಿರಿ.", en: "Discover the district beyond Hampi through rural fairs, farming, and local foodways." } },
    ],
  },
  vijayapura: {
    history: { kn: "ಚಾಲುಕ್ಯ ನೆಲೆಯ ಮೇಲೇರಿ ಆದಿಲ್ ಶಾಹಿ ಸುಲ್ತಾನರ ರಾಜಧಾನಿಯಾಗಿ ವಿಜಯಪುರವು ದಖನ್‌ನ ಮಹಾನ್ ವಾಸ್ತುನಗರವಾಯಿತು. ಗುಮ್ಮಟ, ಮಸೀದಿ, ಸಮಾಧಿ ಮತ್ತು ಜಲವ್ಯವಸ್ಥೆಗಳು ಆ ಯುಗವನ್ನು ಉಳಿಸಿವೆ.", en: "Building on earlier Chalukya foundations, Vijayapura became the Adil Shahi capital and one of the Deccan’s great architectural cities. Domes, mosques, tombs, and water systems preserve that era." },
    character: { kn: "ದಖನಿ ಸಂಗೀತ-ಕಲೆ, ಕನ್ನಡ-ಉರ್ದು ಸಂಸ್ಕೃತಿ, ದ್ರಾಕ್ಷಿ-ದಾಳಿಂಬೆ ಕೃಷಿ ಮತ್ತು ಗಂಭೀರ ಕಲ್ಲಿನ ಸ್ಮಾರಕಗಳು ಜಿಲ್ಲೆಯ ಗುರುತು.", en: "Deccani music and art, Kannada-Urdu culture, grape and pomegranate farming, and monumental stone architecture define it." },
    highlights: [
      { name: { kn: "ಗೋಲ ಗುಂಬಜ್", en: "Gol Gumbaz" }, description: { kn: "ಬೃಹತ್ ಗುಮ್ಮಟ, ಪ್ರತಿಧ್ವನಿ ಗ್ಯಾಲರಿ ಮತ್ತು ಆದಿಲ್ ಶಾಹಿ ಸಮಾಧಿ ವಾಸ್ತು ನೋಡಿ.", en: "Experience the great dome, whispering gallery, and Adil Shahi funerary architecture." } },
      { name: { kn: "ಇಬ್ರಾಹಿಂ ರೌಜಾ", en: "Ibrahim Rauza" }, description: { kn: "ಸಮತೋಲನದ ಮಸೀದಿ-ಸಮಾಧಿ ಸಮೂಹ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಕಲ್ಲಿನ ಜಾಲಿಗಳನ್ನು ನೋಡಿ.", en: "Study a finely balanced mosque-tomb ensemble and delicate stone screens." } },
      { name: { kn: "ಬಾರಾ ಕಮಾನ್ ಮತ್ತು ನಗರ ಜಲವ್ಯವಸ್ಥೆ", en: "Bara Kaman & historic waterworks" }, description: { kn: "ಅಪೂರ್ಣ ಸ್ಮಾರಕ ಮತ್ತು ನಗರದ ಭೂಗತ ಜಲವಾಹಿನಿಗಳ ಕಥೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Learn from an unfinished monument and the city’s sophisticated historic water systems." } },
    ],
  },
  yadgiri: {
    history: { kn: "ಯಾದಗಿರಿ ಬೆಟ್ಟಕೋಟೆಯ ಸುತ್ತ ಬೆಳೆದ ಈ ಪ್ರದೇಶವು ಚಾಲುಕ್ಯ, ಯಾದವ, ಬಹಮನಿ ಮತ್ತು ಸುರಪುರ ನಾಯಕರ ಇತಿಹಾಸವನ್ನು ಹೊಂದಿದೆ. 2010ರಲ್ಲಿ ಕಲಬುರಗಿಯಿಂದ ಪ್ರತ್ಯೇಕ ಜಿಲ್ಲೆಯಾಯಿತು.", en: "Growing around its hill fort, Yadgiri carries Chalukya, Yadava, Bahmani, and Surapura Nayaka histories. It became a separate district from Kalaburagi in 2010." },
    character: { kn: "ಭೀಮಾ-ಕೃಷ್ಣಾ ನದಿಭೂಮಿ, ಒಣಭೂಮಿ ಕೃಷಿ, ಸುರಪುರ ಚಿತ್ರಕಲೆ ಮತ್ತು ಕೋಟೆ-ಜಾತ್ರೆಗಳ ಗ್ರಾಮೀಣ ಸಂಸ್ಕೃತಿ ಇದರ ಗುರುತು.", en: "The Bhima-Krishna river country, dryland farming, Surapura painting, and a rural culture of forts and fairs define it." },
    highlights: [
      { name: { kn: "ಯಾದಗಿರಿ ಕೋಟೆ", en: "Yadgiri Fort" }, description: { kn: "ಬಂಡೆಬೆಟ್ಟದ ಕೋಟೆಗೋಡೆ, ಜಲಸಂಗ್ರಹ ಮತ್ತು ಪಟ್ಟಣದ ವಿಶಾಲ ದೃಶ್ಯ ನೋಡಿ.", en: "Explore hilltop walls, water structures, and broad views over the town." } },
      { name: { kn: "ಸುರಪುರ", en: "Surapura" }, description: { kn: "ನಾಯಕ ಅರಮನೆಗಳ ನೆನಪು, ಸ್ಥಳೀಯ ಚಿತ್ರಕಲೆ ಮತ್ತು 1857ರ ಹೋರಾಟದ ಕಥೆಯನ್ನು ಅರಿಯಿರಿ.", en: "Discover Nayaka court memories, local painting, and the region’s story in the 1857 uprising." } },
      { name: { kn: "ಬೋನಾಳ ಪಕ್ಷಿಧಾಮ", en: "Bonal Bird Sanctuary" }, description: { kn: "ಋತುಮಾನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಜಲಪಕ್ಷಿಗಳನ್ನು ಮೌನವಾಗಿ ಮತ್ತು ಜವಾಬ್ದಾರಿಯಿಂದ ನೋಡಿ.", en: "Observe seasonal waterbirds quietly and responsibly." } },
    ],
  },
} satisfies Record<string, DistrictLearning>;
