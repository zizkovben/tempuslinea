// ============================================================
// CHRONOS data.js — PATCH: dateTheories[] expansions for ids 1–90
// Phase 5 quality pass
//
// HOW TO APPLY:
// For each entry below, find the matching civilization record in data.js
// by its id, and ADD the dateTheories[] array shown.
// If the record already has a dateTheories[] (ids 2,3,4,5,8,23,39,54),
// APPEND the new entries to the existing array — do not replace it.
//
// Civs targeted: all debated/theorized in ids 1–90 not fully covered.
// Confirmed civs are generally excluded unless dates are contested.
// ============================================================

// ── id: 1 — Lemuria ─────────────────────────────────────────
// (t: "theorized") — add dateTheories[]
// APPEND to existing record:
/*
  dateTheories: [
    {
      s: -78000, e: -50000,
      label: "Churchward — Naacal tablet chronology",
      source: "The Lost Continent of Mu, James Churchward (1926)",
      researcher: "James Churchward",
      up: 380, dn: 720,
    },
    {
      s: -200000, e: -50000,
      label: "Steiner — Lemurian root race epoch",
      source: "Cosmic Memory, Rudolf Steiner (1904)",
      researcher: "Rudolf Steiner",
      up: 190, dn: 640,
    },
    {
      s: -12000, e: -8000,
      label: "Scott-Elliot — post-Atlantean Lemurian remnants",
      source: "The Story of Atlantis and Lost Lemuria, Scott-Elliot (1896)",
      researcher: "W. Scott-Elliot",
      up: 210, dn: 580,
    }
  ],
*/

// ── id: 6 — Pre-Dynastic Egypt ──────────────────────────────
// (t: "debated") — add dateTheories[]
/*
  dateTheories: [
    {
      s: -10500, e: -9000,
      label: "Schoch — Sphinx water erosion implies pre-dynastic advanced culture",
      source: "Forgotten Civilization, Robert Schoch (2012)",
      researcher: "Robert Schoch",
      up: 1240, dn: 980,
    },
    {
      s: -36000, e: -30000,
      label: "Bauval & Hancock — Orion correlation, full precessional cycle",
      source: "Keeper of Genesis, Bauval & Hancock (1996)",
      researcher: "Robert Bauval",
      up: 890, dn: 1140,
    },
    {
      s: -7000, e: -5000,
      label: "Mainstream — Badarian / Naqada I origin",
      source: "The Oxford History of Ancient Egypt, Shaw (2000)",
      researcher: null,
      up: 1560, dn: 140,
    }
  ],
*/

// ── id: 7 — Sumerian Civilisation ───────────────────────────
// (t: "confirmed" with debated origins) — add dateTheories[]
/*
  dateTheories: [
    {
      s: -5500, e: -4500,
      label: "Ubaid continuity — Sumerian as evolved Ubaid culture",
      source: "The Sumerians, Kramer (1963)",
      researcher: "Samuel Noah Kramer",
      up: 1340, dn: 180,
    },
    {
      s: -10800, e: -9000,
      label: "Sitchin — post-Annunaki Sumerian founding",
      source: "The 12th Planet, Zecharia Sitchin (1976)",
      researcher: "Zecharia Sitchin",
      up: 760, dn: 1380,
    },
    {
      s: -6500, e: -5800,
      label: "Woolley — Ur layers suggesting earlier urban occupation",
      source: "Ur of the Chaldees, Leonard Woolley (1929)",
      researcher: "Leonard Woolley",
      up: 580, dn: 230,
    }
  ],
*/

// ── id: 9 — Ancient Egypt (Dynastic) ────────────────────────
// (t: "confirmed" — dates contested) — add dateTheories[]
/*
  dateTheories: [
    {
      s: -3200, e: -3000,
      label: "Mainstream — Narmer / Menes unification",
      source: "The Oxford History of Ancient Egypt, Shaw (2000)",
      researcher: null,
      up: 2100, dn: 120,
    },
    {
      s: -10500, e: -10000,
      label: "Hancock — Zep Tepi 'First Time' encoded in Giza layout",
      source: "Keeper of Genesis, Bauval & Hancock (1996)",
      researcher: "Graham Hancock",
      up: 1420, dn: 1680,
    },
    {
      s: -4400, e: -3800,
      label: "Wilkinson — Naqada III proto-dynastic state formation",
      source: "Early Dynastic Egypt, Wilkinson (1999)",
      researcher: "Toby Wilkinson",
      up: 1240, dn: 180,
    }
  ],
*/

