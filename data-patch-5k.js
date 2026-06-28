// ============================================================
// CHRONOS — data-patch-5k.js
// Phase 5k: Civilizations 151–180
// Apply by appending the CIVS_PATCH_5K array entries to CIVS in data.js
// Verify after: CIVS.length === 180
// ============================================================

const CIVS_PATCH_5K = [

  // ── CONFIRMED AFRICAN KINGDOMS ──────────────────────────────────────

  {
    id:   151,
    n:    "Benin Empire",
    s:    -900,
    e:    1897,
    r:    "West Africa (modern Nigeria)",
    t:    "confirmed",
    cont: "africa",
    d:    "One of the oldest and most sophisticated states in sub-Saharan Africa, centred at Benin City in present-day Nigeria. Renowned for its extraordinary bronze and ivory artworks, the Benin bronzes stand among the world's great artistic traditions. The Oba (king) exercised centralised authority over a complex bureaucratic state with a powerful military. Brutally dissolved by British forces in the Punitive Expedition of 1897, when thousands of bronzes were looted and dispersed to European museums.",
    up:   1240,
    dn:   87,
    dateTheories: [
      {
        s:    -1300, e: -800,
        label: "Connah — archaeological occupation layers suggest earlier complex polity",
        source: "African Civilizations (1987)",
        researcher: "Graham Connah",
        up: 390, dn: 210,
      }
    ]
  },

  {
    id:   152,
    n:    "Oyo Empire",
    s:    1300,
    e:    1896,
    r:    "West Africa (modern Nigeria/Benin)",
    t:    "confirmed",
    cont: "africa",
    d:    "The Oyo Empire was the largest and most powerful Yoruba state, at its height dominating much of present-day Nigeria and Benin. Its military strength rested on a formidable cavalry, unusual for sub-Saharan Africa. The empire operated a sophisticated constitutional monarchy with the Alafin (king) balanced by the Oyo Mesi council. Oyo became deeply entangled in the Atlantic slave trade before its eventual collapse under internal revolt and Fulani jihad pressure.",
    up:   870,
    dn:   44,
  },

  {
    id:   153,
    n:    "Funj Sultanate",
    s:    1504,
    e:    1821,
    r:    "Upper Nile (modern Sudan)",
    t:    "confirmed",
    cont: "africa",
    d:    "The Funj Sultanate, also called the Sultanate of Sennar, was the last of the great Sudanese medieval kingdoms. Founded following the collapse of the Christian Nubian kingdoms, it controlled the fertile confluence of the Blue and White Niles and became a major centre of Islamic scholarship. The Funj ruling class origins remain debated — theories range from nomadic African cattle herders to displaced Yemeni elites. The sultanate was conquered by Muhammad Ali's Egyptian forces in 1821.",
    up:   540,
    dn:   62,
    dateTheories: [
      {
        s:    1400, e: 1504,
        label: "Spaulding — pre-sultanate Funj confederation preceded formal state by a century",
        source: "Heroic Age in Sinnar (2007)",
        researcher: "Jay Spaulding",
        up: 180, dn: 95,
      }
    ]
  },

  {
    id:   154,
    n:    "Kanem-Bornu Empire",
    s:    -700,
    e:    1900,
    r:    "Lake Chad Basin (modern Chad, Nigeria, Cameroon)",
    t:    "confirmed",
    cont: "africa",
    d:    "One of the longest-surviving and most geographically stable African empires, Kanem-Bornu endured for nearly two millennia through successive dynastic transformations. Centred on the Lake Chad basin, it controlled trans-Saharan trade routes linking sub-Saharan Africa to North Africa and the Mediterranean. The empire became Islamized around the 11th century CE and produced notable scholarship and governance structures. Its remarkable longevity reflects deep ecological and commercial advantages of the Chad basin.",
    up:   760,
    dn:   55,
  },

  // ── CONFIRMED ASIAN CIVILIZATIONS ────────────────────────────────────

  {
    id:   155,
    n:    "Ganga Dynasty (Eastern)",
    s:    496,
    e:    1434,
    r:    "Odisha, India",
    t:    "confirmed",
    cont: "asia",
    d:    "The Eastern Ganga Dynasty ruled much of modern Odisha for nearly a thousand years and produced some of India's most magnificent temple architecture, including the Konark Sun Temple and the Jagannath Temple complex at Puri. Their rule represented a high point of Orissan cultural synthesis, blending Shaivite, Vaishnavite, and tantric traditions. The dynasty maintained naval power and trading contacts with Southeast Asia. Their architectural legacy continues to define Orissan cultural identity.",
    up:   620,
    dn:   38,
  },

  {
    id:   156,
    n:    "Pallava Empire",
    s:    275,
    e:    897,
    r:    "South India (modern Tamil Nadu)",
    t:    "confirmed",
    cont: "asia",
    d:    "The Pallava dynasty of Kanchipuram was the preeminent power of South India for nearly seven centuries and played a transformative role in the cultural history of Southeast Asia. Their rock-cut and structural temples at Mamallapuram represent the origins of Dravidian temple architecture. Pallava scripts directly gave rise to many Southeast Asian writing systems including Khmer, Javanese, and Burmese scripts. The dynasty's naval expeditions spread Hinduism and Buddhism across the Bay of Bengal.",
    up:   810,
    dn:   29,
  },

  {
    id:   157,
    n:    "Srivijaya Maritime Empire",
    s:    650,
    e:    1375,
    r:    "Sumatra, Maritime Southeast Asia",
    t:    "confirmed",
    cont: "asia",
    d:    "Srivijaya was the dominant maritime power of Southeast Asia for over seven centuries, controlling the vital Strait of Malacca and with it the spice trade between China and India. Based in southern Sumatra, it was a thalassocracy — a seaborne empire with no fixed territorial borders but absolute control of maritime commerce. The empire became the most important centre of Buddhist learning outside India; Chinese pilgrim Yijing spent years studying there in the 7th century CE. Its sudden collapse in the 13th–14th centuries remains poorly understood.",
    up:   940,
    dn:   41,
  },

  {
    id:   158,
    n:    "Majapahit Empire",
    s:    1293,
    e:    1527,
    r:    "Java, Maritime Southeast Asia",
    t:    "confirmed",
    cont: "asia",
    d:    "Majapahit was the last great Hindu-Buddhist empire of Southeast Asia and is considered by many Indonesians as the precursor state to the modern Indonesian nation. At its peak under Hayam Wuruk (r. 1350–1389) and his prime minister Gajah Mada, it claimed suzerainty over much of the Indonesian archipelago, the Malay peninsula, and parts of the Philippines. Its decline resulted from succession conflicts, the rise of Islamic Demak, and the eventual sack of its capital. The Nagarakretagama, a 14th-century court poem, is the primary source for its geography and culture.",
    up:   870,
    dn:   33,
  },

  // ── CONFIRMED AMERICAS & OCEANIA ─────────────────────────────────────

  {
    id:   159,
    n:    "Mississippian Culture",
    s:    800,
    e:    1600,
    r:    "Eastern North America (Mississippi Valley)",
    t:    "confirmed",
    cont: "americas",
    d:    "The Mississippian culture was the most complex pre-Columbian society north of Mexico, building large flat-topped platform mounds across the eastern half of North America. Cahokia, near modern St. Louis, was its largest centre — at its peak around 1100 CE it may have housed 20,000 people, making it larger than contemporary London. The culture was characterised by maize agriculture, long-distance trade networks, elaborate burial practices, and a theocratic leadership structure. It had largely declined before European contact, possibly due to climate deterioration and conflict.",
    up:   1050,
    dn:   48,
    dateTheories: [
      {
        s:    600, e: 800,
        label: "Pauketat — earlier Emergent Mississippian phase extends origins by two centuries",
        source: "Cahokia: Ancient America's Great City on the Mississippi (2009)",
        researcher: "Timothy Pauketat",
        up: 420, dn: 130,
      }
    ]
  },

  {
    id:   160,
    n:    "Tiwanaku Civilization",
    s:    -200,
    e:    1000,
    r:    "Lake Titicaca Basin (modern Bolivia/Peru)",
    t:    "confirmed",
    cont: "americas",
    d:    "Tiwanaku was one of the most influential pre-Columbian civilizations of the Andes, dominating a vast highland network from its ceremonial capital on the southern shores of Lake Titicaca. Its distinctive iconography — including the Gateway of the Sun and the Staff God motif — spread across the Andes and became the template for subsequent Andean religious expression, including the Inca. The Tiwanaku engineered extraordinary raised field agriculture (suka kollus) capable of sustaining large populations in the harsh altiplano environment. Its collapse around 1000 CE is linked to prolonged drought.",
    up:   980,
    dn:   94,
    dateTheories: [
      {
        s:    -15000, e: -10000,
        label: "Posnansky — astronomical alignment of temple suggests construction 15,000 BCE",
        source: "Tiahuanacu: The Cradle of American Man (1945)",
        researcher: "Arthur Posnansky",
        up: 520, dn: 1840,
      },
      {
        s:    -600, e: -200,
        label: "Janusek — ceramic and radiocarbon evidence supports earlier urban phase than standard",
        source: "Ancient Tiwanaku (2008)",
        researcher: "John Janusek",
        up: 310, dn: 155,
      }
    ]
  },

  {
    id:   161,
    n:    "Lapita Culture",
    s:    -1600,
    e:    -500,
    r:    "Western Pacific (Melanesia to Western Polynesia)",
    t:    "confirmed",
    cont: "oceania",
    d:    "The Lapita people were the ancestors of Polynesian, Fijian, Tongan, and Samoan civilizations — arguably the greatest maritime colonists in human history. Distinguished by a unique and highly recognisable dentate-stamped pottery tradition, they navigated open ocean expanses with outrigger canoes, colonising island chains from the Bismarck Archipelago eastward to Tonga and Samoa over roughly a millennium. Their voyaging technology and navigational knowledge represent extraordinary achievements. Lapita culture is the deep root of Polynesian civilizational expansion that ultimately reached Hawaii, New Zealand, and Easter Island.",
    up:   890,
    dn:   31,
  },

  {
    id:   162,
    n:    "Hawaiian Chiefdom Confederacy",
    s:    300,
    e:    1810,
    r:    "Hawaiian Islands, Pacific Ocean",
    t:    "confirmed",
    cont: "oceania",
    d:    "The Hawaiian Islands were settled by Polynesian navigators around 300–600 CE and subsequently developed one of the most complex chiefdom societies in the Pacific. Hawaiian society was organised around the concept of mana (spiritual power) and an elaborate kapu (taboo) system that structured every aspect of life. Large-scale engineering projects — fish ponds, irrigation networks, heiau temples — testify to the organisational power of ali'i (chiefly) authority. The islands were unified under Kamehameha I by 1810, forming a kingdom that persisted until American annexation in 1898.",
    up:   740,
    dn:   27,
  },

  // ── CONFIRMED CENTRAL ASIA ───────────────────────────────────────────

  {
    id:   163,
    n:    "Sogdian Civilization",
    s:    -600,
    e:    1000,
    r:    "Transoxiana (modern Uzbekistan/Tajikistan)",
    t:    "confirmed",
    cont: "asia",
    d:    "The Sogdians were the master merchants of the ancient and medieval world — the dominant commercial intermediaries of the Silk Road for over a millennium. Operating from city-states in the Zerafshan valley (modern Samarkand and Bukhara), Sogdian trading networks extended from China to Byzantium. Their letters, discovered preserved in a Chinese watchtower, represent the earliest direct evidence of Silk Road commerce. Sogdian script became the ancestor of Uyghur, Mongolian, and Manchu scripts. The culture was effectively dissolved by the Arab conquest of the 8th century CE.",
    up:   860,
    dn:   42,
  },

  {
    id:   164,
    n:    "Bactria-Margiana Archaeological Complex (BMAC)",
    s:    -2300,
    e:    -1700,
    r:    "Central Asia (modern Afghanistan/Turkmenistan/Uzbekistan)",
    t:    "confirmed",
    cont: "asia",
    d:    "The Bactria-Margiana Archaeological Complex, sometimes called the Oxus Civilization, was a Bronze Age urban culture of remarkable sophistication that flourished in the oasis zones of Central Asia. Its planned monumental architecture, distinctive metal and stone objects, and proto-writing system indicate a complex hierarchical society. Intriguing parallels with the Indus Valley Civilization have suggested to some scholars a direct cultural exchange. BMAC artefacts appear across a vast area from the Persian Gulf to the Chinese border, indicating extensive trade.",
    up:   670,
    dn:   58,
    dateTheories: [
      {
        s:    -2800, e: -2300,
        label: "Sarianidi — earlier proto-BMAC phases extend urban origins by five centuries",
        source: "Margiana and Protozoroastrism (1998)",
        researcher: "Viktor Sarianidi",
        up: 240, dn: 180,
      }
    ]
  },

  {
    id:   165,
    n:    "Khazar Khaganate",
    s:    650,
    e:    1048,
    r:    "Pontic-Caspian Steppe (modern Russia/Ukraine/Kazakhstan)",
    t:    "confirmed",
    cont: "europe",
    d:    "The Khazar Khaganate was a major Eurasian power that dominated the steppe corridor north of the Caucasus for four centuries, serving as a crucial buffer between the expanding Islamic Caliphate and Christian Byzantium. Remarkably, the Khazar ruling elite converted to Judaism in the 8th or 9th century CE — the only major medieval state conversion to Judaism. The reasons for this conversion remain debated but may have represented a deliberate political neutrality between Muslim and Christian powers. Their capital Atil on the Volga delta was a cosmopolitan trading hub destroyed by Rus' prince Sviatoslav in 968 CE.",
    up:   780,
    dn:   140,
    dateTheories: [
      {
        s:    740, e: 840,
        label: "Koestler — argues Khazar conversion seeded a large proportion of Ashkenazi Jewish ancestry",
        source: "The Thirteenth Tribe (1976)",
        researcher: "Arthur Koestler",
        up: 1240, dn: 2180,
      }
    ]
  },

  // ── DEBATED ENTRIES ───────────────────────────────────────────────────

  {
    id:   166,
    n:    "Bosnian Pyramid Complex",
    s:    -12000,
    e:    -8000,
    r:    "Visoko, Bosnia and Herzegovina",
    t:    "debated",
    cont: "europe",
    d:    "A cluster of hills near Visoko, Bosnia, claimed by archaeologist Semir Osmanagić to be the largest pyramid complex in the world, predating Egyptian pyramids by thousands of years. Osmanagić argues that Visočica hill is a constructed pyramid with internal tunnel networks, oriented to astronomical alignments. Mainstream archaeologists including the European Association of Archaeologists have formally objected, concluding the hills are natural formations shaped by tectonic and erosion processes. Supporters point to concrete-like blocks found on the surface and ultrasound-like energy readings. Excavations continue; the debate is unresolved.",
    up:   2140,
    dn:   3820,
    dateTheories: [
      {
        s:    -25000, e: -12000,
        label: "Osmanagić — carbon dating of organic material in tunnels suggests construction up to 25,000 BCE",
        source: "Pyramids of Bosnia (2005); ongoing excavation reports",
        researcher: "Semir Osmanagić",
        up: 1820, dn: 3140,
      },
      {
        s:    -12000, e: -8000,
        label: "Schoch — if artificial, geological context aligns with post-YD construction window",
        source: "Personal correspondence / conference presentation (2013)",
        researcher: "Robert Schoch",
        up: 890, dn: 640,
      }
    ]
  },

  {
    id:   167,
    n:    "Adam's Calendar Culture",
    s:    -75000,
    e:    -70000,
    r:    "Mpumalanga, South Africa",
    t:    "theorized",
    cont: "africa",
    d:    "A stone circle complex in the Waterberg mountains of South Africa's Mpumalanga region, proposed by researcher Michael Tellinger and Johan Heine as the world's oldest stone calendar, potentially 75,000–300,000 years old. Tellinger links the site to a broader network of thousands of ancient stone ruins across southern Africa, which he interprets as gold-mining infrastructure built by an advanced pre-human or early human civilisation — connecting to Zecharia Sitchin's Anunnaki hypothesis. Independent geologists associate the stone formations with dolerite erosion and natural geological processes. The site's astronomical orientations — including alignment to solstice sunrises — are less disputed than its age or artificial origin.",
    up:   1640,
    dn:   2950,
    dateTheories: [
      {
        s:    -300000, e: -75000,
        label: "Tellinger & Heine — archaeoastronomical back-calculation suggests 300,000-year age",
        source: "Adam's Calendar (2008)",
        researcher: "Michael Tellinger",
        up: 1240, dn: 2710,
      },
      {
        s:    -75000, e: -50000,
        label: "Heine — conservative astronomical calculation based on Orion alignment yields 75,000 BCE",
        source: "Adam's Calendar (2008)",
        researcher: "Johan Heine",
        up: 890, dn: 1540,
      }
    ]
  },

  {
    id:   168,
    n:    "Göbekli Tepe Builders",
    s:    -11600,
    e:    -8000,
    r:    "Şanlıurfa Province, Turkey",
    t:    "debated",
    cont: "asia",
    d:    "The builders of Göbekli Tepe constructed the world's earliest known monumental architecture — complex T-shaped megalithic pillars carved with sophisticated animal imagery — roughly 6,000 years before Stonehenge. The site challenges the conventional model that monumental architecture required sedentary agriculture, as it appears to predate organised farming in the region. The identity, social organisation, and belief system of its builders remain unknown. Andrew Collins argues the astronomical orientations reference Cygnus, while Klaus Schmidt (the site's chief excavator) identified it as a ceremonial gathering site. Deliberately buried around 8000 BCE, the reason for its concealment is one of archaeology's great mysteries.",
    up:   2840,
    dn:   290,
    dateTheories: [
      {
        s:    -13000, e: -11600,
        label: "Collins — Layer III construction may predate mainstream estimate; Cygnus alignment suggests earlier phase",
        source: "Göbekli Tepe: Genesis of the Gods (2014)",
        researcher: "Andrew Collins",
        up: 1120, dn: 580,
      },
      {
        s:    -11600, e: -10000,
        label: "Schmidt — rigorous stratigraphic and radiocarbon dating confirms 9600–8000 BCE for active phases",
        source: "Sie bauten die ersten Tempel (2006)",
        researcher: "Klaus Schmidt",
        up: 1980, dn: 140,
      }
    ]
  },

  {
    id:   169,
    n:    "Sanxingdui Culture",
    s:    -2800,
    e:    -1046,
    r:    "Sichuan Province, China",
    t:    "debated",
    cont: "asia",
    d:    "The Sanxingdui culture, discovered accidentally in 1929 and excavated extensively since 1986, produced bronze masks, gold objects, and ritual items utterly unlike anything in the contemporary Yellow River civilizations and with no known writing system. The extraordinary bronze heads with enlarged eyes, the gold scepters, and the bronze tree of life have no parallel in Chinese archaeology. The culture appears to have been contemporaneous with Shang Dynasty China yet entirely independent. Its sudden disappearance and the ritual burial of its treasure pits remain unexplained. New pits discovered in 2021 continue to yield astonishing finds.",
    up:   2100,
    dn:   180,
    dateTheories: [
      {
        s:    -4500, e: -2800,
        label: "Li — new excavation evidence suggests earlier phases extending to Neolithic period",
        source: "Sanxingdui Archaeological Report Vol.3 (2022)",
        researcher: "Li Haichao",
        up: 640, dn: 240,
      }
    ]
  },

  {
    id:   170,
    n:    "Yonaguni Submarine Monument",
    s:    -10000,
    e:    -8000,
    r:    "Yonaguni Island, Ryukyu Archipelago, Japan",
    t:    "debated",
    cont: "asia",
    d:    "A submerged rock formation off the coast of Japan's westernmost island, Yonaguni, first explored by divers in 1987. Marine geologist Masaaki Kimura argues the terraced steps, right angles, and what appears to be a carved road and ceremonial arch are evidence of a human-built structure submerged when post-glacial sea levels rose approximately 12,000 years ago. Western geologists — including Robert Schoch who dived the site — are divided: Schoch initially argued for natural formation but later acknowledged possible human modification of natural geology. If artificial, it would represent evidence of sophisticated pre-agricultural civilization in East Asia.",
    up:   2640,
    dn:   1580,
    dateTheories: [
      {
        s:    -10000, e: -8000,
        label: "Kimura — sea level rise chronology dates submersion to 10,000–8,000 BCE; construction predates this",
        source: "Man-Made Structures off Yonaguni Island (1996)",
        researcher: "Masaaki Kimura",
        up: 1840, dn: 1120,
      },
      {
        s:    -12000, e: -10000,
        label: "Hancock — Yonaguni is consistent with pre-YD maritime civilisation thesis",
        source: "Underworld: The Mysterious Origins of Civilization (2002)",
        researcher: "Graham Hancock",
        up: 2140, dn: 980,
      }
    ]
  },

  // ── THEORIZED ENTRIES ─────────────────────────────────────────────────

  {
    id:   171,
    n:    "Thule Civilization",
    s:    -20000,
    e:    -8000,
    r:    "Northern polar regions (theorized)",
    t:    "theorized",
    cont: "global",
    d:    "Thule — named for Greco-Roman geographers' description of a mythical northern land — has been proposed across centuries as a lost northern civilization of high antiquity. In esoteric and theosophical traditions (notably Blavatsky and later Guido von List), Thule was an Aryan homeland of advanced beings; this strand was later appropriated by Nazi occultism. In contemporary alternative research, Thule represents a possible ice-free Arctic civilization during the last glacial period's warming phases. Genetic studies confirming the Thule people of the Arctic as ancestors of modern Inuit are distinct from these speculative traditions and represent a confirmed historical migration.",
    up:   940,
    dn:   1820,
    dateTheories: [
      {
        s:    -20000, e: -12000,
        label: "Theosophical tradition — Thule as pre-Atlantean northern polar civilisation",
        source: "The Secret Doctrine (1888)",
        researcher: null,
        up: 420, dn: 1840,
      }
    ]
  },

  {
    id:   172,
    n:    "Pre-Flood North American Culture",
    s:    -13000,
    e:    -10800,
    r:    "North America (theorized — multiple sites)",
    t:    "theorized",
    cont: "americas",
    d:    "A theorized complex society or network of societies in pre-Clovis North America, which alternative researchers argue was destroyed or severely disrupted by the Younger Dryas Impact Event circa 10,800 BCE. Evidence cited includes the White River Nahanni skull cache, the Topper Site in South Carolina (with possible human-modified stones dating to 50,000 BCE), and Serpent Mound's alignment to the Younger Dryas Boundary. Randall Carlson and Graham Hancock argue that North American myths of a great flood — particularly among the Ojibwe, Hopi, and Cherokee — preserve cultural memory of this catastrophe. Mainstream archaeology acknowledges pre-Clovis occupation but disputes civilizational complexity prior to the Holocene.",
    up:   1840,
    dn:   1240,
    dateTheories: [
      {
        s:    -50000, e: -13000,
        label: "Carlson — Topper Site and other pre-Clovis evidence supports very deep human presence in Americas",
        source: "Kosmographia Podcast Episodes 88–104 (2019–2021)",
        researcher: "Randall Carlson",
        up: 1120, dn: 980,
      },
      {
        s:    -13000, e: -10800,
        label: "Hancock — North American mythological record encodes memory of pre-YD coastal civilisation",
        source: "America Before (2019)",
        researcher: "Graham Hancock",
        up: 1640, dn: 840,
      }
    ]
  },

  {
    id:   173,
    n:    "Mu / Pacific Lemuria",
    s:    -50000,
    e:    -10000,
    r:    "Pacific Ocean basin (theorized)",
    t:    "theorized",
    cont: "oceania",
    d:    "Mu — later often conflated with Lemuria — was proposed by Augustus Le Plongeon and James Churchward as a vast sunken Pacific continent, the mother civilisation of all known ancient cultures. Churchward claimed to have translated ancient 'Naacal tablets' in India describing Mu's history and cataclysmic destruction. Theosophists, including Helena Blavatsky, incorporated a similar Pacific Lemuria as the home of a third root race. Modern oceanography rules out any continent-scale land mass having existed in the Pacific during human evolution, though significant coastlines were indeed submerged during post-glacial sea level rise. Polynesian mythological traditions of sunken lands like Hawaiki are sometimes cited as supporting cultural memory.",
    up:   1240,
    dn:   2840,
    dateTheories: [
      {
        s:    -50000, e: -10000,
        label: "Churchward — Naacal tablets describe Mu's existence from 50,000 BCE to catastrophic sinking circa 10,000 BCE",
        source: "The Lost Continent of Mu (1926)",
        researcher: "James Churchward",
        up: 620, dn: 2140,
      }
    ]
  },

  {
    id:   174,
    n:    "Tartaria / Hyperborea",
    s:    -15000,
    e:    -8000,
    r:    "Central Eurasia / Siberia (theorized)",
    t:    "theorized",
    cont: "asia",
    d:    "Tartaria is a term used both historically (for the vast Mongol/Turkic steppe empire of medieval maps) and, in modern alternative history, for a theorized advanced civilisation of Siberia and Central Eurasia deliberately erased from the historical record. Proponents point to the Tartaria clay tablets (actually Vinča culture artefacts from Romania), anomalous Siberian architecture, and alleged population resets. Hyperborea — the Greek mythological land beyond the North Wind — is sometimes conflated with this tradition. The mainstream historical Tartary is real and documented; the conspiratorial 'mud flood' and 'reset' variants are internet-originated theories with no archaeological basis.",
    up:   1840,
    dn:   3240,
    dateTheories: [
      {
        s:    -15000, e: -8000,
        label: "Various — Siberian megalithic sites and Denisovan genetics cited as evidence of pre-ice-age northern civilisation",
        source: "Various internet researchers (2015–present)",
        researcher: null,
        up: 980, dn: 2840,
      }
    ]
  },

  {
    id:   175,
    n:    "Antarctic Pre-Ice Civilization",
    s:    -20000,
    e:    -6000,
    r:    "Antarctica (theorized)",
    t:    "theorized",
    cont: "global",
    d:    "The hypothesis that Antarctica supported an advanced civilisation before the continent became ice-covered, based primarily on Charles Hapgood's crustal displacement theory and the Piri Reis map (1513 CE), which appears to show an ice-free Antarctic coastline. Hapgood argued — with Einstein's endorsement — that a sudden shift of the Earth's crust periodically relocated polar positions, allowing temperate conditions at polar latitudes. Graham Hancock and Rand Flem-Ath have developed this thesis, proposing Antarctica as the location of Plato's Atlantis. Mainstream geology rejects rapid crustal displacement; the Piri Reis map's Antarctic features are contested as misidentifications of South American coastlines.",
    up:   2140,
    dn:   2480,
    dateTheories: [
      {
        s:    -20000, e: -12000,
        label: "Hapgood — crustal displacement placed Antarctica at temperate latitude; civilisation possible in this window",
        source: "Earth's Shifting Crust (1958); Maps of the Ancient Sea Kings (1966)",
        researcher: "Charles Hapgood",
        up: 1540, dn: 1980,
      },
      {
        s:    -12000, e: -6000,
        label: "Hancock & Flem-Ath — Antarctica as Plato's Atlantis, gradually iced over post-YDB",
        source: "When the Sky Fell (1995); Fingerprints of the Gods (1995)",
        researcher: "Graham Hancock",
        up: 1840, dn: 1640,
      }
    ]
  },

  // ── ADDITIONAL CONFIRMED GAPS ─────────────────────────────────────────

  {
    id:   176,
    n:    "Aksumite Empire",
    s:    100,
    e:    940,
    r:    "Horn of Africa (modern Ethiopia/Eritrea)",
    t:    "confirmed",
    cont: "africa",
    d:    "Aksum was one of the great civilizations of antiquity and one of the world's earliest Christian states, converting under King Ezana in the 4th century CE. The Aksumite Empire controlled a crucial position on Red Sea trade routes, becoming a major commercial power linking the Roman Empire, Arabia, India, and sub-Saharan Africa. Its monolithic granite stelae — the largest standing obelisk in the ancient world — testify to extraordinary engineering. Aksum is also the traditional claimant to the Ark of the Covenant, housed according to Ethiopian Orthodox tradition at the Church of Our Lady Mary of Zion.",
    up:   1120,
    dn:   55,
    dateTheories: [
      {
        s:    -400, e: 100,
        label: "Phillipson — Aksumite origins in earlier proto-Aksumite culture predating common era",
        source: "Ancient Ethiopia: Aksum, Its Antecedents and Successors (1998)",
        researcher: "David Phillipson",
        up: 380, dn: 140,
      }
    ]
  },

  {
    id:   177,
    n:    "Mapungubwe Kingdom",
    s:    1075,
    e:    1220,
    r:    "Limpopo Valley (modern South Africa/Zimbabwe/Botswana)",
    t:    "confirmed",
    cont: "africa",
    d:    "Mapungubwe was southern Africa's first known state-level society, a stratified kingdom that flourished at the confluence of the Limpopo and Shashe rivers for roughly 150 years. Its hilltop capital became a symbol of political and ritual power in the region. The discovery of a golden rhinoceros figure and other gold artefacts in the royal burial site established that Mapungubwe was a sophisticated polity engaged in Indian Ocean gold trade — centuries before Great Zimbabwe. The kingdom's decline coincides with the rise of Great Zimbabwe, suggesting a northward shift of power possibly related to climate and trade route changes.",
    up:   680,
    dn:   32,
  },

  {
    id:   178,
    n:    "Chimú Empire",
    s:    850,
    e:    1470,
    r:    "North Coast of Peru (modern La Libertad region)",
    t:    "confirmed",
    cont: "americas",
    d:    "The Chimú Empire was the second largest pre-Columbian empire of South America and the Inca's most formidable predecessor. Its capital Chan Chan, near modern Trujillo, was the largest pre-Columbian city in South America, covering 20 square kilometres of adobe architecture. The Chimú were master hydraulic engineers, building extensive canal networks to sustain agriculture in the hyper-arid Atacama coastal fringe. Their metallurgy — particularly gold and silver work — was absorbed wholesale by the Inca after their conquest in 1470 CE. Chimú oral traditions and administrative systems also influenced Inca statecraft.",
    up:   840,
    dn:   38,
  },

  {
    id:   179,
    n:    "Hopewell Culture",
    s:    -100,
    e:    500,
    r:    "Ohio and Illinois River valleys, North America",
    t:    "confirmed",
    cont: "americas",
    d:    "The Hopewell tradition represents a remarkable cultural phenomenon — a network of interacting communities across the eastern United States unified not by a single political entity but by shared ceremonial practices, artistic styles, and long-distance trade. Hopewell exchange networks moved copper from the Great Lakes, obsidian from the Rockies, shells from the Gulf, and mica from the Appalachians across thousands of kilometres. The great earthwork complexes of Ohio — including Newark Earthworks and Hopewell Mound Group — demonstrate sophisticated astronomical knowledge and massive communal labour. The tradition's decline around 500 CE is poorly understood.",
    up:   920,
    dn:   44,
  },

  {
    id:   180,
    n:    "Jōmon Culture",
    s:    -14000,
    e:    -300,
    r:    "Japanese Archipelago",
    t:    "confirmed",
    cont: "asia",
    d:    "The Jōmon are one of the world's oldest pottery-producing cultures, with ceramic vessels dating to approximately 14,000 BCE — among the earliest known in the world. Over their 14,000-year span, the Jōmon developed a sophisticated hunter-gatherer-fisher society with sedentary villages, complex ritual practices, and remarkably standardised artistic traditions across the Japanese archipelago. Recent ancient DNA analysis has established that they represent a deeply divergent human lineage, contributing significantly to modern Japanese genetics. The Jōmon's long tenure of sedentism without agriculture challenges simplistic models of social complexity.",
    up:   1040,
    dn:   36,
    dateTheories: [
      {
        s:    -16500, e: -14000,
        label: "Kaner — thermoluminescence dating of early pottery sites suggests origins may predate standard radiocarbon dates",
        source: "The Jōmon World (2009)",
        researcher: "Simon Kaner",
        up: 290, dn: 180,
      }
    ]
  },

];

// ── HOW TO APPLY THIS PATCH ──────────────────────────────────────────────
//
// In data.js, find the closing bracket of the CIVS array:
//   ]  // end of CIVS
//
// Replace it with:
//   ...CIVS_PATCH_5K,
// ]  // end of CIVS
//
// OR: paste each entry from CIVS_PATCH_5K into CIVS before the closing bracket.
// Verify: CIVS.length === 180
// ────────────────────────────────────────────────────────────────────────
