/* ═══════════════════════════════════════════════════════════════════════════
   CHRONOS — data-extended-patch-5a.js
   CIV_META entries for ids 89–120. Append-only patch for data-extended.js.

   INTEGRATION: Insert these entries into the CIV_META object in
   data-extended.js, before the closing }; of CIV_META.

   Phase 5a — Bible v3
   ═══════════════════════════════════════════════════════════════════════════ */

  // ── BATCH 5a: ids 89–120 ─────────────────────────────────────────────────

  89:  { lang:'hebrew',       rel:'monotheist',  gov:'monarchy',   pop:'medium',
         locationType:'A',
         tags:['israel','judah','hebrew','bible','monotheism','david','solomon',
               'jerusalem','levant','iron age','assyria','babylon','diaspora',
               'religion','christianity','islam','torah'] },

  90:  { lang:'aramaic',      rel:'polytheist',  gov:'empire',     pop:'large',
         locationType:'A',
         tags:['aramaic','lingua franca','syria','mesopotamia','persian',
               'levant','script','language','jesus','alphabet','semitic',
               'hellenistic','nabataean','syriac','middle east'] },

  91:  { lang:'hawaiian',     rel:'polytheist',  gov:'chiefdom',   pop:'medium',
         locationType:'A',
         tags:['hawaii','polynesia','navigation','stars','ocean','kapu',
               'ali\'i','kahuna','heiau','pacific','voyaging','astronomy',
               'cook','mauna kea','hula','oral tradition'] },

  92:  { lang:'tongan',       rel:'polytheist',  gov:'monarchy',   pop:'medium',
         locationType:'A',
         tags:['tonga','polynesia','empire','lapaha','langi','ha\'amonga',
               'maritime','pacific','ocean','fiji','samoa','trilithon',
               'tu\'i tonga','coral','megalith','trade'] },

  93:  { lang:'unknown',      rel:'polytheist',  gov:'chiefdom',   pop:'medium',
         locationType:'B',
         tags:['nan madol','pohnpei','micronesia','basalt','megalith','reef',
               'islets','pacific','mystery','hancock','foerster','maritime',
               'engineering','undated','lost city','ocean'],
         locationTheories:[
           { lat:6.84, lng:158.25, label:'Nan Madol — Pohnpei (confirmed)', source:'UNESCO World Heritage documentation', researcher:null, up:4891, dn:289 },
           { lat:6.9,  lng:158.2,  label:'Earlier deep-water construction zone (speculative)', source:'Alternative archaeology', researcher:'Brien Foerster', up:891, dn:2102 }
         ] },

  94:  { lang:'bactrian',     rel:'buddhist',    gov:'empire',     pop:'large',
         locationType:'A',
         tags:['kushan','silk road','buddhism','bactria','afghanistan','india',
               'gandhara','kanishka','mahayana','syncretic','trade','central asia',
               'hellenistic','art','coins','zoroastrian'] },

  95:  { lang:'sogdian',      rel:'zoroastrian', gov:'city-state', pop:'medium',
         locationType:'A',
         tags:['sogdian','silk road','samarkand','bukhara','merchant','trade',
               'central asia','script','uyghur','mongolian','mural','afrasiab',
               'panjikent','zoroastrian','middlemen','transoxiana'] },

  96:  { lang:'khazar',       rel:'jewish',      gov:'khaganate',  pop:'medium',
         locationType:'B',
         tags:['khazar','judaism','jewish','turkic','caspian','caucasus',
               'khaganate','baqt','koestler','thirteenth tribe','byzantine',
               'islam','steppe','conversion','kievan rus'],
         locationTheories:[
           { lat:43.5, lng:47.0, label:'Itil — Khazar capital (Volga delta)', source:'Ibn Fadlan; al-Masudi', researcher:null, up:2891, dn:312 },
           { lat:44.0, lng:44.0, label:'Sarkel fortress (Don River)', source:'Byzantine sources', researcher:null, up:1891, dn:289 }
         ] },

  97:  { lang:'persian',      rel:'sunni',       gov:'empire',     pop:'large',
         locationType:'A',
         tags:['timurid','tamerlane','timur','samarkand','registan','ulugh beg',
               'observatory','astronomy','renaissance','islamic','central asia',
               'baburnama','mughal','safavid','miniature','poetry','silk road'] },

  98:  { lang:'unknown',      rel:'polytheist',  gov:'chiefdom',   pop:'small',
         locationType:'A',
         tags:['cycladic','aegean','marble','figurine','bronze age','naxos',
               'paros','syros','melos','obsidian','abstract','art','greece',
               'island','folded arm','mystery','minoan'] },

  99:  { lang:'latin',        rel:'christian',   gov:'empire',     pop:'large',
         locationType:'A',
         tags:['carolingian','charlemagne','frankish','europe','medieval',
               'renaissance','latin','script','verdun','cathedral','school',
               'france','germany','holy roman','papacy','classical'] },

  100: { lang:'venetian',     rel:'christian',   gov:'republic',   pop:'medium',
         locationType:'A',
         tags:['venice','republic','mediterranean','trade','arsenal','banking',
               'lagoon','maritime','ottoman','crusades','doge','longest republic',
               'italy','renaissance','silk','spice','glass'] },

  101: { lang:'slavic',       rel:'christian',   gov:'monarchy',   pop:'large',
         locationType:'A',
         tags:['kievan rus','slavic','viking','varangian','orthodox','cyrillic',
               'ukraine','russia','belarus','yaroslav','vladimir','mongol',
               'primary chronicle','byzantine','christianity','medieval'] },

  102: { lang:'zapotec',      rel:'polytheist',  gov:'city-state', pop:'medium',
         locationType:'A',
         tags:['zapotec','monte alban','oaxaca','mesoamerica','writing','script',
               'calendar','260 day','undeciphered','hieroglyphs','mexico',
               'pre-classic','urban','mountainTop','linguistic'] },

  103: { lang:'nahuatl',      rel:'polytheist',  gov:'empire',     pop:'medium',
         locationType:'A',
         tags:['toltec','tula','tollan','quetzalcoatl','tezcatlipoca','aztec',
               'mesoamerica','feathered serpent','chichen itza','post-classic',
               'warrior cult','collapse','drought','mexico','pre-columbian'] },

  104: { lang:'taino',        rel:'polytheist',  gov:'chiefdom',   pop:'medium',
         locationType:'A',
         tags:['taino','caribbean','columbus','hispaniola','cuba','puerto rico',
               'arawak','hurricane','barbecue','canoe','tobacco','hammock',
               'zemi','batey','cacique','extinction','contact','genocide'] },

  105: { lang:'muskogean',    rel:'polytheist',  gov:'chiefdom',   pop:'medium',
         locationType:'A',
         tags:['mississippian','cahokia','mound','monks mound','north america',
               'ceremonial','southeast','trade','pre-columbian','collapse',
               'drought','earthwork','complex','platform','1050 ce'] },

  106: { lang:'kikongo',      rel:'syncretic',   gov:'monarchy',   pop:'large',
         locationType:'A',
         tags:['kongo','central africa','kingdom','nsibidi','christianity',
               'syncretic','portugal','slave trade','drc','angola','congo',
               'mbanza kongo','administrative','matrilineal','bureaucracy'] },

  107: { lang:'amharic',      rel:'christian',   gov:'empire',     pop:'large',
         locationType:'A',
         tags:['ethiopia','abyssinia','aksum','orthodox','ge\'ez','ark','lalibela',
               'adwa','colonialism','haile selassie','kebra nagast','horn of africa',
               'ancient','continuous','church','rock hewn'] },

  108: { lang:'fon',          rel:'vodun',       gov:'monarchy',   pop:'medium',
         locationType:'A',
         tags:['dahomey','benin','west africa','agojie','amazon warrior','vodun',
               'abomey','slave trade','fon','ouidah','annual customs','ritual',
               'female warrior','military','pre-colonial'] },

  109: { lang:'nubian',       rel:'christian',   gov:'kingdom',    pop:'medium',
         locationType:'A',
         tags:['nubia','christian','makuria','nobadia','alodia','faras','fresco',
               'baqt','sudan','dongola','coptic','arab','ottoman','medieval',
               'nile','resistance','lake nasser'] },

  110: { lang:'kannada',      rel:'hindu',       gov:'empire',     pop:'large',
         locationType:'A',
         tags:['vijayanagara','hampi','south india','hindu','krishnadevaraya',
               'deccan','sultanate','talikota','temple','dravidian','karnataka',
               'stone chariot','hazara rama','ruins','renaissance'] },

  111: { lang:'burmese',      rel:'buddhist',    gov:'empire',     pop:'large',
         locationType:'A',
         tags:['bagan','pagan','myanmar','burma','theravada','buddhism','pagoda',
               'anawrahta','temple','irrawaddy','mongol','10000 temples',
               'stupa','southeast asia','faith','architecture'] },

  112: { lang:'korean',       rel:'buddhist',    gov:'monarchy',   pop:'large',
         locationType:'A',
         tags:['goryeo','korea','printing','moveable type','tripitaka',
               'celadon','pottery','mongol','joseon','buddhism','metal type',
               'gutenberg','koryeo','dynasty','manuscript','ceramics'] },

  113: { lang:'tamil',        rel:'hindu',       gov:'empire',     pop:'large',
         locationType:'A',
         tags:['chola','south india','maritime','empire','brihadeeswarar',
               'thanjavur','nataraja','bronze','temple','indian ocean',
               'rajendra','sumatra','navy','dravidian','tamil','trade'] },

  114: { lang:'persian',      rel:'shia',        gov:'empire',     pop:'large',
         locationType:'A',
         tags:['safavid','persia','iran','shia','isfahan','shah abbas',
               'carpet','architecture','sunni','ottoman','sectarian',
               'persian culture','identity','islamic','golden age'] },

  115: { lang:'urdu',         rel:'sunni',       gov:'empire',     pop:'large',
         locationType:'A',
         tags:['mughal','india','taj mahal','akbar','babur','timurid',
               'delhi','pluralist','islamic','hindu','gdp','wealth',
               'architecture','aurangzeb','british','1526'] },

  116: { lang:'unknown',      rel:'unknown',     gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['richat','eye of sahara','atlantis','mauritania','corsetti',
               'bright insight','plato','pillars','green sahara','theorized',
               'concentric','formation','geological','africa','pre-flood'],
         locationTheories:[
           { lat:21.12, lng:-11.40, label:'Richat Structure — Corsetti/Bright Insight', source:'Bright Insight YouTube', researcher:'Jimmy Corsetti', up:4891, dn:3102 },
           { lat:36.0,  lng:-24.0,  label:'Mid-Atlantic — Hancock/Sarmast', source:'Underworld (2002)', researcher:'Graham Hancock', up:3102, dn:2891 },
           { lat:36.4,  lng:25.4,   label:'Santorini / Minoan — mainstream', source:'Encyclopaedia Britannica', researcher:null, up:2891, dn:1891 }
         ] },

  117: { lang:'unknown',      rel:'unknown',     gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['antarctica','hapgood','crustal displacement','einstein','piri reis',
               'hancock','fingerprints','pre-glacial','theorized','map',
               'ice age','atlantis','pole shift','sub-glacial','coast'],
         locationTheories:[
           { lat:-75.0, lng:-60.0, label:'Antarctica — Hapgood/Hancock', source:'Earth\'s Shifting Crust (1958)', researcher:'Charles Hapgood', up:3102, dn:4891 },
           { lat:-72.0, lng:-75.0, label:'West Antarctic Ice Sheet', source:'Fingerprints of the Gods (1995)', researcher:'Graham Hancock', up:2102, dn:3891 }
         ] },

  118: { lang:'unknown',      rel:'unknown',     gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['younger dryas','ydih','firestone','carlson','comet','impact',
               'platinum','nanodiamonds','spherules','ydb','clovis','megafauna',
               'carolina bays','missoula','catastrophe','pre-flood','10800 bce'],
         locationTheories:[
           { lat:52.0,  lng:-85.0, label:'Laurentide Ice Sheet — primary impact zone', source:'Firestone et al. PNAS (2007)', researcher:'Richard Firestone', up:5102, dn:1203 },
           { lat:33.5,  lng:-79.5, label:'Carolina Bays — secondary ejecta field', source:'Kosmographia podcast', researcher:'Randall Carlson', up:3891, dn:891 }
         ] },

  119: { lang:'unknown',      rel:'polytheist',  gov:'unknown',    pop:'unknown',
         locationType:'B',
         tags:['pre-flood andean','tiwanaku','puma punku','posnansky','foerster',
               'astronomical dating','bolivia','andes','precision stonework',
               'theorized','pre-yd','15000 bce','obliquity','ecliptic'],
         locationTheories:[
           { lat:-16.56, lng:-68.67, label:'Kalasasaya Temple — Posnansky dating', source:'Tiahuanacu (1945)', researcher:'Arthur Posnansky', up:2102, dn:2891 },
           { lat:-14.70, lng:-75.10, label:'Puma Punku precision stonework', source:'Advanced Ancient Civilizations', researcher:'Brien Foerster', up:1891, dn:2102 }
         ] },

  120: { lang:'unknown',      rel:'theorized',   gov:'unknown',    pop:'unknown',
         locationType:'C',
         tags:['anunnaki','sitchin','nibiru','sumerian','ancient aliens','gold',
               'genetic engineering','tellinger','von daniken','slave species',
               'mesopotamia','south africa','mpumalanga','stone circles',
               'extraterrestrial','cuneiform','12th planet','theorized'],
         locationTheories:[
           { lat:31.0,  lng:46.0,  label:'Eridu / Sumer — Sitchin primary site', source:'The 12th Planet (1976)', researcher:'Zecharia Sitchin', up:4102, dn:6891 },
           { lat:-25.5, lng:30.5,  label:'Mpumalanga Stone Circles — Tellinger', source:'Slave Species of the Gods (2005)', researcher:'Michael Tellinger', up:2891, dn:4102 },
           { lat:29.97, lng:31.13, label:'Giza — von Däniken', source:'Chariots of the Gods (1968)', researcher:'Erich von Däniken', up:1891, dn:3102 }
         ] },
