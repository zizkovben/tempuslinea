/* ============================================================
   CHRONOS · PHASE 5at — APPEND to data.js
   Civilizations 1001–1030 (30 entries)
   Append only — paste these objects into the CIVS array in data.js,
   after the existing highest-id entry. Do not modify any existing record.

   ⚠️ UPDATE: continent keys below were corrected against the real
   README.md schema (fetched from github.com/zizkovben/tempuslinea) —
   valid keys are africa/americas/asia/europe/pacific/atlantic/global.
   The original draft used n-america/s-america/oceania/antarctica,
   none of which exist in your actual schema; all fixed below. There
   is no "antarctica" key in your documented set, so id 1030 (the
   pre-glacial Antarctic theory) is filed under "global" — flag if
   you'd rather add a dedicated key.

   ⚠️ OPEN QUESTION — id 1015 (Jōmon Culture, s: -14000, t: "confirmed"):
   your README states entries starting before 10,800 BCE must be
   "debated" or "theorized". Jōmon pottery's pre-10,800 BCE dating is
   itself mainstream-accepted archaeology, not a fringe claim, so this
   is a real tension between the rule (written with Atlantis/Younger-
   Dryas-adjacent theories in mind) and this specific entry. Left as
   "confirmed" pending your call — see chat for the two options.

   dateTheories[] shape (used where mainstream/alt dates diverge) is
   inferred to mirror locationTheories[]'s shape: { label, s, e, source,
   researcher, up, dn }. Same caveat — verify against data.js's real
   handling before relying on it to render.
   ============================================================ */

