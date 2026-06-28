/* ============================================================
   CHRONOS · celestial-data.js  (Phase 4)
   All celestial reference data for the timeline overlay.
   Precession cycle, zodiac ages, solstice/equinox alignment
   markers per civilization, key planetary conjunctions.
   Load BEFORE celestial.js.
   Exposes: CELESTIAL_DATA (global)
   ============================================================ */

const CELESTIAL_DATA = (() => {

  // ── PRECESSION CYCLE ──────────────────────────────────────
  // One full cycle = 25,920 years (Platonic Year).
  // Vernal equinox precesses through all 12 zodiac ages.
  // Reference point: ~2000 CE = start of Age of Aquarius transition.
  const PRECESSION_PERIOD = 25920;   // years per full cycle
  const PRECESSION_AGE    = 2160;    // years per zodiac age

  // ── ZODIAC AGES ───────────────────────────────────────────
  // Each age: name, start year, end year, symbol, colour token.
  // Extended back to cover CHRONOS full range (~100,000 BCE).
  const ZODIAC_AGES = [
    // Most recent / relevant to human civilization
    { name:'Age of Aquarius', sym:'♒', s:  2160, e:  4320, color:'rgba(100,160,235,0.18)', labelColor:'rgba(130,190,255,0.8)' },
    { name:'Age of Pisces',   sym:'♓', s:     0, e:  2160, color:'rgba(80,120,200,0.15)',  labelColor:'rgba(120,160,235,0.7)' },
    { name:'Age of Aries',    sym:'♈', s: -2160, e:     0, color:'rgba(200,80,60,0.15)',   labelColor:'rgba(235,120,100,0.7)' },
    { name:'Age of Taurus',   sym:'♉', s: -4320, e: -2160, color:'rgba(160,200,80,0.15)',  labelColor:'rgba(190,230,100,0.7)' },
    { name:'Age of Gemini',   sym:'♊', s: -6480, e: -4320, color:'rgba(220,200,80,0.15)',  labelColor:'rgba(250,230,100,0.7)' },
    { name:'Age of Cancer',   sym:'♋', s: -8640, e: -6480, color:'rgba(80,200,200,0.15)',  labelColor:'rgba(100,230,230,0.7)' },
    { name:'Age of Leo',      sym:'♌', s:-10800, e: -8640, color:'rgba(220,150,40,0.18)',  labelColor:'rgba(250,180,70,0.8)'  },
    { name:'Age of Virgo',    sym:'♍', s:-12960, e:-10800, color:'rgba(140,200,120,0.15)', labelColor:'rgba(170,230,150,0.7)' },
    { name:'Age of Libra',    sym:'♎', s:-15120, e:-12960, color:'rgba(220,180,80,0.15)',  labelColor:'rgba(250,210,100,0.7)' },
    { name:'Age of Scorpio',  sym:'♏', s:-17280, e:-15120, color:'rgba(160,60,160,0.15)',  labelColor:'rgba(200,90,200,0.7)'  },
    { name:'Age of Sagittarius', sym:'♐', s:-19440, e:-17280, color:'rgba(200,120,60,0.15)', labelColor:'rgba(230,150,90,0.7)' },
    { name:'Age of Capricorn',sym:'♑', s:-21600, e:-19440, color:'rgba(100,140,100,0.15)', labelColor:'rgba(140,180,140,0.7)' },
    // Earlier cycles (CHRONOS goes to -100,000)
    { name:'Age of Aquarius', sym:'♒', s:-23760, e:-21600, color:'rgba(100,160,235,0.12)', labelColor:'rgba(130,190,255,0.6)' },
    { name:'Age of Pisces',   sym:'♓', s:-25920, e:-23760, color:'rgba(80,120,200,0.12)',  labelColor:'rgba(120,160,235,0.6)' },
    { name:'Age of Aries',    sym:'♈', s:-28080, e:-25920, color:'rgba(200,80,60,0.12)',   labelColor:'rgba(235,120,100,0.6)' },
    { name:'Age of Taurus',   sym:'♉', s:-30240, e:-28080, color:'rgba(160,200,80,0.12)',  labelColor:'rgba(190,230,100,0.6)' },
    { name:'Age of Gemini',   sym:'♊', s:-32400, e:-30240, color:'rgba(220,200,80,0.12)',  labelColor:'rgba(250,230,100,0.6)' },
    { name:'Age of Cancer',   sym:'♋', s:-34560, e:-32400, color:'rgba(80,200,200,0.12)',  labelColor:'rgba(100,230,230,0.6)' },
    { name:'Age of Leo',      sym:'♌', s:-36720, e:-34560, color:'rgba(220,150,40,0.12)',  labelColor:'rgba(250,180,70,0.6)'  },
    { name:'Age of Virgo',    sym:'♍', s:-38880, e:-36720, color:'rgba(140,200,120,0.12)', labelColor:'rgba(170,230,150,0.6)' },
    { name:'Age of Libra',    sym:'♎', s:-41040, e:-38880, color:'rgba(220,180,80,0.12)',  labelColor:'rgba(250,210,100,0.6)' },
    { name:'Age of Scorpio',  sym:'♏', s:-43200, e:-41040, color:'rgba(160,60,160,0.12)',  labelColor:'rgba(200,90,200,0.6)'  },
    { name:'Age of Sagittarius',sym:'♐',s:-45360,e:-43200, color:'rgba(200,120,60,0.12)',  labelColor:'rgba(230,150,90,0.6)'  },
    { name:'Age of Capricorn',sym:'♑', s:-47520, e:-45360, color:'rgba(100,140,100,0.12)', labelColor:'rgba(140,180,140,0.6)' },
    // Deep past (further cycles, reduced opacity)
    { name:'Age of Aquarius', sym:'♒', s:-49680, e:-47520, color:'rgba(100,160,235,0.08)', labelColor:'rgba(130,190,255,0.4)' },
    { name:'Age of Pisces',   sym:'♓', s:-51840, e:-49680, color:'rgba(80,120,200,0.08)',  labelColor:'rgba(120,160,235,0.4)' },
    { name:'Age of Aries',    sym:'♈', s:-54000, e:-51840, color:'rgba(200,80,60,0.08)',   labelColor:'rgba(235,120,100,0.4)' },
    { name:'Age of Taurus',   sym:'♉', s:-56160, e:-54000, color:'rgba(160,200,80,0.08)',  labelColor:'rgba(190,230,100,0.4)' },
    { name:'Age of Gemini',   sym:'♊', s:-58320, e:-56160, color:'rgba(220,200,80,0.08)',  labelColor:'rgba(250,230,100,0.4)' },
    { name:'Age of Cancer',   sym:'♋', s:-60480, e:-58320, color:'rgba(80,200,200,0.08)',  labelColor:'rgba(100,230,230,0.4)' },
    { name:'Age of Leo',      sym:'♌', s:-62640, e:-60480, color:'rgba(220,150,40,0.08)',  labelColor:'rgba(250,180,70,0.4)'  },
    { name:'Age of Virgo',    sym:'♍', s:-64800, e:-62640, color:'rgba(140,200,120,0.08)', labelColor:'rgba(170,230,150,0.4)' },
    { name:'Age of Leo',      sym:'♌', s:-67060, e:-64800, color:'rgba(220,150,40,0.08)',  labelColor:'rgba(250,180,70,0.4)'  },
    { name:'Age of Cancer',   sym:'♋', s:-100000,e:-67060, color:'rgba(80,200,200,0.06)',  labelColor:'rgba(100,230,230,0.3)' },
  ];

  // ── SOLSTICE / EQUINOX ALIGNMENTS PER CIVILIZATION ──────
  // Linked to CIVS by civId. Each marker shows on the timeline
  // at the specified year, with a vertical line and label.
  const SOLSTICE_MARKERS = [
    // Sphinx — Hancock/Bauval astronomical dating
    { year:-10500, civId:8,  label:'Sphinx — Leo Equinox (Bauval/Hancock)',
      type:'equinox', source:'Graham Hancock & Robert Bauval — Keeper of Genesis (1996)',
      color:'rgba(220,150,40,0.9)' },

    // Great Pyramid — Orion correlation
    { year:-10500, civId:8,  label:"Giza — Orion's Belt Alignment (Bauval)",
      type:'stellar', source:'Robert Bauval — The Orion Mystery (1994)',
      color:'rgba(220,150,40,0.8)' },

    // Göbekli Tepe — Cygnus / Orion proposals
    { year:-9500,  civId:5,  label:'Göbekli Tepe — Cygnus Alignment (Collins)',
      type:'stellar', source:'Andrew Collins — Göbekli Tepe: Genesis of the Gods (2014)',
      color:'rgba(185,130,235,0.9)' },

    // Newgrange — winter solstice chamber illumination
    { year:-3200,  civId:82, label:'Newgrange — Winter Solstice Alignment',
      type:'solstice', source:'Michael O\'Kelly excavations 1962–1975; UNESCO 1993',
      color:'rgba(230,195,80,0.9)' },

    // Stonehenge — summer solstice sunrise
    { year:-2500,  civId:70, label:'Stonehenge — Summer Solstice Sunrise',
      type:'solstice', source:'Atkinson — Stonehenge (1956); English Heritage',
      color:'rgba(230,195,80,0.9)' },

    // Great Pyramid construction / equinox alignment
    { year:-2560,  civId:8,  label:'Great Pyramid — Equinox Alignment Built',
      type:'equinox', source:'Kate Spence, Nature (2000) — pyramid orientation via stars',
      color:'rgba(230,195,80,0.9)' },

    // Dendera zodiac — Egyptian celestial ceiling
    { year:-50,    civId:8,  label:'Dendera Zodiac — Celestial Map Carved',
      type:'stellar', source:'Dendera Temple ceiling, Ptolemaic period ~50 BCE',
      color:'rgba(230,195,80,0.7)' },

    // Angkor Wat spring equinox
    { year:1122,   civId:50, label:'Angkor Wat — Spring Equinox Alignment',
      type:'equinox', source:'Robert Stencel et al. — Science (1976)',
      color:'rgba(80,200,200,0.9)' },

    // Chichen Itza — equinox serpent shadow
    { year:800,    civId:23, label:'Chichen Itza — Equinox Serpent Descent',
      type:'equinox', source:'Anthony Aveni — Skywatchers of Ancient Mexico (1980)',
      color:'rgba(80,200,200,0.9)' },

    // Karnak / Egypt — solstice alignment
    { year:-1300,  civId:8,  label:'Karnak Temple — Winter Solstice Axis',
      type:'solstice', source:'Juan Antonio Belmonte, Archaeoastronomy (2001)',
      color:'rgba(230,195,80,0.8)' },

    // Cahokia Woodhenge
    { year:1000,   civId:56, label:'Cahokia Woodhenge — Equinox Sunrise',
      type:'equinox', source:'Warren Wittry — woodhenge post circles (1960)',
      color:'rgba(230,195,80,0.8)' },

    // Machu Picchu intiwatana stone
    { year:1450,   civId:29, label:"Machu Picchu — Inti Watana Solstice Stone",
      type:'solstice', source:'John Earls — archaeoastronomy surveys (1990s)',
      color:'rgba(230,195,80,0.8)' },

    // Nabta Playa — oldest known astronomical alignment
    { year:-4500,  civId:49, label:'Nabta Playa — Oldest Astronomical Circle',
      type:'solstice', source:'Brophy & Rosen — Journal of Egyptian Archaeology (2005)',
      color:'rgba(80,200,200,0.8)' },

    // Mayan Venus calendar
    { year:-400,   civId:23, label:'Maya Dresden Codex — Venus Cycle Table',
      type:'planetary', source:'Dresden Codex, Classic Maya period',
      color:'rgba(185,130,235,0.9)' },

    // ── NON-WESTERN ASTRONOMICAL TRADITIONS ──────────────────

    // Indian / Vedic astronomy
    { year:-1500,  civId:14, label:'Vedanga Jyotisha — Oldest Indian Astronomical Text',
      type:'stellar', source:'Vedanga Jyotisha (~1400–1200 BCE) — tracks solstices for Vedic ritual',
      color:'rgba(230,195,80,0.85)' },
    { year:-2400,  civId:9,  label:'Indus Valley — Possible Solstice Orientations at Dholavira',
      type:'solstice', source:'Bisht — Dholavira excavations; astronomical orientation studies',
      color:'rgba(80,200,200,0.8)' },

    // Chinese astronomy
    { year:-2300,  civId:13, label:'Yao Canon — Earliest Chinese Astronomical Record',
      type:'equinox', source:'Shujing (Book of Documents) — Emperor Yao astronomers (~2300 BCE)',
      color:'rgba(220,150,40,0.85)' },
    { year:-104,   civId:21, label:'Taichu Calendar — Han Dynasty Astronomical Reform',
      type:'stellar', source:'Emperor Wu of Han — Grand Inception Calendar 104 BCE',
      color:'rgba(220,150,40,0.8)' },
    { year:1088,   civId:21, label:'Su Song Astronomical Clock Tower — Beijing',
      type:'stellar', source:'Su Song — Xin Yi Xiang Fa Yao (1092 CE)',
      color:'rgba(230,195,80,0.8)' },

    // Mesoamerican astronomy
    { year:-400,   civId:102, label:'Monte Albán — Building J Astronomical Observatory',
      type:'stellar', source:'Aveni — Skywatchers of Ancient Mexico (1980)',
      color:'rgba(185,130,235,0.9)' },
    { year:900,    civId:23,  label:'Caracol Observatory, Chichen Itza — Venus Alignments',
      type:'planetary', source:'Aveni & Hartung — Archaeoastronomy (1981)',
      color:'rgba(185,130,235,0.9)' },
    { year:-200,   civId:23,  label:'Uaxactun — Earliest Maya Astronomical Complex',
      type:'equinox', source:'Ricketson & Ricketson — Uaxactun, Guatemala (1937)',
      color:'rgba(185,130,235,0.8)' },

    // Andean astronomy
    { year:-900,   civId:75, label:'Chavín de Huántar — Acoustic Solstice Rituals',
      type:'solstice', source:'Kolar et al. — Journal of the Acoustical Society (2012)',
      color:'rgba(230,195,80,0.8)' },
    { year:1438,   civId:29, label:'Coricancha Temple, Cusco — Solar Observatory',
      type:'equinox', source:'Aveni — Skywatchers of the Ancient Americas (1997)',
      color:'rgba(230,195,80,0.85)' },

    // Mesopotamian / Babylonian astronomy
    { year:-700,   civId:12, label:'MUL.APIN Tablets — Babylonian Star Catalogue',
      type:'stellar', source:'Hunger & Pingree — MUL.APIN (1989); British Museum',
      color:'rgba(220,150,40,0.85)' },
    { year:-400,   civId:7,  label:'Babylonian Astronomical Diaries — Begin',
      type:'stellar', source:'Sachs & Hunger — Astronomical Diaries and Related Texts (1988)',
      color:'rgba(220,150,40,0.8)' },
    { year:-3000,  civId:7,  label:'Nippur — Earliest Mesopotamian Calendar Tablets',
      type:'equinox', source:'Rochberg — The Heavenly Writing (2004)',
      color:'rgba(220,150,40,0.75)' },

    // African astronomy
    { year:-6000,  civId:49, label:'Nabta Playa — Pre-Saharan Stone Circle Calendar',
      type:'solstice', source:'Brophy & Rosen — Journal of Egyptian Archaeology (2005)',
      color:'rgba(80,200,200,0.85)' },
    { year:-3000,  civId:45, label:'Nubian Kerma — Astronomical Burial Orientations',
      type:'stellar', source:'Bonnet — Kerma: Empire de Nubie (2004)',
      color:'rgba(80,200,200,0.75)' },

    // Islamic / Arab astronomy
    { year:830,    civId:25, label:'House of Wisdom — al-Battani Solar Year Measurement',
      type:'equinox', source:'al-Battani — Kitab az-Zij as-Sabi (~900 CE)',
      color:'rgba(230,195,80,0.8)' },
    { year:1000,   civId:25, label:'al-Biruni — Precise Equinox Observations',
      type:'equinox', source:'al-Biruni — Kitab al-Qanun al-Masudi (1030 CE)',
      color:'rgba(230,195,80,0.8)' },

    // Pacific astronomy
    { year:950,    civId:92, label:'Tongan Haamonga — Summer Solstice Notches',
      type:'solstice', source:'Velt — Traditional Astronomy in Tonga (1990)',
      color:'rgba(80,200,200,0.85)' },
    { year:1200,   civId:77, label:'Polynesian Star Navigation System — Codified',
      type:'stellar', source:'Lewis — We the Navigators (1972)',
      color:'rgba(80,200,200,0.8)' },

    // ── INDIAN SUBCONTINENT ───────────────────────────────
    { year:-2000,  civId:14,  label:'Vedic Nakshatra Calendar — Stellar Division System',
      type:'stellar', source:'Rigveda astronomical references; Burgess — Surya Siddhanta (1860)',
      color:'rgba(230,195,80,0.9)' },

    { year:1025,   civId:113, label:'Chola — Brihadisvara Temple Solar Alignment',
      type:'equinox', source:'Subbarayalu — South Indian Studies (1982); UNESCO 1987',
      color:'rgba(80,200,200,0.9)' },

    { year:-400,   civId:87,  label:'Tamil Sangam — Astronomical Verse Corpus',
      type:'stellar', source:'Tolkappiyam astronomical references; Subramanian (1966)',
      color:'rgba(80,200,200,0.8)' },

    { year:500,    civId:22,  label:'Aryabhata — Earth Rotation & Solar Year (499 CE)',
      type:'stellar', source:'Aryabhata — Aryabhatiya (499 CE); Clark translation (1930)',
      color:'rgba(230,195,80,0.9)' },

    // ── CHINESE & EAST ASIAN ──────────────────────────────
    { year:-2300,  civId:13,  label:'Shang Dynasty Oracle Bone Eclipse Records',
      type:'stellar', source:'Shang oracle bones — verified eclipses 1200–1050 BCE',
      color:'rgba(200,80,60,0.9)' },

    { year:-104,   civId:21,  label:'Han Dynasty — Taichu Calendar Reform (104 BCE)',
      type:'solstice', source:'Sima Qian — Shiji astronomical records; Needham (1959)',
      color:'rgba(200,80,60,0.9)' },

    { year:1088,   civId:112, label:'Goryeo — Cheomseongdae Astronomical Observatory',
      type:'stellar', source:'Goryeosa (History of Goryeo); Needham — Science & Civilisation',
      color:'rgba(80,200,200,0.8)' },

    { year:-635,   civId:25,  label:'Islamic Golden Age — Al-Biruni Precession Measurement',
      type:'precession', source:'Al-Biruni — Kitab al-Qanun al-Masudi (1030 CE)',
      color:'rgba(230,195,80,0.9)' },

    // ── MESOAMERICAN & ANDEAN ─────────────────────────────
    { year:-500,   civId:102, label:'Zapotec — Monte Alban Building J Stellar Alignment',
      type:'stellar', source:'Aveni & Hartung — Archaeoastronomy (1981)',
      color:'rgba(185,130,235,0.9)' },

    { year:900,    civId:103, label:'Toltec — Tula Warrior Columns Equinox Alignment',
      type:'equinox', source:'Winning — Pre-Columbian Art of Mexico (1987)',
      color:'rgba(185,130,235,0.8)' },

    { year:-600,   civId:52,  label:'Caral — Sunken Circular Plaza Solstice Alignment',
      type:'solstice', source:'Shady Solis et al. — Science (2001); Benfer (2011)',
      color:'rgba(230,195,80,0.8)' },

    { year:-1000,  civId:74,  label:'Moche — Huaca del Sol Lunar Calendar System',
      type:'stellar', source:'Benson — The Mochica (1972); Bourget astronomic studies',
      color:'rgba(230,195,80,0.8)' },

    { year:1450,   civId:29,  label:'Inca — Coricancha Temple Solar Observatory',
      type:'solstice', source:'Aveni — Skywatchers of Ancient Mexico (1980); Zuidema (1982)',
      color:'rgba(230,195,80,0.9)' },

    { year:1000,   civId:92,  label:"Tonga — Ha'amonga 'a Maui Trilithon Solstice Alignment",
      type:'solstice', source:"King Taufa'ahau Tupou IV identification (1967); Gifford (1929)",
      color:'rgba(80,200,200,0.9)' },

    // ── PACIFIC & SE ASIAN ────────────────────────────────
    { year:800,    civId:50,  label:'Angkor — Pre-Angkor Equinox Temple Orientations',
      type:'equinox', source:'Mannikka — Angkor Wat: Time, Space and Kingship (1996)',
      color:'rgba(80,200,200,0.8)' },

    { year:1150,   civId:113, label:'Chola — Gangaikondacholapuram Equinox Shadow Play',
      type:'equinox', source:'Subbarayalu — Astronomical Alignments of Chola Temples (1991)',
      color:'rgba(80,200,200,0.8)' },

    // ── AFRICAN ───────────────────────────────────────────
    { year:-3000,  civId:45,  label:'Kush/Meroe — Naqa Temple Solar Alignment',
      type:'equinox', source:'Welsby — The Kingdom of Kush (1996); Hinkel (1992)',
      color:'rgba(230,195,80,0.8)' },

    { year:100,    civId:46,  label:'Aksum — Stele Field Astronomical Orientation',
      type:'stellar', source:'Munro-Hay — Aksum: An African Civilisation (1991)',
      color:'rgba(230,195,80,0.8)' },

    { year:-4800,  civId:8,   label:'Nabta Playa — Pre-Dynastic Circle (4800 BCE)',
      type:'solstice', source:'Wendorf & Schild — Holocene Settlement of the Egyptian Sahara (2001)',
      color:'rgba(230,195,80,0.9)' },

    // ── EUROPEAN ADDITIONAL ───────────────────────────────
    { year:-3200,  civId:82,  label:'Cucuteni-Trypillia — Settlement Astronomical Layout',
      type:'stellar', source:'Videiko — Tripolye Culture (1996); Kruts — settlement patterns',
      color:'rgba(185,130,235,0.7)' },

    { year:-2800,  civId:98,  label:'Cycladic — Marble Figurine Astronomical Symbolism',
      type:'stellar', source:'Getz-Preziosi — Sculptors of the Cyclades (1987)',
      color:'rgba(185,130,235,0.7)' },
  ];

  // ── PLANETARY CONJUNCTIONS ────────────────────────────────
  // Major Jupiter-Saturn Great Conjunctions and other events.
  // These mark on the timeline as small dot markers.
  const CONJUNCTIONS = [
    // Historical Great Conjunctions (Jupiter-Saturn, ~20yr cycle)
    // Only the most historically significant ones
    { year:7,    label:'Jupiter-Saturn Triple Conjunction (Star of Bethlehem candidate)',
      type:'jupiter-saturn', color:'rgba(230,195,80,0.9)' },
    { year:1226, label:'Jupiter-Saturn Great Conjunction — Medieval significance',
      type:'jupiter-saturn', color:'rgba(230,195,80,0.7)' },
    { year:1484, label:'Jupiter-Saturn Great Conjunction — Renaissance astrology',
      type:'jupiter-saturn', color:'rgba(230,195,80,0.7)' },
    { year:1603, label:'Jupiter-Saturn Conjunction — Kepler observes',
      type:'jupiter-saturn', color:'rgba(230,195,80,0.7)' },
    { year:1682, label:"Halley's Comet — First computed return",
      type:'comet', color:'rgba(160,230,255,0.9)' },
    { year:1910, label:"Halley's Comet — Earth passes through tail",
      type:'comet', color:'rgba(160,230,255,0.8)' },
    { year:2020, label:'Jupiter-Saturn Great Conjunction (closest since 1623)',
      type:'jupiter-saturn', color:'rgba(230,195,80,0.9)' },

    // Precession boundary crossings (vernal equinox crosses zodiac borders)
    { year:-2160, label:'Precession: Vernal Equinox enters Aries',
      type:'precession', color:'rgba(200,80,60,0.8)' },
    { year:-4320, label:'Precession: Vernal Equinox enters Taurus',
      type:'precession', color:'rgba(160,200,80,0.8)' },
    { year:-6480, label:'Precession: Vernal Equinox enters Gemini',
      type:'precession', color:'rgba(220,200,80,0.8)' },
    { year:-8640, label:'Precession: Vernal Equinox enters Cancer',
      type:'precession', color:'rgba(80,200,200,0.8)' },
    { year:-10800,label:'Precession: Vernal Equinox enters Leo (Younger Dryas boundary)',
      type:'precession', color:'rgba(220,150,40,1.0)' },
    { year:-12960,label:'Precession: Vernal Equinox enters Virgo',
      type:'precession', color:'rgba(140,200,120,0.8)' },

    // Venus transit pairs
    { year:1874,  label:'Venus Transit pair begins (1874/1882)',
      type:'venus', color:'rgba(255,200,100,0.8)' },
    { year:2004,  label:'Venus Transit pair begins (2004/2012)',
      type:'venus', color:'rgba(255,200,100,0.9)' },
  ];

  // ── HELPER: get zodiac age for a year ─────────────────────
  function getZodiacAge(year) {
    return ZODIAC_AGES.find(a => year >= a.s && year < a.e) || null;
  }

  // ── HELPER: get precession angle from J2000 ───────────────
  // Returns degrees of precession (0–360)
  function getPrecessAngle(year) {
    const delta = 2000 - year;   // years before J2000
    return ((delta / PRECESSION_PERIOD) * 360) % 360;
  }

  // ── HELPER: get solstice markers in range ─────────────────
  function getSolsticeMarkers(startYear, endYear) {
    return SOLSTICE_MARKERS.filter(m => m.year >= startYear && m.year <= endYear);
  }

  // ── HELPER: get conjunctions in range ─────────────────────
  function getConjunctions(startYear, endYear) {
    return CONJUNCTIONS.filter(c => c.year >= startYear && c.year <= endYear);
  }

  // ── HELPER: get zodiac ages in range ─────────────────────
  function getZodiacAgesInRange(startYear, endYear) {
    return ZODIAC_AGES.filter(a => a.e > startYear && a.s < endYear);
  }

  return {
    PRECESSION_PERIOD,
    PRECESSION_AGE,
    ZODIAC_AGES,
    SOLSTICE_MARKERS,
    CONJUNCTIONS,
    getZodiacAge,
    getPrecessAngle,
    getSolsticeMarkers,
    getConjunctions,
    getZodiacAgesInRange,
  };

})();