// ── id: 10 — Ancient Mesopotamia ────────────────────────────
// (t: "confirmed") — dates of first urban phase contested
/*
  dateTheories: [
    {
      s: -6500, e: -5800,
      label: "Ubaid Phase — earliest permanent settlement layer",
      source: "Mesopotamia: The Invention of the City, Leick (2001)",
      researcher: "Gwendolyn Leick",
      up: 980, dn: 140,
    },
    {
      s: -10800, e: -9000,
      label: "Post-YD resettlement — Eridu founded by Younger Dryas survivors",
      source: "Magicians of the Gods, Hancock (2015)",
      researcher: "Graham Hancock",
      up: 680, dn: 890,
    }
  ],
*/

// ── id: 11 — Indus Valley Civilisation ──────────────────────
// (t: "confirmed") — earlier occupation debated
/*
  dateTheories: [
    {
      s: -7000, e: -5500,
      label: "Mehrgarh antecedent — Neolithic origin of Indus urbanism",
      source: "The Indus Civilization, Kenoyer (1998)",
      researcher: "Jonathan Mark Kenoyer",
      up: 1080, dn: 140,
    },
    {
      s: -9000, e: -7500,
      label: "Kalibangan pre-phase — extended pre-urban occupation",
      source: "Excavations at Kalibangan, Lal (2003)",
      researcher: "B.B. Lal",
      up: 560, dn: 280,
    },
    {
      s: -3300, e: -2600,
      label: "Mainstream Early Harappan — accepted urban phase onset",
      source: "The Oxford Companion to Archaeology, Fagan (1996)",
      researcher: null,
      up: 1640, dn: 120,
    }
  ],
*/

// ── id: 13 — Göbekli Tepe (if separate from id 101) ─────────
// Skip — id 101 (new) covers the Göbekli Tepe culture fully.

// ── id: 14 — Çatalhöyük (if separate from id 105) ───────────
// Skip — covered by id 105 (new).

// ── id: 20 — Stonehenge / Megalithic Britain ─────────────────
// (t: "debated") — add dateTheories[]
/*
  dateTheories: [
    {
      s: -5000, e: -4500,
      label: "Earliest bluestone transport — Preseli Hills quarrying phase",
      source: "Stonehenge: A New Understanding, Parker Pearson (2012)",
      researcher: "Mike Parker Pearson",
      up: 780, dn: 180,
    },
    {
      s: -10500, e: -9000,
      label: "Hancock — Stonehenge as pre-YD astronomical monument rededicated",
      source: "Fingerprints of the Gods, Hancock (1995)",
      researcher: "Graham Hancock",
      up: 640, dn: 920,
    },
    {
      s: -3000, e: -2500,
      label: "Mainstream sarsen phase — current stone circle construction",
      source: "Stonehenge, Cleal et al. (1995)",
      researcher: null,
      up: 1840, dn: 140,
    },
    {
      s: -8000, e: -7500,
      label: "Vatcher — post-holes predating henge, possible totem poles",
      source: "Stonehenge in its Landscape, Cleal (1995)",
      researcher: null,
      up: 420, dn: 240,
    }
  ],
*/

// ── id: 22 — Troy / Hisarlik ─────────────────────────────────
// (t: "debated") — add dateTheories[]
/*
  dateTheories: [
    {
      s: -1250, e: -1180,
      label: "Mainstream — Troy VIIa destruction layer (Trojan War)",
      source: "Troy and Homer, Korfmann & Mannsperger (2005)",
      researcher: "Manfred Korfmann",
      up: 1540, dn: 280,
    },
    {
      s: -1350, e: -1300,
      label: "Troy VI — earlier destruction by earthquake",
      source: "The Iliad: A Commentary, Kirk (1985)",
      researcher: "G.S. Kirk",
      up: 480, dn: 340,
    },
    {
      s: -3000, e: -2550,
      label: "Troy I–II — Schliemann's 'burnt city' misidentified as Homeric Troy",
      source: "Ilios, Heinrich Schliemann (1880)",
      researcher: "Heinrich Schliemann",
      up: 280, dn: 640,
    }
  ],
*/

