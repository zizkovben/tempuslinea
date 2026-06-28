// ============================================================
// CHRONOS — globe-data-patch-5k.js
// Phase 5k: Globe coordinates for civilizations 151–180
// Apply by merging entries into CIV_COORDS object in globe-data.js
//
// Format:
//   id: { lat, lng, zoom?, label? }
//
// Type C civs (theorized, no primary marker) receive a centroid
// lat/lng for fallback but their globe representation is handled
// entirely by the heat map in globe-pins.js — no marker is placed.
//
// Verify after: Object.keys(CIV_COORDS).length === 180
// ============================================================

const CIV_COORDS_PATCH_5K = {

  // ── CONFIRMED AFRICAN KINGDOMS ──────────────────────────────────────

  // 151 — Benin Empire: Benin City, Nigeria
  151: { lat: 6.335, lng: 5.627, zoom: 5, label: "Benin City, Nigeria" },

  // 152 — Oyo Empire: Old Oyo (Katunga), Nigeria
  152: { lat: 8.933, lng: 3.983, zoom: 5, label: "Old Oyo (Katunga), Nigeria" },

  // 153 — Funj Sultanate: Sennar, Sudan (capital on Blue Nile)
  153: { lat: 13.551, lng: 33.617, zoom: 5, label: "Sennar, Sudan" },

  // 154 — Kanem-Bornu: N'Djamena / Lake Chad basin
  154: { lat: 12.107, lng: 15.044, zoom: 4, label: "Lake Chad Basin" },

  // ── CONFIRMED ASIAN CIVILIZATIONS ────────────────────────────────────

  // 155 — Ganga Dynasty: Bhubaneswar / Puri region, Odisha
  155: { lat: 19.898, lng: 85.018, zoom: 5, label: "Bhubaneswar, Odisha, India" },

  // 156 — Pallava Empire: Kanchipuram, Tamil Nadu
  156: { lat: 12.837, lng: 79.703, zoom: 5, label: "Kanchipuram, Tamil Nadu, India" },

  // 157 — Srivijaya: Palembang, Sumatra (primary capital)
  157: { lat: -2.976, lng: 104.775, zoom: 4, label: "Palembang, Sumatra" },

  // 158 — Majapahit: Trowulan, East Java (capital ruins)
  158: { lat: -7.556, lng: 112.393, zoom: 5, label: "Trowulan, East Java, Indonesia" },

  // ── CONFIRMED AMERICAS & OCEANIA ─────────────────────────────────────

  // 159 — Mississippian: Cahokia, near St. Louis
  159: { lat: 38.655, lng: -90.062, zoom: 5, label: "Cahokia Mounds, Illinois, USA" },

  // 160 — Tiwanaku: Tiwanaku site, Bolivia (southern Lake Titicaca shore)
  160: { lat: -16.554, lng: -68.674, zoom: 5, label: "Tiwanaku, Bolivia" },

  // 161 — Lapita: Bismarck Archipelago centroid (origin zone)
  161: { lat: -4.500, lng: 152.500, zoom: 3, label: "Bismarck Archipelago, Papua New Guinea" },

  // 162 — Hawaiian Chiefdoms: Big Island / Kohala region (earliest settlement evidence)
  162: { lat: 20.245, lng: -155.825, zoom: 5, label: "Kohala, Hawaii, USA" },

  // ── CONFIRMED CENTRAL ASIA ───────────────────────────────────────────

  // 163 — Sogdian: Samarkand (ancient Marakanda)
  163: { lat: 39.627, lng: 66.975, zoom: 5, label: "Samarkand, Uzbekistan" },

  // 164 — BMAC: Gonur Depe, Turkmenistan (primary excavation site)
  164: { lat: 37.897, lng: 62.083, zoom: 4, label: "Gonur Depe, Turkmenistan (BMAC)" },

  // 165 — Khazar Khaganate: Atil capital, Volga Delta
  165: { lat: 46.347, lng: 48.033, zoom: 4, label: "Atil (Volga Delta), Russia" },

  // ── DEBATED ENTRIES ───────────────────────────────────────────────────

  // 166 — Bosnian Pyramids: Visoko, Bosnia (Visočica Hill)
  166: { lat: 43.981, lng: 18.167, zoom: 7, label: "Visoko, Bosnia and Herzegovina" },

  // 167 — Adam's Calendar: Mpumalanga, South Africa
  167: { lat: -25.070, lng: 30.840, zoom: 7, label: "Kaap Valley, Mpumalanga, South Africa" },

  // 168 — Göbekli Tepe Builders: Şanlıurfa Province, Turkey
  168: { lat: 37.223, lng: 38.922, zoom: 7, label: "Göbekli Tepe, Şanlıurfa, Turkey" },

  // 169 — Sanxingdui: Guanghan, Sichuan, China
  169: { lat: 31.010, lng: 104.415, zoom: 6, label: "Sanxingdui, Guanghan, Sichuan, China" },

  // 170 — Yonaguni Monument: Yonaguni Island, Japan (submerged SE shore)
  170: { lat: 24.437, lng: 122.944, zoom: 8, label: "Yonaguni Monument (submerged), Japan" },

  // ── THEORIZED ENTRIES (Type C — centroid for fallback only) ──────────

  // 171 — Thule Civilization: North Pole centroid (no primary marker — heat map only)
  171: { lat: 72.000, lng: 0.000, zoom: 2, label: "Northern Polar Region (theorized)" },

  // 172 — Pre-Flood North American Culture: mid-continent centroid
  172: { lat: 39.000, lng: -98.000, zoom: 2, label: "North America (theorized — multiple sites)" },

  // 173 — Mu / Pacific Lemuria: central Pacific centroid
  173: { lat: -10.000, lng: -150.000, zoom: 2, label: "Pacific Ocean Basin (theorized)" },

  // 174 — Tartaria / Hyperborea: Siberian centroid
  174: { lat: 60.000, lng: 90.000, zoom: 2, label: "Central Siberia / Eurasia (theorized)" },

  // 175 — Antarctic Pre-Ice Civilization: Antarctica centroid
  175: { lat: -80.000, lng: -60.000, zoom: 2, label: "Antarctica (theorized)" },

  // ── ADDITIONAL CONFIRMED GAPS ─────────────────────────────────────────

  // 176 — Aksumite Empire: Aksum, Ethiopia
  176: { lat: 14.129, lng: 38.721, zoom: 5, label: "Aksum, Ethiopia" },

  // 177 — Mapungubwe: Limpopo Valley confluence, South Africa
  177: { lat: -22.198, lng: 29.342, zoom: 6, label: "Mapungubwe Hill, Limpopo, South Africa" },

  // 178 — Chimú Empire: Chan Chan, La Libertad, Peru
  178: { lat: -8.109, lng: -79.074, zoom: 6, label: "Chan Chan, Trujillo, Peru" },

  // 179 — Hopewell: Newark Earthworks / Mound City, Ohio
  179: { lat: 40.060, lng: -82.408, zoom: 6, label: "Newark Earthworks, Ohio, USA" },

  // 180 — Jōmon Culture: Sannai-Maruyama site, Aomori (largest Jōmon settlement)
  180: { lat: 40.810, lng: 140.697, zoom: 6, label: "Sannai-Maruyama, Aomori, Japan" },

};

// ── HOW TO APPLY THIS PATCH ──────────────────────────────────────────────
//
// In globe-data.js, find the closing brace of CIV_COORDS:
//   }  // end of CIV_COORDS
//
// Before it, paste all entries from CIV_COORDS_PATCH_5K.
// OR: Object.assign(CIV_COORDS, CIV_COORDS_PATCH_5K) at runtime.
//
// Verify: Object.keys(CIV_COORDS).length === 180
//
// NOTE: Type C entries (ids 171–175) have centroid coords for camera
// targeting only. globe-pins.js will suppress the primary marker for
// these and render heat maps instead. No change to globe-pins.js logic
// is required — it reads locationType from CIV_META which is already
// set to "C" in data-extended-patch-5k.js.
// ────────────────────────────────────────────────────────────────────────
