# CHRONOS — Phase 3b Application Guide
## Portal.html Expansion

---

### Files in this delivery

| File | Action |
|------|--------|
| `portal.html` | Replace existing shell entirely |
| `portal.js` | New file — portal core (state, storage, navigation, profile, overview) |
| `portal-panels.js` | New file — panel renderers (collections, saved, notes, queue, bookmarks) |

---

### Script load order for portal.html (already set in file)

```
data.js → data-extended.js → portal.js → portal-panels.js →
clio-prompt.js → clio-ui.js → clio.js
```

---

### What was built

**7 fully functional panels:**

| Panel | What it does |
|-------|-------------|
| Overview | Activity feed, stats (saved/notes/collections/drafts) |
| My Profile | Name, username, bio, qualifications, works, link. Verification tier display. |
| Collections | Named research sets. Create, search, view. Civ count + preview tags. |
| Saved Civs | All bookmarked civs. Filter by confirmed/debated/theorized. Search. Remove. |
| Notes | Full note editor — title, linked civ/thread, body. Create, save, delete. |
| Draft Queue | Stage civ entries/theories/posts. Draft → Ready status. Delete. |
| Bookmarks | External links, thread saves. Remove. |

**Storage:** sessionStorage (prefixed `chronos_portal_`). Swap `_load`/`_save` in `portal.js` for API calls when Phase 3b backend lands.

**Public API** — callable from Timeline/Globe/Community:
```javascript
PortalEngine.saveFromTimeline(civId)   // save a civ by id from another page
PortalEngine.saveCiv(civObject)        // save a full civ object
PortalEngine.addBookmark(label, url, type)
PortalEngine.toast(msg)
PortalEngine.switchPanel(name)
```

---

### Bible updates required

Add to FILE INVENTORY:
```
├── portal.js         ← Portal core: state, storage, nav, profile, overview
├── portal-panels.js  ← Portal panel renderers: collections, saved, notes, queue, bookmarks
```

Add to Script Load Orders (Community/Portal/About section):
```
data.js → data-extended.js → portal.js → portal-panels.js →
clio-prompt.js → clio-ui.js → clio.js
```

Update Phase tracker:
| 3b prep | Portal.html expansion | ✅ Built | portal.html, portal.js, portal-panels.js |

---

### Next session checklist

- [ ] Apply Phase 5k patches to local data files (if not yet done)
- [ ] Apply Phase 5l community thread batch + CSS patch
- [ ] Drop in portal.html, portal.js, portal-panels.js
- [ ] Confirm Michael Button's primary works — update researcher entry
- [ ] **Next recommended task: Phase 6 — Dynamic Borders design session (bible only)**

---

*Phase 3b prep complete — Bible v4, June 2026*
