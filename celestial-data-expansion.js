// ============================================================
// CHRONOS celestial-data.js — EXPANSION BLOCK
// Phase 5e — Non-Western traditions, precession events,
// planetary cycles, solstice/equinox markers
//
// HOW TO APPLY:
// Append each section into the appropriate array/object in
// your existing celestial-data.js. Section headers below
// match the likely structure. Adjust array names to match
// your actual implementation if they differ.
// ============================================================

// ── ZODIAC AGES (Precessional Great Year ~25,772 years) ──────
// Append to ZODIAC_AGES array.
// Each age spans ~2,147 years. Vernal equinox precesses
// backward through the zodiac at ~1° per 72 years.
// Dates are approximate — different traditions vary by
// 100–300 years due to constellation boundary definitions.

const ZODIAC_AGES_EXPANSION = [

  // ── Standard Precessional Cycle ─────────────────────────
  {
    name: "Age of Gemini",
    s: -6690, e: -4530,
    symbol: "♊",
    colour: "#f0c040",
    tradition: "Western astrological / precessional",
    note: "Twin deities dominant in mythology worldwide. Sumerian Gilgamesh & Enkidu, Egyptian Shu & Tefnut, Greek Castor & Pollux. Göbekli Tepe construction peak falls within this age.",
  },
  {
    name: "Age of Taurus",
    s: -4530, e: -2370,
    symbol: "♉",
    colour: "#c0a060",
    tradition: "Western astrological / precessional",
    note: "Bull worship dominant globally. Minoan bull cult, Egyptian Apis bull, Sumerian Gudea bull iconography. Great Pyramids constructed. The sacred bull as solar avatar.",
  },
  {
    name: "Age of Aries",
    s: -2370, e: -210,
    symbol: "♈",
    colour: "#e05030",
    tradition: "Western astrological / precessional",
    note: "Ram replaces bull as sacred animal. Egyptian Amun depicted as ram. Hebrew sacrifice of the ram (Abraham narrative). Greek Golden Fleece myth. Iron Age empires.",
  },
  {
    name: "Age of Pisces",
    s: -210, e: 1950,
    symbol: "♓",
    colour: "#4080c0",
    tradition: "Western astrological / precessional",
    note: "Fish symbolism in Christianity (Ichthys). Islamic crescent. Hindu Matsya avatar (fish). Two world religions born in this age. Vernal equinox in Pisces constellation.",
  },
  {
    name: "Age of Aquarius",
    s: 1950, e: 4110,
    symbol: "♒",
    colour: "#40c0c0",
    tradition: "Western astrological / precessional",
    note: "Transition currently in progress — boundary disputed between 1950 and 2597 CE depending on constellation boundary system used.",
  },

  // ── Hindu Yuga Cycle Overlay ─────────────────────────────
  // Traditional Hindu cosmological time cycle.
  // Presented as a parallel tradition — not to be merged with
  // Western precession but displayed as a separate overlay layer.
  {
    name: "Kali Yuga",
    s: -3102, e: 428898,
    symbol: "🔱",
    colour: "#880000",
    tradition: "Hindu cosmological",
    note: "The current age in Hindu tradition, beginning 3102 BCE — coinciding with the death of Krishna and the Mahabharata war. An age of spiritual decline lasting 432,000 years in the long-count version, or 6,480 years in the short-count interpretation used by Sri Yukteswar.",
  },
  {
    name: "Dwapara Yuga (previous)",
    s: -902102, e: -3102,
    symbol: "🔱",
    colour: "#884400",
    tradition: "Hindu cosmological",
    note: "Age of partial virtue. 864,000 years in traditional reckoning. The age of the Mahabharata heroes.",
  },

  // ── Mayan Long Count Cycle ───────────────────────────────
  {
    name: "Mayan 5th Sun (current baktun cycle)",
    s: -3114, e: 2012,
    symbol: "☀",
    colour: "#d47000",
    tradition: "Mayan cosmological",
    note: "The current World Age in Mayan cosmology, beginning 11 August 3114 BCE (GMT correlation). Ended 21 December 2012 CE — the start of a new cycle, not an apocalypse. Each World Age ends in a different catastrophe: flood, wind, fire, jaguar, and earthquake.",
  },
  {
    name: "Mayan 6th Sun (new cycle)",
    s: 2012, e: 5126,
    symbol: "☀",
    colour: "#e09000",
    tradition: "Mayan cosmological",
    note: "Current cycle following the 2012 calendar completion. New baktun period of 5,125.36 years.",
  },

];

