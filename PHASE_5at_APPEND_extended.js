/* ============================================================
   CHRONOS · PHASE 5at — APPEND to data-extended.js
   CIV_META entries for civilizations 1001–1030.
   Append only — merge these into the CIV_META object in
   data-extended.js, keyed by id (ascending order preserved below).

   ⚠️ UPDATE: added the `rel` (religion) and `pop` (population) fields
   documented in the real README.md, which the original draft omitted
   entirely. `pop` uses the documented enum (micro/small/medium/large/
   mega/unknown) with a reasonable estimate per civ. `rel` is set to
   "unknown" for all 30 entries — the README references FILTER_DEFS
   for the valid religion key list, which wasn't available to fetch,
   so these are safe placeholders rather than guessed enum values.
   Worth a pass to fill in real religion tags once you can share
   FILTER_DEFS's valid key list.
   ============================================================ */

const PHASE_5at_APPEND_META = {

  1001: { locationType: "A", rel: "unknown", pop: "small", tags: ["megalith", "astronomy", "neolithic", "africa"],
    sources: ["Nabta Playa site reports (Combined Prehistoric Expedition)"] },

  1002: { locationType: "A", rel: "unknown", pop: "medium", tags: ["bronze-age", "china", "independent-tradition"],
    sources: ["Sanxingdui Museum excavation reports"] },

  1003: { locationType: "A", rel: "unknown", pop: "large", tags: ["neolithic", "mega-site", "europe", "burned-settlements"],
    sources: ["Cucuteni–Trypillia mega-site survey literature"] },

  1004: { locationType: "A", rel: "unknown", pop: "large", tags: ["nile-valley", "pyramids", "africa", "understudied"],
    sources: ["Kushite archaeology, National Museum of Sudan collections"] },

  1005: { locationType: "A", rel: "unknown", pop: "medium", tags: ["stone-architecture", "trade", "africa", "shona"],
    sources: ["Great Zimbabwe World Heritage documentation"] },

  1006: { locationType: "A", rel: "unknown", pop: "medium", tags: ["andes", "cloud-forest", "fortified-city"],
    sources: ["Kuélap excavation reports"] },

  1007: { locationType: "A", rel: "unknown", pop: "medium", tags: ["oldest-americas", "no-warfare-evidence", "urban-origins"],
    sources: ["Caral-Supe archaeological project (Ruth Shady Solís)"] },

  1008: { locationType: "A", rel: "unknown", pop: "large", tags: ["bronze-age-collapse", "diplomacy", "iron-age-transition"],
    sources: ["Hattusa excavation archives, Boğazköy tablets"] },

  1009: { locationType: "A", rel: "unknown", pop: "medium", tags: ["mesopotamia-adjacent", "susa", "undeciphered-script"],
    sources: ["Elamite studies, Susa excavation reports"] },

  1010: { locationType: "A", rel: "unknown", pop: "small", tags: ["trade-hub", "persian-gulf", "burial-mounds"],
    sources: ["Bahrain National Museum, Barbar Temple excavation"] },

  1011: { locationType: "B", rel: "unknown", pop: "unknown", tags: ["egypt-trade-partner", "location-debated", "red-sea"],
    sources: ["Deir el-Bahari reliefs (Hatshepsut expedition)"],
    locationTheories: [
      { lat: 15.2, lng: 39.8, label: "Eritrea–Sudan Red Sea coast (mainstream)", source: "Kitchen, Punt studies", researcher: null, up: 140, dn: 20 },
      { lat: 8.0,  lng: 48.5, label: "Horn of Africa / Somalia coast", source: "Comparative botanical/faunal evidence", researcher: null, up: 90, dn: 25 },
      { lat: 16.5, lng: 44.0, label: "Southern Arabian coast", source: "Alternative trade-route hypothesis", researcher: null, up: 40, dn: 30 }
    ] },

  1012: { locationType: "C", rel: "unknown", pop: "unknown", tags: ["biblical", "gold-source", "location-unresolved"],
    sources: ["Hebrew Bible, 1 Kings 9–10"],
    locationTheories: [
      { lat: 15.5, lng: 47.5, label: "Southern Arabia", source: "Biblical-geography scholarship", researcher: null, up: 70, dn: 30 },
      { lat: -20.3, lng: 30.9, label: "Great Zimbabwe / SE Africa (largely discredited)", source: "Colonial-era misattribution literature", researcher: null, up: 25, dn: 90 },
      { lat: 15.0, lng: 74.0, label: "Western India coast", source: "Trade-route comparative linguistics", researcher: null, up: 45, dn: 25 }
    ] },

  1013: { locationType: "A", rel: "unknown", pop: "medium", tags: ["andes", "megalithic", "archaeoastronomy", "date-disputed"],
    sources: ["Tiahuanacu (1945)"] },

  1014: { locationType: "A", rel: "unknown", pop: "large", tags: ["neolithic-china", "proto-writing", "shang-precursor"],
    sources: ["Longshan culture excavation reports"] },

  1015: { locationType: "A", rel: "unknown", pop: "medium", tags: ["oldest-pottery", "pre-agricultural-complexity", "japan"],
    sources: ["Jōmon period archaeological surveys"] },

  1016: { locationType: "A", rel: "unknown", pop: "small", tags: ["pacific-expansion", "seafaring", "polynesian-ancestry"],
    sources: ["Lapita Pottery Project, Pacific archaeology"] },

  1017: { locationType: "A", rel: "unknown", pop: "large", tags: ["andes", "pre-inca", "road-network", "language-spread"],
    sources: ["Wari state archaeology, Ayacucho Basin surveys"] },

  1018: { locationType: "C", rel: "unknown", pop: "unknown", tags: ["bronze-age-collapse", "origins-disputed", "raiders"],
    sources: ["Egyptian Medinet Habu inscriptions (Ramesses III)"] },

  1019: { locationType: "C", rel: "unknown", pop: "unknown", tags: ["greek-myth", "no-fixed-location", "controversial"],
    sources: ["Herodotus, Histories; Pindar fragments"] },

  1020: { locationType: "B", rel: "unknown", pop: "medium", tags: ["frankincense-trade", "biblical", "location-debated"],
    sources: ["Sabaean inscriptions, Great Dam of Marib archaeology"],
    locationTheories: [
      { lat: 15.4, lng: 44.2, label: "South Arabia / Yemen (mainstream Sabaean state)", source: "Sabaean epigraphy", researcher: null, up: 180, dn: 20 },
      { lat: 11.6, lng: 37.4, label: "Horn of Africa / Ethiopia (Kebra Nagast tradition)", source: "Kebra Nagast", researcher: null, up: 95, dn: 40 }
    ] },

  1021: { locationType: "A", rel: "unknown", pop: "small", tags: ["sahara", "irrigation-engineering", "trans-saharan-trade"],
    sources: ["Fezzan Project (Society for Libyan Studies)"] },

  1022: { locationType: "A", rel: "unknown", pop: "small", tags: ["pre-agricultural-monument", "mississippi-valley", "earthworks"],
    sources: ["Poverty Point World Heritage nomination documentation"] },

  1023: { locationType: "A", rel: "unknown", pop: "small", tags: ["moai", "polynesia", "undeciphered-script", "colonial-impact"],
    sources: ["Rapa Nui archaeological and demographic revisionist literature"] },

  1024: { locationType: "A", rel: "unknown", pop: "large", tags: ["historicity-disputed", "china", "erlitou"],
    sources: ["Sima Qian, Records of the Grand Historian", "Erlitou excavation reports"] },

  1025: { locationType: "A", rel: "unknown", pop: "small", tags: ["arctic", "inuit-ancestry", "migration"],
    sources: ["Thule migration archaeological surveys"] },

  1026: { locationType: "C", rel: "unknown", pop: "unknown", tags: ["lost-continent", "pacific", "pseudoscience-adjacent", "controversial"],
    sources: ["19th–20th century esoteric literature (unattributed per bible researcher policy)"] },

  1027: { locationType: "A", rel: "unknown", pop: "small", tags: ["aegean", "figurines", "pre-minoan"],
    sources: ["Cycladic Art Museum collections, Athens"] },

  1028: { locationType: "A", rel: "unknown", pop: "unknown", tags: ["pseudoarchaeology", "controversial", "geology-disputed"],
    sources: ["Pyramids of Bosnia (2005)", "European Association of Archaeologists statement (2006)"] },

  1029: { locationType: "A", rel: "unknown", pop: "small", tags: ["pre-pottery-neolithic", "gobekli-tepe-sister-site", "hunter-gatherer-monument"],
    sources: ["Karahan Tepe excavation reports (Necmi Karul)"] },

  1030: { locationType: "C", rel: "unknown", pop: "unknown", tags: ["antarctica", "crustal-displacement", "controversial", "no-fixed-location"],
    sources: ["Earth's Shifting Crust (1958)"] },

};
