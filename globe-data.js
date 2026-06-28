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
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5z — APPEND TO globe-data.js
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local globe-data.js
//   2. Find the very last  };  closing the CIV_COORDS object
//   3. Replace that  };  with a comma, then paste ALL lines below it
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5z — globe-data.js entries (ids 401–430) ─────────────────────────
// Append to CIV_COORDS object in globe-data.js

  401: { lat:21.5, lng:31.6, label:"Kerma, Sudan" },            // Kerma archaeological site
  402: { lat:39.0, lng:31.0, label:"Gordion, Anatolia" },       // Phrygian capital
  403: { lat:38.5, lng:27.5, label:"Sardis, Anatolia" },        // Lydian capital
  404: { lat:47.0, lng:47.0, label:"Itil / Atil, Volga Delta" },// Khazar capital
  405: { lat:41.1, lng:85.2, label:"Tarim Basin, Xinjiang" },   // Tocharian heartland
  406: { lat:39.6, lng:66.9, label:"Samarkand, Sogdia" },       // Sogdian hub
  407: { lat:32.7, lng:-87.6, label:"Moundville, Alabama" },    // Moundville site
  408: { lat:39.5, lng:-83.0, label:"Newark Earthworks, Ohio" },// Hopewell centre
  409: { lat:32.6, lng:-91.4, label:"Poverty Point, Louisiana" },// Poverty Point
  410: { lat:-16.5, lng:-68.7, label:"Tiwanaku, Bolivia" },     // Tiwanaku capital
  411: { lat:-8.1, lng:-79.0, label:"Chan Chan, Peru" },        // Chimú capital
  412: { lat:35.1, lng:-94.6, label:"Spiro Mounds, Oklahoma" }, // Spiro
  413: { lat:17.0, lng:-96.8, label:"Monte Albán, Oaxaca" },    // Zapotec capital
  414: { lat:17.5, lng:-97.5, label:"Mixteca Alta, Oaxaca" },   // Mixtec heartland
  415: { lat:14.5, lng:39.0, label:"Yeha, Ethiopia" },          // D'mt / Yeha temple
  416: { lat:26.4, lng:13.0, label:"Garama / Germa, Libya" },   // Garamantian capital
  417: { lat:9.8, lng:8.5, label:"Nok, Kaduna State, Nigeria" },// Nok culture centre
  418: { lat:-9.0, lng:39.5, label:"Kilwa Kisiwani, Tanzania" },// Swahili capital
  419: { lat:-20.3, lng:30.9, label:"Great Zimbabwe, Zimbabwe" },// Great Zimbabwe
  420: { lat:71.0, lng:25.0, label:"Northern Arctic (theorized)" }, // Hyperborea — no fixed location
  421: { lat:45.9, lng:23.5, label:"Tărtăria, Romania" },       // Tablet findspot
  422: { lat:-5.0, lng:150.0, label:"Central Pacific (theorized)" }, // Mu — no fixed location
  423: { lat:25.0, lng:80.0, label:"Vedic Heartland, India" },  // Vedic sacred geography
  424: { lat:-13.9, lng:-171.8, label:"Samoa — Polynesian homeland" }, // Polynesian origin
  425: { lat:15.2, lng:145.7, label:"Saipan, Mariana Islands" },// Chamorro heartland
  426: { lat:37.8, lng:-87.9, label:"Angel Mounds, Indiana" },  // Angel Mounds
  427: { lat:-13.0, lng:-74.2, label:"Huari, Ayacucho, Peru" }, // Wari capital
  428: { lat:36.1, lng:-107.9, label:"Chaco Canyon, New Mexico" }, // Chaco
  429: { lat:34.2, lng:-84.7, label:"Etowah Mounds, Georgia" }, // Etowah
  430: { lat:63.7, lng:-68.5, label:"Baffin Island, Arctic Canada" }, // Dorset heartland
  // END PHASE 5z
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5aa — APPEND TO globe.js
// Civilizations 431–460
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local globe.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below it
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5aa — globe-data.js entries (ids 431–460) ────────────────────────

  431: { lat:39.6, lng:66.9, label:"Samarkand, Timurid Empire" },
  432: { lat:-7.6, lng:112.2, label:"Trowulan, Majapahit capital, Java" },
  433: { lat:13.4, lng:103.8, label:"Angkor, Khmer Empire, Cambodia" },
  434: { lat:-2.9, lng:104.7, label:"Palembang, Srivijaya, Sumatra" },
  435: { lat:15.3, lng:76.4, label:"Hampi, Vijayanagara, Karnataka" },
  436: { lat:38.6, lng:-90.1, label:"Monks Mound, Cahokia, Illinois" },
  437: { lat:20.1, lng:-99.3, label:"Tula / Tollan, Hidalgo, Mexico" },
  438: { lat:37.5, lng:-88.5, label:"Kincaid Mounds, Illinois" },
  439: { lat:14.1, lng:38.7, label:"Aksum, Ethiopia" },
  440: { lat:6.4, lng:2.3, label:"Abomey, Kingdom of Dahomey, Benin" },
  441: { lat:-6.3, lng:14.3, label:"Mbanza Kongo, Kingdom of Kongo, Angola" },
  442: { lat:30.5, lng:-84.3, label:"Lake Jackson Mounds, Tallahassee, Florida" },
  443: { lat:32.8, lng:-83.6, label:"Ocmulgee Mounds, Macon, Georgia" },
  444: { lat:42.7, lng:11.8, label:"Vetulonia, Etruscan heartland, Tuscany" },
  445: { lat:35.3, lng:25.1, label:"Knossos, Crete, Minoan Neopalatial" },
  446: { lat:50.4, lng:86.6, label:"Pazyryk, Altai Mountains, Russia" },
  447: { lat:29.5, lng:72.0, label:"Ghaggar-Hakra basin, Late Harappan" },
  448: { lat:35.3, lng:25.1, label:"Knossos — Linear A archive, Crete" },
  449: { lat:26.0, lng:50.5, label:"Bahrain — Dilmun heartland" },
  450: { lat:28.7, lng:57.7, label:"Halil River basin, Jiroft, Iran" },
  451: { lat:35.1, lng:-80.0, label:"Town Creek Mound, North Carolina" },
  452: { lat:37.7, lng:22.7, label:"Mycenae, Peloponnese, Greece" },
  453: { lat:37.2, lng:38.9, label:"Göbekli Tepe / Karahan Tepe network, Turkey" },
  454: { lat:29.2, lng:76.2, label:"Rakhigarhi, Haryana, India" },
  455: { lat:35.1, lng:-88.3, label:"Shiloh Mounds, Tennessee" },
  456: { lat:38.5, lng:43.3, label:"Van / Tushpa, Urartu, eastern Turkey" },
  457: { lat:32.7, lng:-87.6, label:"Moundville Phase II, Alabama" },
  458: { lat:37.0, lng:-6.3, label:"Doñana / Tartessian heartland, Andalusia" },
  459: { lat:29.9, lng:31.1, label:"Giza — AAH primary focus (theorized)" },
  460: { lat:47.5, lng:-119.5, label:"Channeled Scablands, Washington State" },
  // END PHASE 5aa
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ab — APPEND TO globe.js
// Civilizations 461–490
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local globe.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ab — globe-data.js entries (ids 461–490) ────────────────────────

  461: { lat:33.1, lng:-90.7, label:"Winterville Mounds, Mississippi" },
  462: { lat:19.0, lng:-70.0, label:"Hispaniola — Taino heartland, Caribbean" },
  463: { lat:35.3, lng:-90.6, label:"Parkin Mounds, Arkansas" },
  464: { lat:-22.2, lng:29.3, label:"Mapungubwe Hill, Limpopo, South Africa" },
  465: { lat:33.6, lng:-90.9, label:"Carson Mounds, Yazoo Basin, Mississippi" },
  466: { lat:31.0, lng:-87.8, label:"Bottle Creek Mounds, Mobile-Tensaw Delta, Alabama" },
  467: { lat:14.1, lng:38.7, label:"Aksum — Queen of Sheba tradition, Ethiopia" },
  468: { lat:31.5, lng:-91.3, label:"Anna Mounds, Natchez region, Mississippi" },
  469: { lat:64.3, lng:-20.6, label:"Þingvellir, Althing site, Iceland" },
  470: { lat:30.5, lng:-91.2, label:"Plaquemine culture heartland, Louisiana" },
  471: { lat:32.0, lng:-81.1, label:"Irene Mound, Savannah, Georgia" },
  472: { lat:22.5, lng:72.2, label:"Lothal, Gujarat, India" },
  473: { lat:23.9, lng:70.2, label:"Dholavira, Kutch, Gujarat, India" },
  474: { lat:32.7, lng:-87.6, label:"Moundville Phase III, Alabama" },
  475: { lat:47.8, lng:34.1, label:"Scythian Royal Kurgans, Zaporizhzhia, Ukraine" },
  476: { lat:35.1, lng:25.0, label:"Pre-Palatial Crete, Knossos region" },
  477: { lat:43.0, lng:-88.9, label:"Aztalan, Wisconsin" },
  478: { lat:37.0, lng:35.0, label:"Luwian heartland, southern Anatolia, Turkey" },
  479: { lat:16.9, lng:33.7, label:"Meroe / Meroitic Kingdom, Sudan" },
  480: { lat:36.5, lng:-78.1, label:"Medoc Mountain Mound, North Carolina" },
  481: { lat:34.8, lng:35.8, label:"Ugarit, Canaanite heartland, Syria" },
  482: { lat:37.2, lng:-79.5, label:"Deep Bottom / upper Roanoke, Virginia" },
  483: { lat:32.9, lng:-87.5, label:"Moundville Outlier zone, Black Warrior Valley" },
  484: { lat:34.4, lng:-119.7, label:"Chumash territory, Santa Barbara coast, California" },
  485: { lat:30.4, lng:-107.9, label:"Casas Grandes / Paquimé, Chihuahua, Mexico" },
  486: { lat:33.5, lng:-112.0, label:"Hohokam heartland, Phoenix Basin, Arizona" },
  487: { lat:37.2, lng:-108.5, label:"Mesa Verde, Colorado" },
  488: { lat:39.5, lng:-111.0, label:"Fremont culture heartland, Utah" },
  489: { lat:32.8, lng:-91.5, label:"Watson Brake / Lower Mississippi Archaic, Louisiana" },
  490: { lat:51.5, lng:84.7, label:"Denisova Cave, Altai — Asian distribution (theorized)" },
  // END PHASE 5ab
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ac — APPEND TO globe.js
// Civilizations 491–520
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local globe.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ac — globe-data.js entries (ids 491–520) ────────────────────────

  491: { lat:35.1, lng:-88.3, label:"Shiloh Phase II, Tennessee River Valley" },
  492: { lat:43.0, lng:-1.5, label:"Solutrean heartland, Cantabrian Spain / SW France" },
  493: { lat:51.2, lng:-1.8, label:"Bell Beaker — Stonehenge / Wessex, Britain" },
  494: { lat:52.0, lng:20.0, label:"Corded Ware — North European Plain heartland" },
  495: { lat:50.5, lng:13.0, label:"LBK / Linear Pottery — Bohemia / Central Europe" },
  496: { lat:55.7, lng:12.5, label:"Funnel Beaker — Denmark / southern Scandinavia" },
  497: { lat:53.0, lng:-8.0, label:"Bell Beaker — British Isles arrival zone, Ireland" },
  498: { lat:37.7, lng:32.8, label:"Çatalhöyük, Konya Plain, Turkey" },
  499: { lat:31.3, lng:45.6, label:"Uruk, Southern Mesopotamia, Iraq" },
  500: { lat:48.0, lng:37.0, label:"Pontic-Caspian Steppe — PIE homeland (debated)" },
  501: { lat:32.9, lng:-87.6, label:"Moundville Hinterland, Black Warrior Valley, Alabama" },
  502: { lat:51.5, lng:84.7, label:"Afanasievo / Altai steppe, southern Siberia" },
  503: { lat:53.0, lng:62.0, label:"Andronovo / Sintashta heartland, southern Urals" },
  504: { lat:27.3, lng:68.1, label:"Mohenjo-daro, Sindh, Pakistan" },
  505: { lat:30.6, lng:72.9, label:"Harappa city, Punjab, Pakistan" },
  506: { lat:43.3, lng:11.3, label:"Villanovan / Etruscan heartland, Tuscany, Italy" },
  507: { lat:42.5, lng:25.5, label:"Odrysian Kingdom heartland, Bulgaria" },
  508: { lat:41.3, lng:19.8, label:"Illyrian heartland, Shkodër region, Albania" },
  509: { lat:47.5, lng:7.5, label:"La Tène type site, Lake Neuchâtel, Switzerland" },
  510: { lat:32.5, lng:-88.0, label:"Summerville phase, Tombigbee Valley, Alabama" },
  511: { lat:35.3, lng:-84.6, label:"Dallas phase / Hiwassee confluence, Tennessee" },
  512: { lat:39.0, lng:-83.4, label:"Adena heartland / Serpent Mound, Ohio" },
  513: { lat:33.2, lng:-89.3, label:"Nanih Waiya, Choctaw sacred mound, Mississippi" },
  514: { lat:32.8, lng:-83.6, label:"Ocmulgee / Muscogee Creek heartland, Georgia" },
  515: { lat:53.5, lng:-132.0, label:"Haida Gwaii, British Columbia, Canada" },
  516: { lat:57.0, lng:-135.3, label:"Sitka / Tlingit heartland, Alaska" },
  517: { lat:17.5, lng:-94.8, label:"San Lorenzo, Veracruz, Mexico" },
  518: { lat:18.1, lng:-94.1, label:"La Venta, Tabasco, Mexico" },
  519: { lat:23.0, lng:-102.0, label:"Gran Chichimeca heartland, north-central Mexico" },
  520: { lat:35.3, lng:-84.7, label:"Hiwassee Island, Tennessee" },
  // END PHASE 5ac
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ad — APPEND TO globe.js
// Civilizations 521–550
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local globe.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ad — globe-data.js entries (ids 521–550) ────────────────────────

  521: { lat:32.7, lng:-87.6, label:"Moundville Phase I, Black Warrior Valley, Alabama" },
  522: { lat:-6.7, lng:-79.8, label:"Batán Grande / Sican heartland, Lambayeque, Peru" },
  523: { lat:-8.1, lng:-79.0, label:"Huaca del Sol, Moche capital, northern Peru" },
  524: { lat:-14.7, lng:-75.1, label:"Nazca Lines, Pampa Colorada, Peru" },
  525: { lat:-16.5, lng:-68.7, label:"Kalasasaya / Tiwanaku astronomical complex, Bolivia" },
  526: { lat:34.8, lng:-87.7, label:"Florence Mound, Tennessee Valley, Alabama" },
  527: { lat:-13.8, lng:-76.3, label:"Paracas Peninsula, Ica, Peru" },
  528: { lat:-9.6, lng:-77.2, label:"Chavín de Huántar, Ancash, Peru" },
  529: { lat:-9.0, lng:-77.5, label:"Recuay / Callejón de Huaylas, Peru" },
  530: { lat:-1.8, lng:-80.7, label:"Valdivia, coastal Ecuador" },
  531: { lat:-10.9, lng:-77.5, label:"Norte Chico / Caral satellite sites, Supe Valley, Peru" },
  532: { lat:-16.5, lng:-68.7, label:"Pumapunku, Tiwanaku complex, Bolivia" },
  533: { lat:31.5, lng:-91.4, label:"Fatherland site, Natchez, Mississippi" },
  534: { lat:31.6, lng:-91.4, label:"Grand Village of the Natchez, Mississippi" },
  535: { lat:33.7, lng:-116.3, label:"Cahuilla territory, Coachella Valley, California" },
  536: { lat:36.1, lng:-107.9, label:"Chaco road network hub, New Mexico" },
  537: { lat:33.2, lng:-111.9, label:"Snaketown, Gila River, Arizona" },
  538: { lat:36.1, lng:-107.9, label:"Pueblo Bonito, Chaco Canyon, New Mexico" },
  539: { lat:32.5, lng:-91.7, label:"Watson Brake, Ouachita Parish, Louisiana" },
  540: { lat:34.6, lng:-91.9, label:"Toltec Mounds, Arkansas" },
  541: { lat:33.1, lng:-90.7, label:"Winterville Phase II, Mississippi" },
  542: { lat:33.5, lng:-103.8, label:"Blackwater Draw / Clovis type site, New Mexico" },
  543: { lat:-41.5, lng:-73.2, label:"Monte Verde, Chile — pre-Clovis site" },
  544: { lat:-18.5, lng:-70.3, label:"Chinchorro mummy sites, Atacama coast, Chile" },
  545: { lat:-15.9, lng:-69.1, label:"Lake Titicaca sacred landscape, Bolivia/Peru" },
  546: { lat:36.3, lng:-89.0, label:"Obion Mounds, western Tennessee" },
  547: { lat:-8.1, lng:-79.0, label:"Chan Chan, Chimú capital, Trujillo, Peru" },
  548: { lat:5.0, lng:-74.0, label:"Bogotá savanna, Muisca heartland, Colombia" },
  549: { lat:34.5, lng:-90.6, label:"Helena Crossing, Arkansas, Mississippi River" },
  550: { lat:36.8, lng:-89.9, label:"Powers Fort / Powers Phase, southeastern Missouri" },
  // END PHASE 5ad
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ae — APPEND TO globe.js
// Civilizations 551–580
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local globe.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ae — globe-data.js entries (ids 551–580) ────────────────────────

  551: { lat:35.8, lng:-90.0, label:"Zebree site, Mississippi County, Arkansas" },
  552: { lat:39.7, lng:-110.2, label:"Nine Mile Canyon, Carbon County, Utah" },
  553: { lat:32.9, lng:-108.1, label:"Mimbres / Mogollon heartland, New Mexico" },
  554: { lat:34.6, lng:-111.8, label:"Montezuma Castle, Verde Valley, Arizona" },
  555: { lat:33.7, lng:-111.1, label:"Tonto Cliff Dwelling, Salado territory, Arizona" },
  556: { lat:35.8, lng:-106.3, label:"Bandelier / Pajarito Plateau, New Mexico" },
  557: { lat:36.8, lng:-107.9, label:"Aztec Ruins National Monument, New Mexico" },
  558: { lat:36.6, lng:-89.7, label:"Lilbourn Mounds, Cairo Lowland, Missouri" },
  559: { lat:35.5, lng:-111.4, label:"Wupatki Pueblo, San Francisco Peaks, Arizona" },
  560: { lat:32.9, lng:-111.5, label:"Casa Grande, Coolidge, Arizona" },
  561: { lat:37.4, lng:-109.1, label:"Hovenweep National Monument, Utah/Colorado" },
  562: { lat:32.8, lng:-87.5, label:"Moundville related sites, Black Warrior Valley, Alabama" },
  563: { lat:40.1, lng:-82.4, label:"Newark Earthworks, Licking County, Ohio" },
  564: { lat:39.4, lng:-83.0, label:"Mound City / Hopewell NHP, Ross County, Ohio" },
  565: { lat:39.3, lng:-83.2, label:"Seip Earthworks, Paint Creek, Ohio" },
  566: { lat:33.1, lng:-88.3, label:"Lubbub Creek, Tombigbee River, Alabama" },
  567: { lat:33.0, lng:-90.5, label:"Lake George Mounds, Yazoo Basin, Mississippi" },
  568: { lat:33.5, lng:-90.4, label:"Pocahontas Mounds, Yazoo Basin, Mississippi" },
  569: { lat:36.7, lng:-107.9, label:"Salmon Ruins, Bloomfield, New Mexico" },
  570: { lat:33.6, lng:-90.2, label:"Ingomar Mounds, Yazoo Basin, Mississippi" },
  571: { lat:40.4, lng:-90.2, label:"Havana Hopewell / Dickson Mounds, Illinois River" },
  572: { lat:39.1, lng:-94.6, label:"Kansas City Hopewell heartland, Missouri" },
  573: { lat:40.5, lng:-90.4, label:"Orendorf site, Illinois River valley, Illinois" },
  574: { lat:38.6, lng:-90.1, label:"Cahokia Woodhenge / Monks Mound, Illinois" },
  575: { lat:36.1, lng:-107.9, label:"Chetro Ketl, Chaco Canyon, New Mexico" },
  576: { lat:31.1, lng:-91.9, label:"Marksville site, Avoyelles Parish, Louisiana" },
  577: { lat:43.0, lng:-88.9, label:"Aztalan Phase II, Jefferson County, Wisconsin" },
  578: { lat:37.5, lng:-108.8, label:"Lowry Pueblo, Montezuma County, Colorado" },
  579: { lat:31.5, lng:-91.5, label:"Coles Creek heartland, Lower Mississippi Valley" },
  580: { lat:37.5, lng:-108.8, label:"Yellow Jacket Pueblo, Montezuma County, Colorado" },
  // END PHASE 5ae
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5af — APPEND TO globe.js
// Civilizations 581–610
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local globe.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5af — globe-data.js entries (ids 581–610) ────────────────────────

  581: { lat:14.1, lng:38.7, label:"Aksum, Ethiopia — Christian phase" },
  582: { lat:9.8,  lng:8.5,  label:"Nok, Kaduna State, Nigeria — iron smelting" },
  583: { lat:5.0,  lng:12.0, label:"Cameroon-Nigeria borderland — Bantu homeland" },
  584: { lat:12.0, lng:39.0, label:"Lalibela rock churches, Ethiopian Highlands" },
  585: { lat:11.4, lng:-8.0, label:"Niani, Mali Empire heartland, Guinea" },
  586: { lat:16.8, lng:-3.0, label:"Gao / Songhai capital, Mali" },
  587: { lat:13.5, lng:14.0, label:"Ngazargamu, Kanem-Bornu capital, Nigeria" },
  588: { lat:-16.5,lng:31.0, label:"Mutapa State, Zambezi Valley, Zimbabwe" },
  589: { lat:-5.0, lng:22.0, label:"Kuba Kingdom, Kasai, DRC" },
  590: { lat:-8.0, lng:26.0, label:"Luba Empire heartland, Katanga, DRC" },
  591: { lat:31.5, lng:-84.9, label:"Kolomoki Mounds, Early County, Georgia" },
  592: { lat:37.0, lng:39.0, label:"Pre-Göbekli Fertile Crescent, Şanlıurfa region" },
  593: { lat:48.5, lng:30.5, label:"Talianky mega-site, Ukraine — Trypillia" },
  594: { lat:35.3, lng:25.1, label:"Knossos Linear A archive, Crete" },
  595: { lat:36.9, lng:21.6, label:"Palace of Nestor, Pylos, Greece" },
  596: { lat:35.6, lng:35.8, label:"Ugarit, Latakia coast, Syria" },
  597: { lat:32.2, lng:48.2, label:"Susa, Elamite capital, Khuzestan, Iran" },
  598: { lat:36.8, lng:39.0, label:"Mittani heartland, Khabur triangle, Syria" },
  599: { lat:32.5, lng:44.4, label:"Babylon, Kassite capital, Iraq" },
  600: { lat:31.0, lng:46.1, label:"Eridu / Early Dynastic Sumer heartland, Iraq" },
  601: { lat:33.3, lng:35.2, label:"Tyre, Phoenician city-state, Lebanon" },
  602: { lat:36.4, lng:43.2, label:"Nineveh, Neo-Assyrian capital, Iraq" },
  603: { lat:35.5, lng:46.0, label:"Ecbatana, Median capital, Hamadan, Iran" },
  604: { lat:34.5, lng:38.3, label:"Palmyra, Syria — Palmyrene Empire" },
  605: { lat:41.0, lng:36.5, label:"Amaseia, Kingdom of Pontus, Anatolia" },
  606: { lat:36.7, lng:67.1, label:"Bactra / Greco-Bactrian capital, Afghanistan" },
  607: { lat:34.5, lng:69.2, label:"Kapisa / Kushan heartland, Afghanistan" },
  608: { lat:39.6, lng:66.9, label:"Samarkand — Sogdian letter network hub" },
  609: { lat:25.0, lng:89.0, label:"Pala Empire heartland, Bengal, Bangladesh" },
  610: { lat:10.8, lng:79.1, label:"Thanjavur, Chola Empire, Tamil Nadu, India" },
  // END PHASE 5af
};,
// ============================================================
// PHASE 5ag APPEND — globe-data.js
// CIV_COORDS entries 611–640
// INSTRUCTIONS: Open your local globe-data.js → find the final };
// Replace }; with , then paste everything below, ending with };
// ============================================================

  611: { lat: 34.0, lng: 113.5, label: "Shang Dynasty", type: "A" },
  612: { lat: 34.3, lng: 108.9, label: "Zhou Dynasty (Western)", type: "A" },
  613: { lat: 33.5, lng: 130.5, label: "Yayoi Culture", type: "A" },
  614: { lat: 35.2, lng: 128.1, label: "Gaya Confederacy", type: "A" },
  615: { lat: 36.5, lng: 127.1, label: "Baekje Kingdom", type: "A" },
  616: { lat: 43.0, lng: 119.0, label: "Donghu Confederation", type: "A" },
  617: { lat: 47.0, lng: 104.0, label: "Xiongnu Empire", type: "A" },
  618: { lat: 46.0, lng: 106.0, label: "Rouran Khaganate", type: "A" },
  619: { lat: 44.0, lng: 90.0, label: "Göktürk Khaganate", type: "A" },
  620: { lat: 51.0, lng: 90.0, label: "Yenisei Kirghiz", type: "A" },
  621: { lat: 37.0, lng: 46.5, label: "Kingdom of Mannea", type: "A" },
  622: { lat: 23.5, lng: 58.0, label: "Land of Magan", type: "A" },
  623: { lat: 14.5, lng: 45.5, label: "Qataban", type: "A" },
  624: { lat: 15.5, lng: 49.0, label: "Hadramaut Kingdom", type: "A" },
  625: { lat: 38.0, lng: 28.5, label: "Arzawa", type: "A" },
  626: { lat: 40.0, lng: 34.6, label: "Hattian Culture", type: "A" },
  627: { lat: 36.0, lng: 28.0, label: "Sea Peoples Network", type: "B" },
  628: { lat: 9.5, lng: 78.1, label: "Pandya Kingdom", type: "A" },
  629: { lat: 17.0, lng: 79.5, label: "Satavahana Empire", type: "A" },
  630: { lat: 20.3, lng: 85.8, label: "Kalinga", type: "A" },
  631: { lat: -15.0, lng: 168.0, label: "Lapita Cultural Complex", type: "A" },
  632: { lat: 6.84, lng: 158.34, label: "Nan Madol", type: "A" },
  633: { lat: -27.1, lng: -109.4, label: "Rapa Nui (Easter Island)", type: "A" },
  634: { lat: 44.5, lng: 20.6, label: "Vinča Culture", type: "A" },
  635: { lat: 43.0, lng: 34.0, label: "Black Sea Flood Civilization", type: "B" },
  636: { lat: 19.6, lng: 30.4, label: "Kerma Classique", type: "A" },
  637: { lat: 28.0, lng: 5.0, label: "Gaetuli", type: "A" },
  638: { lat: 40.5, lng: 80.0, label: "Tocharian City-States", type: "A" },
  639: { lat: 32.63, lng: -91.41, label: "Poverty Point (Peak Phase)", type: "A" },
  640: { lat: -13.5, lng: -74.2, label: "Wari Empire", type: "A" }