// ── SOLSTICE & EQUINOX MARKERS — EXPANDED ────────────────────
// Append to SOLSTICE_EVENTS array.
// Covers non-Western monuments and traditions not in original data.

const SOLSTICE_EVENTS_EXPANSION = [

  // ── Archaeoastronomical Sites ────────────────────────────
  {
    year: -10500,
    label: "Zep Tepi — Orion's Belt correlates to Giza pyramids",
    lat: 29.98, lng: 31.13,
    type: "equinox",
    tradition: "Egyptian / Hancock-Bauval",
    note: "Hancock and Bauval argue that at c. 10,500 BCE the three Giza pyramids mirrored Orion's Belt on the meridian at spring equinox, and the Sphinx faced the rising sun directly in Leo — encoding the 'First Time' (Zep Tepi) in stone.",
    researcher: "Robert Bauval / Graham Hancock",
    source: "Keeper of Genesis (1996)",
  },
  {
    year: -10500,
    label: "Sphinx gazes at Leo on spring equinox horizon",
    lat: 29.975, lng: 31.138,
    type: "equinox",
    tradition: "Egyptian / Schoch-West",
    note: "At 10,500 BCE, the Sphinx's due-east gaze would have been met by its own zodiacal counterpart Leo rising on the vernal equinox horizon — a potential founding date encoded in the monument's orientation.",
    researcher: "Robert Schoch / John Anthony West",
    source: "Voices of the Rocks (1999)",
  },
  {
    year: -3000,
    label: "Newgrange — winter solstice sunrise alignment",
    lat: 53.69, lng: -6.47,
    type: "solstice",
    tradition: "Irish Neolithic",
    note: "At Newgrange, Ireland, the chamber is illuminated by a narrow shaft of winter solstice sunrise light for approximately 17 minutes. Constructed around 3200 BCE — predating Stonehenge and the Pyramids.",
    researcher: null,
    source: "Newgrange, O'Kelly (1982)",
  },
  {
    year: -2500,
    label: "Stonehenge — summer solstice sunrise alignment",
    lat: 51.18, lng: -1.83,
    type: "solstice",
    tradition: "British Neolithic / Bronze Age",
    note: "The Heel Stone at Stonehenge frames the midsummer sunrise. The monument also aligns with the major lunar standstill cycle of 18.6 years, suggesting sophisticated lunar as well as solar observation.",
    researcher: null,
    source: "Stonehenge: A New Understanding, Parker Pearson (2012)",
  },
  {
    year: -2000,
    label: "Mnajdra, Malta — equinox sunrise illumination",
    lat: 35.83, lng: 14.44,
    type: "equinox",
    tradition: "Maltese Neolithic",
    note: "At the spring and autumn equinoxes, the rising sun illuminates the central passage of Mnajdra temple precisely. At solstices, the light falls on the temple's outer edges — making the entire temple a solar calendar.",
    researcher: null,
    source: "Archaeoastronomy at Mnajdra, Hoskin (2001)",
  },
  {
    year: -1200,
    label: "Abu Simbel — Ramesses II solar alignment",
    lat: 22.34, lng: 31.63,
    type: "solstice",
    tradition: "Egyptian New Kingdom",
    note: "Twice yearly (20 October and 20 February — 61 days either side of the winter solstice) the rising sun penetrates 60 metres into Abu Simbel to illuminate the inner sanctuary statues of Ramesses II and the gods Amun and Ra — leaving only the statue of Ptah, god of darkness, unilluminated.",
    researcher: null,
    source: "Abu Simbel, Desroches-Noblecourt (1962)",
  },
  {
    year: -600,
    label: "Jantar Mantar — Mughal astronomical instruments",
    lat: 26.92, lng: 75.82,
    type: "equinox",
    tradition: "Indian / Vedic astronomy",
    note: "Maharaja Jai Singh II built five observatories across India (1724–1735 CE) using massive stone instruments to calculate solstices, equinoxes, and stellar positions with naked-eye precision rivalling European telescopic astronomy of the same era.",
    researcher: null,
    source: "The Jantar Mantar Observatories, Sharma (2016)",
  },
  {
    year: 700,
    label: "Chichen Itza — equinox serpent shadow",
    lat: 20.68, lng: -88.57,
    type: "equinox",
    tradition: "Mayan",
    note: "At the spring and autumn equinoxes, the staircase of El Castillo pyramid casts a triangular shadow that creates the illusion of a feathered serpent (Kukulkan) descending the north staircase. The effect lasts approximately 3.5 hours.",
    researcher: null,
    source: "The Astronomical Significance of Chichen Itza, Aveni (1980)",
  },
  {
    year: -500,
    label: "Machu Picchu — Intihuatana solar anchor",
    lat: -13.16, lng: -72.54,
    type: "solstice",
    tradition: "Inca",
    note: "The Intihuatana stone ('hitching post of the sun') at Machu Picchu is precisely positioned so that at the winter solstice the sun sits directly above the stone at midday, appearing to be 'tied' to it. The stone also aligns with the four cardinal directions and the Pleiades.",
    researcher: null,
    source: "At the Crossroads of the Earth and Sky, Urton (1981)",
  },
  {
    year: -11600,
    label: "Göbekli Tepe — Sirius heliacal rising at summer solstice",
    lat: 37.22, lng: 38.92,
    type: "solstice",
    tradition: "Pre-Pottery Neolithic / Sweatman hypothesis",
    note: "Martin Sweatman and Dimitrios Tsikritsis (2017) argued that Pillar 43 at Göbekli Tepe encodes the date 10,950 BCE — the approximate date of the Younger Dryas Impact — using stellar positions mapped to animal symbols on the pillar. Column D also appears to track the summer solstice sunrise.",
    researcher: "Martin Sweatman",
    source: "Decoding Göbekli Tepe, Mediterranean Archaeology (2017)",
  },
  {
    year: -2300,
    label: "Callanish Stones — major lunar standstill",
    lat: 58.20, lng: -6.74,
    type: "solstice",
    tradition: "Scottish Neolithic",
    note: "The Callanish Standing Stones on the Isle of Lewis frame the major lunar standstill — an 18.6 year cycle when the moon skims along the horizon at its lowest southerly point. Local tradition calls this the 'moon walking on the hills.'",
    researcher: null,
    source: "Callanish: The Documentary Record, Ponting (1984)",
  },

  // ── Precession Milestones ────────────────────────────────
  {
    year: -25772,
    label: "Previous Great Year completion — full precessional cycle",
    lat: 29.98, lng: 31.13,
    type: "precession",
    tradition: "Astronomical / universal",
    note: "One complete cycle of axial precession takes approximately 25,772 years. This marker notes the previous cycle's completion — when the vernal equinox last occupied the same position as today.",
    researcher: null,
    source: "Astronomical calculation",
  },
  {
    year: -12900,
    label: "Vernal equinox in Cancer — YD Impact epoch",
    lat: 0, lng: 0,
    type: "precession",
    tradition: "Astronomical / YDIH",
    note: "At the time of the proposed Younger Dryas Impact (~12,800 BCE), the vernal equinox was in the constellation Cancer and the summer solstice sunrise was in Leo. The Great Sphinx's leonine form and due-east orientation may encode this astronomical moment.",
    researcher: "Graham Hancock / Robert Bauval",
    source: "Keeper of Genesis (1996)",
  },
  {
    year: -4320,
    label: "Vernal equinox enters Taurus — Age of Taurus begins",
    lat: 0, lng: 0,
    type: "precession",
    tradition: "Western astrological",
    note: "Approximate start of the Age of Taurus. Bull worship reaches global peak. Egyptian Apis, Minoan Minotaur, Sumerian sacred bull. The precession shift coincides with the dawn of the Bronze Age.",
    researcher: null,
    source: "Hamlet's Mill, de Santillana & von Dechend (1969)",
  },

];