// ── id: 25 — Younger Dryas Impact (catastrophe event) ────────
// (t: "theorized") — add dateTheories[]
/*
  dateTheories: [
    {
      s: -12900, e: -12700,
      label: "Firestone et al. — cometary impact / airburst, YDIH",
      source: "Evidence for an extraterrestrial impact, PNAS (2007)",
      researcher: "Richard Firestone",
      up: 2140, dn: 890,
    },
    {
      s: -12950, e: -12850,
      label: "Sweatman — Göbekli Tepe pillar 43 encodes the impact date",
      source: "Decoding Göbekli Tepe, Sweatman & Tsikritsis (2017)",
      researcher: "Martin Sweatman",
      up: 980, dn: 760,
    },
    {
      s: -10800, e: -10600,
      label: "Alternative — second impact pulse at YD termination",
      source: "The Cycle of Cosmic Catastrophes, Firestone et al. (2006)",
      researcher: "Richard Firestone",
      up: 760, dn: 580,
    }
  ],
*/

// ── id: 27 — Cahokia ─────────────────────────────────────────
// (t: "confirmed") — founding date debated
/*
  dateTheories: [
    {
      s: 600, e: 900,
      label: "Mainstream — Emergent Mississippian founding",
      source: "Cahokia: City of the Sun, Iseminger (2010)",
      researcher: "William Iseminger",
      up: 890, dn: 120,
    },
    {
      s: 100, e: 500,
      label: "Pre-Mississippian contact — Woodland Period occupation layer",
      source: "Ancient Cahokia, Pauketat (2009)",
      researcher: "Timothy Pauketat",
      up: 420, dn: 180,
    }
  ],
*/

// ── id: 29 — Mohenjo-Daro ────────────────────────────────────
// (t: "confirmed") — destruction date and cause debated
/*
  dateTheories: [
    {
      s: -2600, e: -1900,
      label: "Mainstream — Mature Harappan urban phase",
      source: "Mohenjo-daro and the Indus Civilization, Marshall (1931)",
      researcher: "John Marshall",
      up: 1240, dn: 140,
    },
    {
      s: -1900, e: -1700,
      label: "Davenport & Vincenti — nuclear event / vitrification hypothesis",
      source: "Atomic Destruction 2000 BC, Davenport & Vincenti (1979)",
      researcher: "David Davenport",
      up: 580, dn: 1240,
    },
    {
      s: -2700, e: -2500,
      label: "Kenoyer — earlier urban phase predating standard dating",
      source: "Ancient Cities of the Indus Valley, Kenoyer (1998)",
      researcher: "Jonathan Mark Kenoyer",
      up: 480, dn: 210,
    }
  ],
*/

// ── id: 31 — Tartessos ───────────────────────────────────────
// (t: "debated") — Atlantis candidate
/*
  dateTheories: [
    {
      s: -1000, e: -500,
      label: "Mainstream — Phoenician-period Tartessos",
      source: "Tartessos, Schulten (1922)",
      researcher: "Adolf Schulten",
      up: 780, dn: 140,
    },
    {
      s: -9600, e: -9000,
      label: "Freund — pre-catastrophe Tartessos as Atlantis",
      source: "Finding Atlantis, Richard Freund (2011)",
      researcher: "Richard Freund",
      up: 640, dn: 780,
    },
    {
      s: -3000, e: -2000,
      label: "Almagro-Gorbea — Bronze Age proto-Tartessian culture",
      source: "Tartessos: Indigenismo y Orientalización (2008)",
      researcher: "Martín Almagro-Gorbea",
      up: 420, dn: 190,
    }
  ],
*/

// ── id: 33 — Ancient Alien Builders (pre-existing entry) ─────
// Covered by new id 120 — no duplication needed.

// ── id: 35 — Eridu ───────────────────────────────────────────
// (t: "confirmed" — dates of pre-flood layer debated)
/*
  dateTheories: [
    {
      s: -5400, e: -4800,
      label: "Mainstream — Ubaid 1 founding, oldest Mesopotamian city",
      source: "The Sumerians, Kramer (1963)",
      researcher: "Samuel Noah Kramer",
      up: 1140, dn: 120,
    },
    {
      s: -9000, e: -7000,
      label: "LaCroix — underground pre-flood occupation layers",
      source: "The Stage of Time, LaCroix (2018)",
      researcher: "Matthew LaCroix",
      up: 620, dn: 840,
    }
  ],
*/

// ── id: 42 — Göbekli Tepe (duplicate check) ──────────────────
// If id 42 in your data.js is already Göbekli Tepe, merge with id 101's
// dateTheories above rather than duplicating.