// ============================================================
// END PHASE 5ag APPEND — globe-data.js
// After pasting: ensure the file ends with };
// Total new records: 30 (ids 611–640)
// ============================================================,
// ============================================================
// PHASE 5ah APPEND — globe-data.js
// IDs 641–670
// Append these records to the END of the CIV_COORDS object
// Instructions: open globe-data.js → find the final };
// → replace it with a comma → paste everything below
// → file ends with };
// ============================================================

  641: { lat: -2.9441, lng: 104.9009, zoom: 5 },
  642: { lat: 11.5625, lng: 104.9282, zoom: 5 },
  643: { lat: 15.8801, lng: 108.3380, zoom: 5 },
  644: { lat: 14.3500, lng: 100.5600, zoom: 5 },
  645: { lat: 21.1717, lng: 94.8585, zoom: 5 },
  646: { lat: 14.1213, lng: 38.7268, zoom: 5 },
  647: { lat: 9.3500,  lng: 41.8500, zoom: 5 },
  648: { lat: 9.5600,  lng: 44.0650, zoom: 5 },
  649: { lat: 12.5200, lng: 39.4700, zoom: 5 },
  650: { lat: 39.9334, lng: 32.8597, zoom: 5 },
  651: { lat: 42.2679, lng: 42.6917, zoom: 5 },
  652: { lat: 38.5010, lng: 43.3430, zoom: 5 },
  653: { lat: 15.3547, lng: 44.2066, zoom: 5 },
  654: { lat: 14.5450, lng: 44.3720, zoom: 5 },
  655: { lat: 26.0667, lng: 50.5577, zoom: 5 },
  656: { lat: 23.5880, lng: 58.3829, zoom: 5 },
  657: { lat: 35.2985, lng: 25.1632, zoom: 5 },
  658: { lat: 37.0900, lng: 25.1500, zoom: 5 },
  659: { lat: 41.1000, lng: 85.2500, zoom: 5 },
  660: { lat: 39.6542, lng: 66.9597, zoom: 5 },
  661: { lat: 37.9260, lng: 65.9100, zoom: 5 },
  662: { lat: 34.5268, lng: 69.1761, zoom: 5 },
  663: { lat: 31.2001, lng: 29.9187, zoom: 5 },
  664: { lat: 16.9333, lng: 33.7500, zoom: 5 },
  665: { lat: 9.8716,  lng: 8.6674,  zoom: 5 },
  666: { lat: -22.1975, lng: 29.3447, zoom: 5 },
  667: { lat: 8.0000,  lng: 4.0000,  zoom: 5 },
  668: { lat: 6.3350,  lng: 5.6267,  zoom: 5 },
  669: { lat: 18.2208, lng: -66.5901, zoom: 4 },
  670: { lat: 10.0000, lng: -150.0000, zoom: 3 },
