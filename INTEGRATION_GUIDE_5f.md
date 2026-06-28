# CHRONOS — Phase 5a + 5f Integration Guide
## Civilizations 89–150 — Patch Application Instructions
**Bible v3 · June 2026**

---

## WHAT'S IN THESE PATCHES

| File | Contents | Applies to |
|------|----------|-----------|
| `data-patch-5a.js` | Civ records ids 89–120 | `data.js` CIVS array |
| `data-patch-5f.js` | Civ records ids 121–150 | `data.js` CIVS array |
| `data-extended-patch-5a.js` | CIV_META entries 89–120 | `data-extended.js` CIV_META object |
| `data-extended-patch-5f.js` | CIV_META entries 121–150 | `data-extended.js` CIV_META object |
| `globe-data-patch-5f.js` | CIV_COORDS entries 116–150 | `globe-data.js` CIV_COORDS object |

---

## STEP 1 — data.js

Open `data.js`. Find the very end of the CIVS array — it ends with:

```javascript
  { id:88, n:"Epi-Olmec / Isthmian Script", ...  up:2891, dn:1203 },
];
```

**Delete the stray extra `];`** at the very bottom if present (there are two `];` at the end — keep only one).

Insert the contents of `data-patch-5a.js` AND `data-patch-5f.js` (in order, 5a first) immediately **before** the closing `];`.

Result should be:
```javascript
  // ... id:88 entry ...
  { id:88, ... },

  // ── NEAR EAST / LEVANT ─── (from data-patch-5a.js)
  { id:89, ... },
  ...
  { id:120, ... },

  // ── ANCIENT NEAR EAST ─── (from data-patch-5f.js)
  { id:121, ... },
  ...
  { id:150, ... },
];  // ← single closing bracket
```

---

## STEP 2 — data-extended.js

Open `data-extended.js`. Find the end of the `CIV_META` object — it ends with:

```javascript
  33: { lang:'unknown', rel:'theorized', ...  },
};
```

Insert the contents of `data-extended-patch-5a.js` AND `data-extended-patch-5f.js` (in order, 5a first) immediately **before** the closing `};`.

Result should be:
```javascript
  33: { ... },

  // ── ids 89–90 · Levant ─── (from data-extended-patch-5a.js)
  89: { ... },
  ...
  120: { ... },

  // ── ids 121–123 · Near East / South Asia ─── (from data-extended-patch-5f.js)
  121: { ... },
  ...
  150: { ... },
};  // ← single closing bracket
```

---

## STEP 3 — globe-data.js

Open `globe-data.js`. Find the end of the `CIV_COORDS` object — the last entry is `115: { lat: 27.2, lng: 78.0 }`.

Insert the contents of `globe-data-patch-5f.js` immediately **after** the `115:` entry, before the closing `};`.

Result should be:
```javascript
    115: { lat: 27.2,  lng:  78.0 },   // Mughal / Agra

    // ── ids 116–120 · Theorized (Phase 5a)
    116: { lat: 21.12, lng: -11.40 },
    ...
    150: { lat: 32.60, lng: -91.40 },
  };
```

---

## STEP 4 — Verify in browser

1. Open `index.html` — confirm civ count shows 150
2. Open `globe.html` — confirm no JS errors in console
3. Search for "Derinkuyu" — should appear (id:121)
4. Search for "Göbekli Tepe Phase I" — should appear (id:138)
5. Search for "Mughal" — should appear (id:115, existing)
6. Filter by "theorized" — should include ids 116–120 + 136–140

---

## CIVILIZATION SUMMARY — IDS 89–150

### Phase 5a (89–120) — fills gaps in existing 88

| Range | Region focus |
|-------|-------------|
| 89–90 | Levant — Israel/Judah, Aramaic |
| 91–93 | Pacific — Hawaii, Tonga, Nan Madol |
| 94–97 | Central Asia — Kushan, Sogdian, Khazar, Timurid |
| 98 | Aegean — Cycladic |
| 99–101 | Medieval Europe — Carolingian, Venice, Kievan Rus |
| 102–105 | Mesoamerica/N. America — Zapotec, Toltec, Taíno, Mississippian |
| 106–109 | Africa — Kongo, Ethiopia, Dahomey, Nubian Christian |
| 110–115 | South/SE Asia — Vijayanagara, Bagan, Goryeo, Chola, Safavid, Mughal |
| 116–120 | Theorized — Richat, Antarctica, YD Impact, Pre-Flood Andean, Anunnaki |

### Phase 5f (121–150) — new batch

| Range | Region focus |
|-------|-------------|
| 121–123 | Near East — Derinkuyu, Çayönü, Rakhigarhi |
| 124–126 | Southeast/East Asia — Dvaravati, Majapahit, Silla |
| 127–129 | Americas — Chimú, Wari, Puma Punku Phase II |
| 130–133 | Africa — Kerma, Dogon, Pre-Dynastic Egypt, Luba |
| 134–135 | Pacific / Central Asia — Rongorongo, Tocharian |
| 136–140 | Theorized — King List, YD Survivors, Göbekli Phase I, Vedic Astronomy, Global Maritime |
| 141–143 | Pacific — Dilmun, Hawaiian Kahuna, Lapita Transition |
| 144–147 | Americas/Asia — Chavin, Khmer Extended, Mali, Sassanid |
| 148–150 | Mixed — Indus Script, Garamantian, Poverty Point–Adena |

---

## NEXT PHASE CHECKLIST

After integrating these patches, update the Bible:

- [ ] Next civ id: **151**
- [ ] Phase 5f: ✅ Complete (civs 121–150 added)
- [ ] Phase 5g: Community seed threads → `community.html`
- [ ] Phase 5h: CLIO system prompt expansion → `clio.js`
- [ ] Update Bible v3 status table for Phase 5f

---

*Generated: June 2026 · Bible v3 · Phase 5f*
