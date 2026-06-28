// ============================================================
// CHRONOS — celestial-data-traditions.js
// Cross-cultural astronomical traditions and cosmological systems
// ============================================================

const CELESTIAL_TRADITIONS = [

  {
    name: "Egyptian Sacred Astronomy",
    region: "africa",
    period_s: -3200, period_e: -30,
    colour: "#d4a017",
    note: "Egyptian astronomy was inseparable from religion. The Duat (underworld) was mapped onto the night sky. Pyramids aligned with circumpolar stars — specifically Thuban (the pole star of 2500 BCE) via the northern shafts of the Great Pyramid. The Dendera Zodiac (50 BCE) preserves the oldest complete zodiac chart.",
    key_stars: ["Sirius (Sopdet / Isis)", "Orion (Osiris)", "Ursa Major (Bull's Thigh)"],
    key_cycles: ["Sirius heliacal rising", "Lunar calendar", "Civil 365-day year"],
  },
  {
    name: "Babylonian Astronomy",
    region: "asia",
    period_s: -1800, period_e: -300,
    colour: "#6b21a8",
    note: "Babylon produced the first systematic astronomical records. The MUL.APIN tablets (c. 1000 BCE) catalogue stars, planets, and heliacal risings. The Venus Tablet of Ammisaduqa (c. 1700 BCE) is among the oldest planetary records. Babylonian astronomers identified the Saros cycle, the Metonic cycle, and predicted eclipses with high accuracy.",
    key_stars: ["Pleiades (MUL.MUL)", "Scorpius (GIR.TAB)", "Leo (UR.GU.LA)"],
    key_cycles: ["Saros cycle (18.03 yr)", "Metonic cycle (19 yr)", "Venus synodic cycle"],
  },
  {
    name: "Mayan Astronomical Tradition",
    region: "americas",
    period_s: -2000, period_e: 1500,
    colour: "#0c6a69",
    note: "Mayan astronomers tracked Venus with extraordinary precision — the Dresden Codex Venus tables are accurate to within 2 hours over 481 years. The Long Count calendar anchored to 3114 BCE encodes a 5,125-year Great Cycle. Mayan observatories (the Caracol at Chichen Itza) were precisely aligned to Venus rising and setting points.",
    key_stars: ["Pleiades (Tzab-ek)", "Scorpius", "Milky Way (World Tree / Xibalba road)"],
    key_cycles: ["Venus 584-day synodic cycle", "Tzolk'in 260-day ritual calendar", "Haab' 365-day solar year", "Calendar Round 52 years", "Long Count 5,125 years"],
  },
  {
    name: "Hindu / Vedic Astronomy (Jyotisha)",
    region: "asia",
    period_s: -3500, period_e: 1800,
    colour: "#e05030",
    note: "Vedic astronomy — one of the six Vedangas — tracked the Moon through 27 lunar mansions (Nakshatras). The Surya Siddhanta (c. 400 CE) calculated Earth's diameter and the length of the sidereal year with remarkable accuracy. David Frawley and others have argued that Vedic astronomical references push the origin of the tradition back to 4000–6000 BCE.",
    key_stars: ["Ashwini (β Arietis)", "Krittika (Pleiades)", "Rohini (Aldebaran)"],
    key_cycles: ["27 Nakshatras", "Yuga cycles", "Precessional Great Year (Mahayuga)"],
  },
  {
    name: "Chinese Astronomical Tradition",
    region: "asia",
    period_s: -2300, period_e: 1900,
    colour: "#c0a060",
    note: "Chinese astronomy developed one of the longest continuous observational records. The sky was divided into 28 Lunar Mansions (Xiu). State astronomers interpreted celestial omens as political mandates. Chinese records of supernovae (1054 CE / Crab Nebula), comets, and sunspots are among the most valuable in archeoastronomy.",
    key_stars: ["Polaris (Northern Emperor)", "Sirius (Wolf Star)", "Scorpius (Azure Dragon tail)"],
    key_cycles: ["28 Lunar Mansions (Xiu)", "60-year Sexagenary Cycle", "Jupiter 12-year cycle"],
  },
  {
    name: "Greek / Hellenistic Astronomy",
    region: "europe",
    period_s: -600, period_e: 400,
    colour: "#4080c0",
    note: "Greek astronomy synthesised Babylonian data with geometric modelling. Hipparchus (c. 190–120 BCE) discovered the precession of the equinoxes. Eratosthenes calculated Earth's circumference to within 1%. The Antikythera Mechanism (c. 100 BCE) computed planetary positions, eclipse cycles, and the Panhellenic Games calendar — a mechanical computer 1,500 years ahead of its time.",
    key_stars: ["Sirius", "Arcturus", "Canopus"],
    key_cycles: ["Metonic cycle", "Saros cycle", "Callippic cycle (76 yr)"],
  },
  {
    name: "Polynesian Navigation Astronomy",
    region: "pacific",
    period_s: -1000, period_e: 1800,
    colour: "#40c0c0",
    note: "Polynesian navigators crossed the Pacific using star paths memorised as the 'star compass' — a 32-point system of rising and setting stars. The Polynesian star compass enabled voyages of 4,000+ km without instruments. Hawaiian navigational chants encoded star courses for specific island destinations.",
    key_stars: ["Hokule'a (Arcturus — Hawaiian zenith star)", "Sirius", "Pleiades (Matariki / New Year)"],
    key_cycles: ["Matariki (Pleiades) heliacal rising — Polynesian New Year", "Star paths (kaveinga)"],
  },
  {
    name: "Aboriginal Australian Astronomy",
    region: "pacific",
    period_s: -65000, period_e: 1900,
    colour: "#c08040",
    note: "Aboriginal Australians possess one of the oldest continuous astronomical traditions on Earth. The Emu in the Sky — a constellation defined by dark nebulae rather than stars — aligns with the emergence of emus from their eggs when the 'emu' is in certain positions. Meteor Crater mythologies accurately describe impact events. The Yolŋu people tracked the tides through the interaction of the Moon and the Sun with remarkable accuracy.",
    key_stars: ["Pleiades (Seven Sisters — central to Dreamtime)", "Orion (Djulpan)"],
    key_cycles: ["Emu in the Sky seasonal cycle", "Pleiades rising (planting calendar)", "Lunar tidal cycles"],
  },
  {
    name: "Islamic Astronomy (Golden Age)",
    region: "asia",
    period_s: 750, period_e: 1400,
    colour: "#80c080",
    note: "Islamic astronomers preserved, translated, and substantially advanced Greek and Indian astronomy during Europe's Dark Ages. Al-Battani (858–929 CE) refined the length of the solar year and the precession rate. Al-Biruni calculated Earth's radius to within 1% of the modern value. Ibn al-Haytham developed the first correct model of vision. Many star names in modern use (Aldebaran, Betelgeuse, Rigel, Vega) are Arabic.",
    key_stars: ["Aldebaran (al-Dabarān)", "Betelgeuse (Yad al-Jauzāʾ)", "Vega (al-Nasr al-Wāqiʿ)"],
    key_cycles: ["Solar year refinement", "Precession corrections", "Zij astronomical tables"],
  },

];
