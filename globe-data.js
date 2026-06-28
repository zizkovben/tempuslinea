/* ============================================================
   CHRONOS · globe-data.js
   Globe coordinate data, epoch snapshots, and border configs.
   Load AFTER data.js and data-extended.js.
   Exposes: GLOBE_DATA (global)
   ============================================================ */

const GLOBE_DATA = (() => {

  // ── CIV COORDINATES ──────────────────────────────────────
  // lat/lng centre point for each civilization.
  // Used to place markers on the globe surface.
  const CIV_COORDS = {
    1:  { lat:  0,    lng: 160  },   // Lemuria / Pacific
    2:  { lat: 30,    lng:  -5  },   // Pre-Flood / Global
    3:  { lat: 36,    lng: -25  },   // Atlantis / Atlantic
    4:  { lat: 24.5,  lng: 123  },   // Yonaguni / Japan
    5:  { lat: 37.2,  lng:  38.9},   // Göbekli Tepe / Anatolia
    6:  { lat: 37.7,  lng:  32.8},   // Çatalhöyük
    7:  { lat: 31.0,  lng:  46.0},   // Sumer / Mesopotamia
    8:  { lat: 26.0,  lng:  31.0},   // Ancient Egypt
    9:  { lat: 27.0,  lng:  68.0},   // Indus Valley
    10: { lat: 35.3,  lng:  25.1},   // Minoan / Crete
    11: { lat: 37.7,  lng:  22.7},   // Mycenae
    12: { lat: 36.4,  lng:  43.1},   // Assyrian
    13: { lat: 34.0,  lng: 113.0},   // Shang Dynasty
    14: { lat: 28.0,  lng:  79.0},   // Vedic India
    15: { lat: 18.0,  lng: -95.0},   // Olmec
    16: { lat: 34.0,  lng:  35.5},   // Phoenicia
    17: { lat: 38.0,  lng:  23.7},   // Ancient Greece
    18: { lat: 32.0,  lng:  53.0},   // Achaemenid Persia
    19: { lat: 36.8,  lng:  10.2},   // Carthage
    20: { lat: 41.9,  lng:  12.5},   // Rome
    21: { lat: 34.0,  lng: 109.0},   // Han Dynasty
    22: { lat: 25.0,  lng:  82.0},   // Maurya Empire
    23: { lat: 16.0,  lng: -89.0},   // Maya
    24: { lat: 41.0,  lng:  29.0},   // Byzantine
    25: { lat: 33.3,  lng:  44.4},   // Islamic Golden Age
    26: { lat: 60.0,  lng:  10.0},   // Vikings
    27: { lat: 47.0,  lng: 107.0},   // Mongol Empire
    28: { lat: 19.4,  lng: -99.1},   // Aztec
    29: { lat:-13.0,  lng: -72.0},   // Inca
    30: { lat: 41.0,  lng:  29.0},   // Ottoman
    31: { lat:  0,    lng: -30.0},   // Pre-Columbian Contact
    32: { lat: 31.0,  lng:  46.0},   // Anunnaki / Theorized
    33: { lat:  0,    lng:   0   },   // Ancient Aliens / Global
    34: { lat: 31.0,  lng:  46.0},   // Ubaid
    35: { lat: 31.0,  lng:  46.2},   // Eridu
    36: { lat: 31.3,  lng:  45.6},   // Uruk
    37: { lat: 32.1,  lng:  45.2},   // Nippur
    38: { lat: 31.0,  lng:  46.0},   // Anunnaki Cuneiform
    39: { lat: 31.0,  lng:  46.0},   // Pre-Flood Kingdoms
    40: { lat: 31.5,  lng:  45.8},   // Antediluvian Cities
    41: { lat: -1.7,  lng: -78.0},   // Upano Valley
    42: { lat: -9.5,  lng: -67.0},   // Amazonian Geoglyphs
    43: { lat:-22.2,  lng:  29.3},   // Mapungubwe
    44: { lat:-20.3,  lng:  30.9},   // Great Zimbabwe
    45: { lat: 16.9,  lng:  33.7},   // Kush / Meroe
    46: { lat: 14.1,  lng:  38.7},   // Aksum
    47: { lat: 12.0,  lng:  -8.0},   // Mali Empire
    48: { lat: -8.8,  lng:  39.5},   // Swahili Coast
    49: { lat: 23.0,  lng:   8.0},   // Green Sahara
    50: { lat: 13.4,  lng: 103.9},   // Khmer / Angkor
    51: { lat: 37.0,  lng: 137.0},   // Jomon
    52: { lat:-10.9,  lng: -77.8},   // Caral
    53: { lat: 19.7,  lng: -98.8},   // Teotihuacan
    54: { lat:-16.5,  lng: -68.7},   // Tiwanaku
    55: { lat:-14.7,  lng: -75.1},   // Nazca
    56: { lat: 38.6,  lng: -90.1},   // Cahokia
    57: { lat:-27.1,  lng:-109.4},   // Easter Island
    58: { lat: 35.8,  lng:  43.8},   // Akkadian Empire
    59: { lat: 40.0,  lng:  34.6},   // Hittite
    60: { lat: 30.3,  lng:  35.4},   // Nabataea / Petra
    61: { lat: 32.5,  lng:  44.4},   // Babylon
    62: { lat: 32.6,  lng:  44.4},   // Sassanid
    63: { lat: 32.2,  lng:  48.3},   // Elam / Susa
    64: { lat: 35.0,  lng:  51.0},   // Parthia
    65: { lat: 17.0,  lng:   0.0},   // Songhai
    66: { lat:  6.3,  lng:   5.6},   // Kingdom of Benin
    67: { lat:  9.0,  lng:   8.0},   // Nok Culture
    68: { lat: 26.0,  lng:  13.0},   // Garamantian
    69: { lat: 43.0,  lng:  11.0},   // Etruscan
    70: { lat: 47.0,  lng:   2.0},   // Celtic
    71: { lat: -2.9,  lng: 104.7},   // Srivijaya
    72: { lat: 15.0,  lng: 108.3},   // Champa
    73: { lat: 36.1,  lng:-107.9},   // Ancestral Puebloans
    74: { lat: -8.0,  lng: -79.0},   // Moche
    75: { lat: -9.5,  lng: -77.2},   // Chavin
    76: { lat: 32.6,  lng: -91.4},   // Poverty Point
    77: { lat: -5.0,  lng: 152.0},   // Lapita
    78: { lat: 48.0,  lng:  35.0},   // Scythian
    79: { lat: 11.0,  lng:  44.0},   // Land of Punt
    80: { lat: 39.9,  lng: -83.0},   // Hopewell
    81: { lat:-41.0,  lng: -73.0},   // Pre-Clovis (Monte Verde)
    82: { lat: 49.0,  lng:  30.0},   // Cucuteni-Trypillia
    83: { lat: 31.0,  lng: 104.0},   // Sanxingdui
    84: { lat: 37.2,  lng:  38.9},   // Göbekli Builders
    85: { lat: 35.3,  lng:  25.1},   // Linear A / Minoan
    86: { lat: 48.0,  lng:  38.0},   // Yamnaya / PIE
    87: { lat: 10.0,  lng:  78.0},   // Tamil Sangam
    88: { lat: 18.1,  lng: -94.8},   // Epi-Olmec
    89: { lat: 31.8,  lng:  35.2},   // Ancient Israel
    90: { lat: 33.5,  lng:  36.3},   // Aramaic Tradition

    // ── BATCH 2 — ids 91–115 ─────────────────────────────────
    91:  { lat: 20.7,  lng:-156.4 },   // Hawaii
    92:  { lat:-21.2,  lng:-175.2 },   // Tonga
    93:  { lat:  6.84, lng: 158.3 },   // Nan Madol / Pohnpei
    94:  { lat: 34.5,  lng:  69.2 },   // Kushan / Kabul region
    95:  { lat: 39.6,  lng:  66.9 },   // Sogdia / Samarkand
    96:  { lat: 44.0,  lng:  50.0 },   // Khazar / Caspian
    97:  { lat: 39.6,  lng:  66.9 },   // Timurid / Samarkand
    98:  { lat: 36.9,  lng:  25.4 },   // Cycladic / Paros
    99:  { lat: 48.9,  lng:   2.3 },   // Carolingian / Aachen-Paris
    100: { lat: 45.4,  lng:  12.3 },   // Venice
    101: { lat: 50.4,  lng:  30.5 },   // Kievan Rus / Kyiv
    102: { lat: 17.0,  lng: -96.7 },   // Zapotec / Monte Alban
    103: { lat: 20.1,  lng: -99.3 },   // Toltec / Tula
    104: { lat: 18.5,  lng: -72.3 },   // Taino / Hispaniola
    105: { lat: 35.0,  lng: -90.0 },   // Mississippian / Mississippi Valley
    106: { lat: -6.0,  lng:  14.4 },   // Kingdom of Kongo
    107: { lat:  9.0,  lng:  38.7 },   // Ethiopian Empire / Addis Ababa
    108: { lat:  7.2,  lng:   2.1 },   // Dahomey / Abomey
    109: { lat: 18.5,  lng:  31.8 },   // Nubian Kingdoms / Old Dongola
    110: { lat: 15.3,  lng:  76.5 },   // Vijayanagara / Hampi
    111: { lat: 21.2,  lng:  94.9 },   // Pagan / Bagan
    112: { lat: 37.6,  lng: 126.9 },   // Goryeo / Seoul region
    113: { lat: 10.8,  lng:  79.1 },   // Chola / Thanjavur
    114: { lat: 32.7,  lng:  51.7 },   // Safavid / Isfahan
    115: { lat: 27.2,  lng:  78.0 },   // Mughal / Agra

    // ── PHASE 5f — ids 116–150 ───────────────────────────────
    116: { lat:  45.0,  lng:  -90.0  },   // YDB Culture — North American centroid
    117: { lat:   0.0,  lng:    0.0  },   // Pre-Flood Maritime — global centroid
    118: { lat:  34.0,  lng:  -79.0  },   // YDB Impact Sites — Carolina Bays centroid
    119: { lat:  21.1,  lng:  -11.4  },   // Richat Structure / Eye of Sahara
    120: { lat: -25.5,  lng:   31.0  },   // Anunnaki Gold Mining — Mpumalanga
    121: { lat:  51.5,  lng:   84.0  },   // Denisovan — Altai/Denisova Cave, Siberia
    122: { lat:  27.0,  lng:   68.0  },   // Harappan Script — Indus Valley
    123: { lat:  14.5,  lng:   -3.5  },   // Dogon — Bandiagara Escarpment, Mali
    124: { lat:  28.0,  lng:   72.0  },   // Indus-Saraswati — Ghaggar-Hakra system
    125: { lat: -27.1,  lng: -109.4  },   // Easter Island Extended Contact
    126: { lat:  43.3,  lng:   11.3  },   // Etruscan Origins — Tuscany
    127: { lat:  32.6,  lng:  -91.4  },   // Poverty Point Astronomical — Louisiana
    128: { lat:  59.0,  lng:   -3.1  },   // Orkney Neolithic — Scotland
    129: { lat:  37.2,  lng:   38.9  },   // Göbekli Tepe Astronomical — Turkey
    130: { lat:  25.0,  lng:   73.0  },   // Vedic Astronomical Dating — Rajasthan
    131: { lat: -13.2,  lng:  -72.5  },   // Machu Picchu / Inca Cosmology — Peru
    132: { lat:  13.4,  lng:  103.9  },   // Angkor Cosmological Design — Cambodia
    133: { lat:  29.98, lng:   31.1  },   // Orion Correlation Theory — Giza
    134: { lat:  11.6,  lng:  104.9  },   // Angkor Pre-History — Phnom Penh area
    135: { lat:  14.1,  lng:   38.7  },   // Phoenician Circumnavigation — Aksum/Red Sea
    136: { lat:  22.2,  lng:   72.1  },   // Lost City of Dwarka — Gulf of Khambhat
    137: { lat: -10.0,  lng: -150.0  },   // Mu / Pacific Lemuria — Pacific centroid
    138: { lat:  39.0,  lng:  -98.0  },   // Pre-Flood N. America — continent centroid
    139: { lat: -25.1,  lng:   30.8  },   // Adam's Calendar — Mpumalanga
    140: { lat:  60.0,  lng:   90.0  },   // Tartaria / Hyperborea — Siberian centroid
    141: { lat: -80.0,  lng:  -60.0  },   // Antarctic Pre-Ice Civilization
    142: { lat:  45.0,  lng:    1.5  },   // Châtelperronian — SW France
    143: { lat:  44.8,  lng:    5.3  },   // Aurignacian — Chauvet region, France
    144: { lat:  48.9,  lng:   16.6  },   // Gravettian — Dolní Věstonice, Czechia
    145: { lat:  45.1,  lng:    1.1  },   // Magdalenian — Lascaux, France
    146: { lat:  37.3,  lng:   38.7  },   // Karahantepe — SE Turkey
    147: { lat:  37.7,  lng:   38.9  },   // Çayönü Tepesi — SE Turkey
    148: { lat:  43.98, lng:   18.2  },   // Bosnian Pyramid — Visoko
    149: { lat:  22.5,  lng:   30.7  },   // Nabta Playa — Southern Egypt
    150: { lat:  72.0,  lng:    0.0  },   // Thule — Northern polar centroid

    // ── PHASE 5k — ids 151–180 ───────────────────────────────
    151: { lat:   6.34, lng:    5.63 },   // Benin Empire — Benin City, Nigeria
    152: { lat:   8.93, lng:    3.98 },   // Oyo Empire — Old Oyo (Katunga)
    153: { lat:  13.55, lng:   33.62 },   // Funj Sultanate — Sennar, Sudan
    154: { lat:  12.11, lng:   15.04 },   // Kanem-Bornu — Lake Chad Basin
    155: { lat:  19.90, lng:   85.02 },   // Ganga Dynasty — Bhubaneswar, Odisha
    156: { lat:  12.84, lng:   79.70 },   // Pallava Empire — Kanchipuram
    157: { lat:  -2.98, lng:  104.78 },   // Srivijaya — Palembang, Sumatra
    158: { lat:  -7.56, lng:  112.39 },   // Majapahit — Trowulan, East Java
    159: { lat:  38.66, lng:  -90.06 },   // Mississippian — Cahokia, Illinois
    160: { lat: -16.55, lng:  -68.67 },   // Tiwanaku — Lake Titicaca, Bolivia
    161: { lat:  -4.50, lng:  152.50 },   // Lapita — Bismarck Archipelago
    162: { lat:  20.25, lng: -155.83 },   // Hawaiian Chiefdom — Kohala, Hawaii
    163: { lat:  39.63, lng:   66.98 },   // Sogdian — Samarkand, Uzbekistan
    164: { lat:  37.90, lng:   62.08 },   // BMAC — Gonur Depe, Turkmenistan
    165: { lat:  46.35, lng:   48.03 },   // Khazar — Atil, Volga Delta
    166: { lat:  43.98, lng:   18.17 },   // Bosnian Pyramids — Visoko
    167: { lat: -25.07, lng:   30.84 },   // Adam's Calendar — Mpumalanga
    168: { lat:  37.22, lng:   38.92 },   // Göbekli Tepe Builders — Turkey
    169: { lat:  31.01, lng:  104.42 },   // Sanxingdui — Guanghan, Sichuan
    170: { lat:  24.44, lng:  122.94 },   // Yonaguni Monument — Japan
    171: { lat:  72.00, lng:    0.00 },   // Thule — Northern polar centroid
    172: { lat:  39.00, lng:  -98.00 },   // Pre-Flood N. America — centroid
    173: { lat: -10.00, lng: -150.00 },   // Mu / Pacific Lemuria — centroid
    174: { lat:  60.00, lng:   90.00 },   // Tartaria / Hyperborea — centroid
    175: { lat: -80.00, lng:  -60.00 },   // Antarctic Pre-Ice — centroid
    176: { lat:  14.13, lng:   38.72 },   // Aksumite Empire — Aksum, Ethiopia
    177: { lat: -22.20, lng:   29.34 },   // Mapungubwe — Limpopo, South Africa
    178: { lat:  -8.11, lng:  -79.07 },   // Chimú Empire — Chan Chan, Peru
    179: { lat:  40.06, lng:  -82.41 },   // Hopewell Culture — Newark, Ohio
    180: { lat:  40.81, lng:  140.70 },   // Jōmon — Sannai-Maruyama, Aomori

// PHASE 5m — NEW CIV_COORDS ENTRIES 181–210
// Append these into the CIV_COORDS object in globe-data.js
// Paste before the closing }; of the CIV_COORDS object

    181: { lat:  17.33, lng:  33.71 },   // Kingdom of Kush — Meroë, Sudan
    182: { lat:  10.50, lng:   8.50 },   // Nok Culture — Jos Plateau, Nigeria
    183: { lat: -20.27, lng:  30.93 },   // Great Zimbabwe — Masvingo, Zimbabwe
    184: { lat:   6.33, lng:   5.62 },   // Benin Kingdom — Benin City, Nigeria
    185: { lat:  -8.96, lng:  39.61 },   // Swahili City-States — Kilwa, Tanzania
    186: { lat:  10.78, lng:  79.14 },   // Chola Empire — Thanjavur, Tamil Nadu
    187: { lat:  13.41, lng: 103.87 },   // Khmer Empire — Angkor Wat, Cambodia
    188: { lat:  15.77, lng: 108.22 },   // Champa Kingdom — My Son, Vietnam
    189: { lat:  21.17, lng:  94.86 },   // Pagan Kingdom — Bagan, Myanmar
    190: { lat:  47.00, lng:  35.00 },   // Scythian Civilisation — Pontic steppe centroid
    191: { lat:  47.50, lng: 107.00 },   // Xiongnu Empire — Mongolian plateau centroid
    192: { lat:  48.00, lng:  98.00 },   // Göktürk Khaganate — Orkhon Valley, Mongolia
    193: { lat:  38.66, lng: -90.06 },   // Mississippian Cahokia — Cahokia Mounds, Illinois
    194: { lat:  17.04, lng: -96.77 },   // Zapotec — Monte Albán, Oaxaca
    195: { lat: -13.16, lng: -74.22 },   // Wari Empire — Huari, Ayacucho, Peru
    196: { lat:  32.71, lng: -87.64 },   // Moundville — Alabama
    197: { lat:  42.63, lng:  11.88 },   // Etruscan — Tarquinia centroid
    198: { lat:  35.30, lng:  25.16 },   // Minoan — Knossos, Crete
    199: { lat:  33.89, lng:  35.50 },   // Phoenician — Byblos / Tyre centroid
    200: { lat:  47.00, lng:   2.00 },   // Celtic — Gaul / Central Europe centroid
    201: { lat:  40.02, lng:  34.61 },   // Hittite Empire — Hattusa, Turkey
    202: { lat:  30.32, lng:  35.44 },   // Nabataean Kingdom — Petra, Jordan
    203: { lat:  25.00, lng:  81.00 },   // Vimāna / Vedic — Gangetic Plain centroid
    204: { lat:  21.12, lng: -11.40 },   // Richat Atlantis — Eye of the Sahara, Mauritania
    205: { lat:  -2.00, lng: 108.00 },   // Sundaland — drowned shelf centroid
    206: { lat:  22.24, lng:  68.97 },   // Dwarka — Gulf of Khambhat, India
    207: { lat: -12.00, lng: -53.50 },   // Lost City of Z — upper Xingu, Brazil
    208: { lat: -41.50, lng: -73.20 },   // Pre-Clovis Americas — Monte Verde anchor
    209: { lat:  32.54, lng:  45.54 },   // Anunnaki — ancient Sumer centroid
    210: { lat:  51.40, lng:  84.70 },   // Denisovan — Denisova Cave, Altai

    // ── BATCH 5o — ids 211–240 ────────────────────────────────
    211: { lat:  15.75, lng:  -8.00 },   // Ghana Empire (Wagadu) — Koumbi Saleh
    212: { lat:   0.30, lng:  32.50 },   // Buganda Kingdom — near Kampala, Uganda
    213: { lat:  13.06, lng:   5.24 },   // Sokoto Caliphate — Sokoto, Nigeria
    214: { lat:  25.50, lng:   9.00 },   // Tassili n'Ajjer — Algerian Sahara
    215: { lat:  34.27, lng:-103.20 },   // Clovis Culture — Blackwater Draw, New Mexico
    216: { lat:  39.00, lng: -83.00 },   // Adena Culture — Ohio Valley
    217: { lat:  11.20, lng: -74.00 },   // Tairona — Sierra Nevada de Santa Marta, Colombia
    218: { lat:   5.00, lng: -73.60 },   // Muisca — Bogotá altiplano, Colombia
    219: { lat:  26.50, lng: -82.00 },   // Calusa Kingdom — SW Florida
    220: { lat:  26.00, lng:  50.55 },   // Dilmun — Bahrain
    221: { lat:  10.20, lng: 105.10 },   // Funan Kingdom — Óc Eo, Mekong Delta
    222: { lat:  35.84, lng: 129.21 },   // Silla Kingdom — Gyeongju, Korea
    223: { lat:  34.50, lng: 135.70 },   // Yamato/Kofun — Kinai region, Japan
    224: { lat:  29.65, lng:  91.10 },   // Tibetan Empire — Lhasa
    225: { lat:  37.27, lng:  -6.06 },   // Tartessos — Huelva, Spain
    226: { lat:  36.05, lng:  14.27 },   // Malta Megalithic Temples — Ġgantija, Gozo
    227: { lat:  42.70, lng:  25.30 },   // Thracian Civilisation — Bulgaria
    228: { lat:  54.50, lng:   3.00 },   // Doggerland — Dogger Bank, North Sea
    229: { lat:  15.43, lng:  45.33 },   // Kingdom of Saba — Marib, Yemen
    230: { lat:  38.50, lng:  43.40 },   // Urartu — Lake Van, Turkey
    231: { lat:  34.80, lng:  48.50 },   // Median Empire — Ecbatana/Hamadan, Iran
    232: { lat: -23.00, lng: 133.00 },   // Aboriginal Australian Civilisation — central Australia
    233: { lat: -41.00, lng: 174.00 },   // Māori Civilisation — Aotearoa/New Zealand
    234: { lat:  25.70, lng: -79.30 },   // Bimini Road — Bahamas
    235: { lat:  18.00, lng: -95.00 },   // Olmec Trans-Atlantic Contact — Gulf Coast, Mexico
    236: { lat:  40.00, lng: -40.00 },   // Solutrean Hypothesis — mid-Atlantic
    237: { lat:  46.20, lng:-119.20 },   // Kennewick Man — Columbia River, Washington
    238: { lat:  29.00, lng: 119.00 },   // Longyou Caves — Zhejiang, China
    239: { lat:  34.00, lng:  36.20 },   // Baalbek Megaliths — Beqaa Valley, Lebanon
    240: { lat:   5.13, lng: -73.78 },   // El Dorado — Lake Guatavita, Colombia

    // ── Phase 5r — ids 241–270 ──────────────────────────────
    241: { lat:  15.00, lng:  32.50 },   // Kingdom of Kerma — Upper Nubia, Sudan
    242: { lat:  14.80, lng: -14.50 },   // Jolof Empire — Senegal
    243: { lat:   6.01, lng:   7.04 },   // Igbo-Ukwu — southeastern Nigeria
    244: { lat:  12.03, lng:  39.04 },   // Zagwe / Lalibela — Ethiopian Highlands
    245: { lat:  11.99, lng:   8.52 },   // Hausa / Kano — northern Nigeria
    246: { lat:  -9.50, lng:  24.00 },   // Kingdom of Lunda — Central Africa (DRC)
    247: { lat:  47.60, lng:  -2.95 },   // Carnac Megaliths — Brittany, France
    248: { lat:  51.28, lng:  11.54 },   // Únětice / Nebra — Germany
    249: { lat:  45.00, lng:   5.00 },   // Bell Beaker Culture — Western Europe centroid
    250: { lat:  40.12, lng:   9.01 },   // Nuragic — Sardinia, Italy
    251: { lat:  34.69, lng: 112.67 },   // Xia Dynasty — Erlitou, Henan, China
    252: { lat:  29.37, lng:  67.33 },   // Mehrgarh — Balochistan, Pakistan
    253: { lat:  28.68, lng:  57.72 },   // Jiroft — Kerman Province, Iran
    254: { lat:  36.84, lng:  40.32 },   // Mitanni — Upper Mesopotamia
    255: { lat:  39.03, lng: 125.75 },   // Gojoseon — Pyongyang region
    256: { lat:  13.82, lng: 100.06 },   // Dvaravati — Nakhon Pathom, Thailand
    257: { lat:  36.02, lng:  36.74 },   // Ebla — Tell Mardikh, Syria
    258: { lat:  38.49, lng:  28.04 },   // Lydia — Sardis, western Anatolia
    259: { lat:  -6.996,lng: 107.06 },   // Gunung Padang — West Java, Indonesia
    260: { lat:  32.77, lng:-106.17 },   // White Sands Footprints — New Mexico, USA
    261: { lat: -20.00, lng: -70.00 },   // Chinchorro — Atacama coast, Chile
    262: { lat:  30.37, lng:-107.94 },   // Casas Grandes / Paquimé — Chihuahua, Mexico
    263: { lat:  39.50, lng:-111.00 },   // Fremont Culture — Utah, USA
    264: { lat:  32.52, lng: -91.90 },   // Watson Brake — Louisiana, USA
    265: { lat:   8.79, lng: -83.55 },   // Diquís Stone Spheres — Costa Rica
    266: { lat:   9.51, lng: 138.13 },   // Yap Stone Money — Yap Island, Micronesia
    267: { lat:  63.00, lng:-168.00 },   // Beringia Migration — Bering Land Bridge
    268: { lat:  40.02, lng:  34.61 },   // Hattian — Central Anatolia, Turkey
    269: { lat:  44.00, lng: 129.00 },   // Balhae — Manchuria / Russian Far East
    270: { lat:  40.54, lng:  81.28 },   // Tarim Basin Mummies — Xinjiang, China

    // ── Phase 5u — ids 271–300 ──────────────────────────────
    271: { lat:  14.13, lng:  38.73 },   // Aksumite Empire — Aksum, Ethiopia
    272: { lat:  32.63, lng: -91.40 },   // Poverty Point — Louisiana, USA
    273: { lat: -22.20, lng:  29.33 },   // Mapungubwe — Limpopo Valley, South Africa
    274: { lat: -16.56, lng: -68.67 },   // Tiwanaku — Lake Titicaca, Bolivia
    275: { lat: -13.16, lng: -74.22 },   // Wari — Ayacucho, Peru
    276: { lat:  38.66, lng: -90.06 },   // Mississippian / Cahokia — Illinois, USA
    277: { lat:  37.22, lng:  38.92 },   // Göbekli Tepe — southeastern Turkey
    278: { lat:  40.05, lng: -82.40 },   // Hopewell — Ohio, USA
    279: { lat:  47.50, lng:  28.50 },   // Cucuteni-Trypillia — Moldova/Ukraine
    280: { lat:  -9.79, lng: -77.52 },   // Caral / Norte Chico — Supe Valley, Peru
    281: { lat:  48.00, lng:  40.00 },   // Yamnaya — Pontic-Caspian Steppe
    282: { lat:  30.98, lng: 104.08 },   // Sanxingdui — Sichuan, China
    283: { lat:  -4.00, lng: 152.00 },   // Lapita — Bismarck Archipelago, Papua New Guinea
    284: { lat:  39.67, lng:  66.98 },   // Sogdian — Samarkand, Uzbekistan
    285: { lat:  30.33, lng:  35.44 },   // Nabataean — Petra, Jordan
    286: { lat:  43.00, lng:  11.00 },   // Etruscan — Tuscany, Italy
    287: { lat:  47.50, lng:  38.00 },   // Scythian — Pontic Steppe
    288: { lat:  35.30, lng:  25.16 },   // Minoan — Knossos, Crete
    289: { lat:  33.90, lng:  35.50 },   // Phoenician — Byblos/Tyre, Lebanon
    290: { lat:  27.33, lng:  68.13 },   // Harappan / Indus Valley — Mohenjo-daro
    291: { lat:  14.50, lng:  39.50 },   // D'mt — Tigray, Ethiopia
    292: { lat:  26.23, lng:  50.51 },   // Dilmun — Bahrain
    293: { lat:  17.53, lng: -94.91 },   // Olmec — San Lorenzo, Gulf Coast Mexico
    294: { lat:  48.00, lng:   8.00 },   // Celtic — La Tène, Central Europe centroid
    295: { lat:  25.00, lng:  82.00 },   // Mauryan — Pataliputra, India
    296: { lat:  13.41, lng: 103.87 },   // Khmer — Angkor, Cambodia
    297: { lat:  41.01, lng:  28.97 },   // Byzantine — Constantinople (Istanbul)
    298: { lat:  41.00, lng: 126.00 },   // Goguryeo — northern Korean peninsula
    299: { lat:  20.07, lng: -99.34 },   // Toltec — Tula, Mexico
    300: { lat:  21.31, lng:-157.86 },   // Hawaiian — Honolulu / Oahu

    // ── Phase 5v — ids 301–330 ──────────────────────────────
    301: { lat:  15.30, lng:  39.47 },   // Adulis — Red Sea coast, Eritrea
    302: { lat:  16.93, lng:  33.75 },   // Kush / Meroe — Sudan
    303: { lat:   9.87, lng:   8.89 },   // Nok Culture — central Nigeria
    304: { lat: -20.27, lng:  30.93 },   // Great Zimbabwe — Zimbabwe
    305: { lat:  15.00, lng:  40.00 },   // Punt — Horn of Africa (mainstream candidate)
    306: { lat:  18.97, lng: -72.29 },   // Taino — Hispaniola, Caribbean
    307: { lat:  32.99, lng: -87.65 },   // Moundville — Alabama, USA
    308: { lat:  36.06, lng:-107.96 },   // Chaco Canyon — New Mexico, USA
    309: { lat:  57.05, lng:-135.33 },   // Tlingit — Sitka, Southeast Alaska
    310: { lat:  31.50, lng: -91.50 },   // Archaic South — Lower Mississippi centroid
    311: { lat:  23.89, lng:  70.19 },   // Dholavira — Gujarat, India
    312: { lat:  29.97, lng:  77.55 },   // Vedic — Upper Gangetic Plain
    313: { lat:  36.12, lng: 114.32 },   // Shang — Yinxu/Anyang, China
    314: { lat:  34.27, lng: 108.93 },   // Zhou — Luoyi/Luoyang, China
    315: { lat:  29.93, lng:  52.88 },   // Achaemenid — Persepolis, Iran
    316: { lat:  32.54, lng:  44.42 },   // Parthian — Ctesiphon, Iraq
    317: { lat:  32.54, lng:  44.42 },   // Sasanian — Ctesiphon, Iraq
    318: { lat:  34.27, lng: 108.93 },   // Tang — Chang'an (Xi'an), China
    319: { lat:  30.25, lng: 120.15 },   // Song — Hangzhou, China
    320: { lat:  -2.99, lng: 104.75 },   // Srivijaya — Palembang, Sumatra
    321: { lat:  -7.60, lng: 111.52 },   // Majapahit — Trowulan, East Java
    322: { lat:  28.66, lng:  77.22 },   // Delhi Sultanate — Delhi, India
    323: { lat:  15.33, lng:  76.46 },   // Vijayanagara — Hampi, India
    324: { lat:  47.90, lng: 106.90 },   // Mongol — Karakorum, Mongolia
    325: { lat:  41.01, lng:  28.97 },   // Ottoman — Constantinople/Istanbul
    326: { lat:  27.17, lng:  78.04 },   // Mughal — Agra (Taj Mahal), India
    327: { lat: -13.53, lng: -71.97 },   // Inca — Cusco, Peru
    328: { lat:  19.43, lng: -99.13 },   // Aztec — Tenochtitlan (Mexico City)
    329: { lat:  17.22, lng: -89.62 },   // Maya — Tikal, Guatemala
    330: { lat:  36.85, lng:  10.32 },   // Carthage — Tunis, Tunisia

    // ── Phase 5w — ids 331–360 ──────────────────────────────
    331: { lat:  40.64, lng:  22.94 },   // Macedonian / Hellenistic — Pella, Greece
    332: { lat:  41.89, lng:  12.49 },   // Roman Republic — Rome, Italy
    333: { lat:  41.89, lng:  12.49 },   // Roman Empire — Rome, Italy
    334: { lat:  59.91, lng:  10.75 },   // Viking / Norse — Oslo, Norway
    335: { lat:  52.52, lng:  13.40 },   // Holy Roman Empire — Berlin/Aachen centroid
    336: { lat:  50.77, lng:   6.09 },   // Carolingian — Aachen, Germany
    337: { lat:  48.85, lng:   2.35 },   // Capetian France — Paris
    338: { lat:  51.51, lng:  -0.13 },   // Plantagenet England — London
    339: { lat:  50.45, lng:  30.52 },   // Kievan Rus — Kyiv, Ukraine
    340: { lat:  12.65, lng:  -8.00 },   // Mali Empire — Niani/Bamako region
    341: { lat:  16.27, lng:  -0.04 },   // Songhai — Gao, Mali
    342: { lat:   6.34, lng:   5.63 },   // Kingdom of Benin — Benin City, Nigeria
    343: { lat:  -8.99, lng:  39.72 },   // Swahili Coast — Kilwa, Tanzania
    344: { lat:  12.36, lng:  37.37 },   // Solomonic Ethiopia — Gondar, Ethiopia
    345: { lat:  14.13, lng:  38.73 },   // Ethiopian Orthodox — Aksum, Ethiopia
    346: { lat:  16.83, lng:  75.72 },   // Deccan Sultanates — Bijapur, India
    347: { lat:  18.52, lng:  73.86 },   // Maratha — Pune (Poona), India
    348: { lat:  37.57, lng: 126.98 },   // Joseon — Seoul (Hanyang), Korea
    349: { lat:  35.69, lng: 139.69 },   // Tokugawa / Edo — Tokyo (Edo), Japan
    350: { lat:  39.91, lng: 116.39 },   // Qing — Beijing, China
    351: { lat:  37.87, lng:  32.49 },   // Seljuk — Konya, Anatolia
    352: { lat:  33.34, lng:  44.40 },   // Abbasid — Baghdad, Iraq
    353: { lat:  33.51, lng:  36.29 },   // Umayyad — Damascus, Syria
    354: { lat:  37.89, lng:  -4.78 },   // Al-Andalus — Córdoba, Spain
    355: { lat:  30.06, lng:  31.25 },   // Fatimid — Cairo, Egypt
    356: { lat:  31.78, lng:  35.23 },   // Crusader States — Jerusalem
    357: { lat:  29.65, lng:  91.17 },   // Tibetan Empire — Lhasa, Tibet
    358: { lat:  15.88, lng: 108.33 },   // Champa — My Son, Vietnam
    359: { lat:  21.17, lng:  94.86 },   // Pagan / Bagan — Bagan, Myanmar
    360: { lat:  10.58, lng: 104.93 },   // Funan — Oc Eo, Vietnam/Cambodia

    // ── Phase 5x — ids 361–390 ──────────────────────────────
    361: { lat:  36.36, lng:  43.15 },   // Assyrian Empire — Nineveh, Iraq
    362: { lat:  32.54, lng:  44.42 },   // Babylonian Empire — Babylon, Iraq
    363: { lat:  30.96, lng:  46.10 },   // Sumerian — Ur, southern Iraq
    364: { lat:  29.98, lng:  31.13 },   // Egypt Old Kingdom — Giza/Memphis
    365: { lat:  25.74, lng:  32.61 },   // Egypt New Kingdom — Luxor/Thebes
    366: { lat:  31.20, lng:  29.92 },   // Ptolemaic Egypt — Alexandria
    367: { lat:  35.30, lng:  25.16 },   // Linear A Mystery — Knossos, Crete
    368: { lat:  40.02, lng:  34.61 },   // Hittite — Hattusa, Anatolia
    369: { lat:  32.54, lng:  44.42 },   // Akkadian — Akkad/Baghdad region, Iraq
    370: { lat:  29.97, lng:  77.55 },   // Rigvedic — Upper Gangetic Plain
    371: { lat:  37.22, lng:  38.92 },   // Pre-Pottery Neolithic — Göbekli Tepe
    372: { lat:  38.49, lng:  28.04 },   // Lydian / Anatolian — Sardis, Turkey
    373: { lat:  36.84, lng:  40.32 },   // Hurrian — Upper Mesopotamia/Syria
    374: { lat:  29.27, lng:  76.08 },   // Rakhigarhi — Haryana, India
    375: { lat:  38.49, lng:  43.38 },   // Urartu — Van, eastern Turkey
    376: { lat:  42.27, lng:  41.67 },   // Colchis — Kutaisi, Georgia
    377: { lat:  48.00, lng:  35.00 },   // Sarmatian — Pontic steppe centroid
    378: { lat:  45.75, lng:  21.23 },   // Dacian — Sarmizegetusa, Romania
    379: { lat:  43.00, lng:  11.00 },   // Villanovan / Etruscan — Tuscany, Italy
    380: { lat:  36.27, lng:  -6.14 },   // Phoenician Colonies — Gadir/Cadiz, Spain
    381: { lat:  37.73, lng:  22.75 },   // Mycenaean — Mycenae, Greece
    382: { lat:  37.98, lng:  23.73 },   // Greek Dark Age — Athens centroid
    383: { lat:  37.98, lng:  23.73 },   // Classical Greece — Athens
    384: { lat:  37.07, lng:  22.43 },   // Sparta — Laconia, Greece
    385: { lat:  36.35, lng:  25.40 },   // Akrotiri / Thera — Santorini
    386: { lat:  43.19, lng:  27.91 },   // Chalcolithic — Varna, Bulgaria
    387: { lat:  48.80, lng:  16.50 },   // LBK — Central Europe centroid (Moravia)
    388: { lat:  54.10, lng:  -0.72 },   // Mesolithic Europe — Star Carr, Yorkshire
    389: { lat:  45.05, lng:   1.08 },   // Palaeolithic Cave Art — Lascaux, France
    390: { lat:  51.40, lng:  84.68 },   // Denisovan — Denisova Cave, Siberia

    // ── Phase 5y — ids 391–400 ──────────────────────────────
    391: { lat:  36.83, lng:  44.22 },   // Neanderthal — Shanidar Cave, Iraq
    392: { lat:  37.11, lng:  38.97 },   // Karahan Tepe / Taş Tepeler — Turkey
    393: { lat:  37.67, lng:  32.83 },   // Çatalhöyük — central Anatolia
    394: { lat:  31.87, lng:  35.44 },   // Jericho — Jordan Valley, West Bank
    395: { lat:  31.97, lng:  35.95 },   // Ain Ghazal / Natufian — Amman, Jordan
    396: { lat: -27.12, lng:-109.35 },   // Easter Island / Rapa Nui
    397: { lat:  38.66, lng: -90.06 },   // Cahokia — Illinois (same as 276 main site)
    398: { lat:  48.00, lng:-100.00 },   // Younger Dryas Boundary — Laurentide centroid
    399: { lat:   0.00, lng:   0.00 },   // Pre-Flood Civilisation — global (no fixed point)
    400: { lat:  47.00, lng:-114.00 },   // Missoula Megaflood — Glacial Lake Missoula

  };

  // ── EPOCH SNAPSHOTS ───────────────────────────────────────
  // 10 key time states for the globe scrubber.
  // Each snapshot defines which civs are "active" and
  // the globe rotation center (lng offset for framing).
  const EPOCH_SNAPSHOTS = [
    {
      key: 'pre-yd',
      label: 'Pre-Younger Dryas',
      year: -11000,
      desc: 'Before the great freeze — 13,000 BCE. Theorized advanced cultures at the edge of evidence.',
      activeCivIds: [1, 2, 3, 4, 39, 40, 267, 371, 388, 389, 390, 391, 392, 398, 399, 400],
      centerLng: 30,
      seaLevel: +120,    // metres above present (glacial melt offset for shader)
    },
    {
      key: 'neolithic',
      label: 'Neolithic Dawn',
      year: -8500,
      desc: '~8500 BCE. The first temples rise in Anatolia. Farming spreads across the Fertile Crescent.',
      activeCivIds: [5, 6, 34, 49, 252, 264, 277, 279, 363, 371, 386, 387, 388, 392, 393, 394, 395],
      centerLng: 35,
      seaLevel: +60,
    },
    {
      key: 'early-bronze',
      label: 'Early Bronze Age',
      year: -3000,
      desc: '~3000 BCE. Sumer writes the first words. Egypt unifies. The Indus cities are at their peak.',
      activeCivIds: [7, 8, 9, 14, 35, 36, 37, 52, 241, 247, 249, 251, 257, 268, 280, 281, 290, 292, 302, 303, 313, 363, 364, 369, 373, 374, 375, 381],
      centerLng: 40,
      seaLevel: 0,
    },
    {
      key: 'bronze',
      label: 'Bronze Age World',
      year: -1500,
      desc: '~1500 BCE. Interconnected Bronze Age civilizations span Eurasia. The Olmec mother culture rises.',
      activeCivIds: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 23, 45, 58, 59, 63, 248, 250, 253, 254, 270, 282, 283, 288, 289, 290, 293, 302, 312, 313, 329, 330, 363, 364, 365, 367, 368, 370, 373, 375, 376, 380, 381, 385],
      centerLng: 20,
      seaLevel: 0,
    },
    {
      key: 'iron-classical',
      label: 'Classical World',
      year: -500,
      desc: '~500 BCE. Greece, Persia, India and China define the classical age simultaneously.',
      activeCivIds: [7, 8, 17, 18, 19, 20, 21, 22, 23, 45, 60, 61, 64, 69, 70, 241, 255, 258, 265, 272, 285, 286, 287, 289, 292, 293, 294, 295, 302, 314, 315, 316, 329, 330, 331, 332, 353, 360, 361, 362, 365, 366, 372, 375, 376, 377, 378, 379, 380, 382, 383, 384],
      centerLng: 25,
      seaLevel: 0,
    },
    {
      key: 'classical-peak',
      label: 'Classical Peak',
      year: 100,
      desc: '~100 CE. Rome, Han China and the Maurya successors span the known world.',
      activeCivIds: [20, 21, 22, 23, 24, 45, 46, 52, 53, 56, 60, 64, 72, 74, 75, 76, 271, 275, 278, 280, 284, 285, 291, 295, 297, 298, 301, 302, 306, 315, 316, 317, 318, 329, 332, 333, 353, 358, 360, 361, 362, 366, 369, 383, 384],
      centerLng: 15,
      seaLevel: 0,
    },
    {
      key: 'medieval',
      label: 'Medieval World',
      year: 900,
      desc: '~900 CE. Islam\'s Golden Age, Viking expansion, and the great Khmer empire define this era.',
      activeCivIds: [24, 25, 26, 27, 29, 43, 44, 46, 47, 48, 50, 51, 56, 71, 72, 73, 77, 243, 244, 245, 256, 269, 271, 272, 273, 276, 282, 284, 296, 297, 298, 299, 304, 307, 308, 309, 318, 319, 320, 321, 322, 323, 324, 325, 327, 328, 329, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 348, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 396, 397],
      centerLng: 20,
      seaLevel: 0,
    },
    {
      key: 'medieval-late',
      label: 'Age of Empires',
      year: 1300,
      desc: '~1300 CE. Mongols reshape Eurasia. Mali dominates Africa. Americas reach their pre-contact peak.',
      activeCivIds: [24, 27, 28, 29, 30, 44, 47, 48, 50, 56, 57, 65, 66, 73, 242, 244, 245, 246, 262, 265, 273, 274, 275, 276, 296, 299, 300, 304, 319, 321, 322, 323, 324, 325, 326, 327, 328, 329, 335, 337, 338, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 354, 355, 356],
      centerLng:  0,
      seaLevel: 0,
    },
    {
      key: 'early-modern',
      label: 'Contact & Conquest',
      year: 1500,
      desc: '~1500 CE. The Americas meet Europe. The Ottoman Empire is at its zenith.',
      activeCivIds: [28, 29, 30, 44, 47, 65, 66, 242, 245, 246, 266, 300, 304, 306, 325, 326, 327, 328, 329, 335, 338, 341, 342, 343, 344, 347, 348, 349, 350],
      centerLng: -40,
      seaLevel: 0,
    },
    {
      key: 'modern',
      label: 'Modern Era',
      year: 2025,
      desc: 'Present day — the full span of human civilization visible across the globe.',
      activeCivIds: [],   // show ALL confirmed civs
      centerLng: 0,
      seaLevel: 0,
    },
  ];

  // ── REGION COLOUR MAP ─────────────────────────────────────
  // Used to tint continent regions on the globe surface.
  const REGION_COLORS = {
    africa:   0x8B6914,
    americas: 0x2D6B3A,
    asia:     0x8B3A14,
    europe:   0x1A3A6B,
    pacific:  0x0A5050,
    atlantic: 0x0A2850,
    global:   0x444466,
  };

  // ── HELPER: get snapshot by key ───────────────────────────
  function getSnapshot(key) {
    return EPOCH_SNAPSHOTS.find(s => s.key === key) || EPOCH_SNAPSHOTS[4];
  }

  // ── HELPER: get active civs for a snapshot ────────────────
  function getSnapshotCivs(snapshot) {
    if (!snapshot.activeCivIds.length) return CIVS.filter(c => c.t === 'confirmed');
    return CIVS.filter(c => snapshot.activeCivIds.includes(c.id));
  }

  // ── HELPER: get coords for a civ ─────────────────────────
  function getCivCoords(id) {
    return CIV_COORDS[id] || null;
  }

  return {
    CIV_COORDS,
    EPOCH_SNAPSHOTS,
    REGION_COLORS,
    getSnapshot,
    getSnapshotCivs,
    getCivCoords,
  };

})();
