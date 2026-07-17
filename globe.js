/* ============================================================
   CHRONOS · globe.js  (Phase 2b updated)
   Three.js globe engine: atmosphere, star field, markers,
   raycasting, rotation, epoch state.
   Earth geometry now owned by GlobeTerrain (globe-terrain.js).
   Depends on: data.js, globe-data.js, globe-terrain.js, Three.js
   Exposes: GlobeEngine (global)
   ============================================================ */

const GlobeEngine = (() => {
  let _deepLinkHandled = false;

  // ── THREE.JS REFS ─────────────────────────────────────────
  let scene, camera, renderer, atmoMesh, starField;
  let markerGroup;
  let raycaster, mouse;
  let container;

  // ── STATE ─────────────────────────────────────────────────
  let autoRotate    = true;
  let rotateSpeed   = 0.0008;
  let isDragging    = false;
  let prevMouse     = { x: 0, y: 0 };
  let currentEpoch  = null;
  let activeMarkers = [];
  let hoveredId     = null;
  let selectedId    = null;
  let onSelectCb    = null;
  let onHoverCb     = null;
  let onPinSelectCb = null;   // Phase 2c — pin click callback

  // Pending pin placement (Phase 2c) — set when user clicks globe in pin mode
  let pendingPin    = null;   // { lat, lng } | null
  let pinPlaceMode  = false;

  // Globe rotation — shared with GlobeTerrain
  let rotY = 0, rotX = 0;

  // ── CONSTANTS ─────────────────────────────────────────────
  const EARTH_R   = 1.0;
  const ATMO_R    = 1.08;
  const MARKER_R  = 0.013;
  const TYPE_COL  = {
    confirmed: 0xd4a017,
    theorized: 0x8b41c8,
    debated:   0x1a9a99,
  };
  const TYPE_COL_HOV = {
    confirmed: 0xffe066,
    theorized: 0xc870ff,
    debated:   0x50e8e8,
  };

  // ── COORDINATE HELPER ─────────────────────────────────────
  function latLngToVec3(lat, lng, r) {
    const phi   = (90 - lat)  * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // ── INIT ──────────────────────────────────────────────────
  function init(containerId, onSelect, onHover, onPinSelect) {
    container     = document.getElementById(containerId);
    onSelectCb    = onSelect    || null;
    onHoverCb     = onHover     || null;
    onPinSelectCb = onPinSelect || null;
    if (!container) return;

    buildScene();

    // GlobeTerrain owns the Earth mesh — init it with our scene
    if (window.GlobeTerrain) {
      GlobeTerrain.init(scene);
    }

    // GlobePins — pin heat maps and location theories
    if (window.GlobePins) {
      GlobePins.init(scene, onPinSelect);
    }

    buildAtmosphere();
    buildStarField();
    buildLights();
    wireEvents();

    renderer.setAnimationLoop(animate);
    window.addEventListener('resize', onResize);
    onResize();

    // ── Border system integration hook ───────────────────────
    // globe-borders-init.js polls window._chronosScene (fast path) and
    // falls back to a 'chronos-scene-ready' event after 4s. Set both
    // here so it never has to wait for the fallback.
    window._chronosScene       = scene;
    window._chronosSceneRadius = EARTH_R;
    document.dispatchEvent(new CustomEvent('chronos-scene-ready', {
      detail: { scene, radius: EARTH_R }
    }));
  }

  // ── SCENE ─────────────────────────────────────────────────
  function buildScene() {
    scene    = new THREE.Scene();
    camera   = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 2.6);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse     = new THREE.Vector2();

    markerGroup = new THREE.Group();
    scene.add(markerGroup);
  }

  // ── ATMOSPHERE ────────────────────────────────────────────
  function buildAtmosphere() {
    const geo = new THREE.SphereGeometry(ATMO_R, 64, 64);
    const mat = new THREE.ShaderMaterial({
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uAtmoCol: { value: new THREE.Color(0x1a6aff) },
        uSunDir:  { value: new THREE.Vector3(1, 0.5, 1).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal  = normalize(normalMatrix * normal);
          vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3  uAtmoCol;
        uniform vec3  uSunDir;
        varying vec3  vNormal;
        varying vec3  vViewDir;
        void main() {
          float rim   = 1.0 - max(dot(vNormal, vViewDir), 0.0);
          rim = pow(rim, 3.5);
          float sun   = max(dot(vNormal, uSunDir), 0.0);
          vec3  col   = mix(uAtmoCol, vec3(0.9, 0.95, 1.0), sun * 0.4);
          float alpha = rim * (0.35 + sun * 0.15);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    atmoMesh = new THREE.Mesh(geo, mat);
    scene.add(atmoMesh);
  }

  // ── STAR FIELD ────────────────────────────────────────────
  function buildStarField() {
    const count = 4000;
    const pos   = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 80 + Math.random() * 120;
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.cos(phi);
      pos[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
      sizes[i]   = Math.random() * 1.5 + 0.3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        void main() {
          gl_PointSize = size * (300.0 / length((modelViewMatrix * vec4(position,1.0)).xyz));
          gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float alpha = (1.0 - d * d) * 0.85;
          gl_FragColor = vec4(0.85, 0.90, 1.0, alpha);
        }
      `,
    });
    starField = new THREE.Points(geo, mat);
    scene.add(starField);
  }

  // ── LIGHTS ────────────────────────────────────────────────
  function buildLights() {
    const sun = new THREE.DirectionalLight(0xfff5e8, 1.6);
    sun.position.set(5, 3, 5);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x112233, 0.4));
  }

  // ── MARKERS ───────────────────────────────────────────────
  function setEpochMarkers(civs) {
    while (markerGroup.children.length) markerGroup.remove(markerGroup.children[0]);
    activeMarkers.forEach(m => { if (m.labelEl) m.labelEl.remove(); });
    activeMarkers = [];

    civs.forEach(civ => {
      const coords = GLOBE_DATA.getCivCoords(civ.id);
      if (!coords) return;

      const col = TYPE_COL[civ.t] || 0x888888;
      const geo = new THREE.SphereGeometry(MARKER_R, 8, 8);
      const mat = new THREE.MeshBasicMaterial({ color: col });
      const mesh = new THREE.Mesh(geo, mat);

      const pos = latLngToVec3(coords.lat, coords.lng, EARTH_R + MARKER_R * 0.5);
      mesh.position.copy(pos);
      mesh.userData.civId = civ.id;
      markerGroup.add(mesh);

      // Pulsing ring
      const ringGeo = new THREE.RingGeometry(MARKER_R * 1.4, MARKER_R * 2.2, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.35, side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      markerGroup.add(ring);

      activeMarkers.push({ mesh, ring, civId: civ.id });
    });

    // Honour ?civ=ID deep link once markers exist for this epoch
    if (!_deepLinkHandled) {
      _deepLinkHandled = true;
      setTimeout(_checkURLDeepLink, 300);
    }
  }

  // ── ANIMATE ───────────────────────────────────────────────
  let clock = { t: 0, last: Date.now() };
  function animate() {
    const now  = Date.now();
    const dt   = (now - clock.last) / 1000;
    clock.last = now;
    clock.t   += dt;

    if (autoRotate && !isDragging) {
      rotY += rotateSpeed;
    }

    // Sync terrain rotation
    if (window.GlobeTerrain) {
      GlobeTerrain.syncRotation(rotY, rotX);
      GlobeTerrain.tick(clock.t);
    }

    // Sync pin groups rotation
    if (window.GlobePins) {
      GlobePins.syncRotation(rotY, rotX);
      GlobePins.tick(clock.t);
    }

    markerGroup.rotation.y = rotY;
    markerGroup.rotation.x = rotX;
    atmoMesh.rotation.y    = rotY;

    // Pulse rings
    activeMarkers.forEach((m, i) => {
      if (!m.ring) return;
      const pulse = 0.2 + 0.15 * Math.sin(clock.t * 2 + i * 0.7);
      m.ring.material.opacity = pulse;
    });

    renderer.render(scene, camera);
  }

  // ── HIT TEST ──────────────────────────────────────────────
  function hitTestMarkers(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    const cx   = event.clientX || (event.touches && event.touches[0].clientX);
    const cy   = event.clientY || (event.touches && event.touches[0].clientY);
    mouse.x    =  ((cx - rect.left) / rect.width)  * 2 - 1;
    mouse.y    = -((cy - rect.top)  / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(markerGroup.children);
    const hit  = hits.find(h => h.object.userData.civId);
    return hit ? hit.object.userData.civId : null;
  }

  // ── EVENTS ────────────────────────────────────────────────
  function wireEvents() {
    const el = renderer.domElement;

    el.addEventListener('mousedown', e => {
      isDragging = true;
      prevMouse  = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) {
        const hovId = hitTestMarkers(e);
        if (hovId !== hoveredId) {
          hoveredId = hovId;
          activeMarkers.forEach(m => {
            const isHov = m.civId === hovId;
            const civ   = CIVS.find(c => c.id === m.civId);
            if (!civ) return;
            m.mesh.material.color.set(isHov ? TYPE_COL_HOV[civ.t] : TYPE_COL[civ.t]);
          });
          renderer.domElement.style.cursor = hovId ? 'pointer' : 'grab';
          if (onHoverCb) onHoverCb(hovId ? CIVS.find(c => c.id === hovId) : null);
        }
        return;
      }
      const dx = (e.clientX - prevMouse.x) * 0.005;
      const dy = (e.clientY - prevMouse.y) * 0.005;
      rotY += dx;
      rotX  = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotX + dy));
      prevMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    el.addEventListener('click', e => {
      // Pin placement mode — capture lat/lng from click, don't select civ
      if (pinPlaceMode) {
        const rect  = renderer.domElement.getBoundingClientRect();
        const ndcX  =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        const ndcY  = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);
        const earthGeo = new THREE.SphereGeometry(EARTH_R, 32, 32);
        const earthMesh = new THREE.Mesh(earthGeo);
        const hits = raycaster.intersectObject(earthMesh);
        if (hits.length) {
          const pt  = hits[0].point;
          const lat = Math.asin(pt.y / EARTH_R) * (180 / Math.PI);
          const lng = Math.atan2(pt.z, -pt.x)   * (180 / Math.PI);
          pendingPin = { lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) };
          document.dispatchEvent(new CustomEvent('pin-placed', { detail: pendingPin }));
        }
        earthGeo.dispose();
        return;
      }

      // Normal civ selection
      const civId = hitTestMarkers(e);
      if (civId) {
        selectedId = civId;
        const civ = CIVS.find(c => c.id === civId);
        if (onSelectCb && civ) onSelectCb(civ);
        if (civ) document.dispatchEvent(new CustomEvent('chronos-civ-selected', { detail: { civ } }));
      }

      // Check pin hit test
      if (window.GlobePins) {
        raycaster.setFromCamera(mouse, camera);
        const pin = GlobePins.hitTest(raycaster);
        if (pin && onPinSelectCb) onPinSelectCb(pin);
      }
    });

    el.addEventListener('wheel', e => {
      e.preventDefault();
      camera.position.z = Math.max(1.4, Math.min(5.0,
        camera.position.z + e.deltaY * 0.003
      ));
    }, { passive: false });

    let tPrev = null;
    el.addEventListener('touchstart', e => {
      e.preventDefault();
      if (e.touches.length === 1) tPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isDragging = true;
    }, { passive: false });
    el.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && tPrev) {
        const dx = (e.touches[0].clientX - tPrev.x) * 0.005;
        const dy = (e.touches[0].clientY - tPrev.y) * 0.005;
        rotY += dx;
        rotX  = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotX + dy));
        tPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: false });
    el.addEventListener('touchend', () => { isDragging = false; tPrev = null; });
  }

  // ── RESIZE ────────────────────────────────────────────────
  function onResize() {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  // ── PUBLIC: load epoch ────────────────────────────────────
  function loadEpoch(snapshotKey) {
    const snap = GLOBE_DATA.getSnapshot(snapshotKey);
    currentEpoch = snap;
    const civs = GLOBE_DATA.getSnapshotCivs(snap);
    setEpochMarkers(civs);

    const targetY = (-snap.centerLng) * (Math.PI / 180);
    _animateTo(rotY, targetY, 1200);
  }

  // ── DEEP LINK — open ?civ=ID from URL once engine is ready ──
  function _checkURLDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const civId = parseInt(params.get('civ'), 10);
    if (civId) highlightCiv(civId);
  }

  // ── PUBLIC: highlight a single civ ───────────────────────
  function highlightCiv(civId) {
    selectedId = civId;
    activeMarkers.forEach(m => {
      const civ = CIVS.find(c => c.id === m.civId);
      if (!civ) return;
      const isS = m.civId === civId;
      m.mesh.material.color.set(isS ? TYPE_COL_HOV[civ.t] : TYPE_COL[civ.t]);
      m.mesh.scale.setScalar(isS ? 2.0 : 1.0);
    });
    const coords = GLOBE_DATA.getCivCoords(civId);
    if (coords) {
      const targetY = (-coords.lng) * (Math.PI / 180);
      _animateTo(rotY, targetY, 800);
    }
  }

  // ── TWEEN ─────────────────────────────────────────────────
  function _animateTo(from, to, ms) {
    const start = Date.now();
    const tick  = () => {
      const t = Math.min((Date.now() - start) / ms, 1);
      const e = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      rotY = from + (to - from) * e;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ── PUBLIC: toggle autorotate ─────────────────────────────
  function setAutoRotate(v) { autoRotate = v; }

  // ── PUBLIC: pin placement mode ────────────────────────────
  function setPinPlaceMode(v) {
    pinPlaceMode = v;
    if (renderer) {
      renderer.domElement.style.cursor = v ? 'crosshair' : 'grab';
    }
    if (!v) pendingPin = null;
  }
  function getPendingPin() { return pendingPin; }
  function clearPendingPin() { pendingPin = null; }

  // ── PUBLIC: load civ pins ─────────────────────────────────
  function loadCivPins(civId) {
    if (window.GlobePins) GlobePins.loadCivPins(civId);
  }
  function clearPins() {
    if (window.GlobePins) GlobePins.clearPins();
  }

  return {
    checkURLDeepLink: _checkURLDeepLink,
    init,
    loadEpoch,
    highlightCiv,
    setAutoRotate,
    setPinPlaceMode,
    getPendingPin,
    clearPendingPin,
    loadCivPins,
    clearPins,
    onResize,
    // Exposed for globe-borders-init.js's window.GlobeEngine._scene / ._radius
    // poll path — getters so they reflect the real value once init() has run.
    get _scene()  { return scene;  },
    get _radius() { return EARTH_R; },
  };

})();

window.GlobeEngine = GlobeEngine;
