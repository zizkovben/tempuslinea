# CHRONOS — The Definitive Interactive Archive of Human Civilizations

> *"The goal: the definitive interactive archive of all human civilizations — past, present, and ancient. Mainstream and fringe treated equally. The community is the arbiter."*

---

## What Is CHRONOS?

CHRONOS is a multi-phase interactive web application spanning the full breadth of human civilization — from confirmed archaeology to the most contested alternative theories. It is built around three interconnected experiences sharing one data layer:

| Phase | Name | Status |
|-------|------|--------|
| **1** | The Timeline Engine | ✅ Complete |
| **2** | The Living Atlas (3D Globe) | 🔄 In Progress — Phase 2a complete, 2b next |
| **3** | The Community Knowledge Platform | 🔲 Planned |
| **4** | The Celestial Layer | 🔲 Planned |

---

## Quick Start

No build tools. No install. No dependencies to manage.

```bash
# Just open in a browser:
open index.html        # Timeline
open globe.html        # 3D Globe (Phase 2)
```

Requires a modern browser with WebGL support for the globe. The timeline works in any browser.

---

## File Structure

```
chronos/
│
├── ─── CORE DATA ───────────────────────────────────────────
│
├── data.js               ← ALL civilization records (90 civs), epochs, presets
│                            APPEND-ONLY — never modify existing records
├── data-extended.js      ← Filter metadata: language, religion, governance,
│                            population, tags, locationType (A/B/C)
│                            Merges into CIVS at runtime via mergeMeta()
│
├── ─── PHASE 1: TIMELINE ───────────────────────────────────
│
├── index.html            ← Timeline app shell
├── styles.css            ← ALL design tokens. Shared across all pages.
├── timeline.js           ← Canvas engine: zoom, pan, render, hit-test
│                            Exposes: TimelineEngine (global)
├── filters.js            ← Filter state, logic, UI panel, active chips
│                            Exposes: FilterEngine (global)
├── ui.js                 ← Toolbar, preset buttons, info panel, vote display
│                            Exposes: ChronosUI (global)
│
├── ─── PHASE 2: GLOBE ──────────────────────────────────────
│
├── globe.html            ← Globe app shell ✅ Phase 2a
├── globe.js              ← Three.js engine: Earth, atmosphere, stars, markers
│                            Exposes: GlobeEngine (global) ✅ Phase 2a
├── globe-data.js         ← 90 civ coordinates, 10 epoch snapshots
│                            Exposes: GLOBE_DATA (global) ✅ Phase 2a
├── globe-ui.js           ← Epoch scrubber, info panel, tooltip, controls
│                            Exposes: GlobeUI (global) ✅ Phase 2a
│
├── globe-terrain.js      ← Two-state Earth geometry + YD morph animation ⬅ 2b
│                            Exposes: GlobeTerrain (global)
├── globe-pins.js         ← User location pinning, heat maps, seed pins ⬅ 2c
│                            Exposes: GlobePins (global)
│
├── ─── PHASE 3: COMMUNITY (PLANNED) ───────────────────────
│
├── community.html        ← Debate threads per civilization
├── portal.html           ← Personal research portal
├── about.html            ← About / credits
│
└── CHRONOS_PROJECT_BIBLE.md   ← Full project specification (read this first)
```

---

## Script Load Order (Critical)

Dependencies are not modules — load order is enforced via `<script>` tags.

**Timeline (index.html):**
```
data.js → data-extended.js → timeline.js → filters.js → ui.js
```

**Globe (globe.html):**
```
three.min.js (CDN) → data.js → data-extended.js → globe-data.js → globe.js → globe-ui.js
```

**Globe Phase 2b (additions):**
```
... → globe-terrain.js → globe-pins.js → globe-ui.js
```

---

## Adding a Civilization

**Step 1 — `data.js`** (append to CIVS array, never edit existing):
```javascript
{
  id:   99,                         // unique integer — check existing IDs first
  n:    "Civilization Name",
  s:    -3000,                      // start year (negative = BCE)
  e:    -500,                       // end year
  r:    "Region Name",
  t:    "confirmed",                // confirmed | theorized | debated
  cont: "asia",                     // africa · americas · asia · europe · pacific · atlantic · global
  d:    "2–5 sentence description.",
  up:   500,                        // seed upvote count
  dn:   100,                        // seed downvote count
}
```