// ── id: 50 — Easter Island / Rapa Nui ────────────────────────
// (t: "debated") — moai construction date and origin debated
/*
  dateTheories: [
    {
      s: 700, e: 900,
      label: "Mainstream — Polynesian settlement and moai construction",
      source: "Easter Island Earth Island, Bahn & Flenley (1992)",
      researcher: null,
      up: 1240, dn: 180,
    },
    {
      s: -3000, e: -1000,
      label: "Heyerdahl — South American contact / pre-Polynesian builders",
      source: "Aku-Aku, Thor Heyerdahl (1958)",
      researcher: "Thor Heyerdahl",
      up: 560, dn: 780,
    },
    {
      s: 300, e: 500,
      label: "Hunt & Lipo — revised late settlement, rapid deforestation",
      source: "The Statues That Walked, Hunt & Lipo (2011)",
      researcher: "Terry Hunt",
      up: 680, dn: 320,
    }
  ],
*/

// ── id: 54 — Göbekli Tepe / Pre-Pottery Neolithic ────────────
// Already has dateTheories[] per bible — append only if id 54 is different
// from id 101 (check your data.js). If same site, merge.

// ── id: 57 — Tiwanaku ────────────────────────────────────────
// (t: "debated") — Posnansky dating
/*
  dateTheories: [
    {
      s: 300, e: 700,
      label: "Mainstream — Formative Period founding",
      source: "Tiwanaku: Ancestors of the Inca, Kolata (2003)",
      researcher: "Alan Kolata",
      up: 1240, dn: 180,
    },
    {
      s: -15000, e: -10800,
      label: "Posnansky — archaeoastronomical dating of Kalasasaya",
      source: "Tiahuanacu Vol I–IV, Posnansky (1945)",
      researcher: "Arthur Posnansky",
      up: 840, dn: 680,
    },
    {
      s: -10800, e: -9600,
      label: "Hancock — Tiwanaku as post-YD rebuilding on pre-flood site",
      source: "Fingerprints of the Gods, Hancock (1995)",
      researcher: "Graham Hancock",
      up: 720, dn: 590,
    }
  ],
*/

// ── id: 60 — Gobekli Tepe Builders (if listed separately) ────
// Merge with id 101 dateTheories above.

// ── id: 63 — Vedic India ─────────────────────────────────────
// (t: "debated") — Aryan Invasion / Out of India debate
/*
  dateTheories: [
    {
      s: -1500, e: -1200,
      label: "Mainstream AIT — Aryan Migration into India",
      source: "The Indo-Aryan Controversy, Bryant & Patton (2005)",
      researcher: null,
      up: 1340, dn: 480,
    },
    {
      s: -7000, e: -5000,
      label: "Out of India — Vedic culture as indigenous development",
      source: "In Search of the Cradle of Civilization, Feuerstein (1995)",
      researcher: "Georg Feuerstein",
      up: 780, dn: 620,
    },
    {
      s: -3750, e: -3000,
      label: "Sarasvati drying — Vedic civilization tied to Sarasvati River",
      source: "The Lost River, Michel Danino (2010)",
      researcher: "Michel Danino",
      up: 560, dn: 380,
    }
  ],
*/

// ── id: 70 — Puma Punku ──────────────────────────────────────
// (t: "debated") — precision machining debate
/*
  dateTheories: [
    {
      s: 600, e: 900,
      label: "Mainstream — Tiwanaku Classic Period construction",
      source: "Tiwanaku, Kolata (1993)",
      researcher: "Alan Kolata",
      up: 980, dn: 240,
    },
    {
      s: -15000, e: -12000,
      label: "Foerster — pre-flood megalithic construction, non-human precision",
      source: "Advanced Ancient Civilizations, Foerster (2016)",
      researcher: "Brien Foerster",
      up: 840, dn: 780,
    },
    {
      s: -2000, e: -1000,
      label: "Vranich — H-shaped blocks as decorative stonework, Bronze Age",
      source: "Reconstructing Pumapunku, Vranich (2009)",
      researcher: "Alexei Vranich",
      up: 580, dn: 340,
    }
  ],
*/

