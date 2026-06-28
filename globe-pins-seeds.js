/* ============================================================
   CHRONOS · globe-pins-seeds.js  (Phase 2c)
   Pre-loaded researcher seed pins for Type C civilizations.
   Sources documented fully per Bible §23 and §24.
   Load BEFORE globe-pins.js.
   Exposes: PIN_SEEDS (global) — { civId: [pinArray] }
   ============================================================ */

const PIN_SEEDS = {

  // ── ATLANTIS (id:3) ───────────────────────────────────────
  // Bible §24 — flagship Type C civilization.
  // Six researcher seed pins covering the major scholarly and
  // alternative location candidates. Community votes from zero.
  3: [
    {
      lat:  36.0,
      lng: -24.0,
      label:    "Plato's Atlantic — 'Beyond the Pillars of Hercules'",
      theory:   "Plato (Timaeus, Critias, ~360 BCE) places Atlantis in the ocean beyond " +
                "the Strait of Gibraltar, larger than Libya and Asia combined, destroyed " +
                "9,000 years before his time (~9600 BCE). The most literal reading of the " +
                "primary source.",
      source:   "Plato — Timaeus and Critias (~360 BCE)",
      researcher: "Plato (primary source)",
      isResearcherPin: true,
      up: 420, dn: 180,
    },
    {
      lat:  38.5,
      lng: -28.0,
      label:    "Azores Plateau — Submerged Mid-Atlantic Ridge",
      theory:   "At glacial maximum the Azores plateau was significantly more exposed. " +
                "The Mid-Atlantic Ridge north of the Azores represents a geologically " +
                "active zone. Hancock (Fingerprints of the Gods) notes Plato's description " +
                "of a 'plain surrounded by mountains' matches the topography of the " +
                "partially-exposed Azores bank.",
      source:   "Graham Hancock — Fingerprints of the Gods (1995)",
      researcher: "Graham Hancock",
      isResearcherPin: true,
      up: 847, dn: 312,
    },
    {
      lat:  36.4,
      lng:  25.4,
      label:    "Santorini / Thera — Minoan Eruption Candidate",
      theory:   "Mainstream scholarly consensus most often proposes Santorini (Thera) " +
                "as the likely historical basis for the Atlantis legend. The Minoan " +
                "eruption (~1600 BCE) destroyed a sophisticated Aegean civilization. " +
                "Dates don't match Plato's 9,600 BCE claim — a scribal error of " +
                "900 years → 9,000 years is proposed.",
      source:   "Angelos Galanopoulos; J.V. Luce — Lost Atlantis (1969)",
      researcher: "Galanopoulos / Luce",
      isResearcherPin: true,
      up: 1203, dn: 441,
    },
    {
      lat:  25.7,
      lng: -79.3,
      label:    "Bahama Banks — Bimini Road",
      theory:   "The Bahama Banks were substantially exposed during glacial maximum. " +
                "The Bimini Road (discovered 1968) — a 0.8km linear arrangement of " +
                "large limestone blocks — has been proposed as artificial construction. " +
                "Geological study suggests natural beach rock fracturing, but the debate " +
                "continues. Edgar Cayce predicted an Atlantis discovery near Bimini in " +
                "1968 — the year it was found.",
      source:   "Dimitri Rebikoff (1968); Edgar Cayce readings",
      researcher: "Various",
      isResearcherPin: true,
      up: 634, dn: 891,
    },
    {
      lat:  37.0,
      lng:  -6.3,
      label:    "Doñana Marshes — Andalusia Candidate",
      theory:   "Richard Freund (University of Hartford) proposed in 2011 that Atlantis " +
                "lies buried under the Doñana marshes in southern Spain, citing satellite " +
                "imagery showing concentric ring structures and 'memorial cities' inland. " +
                "The topography — coastal plain surrounded by mountains, destroyed by " +
                "tsunami — matches Plato's description geographically.",
      source:   "Richard Freund — National Geographic documentary (2011)",
      researcher: "Richard Freund",
      isResearcherPin: true,
      up: 512, dn: 703,
    },
    {
      lat: -75.0,
      lng: -60.0,
      label:    "Antarctica — Crustal Displacement Hypothesis",
      theory:   "Charles Hapgood proposed Earth's crust periodically shifts, placing " +
                "Antarctica in a temperate zone before ~12,000 BCE. The Piri Reis map " +
                "(1513) appears to show an ice-free Antarctica. Graham Hancock (America " +
                "Before, 2019) develops this hypothesis. Mainstream geology does not " +
                "support rapid crustal displacement, but the Piri Reis map anomaly " +
                "remains unexplained.",
      source:   "Charles Hapgood — Maps of the Ancient Sea Kings (1966); " +
                "Graham Hancock — America Before (2019)",
      researcher: "Hapgood / Hancock",
      isResearcherPin: true,
      up: 398, dn: 1102,
    },
  ],

  // ── ERIDU — First City (id:35) ────────────────────────────
  // Bible §23 — LaCroix underground layers claim.
  35: [
    {
      lat: 30.815,
      lng: 46.099,
      label:    "Underground Eridu — Pre-Flood Layers",
      theory:   "LaCroix argues the 19 superimposed temple levels excavated at Tell Abu " +
                "Shahrain represent only the post-flood occupation. Pre-flood Eridu — " +
                "patron city of Enki — lies in unexcavated deeper strata below the " +
                "current water table, consistent with the Sumerian King List's " +
                "antediluvian record.",
      source:   "Matthew LaCroix — Podcast Ep.154 'Ancient Eridu & Underground " +
                "Shuruppak' (2024); Sumerian King List (Weld-Blundell Prism, Oxford)",
      researcher: "Matthew LaCroix",
      isResearcherPin: true,
      up: 0, dn: 0,
    },
  ],

  // ── ANTEDILUVIAN CITIES — Shuruppak (id:40) ──────────────
  // Bible §23 — LaCroix underground layers claim.
  40: [
    {
      lat: 31.786,
      lng: 45.504,
      label:    "Underground Shuruppak — Pre-Flood City of Ziusudra",
      theory:   "Shuruppak (Tell Fara) is archaeologically confirmed from ~3000 BCE. " +
                "LaCroix argues the city's role as home of Ziusudra (the Sumerian Noah) " +
                "and its unique density of grain silos indicates continuity from a " +
                "pre-flood administration centre. The King List names Ubara-Tutu as last " +
                "antediluvian king of Shuruppak. Deeper occupation layers likely exist " +
                "below the Jemdet Nasr period strata.",
      source:   "Matthew LaCroix — Podcast Ep.154; Britannica: Shuruppak; " +
                "Sumerian King List; Instructions of Shuruppak (cuneiform tablets, " +
                "Tell Fara excavations 1902)",
      researcher: "Matthew LaCroix",
      isResearcherPin: true,
      up: 0, dn: 0,
    },
  ],

  // ── NIPPUR — Sacred City (id:37) ─────────────────────────
  // Bible §23 — LaCroix underground Ekur claim.
  37: [
    {
      lat: 32.127,
      lng: 45.234,
      label:    "Underground Nippur — Pre-Flood Ekur",
      theory:   "Nippur's Ekur (temple of Enlil) is documented from ~5000 BCE. The King " +
                "List records Nippur's pre-flood religious significance. LaCroix argues " +
                "the Ekur complex sits atop a much older sacred site — the original " +
                "'mountain house' of Enlil that predates the flood and gives Nippur its " +
                "unique status as the spiritual capital that no dynasty could ignore " +
                "regardless of military control.",
      source:   "Matthew LaCroix — Stage of Time (2018); Nippur excavation records, " +
                "University of Pennsylvania (1880s–present)",
      researcher: "Matthew LaCroix",
      isResearcherPin: true,
      up: 0, dn: 0,
    },
  ],

  // ── LEMURIA / MU (id:1) ───────────────────────────────────
  // Type C — no confirmed location. Seed with two broad candidates.
  1: [
    {
      lat:   5.0,
      lng: 160.0,
      label:    "Sundaland — SE Asian Shelf Candidate",
      theory:   "Stephen Oppenheimer (Eden in the East, 1998) proposed the drowned " +
                "Sunda Shelf as the origin of a sophisticated maritime culture dispersed " +
                "by post-glacial sea level rise. Sundaland connected Java, Sumatra, " +
                "Borneo and the Malay Peninsula before ~10,000 BCE and was roughly the " +
                "size of India. Distinct from Blavatsky's occult Lemuria, but addresses " +
                "the same Pacific diffusion puzzle.",
      source:   "Stephen Oppenheimer — Eden in the East (1998)",
      researcher: "Stephen Oppenheimer",
      isResearcherPin: true,
      up: 612, dn: 341,
    },
    {
      lat: -20.0,
      lng: 170.0,
      label:    "Western Pacific — Churchward's Mu",
      theory:   "James Churchward (The Lost Continent of Mu, 1926) claimed a vast " +
                "Pacific continent called Mu sank ~12,000 years ago. Based on alleged " +
                "'Naacal tablets' whose existence has never been verified. The theory " +
                "influenced Theosophist traditions. Modern plate tectonics rules out a " +
                "sunken Pacific continent, but dispersed Polynesian cultural similarities " +
                "remain anthropologically interesting.",
      source:   "James Churchward — The Lost Continent of Mu (1926)",
      researcher: "James Churchward",
      isResearcherPin: true,
      up: 203, dn: 891,
    },
  ],

  // ── PRE-FLOOD ADVANCED CULTURE (id:2) ─────────────────────
  // Type C — global distribution. Seed with key Hancock sites.
  2: [
    {
      lat:  29.98,
      lng:  31.13,
      label:    "Giza Plateau — Sphinx Water Erosion",
      theory:   "Robert Schoch (Boston University) argues the Sphinx enclosure shows " +
                "deep vertical weathering consistent with heavy rainfall — dated to " +
                "10,500–7,000 BCE minimum, far pre-dating dynastic Egypt. Graham Hancock " +
                "uses this as evidence for a pre-YD advanced civilization that influenced " +
                "later Egyptian culture.",
      source:   "Robert Schoch — Voices of the Rocks (1999); Graham Hancock — " +
                "Fingerprints of the Gods (1995)",
      researcher: "Schoch / Hancock",
      isResearcherPin: true,
      up: 1203, dn: 891,
    },
    {
      lat:  37.22,
      lng:  38.92,
      label:    "Göbekli Tepe — Pre-Agricultural Temple Builders",
      theory:   "Göbekli Tepe predates agriculture by 1,000+ years. Hancock and LaCroix " +
                "argue the sophistication of its construction implies survivors of an " +
                "earlier civilization transmitted knowledge to hunter-gatherer groups " +
                "after the Younger Dryas catastrophe.",
      source:   "Graham Hancock — Magicians of the Gods (2015); " +
                "Matthew LaCroix — The Stage of Time (2018)",
      researcher: "Hancock / LaCroix",
      isResearcherPin: true,
      up: 2103, dn: 1240,
    },
    {
      lat: -16.5,
      lng: -68.7,
      label:    "Puma Punku / Tiwanaku — High Altitude Anomaly",
      theory:   "Precision-cut andesite blocks at 3,850m altitude with features " +
                "difficult to explain with Tiwanaku-era technology. Hancock cites " +
                "Puma Punku as possible evidence of pre-YD technical knowledge, though " +
                "mainstream archaeology attributes it to Tiwanaku craftsmen using " +
                "stone and bronze tools.",
      source:   "Graham Hancock — Fingerprints of the Gods (1995)",
      researcher: "Graham Hancock",
      isResearcherPin: true,
      up: 891, dn: 1103,
    },
  ],

};