// ── PLANETARY CYCLE MARKERS ───────────────────────────────────
// Append to PLANETARY_CYCLES array (create if not existing).
// Major conjunctions and cycles referenced by ancient traditions.

const PLANETARY_CYCLES = [

  // ── Venus Cycles ────────────────────────────────────────
  {
    name: "Venus Synodic Cycle",
    period_years: 1.599,
    tradition: "Mayan / Babylonian / global",
    note: "The 584-day Venus synodic cycle was one of the most carefully tracked astronomical events in the ancient world. The Mayan Dresden Codex contains Venus tables accurate to within 2 hours over 481 years. Babylonian Venus tablets from the reign of Ammisaduqa (c. 1700 BCE) are among the oldest astronomical records.",
    colour: "#f0e060",
  },
  {
    name: "Venus Transit Pair",
    period_years: 121.5,
    tradition: "Astronomical",
    note: "Venus transits occur in pairs 8 years apart, with pairs separated by 105.5 or 121.5 years. Captain James Cook's 1769 voyage to Tahiti was funded specifically to observe the Venus transit and calculate the AU. Ancient Mayan Venus tables could predict transits centuries in advance.",
    colour: "#f0c040",
  },

  // ── Jupiter-Saturn Conjunctions ────────────────────────
  {
    name: "Jupiter-Saturn Great Conjunction",
    period_years: 19.86,
    tradition: "Babylonian / Islamic / Medieval European",
    note: "The ~20-year Jupiter-Saturn conjunction cycle was central to Babylonian astrology and medieval astrological history. Kepler proposed the Star of Bethlehem was a Jupiter-Saturn triple conjunction in 7 BCE. Islamic astrologers used the 'great', 'greater', and 'greatest' conjunction hierarchy to predict dynastic change.",
    colour: "#a0c0e0",
    notable_conjunctions: [
      { year: -7, label: "Bethlehem conjunction — Kepler's Star of Bethlehem hypothesis" },
      { year: 1226, label: "Greatest conjunction in Aquarius — Mongol Empire peak" },
      { year: 1603, label: "Kepler's fiery trigon conjunction — inspired his historical astrology" },
      { year: 2020, label: "Great Conjunction in Aquarius — closest since 1623" },
    ]
  },

  // ── Saros Cycle (Eclipse) ───────────────────────────────
  {
    name: "Saros Eclipse Cycle",
    period_years: 18.03,
    tradition: "Babylonian / Greek / global",
    note: "The 18-year 11-day Saros cycle governs the recurrence of solar and lunar eclipses. Babylonian astronomers had identified it by at least 700 BCE. The Antikythera Mechanism (c. 100 BCE) contains a Saros cycle dial. Some researchers argue Stonehenge's 56 Aubrey Holes track the Saros-related 56-year triple cycle.",
    colour: "#c0a0e0",
  },

  // ── Metonic Cycle ───────────────────────────────────────
  {
    name: "Metonic Cycle",
    period_years: 19.0,
    tradition: "Greek / Babylonian / Celtic",
    note: "After 19 solar years, the moon returns to almost exactly the same phase on the same calendar date. Identified by Meton of Athens in 432 BCE but known to Babylonian astronomers centuries earlier. The 19-year cycle is embedded in the Hebrew calendar and may be encoded in Stonehenge's Station Stone rectangle.",
    colour: "#80b0e0",
  },

  // ── Galactic Alignment ──────────────────────────────────
  {
    name: "Galactic Alignment / Solstice-Galactic Equator",
    period_years: 25772,
    tradition: "New Age / Mayan / Jenkins hypothesis",
    note: "John Major Jenkins argued that the 2012 Mayan calendar end date was calculated to coincide with the sun aligning with the galactic equator at the winter solstice — an event occurring once per precessional Great Year (~25,772 years). This alignment was exact around 1998 CE but within the 36-year 'alignment zone' from 1980–2016. Mainstream astronomers note no physical significance to the alignment.",
    colour: "#6040c0",
    researcher: "John Major Jenkins",
    source: "Maya Cosmogenesis 2012, Jenkins (1998)",
  },

];