// ============================================================
// PHASE 5ai APPEND — globe-data.js
// IDs 671–700
// Append to END of CIV_COORDS object in globe-data.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  671: { lat: -18.9137, lng: 47.5361,  zoom: 5 },
  672: { lat: -7.5000,  lng: 26.5000,  zoom: 5 },
  673: { lat: -6.1833,  lng: 14.4167,  zoom: 5 },
  674: { lat: -16.5000, lng: 30.8333,  zoom: 5 },
  675: { lat: 14.5000,  lng: 38.9167,  zoom: 5 },
  676: { lat: 26.5833,  lng: 13.4167,  zoom: 5 },
  677: { lat: 36.8528,  lng: 10.3233,  zoom: 5 },
  678: { lat: 36.3640,  lng: 6.6147,   zoom: 5 },
  679: { lat: 15.6167,  lng: 39.4500,  zoom: 5 },
  680: { lat: -4.0435,  lng: 39.6682,  zoom: 5 },
  681: { lat: 30.3285,  lng: 35.4444,  zoom: 5 },
  682: { lat: 32.4279,  lng: 53.6880,  zoom: 5 },
  683: { lat: 37.3360,  lng: 57.9246,  zoom: 5 },
  684: { lat: 36.2021,  lng: 37.1343,  zoom: 5 },
  685: { lat: 31.7683,  lng: 35.2137,  zoom: 5 },
  686: { lat: 34.5503,  lng: 38.2696,  zoom: 5 },
  687: { lat: 41.0082,  lng: 28.9784,  zoom: 5 },
  688: { lat: 36.8190,  lng: 10.1658,  zoom: 5 },
  689: { lat: 40.4168,  lng: -3.7038,  zoom: 5 },
  690: { lat: 45.4654,  lng: 9.1866,   zoom: 5 },
  691: { lat: 50.9333,  lng: 6.9667,   zoom: 5 },
  692: { lat: 59.9139,  lng: 10.7522,  zoom: 5 },
  693: { lat: 50.4501,  lng: 30.5234,  zoom: 5 },
  694: { lat: 12.6392,  lng: -8.0029,  zoom: 5 },
  695: { lat: 16.2667,  lng: 0.0400,   zoom: 5 },
  696: { lat: 12.3647,  lng: -1.5333,  zoom: 5 },
  697: { lat: 15.3540,  lng: -14.4524, zoom: 5 },
  698: { lat: 37.2231,  lng: 38.9225,  zoom: 5 },
  699: { lat: 36.2048,  lng: 138.2529, zoom: 5 },
  700: { lat: 35.0000,  lng: 36.0000,  zoom: 4 },
