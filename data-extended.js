/* ============================================================
   CHRONOS · data-extended.js
   Adds filter metadata to civilization records from data.js.
   Load AFTER data.js. Merges silently — data.js stays unchanged.

   FIELDS ADDED:
     rel  — religion/belief system key
     gov  — governance type key
     pop  — peak population tier key
     tags — free array of searchable keywords

   TO EXTEND: add { rel, gov, pop, tags } to any CIV_META entry.
   New civilizations added to data.js only need an entry here
   if you want filter metadata — defaults to 'unknown' otherwise.
   ============================================================ */

const CIV_META = {
  //  id : { rel, gov, pop, tags[] }

  // ── THEORIZED / DEEP PRE-HISTORY ──────────────────────────
  1: { lang:'unknown', rel:'unknown',    gov:'unknown',   pop:'unknown',
        tags:['lost continent','pacific','occult','blavatsky','diffusion'] },
  2: { lang:'unknown', rel:'unknown',    gov:'unknown',   pop:'unknown',
        tags:['younger dryas','comet','impact','hancock','carlson','flood'] },
  3: { lang:'unknown', rel:'polytheist', gov:'unknown',   pop:'unknown',
        tags:['plato','flood','atlantis','atlantic','island','catastrophe'] },
  4: { lang:'unknown', rel:'unknown',    gov:'unknown',   pop:'tiny',
        tags:['yonaguni','underwater','japan','submerged','ruins','geology'] },

  // ── NEOLITHIC ─────────────────────────────────────────────
  5: { lang:'unknown', rel:'animist',    gov:'tribal',    pop:'tiny',
        tags:['temple','megalith','pre-agriculture','turkey','anatolia','mystery'] },
  6: { lang:'unknown', rel:'animist',    gov:'tribal',    pop:'small',
        tags:['neolithic','settlement','catalhoyuk','turkey','urban','figurine'] },

  // ── BRONZE AGE ────────────────────────────────────────────
  7: { lang:'isolate', rel:'polytheist', gov:'city-state',pop:'large',
        tags:['sumer','mesopotamia','cuneiform','gilgamesh','ur','babylon',
              'annunaki','sitchin','iraq','writing','law'] },
  8: { lang:'afroasiatic', rel:'polytheist', gov:'kingdom',   pop:'large',
        tags:['egypt','pyramid','pharaoh','hieroglyph','giza','sphinx','nile',
              'hancock','schoch','orion','ancient aliens'] },
  9: { lang:'undeciphered', rel:'unknown',    gov:'city-state',pop:'large',
        tags:['harappa','mohenjo-daro','indus','pakistan','undeciphered',
              'urban','saraswati','bronze age'] },
  10: { lang:'undeciphered', rel:'polytheist', gov:'kingdom',   pop:'medium',
        tags:['minoan','crete','knossos','aegean','linear-a','atlantis','europe'] },
  11: { lang:'indo-european', rel:'polytheist', gov:'kingdom',   pop:'medium',
        tags:['mycenae','homer','iliad','bronze age collapse','greece','agamemnon'] },
  12: { lang:'semitic', rel:'polytheist', gov:'empire',    pop:'large',
        tags:['assyria','nineveh','iron','military','mesopotamia','library'] },
  13: { lang:'sino-tibetan', rel:'polytheist', gov:'kingdom',   pop:'large',
        tags:['shang','china','oracle bones','bronze','ancestor worship','dynasty'] },
  14: { lang:'indo-european', rel:'hindu',      gov:'tribal',    pop:'large',
        tags:['vedas','rigveda','india','sanskrit','aryan','hinduism','astronomy'] },
  15: { lang:'unknown', rel:'polytheist', gov:'tribal',    pop:'small',
        tags:['olmec','mesoamerica','colossal heads','mexico','mother culture',
              'african features','contact'] },
  16: { lang:'semitic', rel:'polytheist', gov:'city-state',pop:'medium',
        tags:['phoenicia','alphabet','carthage','seafarer','levant','trade',
              'purple','tyre','sidon'] },

  // ── IRON AGE / CLASSICAL ──────────────────────────────────
  17: { lang:'indo-european', rel:'polytheist', gov:'city-state',pop:'medium',
        tags:['greece','athens','sparta','democracy','philosophy','olympia',
              'plato','aristotle','socrates'] },
  18: { lang:'indo-european', rel:'zoroastrian',gov:'empire',    pop:'massive',
        tags:['persia','achaemenid','cyrus','darius','xerxes','silk road',
              'rights','iran','satrapy'] },
  19: { lang:'semitic', rel:'polytheist', gov:'republic',  pop:'medium',
        tags:['carthage','hannibal','alps','rome','punic','north africa','barca'] },
  20: { lang:'indo-european', rel:'polytheist', gov:'empire',    pop:'massive',
        tags:['rome','caesar','republic','legion','latin','law','mediterranean',
              'augustus','constantine','christian'] },
  21: { lang:'sino-tibetan', rel:'polytheist', gov:'empire',    pop:'massive',
        tags:['han','china','silk road','paper','confucius','dynasty','astronomy'] },
  22: { lang:'indo-european', rel:'buddhist',   gov:'empire',    pop:'massive',
        tags:['maurya','india','ashoka','buddhism','chandragupta','nonviolence',
              'pillar','edict'] },
  23: { lang:'mesoamerican', rel:'polytheist', gov:'city-state',pop:'large',
        tags:['maya','mesoamerica','calendar','glyph','pyramid','astronomy',
              'collapse','mystery','yucatan','guatemala'] },

  // ── POST-CLASSICAL ────────────────────────────────────────
  24: { lang:'indo-european', rel:'monotheist', gov:'empire',    pop:'large',
        tags:['byzantine','eastern rome','christianity','constantinople',
              'justinian','greek','orthodox'] },
  25: { lang:'semitic', rel:'monotheist', gov:'empire',    pop:'massive',
        tags:['islam','golden age','baghdad','algebra','astronomy','medicine',
              'ibn sina','al-khwarizmi','abbasid','mongol'] },
  26: { lang:'indo-european', rel:'polytheist', gov:'tribal',    pop:'small',
        tags:['viking','norse','scandinavia','longship','north america','vinland',
              'leif','odin','thor','raid','trade'] },
  27: { lang:'turkic-mongolic', rel:'shamanic',   gov:'empire',    pop:'massive',
        tags:['mongol','genghis','temujin','silk road','steppe','cavalry','kublai',
              'pax mongolica','conquest'] },
  28: { lang:'mesoamerican', rel:'polytheist', gov:'empire',    pop:'large',
        tags:['aztec','mexica','tenochtitlan','mexico','sacrifice','cortez',
              'smallpox','mesoamerica','collapse'] },
  29: { lang:'andean', rel:'polytheist', gov:'empire',    pop:'large',
        tags:['inca','peru','andes','quipu','machu picchu','pizarro','road',
              'masonry','south america'] },
  30: { lang:'turkic-mongolic', rel:'monotheist', gov:'empire',    pop:'massive',
        tags:['ottoman','turkey','istanbul','sultan','suleiman','islam',
              'byzantine','wwi','middle east'] },


  // ── EARLY MESOPOTAMIA & ANUNNAKI ─────────────────────────
  34: { lang:'isolate', rel:'animist',    gov:'tribal',    pop:'small',
        tags:['ubaid','pottery','mesopotamia','pre-sumerian','iraq','temple',
              'agriculture','arabian gulf','trade'] },
  35: { lang:'isolate', rel:'polytheist', gov:'city-state',pop:'small',
        tags:['eridu','enki','ea','first city','mesopotamia','iraq','tell',
              'mound','excavation','anunnaki','temple','king list'] },
  36: { lang:'isolate', rel:'polytheist', gov:'city-state',pop:'large',
        tags:['uruk','gilgamesh','cuneiform','writing','inanna','ishtar',
              'mesopotamia','iraq','city','anu','ziggurat'] },
  37: { lang:'isolate', rel:'polytheist', gov:'theocracy', pop:'large',
        tags:['nippur','enlil','ekur','tablets','cuneiform','mesopotamia',
              'iraq','religion','anunnaki','sacred','library'] },
  38: { lang:'isolate', rel:'polytheist', gov:'theocracy', pop:'unknown',
        tags:['anunnaki','anu','enlil','enki','inanna','ninhursag','cuneiform',
              'sumerian','akkadian','mythology','tablets','flood','creation',
              'pantheon','heaven','earth'] },
  39: { lang:'isolate', rel:'polytheist', gov:'kingdom',   pop:'unknown',
        tags:['king list','antediluvian','pre-flood','sumerian','cuneiform',
              'weld-blundell','eridu','flood','younger dryas','debated',
              'long reigns','mythology'] },
  40: { lang:'isolate', rel:'polytheist', gov:'kingdom',   pop:'unknown',
        tags:['bad-tibira','larak','sippar','shuruppak','antediluvian',
              'pre-flood','king list','dumuzi','pabilsag','shamash',
              'ziusudra','ubara-tutu','noah','flood','weld-blundell',
              'mesopotamia','iraq','fara','excavation','mound','debated','younger dryas'] },

  // ── LIDAR AMAZONIAN DISCOVERIES ──────────────────────────
  41: { lang:'unknown', rel:'animist',    gov:'city-state', pop:'large',
        tags:['upano','ecuador','amazon','lidar','pre-columbian','mounds',
              'roads','plazas','hancock','ancient apocalypse','science journal',
              'rostain','urban','jungle','colonial collapse','2024'] },
  42: { lang:'unknown', rel:'animist',    gov:'tribal',     pop:'medium',
        tags:['geoglyphs','acre','brazil','amazon','lidar','earthworks',
              'geometric','pre-columbian','ceremonial','hancock',
              'ancient apocalypse','iriarte','rainforest','deforestation'] },

  // ── SOUTHERN AFRICAN KINGDOMS ────────────────────────────
  43: { lang:'niger-congo', rel:'animist',    gov:'kingdom',    pop:'small',
        tags:['mapungubwe','limpopo','south africa','gold','rhinoceros',
              'stratified','class','kingdom','indian ocean','trade',
              'china','porcelain','beads','zimbabwe','shona','rozvi',
              'unescoheritage','great zimbabwe','predecessor'] },
  44: { lang:'niger-congo', rel:'animist',    gov:'kingdom',    pop:'large',
        tags:['great zimbabwe','zimbabwe','stone','enclosure','shona',
              'rozvi','gold','trade','swahili','indian ocean','china',
              'porcelain','colonial','misattribution','phoenician',
              'queen of sheba','archaeology','limpopo','mapungubwe'] },

  // ── AFRICA — EAST, WEST & SAHARA ─────────────────────────
  45: { lang:'afroasiatic', rel:'animist',    gov:'kingdom',    pop:'large',
        tags:['kush','nubia','meroe','sudan','pyramids','nile','egypt',
              '25th dynasty','gold','trade','meroitic script','africa'] },
  46: { lang:'afroasiatic', rel:'monotheist', gov:'empire',     pop:'large',
        tags:['aksum','ethiopia','obelisks','stelae','christianity','ezana',
              'red sea','trade','coins','ark','covenant','africa','horn'] },
  47: { lang:'niger-congo', rel:'monotheist', gov:'empire',     pop:'massive',
        tags:['mali','mansa musa','timbuktu','gold','salt','sankore',
              'sundiata','west africa','islam','manuscripts','wealth'] },
  48: { lang:'niger-congo', rel:'monotheist', gov:'city-state', pop:'medium',
        tags:['swahili','kilwa','mombasa','malindi','lamu','kenya',
              'tanzania','indian ocean','trade','porcelain','china',
              'ibn battuta','coast','east africa','arabic','bantu'] },
  49: { lang:'unknown', rel:'animist',    gov:'tribal',     pop:'medium',
        tags:['green sahara','sahara','humid period','tassili','algeria',
              'cave paintings','neolithic','cattle','lake','climate',
              'nile','migration','holocene','africa','prehistoric'] },

  // ── ASIA — SOUTHEAST ASIA & JAPAN ────────────────────────
  50: { lang:'austro-asiatic', rel:'hindu',      gov:'empire',     pop:'massive',
        tags:['khmer','angkor','angkor wat','cambodia','lidar','hydraulic',
              'temple','equinox','astronomy','evans','southeast asia',
              'largest city','pre-industrial','hancock','collapse'] },
  51: { lang:'japonic', rel:'animist',    gov:'tribal',     pop:'medium',
        tags:['jomon','japan','pottery','oldest','hunter-gatherer',
              'dugu','figurine','lacquer','ainu','prehistoric','neolithic'] },

  // ── AMERICAS ─────────────────────────────────────────────
  52: { lang:'unknown', rel:'animist',    gov:'city-state', pop:'medium',
        tags:['caral','norte chico','peru','oldest americas','mounds',
              'quipu','cotton','fishing','pacific','shady','no warfare',
              'pyramid','plazas','bronze age','contemporaneous','egypt'] },
  53: { lang:'unknown', rel:'polytheist', gov:'city-state', pop:'massive',
        tags:['teotihuacan','mexico','pyramid','sun','moon','avenue dead',
              'mercury','feathered serpent','unknown builders','aztec',
              'ancient','city','americas','quetzalcoatl','tunnel'] },
  54: { lang:'unknown', rel:'animist',    gov:'city-state', pop:'medium',
        tags:['tiwanaku','puma punku','bolivia','andes','titicaca',
              'megalith','precision','stones','hancock','alternative',
              'pre-inca','high altitude','andesite','debate','inca'] },
  55: { lang:'unknown', rel:'animist',    gov:'city-state', pop:'small',
        tags:['nazca','lines','geoglyphs','peru','desert','condor',
              'hummingbird','spider','astronaut','von daniken','reiche',
              'ritual','astronomy','processional','water','mystery'] },
  56: { lang:'unknown', rel:'animist',    gov:'city-state', pop:'large',
        tags:['cahokia','mississippian','illinois','north america','mounds',
              'monks mound','woodhenge','solstice','collapse','st louis',
              'pre-columbian','native american','giza','city'] },
  57: { lang:'undeciphered', rel:'animist',    gov:'tribal',     pop:'small',
        tags:['rapa nui','easter island','moai','pacific','statues','ahu',
              'collapse','ecocide','rats','disease','isolation','lipo',
              'walk','basalt','polynesia','mystery','european contact'] },

  // ── MIDDLE EAST ───────────────────────────────────────────
  58: { lang:'semitic', rel:'polytheist', gov:'empire',     pop:'large',
        tags:['akkad','sargon','first empire','mesopotamia','iraq',
              'cuneiform','drought','collapse','akkadian','language',
              'clay tablets','bronze age','gilgamesh'] },
  59: { lang:'indo-european', rel:'polytheist', gov:'empire',     pop:'large',
        tags:['hittite','anatolia','turkey','iron','kadesh','ramesses',
              'peace treaty','un','bronze age collapse','hattusa',
              'cuneiform','script','lost language','1915'] },
  60: { lang:'semitic', rel:'polytheist', gov:'kingdom',    pop:'medium',
        tags:['nabataean','petra','jordan','arabia','water','desert',
              'treasury','incense','spice','arabic script','trade',
              'rome','canyon','carved','rock','architecture'] },

  // ── MIDDLE EAST ADDITIONAL ────────────────────────────────
  61: { lang:'semitic', rel:'polytheist', gov:'empire',    pop:'massive',
        tags:['babylon','hammurabi','nebuchadnezzar','hanging gardens',
              'tower babel','etemenanki','ishtar gate','captivity',
              'mesopotamia','iraq','cuneiform','cyrus','law'] },
  62: { lang:'indo-european', rel:'zoroastrian',gov:'empire',    pop:'massive',
        tags:['sassanid','persia','iran','ctesiphon','arch','byzantine',
              'zoroastrian','rome','islamic','conquest','arab'] },
  63: { lang:'undeciphered', rel:'polytheist', gov:'kingdom',   pop:'large',
        tags:['elam','susa','iran','proto-elamite','undeciphered',
              'mesopotamia','bronze age','hammurabi','stele','louvre'] },
  64: { lang:'indo-european', rel:'polytheist', gov:'empire',    pop:'large',
        tags:['parthia','iran','rome','crassus','carrhae','cataphract',
              'silk road','cavalry','persian','central asia'] },

  // ── AFRICA ADDITIONAL ─────────────────────────────────────
  65: { lang:'niger-congo', rel:'monotheist', gov:'empire',    pop:'massive',
        tags:['songhai','niger','timbuktu','manuscripts','tondibi',
              'firearms','west africa','islam','askia','sunni ali'] },
  66: { lang:'niger-congo', rel:'animist',    gov:'kingdom',   pop:'large',
        tags:['benin','bronze','ivory','nigeria','oba','repatriation',
              'british','portuguese','west africa','artworks','plaques'] },
  67: { lang:'niger-congo', rel:'animist',    gov:'tribal',    pop:'medium',
        tags:['nok','nigeria','iron','terracotta','figurine','west africa',
              'sub-saharan','oldest','smelting','bronze age'] },
  68: { lang:'afroasiatic', rel:'animist',    gov:'kingdom',   pop:'medium',
        tags:['garamantian','libya','sahara','foggara','aqueduct',
              'water','desert','fezzan','trade','roman','fossil water'] },

  // ── EUROPE ────────────────────────────────────────────────
  69: { lang:'isolate', rel:'polytheist', gov:'city-state',pop:'medium',
        tags:['etruscan','tuscany','italy','rome','language','isolate',
              'tombs','tarquinia','gladiator','toga','fasces'] },
  70: { lang:'indo-european', rel:'animist',    gov:'tribal',    pop:'large',
        tags:['celtic','druid','gaul','britain','ireland','knotwork',
              'la tene','hallstatt','welsh','gaelic','caesar','europe'] },

  // ── ASIA ADDITIONAL ───────────────────────────────────────
  71: { lang:'austronesian', rel:'buddhist',   gov:'empire',    pop:'large',
        tags:['srivijaya','sumatra','malaysia','maritime','malacca',
              'buddhist','palembang','yijing','trade','india','china'] },
  72: { lang:'austronesian', rel:'hindu',      gov:'kingdom',   pop:'medium',
        tags:['champa','vietnam','cham','my son','hindu','shiva',
              'vishnu','maritime','southeast asia','brick','temple'] },
  73: { lang:'unknown', rel:'animist',    gov:'city-state',pop:'medium',
        tags:['ancestral puebloan','anasazi','chaco','mesa verde',
              'pueblo bonito','cliff dwellings','southwest','kiva',
              'solstice','roads','drought','north america'] },
  74: { lang:'unknown', rel:'animist',    gov:'city-state',pop:'medium',
        tags:['moche','peru','sipan','portrait','ceramics','pyramid',
              'huaca','sacrifice','el nino','coastal','andes'] },
  75: { lang:'unknown', rel:'animist',    gov:'theocracy', pop:'small',
        tags:['chavin','huantar','andes','peru','lanzon','acoustic',
              'ritual','san pedro','cactus','fanged','deity','stone'] },
  76: { lang:'unknown', rel:'animist',    gov:'tribal',    pop:'small',
        tags:['poverty point','louisiana','mississippi','earthworks',
              'mounds','trade','obsidian','copper','north america',
              'bronze age','mystery','unknown','prehistoric'] },
  77: { lang:'austronesian', rel:'animist',    gov:'tribal',    pop:'small',
        tags:['lapita','polynesia','pacific','navigation','canoe',
              'pottery','maori','hawaii','samoa','tonga','melanesia',
              'bismarck','ancestors','stars','swells'] },
  78: { lang:'indo-european', rel:'shamanic',   gov:'tribal',    pop:'medium',
        tags:['scythian','saka','steppe','ukraine','russia','kurgan',
              'gold','animal style','nomad','amazon','herodotus',
              'cannabis','horse','archer','kazakh'] },

  // ── STUB ENTRIES ──────────────────────────────────────────
  79: { lang:'unknown', rel:'unknown',    gov:'unknown',   pop:'unknown',
        tags:['punt','egypt','hatshepsut','somalia','eritrea','yemen',
              'myrrh','ebony','gold','undiscovered','debate','location'] },
  80: { lang:'unknown', rel:'animist',    gov:'tribal',    pop:'medium',
        tags:['hopewell','ohio','earthworks','trade','copper','mica',
              'obsidian','north america','eastern','prehistoric','stub'] },
  81: { lang:'unknown', rel:'unknown',    gov:'unknown',   pop:'unknown',
        tags:['pre-clovis','monte verde','chile','chiquihuite','mexico',
              'white sands','first americans','paleoindian','migration',
              'coastal','kelp highway','trans-pacific','debate'] },
  82: { lang:'indo-european', rel:'animist',    gov:'tribal',    pop:'large',
        tags:['cucuteni','trypillia','ukraine','romania','moldova',
              'neolithic','europe','burning','painted pottery',
              'indo-european','large settlement','mystery'] },
  83: { lang:'unknown', rel:'unknown',    gov:'unknown',   pop:'medium',
        tags:['sanxingdui','sichuan','china','bronze','mask','tree',
              'protruding eyes','mystery','independent','1986',
              'bronze age','excavation','2021'] },
  84: { lang:'unknown', rel:'animist',    gov:'unknown',   pop:'unknown',
        tags:['gobekli tepe','builders','anatolia','turkey','megalith',
              'pre-agriculture','hancock','lacroix','mystery','temple',
              'hunter gatherer','pre-younger dryas','unknown'] },
  85: { lang:'undeciphered', rel:'unknown',    gov:'unknown',   pop:'unknown',
        tags:['linear a','minoan','crete','undeciphered','script',
              'aegean','language','isolate','linear b','mystery',
              'epigraphy','bronze age','europe'] },

  // ── LANGUAGE-DEFINING CULTURES ────────────────────────────
  86: { lang:'reconstructed', rel:'polytheist', gov:'tribal', pop:'unknown',
        tags:['proto-indo-european','yamnaya','steppe','kurgan','renfrew',
              'gimbutas','ancient dna','horse','wheel','indo-european',
              'ancestor','expansion','lacroix','storm god','dragon myth',
              'pontic','caspian','bronze age','migration','language'] },
  87: { lang:'dravidian',    rel:'hindu',      gov:'city-state', pop:'medium',
        tags:['dravidian','tamil','sangam','south india','sri lanka',
              'classical literature','pre-aryan','indus valley','script',
              'oldest language','secular','poetry','love poetry',
              'tolkappiyam','akananuru','purananuru'] },
  88: { lang:'undeciphered', rel:'polytheist', gov:'unknown',    pop:'unknown',
        tags:['epi-olmec','isthmian','cascajal','la mojarra','script',
              'undeciphered','mesoamerica','oldest writing','americas',
              'zoquean','kaufman','justeson','olmec','proto-writing'] },
  // ── DEBATED / CONTROVERSIAL ───────────────────────────────
  31: { lang:'unknown', rel:'unknown',    gov:'unknown',   pop:'unknown',
        tags:['contact','polynesia','sweet potato','chicken','transoceanic',
              'columbus','olmec','africa','genetics'] },
  32: { lang:'isolate', rel:'theorized',  gov:'unknown',   pop:'unknown',
        tags:['annunaki','sitchin','sumerian','extraterrestrial','nibiru','gold',
              'genetic engineering','ancient aliens','mesopotamia'] },
  33: { lang:'unknown', rel:'theorized',  gov:'unknown',   pop:'unknown',
        tags:['ancient aliens','von daniken','chariots','ufology','intervention',
              'technology','pyramid','nazca','tv','hancock'] },

  // ── PHASE 5a — ids 89–120 ─────────────────────────────────
  89:  { lang:'semitic',       rel:'monotheist', gov:'kingdom',    pop:'medium',
        tags:['israel','judah','hebrew','bible','first temple','babylon','dead sea scrolls','torah','levant'] },
  90:  { lang:'semitic',       rel:'polytheist', gov:'city-state', pop:'medium',
        tags:['aramaic','lingua franca','syria','jesus','nabataean','alphabet','persian','mesopotamia'] },
  91:  { lang:'polynesian',    rel:'polytheist', gov:'chiefdom',   pop:'medium',
        tags:['hawaii','polynesian','pacific','kapu','mana','ali\'i','kamehameha','navigation'] },
  92:  { lang:'polynesian',    rel:'polytheist', gov:'chiefdom',   pop:'medium',
        tags:['tonga','polynesian','pacific','maritime','tu\'i tonga','haامonga','trilithon','astronomy'] },
  93:  { lang:'austronesian',  rel:'polytheist', gov:'monarchy',   pop:'small',
        locationType:'B',
        tags:['nan madol','pohnpei','micronesia','basalt','saudeleur','submerged','hancock','ancient apocalypse','mystery'],
        locationTheories: [
          { lat:6.84, lng:158.34, label:'Nan Madol — Pohnpei lagoon, mainstream site', source:'Rainbird (2004)', researcher:null, up:1240, dn:180 },
          { lat:6.84, lng:158.34, label:'Hancock — earlier construction phases in oral tradition', source:'Ancient Apocalypse (2022)', researcher:'Graham Hancock', up:980, dn:640 },
        ] },
  94:  { lang:'bactrian',      rel:'buddhist',   gov:'empire',     pop:'large',
        tags:['kushan','silk road','gandhara','buddhism','hellenistic','india','central asia','kanishka'] },
  95:  { lang:'iranian',       rel:'zoroastrian',gov:'city-state', pop:'medium',
        tags:['sogdian','silk road','merchant','samarkand','bukhara','script','ancestor','uyghur','mongol'] },
  96:  { lang:'turkic',        rel:'jewish',     gov:'khaganate',  pop:'medium',
        locationType:'B',
        tags:['khazar','jewish','steppe','volga','caspian','silk road','koestler','medieval','buffer state'],
        locationTheories: [
          { lat:46.00, lng:48.50, label:'Atil capital — Volga delta (destroyed 968 CE)', source:'Cambridge History of Early Inner Asia (1990)', researcher:null, up:780, dn:55 },
          { lat:43.30, lng:47.00, label:'Semender — earlier Khazar capital in Dagestan', source:'Golden (1980)', researcher:null, up:290, dn:130 },
        ] },
  97:  { lang:'turkic-mongolic',rel:'islamic',   gov:'empire',     pop:'large',
        tags:['timurid','timur','tamerlane','samarkand','registan','art','astronomy','persia','babur','mughal'] },
  98:  { lang:'undeciphered',  rel:'unknown',    gov:'tribal',     pop:'small',
        tags:['cycladic','aegean','islands','marble','figurine','art','bronze age','minoan','greece','naxos'] },
  99:  { lang:'indo-european', rel:'christian',  gov:'empire',     pop:'large',
        tags:['carolingian','charlemagne','renaissance','latin','manuscript','france','germany','europe','feudal'] },
  100: { lang:'indo-european', rel:'christian',  gov:'republic',   pop:'medium',
        tags:['venice','republic','merchant','mediterranean','titian','tintoretto','spice','trade','napoleon'] },
  101: { lang:'indo-european', rel:'orthodox',   gov:'monarchy',   pop:'large',
        tags:['kievan rus','kyiv','ukraine','russia','orthodox','vladimir','christianity','varangian','mongol'] },
  102: { lang:'mesoamerican',  rel:'polytheist', gov:'city-state', pop:'medium',
        locationType:'B',
        tags:['zapotec','monte alban','oaxaca','writing','calendar','mesoamerica','mexico','observatory'],
        locationTheories: [
          { lat:17.04, lng:-96.77, label:'Monte Albán — primary Zapotec centre, mainstream', source:'Marcus & Flannery (1996)', researcher:null, up:2100, dn:120 },
        ] },
  103: { lang:'mesoamerican',  rel:'polytheist', gov:'city-state', pop:'medium',
        locationType:'B',
        tags:['toltec','tula','quetzalcoatl','aztec','chichen itza','mexico','warrior columns','mesoamerica'],
        locationTheories: [
          { lat:20.06, lng:-99.34, label:'Tula (Tollan) — mainstream Toltec capital', source:'Davies (1977)', researcher:null, up:1800, dn:200 },
          { lat:20.68, lng:-88.57, label:'Chichen Itza — possible Toltec contact/conquest site', source:'Various', researcher:null, up:1200, dn:480 },
        ] },
  104: { lang:'arawakan',      rel:'polytheist', gov:'chiefdom',   pop:'medium',
        tags:['taino','caribbean','hispaniola','arawak','zemi','columbus','1492','genocide','hammock','canoe'] },
  105: { lang:'muskogean',     rel:'polytheist', gov:'chiefdom',   pop:'large',
        tags:['mississippian','cahokia','mound','north america','maize','woodhenge','solstice','pre-columbian'] },
  106: { lang:'niger-congo',   rel:'christian',  gov:'kingdom',    pop:'large',
        tags:['kongo','angola','congo','afonso','slave trade','central africa','christianity','portuguese'] },
  107: { lang:'semitic',       rel:'christian',  gov:'empire',     pop:'large',
        tags:['ethiopia','solomonic','haile selassie','rastafari','solomon','sheba','kebra nagast','orthodox'] },
  108: { lang:'niger-congo',   rel:'polytheist', gov:'monarchy',   pop:'medium',
        tags:['dahomey','west africa','agojie','female warriors','slave trade','benin republic','military'] },
  109: { lang:'nilo-saharan',  rel:'christian',  gov:'kingdom',    pop:'medium',
        locationType:'B',
        tags:['nubia','christian','makuria','nobatia','alodia','mural','nile','medieval','sudan','byzantine'],
        locationTheories: [
          { lat:18.50, lng:31.82, label:'Old Dongola — Makuria capital', source:'Vantini (1970)', researcher:null, up:780, dn:55 },
          { lat:15.60, lng:32.53, label:'Soba — Alodia capital near Khartoum', source:'Various', researcher:null, up:480, dn:88 },
        ] },
  110: { lang:'dravidian',     rel:'hindu',      gov:'empire',     pop:'massive',
        tags:['vijayanagara','hampi','krishnadevaraya','south india','hindu','karnataka','deccan','temple'] },
  111: { lang:'sino-tibetan',  rel:'buddhist',   gov:'monarchy',   pop:'large',
        tags:['pagan','bagan','myanmar','burma','theravada','temple','stupa','mongol','irrawaddy'] },
  112: { lang:'koreanic',      rel:'buddhist',   gov:'monarchy',   pop:'large',
        tags:['goryeo','korea','tripitaka','celadon','pottery','buddhism','mongol','haeinsa'] },
  113: { lang:'dravidian',     rel:'hindu',      gov:'empire',     pop:'massive',
        tags:['chola','tamil','naval','brihadeeswarar','srivijaya','raid','thanjavur','south india','dynasty'] },
  114: { lang:'iranian',       rel:'islamic',    gov:'empire',     pop:'massive',
        tags:['safavid','persia','iran','shia','isfahan','shah abbas','carpet','miniature','architecture'] },
  115: { lang:'indo-european', rel:'islamic',    gov:'empire',     pop:'massive',
        tags:['mughal','india','taj mahal','akbar','aurangzeb','babur','agra','red fort','pluralism'] },

  // ── PHASE 5f — ids 116–150 ────────────────────────────────
  116: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['younger dryas','impact','firestone','hancock','carlson','comet','destruction','pre-flood','global'] },
  117: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['pre-flood','maritime','coastal','submerged','hancock','sea level','global','theorized'] },
  118: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['carolina bays','channeled scablands','younger dryas','carlson','impact','platinum','comet','missoula'],
        locationTheories: [
          { lat:34.00, lng:-79.00, label:'Carolina Bays — eastern seaboard ejecta field (Carlson)', source:'Kosmographia (2019)', researcher:'Randall Carlson', up:1240, dn:640 },
          { lat:47.50, lng:-119.00, label:'Channeled Scablands — Missoula megaflood terrain (Carlson)', source:'Kosmographia (2020)', researcher:'Randall Carlson', up:1540, dn:480 },
        ] },
  119: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['richat','eye of sahara','mauritania','corsetti','atlantis','green sahara','circular','formation'],
        locationTheories: [
          { lat:21.12, lng:-11.40, label:'Richat Structure — Eye of the Sahara, Mauritania (Corsetti)', source:'Bright Insight YouTube (2018)', researcher:'Jimmy Corsetti', up:1840, dn:2140 },
        ] },
  120: { lang:'unknown',       rel:'theorized',  gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['anunnaki','gold mining','tellinger','sitchin','south africa','stone circles','mpumalanga','extraterrestrial'] },
  121: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['denisovan','archaic human','collins','gobekli tepe','megalith','siberia','dna','hybrid','melanesia'] },
  122: { lang:'undeciphered',  rel:'unknown',    gov:'city-state', pop:'large',
        tags:['harappan','indus script','undeciphered','bronze age','pakistan','india','mystery','proto-dravidian'] },
  123: { lang:'niger-congo',   rel:'animist',    gov:'tribal',     pop:'medium',
        locationType:'B',
        tags:['dogon','mali','sirius','astronomy','temple','west africa','et','sirius b','white dwarf'],
        locationTheories: [
          { lat:14.50, lng:-3.50, label:'Dogon homeland — Bandiagara Escarpment, Mali', source:'Temple (1976)', researcher:'Robert Temple', up:1540, dn:480 },
        ] },
  124: { lang:'indo-european', rel:'hindu',      gov:'tribal',     pop:'large',
        locationType:'B',
        tags:['saraswati','indus','vedic','rigveda','frawley','india','pakistan','river','bronze age','satellite'],
        locationTheories: [
          { lat:28.00, lng:72.00, label:'Ghaggar-Hakra river system — satellite-identified Saraswati trace', source:'Various', researcher:null, up:1540, dn:640 },
        ] },
  125: { lang:'polynesian',    rel:'polytheist', gov:'chiefdom',   pop:'small',
        locationType:'B',
        tags:['rapa nui','easter island','south america','sweet potato','heyerdahl','kon-tiki','trans-pacific','contact'],
        locationTheories: [
          { lat:-27.10, lng:-109.40, label:'Easter Island — confirmed Rapa Nui site', source:'Various', researcher:null, up:2100, dn:180 },
          { lat:-8.00, lng:-79.00, label:'Peruvian coast — Heyerdahl proposed South American origin point', source:'Kon-Tiki (1948)', researcher:'Thor Heyerdahl', up:980, dn:840 },
        ] },
  126: { lang:'isolate',       rel:'polytheist', gov:'city-state', pop:'medium',
        tags:['etruscan','tuscany','italy','origins','lydia','indigenous','dna','language','isolate','mystery'] },
  127: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'small',
        locationType:'A',
        tags:['poverty point','louisiana','astronomy','solstice','earthworks','lidar','hunter-gatherer','rapid construction'] },
  128: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'small',
        locationType:'A',
        tags:['orkney','neolithic','skara brae','brodgar','stenness','maeshowe','solstice','scotland','ness of brodgar'] },
  129: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'small',
        locationType:'A',
        tags:['gobekli tepe','astronomy','vulture stone','sweatman','cygnus','collins','younger dryas','comet','pillar 43'] },
  130: { lang:'indo-european', rel:'hindu',      gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['vedic','rigveda','astronomy','tilak','frawley','kak','india','dating','sanskrit','arctic'],
        locationTheories: [
          { lat:25.00, lng:73.00, label:'Rajasthan / NW India — proposed Vedic homeland (Frawley)', source:'Gods, Sages and Kings (1991)', researcher:'David Frawley', up:980, dn:640 },
        ] },
  131: { lang:'andean',        rel:'polytheist', gov:'empire',     pop:'large',
        locationType:'B',
        tags:['machu picchu','inca','cusco','sacsayhuaman','foerster','precision','stonework','solstice','cosmology'],
        locationTheories: [
          { lat:-13.16, lng:-72.54, label:'Machu Picchu — mainstream Inca construction ~1450 CE', source:'Rowe (1946)', researcher:null, up:2840, dn:380 },
          { lat:-13.52, lng:-71.98, label:'Sacsayhuamán — Foerster argues pre-Inca polygonal lower courses', source:'Advanced Ancient Civilizations', researcher:'Brien Foerster', up:1240, dn:1640 },
        ] },
  132: { lang:'austro-asiatic',rel:'hindu',      gov:'empire',     pop:'massive',
        tags:['angkor','cambodia','cosmology','mannikka','orion','hancock','heaven\'s mirror','lidar','hydraulic'] },
  133: { lang:'afroasiatic',   rel:'polytheist', gov:'kingdom',    pop:'large',
        locationType:'B',
        tags:['orion correlation','giza','bauval','hancock','sphinx','leo','precession','10500bce','pyramid','egypt'],
        locationTheories: [
          { lat:29.98, lng:31.13, label:'Giza Plateau — Bauval\'s Orion Belt correlation site', source:'The Orion Mystery (1994)', researcher:'Robert Bauval', up:2840, dn:1840 },
        ] },
  134: { lang:'austro-asiatic',rel:'hindu',      gov:'kingdom',    pop:'medium',
        locationType:'A',
        tags:['funan','cambodia','mekong','pre-khmer','indianized','hydraulic','lidar','earthworks','southeast asia'] },
  135: { lang:'semitic',       rel:'polytheist', gov:'city-state', pop:'medium',
        locationType:'A',
        tags:['phoenician','africa','circumnavigation','herodotus','necho','red sea','vasco da gama','expedition'] },
  136: { lang:'indo-european', rel:'hindu',      gov:'kingdom',    pop:'large',
        locationType:'B',
        tags:['dwarka','krishna','mahabharata','gulf of khambhat','submerged','india','frawley','niot','controversial'],
        locationTheories: [
          { lat:22.24, lng:72.13, label:'Gulf of Khambhat — NIOT submerged structures survey 2002', source:'NIOT Survey (2002)', researcher:null, up:1540, dn:1340 },
          { lat:22.24, lng:69.10, label:'Dwarka coast — traditional site near modern Dwarka town', source:'Various', researcher:null, up:980, dn:480 },
        ] },
  137: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['mu','lemuria','pacific','churchward','sunken continent','theosophical','naacal','polynesian'] },
  138: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['pre-flood','north america','pre-clovis','hancock','carlson','topper site','serpent mound','flood myth'] },
  139: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['adam\'s calendar','stone circle','south africa','mpumalanga','tellinger','anunnaki','gold mining','solstice'],
        locationTheories: [
          { lat:-25.07, lng:30.84, label:'Kaap Valley — Tellinger\'s primary Adam\'s Calendar site', source:'Adam\'s Calendar (2008)', researcher:'Michael Tellinger', up:1240, dn:2710 },
        ] },
  140: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['tartaria','hyperborea','siberia','reset','mud flood','vincha tablets','internet','alternative'] },
  141: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['antarctica','hapgood','piri reis','crustal displacement','hancock','flem-ath','atlantis','ice-free'] },
  142: { lang:'unknown',       rel:'unknown',    gov:'tribal',     pop:'tiny',
        tags:['chatelperronian','neanderthal','ornament','transitional','france','spain','paleolithic','modern human'] },
  143: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'tiny',
        tags:['aurignacian','cave painting','chauvet','venus','bone flute','lion man','paleolithic','creative explosion'] },
  144: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'tiny',
        tags:['gravettian','venus figurine','dolni vestonice','ceramic','oldest pottery','paleolithic','europe','siberia'] },
  145: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'small',
        tags:['magdalenian','lascaux','altamira','cave art','ice age','bison','paleolithic','bone tool','naturalism'] },
  146: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'tiny',
        tags:['karahantepe','anatolia','neolithic','sculpture','human figure','tas tepeler','turkey','gobekli','2019'] },
  147: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'tiny',
        tags:['cayonu','turkey','anatolia','copper','pig','sacrifice','skull','neolithic','transition','agriculture'] },
  148: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['bosnian pyramids','visoko','osmanagic','tunnel','concrete','debated','europe','eaa','schoch'],
        locationTheories: [
          { lat:43.98, lng:18.17, label:'Visočica Hill — Pyramid of the Sun (Osmanagić)', source:'Pyramids of Bosnia (2005)', researcher:'Semir Osmanagić', up:2140, dn:3820 },
          { lat:43.97, lng:18.15, label:'Plješevica Hill — Pyramid of the Moon (Osmanagić)', source:'Pyramids of Bosnia (2005)', researcher:'Semir Osmanagić', up:1240, dn:2640 },
        ] },
  149: { lang:'unknown',       rel:'animist',    gov:'tribal',     pop:'tiny',
        tags:['nabta playa','egypt','sahara','megalith','solstice','astronomy','green sahara','brophy','orion','neolithic'] },
  150: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['thule','polar','aryan','esoteric','theosophical','hyperborea','ice free','alternative','blavatsky'] },

  // ── PHASE 5k — ids 151–180 ────────────────────────────────
  151: { lang:'niger-congo',   rel:'polytheist', gov:'monarchy',   pop:'large',
        locationType:'A',
        tags:['benin','bronze','ivory','nigeria','oba','repatriation','british','west africa','artworks'] },
  152: { lang:'niger-congo',   rel:'polytheist', gov:'monarchy',   pop:'large',
        locationType:'A',
        tags:['oyo','yoruba','cavalry','west africa','slave trade','constitutional monarchy','alafin'] },
  153: { lang:'nilo-saharan',  rel:'islamic',    gov:'sultanate',  pop:'medium',
        locationType:'B',
        tags:['funj','sennar','sudan','nile','islamic','scholarship','medieval africa'],
        locationTheories: [
          { lat:13.55, lng:33.60, label:'Sennar — Blue Nile capital, mainstream consensus', source:'Encyclopædia Britannica', researcher:null, up:480, dn:22 },
        ] },
  154: { lang:'afro-asiatic',  rel:'islamic',    gov:'empire',     pop:'large',
        locationType:'A',
        tags:['kanem-bornu','lake chad','trans-saharan','central africa','islam','longest empire'] },
  155: { lang:'dravidian',     rel:'polytheist', gov:'monarchy',   pop:'large',
        locationType:'A',
        tags:['ganga','odisha','konark','jagannath','india','temple','naval','shaivite'] },
  156: { lang:'dravidian',     rel:'polytheist', gov:'monarchy',   pop:'large',
        locationType:'A',
        tags:['pallava','kanchipuram','mamallapuram','dravidian architecture','script ancestor','south india','naval'] },
  157: { lang:'austronesian',  rel:'buddhist',   gov:'thalassocracy', pop:'large',
        locationType:'A',
        tags:['srivijaya','maritime','southeast asia','silk road','buddhism','sumatra','malacca','thalassocracy'] },
  158: { lang:'austronesian',  rel:'polytheist', gov:'empire',     pop:'large',
        locationType:'A',
        tags:['majapahit','java','southeast asia','hindu-buddhist','maritime','indonesia','gajah mada'] },
  159: { lang:'muskogean',     rel:'polytheist', gov:'chiefdom',   pop:'large',
        locationType:'A',
        tags:['mississippian','cahokia','mound builder','north america','maize','pre-columbian','mississippi'] },
  160: { lang:'isolate',       rel:'polytheist', gov:'theocracy',  pop:'large',
        locationType:'B',
        tags:['tiwanaku','puma punku','bolivia','andes','titicaca','pre-inca','posnansky','gateway of the sun'],
        locationTheories: [
          { lat:-16.55, lng:-68.67, label:'Tiwanaku — mainstream archaeological site', source:'Encyclopædia Britannica', researcher:null, up:1240, dn:45 },
          { lat:-16.55, lng:-68.67, label:'Posnansky — same location but 15,000 BCE date via astronomical alignment', source:'Tiahuanacu (1945)', researcher:'Arthur Posnansky', up:520, dn:1840 },
        ] },
  161: { lang:'austronesian',  rel:'polytheist', gov:'chiefdom',   pop:'small',
        locationType:'A',
        tags:['lapita','pacific','oceania','maritime','polynesian ancestor','pottery','voyaging','bismarck'] },
  162: { lang:'polynesian',    rel:'polytheist', gov:'chiefdom',   pop:'medium',
        locationType:'A',
        tags:['pacific','hawaii','polynesian','mana','kapu','ali\'i','voyaging','kamehameha'] },
  163: { lang:'iranian',       rel:'zoroastrian',gov:'city-state', pop:'medium',
        locationType:'A',
        tags:['sogdian','silk road','merchant','central asia','samarkand','bukhara','script ancestor','letters'] },
  164: { lang:'unknown',       rel:'polytheist', gov:'unknown',    pop:'medium',
        locationType:'B',
        tags:['bmac','oxus','central asia','bronze age','bactria','margiana','proto-writing','indus contact'],
        locationTheories: [
          { lat:37.90, lng:60.08, label:'Gonur Depe — primary BMAC excavation site (Sarianidi)', source:'Margiana and Protozoroastrism (1998)', researcher:'Viktor Sarianidi', up:620, dn:38 },
          { lat:37.25, lng:67.27, label:'Dashly Oasis — major BMAC temple-palace complex', source:'Hiebert (1994)', researcher:null, up:380, dn:42 },
        ] },
  165: { lang:'turkic',        rel:'jewish',     gov:'khaganate',  pop:'medium',
        locationType:'B',
        tags:['khazar','jewish','steppe','volga','caspian','koestler','medieval'],
        locationTheories: [
          { lat:46.00, lng:48.50, label:'Atil — Volga delta capital (destroyed 968 CE)', source:'Cambridge History (1990)', researcher:null, up:780, dn:55 },
        ] },
  166: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['bosnian pyramids','visoko','osmanagic','debated','europe','pre-yd','tunnel','schoch','eaa'],
        locationTheories: [
          { lat:43.98, lng:18.17, label:'Visočica Hill — Pyramid of the Sun', source:'Pyramids of Bosnia (2005)', researcher:'Semir Osmanagić', up:2140, dn:3820 },
          { lat:43.97, lng:18.15, label:'Plješevica Hill — Pyramid of the Moon', source:'Pyramids of Bosnia (2005)', researcher:'Semir Osmanagić', up:1240, dn:2640 },
        ] },
  167: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['adams calendar','stone circle','south africa','mpumalanga','tellinger','anunnaki','gold mining','solstice'],
        locationTheories: [
          { lat:-25.07, lng:30.84, label:'Kaap Valley — primary Adam\'s Calendar site (Tellinger)', source:'Adam\'s Calendar (2008)', researcher:'Michael Tellinger', up:1240, dn:2710 },
        ] },
  168: { lang:'unknown',       rel:'polytheist', gov:'unknown',    pop:'small',
        locationType:'A',
        tags:['gobekli tepe','megalithic','turkey','pre-agricultural','astronomy','cygnus','collins','schmidt','burial'] },
  169: { lang:'unknown',       rel:'polytheist', gov:'unknown',    pop:'medium',
        locationType:'A',
        tags:['sanxingdui','china','sichuan','bronze','mystery','pre-chinese','ritual pits','2021','enlarged eyes'] },
  170: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'B',
        tags:['yonaguni','japan','submerged','kimura','hancock','post-glacial','sea level','debated artificial'],
        locationTheories: [
          { lat:24.44, lng:122.94, label:'Yonaguni Monument — primary dive site (Kimura)', source:'Man-Made Structures (1996)', researcher:'Masaaki Kimura', up:2640, dn:1580 },
        ] },
  171: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['thule','polar','aryan myth','esoteric','pre-ice-age','hyperborea','theosophical'] },
  172: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['pre-clovis','north america','pre-flood','younger dryas','hancock','carlson','flood myth'] },
  173: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['mu','lemuria','pacific','sunken continent','churchward','theosophical','flood myth'] },
  174: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['tartaria','hyperborea','siberia','reset theory','mud flood','internet theory','eurasian'] },
  175: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
        locationType:'C',
        tags:['antarctica','hapgood','crustal displacement','piri reis','hancock','atlantis','pre-ice'] },
  176: { lang:'semitic',       rel:'christian',  gov:'empire',     pop:'large',
        locationType:'A',
        tags:['aksum','ethiopia','horn of africa','christian','red sea trade','obelisk','ark of covenant'] },
  177: { lang:'bantu',         rel:'polytheist', gov:'monarchy',   pop:'small',
        locationType:'A',
        tags:['mapungubwe','south africa','limpopo','gold','indian ocean trade','great zimbabwe precursor','bantu'] },
  178: { lang:'chimuan',       rel:'polytheist', gov:'empire',     pop:'large',
        locationType:'A',
        tags:['chimu','peru','chan chan','hydraulic engineering','pre-inca','adobe','north coast'] },
  179: { lang:'muskogean',     rel:'polytheist', gov:'chiefdom',   pop:'medium',
        locationType:'A',
        tags:['hopewell','north america','mound builder','ohio','trade network','earthworks','astronomy'] },
  180: { lang:'japonic',       rel:'animist',    gov:'chiefdom',   pop:'medium',
        locationType:'A',
        tags:['jomon','japan','oldest pottery','hunter-gatherer','deep time','ancient dna','sedentism'] },

// PHASE 5m — NEW CIV_META ENTRIES 181–210
// Append these into the CIV_META object in data-extended.js
// Paste before the closing }; of the CIV_META object

  181: { lang:'nilo-saharan',  rel:'polytheist', gov:'kingdom',    pop:'large',
         locationType:'A',
         tags:['kush','nubia','sudan','meroitic','iron','egypt rival','napata','meroe','african pharaohs'] },

  182: { lang:'unknown',       rel:'polytheist', gov:'chiefdom',   pop:'medium',
         locationType:'A',
         tags:['nok','nigeria','terracotta','iron age','west africa','sculpture','sub-saharan'] },

  183: { lang:'bantu',         rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['great zimbabwe','shona','dry-stone','gold trade','indian ocean','southern africa','colonialism'] },

  184: { lang:'niger-congo',   rel:'polytheist', gov:'monarchy',   pop:'large',
         locationType:'A',
         tags:['benin','nigeria','bronze','looted art','oba','divine king','pre-colonial africa','bronzes'] },

  185: { lang:'bantu',         rel:'polytheist', gov:'city-state', pop:'medium',
         locationType:'A',
         tags:['swahili','east africa','kilwa','mombasa','indian ocean','trade','ibn battuta','monsoon'] },

  186: { lang:'dravidian',     rel:'polytheist', gov:'empire',     pop:'massive',
         locationType:'A',
         tags:['chola','tamil','south india','naval','sri lanka','southeast asia','temple','brihadeeswara'] },

  187: { lang:'austro-asiatic',rel:'polytheist', gov:'empire',     pop:'massive',
         locationType:'A',
         tags:['khmer','cambodia','angkor wat','hydraulic','rice','southeast asia','meru','largest temple'] },

  188: { lang:'austronesian',  rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['champa','vietnam','my son','hinduism','maritime','coastal','cham'] },

  189: { lang:'sino-tibetan',  rel:'buddhist',   gov:'kingdom',    pop:'large',
         locationType:'A',
         tags:['bagan','myanmar','burma','theravada','buddhist','temples','irrawaddy','mongol'] },

  190: { lang:'indo-european', rel:'polytheist', gov:'confederacy',pop:'medium',
         locationType:'A',
         tags:['scythian','steppe','nomadic','gold','kurgan','tattooed mummies','pontic','amazon warriors'] },

  191: { lang:'unknown',       rel:'polytheist', gov:'empire',     pop:'large',
         locationType:'A',
         tags:['xiongnu','mongolia','steppe','great wall','nomadic','china','han dynasty','huns origin'] },

  192: { lang:'turkic-mongolic',rel:'polytheist',gov:'empire',     pop:'large',
         locationType:'A',
         tags:['gokturk','turkic','orkhon script','central asia','khaganate','steppe','silk road'] },

  193: { lang:'muskogean',     rel:'polytheist', gov:'chiefdom',   pop:'large',
         locationType:'A',
         tags:['cahokia','mississippian','mounds','monks mound','illinois','sacrifice','north america','urban'] },

  194: { lang:'mesoamerican',  rel:'polytheist', gov:'city-state', pop:'medium',
         locationType:'A',
         tags:['zapotec','oaxaca','monte alban','mesoamerica','calendar','writing','mexico','astronomy'] },

  195: { lang:'andean',        rel:'polytheist', gov:'empire',     pop:'large',
         locationType:'A',
         tags:['wari','andes','peru','pre-inca','textile','administrative','road network','collapse'] },

  196: { lang:'muskogean',     rel:'polytheist', gov:'chiefdom',   pop:'medium',
         locationType:'A',
         tags:['moundville','mississippian','alabama','mounds','southern cult','chiefdom','ceremonial complex'] },

  197: { lang:'isolate',       rel:'polytheist', gov:'city-state', pop:'medium',
         locationType:'A',
         tags:['etruscan','italy','pre-roman','undeciphered','rome influence','tomb painting','gladiator'] },

  198: { lang:'undeciphered',  rel:'polytheist', gov:'palace',     pop:'medium',
         locationType:'A',
         tags:['minoan','crete','knossos','linear a','bull leaping','atlantis candidate','aegean','bronze age'] },

  199: { lang:'semitic',       rel:'polytheist', gov:'city-state', pop:'medium',
         locationType:'A',
         tags:['phoenician','alphabet','carthage','maritime','levant','trade','circumnavigation','writing system'] },

  200: { lang:'indo-european', rel:'polytheist', gov:'confederacy',pop:'large',
         locationType:'A',
         tags:['celtic','europe','druids','la tene','iron age','gaul','oral tradition','western europe'] },

  201: { lang:'indo-european', rel:'polytheist', gov:'empire',     pop:'large',
         locationType:'A',
         tags:['hittite','anatolia','iron','kadesh','cuneiform','peace treaty','chariot','bronze age collapse'] },

  202: { lang:'semitic',       rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['nabataean','petra','jordan','spice trade','hydraulic','arabic script','frankincense','desert'] },

  203: { lang:'indo-european', rel:'polytheist', gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['vedic','vimana','india','frawley','ancient technology','flying craft','mahabharata','brahmastra'],
         locationTheories: [
           { lat:25.0, lng:81.0, label:'Gangetic Plain — Vedic heartland', source:'General Vedic geography', researcher:null, up:640, dn:480 },
           { lat:30.0, lng:76.0, label:'Saraswati River basin — Frawley', source:'Gods, Sages and Kings (1991)', researcher:'David Frawley', up:840, dn:640 },
         ] },

  204: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['atlantis','richat','mauritania','eye of sahara','corsetti','plato','concentric rings','sahara'],
         locationTheories: [
           { lat:21.12, lng:-11.40, label:'Richat Structure, Mauritania — Corsetti', source:'Bright Insight (2018)', researcher:'Jimmy Corsetti', up:1640, dn:1840 },
         ] },

  205: { lang:'austronesian',  rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['sundaland','southeast asia','flood','austronesian','oppenheimer','santos','atlantis','drowned'],
         locationTheories: [
           { lat:-2.0, lng:108.0, label:'Sundaland shelf — Santos/Oppenheimer', source:'Eden in the East (1998)', researcher:'Stephen Oppenheimer', up:1140, dn:840 },
         ] },

  206: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'B',
         tags:['dwarka','india','submerged','gulf of khambhat','mahabharata','krishna','harappan','underwater'],
         locationTheories: [
           { lat:22.24, lng:68.97, label:'Dwarka coast, Gujarat — NIOT sonar survey', source:'NIOT Survey (2002)', researcher:null, up:1240, dn:1480 },
         ] },

  207: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['amazon','lost city of z','fawcett','brazil','geoglyphs','heckenberger','xingu','mato grosso'],
         locationTheories: [
           { lat:-12.0, lng:-53.5, label:'Upper Xingu, Mato Grosso — Heckenberger network', source:'The Ecology of Power (2005)', researcher:'Michael Heckenberger', up:1040, dn:480 },
           { lat:-11.5, lng:-55.0, label:'Fawcett\'s Z — estimated search area', source:'Exploration Fawcett (1953)', researcher:null, up:640, dn:720 },
         ] },

  208: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['pre-clovis','americas','paleolithic','monte verde','topper','chiquihuite','hancock','ice age'],
         locationTheories: [
           { lat:-41.5, lng:-73.2, label:'Monte Verde, Chile — 14,800 BCE confirmed', source:'Monte Verde (1997)', researcher:null, up:1640, dn:240 },
           { lat:33.5, lng:-81.0, label:'Topper Site, South Carolina — possible 50,000 BCE', source:'Topper Site excavations (2004)', researcher:null, up:640, dn:1240 },
           { lat:22.8, lng:-99.6, label:'Chiquihuite Cave, Mexico — possible 26,000 BCE', source:'Nature (2020)', researcher:null, up:980, dn:1240 },
         ] },

  209: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['anunnaki','sitchin','nibiru','sumerian','extraterrestrial','ancient aliens','gold mining','genetic engineering'],
         locationTheories: [
           { lat:32.5, lng:45.5, label:'Sumer / Mesopotamia — Sitchin\'s primary site', source:'The 12th Planet (1976)', researcher:'Zecharia Sitchin', up:940, dn:2840 },
         ] },

  210: { lang:'unknown',       rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['denisovan','paleoanthropology','collins','gobekli tepe','ancient dna','hybrid','siberia','megalithic'],
         locationTheories: [
           { lat:51.4, lng:84.7, label:'Denisova Cave, Altai — discovery site', source:'Nature (2010)', researcher:null, up:1640, dn:240 },
           { lat:30.0, lng:90.0, label:'Tibet — Denisovan high-altitude gene (EPAS1)', source:'Nature (2014) — Nielsen et al.', researcher:null, up:1240, dn:480 },
         ] },

  // ── BATCH 5o ── ids 211–240 ──────────────────────────────────────────────

  211: { lang:'niger-congo',    rel:'animist',    gov:'empire',     pop:'large',
         locationType:'A',
         tags:['ghana empire','wagadu','west africa','gold trade','trans-saharan','koumbi saleh','salt trade'] },

  212: { lang:'niger-congo',    rel:'animist',    gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['buganda','great lakes','uganda','kabaka','centralized state','lake victoria'] },

  213: { lang:'afroasiatic',    rel:'monotheist', gov:'theocracy',  pop:'large',
         locationType:'A',
         tags:['sokoto caliphate','hausa','jihad','usman dan fodio','islamic empire','nigeria','emirates'] },

  214: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'small',
         locationType:'A',
         tags:['tassili najjer','sahara','rock art','green sahara','round head style','algeria','prehistoric'] },

  215: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'small',
         locationType:'A',
         tags:['clovis','paleo-indian','north america','fluted points','big game hunters','first americans'] },

  216: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'small',
         locationType:'A',
         tags:['adena','ohio valley','mound builders','earthworks','hopewell precursor','burial mounds'] },

  217: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'medium',
         locationType:'A',
         tags:['tairona','colombia','sierra nevada de santa marta','goldwork','terraced cities','kogi descendants','ciudad perdida'] },

  218: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'medium',
         locationType:'A',
         tags:['muisca','colombia','el dorado','lake guatavita','goldwork','andes','emerald trade'] },

  219: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'medium',
         locationType:'A',
         tags:['calusa','florida','maritime','non-agricultural','shell mounds','fishing economy'] },

  220: { lang:'unknown',        rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'B',
         tags:['dilmun','bahrain','trade hub','sumerian texts','paradise myth','persian gulf','pearl trade'],
         locationTheories: [
           { lat:26.00, lng:50.55, label:'Bahrain — primary identification of Dilmun', source:'A.T. Olmstead; Bahrain National Museum excavations', researcher:null, up:1140, dn:480 },
           { lat:29.40, lng:48.40, label:'Failaka Island, Kuwait — alternative/extended Dilmun zone', source:'Danish excavations, Failaka Island', researcher:null, up:480, dn:640 },
         ] },

  221: { lang:'austro-asiatic', rel:'hindu',      gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['funan','cambodia','mekong delta','oc eo','indianization','khmer precursor','maritime trade'] },

  222: { lang:'isolate',        rel:'buddhist',   gov:'kingdom',    pop:'large',
         locationType:'A',
         tags:['silla','korea','three kingdoms','gyeongju','buddhism','gold crowns','unification'] },

  223: { lang:'japonic',        rel:'shamanic',   gov:'empire',     pop:'large',
         locationType:'A',
         tags:['yamato','kofun','japan','keyhole tombs','shinto','emperor lineage','asuka period'] },

  224: { lang:'sino-tibetan',   rel:'buddhist',   gov:'empire',     pop:'large',
         locationType:'A',
         tags:['tibetan empire','tibet','himalaya','buddhism','songtsen gampo','silk road','central asia'] },

  225: { lang:'undeciphered',   rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'B',
         tags:['tartessos','iberia','tarshish','atlantis candidate','phoenician trade','silver','spain'],
         locationTheories: [
           { lat:37.27, lng:-6.06, label:'Guadalquivir estuary, Huelva — Tartessian core zone', source:'Various Tartessian archaeology surveys', researcher:null, up:1040, dn:380 },
           { lat:37.00, lng:-6.30, label:'Doñana Marshes — Atlantis/Tartessos overlap (Freund)', source:'Richard Freund, Atlantis survey project', researcher:'Richard Freund', up:480, dn:1480 },
         ] },

  226: { lang:'unknown',        rel:'polytheist', gov:'tribal',     pop:'small',
         locationType:'A',
         tags:['malta','megalithic temples','ggantija','hypogeum','neolithic','oldest freestanding structures','mediterranean'] },

  227: { lang:'indo-european',  rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['thracian','balkans','odrysian kingdom','gold treasures','orpheus','bulgaria','rome conquest'] },

  228: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'small',
         locationType:'C',
         tags:['doggerland','north sea','drowned land','mesolithic','sea level rise','britain','flood myth','storegga'],
         locationTheories: [
           { lat:54.50, lng:3.00, label:'Dogger Bank — Doggerland core, North Sea', source:"Europe's Lost World (2009) — Gaffney et al.", researcher:'Vincent Gaffney', up:1140, dn:240 },
         ] },

  229: { lang:'semitic',        rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['saba','sheba','yemen','incense trade','queen of sheba','marib dam','south arabia'] },

  230: { lang:'isolate',        rel:'polytheist', gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['urartu','armenia','van','fortresses','iron age','assyrian rival','lake van'] },

  231: { lang:'indo-european',  rel:'zoroastrian',gov:'empire',     pop:'medium',
         locationType:'A',
         tags:['median empire','iran','zoroastrianism','achaemenid precursor','ecbatana','assyria fall'] },

  232: { lang:'unknown',        rel:'animist',    gov:'tribal',     pop:'medium',
         locationType:'A',
         tags:['aboriginal australia','dreaming','continuous culture','rock art','oldest culture','songlines','australia'] },

  233: { lang:'austronesian',   rel:'animist',    gov:'tribal',     pop:'small',
         locationType:'A',
         tags:['maori','new zealand','aotearoa','polynesian migration','waka','pa fortifications','moa extinction'] },

  234: { lang:'unknown',        rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['bimini road','atlantis','bahamas','edgar cayce','underwater formation','beachrock','psychic prediction'],
         locationTheories: [
           { lat:25.70, lng:-79.30, label:'Bimini Road, Bahamas — Cayce prediction site', source:'Edgar Cayce Readings (1930s-40s)', researcher:'Edgar Cayce', up:840, dn:1640 },
         ] },

  235: { lang:'unknown',        rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['olmec','van sertima','trans-atlantic','african contact','colossal heads','afrocentric theory','mesoamerica'],
         locationTheories: [
           { lat:18.00, lng:-95.00, label:'Olmec heartland, Gulf Coast Mexico — Van Sertima claim site', source:'They Came Before Columbus (1976)', researcher:'Ivan Van Sertima', up:740, dn:1840 },
         ] },

  236: { lang:'unknown',        rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['solutrean hypothesis','ice age','atlantic crossing','clovis origins','stanford bradley','paleolithic europe'],
         locationTheories: [
           { lat:45.00, lng:0.00,  label:'Southwestern France/Iberia — Solutrean heartland', source:'Across Atlantic Ice (2012)', researcher:'Dennis Stanford & Bruce Bradley', up:640, dn:480 },
           { lat:35.00, lng:-65.00, label:'Mid-Atlantic — proposed Ice Age crossing route', source:'Across Atlantic Ice (2012)', researcher:'Dennis Stanford & Bruce Bradley', up:480, dn:840 },
         ] },

  237: { lang:'unknown',        rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'A',
         tags:['kennewick man','ancient one','columbia river','repatriation','ancient dna','paleo-indian','washington state'] },

  238: { lang:'unknown',        rel:'unknown',    gov:'unknown',    pop:'unknown',
         locationType:'A',
         tags:['longyou caves','china','underground excavation','mystery','engineering','zhejiang','undated'] },

  239: { lang:'semitic',        rel:'polytheist', gov:'unknown',    pop:'unknown',
         locationType:'A',
         tags:['baalbek','lebanon','trilithon','megaliths','heliopolis','roman temple','pre-roman platform'] },

  240: { lang:'unknown',        rel:'polytheist', gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['el dorado','muisca','lake guatavita','golden city','spanish conquest','colombia','legend'],
         locationTheories: [
           { lat:5.13, lng:-73.78, label:'Lake Guatavita, Colombia — Muisca golden offering ritual site', source:'Juan Rodríguez Freyle, El Carnero (1638)', researcher:null, up:1040, dn:240 },
         ] },

  // ── PHASE 5r — ids 241–270 ─────────────────────────────────
  241: { lang:'cushitic', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['kerma','nubia','africa','bronze-age','egypt','rival','tumuli'],
         locationType:'A', locationTheories:[] },
  242: { lang:'wolof', rel:'animist', gov:'confederation', pop:'medium',
         tags:['jolof','wolof','west-africa','senegal','sahel','trade','atlantic'],
         locationType:'A', locationTheories:[] },
  243: { lang:'igbo', rel:'polytheist', gov:'chiefdom', pop:'medium',
         tags:['igbo','nigeria','bronze','lost-wax','africa','trade','beads'],
         locationType:'A', locationTheories:[] },
  244: { lang:'ge-ez', rel:'christian', gov:'monarchy', pop:'medium',
         tags:['zagwe','lalibela','ethiopia','rock-hewn','christian','africa','pilgrimage'],
         locationType:'A', locationTheories:[] },
  245: { lang:'hausa', rel:'islam', gov:'city-state', pop:'large',
         tags:['hausa','kano','nigeria','sahel','islamic','trade','africa'],
         locationType:'A', locationTheories:[] },
  246: { lang:'lunda', rel:'animist', gov:'empire', pop:'large',
         tags:['lunda','central-africa','drc','angola','zambia','trade','copper'],
         locationType:'A', locationTheories:[] },
  247: { lang:'unknown', rel:'unknown', gov:'unknown', pop:'medium',
         tags:['carnac','megaliths','neolithic','brittany','france','astronomy','monument'],
         locationType:'B',
         locationTheories: [
           { lat:47.597, lng:-2.948, label:'Carnac main alignments — Le Ménec, Kermario, Kerlescan', source:'Cassen CNRS surveys', researcher:null, isDefault:true, up:1040, dn:280 },
           { lat:47.60,  lng:-2.93,  label:'Kerlescant enclosure — easternmost alignment group', source:'Thom, Megalithic Sites in Britain (1967)', researcher:'Alexander Thom', up:640, dn:380 },
         ] },
  248: { lang:'unknown', rel:'polytheist', gov:'chiefdom', pop:'medium',
         tags:['unetice','nebra','bronze-age','europe','astronomy','sky-disk','central-europe'],
         locationType:'A', locationTheories:[] },
  249: { lang:'proto-celtic', rel:'polytheist', gov:'tribal', pop:'large',
         tags:['bell-beaker','neolithic','bronze-age','europe','migration','dna','stonehenge'],
         locationType:'A', locationTheories:[] },
  250: { lang:'unknown', rel:'polytheist', gov:'chiefdom', pop:'large',
         tags:['nuragic','sardinia','bronze-age','mediterranean','nuraghi','atlantis','sergio-frau'],
         locationType:'B',
         locationTheories: [
           { lat:40.12, lng:9.01, label:'Barumini — Su Nuraxi, UNESCO World Heritage nuraghe complex', source:'Giovanni Ugas, University of Cagliari (2005)', researcher:null, isDefault:true, up:980, dn:320 },
           { lat:39.85, lng:8.90, label:'Central Sardinia — Frau\'s proposed Atlantis heartland', source:'Frau, Le Colonne d\'Ercole (2002)', researcher:'Sergio Frau', up:480, dn:840 },
         ] },
  251: { lang:'old-chinese', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['xia','china','bronze-age','erlitou','legendary','dynasty','flood-myth'],
         locationType:'B',
         locationTheories: [
           { lat:34.69, lng:112.67, label:'Erlitou, Henan — primary archaeological candidate for late Xia capital', source:'Xia-Shang-Zhou Chronology Project (2000)', researcher:null, isDefault:true, up:980, dn:440 },
           { lat:34.47, lng:113.17, label:'Wangchenggang — proposed early Xia \'Yangcheng\' capital', source:'Chinese Academy of Social Sciences (2007)', researcher:null, up:540, dn:540 },
         ] },
  252: { lang:'unknown', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['mehrgarh','neolithic','indus','pakistan','farming','dentistry','bronze-age'],
         locationType:'A', locationTheories:[] },
  253: { lang:'unknown', rel:'unknown', gov:'unknown', pop:'medium',
         tags:['jiroft','iran','bronze-age','aratta','sumer','chlorite','looting'],
         locationType:'B',
         locationTheories: [
           { lat:28.68, lng:57.72, label:'Halil Rūd valley, Kerman Province — primary excavation zone', source:'Majidzadeh, Iran vol. 41 (2003)', researcher:'Yousef Majidzadeh', isDefault:true, up:640, dn:480 },
         ] },
  254: { lang:'mitanni', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['mitanni','mesopotamia','syria','bronze-age','indo-aryan','vedic','horse-training'],
         locationType:'B',
         locationTheories: [
           { lat:36.84, lng:40.32, label:'Wassukanni — proposed capital location near Tell Halaf, Syria', source:'Kühne, Orientalia (1995)', researcher:null, isDefault:true, up:780, dn:380 },
         ] },
  255: { lang:'old-korean', rel:'shamanism', gov:'monarchy', pop:'large',
         tags:['gojoseon','korea','manchuria','dangun','legendary','iron-age','pre-history'],
         locationType:'B',
         locationTheories: [
           { lat:39.03, lng:125.75, label:'Pyongyang region — traditional site of Gojoseon capital Wanggeomseong', source:'Samguk Yusa (1281)', researcher:null, isDefault:true, up:540, dn:540 },
           { lat:41.83, lng:123.43, label:'Liaoyang, Manchuria — alternative early Gojoseon core proposed by some scholars', source:'Barnes, State Formation in Korea (2001)', researcher:null, up:480, dn:480 },
         ] },
  256: { lang:'mon', rel:'buddhist', gov:'monarchy', pop:'medium',
         tags:['dvaravati','thailand','mon','buddhist','southeast-asia','khmer','theravada'],
         locationType:'A', locationTheories:[] },
  257: { lang:'eblaite', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['ebla','syria','bronze-age','cuneiform','semitic','akkad','tablets'],
         locationType:'A', locationTheories:[] },
  258: { lang:'lydian', rel:'polytheist', gov:'monarchy', pop:'medium',
         tags:['lydia','anatolia','coinage','croesus','persia','electrum','trade'],
         locationType:'A', locationTheories:[] },
  259: { lang:'sundanese', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['gunung-padang','java','indonesia','megalith','pre-yd','hancock','ancient-apocalypse'],
         locationType:'B',
         locationTheories: [
           { lat:-6.996, lng:107.056, label:'Gunung Padang, West Java — surface megalithic terrace site', source:'Indonesian Archaeological Centre (2014)', researcher:null, isDefault:true, up:840, dn:480 },
           { lat:-6.996, lng:107.056, label:'Gunung Padang — subsurface structures claimed by Natawidjaja to extend to 25,000 BCE', source:'Natawidjaja et al., Archaeological Prospection (2023)', researcher:'Danny Hilman Natawidjaja', up:980, dn:1240 },
         ] },
  260: { lang:'unknown', rel:'unknown', gov:'unknown', pop:'small',
         tags:['white-sands','pre-clovis','americas','footprints','new-mexico','pleistocene','ice-age'],
         locationType:'A', locationTheories:[] },
  261: { lang:'unknown', rel:'unknown', gov:'chiefdom', pop:'small',
         tags:['chinchorro','mummies','atacama','chile','peru','fisher-gatherer','oldest-mummies'],
         locationType:'A', locationTheories:[] },
  262: { lang:'uto-aztecan', rel:'polytheist', gov:'chiefdom', pop:'medium',
         tags:['casas-grandes','paquime','chihuahua','mexico','adobe','macaw','southwest'],
         locationType:'A', locationTheories:[] },
  263: { lang:'fremont', rel:'animist', gov:'tribal', pop:'small',
         tags:['fremont','utah','colorado','rock-art','great-basin','pre-columbian','hunter-gatherer'],
         locationType:'A', locationTheories:[] },
  264: { lang:'unknown', rel:'unknown', gov:'tribal', pop:'small',
         tags:['watson-brake','louisiana','mounds','hunter-gatherer','pre-clovis','north-america','neolithic'],
         locationType:'A', locationTheories:[] },
  265: { lang:'chibchan', rel:'polytheist', gov:'chiefdom', pop:'medium',
         tags:['diquis','stone-spheres','costa-rica','pre-columbian','mystery','granite','ufo'],
         locationType:'B',
         locationTheories: [
           { lat:8.79, lng:-83.55, label:'Diquís Delta, Costa Rica — primary concentration of spheres', source:'Hoopes & Fonseca (2003)', researcher:null, isDefault:true, up:980, dn:260 },
         ] },
  266: { lang:'yapese', rel:'animist', gov:'chiefdom', pop:'small',
         tags:['yap','micronesia','stone-money','rai','pacific','currency','ocean-voyaging'],
         locationType:'A', locationTheories:[] },
  267: { lang:'proto-amerindian', rel:'animist', gov:'tribal', pop:'small',
         tags:['beringia','land-bridge','migration','americas','ice-age','dna','pre-clovis'],
         locationType:'C',
         locationTheories: [
           { lat:63.00, lng:-168.00, label:'Bering Land Bridge core — Beringia heartland submerged since ~10,000 BCE', source:'Tamm et al., PLoS ONE (2007)', researcher:null, up:1040, dn:340 },
           { lat:55.00, lng:-130.00, label:'Pacific Northwest coastal migration corridor — kelp-highway route', source:'McLachlan et al., Quaternary Science Reviews (2005)', researcher:null, up:880, dn:420 },
         ] },
  268: { lang:'hattian', rel:'polytheist', gov:'chiefdom', pop:'medium',
         tags:['hattian','anatolia','pre-hittite','isolate','language','turkey','bronze-age'],
         locationType:'A', locationTheories:[] },
  269: { lang:'tungusic', rel:'buddhist', gov:'monarchy', pop:'large',
         tags:['balhae','parhae','manchuria','korea','goguryeo','tang','khitan'],
         locationType:'A', locationTheories:[] },
  270: { lang:'tocharian', rel:'animist', gov:'unknown', pop:'small',
         tags:['tarim','mummies','xinjiang','china','silk-road','dna','bronze-age','steppe'],
         locationType:'B',
         locationTheories: [
           { lat:40.54, lng:81.28, label:'Tarim Basin, Xinjiang — primary mummy burial sites (Loulan, Cherchen, Yingpan)', source:'Mallory & Mair, The Tarim Mummies (2000)', researcher:null, isDefault:true, up:1240, dn:280 },
         ] },

  // ── PHASE 5u — ids 271–300 ─────────────────────────────────
  271: { lang:'ge-ez', rel:'christian', gov:'empire', pop:'large',
         tags:['aksum','ethiopia','eritrea','red-sea','trade','obelisk','ark-of-covenant','christianity'],
         locationType:'A', locationTheories:[] },
  272: { lang:'unknown', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['poverty-point','louisiana','mounds','hunter-gatherer','trade','americas','neolithic'],
         locationType:'A', locationTheories:[] },
  273: { lang:'sotho-tswana', rel:'animist', gov:'monarchy', pop:'medium',
         tags:['mapungubwe','south-africa','gold','limpopo','iron-age','trade','zimbabwe'],
         locationType:'A', locationTheories:[] },
  274: { lang:'pukina', rel:'polytheist', gov:'empire', pop:'large',
         tags:['tiwanaku','titicaca','bolivia','andes','gateway-of-the-sun','posnansky','pre-flood'],
         locationType:'A', locationTheories:[] },
  275: { lang:'quechua', rel:'polytheist', gov:'empire', pop:'large',
         tags:['wari','peru','andes','khipu','terrace','pre-inca','staff-god'],
         locationType:'A', locationTheories:[] },
  276: { lang:'muskogean', rel:'animist', gov:'chiefdom', pop:'large',
         tags:['mississippian','cahokia','mounds','north-america','corn','secc','pre-columbian'],
         locationType:'A', locationTheories:[] },
  277: { lang:'unknown', rel:'animist', gov:'unknown', pop:'small',
         tags:['gobekli-tepe','turkey','neolithic','hunter-gatherer','pre-flood','hancock','pillar'],
         locationType:'A', locationTheories:[] },
  278: { lang:'algonquian', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['hopewell','ohio','mounds','americas','trade','copper','lunar-alignment'],
         locationType:'A', locationTheories:[] },
  279: { lang:'unknown', rel:'animist', gov:'egalitarian', pop:'large',
         tags:['cucuteni','trypillia','ukraine','neolithic','painted-pottery','burning','europe'],
         locationType:'A', locationTheories:[] },
  280: { lang:'unknown', rel:'unknown', gov:'unknown', pop:'large',
         tags:['caral','norte-chico','peru','americas','urban','no-war','maritime'],
         locationType:'A', locationTheories:[] },
  281: { lang:'proto-indo-european', rel:'polytheist', gov:'tribal', pop:'large',
         tags:['yamnaya','steppe','bronze-age','dna','migration','proto-indo-european','horse'],
         locationType:'A', locationTheories:[] },
  282: { lang:'unknown', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['sanxingdui','sichuan','china','bronze','mystery','mask','sacrifice'],
         locationType:'A', locationTheories:[] },
  283: { lang:'proto-oceanic', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['lapita','pacific','melanesia','polynesia','voyaging','pottery','ancestors'],
         locationType:'A', locationTheories:[] },
  284: { lang:'sogdian', rel:'zoroastrian', gov:'city-state', pop:'medium',
         tags:['sogdian','silk-road','samarkand','central-asia','trade','merchant','alphabet'],
         locationType:'A', locationTheories:[] },
  285: { lang:'nabataean', rel:'polytheist', gov:'monarchy', pop:'medium',
         tags:['nabataean','petra','jordan','trade','water','incense','arabic-script'],
         locationType:'A', locationTheories:[] },
  286: { lang:'etruscan', rel:'polytheist', gov:'city-state', pop:'large',
         tags:['etruscan','tuscany','italy','rome','haruspicy','language-isolate','bronze-age'],
         locationType:'A', locationTheories:[] },
  287: { lang:'scythian', rel:'animist', gov:'confederacy', pop:'large',
         tags:['scythian','steppe','iron-age','gold','nomad','kurgan','animal-style'],
         locationType:'A', locationTheories:[] },
  288: { lang:'linear-a', rel:'polytheist', gov:'palace-state', pop:'large',
         tags:['minoan','crete','bronze-age','linear-a','atlantis','thera','aegean'],
         locationType:'B',
         locationTheories: [
           { lat:35.30, lng:25.16, label:'Knossos, Crete — primary Minoan palace complex', source:'Evans, The Palace of Minos (1921)', researcher:null, isDefault:true, up:1280, dn:280 },
           { lat:36.44, lng:25.43, label:'Thera/Santorini — Atlantis hypothesis epicentre; Minoan presence confirmed', source:'Galanopoulos & Bacon (1969)', researcher:'Angelos Galanopoulos', up:680, dn:840 },
         ] },
  289: { lang:'phoenician', rel:'polytheist', gov:'city-state', pop:'large',
         tags:['phoenician','levant','trade','alphabet','carthage','purple-dye','mediterranean'],
         locationType:'A', locationTheories:[] },
  290: { lang:'indus', rel:'unknown', gov:'unknown', pop:'large',
         tags:['indus','harappan','mohenjo-daro','bronze-age','undeciphered','urban','south-asia'],
         locationType:'A', locationTheories:[] },
  291: { lang:'ge-ez', rel:'polytheist', gov:'monarchy', pop:'medium',
         tags:['dmt','pre-aksum','ethiopia','eritrea','sabaean','ge-ez','horn-of-africa'],
         locationType:'A', locationTheories:[] },
  292: { lang:'dilmunite', rel:'polytheist', gov:'city-state', pop:'medium',
         tags:['dilmun','bahrain','gulf','trade','eden','sumerian','bronze-age'],
         locationType:'B',
         locationTheories: [
           { lat:26.23, lng:50.51, label:'Qal\'at al-Bahrain — ancient capital; UNESCO World Heritage site', source:'Crawford, Dilmun and its Gulf Neighbours (1998)', researcher:null, isDefault:true, up:940, dn:220 },
           { lat:29.35, lng:47.98, label:'Failaka Island, Kuwait — proposed northern Dilmun extension', source:'Danish Archaeological Expedition (1958–1963)', researcher:null, up:540, dn:540 },
         ] },
  293: { lang:'olmec', rel:'polytheist', gov:'chiefdom', pop:'large',
         tags:['olmec','mexico','mother-culture','colossal-heads','mesoamerica','african-contact','van-sertima'],
         locationType:'A', locationTheories:[] },
  294: { lang:'celtic', rel:'polytheist', gov:'tribal', pop:'large',
         tags:['celtic','europe','iron-age','druids','la-tene','hallstatt','oral-tradition'],
         locationType:'A', locationTheories:[] },
  295: { lang:'prakrit', rel:'buddhist', gov:'empire', pop:'large',
         tags:['maurya','india','ashoka','buddhist','arthashastra','empire','non-violence'],
         locationType:'A', locationTheories:[] },
  296: { lang:'khmer', rel:'hindu-buddhist', gov:'empire', pop:'large',
         tags:['khmer','angkor','cambodia','southeast-asia','hydraulic','angkor-wat','collapse'],
         locationType:'A', locationTheories:[] },
  297: { lang:'greek', rel:'christian', gov:'empire', pop:'large',
         tags:['byzantine','rome','eastern','hagia-sophia','christian','justinian','renaissance'],
         locationType:'A', locationTheories:[] },
  298: { lang:'old-korean', rel:'shamanism', gov:'monarchy', pop:'large',
         tags:['goguryeo','korea','manchuria','murals','sui','tang','fortress'],
         locationType:'A', locationTheories:[] },
  299: { lang:'nahuatl', rel:'polytheist', gov:'city-state', pop:'medium',
         tags:['toltec','tula','mexico','mesoamerica','chichen-itza','quetzalcoatl','artisan'],
         locationType:'A', locationTheories:[] },
  300: { lang:'hawaiian', rel:'animist', gov:'monarchy', pop:'medium',
         tags:['hawaii','pacific','polynesian','navigation','kapu','isolation','cook'],
         locationType:'A', locationTheories:[] },

  // ── PHASE 5v — ids 301–330 ─────────────────────────────────
  301: { lang:'ge-ez', rel:'polytheist', gov:'city-state', pop:'medium',
         tags:['adulis','aksum','red-sea','trade','eritrea','port','periplus'],
         locationType:'A', locationTheories:[] },
  302: { lang:'meroitic', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['kush','meroe','nubia','pyramids','black-pharaohs','iron','undeciphered'],
         locationType:'A', locationTheories:[] },
  303: { lang:'nok', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['nok','nigeria','terracotta','iron-smelting','africa','sculpture','looting'],
         locationType:'A', locationTheories:[] },
  304: { lang:'shona', rel:'animist', gov:'monarchy', pop:'large',
         tags:['great-zimbabwe','shona','africa','stone','gold','trade','colonial-denial'],
         locationType:'A', locationTheories:[] },
  305: { lang:'unknown', rel:'animist', gov:'unknown', pop:'small',
         tags:['punt','horn-of-africa','egypt','trade','theorized','pre-flood','hancock'],
         locationType:'C',
         locationTheories:[
           { lat:15.00, lng:40.00, label:'Eritrea/Ethiopia coast — mainstream candidate for Land of Punt', source:'Egyptological consensus', researcher:null, up:840, dn:320 },
           { lat:11.00, lng:43.00, label:'Somalia coast — alternative mainstream candidate', source:'Kitchen, Punt and How to Get There (1971)', researcher:null, up:540, dn:480 },
           { lat:15.00, lng:44.00, label:'Yemen / both sides of Red Sea — Punt may have straddled the strait', source:'Bloxam et al., JEA (2006)', researcher:null, up:480, dn:520 },
         ] },
  306: { lang:'taino', rel:'animist', gov:'chiefdom', pop:'large',
         tags:['taino','caribbean','columbus','cassava','zemi','ball-game','genocide'],
         locationType:'A', locationTheories:[] },
  307: { lang:'muskogean', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['moundville','mississippian','alabama','copper','mounds','platform','elite'],
         locationType:'A', locationTheories:[] },
  308: { lang:'ancestral-puebloan', rel:'animist', gov:'theocracy', pop:'medium',
         tags:['chaco','ancestral-puebloan','new-mexico','roads','astronomy','great-houses','southwest'],
         locationType:'A', locationTheories:[] },
  309: { lang:'tlingit', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['tlingit','northwest-coast','haida','potlatch','formline','totem','maritime'],
         locationType:'A', locationTheories:[] },
  310: { lang:'unknown', rel:'animist', gov:'tribal', pop:'small',
         tags:['archaic-south','hunter-gatherer','mounds','americas','pre-agricultural','mississippi','earthworks'],
         locationType:'A', locationTheories:[] },
  311: { lang:'indus', rel:'unknown', gov:'unknown', pop:'large',
         tags:['dholavira','indus','gujarat','water','undeciphered','bronze-age','unesco'],
         locationType:'A', locationTheories:[] },
  312: { lang:'sanskrit', rel:'hindu', gov:'tribal', pop:'large',
         tags:['vedic','india','sanskrit','rigveda','indo-aryan','frawley','out-of-india'],
         locationType:'B',
         locationTheories:[
           { lat:29.97, lng:77.55, label:'Upper Gangetic Plain / Sarasvati River region — Vedic heartland', source:'Witzel (1999)', researcher:null, isDefault:true, up:980, dn:380 },
           { lat:27.00, lng:72.00, label:'Sarasvati / Ghaggar-Hakra river — Frawley\'s indigenous Vedic homeland', source:'Frawley, Gods, Sages and Kings (1991)', researcher:'David Frawley', up:640, dn:680 },
         ] },
  313: { lang:'oracle-bone', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['shang','china','bronze','oracle-bone','writing','sacrifice','yellow-river'],
         locationType:'A', locationTheories:[] },
  314: { lang:'old-chinese', rel:'confucian', gov:'feudal', pop:'large',
         tags:['zhou','china','confucius','mandate-of-heaven','iron-age','philosophy','hundred-schools'],
         locationType:'A', locationTheories:[] },
  315: { lang:'old-persian', rel:'zoroastrian', gov:'empire', pop:'large',
         tags:['achaemenid','persia','cyrus','darius','persepolis','silk-road','tolerance'],
         locationType:'A', locationTheories:[] },
  316: { lang:'parthian', rel:'zoroastrian', gov:'empire', pop:'large',
         tags:['parthian','arsacid','iran','silk-road','rome','carrhae','cavalry'],
         locationType:'A', locationTheories:[] },
  317: { lang:'middle-persian', rel:'zoroastrian', gov:'empire', pop:'large',
         tags:['sasanian','persia','zoroastrian','byzantine','islamic-conquest','iran','art'],
         locationType:'A', locationTheories:[] },
  318: { lang:'middle-chinese', rel:'buddhist', gov:'empire', pop:'large',
         tags:['tang','china','golden-age','silk-road','poetry','cosmopolitan','chang-an'],
         locationType:'A', locationTheories:[] },
  319: { lang:'middle-chinese', rel:'buddhist', gov:'empire', pop:'large',
         tags:['song','china','printing','gunpowder','paper-money','compass','economic-revolution'],
         locationType:'A', locationTheories:[] },
  320: { lang:'old-malay', rel:'buddhist', gov:'empire', pop:'large',
         tags:['srivijaya','sumatra','maritime','malacca','buddhist','trade','thalassocracy'],
         locationType:'A', locationTheories:[] },
  321: { lang:'old-javanese', rel:'hindu-buddhist', gov:'empire', pop:'large',
         tags:['majapahit','java','southeast-asia','maritime','hindu','nagarakretagama','indonesia'],
         locationType:'A', locationTheories:[] },
  322: { lang:'persian', rel:'islam', gov:'sultanate', pop:'large',
         tags:['delhi-sultanate','india','islam','mongol','mughal','qutb-minar','medieval'],
         locationType:'A', locationTheories:[] },
  323: { lang:'kannada', rel:'hindu', gov:'empire', pop:'large',
         tags:['vijayanagara','hampi','south-india','hindu','portuguese','talikota','architecture'],
         locationType:'A', locationTheories:[] },
  324: { lang:'mongolian', rel:'shamanism', gov:'empire', pop:'large',
         tags:['mongol','genghis','silk-road','conquest','pax-mongolica','black-death','kublai'],
         locationType:'A', locationTheories:[] },
  325: { lang:'ottoman-turkish', rel:'islam', gov:'empire', pop:'large',
         tags:['ottoman','turkey','istanbul','suleiman','balkans','millet','constantinople'],
         locationType:'A', locationTheories:[] },
  326: { lang:'persian', rel:'islam', gov:'empire', pop:'large',
         tags:['mughal','india','taj-mahal','akbar','aurangzeb','babur','architecture'],
         locationType:'A', locationTheories:[] },
  327: { lang:'quechua', rel:'polytheist', gov:'empire', pop:'large',
         tags:['inca','tawantinsuyu','andes','khipu','roads','machu-picchu','spain'],
         locationType:'A', locationTheories:[] },
  328: { lang:'nahuatl', rel:'polytheist', gov:'empire', pop:'large',
         tags:['aztec','tenochtitlan','triple-alliance','sacrifice','cortes','mesoamerica','calendar'],
         locationType:'A', locationTheories:[] },
  329: { lang:'mayan', rel:'polytheist', gov:'city-state', pop:'large',
         tags:['maya','tikal','palenque','hieroglyphic','calendar','collapse','mesoamerica'],
         locationType:'A', locationTheories:[] },
  330: { lang:'punic', rel:'polytheist', gov:'republic', pop:'large',
         tags:['carthage','phoenician','punic-wars','hannibal','rome','north-africa','mediterranean'],
         locationType:'A', locationTheories:[] },

  // ── PHASE 5w — ids 331–360 ─────────────────────────────────
  331: { lang:'greek', rel:'polytheist', gov:'empire', pop:'large',
         tags:['alexander','macedon','hellenistic','greece','persia','silk-road','diadochi'],
         locationType:'A', locationTheories:[] },
  332: { lang:'latin', rel:'polytheist', gov:'republic', pop:'large',
         tags:['rome','republic','senate','magna-carta','mediterranean','law','expansion'],
         locationType:'A', locationTheories:[] },
  333: { lang:'latin', rel:'polytheist', gov:'empire', pop:'large',
         tags:['rome','empire','roads','aqueducts','law','fall','augustus'],
         locationType:'A', locationTheories:[] },
  334: { lang:'old-norse', rel:'norse', gov:'chiefdom', pop:'medium',
         tags:['viking','norse','scandinavia','longship','newfoundland','raid','settlement'],
         locationType:'A', locationTheories:[] },
  335: { lang:'german', rel:'christian', gov:'feudal', pop:'large',
         tags:['holy-roman-empire','germany','europe','feudal','reformation','free-cities','voltaire'],
         locationType:'A', locationTheories:[] },
  336: { lang:'latin', rel:'christian', gov:'empire', pop:'large',
         tags:['carolingian','charlemagne','frankish','europe','renaissance','minuscule','aachen'],
         locationType:'A', locationTheories:[] },
  337: { lang:'old-french', rel:'christian', gov:'monarchy', pop:'large',
         tags:['capetian','france','medieval','gothic','crusade','philip','louis'],
         locationType:'A', locationTheories:[] },
  338: { lang:'middle-english', rel:'christian', gov:'monarchy', pop:'large',
         tags:['plantagenet','england','magna-carta','common-law','chaucer','black-death','roses'],
         locationType:'A', locationTheories:[] },
  339: { lang:'old-slavic', rel:'orthodox', gov:'monarchy', pop:'large',
         tags:['kievan-rus','ukraine','russia','orthodox','viking','mongol','vladimir'],
         locationType:'A', locationTheories:[] },
  340: { lang:'mande', rel:'islam', gov:'empire', pop:'large',
         tags:['mali','mansa-musa','timbuktu','gold','sahel','west-africa','wealth'],
         locationType:'A', locationTheories:[] },
  341: { lang:'songhai', rel:'islam', gov:'empire', pop:'large',
         tags:['songhai','timbuktu','west-africa','sahel','askia','morocco','gunpowder'],
         locationType:'A', locationTheories:[] },
  342: { lang:'edo', rel:'animist', gov:'monarchy', pop:'large',
         tags:['benin','bronzes','nigeria','africa','repatriation','oba','art'],
         locationType:'A', locationTheories:[] },
  343: { lang:'swahili', rel:'islam', gov:'city-state', pop:'large',
         tags:['swahili','east-africa','kilwa','trade','indian-ocean','china','ibn-battuta'],
         locationType:'A', locationTheories:[] },
  344: { lang:'ge-ez', rel:'christian', gov:'monarchy', pop:'large',
         tags:['solomonic','ethiopia','haile-selassie','adwa','kebra-nagast','ark','rastafari'],
         locationType:'A', locationTheories:[] },
  345: { lang:'ge-ez', rel:'christian', gov:'theocracy', pop:'large',
         tags:['ethiopian-orthodox','tewahedo','aksum','ark','ge-ez','liturgy','africa'],
         locationType:'A', locationTheories:[] },
  346: { lang:'persian', rel:'islam', gov:'sultanate', pop:'large',
         tags:['deccan','sultanate','india','gol-gumbaz','bijapur','golconda','urdu'],
         locationType:'A', locationTheories:[] },
  347: { lang:'marathi', rel:'hindu', gov:'empire', pop:'large',
         tags:['maratha','shivaji','india','hindu','panipat','british','guerrilla'],
         locationType:'A', locationTheories:[] },
  348: { lang:'korean', rel:'confucian', gov:'monarchy', pop:'large',
         tags:['joseon','korea','hangul','sejong','turtle-ship','yi-sun-sin','confucian'],
         locationType:'A', locationTheories:[] },
  349: { lang:'japanese', rel:'shinto', gov:'shogunate', pop:'large',
         tags:['tokugawa','edo','japan','sakoku','kabuki','haiku','perry'],
         locationType:'A', locationTheories:[] },
  350: { lang:'manchu', rel:'confucian', gov:'empire', pop:'large',
         tags:['qing','china','manchu','opium-wars','taiping','xinhai','last-emperor'],
         locationType:'A', locationTheories:[] },
  351: { lang:'persian', rel:'islam', gov:'empire', pop:'large',
         tags:['seljuk','turkic','anatolia','manzikert','madrasa','persia','sultan'],
         locationType:'A', locationTheories:[] },
  352: { lang:'arabic', rel:'islam', gov:'caliphate', pop:'large',
         tags:['abbasid','baghdad','golden-age','house-of-wisdom','algebra','ibn-sina','mongol'],
         locationType:'A', locationTheories:[] },
  353: { lang:'arabic', rel:'islam', gov:'caliphate', pop:'large',
         tags:['umayyad','damascus','al-andalus','dome-of-the-rock','cordoba','expansion','arab'],
         locationType:'A', locationTheories:[] },
  354: { lang:'arabic', rel:'islam', gov:'caliphate', pop:'large',
         tags:['al-andalus','cordoba','spain','convivencia','toledo','translation','moorish'],
         locationType:'A', locationTheories:[] },
  355: { lang:'arabic', rel:'islam', gov:'caliphate', pop:'large',
         tags:['fatimid','cairo','al-azhar','shia','ismaili','egypt','north-africa'],
         locationType:'A', locationTheories:[] },
  356: { lang:'french', rel:'christian', gov:'feudal', pop:'medium',
         tags:['crusader','jerusalem','levant','frankish','saladin','acre','crusade'],
         locationType:'B',
         locationTheories:[
           { lat:31.78, lng:35.23, label:'Jerusalem — capital of the Crusader Kingdom of Jerusalem', source:'Runciman, A History of the Crusades (1951)', researcher:null, isDefault:true, up:1040, dn:260 },
           { lat:36.20, lng:36.16, label:'Antioch — capital of the Principality of Antioch', source:'Asbridge, The Crusades (2010)', researcher:null, up:680, dn:320 },
         ] },
  357: { lang:'tibetan', rel:'buddhist', gov:'empire', pop:'large',
         tags:['tibet','tibetan-empire','songtsen-gampo','silk-road','buddhist','tang','script'],
         locationType:'A', locationTheories:[] },
  358: { lang:'cham', rel:'hindu-buddhist', gov:'monarchy', pop:'medium',
         tags:['champa','vietnam','hindu','my-son','maritime','cham','sea-trade'],
         locationType:'A', locationTheories:[] },
  359: { lang:'burmese', rel:'buddhist', gov:'monarchy', pop:'large',
         tags:['pagan','bagan','myanmar','theravada','temples','mongol','anawrahta'],
         locationType:'A', locationTheories:[] },
  360: { lang:'khmer', rel:'hindu', gov:'monarchy', pop:'medium',
         tags:['funan','mekong','cambodia','indianised','oc-eo','trade','rome'],
         locationType:'A', locationTheories:[] },

  // ── PHASE 5x — ids 361–390 ─────────────────────────────────
  361: { lang:'akkadian', rel:'polytheist', gov:'empire', pop:'large',
         tags:['assyrian','mesopotamia','nineveh','library','deportation','iron','siege'],
         locationType:'A', locationTheories:[] },
  362: { lang:'akkadian', rel:'polytheist', gov:'empire', pop:'large',
         tags:['babylonian','mesopotamia','nebuchadnezzar','hanging-gardens','babylon','exile','cyrus'],
         locationType:'A', locationTheories:[] },
  363: { lang:'sumerian', rel:'polytheist', gov:'city-state', pop:'large',
         tags:['sumer','mesopotamia','cuneiform','gilgamesh','ziggurat','uruk','writing'],
         locationType:'A', locationTheories:[] },
  364: { lang:'egyptian', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['egypt','old-kingdom','pyramid','sphinx','schoch','hancock','giza'],
         locationType:'A', locationTheories:[] },
  365: { lang:'egyptian', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['egypt','new-kingdom','ramesses','tutankhamun','valley-of-kings','sea-peoples','akhenaten'],
         locationType:'A', locationTheories:[] },
  366: { lang:'greek', rel:'polytheist', gov:'monarchy', pop:'large',
         tags:['ptolemaic','egypt','alexandria','library','cleopatra','rosetta-stone','hellenistic'],
         locationType:'A', locationTheories:[] },
  367: { lang:'linear-a', rel:'polytheist', gov:'palace-state', pop:'medium',
         tags:['minoan','linear-a','undeciphered','crete','bronze-age','mystery','aegean'],
         locationType:'B',
         locationTheories:[
           { lat:35.30, lng:25.16, label:'Knossos archive — largest Linear A corpus', source:'Younger & Rehak (2008)', researcher:null, isDefault:true, up:1240, dn:240 },
           { lat:35.05, lng:24.72, label:'Phaistos Disc — related undeciphered Minoan script', source:'Godart, The Phaistos Disc (1995)', researcher:null, up:680, dn:480 },
         ] },
  368: { lang:'hittite', rel:'polytheist', gov:'empire', pop:'large',
         tags:['hittite','anatolia','turkey','kadesh','iron','bronze-age','collapse'],
         locationType:'A', locationTheories:[] },
  369: { lang:'akkadian', rel:'polytheist', gov:'empire', pop:'large',
         tags:['akkadian','sargon','mesopotamia','first-empire','enheduanna','author','bronze-age'],
         locationType:'A', locationTheories:[] },
  370: { lang:'vedic-sanskrit', rel:'hindu', gov:'tribal', pop:'large',
         tags:['rigveda','vedic','india','frawley','kak','astronomy','out-of-india'],
         locationType:'B',
         locationTheories:[
           { lat:29.97, lng:77.55, label:'Upper Gangetic / Sarasvati region — mainstream Vedic homeland', source:'Witzel (2001)', researcher:null, isDefault:true, up:960, dn:440 },
           { lat:27.00, lng:72.00, label:'Ghaggar-Hakra / Sarasvati river — Frawley indigenous homeland thesis', source:'Frawley (1991)', researcher:'David Frawley', up:580, dn:760 },
         ] },
  371: { lang:'unknown', rel:'animist', gov:'unknown', pop:'small',
         tags:['gobekli-tepe','neolithic','pre-pottery','turkey','hunter-gatherer','hancock','pre-flood'],
         locationType:'A', locationTheories:[] },
  372: { lang:'phrygian', rel:'polytheist', gov:'monarchy', pop:'medium',
         tags:['lydia','phrygia','anatolia','midas','cybele','lycian-league','iron-age'],
         locationType:'A', locationTheories:[] },
  373: { lang:'hurrian', rel:'polytheist', gov:'kingdom', pop:'medium',
         tags:['hurrian','mesopotamia','anatolia','music','myth','theogony','kumarbi'],
         locationType:'A', locationTheories:[] },
  374: { lang:'indus', rel:'unknown', gov:'unknown', pop:'large',
         tags:['rakhigarhi','indus','harappan','dna','aryan-migration','india','largest-site'],
         locationType:'A', locationTheories:[] },
  375: { lang:'urartian', rel:'polytheist', gov:'monarchy', pop:'medium',
         tags:['urartu','armenia','van','ararat','noah','assyrian-rival','canal'],
         locationType:'A', locationTheories:[] },
  376: { lang:'kartvelian', rel:'polytheist', gov:'monarchy', pop:'medium',
         tags:['colchis','georgia','black-sea','golden-fleece','jason','wine','argonauts'],
         locationType:'A', locationTheories:[] },
  377: { lang:'sarmatian', rel:'animist', gov:'confederacy', pop:'medium',
         tags:['sarmatian','steppe','amazon','cavalry','iron-age','roman','dna'],
         locationType:'A', locationTheories:[] },
  378: { lang:'dacian', rel:'polytheist', gov:'monarchy', pop:'medium',
         tags:['dacian','romania','trajan','column','gold','transylvania','rome'],
         locationType:'A', locationTheories:[] },
  379: { lang:'etruscan', rel:'polytheist', gov:'city-state', pop:'medium',
         tags:['villanovan','etruscan','italy','iron-age','cremation','pre-roman','lydian-origin'],
         locationType:'A', locationTheories:[] },
  380: { lang:'phoenician', rel:'polytheist', gov:'colony', pop:'medium',
         tags:['phoenician','colonies','gadir','cadiz','tin','atlantic','hanno'],
         locationType:'A', locationTheories:[] },
  381: { lang:'mycenaean-greek', rel:'polytheist', gov:'palace-state', pop:'large',
         tags:['mycenaean','greece','troy','linear-b','cyclopean','bronze-age','collapse'],
         locationType:'A', locationTheories:[] },
  382: { lang:'proto-greek', rel:'polytheist', gov:'tribal', pop:'medium',
         tags:['dark-age','greece','iron','homer','polis','geometric','transition'],
         locationType:'A', locationTheories:[] },
  383: { lang:'ancient-greek', rel:'polytheist', gov:'city-state', pop:'large',
         tags:['classical-greece','athens','philosophy','democracy','socrates','plato','persian-wars'],
         locationType:'A', locationTheories:[] },
  384: { lang:'doric-greek', rel:'polytheist', gov:'oligarchy', pop:'medium',
         tags:['sparta','agoge','thermopylae','helots','warrior','greece','laconia'],
         locationType:'A', locationTheories:[] },
  385: { lang:'minoan', rel:'polytheist', gov:'palace-state', pop:'medium',
         tags:['akrotiri','thera','santorini','eruption','atlantis','exodus','frescoes'],
         locationType:'B',
         locationTheories:[
           { lat:36.35, lng:25.40, label:'Akrotiri, Thera — Bronze Age town preserved under volcanic ash', source:'Marinatos, Excavations at Thera (1967)', researcher:null, isDefault:true, up:1240, dn:320 },
           { lat:36.44, lng:25.43, label:'Thera caldera — epicentre of c.1620 BCE eruption; proposed Atlantis/Exodus connection', source:'Galanopoulos (1969); Pellegrino (1991)', researcher:null, up:780, dn:680 },
         ] },
  386: { lang:'unknown', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['chalcolithic','copper-age','varna','otzi','balkans','gold','transition'],
         locationType:'A', locationTheories:[] },
  387: { lang:'proto-european', rel:'animist', gov:'tribal', pop:'medium',
         tags:['lbk','linear-pottery','neolithic','europe','longhouse','farming','dna'],
         locationType:'A', locationTheories:[] },
  388: { lang:'unknown', rel:'animist', gov:'tribal', pop:'small',
         tags:['mesolithic','hunter-gatherer','europe','star-carr','lepenski-vir','dna','blue-eyes'],
         locationType:'A', locationTheories:[] },
  389: { lang:'unknown', rel:'animist', gov:'tribal', pop:'small',
         tags:['palaeolithic','cave-art','lascaux','chauvet','altamira','shamanism','ice-age'],
         locationType:'C',
         locationTheories:[
           { lat:45.05, lng:  1.08, label:'Lascaux, France — c.17,000 BCE polychrome cave paintings', source:'Leroi-Gourhan, Treasures of Prehistoric Art (1967)', researcher:null, up:1240, dn:200 },
           { lat:43.38, lng:  3.93, label:'Chauvet Cave, France — c.36,000 BCE, oldest known figurative art', source:'Clottes, What is Paleolithic Art? (2016)', researcher:null, up:1480, dn:200 },
           { lat:43.38, lng: -3.65, label:'Altamira, Spain — c.18,500 BCE bison paintings', source:'Leroi-Gourhan (1967)', researcher:null, up:1180, dn:200 },
         ] },
  390: { lang:'unknown', rel:'shamanism', gov:'tribal', pop:'small',
         tags:['denisovan','archaic-human','siberia','dna','giant','collins','ancient-apocalypse'],
         locationType:'C',
         locationTheories:[
           { lat:51.40, lng:84.68, label:'Denisova Cave, Altai Mountains, Siberia — primary find site', source:'Reich et al., Nature (2010)', researcher:null, up:1240, dn:320 },
           { lat: 5.00, lng:125.00, label:'Wallacea / Philippines — highest living Denisovan ancestry in Negritos', source:'Larena et al., Current Biology (2021)', researcher:null, up:880, dn:360 },
         ] },

  // ── PHASE 5y — ids 391–400 ─────────────────────────────────
  391: { lang:'unknown', rel:'animist', gov:'tribal', pop:'medium',
         tags:['neanderthal','archaic-human','europe','burial','art','interbreeding','palaeolithic'],
         locationType:'C',
         locationTheories:[
           { lat:36.50, lng:-4.50, label:'Shanidar Cave, Iraq — Neanderthal burial with possible flowers', source:'Solecki, Shanidar (1971)', researcher:null, up:980, dn:340 },
           { lat:43.38, lng:-3.65, label:'El Castillo, Spain — possible Neanderthal cave art c.65,000 BCE', source:'Pike et al., Science (2012)', researcher:null, up:820, dn:520 },
         ] },
  392: { lang:'unknown', rel:'animist', gov:'unknown', pop:'small',
         tags:['karahan-tepe','tas-tepeler','gobekli-tepe','neolithic','turkey','pre-flood','hancock'],
         locationType:'B',
         locationTheories:[
           { lat:37.11, lng:38.97, label:'Karahan Tepe — sister site to Göbekli Tepe, excavated 2019–present', source:'Karul, excavation reports (2023)', researcher:null, isDefault:true, up:1280, dn:280 },
           { lat:37.22, lng:38.92, label:'Göbekli Tepe main site — T-pillar enclosures A–D', source:'Schmidt (2006)', researcher:null, up:1480, dn:320 },
         ] },
  393: { lang:'unknown', rel:'animist', gov:'egalitarian', pop:'medium',
         tags:['catalhoyuk','anatolia','neolithic','rooftop','burial','bull','town'],
         locationType:'A', locationTheories:[] },
  394: { lang:'proto-semitic', rel:'animist', gov:'chiefdom', pop:'medium',
         tags:['jericho','neolithic','pre-pottery','tower','oldest-city','jordan','levant'],
         locationType:'A', locationTheories:[] },
  395: { lang:'proto-semitic', rel:'animist', gov:'tribal', pop:'small',
         tags:['natufian','ain-ghazal','levant','statues','skulls','plaster','transition'],
         locationType:'A', locationTheories:[] },
  396: { lang:'rapa-nui', rel:'animist', gov:'chiefdom', pop:'small',
         tags:['easter-island','moai','rapa-nui','pacific','heyerdahl','collapse','polynesian'],
         locationType:'A', locationTheories:[] },
  397: { lang:'muskogean', rel:'animist', gov:'chiefdom', pop:'large',
         tags:['cahokia','mounds','illinois','monks-mound','woodhenge','mississippian','largest'],
         locationType:'A', locationTheories:[] },
  398: { lang:'unknown', rel:'unknown', gov:'unknown', pop:'unknown',
         tags:['younger-dryas','ydih','firestone','comet','hancock','carlson','pre-flood'],
         locationType:'C',
         locationTheories:[
           { lat:48.00, lng:-100.00, label:'Laurentide Ice Sheet impact zone — proposed YDIH impact region', source:'Firestone et al., PNAS (2007)', researcher:'Richard Firestone', up:1240, dn:580 },
           { lat:47.50, lng:-117.00, label:'Channeled Scablands, Washington — Missoula Megaflood evidence', source:'Bretz (1923); Carlson, Kosmographia', researcher:'Randall Carlson', up:1180, dn:480 },
         ] },
  399: { lang:'unknown', rel:'unknown', gov:'unknown', pop:'unknown',
         tags:['pre-flood','hancock','carlson','lost-civilisation','ice-age','global','theorized'],
         locationType:'C',
         locationTheories:[
           { lat: 0.00, lng:  0.00, label:'Global — no fixed location; theorized worldwide pre-Flood civilisation', source:'Hancock, Magicians of the Gods (2015)', researcher:'Graham Hancock', up:1480, dn:760 },
           { lat:29.98, lng: 31.13, label:'Giza, Egypt — Sphinx water erosion as evidence of pre-Flood origin', source:'Schoch, Forgotten Civilization (2012)', researcher:'Robert Schoch', up:1120, dn:640 },
         ] },
  400: { lang:'unknown', rel:'unknown', gov:'unknown', pop:'unknown',
         tags:['missoula-megaflood','younger-dryas','carlson','hancock','ice-age','scablands','catastrophism'],
         locationType:'C',
         locationTheories:[
           { lat:47.00, lng:-114.00, label:'Glacial Lake Missoula, Montana — source of megaflood dam failures', source:'Bretz (1923)', researcher:null, up:1380, dn:380 },
           { lat:47.50, lng:-117.00, label:'Channeled Scablands, Washington — carved in days by outburst floods', source:'Baker, Science (1978)', researcher:null, up:1240, dn:320 },
         ] },

};

// ── FILTER OPTION DEFINITIONS ────────────────────────────────
// These power the checkboxes in the filter panel.
// Add new keys here if you add new rel/gov/pop values above.

const FILTER_DEFS = {
  status: {
    label: 'STATUS',
    field: 't',
    options: [
      { key:'confirmed',  label:'Confirmed',  color:'#9a6e08' },
      { key:'theorized',  label:'Theorized',  color:'#6b21a8' },
      { key:'debated',    label:'Debated',    color:'#0c6a69' },
    ]
  },
  era: {
    label: 'ERA / EPOCH',
    field: 'era',   // derived at runtime from start year
    options: [
      { key:'pre-yd',      label:'Pre-Younger Dryas (pre-10800 BCE)' },
      { key:'younger-dryas',label:'Younger Dryas (10800–9700 BCE)'  },
      { key:'neolithic',   label:'Neolithic (9700–3500 BCE)'         },
      { key:'bronze',      label:'Bronze Age (3500–1200 BCE)'  },
      { key:'iron',        label:'Iron Age (1200–500 BCE)'     },
      { key:'classical',   label:'Classical (500 BCE–500 CE)'  },
      { key:'medieval',    label:'Medieval (500–1500 CE)'      },
      { key:'early-mod',   label:'Early Modern (1500–1800)'    },
      { key:'modern',      label:'Modern (1800–present)'       },
    ]
  },
  continent: {
    label: 'REGION',
    field: 'cont',
    options: [
      { key:'africa',     label:'Africa'          },
      { key:'americas',   label:'Americas'        },
      { key:'asia',       label:'Asia & Mid-East' },
      { key:'middle-east',label:'Middle East'     },
      { key:'europe',     label:'Europe'          },
      { key:'pacific',    label:'Pacific'         },
      { key:'oceania',    label:'Oceania'         },
      { key:'atlantic',   label:'Atlantic'        },
      { key:'global',     label:'Global / Unknown'},
    ]
  },
  religion: {
    label: 'RELIGION / BELIEF',
    field: 'rel',
    options: [
      { key:'polytheist',  label:'Polytheistic'   },
      { key:'monotheist',  label:'Monotheistic'   },
      { key:'hindu',       label:'Hindu'           },
      { key:'buddhist',    label:'Buddhist'        },
      { key:'animist',     label:'Animist'         },
      { key:'shamanic',    label:'Shamanic'        },
      { key:'zoroastrian', label:'Zoroastrian'     },
      { key:'theorized',   label:'Theorized/Other' },
      { key:'unknown',     label:'Unknown'         },
    ]
  },
  governance: {
    label: 'GOVERNANCE',
    field: 'gov',
    options: [
      { key:'empire',     label:'Empire'      },
      { key:'kingdom',    label:'Kingdom'     },
      { key:'republic',   label:'Republic'    },
      { key:'city-state', label:'City-State'  },
      { key:'theocracy',  label:'Theocracy'   },
      { key:'tribal',     label:'Tribal / Chiefdom' },
      { key:'federation', label:'Federation'  },
      { key:'unknown',    label:'Unknown'     },
    ]
  },
  language: {
    label: 'LANGUAGE / SCRIPT',
    field: 'lang',
    options: [
      { key:'semitic',       label:'Semitic (Akkadian, Arabic, Hebrew, Phoenician...)' },
      { key:'indo-european', label:'Indo-European (Greek, Latin, Sanskrit, Celtic, Persian...)' },
      { key:'sino-tibetan',  label:'Sino-Tibetan (Chinese, Tibetan...)' },
      { key:'dravidian',     label:'Dravidian (Tamil, Telugu, Kannada...)' },
      { key:'austronesian',  label:'Austronesian (Polynesian, Malay, Cham...)' },
      { key:'niger-congo',   label:'Niger-Congo / Bantu (Swahili, Yoruba, Shona...)' },
      { key:'afroasiatic',   label:"Afroasiatic (Egyptian, Berber, Ge'ez...)" },
      { key:'mesoamerican',  label:'Mesoamerican (Maya, Nahuatl, Zapotec...)' },
      { key:'andean',        label:'Andean (Quechua, Aymara...)' },
      { key:'turkic-mongolic',label:'Turkic & Mongolic' },
      { key:'japonic',       label:'Japonic (Japanese, Ryukyuan)' },
      { key:'austro-asiatic',label:'Austro-Asiatic (Khmer, Mon...)' },
      { key:'isolate',       label:'Linguistic Isolate (Sumerian, Etruscan, Basque...)' },
      { key:'undeciphered',  label:'Undeciphered Script' },
      { key:'reconstructed', label:'Reconstructed / Proto-Language' },
      { key:'multiple',      label:'Multiple / Imperial Polyglot' },
      { key:'unknown',       label:'Unknown / Oral Only' },
    ]
  },
  population: {
    label: 'PEAK POPULATION',
    field: 'pop',
    options: [
      { key:'tiny',    label:'Tiny   (< 10k)'    },
      { key:'small',   label:'Small  (10k–100k)' },
      { key:'medium',  label:'Medium (100k–1M)'  },
      { key:'large',   label:'Large  (1M–10M)'   },
      { key:'massive', label:'Massive (10M+)'    },
      { key:'unknown', label:'Unknown'           },
    ]
  },
};

// ── ERA DERIVATION ────────────────────────────────────────────
// Assigns an 'era' key to each civilization based on its start year.
function deriveEra(startYear) {
  if (startYear < -10800)  return 'pre-yd';
  if (startYear < -9700)   return 'younger-dryas';
  if (startYear < -3500)   return 'neolithic';
  if (startYear < -1200)   return 'bronze';
  if (startYear < -500)    return 'iron';
  if (startYear < 500)     return 'classical';
  if (startYear < 1500)    return 'medieval';
  if (startYear < 1800)    return 'early-mod';
  return 'modern';
}

// ── MERGE INTO CIVS ────────────────────────────────────────────
// Runs once on load. Merges CIV_META + era into each CIVS record.
(function mergeMeta() {
  CIVS.forEach(c => {
    const ext = CIV_META[c.id] || {,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5z — APPEND TO data-extended.js
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local data-extended.js
//   2. Find the very last  };  closing the CIV_META object
//   3. Replace that  };  with a comma, then paste ALL lines below it
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5z — data-extended.js entries (ids 401–430) ──────────────────────
// Append to CIV_META object in data-extended.js

  401: { locationType:"A", tags:["nubian","kerma","nile","burial","tumuli","africa-east","egypt-contemporary"] },
  402: { locationType:"A", tags:["phrygian","anatolia","midas","cybele","mystery-cult","bronze-age-collapse"] },
  403: { locationType:"A", tags:["lydian","anatolia","coinage","croesus","herodotus","persian-conquest","trade"] },
  404: { locationType:"A", tags:["khazar","turkic","judaism","steppe","silk-road","byzantine","conversion"] },
  405: { locationType:"B", tags:["tocharian","indo-european","silk-road","tarim-basin","mummies","buddhism","central-asia"],
    locationTheories:[
      { lat:41.1, lng:85.2, label:"Tarim Basin oasis towns (mainstream)", source:"Mallory & Mair — The Tarim Mummies (2000)", researcher:null, up:1203, dn:102 },
      { lat:39.5, lng:75.0, label:"Kashgar / western Tarim edge", source:"Hansen — The Silk Road (2012)", researcher:null, up:654, dn:88 }
    ]},
  406: { locationType:"A", tags:["sogdian","silk-road","merchants","transoxiana","zoroastrian","buddhist","manichaean","trade-network"] },
  407: { locationType:"A", tags:["mississippian","moundville","alabama","southeast","ceremonial-complex","mounds"] },
  408: { locationType:"B", tags:["hopewell","ohio","illinois","earthworks","trade-network","burial-mounds","eastern-woodlands"],
    locationTheories:[
      { lat:39.5, lng:-83.0, label:"Ohio Hopewell heartland (mainstream)", source:"Pacheco — A View from the Core (1996)", researcher:null, up:987, dn:54 },
      { lat:41.8, lng:-88.5, label:"Illinois Havana Hopewell", source:"Struever — Hopewell Interaction Sphere (1964)", researcher:null, up:654, dn:88 }
    ]},
  409: { locationType:"A", tags:["poverty-point","louisiana","hunter-gatherer","earthworks","trade","pre-agricultural","north-america"] },
  410: { locationType:"A", tags:["tiwanaku","bolivia","altiplano","lake-titicaca","raised-fields","staff-god","posnansky","andean"] },
  411: { locationType:"A", tags:["chimu","peru","chan-chan","coastal","gold","irrigation","pre-inca","andean"] },
  412: { locationType:"A", tags:["spiro","oklahoma","mississippian","ceremonial-complex","looting","southern-plains","caddoan"] },
  413: { locationType:"A", tags:["zapotec","oaxaca","monte-alban","mesoamerica","writing","calendar","astronomy"] },
  414: { locationType:"A", tags:["mixtec","oaxaca","codex","goldwork","mesoamerica","eight-deer","manuscript"] },
  415: { locationType:"B", tags:["dmt","ethiopia","eritrea","pre-aksumite","south-arabian","yeha","africa-horn"],
    locationTheories:[
      { lat:14.5, lng:39.0, label:"Yeha / northern Ethiopian Highlands (mainstream)", source:"Phillipson — Ancient Ethiopia (1998)", researcher:null, up:876, dn:124 },
      { lat:15.3, lng:38.6, label:"Eritrean coastal zone", source:"Schmidt et al. — The Ancient Red Sea (2008)", researcher:null, up:432, dn:203 }
    ]},
  416: { locationType:"A", tags:["garamantes","sahara","libya","foggaras","trans-saharan","roman","hydraulic","africa-north"] },
  417: { locationType:"A", tags:["nok","nigeria","terracotta","iron-smelting","africa-west","sculpture","ancient"] },
  418: { locationType:"A", tags:["swahili","east-africa","indian-ocean","kilwa","trade","zheng-he","ibn-battuta","coastal"] },
  419: { locationType:"A", tags:["great-zimbabwe","shona","gold-trade","dry-stone","africa-south","colonial-denial","monomutapa"] },
  420: { locationType:"C", tags:["hyperborea","greek-mythology","north","pre-yd","apollo","hapgood","pre-flood","theorized"],
    locationTheories:[
      { lat:71.0, lng:30.0, label:"Northern Scandinavia / Arctic (Hapgood variant)", source:"Hapgood — Earth's Shifting Crust (1958)", researcher:"Charles Hapgood", up:432, dn:876 },
      { lat:60.0, lng:30.0, label:"Baltic region (Hecataeus tradition)", source:"Hecataeus of Abdera — On the Hyperboreans (c.300 BCE)", researcher:null, up:654, dn:543 },
      { lat:90.0, lng:0.0, label:"North Pole / pre-displacement Arctic (alt)", source:"Flem-Ath — When the Sky Fell (1995)", researcher:"Rand Flem-Ath", up:321, dn:1203 }
    ]},
  421: { locationType:"B", tags:["tartaria","vinca","danube-script","proto-writing","romania","old-european","prehistoric-europe","gimbutas"],
    locationTheories:[
      { lat:45.9, lng:23.5, label:"Tartaria, Transylvania, Romania (tablet findspot)", source:"Vlassa — Chronology of Tărtăria (1963)", researcher:null, up:987, dn:312 },
      { lat:44.5, lng:21.0, label:"Vinča, Serbia — broader script distribution", source:"Haarmann — Roots of Ancient Greek Civilisation (2014)", researcher:null, up:765, dn:432 }
    ]},
  422: { locationType:"C", tags:["mu","lemuria","lost-continent","pacific","blavatsky","churchward","sundaland","theorized","oceania"],
    locationTheories:[
      { lat:-15.0, lng:170.0, label:"Central Pacific (Churchward / Mu)", source:"Churchward — The Lost Continent of Mu (1926)", researcher:null, up:432, dn:1543 },
      { lat:5.0, lng:110.0, label:"Sundaland / South China Sea (Oppenheimer variant)", source:"Oppenheimer — Eden in the East (1998)", researcher:"Stephen Oppenheimer", up:876, dn:654 },
      { lat:-20.0, lng:65.0, label:"Indian Ocean (Sclater geological Lemuria)", source:"Sclater — The Mammals of Madagascar (1864)", researcher:null, up:321, dn:987 }
    ]},
  423: { locationType:"C", tags:["vedic","satya-yuga","golden-age","hindu-cosmology","yuga","frawley","de-santillana","precession","theorized"],
    locationTheories:[
      { lat:25.0, lng:80.0, label:"Indian subcontinent — Vedic heartland", source:"Frawley — Gods, Sages and Kings (1991)", researcher:"David Frawley", up:765, dn:432 },
      { lat:35.0, lng:65.0, label:"Central Asian steppe — proto-Indo-European origin", source:"Reich — Who We Are and How We Got Here (2018)", researcher:null, up:543, dn:321 }
    ]},
  424: { locationType:"B", tags:["polynesian","pacific","navigation","wayfinding","maritime","heyerdahl","colonisation","oceania"],
    locationTheories:[
      { lat:-15.0, lng:-170.0, label:"Western Polynesia homeland (mainstream — Samoa/Tonga)", source:"Bellwood — The Prehistory of the Indo-Malaysian Archipelago (1985)", researcher:null, up:1432, dn:203 },
      { lat:-12.0, lng:-77.0, label:"South American contact (Heyerdahl / genetic evidence)", source:"Heyerdahl — American Indians in the Pacific (1952)", researcher:"Thor Heyerdahl", up:876, dn:543 }
    ]},
  425: { locationType:"A", tags:["chamorro","mariana-islands","latte-stone","micronesia","pacific","colonial-depopulation","oceania"] },
  426: { locationType:"A", tags:["mississippian","angel-mounds","indiana","ohio-valley","climate","medieval-warm-period","palisade"] },
  427: { locationType:"A", tags:["wari","peru","highland","andean","empire","roads","storage","pre-inca","staff-god"] },
  428: { locationType:"A", tags:["ancestral-puebloan","chaco-canyon","new-mexico","great-house","roads","astronomy","drought","southwest"] },
  429: { locationType:"A", tags:["mississippian","etowah","georgia","ceremonial-complex","copper","marble","southeast","mounds"] },
  430: { locationType:"A", tags:["dorset","pre-dorset","arctic","paleo-eskimo","tunit","inuit","canada","greenland","ancient-dna"] },
  // END PHASE 5z
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5aa — APPEND TO extended.js
// Civilizations 431–460
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local extended.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below it
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5aa — data-extended.js entries (ids 431–460) ─────────────────────

  431: { locationType:"A", tags:["timurid","samarkand","central-asia","tamerlane","islamic","astronomy","ulugh-beg"] },
  432: { locationType:"A", tags:["majapahit","java","southeast-asia","maritime","hindu-buddhist","gajah-mada","indonesia"] },
  433: { locationType:"A", tags:["khmer","angkor","cambodia","hydraulic","southeast-asia","lidar","urban","collapse"] },
  434: { locationType:"A", tags:["srivijaya","sumatra","maritime","strait-of-malacca","buddhist","trade","thalassocracy"] },
  435: { locationType:"A", tags:["vijayanagara","hampi","south-india","hindu","dravidian","deccan","talikota","temple"] },
  436: { locationType:"A", tags:["cahokia","monks-mound","illinois","mississippian","earthwork","woodhenge","astronomy","pauketat"] },
  437: { locationType:"A", tags:["toltec","tula","mesoamerica","nahuatl","feathered-serpent","chichen-itza","aztec-precursor"] },
  438: { locationType:"A", tags:["mississippian","kincaid","illinois","ohio-valley","trade-node","platform-mound"] },
  439: { locationType:"A", tags:["aksum","ethiopia","eritrea","red-sea","christianity","obelisk","ark-of-covenant","coinage"] },
  440: { locationType:"A", tags:["dahomey","benin","west-africa","agojie","female-warriors","slave-trade","fon"] },
  441: { locationType:"A", tags:["kongo","angola","drc","central-africa","christianity","portuguese","diplomacy","nzimbu"] },
  442: { locationType:"A", tags:["mississippian","lake-jackson","florida","apalachee","ceremonial-complex","copper","southeast"] },
  443: { locationType:"A", tags:["mississippian","ocmulgee","georgia","earth-lodge","creek","muscogee","southeast","long-occupation"] },
  444: { locationType:"A", tags:["etruscan","italy","rome-precursor","haruspicy","toga","fasces","linguistic-isolate","women"] },
  445: { locationType:"A", tags:["minoan","crete","neopalatial","knossos","bull-leaping","linear-a","thera","atlantis"] },
  446: { locationType:"A", tags:["scythian","pazyryk","altai","frozen-tombs","tattoo","silk-road","ice-maiden","steppe"] },
  447: { locationType:"B", tags:["harappan","late-phase","post-urban","ghaggar-hakra","vedic","collapse","indus","sarasvati"],
    locationTheories:[
      { lat:29.5, lng:72.0, label:"Ghaggar-Hakra / Sarasvati basin (mainstream)", source:"Possehl — The Indus Civilisation (2002)", researcher:null, up:987, dn:312 },
      { lat:25.3, lng:68.4, label:"Sindh dispersal zone", source:"Wright — The Ancient Indus (2010)", researcher:null, up:543, dn:198 }
    ]},
  448: { locationType:"B", tags:["linear-a","minoan-script","undeciphered","crete","bronze-age","ventris","aegean","isolate"],
    locationTheories:[
      { lat:35.3, lng:25.1, label:"Knossos palace — primary Linear A archive", source:"Hooker — Linear B (1980)", researcher:null, up:1203, dn:87 },
      { lat:35.0, lng:24.8, label:"Phaistos disc / Phaistos palace", source:"Duhoux & Morpurgo Davies — A Companion to Linear B (2008)", researcher:null, up:765, dn:198 }
    ]},
  449: { locationType:"B", tags:["dilmun","bahrain","persian-gulf","sumerian","paradise","flood-myth","trade","enki","pre-flood"],
    locationTheories:[
      { lat:26.0, lng:50.5, label:"Bahrain island (mainstream consensus)", source:"Crawford — Dilmun and its Gulf Neighbours (1998)", researcher:null, up:1654, dn:203 },
      { lat:26.5, lng:50.0, label:"Persian Gulf basin pre-8000 BCE (Rose hypothesis)", source:"Rose — New Light on Human Prehistory (2010)", researcher:null, up:876, dn:543 }
    ]},
  450: { locationType:"B", tags:["jiroft","iran","chlorite","aratta","proto-elamite","undeciphered","looting","majidzadeh"],
    locationTheories:[
      { lat:28.7, lng:57.7, label:"Halil River basin, Kerman, Iran (excavation site)", source:"Majidzadeh — Iran vol.41 (2003)", researcher:"Yousef Majidzadeh", up:1102, dn:312 },
      { lat:30.0, lng:57.0, label:"Extended Kerman plateau zone", source:"Pittman — Mesopotamia and Iran (2001)", researcher:null, up:543, dn:198 }
    ]},
  451: { locationType:"A", tags:["mississippian","town-creek","north-carolina","southeast","frontier","platform-mound"] },
  452: { locationType:"A", tags:["mycenaean","greece","linear-b","ventris","bronze-age-collapse","troy","sea-peoples","dark-age"] },
  453: { locationType:"B", tags:["gobekli-tepe","karahan-tepe","tas-tepeler","turkey","ppna","hunter-gatherer","collins","cygnus","pre-yd"],
    locationTheories:[
      { lat:37.2, lng:38.9, label:"Göbekli Tepe, Şanlıurfa (primary site)", source:"Schmidt — Sie Bauten die Ersten Tempel (2006)", researcher:null, up:2341, dn:198 },
      { lat:37.1, lng:39.6, label:"Karahan Tepe (emerging major site)", source:"Çelik — Karahan Tepe (2020)", researcher:null, up:1876, dn:234 },
      { lat:37.3, lng:39.2, label:"Taş Tepeler broader network", source:"Collins — Göbekli Tepe: Genesis of the Gods (2014)", researcher:"Andrew Collins", up:1432, dn:312 }
    ]},
  454: { locationType:"A", tags:["harappan","rakhigarhi","indus","largest-site","sarasvati","dna-controversy","aryan","haryana"] },
  455: { locationType:"A", tags:["mississippian","shiloh","tennessee","civil-war","layered-landscape","platform-mound","southeast"] },
  456: { locationType:"A", tags:["urartu","van","armenia","turkey","assyria","metalwork","ararat","noah","cuneiform","iron-age"] },
  457: { locationType:"A", tags:["mississippian","moundville","phase-ii","mortuary","ceremonial","depopulation","alabama","transformation"] },
  458: { locationType:"B", tags:["tartessos","iberia","andalusia","undeciphered","pillars-of-hercules","atlantis","freund","frau","silver"],
    locationTheories:[
      { lat:37.0, lng:-6.3, label:"Doñana marshes, Andalusia (Freund / Atlantis thesis)", source:"Freund — Atlantis Survey (2011)", researcher:"Richard Freund", up:876, dn:1102 },
      { lat:37.5, lng:-6.0, label:"Huelva / Tartessian heartland (mainstream)", source:"Cunliffe — Facing the Ocean (2001)", researcher:null, up:1203, dn:312 },
      { lat:40.0, lng:9.0, label:"Sardinia (Frau / Pillars at Sicily thesis)", source:"Frau — Le Colonne d'Ercole (2002)", researcher:"Sergio Frau", up:543, dn:987 }
    ]},
  459: { locationType:"C", tags:["ancient-astronaut","von-daniken","sitchin","extraterrestrial","anunnaki","nazca","theorized","alt"],
    locationTheories:[
      { lat:29.9, lng:31.1, label:"Giza — primary physical focus of AAH claims", source:"Von Däniken — Chariots of the Gods (1968)", researcher:"Erich von Däniken", up:1654, dn:4321 },
      { lat:-14.7, lng:-75.1, label:"Nazca Lines, Peru", source:"Von Däniken — Chariots of the Gods (1968)", researcher:"Erich von Däniken", up:1203, dn:3201 },
      { lat:-16.6, lng:-68.7, label:"Puma Punku / Tiwanaku, Bolivia", source:"Childress — Technology of the Gods (2000)", researcher:null, up:1432, dn:2876 }
    ]},
  460: { locationType:"C", tags:["younger-dryas","megaflood","missoula","carlson","hancock","pre-flood","channeled-scablands","catastrophe","theorized"],
    locationTheories:[
      { lat:47.5, lng:-119.5, label:"Channeled Scablands, Washington State", source:"Carlson — Kosmographia podcast; Bretz — J.Geology (1923)", researcher:"Randall Carlson", up:2341, dn:654 },
      { lat:50.0, lng:-95.0, label:"Lake Agassiz outburst zone, Manitoba", source:"Teller et al. — Quaternary Science Reviews (2002)", researcher:null, up:1654, dn:432 },
      { lat:26.0, lng:-90.0, label:"Gulf of Mexico flood pulse zone", source:"Fairbanks — Nature (1989)", researcher:null, up:1102, dn:543 }
    ]},
  // END PHASE 5aa
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ab — APPEND TO extended.js
// Civilizations 461–490
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local extended.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ab — data-extended.js entries (ids 461–490) ─────────────────────

  461: { locationType:"A", tags:["mississippian","winterville","mississippi","lower-valley","mounds","platform"] },
  462: { locationType:"A", tags:["taino","caribbean","arawak","columbus","contact","depopulation","cassava","zemis"] },
  463: { locationType:"A", tags:["mississippian","parkin","arkansas","de-soto","casqui","historic-contact","chiefdom"] },
  464: { locationType:"A", tags:["mapungubwe","south-africa","limpopo","gold","rhino","zimbabwe-precursor","hilltop","africa-south"] },
  465: { locationType:"A", tags:["mississippian","carson-mounds","yazoo-basin","mississippi","lower-valley","mounds"] },
  466: { locationType:"A", tags:["mississippian","bottle-creek","alabama","delta","coastal","island-site","gulf-coast"] },
  467: { locationType:"B", tags:["queen-of-sheba","makeda","bilqis","solomon","ark-of-covenant","ethiopia","sheba","kebra-nagast","theorized"],
    locationTheories:[
      { lat:15.2, lng:38.9, label:"Aksum / Ethiopian Highlands (Ethiopian tradition)", source:"Kebra Nagast (14th century CE)", researcher:null, up:1432, dn:654 },
      { lat:15.0, lng:44.0, label:"Marib, Saba / Sheba, Yemen (mainstream)", source:"Kitchen — Documentation for Ancient Arabia (1994)", researcher:null, up:1876, dn:432 },
      { lat:31.8, lng:35.2, label:"Jerusalem — site of Solomonic meeting", source:"1 Kings 10 (Hebrew Bible)", researcher:null, up:987, dn:543 }
    ]},
  468: { locationType:"A", tags:["mississippian","anna-mounds","natchez","mississippi","great-sun","mortuary","historic-contact"] },
  469: { locationType:"A", tags:["iceland","althing","commonwealth","norse","stateless","sagas","leif-eriksson","parliament","medieval"] },
  470: { locationType:"A", tags:["mississippian","plaquemine","natchez","lower-mississippi","historic-contact","great-sun","french-colonial"] },
  471: { locationType:"A", tags:["mississippian","irene","savannah","georgia","guale","coastal","spanish-mission","southeast"] },
  472: { locationType:"A", tags:["harappan","lothal","gujarat","dockyard","maritime","trade","bead-industry","indus"] },
  473: { locationType:"A", tags:["harappan","dholavira","kutch","water-management","reservoirs","inscription","unesco","indus"] },
  474: { locationType:"A", tags:["mississippian","moundville","phase-iii","creek","muscogee","remnant","alabama","historic-transition"] },
  475: { locationType:"A", tags:["scythian","pontic-steppe","ukraine","kurgan","gold","pectoral","nomadic","war-2022"] },
  476: { locationType:"A", tags:["minoan","pre-palatial","crete","early-bronze-age","aegean","palace-origins","cycladic"] },
  477: { locationType:"A", tags:["mississippian","aztalan","wisconsin","northernmost","frontier","stockade","great-lakes","cahokia"] },
  478: { locationType:"B", tags:["luwian","anatolia","bronze-age-collapse","sea-peoples","hittite","hieroglyphic","zangger","debated"],
    locationTheories:[
      { lat:37.0, lng:35.0, label:"Southern Anatolia / Cilicia (mainstream Luwian heartland)", source:"Melchert — The Luwians (2003)", researcher:null, up:1102, dn:312 },
      { lat:38.5, lng:27.5, label:"Western Anatolia (Zangger Sea Peoples thesis)", source:"Zangger — The Luwian Civilisation (2016)", researcher:null, up:765, dn:876 }
    ]},
  479: { locationType:"A", tags:["meroitic","sudan","kush","iron","script","undeciphered","pyramids","nile","africa-east"] },
  480: { locationType:"A", tags:["mississippian","medoc-mountain","north-carolina","piedmont","pee-dee","catawba","appalachian","frontier"] },
  481: { locationType:"A", tags:["canaanite","levant","alphabet","ugarit","phoenician","writing","bronze-age","semitic","foundational"] },
  482: { locationType:"A", tags:["mississippian","deep-bottom","virginia","roanoke","appalachian","frontier","siouan","northeast-limit"] },
  483: { locationType:"A", tags:["mississippian","moundville-outliers","black-warrior","hierarchy","chiefdom","redistribution","alabama"] },
  484: { locationType:"A", tags:["chumash","california","maritime","tomol","canoe","channel-islands","shell-money","rock-art","shamanic"] },
  485: { locationType:"A", tags:["casas-grandes","paquime","chihuahua","mogollon","macaws","mesoamerica","southwest","adobe","ballcourt"] },
  486: { locationType:"A", tags:["hohokam","arizona","sonoran","canals","irrigation","desert","phoenix","oodham","collapse"] },
  487: { locationType:"A", tags:["mesa-verde","colorado","cliff-dwellings","ancestral-puebloan","drought","migration","pueblo","cliff-palace"] },
  488: { locationType:"A", tags:["fremont","utah","great-basin","rock-art","figurines","hunter-gatherer","agriculture","southwest"] },
  489: { locationType:"A", tags:["poverty-point","archaic","watson-brake","louisiana","mississippi","pre-poverty-point","mounds","oldest"] },
  490: { locationType:"C", tags:["denisovan","southeast-asia","melanesia","australia","ancient-dna","collins","gobekli","archaic-human","theorized"],
    locationTheories:[
      { lat:51.5, lng:84.7, label:"Denisova Cave, Altai, Russia (discovery site)", source:"Reich et al. — Nature (2010)", researcher:null, up:2341, dn:198 },
      { lat:-5.0, lng:140.0, label:"Melanesia / Papua (highest modern Denisovan ancestry)", source:"Reich et al. — Nature (2010)", researcher:null, up:1876, dn:312 },
      { lat:12.0, lng:122.0, label:"Philippines (highest island Southeast Asia Denisovan ancestry)", source:"Larena et al. — Current Biology (2021)", researcher:null, up:1543, dn:432 }
    ]},
  // END PHASE 5ab
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ac — APPEND TO extended.js
// Civilizations 491–520
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local extended.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ac — data-extended.js entries (ids 491–520) ─────────────────────

  491: { locationType:"A", tags:["mississippian","shiloh","tennessee-valley","phase-ii","exchange","appalachian","hinterland"] },
  492: { locationType:"A", tags:["solutrean","europe","palaeolithic","flint-knapping","stanford-bradley","atlantic-crossing","glacial-max"] },
  493: { locationType:"B", tags:["bell-beaker","europe","bronze-age","dna","stonehenge","amesbury-archer","steppe","celtic-origin"],
    locationTheories:[
      { lat:51.2, lng:-1.8, label:"Stonehenge / Wessex, Britain (British Beaker florescence)", source:"Olalde et al. — Nature (2018)", researcher:null, up:1654, dn:198 },
      { lat:50.0, lng:8.0, label:"Rhine / Central European origin zone", source:"Haak et al. — Nature (2015)", researcher:null, up:1203, dn:234 }
    ]},
  494: { locationType:"A", tags:["corded-ware","europe","yamnaya","steppe","indo-european","bronze-age","replacement","sintashta"] },
  495: { locationType:"A", tags:["lbk","linear-pottery","europe","neolithic","farming","longhouse","loess","talheim","massacre"] },
  496: { locationType:"A", tags:["funnel-beaker","trb","northern-europe","megalith","dolmen","passage-grave","lactase","scandinavia"] },
  497: { locationType:"A", tags:["bell-beaker","britain","ireland","stonehenge","amesbury-archer","bronze-age","dna","steppe"] },
  498: { locationType:"A", tags:["catalhoyuk","turkey","neolithic","egalitarian","hodder","wall-paintings","burial","urban-scale"] },
  499: { locationType:"A", tags:["uruk","mesopotamia","globalisation","proto-cuneiform","writing","trade-colonies","collapse","sumerian"] },
  500: { locationType:"C", tags:["proto-indo-european","pie-homeland","yamnaya","gimbutas","renfrew","steppe","debated","linguistics"],
    locationTheories:[
      { lat:48.0, lng:37.0, label:"Pontic-Caspian steppe (Gimbutas / mainstream DNA)", source:"Anthony — The Horse, the Wheel and Language (2007)", researcher:null, up:3201, dn:432 },
      { lat:39.0, lng:33.0, label:"Anatolia (Renfrew hypothesis)", source:"Renfrew — Archaeology and Language (1987)", researcher:null, up:876, dn:1543 },
      { lat:40.0, lng:44.0, label:"Armenian Highland / South Caucasus (minority)", source:"Gamkrelidze & Ivanov — Indo-European Language (1994)", researcher:null, up:543, dn:987 }
    ]},
  501: { locationType:"A", tags:["mississippian","moundville","hinterland","black-warrior","chiefdom","survey","economy","alabama"] },
  502: { locationType:"A", tags:["yamnaya","afanasievo","altai","siberia","tocharian","steppe","bronze-age","dna","central-asia"] },
  503: { locationType:"A", tags:["andronovo","steppe","indo-iranian","vedic","avestan","sintashta","chariot","bronze-age","central-asia"] },
  504: { locationType:"A", tags:["harappan","mohenjo-daro","indus","great-bath","grid-plan","drainage","collapse","pakistan"] },
  505: { locationType:"A", tags:["harappan","harappa","indus","script","granary","ravi-phase","railway-destruction","pakistan"] },
  506: { locationType:"A", tags:["etruscan","villanovan","italy","iron-age","cremation","dna-2023","origins","anatolian-debate"] },
  507: { locationType:"A", tags:["thracian","balkans","odrysian","gold","silver","dionysus","orpheus","spartacus","bulgaria"] },
  508: { locationType:"A", tags:["illyrian","balkans","albania","teuta","roman-conquest","indo-european","adriatic","linguistic-isolate"] },
  509: { locationType:"A", tags:["celtic","la-tene","iron-age","europe","druids","oppida","gaul","caesar","art","expansion"] },
  510: { locationType:"A", tags:["mississippian","summerville","tombigbee","alabama","regional-variant","choctaw","alabama-nation"] },
  511: { locationType:"A", tags:["mississippian","dallas-phase","tennessee","hiwassee","de-soto","cherokee","appalachian","southeast"] },
  512: { locationType:"A", tags:["adena","ohio","woodland","mounds","serpent-mound","hopewell-precursor","eastern-woodlands","copper"] },
  513: { locationType:"A", tags:["choctaw","mississippian","nanih-waiya","mississippi","matrilineal","trail-of-tears","removal","southeast"] },
  514: { locationType:"A", tags:["muscogee","creek","confederacy","georgia","alabama","potlatch","green-corn","removal","southeast"] },
  515: { locationType:"A", tags:["haida","northwest-coast","totem-poles","maritime","smallpox","potlatch","matrilineal","pacific","canoe"] },
  516: { locationType:"A", tags:["tlingit","alaska","northwest-coast","maritime","raven","potlatch","warfare","russian-contact","pacific"] },
  517: { locationType:"A", tags:["olmec","san-lorenzo","veracruz","colossal-heads","van-sertima","mesoamerica","mother-culture"] },
  518: { locationType:"A", tags:["olmec","la-venta","veracruz","pyramid","jade","jaguar","mesoamerica","calendar","mother-culture"] },
  519: { locationType:"A", tags:["chichimec","northern-mexico","hunter-gatherer","colonial-resistance","chichimec-war","uto-aztecan","nomadic"] },
  520: { locationType:"A", tags:["mississippian","hiwassee-island","dallas-phase","tennessee","tva","cherokee","stratigraphy","southeast"] },
  // END PHASE 5ac
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ad — APPEND TO extended.js
// Civilizations 521–550
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local extended.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ad — data-extended.js entries (ids 521–550) ─────────────────────

  521: { locationType:"A", tags:["mississippian","moundville","phase-i","founding","black-warrior","pauketat","alabama","emergence"] },
  522: { locationType:"A", tags:["sican","lambayeque","peru","gold","naymlap","batan-grande","chimu-precursor","andean","tumi"] },
  523: { locationType:"A", tags:["moche","peru","ceramic","portrait-vessel","sacrifice","huaca-del-sol","andean","naturalism"] },
  524: { locationType:"B", tags:["nazca","peru","geoglyphs","nazca-lines","von-daniken","water-ritual","desert","andean"],
    locationTheories:[
      { lat:-14.7, lng:-75.1, label:"Nazca Lines / Pampa Colorada (mainstream)", source:"Reinhard — The Nazca Lines (1988)", researcher:null, up:2341, dn:312 },
      { lat:-14.7, lng:-75.1, label:"Nazca Lines as alien landing strips (Von Däniken)", source:"Von Däniken — Chariots of the Gods (1968)", researcher:"Erich von Däniken", up:987, dn:3201 }
    ]},
  525: { locationType:"B", tags:["tiwanaku","posnansky","astronomy","alignment","15000bce","debated","bolivia","alternative-dating"],
    locationTheories:[
      { lat:-16.5, lng:-68.7, label:"Tiwanaku / Kalasasaya (mainstream 500–900 CE)", source:"Kolata — The Tiwanaku (1993)", researcher:null, up:2341, dn:432 },
      { lat:-16.5, lng:-68.7, label:"Tiwanaku astronomical alignment ~15,000 BCE (Posnansky)", source:"Posnansky — Tiahuanacu (1945)", researcher:"Arthur Posnansky", up:543, dn:1876 }
    ]},
  526: { locationType:"A", tags:["mississippian","florence-mound","alabama","tennessee-valley","minor-centre","community-level"] },
  527: { locationType:"B", tags:["paracas","peru","mummies","textiles","cranial-modification","foerster","andean","coastal"],
    locationTheories:[
      { lat:-13.8, lng:-76.3, label:"Paracas Peninsula, Ica, Peru (mainstream)", source:"Tello — Paracas (1959)", researcher:null, up:1876, dn:198 },
      { lat:-13.8, lng:-76.3, label:"Paracas elongated skulls — distinct population (Foerster)", source:"Foerster — Elongated Skulls of Peru (2015)", researcher:"Brien Foerster", up:654, dn:1543 }
    ]},
  528: { locationType:"A", tags:["chavin","peru","highland","pilgrimage","acoustics","psychedelic","staff-god","andean","horizon"] },
  529: { locationType:"A", tags:["recuay","peru","highland","ceramic","sculpture","kaolin","chullpa","andean","moche-interaction"] },
  530: { locationType:"B", tags:["valdivia","ecuador","ceramics","oldest-americas","jomon","meggers","transpacific","figurines"],
    locationTheories:[
      { lat:-1.8, lng:-80.7, label:"Coastal Ecuador — Valdivia heartland (mainstream)", source:"Meggers et al. — Early Formative Period (1965)", researcher:null, up:1543, dn:198 },
      { lat:-1.8, lng:-80.7, label:"Transpacific Jōmon diffusion hypothesis (Meggers)", source:"Meggers — Jōmon-Valdivia Similarities (1965)", researcher:null, up:432, dn:987 }
    ]},
  531: { locationType:"A", tags:["norte-chico","caral","peru","satellite-sites","peaceful","anchoveta","platform-mounds","oldest-americas"] },
  532: { locationType:"B", tags:["pumapunku","tiwanaku","bolivia","precision-stonework","foerster","alternative","machining","debated"],
    locationTheories:[
      { lat:-16.5, lng:-68.7, label:"Pumapunku, Tiwanaku, Bolivia (confirmed location)", source:"Kolata — The Tiwanaku (1993)", researcher:null, up:2103, dn:312 },
      { lat:-16.5, lng:-68.7, label:"Pre-Tiwanaku advanced culture (alternative dating)", source:"Foerster — Advanced Ancient Civilizations (2014)", researcher:"Brien Foerster", up:765, dn:1543 }
    ]},
  533: { locationType:"A", tags:["natchez","mississippian","fatherland","great-sun","sacred-fire","french-colonial","destroyed-1731","theocracy"] },
  534: { locationType:"A", tags:["natchez","grand-village","mississippi","du-pratz","ethnographic","great-sun","historic","french"] },
  535: { locationType:"A", tags:["cahuilla","california","desert","hunter-gatherer","acorn","bird-songs","oral-tradition","uto-aztecan"] },
  536: { locationType:"B", tags:["chaco","roads","ancestral-puebloan","astronomy","sofaer","cosmology","straight-roads","debated","new-mexico"],
    locationTheories:[
      { lat:36.1, lng:-107.9, label:"Chaco Canyon road network hub (mainstream)", source:"Roney — Prehistoric Roads at Chaco (1992)", researcher:null, up:1654, dn:312 },
      { lat:36.1, lng:-107.9, label:"Chaco roads — astronomical/cosmological alignments (Sofaer)", source:"Sofaer — The Primary Architecture of the Chacoan Culture (1997)", researcher:null, up:1102, dn:543 }
    ]},
  537: { locationType:"A", tags:["hohokam","snaketown","gila-river","arizona","haury","oodham","ball-court","canal","type-site"] },
  538: { locationType:"A", tags:["ancestral-puebloan","pueblo-bonito","chaco","great-house","cacao","turquoise","masonry","multi-storey"] },
  539: { locationType:"A", tags:["watson-brake","louisiana","oldest-mounds","archaic","hunter-gatherer","3500bce","north-america","poverty-point-precursor"] },
  540: { locationType:"A", tags:["toltec-mounds","arkansas","plum-bayou","woodland-mississippian","transitional","lower-mississippi","mounds"] },
  541: { locationType:"A", tags:["mississippian","winterville","phase-ii","yazoo-basin","mississippi","mature","ceremonial-complex"] },
  542: { locationType:"B", tags:["clovis","paleo-indian","megafauna","extinction","ydih","fluted-points","americas","overkill"],
    locationTheories:[
      { lat:33.5, lng:-103.8, label:"Blackwater Draw, New Mexico — Clovis type site", source:"Hurst & Sellards — Blackwater Draw (1943)", researcher:null, up:2103, dn:198 },
      { lat:37.0, lng:-105.0, label:"Southern Rocky Mountain dispersal zone", source:"Waters & Stafford — Science (2007)", researcher:null, up:1432, dn:312 }
    ]},
  543: { locationType:"B", tags:["pre-clovis","monte-verde","chiquihuite","paleo-indian","coastal-migration","hancock","americas","deep-prehistory"],
    locationTheories:[
      { lat:-41.5, lng:-73.2, label:"Monte Verde, Chile — oldest confirmed pre-Clovis site (~14,500 BCE)", source:"Dillehay — Monte Verde (1997)", researcher:null, up:2876, dn:312 },
      { lat:22.0, lng:-99.8, label:"Chiquihuite Cave, Mexico (~26,000 BCE — debated)", source:"Ardelean et al. — Nature (2020)", researcher:null, up:1543, dn:876 },
      { lat:40.1, lng:-80.2, label:"Meadowcroft Rockshelter, Pennsylvania (~16,000 BCE)", source:"Adovasio — The First Americans (2002)", researcher:null, up:1876, dn:432 }
    ]},
  544: { locationType:"A", tags:["chinchorro","chile","oldest-mummies","mummification","7000bce","hunter-gatherer","atacama","coastal","peru"] },
  545: { locationType:"A", tags:["tiwanaku","lake-titicaca","sacred-landscape","raised-fields","island-of-sun","frost-management","bolivia","andean"] },
  546: { locationType:"A", tags:["mississippian","obion","tennessee","western-tennessee","exchange","regional-variant","lowland"] },
  547: { locationType:"A", tags:["chimu","chan-chan","peru","split-inheritance","ciudadela","adobe","hydraulic","mochica","largest-city"] },
  548: { locationType:"A", tags:["muisca","colombia","el-dorado","gold","emerald","zipa","zaque","confederation","chibchan","bogota"] },
  549: { locationType:"A", tags:["mississippian","helena-crossing","arkansas","mississippi-river","crossing","trade-node","exchange"] },
  550: { locationType:"A", tags:["mississippian","powers-phase","missouri","settlement-pattern","powers-fort","survey","regional-system"] },
  // END PHASE 5ad
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5ae — APPEND TO extended.js
// Civilizations 551–580
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local extended.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5ae — data-extended.js entries (ids 551–580) ─────────────────────

  551: { locationType:"A", tags:["mississippian","zebree","arkansas","woodland-transition","early-mississippian","ceramic","emergence"] },
  552: { locationType:"A", tags:["fremont","nine-mile-canyon","utah","rock-art","petroglyphs","pictographs","corridor","hunting"] },
  553: { locationType:"A", tags:["mogollon","mimbres","new-mexico","ceramic","pottery","burial","killed-vessels","southwest","collapse"] },
  554: { locationType:"A", tags:["sinagua","arizona","montezuma-castle","cliff-dwelling","verde-valley","sunset-crater","volcanic","southwest"] },
  555: { locationType:"A", tags:["salado","arizona","tonto-basin","polychrome","hohokam","mogollon","cliff-dwelling","southwest","drought"] },
  556: { locationType:"A", tags:["ancestral-puebloan","bandelier","new-mexico","pajarito","tuff","cave-rooms","cochiti","santa-clara","migration"] },
  557: { locationType:"A", tags:["ancestral-puebloan","aztec-ruins","new-mexico","great-kiva","chacoan","mesa-verde","transition","southwest"] },
  558: { locationType:"A", tags:["mississippian","lilbourn","missouri","cairo-lowland","cahokia-sphere","transitional","lower-mississippi"] },
  559: { locationType:"A", tags:["ancestral-puebloan","wupatki","arizona","sunset-crater","volcanic","ball-court","hohokam","blowhole","1064ce"] },
  560: { locationType:"A", tags:["hohokam","casa-grande","arizona","observatory","adobe","tower","enigmatic","astronomy","caliche"] },
  561: { locationType:"A", tags:["ancestral-puebloan","hovenweep","utah","colorado","towers","astronomy","defensive","sofaer","canyon-rim"] },
  562: { locationType:"A", tags:["mississippian","moundville","related-sites","black-warrior","secondary-centres","redistribution","hierarchy"] },
  563: { locationType:"A", tags:["hopewell","newark-earthworks","ohio","geometric","lunar-cycle","golf-course","largest-earthwork","world"] },
  564: { locationType:"A", tags:["hopewell","mound-city","ohio","burial","exotic-goods","wwi-destruction","copper","obsidian","mica"] },
  565: { locationType:"A", tags:["hopewell","seip-earthworks","ohio","scioto","mortuary","copper","mica","pearl","platform-pipe"] },
  566: { locationType:"A", tags:["mississippian","lubbub-creek","alabama","tombigbee","salvage-archaeology","waterway","community-level"] },
  567: { locationType:"A", tags:["mississippian","lake-george","mississippi","yazoo-basin","regional-centre","lower-yazoo","mounds"] },
  568: { locationType:"A", tags:["mississippian","pocahontas","mississippi","yazoo-basin","chiefdom","alluvial","small-centre"] },
  569: { locationType:"A", tags:["ancestral-puebloan","salmon-ruins","new-mexico","chacoan-outlier","dendrochronology","mesa-verde","fire","children"] },
  570: { locationType:"A", tags:["mississippian","ingomar","mississippi","yazoo-basin","early-excavation","brown","typology","lower-valley"] },
  571: { locationType:"A", tags:["hopewell","havana","illinois","illinois-river","dickson-mounds","exchange","woodland","collapse"] },
  572: { locationType:"A", tags:["hopewell","kansas-city","missouri","plains-margin","western-hopewell","exchange","prairie-forest"] },
  573: { locationType:"A", tags:["mississippian","orendorf","illinois","cahokia-sphere","northern-expansion","palisade","emergence","violence"] },
  574: { locationType:"A", tags:["cahokia","woodhenge","illinois","solar-calendar","astronomy","monks-mound","post-circle","political-authority"] },
  575: { locationType:"A", tags:["ancestral-puebloan","chetro-ketl","chaco","colonnade","mesoamerica","plaza","kiva","great-house"] },
  576: { locationType:"A", tags:["hopewell","marksville","louisiana","southern-hopewell","geometric-earthwork","lower-mississippi","gulf-coast"] },
  577: { locationType:"A", tags:["mississippian","aztalan","wisconsin","phase-ii","sacrifice","isolation","cahokia","abandonment","northern"] },
  578: { locationType:"A", tags:["ancestral-puebloan","lowry-pueblo","colorado","chacoan-outlier","painted-kiva","wall-paintings","dendrochronology"] },
  579: { locationType:"A", tags:["coles-creek","louisiana","pre-mississippian","lower-mississippi","mounds","precursor","ranked-society","chiefdom"] },
  580: { locationType:"A", tags:["ancestral-puebloan","yellow-jacket","colorado","mesa-verde","large-pueblo","aggregation","migration","pueblo-iii"] },
  // END PHASE 5ae
};,
// ════════════════════════════════════════════════════════════════════════════
// PHASE 5af — APPEND TO extended.js
// Civilizations 581–610
// ════════════════════════════════════════════════════════════════════════════
//
// INSTRUCTIONS (owner):
//   1. Open your local extended.js
//   2. Find the very last closing  };  at the bottom
//   3. Replace that  };  with a comma, then paste ALL lines below
//      (these entries already end with the correct closing bracket)
//
// ════════════════════════════════════════════════════════════════════════════

// ── PHASE 5af — data-extended.js entries (ids 581–610) ─────────────────────

  581: { locationType:"A", tags:["aksum","ethiopia","christianity","ezana","frumentius","ark-of-covenant","hancock","lalibela-precursor"] },
  582: { locationType:"A", tags:["nok","iron-smelting","west-africa","independent-invention","bantu","technology","nigeria"] },
  583: { locationType:"B", tags:["bantu","expansion","africa","migration","iron","agriculture","khoisan","dna","linguistics"],
    locationTheories:[
      { lat:5.0, lng:12.0, label:"Cameroon-Nigeria borderland — Bantu homeland (mainstream)", source:"Vansina — Paths in the Rainforest (1990)", researcher:null, up:2341, dn:198 },
      { lat:-5.0, lng:25.0, label:"Congo Basin dispersal zone", source:"Ehret — The Civilisations of Africa (2002)", researcher:null, up:1432, dn:312 }
    ]},
  584: { locationType:"A", tags:["lalibela","ethiopia","rock-churches","zagwe","monolithic","christianity","hancock","templar","unesco"] },
  585: { locationType:"A", tags:["mali","sundiata","mansa-musa","timbuktu","gold","trans-saharan","griot","epic","west-africa"] },
  586: { locationType:"A", tags:["songhai","askia","timbuktu","sankore","manuscripts","islamic","morocco","gunpowder","west-africa"] },
  587: { locationType:"A", tags:["kanem-bornu","lake-chad","nigeria","longevity","trans-saharan","ottoman","divine-king","islamic"] },
  588: { locationType:"A", tags:["mutapa","great-zimbabwe-successor","zambezi","portuguese","gold","africa-south","divine-kingship"] },
  589: { locationType:"A", tags:["kuba","drc","textile","raffia","velvet","picasso","cubism","constitutional","nyim","central-africa"] },
  590: { locationType:"A", tags:["luba","drc","lukasa","memory-board","mbudye","bronze","divine-kingship","central-africa","art"] },
  591: { locationType:"A", tags:["kolomoki","georgia","swift-creek","weeden-island","pre-mississippian","woodland","southeast","largest-early"] },
  592: { locationType:"B", tags:["anatolian-neolithic","gobekli-predecessor","epipaleolithic","ppna","fertile-crescent","collins","hancock","debated"],
    locationTheories:[
      { lat:37.0, lng:39.0, label:"Şanlıurfa region / PPNA Fertile Crescent (mainstream)", source:"Cauvin — The Birth of the Gods (2000)", researcher:null, up:1543, dn:312 },
      { lat:35.0, lng:38.0, label:"Northern Syria / Jerf el Ahmar tradition", source:"Stordeur — Villages préhistoriques (2015)", researcher:null, up:987, dn:198 }
    ]},
  593: { locationType:"A", tags:["cucuteni-trypillia","mega-site","ukraine","talianky","egalitarian","burning","urbanism","4000bce","rings"] },
  594: { locationType:"A", tags:["linear-a","minoan","administrative","palace-economy","redistribution","tablet","undeciphered","crete"] },
  595: { locationType:"A", tags:["mycenaean","pylos","nestor","linear-b","ventris","palace","final-records","destruction","homer"] },
  596: { locationType:"A", tags:["ugarit","syria","bronze-age","alphabet","baal-cycle","sea-peoples","cosmopolitan","cuneiform","canaanite"] },
  597: { locationType:"A", tags:["elam","iran","susa","proto-elamite","undeciphered","babylon","achaemenid","ancient","mesopotamia"] },
  598: { locationType:"A", tags:["mittani","hurrian","indo-aryan","syria","amarna","horse","bronze-age","hittite","akkadian"] },
  599: { locationType:"A", tags:["kassite","babylonia","longest-dynasty","gilgamesh","kudurru","amarna","elamite","mesopotamia"] },
  600: { locationType:"A", tags:["early-dynastic","sumer","mesopotamia","city-state","ziggurat","enheduanna","writing","ur","eridu","milestone"] },
  601: { locationType:"A", tags:["phoenician","tyre","sidon","alphabet","purple-dye","maritime","carthage","circumnavigation","levant"] },
  602: { locationType:"A", tags:["neo-assyrian","empire","deportation","terror","nineveh","ashurbanipal","library","iron","siege"] },
  603: { locationType:"A", tags:["median","iran","zagros","assyria-destroyer","cyaxares","herodotus","iranian","achaemenid-precursor"] },
  604: { locationType:"A", tags:["palmyrene","zenobia","roman","syria","egypt","isis-destruction","palmyra","female-ruler","ancient"] },
  605: { locationType:"A", tags:["pontus","mithridates","black-sea","rome","poison","toxicology","hellenistic","iranian","anatolia"] },
  606: { locationType:"A", tags:["greco-bactrian","afghanistan","hellenistic","coinage","buddhism","gandharan","menander","milindapanha","silk-road"] },
  607: { locationType:"A", tags:["kushan","central-asia","india","buddhism","silk-road","gandharan","kanishka","nalanda","buddha-image"] },
  608: { locationType:"A", tags:["sogdian","letters","dunhuang","silk-road","merchant-diaspora","script","uyghur","mongol","manchu"] },
  609: { locationType:"A", tags:["pala","bengal","buddhism","nalanda","vikramashila","srivijaya","bronzes","india","maritime"] },
  610: { locationType:"A", tags:["chola","tamil","maritime","srivijaya","nataraja","brihadeeswarar","rajendra","india","navy","bronze"] },
  // END PHASE 5af
};,
// ============================================================
// PHASE 5ag APPEND — data-extended.js
// CIV_META entries 611–640
// INSTRUCTIONS: Open your local data-extended.js → find the final };
// Replace }; with , then paste everything below, ending with };
// ============================================================

  611: {
    locationType: "A",
    tags: ["bronze-age", "oracle-bones", "writing-system", "ancestor-worship", "yellow-river", "china"],
    keyFigures: ["King Wu Ding", "Fu Hao", "King Zhou"],
    notableStructures: ["Yin ruins at Anyang", "royal tombs at Xibeigang"],
    primarySources: ["oracle bone inscriptions", "Shiji (Records of the Grand Historian)"],
    researcherLinks: []
  },
  612: {
    locationType: "A",
    tags: ["iron-age", "feudalism", "confucianism", "mandate-of-heaven", "china", "zhou"],
    keyFigures: ["King Wen of Zhou", "King Wu of Zhou", "Duke of Zhou"],
    notableStructures: ["Zhou capital Haojing", "ritual bronze vessels"],
    primarySources: ["Book of Songs", "Classic of Documents", "Zuo Zhuan"],
    researcherLinks: []
  },
  613: {
    locationType: "A",
    tags: ["migration", "rice-agriculture", "bronze", "iron", "japan", "korea", "genetics"],
    keyFigures: ["Himiko (later Yayoi period)"],
    notableStructures: ["Yoshinogari settlement", "Toro site granaries"],
    primarySources: ["Gishi Wajinden (Chinese records of Wa)", "archaeological surveys"],
    researcherLinks: []
  },
  614: {
    locationType: "A",
    tags: ["iron-production", "korea", "confederacy", "tumulus", "trade", "japan"],
    keyFigures: ["King Suro (legendary founder of Geumgwan Gaya)"],
    notableStructures: ["Daeseong-dong tumuli", "Bokcheon-dong tumuli"],
    primarySources: ["Samguk Yusa", "Samguk Sagi"],
    researcherLinks: []
  },
  615: {
    locationType: "A",
    tags: ["three-kingdoms", "korea", "buddhism", "japan", "silk-road", "cultural-transmission"],
    keyFigures: ["King Geunchogo", "King Seong", "Wanginssi (scholar to Japan)"],
    notableStructures: ["Mireuksa Temple", "Jeongnim-sa Temple"],
    primarySources: ["Samguk Sagi", "Nihon Shoki"],
    researcherLinks: []
  },
  616: {
    locationType: "A",
    tags: ["steppe", "nomadic", "mongolia", "manchuria", "xiongnu", "predecessor"],
    keyFigures: ["unnamed Donghu chanyu"],
    notableStructures: [],
    primarySources: ["Shiji", "Han Shu"],
    researcherLinks: []
  },
  617: {
    locationType: "A",
    tags: ["steppe-empire", "nomadic", "mongolia", "silk-road", "china", "han-dynasty", "hun"],
    keyFigures: ["Chanyu Modu", "Chanyu Huhanye"],
    notableStructures: ["Ivolga fortress", "Noin-Ula burial mounds"],
    primarySources: ["Shiji", "Han Shu", "Hanshu"],
    researcherLinks: []
  },
  618: {
    locationType: "A",
    tags: ["steppe-empire", "khaganate", "mongolia", "khagan", "avar", "nomadic"],
    keyFigures: ["Shelun (first khagan)", "Yujiulü Anagui"],
    notableStructures: [],
    primarySources: ["Wei Shu", "Bei Qi Shu", "Byzantine chronicles"],
    researcherLinks: []
  },
  619: {
    locationType: "A",
    tags: ["turkic", "steppe-empire", "silk-road", "mongolia", "orkhon-script", "khaganate"],
    keyFigures: ["Bumin Khagan", "Istämi", "Bilge Khagan"],
    notableStructures: ["Orkhon Valley stelae", "Khöshöö Tsaidam monuments"],
    primarySources: ["Orkhon inscriptions", "Tang Shu", "Byzantine chronicles"],
    researcherLinks: []
  },
  620: {
    locationType: "A",
    tags: ["kirghiz", "steppe", "siberia", "runic-script", "uyghur", "nomadic"],
    keyFigures: ["unnamed Kirghiz khagan (840 CE)"],
    notableStructures: ["Yenisei runic stelae"],
    primarySources: ["Tang Annals", "Yenisei runic inscriptions"],
    researcherLinks: []
  },
  621: {
    locationType: "A",
    tags: ["iron-age", "iran", "assyria", "urartu", "lake-urmia", "horses", "caucasus"],
    keyFigures: ["Iranzu", "Ullusunu"],
    notableStructures: ["Hasanlu citadel (associated site)"],
    primarySources: ["Assyrian royal annals", "Urartian inscriptions"],
    researcherLinks: []
  },
  622: {
    locationType: "A",
    tags: ["bronze-age", "oman", "copper-trade", "maritime", "mesopotamia", "indus", "gulf"],
    keyFigures: [],
    notableStructures: ["Bat archaeological site", "Al-Ain oasis tombs", "Hafit tombs"],
    primarySources: ["Sumerian trade tablets", "Akkadian administrative records"],
    researcherLinks: []
  },
  623: {
    locationType: "A",
    tags: ["south-arabia", "incense-trade", "frankincense", "yemen", "irrigation", "iron-age"],
    keyFigures: ["Shahr Hilal (attested king)"],
    notableStructures: ["Timna capital ruins", "Wadi Beihan irrigation"],
    primarySources: ["Old South Arabian inscriptions", "Periplus of the Erythraean Sea"],
    researcherLinks: []
  },
  624: {
    locationType: "A",
    tags: ["south-arabia", "incense-trade", "frankincense", "yemen", "indian-ocean", "camel-caravan"],
    keyFigures: ["Ilazz Yalit (attested king)"],
    notableStructures: ["Shabwa capital", "Wadi Hadramawt irrigation systems"],
    primarySources: ["Old South Arabian inscriptions", "Pliny the Elder", "Strabo"],
    researcherLinks: []
  },
  625: {
    locationType: "A",
    tags: ["bronze-age", "anatolia", "hittite", "luwian", "aegean", "trade", "collapse"],
    keyFigures: ["King Tarhundaradu", "King Uhhaziti"],
    notableStructures: ["Apasa (Ephesus predecessor)"],
    primarySources: ["Hittite Arzawa letters", "Amarna letters (EA 31–32)"],
    researcherLinks: []
  },
  626: {
    locationType: "A",
    tags: ["neolithic", "anatolia", "pre-hittite", "religion", "language-isolate", "turkey"],
    keyFigures: [],
    notableStructures: ["Alacahöyük royal tombs"],
    primarySources: ["Hittite ritual texts in Hattian language", "Boğazkale archives"],
    researcherLinks: []
  },
  627: {
    locationType: "B",
    tags: ["bronze-age-collapse", "migration", "aegean", "mediterranean", "egypt", "philistines", "debated"],
    locationTheories: [
      { lat: 35.5, lng: 24.0, label: "Aegean origin (mainstream)", source: "Egyptian inscriptions", researcher: null, up: 0, dn: 0 },
      { lat: 37.9, lng: 23.7, label: "Mycenaean refugee hypothesis", source: "Eric Cline — 1177 BC", researcher: null, up: 0, dn: 0 },
      { lat: 35.0, lng: 33.0, label: "Cyprus staging point", source: "archaeolgical evidence", researcher: null, up: 0, dn: 0 }
    ],
    keyFigures: ["Ramesses III (opponent)", "Merneptah (opponent)"],
    notableStructures: ["Medinet Habu reliefs", "Philistine Pentapolis"],
    primarySources: ["Medinet Habu inscriptions", "Papyrus Harris I"],
    researcherLinks: [{ name: "Eric Cline", work: "1177 BC: The Year Civilization Collapsed (2014)" }]
  },
  628: {
    locationType: "A",
    tags: ["tamil", "south-india", "trade", "pearl-fishery", "sangam", "buddhism", "roman-trade"],
    keyFigures: ["Maravarman Sundara Pandya", "Nedunj Cheliyan"],
    notableStructures: ["Madurai Meenakshi precursor temples", "Korkai port"],
    primarySources: ["Sangam literature", "Megasthenes Indica", "Pliny the Elder"],
    researcherLinks: []
  },
  629: {
    locationType: "A",
    tags: ["deccan", "india", "roman-trade", "buddhism", "stupa", "prakrit", "maritime"],
    keyFigures: ["Gautamiputra Satakarni", "Vasisthiputra Pulumavi"],
    notableStructures: ["Amaravati Stupa", "Nagarjunakonda complex", "Sanchi additions"],
    primarySources: ["Periplus of the Erythraean Sea", "Nasik cave inscriptions"],
    researcherLinks: []
  },
  630: {
    locationType: "A",
    tags: ["india", "odisha", "maritime", "buddhism", "ashoka", "southeast-asia", "war"],
    keyFigures: ["Kharavela", "Ashoka (conqueror)"],
    notableStructures: ["Udayagiri and Khandagiri caves", "Sisupalgarh"],
    primarySources: ["Hathigumpha inscription", "Ashokan Rock Edicts XIII"],
    researcherLinks: []
  },
  631: {
    locationType: "A",
    tags: ["oceania", "pacific", "navigation", "pottery", "polynesia", "migration", "lapita"],
    keyFigures: [],
    notableStructures: ["Lapita pottery assemblages", "Teouma burial site (Vanuatu)"],
    primarySources: ["archaeological ceramic analysis", "genetic studies (Skoglund et al. 2016)"],
    researcherLinks: []
  },
  632: {
    locationType: "A",
    tags: ["micronesia", "pacific", "megalithic", "basalt", "saudeleur", "pohnpei", "canal"],
    keyFigures: ["Saudeleur dynasty rulers"],
    notableStructures: ["Nan Douwas islet", "Pahn Kadira islet", "92 artificial islets"],
    primarySources: ["Pohnpeian oral tradition", "archaeological surveys (Ayres 1990s)"],
    researcherLinks: []
  },
  633: {
    locationType: "A",
    tags: ["pacific", "polynesia", "moai", "rongorongo", "writing", "easter-island", "stone-sculpture"],
    keyFigures: ["Hotu Matu'a (legendary founder)"],
    notableStructures: ["Rano Raraku quarry", "Ahu Tongariki", "Ahu Akivi"],
    primarySources: ["oral traditions", "Routledge survey (1919)", "Hunt & Lipo — The Statues That Walked (2011)"],
    researcherLinks: [{ name: "Thor Heyerdahl", work: "Aku-Aku (1958)" }]
  },
  634: {
    locationType: "A",
    tags: ["neolithic", "europe", "balkans", "proto-writing", "figurines", "copper-age", "vinca-symbols"],
    keyFigures: [],
    notableStructures: ["Vinča-Belo Brdo site", "Pločnik copper workshop"],
    primarySources: ["Drăguşin et al. ceramic analyses", "Haarmann — Writing and Its Role in Early Civilization (2010)"],
    researcherLinks: [
      { name: "Marija Gimbutas", work: "The Language of the Goddess (1989)" },
      { name: "Harald Haarmann", work: "Early Civilization and Literacy in Europe (1996)" }
    ]
  },
  635: {
    locationType: "B",
    tags: ["theorized", "flood-myth", "black-sea", "neolithic", "catastrophe", "biblical", "prehistoric"],
    locationTheories: [
      { lat: 43.0, lng: 34.0, label: "Flooded Black Sea shelf (Ryan & Pitman)", source: "Columbia University marine survey", researcher: "William Ryan & Walter Pitman", up: 0, dn: 0 },
      { lat: 41.0, lng: 29.0, label: "Bosphorus breach point", source: "geophysical core samples", researcher: null, up: 0, dn: 0 }
    ],
    keyFigures: [],
    notableStructures: ["submerged Black Sea shelf settlements (hypothesised)"],
    primarySources: ["Ryan & Pitman — Noah's Flood (1997)", "Ballard et al. marine survey (2000)"],
    researcherLinks: [{ name: "Robert Ballard", work: "Black Sea underwater survey (2000)" }]
  },
  636: {
    locationType: "A",
    tags: ["nubia", "africa", "kerma", "sudan", "deffufa", "sacrifice", "egypt", "bronze-age"],
    keyFigures: ["unnamed Kerma rulers (kerma klassique period)"],
    notableStructures: ["Western Deffufa", "Eastern Deffufa", "Royal tumuli K III and K IV"],
    primarySources: ["Charles Bonnet excavation reports (Kerma)"],
    researcherLinks: []
  },
  637: {
    locationType: "A",
    tags: ["north-africa", "berber", "nomadic", "sahara", "rome", "cavalry", "numidia"],
    keyFigures: ["Tacfarinas (Gaetulian revolt leader)"],
    notableStructures: [],
    primarySources: ["Tacitus Annals", "Pliny the Elder Natural History", "Strabo Geography"],
    researcherLinks: []
  },
  638: {
    locationType: "A",
    tags: ["silk-road", "central-asia", "indo-european", "tarim-basin", "mummies", "buddhism", "china"],
    keyFigures: [],
    notableStructures: ["Kizil Caves frescoes", "Subashi monastery ruins"],
    primarySources: ["Tocharian A and B manuscripts", "Mallory & Mair — The Tarim Mummies (2000)"],
    researcherLinks: []
  },
  639: {
    locationType: "A",
    tags: ["hunter-gatherer", "earthworks", "mississippi", "trade-network", "louisiana", "archaic", "mounds"],
    keyFigures: [],
    notableStructures: ["Poverty Point earthwork ridges", "Mound A (Bird Mound)", "Mound B"],
    primarySources: ["Gibson — Poverty Point: A Terminal Archaic Culture (2000)", "UNESCO WHS nomination"],
    researcherLinks: []
  },
  640: {
    locationType: "A",
    tags: ["andean", "south-america", "roads", "empire", "redistribution", "drought", "peru", "inca-predecessor"],
    keyFigures: [],
    notableStructures: ["Huari capital site", "Pikillacta administrative centre", "Cerro Baúl"],
    primarySources: ["Isbell — Huari Administration Structure (1991)", "Schreiber — Wari Imperialism in Middle Horizon Peru (1992)"],
    researcherLinks: []
  }

// ============================================================
// END PHASE 5ag APPEND — data-extended.js
// After pasting: ensure the file ends with };
// Total new records: 30 (ids 611–640)
// ============================================================,
// ============================================================
// PHASE 5ah APPEND — data-extended.js
// IDs 641–670
// Append these records to the END of the CIV_META object
// Instructions: open data-extended.js → find the final };
// → replace it with a comma → paste everything below
// → file ends with };
// ============================================================

  641: {
    locationType: "A",
    tags: ["maritime", "thalassocracy", "buddhism", "trade", "southeast-asia", "strait-of-malacca"],
    keyFacts: ["Dominated Strait of Malacca and Sunda Strait", "Major Vajrayana Buddhist centre", "Raided by Chola Empire 1025 CE", "Chinese pilgrim Yijing studied here"],
    researchers: [],
    relatedCivs: [119, 296, 642]
  },
  642: {
    locationType: "A",
    tags: ["indianised", "maritime", "trade", "mekong-delta", "southeast-asia"],
    keyFacts: ["First major Indianised state in Southeast Asia", "Chinese chronicles primary source", "Canal network for flood management", "Entrepôt on maritime Silk Road"],
    researchers: [],
    relatedCivs: [641, 643, 644]
  },
  643: {
    locationType: "A",
    tags: ["hindu-buddhist", "maritime", "austronesian", "tower-temples", "vietnam", "southeast-asia"],
    keyFacts: ["Occupied central and southern Vietnam for 1,640 years", "Distinctive brick tower-temple tradition", "Prolonged conflict with Dai Viet and China", "Absorbed by Vietnam in 1832"],
    researchers: [],
    relatedCivs: [642, 644, 641]
  },
  644: {
    locationType: "A",
    tags: ["theravada-buddhism", "mon", "thailand", "southeast-asia", "buddhist-art"],
    keyFacts: ["Earliest Theravada Buddhist polity in mainland Southeast Asia", "Distinctive dharma wheel sculpture tradition", "Declined under Khmer expansion", "Strongly influenced later Thai Buddhist culture"],
    researchers: [],
    relatedCivs: [119, 642, 643]
  },
  645: {
    locationType: "A",
    tags: ["buddhism", "temple-building", "burmese-script", "myanmar", "southeast-asia", "mongol-invasion"],
    keyFacts: ["First kingdom to unify the Irrawaddy valley", "Over 10,000 monuments on Bagan plain", "Developed Burmese script", "Fatally weakened by Mongol invasions 1277 CE"],
    researchers: [],
    relatedCivs: [641, 644, 643]
  },
  646: {
    locationType: "A",
    tags: ["christianity", "aksum", "ethiopian-orthodox", "red-sea", "africa", "late-phase"],
    keyFacts: ["Christianity adopted under King Ezana c.330 CE", "Minted coins bearing Christian symbols", "Islam disrupted Red Sea trade networks from 7th century", "Legacy continued through Zagwe dynasty"],
    researchers: [],
    relatedCivs: [649, 647, 664]
  },
  647: {
    locationType: "A",
    tags: ["islamic", "horn-of-africa", "walashma-dynasty", "trade", "ethiopia", "medieval"],
    keyFacts: ["One of earliest Muslim polities in Horn of Africa", "Controlled Red Sea trade routes", "Defeated by Solomonic Emperor Yeshaq I in 1415", "Precursor to Adal Sultanate"],
    researchers: [],
    relatedCivs: [648, 646, 649]
  },
  648: {
    locationType: "A",
    tags: ["islamic", "horn-of-africa", "jihad", "portuguese", "ethiopia", "medieval"],
    keyFacts: ["Ahmad Grañ launched devastating jihad against Ethiopia 1529", "Portuguese intervention saved Solomonic kingdom", "Ahmad Grañ killed at Battle of Wayna Daga 1543", "Fragmented under Oromo migration pressure"],
    researchers: [],
    relatedCivs: [647, 646, 649]
  },
  649: {
    locationType: "A",
    tags: ["rock-hewn-churches", "christian", "ethiopia", "lalibela", "medieval", "africa"],
    keyFacts: ["Ruled highland Ethiopia for approximately 4 centuries", "Lalibela churches carved from living basalt", "Maintained Ethiopian Orthodox tradition after Aksum", "Superseded by Solomonic restoration 1270 CE"],
    researchers: [],
    relatedCivs: [646, 647, 648]
  },
  650: {
    locationType: "A",
    tags: ["bronze-age", "anatolia", "metallurgy", "trade-colonies", "hatti", "collapse"],
    keyFacts: ["Hatti culture pre-dates and influenced Hittite religion", "Earliest copper and bronze working in region", "Assyrian trade colonies at Kültepe from c.1950 BCE", "Part of broader Late Bronze Age collapse c.1200 BCE"],
    researchers: [],
    relatedCivs: [20, 45, 651, 652]
  },
  651: {
    locationType: "A",
    tags: ["black-sea", "georgia", "gold", "greek-mythology", "caucasus", "golden-fleece"],
    keyFacts: ["Mythological home of Golden Fleece and Medea", "Alluvial gold collected using sheepskins — origin of legend", "Extensive contact with Greek colonial world", "Absorbed into Pontic Empire c.100 BCE"],
    researchers: [],
    relatedCivs: [652, 650, 663]
  },
  652: {
    locationType: "A",
    tags: ["iron-age", "lake-van", "hydraulic-engineering", "assyria", "urartu", "anatolia"],
    keyFacts: ["Assyria's most persistent Iron Age adversary", "Vast irrigation canal systems and fortress complexes", "Bronze cauldrons spread from Anatolia to Etruscan Italy", "Collapsed under Scythian and Median pressure c.590 BCE"],
    researchers: [],
    relatedCivs: [650, 651, 46]
  },
  653: {
    locationType: "A",
    tags: ["incense-trade", "dam", "south-arabia", "queen-of-sheba", "yemen", "sabaean-script"],
    keyFacts: ["Great Dam of Marib — antiquity's greatest irrigation work", "Controlled lucrative incense trade routes", "Developed Sabaean script — ancestor of Ethiopic family", "Linked by tradition to the biblical Queen of Sheba"],
    researchers: [],
    relatedCivs: [654, 655, 646]
  },
  654: {
    locationType: "A",
    tags: ["south-arabia", "monotheism", "judaism", "christianity", "aksum", "himyar"],
    keyFacts: ["Unified most of southern Arabian coast", "Progressive conversion from polytheism to monotheism", "Ahmad Grañ conflict links to Adal Sultanate legacy", "Became Sasanian province after 525 CE Aksumite conquest"],
    researchers: [],
    relatedCivs: [653, 646, 648]
  },
  655: {
    locationType: "A",
    tags: ["gulf", "bahrain", "entrepot", "indus-valley", "mesopotamia", "paradise-myth"],
    keyFacts: ["Sumerian texts describe Dilmun as paradise/Garden of Eden", "Tens of thousands of burial mounds on Bahrain", "Commercial relay between Mesopotamia and Indus Valley", "Declined as direct sea routes bypassed the Gulf"],
    researchers: ["Matthew LaCroix"],
    relatedCivs: [656, 28, 35]
  },
  656: {
    locationType: "A",
    tags: ["copper", "oman", "uae", "bronze-age", "indus-valley", "umm-an-nar"],
    keyFacts: ["Principal copper source for Mesopotamian civilisations", "Trade records in Sumerian and Akkadian texts", "Associated archaeologically with Umm an-Nar culture", "Commercial links with Indus Valley civilisation confirmed"],
    researchers: [],
    relatedCivs: [655, 35, 28]
  },
  657: {
    locationType: "A",
    tags: ["minoan", "crete", "palace", "thalassocracy", "bronze-age", "aegean", "frescoes"],
    keyFacts: ["Peak of Minoan civilisation following rebuilding after 1700 BCE earthquakes", "Knossos, Phaistos, Malia, Zakros — four palace centres", "Bull-leaping frescoes among most sophisticated Bronze Age art", "Ended c.1450 BCE possibly linked to Thera eruption"],
    researchers: ["Angelos Galanopoulos"],
    relatedCivs: [658, 102, 111]
  },
  658: {
    locationType: "A",
    tags: ["cycladic", "marble-figurines", "aegean", "obsidian", "thera", "bronze-age"],
    keyFacts: ["Earliest Aegean maritime trade and obsidian exchange network", "Marble folded-arm figurines immediately recognisable", "Akrotiri on Thera buried by eruption c.1600 BCE with extraordinary preservation", "Merged with Minoan and Mycenaean cultural currents"],
    researchers: [],
    relatedCivs: [657, 102, 111]
  },
  659: {
    locationType: "A",
    tags: ["tocharian", "silk-road", "indo-european", "mummies", "tarim-basin", "central-asia"],
    keyFacts: ["Westernmost-looking mummies found in Central Asia", "Kucha, Agni, Krorän were major Silk Road oasis cities", "Tocharian languages are easternmost branch of Indo-European", "Absorbed by Turkic and Uyghur expansion"],
    researchers: [],
    relatedCivs: [660, 661, 662]
  },
  660: {
    locationType: "A",
    tags: ["silk-road", "merchants", "samarkand", "religion-transmission", "central-asia", "sogdian-letters"],
    keyFacts: ["Dominant Silk Road merchant people of late antiquity", "Sogdian letters of 313 CE — earliest Central Asian commercial correspondence", "Transmitted Buddhism, Zoroastrianism, Manichaeism along Silk Road", "Remained active commercially within Islamic world after conquest"],
    researchers: [],
    relatedCivs: [659, 661, 662]
  },
  661: {
    locationType: "A",
    tags: ["bmac", "oxus", "bronze-age", "central-asia", "indo-iranian", "vedic-origins"],
    keyFacts: ["Also known as Oxus Civilisation or BMAC", "Planned mudbrick cities with monumental architecture", "Proposed milieu for proto-Indo-Iranian religious traditions", "Dissolved c.1600 BCE merging with steppe cultures"],
    researchers: [],
    relatedCivs: [659, 660, 500]
  },
  662: {
    locationType: "A",
    tags: ["silk-road", "buddhism", "gandhara", "hellenistic", "central-asia", "india"],
    keyFacts: ["One of four great empires of its age alongside Rome, Parthia, Han China", "Pivotal role transmitting Mahayana Buddhism to Central and East Asia", "Gandharan art fused Greek sculptural style with Buddhist iconography", "Fragmented under Sasanian pressure in 3rd–4th centuries CE"],
    researchers: [],
    relatedCivs: [659, 660, 661]
  },
  663: {
    locationType: "A",
    tags: ["hellenistic", "egypt", "alexandria", "library", "cleopatra", "greek-dynasty"],
    keyFacts: ["Founded by Ptolemy I Soter following Alexander's death", "Great Library of Alexandria — ancient world's greatest centre of learning", "First Ptolemaic ruler to learn Egyptian language was Cleopatra VII", "Ended with Cleopatra VII's defeat by Rome 30 BCE"],
    researchers: [],
    relatedCivs: [664, 651, 102]
  },
  664: {
    locationType: "A",
    tags: ["nubia", "meroe", "kush", "iron-smelting", "pyramids", "meroitic-script", "africa"],
    keyFacts: ["Capital relocated from Napata to Meroe after Assyrian expulsion from Egypt", "Developed Meroitic alphabet — still not fully deciphered", "More pyramids than Egypt — smaller but more numerous", "Conquered by Aksumite King Ezana c.350 CE"],
    researchers: [],
    relatedCivs: [646, 663, 649]
  },
  665: {
    locationType: "A",
    tags: ["iron-smelting", "terracotta", "nigeria", "west-africa", "indigenous-metallurgy", "nok"],
    keyFacts: ["Sub-Saharan Africa's earliest confirmed iron-smelting industry", "Most ancient terracotta figurative sculpture tradition in sub-Saharan Africa", "Iron-working appears to have developed independently — not diffused from North Africa", "Function of figurines — votive, funerary, or commemorative — still debated"],
    researchers: [],
    relatedCivs: [667, 668, 666]
  },
  666: {
    locationType: "A",
    tags: ["gold", "limpopo", "south-africa", "great-zimbabwe", "social-hierarchy", "africa"],
    keyFacts: ["First class-based society in southern Africa", "Elite lived atop hill separated physically from commoners", "Golden rhino figurine — among Africa's finest ancient goldwork", "Abandoned c.1220 CE likely due to climatic deterioration"],
    researchers: [],
    relatedCivs: [665, 667, 668]
  },
  667: {
    locationType: "A",
    tags: ["yoruba", "cavalry", "constitutional", "slave-trade", "nigeria", "west-africa", "oyo"],
    keyFacts: ["Largest and most powerful Yoruba state", "Constitutional monarchy with mechanisms for removal of tyrants", "Dominated Atlantic slave trade routes in 18th century", "Ended by civil war and Sokoto Caliphate pressure 1836"],
    researchers: [],
    relatedCivs: [668, 665, 666]
  },
  668: {
    locationType: "A",
    tags: ["benin-bronzes", "divine-kingship", "nigeria", "west-africa", "portuguese-contact", "colonial-looting"],
    keyFacts: ["One of oldest sophisticated states in West Africa", "Benin Bronzes among ancient world's greatest metalwork traditions", "Formal diplomatic relations with Portugal from late 15th century", "British Punitive Expedition of 1897 looted and destroyed Benin City"],
    researchers: ["Ivan Van Sertima"],
    relatedCivs: [667, 665, 666]
  },
  669: {
    locationType: "A",
    tags: ["caribbean", "taino", "arawakan", "columbian-contact", "epidemic", "pre-columbian"],
    keyFacts: ["At least three major waves of migration from 3500 BCE", "Taíno were dominant population encountered by Columbus 1492", "Cassava cultivation, areíto ceremony, and ballgame were major cultural exports", "Caribbean populations reduced by estimated 90% within a century of contact"],
    researchers: [],
    relatedCivs: [169, 176, 177]
  },
  670: {
    locationType: "C",
    locationTheories: [
      { lat: 10.0, lng: -150.0, label: "Churchward's Pacific Mu", source: "James Churchward, The Lost Continent of Mu (1926)", researcher: null, up: 0, dn: 0 },
      { lat: -8.0, lng: 115.0, label: "Sundaland / Lemurian Shelf", source: "Stephen Oppenheimer, Eden in the East (1998)", researcher: "Stephen Oppenheimer", up: 0, dn: 0 },
      { lat: 7.0, lng: 158.2, label: "Nan Madol / Pohnpei vicinity", source: "Alternative archaeology; Nan Madol proximity arguments", researcher: null, up: 0, dn: 0 },
      { lat: -25.0, lng: -130.0, label: "South Pacific flooded shelf", source: "Graham Hancock, America Before (2019)", researcher: "Graham Hancock", up: 0, dn: 0 }
    ],
    tags: ["theorized", "sunken-continent", "pacific", "lemuria", "churchward", "flood-myth", "hancock"],
    keyFacts: ["Concept originated with Augustus Le Plongeon, expanded by James Churchward", "Claimed derivation from secret Naacal tablets — no independent verification", "Mainstream geology rejects sunken Pacific continent hypothesis", "Polynesian oral traditions of sunken homelands cited as supporting evidence"],
    researchers: ["Graham Hancock", "Stephen Oppenheimer"]
  },
// ============================================================
// PHASE 5ai APPEND — data-extended.js
// IDs 671–700
// Append to END of CIV_META object in data-extended.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  671: {
    locationType: "A",
    tags: ["madagascar", "merina", "austronesian", "christianity", "colonial", "africa"],
    keyFacts: ["Unified much of Madagascar under centralised monarchy", "Radama I extended kingdom to sea coasts with British assistance", "First Malagasy written language using Latin script", "Queen Ranavalona III exiled by French 1897"],
    researchers: [],
    relatedCivs: [680, 646, 672]
  },
  672: {
    locationType: "A",
    tags: ["lukasa", "memory-board", "sacred-kingship", "congo", "luba", "africa"],
    keyFacts: ["Developed lukasa memory boards for encoding royal knowledge", "Bambudye society controlled esoteric political knowledge", "Significant influence on Lunda state-formation", "Destabilised by Belgian colonial penetration from 1880s"],
    researchers: [],
    relatedCivs: [673, 674, 666]
  },
  673: {
    locationType: "A",
    tags: ["kongo", "portuguese-contact", "catholic", "slave-trade", "congo", "africa", "diplomacy"],
    keyFacts: ["Formal diplomatic relations with Portugal from 1483", "Ruling elite converted to Catholicism by 1491", "King Afonso I's letters protesting slave trade among earliest African political documents", "Absorbed into Portuguese Angola 1914"],
    researchers: [],
    relatedCivs: [672, 674, 668]
  },
  674: {
    locationType: "A",
    tags: ["shona", "gold-trade", "swahili-coast", "portuguese", "zimbabwe", "africa", "monomotapa"],
    keyFacts: ["Evolved from Great Zimbabwe tradition", "Controlled gold trade routes to Swahili Coast", "Portuguese penetrated kingdom through missionaries and intermarriage", "Became Portuguese client state through 17th century fragmentation"],
    researchers: [],
    relatedCivs: [680, 666, 673]
  },
  675: {
    locationType: "A",
    tags: ["dmt", "pre-aksumite", "ethiopia", "sabaean-script", "horn-of-africa", "africa"],
    keyFacts: ["Earliest sophisticated state in the Horn of Africa", "Inscriptions in South Arabian Sabaean script", "Developed early Ge'ez language", "Faded c.400 BCE absorbed into pre-Aksumite chiefdoms"],
    researchers: [],
    relatedCivs: [646, 649, 653]
  },
  676: {
    locationType: "A",
    tags: ["foggara", "underground-water", "sahara", "trans-saharan-trade", "libya", "africa"],
    keyFacts: ["Thousands of kilometres of underground water tunnels (foggaras)", "Supported agriculture in now hyper-arid desert", "Controlled trans-Saharan trade routes with cavalry and chariots", "Declined as fossil water aquifers were depleted"],
    researchers: [],
    relatedCivs: [677, 678, 665]
  },
  677: {
    locationType: "A",
    tags: ["phoenician", "carthage", "punic-wars", "hannibal", "mediterranean", "north-africa"],
    keyFacts: ["Founded by Phoenician colonists c.814 BCE", "Aristotle praised Carthaginian constitution as one of antiquity's finest", "Hannibal crossed the Alps with war elephants 218 BCE", "Rome destroyed and salted Carthage 146 BCE"],
    researchers: [],
    relatedCivs: [678, 676, 681]
  },
  678: {
    locationType: "A",
    tags: ["berber", "numidia", "masinissa", "north-africa", "rome", "tifinagh"],
    keyFacts: ["Unified under King Masinissa after Battle of Zama 202 BCE", "Transformed from nomadic confederation to agricultural kingdom", "Numidian cavalry among most prized mercenaries in ancient Mediterranean", "Ended by Julius Caesar's victory at Thapsus 46 BCE"],
    researchers: [],
    relatedCivs: [677, 676, 663]
  },
  679: {
    locationType: "A",
    tags: ["aksum", "red-sea", "adulis", "indian-ocean", "trade", "coinage", "africa"],
    keyFacts: ["Controlled both shores of the southern Red Sea at height", "Port of Adulis — largest port on African Red Sea coast", "Gold, silver, and bronze coinage circulated across Indian Ocean", "Sasanian and Islamic expansion disrupted commercial dominance from 6th century"],
    researchers: [],
    relatedCivs: [646, 680, 653]
  },
  680: {
    locationType: "A",
    tags: ["swahili", "indian-ocean", "islamic", "kilwa", "gold-trade", "africa", "coastal"],
    keyFacts: ["Ibn Battuta declared Kilwa one of world's most beautiful cities 1331 CE", "Western anchor of the Indian Ocean trade network", "Multi-storey stone and coral architecture", "Portuguese arrival from 1498 shattered Swahili commercial system"],
    researchers: [],
    relatedCivs: [674, 679, 671]
  },
  681: {
    locationType: "A",
    tags: ["nabataean", "petra", "incense-trade", "water-harvesting", "arabic-script", "jordan"],
    keyFacts: ["Rose-red rock city of Petra carved from sandstone cliffs", "Elaborate desert water harvesting system — cisterns, channels, dams", "Nabataean script direct ancestor of all Arabic writing systems", "Peacefully absorbed into Roman Empire as Arabia Petraea 106 CE"],
    researchers: [],
    relatedCivs: [653, 654, 684]
  },
  682: {
    locationType: "A",
    tags: ["sassanid", "zoroastrian", "persia", "rome", "byzantine", "silk-road", "iran"],
    keyFacts: ["Last great Persian dynasty before Islamic conquest", "Silver-gilt metalwork and rock reliefs at Naqsh-e Rostam among finest ancient Iranian art", "Transmitted polo, chess, Persian garden concept to Islamic civilisation", "Collapsed rapidly before Arab Muslim armies of the 630s-640s CE"],
    researchers: [],
    relatedCivs: [683, 684, 687]
  },
  683: {
    locationType: "A",
    tags: ["parthian", "arsacid", "persia", "rome", "carrhae", "silk-road", "iran"],
    keyFacts: ["Ruled Iranian plateau and Mesopotamia for nearly 5 centuries", "Cataphract cavalry destroyed Crassus at Carrhae 53 BCE — seven Roman legions lost", "Decentralised confederation of vassal kingdoms", "Overthrown by Sasanian Ardashir I in 224 CE"],
    researchers: [],
    relatedCivs: [682, 684, 652]
  },
  684: {
    locationType: "A",
    tags: ["hellenistic", "seleucid", "alexander", "antioch", "maccabean-revolt", "near-east"],
    keyFacts: ["Largest of the Hellenistic successor states", "Founded dozens of new Greek cities including Antioch on the Orontes", "Maccabean Revolt 167 BCE — first recorded religious freedom movement", "Dismembered by Parthia from east and Rome from west; ended 63 BCE"],
    researchers: [],
    relatedCivs: [685, 683, 682]
  },
  685: {
    locationType: "A",
    tags: ["hasmonean", "jewish", "judea", "maccabees", "theocracy", "levant"],
    keyFacts: ["Established after successful Maccabean Revolt against Seleucid Hellenisation", "Combined roles of high priest and king — religiously controversial", "Internal dynastic conflict enabled Roman intervention by Pompey 63 BCE", "Ended with Herod the Great's Roman-backed seizure of power 37 BCE"],
    researchers: [],
    relatedCivs: [684, 686, 681]
  },
  686: {
    locationType: "A",
    tags: ["palmyra", "zenobia", "rome", "syria", "breakaway-empire", "late-antique"],
    keyFacts: ["Queen Zenobia conquered Egypt, Anatolia, and Levant 270-272 CE", "Zenobia claimed descent from Cleopatra VII", "Palmyra was crossroads of Greco-Roman, Aramaic, and Iranian traditions", "Emperor Aurelian crushed empire 273 CE, paraded Zenobia in golden chains"],
    researchers: [],
    relatedCivs: [682, 663, 687]
  },
  687: {
    locationType: "A",
    tags: ["byzantine", "constantinople", "orthodox-christian", "roman", "hagia-sophia", "europe"],
    keyFacts: ["Direct continuation of eastern Roman Empire for over 1,100 years", "Justinian's Corpus Juris Civilis — foundation of modern European law", "Constantinople largest and wealthiest city in Europe for centuries", "Fell to Ottoman Mehmed II on 29 May 1453"],
    researchers: [],
    relatedCivs: [682, 691, 693]
  },
  688: {
    locationType: "A",
    tags: ["vandal", "germanic", "north-africa", "carthage", "naval", "rome-sack"],
    keyFacts: ["Crossed Strait of Gibraltar 429 CE under King Gaiseric", "Sacked Rome 455 CE in fourteen-day raid", "Significant naval power in western Mediterranean", "Destroyed by Byzantine general Belisarius 533-534 CE"],
    researchers: [],
    relatedCivs: [677, 689, 690]
  },
  689: {
    locationType: "A",
    tags: ["visigoth", "germanic", "iberia", "toledo", "catholic", "islam-conquest"],
    keyFacts: ["Converted from Arianism to Catholicism 589 CE under King Reccared", "Isidore of Seville's Etymologiae — greatest early medieval encyclopaedia", "Sophisticated law codes fusing Roman and Germanic traditions", "Destroyed by Umayyad Muslim invasion 711 CE"],
    researchers: [],
    relatedCivs: [688, 690, 691]
  },
  690: {
    locationType: "A",
    tags: ["lombard", "germanic", "italy", "edictum-rothari", "medieval", "carolingian"],
    keyFacts: ["Invaded Italy 568 CE exploiting Byzantine exhaustion after Justinian's wars", "Edictum Rothari 643 CE — one of earliest codified Germanic law collections", "Remarkable goldwork and decorated altar screens at Cividale del Friuli", "Destroyed by Charlemagne at Pope Hadrian I's request 774 CE"],
    researchers: [],
    relatedCivs: [688, 689, 691]
  },
  691: {
    locationType: "A",
    tags: ["carolingian", "charlemagne", "frankish", "holy-roman", "europe", "medieval", "renaissance"],
    keyFacts: ["Largest political entity in post-Roman Western Europe", "Charlemagne crowned Emperor by Pope Leo III on Christmas Day 800 CE", "Carolingian Renaissance preserved enormous body of classical learning", "Treaty of Verdun 843 CE established foundations of France and Germany"],
    researchers: [],
    relatedCivs: [690, 692, 693]
  },
  692: {
    locationType: "A",
    tags: ["viking", "norse", "scandinavia", "longships", "north-america", "varangian"],
    keyFacts: ["L'Anse aux Meadows confirms Norse presence in Americas c.1000 CE", "Varangian route connected Baltic to Black Sea and Abbasid silver economy", "Raided and traded from North America to Caspian Sea", "Ended through Christianisation rather than external defeat"],
    researchers: [],
    relatedCivs: [693, 691, 687]
  },
  693: {
    locationType: "A",
    tags: ["kievan-rus", "slavic", "orthodox-christian", "ukraine", "russia", "mongol-invasion"],
    keyFacts: ["Prince Vladimir I converted to Eastern Orthodoxy 988 CE", "Primary Chronicle describes Vladimir's comparison of world religions", "Kiev was among Europe's largest and most cosmopolitan cities c.1000 CE", "Mongol invasion 1237-1240 CE destroyed Kiev and fragmented the state"],
    researchers: [],
    relatedCivs: [692, 691, 687]
  },
  694: {
    locationType: "A",
    tags: ["mali", "mansa-musa", "timbuktu", "gold", "trans-saharan", "west-africa", "islam"],
    keyFacts: ["Mansa Musa's 1324 hajj with 60,000 retinue depressed gold prices in Cairo for a decade", "University of Sankore at Timbuktu held hundreds of thousands of manuscripts", "Largest and wealthiest empire in West African history", "Declined under Tuareg and Songhai pressure from mid-14th century"],
    researchers: [],
    relatedCivs: [695, 696, 697]
  },
  695: {
    locationType: "A",
    tags: ["songhai", "askia-muhammad", "timbuktu", "sahel", "west-africa", "gunpowder"],
    keyFacts: ["Largest state in African history at its peak under Askia Muhammad I", "Timbuktu reached zenith of Islamic intellectual culture under Songhai", "Askia Muhammad's hajj cemented diplomatic links with North Africa and Arabia", "Moroccan invasion using firearms ended the empire with shocking speed 1591"],
    researchers: [],
    relatedCivs: [694, 696, 697]
  },
  696: {
    locationType: "A",
    tags: ["mossi", "cavalry", "burkina-faso", "animist", "west-africa", "resistance"],
    keyFacts: ["Successfully resisted incorporation into Mali and Songhai empires", "Deliberate religious pluralism — animism alongside Islam", "Raided Timbuktu 1333 and 1477 CE", "French colonial conquest 1896-1897 ended seven centuries of continuity"],
    researchers: [],
    relatedCivs: [694, 695, 697]
  },
  697: {
    locationType: "A",
    tags: ["jolof", "wolof", "senegal", "atlantic", "portuguese-contact", "west-africa"],
    keyFacts: ["Among first sub-Saharan African kingdoms in sustained contact with Portuguese from 1440s", "Five constituent kingdoms held together by tribute and dynastic ties", "Portuguese Atlantic trade undermined Jolof's role as intermediary", "Cayor rebellion 1549 CE ended Jolof dominance"],
    researchers: [],
    relatedCivs: [694, 695, 696]
  },
  698: {
    locationType: "A",
    tags: ["gobekli-tepe", "megalithic", "hunter-gatherer", "pre-agricultural", "turkey", "astronomy", "hancock"],
    keyFacts: ["World's oldest known monumental religious architecture c.9600 BCE", "T-shaped pillars up to 6 metres tall predating agriculture by 1,000+ years", "Klaus Schmidt proposed it catalysed the agricultural revolution", "Vulture Stone proposed by Hancock to encode stellar date of 10,950 BCE"],
    researchers: ["Graham Hancock", "Andrew Collins"],
    relatedCivs: [700, 699, 661]
  },
  699: {
    locationType: "A",
    tags: ["jomon", "pottery", "hunter-gatherer", "japan", "dogu", "oldest-pottery"],
    keyFacts: ["World's oldest known pottery c.16,000 BCE by a hunter-gatherer society", "Over 13,000 years of recognisable cultural continuity", "Dogū figurines with distinctive humanoid forms attracted alternative archaeological interest", "Transformed by Yayoi rice farmers immigrating from Korean peninsula c.300 BCE"],
    researchers: [],
    relatedCivs: [641, 645, 698]
  },
  700: {
    locationType: "B",
    locationTheories: [
      { lat: 36.8, lng: 36.5, label: "Levantine coast — Göbekli Tepe nexus", source: "Graham Hancock, Magicians of the Gods (2015)", researcher: "Graham Hancock", up: 0, dn: 0 },
      { lat: 30.0, lng: 31.2, label: "Egyptian Zep Tepi origin point", source: "Robert Bauval & Graham Hancock, Keeper of Genesis (1996)", researcher: "Robert Bauval", up: 0, dn: 0 },
      { lat: 38.9, lng: 40.0, label: "Eastern Anatolia — post-YDB reconstruction zone", source: "Randall Carlson, Kosmographia podcast", researcher: "Randall Carlson", up: 0, dn: 0 },
      { lat: 28.0, lng: 84.0, label: "Himalayan foothills — Vedic survivor tradition", source: "David Frawley, Gods, Sages and Kings (1991)", researcher: "David Frawley", up: 0, dn: 0 }
    ],
    tags: ["theorized", "younger-dryas", "pre-flood", "hancock", "carlson", "ydih", "impact-hypothesis", "lost-civilisation"],
    keyFacts: ["YDB event dated to c.12,900 years ago — comet/asteroid airburst hypothesis", "Nanodiamond, platinum-group element, and magnetic spherule evidence at YDB layer across 4 continents", "Göbekli Tepe and sudden agricultural revolution cited as post-catastrophe knowledge-transmission evidence", "Mainstream geology contested but peer-reviewed geological support growing"],
    researchers: ["Graham Hancock", "Randall Carlson", "Richard Firestone"]
  },
// ============================================================
// PHASE 5aj APPEND — data-extended.js
// IDs 701–730
// Append to END of CIV_META object in data-extended.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  701: {
    locationType: "A",
    tags: ["achaemenid", "persia", "cyrus", "satrapy", "royal-road", "iron-age", "iran"],
    keyFacts: ["Cyrus Cylinder — often cited as world's first human rights charter", "Royal Road stretched over 2,500 km", "Largest empire the ancient world had yet seen — 5.5 million sq km", "Alexander the Great conquered it 334–330 BCE"],
    researchers: [],
    relatedCivs: [702, 703, 683]
  },
  702: {
    locationType: "A",
    tags: ["median", "iran", "nineveh", "assyria", "zoroastrian", "iron-age"],
    keyFacts: ["First Iranian state to achieve imperial scale", "Destroyed Nineveh alongside Babylon 612 BCE", "Early Zoroastrian religious practices likely developed here", "Overthrown by Achaemenid Cyrus the Great 550 BCE"],
    researchers: [],
    relatedCivs: [701, 703, 652]
  },
  703: {
    locationType: "A",
    tags: ["babylonian", "mesopotamia", "nebuchadnezzar", "hanging-gardens", "jewish-exile", "iraq"],
    keyFacts: ["Babylon was world's largest city under Nebuchadnezzar II", "Destroyed Jerusalem and deported Jewish population 586 BCE", "Hanging Gardens — one of Seven Wonders of the Ancient World", "Captured by Cyrus the Great without significant resistance 539 BCE"],
    researchers: [],
    relatedCivs: [701, 702, 684]
  },
  704: {
    locationType: "A",
    tags: ["lydia", "coinage", "croesus", "anatolia", "electrum", "trade", "turkey"],
    keyFacts: ["Invented standardised coinage c.600 BCE under King Alyattes", "King Croesus refined system into pure gold and silver denominations", "Source of the phrase 'rich as Croesus'", "Cyrus the Great defeated Croesus 547 BCE following Delphic oracle ambiguity"],
    researchers: [],
    relatedCivs: [705, 701, 712]
  },
  705: {
    locationType: "A",
    tags: ["phrygian", "midas", "gordion", "anatolia", "bronze-age-collapse", "turkey"],
    keyFacts: ["Historical King Midas corresponded with Assyrian king Sargon II", "Midas tomb at Gordion excavated 1957 — remarkable wooden furniture and bronze vessels", "Script may have influenced early Greek alphabetic writing", "Cimmerian invasions destroyed kingdom c.700 BCE"],
    researchers: [],
    relatedCivs: [704, 706, 650]
  },
  706: {
    locationType: "A",
    tags: ["thracian", "odrysian", "gold-metalwork", "balkans", "bulgaria", "ancient-europe"],
    keyFacts: ["Most powerful Thracian state, dominating southeastern Europe", "Panagyurishte gold treasure among finest ancient metalwork", "Complex diplomatic relations with Macedonia and Athens", "Rome formally annexed Thrace as province 46 CE under Claudius"],
    researchers: [],
    relatedCivs: [707, 708, 705]
  },
  707: {
    locationType: "A",
    tags: ["dacian", "decebalus", "trajan", "romania", "carpathian", "zalmoxis"],
    keyFacts: ["Trajan's Column provides most detailed visual record of any ancient military campaign", "Dacian belief in immortality via Zalmoxis cult astonished Greek observers", "Unique stone-and-timber hillfort (dava) construction", "Rich gold and silver deposits motivated Roman conquest 101–106 CE"],
    researchers: [],
    relatedCivs: [706, 708, 693]
  },
  708: {
    locationType: "A",
    tags: ["illyrian", "adriatic", "queen-teuta", "balkans", "rome", "piracy"],
    keyFacts: ["Queen Teuta refused Roman demands to suppress piracy 230 BCE", "First Illyrian War was Rome's first military intervention east of Adriatic", "Illyrian warriors served as mercenaries across Mediterranean", "Rome ended independence after defeating King Gentius 168 BCE"],
    researchers: [],
    relatedCivs: [709, 706, 707]
  },
  709: {
    locationType: "A",
    tags: ["pyrrhus", "epirus", "pyrrhic-victory", "dodona", "greece", "war-elephants"],
    keyFacts: ["Pyrrhus of Epirus gave English language 'Pyrrhic victory'", "Hannibal considered Pyrrhus second greatest general after Alexander", "First to demonstrate war elephants in European combat against Rome", "Rome enslaved 150,000 Epirotes in a single day 168 BCE"],
    researchers: [],
    relatedCivs: [708, 706, 712]
  },
  710: {
    locationType: "A",
    tags: ["mithridates", "pontus", "black-sea", "rome", "poison-immunity", "anatolia"],
    keyFacts: ["Mithridates VI self-immunised to poisons — origin of word 'mithridate'", "Spoke 22 languages and governed multi-ethnic kingdom", "Pontic Massacre 88 BCE — ~80,000 Romans killed in single day", "Pompey finally defeated Mithridates 63 BCE"],
    researchers: [],
    relatedCivs: [711, 712, 683]
  },
  711: {
    locationType: "A",
    tags: ["bosporan", "black-sea", "crimea", "greek-colony", "grain-trade", "scythian"],
    keyFacts: ["Primary conduit for grain from steppe to grain-hungry Greek cities", "Athens depended critically on Bosporan grain in 5th–4th centuries BCE", "Syncretic Greco-Scythian-Sarmatian culture in extraordinarily rich burial tumuli", "Succumbed to Gothic and Hunnic pressure late 4th century CE after 800 years"],
    researchers: [],
    relatedCivs: [710, 706, 712]
  },
  712: {
    locationType: "A",
    tags: ["pergamon", "hellenistic", "library", "dying-gaul", "parchment", "anatolia"],
    keyFacts: ["Library second only to Alexandria in scale", "Dying Gaul sculpture — apogee of Hellenistic baroque", "Invented or perfected parchment as writing material", "Last king Attalus III bequeathed kingdom to Rome 133 BCE"],
    researchers: [],
    relatedCivs: [713, 710, 684]
  },
  713: {
    locationType: "A",
    tags: ["bithynia", "nicomedia", "black-sea", "hannibal", "anatolia", "hellenistic"],
    keyFacts: ["Strategic position between Black Sea and Propontis enabled prolonged independence", "Nicomedia served as Diocletian's eastern imperial capital", "Hannibal Barca spent final years in Bithynia, died c.183 BCE", "Last king Nicomedes IV bequeathed kingdom to Rome 74 BCE"],
    researchers: [],
    relatedCivs: [712, 710, 714]
  },
  714: {
    locationType: "A",
    tags: ["cappadocia", "anatolia", "horses", "cave-cities", "iran-influenced", "turkey"],
    keyFacts: ["Famous horse-breeding industry supplied ancient Near East", "Göreme valley fairy chimneys and underground cave cities", "Maintained independence through marriage alliances and natural defences", "Incorporated into Roman Empire as province 17 CE under Tiberius"],
    researchers: [],
    relatedCivs: [715, 713, 705]
  },
  715: {
    locationType: "A",
    tags: ["armenia", "christianity", "tigranes", "armenian-alphabet", "caucasus", "first-christian-nation"],
    keyFacts: ["First nation to adopt Christianity as state religion 301 CE — predating Constantine", "Tigranes II the Great most powerful king in Asia 95–66 BCE", "Armenian alphabet created 405 CE by monk Mesrop Mashtots", "Partitioned between Persia and Byzantium 428 CE"],
    researchers: [],
    relatedCivs: [716, 717, 682]
  },
  716: {
    locationType: "A",
    tags: ["caucasian-iberia", "georgia", "christianity", "silk-road", "rome-parthia", "caucasus"],
    keyFacts: ["Converted to Christianity 330s CE under King Mirian III following Saint Nino", "One of earliest Christian kingdoms in the world", "Strategic crossroads between Black Sea and Caspian trade routes", "Absorbed into Sasanian Persian system 580 CE"],
    researchers: [],
    relatedCivs: [715, 717, 682]
  },
  717: {
    locationType: "A",
    tags: ["caucasian-albania", "azerbaijan", "alphabet", "christianity", "caspian", "caucasus"],
    keyFacts: ["Unique 52-letter alphabet only definitively identified in 1990s at St Catherine's Monastery", "Converted to Christianity in 4th century CE", "Albanian Apostolic Church maintained distinct tradition", "Arab conquest 7th–8th centuries ended independence and began Islamisation"],
    researchers: [],
    relatedCivs: [715, 716, 682]
  },
  718: {
    locationType: "A",
    tags: ["kushan-sasanian", "bactria", "silk-road", "zoroastrian", "buddhist", "syncretic", "afghanistan"],
    keyFacts: ["Sasanian branch adopted Kushan royal titles and iconography", "Coinage depicted both Zoroastrian fire altars and Buddhist symbols", "Crucial transmission belt for Iran-India-Central Asia cultural exchange", "Overthrown by Kidarite Huns c.370 CE"],
    researchers: [],
    relatedCivs: [662, 719, 682]
  },
  719: {
    locationType: "A",
    tags: ["kidarite", "central-asia", "silk-road", "huns", "bactria", "nomadic"],
    keyFacts: ["Probable Xiongnu or mixed steppe origin", "Coinage imitating Kushan prototypes is primary historical evidence", "Controlled key Silk Road oases and Hindu Kush passes", "Displaced by Hephthalite Huns c.467 CE"],
    researchers: [],
    relatedCivs: [718, 720, 662]
  },
  720: {
    locationType: "A",
    tags: ["hephthalite", "white-huns", "central-asia", "gupta", "sasanian", "nomadic"],
    keyFacts: ["Checked Sasanian Persian expansion eastward", "Multiple invasions of Gupta Empire contributed to Gupta collapse", "Byzantine sources described them as surprisingly settled and sophisticated", "Destroyed by joint Sasanian-Göktürk campaign 557–567 CE"],
    researchers: [],
    relatedCivs: [719, 721, 682]
  },
  721: {
    locationType: "A",
    tags: ["gupta", "classical-india", "aryabhata", "zero", "kalidasa", "nalanda", "india"],
    keyFacts: ["Aryabhata calculated pi to 4 decimal places and conceived zero c.499 CE", "Kalidasa's plays considered 'Shakespeare of Sanskrit literature'", "Classical Age of Indian civilisation — philosophical and scientific golden age", "Fragmented under Hephthalite invasions from mid-5th century CE"],
    researchers: [],
    relatedCivs: [722, 726, 720]
  },
  722: {
    locationType: "A",
    tags: ["pallava", "dravidian", "kanchipuram", "shore-temple", "south-india", "script-ancestor"],
    keyFacts: ["Developed Dravidian architectural style with pyramidal gopuram towers", "Shore Temple at Mamallapuram and Descent of the Ganges relief at Mamallapuram", "Pallava script direct ancestor of Thai, Khmer, Javanese, and Baybayin scripts", "Defeated and absorbed by Chola Empire 897 CE"],
    researchers: [],
    relatedCivs: [724, 725, 728]
  },
  723: {
    locationType: "A",
    tags: ["rashtrakuta", "kailasa-temple", "ellora", "deccan", "india", "medieval"],
    keyFacts: ["Kailasa Temple at Ellora — carved downward into basalt cliff, estimated 400,000 tonnes removed", "Arab traders listed Rashtrakuta king among world's four great rulers", "Controlled Deccan plateau for over two centuries", "Ended by Western Chalukya pressure 982 CE"],
    researchers: [],
    relatedCivs: [725, 721, 728]
  },
  724: {
    locationType: "A",
    tags: ["chera", "kerala", "tamil", "sangam", "pepper-trade", "roman-contact", "india"],
    keyFacts: ["Classical Tamil Sangam poetry among most sophisticated ancient non-Mediterranean literature", "Port of Musiri referenced in first-century CE Egyptian papyrus merchant contract", "Roman coin hoards of extraordinary scale excavated throughout Kerala", "Dominated pepper, cardamom, and ivory trade to Mediterranean and Arabia"],
    researchers: [],
    relatedCivs: [722, 728, 680]
  },
  725: {
    locationType: "A",
    tags: ["chalukya", "badami", "deccan", "india", "temple-architecture", "pattadakal"],
    keyFacts: ["First great empire of the southern Deccan", "Aihole — 'living laboratory' of Indian temple architecture with 70+ temples", "Checked both Pallava expansion northward and Harsha's expansion southward", "Overthrown by Rashtrakuta feudatories 753 CE"],
    researchers: [],
    relatedCivs: [723, 726, 722]
  },
  726: {
    locationType: "A",
    tags: ["harsha", "north-india", "buddhism", "xuanzang", "medieval", "gangetic-plain"],
    keyFacts: ["Last great Hindu empire to unite northern India before Islamic conquests", "Chinese pilgrim Xuanzang's detailed account primary literary source", "Quinquennial Prayag assembly — distributed entire treasury to poor and religious", "Empire dissolved immediately upon Harsha's death 647 CE"],
    researchers: [],
    relatedCivs: [721, 727, 725]
  },
  727: {
    locationType: "A",
    tags: ["pala", "bengal", "vajrayana-buddhism", "nalanda", "tibet", "india", "medieval"],
    keyFacts: ["Last major Buddhist imperial power in India", "Founded Vikramashila University — rival to Nalanda", "Pala bronze casting unequalled in Indian Buddhist art", "Ghurids destroyed Nalanda and Vikramashila 1193–1203 CE — extinguished Indian Buddhism's institutional life"],
    researchers: [],
    relatedCivs: [726, 721, 728]
  },
  728: {
    locationType: "A",
    tags: ["chola", "maritime", "brihadeeswarar", "south-india", "naval", "southeast-asia", "tamil"],
    keyFacts: ["Naval expedition against Srivijaya 1025 CE — greatest ancient Indian naval campaign", "Brihadeeswarar Temple vimana tower 66 metres — world's tallest at construction 1010 CE", "Village sabha assemblies cited as sophisticated ancient local democracy", "Dominated Bay of Bengal and projected power to Southeast Asia"],
    researchers: [],
    relatedCivs: [722, 724, 641]
  },
  729: {
    locationType: "A",
    tags: ["hoysala", "belur", "halebidu", "stone-sculpture", "karnataka", "india", "medieval"],
    keyFacts: ["Most intricate stone sculpture tradition in world history according to many art historians", "Star-shaped temple platforms cast ever-changing shadow patterns", "Patronised Shaivism, Vaishnavism, and Jainism simultaneously", "Destroyed by Delhi Sultanate's Deccan expeditions in early 14th century"],
    researchers: [],
    relatedCivs: [723, 730, 728]
  },
  730: {
    locationType: "A",
    tags: ["vijayanagara", "hampi", "hindu-empire", "south-india", "medieval", "talikota"],
    keyFacts: ["Hampi was one of world's largest cities c.1500 CE — population estimated 500,000", "Portuguese visitor Paes described market as larger than Lisbon", "Last great Hindu empire of south India — bulwark against Delhi Sultanate", "Battle of Talikota 1565 CE and sacking of Hampi — one of largest planned destructions of a city in Asian history"],
    researchers: [],
    relatedCivs: [729, 728, 723]
  },
// ============================================================
// PHASE 5ak APPEND — data-extended.js
// IDs 731–760
// Append to END of CIV_META object in data-extended.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  731: {
    locationType: "A",
    tags: ["maratha", "shivaji", "deccan", "india", "guerrilla-warfare", "hindu"],
    keyFacts: ["Shivaji pioneered ganimi kava guerrilla warfare doctrine against Mughals", "Confederacy nearly unified India under Hindu rule", "Catastrophic defeat at Third Battle of Panipat 1761 ended northward expansion", "British ended Maratha independence in Third Anglo-Maratha War 1817–1818"],
    researchers: [],
    relatedCivs: [732, 730, 733]
  },
  732: {
    locationType: "A",
    tags: ["mughal", "akbar", "taj-mahal", "india", "islamic", "persian-culture", "gunpowder-empire"],
    keyFacts: ["Generated approximately 25% of global GDP at peak", "Akbar's sulh-i-kul policy of universal religious tolerance", "Taj Mahal, Red Fort, Fatehpur Sikri among world's greatest architectural monuments", "Declined catastrophically after Aurangzeb's death 1707"],
    researchers: [],
    relatedCivs: [731, 733, 734]
  },
  733: {
    locationType: "A",
    tags: ["delhi-sultanate", "turkic", "india", "islamic", "mongol-resistance", "medieval"],
    keyFacts: ["First major Islamic state in Indian subcontinent", "Repelled three Mongol invasions — historically underappreciated achievement", "Alauddin Khalji's campaigns briefly extracted tribute from nearly entire subcontinent", "Ended by Babur at First Battle of Panipat 1526"],
    researchers: [],
    relatedCivs: [732, 734, 735]
  },
  734: {
    locationType: "A",
    tags: ["deccan-sultanates", "golconda", "diamonds", "bijapur", "india", "islamic", "talikota"],
    keyFacts: ["Golconda mines produced Hope Diamond, Koh-i-Noor, and Regent Diamond", "Gol Gumbaz at Bijapur — world's largest dome at completion 1656", "Joint coalition destroyed Vijayanagara at Talikota 1565", "Aurangzeb annexed all Deccan Sultanates 1656–1687"],
    researchers: [],
    relatedCivs: [735, 732, 730]
  },
  735: {
    locationType: "A",
    tags: ["bahmani", "deccan", "india", "islamic", "persian-culture", "bidar"],
    keyFacts: ["First independent Islamic sultanate in the Deccan", "Bidar became major centre of Persian literary culture and Sufism", "Mahmud Gawan — Persian merchant who rose to supreme power and reformed administration", "Fragmented into five successor states by 1490"],
    researchers: [],
    relatedCivs: [734, 733, 723]
  },
  736: {
    locationType: "A",
    tags: ["ahom", "assam", "india", "tai-shan", "mughal-resistance", "buranjis"],
    keyFacts: ["Resisted seventeen successive Mughal military invasions", "Originated as Tai-Shan people from Yunnan", "Maintained detailed buranjis chronicles in Ahom and Assamese languages", "British annexed Assam after Anglo-Burmese War 1824–1826"],
    researchers: [],
    relatedCivs: [732, 747, 726]
  },
  737: {
    locationType: "A",
    tags: ["lan-na", "chiang-mai", "thailand", "buddhist", "thai-script", "southeast-asia"],
    keyFacts: ["Hosted major Buddhist council revising Pali Tipitaka canon 1477", "Developed unique Lan Na script still used ceremonially", "Maintained independence for nearly 5 centuries through mountain geography and diplomacy", "Burmese conquest 1558 began two centuries of overlordship"],
    researchers: [],
    relatedCivs: [738, 746, 744]
  },
  738: {
    locationType: "A",
    tags: ["ayutthaya", "thailand", "buddhist", "devaraja", "trade", "southeast-asia"],
    keyFacts: ["Population exceeded 1 million at peak — among world's largest cities", "Hosted Chinese, Japanese, Persian, Portuguese, Dutch, and French merchant communities", "Absorbed Khmer devaraja god-king concept into Buddhist kingship", "Sacked and destroyed by Burmese Konbaung dynasty 1767"],
    researchers: [],
    relatedCivs: [739, 737, 740]
  },
  739: {
    locationType: "A",
    tags: ["sukhothai", "thailand", "thai-script", "buddhism", "walking-buddha", "southeast-asia"],
    keyFacts: ["King Ramkhamhaeng invented Thai script c.1283 CE", "Distinctive walking Buddha image — unprecedented spiritual dynamism in Buddhist sculpture", "Regarded as first Thai state and cradle of Thai civilisation", "Peacefully absorbed into Ayutthaya 1438"],
    researchers: [],
    relatedCivs: [738, 737, 740]
  },
  740: {
    locationType: "A",
    tags: ["khmer", "angkor-wat", "hydraulic-city", "southeast-asia", "cambodia", "devaraja"],
    keyFacts: ["Angkor — largest pre-industrial urban complex on Earth, over 1,000 sq km", "Angkor Wat world's largest religious monument — 400 acres", "Jayavarman VII converted to Buddhism and rebuilt Angkor with iconic face-towers", "Thai Ayutthayan expansion and possible climate factors led to abandonment c.1431"],
    researchers: [],
    relatedCivs: [738, 739, 741]
  },
  741: {
    locationType: "A",
    tags: ["majapahit", "java", "indonesia", "maritime", "gajah-mada", "palapa-oath"],
    keyFacts: ["Gajah Mada's Palapa Oath inspired naming of Indonesia's first domestic satellite 1975", "Nagarakretagama court epic of 1365 CE most important literary document from pre-Islamic Southeast Asia", "Claimed suzerainty over most of Indonesian archipelago, Malay Peninsula, and Philippines", "Fragmented under Islamic conversion pressure and succession conflicts early 16th century"],
    researchers: [],
    relatedCivs: [742, 743, 641]
  },
  742: {
    locationType: "A",
    tags: ["singhasari", "java", "indonesia", "kertanagara", "mongol-invasion", "tantric"],
    keyFacts: ["King Kertanagara's deliberate insult of Mongol envoy triggered 1292 invasion", "Dispatched diplomatic missions to Sumatra and Malay Peninsula", "Kertanagara venerated as Tantric adept identified with deity Bhairava", "Collapse led to founding of Majapahit by son-in-law Raden Wijaya"],
    researchers: [],
    relatedCivs: [741, 743, 640]
  },
  743: {
    locationType: "A",
    tags: ["mataram", "java", "indonesia", "sultan-agung", "dutch-voc", "wayang-kulit"],
    keyFacts: ["Sultan Agung mounted two sieges of Dutch Batavia 1628 and 1629", "Created Javanese calendar system still used for ceremonial purposes", "Patronised wayang kulit shadow puppet tradition as vehicle for political legitimation", "Treaty of Giyanti 1755 split Mataram into Yogyakarta and Surakarta courts"],
    researchers: [],
    relatedCivs: [741, 742, 641]
  },
  744: {
    locationType: "A",
    tags: ["lan-xang", "laos", "million-elephants", "buddhist", "that-luang", "southeast-asia"],
    keyFacts: ["Name means Kingdom of a Million Elephants", "That Luang stupa built under Setthathirath remains Laos's national symbol", "Buffer zone between Burma, Vietnam, and Ayutthaya maintained through diplomacy", "Fragmented into three competing kingdoms 1707"],
    researchers: [],
    relatedCivs: [737, 738, 746]
  },
  745: {
    locationType: "A",
    tags: ["ava", "burma", "myanmar", "pagan-successor", "burmese-literature", "shan"],
    keyFacts: ["Claimed Pagan legacy, competed with Mon kingdom of Pegu", "Major centre of classical Burmese literary culture", "Shan states fragmented Ava's authority in 1520s", "City of Inwa retained symbolic royal legitimacy for centuries"],
    researchers: [],
    relatedCivs: [645, 746, 747]
  },
  746: {
    locationType: "A",
    tags: ["toungoo", "burma", "myanmar", "bayinnaung", "largest-southeast-asian-empire", "buddhism"],
    keyFacts: ["Largest empire in Southeast Asian history at peak under Bayinnaung 1560s", "Pegu capital described by Europeans as most magnificent city in Asia", "Bayinnaung required conquered rulers to adopt Buddhist practices", "Restored Toungoo dynasty ruled more compact Burma until Konbaung 1752"],
    researchers: [],
    relatedCivs: [745, 747, 738]
  },
  747: {
    locationType: "A",
    tags: ["konbaung", "burma", "myanmar", "alaungpaya", "ayutthaya-sack", "british-colonialism"],
    keyFacts: ["Conquered and sacked Ayutthaya Kingdom 1767", "Three Anglo-Burmese Wars 1824–1885 progressively annexed Burma to British India", "King Mindon Min founded Mandalay and convened Fifth Buddhist Council", "Last king Thibaw exiled to India 1885 ending Burmese monarchy"],
    researchers: [],
    relatedCivs: [746, 738, 736]
  },
  748: {
    locationType: "A",
    tags: ["ryukyu", "okinawa", "maritime-trade", "japan-china", "bridge-culture", "shuri-castle"],
    keyFacts: ["Maintained simultaneous tributary relations with China, Japan, Korea, and Southeast Asian states", "Flag declared Ryukyu 'a product of China and Japan' — deliberate bridge identity", "Satsuma domain invaded 1609 while maintaining fiction of independence for trade", "Formally annexed as Okinawa Prefecture 1879"],
    researchers: [],
    relatedCivs: [749, 756, 741]
  },
  749: {
    locationType: "A",
    tags: ["joseon", "korea", "confucian", "hangul", "sejong", "yi-dynasty"],
    keyFacts: ["King Sejong invented hangul alphabet 1443–1446 — one of most rationally designed scripts ever created", "Longest-lived Yi dynasty — over 5 centuries of Neo-Confucian governance", "Survived Japanese Imjin War 1592–1598 and Manchu invasions 1620s–1630s", "Became Korean Empire 1897; ended with Japanese annexation 1910"],
    researchers: [],
    relatedCivs: [750, 751, 748]
  },
  750: {
    locationType: "A",
    tags: ["goryeo", "korea", "celadon", "tripitaka-koreana", "buddhist", "mongol-occupation"],
    keyFacts: ["Gave Korea its modern name", "Goryeo celadon — finest expression of Korean ceramic tradition", "Tripitaka Koreana — 80,000+ wooden printing blocks, most complete Buddhist canon in existence", "Survived nearly a century of Mongol domination"],
    researchers: [],
    relatedCivs: [751, 749, 754]
  },
  751: {
    locationType: "A",
    tags: ["silla", "korea", "unified", "gyeongju", "buddhist", "seokguram"],
    keyFacts: ["Unified Korean peninsula for first time 668 CE in alliance with Tang China", "Gyeongju was among world's largest cities — population approaching 1 million", "Seokguram grotto Buddha carved c.774 CE — breathtaking technical refinement", "Last Silla king submitted to Goryeo 935 CE"],
    researchers: [],
    relatedCivs: [750, 752, 753]
  },
  752: {
    locationType: "A",
    tags: ["goguryeo", "korea", "manchuria", "sui-invasions", "tomb-murals", "three-kingdoms"],
    keyFacts: ["Repelled three massive Chinese Sui dynasty invasions — contributed to Sui collapse", "Tomb murals among most vivid surviving records of early Korean civilisation", "Transmitted Buddhism and Chinese script to Japan via Baekje", "Destroyed by Tang-Silla alliance 668 CE"],
    researchers: [],
    relatedCivs: [751, 753, 756]
  },
  753: {
    locationType: "A",
    tags: ["baekje", "korea", "japan-cultural-transmission", "buddhism", "three-kingdoms", "maritime"],
    keyFacts: ["Primary channel through which Buddhism and Chinese culture reached Japan", "Mireuksa Temple — largest Buddhist temple in East Asia at construction", "Most internationally connected of the Three Kingdoms", "Fell to Silla-Tang alliance 660 CE but cultural legacy in Japan endured"],
    researchers: [],
    relatedCivs: [752, 751, 755]
  },
  754: {
    locationType: "A",
    tags: ["balhae", "manchuria", "korea", "goguryeo-successor", "tang-tributary", "khitan"],
    keyFacts: ["Japan called Balhae 'flourishing land of the East'", "Tang China called it 'sea of prosperity'", "Active diplomatic and commercial relations with Tang and Japan", "Destroyed by Khitan Liao dynasty in single campaign 926 CE"],
    researchers: [],
    relatedCivs: [752, 750, 756]
  },
  755: {
    locationType: "A",
    tags: ["gaya", "iron", "korea", "confederacy", "nakdong", "japan-relations"],
    keyFacts: ["Primary iron-producing region supplying Korean peninsula and Japan", "Gaya iron techniques influenced Korean and Japanese metallurgy for centuries", "Close cultural and commercial ties with Wa polities of western Japan", "Progressively absorbed by Silla; final polity subjugated 562 CE"],
    researchers: [],
    relatedCivs: [751, 753, 752]
  },
  756: {
    locationType: "A",
    tags: ["tang", "china", "chang-an", "silk-road", "poetry", "cosmopolitan", "golden-age"],
    keyFacts: ["Chang'an — most populous and culturally diverse city in the world at peak", "Li Bai and Du Fu — Tang poetry remains model of classical Chinese literary culture", "An Lushan Rebellion 755–763 CE marked beginning of decline", "Tang artistic styles spread across East and Central Asia with remarkable speed"],
    researchers: [],
    relatedCivs: [757, 756, 752]
  },
  757: {
    locationType: "A",
    tags: ["song", "china", "gunpowder", "printing", "compass", "paper-money", "economic-revolution"],
    keyFacts: ["Gunpowder weapons, movable type printing, magnetic compass, and paper money all innovated within a single century", "GDP estimated at approximately 30% of global production", "Iron output exceeded 18th-century England", "Fell to Mongol Yuan 1279 after heroic resistance using world's first naval cannons"],
    researchers: [],
    relatedCivs: [756, 760, 758]
  },
  758: {
    locationType: "A",
    tags: ["ming", "china", "zheng-he", "forbidden-city", "wall", "restoration"],
    keyFacts: ["Zheng He's fleet vessels four times the size of Columbus's ships 1405–1433", "Forbidden City — world's largest palace complex, 980 buildings, 180 acres", "Population more than doubled to approximately 200 million by dynasty's end", "Collapsed under peasant rebellion, Manchu pressure, and Little Ice Age agricultural disruption"],
    researchers: [],
    relatedCivs: [760, 759, 757]
  },
  759: {
    locationType: "A",
    tags: ["qing", "china", "manchu", "opium-wars", "qianlong", "dream-of-red-chamber"],
    keyFacts: ["Largest territorial empire in Chinese history under Qianlong — 13 million sq km", "Siku Quanshu — largest collection of books in Chinese history at 36,000 volumes", "Taiping Rebellion 20–30 million deaths — one of history's deadliest civil wars", "Xinhai Revolution 1911–1912 ended 2,132-year-old Chinese imperial system"],
    researchers: [],
    relatedCivs: [758, 760, 732]
  },
  760: {
    locationType: "A",
    tags: ["yuan", "mongol", "china", "kublai-khan", "marco-polo", "pax-mongolica"],
    keyFacts: ["First time all of China ruled by non-Han dynasty", "Marco Polo described Khanbaliq court with barely credible superlatives", "Pax Mongolica enabled unprecedented long-distance trade and cultural exchange", "Overthrown by Han Chinese rebel Zhu Yuanzhang who founded Ming dynasty 1368"],
    researchers: [],
    relatedCivs: [757, 758, 759]
  },
// ============================================================
// PHASE 5al APPEND — data-extended.js
// IDs 761–790
// Append to END of CIV_META object in data-extended.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  761: {
    locationType: "A",
    tags: ["han", "china", "silk-road", "confucianism", "paper", "seismoscope"],
    keyFacts: ["Majority ethnic group of China still called Han today", "Invented paper c.105 CE under court eunuch Cai Lun", "Sima Qian's Shiji — foundational text of Chinese historiography", "Established Silk Road as formal commercial route"],
    researchers: [],
    relatedCivs: [762, 763, 765]
  },
  762: {
    locationType: "A",
    tags: ["qin", "china", "first-emperor", "terracotta-army", "great-wall", "unification"],
    keyFacts: ["Terracotta Army — approximately 8,000 life-sized ceramic soldiers", "Standardised weights, measures, coinage, axle widths, and script across former seven kingdoms", "Ancient accounts describe model empire with rivers of flowing mercury in tomb", "Dynasty lasted only 15 years after First Emperor's death despite transformative impact"],
    researchers: [],
    relatedCivs: [761, 763, 765]
  },
  763: {
    locationType: "A",
    tags: ["zhou", "china", "mandate-of-heaven", "confucius", "hundred-schools", "longest-dynasty"],
    keyFacts: ["Longest-reigning dynasty in Chinese history — nearly 8 centuries", "Mandate of Heaven concept — foundational legitimising principle for 3,000 years", "Confucius, Laozi, Sunzi, Mencius, Zhuangzi all emerged during Eastern Zhou", "Last Zhou king deposed by Qin 256 BCE"],
    researchers: [],
    relatedCivs: [762, 764, 761]
  },
  764: {
    locationType: "A",
    tags: ["shang", "china", "oracle-bones", "bronze-casting", "anyang", "human-sacrifice"],
    keyFacts: ["Oracle bones confirmed the dynasty's existence after centuries of doubt", "Bronze ritual vessels among finest in world Bronze Age", "Lady Fu Hao tomb — royal consort who served as military general", "Overthrown by Zhou dynasty 1046 BCE"],
    researchers: [],
    relatedCivs: [763, 762, 765]
  },
  765: {
    locationType: "A",
    tags: ["xiongnu", "steppe", "nomadic", "mongolia", "great-wall", "mounted-archery"],
    keyFacts: ["Created first great steppe empire", "Mounted archery at full gallop — tactical superiority over Chinese infantry", "Han dynasty paid massive tributary payments of silk and grain as protection", "Relationship to later Hunnic peoples remains debated"],
    researchers: [],
    relatedCivs: [766, 767, 772]
  },
  766: {
    locationType: "A",
    tags: ["rouran", "steppe", "mongolia", "khagan-title", "nomadic", "avars"],
    keyFacts: ["Introduced title of khagan — subsequently adopted by all major steppe rulers", "Likely ancestors or relatives of Avars who invaded Europe", "Rouran military pressure contributed to fragmentation of northern China", "Destroyed by former Göktürk vassals 552–555 CE"],
    researchers: [],
    relatedCivs: [765, 767, 768]
  },
  767: {
    locationType: "A",
    tags: ["goktürk", "turkic", "central-asia", "orkhon-inscriptions", "silk-road", "first-turkic-empire"],
    keyFacts: ["First Turkic imperial state — stretched from Manchuria to Black Sea", "Orkhon inscriptions — oldest surviving Turkic texts and earliest steppe historiography", "Engaged in diplomacy with Byzantium, Sasanian Persia, and Tang China simultaneously", "Overthrown by Uyghur Khaganate 744 CE"],
    researchers: [],
    relatedCivs: [766, 768, 769]
  },
  768: {
    locationType: "A",
    tags: ["uyghur", "steppe", "mongolia", "manichaeism", "uyghur-script", "tang-ally"],
    keyFacts: ["Allied with Tang to suppress An Lushan Rebellion 755–763 CE", "Khagan Bögü converted to Manichaeism c.762 CE — rare official state adoption", "Uyghur script became basis of Mongol and Manchu writing systems", "Destroyed by Yenisei Kirghiz 840 CE"],
    researchers: [],
    relatedCivs: [767, 769, 756]
  },
  769: {
    locationType: "A",
    tags: ["khitan", "liao", "manchuria", "dual-administration", "cathay", "undeciphered-script"],
    keyFacts: ["Developed dual administrative system for nomadic and settled populations", "Khitan script remains only partially deciphered", "Persian and Arabic word for China — Cathay — derives from Khitan", "Destroyed by Jurchen Jin dynasty 1125 CE"],
    researchers: [],
    relatedCivs: [770, 771, 756]
  },
  770: {
    locationType: "A",
    tags: ["jurchen", "jin", "manchuria", "china", "song-conquest", "mongol-destruction"],
    keyFacts: ["Destroyed Khitan Liao and conquered northern China from Song dynasty", "Developed both large and small Jurchen writing scripts", "Mongol-Jin wars caused population of northern China to fall by estimated 30–40 million", "Last Jin emperor committed suicide at fall of Caizhou 1234 CE"],
    researchers: [],
    relatedCivs: [769, 771, 772]
  },
  771: {
    locationType: "A",
    tags: ["western-xia", "tangut", "silk-road", "gansu", "undeciphered-script", "mongol-destruction"],
    keyFacts: ["Controlled the critical Gansu corridor chokepoint of the eastern Silk Road", "Tangut script — 6,000+ characters, remained undeciphered until 20th century", "Distinctive Buddhist art synthesising Chinese, Tibetan, and Central Asian elements", "Completely destroyed by Genghis Khan's final campaign 1227 — civilisation obliterated"],
    researchers: [],
    relatedCivs: [772, 769, 770]
  },
  772: {
    locationType: "A",
    tags: ["mongol", "genghis-khan", "largest-land-empire", "pax-mongolica", "marco-polo", "silk-road"],
    keyFacts: ["Largest contiguous land empire in world history — 24 million sq km", "Destruction of Baghdad 1258 killed estimated 30–40 million across campaigns", "Pax Mongolica enabled greatest pre-colonial long-distance cultural exchange", "Fragmented after Möngke Khan 1259 into four successor khanates"],
    researchers: [],
    relatedCivs: [773, 774, 760]
  },
  773: {
    locationType: "A",
    tags: ["golden-horde", "mongol", "russia", "tatar-yoke", "islam", "pontic-steppe"],
    keyFacts: ["Controlled Russian principalities requiring princes to receive yarlyks at Sarai", "'Tatar Yoke' — formative trauma influencing Russian political culture", "Converted to Islam under Khan Özbeg 1313 CE", "Timur's campaigns 1395–1396 fatally fragmented the Horde"],
    researchers: [],
    relatedCivs: [772, 774, 693]
  },
  774: {
    locationType: "A",
    tags: ["ilkhanate", "mongol", "persia", "baghdad-destruction", "rashid-al-din", "persian-renaissance"],
    keyFacts: ["Hulagu Khan destroyed Baghdad and ended Abbasid Caliphate 1258", "Converted to Islam under Ghazan Khan 1295", "Rashid al-Din's Jami al-Tawarikh — first genuine world history", "Fragmented after Ghazan's death 1335 with no clear successor"],
    researchers: [],
    relatedCivs: [772, 773, 775]
  },
  775: {
    locationType: "A",
    tags: ["timurid", "timur", "samarkand", "central-asia", "persian-art", "miniature-painting"],
    keyFacts: ["Timur deported craftsmen from Delhi, Baghdad, Damascus to build Samarkand", "Timurid astronomical tables used by European navigators for a century", "Bibi-Khanym Mosque, Registan, Gur-e-Amir among greatest Islamic monuments", "Overthrown by Uzbek Shaybanids; descendant Babur founded Mughal dynasty"],
    researchers: [],
    relatedCivs: [774, 776, 732]
  },
  776: {
    locationType: "A",
    tags: ["safavid", "persia", "shia-islam", "isfahan", "shah-abbas", "iran"],
    keyFacts: ["Imposed Twelver Shia Islam — created modern Sunni-Shia geopolitical fault line", "Naqsh-e Jahan Square Isfahan — one of UNESCO's largest public squares", "Extraordinary achievements in carpet weaving, tilework, and miniature painting", "Overthrown by Afghan Ghilzai invaders 1722"],
    researchers: [],
    relatedCivs: [775, 777, 682]
  },
  777: {
    locationType: "A",
    tags: ["ottoman", "constantinople", "suleiman", "mimar-sinan", "millet-system", "gunpowder-empire"],
    keyFacts: ["Mehmed II's conquest of Constantinople 1453 stimulated European maritime Age of Discovery", "Millet system granted autonomy to Christian and Jewish communities", "Mimar Sinan's Süleymaniye and Selimiye mosques — pinnacles of Islamic architecture", "Dissolution after WWI defeat led to modern Republic of Turkey 1923"],
    researchers: [],
    relatedCivs: [776, 778, 687]
  },
  778: {
    locationType: "A",
    tags: ["mamluk", "egypt", "slave-soldier", "ain-jalut", "crusades", "ibn-khaldun"],
    keyFacts: ["Halted Mongol advance at Battle of Ain Jalut 1260 — first decisive defeat of Mongol army in open battle", "Preserved Abbasid Caliphate as ceremonial institution in Cairo", "Ibn Khaldun developed theory of historical sociology in Muqaddimah in Cairo", "Conquered by Ottoman Sultan Selim I 1517"],
    researchers: [],
    relatedCivs: [779, 780, 777]
  },
  779: {
    locationType: "A",
    tags: ["ayyubid", "saladin", "jerusalem", "crusades", "kurdish", "levant"],
    keyFacts: ["Saladin recaptured Jerusalem from Crusaders 1187 CE", "Chivalrous conduct toward defeated enemies created legendary pan-Mediterranean reputation", "Deliberately administered as loose family confederation of principalities", "Mamluk slave soldiers Ayyubids themselves had recruited overthrew them 1250"],
    researchers: [],
    relatedCivs: [780, 778, 781]
  },
  780: {
    locationType: "A",
    tags: ["crusader", "jerusalem", "levant", "knights-templar", "cultural-exchange", "medieval"],
    keyFacts: ["Transmitted Islamic science, philosophy, and technology to Western Europe", "Military orders — Templars, Hospitallers, Teutonic Knights — remarkable institutional innovations", "Decimal mathematics, advanced surgery, paper manufacture transmitted to Europe via Crusader contact", "Fall of Acre 1291 ended last Crusader presence in Holy Land"],
    researchers: [],
    relatedCivs: [779, 781, 787]
  },
  781: {
    locationType: "A",
    tags: ["seljuk", "turkic", "manzikert", "anatolia", "nizam-al-mulk", "madrasa"],
    keyFacts: ["Battle of Manzikert 1071 CE opened Anatolia to Turkic settlement — set path to Ottoman Empire", "Nizam al-Mulk founded world's first systematic state-funded higher education network", "Fostered career of Omar Khayyam — poet and mathematician", "Rapid fragmentation after Nizam al-Mulk assassination 1092 CE"],
    researchers: [],
    relatedCivs: [782, 777, 683]
  },
  782: {
    locationType: "A",
    tags: ["abbasid", "baghdad", "house-of-wisdom", "golden-age", "islam", "translation-movement"],
    keyFacts: ["House of Wisdom — greatest intellectual institution of medieval world", "Islamic Golden Age — foundations of modern mathematics, astronomy, medicine", "Political power reduced to ceremonial by 10th century while remaining symbolic heart of Sunni Islam", "Hulagu Khan sacked Baghdad 1258 — river reportedly ran black with ink from dumped books"],
    researchers: [],
    relatedCivs: [783, 781, 778]
  },
  783: {
    locationType: "A",
    tags: ["umayyad", "damascus", "islamic-expansion", "dome-of-rock", "tours-poitiers", "caliphate"],
    keyFacts: ["First hereditary Islamic dynasty — largest empire on Earth at peak", "Stopped at Battle of Tours/Poitiers 732 CE by Charles Martel", "Dome of the Rock and Umayyad Mosque Damascus among greatest Islamic monuments", "Overthrown by Abbasid Revolution 750 CE; one survivor founded Umayyad emirate in al-Andalus"],
    researchers: [],
    relatedCivs: [784, 782, 785]
  },
  784: {
    locationType: "A",
    tags: ["rashidun", "caliphate", "arabia", "islamic-expansion", "umar", "sunni-shia-split"],
    keyFacts: ["Islam expanded from Arabian Peninsula to Egypt, Syria, Iraq, Persia in three decades", "Caliph Umar established diwan system and garrison cities — institutional foundations of later caliphates", "Rapid conquest facilitated by exhaustion of Byzantine and Sasanian empires", "Uthman's murder and Ali-Muawiyah civil war produced Sunni-Shia split"],
    researchers: [],
    relatedCivs: [783, 782, 779]
  },
  785: {
    locationType: "A",
    tags: ["al-andalus", "islamic-spain", "cordoba", "convivencia", "averroes", "reconquista"],
    keyFacts: ["Córdoba under Abd al-Rahman III — Europe's largest city with 400,000+ books in library", "Street lighting in Córdoba centuries before any other European city", "Primary conduit for Greek philosophy and Islamic science to medieval Europe", "Fall of Granada 1492 ended nearly 8 centuries of Islamic presence in Iberia"],
    researchers: [],
    relatedCivs: [783, 790, 789]
  },
  786: {
    locationType: "A",
    tags: ["sundiata", "mali", "west-africa", "griots", "epic-of-sundiata", "mande"],
    keyFacts: ["Battle of Kirina 1235 CE — Sundiata defeated Sosso king Sumanguru Kante", "Epic of Sundiata — sub-Saharan Africa's great heroic epic comparable to Iliad", "Federation of existing chieftains rather than conquered subjects — politically flexible", "Founding phase preceding the Mansa Musa era recorded in archive under Mali Empire (id 694)"],
    researchers: [],
    relatedCivs: [694, 695, 697]
  },
  787: {
    locationType: "A",
    tags: ["slave-dynasty", "delhi", "india", "qutb-minar", "aibak", "islamic"],
    keyFacts: ["Qutb Minar — 73-metre minaret, tallest brick minaret in the world", "Founded first permanent Islamic state in Indian subcontinent", "Sultan Iltutmish secured recognition from Abbasid Caliph in Baghdad", "Dynasty ended when nobles placed Jalal ud-Din Khalji on throne 1290"],
    researchers: [],
    relatedCivs: [733, 732, 781]
  },
  788: {
    locationType: "A",
    tags: ["fatimid", "cairo", "ismaili", "al-azhar", "shia", "rock-crystal"],
    keyFacts: ["Founded al-Azhar University 969 CE — oldest continuously operating university in the world", "Established rival Shia caliphate challenging Abbasid Sunni hegemony", "Extraordinary achievements in rock crystal carving, metalwork, and textiles", "Abolished by Saladin 1171 CE who converted al-Azhar to Sunni institution"],
    researchers: [],
    relatedCivs: [782, 778, 779]
  },
  789: {
    locationType: "A",
    tags: ["byzantine-successor", "nicaea", "trebizond", "fourth-crusade", "palaeologos", "rome-legacy"],
    keyFacts: ["Emerged after Fourth Crusade's catastrophic sack of Constantinople 1204", "Empire of Nicaea reconquered Constantinople 1261 under Michael VIII Palaeologos", "Empire of Trebizond — last ember of Roman imperial tradition, fell to Ottomans 1461", "1204 sack by fellow Christians considered one of medieval history's greatest betrayals"],
    researchers: [],
    relatedCivs: [687, 777, 785]
  },
  790: {
    locationType: "A",
    tags: ["almohad", "berber", "morocco", "al-andalus", "averroes", "maimonides", "reconquista"],
    keyFacts: ["Almohad Córdoba produced both Averroes and Maimonides despite religious intolerance forcing their exile", "Averroes' Aristotle commentaries — primary vehicle reintroducing Aristotle to Western Europe", "Battle of Las Navas de Tolosa 1212 CE — decisive turning point in Reconquista", "Dissolved into competing Berber dynasties by 1269"],
    researchers: [],
    relatedCivs: [785, 783, 789]
  },
// ============================================================
// PHASE 5am APPEND — data-extended.js
// IDs 791–820
// Append to END of CIV_META object in data-extended.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  791: {
    locationType: "A",
    tags: ["almoravid", "berber", "morocco", "al-andalus", "ribat", "sahara", "reconquista"],
    keyFacts: ["Defeated Alfonso VI of Castile at Battle of Sagrajas 1086, reversing Reconquista momentum", "Origins in a ribat monastery-garrison on Senegal River island", "Founded on strict Maliki Islamic reform", "Overthrown by even more puritanical Almohad movement"],
    researchers: [],
    relatedCivs: [790, 793, 785]
  },
  792: {
    locationType: "A",
    tags: ["hafsid", "tunisia", "north-africa", "ibn-khaldun", "maliki", "berber"],
    keyFacts: ["Longest-lived Almohad successor state — over three centuries", "Ibn Khaldun born in Hafsid Tunis 1332 CE — intellectual environment shaped his methodology", "Tunis medina's iwan-and-courtyard architecture still characterises the city", "Conquered by Ottomans 1574"],
    researchers: [],
    relatedCivs: [793, 797, 777]
  },
  793: {
    locationType: "A",
    tags: ["marinid", "morocco", "fez", "ibn-battuta", "madrasa", "berber"],
    keyFacts: ["Bou Inania Madrasa in Fez — finest example of Moroccan Islamic architecture", "Patronised Ibn Battuta who departed Tangier 1325 CE", "Multiple attempts to recover al-Andalus across Strait of Gibraltar", "Overthrown by Wattasid dynasty 1465"],
    researchers: [],
    relatedCivs: [791, 792, 794]
  },
  794: {
    locationType: "A",
    tags: ["zayyanid", "tlemcen", "algeria", "trans-saharan", "berber", "north-africa"],
    keyFacts: ["Maintained independence between larger Marinid and Hafsid neighbours for over 3 centuries", "Tlemcen positioned on major trans-Saharan gold and enslaved people trade routes", "Sophisticated court culture combining Andalusian and Berber traditions", "Last sultan submitted to Ottoman overlordship 1556"],
    researchers: [],
    relatedCivs: [793, 792, 790]
  },
  795: {
    locationType: "A",
    tags: ["idrisid", "morocco", "fez", "founding", "shia-sympathetic", "alid"],
    keyFacts: ["Idris I descended from Ali ibn Abi Talib — fled Abbasid massacre", "Idris II founded Fez 808–809 CE — considered foundational moment of Moroccan civilisation", "Qarawiyyin mosque-university founded 859 CE by Fatima al-Fihri — oldest continuously operating university", "Fragmented after 928 CE; nominal authority ended 974"],
    researchers: [],
    relatedCivs: [793, 791, 796]
  },
  796: {
    locationType: "A",
    tags: ["aghlabid", "tunisia", "sicily", "abbasid-autonomous", "rome-raid", "north-africa"],
    keyFacts: ["Conquered Sicily 827–902 CE creating multicultural Islamic emirate", "Raided Italian mainland reaching Rome 846 CE — sacked Basilica of Saint Peter", "Great Mosque of Kairouan substantially rebuilt under Aghlabids", "Overthrown by Fatimid revolution 909 CE"],
    researchers: [],
    relatedCivs: [795, 788, 792]
  },
  797: {
    locationType: "A",
    tags: ["zirid", "berber", "tunisia", "banu-hilal", "arabisation", "north-africa"],
    keyFacts: ["Declared independence from Fatimids 1048 CE provoking Banu Hilal migration", "Banu Hilal migration fundamentally Arabised the Maghreb — Ibn Khaldun compared it to locusts", "Granada branch produced Jewish vizier-poet Samuel ibn Naghrela", "Last Zirid authority ended by Almohads 1148"],
    researchers: [],
    relatedCivs: [796, 792, 788]
  },
  798: {
    locationType: "A",
    tags: ["hammadid", "algeria", "berber", "qalat-banu-hammad", "saharan-trade", "north-africa"],
    keyFacts: ["Capital Qal'at Banu Hammad now a UNESCO World Heritage Site", "Remarkably preserved remains of medieval Islamic palace city abandoned in 12th century", "Controlled central Saharan trade routes and Tell Atlas agricultural zone", "Conquered by Almohads 1152 CE"],
    researchers: [],
    relatedCivs: [797, 794, 790]
  },
  799: {
    locationType: "A",
    tags: ["sokoto", "fulani", "nigeria", "jihad", "dan-fodio", "west-africa", "islamic"],
    keyFacts: ["Largest state in 19th-century sub-Saharan Africa", "Usman dan Fodio's jihad began 1804 — combined religious reform and Fulani ethnic grievances", "System of emirates including Kano, Gwandu, Zaria balanced Islamic law and Hausa commerce", "British defeat of last caliph at Battle of Burmi 1903 shaped northern Nigerian politics to present"],
    researchers: [],
    relatedCivs: [800, 802, 694]
  },
  800: {
    locationType: "A",
    tags: ["kanem-bornu", "lake-chad", "saharan-trade", "nigeria", "africa", "longevity"],
    keyFacts: ["One of longest-lived political entities in African history — 12 centuries", "Controlled central trans-Saharan Fezzan corridor to Libya and Egypt", "Royal correspondence among most remarkable diplomatic documents from medieval sub-Saharan Africa", "British and French colonial partition of Lake Chad basin 1900 ended independence"],
    researchers: [],
    relatedCivs: [799, 676, 694]
  },
  801: {
    locationType: "A",
    tags: ["wolof", "senegal", "senegambia", "atlantic-coast", "portuguese-contact", "griots"],
    keyFacts: ["Political structure encountered by first Portuguese explorers on West African coast 1440s", "Highly stratified society with hereditary professional castes including griots and blacksmiths", "Wolof language served as trade lingua franca across Senegambia", "French colonial expansion from Saint-Louis progressively annexed kingdoms through 19th century"],
    researchers: [],
    relatedCivs: [697, 694, 802]
  },
  802: {
    locationType: "A",
    tags: ["dahomey", "benin-republic", "agojie", "female-warriors", "slave-trade", "west-africa"],
    keyFacts: ["Agojie female warriors — only permanent female military institution in documented world history", "Annual Customs ceremony included large-scale human sacrifice", "Deeply embedded in Atlantic slave trade — exchanged captives for firearms", "French colonial forces conquered kingdom 1894 despite fierce Agojie resistance"],
    researchers: [],
    relatedCivs: [803, 668, 799]
  },
  803: {
    locationType: "A",
    tags: ["ashanti", "ghana", "golden-stool", "akan", "gold", "west-africa"],
    keyFacts: ["Golden Stool — Sika Dwa Kofi — descended from heaven embodying soul of Ashanti nation", "Gold mining and kola nut trade made Asantehene among wealthiest rulers in West Africa", "Sophisticated military with road network for rapid troop concentration", "Four Anglo-Ashanti Wars 1823–1900 before British annexation as Gold Coast 1901"],
    researchers: [],
    relatedCivs: [802, 668, 694]
  },
  804: {
    locationType: "A",
    tags: ["zulu", "shaka", "south-africa", "mfecane", "iklwa", "amabutho"],
    keyFacts: ["Shaka replaced throwing spear with iklwa stabbing spear plus cowhide shield", "Age-grade amabutho regiments forbidden to marry until honoured in battle", "Mfecane displaced millions and reshaped political map of southern Africa", "Anglo-Zulu War 1879 included catastrophic British defeat at Isandlwana"],
    researchers: [],
    relatedCivs: [805, 809, 666]
  },
  805: {
    locationType: "A",
    tags: ["ndwandwe", "south-africa", "mfecane", "zwide", "nguni", "mhlatuze"],
    keyFacts: ["Principal rival of rising Zulu state — peer military power", "Battle of Mhlatuze River 1820 — pivotal engagement securing Zulu supremacy", "Escaped generals founded Gaza Kingdom in Mozambique and Jere kingdom spreading Nguni military revolution", "Finally destroyed by Shaka's forces 1826"],
    researchers: [],
    relatedCivs: [804, 809, 674]
  },
  806: {
    locationType: "A",
    tags: ["merina", "madagascar", "expansion", "andrianampoinimerina", "british-alliance", "africa"],
    keyFacts: ["Andrianampoinimerina declared 'the sea shall be the boundary of my rice field'", "Radama I extended authority over approximately two thirds of Madagascar", "1817 British treaty abolished slave trade in exchange for military training and recognition", "Expansion phase preceding later colonial period recorded as id 671"],
    researchers: [],
    relatedCivs: [671, 680, 804]
  },
  807: {
    locationType: "A",
    tags: ["funj", "sinnar", "sudan", "blue-nile", "sufism", "islamic-africa"],
    keyFacts: ["Controlled confluence of Blue and White Niles for over 3 centuries", "Enigmatic people of uncertain origin who created distinctive Sudanese Islamic identity", "Sinnar became major centre of Sufi mysticism and Islamic scholarship", "Egyptian forces under Khedive Muhammad Ali conquered sultanate 1821"],
    researchers: [],
    relatedCivs: [664, 649, 800]
  },
  808: {
    locationType: "A",
    tags: ["kuba", "kasai", "congo", "raffia-cloth", "ndop", "geometric-art", "africa"],
    keyFacts: ["Renowned for ndop royal portrait statues and elaborate raffia cloth geometric patterns", "Founding myth credits culture hero Shyaam aMbul aNgoong with introducing maize and distinctive aesthetic", "Constitutional structure balancing Nyim (king) against title-holder councils", "Belgian colonial penetration of Kasai c.1900 ended independence"],
    researchers: [],
    relatedCivs: [672, 673, 809]
  },
  809: {
    locationType: "A",
    tags: ["rozvi", "zimbabwe", "shona", "expels-portuguese", "dry-stone", "mhondoro"],
    keyFacts: ["Expelled Portuguese from inland trading posts (feira) in 1690s campaigns", "Ruled from series of stone-walled zimbabwe across the plateau", "Khami near Bulawayo designated UNESCO World Heritage Site", "Destroyed by Nguni raiding armies during Mfecane upheaval 1830s"],
    researchers: [],
    relatedCivs: [674, 804, 666]
  },
  810: {
    locationType: "A",
    tags: ["solomonic", "ethiopia", "kebra-nagast", "ark-of-covenant", "adwa", "africa", "haile-selassie"],
    keyFacts: ["Longest-lasting royal dynasty in world history — seven centuries 1270–1974", "Kebra Nagast narrates Menelik I bringing Ark of Covenant from Jerusalem to Ethiopia", "Only African state to successfully defeat a European colonial power at Battle of Adwa 1896", "Haile Selassie deposed by Derg military council 1974"],
    researchers: [],
    relatedCivs: [649, 646, 648]
  },
  811: {
    locationType: "A",
    tags: ["inca", "tawantinsuyu", "andes", "khipu", "road-system", "peru"],
    keyFacts: ["Over 40,000 km of paved highway across the Andes — one of antiquity's greatest engineering achievements", "Khipu knotted cord system — possible narrative encoding not yet fully decoded", "Administered population of perhaps 12 million without conventional writing system", "Pizarro's conquest with fewer than 200 men — one of history's most consequential military asymmetries"],
    researchers: [],
    relatedCivs: [820, 812, 819]
  },
  812: {
    locationType: "A",
    tags: ["aztec", "tenochtitlan", "triple-alliance", "chinampas", "mexico", "human-sacrifice"],
    keyFacts: ["Tenochtitlan population exceeded 200,000 — larger than any contemporary European city", "Chinampas floating gardens supplied fresh produce to dense urban population", "Flower wars (xochiyaoyotl) fought specifically to capture enemies for ritual sacrifice", "Cortés allied with resentful subject peoples to besiege and destroy Tenochtitlan 1521"],
    researchers: [],
    relatedCivs: [815, 816, 813]
  },
  813: {
    locationType: "A",
    tags: ["maya", "classic", "tikal", "palenque", "hieroglyphics", "long-count-calendar"],
    keyFacts: ["Only fully developed writing system in pre-Columbian Americas", "Maya Long Count calendar tracks time from mythological creation date equivalent to 3114 BCE", "Eclipse prediction and Venus tracking matched precision of no contemporary civilisation", "Terminal Classic collapse 800–900 CE — abandonment of dozens of cities remains debated"],
    researchers: [],
    relatedCivs: [814, 815, 816]
  },
  814: {
    locationType: "A",
    tags: ["chichen-itza", "maya", "postclassic", "yucatan", "sacred-cenote", "el-castillo"],
    keyFacts: ["El Castillo pyramid creates shadow-serpent illusion at spring and autumn equinoxes", "Sacred Cenote — pilgrimage destination across Maya world; thousands of ritual objects recovered", "Remarkable synthesis of Maya and Toltec-influenced artistic traditions", "Political dominance collapsed c.1221 CE following internal conflicts"],
    researchers: [],
    relatedCivs: [813, 815, 816]
  },
  815: {
    locationType: "A",
    tags: ["toltec", "tula", "quetzalcoatl", "chacmool", "mexico", "mesoamerica"],
    keyFacts: ["Aztec word for artisan — toltecatl — derived from Toltec ethnic name", "Chacmool figures, atlantean warrior columns spread across Mesoamerica", "Quetzalcoatl myth possibly exploited by Cortés when Moctezuma associated him with returning god", "Collapsed c.1150 CE under drought, internal conflict, and northern nomadic incursions"],
    researchers: [],
    relatedCivs: [816, 812, 814]
  },
  816: {
    locationType: "A",
    tags: ["teotihuacan", "pyramid-of-sun", "avenue-of-dead", "mexico", "mystery", "obsidian-trade"],
    keyFacts: ["Population 125,000–200,000 — largest city in pre-Columbian Americas", "Builders' identity, language, and ethnicity remain completely unknown", "Pyramids aligned to Pleiades rising and summer solstice sunset", "Deliberately burned and partially destroyed c.550 CE — probable internal uprising against elite"],
    researchers: [],
    relatedCivs: [815, 813, 817]
  },
  817: {
    locationType: "A",
    tags: ["zapotec", "monte-alban", "oaxaca", "earliest-writing", "mesoamerica", "calendar"],
    keyFacts: ["Monte Albán — one of first true cities in the Americas, built on artificially levelled mountain summit", "One of earliest writing systems in Americas — predates Maya script", "260-day ritual calendar became template for subsequent Mesoamerican civilisations", "Building L depicts tortured captives — early evidence of sacrificial warfare practices"],
    researchers: [],
    relatedCivs: [818, 816, 815]
  },
  818: {
    locationType: "A",
    tags: ["mixtec", "oaxaca", "codices", "eight-deer", "goldsmithing", "mexico"],
    keyFacts: ["Mixtec codices — most sophisticated screenfold manuscript tradition in pre-Columbian Mesoamerica", "Eight Deer Jaguar Claw — best-documented political biography from pre-Columbian North America", "Mixtec goldsmiths and featherworkers regarded as finest craftspeople in Mesoamerica", "Mixtec luxury goods circulated from Aztec court to Maya lowlands as prestige items"],
    researchers: [],
    relatedCivs: [817, 812, 815]
  },
  819: {
    locationType: "A",
    tags: ["tarascan", "purepecha", "michoacan", "aztec-rival", "metallurgy", "patzcuaro"],
    keyFacts: ["Only major Mesoamerican state to consistently resist Aztec military expansion", "Most sophisticated metallurgy in Mesoamerica — lost-wax casting, bronze weapons, gold and silver ornaments", "Capital Tzintzuntzan on Lake Pátzcuaro with distinctive stepped yácata platforms", "Conquered with particular brutality by Nuño de Guzmán 1529–1530"],
    researchers: [],
    relatedCivs: [812, 815, 811]
  },
  820: {
    locationType: "A",
    tags: ["chimu", "chan-chan", "peru", "adobe-city", "irrigation", "gold", "pre-inca"],
    keyFacts: ["Chan Chan — world's largest pre-Columbian city and largest adobe city ever built", "Each royal ciudadela served as palace then funerary monument of successive Chimú kings", "Inter-valley canal network transformed coastal desert into productive agricultural zone", "Inca Empire absorbed Chimú c.1470 CE inheriting administrative systems and craftsmen"],
    researchers: [],
    relatedCivs: [811, 819, 813]
  },
// ============================================================
// PHASE 5an APPEND — data-extended.js
// IDs 821–850
// Append to END of CIV_META object in data-extended.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  821: {
    locationType: "A",
    tags: ["tiwanaku", "lake-titicaca", "bolivia", "raised-fields", "megalithic", "gateway-of-sun"],
    keyFacts: ["Highest major urban centre in ancient world — 3,850 metres altitude", "Raised field suka kollus agriculture — most productive in the Americas", "Arthur Posnansky controversially dated site to c.15,000 BCE via astronomical alignments", "Collapse c.1000 CE coincided with prolonged drought in lake sediment records"],
    researchers: ["Arthur Posnansky"],
    relatedCivs: [822, 820, 811]
  },
  822: {
    locationType: "A",
    tags: ["wari", "ayacucho", "peru", "first-andean-empire", "tapestry", "administrative-centres"],
    keyFacts: ["First genuinely imperial polity in South American prehistory", "Standardised planned administrative centres anticipated Inca imperial organisation", "Extraordinary tapestry-weaving encoding rank, identity, and cosmology", "Collapsed c.1000 CE possibly related to same drought ending Tiwanaku"],
    researchers: [],
    relatedCivs: [821, 820, 811]
  },
  823: {
    locationType: "A",
    tags: ["nazca", "geoglyphs", "peru", "desert", "puquios", "von-daniken", "ancient-aliens"],
    keyFacts: ["Nazca Lines cover over 450 sq km — visible only from the air", "Mainstream interpretation: ritual pathways related to water and fertility", "Erich von Däniken suggested landing strips for extraterrestrial aircraft", "Polychrome pottery among finest in pre-Columbian South America"],
    researchers: ["Erich von Däniken"],
    relatedCivs: [822, 820, 821]
  },
  824: {
    locationType: "A",
    tags: ["cahokia", "mississippian", "monks-mound", "illinois", "north-america", "ceremonial-complex"],
    keyFacts: ["Monks Mound base larger than Great Pyramid at Giza", "Population possibly 40,000 in surrounding region — larger than contemporary London", "Big Bang expansion c.1050 CE — possible religious revival or prophetic movement", "Largely abandoned by 1350 CE — environmental degradation and climate deterioration"],
    researchers: ["Timothy Pauketat"],
    relatedCivs: [826, 827, 835]
  },
  825: {
    locationType: "A",
    tags: ["ancestral-puebloan", "chaco-canyon", "new-mexico", "great-houses", "roads", "astronomical"],
    keyFacts: ["Pueblo Bonito — largest building in present-day USA until 19th century, 650 rooms", "Engineered roads up to 9 metres wide, arrow-straight through bedrock", "Roads appear primarily ceremonial — aligned to astronomical phenomena", "Collapsed c.1150 CE after prolonged drought; descendants in modern pueblos"],
    researchers: [],
    relatedCivs: [824, 826, 827]
  },
  826: {
    locationType: "A",
    tags: ["hopewell", "ohio", "mound-builder", "exchange-network", "newark-earthworks", "lunar-alignment"],
    keyFacts: ["Newark Earthworks aligned to 18.6-year lunar standstill cycle with extraordinary precision", "Exchange network moved obsidian from Yellowstone, copper from Lake Superior across continent", "Effigy platform pipes of remarkable naturalistic sophistication", "Collapsed c.500 CE — mound building and long-distance exchange both ended within few generations"],
    researchers: [],
    relatedCivs: [827, 824, 834]
  },
  827: {
    locationType: "A",
    tags: ["adena", "ohio", "mound-builder", "great-serpent-mound", "stone-pipes", "woodland"],
    keyFacts: ["First mound-building tradition in eastern North America", "Great Serpent Mound — world's largest effigy mound, over 400 metres long", "Distinctive tubular stone pipes and engraved stone tablets", "Transition to Hopewell c.100 BCE involved intensification of exchange and ceremonial complexity"],
    researchers: [],
    relatedCivs: [826, 824, 834]
  },
  828: {
    locationType: "A",
    tags: ["olmec", "gulf-coast", "colossal-heads", "mother-culture", "mexico", "van-sertima"],
    keyFacts: ["First complex society in Mesoamerica — mother culture for Maya, Zapotec, Aztec traditions", "17 colossal basalt heads — each weighing 6 to 40 tonnes", "Ivan Van Sertima's controversial African-origin argument decisively rejected by mainstream archaeology", "San Lorenzo sites deliberately destroyed c.900 BCE — probable elite overthrow"],
    researchers: ["Ivan Van Sertima"],
    relatedCivs: [816, 817, 813]
  },
  829: {
    locationType: "A",
    tags: ["norte-chico", "caral", "peru", "oldest-americas", "no-warfare", "quipu", "pre-ceramic"],
    keyFacts: ["Oldest known complex society in the Americas — contemporary with Egyptian Old Kingdom", "No evidence of weapons, fortifications, or skeletal trauma — possible warfare-free civilisation", "Caral contains 6 platform mounds and evidence of quipu recording — without ceramics", "Abrupt abandonment c.1800 BCE coincides with climate disruption and El Niño flooding"],
    researchers: [],
    relatedCivs: [822, 820, 830]
  },
  830: {
    locationType: "A",
    tags: ["clovis", "paleo-indian", "north-america", "fluted-points", "megafauna-extinction", "pleistocene"],
    keyFacts: ["Distinctive fluted projectile points spread across two continents within approximately 1,000 years", "Associated with extinction of mammoths, mastodons, giant ground sloths, and American horses", "Pre-Clovis evidence at Monte Verde, Meadowcroft, and Buttermilk Creek now established", "Tradition ended abruptly c.11,000 BCE contemporaneous with Younger Dryas and megafaunal extinctions"],
    researchers: [],
    relatedCivs: [829, 700, 834]
  },
  831: {
    locationType: "A",
    tags: ["norse", "vinland", "newfoundland", "lanse-aux-meadows", "leif-erikson", "pre-columbian-contact"],
    keyFacts: ["L'Anse aux Meadows — incontrovertible archaeological evidence of Norse settlement c.1000 CE", "2021 study confirmed Norse presence in North America in precisely 1021 CE", "Eight Norse-style buildings, iron-working facilities, and Scandinavian bronze ring pin recovered", "Settlement failed due to hostile Skraeling relations and distance from Greenland supply lines"],
    researchers: [],
    relatedCivs: [692, 832, 833]
  },
  832: {
    locationType: "A",
    tags: ["thule", "inuit", "alaska", "arctic", "kayak", "dog-sled", "toggling-harpoon"],
    keyFacts: ["Ancestors of all modern Inuit peoples", "Expanded 4,000 km from Alaska to Greenland within approximately two centuries", "Sophisticated cold-weather technology suite — kayak, umiak, dog sled, toggling harpoon", "Encountered Norse settlers in Greenland — first sustained Old/New World contact"],
    researchers: [],
    relatedCivs: [833, 831, 692]
  },
  833: {
    locationType: "A",
    tags: ["dorset", "arctic", "canada", "miniature-sculpture", "pre-thule", "paleo-eskimo"],
    keyFacts: ["Remarkable miniature ivory and antler carvings — among most expressive prehistoric small sculptures", "Survived 2,000 years in eastern Arctic without dogs or dog sleds", "Genetically distinct from both predecessors and Thule successors", "Disappeared from most range 1000–1300 CE following Thule expansion"],
    researchers: [],
    relatedCivs: [832, 831, 827]
  },
  834: {
    locationType: "A",
    tags: ["poverty-point", "louisiana", "earthworks", "hunter-gatherer", "exchange-network", "pre-agricultural"],
    keyFacts: ["Monumental earthworks built by hunter-gatherer-fisher population — challenges agriculture prerequisite assumption", "Six concentric earthen ridges 1.2 km diameter plus largest pre-Colombian mound by volume at time", "Imported exotic materials from across eastern North America", "Function — permanent city, periodic aggregation centre, or pilgrimage site — still debated"],
    researchers: [],
    relatedCivs: [827, 826, 841]
  },
  835: {
    locationType: "A",
    tags: ["iroquois", "haudenosaunee", "six-nations", "great-law-of-peace", "wampum", "northeast"],
    keyFacts: ["Great Law of Peace proposed as influence on American Founding Fathers' political theory", "Wampum belts encoded law, treaty, and history as mnemonic records", "Bicameral council structure with mechanisms for removing leaders who violated their trust", "American Revolution split confederacy; Sullivan-Clinton campaign 1779 devastated homeland"],
    researchers: [],
    relatedCivs: [836, 837, 824]
  },
  836: {
    locationType: "A",
    tags: ["muscogee", "creek", "alabama", "georgia", "green-corn-ceremony", "red-white-towns"],
    keyFacts: ["Red/White town constitutional division — unique political structure in North American indigenous traditions", "Annual Green Corn Ceremony (Busk) — social renewal and communal forgiveness ritual", "Evolved from Mississippian mound-building tradition", "Indian Removal Act 1830 and Trail of Tears forcibly displaced Creek to Oklahoma"],
    researchers: [],
    relatedCivs: [824, 835, 837]
  },
  837: {
    locationType: "A",
    tags: ["cherokee", "sequoyah", "syllabary", "appalachian", "trail-of-tears", "cherokee-phoenix"],
    keyFacts: ["Sequoyah invented Cherokee syllabary 1809–1821 — only instance of pre-literate person independently creating writing system", "Cherokee Phoenix — first indigenous-language newspaper in North American history", "Supreme Court ruled in Cherokee favour (Worcester v Georgia 1832) but Jackson refused enforcement", "Trail of Tears 1838 — approximately 4,000 of 16,000 relocated died"],
    researchers: [],
    relatedCivs: [836, 835, 838]
  },
  838: {
    locationType: "A",
    tags: ["lakota", "sioux", "great-plains", "little-bighorn", "sitting-bull", "wounded-knee"],
    keyFacts: ["Transformed from forest people to dominant equestrian buffalo hunters within a few generations of horse acquisition", "Battle of Little Bighorn 1876 — most significant Native American military victory against US Army", "Sitting Bull and Crazy Horse annihilated Custer's Seventh Cavalry", "Wounded Knee Massacre 1890 effectively ended Lakota armed resistance"],
    researchers: [],
    relatedCivs: [839, 835, 825]
  },
  839: {
    locationType: "A",
    tags: ["apache", "southwest", "geronimo", "guerrilla", "arizona", "chiricahua"],
    keyFacts: ["Most formidable military adversaries of both Spanish colonial and US forces in the Southwest", "Apache warriors could cover 70 miles a day on foot in desert terrain", "Geronimo's band of sometimes fewer than 12 warriors tied down 5,000 US and 3,000 Mexican troops", "Final surrender 1886 officially ended Apache Wars"],
    researchers: [],
    relatedCivs: [838, 825, 819]
  },
  840: {
    locationType: "C",
    locationTheories: [
      { lat: 21.8853, lng: -105.2772, label: "Aztatlán, Nayarit — coastal northwest Mexico", source: "Aztec migration codices and local tradition", researcher: null, up: 0, dn: 0 },
      { lat: 36.9719, lng: -122.0308, label: "American Southwest — California coast", source: "Various 19th–20th century speculation", researcher: null, up: 0, dn: 0 },
      { lat: 20.9674, lng: -89.5926, label: "Yucatan / mythological island reading", source: "Nahuatl textual analysis", researcher: null, up: 0, dn: 0 },
      { lat: 33.4255, lng: -112.0740, label: "Sonoran Desert — Chichimec nomadic origin zone", source: "Archaeological distribution of Nahua-related ceramics", researcher: null, up: 0, dn: 0 }
    ],
    tags: ["theorized", "aztlan", "aztec-origin", "migration-myth", "mesoamerica", "huitzilopochtli"],
    keyFacts: ["Legendary Aztec homeland from which Mexica began migration c.1111 CE", "Physical location sought across vast area from American Southwest to Nayarit coast", "Some scholars identify Aztlan as mythological construct rather than real location", "Intersects with research into pre-Columbian Nahuatl language group migrations"],
    researchers: []
  },
  841: {
    locationType: "A",
    tags: ["poverty-point-network", "exchange", "hunter-gatherer", "copper", "eastern-north-america", "pre-ceramic"],
    keyFacts: ["Extended exchange network across eastern half of North America 2nd–1st millennia BCE", "Moved exotic materials up to 2,000 km without known political hierarchy organising exchange", "Social mechanisms — gift-giving, kinship, ceremony — maintained large-scale inter-regional interaction", "Complements Poverty Point core site (id 834) by documenting wider regional interaction sphere"],
    researchers: [],
    relatedCivs: [834, 827, 826]
  },
  842: {
    locationType: "A",
    tags: ["scotland", "kenneth-macalpin", "bannockburn", "declaration-of-arbroath", "bruce", "independence"],
    keyFacts: ["Declaration of Arbroath 1320 CE claimed as influence on American Declaration of Independence", "Robert the Bruce's victory at Bannockburn 1314 CE — most celebrated event in Scottish national memory", "Maintained independence from England for over 8 centuries", "Acts of Union 1707 merged Scotland into Kingdom of Great Britain"],
    researchers: [],
    relatedCivs: [845, 843, 691]
  },
  843: {
    locationType: "A",
    tags: ["ireland", "high-kingship", "brian-boru", "clontarf", "book-of-kells", "monastic"],
    keyFacts: ["Irish monasteries preserved classical learning through European Dark Ages", "Brian Boru's victory at Clontarf 1014 CE ended Viking dominance of Irish coastal cities", "Book of Kells c.800 CE — widely regarded as most beautiful book ever made", "Anglo-Norman invasion 1169–1170 CE ended High Kingship era"],
    researchers: [],
    relatedCivs: [844, 845, 692]
  },
  844: {
    locationType: "A",
    tags: ["merovingian", "frankish", "clovis", "gaul", "catholic", "long-haired-kings"],
    keyFacts: ["Clovis I's Catholic conversion — most consequential individual religious conversion in post-Roman European history", "Provided Catholic Church with powerful Germanic military ally against Arian kingdoms", "Long-haired kings — uncut hair symbolised divine mandate", "Last Merovingian king Childeric III deposed and shorn by Pippin the Short 751 CE"],
    researchers: [],
    relatedCivs: [691, 845, 846]
  },
  845: {
    locationType: "A",
    tags: ["anglo-saxon", "alfred-the-great", "sutton-hoo", "old-english", "england", "norman-conquest"],
    keyFacts: ["Alfred of Wessex — only English king called 'the Great'", "Sutton Hoo ship burial 625 CE — extraordinary gold and garnet jewellery assemblage", "Alfred's network of fortified burhs and the Anglo-Saxon Chronicle", "Norman Conquest 1066 transformed but did not destroy Anglo-Saxon legal and cultural traditions"],
    researchers: [],
    relatedCivs: [844, 842, 691]
  },
  846: {
    locationType: "A",
    tags: ["burgundy", "valois", "flemish-painting", "van-eyck", "golden-fleece", "medieval-europe"],
    keyFacts: ["Most culturally brilliant court in 15th-century northern Europe", "Jan van Eyck, Rogier van der Weyden worked under Burgundian patronage — transformed European painting", "Philip the Good founded Order of the Golden Fleece 1430 — most prestigious chivalric order in Europe", "Charles the Bold killed at Battle of Nancy 1477 — territories divided between France and Habsburgs"],
    researchers: [],
    relatedCivs: [691, 844, 848]
  },
  847: {
    locationType: "A",
    tags: ["hungary", "stephen-i", "holy-crown", "ottoman", "mohacs", "matthias-corvinus"],
    keyFacts: ["Holy Crown of Saint Stephen — physical embodiment of Hungarian statehood for 1,000 years", "King Matthias Corvinus assembled second largest library in Europe after Vatican", "Repelled Mongol invasion 1241–1242 but lost half the population", "Ottoman victory at Battle of Mohács 1526 began 150 years of Ottoman occupation of central Hungary"],
    researchers: [],
    relatedCivs: [848, 849, 777]
  },
  848: {
    locationType: "A",
    tags: ["polish-lithuanian", "commonwealth", "liberum-veto", "sobieski", "vienna", "elected-monarchy"],
    keyFacts: ["Liberum veto — single deputy could dissolve parliament — supreme noble liberty and fatal paralysis", "Jan Sobieski led largest cavalry charge in history at Battle of Vienna 1683 breaking Ottoman siege", "Hosted extraordinary ethnic and religious plurality — Poles, Lithuanians, Jews, Armenians, Tatars", "Partitioned three times 1772–1795 by Russia, Prussia, and Austria — Poland erased from map for 123 years"],
    researchers: [],
    relatedCivs: [849, 847, 850]
  },
  849: {
    locationType: "A",
    tags: ["lithuania", "gediminids", "pagan", "last-pagan-europe", "grunwald", "vytautas"],
    keyFacts: ["Largest state in 14th-century Europe — Baltic Sea to Black Sea", "Last pagan state in Europe to convert to Christianity — 1387 CE", "Battle of Grunwald 1410 — largest battle in medieval European history", "Unusual religious tolerance allowing Orthodox, Catholic, and pagan subjects to coexist"],
    researchers: [],
    relatedCivs: [848, 850, 693]
  },
  850: {
    locationType: "A",
    tags: ["teutonic-knights", "prussia", "baltic", "crusading-state", "grunwald", "secularisation"],
    keyFacts: ["Forced conversion and military conquest of indigenous Prussian, Latvian, and Lithuanian peoples", "Annual Reise expeditions into pagan Lithuania attracted crusading knights including Henry Bolingbroke", "Catastrophic defeat at Battle of Grunwald 1410 began century of decline", "Secularised as Lutheran duchy under Albert of Hohenzollern 1525 — ancestor of Kingdom of Prussia"],
    researchers: [],
    relatedCivs: [849, 847, 691]
  },
// ============================================================
// PHASE 5ao APPEND — data-extended.js
// IDs 851–880
// Append to END of CIV_META object in data-extended.js
// Instructions: find final }; → replace with , → paste below → ends with };
// ============================================================

  851: {
    locationType: "A",
    tags: ["holy-roman-empire", "habsburg", "thirty-years-war", "westphalia", "germany", "medieval-europe"],
    keyFacts: ["Voltaire: 'neither holy, nor Roman, nor an empire'", "Several hundred semi-sovereign territories — unique constitutional complexity", "Golden Bull 1356 formalised seven-elector college", "Thirty Years War 1618–1648 killed 15–30% of central European population; Peace of Westphalia established modern state sovereignty"],
    researchers: [],
    relatedCivs: [852, 691, 846]
  },
  852: {
    locationType: "A",
    tags: ["habsburg", "austria", "spain", "maria-theresa", "dual-monarchy", "dynastic-marriage"],
    keyFacts: ["Maxim: 'let others wage war; you, happy Austria, marry'", "Maria Theresa 1740–1780 — most effective Habsburg monarch despite lacking formal legal authority as woman", "Assembled territories spanning Spain, Americas, Low Countries, Austria, Hungary, Bohemia, Italy", "Austro-Hungarian Compromise 1867 created Dual Monarchy; dissolved 1918 after WWI"],
    researchers: [],
    relatedCivs: [851, 853, 858]
  },
  853: {
    locationType: "A",
    tags: ["spanish-empire", "first-global-empire", "silver", "potosi", "conquest", "encomienda"],
    keyFacts: ["First empire on which sun literally never set — territories on every inhabited continent", "Potosí and Zacatecas silver mines transformed global economy", "Encomienda/mita labour system combined with disease reduced Americas population from ~50–60m to ~6m", "Spanish-American War 1898 ended last colonial possessions"],
    researchers: [],
    relatedCivs: [854, 852, 811]
  },
  854: {
    locationType: "A",
    tags: ["portuguese-empire", "vasco-da-gama", "india-route", "brazil", "longest-colonial-empire", "macau"],
    keyFacts: ["Longest-lived European colonial empire — Ceuta 1415 to Macau 1999", "Vasco da Gama's 1497–1499 voyage bypassed Ottoman-controlled Silk Road", "Royal court fled to Brazil 1807–1808 — only colony to serve as capital of its metropole", "Portuguese language now spoken by over 250 million across three continents"],
    researchers: [],
    relatedCivs: [853, 855, 677]
  },
  855: {
    locationType: "A",
    tags: ["dutch-republic", "voc", "golden-age", "rembrandt", "amsterdam", "tulip-mania"],
    keyFacts: ["VOC — world's first publicly traded corporation; largest commercial enterprise in history to that point", "Dutch Golden Age painting — largest and most socially diverse body of visual art in European history", "Amsterdam pioneered futures contracts, options, and joint stock companies — foundations of modern capitalism", "Tulip mania 1636–1637 — first recorded speculative bubble in financial history"],
    researchers: [],
    relatedCivs: [854, 856, 861]
  },
  856: {
    locationType: "A",
    tags: ["british-empire", "industrial-revolution", "slave-trade", "largest-empire", "hong-kong", "colonialism"],
    keyFacts: ["Largest empire in world history — 24% of Earth's land surface, 460 million people", "Industrial Revolution beginning 1760s transformed material conditions of human existence", "British ships transported approximately 3 million enslaved Africans before abolition 1807", "Hong Kong handover to China 1997 — final act of British decolonisation"],
    researchers: [],
    relatedCivs: [855, 857, 852]
  },
  857: {
    locationType: "A",
    tags: ["french-empire", "napoleon", "mission-civilisatrice", "haiti", "algeria", "colonialism"],
    keyFacts: ["Second-largest colonial empire in world history at 20th-century peak", "Haitian Revolution 1791–1804 — only successful slave revolt producing an independent state", "Mission civilisatrice — cultural assimilation rather than indirect rule model", "Algerian independence 1962 after 8-year war — estimated 1.5 million Algerians died"],
    researchers: [],
    relatedCivs: [856, 859, 853]
  },
  858: {
    locationType: "A",
    tags: ["russian-empire", "peter-the-great", "catherine-the-great", "siberia", "third-rome", "romanov"],
    keyFacts: ["Third-largest empire in world history — 22.8 million sq km", "Peter the Great westernisation transformed Russia into recognisable European great power", "Catherine the Great founded Hermitage collection and corresponded with Voltaire and Diderot", "Bolshevik Revolution October 1917 ended Romanov dynasty and imperial system"],
    researchers: [],
    relatedCivs: [870, 852, 773]
  },
  859: {
    locationType: "A",
    tags: ["napoleon", "napoleonic-code", "france", "waterloo", "continental-system", "russian-campaign"],
    keyFacts: ["Napoleonic Code remains foundation of civil law across Europe, Latin America, and much of world", "Grande Armée of 600,000 destroyed by Russian winter 1812 — not in battle but logistics and cold", "Continental System economic blockade of Britain contributed to imperial overextension", "Hundred Days ended at Waterloo 1815 confirming defeat and Bourbon restoration"],
    researchers: [],
    relatedCivs: [857, 858, 866]
  },
  860: {
    locationType: "A",
    tags: ["naples", "sicily", "normans", "frederick-ii", "stupor-mundi", "multicultural"],
    keyFacts: ["Roger II's 12th-century court used Arabic, Greek, Latin, and Norman French simultaneously", "Al-Idrisi produced most accurate world map of medieval period under Roger II's patronage", "Frederick II — polyglot, scientist, diplomat; wrote first empirical study of falconry; repeatedly excommunicated", "Absorbed into unified Italy 1861"],
    researchers: [],
    relatedCivs: [863, 861, 687]
  },
  861: {
    locationType: "A",
    tags: ["venice", "serenissima", "republic", "arsenal", "eastern-mediterranean", "doge"],
    keyFacts: ["Most durable republic in European history — 1,100 years from 697 to 1797 CE", "Arsenal — world's first industrial complex, capable of producing a warship per day", "Stato da Mar encompassed Crete, Cyprus, Corfu, Dalmatia, and trading posts from Constantinople to Alexandria", "Napoleon dissolved the republic 1797 — last Doge Manin received news with tears"],
    researchers: [],
    relatedCivs: [862, 855, 687]
  },
  862: {
    locationType: "A",
    tags: ["genoa", "republic", "black-death", "columbus", "maritime-insurance", "mediterranean"],
    keyFacts: ["Developed earliest forms of maritime insurance, bill of exchange, and first public bank", "Christopher Columbus was Genoese", "Black Death entered Europe via Genoese colony at Caffa 1347 — Mongols possibly used biological warfare", "Napoleon dissolved republic 1797 incorporating it into Ligurian Republic"],
    researchers: [],
    relatedCivs: [861, 855, 780]
  },
  863: {
    locationType: "A",
    tags: ["papal-states", "pope", "rome", "innocent-iii", "sistine-chapel", "lateran-treaty"],
    keyFacts: ["Temporal sovereignty of papacy over central Italy for over 11 centuries", "Innocent III claimed supremacy over all Christian kings — partially enforced via excommunication", "Commissioned Sistine Chapel ceiling, Raphael stanze, and Saint Peter's Basilica", "Lateran Treaty 1929 with Mussolini created Vatican City State"],
    researchers: [],
    relatedCivs: [851, 860, 687]
  },
  864: {
    locationType: "A",
    tags: ["justinian", "byzantine", "hagia-sophia", "corpus-juris-civilis", "belisarius", "plague"],
    keyFacts: ["Corpus Juris Civilis — arguably most influential legal document in world history", "Hagia Sophia 532–537 CE — world's largest cathedral for nearly 1,000 years", "Belisarius reconquered North Africa, Italy, and southern Spain — last reunification of Mediterranean", "Justinianic Plague 541–549 CE killed perhaps 25–50 million — undermined the reconquests"],
    researchers: [],
    relatedCivs: [687, 865, 683]
  },
  865: {
    locationType: "A",
    tags: ["ostrogothic", "italy", "theodoric", "ravenna", "boethius", "cassiodorus"],
    keyFacts: ["Theodoric's reign combined Arian Gothic military power with Roman administrative traditions", "Boethius composed Consolation of Philosophy awaiting execution — most widely read medieval text", "Ravenna mosaics — finest late antique mosaics in existence", "Justinian's Belisarius destroyed kingdom in 535–553 CE war that devastated Italy more than the Gothic invasions"],
    researchers: [],
    relatedCivs: [864, 687, 844]
  },
  866: {
    locationType: "A",
    tags: ["capetian", "france", "paris", "gothic-cathedrals", "philip-augustus", "saint-louis"],
    keyFacts: ["13 generations of direct succession — most continuous royal succession of any major medieval European state", "Philip II Augustus tripled royal domain; defeated English-German coalition at Bouvines 1214", "Notre-Dame, Chartres, Reims, Amiens — supreme Gothic architectural achievement", "Direct Capetian line ended with Charles IV 1328; succeeded by Valois branch"],
    researchers: [],
    relatedCivs: [867, 844, 859]
  },
  867: {
    locationType: "A",
    tags: ["angevin", "plantagenet", "eleanor-of-aquitaine", "becket", "henry-ii", "england-france"],
    keyFacts: ["Most powerful feudal state in Western Europe at Henry II's death 1189", "Eleanor of Aquitaine's patronage created the courtly love tradition transforming European literary culture", "Becket murder 1170 — 'will no one rid me of this turbulent priest?' created saint and haunted monarchy", "Philip II Augustus systematically dismembered continental empire 1202–1224"],
    researchers: [],
    relatedCivs: [866, 845, 868]
  },
  868: {
    locationType: "A",
    tags: ["kingdom-of-jerusalem", "crusader", "hattin", "true-cross", "acre", "latin-east"],
    keyFacts: ["Assizes of Jerusalem — one of most sophisticated bodies of feudal law in medieval Europe", "True Cross captured by Saladin at Battle of Hattin 1187 alongside Jerusalem itself", "Constitutional constraints on royal power anticipated elements of constitutionalism", "Fall of Acre 1291 ended Latin Christian presence in Holy Land after 192 years"],
    researchers: [],
    relatedCivs: [780, 779, 867]
  },
  869: {
    locationType: "A",
    tags: ["kievan-rus", "principalities", "novgorod-republic", "vladimir-suzdal", "orthodox", "mongol-invasion"],
    keyFacts: ["Novgorod Republic — most democratic polity in medieval Eastern Europe", "Cathedral of the Dormition at Vladimir and Church of Intercession on the Nerl — finest Russian medieval architecture", "Rurikid dynasty shared identity across competing principalities", "Mongol invasion 1237–1240 killed perhaps half the population"],
    researchers: [],
    relatedCivs: [693, 870, 773]
  },
  870: {
    locationType: "A",
    tags: ["moscow", "ivan-iii", "third-rome", "ivan-the-terrible", "oprichnina", "tatar-yoke"],
    keyFacts: ["Ivan III's marriage to Byzantine princess Sophia Palaiologina 1472 positioned Moscow as Third Rome", "Ivan III refused Golden Horde tribute 1476 ending Tatar Yoke without major battle", "Ivan the Terrible assumed title Tsar 1547 — Russian form of Caesar", "Oprichnina terror 1565–1572 established pattern of political violence recurring throughout Russian history"],
    researchers: [],
    relatedCivs: [869, 858, 876]
  },
  871: {
    locationType: "A",
    tags: ["serbia", "dusan", "balkans", "zakonik", "kosovo", "nemanjic"],
    keyFacts: ["Stefan Dušan crowned Emperor of Serbs and Greeks 1346 — largest Balkan state since Byzantine Empire", "Zakonik law code 1349 — comprehensive medieval Balkan legal framework", "Sopoćani, Studenica, and Visoki Dečani monasteries — finest Serbian medieval architecture", "Battle of Kosovo 1389 — defining national tragedy in Serbian cultural memory"],
    researchers: [],
    relatedCivs: [872, 873, 687]
  },
  872: {
    locationType: "A",
    tags: ["bulgaria", "first-empire", "simeon-i", "cyrillic", "preslav", "byzantine"],
    keyFacts: ["First Slavic state formally recognised by Byzantine Empire 681 CE", "Simeon I the Great — Cyrillic alphabet and Old Church Slavonic literary production spread across Slavic world", "Preslav literary school — translation movement comparable in significance to Baghdad's Islamic translation movement", "Basil II 'the Bulgar-Slayer' destroyed empire 1018 after blinding 15,000 Bulgarian prisoners"],
    researchers: [],
    relatedCivs: [873, 871, 687]
  },
  873: {
    locationType: "A",
    tags: ["bulgaria", "second-empire", "tarnovo", "boyana-church", "ivan-asen-ii", "ottoman"],
    keyFacts: ["Restored through Asen brothers' rebellion against Byzantium 1185", "Boyana Church frescoes 1259 — compared in quality to contemporary Cimabue in Italy", "Ivan Asen II's victory at Klokotnitsa 1230 established Bulgaria as dominant Balkan power", "Fall of Tarnovo 1393 effectively ended second empire; formal Ottoman conquest by 1396"],
    researchers: [],
    relatedCivs: [872, 871, 777]
  },
  874: {
    locationType: "A",
    tags: ["croatia", "tomislav", "adriatic", "vinodol-law", "hungary-union", "medieval"],
    keyFacts: ["Tomislav crowned first Croatian king c.925 CE — recognised by Pope John X", "Vinodol Law Code 1288 — one of earliest legal documents in Croatian language", "Personal union with Hungary 1102 preserved Croatian autonomy for over 8 centuries", "Terms of Pacta Conventa remain disputed between Croatian and Hungarian historians"],
    researchers: [],
    relatedCivs: [847, 871, 851]
  },
  875: {
    locationType: "A",
    tags: ["crimea", "khanate", "slave-raids", "ottoman-vassal", "bakhchysarai", "catherine-great"],
    keyFacts: ["Conducted slave raids capturing estimated 2–3 million people from Russia, Ukraine, Poland-Lithuania", "Russian zasechnaya cherta frontier fortifications built primarily to limit Crimean raiding", "Khan's Palace at Bakhchysarai — finest surviving example of Crimean Tatar architectural achievement", "Catherine the Great annexed Crimea 1783 — geopolitical consequences still live in 21st century"],
    researchers: [],
    relatedCivs: [777, 858, 876]
  },
  876: {
    locationType: "A",
    tags: ["kazan", "khanate", "volga", "ivan-terrible", "saint-basils", "tatar"],
    keyFacts: ["Ivan IV's capture of Kazan 2 October 1552 — comparable in Russian memory to Battle of Kulikovo", "Opened Volga corridor to Russian expansion and beginning of Siberian conquest", "Saint Basil's Cathedral commissioned to commemorate conquest — most iconic Russian building", "Tatar population maintained language, Islam, and culture through centuries of Russian rule"],
    researchers: [],
    relatedCivs: [875, 870, 858]
  },
  877: {
    locationType: "A",
    tags: ["ilkhanate", "cultural", "rashid-al-din", "persian-painting", "chinese-motifs", "tabriz"],
    keyFacts: ["Ghazan Khan's conversion to Islam 1295 transformed Mongol destroyers into Persian cultural patrons", "Rashid al-Din's Jami al-Tawarikh — first genuine world history encompassing all major civilisations", "Chinese dragons, phoenixes, and cloud scrolls introduced into Persian visual vocabulary", "Sudden fragmentation after 1335 dispersed concentrated manuscript workshops and artistic communities"],
    researchers: [],
    relatedCivs: [774, 775, 776]
  },
  878: {
    locationType: "A",
    tags: ["chagatai", "central-asia", "silk-road", "chagatai-language", "babur", "nava'i"],
    keyFacts: ["Occupied heartland of ancient Silk Road for over four centuries", "Chagatai language — prestige literary medium used by poet Nava'i and Mughal founder Babur in his Baburnama", "Fractured progressively between nomadic Moghulistan and sedentarised Transoxiana", "Last Chagataid ruler died 1687 under Uzbek and Dzungar pressure"],
    researchers: [],
    relatedCivs: [772, 775, 879]
  },
  879: {
    locationType: "A",
    tags: ["dzungar", "oirat", "mongol", "qing", "last-nomadic-empire", "genocide"],
    keyFacts: ["Last great nomadic empire of Eurasia", "Challenged Qing China, Russian Empire, and Kazakh khanates simultaneously", "Qianlong's 1755–1758 campaign killed estimated 80% of Dzungar population — 18th century's first genocide", "Destruction of Dzungar state ended steppe nomadic threat to China; cleared way for Qing incorporation of Xinjiang"],
    researchers: [],
    relatedCivs: [878, 759, 772]
  },
  880: {
    locationType: "A",
    tags: ["tokugawa", "edo-japan", "sakoku", "sankin-kotai", "perry", "meiji"],
    keyFacts: ["Sankin-kōtai system required daimyo to alternate residence between domain and Edo — controlled feudal lords", "Sakoku near-complete national isolation with single Dutch trading post at Dejima, Nagasaki", "Edo urban culture produced kabuki, ukiyo-e woodblock prints, haiku, and sophisticated commercial publishing", "Perry's Black Ships 1853 shattered sakoku; Meiji Restoration 1868 ended the shogunate"],
    researchers: [],
    relatedCivs: [699, 749, 756]
  },
// PHASE_5ap_APPEND_extended.js
// Tempus Linea — CHRONOS
// Civilizations 881–910 — Extended metadata
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local data-extended.js file
// 2. Find the very last closing brace before the final };
//    It will look like:     }     (the last entry in the CIV_META object)
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_META object
// -----------------------------------------------------------------------

  881: {
    locationType: "A",
    tags: ["maritime-empire", "polynesia", "pacific", "tribute-network", "kava-ritual", "lapita-descendant"],
    researchers: [],
    sources: [
      "Kirch, P.V. — On the Road of the Winds (2000)",
      "Campbell, I.C. — A History of the Pacific Islands (1989)"
    ],
    notableStructures: ["Langi burial mounds (Tongatapu)", "Ha'amonga 'a Maui trilithon"],
    plausibilityScore: { up: 312, dn: 8 }
  },
  882: {
    locationType: "B",
    tags: ["artificial-islands", "basalt", "micronesia", "pacific", "megalithic", "saudeleur", "underwater-archaeology"],
    researchers: ["Graham Hancock"],
    sources: [
      "Saxe, A. — Report on Nan Madol (1980)",
      "Athens, J.S. — Archaeological Investigations at Nan Madol (1980)"
    ],
    notableStructures: ["Nan Douwas mortuary complex", "Pahn Kadira ritual enclosure"],
    locationTheories: [
      {
        lat: 6.844,
        lng: 158.328,
        label: "Nan Madol reef platform (current accepted location)",
        source: "Archaeological consensus",
        researcher: null,
        up: 890,
        dn: 22
      },
      {
        lat: 6.83,
        lng: 158.31,
        label: "Submerged pre-Saudeleur platform (hypothesised)",
        source: "Alternative researcher network",
        researcher: "Graham Hancock",
        up: 198,
        dn: 310
      }
    ],
    plausibilityScore: { up: 745, dn: 55 }
  },
  883: {
    locationType: "A",
    tags: ["moai", "pacific", "polynesia", "island", "collapse", "ecological", "statue-culture", "easter-island"],
    researchers: [],
    sources: [
      "Van Tilburg, J.A. — Easter Island (1994)",
      "Hunt, T. & Lipo, C. — The Statues that Walked (2011)"
    ],
    notableStructures: ["Ahu Tongariki", "Rano Raraku quarry", "Orongo ceremonial village"],
    plausibilityScore: { up: 1102, dn: 44 }
  },
  884: {
    locationType: "A",
    tags: ["polynesia", "pacific", "chiefdom", "kapu", "ali-i", "heiau", "aquaculture", "kamehameha"],
    researchers: [],
    sources: [
      "Kirch, P.V. — How Chiefs Became Kings (2010)",
      "Malo, D. — Hawaiian Antiquities (1898)"
    ],
    notableStructures: ["Pu'ukohola Heiau", "Hōnaunau National Historical Park fishponds"],
    plausibilityScore: { up: 876, dn: 19 }
  },
  885: {
    locationType: "A",
    tags: ["lapita", "pacific", "ancestral-polynesian", "maritime", "pottery", "migration", "austronesian"],
    researchers: [],
    sources: [
      "Bellwood, P. — The Austronesians (1995)",
      "Kirch, P.V. — On the Road of the Winds (2000)"
    ],
    notableStructures: ["Lapita pottery sites — Mussau Islands", "Talepakemalai archaeological site"],
    plausibilityScore: { up: 654, dn: 28 }
  },
  886: {
    locationType: "A",
    tags: ["southern-africa", "gold-trade", "iron-age", "hilltop-settlement", "indian-ocean-trade", "elite-burial"],
    researchers: [],
    sources: [
      "Meyer, A. — Excavations at Mapungubwe (1998)",
      "Huffman, T.N. — Snakes and Crocodiles (1996)"
    ],
    notableStructures: ["Mapungubwe Hill royal enclosure", "Golden rhinoceros burial site"],
    plausibilityScore: { up: 488, dn: 14 }
  },
  887: {
    locationType: "A",
    tags: ["southern-africa", "stone-walls", "gold-trade", "zimbabwe-plateau", "swahili-connection", "colonial-denial"],
    researchers: [],
    sources: [
      "Garlake, P. — Great Zimbabwe (1973)",
      "Pikirayi, I. — The Zimbabwe Culture (2001)"
    ],
    notableStructures: ["Great Enclosure", "Hill Complex", "Valley Ruins"],
    plausibilityScore: { up: 934, dn: 31 }
  },
  888: {
    locationType: "A",
    tags: ["southern-africa", "zimbabwe", "portuguese-contact", "gold-trade", "shona", "successor-state"],
    researchers: [],
    sources: [
      "Beach, D.N. — The Shona and Zimbabwe (1980)",
      "Mudenge, S.I.G. — A Political History of Munhumutapa (1988)"
    ],
    notableStructures: ["Khami Ruins (successor capital)", "Danangombe ceremonial site"],
    plausibilityScore: { up: 412, dn: 18 }
  },
  889: {
    locationType: "A",
    tags: ["arabian-gulf", "trade-entrepot", "indus-connection", "mesopotamia", "burial-mounds", "paradise-myth", "bahrain"],
    researchers: [],
    sources: [
      "Crawford, H. — Dilmun and its Gulf Neighbours (1998)",
      "Potts, D.T. — The Arabian Gulf in Antiquity (1990)"
    ],
    notableStructures: ["Qal'at al-Bahrain (ancient harbour)", "Aali burial mound field"],
    plausibilityScore: { up: 567, dn: 22 }
  },
  890: {
    locationType: "A",
    tags: ["south-arabia", "incense-trade", "frankincense", "dam-engineering", "queen-of-sheba", "himyar", "yemen"],
    researchers: [],
    sources: [
      "Doe, B. — Southern Arabia (1971)",
      "Gnoli, G. — Arabia and the Arabs (2002)"
    ],
    notableStructures: ["Marib Dam", "Awam Temple (Mahram Bilqis)", "Bar'an Temple"],
    plausibilityScore: { up: 723, dn: 29 }
  },
  891: {
    locationType: "A",
    tags: ["petra", "jordan", "nabataean", "spice-trade", "hydraulic-engineering", "arabic-script-ancestor", "roman-client"],
    researchers: [],
    sources: [
      "Healey, J.F. — The Nabataean Tomb Inscriptions of Mada'in Salih (1993)",
      "Fiema, Z.T. — Petra: A City Forgotten (2002)"
    ],
    notableStructures: ["Al-Khazneh (Treasury)", "Monastery (Ad Deir)", "Siq canyon channel system"],
    plausibilityScore: { up: 1456, dn: 38 }
  },
  892: {
    locationType: "A",
    tags: ["ethiopia", "red-sea-trade", "christianity", "obelisks", "coinage", "late-antiquity", "horn-of-africa", "aksum"],
    researchers: [],
    sources: [
      "Munro-Hay, S. — Aksum: An African Civilisation of Late Antiquity (1991)",
      "Phillipson, D.W. — Ancient Ethiopia (1998)"
    ],
    notableStructures: ["Stelae of Aksum (obelisks)", "Church of Our Lady Mary of Zion", "Dungur palace complex"],
    plausibilityScore: { up: 889, dn: 27 }
  },
  893: {
    locationType: "A",
    tags: ["sudan", "nubia", "iron-age", "meroe-script", "pyramids", "nile", "kushite", "25th-dynasty"],
    researchers: [],
    sources: [
      "Török, L. — The Kingdom of Kush (1997)",
      "Shinnie, P.L. — Meroe: A Civilisation of the Sudan (1967)"
    ],
    notableStructures: ["Meroe pyramid field", "Temple of Amun at Meroe", "Royal City of Meroe"],
    plausibilityScore: { up: 712, dn: 24 }
  },
  894: {
    locationType: "A",
    tags: ["sahara", "berber", "foggaras", "underground-irrigation", "trans-saharan-trade", "libya", "fossil-aquifer"],
    researchers: [],
    sources: [
      "Mattingly, D.J. — The Archaeology of Fazzan (2003)",
      "Daniels, C.M. — The Garamantes of Southern Libya (1970)"
    ],
    notableStructures: ["Garama (Germa) capital city", "Foggara irrigation networks", "Garamantian chariot-road system"],
    plausibilityScore: { up: 534, dn: 16 }
  },
  895: {
    locationType: "A",
    tags: ["east-africa", "swahili", "indian-ocean-trade", "kiswahili", "gold", "ivory", "city-states", "portuguese-disruption"],
    researchers: [],
    sources: [
      "Horton, M. & Middleton, J. — The Swahili (2000)",
      "Pouwels, R.L. — Horn and Crescent (1987)"
    ],
    notableStructures: ["Kilwa Kisiwani palace and mosque", "Husuni Kubwa palace", "Gedi ruins"],
    plausibilityScore: { up: 788, dn: 33 }
  },
  896: {
    locationType: "A",
    tags: ["cambodia", "angkor", "devaraja", "hydraulic-city", "theravada", "southeast-asia", "temple-mountain"],
    researchers: [],
    sources: [
      "Higham, C. — The Civilization of Angkor (2001)",
      "Coe, M.D. — Angkor and the Khmer Civilization (2003)"
    ],
    notableStructures: ["Angkor Wat", "Bayon Temple", "Preah Khan", "West Baray reservoir"],
    plausibilityScore: { up: 2134, dn: 67 }
  },
  897: {
    locationType: "A",
    tags: ["java", "indonesia", "maritime-empire", "hindu-buddhist", "palapa-oath", "nusantara", "nagarakretagama"],
    researchers: [],
    sources: [
      "Prapanca, Mpu — Nagarakretagama (1365)",
      "Robson, S. — Desawarnana (Nagarakretagama) trans. (1995)"
    ],
    notableStructures: ["Trowulan capital ruins", "Candi Penataran temple complex", "Segaran artificial lake"],
    plausibilityScore: { up: 876, dn: 41 }
  },
  898: {
    locationType: "A",
    tags: ["sumatra", "thalassocracy", "strait-of-malacca", "buddhism", "maritime-trade", "southeast-asia", "chola-raids"],
    researchers: [],
    sources: [
      "Wolters, O.W. — Early Indonesian Commerce (1967)",
      "Coedes, G. — The Indianized States of Southeast Asia (1968)"
    ],
    notableStructures: ["Muaro Jambi temple complex", "Biaro Bahal temples (Sumatra)"],
    plausibilityScore: { up: 734, dn: 38 }
  },
  899: {
    locationType: "A",
    tags: ["south-india", "hindu-empire", "deccan", "temple-architecture", "talikota", "krishnadevaraya", "telugu-literature"],
    researchers: [],
    sources: [
      "Stein, B. — Vijayanagara (1989)",
      "Fritz, J.M. & Michell, G. — Vijayanagara: The City of Victory (1991)"
    ],
    notableStructures: ["Hampi ruins (Vijayanagara capital)", "Vittala Temple", "Lotus Mahal", "Elephant Stables"],
    plausibilityScore: { up: 943, dn: 35 }
  },
  900: {
    locationType: "A",
    tags: ["south-india", "tamil", "maritime-empire", "nataraja", "brihadeeswarar", "chola-bronzes", "village-assembly"],
    researchers: [],
    sources: [
      "Nilakanta Sastri, K.A. — The Colas (1935)",
      "Champakalakshmi, R. — Trade, Ideology and Urbanization (1996)"
    ],
    notableStructures: ["Brihadeeswarar Temple (Thanjavur)", "Gangaikonda Cholapuram", "Darasuram Temple"],
    plausibilityScore: { up: 1087, dn: 29 }
  },
  901: {
    locationType: "A",
    tags: ["myanmar", "bagan", "theravada-buddhism", "temple-landscape", "anawrahta", "mongol-invasion", "irrawaddy"],
    researchers: [],
    sources: [
      "Aung-Thwin, M. — Pagan: The Origins of Modern Burma (1985)",
      "Hudson, B. — The Origins of Bagan (2004)"
    ],
    notableStructures: ["Ananda Temple", "Dhammayangyi Temple", "Shwezigon Pagoda", "Thatbyinnyu Temple"],
    plausibilityScore: { up: 834, dn: 22 }
  },
  902: {
    locationType: "A",
    tags: ["thailand", "southeast-asia", "ayutthaya", "buddhist-monarchy", "trade-hub", "burmese-wars", "siam"],
    researchers: [],
    sources: [
      "Wyatt, D.K. — Thailand: A Short History (1984)",
      "Baker, C. & Phongpaichit, P. — A History of Thailand (2005)"
    ],
    notableStructures: ["Wat Phra Si Sanphet", "Wat Mahathat (Ayutthaya)", "Royal Palace complex ruins"],
    plausibilityScore: { up: 789, dn: 31 }
  },
  903: {
    locationType: "A",
    tags: ["korea", "three-kingdoms", "manchuria", "tomb-murals", "military", "tang-wars", "goguryeo-mural"],
    researchers: [],
    sources: [
      "Lee, K.B. — A New History of Korea (1984)",
      "Barnes, G.L. — State Formation in Korea (2001)"
    ],
    notableStructures: ["Hwando Mountain Fortress", "Goguryeo royal tombs (Pyongyang)", "Ansi Fortress"],
    plausibilityScore: { up: 612, dn: 19 }
  },
  904: {
    locationType: "A",
    tags: ["korea", "three-kingdoms", "unified", "buddhism", "gyeongju", "hwarang", "cheomseongdae"],
    researchers: [],
    sources: [
      "Best, J.W. — A History of the Early Korean Kingdom of Paekche (2006)",
      "Kim, P. — History of Korea (2012)"
    ],
    notableStructures: ["Bulguksa Temple", "Seokguram Grotto", "Cheomseongdae Observatory", "Tumuli Park royal tombs"],
    plausibilityScore: { up: 698, dn: 21 }
  },
  905: {
    locationType: "A",
    tags: ["korea", "goryeo", "tripitaka", "moveable-type", "celadon", "mongol-invasion", "buddhism", "printing"],
    researchers: [],
    sources: [
      "Duncan, J.B. — The Origins of the Choson Dynasty (2000)",
      "Kim, Y.S. — Goryeo Celadon (1978)"
    ],
    notableStructures: ["Haeinsa Temple (Tripitaka Koreana storage)", "Manwoldae Palace ruins", "Ganghwado fortifications"],
    plausibilityScore: { up: 856, dn: 28 }
  },
  906: {
    locationType: "A",
    tags: ["southeast-asia", "mekong-delta", "indianised", "oc-eo", "roman-trade", "austroasiatic", "early-maritime"],
    researchers: [],
    sources: [
      "Coedes, G. — The Indianized States of Southeast Asia (1968)",
      "Malleret, L. — L'Archeologie du delta du Mekong (1959–1963)"
    ],
    notableStructures: ["Óc Eo trading port (Vietnam)", "Angkor Borei proto-urban centre"],
    plausibilityScore: { up: 487, dn: 33 }
  },
  907: {
    locationType: "A",
    tags: ["vietnam", "cham", "hindu-buddhist", "my-son", "austronesian", "tower-temples", "sea-traders"],
    researchers: [],
    sources: [
      "Hardy, A. et al. — Champa and the Archaeology of My Son (2009)",
      "Maspero, G. — The Champa Kingdom (2002)"
    ],
    notableStructures: ["My Son Sanctuary (UNESCO)", "Po Nagar Temple complex", "Po Klong Garai towers"],
    plausibilityScore: { up: 634, dn: 27 }
  },
  908: {
    locationType: "B",
    tags: ["pre-pottery-neolithic", "anatolia", "megalithic", "hunter-gatherer", "religious-complex", "younger-dryas", "andrew-collins", "gobekli-tepe"],
    researchers: ["Andrew Collins", "Graham Hancock"],
    sources: [
      "Schmidt, K. — Sie bauten die ersten Tempel (2006)",
      "Collins, A. — Gobekli Tepe: Genesis of the Gods (2014)"
    ],
    notableStructures: ["Göbekli Tepe enclosures A–D", "Karahan Tepe (sister site)", "Taş Tepeler complex sites"],
    locationTheories: [
      {
        lat: 37.2231,
        lng: 38.9225,
        label: "Göbekli Tepe — confirmed excavation site",
        source: "Klaus Schmidt / DAI",
        researcher: null,
        up: 2890,
        dn: 45
      },
      {
        lat: 37.5,
        lng: 38.7,
        label: "Wider Taş Tepeler Pre-YD cultural zone",
        source: "Collins, A. — Gobekli Tepe: Genesis of the Gods (2014)",
        researcher: "Andrew Collins",
        up: 678,
        dn: 234
      }
    ],
    plausibilityScore: { up: 2134, dn: 188 }
  },
  909: {
    locationType: "C",
    tags: ["vedic", "antediluvian", "flood-myth", "indus-precursor", "frawley", "oppenheimer", "sanskrit-astronomy", "theorized"],
    researchers: ["David Frawley", "Stephen Oppenheimer"],
    sources: [
      "Frawley, D. — Gods, Sages and Kings (1991)",
      "Oppenheimer, S. — Eden in the East (1998)"
    ],
    locationTheories: [
      {
        lat: 20.0,
        lng: 73.0,
        label: "Northwestern Indian subcontinent — inferred Vedic heartland",
        source: "Frawley, D. — Gods, Sages and Kings (1991)",
        researcher: "David Frawley",
        up: 567,
        dn: 489
      },
      {
        lat: 8.0,
        lng: 78.0,
        label: "Submerged Gulf of Mannar coastal plain",
        source: "Oppenheimer, S. — Eden in the East (1998)",
        researcher: "Stephen Oppenheimer",
        up: 412,
        dn: 534
      },
      {
        lat: 22.0,
        lng: 66.0,
        label: "Drowned Indus Delta shelf (sea-level rise hypothesis)",
        source: "Alternative researchers — sea-level data",
        researcher: null,
        up: 334,
        dn: 612
      }
    ],
    plausibilityScore: { up: 789, dn: 654 }
  },
  910: {
    locationType: "C",
    tags: ["nan-madol", "micronesia", "pohnpei", "pre-saudeleur", "underwater", "pacific", "hancock-network", "theorized"],
    researchers: ["Graham Hancock"],
    sources: [
      "Saxe, A. — Report on Nan Madol (1980)",
      "Hancock, G. — America Before (2019)"
    ],
    locationTheories: [
      {
        lat: 6.844,
        lng: 158.328,
        label: "Nan Madol reef platform — proposed earlier phase",
        source: "Alternative researcher network",
        researcher: "Graham Hancock",
        up: 312,
        dn: 445
      },
      {
        lat: 6.82,
        lng: 158.30,
        label: "Submerged early Holocene coastline platform",
        source: "Hypothesised from sea-level data",
        researcher: null,
        up: 198,
        dn: 567
      }
    ],
    plausibilityScore: { up: 445, dn: 534 }
  }

// -----------------------------------------------------------------------
// END OF PHASE_5ap_APPEND_extended.js
// The CIV_META object should still close with };  after this block
// -----------------------------------------------------------------------,
// PHASE_5aq_APPEND_extended.js
// Tempus Linea — CHRONOS
// Civilizations 911–940 — Extended metadata
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local data-extended.js file
// 2. Find the very last closing brace before the final };
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_META object
// -----------------------------------------------------------------------

  911: {
    locationType: "A",
    tags: ["north-america", "mound-builders", "mississippian", "maize", "ceremonial-complex", "chiefdom", "pre-columbian"],
    researchers: [],
    sources: [
      "Pauketat, T.R. — Cahokia: Ancient America's Great City on the Mississippi (2009)",
      "Knight, V.J. — Symbolism of Mississippian Mounds (1986)"
    ],
    notableStructures: ["Cahokia Monks Mound (id 822 cross-ref)", "Moundville site (Alabama)", "Spiro Mounds (Oklahoma)"],
    plausibilityScore: { up: 678, dn: 22 }
  },
  912: {
    locationType: "A",
    tags: ["north-america", "pueblo", "southwest", "chaco-canyon", "cliff-dwellings", "solar-alignment", "drought", "anasazi"],
    researchers: [],
    sources: [
      "Lekson, S.H. — The Chaco Meridian (1999)",
      "Plog, S. — Ancient Peoples of the American Southwest (1997)"
    ],
    notableStructures: ["Chaco Canyon Great Houses", "Mesa Verde Cliff Palace", "Pueblo Bonito"],
    plausibilityScore: { up: 892, dn: 34 }
  },
  913: {
    locationType: "A",
    tags: ["north-america", "ohio-valley", "earthworks", "fort-ancient", "serpent-mound", "maize", "mississippian-influence"],
    researchers: [],
    sources: [
      "Mainfort, R.C. & Sullivan, L.P. — Ancient Earthen Enclosures of the Eastern Woodlands (1998)",
      "Lepper, B.T. — Ohio Archaeology (2005)"
    ],
    notableStructures: ["Great Serpent Mound (Ohio)", "Fort Ancient earthworks", "Sunwatch Village site"],
    plausibilityScore: { up: 534, dn: 28 }
  },
  914: {
    locationType: "A",
    tags: ["caribbean", "taino", "arawak", "chiefdom", "cassava", "ballcourt", "columbus-contact", "genocide"],
    researchers: [],
    sources: [
      "Rouse, I. — The Tainos: Rise and Decline of the People Who Greeted Columbus (1992)",
      "Wilson, S.M. — The Indigenous People of the Caribbean (1997)"
    ],
    notableStructures: ["La Vega Vieja ballcourt (Dominican Republic)", "Chorro de Maíta burial site (Cuba)"],
    plausibilityScore: { up: 712, dn: 19 }
  },
  915: {
    locationType: "A",
    tags: ["colombia", "muisca", "el-dorado", "gold", "emerald", "salt-trade", "chiefdom", "andes"],
    researchers: [],
    sources: [
      "Langebaek, C.H. — Mercados, Poblamiento e Integración Étnica entre los Muiscas (1987)",
      "Falchetti, A.M. — El Legado Metalúrgico de los Muiscas (2003)"
    ],
    notableStructures: ["Lake Guatavita (El Dorado ritual site)", "Hunza / Tunja chiefdom centre", "Bacatá / Bogotá chiefdom centre"],
    plausibilityScore: { up: 834, dn: 31 }
  },
  916: {
    locationType: "B",
    tags: ["bolivia", "tiwanaku", "altiplano", "lake-titicaca", "raised-fields", "formative", "posnansky", "early-phase"],
    researchers: ["Arthur Posnansky"],
    sources: [
      "Posnansky, A. — Tiahuanacu: The Cradle of American Man (1945)",
      "Kolata, A.L. — Valley of the Spirits (1996)"
    ],
    notableStructures: ["Tiwanaku early platform mounds", "Pumapunku early construction phases", "Suka kollus raised-field systems"],
    locationTheories: [
      {
        lat: -16.5553,
        lng: -68.6731,
        label: "Tiwanaku site — mainstream archaeological dating (c.1500 BCE–300 CE formative)",
        source: "Kolata, A.L. — Valley of the Spirits (1996)",
        researcher: null,
        up: 1234,
        dn: 67
      },
      {
        lat: -16.5553,
        lng: -68.6731,
        label: "Tiwanaku site — Posnansky astronomical dating (c.15,000 BCE)",
        source: "Posnansky, A. — Tiahuanacu: The Cradle of American Man (1945)",
        researcher: "Arthur Posnansky",
        up: 445,
        dn: 892
      }
    ],
    plausibilityScore: { up: 678, dn: 445 }
  },
  917: {
    locationType: "A",
    tags: ["peru", "caral", "supe-valley", "oldest-americas", "pre-ceramic", "platform-mound", "maritime-economy", "ruth-shady"],
    researchers: [],
    sources: [
      "Shady Solís, R. — La Ciudad Sagrada de Caral-Supe (1997)",
      "Haas, J. & Creamer, W. — Crucible of Andean Civilization (2006)"
    ],
    notableStructures: ["Pirámide Mayor (Caral)", "Sunken circular plazas (Caral)", "Aspero coastal mound complex"],
    plausibilityScore: { up: 934, dn: 41 }
  },
  918: {
    locationType: "A",
    tags: ["peru", "wari", "andes", "imperial", "road-network", "orthogonal-planning", "huari", "pre-inca"],
    researchers: [],
    sources: [
      "Schreiber, K.J. — Wari Imperialism in Middle Horizon Peru (1992)",
      "Isbell, W.H. — Mummies and Mortuary Monuments (2004)"
    ],
    notableStructures: ["Huari capital city (Ayacucho)", "Pikillacta administrative colony (Cusco)", "Viracochapampa colony (Huamachuco)"],
    plausibilityScore: { up: 612, dn: 27 }
  },
  919: {
    locationType: "A",
    tags: ["ethiopia", "aksum", "pre-christian", "proto-urban", "red-sea", "dmt-kingdom", "early-phase", "horn-of-africa"],
    researchers: [],
    sources: [
      "Munro-Hay, S. — Aksum: An African Civilisation of Late Antiquity (1991)",
      "Fattovich, R. — The Development of Ancient States in the Northern Horn of Africa (2010)"
    ],
    notableStructures: ["Pre-Aksumite D'mt monuments", "Early stele tradition sites", "Yeha Temple (pre-Aksumite)"],
    plausibilityScore: { up: 445, dn: 33 }
  },
  920: {
    locationType: "A",
    tags: ["nigeria", "nok", "terracotta", "iron-age", "west-africa", "sculpture", "sub-saharan", "oldest-figurative-art-africa"],
    researchers: [],
    sources: [
      "Fagg, B. — Nok Terracottas (1977)",
      "Breunig, P. — Nok: African Sculpture in Archaeological Context (2014)"
    ],
    notableStructures: ["Nok terracotta kiln sites (Kaduna State, Nigeria)", "Taruga iron-smelting site"],
    plausibilityScore: { up: 567, dn: 18 }
  },
  921: {
    locationType: "A",
    tags: ["nigeria", "yoruba", "ife", "bronze-heads", "terracotta", "sacred-city", "obatala", "west-africa"],
    researchers: [],
    sources: [
      "Willett, F. — Ife in the History of West African Sculpture (1967)",
      "Drewal, H.J. — Yoruba: Nine Centuries of African Art and Thought (1989)"
    ],
    notableStructures: ["Ore Grove shrine complex", "Orun Oba Ado potsherd-paved precinct", "Old Oyo earthworks"],
    plausibilityScore: { up: 734, dn: 24 }
  },
  922: {
    locationType: "A",
    tags: ["nigeria", "benin", "edo", "bronze", "oba", "court-art", "punitive-expedition", "repatriation", "west-africa"],
    researchers: [],
    sources: [
      "Ezra, K. — Royal Art of Benin (1992)",
      "Plankensteiner, B. — Benin: Kings and Rituals (2007)"
    ],
    notableStructures: ["Benin City royal palace complex", "Igun Eronmwon guild quarter", "Benin City defensive earthworks (Iya)"],
    plausibilityScore: { up: 1023, dn: 38 }
  },
  923: {
    locationType: "A",
    tags: ["nigeria", "yoruba", "oyo", "cavalry", "alafin", "atlantic-slave-trade", "west-africa", "constitutional-monarchy"],
    researchers: [],
    sources: [
      "Law, R. — The Oyo Empire c.1600–c.1836 (1977)",
      "Akintoye, S.A. — A History of the Yoruba People (2010)"
    ],
    notableStructures: ["Old Oyo (Katunga) capital ruins", "Oyo Ile earthworks", "Gbodo palace site"],
    plausibilityScore: { up: 612, dn: 27 }
  },
  924: {
    locationType: "A",
    tags: ["benin-republic", "dahomey", "fon", "agojie", "amazons", "slave-trade", "abomey", "french-conquest", "west-africa"],
    researchers: [],
    sources: [
      "Bay, E.G. — Wives of the Leopard: Gender, Politics, and Culture in the Kingdom of Dahomey (1998)",
      "Manning, P. — Slavery, Colonialism and Economic Growth in Dahomey (1982)"
    ],
    notableStructures: ["Abomey Royal Palaces (UNESCO)", "Ouidah slave trade port", "Agojie barracks complex"],
    plausibilityScore: { up: 789, dn: 34 }
  },
  925: {
    locationType: "A",
    tags: ["east-africa", "palaeolithic", "oldowan", "acheulean", "homo-habilis", "homo-erectus", "stone-tools", "deep-time", "rift-valley"],
    researchers: [],
    sources: [
      "Leakey, M.D. — Olduvai Gorge Vol.3 (1971)",
      "Semaw, S. et al. — 2.5-million-year-old stone tools from Gona, Ethiopia (1997)"
    ],
    notableStructures: ["Olduvai Gorge (Tanzania)", "Lomekwi 3 site (Kenya)", "Gona site (Ethiopia)"],
    plausibilityScore: { up: 1456, dn: 29 }
  },
  926: {
    locationType: "A",
    tags: ["south-africa", "blombos", "ochre", "symbolic-behaviour", "shell-beads", "modern-cognition", "palaeolithic", "southern-cape"],
    researchers: [],
    sources: [
      "Henshilwood, C.S. et al. — Emergence of Modern Human Behaviour: Middle Stone Age Engravings from South Africa (2002)",
      "d'Errico, F. et al. — Additional Evidence for Bone Technology in the Southern African Middle Stone Age (2001)"
    ],
    notableStructures: ["Blombos Cave site (Western Cape, South Africa)", "Pinnacle Point cave complex"],
    plausibilityScore: { up: 1089, dn: 44 }
  },
  927: {
    locationType: "A",
    tags: ["sulawesi", "indonesia", "cave-art", "figurative-art", "oldest-painting", "upper-palaeolithic", "adam-brumm", "therianthrope"],
    researchers: [],
    sources: [
      "Aubert, M. et al. — Pleistocene cave art from Sulawesi, Indonesia (Nature, 2014)",
      "Brumm, A. et al. — Oldest cave art found in Sulawesi (Science Advances, 2021)"
    ],
    notableStructures: ["Leang Tedongnge cave (oldest pig painting)", "Leang Bulu' Sipong 4 (oldest narrative scene)", "Leang Timpuseng cave"],
    plausibilityScore: { up: 1234, dn: 67 }
  },
  928: {
    locationType: "B",
    tags: ["denisovan", "altai", "ancient-dna", "archaic-human", "interbreeding", "siberia", "melanesia", "andrew-collins", "debated"],
    researchers: ["Andrew Collins"],
    sources: [
      "Reich, D. et al. — Genetic history of an archaic hominin group from Denisova Cave in Siberia (Nature, 2010)",
      "Collins, A. — Denisovan Origins (2019)"
    ],
    notableStructures: ["Denisova Cave (Altai, Russia)", "Xiahe Cave (Tibet — Denisovan mandible)"],
    locationTheories: [
      {
        lat: 51.3978,
        lng: 84.6764,
        label: "Denisova Cave, Altai Mountains — primary find site",
        source: "Reich, D. et al. — Nature (2010)",
        researcher: null,
        up: 1456,
        dn: 88
      },
      {
        lat: 35.4500,
        lng: 102.5667,
        label: "Xiahe, Tibetan Plateau — high-altitude Denisovan population",
        source: "Chen, F. et al. — Nature (2019)",
        researcher: null,
        up: 892,
        dn: 112
      },
      {
        lat: -5.0,
        lng: 140.0,
        label: "Melanesian genetic legacy zone — Denisovan admixture up to 5%",
        source: "Collins, A. — Denisovan Origins (2019)",
        researcher: "Andrew Collins",
        up: 678,
        dn: 234
      }
    ],
    plausibilityScore: { up: 1567, dn: 198 }
  },
  929: {
    locationType: "A",
    tags: ["japan", "jomon", "oldest-pottery", "hunter-gatherer", "dogu", "lacquerwork", "pre-agricultural", "pacific"],
    researchers: [],
    sources: [
      "Habu, J. — Ancient Jomon of Japan (2004)",
      "Kobayashi, T. — Jomon Reflections (2004)"
    ],
    notableStructures: ["Sannai-Maruyama site (Aomori)", "Ōyu Stone Circles (Akita)", "Jomon shell middens — Tokyo Bay"],
    plausibilityScore: { up: 834, dn: 31 }
  },
  930: {
    locationType: "A",
    tags: ["japan", "yayoi", "rice-agriculture", "bronze", "iron", "himiko", "yamatai", "korean-immigrants"],
    researchers: [],
    sources: [
      "Mizoguchi, K. — The Archaeology of Japan (2013)",
      "Barnes, G.L. — Protohistoric Yamato (1988)"
    ],
    notableStructures: ["Yoshinogari moated settlement (Saga)", "Toro rice paddies and village (Shizuoka)", "Doigahama burial site (Yamaguchi)"],
    plausibilityScore: { up: 712, dn: 28 }
  },
  931: {
    locationType: "A",
    tags: ["japan", "kofun", "yamato", "burial-mound", "imperial-line", "buddhism-introduction", "korea-contact", "keyhole-mound"],
    researchers: [],
    sources: [
      "Kidder, J.E. — Himiko and Japan's Elusive Chiefdom of Yamatai (2007)",
      "Farris, W.W. — Sacred Texts and Buried Treasures (1998)"
    ],
    notableStructures: ["Daisen Kofun (Emperor Nintoku mound, Sakai)", "Hashihaka Kofun (Nara)", "Ishibutai Kofun (Nara)"],
    plausibilityScore: { up: 789, dn: 22 }
  },
  932: {
    locationType: "A",
    tags: ["indus-valley", "harappan", "mohenjo-daro", "harappa", "undeciphered-script", "urban-planning", "drainage", "bronze-age"],
    researchers: [],
    sources: [
      "Kenoyer, J.M. — Ancient Cities of the Indus Valley Civilisation (1998)",
      "McIntosh, J. — A Peaceful Realm: The Rise and Fall of the Indus Civilization (2002)"
    ],
    notableStructures: ["Mohenjo-daro Great Bath", "Harappa granary complex", "Dholavira water reservoir system"],
    plausibilityScore: { up: 1567, dn: 55 }
  },
  933: {
    locationType: "B",
    tags: ["crete", "minoan", "palace", "linear-a", "bull-leaping", "fresco", "thera", "atlantis-theory", "galanopoulos"],
    researchers: ["Angelos Galanopoulos"],
    sources: [
      "Castleden, R. — The Knossos Labyrinth (1990)",
      "Galanopoulos, A. & Bacon, E. — Atlantis: The Truth Behind the Legend (1969)"
    ],
    notableStructures: ["Palace of Knossos", "Palace of Phaistos", "Akrotiri (Thera) preserved city", "Palace of Malia"],
    locationTheories: [
      {
        lat: 35.2985,
        lng: 25.1631,
        label: "Knossos, Crete — primary Minoan palatial centre",
        source: "Castleden, R. — The Knossos Labyrinth (1990)",
        researcher: null,
        up: 2134,
        dn: 78
      },
      {
        lat: 36.4017,
        lng: 25.3967,
        label: "Akrotiri, Santorini (Thera) — Galanopoulos Atlantis theory",
        source: "Galanopoulos, A. & Bacon, E. — Atlantis: The Truth Behind the Legend (1969)",
        researcher: "Angelos Galanopoulos",
        up: 892,
        dn: 456
      }
    ],
    plausibilityScore: { up: 1789, dn: 112 }
  },
  934: {
    locationType: "A",
    tags: ["greece", "mycenaean", "bronze-age", "linear-b", "trojan-war", "palace", "late-bronze-age-collapse", "homer"],
    researchers: [],
    sources: [
      "Chadwick, J. — The Mycenaean World (1976)",
      "Castleden, R. — The Mycenaeans (2005)"
    ],
    notableStructures: ["Lion Gate (Mycenae)", "Treasury of Atreus", "Palace of Nestor (Pylos)", "Tiryns cyclopean walls"],
    plausibilityScore: { up: 1345, dn: 44 }
  },
  935: {
    locationType: "A",
    tags: ["italy", "etruscan", "etruria", "tuscany", "tomb-painting", "metallurgy", "rome-precursor", "undeciphered"],
    researchers: [],
    sources: [
      "Barker, G. & Rasmussen, T. — The Etruscans (1998)",
      "Haynes, S. — Etruscan Civilisation (2000)"
    ],
    notableStructures: ["Tarquinia tomb paintings (UNESCO)", "Cerveteri necropolis (UNESCO)", "Veii city site", "Populonia metalworking complex"],
    plausibilityScore: { up: 934, dn: 38 }
  },
  936: {
    locationType: "A",
    tags: ["levant", "phoenician", "alphabet", "maritime-trade", "purple-dye", "tyre", "sidon", "byblos", "carthage-founder"],
    researchers: [],
    sources: [
      "Markoe, G.E. — Phoenicians (2000)",
      "Aubet, M.E. — The Phoenicians and the West (2001)"
    ],
    notableStructures: ["Tyre island city (Lebanon)", "Byblos harbour and temples", "Sidon royal tombs", "Kition sanctuary (Cyprus)"],
    plausibilityScore: { up: 1234, dn: 44 }
  },
  937: {
    locationType: "A",
    tags: ["north-africa", "carthage", "punic", "hannibal", "rome-wars", "mediterranean-empire", "phoenician-colony", "tunisia"],
    researchers: [],
    sources: [
      "Lancel, S. — Carthage: A History (1995)",
      "Miles, R. — Carthage Must Be Destroyed (2010)"
    ],
    notableStructures: ["Carthage tophet (child burial precinct)", "Carthage harbour (cothon)", "Byrsa Hill citadel", "Carthage baths (Roman-era successor)"],
    plausibilityScore: { up: 1456, dn: 67 }
  },
  938: {
    locationType: "A",
    tags: ["steppe", "scythian", "iranian", "nomadic", "horse-warriors", "kurgan", "gold", "animal-style", "herodotus"],
    researchers: [],
    sources: [
      "Cunliffe, B. — The Scythians: Nomad Warriors of the Steppe (2019)",
      "Rolle, R. — The World of the Scythians (1989)"
    ],
    notableStructures: ["Chertomlyk kurgan (Ukraine)", "Solokha kurgan (Ukraine)", "Pazyryk burial mounds (Altai)", "Arzhan kurgan (Tuva)"],
    plausibilityScore: { up: 923, dn: 33 }
  },
  939: {
    locationType: "A",
    tags: ["central-asia", "sogdian", "silk-road", "samarkand", "merchant", "wall-paintings", "script-ancestor", "uzbekistan"],
    researchers: [],
    sources: [
      "de la Vaissière, E. — Sogdian Traders: A History (2005)",
      "Compareti, M. — Samarkand the Centre of the World (2001)"
    ],
    notableStructures: ["Afrasiab palace murals (ancient Samarkand)", "Panjikent painted houses", "Sogdian colony at Dunhuang (China)"],
    plausibilityScore: { up: 712, dn: 28 }
  },
  940: {
    locationType: "A",
    tags: ["central-asia", "bmac", "oxus", "bronze-age", "proto-aryan", "lapis-lazuli", "gonur-tepe", "turkmenistan", "indo-iranian"],
    researchers: [],
    sources: [
      "Sarianidi, V. — Margiana and Protozoroastrism (1998)",
      "Hiebert, F.T. — Origins of the Bronze Age Oasis Civilisation in Central Asia (1994)"
    ],
    notableStructures: ["Gonur Tepe palace-temple complex (Turkmenistan)", "Dashly 3 (Afghanistan)", "Togolok 21 sanctuary"],
    plausibilityScore: { up: 623, dn: 34 }
  }

// -----------------------------------------------------------------------
// END OF PHASE_5aq_APPEND_extended.js
// The CIV_META object should still close with };  after this block
// -----------------------------------------------------------------------,
// PHASE_5ar_APPEND_extended.js
// Tempus Linea — CHRONOS
// Civilizations 941–970 — Extended metadata
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local data-extended.js file
// 2. Find the very last closing brace before the final };
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_META object
// -----------------------------------------------------------------------

  941: {
    locationType: "A",
    tags: ["anatolia", "lydia", "coinage", "croesus", "sardis", "pactolus", "persian-conquest", "gold"],
    researchers: [],
    sources: [
      "Ramage, A. & Craddock, P. — King Croesus' Gold (2000)",
      "Roosevelt, C.H. — The Archaeology of Lydia (2009)"
    ],
    notableStructures: ["Sardis city complex", "Temple of Artemis at Sardis", "Bin Tepe royal tumuli"],
    plausibilityScore: { up: 823, dn: 19 }
  },
  942: {
    locationType: "A",
    tags: ["anatolia", "phrygia", "midas", "gordion", "gordian-knot", "indo-european", "cimmerian-destruction"],
    researchers: [],
    sources: [
      "Sams, G.K. — The Early Phrygian Pottery (1994)",
      "Voigt, M.M. — Gordion Excavations (2011)"
    ],
    notableStructures: ["Gordion citadel mound", "Midas Mound tumulus", "Midas City rock-cut monuments (Yazılıkaya)"],
    plausibilityScore: { up: 634, dn: 22 }
  },
  943: {
    locationType: "A",
    tags: ["anatolia", "urartu", "lake-van", "iron-age", "assyria-rival", "bronze-cauldrons", "fortress", "armenia-precursor"],
    researchers: [],
    sources: [
      "Zimansky, P. — Ecology and Empire: The Structure of the Urartian State (1985)",
      "Salvini, M. — Geschichte und Kultur der Urartäer (1995)"
    ],
    notableStructures: ["Van Fortress (Tushpa capital)", "Erebuni Fortress (Yerevan)", "Ayanis Fortress", "Çavuştepe Fortress"],
    plausibilityScore: { up: 567, dn: 18 }
  },
  944: {
    locationType: "A",
    tags: ["iran", "median", "ecbatana", "iranian", "assyria-destroyer", "nineveh", "satrap-precursor", "zagros"],
    researchers: [],
    sources: [
      "Dandamaev, M.A. — A Political History of the Achaemenid Empire (1989)",
      "Diakonoff, I.M. — The History of Media (1956)"
    ],
    notableStructures: ["Ecbatana (Hamadan) — concentric-walled capital", "Median fire temples (Nush-i Jan)"],
    plausibilityScore: { up: 612, dn: 24 }
  },
  945: {
    locationType: "A",
    tags: ["iran", "elam", "susa", "proto-elamite", "chogha-zanbil", "ziggurat", "bronze-age", "mesopotamia-rival"],
    researchers: [],
    sources: [
      "Potts, D.T. — The Archaeology of Elam (1999)",
      "Carter, E. & Stolper, M.W. — Elam: Surveys of Political History and Archaeology (1984)"
    ],
    notableStructures: ["Chogha Zanbil ziggurat (UNESCO)", "Susa palace complex", "Haft Tepe temple"],
    plausibilityScore: { up: 734, dn: 27 }
  },
  946: {
    locationType: "A",
    tags: ["anatolia", "hittite", "iron-working", "chariot", "hattusa", "kadesh", "peace-treaty", "bronze-age-collapse"],
    researchers: [],
    sources: [
      "Bryce, T. — The Kingdom of the Hittites (1998)",
      "Gurney, O.R. — The Hittites (1952)"
    ],
    notableStructures: ["Hattusa capital (UNESCO)", "Yazılıkaya rock sanctuary", "Lion Gate (Hattusa)", "Sphinx Gate (Alacahöyük)"],
    plausibilityScore: { up: 1234, dn: 38 }
  },
  947: {
    locationType: "A",
    tags: ["syria", "mitanni", "hurrian", "indo-aryan", "vedic-deities", "horse-training", "kikkuli", "bronze-age"],
    researchers: [],
    sources: [
      "Beal, R.H. — The Organisation of the Hittite Military (1992)",
      "Wilhelm, G. — The Hurrians (1989)"
    ],
    notableStructures: ["Washukanni capital (unlocated — Tell Fakhariyah candidate)", "Nuzi administrative centre (Iraq)"],
    plausibilityScore: { up: 589, dn: 34 }
  },
  948: {
    locationType: "A",
    tags: ["babylon", "kassite", "mesopotamia", "amarna-letters", "kudurru", "marduk", "long-dynasty", "bronze-age"],
    researchers: [],
    sources: [
      "Brinkman, J.A. — A Political History of Post-Kassite Babylonia (1968)",
      "Clayden, T. — Kassite Babylonia (2019)"
    ],
    notableStructures: ["Dur-Kurigalzu ziggurat (Aqar Quf, Iraq)", "Nippur Kassite temple complex"],
    plausibilityScore: { up: 534, dn: 22 }
  },
  949: {
    locationType: "A",
    tags: ["israel", "judah", "jerusalem", "solomon-temple", "monotheism", "bible", "assyrian-conquest", "babylonian-exile"],
    researchers: [],
    sources: [
      "Finkelstein, I. & Silberman, N.A. — The Bible Unearthed (2001)",
      "Mazar, A. — Archaeology of the Land of the Bible (1990)"
    ],
    notableStructures: ["Temple Mount / First Temple site (Jerusalem)", "City of David excavations", "Tel Megiddo (Armageddon site)", "Tel Hazor"],
    plausibilityScore: { up: 1567, dn: 189 }
  },
  950: {
    locationType: "A",
    tags: ["syria", "aramean", "damascus", "aramaic-language", "lingua-franca", "bronze-age-collapse-successor", "assyrian-absorption"],
    researchers: [],
    sources: [
      "Lipinski, E. — The Aramaeans: Their Ancient History, Culture, Religion (2000)",
      "Pitard, W.T. — Ancient Damascus (1987)"
    ],
    notableStructures: ["Damascus Old City (continuous occupation)", "Hamath (Hama) citadel", "Tell Halaf Neo-Hittite palace"],
    plausibilityScore: { up: 623, dn: 21 }
  },
  951: {
    locationType: "A",
    tags: ["babylon", "neo-babylonian", "chaldean", "nebuchadnezzar", "jerusalem-destruction", "hanging-gardens", "ishtar-gate", "tower-of-babel"],
    researchers: [],
    sources: [
      "Wiseman, D.J. — Nebuchadrezzar and Babylon (1985)",
      "Van De Mieroop, M. — A History of the Ancient Near East (2004)"
    ],
    notableStructures: ["Ishtar Gate (now Berlin Pergamon Museum)", "Etemenanki ziggurat (Tower of Babel)", "Babylon Processional Way", "Hanging Gardens (disputed location)"],
    plausibilityScore: { up: 1456, dn: 67 }
  },
  952: {
    locationType: "A",
    tags: ["sudan", "nubia", "kerma", "deffufa", "pre-egypt", "sub-saharan-urban", "nile", "indigenous-african-state"],
    researchers: [],
    sources: [
      "Bonnet, C. — Kerma: Royaume de Nubie (1990)",
      "O'Connor, D. — Ancient Nubia: Egypt's Rival in Africa (1993)"
    ],
    notableStructures: ["Western Deffufa (Kerma)", "Eastern Deffufa (Kerma)", "Kerma royal tumuli cemetery"],
    plausibilityScore: { up: 712, dn: 24 }
  },
  953: {
    locationType: "A",
    tags: ["sudan", "nubia", "napatan", "black-pharaohs", "25th-dynasty", "pyramids", "taharqa", "amun", "kushite"],
    researchers: [],
    sources: [
      "Kendall, T. — Kerma and the Kingdom of Kush (1997)",
      "Török, L. — The Kingdom of Kush (1997)"
    ],
    notableStructures: ["El-Kurru pyramid field", "Nuri pyramid field", "Jebel Barkal sanctuary (Napata)", "Meroe North Cemetery"],
    plausibilityScore: { up: 834, dn: 28 }
  },
  954: {
    locationType: "B",
    tags: ["punt", "horn-of-africa", "egypt-trade", "incense", "hatshepsut", "debated-location", "myrrh", "eritrea-candidate"],
    researchers: [],
    sources: [
      "Kitchen, K.A. — Punt and How to Get There (1971)",
      "Bradbury, L. — Kpn-Boats, Punt Trade, and a Lost Emporium (1996)"
    ],
    locationTheories: [
      {
        lat: 15.3333,
        lng: 38.9333,
        label: "Eritrean / northern Ethiopian coast — DNA baboon evidence",
        source: "Dominy, N.J. et al. — Baboon phylogeography and the origin of Punt (2020)",
        researcher: null,
        up: 892,
        dn: 234
      },
      {
        lat: 11.5000,
        lng: 43.1500,
        label: "Djibouti / Gulf of Aden coast candidate",
        source: "Kitchen, K.A. — Punt and How to Get There (1971)",
        researcher: null,
        up: 567,
        dn: 312
      },
      {
        lat: 13.0000,
        lng: 46.0000,
        label: "Southern Arabian Peninsula (Yemen / Oman) candidate",
        source: "Sayed, A.M.A. — Discovery of the Site of the 12th Dynasty Port at Wadi Gawasis (1977)",
        researcher: null,
        up: 445,
        dn: 456
      },
      {
        lat: -15.0000,
        lng: 40.0000,
        label: "Mozambique coast — southern African candidate (minority view)",
        source: "Mahoney, A. — Punt: An Overview (2012)",
        researcher: null,
        up: 189,
        dn: 712
      }
    ],
    plausibilityScore: { up: 934, dn: 312 }
  },
  955: {
    locationType: "A",
    tags: ["china", "liangzhu", "jade", "neolithic", "yangtze", "hydraulic-engineering", "cong", "bi-disc", "flood-myth"],
    researchers: [],
    sources: [
      "Liu, L. — The Chinese Neolithic (2004)",
      "Underhill, A.P. — A Companion to Chinese Archaeology (2013)"
    ],
    notableStructures: ["Liangzhu capital site (UNESCO — Zhejiang)", "Liangzhu dam and reservoir system", "Fanshan royal cemetery"],
    plausibilityScore: { up: 789, dn: 29 }
  },
  956: {
    locationType: "A",
    tags: ["china", "longshan", "yellow-river", "neolithic", "black-pottery", "oracle-bone-precursor", "walled-settlements", "xia-candidate"],
    researchers: [],
    sources: [
      "Chang, K.C. — The Archaeology of Ancient China (1986)",
      "Liu, L. & Chen, X. — State Formation in Early China (2003)"
    ],
    notableStructures: ["Taosi walled city (Shanxi)", "Yaowangcheng walled settlement (Shandong)", "Longshan pottery kiln sites"],
    plausibilityScore: { up: 678, dn: 33 }
  },
  957: {
    locationType: "B",
    tags: ["china", "erlitou", "xia-dynasty", "bronze-age", "palace", "yellow-river", "henan", "debated-identity"],
    researchers: [],
    sources: [
      "Liu, L. & Chen, X. — The Archaeology of China (2012)",
      "Thorp, R.L. — China in the Early Bronze Age (2006)"
    ],
    locationTheories: [
      {
        lat: 34.6833,
        lng: 112.6333,
        label: "Erlitou site, Yanshi, Henan — Xia Dynasty candidate",
        source: "Liu, L. & Chen, X. — The Archaeology of China (2012)",
        researcher: null,
        up: 1234,
        dn: 456
      },
      {
        lat: 34.7500,
        lng: 113.6500,
        label: "Zhengzhou Shang city — alternate early Shang identification",
        source: "Thorp, R.L. — China in the Early Bronze Age (2006)",
        researcher: null,
        up: 567,
        dn: 678
      }
    ],
    plausibilityScore: { up: 892, dn: 534 }
  },
  958: {
    locationType: "C",
    tags: ["china", "legendary", "three-sovereigns", "five-emperors", "huangdi", "yellow-emperor", "flood-myth", "xia-precursor", "theorized"],
    researchers: [],
    sources: [
      "Birrell, A. — Chinese Mythology: An Introduction (1993)",
      "Allan, S. — The Shape of the Turtle: Myth, Art and Cosmos in Early China (1991)"
    ],
    locationTheories: [
      {
        lat: 34.7667,
        lng: 110.8333,
        label: "Yellow River heartland — Yellow Emperor traditional homeland",
        source: "Chinese historical tradition — Shiji (Records of the Grand Historian)",
        researcher: null,
        up: 678,
        dn: 456
      },
      {
        lat: 35.5000,
        lng: 114.3000,
        label: "Central Plains / Henan — alternative legendary centre",
        source: "Birrell, A. — Chinese Mythology (1993)",
        researcher: null,
        up: 445,
        dn: 567
      }
    ],
    plausibilityScore: { up: 712, dn: 534 }
  },
  959: {
    locationType: "A",
    tags: ["china", "sanxingdui", "sichuan", "bronze", "bronze-masks", "sacred-tree", "shu-kingdom", "non-han", "sacrificial-pits"],
    researchers: [],
    sources: [
      "Bagley, R. — Shang Ritual Bronzes in the Arthur M. Sackler Collections (1987)",
      "Sun, H. — Sanxingdui: Mysterious Kingdom (1999)"
    ],
    notableStructures: ["Sanxingdui sacrificial pit complex (8 pits)", "Sanxingdui walled city (Guanghan, Sichuan)"],
    plausibilityScore: { up: 1234, dn: 55 }
  },
  960: {
    locationType: "A",
    tags: ["vietnam", "dong-son", "bronze-drum", "red-river", "southeast-asia", "maritime-trade", "han-resistance", "trung-sisters"],
    researchers: [],
    sources: [
      "Higham, C. — The Bronze Age of Southeast Asia (1996)",
      "Taylor, K.W. — The Birth of Vietnam (1983)"
    ],
    notableStructures: ["Dong Son village site (Thanh Hoa, Vietnam)", "Co Loa citadel (Hanoi region — Lac Viet capital)"],
    plausibilityScore: { up: 623, dn: 22 }
  },
  961: {
    locationType: "A",
    tags: ["china", "yunnan", "dian", "bronze", "cowrie-containers", "lake-dian", "southwest-china", "han-vassal"],
    researchers: [],
    sources: [
      "Pirazzoli-t'Serstevens, M. — The Han Dynasty (1982)",
      "von Falkenhausen, L. — Chinese Society in the Age of Confucius (2006)"
    ],
    notableStructures: ["Shizhaishan bronze burial site (Yunnan)", "Lijiashan bronze hoard site"],
    plausibilityScore: { up: 534, dn: 19 }
  },
  962: {
    locationType: "A",
    tags: ["korea", "three-kingdoms", "baekje", "buddhism-japan", "gold-art", "silla-tang-defeat", "southwest-korea"],
    researchers: [],
    sources: [
      "Best, J.W. — A History of the Early Korean Kingdom of Paekche (2006)",
      "Lee, K.B. — A New History of Korea (1984)"
    ],
    notableStructures: ["Mongchontoseong fortress (Seoul)", "Buyeo palace sites (later Baekje capital)", "Mireuksa Temple site (largest Korean Buddhist temple)"],
    plausibilityScore: { up: 623, dn: 21 }
  },
  963: {
    locationType: "A",
    tags: ["manchuria", "balhae", "bohai", "goguryeo-successor", "five-capitals", "tang-china", "korea-manchuria", "khitan-destruction"],
    researchers: [],
    sources: [
      "Song, K. — Balhae: An Overview (2012)",
      "Lee, K.B. — A New History of Korea (1984)"
    ],
    notableStructures: ["Shangjing (Upper Capital) of Balhae (Heilongjiang, China)", "Dongmo Mountain fortress (Jilin)"],
    plausibilityScore: { up: 445, dn: 67 }
  },
  964: {
    locationType: "A",
    tags: ["india", "pallava", "kanchipuram", "dravidian-architecture", "mahabalipuram", "grantha-script", "south-india", "tamil"],
    researchers: [],
    sources: [
      "Lockwood, M. — Mahabalipuram and the Pallavas (1982)",
      "Nagaswamy, R. — Pallava Art (1995)"
    ],
    notableStructures: ["Shore Temple (Mahabalipuram, UNESCO)", "Descent of the Ganges relief", "Pancha Rathas monolithic temples", "Kailasanathar Temple (Kanchipuram)"],
    plausibilityScore: { up: 834, dn: 28 }
  },
  965: {
    locationType: "A",
    tags: ["india", "chalukya", "badami", "deccan", "cave-temples", "vesara-architecture", "pattadakal", "aihole", "karnataka"],
    researchers: [],
    sources: [
      "Foekema, G. — A Complete Guide to Hoysala Temples (1996)",
      "Michell, G. — The Penguin Guide to the Monuments of India Vol.1 (1989)"
    ],
    notableStructures: ["Badami Cave Temples", "Pattadakal temple complex (UNESCO)", "Aihole temple group (70+ temples)", "Meguti Jain Temple"],
    plausibilityScore: { up: 712, dn: 24 }
  },
  966: {
    locationType: "A",
    tags: ["india", "rashtrakuta", "deccan", "kailasa-temple", "ellora", "monolithic", "abbasid-contact", "karnataka"],
    researchers: [],
    sources: [
      "Nagaraju, S. — Buddhist Architecture of Western India (1981)",
      "Michell, G. — The Penguin Guide to the Monuments of India Vol.1 (1989)"
    ],
    notableStructures: ["Kailasa Temple, Ellora (Cave 16 — monolithic)", "Ellora cave complex (UNESCO)", "Rashtrakuta capital Manyakheta"],
    plausibilityScore: { up: 1023, dn: 31 }
  },
  967: {
    locationType: "A",
    tags: ["india", "magadha", "bihar", "gangetic", "buddha", "mahavira", "pataliputra", "nanda", "war-elephants", "alexander"],
    researchers: [],
    sources: [
      "Thapar, R. — Ashoka and the Decline of the Mauryas (1961)",
      "Chakravarti, U. — The Social Dimensions of Early Buddhism (1987)"
    ],
    notableStructures: ["Pataliputra (Patna) city remains", "Rajgir fortified city (early Magadha capital)", "Bodh Gaya (Buddhist enlightenment site — within kingdom)"],
    plausibilityScore: { up: 934, dn: 33 }
  },
  968: {
    locationType: "A",
    tags: ["central-asia", "kushan", "silk-road", "gandhara", "buddhism-spread", "afghanistan", "greco-buddhist", "bactria"],
    researchers: [],
    sources: [
      "Rosenfield, J.M. — The Dynastic Arts of the Kushans (1967)",
      "Staviskij, B.J. — La Bactriane sous les Kushans (1986)"
    ],
    notableStructures: ["Surkh Kotal dynastic sanctuary (Afghanistan)", "Gandhara Buddhist stupas (Taxila)", "Khalchayan palace (Uzbekistan)", "Bamiyan Buddha niches (later Kushan-influenced)"],
    plausibilityScore: { up: 856, dn: 34 }
  },
  969: {
    locationType: "A",
    tags: ["iran", "parthian", "arsacid", "silk-road", "carrhae", "rome-rival", "horse-archer", "feudal", "mesopotamia"],
    researchers: [],
    sources: [
      "Colledge, M.A.R. — The Parthians (1967)",
      "Bivar, A.D.H. — The Political History of Iran under the Arsacids (1983)"
    ],
    notableStructures: ["Ctesiphon palace complex (Iraq)", "Nisa royal Parthian city (Turkmenistan)", "Hatra fortified city (Iraq, UNESCO)", "Dura-Europos border fortress"],
    plausibilityScore: { up: 923, dn: 38 }
  },
  970: {
    locationType: "C",
    tags: ["india", "dwarka", "submerged", "gujarat", "mahabharata", "krishna", "sea-level-rise", "hancock", "theorized"],
    researchers: ["Graham Hancock"],
    sources: [
      "Gaur, A.S. et al. — Underwater Explorations off Dwarka (2004)",
      "Hancock, G. — Underworld: Flooded Kingdoms of the Ice Age (2002)"
    ],
    locationTheories: [
      {
        lat: 22.2394,
        lng: 68.9678,
        label: "Offshore Dwarka, Gujarat — NIOT submerged structures site",
        source: "Gaur, A.S. et al. — Underwater Explorations off Dwarka (2004)",
        researcher: null,
        up: 892,
        dn: 312
      },
      {
        lat: 22.2394,
        lng: 68.9678,
        label: "Dwarka offshore — post-glacial sea-level inundation (7000–9000 BCE hypothesis)",
        source: "Hancock, G. — Underworld: Flooded Kingdoms of the Ice Age (2002)",
        researcher: "Graham Hancock",
        up: 634,
        dn: 567
      }
    ],
    plausibilityScore: { up: 789, dn: 534 }
  }

// -----------------------------------------------------------------------
// END OF PHASE_5ar_APPEND_extended.js
// The CIV_META object should still close with };  after this block
// -----------------------------------------------------------------------,
// PHASE_5as_APPEND_extended.js
// Tempus Linea — CHRONOS
// Civilizations 971–1000 — Extended metadata
// -----------------------------------------------------------------------
// HOW TO APPLY:
// 1. Open your local data-extended.js file
// 2. Find the very last closing brace before the final };
// 3. Add a comma after that closing brace:   },
// 4. Paste all lines between the dashes below
// 5. The file should still end with };  to close the CIV_META object
// -----------------------------------------------------------------------

  971: {
    locationType: "A",
    tags: ["iran", "sassanid", "zoroastrianism", "persia", "iwan", "silk-weaving", "byzantium-rival", "islamic-precursor"],
    researchers: [],
    sources: [
      "Frye, R.N. — The Heritage of Persia (1963)",
      "Yarshater, E. (ed.) — The Cambridge History of Iran Vol.3 (1983)"
    ],
    notableStructures: ["Ctesiphon Arch (Taq Kasra)", "Persepolis Sassanid additions", "Bishapur city and rock reliefs", "Firuzabad palace"],
    plausibilityScore: { up: 1234, dn: 38 }
  },
  972: {
    locationType: "A",
    tags: ["iran", "achaemenid", "cyrus", "darius", "persepolis", "satrap", "royal-road", "cyrus-cylinder", "world-empire"],
    researchers: [],
    sources: [
      "Briant, P. — From Cyrus to Alexander (2002)",
      "Wiesehöfer, J. — Ancient Persia (1996)"
    ],
    notableStructures: ["Persepolis (Takht-e Jamshid, UNESCO)", "Pasargadae — Cyrus tomb (UNESCO)", "Susa palace complex", "Naqsh-e Rostam royal tombs"],
    plausibilityScore: { up: 1789, dn: 55 }
  },
  973: {
    locationType: "A",
    tags: ["syria", "seleucid", "hellenistic", "alexander-successor", "antioch", "bactria", "maccabean-revolt", "greek-spread"],
    researchers: [],
    sources: [
      "Grainger, J.D. — A Seleukid Prosopography and Gazeteer (1997)",
      "Sherwin-White, S. & Kuhrt, A. — From Samarkhand to Sardis (1993)"
    ],
    notableStructures: ["Antioch on the Orontes (capital)", "Seleucia on the Tigris", "Dura-Europos frontier city", "Apamea on the Orontes"],
    plausibilityScore: { up: 923, dn: 34 }
  },
  974: {
    locationType: "A",
    tags: ["egypt", "ptolemaic", "hellenistic", "alexandria", "library", "cleopatra", "mouseion", "greek-pharaoh"],
    researchers: [],
    sources: [
      "Hölbl, G. — A History of the Ptolemaic Empire (2001)",
      "Fraser, P.M. — Ptolemaic Alexandria (1972)"
    ],
    notableStructures: ["Library of Alexandria (destroyed)", "Pharos Lighthouse (destroyed — Seven Wonders)", "Kom el-Shoqafa catacombs", "Temple of Horus at Edfu (Ptolemaic)"],
    plausibilityScore: { up: 1567, dn: 67 }
  },
  975: {
    locationType: "A",
    tags: ["central-asia", "bactria", "greco-bactrian", "hellenistic", "afghanistan", "silk-road", "buddhist-coins", "milindapanha"],
    researchers: [],
    sources: [
      "Tarn, W.W. — The Greeks in Bactria and India (1938)",
      "Holt, F.L. — Thundering Zeus: The Making of Hellenistic Bactria (1999)"
    ],
    notableStructures: ["Bactra / Balkh city (Afghanistan)", "Ai-Khanoum Greek city (Afghanistan)", "Taxila Hellenistic quarter (Pakistan)"],
    plausibilityScore: { up: 712, dn: 28 }
  },
  976: {
    locationType: "A",
    tags: ["india", "maurya", "chandragupta", "ashoka", "arthashastra", "buddhism", "edicts", "kalinga", "pan-india"],
    researchers: [],
    sources: [
      "Thapar, R. — Ashoka and the Decline of the Mauryas (1961)",
      "Trautmann, T.R. — Kautilya and the Arthashastra (1971)"
    ],
    notableStructures: ["Ashoka Pillar (Vaishali)", "Sanchi Stupa (UNESCO)", "Pataliputra palace remains", "Dhauli rock edict (Kalinga site)"],
    plausibilityScore: { up: 1678, dn: 44 }
  },
  977: {
    locationType: "A",
    tags: ["india", "gupta", "golden-age", "aryabhata", "kalidasa", "zero", "decimal", "sanskrit", "astronomy"],
    researchers: [],
    sources: [
      "Majumdar, R.C. — The Gupta Empire (1948)",
      "Singh, U. — A History of Ancient and Early Medieval India (2008)"
    ],
    notableStructures: ["Nalanda University (Bihar)", "Dashavatara Temple Deogarh", "Udayagiri cave complex (MP)", "Gupta-era Vakataka temples"],
    plausibilityScore: { up: 1456, dn: 38 }
  },
  978: {
    locationType: "A",
    tags: ["india", "harsha", "kanauj", "xuanzang", "prayag-assembly", "sanskrit-drama", "north-india", "post-gupta"],
    researchers: [],
    sources: [
      "Beal, S. — Si-Yu-Ki: Buddhist Records of the Western World (1884)",
      "Devahuti, D. — Harsha: A Political Study (1970)"
    ],
    notableStructures: ["Kanauj capital remains (UP)", "Prayagraj (Allahabad) assembly site", "Nalanda (patronised by Harsha)"],
    plausibilityScore: { up: 634, dn: 22 }
  },
  979: {
    locationType: "A",
    tags: ["india", "eastern-chalukya", "vengi", "andhra", "telugu-literature", "krishna-godavari", "chola-alliance"],
    researchers: [],
    sources: [
      "Sastri, N. — A History of South India (1955)",
      "Ramesh, K.V. — Chalukyas of Vataapi (1984)"
    ],
    notableStructures: ["Draksharama Bhimeswara Temple (AP)", "Chalukyan temples of the Krishna-Godavari delta"],
    plausibilityScore: { up: 445, dn: 19 }
  },
  980: {
    locationType: "A",
    tags: ["india", "kakatiya", "warangal", "telangana", "rudrama-devi", "ramappa-temple", "diamond-trade", "marco-polo", "tank-irrigation"],
    researchers: [],
    sources: [
      "Parabrahma Sastry, P.V. — The Kakatiyas of Warangal (1978)",
      "Talbot, C. — Precolonial India in Practice (2001)"
    ],
    notableStructures: ["Ramappa Temple (UNESCO)", "Warangal Fort", "Thousand Pillar Temple", "Pakhal and Ramappa irrigation lakes"],
    plausibilityScore: { up: 712, dn: 24 }
  },
  981: {
    locationType: "A",
    tags: ["india", "hoysala", "karnataka", "soapstone-temples", "star-plan", "belur", "halebidu", "vijayanagara-precursor"],
    researchers: [],
    sources: [
      "Foekema, G. — Hoysala Architecture (1994)",
      "Michell, G. — The Hoysala Temple (1992)"
    ],
    notableStructures: ["Hoysaleswara Temple (Halebidu)", "Chennakeshava Temple (Belur)", "Kesava Temple (Somnathpur)", "Shravanabelagola Gommateshwara statue"],
    plausibilityScore: { up: 834, dn: 27 }
  },
  982: {
    locationType: "A",
    tags: ["india", "maratha", "shivaji", "deccan", "guerrilla-warfare", "hindu-resistance", "mughal-rival", "sahyadri-forts"],
    researchers: [],
    sources: [
      "Gordon, S. — The Marathas 1600–1818 (1993)",
      "Sarkar, J. — Shivaji and His Times (1919)"
    ],
    notableStructures: ["Raigad Fort (Shivaji's capital)", "Sindhudurg Fort (coastal)", "Pratapgad Fort (Afzal Khan battle site)", "Sinhagad Fort"],
    plausibilityScore: { up: 934, dn: 33 }
  },
  983: {
    locationType: "A",
    tags: ["india", "vijayanagara", "sangama", "founding-phase", "hampi", "tungabhadra", "vidyaranya", "bahmani-rival"],
    researchers: [],
    sources: [
      "Stein, B. — Vijayanagara (1989)",
      "Sewell, R. — A Forgotten Empire (1900)"
    ],
    notableStructures: ["Hampi founding Virupaksha Temple", "Tungabhadra river crossing fortifications", "Early Vijayanagara palace platform"],
    plausibilityScore: { up: 623, dn: 21 }
  },
  984: {
    locationType: "A",
    tags: ["india", "deccan-sultanates", "bijapur", "golconda", "gol-gumbaz", "deccani-painting", "diamonds", "talikota", "persian-influence"],
    researchers: [],
    sources: [
      "Eaton, R.M. — A Social History of the Deccan (2005)",
      "Zebrowski, M. — Deccani Painting (1983)"
    ],
    notableStructures: ["Gol Gumbaz (Bijapur)", "Charminar (Golconda era Hyderabad)", "Ibrahim Rauza mausoleum (Bijapur)", "Golconda Fort"],
    plausibilityScore: { up: 734, dn: 28 }
  },
  985: {
    locationType: "A",
    tags: ["central-asia", "timurid", "timur", "tamerlane", "samarkand", "persian-miniature", "samarkand-observatory", "babur-ancestor"],
    researchers: [],
    sources: [
      "Manz, B.F. — The Rise and Rule of Tamerlane (1989)",
      "Golombek, L. & Wilber, D. — The Timurid Architecture of Iran and Turan (1988)"
    ],
    notableStructures: ["Gur-e-Amir mausoleum (Samarkand)", "Bibi-Khanym Mosque (Samarkand)", "Shah-i-Zinda necropolis", "Ulugh Beg Observatory (Samarkand)"],
    plausibilityScore: { up: 1023, dn: 67 }
  },
  986: {
    locationType: "A",
    tags: ["iran", "safavid", "shia-islam", "isfahan", "shah-abbas", "carpet", "miniature-painting", "naqsh-e-jahan"],
    researchers: [],
    sources: [
      "Savory, R. — Iran under the Safavids (1980)",
      "Canby, S. — Shah 'Abbas: The Remaking of Iran (2009)"
    ],
    notableStructures: ["Naqsh-e Jahan Square, Isfahan (UNESCO)", "Sheikh Lotfollah Mosque", "Shah Mosque (Imam Mosque)", "Ali Qapu Palace"],
    plausibilityScore: { up: 1234, dn: 44 }
  },
  987: {
    locationType: "A",
    tags: ["egypt-syria", "ayyubid", "saladin", "crusades", "jerusalem", "richard-i", "islamic-golden-age", "mamluk-precursor"],
    researchers: [],
    sources: [
      "Lyons, M.C. & Jackson, D.E.P. — Saladin: The Politics of the Holy War (1982)",
      "Ehrenkreutz, A.S. — Saladin (1972)"
    ],
    notableStructures: ["Citadel of Cairo (Saladin's foundation)", "Citadel of Aleppo (Ayyubid expansion)", "Saladin's Jerusalem fortifications"],
    plausibilityScore: { up: 1345, dn: 55 }
  },
  988: {
    locationType: "A",
    tags: ["egypt", "mamluk", "slave-soldiers", "mongol-defeat", "ain-jalut", "cairo", "sultan-hassan-mosque", "abbasid-shadow-caliphate"],
    researchers: [],
    sources: [
      "Irwin, R. — The Middle East in the Middle Ages: The Early Mamluk Sultanate (1986)",
      "Garcin, J.C. — The Regime of the Circassian Mamluks (1998)"
    ],
    notableStructures: ["Sultan Hassan Mosque-Madrasa (Cairo)", "Qalawun complex (Cairo)", "Citadel of Cairo (Mamluk expansion)", "Khan el-Khalili market complex"],
    plausibilityScore: { up: 1123, dn: 44 }
  },
  989: {
    locationType: "A",
    tags: ["egypt", "fatimid", "ismaili", "shia", "cairo", "al-azhar", "caliphate", "north-africa", "red-sea-trade"],
    researchers: [],
    sources: [
      "Halm, H. — The Fatimids and Their Traditions of Learning (1997)",
      "Bianquis, T. — Autonomous Egypt from Ibn Tulun to Kafur (1998)"
    ],
    notableStructures: ["Al-Azhar Mosque (Cairo, 970 CE)", "Al-Hakim Mosque (Cairo)", "Fatimid Cairo old city walls", "Al-Aqmar Mosque"],
    plausibilityScore: { up: 934, dn: 38 }
  },
  990: {
    locationType: "A",
    tags: ["iraq", "abbasid", "baghdad", "islamic-golden-age", "house-of-wisdom", "algebra", "mongol-sack", "caliphate"],
    researchers: [],
    sources: [
      "Kennedy, H. — The Prophet and the Age of the Caliphates (1986)",
      "Al-Khalili, J. — The House of Wisdom (2010)"
    ],
    notableStructures: ["Round City of Baghdad (destroyed)", "House of Wisdom (Bayt al-Hikma, destroyed)", "Abbasid Palace (Baghdad)", "Al-Mutawakkil Mosque (Samarra)"],
    plausibilityScore: { up: 1678, dn: 55 }
  },
  991: {
    locationType: "A",
    tags: ["syria", "umayyad", "damascus", "dome-of-the-rock", "arabic-administration", "islamic-expansion", "cordoba-branch"],
    researchers: [],
    sources: [
      "Hawting, G.R. — The First Dynasty of Islam: The Umayyad Caliphate (1986)",
      "Kennedy, H. — The Prophet and the Age of the Caliphates (1986)"
    ],
    notableStructures: ["Great Mosque of Damascus (Umayyad Mosque)", "Dome of the Rock (Jerusalem)", "Umayyad Palace (Amman Citadel)", "Desert palaces (Qusayr 'Amra, Qasr Kharana)"],
    plausibilityScore: { up: 1456, dn: 67 }
  },
  992: {
    locationType: "A",
    tags: ["arabia", "rashidun", "early-islam", "caliphate", "medina", "byzantine-defeat", "sassanid-defeat", "sunni-shia-schism"],
    researchers: [],
    sources: [
      "Donner, F.M. — The Early Islamic Conquests (1981)",
      "Kennedy, H. — The Great Arab Conquests (2007)"
    ],
    notableStructures: ["Masjid al-Nabawi (Medina)", "Masjid al-Quba (Medina — first mosque)", "Early Islamic Fustat (Cairo predecessor)"],
    plausibilityScore: { up: 1567, dn: 112 }
  },
  993: {
    locationType: "A",
    tags: ["west-africa", "mali", "mansa-musa", "timbuktu", "gold", "salt", "sundiata", "sahel", "islamic-scholarship"],
    researchers: [],
    sources: [
      "Niane, D.T. — Sundiata: An Epic of Old Mali (1965)",
      "Levtzion, N. — Ancient Ghana and Mali (1973)"
    ],
    notableStructures: ["Djinguereber Mosque (Timbuktu, UNESCO)", "Sankore Mosque and University (Timbuktu)", "Kumbi Saleh capital ruins", "Djenné Great Mosque (predecessor)"],
    plausibilityScore: { up: 1234, dn: 44 }
  },
  994: {
    locationType: "A",
    tags: ["west-africa", "songhai", "timbuktu", "niger-river", "askia-muhammad", "manuscripts", "moroccan-invasion", "firearms"],
    researchers: [],
    sources: [
      "Hunwick, J.O. — Timbuktu and the Songhay Empire (1999)",
      "Cissoko, S.M. — Tombouctou et l'empire Songhay (1975)"
    ],
    notableStructures: ["Askia's Tomb (Gao, UNESCO)", "Sankore University (Timbuktu)", "Gao capital remains", "Djenné Great Mosque (Songhai era)"],
    plausibilityScore: { up: 1089, dn: 38 }
  },
  995: {
    locationType: "A",
    tags: ["angola", "congo", "kongo-kingdom", "central-africa", "christianity-africa", "portuguese-contact", "slave-trade", "manikongo"],
    researchers: [],
    sources: [
      "Thornton, J.K. — The Kingdom of Kongo (1983)",
      "Hilton, A. — The Kingdom of Kongo (1985)"
    ],
    notableStructures: ["Mbanza Kongo / São Salvador (UNESCO — Angola)", "Kongo Catholic cathedral ruins", "Royal court compound remains"],
    plausibilityScore: { up: 789, dn: 28 }
  },
  996: {
    locationType: "A",
    tags: ["zimbabwe", "rozvi", "changamire", "southern-africa", "stone-walls", "portuguese-expulsion", "khami", "mfecane-destruction"],
    researchers: [],
    sources: [
      "Beach, D.N. — The Shona and Zimbabwe (1980)",
      "Pikirayi, I. — The Zimbabwe Culture (2001)"
    ],
    notableStructures: ["Khami Ruins (UNESCO)", "Danangombe royal enclosure", "Naletale decorated stone walls"],
    plausibilityScore: { up: 534, dn: 19 }
  },
  997: {
    locationType: "A",
    tags: ["south-africa", "zulu", "shaka", "impondo-zankomo", "isandlwana", "mfecane", "british-war", "nguni"],
    researchers: [],
    sources: [
      "Morris, D.R. — The Washing of the Spears (1965)",
      "Laband, J. — The Rise and Fall of the Zulu Nation (1997)"
    ],
    notableStructures: ["KwaBulawayo (Shaka's first capital)", "Ulundi (oNdini) royal enclosure", "Isandlwana battlefield site"],
    plausibilityScore: { up: 1123, dn: 44 }
  },
  998: {
    locationType: "A",
    tags: ["ethiopia", "solomonic", "haile-selassie", "adwa", "pan-african", "rastafari", "longest-dynasty", "oau-founder"],
    researchers: [],
    sources: [
      "Marcus, H.G. — A History of Ethiopia (1994)",
      "Prouty, C. & Rosenfeld, E. — Historical Dictionary of Ethiopia (1981)"
    ],
    notableStructures: ["Fasilides Castle (Gondar, UNESCO)", "Church of St Mary of Zion (Axum)", "Lalibela rock-hewn churches (UNESCO)", "Adwa battlefield memorial"],
    plausibilityScore: { up: 1234, dn: 55 }
  },
  999: {
    locationType: "C",
    tags: ["antediluvian", "younger-dryas", "hancock", "carlson", "schoch", "firestone", "global-flood", "pre-12800bce", "theorized", "global"],
    researchers: ["Graham Hancock", "Randall Carlson", "Robert Schoch", "Richard Firestone"],
    sources: [
      "Hancock, G. — Fingerprints of the Gods (1995)",
      "Hancock, G. — Magicians of the Gods (2015)",
      "Hancock, G. — America Before (2019)",
      "Firestone, R. et al. — Evidence for an extraterrestrial impact 12,900 years ago (PNAS, 2007)"
    ],
    locationTheories: [
      {
        lat: -75.0,
        lng: -60.0,
        label: "Antarctica — Hancock / Hapgood crustal displacement pole shift theory",
        source: "Hancock, G. — Fingerprints of the Gods (1995)",
        researcher: "Graham Hancock",
        up: 1234,
        dn: 892
      },
      {
        lat: 29.9792,
        lng: 31.1342,
        label: "Giza Plateau — Schoch Sphinx water erosion / pre-12,500 BCE construction",
        source: "Schoch, R. — Forgotten Civilization (2012)",
        researcher: "Robert Schoch",
        up: 1567,
        dn: 1234
      },
      {
        lat: 37.2231,
        lng: 38.9225,
        label: "Göbekli Tepe region — pre-YD civilisational horizon",
        source: "Hancock, G. — Magicians of the Gods (2015)",
        researcher: "Graham Hancock",
        up: 1789,
        dn: 892
      },
      {
        lat: 35.7000,
        lng: -88.0000,
        label: "Carolina Bays / Laurentide impact zone — Carlson / Firestone YDIH",
        source: "Firestone, R. et al. — PNAS (2007)",
        researcher: "Randall Carlson",
        up: 1123,
        dn: 1089
      }
    ],
    plausibilityScore: { up: 4567, dn: 3456 }
  },
  1000: {
    locationType: "B",
    tags: ["out-of-africa", "homo-sapiens", "migration", "global", "deep-time", "toba", "bering-land-bridge", "anchor-civilisation", "root-node"],
    researchers: [],
    sources: [
      "Oppenheimer, S. — Out of Eden: The Peopling of the World (2003)",
      "Wells, S. — The Journey of Man: A Genetic Odyssey (2002)",
      "Reich, D. — Who We Are and How We Got Here (2018)"
    ],
    notableStructures: ["Pinnacle Point (South Africa — earliest coastal occupation)", "Jwalapuram (India — Toba survival site)", "Lake Mungo (Australia — 65,000 BP)", "Monte Verde (Chile — early Americas)"],
    locationTheories: [
      {
        lat: -30.0,
        lng: 25.0,
        label: "Southern Africa — origin population and early dispersal hub",
        source: "Oppenheimer, S. — Out of Eden (2003)",
        researcher: null,
        up: 2134,
        dn: 112
      },
      {
        lat: 15.0,
        lng: 51.0,
        label: "Arabian Peninsula coastal route — primary Out of Africa corridor",
        source: "Wells, S. — The Journey of Man (2002)",
        researcher: null,
        up: 1678,
        dn: 189
      },
      {
        lat: -33.9167,
        lng: 151.2333,
        label: "Australia — earliest confirmed modern human occupation outside Africa (65,000 BP)",
        source: "Clarkson, C. et al. — Nature (2017)",
        researcher: null,
        up: 1456,
        dn: 234
      }
    ],
    plausibilityScore: { up: 3456, dn: 88 }
  }

// -----------------------------------------------------------------------
// END OF PHASE_5as_APPEND_extended.js
// The CIV_META object should still close with };  after this block
// -----------------------------------------------------------------------
};