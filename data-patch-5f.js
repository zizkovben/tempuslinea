/* ═══════════════════════════════════════════════════════════════════════════
   CHRONOS — data-patch-5f.js
   Civilizations ids 121–150. Append-only patch for data.js.

   INTEGRATION: Apply AFTER data-patch-5a.js. Remove the closing ]; added
   by patch 5a, paste these records, then close with ];

   Phase 5f — Bible v3
   ═══════════════════════════════════════════════════════════════════════════ */

  // ── BATCH 5f: ids 121–150 ────────────────────────────────────────────────

  { id:121, n:"Göbekli Tepe Phase I (Pre-12000 BCE)", s:-14000, e:-10800, r:"Anatolia / Turkey", t:"theorized", cont:"asia",
    d:"Andrew Collins (Göbekli Tepe: Genesis of the Gods, 2014) proposes that the earliest phases of Göbekli Tepe predate the currently excavated Phase III layers (~9600 BCE) by thousands of years. Geophysical surveys indicate only 5–10% of the site has been excavated. Collins argues that Denisovan-descended peoples with advanced cognitive capacity may have initiated the site's astronomical use as far back as 14,000 BCE. The Vulture Stone (Pillar 43) is interpreted by Martin Sweatman (Prehistory Decoded, 2019) as encoding a comet impact date of ~10,950 BCE via Cygnus and Scorpius positioning. A theorized earlier stratum remains unexcavated.",
    up:4102, dn:2891,
    dateTheories:[
      { s:-14000, e:-10800, label:"Collins — pre-excavation Phase I", source:"Göbekli Tepe: Genesis of the Gods (2014)", researcher:"Andrew Collins", up:2891, dn:1891 },
      { s:-9600,  e:-7500,  label:"Mainstream — excavated Phase III", source:"Klaus Schmidt, Göbekli Tepe (2012)", researcher:null, up:5102, dn:891 }
    ] },

  { id:122, n:"Tartaria Script Culture",        s:-5500, e:-4500, r:"Romania / Danube Basin",     t:"debated",   cont:"europe",
    d:"The Tartaria tablets — three small clay tablets found in Romania in 1961 — contain incised symbols dated to ~5300 BCE that some scholars argue represent the world's oldest writing, predating Sumerian cuneiform by 1,000 years. The symbols on the Tartaria tablets share features with the broader Vinča symbol system found across southeastern Europe. Mainstream archaeology classifies them as ritual symbols rather than writing. If the proto-writing interpretation is correct, Europe's first script emerged from the Danube Basin, not Mesopotamia. The original tablets were lost for decades after their discovery, complicating analysis.",
    up:3102, dn:1891 },

  { id:123, n:"Malta Temple Builders",          s:-3600, e:-2500, r:"Malta / Mediterranean",      t:"debated",   cont:"europe",
    d:"The Megalithic Temples of Malta — including Ggantija, Hagar Qim, Mnajdra and the Hypogeum — are among the oldest free-standing stone structures on Earth, predating Stonehenge and the Egyptian pyramids. Built between 3600–2500 BCE by a population that then vanished without trace, they represent one of archaeology's great mysteries. The temples show precise solar and lunar alignments. Graham Hancock and alternative researchers note the extraordinary sophistication of a small island population producing structures of this complexity. The Hal Saflieni Hypogeum — a three-level underground temple — contains acoustic properties producing resonance at 110Hz, associated with altered states of consciousness.",
    up:4891, dn:891,
    dateTheories:[
      { s:-5000, e:-3600, label:"Earlier construction phases — alternative", source:"Alternative archaeology", researcher:null, up:891, dn:2102 }
    ] },

  { id:124, n:"Derinkuyu Underground City",     s:-800,  e:1923,  r:"Cappadocia / Turkey",        t:"debated",   cont:"asia",
    d:"Derinkuyu is the largest of approximately 200 underground cities in Cappadocia, Turkey — extending 85 metres deep across 18 levels, capable of housing 20,000 people with livestock, wine cellars, churches, stables and ventilation shafts. The conventional date of ~800 BCE (Phrygian) is contested — Çatalhöyük-era construction has been proposed. The scale and sophistication of the ventilation and water systems exceeds what was necessary for short-term refuge. Graham Hancock and others argue the city's design implies long-term underground habitation — possibly in response to a surface catastrophe. The city was used by early Christians and rediscovered in 1963.",
    up:5102, dn:1203 },

  { id:125, n:"Vedic Astronomical Tradition",   s:-6000, e:-1500, r:"Indian Subcontinent",         t:"debated",   cont:"asia",
    d:"David Frawley (Gods, Sages and Kings, 1991) and Georg Feuerstein (In Search of the Cradle of Civilization, 1995) argue that internal astronomical references in the Rigveda — including star positions, solstice alignments, and seasonal markers — place its composition between 6000–4000 BCE, 2,000–4,000 years earlier than mainstream dating (~1500–1200 BCE). The Vedic texts describe a sky that matches the archaeoastronomical record for that earlier period. S.R. Rao's survey of submerged structures off Dwarka (Marine Archaeological Centre India) adds archaeological dimension to the hypothesis. If correct, the Vedic tradition is the world's oldest documented astronomical science.",
    up:3891, dn:1891,
    dateTheories:[
      { s:-6000, e:-3000, label:"Frawley — astronomical dating", source:"Gods, Sages and Kings (1991)", researcher:"David Frawley", up:2891, dn:1203 },
      { s:-1500, e:-1000, label:"Mainstream — Indo-Aryan migration", source:"Oxford Companion to Archaeology", researcher:null, up:3891, dn:891 }
    ] },

  { id:126, n:"Indus Script Culture",           s:-3300, e:-1700, r:"Indus Valley / South Asia",  t:"debated",   cont:"asia",
    d:"The Indus Valley civilisation produced a script of ~400+ signs that remains entirely undeciphered — the longest-standing unsolved script problem in archaeology. Without decipherment, the language, social structure, religion and self-identification of the world's largest Bronze Age civilisation remains opaque. Most scholars believe the Indus script is a full writing system; a minority argue it represents proto-writing or administrative tokens. The Dravidian, Indo-Aryan, and language-isolate hypotheses for the underlying language each have serious proponents. Decipherment would be one of archaeology's greatest achievements — transforming understanding of South Asian prehistory.",
    up:5891, dn:891 },

  { id:127, n:"Black Sea Flood Culture",        s:-6000, e:-5500, r:"Black Sea Basin / Pontic",    t:"debated",   cont:"europe",
    d:"William Ryan and Walter Pitman's Noah's Flood (1998) proposes that the Black Sea was a freshwater lake until c. 5600 BCE, when rising Mediterranean waters breached the Bosphorus sill in a catastrophic flood, inundating 155,000 square kilometres of settled farmland. The submerged shoreline 120 metres below the current Black Sea surface contains evidence of a habitable landscape. Ryan and Pitman argue this event is the historical basis for the Mesopotamian flood myths and the Biblical Flood of Noah. The civilisation displaced by this flood — farmers and fishers of the Black Sea basin — left no direct record but their genetic and cultural legacy persisted in the populations that spread across Eurasia.",
    up:3891, dn:1203,
    dateTheories:[
      { s:-6000, e:-5500, label:"Ryan & Pitman — Black Sea Flood", source:"Noah's Flood (1998)", researcher:"William Ryan", up:3102, dn:891 }
    ] },

  { id:128, n:"Doggerland",                     s:-10000, e:-6500, r:"North Sea / Northwestern Europe", t:"debated", cont:"europe",
    d:"Doggerland was a vast landmass connecting Britain to continental Europe, now submerged beneath the North Sea. At its greatest extent (~14,000 BCE) it was the size of modern France — a rich hunting and fishing landscape inhabited by Mesolithic peoples. Rising post-glacial sea levels progressively inundated the land, culminating in its final submergence ~6500 BCE, possibly accelerated by the Storegga submarine landslide tsunami (~8150 BCE). Fishing trawlers regularly dredge Mesolithic tools, animal bones and occasionally human remains from the North Sea floor. Doggerland is the best-documented example of a submerged inhabited landscape, directly relevant to claims about post-glacial civilisation loss.",
    up:5102, dn:412,
    dateTheories:[
      { s:-14000, e:-6500, label:"Full Doggerland occupation period", source:"Coles, Doggerland: A Speculative Survey (1998)", researcher:"Bryony Coles", up:4102, dn:289 }
    ] },

  { id:129, n:"Puma Punku Phase II",             s:-15000, e:-10800, r:"Bolivia / Andes",          t:"theorized",  cont:"americas",
    d:"Brien Foerster's analysis of Puma Punku (Advanced Ancient Civilizations) proposes that the precision stonework at the site — H-blocks with sub-millimetre tolerances, interior right-angle cuts, and identical geometry across hundreds of blocks — reflects a construction phase predating the Tiwanaku state by thousands of years. Core drilling samples taken by Foerster indicate older stratigraphic layers beneath the conventionally dated structures. The machine-like precision of the andesite and diorite cutting, the nearest quarry 90km away, and the lack of evidence for construction tools consistent with the work all point to capabilities beyond known Andean technology of ~500 CE.",
    up:2891, dn:3102,
    dateTheories:[
      { s:-15000, e:-10800, label:"Foerster — pre-Tiwanaku precision phase", source:"Advanced Ancient Civilizations", researcher:"Brien Foerster", up:1891, dn:2102 },
      { s:400,    e:900,    label:"Mainstream — Tiwanaku IV period", source:"Kolata, Tiwanaku (1993)", researcher:null, up:3891, dn:891 }
    ] },

  { id:130, n:"Ancestral Puebloans (Anasazi)",   s:100,   e:1300,  r:"Colorado Plateau / SW USA",  t:"confirmed", cont:"americas",
    d:"The Ancestral Puebloans built some of North America's most spectacular architecture — cliff dwellings at Mesa Verde, the great houses of Chaco Canyon, and an extraordinary road network radiating across the desert. Chaco Canyon was the ceremonial and administrative hub of a regional system spanning 100,000 square kilometres. The Great Houses were aligned to solar and lunar cycles with remarkable precision — Pueblo Bonito's east-west axis captures the equinox sunrise. The abrupt abandonment of Chaco (~1150 CE) and Mesa Verde (~1300 CE) remains incompletely explained — drought, social upheaval, and resource depletion are all documented factors.",
    up:4891, dn:289 },

  { id:131, n:"Dogon Astronomical Tradition",   s:-3000, e:1931,  r:"Mali / West Africa",          t:"debated",   cont:"africa",
    d:"Robert Temple's The Sirius Mystery (1976) documented Marcel Griaule's 1931–1956 fieldwork among the Dogon people of Mali, who reportedly possessed knowledge of Sirius B (a white dwarf invisible to the naked eye, not photographed until 1970) including its orbital period of ~50 years. Temple argued this knowledge was transmitted from ancient Egypt or through contact with an advanced civilisation. Walter van Beek's 1991 restudy found Dogon informants showed no independent knowledge of Sirius B, suggesting contamination from Griaule's own questions. The debate remains unresolved. Independent of Temple's thesis, Dogon astronomical mythology and calendar systems are genuinely sophisticated.",
    up:3102, dn:2891,
    dateTheories:[
      { s:-3000, e:-500, label:"Temple — ancient Egyptian transmission", source:"The Sirius Mystery (1976)", researcher:"Robert Temple", up:1891, dn:2102 }
    ] },

  { id:132, n:"Green Sahara Culture",           s:-11000, e:-5000, r:"North Africa / Sahara",      t:"debated",   cont:"africa",
    d:"The African Humid Period (~11,000–5,000 BCE) transformed the Sahara into a vast savanna landscape with rivers, lakes, and dense human populations. Rock art across the Sahara — including the Tassili n'Ajjer (Algeria) and Tibesti (Chad) — documents cattle herding, swimming, and a diverse wildlife including hippos and crocodiles. Nabta Playa (6400–6000 BCE) in the Western Desert contains the oldest known astronomical alignment structure, predating Stonehenge. The populations displaced by the Sahara's re-desertification (~5000 BCE) may have driven urbanisation in the Nile Delta, making the Green Sahara a direct precursor to Egyptian civilisation.",
    up:4102, dn:412 },

  { id:133, n:"Rongorongo Script Culture",      s:-1000, e:1868,  r:"Easter Island / Pacific",     t:"debated",   cont:"oceania",
    d:"Rongorongo is an undeciphered script found on Easter Island — one of only three or four independently invented writing systems in human history, and the only one from the Pacific. The 26 surviving wooden tablets (out of a reported 67) were largely destroyed after Spanish missionaries condemned them in 1868. Attempts at decipherment have identified astronomical tables including a lunar calendar, but the underlying language and most content remain unknown. Whether rongorongo was developed independently on the island or arrived with early Polynesian settlers from elsewhere is unresolved. Its independent invention would have profound implications for theories of cognitive evolution.",
    up:3891, dn:891 },

  { id:134, n:"Pre-Columbian Pacific Contact", s:-700, e:1400, r:"Pacific / Americas / Polynesia", t:"debated", cont:"oceania",
    d:"Genetic evidence confirms contact between Polynesian and Native South American populations c. 1200 CE — the sweet potato (native to South America) was cultivated across Polynesia before European contact, and DNA studies identify a South American genetic contribution in eastern Polynesian populations. Thor Heyerdahl's Kon-Tiki expedition (1947) demonstrated that balsa rafts could cross the Pacific from Peru. The direction of contact (Polynesian→Americas or Americas→Polynesia) and the scale of exchange are still debated. Graham Hancock argues this Pacific contact network implies a much older and more extensive maritime tradition than currently recognised.",
    up:4201, dn:891,
    dateTheories:[
      { s:-700, e:1400, label:"Polynesian-South American contact window", source:"Ioannidis et al., Nature (2020)", researcher:null, up:4891, dn:289 }
    ] },

  { id:135, n:"Chimú Empire",                  s:900,   e:1470,  r:"Coastal Peru / Chan Chan",    t:"confirmed", cont:"americas",
    d:"The Chimú Empire was the largest pre-Inca state on the Pacific coast of South America — centred on Chan Chan, the largest pre-Columbian city in South America and the largest adobe city in the world. At its height (~1400 CE), the Chimú controlled 1,000 km of Pacific coastline from their capital, managing complex irrigation systems that transformed the Peruvian desert into agricultural land. Their metallurgy — gold, silver and bronze — was the most sophisticated in the Americas. Conquered by the Inca under Tupac Yupanqui c. 1470 CE, the Chimú's administrative and metalworking knowledge was absorbed into the Inca state.",
    up:3891, dn:289 },

  { id:136, n:"Sumerian Antediluvian King List", s:-240000, e:-10800, r:"Mesopotamia / Global",   t:"theorized",  cont:"middle-east",
    d:"The Sumerian King List records eight kings ruling before the Flood with combined reigns totalling 241,200 years — individual reigns of 18,600, 43,200 and similar numbers. Matthew LaCroix (The Stage of Time, 2018) argues these numbers encode precession cycles (25,920 years) and base-60 astronomical constants rather than literal reign lengths. Zecharia Sitchin (The 12th Planet, 1976) interpreted the pre-Flood kings as the Anunnaki themselves. The number 432,000 (total pre-Flood years in some versions) equals exactly 50 × 8,640 — appearing also in Babylonian Berossus, Norse myth (432,000 warriors from Valhalla), and Hindu tradition. The encoding hypothesis remains unproven but the numerical consistency across cultures is striking.",
    up:4891, dn:2891,
    dateTheories:[
      { s:-240000, e:-10800, label:"Sitchin — literal Anunnaki reign", source:"The 12th Planet (1976)", researcher:"Zecharia Sitchin", up:2102, dn:5891 },
      { s:-25920,  e:-3102,  label:"LaCroix — precession encoding", source:"The Stage of Time (2018)", researcher:"Matthew LaCroix", up:3891, dn:1203 }
    ] },

  { id:137, n:"Hyperborea",                     s:-15000, e:-10800, r:"Arctic / Northern Europe", t:"theorized",  cont:"europe",
    d:"Hyperborea — 'Beyond the North Wind' — was described by ancient Greek writers (Pindar, Herodotus, Diodorus Siculus) as a paradise civilisation in the far north, untouched by winter, whose inhabitants lived for 1,000 years. In esoteric tradition (Helena Blavatsky's Theosophy; later Nazi occultism) Hyperborea became a proposed root race civilisation. The geographical identification has ranged from Siberia to Scandinavia to the North Pole. Some researchers link it to Arctic coastal cultures that flourished during warmer Holocene periods. CHRONOS includes it as a named theorized entry with documented proponents and ancient literary sources, ranked by community plausibility.",
    up:2102, dn:3891 },

  { id:138, n:"Younger Dryas Survivor Enclaves", s:-10800, e:-9600, r:"Global / Scattered",       t:"theorized",  cont:"global",
    d:"Andrew Collins (Göbekli Tepe: Genesis of the Gods, 2014) and Graham Hancock (Magicians of the Gods, 2015) propose that survivors of the Younger Dryas catastrophe (~10,800 BCE) preserved advanced astronomical, agricultural and architectural knowledge in isolated enclaves, transmitting it to emerging post-YD cultures. Göbekli Tepe is identified as the most likely physical monument of this transmission — a site where survivors encoded their cosmological knowledge in stone. The 'Watchers' of Enochian literature and the 'Seven Sages' (Apkallū) of Mesopotamian tradition are interpreted as cultural memories of these surviving knowledge-keepers.",
    up:4102, dn:2102,
    dateTheories:[
      { s:-10800, e:-9600, label:"Hancock — post-YD knowledge transmission", source:"Magicians of the Gods (2015)", researcher:"Graham Hancock", up:3891, dn:1203 },
      { s:-10800, e:-9600, label:"Collins — Denisovan survivor lineages", source:"Göbekli Tepe: Genesis of the Gods (2014)", researcher:"Andrew Collins", up:2891, dn:1891 }
    ] },

  { id:139, n:"Dwarka / Submerged Indian City",  s:-9000, e:-1500, r:"Gujarat / Arabian Sea",     t:"debated",   cont:"asia",
    d:"Marine Archaeological Centre India surveys led by S.R. Rao found submerged stone structures, including dressed stone blocks and what appear to be walls, in the Gulf of Khambhat off Dwarka, Gujarat — at depths consistent with submergence ~9,000 BCE. The site is associated in Hindu tradition with the legendary city of Dwarka, the kingdom of Krishna. David Frawley argues the finds corroborate Vedic texts describing a pre-flood civilisation. The Indian government survey found wood samples dating to ~7,500 BCE using thermoluminescence. The findings remain contested — critics argue the structures may be natural formations. Full archaeological investigation has not been conducted.",
    up:3891, dn:1891,
    dateTheories:[
      { s:-9000, e:-7000, label:"S.R. Rao — thermoluminescence dating", source:"Marine Archaeological Centre India survey", researcher:"S.R. Rao", up:2891, dn:1203 },
      { s:-1500, e:-500,  label:"Mainstream — Late Vedic period", source:"Encyclopaedia Britannica", researcher:null, up:2102, dn:891 }
    ] },

  { id:140, n:"Global Maritime Civilisation (Ice Age)", s:-20000, e:-10800, r:"Global / Coastal", t:"theorized",  cont:"global",
    d:"Graham Hancock's America Before (2019) and Fingerprints of the Gods (1995) argue for a technologically sophisticated maritime culture operating during the Last Glacial Maximum (~20,000–10,800 BCE) — exploiting the 27 million square kilometres of continental shelf exposed by lower sea levels. Evidence cited includes: the Australasian genetic signal in Amazonian populations (confirmed by David Reich, 2015); common astronomical motifs across disconnected cultures; the Maps of the Ancient Sea Kings (Hapgood) showing cartographic knowledge of pre-survey coastlines; and the simultaneous appearance of agriculture, monumental architecture and astronomy in multiple cultures immediately after the Younger Dryas. The civilisation left no direct record because its coastal settlements are now submerged.",
    up:5891, dn:2891,
    dateTheories:[
      { s:-20000, e:-10800, label:"Hancock — LGM maritime culture", source:"America Before (2019)", researcher:"Graham Hancock", up:4891, dn:2102 }
    ] },

  { id:141, n:"Vinča Culture",                  s:-5700, e:-4500, r:"Danube Basin / Serbia",       t:"debated",   cont:"europe",
    d:"The Vinča culture of the Danube Basin produced one of Europe's most sophisticated Neolithic civilisations — with settlements of up to 2,500 people, a distinctive style of figurative art, and the Vinča symbol system: incised marks on pottery found at 150+ sites across southeastern Europe. Some scholars (Harald Haarmann, Marco Merlini) argue the Vinča symbols constitute proto-writing predating Sumerian cuneiform, making Europe the birthplace of writing. Mainstream archaeology classifies the symbols as a recording system falling short of true writing. The culture also practised early copper metallurgy (pre-4000 BCE), making it one of the world's earliest metal-working societies.",
    up:3891, dn:1203,
    dateTheories:[
      { s:-5700, e:-4500, label:"Vinča proto-writing — Haarmann", source:"Writing: Origins and Development (2004)", researcher:"Harald Haarmann", up:2102, dn:1891 }
    ] },

  { id:142, n:"Wari Empire",                    s:600,   e:1000,  r:"Andean Highlands / Peru",    t:"confirmed", cont:"americas",
    d:"The Wari (Huari) Empire was the first pan-Andean empire — preceding the Inca by 600 years and establishing the administrative and road network infrastructure the Inca later expanded. From their highland capital near modern Ayacucho, the Wari controlled most of the central Andes through a network of provincial administrative centres. They introduced the quipu (knotted cord) recording system, terraced agriculture, and a distinctive iconographic style featuring the Staff God. The Wari collapse (~1000 CE) is associated with severe drought evidenced by ice core data from the Quelccaya glacier.",
    up:3102, dn:289 },

  { id:143, n:"Garamantian Civilisation",       s:-500,  e:700,   r:"Fezzan / Libya / Sahara",    t:"confirmed", cont:"africa",
    d:"The Garamantes of the Libyan Sahara built one of the ancient world's most remarkable water engineering systems — over 3,500 kilometres of underground irrigation tunnels (foggaras) tapping fossil water aquifers beneath the desert. At their height (~100–400 CE), the Garamantes supported a population of 100,000 in the Saharan interior, traded with Rome and sub-Saharan Africa simultaneously, and maintained a chariot cavalry. Their underground water tunnels — dug entirely by hand — represent an engineering achievement comparable to the Roman aqueducts. The culture declined as the fossil water was exhausted.",
    up:3891, dn:289 },

  { id:144, n:"Tocharian Civilisation",         s:-1800, e:900,   r:"Tarim Basin / Western China", t:"confirmed", cont:"asia",
    d:"The Tocharians were a mysterious Indo-European people whose mummified remains — blond and red-haired, some over 6 feet tall, wearing tartan-like textiles — were discovered in the Tarim Basin of western China from the 1900s onwards. Genetically Western Eurasian but geographically in the heart of China, they spoke Tocharian — the most easterly Indo-European language — which survived in manuscripts until ~900 CE. Their presence in the Tarim Basin challenges models of Indo-European migration and raises questions about very early contact between East and West. The Chinese government's handling of the mummies and their connection to Uyghur identity has been politically sensitive.",
    up:4891, dn:412 },

  { id:145, n:"Etruscan Civilisation",          s:-900,  e:-27,   r:"Tuscany / Northern Italy",   t:"confirmed", cont:"europe",
    d:"The Etruscans were the dominant civilisation of pre-Roman Italy — building the first true cities north of the Alps, developing a sophisticated religious and divinatory tradition, and transmitting the alphabet to Rome. Their language remains a near-isolate — partially readable (the Etruscan script is deciphered, but the language is not fully understood). Etruscan art, metallurgy and urban planning directly influenced early Rome, and several Roman kings were Etruscan. Their abrupt cultural submersion into Roman identity by ~27 BCE makes them one of history's most dramatic cases of civilisational absorption.",
    up:4201, dn:312 },

  { id:146, n:"Scythian Civilisation",          s:-900,  e:-200,  r:"Eurasian Steppe / Pontic",   t:"confirmed", cont:"europe",
    d:"The Scythians were the dominant steppe civilisation of the Iron Age — master horse warriors, extraordinary goldsmiths, and the first peoples to perfect mounted archery. Their kurgan burial mounds across the Eurasian steppe have yielded extraordinary gold artefacts. Herodotus documented their customs extensively. Scythian art — the 'animal style' featuring twisted beasts and predator-prey motifs — spread from the Danube to the Altai. The Scythians' decentralised, mobile lifestyle made them virtually unconquerable: Darius I of Persia launched a vast invasion of Scythia (513 BCE) and achieved nothing. Their genetic legacy is detectable across Eurasia.",
    up:3891, dn:289 },

  { id:147, n:"Lapita Cultural Complex",        s:-1600, e:-500,  r:"Melanesia / Western Polynesia", t:"confirmed", cont:"oceania",
    d:"The Lapita people were the ancestors of all Polynesians — a maritime culture that expanded from the Bismarck Archipelago across 5,000 km of open ocean to Tonga and Samoa between 1600–900 BCE, in one of the greatest maritime migrations in prehistory. Their distinctive dentate-stamped pottery (Lapita ware) is found from PNG to Samoa. The Lapita expansion required deep-ocean navigation technology and colonisation strategy of extraordinary sophistication. Their descendants populated Polynesia, Micronesia and eventually Hawaii, New Zealand and Easter Island — the last major landmasses on Earth to be settled by humans.",
    up:4891, dn:289 },

  { id:148, n:"Indus Valley / Harappan Core",   s:-3300, e:-1300, r:"Indus Valley / South Asia",  t:"debated",   cont:"asia",
    d:"The Indus Valley Civilisation at its Mature Harappan peak (~2600–1900 BCE) was the world's largest Bronze Age civilisation by area — extending 1.5 million square kilometres across modern Pakistan and northwest India. Mohenjo-daro and Harappa had populations of 30,000–80,000 — among the world's largest cities. The civilisation's advanced urban planning (grid streets, standardised weights, covered drains, public baths) exceeds contemporary Mesopotamia and Egypt. Its sudden collapse remains unexplained: climate change, Saraswati River drying, Aryan migration, and internal decline have all been proposed. David Frawley argues the Indus Valley language was Proto-Dravidian, connecting it to the Vedic tradition.",
    up:5891, dn:891,
    dateTheories:[
      { s:-7000, e:-3300, label:"Frawley — pre-Harappan Vedic continuity", source:"In Search of the Cradle of Civilization (1995)", researcher:"David Frawley", up:2102, dn:2891 }
    ] },

  { id:149, n:"Urartu / Kingdom of Van",        s:-860,  e:-590,  r:"Armenian Highlands / Eastern Anatolia", t:"confirmed", cont:"middle-east",
    d:"The Kingdom of Urartu (known in the Bible as Ararat) was the dominant power of the Armenian Highlands during the Iron Age, rivalling Assyria for control of the Near East. From their capital Tushpa (modern Van, Turkey), the Urartians built formidable mountain fortresses, sophisticated irrigation canals, and developed a distinctive cuneiform script. They were master metallurgists — Urartian bronzework was traded across the ancient world. The kingdom was destroyed by the Scythians and Medes ~590 BCE. Mount Ararat — associated with Noah's Ark in Abrahamic tradition — lies in the historical territory of Urartu.",
    up:3102, dn:289 },

  { id:150, n:"Poverty Point Culture",          s:-1700, e:-700,  r:"Louisiana / Lower Mississippi", t:"confirmed", cont:"americas",
    d:"Poverty Point in northeastern Louisiana is one of North America's most enigmatic archaeological sites — a monumental complex of concentric earthen ridges, mounds and plazas constructed by hunter-gatherers between 1700–1100 BCE. The site's six concentric semi-circular ridges span 1.2 kilometres in diameter. The sophistication of the construction — requiring coordinated labour over generations — challenges the assumption that monumental architecture requires agriculture. Poverty Point traded obsidian, copper and galena from sources 1,000+ miles away, indicating a vast exchange network. How a non-agricultural society organised the construction remains one of North American archaeology's great puzzles.",
    up:4201, dn:289 },
];