// ============================================================
// PHASE 5aj APPEND — globe-data.js
// IDs 701–730
// Append to END of CIV_COORDS object in globe-data.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  701: { lat: 29.9234,  lng: 52.6793,  zoom: 4 },
  702: { lat: 34.8000,  lng: 48.5153,  zoom: 5 },
  703: { lat: 32.5355,  lng: 44.4208,  zoom: 5 },
  704: { lat: 38.6189,  lng: 27.4333,  zoom: 5 },
  705: { lat: 39.7767,  lng: 31.5202,  zoom: 5 },
  706: { lat: 41.9965,  lng: 25.8576,  zoom: 5 },
  707: { lat: 45.9443,  lng: 25.0094,  zoom: 5 },
  708: { lat: 41.3275,  lng: 19.8187,  zoom: 5 },
  709: { lat: 39.6650,  lng: 20.8537,  zoom: 5 },
  710: { lat: 41.2867,  lng: 36.3300,  zoom: 5 },
  711: { lat: 45.3550,  lng: 36.4736,  zoom: 5 },
  712: { lat: 39.1329,  lng: 27.1845,  zoom: 5 },
  713: { lat: 40.1826,  lng: 29.0609,  zoom: 5 },
  714: { lat: 38.6431,  lng: 34.8307,  zoom: 5 },
  715: { lat: 40.1811,  lng: 44.5136,  zoom: 5 },
  716: { lat: 41.6938,  lng: 44.8015,  zoom: 5 },
  717: { lat: 40.4093,  lng: 49.8671,  zoom: 5 },
  718: { lat: 35.0174,  lng: 69.1708,  zoom: 5 },
  719: { lat: 36.7069,  lng: 67.1100,  zoom: 5 },
  720: { lat: 37.5500,  lng: 66.9750,  zoom: 5 },
  721: { lat: 25.3176,  lng: 82.9739,  zoom: 5 },
  722: { lat: 12.8185,  lng: 80.0339,  zoom: 5 },
  723: { lat: 17.3850,  lng: 76.8200,  zoom: 5 },
  724: { lat: 10.5276,  lng: 76.2144,  zoom: 5 },
  725: { lat: 15.9162,  lng: 75.6770,  zoom: 5 },
  726: { lat: 27.1767,  lng: 78.0081,  zoom: 5 },
  727: { lat: 25.0000,  lng: 88.0000,  zoom: 5 },
  728: { lat: 10.7905,  lng: 79.1378,  zoom: 5 },
  729: { lat: 12.9716,  lng: 76.5222,  zoom: 5 },
  730: { lat: 15.3350,  lng: 76.4600,  zoom: 5 },