// ── CONJUNCTION & NOTABLE ASTRONOMICAL EVENTS TIMELINE ───────
// Append to ASTRONOMICAL_EVENTS array (create if not existing).
// Specific datable events visible from Earth with historical significance.

const ASTRONOMICAL_EVENTS_EXPANSION = [

  {
    year: -12900,
    label: "Proposed Younger Dryas Impact bolide",
    type: "impact",
    note: "Proposed cometary airburst / fragmented impact over the Laurentide Ice Sheet. If real, this would have been a globally visible event — multiple simultaneous fireballs across the northern sky, followed by months of impact winter. Encoded, Hancock argues, in the animal symbols on Göbekli Tepe Pillar 43.",
    source: "Firestone et al., PNAS (2007)",
  },
  {
    year: -5500,
    label: "Supernova visible from Earth — possible rock art records",
    type: "stellar",
    note: "Multiple ancient rock art sites worldwide contain images of unusually bright star-like objects. Some researchers have correlated specific images with known supernova events, though establishing precise dating of rock art remains methodologically challenging.",
    source: "Rock art and celestial events, Whitley & Loubser (2005)",
  },
  {
    year: -3200,
    label: "Sirius heliacal rising coincides with Nile flood",
    type: "stellar",
    note: "Around 3200 BCE, the annual heliacal rising of Sirius (first appearance on the eastern horizon before dawn after 70 days of invisibility) coincided precisely with the annual Nile inundation and the Egyptian New Year. This alignment shifted over millennia due to precession and was a foundational pillar of Egyptian sacred astronomy.",
    source: "The Dawn of Astronomy, Lockyer (1894)",
  },
  {
    year: -2300,
    label: "4.2 kiloyear climate event — widespread civilisation collapse",
    type: "climate",
    note: "A severe global drought lasting 100–200 years around 2200 BCE collapsed or disrupted the Akkadian Empire, Old Kingdom Egypt, the Indus Valley Civilisation, and Early Bronze Age cultures across the Middle East simultaneously. Now recognised as a major global climate event recorded in ice cores, cave stalagmites, and lake sediments worldwide.",
    source: "The 4.2 ka BP event, Staubwasser & Weiss (2006)",
  },
  {
    year: -1628,
    label: "Thera / Santorini volcanic eruption",
    type: "volcanic",
    note: "The Minoan eruption of Thera is one of the largest volcanic events in recorded human history, ejecting approximately 60 cubic kilometres of material. Ice core evidence dates it to around 1628 BCE. It triggered tsunamis across the eastern Mediterranean, crop failures from atmospheric ash, and likely contributed to the decline of Minoan Crete. Some researchers link it to the Exodus plagues and the Atlantis legend.",
    source: "The Minoan Eruption of Santorini, Sigurdsson (2006)",
  },
  {
    year: -1200,
    label: "Bronze Age Collapse — civilisational systems failure",
    type: "collapse",
    note: "Around 1200 BCE, virtually every major Bronze Age civilisation collapsed simultaneously: the Mycenaean kingdoms, Hittite Empire, Ugarit, Late Bronze Age Egypt, Cyprus, and the Levantine city-states. Causes debated: Sea Peoples invasions, drought, systems collapse, earthquake storms, or a combination. It represents the most severe civilisational disruption in the historical record until Rome's fall.",
    source: "1177 BC: The Year Civilization Collapsed, Cline (2014)",
  },
  {
    year: 536,
    label: "Volcanic winter — 'worst year in human history'",
    type: "volcanic",
    note: "A mysterious fog obscured the sun across Europe, the Middle East, and parts of Asia for 18 months from 536 CE — likely caused by a massive volcanic eruption in Iceland. Temperatures dropped 1.5–2.5°C, crops failed, famine spread, and the decades that followed saw the Justinian Plague (541 CE) kill up to half the Eastern Roman Empire's population. Historian Michael McCormick called 536 'the beginning of one of the worst periods to be alive, if not the worst year.'",
    source: "Economic history and the Late Antique ice core, McCormick et al. (2012)",
  },

];

// ============================================================
// END CELESTIAL DATA EXPANSION
//
// SUMMARY:
// - 5 additional zodiac ages including Hindu Yuga and Mayan Long Count overlays
// - 12 new solstice/equinox markers covering Egyptian, Irish, Scottish,
//   Maltese, Indian, Mayan, Inca, and pre-Pottery Neolithic traditions
// - 3 precession milestone markers
// - 5 planetary cycle definitions (Venus, Jupiter-Saturn, Saros, Metonic, Galactic)
// - 7 notable astronomical / climate events on the timeline
//
// DISPLAY SUGGESTIONS:
// - Zodiac ages and Yuga/Mayan cycles render as full-width colored bands
// - Solstice/equinox markers render as vertical tick lines with site pins
// - Planetary cycles render as subtle repeating bands or period indicators
// - Astronomical events render as point markers with tooltip descriptions
// ============================================================
