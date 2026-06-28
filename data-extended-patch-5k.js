// ============================================================
// CHRONOS — data-extended-patch-5k.js
// Phase 5k: Extended metadata for civilizations 151–180
// Apply by merging entries into CIV_META object in data-extended.js
// ============================================================

const CIV_META_PATCH_5K = {

  // ── CONFIRMED AFRICAN KINGDOMS ──────────────────────────────────────

  151: {
    lang: "niger-congo",
    rel:  "polytheist",
    gov:  "monarchy",
    pop:  "large",
    tags: ["bronze-art", "west-africa", "yoruba-adjacent", "oba", "british-colonialism", "looted-heritage"],
    locationType: "A",
    locationTheories: [],
  },

  152: {
    lang: "niger-congo",
    rel:  "polytheist",
    gov:  "monarchy",
    pop:  "large",
    tags: ["yoruba", "cavalry", "west-africa", "slave-trade", "constitutional-monarchy"],
    locationType: "A",
    locationTheories: [],
  },

  153: {
    lang: "nilo-saharan",
    rel:  "islamic",
    gov:  "sultanate",
    pop:  "medium",
    tags: ["sudan", "islamic", "nile", "post-nubian", "medieval-africa"],
    locationType: "B",
    locationTheories: [
      {
        lat: 13.55, lng: 33.60,
        label: "Sennar capital — mainstream consensus site on Blue Nile",
        source: "Encyclopædia Britannica",
        researcher: null,
        up: 480, dn: 22,
      },
      {
        lat: 15.55, lng: 32.53,
        label: "Khartoum region — alternative locus of early Funj power (Spaulding)",
        source: "Heroic Age in Sinnar (2007)",
        researcher: "Jay Spaulding",
        up: 140, dn: 210,
      }
    ],
  },

  154: {
    lang: "afro-asiatic",
    rel:  "islamic",
    gov:  "empire",
    pop:  "large",
    tags: ["trans-saharan-trade", "lake-chad", "longest-surviving-empire", "central-africa"],
    locationType: "A",
    locationTheories: [],
  },

  // ── CONFIRMED ASIAN CIVILIZATIONS ────────────────────────────────────

  155: {
    lang: "dravidian",
    rel:  "polytheist",
    gov:  "monarchy",
    pop:  "large",
    tags: ["india", "odisha", "temple-architecture", "konark", "jagannath", "naval"],
    locationType: "A",
    locationTheories: [],
  },

  156: {
    lang: "dravidian",
    rel:  "polytheist",
    gov:  "monarchy",
    pop:  "large",
    tags: ["south-india", "dravidian-architecture", "mamallapuram", "script-ancestor", "southeast-asia-influence"],
    locationType: "A",
    locationTheories: [],
  },

  157: {
    lang: "austronesian",
    rel:  "buddhist",
    gov:  "thalassocracy",
    pop:  "large",
    tags: ["maritime", "southeast-asia", "silk-road", "buddhism", "sumatra", "malacca-strait"],
    locationType: "A",
    locationTheories: [],
  },

  158: {
    lang: "austronesian",
    rel:  "polytheist",
    gov:  "empire",
    pop:  "large",
    tags: ["java", "southeast-asia", "hindu-buddhist", "maritime", "indonesia", "gajah-mada"],
    locationType: "A",
    locationTheories: [],
  },

  // ── CONFIRMED AMERICAS & OCEANIA ─────────────────────────────────────

  159: {
    lang: "muskogean",
    rel:  "polytheist",
    gov:  "chiefdom",
    pop:  "large",
    tags: ["north-america", "mound-builder", "cahokia", "maize", "pre-columbian", "mississippi"],
    locationType: "A",
    locationTheories: [],
  },

  160: {
    lang: "isolate",
    rel:  "polytheist",
    gov:  "theocracy",
    pop:  "large",
    tags: ["andes", "bolivia", "lake-titicaca", "pre-inca", "gateway-of-the-sun", "flood-myth", "posnansky"],
    locationType: "B",
    locationTheories: [
      {
        lat: -16.55, lng: -68.67,
        label: "Tiwanaku — mainstream archaeological site, southern Lake Titicaca shore",
        source: "Encyclopædia Britannica / Smith et al. (2018)",
        researcher: null,
        up: 1240, dn: 45,
      },
      {
        lat: -16.55, lng: -68.67,
        label: "Posnansky — same location but 15,000 BCE construction date based on astronomical alignment",
        source: "Tiahuanacu: The Cradle of American Man (1945)",
        researcher: "Arthur Posnansky",
        up: 520, dn: 1840,
      }
    ],
  },

  161: {
    lang: "austronesian",
    rel:  "polytheist",
    gov:  "chiefdom",
    pop:  "small",
    tags: ["pacific", "oceania", "maritime", "polynesian-ancestor", "pottery", "voyaging"],
    locationType: "A",
    locationTheories: [],
  },

  162: {
    lang: "polynesian",
    rel:  "polytheist",
    gov:  "chiefdom",
    pop:  "medium",
    tags: ["pacific", "hawaii", "polynesian", "mana", "kapu", "ali'i", "voyaging"],
    locationType: "A",
    locationTheories: [],
  },

  // ── CONFIRMED CENTRAL ASIA ───────────────────────────────────────────

  163: {
    lang: "iranian",
    rel:  "zoroastrian",
    gov:  "city-state",
    pop:  "medium",
    tags: ["silk-road", "merchant", "central-asia", "samarkand", "bukhara", "script-ancestor"],
    locationType: "A",
    locationTheories: [],
  },

  164: {
    lang: "unknown",
    rel:  "polytheist",
    gov:  "unknown",
    pop:  "medium",
    tags: ["bronze-age", "central-asia", "oxus", "proto-writing", "indus-contact", "urban"],
    locationType: "B",
    locationTheories: [
      {
        lat: 37.90, lng: 60.08,
        label: "Gonur Depe — primary excavated BMAC site (Sarianidi)",
        source: "Margiana and Protozoroastrism (1998)",
        researcher: "Viktor Sarianidi",
        up: 620, dn: 38,
      },
      {
        lat: 37.25, lng: 67.27,
        label: "Dashly Oasis (Afghanistan) — major BMAC temple-palace complex",
        source: "BMAC Survey (Hiebert, 1994)",
        researcher: null,
        up: 380, dn: 42,
      }
    ],
  },

  165: {
    lang: "turkic",
    rel:  "jewish",
    gov:  "khaganate",
    pop:  "medium",
    tags: ["steppe", "jewish-state", "medieval", "silk-road", "volga", "caspian", "koestler"],
    locationType: "B",
    locationTheories: [
      {
        lat: 46.00, lng: 48.50,
        label: "Atil capital — Volga delta, mainstream consensus (destroyed 968 CE)",
        source: "The Cambridge History of Early Inner Asia (1990)",
        researcher: null,
        up: 780, dn: 55,
      },
      {
        lat: 43.30, lng: 47.00,
        label: "Semender — earlier Khazar capital in Dagestan (some sources)",
        source: "Golden (1980); Brook (2006)",
        researcher: null,
        up: 290, dn: 130,
      }
    ],
  },

  // ── DEBATED ENTRIES ───────────────────────────────────────────────────

  166: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["pyramid", "bosnia", "osmanagic", "debated-artificial", "pre-yd", "tunnel-network", "schoch"],
    locationType: "B",
    locationTheories: [
      {
        lat: 43.98, lng: 18.17,
        label: "Visočica Hill — Osmanagić's Pyramid of the Sun site, Visoko",
        source: "Pyramids of Bosnia (2005)",
        researcher: "Semir Osmanagić",
        up: 2140, dn: 3820,
      },
      {
        lat: 43.97, lng: 18.15,
        label: "Plješevica Hill — Osmanagić's Pyramid of the Moon",
        source: "Pyramids of Bosnia (2005)",
        researcher: "Semir Osmanagić",
        up: 1240, dn: 2640,
      }
    ],
  },

  167: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["stone-circle", "south-africa", "mpumalanga", "tellinger", "anunnaki", "gold-mining", "adam-calendar"],
    locationType: "B",
    locationTheories: [
      {
        lat: -25.07, lng: 30.84,
        label: "Kaap Valley — Tellinger & Heine's primary Adam's Calendar site",
        source: "Adam's Calendar (2008)",
        researcher: "Michael Tellinger",
        up: 1240, dn: 2710,
      },
      {
        lat: -25.50, lng: 31.00,
        label: "Mpumalanga stone circle network — broader Tellinger survey area",
        source: "Temples of the African Gods (2010)",
        researcher: "Michael Tellinger",
        up: 980, dn: 1840,
      }
    ],
  },

  168: {
    lang: "unknown",
    rel:  "polytheist",
    gov:  "unknown",
    pop:  "small",
    tags: ["megalithic", "turkey", "pre-agricultural", "astronomy", "cygnus", "collins", "schmidt", "deliberate-burial"],
    locationType: "A",
    locationTheories: [],
  },

  169: {
    lang: "unknown",
    rel:  "polytheist",
    gov:  "unknown",
    pop:  "medium",
    tags: ["china", "sichuan", "bronze", "mystery-culture", "pre-chinese", "ritual-pits", "2021-discovery"],
    locationType: "A",
    locationTheories: [],
  },

  170: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["submerged", "japan", "yonaguni", "kimura", "hancock", "post-glacial", "sea-level", "debated-artificial"],
    locationType: "B",
    locationTheories: [
      {
        lat: 24.44, lng: 122.94,
        label: "Yonaguni Monument — primary dive site (Kimura surveys)",
        source: "Man-Made Structures off Yonaguni Island (1996)",
        researcher: "Masaaki Kimura",
        up: 2640, dn: 1580,
      },
      {
        lat: 24.47, lng: 123.00,
        label: "Extended Yonaguni seabed — Hancock expanded survey area",
        source: "Underworld (2002)",
        researcher: "Graham Hancock",
        up: 1840, dn: 980,
      }
    ],
  },

  // ── THEORIZED ENTRIES ─────────────────────────────────────────────────

  171: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["thule", "polar", "aryan-myth", "esoteric", "pre-ice-age", "hyperborea", "theosophical"],
    locationType: "C",
    locationTheories: [],
  },

  172: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["pre-clovis", "north-america", "pre-flood", "younger-dryas", "hancock", "carlson", "flood-myth"],
    locationType: "C",
    locationTheories: [],
  },

  173: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["mu", "lemuria", "pacific", "sunken-continent", "churchward", "theosophical", "flood-myth"],
    locationType: "C",
    locationTheories: [],
  },

  174: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["tartaria", "hyperborea", "siberia", "reset-theory", "mud-flood", "internet-theory", "eurasian"],
    locationType: "C",
    locationTheories: [],
  },

  175: {
    lang: "unknown",
    rel:  "unknown",
    gov:  "unknown",
    pop:  "unknown",
    tags: ["antarctica", "hapgood", "crustal-displacement", "piri-reis", "hancock", "atlantis", "pre-ice-age"],
    locationType: "C",
    locationTheories: [],
  },

  // ── ADDITIONAL CONFIRMED GAPS ─────────────────────────────────────────

  176: {
    lang: "semitic",
    rel:  "christian",
    gov:  "empire",
    pop:  "large",
    tags: ["ethiopia", "horn-of-africa", "christian", "red-sea-trade", "obelisk", "ark-of-covenant", "aksumite"],
    locationType: "A",
    locationTheories: [],
  },

  177: {
    lang: "bantu",
    rel:  "polytheist",
    gov:  "monarchy",
    pop:  "small",
    tags: ["south-africa", "limpopo", "gold", "indian-ocean-trade", "great-zimbabwe-precursor", "bantu"],
    locationType: "A",
    locationTheories: [],
  },

  178: {
    lang: "chimuan",
    rel:  "polytheist",
    gov:  "empire",
    pop:  "large",
    tags: ["peru", "andes", "chan-chan", "hydraulic-engineering", "pre-inca", "adobe", "north-coast"],
    locationType: "A",
    locationTheories: [],
  },

  179: {
    lang: "muskogean",
    rel:  "polytheist",
    gov:  "chiefdom",
    pop:  "medium",
    tags: ["north-america", "mound-builder", "hopewell", "ohio", "trade-network", "earthworks", "astronomy"],
    locationType: "A",
    locationTheories: [],
  },

  180: {
    lang: "japonic",
    rel:  "animist",
    gov:  "chiefdom",
    pop:  "medium",
    tags: ["japan", "jomon", "oldest-pottery", "hunter-gatherer", "deep-time", "ancient-dna", "sedentism"],
    locationType: "A",
    locationTheories: [],
  },

};

// ── HOW TO APPLY THIS PATCH ──────────────────────────────────────────────
//
// In data-extended.js, find the closing brace of CIV_META:
//   }  // end of CIV_META
//
// Before it, add a spread or paste all entries from CIV_META_PATCH_5K.
// OR: Object.assign(CIV_META, CIV_META_PATCH_5K) at runtime.
//
// Verify: Object.keys(CIV_META).length === 180
// ────────────────────────────────────────────────────────────────────────