// ============================================================
// PHASE 5ak APPEND — globe-data.js
// IDs 731–760
// Append to END of CIV_COORDS object in globe-data.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  731: { lat: 18.5204,  lng: 73.8567,  zoom: 5 },
  732: { lat: 28.6139,  lng: 77.2090,  zoom: 4 },
  733: { lat: 28.7041,  lng: 77.1025,  zoom: 4 },
  734: { lat: 17.3850,  lng: 78.4867,  zoom: 5 },
  735: { lat: 17.9689,  lng: 77.5195,  zoom: 5 },
  736: { lat: 26.7509,  lng: 94.2037,  zoom: 5 },
  737: { lat: 18.7883,  lng: 98.9853,  zoom: 5 },
  738: { lat: 14.3528,  lng: 100.5683, zoom: 5 },
  739: { lat: 17.0154,  lng: 99.8237,  zoom: 5 },
  740: { lat: 13.4125,  lng: 103.8670, zoom: 5 },
  741: { lat: -7.5731,  lng: 112.2309, zoom: 5 },
  742: { lat: -7.9111,  lng: 112.6044, zoom: 5 },
  743: { lat: -7.8014,  lng: 110.3647, zoom: 5 },
  744: { lat: 17.9757,  lng: 102.6331, zoom: 5 },
  745: { lat: 21.8456,  lng: 95.9909,  zoom: 5 },
  746: { lat: 18.9311,  lng: 96.4606,  zoom: 5 },
  747: { lat: 21.9588,  lng: 96.0891,  zoom: 5 },
  748: { lat: 26.2124,  lng: 127.6809, zoom: 5 },
  749: { lat: 37.5665,  lng: 126.9780, zoom: 5 },
  750: { lat: 37.9910,  lng: 126.5560, zoom: 5 },
  751: { lat: 35.8562,  lng: 129.2247, zoom: 5 },
  752: { lat: 41.9350,  lng: 126.1890, zoom: 5 },
  753: { lat: 36.4800,  lng: 127.1500, zoom: 5 },
  754: { lat: 44.5550,  lng: 129.6169, zoom: 5 },
  755: { lat: 35.2700,  lng: 128.2700, zoom: 5 },
  756: { lat: 34.2658,  lng: 108.9541, zoom: 5 },
  757: { lat: 30.2741,  lng: 120.1551, zoom: 5 },
  758: { lat: 32.0603,  lng: 118.7969, zoom: 5 },
  759: { lat: 39.9042,  lng: 116.4074, zoom: 5 },
  760: { lat: 40.0000,  lng: 116.3833, zoom: 5 },
// ============================================================
// PHASE 5al APPEND — globe-data.js
// IDs 761–790
// Append to END of CIV_COORDS object in globe-data.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  761: { lat: 34.3416,  lng: 108.9398, zoom: 5 },
  762: { lat: 34.2658,  lng: 108.9541, zoom: 5 },
  763: { lat: 34.7665,  lng: 113.6538, zoom: 5 },
  764: { lat: 35.8000,  lng: 114.3000, zoom: 5 },
  765: { lat: 47.9060,  lng: 106.9057, zoom: 5 },
  766: { lat: 47.0000,  lng: 105.0000, zoom: 5 },
  767: { lat: 43.0000,  lng: 89.0000,  zoom: 4 },
  768: { lat: 48.0000,  lng: 101.0000, zoom: 5 },
  769: { lat: 42.8580,  lng: 120.9660, zoom: 5 },
  770: { lat: 45.7433,  lng: 126.6331, zoom: 5 },
  771: { lat: 38.4682,  lng: 106.2729, zoom: 5 },
  772: { lat: 47.8864,  lng: 106.9057, zoom: 4 },
  773: { lat: 48.5000,  lng: 54.0000,  zoom: 5 },
  774: { lat: 35.6892,  lng: 51.3890,  zoom: 5 },
  775: { lat: 39.6542,  lng: 66.9597,  zoom: 5 },
  776: { lat: 32.6546,  lng: 51.6680,  zoom: 5 },
  777: { lat: 41.0082,  lng: 28.9784,  zoom: 4 },
  778: { lat: 30.0444,  lng: 31.2357,  zoom: 5 },
  779: { lat: 33.5102,  lng: 36.2913,  zoom: 5 },
  780: { lat: 31.7683,  lng: 35.2137,  zoom: 5 },
  781: { lat: 37.9750,  lng: 58.3960,  zoom: 5 },
  782: { lat: 33.3406,  lng: 44.4009,  zoom: 5 },
  783: { lat: 33.5102,  lng: 36.2913,  zoom: 5 },
  784: { lat: 24.6877,  lng: 46.7219,  zoom: 5 },
  785: { lat: 37.3891,  lng: -5.9845,  zoom: 5 },
  786: { lat: 11.8636,  lng: -8.7302,  zoom: 5 },
  787: { lat: 28.6139,  lng: 77.2090,  zoom: 5 },
  788: { lat: 30.0444,  lng: 31.2357,  zoom: 5 },
  789: { lat: 39.9179,  lng: 26.2520,  zoom: 5 },
  790: { lat: 31.6295,  lng: -7.9811,  zoom: 5 },
// ============================================================
// PHASE 5am APPEND — globe-data.js
// IDs 791–820
// Append to END of CIV_COORDS object in globe-data.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  791: { lat: 31.7917,  lng: -7.0926,  zoom: 5 },
  792: { lat: 36.8190,  lng: 10.1658,  zoom: 5 },
  793: { lat: 34.0209,  lng: -5.0097,  zoom: 5 },
  794: { lat: 35.6969,  lng: -0.6331,  zoom: 5 },
  795: { lat: 34.0549,  lng: -5.0100,  zoom: 5 },
  796: { lat: 35.6781,  lng: 10.0993,  zoom: 5 },
  797: { lat: 36.8190,  lng: 10.1658,  zoom: 5 },
  798: { lat: 35.6500,  lng: 4.7500,   zoom: 5 },
  799: { lat: 13.0532,  lng: 5.2390,   zoom: 5 },
  800: { lat: 13.3156,  lng: 14.4557,  zoom: 5 },
  801: { lat: 14.7645,  lng: -17.3660, zoom: 5 },
  802: { lat: 7.1622,   lng: 1.9652,   zoom: 5 },
  803: { lat: 6.6885,   lng: -1.6244,  zoom: 5 },
  804: { lat: -28.3228, lng: 30.6546,  zoom: 5 },
  805: { lat: -27.0000, lng: 32.0000,  zoom: 5 },
  806: { lat: -19.8145, lng: 47.4759,  zoom: 5 },
  807: { lat: 13.5500,  lng: 33.5300,  zoom: 5 },
  808: { lat: -5.0000,  lng: 22.0000,  zoom: 5 },
  809: { lat: -20.0000, lng: 30.5000,  zoom: 5 },
  810: { lat: 9.0250,   lng: 38.7469,  zoom: 5 },
  811: { lat: -13.5319, lng: -71.9675, zoom: 5 },
  812: { lat: 19.4326,  lng: -99.1332, zoom: 5 },
  813: { lat: 17.2510,  lng: -89.6230, zoom: 5 },
  814: { lat: 20.6843,  lng: -88.5678, zoom: 5 },
  815: { lat: 19.9130,  lng: -99.3050, zoom: 5 },
  816: { lat: 19.6925,  lng: -98.8438, zoom: 5 },
  817: { lat: 17.0436,  lng: -96.7677, zoom: 5 },
  818: { lat: 17.5490,  lng: -97.9180, zoom: 5 },
  819: { lat: 19.7008,  lng: -101.1844,zoom: 5 },
  820: { lat: -8.1116,  lng: -79.0291, zoom: 5 },