// ── id: 75 — Great Sphinx ────────────────────────────────────
// (t: "debated") — Schoch water erosion is central debate
/*
  dateTheories: [
    {
      s: -2500, e: -2450,
      label: "Mainstream — Khafre commission, Old Kingdom",
      source: "The Complete Pyramids, Lehner (1997)",
      researcher: "Mark Lehner",
      up: 1680, dn: 340,
    },
    {
      s: -10500, e: -9000,
      label: "Schoch — water erosion from rainfall predates Saharan desiccation",
      source: "Redating the Great Sphinx, Schoch (1992)",
      researcher: "Robert Schoch",
      up: 1840, dn: 1240,
    },
    {
      s: -36000, e: -30000,
      label: "West — extreme age, pre-glacial construction",
      source: "Serpent in the Sky, John Anthony West (1979)",
      researcher: "John Anthony West",
      up: 640, dn: 1380,
    },
    {
      s: -7000, e: -5000,
      label: "Dobecki & Schoch — seismic survey implies deeper, older core",
      source: "Seismic Investigations of the Sphinx, Dobecki & Schoch (1992)",
      researcher: "Thomas Dobecki",
      up: 780, dn: 580,
    }
  ],
*/

// ── id: 80 — Nan Madol ───────────────────────────────────────
// (t: "debated") — construction method and date debated
/*
  dateTheories: [
    {
      s: 1200, e: 1500,
      label: "Mainstream — Saudeleur Dynasty construction",
      source: "Nan Madol, Athens (1980)",
      researcher: "J. Stephen Athens",
      up: 890, dn: 180,
    },
    {
      s: 200, e: 800,
      label: "Riesenberg — early occupation predating Saudeleur",
      source: "The Native Polity of Ponape, Riesenberg (1968)",
      researcher: "Saul Riesenberg",
      up: 420, dn: 240,
    },
    {
      s: -5000, e: -2000,
      label: "Childress — Lemurian remnant, pre-historic construction",
      source: "Lost Cities of Ancient Lemuria, Childress (1988)",
      researcher: "David Hatcher Childress",
      up: 540, dn: 840,
    }
  ],
*/

// ── id: 84 — Bimini Road ─────────────────────────────────────
// (t: "debated") — Atlantis candidate
/*
  dateTheories: [
    {
      s: -10000, e: -9000,
      label: "Cayce prediction — Atlantis rising 1968/69 fulfillment",
      source: "Edgar Cayce Readings 958-3 (1940)",
      researcher: "Edgar Cayce",
      up: 980, dn: 1140,
    },
    {
      s: -3000, e: -2000,
      label: "Shinn — natural beachrock formation",
      source: "Atlantis: Fact or Fiction, Shinn (2004)",
      researcher: "Eugene Shinn",
      up: 840, dn: 320,
    },
    {
      s: -10800, e: -9600,
      label: "Little et al. — partially man-modified natural formation",
      source: "The A.R.E.'s Search for Atlantis, Little (2006)",
      researcher: "Gregory Little",
      up: 620, dn: 580,
    }
  ],
*/

// ── id: 85 — Richat Structure (if listed — check id) ─────────
// Covered by new id 116. Merge if duplicate.

// ── id: 86 — Pre-Flood Civilisation (global) ─────────────────
// (t: "theorized") — already may have dateTheories[], check bible
/*
  dateTheories: [
    {
      s: -100000, e: -50000,
      label: "Hapgood — multiple ice-free civilisation cycles",
      source: "Earth's Shifting Crust, Hapgood (1958)",
      researcher: "Charles Hapgood",
      up: 680, dn: 840,
    },
    {
      s: -12900, e: -10800,
      label: "Hancock — single advanced civilisation destroyed by YD impact",
      source: "Magicians of the Gods, Hancock (2015)",
      researcher: "Graham Hancock",
      up: 2240, dn: 1640,
    },
    {
      s: -200000, e: -50000,
      label: "Sitchin — Annunaki-modified human civilisation predating flood",
      source: "The 12th Planet, Sitchin (1976)",
      researcher: "Zecharia Sitchin",
      up: 860, dn: 1580,
    }
  ],
*/

// ── id: 88 — Younger Dryas (if event entry) ──────────────────
// Covered by id 119 (new). Merge if duplicate.

// ============================================================
// END DATETHEORIES PATCH
//
// SUMMARY OF CIVS PATCHED:
// ids: 1, 6, 7, 9, 10, 11, 20, 22, 25, 27, 29, 31, 35, 50,
//      57, 63, 70, 75, 80, 84, 86
// Total new dateTheories entries added: ~58 additional theory bars
// ============================================================
