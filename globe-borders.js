// globe-borders.js
// CHRONOS Phase 6 — Dynamic Borders renderer and public API
// Depends on: three.min.js, globe-borders-data.js, globe-borders-geom.js
// Exposes: window.GlobeBorders

const GlobeBorders = (() => {
  // ─── State ───────────────────────────────────────────────────────────────
  let _scene       = null;
  let _radius      = 1.0;
  let _visible     = true;
  let _opacity     = 1.0;
  let _glacial     = false;
  let _currentYear = 2024;
  let _highlighted = null;

  // All border lines live under this group instead of directly under
  // _scene. Previously they were added straight to _scene and never
  // received any rotation update, so they stayed fixed in place while
  // the terrain/ice/markers spun underneath them (auto-rotate, manual
  // drag, epoch changes — all of it). This group's rotation is kept in
  // sync with the globe every frame — see _startRotationSync().
  let _group = null;
  let _rotationSyncRunning = false;

  // entityId → { meshes: [THREE.Line], entity }
  const _objects = {};

  // ─── Visual style config ─────────────────────────────────────────────────
  const STYLE = {
    confirmed: { color: 0x1a9a99, baseOpacity: 0.80 },
    estimated: { color: 0x9a6e08, baseOpacity: 0.45 },
    theorized: { color: 0x8b41c8, baseOpacity: 0.28 },
    highlight: { color: 0xd4a017 }
  };

  const ANCIENT_THRESHOLD = -500;
  const ANCIENT_DIM       = 0.65;
  const SURFACE_OFFSET    = 1.003;

  // ─── Per-entity color ────────────────────────────────────────────────────
  // Previously every "confirmed" entity shared the exact same teal, so two
  // or three empires visible at once (e.g. Rome + Han + Maurya at 100 CE)
  // were indistinguishable blobs. This gives each entity a stable, distinct
  // hue derived from its id — deterministic so it doesn't shift between
  // reloads, and automatic so new entities added later don't need a color
  // hand-picked for them.
  function _entityColor(entity) {
    let hash = 0;
    for (let i = 0; i < entity.id.length; i++) {
      hash = (hash * 31 + entity.id.charCodeAt(i)) >>> 0;
    }
    const hue   = hash % 360;
    const sat   = 62;
    const light = entity.type === 'theorized' ? 60 : (entity.type === 'estimated' ? 52 : 50);
    return new THREE.Color(`hsl(${hue}, ${sat}%, ${light}%)`);
  }

  // ─── Object construction ─────────────────────────────────────────────────

  function buildEntityObjects(entity) {
    const color = _entityColor(entity);
    const mat   = GlobeBordersGeom.makeMaterial(entity, STYLE, color);
    const years = GlobeBordersGeom.getSnapshotYears(entity);
    if (!years.length) return;

    const firstPoly = entity.snapshots[years[0]];
    const multi     = GlobeBordersGeom.isMultiPart(firstPoly);
    const parts     = multi ? firstPoly : [firstPoly];

    const meshes = parts.map(poly => {
      const pts  = GlobeBordersGeom.polygonToPoints(poly, _radius * SURFACE_OFFSET);
      const geo  = GlobeBordersGeom.buildLineGeometry(pts);
      const line = new THREE.Line(geo, mat.clone());
      line.renderOrder = 1;
      if (line.material.isLineDashedMaterial) line.computeLineDistances();
      line.userData.entityId = entity.id;
      _group.add(line);
      return line;
    });

    _objects[entity.id] = { meshes, entity, color };
  }

  // ─── Per-entity geometry update ───────────────────────────────────────────

  function updateEntityGeometry(entityId, year) {
    const obj = _objects[entityId];
    if (!obj) return;

    const { entity } = obj;
    const blend = GlobeBordersGeom.resolveBlend(entity, year);

    if (!blend.entityActive) {
      obj.meshes.forEach(m => { m.visible = false; });
      return;
    }

    const style   = STYLE[entity.type] || STYLE.confirmed;
    const ancient = year < ANCIENT_THRESHOLD && entity.type === 'confirmed';
    const dimMul  = ancient ? ANCIENT_DIM : 1.0;
    const opacity = style.baseOpacity * (1 - entity.dissolve) * dimMul * (blend.fadeIn || 1) * _opacity;

    const multi  = GlobeBordersGeom.isMultiPart(blend.polyA);
    const partsA = multi ? blend.polyA : [blend.polyA];
    const partsB = multi ? blend.polyB : [blend.polyB];

    obj.meshes.forEach((mesh, pi) => {
      if (pi >= partsA.length) { mesh.visible = false; return; }
      const lerped = GlobeBordersGeom.lerpPolygons(partsA[pi], partsB[pi], blend.t);
      GlobeBordersGeom.updateLineGeometry(mesh, lerped, _radius * SURFACE_OFFSET);
      if (mesh.material.isLineDashedMaterial) mesh.computeLineDistances();
      mesh.material.opacity = opacity;
      mesh.material.color.set(
        _highlighted === entity.id ? STYLE.highlight.color : obj.color
      );
      mesh.visible = _visible && opacity > 0.01;
    });
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  function init(scene, globeRadius) {
    _scene  = scene;
    _radius = globeRadius;
    _group  = new THREE.Group();
    _group.name = 'borderGroup';
    _scene.add(_group);
    BORDER_ENTITIES.forEach(entity => {
      try { buildEntityObjects(entity); }
      catch (e) { console.warn('GlobeBorders: failed to build', entity.id, e); }
    });
    updateYear(_currentYear);
    _startRotationSync();
    _startHoverPicking();
    console.log('GlobeBorders: initialised —', BORDER_ENTITIES.length, 'entities');
  }

  // Self-contained: doesn't require globe.js to call anything new.
  // Polls GlobeTerrain's last-applied rotation (exposed via
  // getRotation(), added alongside this fix) once per frame and
  // mirrors it onto _group. Falls back gracefully — if GlobeTerrain
  // isn't present for some reason, borders simply stay at their
  // built orientation instead of throwing.
  function _startRotationSync() {
    if (_rotationSyncRunning) return;
    _rotationSyncRunning = true;
    function loop() {
      if (!_rotationSyncRunning) return;
      if (_group && window.GlobeTerrain && typeof GlobeTerrain.getRotation === 'function') {
        const r = GlobeTerrain.getRotation();
        _group.rotation.y = r.y;
        _group.rotation.x = r.x;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // ─── Hover tooltip + click-to-select on the border lines themselves ──────
  // Self-contained, like the rotation sync above — doesn't require globe.js
  // to wire anything new in. Needs a camera reference, which isn't
  // currently exposed the way _scene/_radius are; this looks for common
  // patterns and degrades gracefully (no tooltip, but nothing breaks) if
  // it can't find one. See console for a warning if that happens.
  let _camera  = null;
  let _canvas  = null;
  let _raycaster = null;
  let _tooltipEl = null;

  function _findCamera() {
    return (window.GlobeEngine && (
      window.GlobeEngine._camera ||
      (typeof window.GlobeEngine.getCamera === 'function' && window.GlobeEngine.getCamera())
    )) || window._chronosCamera || null;
  }

  function _findCanvas() {
    const host = document.getElementById('globe-container');
    return (host && host.querySelector('canvas')) || document.querySelector('canvas');
  }

  function _ensureTooltip() {
    if (_tooltipEl) return _tooltipEl;
    const el = document.createElement('div');
    el.id = 'gb-hover-tooltip';
    el.style.cssText =
      'position:fixed;pointer-events:none;z-index:9999;padding:4px 10px;font-size:12px;' +
      'font-family:inherit;color:#eef4f4;background:rgba(10,18,24,0.92);' +
      'border:1px solid rgba(120,200,200,0.4);border-radius:4px;opacity:0;' +
      'transition:opacity 0.12s ease;white-space:nowrap;letter-spacing:0.02em;';
    document.body.appendChild(el);
    _tooltipEl = el;
    return el;
  }

  function _pickBorderAt(clientX, clientY) {
    const rect = _canvas.getBoundingClientRect();
    const ndc  = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    _raycaster.setFromCamera(ndc, _camera);
    const hits = _raycaster.intersectObjects(_group.children, false);
    return hits.find(h => h.object.visible && h.object.material.opacity > 0.05) || null;
  }

  function _startHoverPicking() {
    _camera = _findCamera();
    _canvas = _findCanvas();
    if (!_camera || !_canvas) {
      console.warn('GlobeBorders: hover tooltips disabled — no camera reference found ' +
        '(expected window.GlobeEngine._camera or window._chronosCamera). Borders still ' +
        'render and rotate correctly; only the hover/click label is unavailable.');
      return;
    }
    _raycaster = new THREE.Raycaster();
    _raycaster.params.Line = { threshold: _radius * 0.015 };
    const tooltip = _ensureTooltip();

    _canvas.addEventListener('mousemove', e => {
      if (!_visible || !_group) { tooltip.style.opacity = 0; return; }
      const hit = _pickBorderAt(e.clientX, e.clientY);
      if (hit) {
        const obj = _objects[hit.object.userData.entityId];
        tooltip.textContent   = obj ? obj.entity.label : '';
        tooltip.style.left    = (e.clientX + 14) + 'px';
        tooltip.style.top     = (e.clientY - 10) + 'px';
        tooltip.style.opacity = 1;
        _canvas.style.cursor  = 'pointer';
      } else {
        tooltip.style.opacity = 0;
        _canvas.style.cursor  = '';
      }
    });
    _canvas.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
      _canvas.style.cursor  = '';
    });
    _canvas.addEventListener('click', e => {
      if (!_visible || !_group) return;
      const hit = _pickBorderAt(e.clientX, e.clientY);
      if (hit) {
        _highlighted = hit.object.userData.entityId;
        updateYear(_currentYear);
      }
    });

    console.log('GlobeBorders: hover tooltips + click-to-select enabled');
  }

  function updateYear(year) {
    _currentYear = year;
    Object.keys(_objects).forEach(id => updateEntityGeometry(id, year));
  }

  function setVisible(bool) {
    _visible = bool;
    Object.values(_objects).forEach(obj =>
      obj.meshes.forEach(m => { m.visible = bool && m.material.opacity > 0.01; })
    );
  }

  function setOpacity(val) {
    _opacity = Math.max(0, Math.min(1, val));
    updateYear(_currentYear);
  }

  function setGlacialMode(bool) {
    _glacial = bool;
    BORDER_ENTITIES.forEach(entity => {
      const obj   = _objects[entity.id];
      if (!obj) return;
      const years = GlobeBordersGeom.getSnapshotYears(entity);
      if (bool && years.length && years[0] > -9600) {
        obj.meshes.forEach(m => { m.visible = false; });
      } else {
        updateEntityGeometry(entity.id, _currentYear);
      }
    });
  }

  function highlightCiv(civId) {
    _highlighted = null;
    BORDER_ENTITIES.forEach(e => { if (e.parentCiv === civId) _highlighted = e.id; });
    updateYear(_currentYear);
  }

  function clearHighlight() {
    _highlighted = null;
    updateYear(_currentYear);
  }

  function getEntityAtYear(year) {
    return BORDER_ENTITIES
      .filter(e => GlobeBordersGeom.resolveBlend(e, year).entityActive)
      .map(e => {
        const obj = _objects[e.id];
        const hex = obj ? '#' + obj.color.getHexString() : '#445566';
        return { id: e.id, label: e.label, type: e.type, color: hex };
      });
  }

  function dispose() {
    Object.values(_objects).forEach(obj => {
      obj.meshes.forEach(m => {
        m.geometry.dispose();
        m.material.dispose();
        if (_group) _group.remove(m);
      });
    });
    Object.keys(_objects).forEach(k => delete _objects[k]);
    if (_group && _scene) {
      _scene.remove(_group);
      _group = null;
    }
    if (_tooltipEl) {
      _tooltipEl.remove();
      _tooltipEl = null;
    }
    _rotationSyncRunning = false;
  }

  return { init, updateYear, setVisible, setOpacity, setGlacialMode, highlightCiv, clearHighlight, getEntityAtYear, dispose };
})();

window.GlobeBorders = GlobeBorders;