**Step 2 — `data-extended.js`** (append to CIV_META object):
```javascript
99: {
  lang: "isolate",                  // see FILTER_DEFS for all language keys
  rel:  "polytheist",               // see FILTER_DEFS for all religion keys
  gov:  "empire",                   // see FILTER_DEFS for all governance keys
  pop:  "large",                    // micro · small · medium · large · mega · unknown
  tags: ["keyword", "list"],
  locationType: "A",                // A = confirmed · B = debated · C = user-mapped
  locationTheories: [],             // populate for B and C types — see Bible §5
}
```

**Civilization status rules:**
- `confirmed` — archaeologically excavated, peer-reviewed, mainstream consensus
- `debated` — physical evidence exists but interpretation is contested
- `theorized` — no direct physical evidence; based on textual, astronomical, or alternative interpretation
- **All entries with start date before 10,800 BCE must be `debated` or `theorized`**

---

## Location Types (Phase 2b)

| Type | Meaning | Globe display |
|------|---------|---------------|
| `"A"` | Fixed, confirmed location | Single gold/teal/violet marker |
| `"B"` | Scholarly debate on location | Primary marker + uncertainty halo |
| `"C"` | No fixed location — community mapped | Heat map of user pins only |

Type C civilizations (Atlantis, Lemuria, Pre-Flood Culture, etc.) show a heat map of all user-submitted location theories, voted on for plausibility. This is intentional — the debate itself becomes the visualization.

---

## Design System

All colours and fonts live in `styles.css` as CSS variables. Never use raw hex values in JS except in Canvas/WebGL shader code.

```css
/* Status colours */
--gold:    #d4a017   /* confirmed */
--violet:  #6b21a8   /* theorized */
--teal:    #0c6a69   /* debated */

/* Typography */
--font-display: 'Cinzel', Georgia, serif      /* titles */
--font-mono:    'IBM Plex Mono', monospace    /* all UI */
```

---

## The Two-State Globe (Phase 2b)

The globe has two Earth states reflecting the physical reality of pre- and post-Younger Dryas geography:

- **Holocene Earth** — post-10,800 BCE — modern coastlines
- **Glacial Earth** — pre-10,800 BCE — sea level −120m, exposed Doggerland / Sunda Shelf / Persian Gulf / Bering land bridge, expanded ice sheets

Crossing the ~10,800 BCE boundary on the epoch scrubber triggers a **2–3 second animated morph transition** — coastlines shift, ice sheets appear, the Persian Gulf drains. This is a hard architectural rule: always a transition, never an instant toggle.

This matters because pre-Younger Dryas theorized civilizations (Atlantis, Lemuria, Pre-Flood Culture) must be displayed against the correct Earth — not anachronistically placed on modern coastlines.

---

## Technical Notes

- **No framework** — vanilla JS + Canvas API + Three.js (CDN r128)
- **No build step** — open `.html` directly in browser
- **~300 line limit per file** — split files before exceeding this
- **Three.js version** — r128 from cdnjs. Do not upgrade without testing. `THREE.OrbitControls` unavailable at r128.
- **WebGL required** for globe — timeline works without it
- **Touch supported** — pinch zoom on timeline, drag rotate on globe

---

## Data Sources (Tier 1)

| Source | URL |
|--------|-----|
| Wikipedia | en.wikipedia.org |
| Encyclopædia Britannica | britannica.com |
| National Geographic Education | education.nationalgeographic.org |
| Smithsonian Magazine | smithsonianmag.com |
| Oxford Academic | academic.oup.com |
| JSTOR | jstor.org |
| British Museum | britishmuseum.org |
| Khan Academy History | khanacademy.org |
| Perseus Digital Library | perseus.tufts.edu |
| Internet Archive | archive.org |
| HRAF / SCCS | hraf.yale.edu |
| Graham Hancock Official | grahamhancock.com |
| Matthew LaCroix | matthewlacroix.com |

---

## Project Bible

The full specification — including architecture decisions, data schemas, the two-state globe spec, Atlantis seed pins, LaCroix underground site data, the moderation system, CLIO AI assistant design, and the Phase roadmap — lives in:

```
CHRONOS_PROJECT_BIBLE.md
```

**Read the bible before writing any code.** Paste the opener from Bible §1 at the top of every new chat session.

---

*CHRONOS is a long-term open knowledge project.*
*Built with respect for both mainstream scholarship and the full spectrum of human inquiry.*