// ============================================================
// PHASE 5an APPEND — globe-data.js
// IDs 821–850
// Append to END of CIV_COORDS object in globe-data.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  821: { lat: -16.5540, lng: -68.6740,  zoom: 5 },
  822: { lat: -13.2746, lng: -74.2236,  zoom: 5 },
  823: { lat: -14.7390, lng: -75.1300,  zoom: 5 },
  824: { lat: 38.6554,  lng: -90.0621,  zoom: 5 },
  825: { lat: 36.0608,  lng: -107.9617, zoom: 5 },
  826: { lat: 39.3780,  lng: -82.9960,  zoom: 5 },
  827: { lat: 39.9612,  lng: -82.9988,  zoom: 5 },
  828: { lat: 18.1085,  lng: -94.6898,  zoom: 5 },
  829: { lat: -10.8931, lng: -77.5194,  zoom: 5 },
  830: { lat: 34.4048,  lng: -103.2052, zoom: 4 },
  831: { lat: 51.5965,  lng: -55.5194,  zoom: 5 },
  832: { lat: 71.2906,  lng: -156.7887, zoom: 5 },
  833: { lat: 63.7467,  lng: -68.5170,  zoom: 5 },
  834: { lat: 32.6285,  lng: -91.4082,  zoom: 5 },
  835: { lat: 43.0000,  lng: -75.5000,  zoom: 5 },
  836: { lat: 32.8407,  lng: -83.6324,  zoom: 5 },
  837: { lat: 35.5175,  lng: -83.9871,  zoom: 5 },
  838: { lat: 43.9695,  lng: -103.7713, zoom: 5 },
  839: { lat: 33.4255,  lng: -110.7890, zoom: 5 },
  840: { lat: 23.0000,  lng: -106.0000, zoom: 4 },
  841: { lat: 32.0000,  lng: -91.0000,  zoom: 4 },
  842: { lat: 56.4907,  lng: -4.2026,   zoom: 5 },
  843: { lat: 53.4239,  lng: -8.0930,   zoom: 5 },
  844: { lat: 48.8566,  lng: 2.3522,    zoom: 5 },
  845: { lat: 51.7520,  lng: -1.2577,   zoom: 5 },
  846: { lat: 47.0500,  lng: 4.8671,    zoom: 5 },
  847: { lat: 47.4979,  lng: 19.0402,   zoom: 5 },
  848: { lat: 52.2297,  lng: 21.0122,   zoom: 5 },
  849: { lat: 54.6872,  lng: 25.2797,   zoom: 5 },
  850: { lat: 54.3520,  lng: 18.6466,   zoom: 5 },
// ============================================================
// PHASE 5ao APPEND — globe-data.js
// IDs 851–880
// Append to END of CIV_COORDS object in globe-data.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  851: { lat: 48.2082,  lng: 16.3738,  zoom: 4 },
  852: { lat: 48.2082,  lng: 16.3738,  zoom: 4 },
  853: { lat: 40.4168,  lng: -3.7038,  zoom: 4 },
  854: { lat: 38.7223,  lng: -9.1393,  zoom: 5 },
  855: { lat: 52.3676,  lng: 4.9041,   zoom: 5 },
  856: { lat: 51.5074,  lng: -0.1278,  zoom: 4 },
  857: { lat: 48.8566,  lng: 2.3522,   zoom: 4 },
  858: { lat: 55.7558,  lng: 37.6173,  zoom: 4 },
  859: { lat: 48.8566,  lng: 2.3522,   zoom: 5 },
  860: { lat: 40.8518,  lng: 14.2681,  zoom: 5 },
  861: { lat: 45.4408,  lng: 12.3155,  zoom: 5 },
  862: { lat: 44.4056,  lng: 8.9463,   zoom: 5 },
  863: { lat: 41.9029,  lng: 12.4534,  zoom: 5 },
  864: { lat: 41.0082,  lng: 28.9784,  zoom: 5 },
  865: { lat: 45.4654,  lng: 9.1866,   zoom: 5 },
  866: { lat: 48.8566,  lng: 2.3522,   zoom: 5 },
  867: { lat: 51.5074,  lng: -0.1278,  zoom: 5 },
  868: { lat: 31.7683,  lng: 35.2137,  zoom: 5 },
  869: { lat: 51.5000,  lng: 31.2833,  zoom: 5 },
  870: { lat: 55.7558,  lng: 37.6173,  zoom: 5 },
  871: { lat: 44.0165,  lng: 21.0059,  zoom: 5 },
  872: { lat: 43.2141,  lng: 27.9147,  zoom: 5 },
  873: { lat: 43.0757,  lng: 25.6172,  zoom: 5 },
  874: { lat: 45.8150,  lng: 15.9819,  zoom: 5 },
  875: { lat: 45.0000,  lng: 34.1000,  zoom: 5 },
  876: { lat: 55.7887,  lng: 49.1221,  zoom: 5 },
  877: { lat: 37.5700,  lng: 45.0700,  zoom: 5 },
  878: { lat: 43.2220,  lng: 76.8512,  zoom: 5 },
  879: { lat: 46.0000,  lng: 86.0000,  zoom: 5 },
  880: { lat: 35.6762,  lng: 139.6503, zoom: 5 },
// PHASE_5ap_APPEND_globe.js
// Tempus Linea — CHRONOS
// Civilizations 881–910 — Globe coordinates
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local globe-data.js file
// 2. Find the very last closing brace before the final };
//    It will look like:     }     (the last coordinate entry)
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_COORDS object
//
// NOTE: ids 909 and 910 are Type C (heat map only).
//       They have NO fixed pin. Do not add coordinate entries for them.
//       Their location theories are handled in data-extended.js.
// -----------------------------------------------------------------------

  881: { lat: -21.1393, lng: -175.2049, type: "A", label: "Tongatapu, Kingdom of Tonga" },
  882: { lat: 6.8440,  lng: 158.3280,  type: "B", label: "Nan Madol, Pohnpei, Micronesia" },
  883: { lat: -27.1127, lng: -109.3497, type: "A", label: "Easter Island (Rapa Nui)" },
  884: { lat: 19.8968, lng: -155.5828,  type: "A", label: "Hawaii (Big Island) — Kamehameha capital region" },
  885: { lat: -4.2085, lng: 152.8268,   type: "A", label: "Bismarck Archipelago — Lapita origin zone" },
  886: { lat: -22.1897, lng: 29.3297,   type: "A", label: "Mapungubwe Hill, Limpopo, South Africa" },
  887: { lat: -20.2674, lng: 30.9337,   type: "A", label: "Great Zimbabwe, Masvingo Province" },
  888: { lat: -16.9166, lng: 31.0500,   type: "A", label: "Mutapa heartland, Zimbabwe Plateau" },
  889: { lat: 26.2172, lng: 50.5753,    type: "A", label: "Qal'at al-Bahrain — Dilmun capital" },
  890: { lat: 15.4667, lng: 45.3167,    type: "A", label: "Marib, Yemen — Sabaean capital" },
  891: { lat: 30.3285, lng: 35.4444,    type: "A", label: "Petra, Jordan — Nabataean capital" },
  892: { lat: 14.1208, lng: 38.7197,    type: "A", label: "Aksum, Tigray, Ethiopia" },
  893: { lat: 16.9338, lng: 33.7494,    type: "A", label: "Meroe, River Nile, Sudan" },
  894: { lat: 26.5620, lng: 13.3820,    type: "A", label: "Garama (Germa), Fezzan, Libya" },
  895: { lat: -8.9553, lng: 39.5282,    type: "A", label: "Kilwa Kisiwani, Tanzania — primary Swahili hub" },
  896: { lat: 13.4125, lng: 103.8670,   type: "A", label: "Angkor, Siem Reap, Cambodia" },
  897: { lat: -7.5281, lng: 112.2260,   type: "A", label: "Trowulan, East Java — Majapahit capital" },
  898: { lat: -2.9761, lng: 104.7754,   type: "A", label: "Palembang, Sumatra — Srivijaya capital" },
  899: { lat: 15.3352, lng: 76.4601,    type: "A", label: "Hampi (Vijayanagara), Karnataka, India" },
  900: { lat: 10.7870, lng: 79.1317,    type: "A", label: "Thanjavur, Tamil Nadu — Chola capital" },
  901: { lat: 21.1717, lng: 94.8585,    type: "A", label: "Bagan, Mandalay Region, Myanmar" },
  902: { lat: 14.3692, lng: 100.5877,   type: "A", label: "Ayutthaya, Thailand" },
  903: { lat: 41.7833, lng: 126.1833,   type: "A", label: "Ji'an / Hwando — Goguryeo capital region" },
  904: { lat: 35.8468, lng: 129.2254,   type: "A", label: "Gyeongju, North Gyeongsang — Silla capital" },
  905: { lat: 37.9667, lng: 126.5500,   type: "A", label: "Kaesong, North Korea — Goryeo capital" },
  906: { lat: 10.3000, lng: 105.0167,   type: "A", label: "Óc Eo / Angkor Borei, Mekong Delta, Vietnam" },
  907: { lat: 15.7756, lng: 108.2210,   type: "A", label: "My Son Sanctuary, Quảng Nam, Vietnam" },
  908: { lat: 37.2231, lng: 38.9225,    type: "B", label: "Göbekli Tepe, Şanlıurfa, Turkey" }