const PHASE_5at_APPEND = [

  // ── AFRICA ─────────────────────────────────────────────
  {
    id: 1001, n: "Nabta Playa", t: "confirmed", s: -7500, e: -3400,
    r: "Nubian Desert, Egypt", cont: "africa", lang: "unknown", gov: "unknown",
    up: 340, dn: 22,
    d: "Nabta Playa was a Neolithic settlement in what is now the Nubian Desert of southern Egypt, notable for a megalithic stone circle whose alignments appear to mark the summer solstice and possibly stars near Orion's belt, predating Stonehenge by roughly 2,000 years. Mainstream archaeologists interpret it as evidence of an early calendrical or ceremonial tradition tied to seasonal rains and cattle herding. Some alternative researchers, drawing on its astronomical precision, have proposed it reflects a more sophisticated observational tradition than typically credited to the period, though this remains a minority view."
  },
  {
    id: 1004, n: "Kingdom of Kush", t: "confirmed", s: -1070, e: 350,
    r: "Nile Valley, Nubia (Sudan)", cont: "africa", lang: "meroitic", gov: "monarchy",
    up: 512, dn: 18,
    d: "The Kingdom of Kush was a major Nile Valley civilization south of Egypt, ruling for over a millennium from capitals at Napata and later Meroë, and briefly governing Egypt itself as its 25th Dynasty. Kushite culture blended Egyptian religious and architectural forms — including its own pyramid-building tradition, with more pyramids than Egypt itself — with distinct Nubian traditions, iron production, and eventually its own undeciphered Meroitic script. It remains comparatively understudied relative to its scale and influence, a gap increasingly noted by historians of Africa."
  },
  {
    id: 1005, n: "Great Zimbabwe", t: "confirmed", s: 1100, e: 1450,
    r: "Zimbabwean Highveld", cont: "africa", lang: "shona", gov: "kingdom",
    up: 480, dn: 15,
    d: "Great Zimbabwe was the capital of a powerful Shona trading kingdom, famed for its dry-stone granite walls built without mortar — the largest ancient structure in sub-Saharan Africa outside Egypt. It controlled trade in gold, ivory, and cattle across a network reaching the Swahili coast and, via Indian Ocean trade, as far as China. Colonial-era authorities controversially attributed the site to non-African builders (Phoenicians or other outsiders); this view has been thoroughly rejected by modern archaeology, which confirms indigenous Shona origin, though the myth persists in some fringe literature."
  },
  {
    id: 1011, n: "Kingdom of Punt", t: "debated", s: -2500, e: -1000,
    r: "Red Sea coast (location disputed)", cont: "africa", lang: "unknown", gov: "kingdom",
    up: 298, dn: 61,
    d: "Punt was a trading partner of ancient Egypt, richly documented in Egyptian reliefs (notably Hatshepsut's Deir el-Bahari expedition) as a source of gold, myrrh, ebony, ivory, and exotic animals, but its exact location was never recorded by the Egyptians and remains unresolved. Mainstream candidates include the Eritrea–Sudan Red Sea coast, the Horn of Africa (Somalia), and southern Arabia, based on botanical, faunal, and isotopic evidence from artifacts. No single-site consensus exists, and Punt is treated in the scholarship as a region or trade network rather than a single city."
  },
  {
    id: 1012, n: "Kingdom of Ophir", t: "debated", s: -1000, e: -900,
    r: "Location unresolved (candidates on 3 continents)", cont: "africa", lang: "unknown", gov: "unknown",
    up: 210, dn: 88,
    d: "Ophir is named in the Hebrew Bible as the source of King Solomon's gold, along with almug wood and precious stones, but no ancient text records where it actually was. Proposed locations span an unusually wide range for a single toponym: southern Arabia, coastal East Africa (including a long-standing but now largely discredited association with Great Zimbabwe), and the western coast of India. No archaeological find has been conclusively tied to the name, and most historians treat Ophir's location as unrecoverable with current evidence."
  },
  {
    id: 1021, n: "Garamantes", t: "confirmed", s: -500, e: 700,
    r: "Fezzan, Libyan Sahara", cont: "africa", lang: "unknown", gov: "kingdom",
    up: 265, dn: 12,
    d: "The Garamantes built a sophisticated desert civilization in the Libyan Sahara, sustained by an extensive underground irrigation system (foggaras) that tapped fossil groundwater to farm an otherwise uninhabitable region. They controlled trans-Saharan trade routes, built walled towns and elaborate tombs, and maintained diplomatic and hostile contact alike with Rome. Their agricultural system ultimately became unsustainable as the aquifer depleted, offering a well-studied case of climate and resource limits in the ancient world."
  },
  {
    id: 1020, n: "Kingdom of Saba (Sheba)", t: "debated", s: -1200, e: 275,
    r: "South Arabia / Horn of Africa (both claimed)", cont: "africa", lang: "sabaic", gov: "kingdom",
    up: 355, dn: 47,
    d: "Saba was a prosperous South Arabian kingdom (in present-day Yemen) built on the frankincense and myrrh trade, known for monumental irrigation works including the Great Dam of Marib. It is widely identified with the biblical and Quranic Kingdom of Sheba, though Ethiopian tradition (via the Kebra Nagast) instead locates Sheba's queen in the Horn of Africa and traces the Solomonic dynasty to that union — a claim taken as religious history in Ethiopia and as legend by most secular historians. Archaeological consensus favors the South Arabian location for the historical Sabaean state itself."
  },

  // ── ASIA ───────────────────────────────────────────────
  {
    id: 1002, n: "Sanxingdui Culture", t: "confirmed", s: -1600, e: -1046,
    r: "Sichuan Basin, China", cont: "asia", lang: "unknown", gov: "unknown",
    up: 401, dn: 9,
    d: "Sanxingdui was a Bronze Age culture in the Sichuan Basin, discovered in 1929 and excavated extensively from 1986 onward, notable for enormous bronze masks with exaggeratedly protruding eyes, gold masks, and bronze trees unlike anything found in contemporary Shang Dynasty China. Its distinct artistic and religious traditions show it developed largely independently of the Yellow River civilizations traditionally centered in Chinese historiography, reshaping understanding of how many parallel Bronze Age cultures existed within China's borders. The culture's disappearance around 1046 BCE remains unexplained."
  },
  {
    id: 1008, n: "Hittite Empire", t: "confirmed", s: -1600, e: -1178,
    r: "Anatolia (Turkey)", cont: "asia", lang: "hittite", gov: "empire",
    up: 388, dn: 10,
    d: "The Hittite Empire was a major Bronze Age power centered at Hattusa in central Anatolia, a rival to Egypt and Mesopotamian states, notable for one of the earliest known peace treaties (with Ramesses II of Egypt after the Battle of Kadesh) and among the earliest large-scale use of iron. Hittite cuneiform archives are a major source for Bronze Age diplomatic and legal history. The empire collapsed rapidly around 1178 BCE amid the broader Late Bronze Age Collapse."
  },
  {
    id: 1009, n: "Elam", t: "confirmed", s: -2700, e: -539,
    r: "Southwestern Iran", cont: "asia", lang: "elamite", gov: "kingdom",
    up: 190, dn: 8,
    d: "Elam was one of the earliest civilizations of the ancient Near East, centered on the city of Susa in what is now southwestern Iran, with a written record spanning over two millennia and a language unrelated to its Semitic and Indo-European neighbors. It was a persistent rival and periodic conqueror of Mesopotamian states, and its administrative and artistic traditions later influenced the Achaemenid Persian Empire that absorbed it. Elamite remains only partially deciphered."
  },
  {
    id: 1010, n: "Dilmun", t: "confirmed", s: -3000, e: -600,
    r: "Bahrain and eastern Arabian coast", cont: "asia", lang: "unknown", gov: "unknown",
    up: 155, dn: 6,
    d: "Dilmun was a prosperous trading civilization centered on the island of Bahrain, described in Sumerian mythology as a paradise-like land and functioning historically as a key intermediary hub between Mesopotamia and the Indus Valley civilization. It is known for a vast field of burial mounds — among the largest ancient cemeteries in the world — and for a temple complex at Barbar. Its wealth derived largely from controlling maritime copper and trade routes through the Persian Gulf."
  },
  {
    id: 1014, n: "Longshan Culture", t: "confirmed", s: -3000, e: -1900,
    r: "Yellow River Valley, China", cont: "asia", lang: "unknown", gov: "unknown",
    up: 175, dn: 7,
    d: "The Longshan culture was a late Neolithic society across the Yellow River valley, distinguished by distinctive black eggshell-thin pottery, early evidence of walled settlements, and possible early writing in the form of inscribed symbols on pottery and bone. It is widely regarded by mainstream archaeologists as a direct precursor to Bronze Age Chinese states, including the legendary Xia and historical Shang dynasties. Social stratification evident in burial goods suggests emerging elite hierarchies."
  },
  {
    id: 1015, n: "Jōmon Culture", t: "confirmed", s: -14000, e: -300,
    r: "Japanese archipelago", cont: "asia", lang: "unknown", gov: "unknown",
    up: 220, dn: 5,
    d: "The Jōmon culture of prehistoric Japan is notable for producing some of the world's oldest known pottery, dating back over 14,000 years, and for sustaining relatively large, complex hunter-gatherer settlements without agriculture for millennia — a rarity that has reshaped assumptions about the necessity of farming for social complexity. Jōmon sites show sophisticated management of wild resources, semi-permanent villages, and long-distance obsidian trade. The culture gradually transitioned into the rice-farming Yayoi period around the 3rd century BCE."
  },
  {
    id: 1024, n: "Xia Dynasty", t: "debated", s: -2070, e: -1600,
    r: "Yellow River Valley, China", cont: "asia", lang: "unknown", gov: "monarchy",
    up: 240, dn: 130,
    d: "The Xia is recorded in later Chinese texts (notably Sima Qian's Records of the Grand Historian) as China's first dynasty, but no writing from the claimed Xia period itself has been found, and its historicity is actively debated among scholars. Many archaeologists associate the Erlitou culture, with its early palatial architecture and bronze workshops, with a Xia-era state, while others regard the Xia as a later mythologized retrospective construction. The Chinese government's state-sponsored Xia-Shang-Zhou Chronology Project asserts a firmer historicity than most international scholarship accepts.",
    dateTheories: [
      { label: "Traditional Chinese chronology", s: -2070, e: -1600, source: "Sima Qian, Records of the Grand Historian", researcher: null, up: 88, dn: 40 },
      { label: "Erlitou-culture correlation", s: -1900, e: -1500, source: "Erlitou excavation reports", researcher: null, up: 120, dn: 25 }
    ]
  },
  {
    id: 1029, n: "Karahan Tepe", t: "confirmed", s: -9500, e: -8000,
    r: "Şanlıurfa Province, Anatolia (Turkey)", cont: "asia", lang: "unknown", gov: "unknown",
    up: 610, dn: 20,
    d: "Karahan Tepe is a Pre-Pottery Neolithic site in southeastern Turkey, often called the 'sister site' of nearby Göbekli Tepe, sharing its distinctive T-shaped carved pillars and possibly predating it by several centuries. Excavations since 2019 have revealed hundreds of pillars, a rock-cut chamber with carved phallic figures, and one of the earliest known realistic human sculptures. Along with Göbekli Tepe, it has overturned the older assumption that monumental architecture required agriculture to precede it — both sites were apparently built by hunter-gatherers."
  },

  // ── EUROPE ─────────────────────────────────────────────
  {
    id: 1003, n: "Cucuteni–Trypillia Culture", t: "confirmed", s: -5500, e: -2750,
    r: "Ukraine, Moldova, Romania", cont: "europe", lang: "unknown", gov: "unknown",
    up: 165, dn: 6,
    d: "The Cucuteni–Trypillia culture built some of the largest known settlements of the Neolithic world — 'mega-sites' housing an estimated several thousand people, larger than contemporary Mesopotamian cities — across what is now Ukraine, Moldova, and Romania. Distinctively, the culture appears to have periodically and deliberately burned its own settlements roughly every 60–80 years, for reasons still debated (ritual renewal versus practical rebuilding are the leading hypotheses). It produced elaborate painted pottery and numerous clay figurines associated with fertility symbolism."
  },
  {
    id: 1027, n: "Cycladic Civilization", t: "confirmed", s: -3200, e: -1050,
    r: "Cyclades Islands, Aegean Sea", cont: "europe", lang: "unknown", gov: "unknown",
    up: 205, dn: 8,
    d: "The Cycladic civilization flourished on the small Aegean islands north of Crete, best known for austere, minimalist marble figurines whose flat geometric forms influenced modern artists like Picasso and Modigliani thousands of years after their creation. Cycladic communities were skilled seafarers and metalworkers, trading obsidian and marble across the Aegean well before the rise of Minoan Crete. Much of the culture's religious meaning behind its figurines remains unknown, as most were found in graves without accompanying texts."
  },
  {
    id: 1028, n: "Bosnian Pyramid Hypothesis (Visočica Hill)", t: "debated", s: -12000, e: -10000,
    r: "Visoko, Bosnia and Herzegovina", cont: "europe", lang: "unknown", gov: "unknown",
    up: 140, dn: 410,
    d: "Visočica Hill, near Visoko in Bosnia, has been promoted since 2005 by Semir Osmanagić as an ancient man-made pyramid — potentially the largest in the world — predating Egypt's pyramids by thousands of years. The overwhelming consensus among professional geologists and archaeologists is that the hill is a natural geological formation, and the European Association of Archaeologists formally condemned the excavation as pseudoarchaeology damaging a genuine medieval and prehistoric heritage site. It is included here as a widely circulated theory under community review, not as an established civilization.",
    dateTheories: [
      { label: "Natural geological formation (mainstream)", s: null, e: null, source: "European Association of Archaeologists statement (2006)", researcher: null, up: 410, dn: 60 },
      { label: "Man-made pyramid, ~12,000 BCE", s: -12000, e: -10000, source: "Pyramids of Bosnia (2005)", researcher: "Semir Osmanagić", up: 140, dn: 300 }
    ]
  },

  // ── AMERICAS ───────────────────────────────────────────
  {
    id: 1006, n: "Chachapoya Culture", t: "confirmed", s: 800, e: 1470,
    r: "Andean cloud forest, Peru", cont: "americas", lang: "chacha", gov: "confederation",
    up: 150, dn: 5,
    d: "The Chachapoya, called the 'Warriors of the Clouds,' built fortified cities in the high cloud forests of northeastern Peru, most famously the citadel of Kuélap — a massive walled complex predating and rivaling Machu Picchu in scale. Distinctive round stone houses with geometric friezes and elaborate sarcophagi placed on high cliff faces characterize their material culture. They were conquered by the Inca shortly before the Spanish arrival, and many Chachapoya later allied with the Spanish against their former Inca rulers."
  },
  {
    id: 1007, n: "Caral (Norte Chico Civilization)", t: "confirmed", s: -3500, e: -1800,
    r: "Supe Valley, Peru", cont: "americas", lang: "unknown", gov: "unknown",
    up: 470, dn: 11,
    d: "Caral, in Peru's Supe Valley, is the largest and best-studied site of the Norte Chico civilization, considered the oldest known civilization in the Americas and one of the earliest urban centers on Earth, contemporary with early Mesopotamia and Egypt. Remarkably, Caral shows no evidence of warfare, weapons, or violent destruction — no fortifications or mutilated remains have been found — making it a frequently cited case study of early complex society emerging without organized conflict. Its economy combined irrigation agriculture with a cotton trade for fishing nets used by nearby coastal communities."
  },
  {
    id: 1013, n: "Tiwanaku", t: "confirmed", s: -200, e: 1000,
    r: "Lake Titicaca Basin, Bolivia", cont: "americas", lang: "puquina", gov: "state",
    up: 330, dn: 55,
    d: "Tiwanaku was a major pre-Inca urban center near Lake Titicaca, known for precisely cut megalithic stonework including the Gate of the Sun and the sunken Kalasasaya temple complex, aligned to solstices. Mainstream archaeology dates its major monumental phase to roughly 500–1000 CE, but early 20th-century researcher Arthur Posnansky argued on archaeoastronomical grounds that the site's original construction dated to over 15,000 years ago — a claim rejected by mainstream archaeology but still cited in alternative history literature. The city was abandoned around 1000 CE, likely following a prolonged drought.",
    dateTheories: [
      { label: "Mainstream archaeological dating", s: -200, e: 1000, source: "Andean archaeology consensus", researcher: null, up: 330, dn: 20 },
      { label: "Archaeoastronomical redating, ~15,000 BCE", s: -17000, e: -15000, source: "Tiahuanacu (1945)", researcher: "Arthur Posnansky", up: 95, dn: 210 }
    ]
  },
  {
    id: 1017, n: "Wari Empire", t: "confirmed", s: 500, e: 1000,
    r: "Ayacucho Basin, Peru (Andean highlands)", cont: "americas", lang: "quechua", gov: "empire",
    up: 175, dn: 6,
    d: "The Wari Empire was a sprawling Andean state that predated the Inca by several centuries, developing an extensive road network, terraced agriculture, and administrative centers later adapted and expanded by the Inca. Wari expansion is thought to have spread the Quechua language family across much of the central Andes, a linguistic legacy that long outlasted the empire itself. Its collapse around 1000 CE, likely tied to sustained drought, left a political vacuum that regional states filled until Inca unification centuries later."
  },
  {
    id: 1022, n: "Poverty Point Culture", t: "confirmed", s: -1700, e: -1100,
    r: "Lower Mississippi Valley, Louisiana", cont: "americas", lang: "unknown", gov: "unknown",
    up: 160, dn: 4,
    d: "Poverty Point, in present-day Louisiana, is a massive earthwork complex of concentric ridges and mounds built by hunter-gatherers without agriculture or pottery — a combination long assumed impossible for monumental construction on this scale. Its builders moved an estimated 750,000 cubic meters of soil basket by basket, and the site shows evidence of a trade network reaching as far as the Great Lakes and Appalachians. It is a UNESCO World Heritage Site and a key data point in ongoing debates about the preconditions for large-scale human cooperation."
  },
  {
    id: 1025, n: "Thule People", t: "confirmed", s: 1000, e: 1600,
    r: "Arctic North America and Greenland", cont: "americas", lang: "inuit-yupik", gov: "unknown",
    up: 130, dn: 3,
    d: "The Thule people migrated eastward from Alaska across the Arctic beginning around 1000 CE, spreading rapidly through Canada to Greenland using sophisticated whaling technology, dog sleds, and umiak boats. They are the direct ancestors of modern Inuit populations, and their expansion displaced or absorbed the earlier Dorset culture that had occupied the Arctic for over a thousand years before them. Adaptations developed by the Thule — including snow-house construction and toggling harpoons — remained in use among Arctic peoples into the modern era."
  },

  // ── OCEANIA & PACIFIC ──────────────────────────────────
  {
    id: 1016, n: "Lapita Culture", t: "confirmed", s: -1600, e: -500,
    r: "Western and Central Pacific", cont: "pacific", lang: "proto-oceanic", gov: "unknown",
    up: 145, dn: 4,
    d: "The Lapita culture is identified by distinctive dentate-stamped pottery found across a vast swath of the Pacific, and its bearers are considered the ancestors of most Polynesian, Melanesian, and Micronesian peoples. Lapita voyagers undertook extraordinary open-ocean crossings using double-hulled canoes and star navigation, settling islands separated by thousands of kilometers of open water centuries before comparable European seafaring. Genetic and linguistic evidence broadly (though not entirely) supports a rapid 'express train' model of Pacific expansion originating near the Bismarck Archipelago."
  },
  {
    id: 1023, n: "Rapa Nui Civilization", t: "confirmed", s: 1200, e: 1722,
    r: "Easter Island", cont: "pacific", lang: "rapa-nui", gov: "chiefdom",
    up: 380, dn: 40,
    d: "The Rapa Nui civilization on Easter Island is famous for carving and transporting nearly 900 monumental moai statues using purely Polynesian technology, without draft animals or wheels — a feat long debated but now broadly explained through experimental archaeology showing the statues could be 'walked' upright using ropes. Popular narratives once framed the island's ecological collapse as pure self-inflicted 'ecocide,' but more recent research emphasizes the significant role of European contact, introduced disease, and slave raiding in the population's later catastrophic decline, a still-ongoing scholarly revision. The undeciphered rongorongo script remains one of the few plausible independent inventions of writing."
  },
  {
    id: 1018, n: "Sea Peoples Confederation", t: "debated", s: -1200, e: -1150,
    r: "Eastern Mediterranean (origins disputed)", cont: "europe", lang: "unknown", gov: "confederation",
    up: 220, dn: 95,
    d: "The 'Sea Peoples' is a modern label for a loose confederation of seaborne raiders and migrants recorded in Egyptian inscriptions as attacking the Eastern Mediterranean around 1200 BCE, coinciding with the collapse of the Hittite Empire, Mycenaean Greece, and other Bronze Age states. Their origins remain unresolved, with proposed homelands including the Aegean, Anatolia, and the central Mediterranean; some groups named in Egyptian texts (like the Peleset) are tentatively linked to the later Philistines. Whether the Sea Peoples were a primary cause of the Late Bronze Age Collapse or largely a symptom of it — amid climate change, earthquakes, and systems failure — is actively debated among historians."
  },

  // ── THEORIZED / MYTHICAL (Type C — heat map only) ──────
  {
    id: 1019, n: "Hyperborea", t: "theorized", s: -3000, e: -100,
    r: "Mythical far north (no fixed location)", cont: "global", lang: "unknown", gov: "unknown",
    up: 88, dn: 240,
    d: "Hyperborea was described by ancient Greek writers as a paradisiacal land 'beyond the North Wind,' inhabited by a people living in perpetual sunlight and remarkable longevity. Classical authors treated it inconsistently — sometimes as literal geography, sometimes as pure myth — with no archaeological evidence ever tied to a specific location. Various alternative-history writers have proposed identifications ranging from the Arctic to Atlantis-adjacent lost-continent narratives; mainstream classicists regard it as a legendary construct rather than a historical civilization."
  },
  {
    id: 1026, n: "Mu", t: "theorized", s: -50000, e: -12000,
    r: "Hypothesized Pacific continent (no fixed location)", cont: "pacific", lang: "unknown", gov: "unknown",
    up: 55, dn: 310,
    d: "Mu is a hypothesized lost continent in the Pacific Ocean, proposed in 19th- and early 20th-century esoteric and alternative-history literature as a cradle of civilization analogous to Atlantis, sometimes conflated with the separately theorized 'Lemuria.' No geological or archaeological evidence supports a sunken Pacific continent within the timeframe required, and plate tectonics is considered by mainstream geology to rule it out entirely. It is retained here, as with Atlantis, as a heat-map-only entry reflecting a long-circulated theory rather than an evidenced location."
  },
  {
    id: 1030, n: "Pre-Glacial Antarctic Civilization", t: "theorized", s: -13000, e: -11600,
    r: "Antarctica (hypothesized, ice-covered)", cont: "global", lang: "unknown", gov: "unknown",
    up: 62, dn: 275,
    d: "This theory holds that an advanced civilization existed on Antarctica before the continent was covered in ice, and that its knowledge survived through contact with other Bronze Age and Neolithic cultures — a claim most associated with Charles Hapgood's crustal displacement hypothesis and later popularized by Graham Hancock. Mainstream geology holds that Antarctica has been substantially ice-covered for millions of years, far predating any possible human habitation, making the hypothesis incompatible with the current geological record. It is included as a heat-map-only entry (no fixed pin) given the total absence of a proposed physical site, consistent with the project's Type C treatment of Atlantis and Lemuria."
  },

];
