/* ============================================================
   CHRONOS · globe-pins.js  (Phase 2c)
   User location pinning system for Type B & C civilizations.
   Heat map renderer for competing location theories.
   Seed pins loaded from globe-pins-seeds.js (loads before this).
   Phase 8b: placing a user pin now triggers ShareEngine.triggerShare().
   Phase 9:  placing a user pin now calls NotificationsEngine.onPinPlaced()
             and auto-follows the pin for future nearby-pin notifications.
   Depends on: Three.js (r128), globe-data.js, data.js
   Exposes: GlobePins (global)
   ============================================================ */

const GlobePins = (() => {

  // ── STATE ─────────────────────────────────────────────────
  let _scene        = null;
  let _onPinSelect  = null;
  let _pinGroups    = {};      // civId → THREE.Group of pin meshes
  let _heatGroups   = {};      // civId → THREE.Group of heat map sprites
  let _activeCivId  = null;
  let _pinStore     = {};      // civId → [ pinObject, ... ]
  let _nextPinId    = 1000;    // auto-increment for user pins

  // ── CONSTANTS ─────────────────────────────────────────────
  const EARTH_R      = 1.0;
  const PIN_R        = 0.011;
  const HALO_R_BASE  = 0.04;   // uncertainty halo radius (Type B)

  // Pin colours by type
  const COL_RESEARCHER = 0xd4a017;   // gold — named researcher pins
  const COL_USER       = 0x3aabb0;   // teal — community pins
  const COL_HALO       = 0x6b21a8;   // violet — uncertainty halo (Type B)

  // ── INIT ──────────────────────────────────────────────────
  function init(scene, onPinSelect) {
    _scene       = scene;
    _onPinSelect = onPinSelect || null;

    // Load seed pins from globe-pins-seeds.js if available
    if (window.PIN_SEEDS) {
      Object.entries(window.PIN_SEEDS).forEach(([civId, pins]) => {
        const id = parseInt(civId, 10);
        _pinStore[id] = pins.map((p, i) => ({
          ...p,
          id:    _nextPinId++,
          civId: id,
        }));
      });
    }
  }

  // ── LOAD CIV PINS ─────────────────────────────────────────
  // Renders all pins for a given civilization.
  // Type C → heat map of all pins, no primary marker.
  // Type B → primary marker + uncertainty halo + pin list.
  function loadCivPins(civId) {
    clearPins();
    _activeCivId = civId;

    const civ = CIVS.find(c => c.id === civId);
    if (!civ) return;

    const meta = (window.CIV_META && window.CIV_META[civId]) || {};
    const locType = meta.locationType || 'A';
    const pins    = _pinStore[civId] || [];

    if (locType === 'C') {
      _renderHeatMap(civId, pins);
    } else if (locType === 'B') {
      _renderTypeB(civId, meta, pins);
    }
    // Type A has no pin UI — uses standard globe marker
  }

  // ── TYPE C: HEAT MAP ──────────────────────────────────────
  function _renderHeatMap(civId, pins) {
    if (!pins.length) return;
    const group = new THREE.Group();
    group.name  = `pins-${civId}`;

    pins.forEach(pin => {
      const pos = _latLngToVec3(pin.lat, pin.lng, EARTH_R + 0.001);

      // Core dot
      const dotGeo = new THREE.SphereGeometry(PIN_R, 8, 8);
      const col    = pin.isResearcherPin ? COL_RESEARCHER : COL_USER;
      const dotMat = new THREE.MeshBasicMaterial({ color: col });
      const dot    = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      dot.userData = { pin, type: 'pin-dot' };
      group.add(dot);

      // Glow ring around each pin
      const ringGeo = new THREE.RingGeometry(PIN_R * 1.6, PIN_R * 2.8, 20);
      const ringMat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.25, side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(ring);

      // Heat influence sphere (large, very transparent)
      // Higher-voted pins have larger influence radius
      const voteWeight = Math.max(1, pin.up - pin.dn);
      const heatR      = HALO_R_BASE * (0.5 + Math.min(voteWeight / 200, 1.5));
      const heatGeo    = new THREE.SphereGeometry(heatR, 16, 16);
      const heatMat    = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.04, side: THREE.BackSide
      });
      const heat = new THREE.Mesh(heatGeo, heatMat);
      heat.position.copy(pos);
      group.add(heat);
    });

    _scene.add(group);
    _heatGroups[civId] = group;
  }

  // ── TYPE B: PRIMARY MARKER + UNCERTAINTY HALO ─────────────
  function _renderTypeB(civId, meta, pins) {
    const group = new THREE.Group();
    group.name  = `pins-b-${civId}`;

    // Primary marker from locationTheories isDefault pin
    const defaultTheory = (meta.locationTheories || []).find(t => t.isDefault);
    if (defaultTheory) {
      const pos    = _latLngToVec3(defaultTheory.lat, defaultTheory.lng, EARTH_R + 0.001);
      const dotGeo = new THREE.SphereGeometry(PIN_R * 1.3, 10, 10);
      const dotMat = new THREE.MeshBasicMaterial({ color: COL_HALO });
      const dot    = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      dot.userData = { theory: defaultTheory, type: 'primary-marker' };
      group.add(dot);

      // Uncertainty halo — large translucent ring
      const haloGeo = new THREE.RingGeometry(HALO_R_BASE, HALO_R_BASE * 1.6, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: COL_HALO, transparent: true, opacity: 0.18, side: THREE.DoubleSide
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(halo);

      // Pulsing outer ring
      const pulseGeo = new THREE.RingGeometry(HALO_R_BASE * 1.7, HALO_R_BASE * 2.2, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: COL_HALO, transparent: true, opacity: 0.08, side: THREE.DoubleSide
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(pos);
      pulse.lookAt(new THREE.Vector3(0, 0, 0));
      pulse.userData.isPulse = true;
      group.add(pulse);
    }

    // All other locationTheories as smaller secondary markers
    (meta.locationTheories || [])
      .filter(t => !t.isDefault)
      .forEach(theory => {
        const pos    = _latLngToVec3(theory.lat, theory.lng, EARTH_R + 0.001);
        const dotGeo = new THREE.SphereGeometry(PIN_R * 0.8, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({
          color: COL_HALO, transparent: true, opacity: 0.6
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.copy(pos);
        dot.userData = { theory, type: 'secondary-marker' };
        group.add(dot);
      });

    // Overlay any community pins too
    if (pins.length) _renderHeatMap(civId, pins);

    _scene.add(group);
    _pinGroups[civId] = group;
  }

  // ── TICK (pulse animation) ────────────────────────────────
  function tick(t) {
    Object.values(_pinGroups).forEach(group => {
      group.children.forEach(child => {
        if (child.userData && child.userData.isPulse) {
          child.material.opacity = 0.04 + 0.06 * Math.sin(t * 1.8);
        }
      });
    });
    Object.values(_heatGroups).forEach(group => {
      group.children.forEach((child, i) => {
        if (child.geometry && child.geometry.type === 'RingGeometry') {
          child.material.opacity = 0.15 + 0.12 * Math.sin(t * 2 + i * 0.5);
        }
      });
    });
  }

  // ── SYNC ROTATION ─────────────────────────────────────────
  function syncRotation(rotY, rotX) {
    [...Object.values(_pinGroups), ...Object.values(_heatGroups)].forEach(g => {
      g.rotation.y = rotY;
      g.rotation.x = rotX;
    });
  }

  // ── ADD USER PIN ──────────────────────────────────────────
  // Phase 8b: fires ShareEngine.triggerShare() once the pin is stored,
  // so the user can immediately share "I've mapped my [Civ] theory to
  // [location] on Tempus Linea" — see Bible §Phase 8.
  function addUserPin(civId, lat, lng, theory, source) {
    const civ = CIVS.find(c => c.id === civId);

    const pin = {
      id:    _nextPinId++,
      civId,
      lat,
      lng,
      label:           `User Pin — ${(civ || {}).n || civId}`,
      theory:          theory  || '',
      source:          source  || '',
      researcher:      null,
      isResearcherPin: false,
      up: 0,
      dn: 0,
    };
    if (!_pinStore[civId]) _pinStore[civId] = [];
    _pinStore[civId].push(pin);

    // If this civ is currently active, refresh the display
    if (_activeCivId === civId) loadCivPins(civId);

    if (window.ShareEngine) {
      ShareEngine.triggerShare({
        type:    'pin',
        civId:   civId,
        civName: (civ || {}).n || String(civId),
        pinLat:  lat,
        pinLng:  lng,
      });
    }

    // Phase 9: auto-follow the pin and fire a nearby-pin check
    if (window.NotificationsEngine) {
      NotificationsEngine.onPinPlaced(pin.id, civId, (civ || {}).n || String(civId), lat, lng);
    }

    return pin;
  }

  // ── VOTE ON A PIN ─────────────────────────────────────────
  function votePin(pinId, direction) {
    Object.values(_pinStore).forEach(pins => {
      const pin = pins.find(p => p.id === pinId);
      if (!pin) return;
      if (direction === 'up') pin.up++;
      else pin.dn++;
    });
  }

  // ── CLEAR ALL PINS FROM SCENE ─────────────────────────────
  function clearPins() {
    [...Object.values(_pinGroups), ...Object.values(_heatGroups)].forEach(g => {
      _scene.remove(g);
    });
    _pinGroups  = {};
    _heatGroups = {};
    _activeCivId = null;
  }

  // ── GET PINS FOR CIV ──────────────────────────────────────
  function getPinsForCiv(civId) {
    return _pinStore[civId] || [];
  }

  // ── HIT TEST PINS ─────────────────────────────────────────
  // Called by globe.js raycaster on click — returns pin or null
  function hitTest(raycaster) {
    const allMeshes = [];
    [...Object.values(_pinGroups), ...Object.values(_heatGroups)].forEach(g => {
      g.children.forEach(c => {
        if (c.userData && (c.userData.pin || c.userData.theory)) allMeshes.push(c);
      });
    });
    const hits = raycaster.intersectObjects(allMeshes);
    if (!hits.length) return null;
    const hit = hits[0].object;
    return hit.userData.pin || hit.userData.theory || null;
  }

  // ── COORDINATE HELPER ─────────────────────────────────────
  function _latLngToVec3(lat, lng, r) {
    const phi   = (90 - lat)  * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // ── PUBLIC API ────────────────────────────────────────────
  return {
    init,
    loadCivPins,
    addUserPin,
    clearPins,
    votePin,
    getPinsForCiv,
    syncRotation,
    hitTest,
    tick,
  };

})();
