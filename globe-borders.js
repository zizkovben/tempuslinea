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
 
  // ─── Object construction ─────────────────────────────────────────────────
 
  function buildEntityObjects(entity) {
    const mat  = GlobeBordersGeom.makeMaterial(entity, STYLE);
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
      _group.add(line);
      return line;
    });
 
    _objects[entity.id] = { meshes, entity };
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
      mesh.material.opacity = opacity;
      mesh.material.color.setHex(
        _highlighted === entity.id ? STYLE.highlight.color : style.color
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
      .map(e => ({ id: e.id, label: e.label, type: e.type }));
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
    _rotationSyncRunning = false;
  }
 
  return { init, updateYear, setVisible, setOpacity, setGlacialMode, highlightCiv, clearHighlight, getEntityAtYear, dispose };
})();
 
window.GlobeBorders = GlobeBorders;
 