// ids 909 and 910 are Type C — heat map only — no entries in this file

// -----------------------------------------------------------------------
// END OF PHASE_5ap_APPEND_globe.js
// The CIV_COORDS object should still close with };  after this block
// -----------------------------------------------------------------------,
// PHASE_5aq_APPEND_globe.js
// Tempus Linea — CHRONOS
// Civilizations 911–940 — Globe coordinates
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local globe-data.js file
// 2. Find the very last closing brace before the final };
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_COORDS object
// -----------------------------------------------------------------------

  911: { lat: 38.6270,  lng: -90.1994,  type: "A", label: "Cahokia / St. Louis region — Mississippian heartland" },
  912: { lat: 36.0608,  lng: -107.9913, type: "A", label: "Chaco Canyon, New Mexico — Ancestral Puebloan centre" },
  913: { lat: 39.4264,  lng: -83.8382,  type: "A", label: "Fort Ancient, Warren County, Ohio" },
  914: { lat: 18.7357,  lng: -70.1627,  type: "A", label: "Hispaniola — Taíno primary chiefdom region" },
  915: { lat: 5.0667,   lng: -74.0833,  type: "A", label: "Bacatá / Bogotá savannah — Muisca Zipa capital" },
  916: { lat: -16.5553, lng: -68.6731,  type: "B", label: "Tiwanaku, Bolivia — early formative phase" },
  917: { lat: -10.8961, lng: -77.5200,  type: "A", label: "Caral, Supe Valley, Peru" },
  918: { lat: -13.0667, lng: -74.1167,  type: "A", label: "Huari (Wari) capital, Ayacucho, Peru" },
  919: { lat: 14.1208,  lng: 38.7197,   type: "A", label: "Aksum / Yeha — early pre-Christian Aksumite phase" },
  920: { lat: 10.5105,  lng: 7.4165,    type: "A", label: "Nok cultural zone, Kaduna State, Nigeria" },
  921: { lat: 7.4667,   lng: 4.5667,    type: "A", label: "Ile-Ife, Osun State, Nigeria — Yoruba sacred city" },
  922: { lat: 6.3350,   lng: 5.6270,    type: "A", label: "Benin City, Edo State, Nigeria" },
  923: { lat: 8.9333,   lng: 3.9333,    type: "A", label: "Old Oyo (Katunga), Oyo State, Nigeria" },
  924: { lat: 7.1808,   lng: 1.9878,    type: "A", label: "Abomey, Zou Department, Benin Republic" },
  925: { lat: -2.9956,  lng: 35.3497,   type: "A", label: "Olduvai Gorge, Tanzania — Oldowan / Acheulean" },
  926: { lat: -34.4178, lng: 21.2167,   type: "A", label: "Blombos Cave, Western Cape, South Africa" },
  927: { lat: -4.9500,  lng: 119.8667,  type: "A", label: "Leang Tedongnge cave system, Sulawesi, Indonesia" },
  928: { lat: 51.3978,  lng: 84.6764,   type: "B", label: "Denisova Cave, Altai Mountains, Russia" },
  929: { lat: 40.8297,  lng: 140.7019,  type: "A", label: "Sannai-Maruyama, Aomori — Jōmon primary site" },
  930: { lat: 33.2500,  lng: 130.3000,  type: "A", label: "Yoshinogari, Saga Prefecture — Yayoi settlement" },
  931: { lat: 34.5653,  lng: 135.5978,  type: "A", label: "Daisen Kofun, Sakai, Osaka — largest Kofun mound" },
  932: { lat: 27.3242,  lng: 68.1385,   type: "A", label: "Mohenjo-daro, Sindh, Pakistan — Indus Valley capital" },
  933: { lat: 35.2985,  lng: 25.1631,   type: "B", label: "Knossos, Crete — Minoan palatial centre" },
  934: { lat: 37.7317,  lng: 22.7561,   type: "A", label: "Mycenae, Argolis, Greece" },
  935: { lat: 42.6964,  lng: 11.8706,   type: "A", label: "Tarquinia, Lazio, Italy — Etruscan heartland" },
  936: { lat: 33.2704,  lng: 35.2038,   type: "A", label: "Tyre (Sur), Lebanon — Phoenician primary city" },
  937: { lat: 36.8528,  lng: 10.3233,   type: "A", label: "Carthage, Tunis, Tunisia" },
  938: { lat: 47.8500,  lng: 33.4833,   type: "A", label: "Chertomlyk / Pontic steppe — Scythian heartland" },
  939: { lat: 39.6270,  lng: 66.9750,   type: "A", label: "Afrasiab (ancient Samarkand), Uzbekistan" },
  940: { lat: 37.8333,  lng: 62.1833,   type: "A", label: "Gonur Tepe, Mary Province, Turkmenistan — BMAC capital" }

