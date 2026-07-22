// globe-borders-data.js
// CHRONOS Phase 6 — Dynamic Borders data store
// Append-only for new entities. Never modify existing records.
//
// SCHEMA:
//   id        — unique string key
//   label     — display name
//   parentCiv — id from data.js (or null)
//   type      — "confirmed" | "estimated" | "theorized"
//   dissolve  — 0.0–1.0 extra opacity reduction (1.0 = invisible)
//   snapshots — { year: [ [lat,lng], ... ] | [ [[lat,lng],...], ... ] }
//               value is ONE polygon array OR array of polygon arrays (multi-part)
//               years are the canonical snapshot years (see SNAPSHOT_YEARS)
//
// COORDINATE NOTE: all lat/lng in decimal degrees. Simplified polygons, max ~80 pts each.
// Borders before 3000 BCE default to type:"theorized", dissolve >= 0.6
// Multi-part entities (islands, exclaves) use array-of-arrays format.

const BORDER_SNAPSHOT_YEARS = [
  -10000, -8000, -6000, -4000, -3000,
  -2000, -1500, -1000, -500, -200,
  0, 500, 1000, 1500, 1700,
  1800, 1900, 1950, 2000, 2024
];

const BORDER_ENTITIES = [

  // ─── ANCIENT EGYPT ───────────────────────────────────────────────────────

  {
    id: "egypt-old-kingdom",
    label: "Egypt — Old Kingdom",
    parentCiv: 6,
    type: "confirmed",
    dissolve: 0.1,
    snapshots: {
      "-2700": [[24.1,31.9],[24.0,33.5],[26.5,33.8],[28.0,34.2],[30.5,32.5],[31.4,30.0],[30.8,28.5],[28.5,27.5],[26.0,28.5],[24.1,31.9]],
      "-2000": [[22.0,31.5],[22.0,33.5],[24.0,33.0],[26.0,33.5],[28.5,34.2],[30.5,32.5],[31.4,30.0],[31.0,28.0],[28.5,27.0],[25.0,28.0],[22.0,31.5]]
    }
  },

  {
    id: "egypt-new-kingdom",
    label: "Egypt — New Kingdom",
    parentCiv: 6,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "-1550": [[17.0,33.0],[17.0,36.5],[20.0,37.0],[24.0,33.5],[26.0,33.8],[28.5,34.5],[31.5,34.5],[33.5,35.5],[36.0,36.5],[36.5,34.0],[34.5,32.0],[32.0,30.5],[31.5,28.0],[28.5,26.5],[24.0,28.0],[20.0,30.0],[17.0,33.0]],
      "-1000": [[20.0,33.0],[20.0,35.0],[22.0,36.0],[26.0,34.0],[29.0,34.5],[31.5,34.5],[31.5,30.5],[31.0,28.0],[28.0,27.0],[24.0,28.5],[20.0,31.0],[20.0,33.0]]
    }
  },

  // ─── MESOPOTAMIA ─────────────────────────────────────────────────────────

  {
    id: "akkadian-empire",
    label: "Akkadian Empire",
    parentCiv: 8,
    type: "confirmed",
    dissolve: 0.1,
    snapshots: {
      "-2300": [[29.5,39.0],[30.0,44.0],[31.5,46.5],[32.5,48.0],[31.5,50.0],[30.0,49.5],[28.5,47.0],[26.0,43.5],[26.5,40.5],[28.0,38.0],[29.5,39.0]],
      "-2100": [[29.5,38.5],[30.5,43.5],[32.0,46.0],[33.0,47.5],[32.5,49.5],[30.0,49.0],[28.0,46.5],[26.0,43.0],[26.5,40.0],[28.5,37.5],[29.5,38.5]]
    }
  },

  {
    id: "babylonian-empire",
    label: "Babylonian Empire",
    parentCiv: 9,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "-1750": [[30.0,39.5],[30.5,43.5],[32.5,46.0],[33.5,47.5],[33.0,49.5],[31.0,49.0],[29.0,47.0],[27.0,44.0],[27.5,41.0],[29.0,39.0],[30.0,39.5]],
      "-600":  [[30.5,38.0],[31.0,42.0],[33.0,45.5],[35.0,38.0],[33.5,36.5],[31.5,36.5],[30.0,37.5],[30.5,38.0]]
    }
  },

  {
    id: "assyrian-empire",
    label: "Assyrian Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "-700": [[26.0,33.0],[27.5,34.0],[31.5,34.5],[36.5,36.5],[38.5,37.5],[37.5,44.5],[36.5,47.5],[33.5,49.0],[30.0,49.0],[28.5,46.0],[28.0,40.0],[27.0,36.5],[26.0,33.0]],
      "-600": [[28.0,35.0],[30.0,36.5],[34.0,37.0],[36.0,40.0],[35.0,44.0],[32.0,47.0],[30.0,48.0],[29.0,45.0],[28.5,40.0],[28.0,35.0]]
    }
  },

  // ─── PERSIA ───────────────────────────────────────────────────────────────

  {
    id: "achaemenid-empire",
    label: "Achaemenid Persian Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "-500": [[23.0,32.5],[24.0,34.5],[31.5,34.5],[38.0,37.0],[42.0,38.0],[43.0,42.0],[40.0,52.0],[38.0,58.0],[36.0,63.0],[32.0,69.0],[28.0,70.0],[24.0,67.0],[22.0,60.0],[21.5,55.0],[24.0,50.0],[23.5,45.0],[22.0,40.0],[22.5,35.0],[23.0,32.5]],
      "-400": [[24.0,33.0],[30.0,34.5],[37.0,37.0],[41.0,38.5],[43.0,42.0],[40.0,51.0],[37.0,57.0],[34.0,62.5],[30.0,68.5],[26.5,69.5],[22.5,60.0],[22.0,52.0],[24.0,47.0],[23.0,40.0],[23.5,35.5],[24.0,33.0]]
    }
  },

  // ─── GREECE / MACEDON ────────────────────────────────────────────────────

  {
    id: "macedonian-empire",
    label: "Empire of Alexander",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "-323": [[21.5,13.0],[36.5,13.0],[40.5,19.0],[41.5,29.0],[41.0,36.5],[38.5,41.5],[43.5,43.5],[43.0,53.0],[39.0,60.0],[35.5,65.0],[31.5,70.0],[27.5,70.5],[24.0,63.5],[22.0,57.0],[22.5,50.0],[24.0,45.0],[24.0,39.0],[22.0,34.5],[22.0,30.5],[23.0,26.0],[24.0,24.0],[24.0,20.0],[21.5,13.0]],
      "-280": [[37.5,20.5],[41.5,26.0],[41.0,36.5],[37.0,41.0],[40.5,47.0],[38.0,57.0],[34.0,63.0],[30.0,68.0],[26.0,67.5],[22.5,57.0],[23.5,48.0],[24.5,40.5],[26.5,36.5],[28.0,33.0],[30.0,32.5],[32.5,29.0],[36.0,23.5],[37.5,20.5]]
    }
  },

  // ─── ROMAN EMPIRE ────────────────────────────────────────────────────────

  {
    id: "roman-empire",
    label: "Roman Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "-200": [[37.0,13.5],[38.5,16.0],[40.5,18.0],[41.5,20.5],[41.5,24.0],[40.5,28.5],[37.5,36.0],[33.0,35.5],[30.5,32.0],[31.5,29.5],[32.0,23.5],[32.5,13.5],[36.0,9.5],[36.5,5.5],[37.0,13.5]],
      "100":  [[54.0,3.0],[54.5,8.0],[53.0,14.5],[51.0,18.0],[48.5,17.5],[47.0,18.5],[46.5,24.5],[44.5,29.0],[43.0,29.5],[42.5,34.0],[42.5,40.5],[41.0,42.0],[39.5,44.0],[37.5,42.0],[37.5,36.5],[35.5,36.5],[33.5,36.5],[31.5,35.0],[30.5,32.0],[31.5,25.0],[32.5,20.0],[33.0,13.0],[33.5,9.5],[32.5,2.5],[36.5,-2.5],[37.0,4.5],[38.5,9.5],[37.5,13.0],[38.5,16.0],[44.5,7.0],[47.5,7.0],[48.0,2.5],[51.5,-3.5],[54.0,3.0]],
      "400":  [[54.0,3.0],[53.0,12.0],[50.0,17.0],[47.0,18.5],[46.5,22.5],[44.0,28.5],[43.0,29.0],[42.5,34.0],[41.5,40.5],[40.5,42.5],[37.5,36.5],[35.5,36.5],[33.0,36.5],[31.5,35.0],[30.5,32.0],[31.5,25.5],[32.0,20.5],[33.0,13.0],[33.5,9.5],[32.5,2.5],[36.5,-2.5],[37.0,3.5],[38.5,9.5],[44.0,7.5],[47.5,7.5],[48.0,2.5],[51.5,-3.5],[54.0,3.0]]
    }
  },

  // ─── HAN DYNASTY ─────────────────────────────────────────────────────────

  {
    id: "han-dynasty",
    label: "Han Dynasty China",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "-200": [[21.5,100.0],[22.0,107.0],[24.0,111.0],[26.0,113.0],[30.0,115.0],[32.5,115.0],[35.0,115.0],[37.5,114.5],[40.0,118.5],[40.0,115.0],[42.5,112.0],[42.0,108.0],[40.0,105.0],[38.5,102.5],[36.0,100.5],[33.0,100.0],[29.0,99.0],[25.0,98.5],[21.5,100.0]],
      "0":    [[18.0,108.5],[21.0,109.0],[22.0,110.5],[24.0,113.5],[28.0,115.5],[32.0,116.0],[35.5,115.5],[38.5,115.0],[40.5,120.0],[42.0,120.5],[44.0,116.5],[44.0,112.5],[42.0,108.0],[40.5,105.0],[37.5,102.5],[35.0,100.0],[29.5,98.5],[26.0,98.0],[22.0,100.5],[20.0,103.0],[18.5,106.5],[18.0,108.5]]
    }
  },

  // ─── MAURYAN EMPIRE ──────────────────────────────────────────────────────

  {
    id: "mauryan-empire",
    label: "Mauryan Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "-250": [[7.5,77.0],[8.5,79.0],[10.5,80.0],[13.0,80.5],[16.0,82.0],[18.5,84.5],[20.0,87.0],[22.5,88.0],[22.5,91.5],[25.5,91.5],[27.0,88.5],[27.0,85.0],[28.5,81.0],[30.5,79.0],[33.0,75.5],[34.0,73.0],[33.5,70.0],[33.0,66.5],[31.0,64.5],[27.5,63.5],[24.5,62.0],[23.0,65.5],[22.5,69.0],[20.5,73.0],[18.5,74.5],[16.0,75.0],[14.0,75.5],[10.0,76.0],[8.0,77.0],[7.5,77.0]]
    }
  },

  // ─── MONGOL EMPIRE ───────────────────────────────────────────────────────

  {
    id: "mongol-empire",
    label: "Mongol Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "1279": [[35.0,35.0],[38.5,40.0],[43.0,44.0],[43.5,50.5],[43.0,57.5],[40.0,63.5],[38.5,67.5],[36.0,72.0],[34.0,77.5],[32.5,80.5],[31.0,88.5],[30.5,95.0],[32.5,100.0],[32.5,105.0],[30.5,110.0],[25.0,116.0],[22.5,113.5],[21.0,109.5],[18.0,107.0],[22.5,102.5],[24.0,98.5],[26.5,92.5],[28.5,86.0],[30.5,80.0],[34.0,77.5],[40.5,73.5],[43.0,68.0],[44.0,62.5],[45.0,55.5],[52.0,50.0],[55.5,46.0],[55.5,38.0],[52.0,32.5],[48.0,30.0],[43.5,32.5],[40.5,35.5],[35.0,35.0]],
      "1350": [[38.0,37.5],[42.0,43.0],[43.0,50.0],[42.0,57.0],[38.5,65.0],[36.0,72.0],[33.5,82.5],[31.5,91.0],[32.0,100.0],[32.0,105.0],[28.5,110.0],[24.0,114.5],[21.0,110.0],[22.5,102.5],[24.5,97.5],[28.0,91.0],[32.5,85.0],[42.5,72.0],[44.5,64.0],[45.5,56.0],[51.5,51.5],[55.0,46.5],[54.0,39.0],[50.5,33.5],[45.0,33.0],[40.5,35.0],[38.0,37.5]]
    }
  },

  // ─── OTTOMAN EMPIRE ──────────────────────────────────────────────────────

  {
    id: "ottoman-empire",
    label: "Ottoman Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "1566": [[37.5,13.0],[38.5,16.0],[41.5,19.5],[42.0,27.5],[47.5,29.0],[48.5,38.0],[43.5,43.5],[42.0,47.5],[40.0,50.5],[38.5,48.0],[36.5,43.5],[38.5,41.5],[39.5,38.5],[37.5,36.5],[36.5,36.5],[34.5,36.5],[33.5,35.5],[31.5,35.0],[30.5,32.0],[30.5,29.5],[29.0,27.0],[26.5,24.0],[24.5,24.5],[23.5,21.5],[23.0,13.5],[24.0,9.5],[29.5,9.5],[31.5,15.5],[33.0,23.0],[33.5,30.5],[33.0,34.0],[35.5,36.5],[37.0,20.5],[37.5,13.0]],
      "1800": [[42.5,22.5],[43.5,28.5],[48.0,30.0],[48.0,38.5],[43.5,43.5],[42.0,47.0],[40.0,50.0],[37.5,43.5],[38.5,41.0],[37.5,36.5],[35.5,36.5],[33.5,35.5],[31.5,35.5],[30.5,32.5],[30.5,29.5],[29.0,27.0],[26.5,24.0],[24.5,25.0],[23.5,22.0],[23.0,14.0],[25.0,10.0],[30.0,10.5],[32.0,17.5],[33.5,24.5],[34.0,32.0],[33.5,35.5],[36.5,36.5],[37.5,36.5],[37.5,20.5],[38.5,15.5],[41.5,19.5],[42.5,22.5]]
    }
  },

  // ─── BRITISH EMPIRE ──────────────────────────────────────────────────────

  {
    id: "british-empire-india",
    label: "British India",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "1857": [[7.5,77.0],[8.5,79.5],[11.0,80.0],[13.5,80.5],[17.0,82.5],[20.0,86.5],[22.0,88.5],[24.0,91.0],[26.5,92.0],[27.5,89.0],[28.0,85.0],[28.5,81.5],[30.5,79.5],[33.5,76.0],[34.5,73.5],[34.0,70.5],[33.0,67.0],[31.0,65.0],[27.5,63.5],[24.5,62.0],[23.0,65.0],[22.0,68.5],[20.5,72.5],[18.5,74.5],[15.5,74.5],[13.5,75.5],[10.5,76.5],[8.5,77.0],[7.5,77.0]],
      "1900": [[7.5,77.0],[8.5,79.5],[11.0,80.0],[14.0,80.5],[17.5,83.0],[20.5,87.0],[22.5,88.5],[24.5,91.5],[27.0,92.5],[28.0,97.5],[27.5,90.0],[28.5,85.5],[30.5,80.0],[34.0,76.5],[35.0,74.0],[34.5,71.0],[33.0,67.0],[31.5,65.5],[28.0,64.0],[24.5,62.0],[23.0,65.0],[22.0,69.0],[20.5,73.0],[18.5,74.5],[15.5,74.5],[13.5,75.5],[10.5,76.5],[8.5,77.0],[7.5,77.0]]
    }
  },

  // ─── BYZANTINE EMPIRE ────────────────────────────────────────────────────

  {
    id: "byzantine-empire",
    label: "Byzantine Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "500":  [[37.5,13.5],[38.5,16.0],[41.5,19.5],[42.0,24.0],[41.5,28.5],[40.0,30.0],[40.5,34.5],[40.0,36.5],[37.5,36.5],[36.5,36.5],[35.0,36.0],[33.5,35.5],[31.5,35.0],[30.5,32.0],[30.5,28.5],[29.0,26.0],[26.5,23.5],[24.5,23.5],[25.5,18.0],[37.5,13.5]],
      "1000": [[41.5,22.5],[42.0,27.5],[41.5,31.0],[40.5,34.5],[40.0,36.5],[38.5,40.5],[37.5,42.5],[37.5,36.5],[36.5,36.5],[35.0,35.5],[33.5,35.5],[31.5,35.0],[30.5,32.0],[30.5,28.5],[36.5,24.0],[39.0,23.0],[40.5,22.5],[41.5,22.5]],
      "1400": [[41.5,26.5],[41.0,28.5],[40.5,29.5],[41.5,28.0],[41.5,26.5]]
    }
  },

  // ─── CAROLINGIAN / FRANKISH ──────────────────────────────────────────────

  {
    id: "carolingian-empire",
    label: "Carolingian Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "800": [[43.5,-2.0],[47.5,-2.5],[51.5,-3.5],[54.0,3.5],[54.5,9.0],[53.5,14.5],[52.0,18.0],[50.0,17.5],[49.0,20.0],[48.0,17.0],[47.0,16.5],[47.5,14.0],[47.5,10.5],[48.0,8.5],[44.0,7.5],[43.5,7.0],[43.0,5.5],[44.0,3.0],[43.5,-2.0]],
      "900": [[44.0,-1.5],[48.5,-3.0],[52.0,-3.5],[54.0,3.0],[54.0,9.0],[53.0,14.0],[51.5,17.5],[49.5,17.0],[48.0,17.5],[47.0,16.5],[47.5,13.5],[47.5,11.0],[48.0,8.5],[44.0,7.5],[43.5,7.0],[44.0,3.0],[44.0,-1.5]]
    }
  },

  // ─── PRE-COLUMBIAN AMERICAS ──────────────────────────────────────────────

  {
    id: "aztec-empire",
    label: "Aztec Triple Alliance",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "1500": [[14.5,-92.5],[17.0,-95.0],[19.5,-97.0],[21.5,-98.0],[23.5,-99.5],[22.5,-104.5],[20.0,-105.0],[19.0,-104.0],[17.5,-101.5],[16.5,-99.5],[15.5,-97.0],[15.0,-94.5],[14.5,-92.5]]
    }
  },

  {
    id: "inca-empire",
    label: "Inca Empire (Tawantinsuyu)",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.0,
    snapshots: {
      "1500": [[-2.0,-78.5],[-0.5,-75.5],[0.5,-72.0],[0.0,-70.0],[-2.5,-67.5],[-7.0,-63.0],[-13.0,-60.0],[-18.0,-60.5],[-22.0,-65.0],[-26.0,-68.5],[-30.0,-70.5],[-33.5,-71.5],[-37.0,-73.0],[-37.5,-72.0],[-33.5,-70.5],[-29.0,-69.0],[-25.0,-67.0],[-21.5,-68.5],[-17.5,-69.5],[-14.5,-76.0],[-6.0,-80.0],[-2.0,-80.5],[-2.0,-78.5]]
    }
  },

  // ─── MALI EMPIRE ─────────────────────────────────────────────────────────
  // First entity outside the Old World / Old World-adjacent Americas —
  // closes the "no Africa beyond Egypt" gap flagged in Bible v31. Two
  // snapshots: peak extent under Mansa Musa (c.1350, the era of his famous
  // 1324 hajj through Cairo — one of the best-documented pre-colonial
  // Sub-Saharan African empires, via Ibn Battuta's firsthand account and
  // Arab/Portuguese trade records) and the contracted state c.1450, before
  // Songhai eclipsed it later that century. dissolve kept low (0.05, in
  // line with similarly well-documented entities like Byzantine/Han) since
  // its existence and rough extent are not seriously contested — only the
  // precise border, like every pre-modern empire here, is approximate.

  {
    id: "mali-empire",
    label: "Mali Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.05,
    snapshots: {
      "1350": [[16.5,-16.5],[20.0,-15.0],[23.0,-11.0],[23.5,-6.0],[21.0,-3.0],[17.5,-1.0],[16.3,0.0],[14.5,-1.5],[12.0,-4.0],[10.0,-8.0],[9.5,-11.0],[11.0,-13.5],[13.0,-16.0],[16.5,-16.5]],
      "1450": [[15.5,-16.5],[18.5,-14.5],[20.5,-11.5],[19.5,-8.0],[17.0,-6.0],[14.5,-6.5],[12.5,-8.5],[10.5,-11.0],[10.0,-13.5],[12.0,-16.0],[15.5,-16.5]]
    }
  },

  // ─── KHMER EMPIRE ────────────────────────────────────────────────────────
  // Closes the "no Southeast Asia" gap flagged in Bible v31 — first entity
  // in that region. Two snapshots: peak extent (c.1200, spanning the reigns
  // of temple-builders Suryavarman II and Jayavarman VII — Angkor Wat and
  // the Bayon respectively) and the contracted state (c.1400, after
  // Ayutthaya's rise in the west began pulling territory away).

  {
    id: "khmer-empire",
    label: "Khmer Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.1,
    snapshots: {
      "1200": [[19.5,101.0],[19.0,104.5],[17.0,106.0],[14.0,107.5],[11.5,107.0],[9.5,105.0],[10.0,102.5],[12.0,99.5],[15.0,98.0],[17.5,97.5],[19.5,99.0],[19.5,101.0]],
      "1400": [[15.0,102.0],[15.5,104.5],[14.0,106.0],[12.0,105.5],[10.5,104.0],[11.0,102.0],[13.0,101.0],[15.0,102.0]]
    }
  },

  // ─── KINGDOM OF AKSUM ────────────────────────────────────────────────────
  // Closes the Horn of Africa / East Africa gap — the second Sub-Saharan
  // African entity in the file (after Mali), and the first from antiquity
  // rather than the medieval period. Genuinely well-documented for an
  // ancient African power: Aksum minted its own coinage, left royal
  // inscriptions (King Ezana's in particular), and was named by the
  // 3rd-century Persian prophet Mani as one of the four great powers of the
  // world alongside Rome, Persia, and China — not a marginal or obscure
  // civilization, dissolve kept low accordingly. Two snapshots: peak core
  // extent under Ezana (c.350) and the contracted highland state (c.700)
  // after losing Red Sea trade dominance to the expanding Islamic
  // caliphates. (Aksum's brief conquest of parts of South Arabia under King
  // Kaleb, c.525, is not included here — kept to the stable African
  // mainland core rather than a short-lived overseas foothold.)

  {
    id: "aksumite-empire",
    label: "Kingdom of Aksum",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.1,
    snapshots: {
      "350": [[18.0,36.0],[18.0,39.5],[15.5,42.0],[12.5,43.5],[9.5,42.0],[8.0,39.0],[9.5,36.5],[13.0,35.0],[16.0,35.0],[18.0,36.0]],
      "700": [[16.5,37.0],[16.0,39.5],[13.5,40.5],[11.0,39.5],[10.0,37.5],[11.5,36.0],[14.5,35.5],[16.5,37.0]]
    }
  },

  // ─── MAYA CIVILIZATION ───────────────────────────────────────────────────
  // Fills the multi-century gap in Mesoamerica before Aztec (1500) — Maya
  // civilization was flourishing many centuries earlier. Marked
  // type:"confirmed" for consistency with how every other entity in this
  // file already handles fluctuating/approximate borders (Rome's borders
  // shifted constantly too, and it's still "confirmed" here) — BUT flagging
  // explicitly: unlike every other entity so far, Maya was never one
  // unified government. It was a network of rival city-states (Tikal,
  // Calakmul, Copán, and others) sharing one civilization, writing system,
  // and calendar, not one throne. This polygon traces the archaeological
  // extent of that shared civilization, not a single empire's border —
  // worth a second look/discussion if that distinction matters enough to
  // handle differently (e.g. multiple smaller city-state entities instead
  // of one). Two snapshots: Late Classic peak (c.750, the southern lowlands
  // at their most populous) and the Postclassic contraction (c.950, after
  // the Classic Maya collapse emptied the southern lowlands and activity
  // shifted north into Yucatán — Chichen Itza's rise).

  {
    id: "maya-civilization",
    label: "Maya Civilization",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.15,
    snapshots: {
      "750": [[21.5,-89.5],[20.0,-87.0],[17.5,-88.0],[15.0,-89.0],[14.5,-91.5],[15.5,-92.5],[17.5,-93.0],[19.0,-91.0],[20.5,-90.0],[21.5,-89.5]],
      "950": [[21.5,-89.5],[20.5,-87.5],[19.0,-87.5],[18.0,-88.5],[18.5,-90.0],[20.0,-90.5],[21.5,-89.5]]
    }
  },

  // ─── SONGHAI EMPIRE ──────────────────────────────────────────────────────
  // Mali's direct successor as the dominant West African power — a natural
  // narrative continuation of last round's Mali entity. Peak under Askia
  // Muhammad (r.1493-1528), who expanded past Mali's own historical extent;
  // well documented via the Arabic Tarikh al-Sudan chronicle written in
  // Timbuktu itself. Two snapshots: peak (c.1500) and the shattered
  // post-collapse state (c.1600) after the 1591 Moroccan invasion broke the
  // empire's cohesion.

  {
    id: "songhai-empire",
    label: "Songhai Empire",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.1,
    snapshots: {
      "1500": [[16.5,-16.0],[20.0,-13.0],[23.5,-6.0],[22.0,-1.0],[19.0,3.0],[16.0,4.5],[13.5,3.0],[11.0,1.0],[10.0,-2.0],[9.5,-6.0],[10.5,-10.0],[13.0,-13.5],[16.5,-16.0]],
      "1600": [[15.0,-8.0],[16.5,-5.0],[17.5,-2.0],[16.0,0.5],[14.0,-0.5],[12.5,-2.5],[12.0,-5.0],[13.0,-7.5],[15.0,-8.0]]
    }
  },

  // ─── KINGDOM OF KUSH (NUBIA) ─────────────────────────────────────────────
  // One of Africa's oldest civilizations, immediately south of Egypt along
  // the Nile — genuinely notable rather than a footnote: Kushite pharaohs of
  // the 25th Dynasty ruled Egypt itself (the "Black Pharaohs," c.760-656
  // BCE), and Kush developed its own Meroitic script. First snapshot
  // (-700) captures that 25th Dynasty peak, when Kush controlled the Nile
  // all the way to the Delta — no existing Egypt entity covers this exact
  // period (the file's two Egypt entities stop at -1000 and don't resume),
  // so this isn't overlapping/duplicating anything already on the globe.
  // Second snapshot (-200) shows the later Meroitic-period kingdom, after
  // Kush lost the north and contracted to its southern Nubian heartland.

  {
    id: "kingdom-of-kush",
    label: "Kingdom of Kush (Nubia)",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.1,
    snapshots: {
      "-700": [[31.5,30.0],[31.0,32.5],[27.5,31.0],[24.0,32.5],[22.0,31.0],[19.5,30.0],[16.5,32.5],[13.5,33.5],[11.0,32.0],[10.5,29.0],[14.0,27.0],[18.0,25.5],[22.0,29.0],[26.0,31.0],[29.0,30.5],[31.5,30.0]],
      "-200": [[22.0,31.0],[22.0,33.5],[19.5,34.0],[16.0,34.5],[13.0,34.0],[10.5,32.5],[10.0,29.5],[12.5,27.5],[16.0,26.5],[19.5,28.0],[22.0,31.0]]
    }
  },

  // ─── KINGDOM OF ZIMBABWE (GREAT ZIMBABWE) ────────────────────────────────
  // Closes the Southern Africa gap — the third African entity in the file,
  // and geographically distinct from Mali/Songhai (west) and Aksum/Kush
  // (northeast). Controlled the gold trade with Indian Ocean Swahili coast
  // city-states (Kilwa, Sofala) via the famous stone-walled capital whose
  // ruins still stand. dissolve set slightly higher than the other African
  // entities (0.15 vs 0.1) — Great Zimbabwe is extremely well evidenced
  // archaeologically (the ruins are the primary source) but has much
  // thinner contemporary written documentation than Aksum or Kush, so its
  // exact political extent is comparatively less certain, not just its
  // border precision.

  {
    id: "great-zimbabwe",
    label: "Kingdom of Zimbabwe (Great Zimbabwe)",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.15,
    snapshots: {
      "1300": [[-15.5,29.0],[-15.0,32.5],[-17.0,34.5],[-19.5,34.0],[-22.0,32.0],[-22.5,29.5],[-20.5,27.5],[-17.5,27.5],[-15.5,29.0]],
      "1450": [[-16.5,29.5],[-16.0,32.0],[-17.5,33.5],[-19.5,33.0],[-21.0,31.0],[-20.5,29.0],[-18.0,28.0],[-16.5,29.5]]
    }
  },

  // ─── SILLA (UNIFIED KOREA) ───────────────────────────────────────────────
  // Closes the Korea / Northeast Asia gap — distinct from Han Dynasty China
  // already in the file. Silla unified the Korean peninsula in 668 CE after
  // defeating its rival kingdoms Baekje and Goguryeo (with Tang Chinese
  // assistance, later expelling Tang forces too). Two snapshots: peak
  // territorial control (c.700, shortly after unification) and the late
  // period (c.900, just before Silla fragmented into the Later Three
  // Kingdoms period). Northern Korea/Manchuria under the successor state
  // Balhae is not included — kept to Silla's own actual controlled extent.

  {
    id: "silla-kingdom",
    label: "Silla (Unified Korea)",
    parentCiv: null,
    type: "confirmed",
    dissolve: 0.1,
    snapshots: {
      "700": [[34.0,126.3],[34.5,127.5],[35.5,129.3],[37.0,129.2],[38.0,128.5],[39.0,127.5],[39.3,125.8],[38.0,125.0],[36.5,126.0],[35.0,126.0],[34.0,126.3]],
      "900": [[34.5,126.5],[35.0,127.5],[36.0,129.0],[37.5,129.0],[38.5,128.0],[38.5,126.0],[37.0,125.5],[35.5,126.0],[34.5,126.5]]
    }
  },

  // ─── THEORIZED / TYPE-C ZONES ─────────────────────────────────────────────

  {
    id: "atlantis-plato-zone",
    label: "Atlantis — Plato's Atlantic zone",
    parentCiv: 3,
    type: "theorized",
    dissolve: 0.55,
    snapshots: {
      "-9600": [[28.0,-30.0],[32.0,-26.0],[36.0,-22.0],[40.0,-18.0],[42.0,-22.0],[40.0,-28.0],[36.0,-32.0],[30.0,-34.0],[28.0,-30.0]]
    }
  },

  {
    id: "younger-dryas-culture-zone",
    label: "Younger Dryas cultural zone (theorized)",
    parentCiv: 2,
    type: "theorized",
    dissolve: 0.65,
    snapshots: {
      "-10800": [[60.0,-100.0],[60.0,-30.0],[50.0,-10.0],[40.0,10.0],[35.0,35.0],[35.0,50.0],[30.0,60.0],[20.0,65.0],[15.0,45.0],[5.0,38.0],[0.0,10.0],[5.0,-15.0],[10.0,-30.0],[15.0,-60.0],[20.0,-85.0],[30.0,-100.0],[45.0,-110.0],[60.0,-100.0]],
      "-9600": [[55.0,-90.0],[55.0,-30.0],[45.0,-10.0],[35.0,5.0],[32.0,35.0],[30.0,55.0],[20.0,60.0],[10.0,40.0],[0.0,5.0],[5.0,-20.0],[10.0,-45.0],[20.0,-80.0],[35.0,-100.0],[55.0,-90.0]]
    }
  },

  {
    id: "lemuria-mu-zone",
    label: "Lemuria / Mu — theorized",
    parentCiv: 1,
    type: "theorized",
    dissolve: 0.70,
    snapshots: {
      "-10000": [[-5.0,55.0],[5.0,65.0],[0.0,80.0],[-5.0,90.0],[-10.0,100.0],[-15.0,105.0],[-20.0,100.0],[-25.0,90.0],[-20.0,80.0],[-15.0,70.0],[-10.0,60.0],[-5.0,55.0]]
    }
  }

];

// Expose globals
window.BORDER_SNAPSHOT_YEARS = BORDER_SNAPSHOT_YEARS;
window.BORDER_ENTITIES = BORDER_ENTITIES;
