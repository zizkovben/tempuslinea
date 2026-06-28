/* ═══════════════════════════════════════════════════════════════════════════
   CHRONOS — globe-data-patch-5a.js
   CIV_COORDS for ids 89–120. Patch for globe-data.js.

   INTEGRATION: The existing globe-data.js has ids 89–115 with some duplicate
   entries. Replace the entire CIV_COORDS block (from id 89 onwards) with
   the clean version below, or append only the missing ids 116–120.

   Ids 89–90: already in globe-data.js (kept here for reference/verification)
   Ids 91–115: clean/deduplicated versions
   Ids 116–120: new entries

   Phase 5a — Bible v3
   ═══════════════════════════════════════════════════════════════════════════ */

// ── VERIFIED COORDS — ids 89–120 (clean, no duplicates) ──────────────────

    89:  { lat: 31.8,  lng:  35.2 },   // Kingdom of Israel / Jerusalem
    90:  { lat: 33.5,  lng:  36.3 },   // Aramaic / Damascus-Antioch axis
    91:  { lat: 20.8,  lng:-156.4 },   // Hawaii / Maui
    92:  { lat:-21.2,  lng:-175.2 },   // Tonga / Nuku'alofa
    93:  { lat:  6.84, lng: 158.3 },   // Nan Madol / Pohnpei
    94:  { lat: 34.5,  lng:  69.2 },   // Kushan / Kabul region
    95:  { lat: 39.6,  lng:  66.9 },   // Sogdia / Samarkand
    96:  { lat: 44.0,  lng:  50.0 },   // Khazar / Caspian region
    97:  { lat: 39.6,  lng:  66.9 },   // Timurid / Samarkand
    98:  { lat: 36.9,  lng:  25.4 },   // Cycladic / Paros
    99:  { lat: 48.9,  lng:   2.3 },   // Carolingian / Paris region
    100: { lat: 45.4,  lng:  12.3 },   // Venice
    101: { lat: 50.4,  lng:  30.5 },   // Kievan Rus / Kyiv
    102: { lat: 17.0,  lng: -96.7 },   // Zapotec / Monte Alban
    103: { lat: 20.1,  lng: -99.3 },   // Toltec / Tula
    104: { lat: 18.5,  lng: -72.3 },   // Taino / Hispaniola
    105: { lat: 35.0,  lng: -90.0 },   // Mississippian / Cahokia region
    106: { lat: -6.0,  lng:  14.4 },   // Kingdom of Kongo / Mbanza Kongo
    107: { lat:  9.0,  lng:  38.7 },   // Ethiopian Empire / Addis Ababa
    108: { lat:  7.2,  lng:   2.1 },   // Dahomey / Abomey
    109: { lat: 18.5,  lng:  31.8 },   // Nubian Kingdoms / Old Dongola
    110: { lat: 15.3,  lng:  76.5 },   // Vijayanagara / Hampi
    111: { lat: 21.2,  lng:  94.9 },   // Pagan / Bagan, Myanmar
    112: { lat: 37.6,  lng: 126.9 },   // Goryeo / Kaesong-Seoul region
    113: { lat: 10.8,  lng:  79.1 },   // Chola / Thanjavur
    114: { lat: 32.7,  lng:  51.7 },   // Safavid / Isfahan
    115: { lat: 27.2,  lng:  78.0 },   // Mughal / Agra
    116: { lat: 21.1,  lng: -11.4 },   // Richat Structure / Eye of Sahara
    117: { lat:-75.0,  lng: -60.0 },   // Antarctic Pre-Glacial (Hapgood)
    118: { lat: 52.0,  lng: -85.0 },   // YD Impact — Laurentide Ice Sheet
    119: { lat:-16.6,  lng: -68.7 },   // Pre-Flood Andean / Tiwanaku
    120: { lat: 31.0,  lng:  46.0 },   // Anunnaki / Eridu (primary marker)