// -----------------------------------------------------------------------
// END OF PHASE_5aq_APPEND_globe.js
// The CIV_COORDS object should still close with };  after this block
// -----------------------------------------------------------------------,
// PHASE_5ar_APPEND_globe.js
// Tempus Linea — CHRONOS
// Civilizations 941–970 — Globe coordinates
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local globe-data.js file
// 2. Find the very last closing brace before the final };
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_COORDS object
//
// NOTE: id 958 is Type C (heat map only — no fixed pin).
//       id 970 is Type C (heat map only — no fixed pin).
//       Do not add coordinate entries for these.
//       Their location theories are in data-extended.js.
// -----------------------------------------------------------------------

  941: { lat: 38.4833,  lng: 28.0333,   type: "A", label: "Sardis, Lydia, western Anatolia (Turkey)" },
  942: { lat: 39.6503,  lng: 32.0000,   type: "A", label: "Gordion, Phrygia, central Anatolia (Turkey)" },
  943: { lat: 38.5000,  lng: 43.3667,   type: "A", label: "Van Fortress (Tushpa), Lake Van, eastern Turkey" },
  944: { lat: 34.7981,  lng: 48.5147,   type: "A", label: "Ecbatana (Hamadan), Median capital, Iran" },
  945: { lat: 32.1983,  lng: 48.2586,   type: "A", label: "Susa, Khuzestan Province, Iran — Elamite capital" },
  946: { lat: 40.0194,  lng: 34.6153,   type: "A", label: "Hattusa, Bogazkoy, Anatolia — Hittite capital" },
  947: { lat: 36.8500,  lng: 40.7833,   type: "A", label: "Tell Fakhariyah — Washukanni (Mitanni capital candidate), Syria" },
  948: { lat: 33.3369,  lng: 44.3922,   type: "A", label: "Dur-Kurigalzu (Aqar Quf), near Baghdad, Iraq — Kassite capital" },
  949: { lat: 31.7767,  lng: 35.2345,   type: "A", label: "Jerusalem — Kingdom of Israel and Judah capital" },
  950: { lat: 33.5102,  lng: 36.2913,   type: "A", label: "Damascus — primary Aramean city-state" },
  951: { lat: 32.5355,  lng: 44.4205,   type: "A", label: "Babylon, Hillah, Iraq — Neo-Babylonian capital" },
  952: { lat: 19.6167,  lng: 30.4167,   type: "A", label: "Kerma, Northern State, Sudan" },
  953: { lat: 18.5333,  lng: 31.8167,   type: "A", label: "Jebel Barkal / Napata, Sudan — Napatan capital" },
  954: { lat: 15.3333,  lng: 38.9333,   type: "B", label: "Eritrean coast — Kingdom of Punt primary candidate" },
  955: { lat: 30.3378,  lng: 119.9578,  type: "A", label: "Liangzhu, Zhejiang Province, China" },
  956: { lat: 36.2000,  lng: 117.1000,  type: "A", label: "Longshan / Taosi, Yellow River valley, China" },
  957: { lat: 34.6833,  lng: 112.6333,  type: "B", label: "Erlitou, Yanshi, Henan — Xia Dynasty candidate site" },
  // id 958 — Type C — no fixed pin
  959: { lat: 31.0128,  lng: 104.4194,  type: "A", label: "Sanxingdui, Guanghan, Sichuan, China" },
  960: { lat: 19.8064,  lng: 105.7883,  type: "A", label: "Dong Son, Thanh Hoa Province, Vietnam" },
  961: { lat: 24.8667,  lng: 102.7000,  type: "A", label: "Shizhaishan, Lake Dian, Yunnan, China — Dian Kingdom" },
  962: { lat: 37.5139,  lng: 127.1058,  type: "A", label: "Mongchontoseong (early Baekje capital), Seoul, Korea" },
  963: { lat: 44.6167,  lng: 129.7667,  type: "A", label: "Shangjing (Upper Capital) of Balhae, Heilongjiang, China" },
  964: { lat: 12.8471,  lng: 80.2473,   type: "A", label: "Mahabalipuram (Mamallapuram), Tamil Nadu, India — Pallava coast capital" },
  965: { lat: 15.9167,  lng: 75.6833,   type: "A", label: "Badami (Vatapi), Karnataka, India — Chalukya capital" },
  966: { lat: 20.0269,  lng: 75.1797,   type: "A", label: "Ellora caves / Manyakheta, Maharashtra, India — Rashtrakuta" },
  967: { lat: 25.6111,  lng: 85.1667,   type: "A", label: "Pataliputra (Patna), Bihar, India — Magadha capital" },
  968: { lat: 34.5167,  lng: 69.1833,   type: "A", label: "Begram / Kapisi, Kabul region, Afghanistan — Kushan capital zone" },
  969: { lat: 33.0944,  lng: 44.5814,   type: "A", label: "Ctesiphon, near Baghdad, Iraq — Parthian winter capital" }
  // id 970 — Type C — no fixed pin

// -----------------------------------------------------------------------
// END OF PHASE_5ar_APPEND_globe.js
// The CIV_COORDS object should still close with };  after this block
// -----------------------------------------------------------------------,
// PHASE_5as_APPEND_globe.js
// Tempus Linea — CHRONOS
// Civilizations 971–1000 — Globe coordinates
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local globe-data.js file
// 2. Find the very last closing brace before the final };
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_COORDS object
//
// NOTE: id 999 is Type C (heat map only — no fixed pin).
//       id 1000 is Type B (multiple location theories — primary pin placed at
//       southern Africa origin point).
// -----------------------------------------------------------------------

  971: { lat: 33.0944,  lng: 44.5814,   type: "A", label: "Ctesiphon / Taq Kasra, Iraq — Sassanid capital" },
  972: { lat: 29.9353,  lng: 52.8911,   type: "A", label: "Persepolis (Takht-e Jamshid), Fars, Iran — Achaemenid capital" },
  973: { lat: 36.2021,  lng: 36.1604,   type: "A", label: "Antioch on the Orontes (Antakya), Turkey — Seleucid capital" },
  974: { lat: 31.2001,  lng: 29.9187,   type: "A", label: "Alexandria, Egypt — Ptolemaic capital" },
  975: { lat: 36.7667,  lng: 66.9000,   type: "A", label: "Bactra (Balkh), Afghanistan — Greco-Bactrian capital" },
  976: { lat: 25.6111,  lng: 85.1667,   type: "A", label: "Pataliputra (Patna), Bihar — Maurya capital" },
  977: { lat: 25.3176,  lng: 82.9739,   type: "A", label: "Pataliputra / Varanasi region — Gupta imperial heartland" },
  978: { lat: 27.0546,  lng: 79.9199,   type: "A", label: "Kanauj (Kannauj), Uttar Pradesh — Harsha capital" },
  979: { lat: 16.9667,  lng: 81.7833,   type: "A", label: "Vengi (Pedavegi), Andhra Pradesh — Eastern Chalukya capital" },
  980: { lat: 17.9784,  lng: 79.5941,   type: "A", label: "Warangal, Telangana — Kakatiya capital" },
  981: { lat: 13.1667,  lng: 75.9833,   type: "A", label: "Halebidu (Dwarasamudra), Karnataka — Hoysala capital" },
  982: { lat: 18.2341,  lng: 73.4411,   type: "A", label: "Raigad Fort, Maharashtra — Shivaji's Maratha capital" },
  983: { lat: 15.3352,  lng: 76.4601,   type: "A", label: "Hampi (Vijayanagara), Karnataka — Sangama founding capital" },
  984: { lat: 16.8302,  lng: 75.7100,   type: "A", label: "Bijapur (Vijayapura), Karnataka — Adil Shahi Deccan Sultanate" },
  985: { lat: 39.6547,  lng: 66.9750,   type: "A", label: "Samarkand (Marakanda), Uzbekistan — Timurid capital" },
  986: { lat: 32.6546,  lng: 51.6680,   type: "A", label: "Isfahan (Naqsh-e Jahan), Iran — Safavid capital" },
  987: { lat: 30.0444,  lng: 31.2357,   type: "A", label: "Cairo Citadel, Egypt — Ayyubid capital" },
  988: { lat: 30.0444,  lng: 31.2357,   type: "A", label: "Cairo, Egypt — Mamluk Sultanate capital" },
  989: { lat: 30.0561,  lng: 31.2294,   type: "A", label: "Al-Azhar / Fatimid Cairo, Egypt" },
  990: { lat: 33.3406,  lng: 44.4009,   type: "A", label: "Baghdad (Round City), Iraq — Abbasid capital" },
  991: { lat: 33.5102,  lng: 36.2913,   type: "A", label: "Damascus, Syria — Umayyad capital" },
  992: { lat: 24.4672,  lng: 39.6112,   type: "A", label: "Medina (Madinat al-Nabi), Saudi Arabia — Rashidun capital" },
  993: { lat: 16.7735,  lng: -3.0074,   type: "A", label: "Timbuktu, Mali — Mali Empire cultural capital" },
  994: { lat: 16.2667,  lng: 0.0500,    type: "A", label: "Gao, Mali — Songhai Empire capital" },
  995: { lat: -6.2500,  lng: 14.2333,   type: "A", label: "Mbanza Kongo (São Salvador), Angola — Kingdom of Kongo capital" },
  996: { lat: -20.0667, lng: 30.8167,   type: "A", label: "Khami, Bulawayo, Zimbabwe — Rozvi State capital" },
  997: { lat: -28.3167, lng: 30.7167,   type: "A", label: "KwaBulawayo / Ulundi, KwaZulu-Natal, South Africa — Zulu capital" },
  998: { lat: 12.3614,  lng: 37.3833,   type: "A", label: "Gondar, Amhara, Ethiopia — Solomonic imperial capital" },
  // id 999 — Type C — Antediluvian Hypothesis — heat map only — no fixed pin
  1000: { lat: -30.0,   lng: 25.0,      type: "B", label: "Southern Africa — Out of Africa origin point (primary pin)" }

// -----------------------------------------------------------------------
// END OF PHASE_5as_APPEND_globe.js
// The CIV_COORDS object should still close with };  after this block
// -----------------------------------------------------------------------
};
