/* ============================================================
   CHRONOS · community-list.js
   Reusable virtualized list engine — "epoch drum" style.

   Renders a dynamic-height, always-legible list where only the rows
   near the top/bottom edges of the viewport curl away in 3D as they
   enter/exit, rather than degrading every row's size/opacity by
   distance from a single center point. Built specifically to answer
   the "position shouldn't imply importance" problem: the same civ can
   sit anywhere in the visible band depending on scroll position, and
   because only ~20-25 DOM nodes are ever rendered regardless of the
   underlying dataset size, it stays smooth whether the list holds 30
   items or 30,000.

   Scrolling wraps infinitely (modulo-based, not a jump-cut) — the last
   item flows straight into the first and vice versa, so there is no
   first or last position at all, only a current one. This extends the
   original "no fixed rank" goal literally: earlier versions still had
   a technical start/end even if visually de-emphasized; this doesn't.

   Prototyped and approved interactively this session before being
   converted into this module — see Bible v23's "UI Concept —
   Virtualized Curl-Edge List" section for the design history.

   Supports: mouse drag, touch drag, mouse wheel, all with the same
   momentum/deceleration physics; live re-filtering via setItems();
   dynamic height (recalculates visible row count on resize).

   Depends on: nothing external — pure DOM/JS, no other CHRONOS file
   required. Exposes: VirtualList (global constructor).

   Usage:
     const list = VirtualList({
       viewportEl: document.getElementById('someViewport'),
       innerEl:    document.getElementById('someInner'),
       rowHeight:  30,
       renderRow:  (item, idx) => `<div>...</div>`,  // must return a
                   // single element's outerHTML with a
                   // data-vlist-idx="${idx}" attribute on the root tag
       onSelect:   (item, idx) => { ... },
     });
     list.setItems(arrayOfItems);   // call again any time to re-filter
     list.destroy();                // removes listeners
   ============================================================ */

window.VirtualList = function (config) {
  const viewport   = config.viewportEl;
  const inner      = config.innerEl;
  const rowHeight  = config.rowHeight || 30;
  const renderRow  = config.renderRow;
  const onSelect   = config.onSelect || function () {};
  const curlZone   = config.curlZone || rowHeight * 2.2;   // px from edge where curl begins
  const curlMaxDeg = config.curlMaxDeg || 55;

  let items = config.items || [];
  let scrollPos = 0;      // fractional row index at top of viewport
  let velocity = 0;
  let dragging = false;
  let lastY = 0, lastTime = 0, raf = null;

  // No boundaries — scrollPos wraps via modulo instead of stopping at
  // the ends, so the list has no first or last item, only a current
  // position. Normalized every call to avoid float drift over a long
  // session; render() also wraps each row's index independently.
  function wrap() {
    if (!items.length) { scrollPos = 0; velocity = 0; return; }
    scrollPos = ((scrollPos % items.length) + items.length) % items.length;
  }

  function render() {
    const h = viewport.clientHeight;
    if (!h) return;   // not laid out yet (e.g. a collapsed group)
    if (!items.length) { inner.innerHTML = ''; return; }

    const startIdx = Math.floor(scrollPos);
    const frac = scrollPos - startIdx;
    const rowsNeeded = Math.ceil(h / rowHeight) + 4;   // + buffer for curl edges
    let html = '';

    for (let i = -2; i < rowsNeeded; i++) {
      const rawIdx = startIdx + i;
      const idx = ((rawIdx % items.length) + items.length) % items.length;   // wrap
      const y = (i - frac) * rowHeight;
      if (y < -rowHeight * 2.5 || y > h + rowHeight * 0.5) continue;

      const distTop    = y;
      const distBottom = h - (y + rowHeight);
      const edgeDist   = Math.min(distTop, distBottom);
      let curl = 0, opacity = 1;
      if (edgeDist < curlZone) {
        const t = Math.max(0, Math.min(1, edgeDist / curlZone));
        curl = (1 - t) * curlMaxDeg;
        opacity = 0.12 + t * 0.88;
        if (distTop < distBottom) curl = -curl;
      }

      const rowHtml = renderRow(items[idx], idx);
      // Inject positioning/curl styles into the row's root tag via a
      // wrapper — keeps renderRow()'s job simple (just describe content).
      html += `<div style="position:absolute;left:0;right:0;top:${y}px;height:${rowHeight}px;` +
        `transform-origin:center ${curl < 0 ? 'top' : 'bottom'};` +
        `transform:rotateX(${curl}deg);opacity:${opacity};">${rowHtml}</div>`;
    }
    inner.innerHTML = html;

    inner.querySelectorAll('[data-vlist-idx]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.vlistIdx, 10);
        onSelect(items[idx], idx);
      });
    });
  }

  function yFromEvent(e) { return e.touches ? e.touches[0].clientY : e.clientY; }

  function onDown(e) {
    dragging = true; velocity = 0;
    lastY = yFromEvent(e); lastTime = performance.now();
    viewport.style.cursor = 'grabbing';
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    e.preventDefault();
  }

  function onMove(e) {
    if (!dragging) return;
    const y = yFromEvent(e);
    const dy = y - lastY;
    lastY = y;
    const now = performance.now();
    const dt = Math.max(now - lastTime, 1);
    lastTime = now;
    const itemDelta = -(dy / rowHeight);
    scrollPos += itemDelta;
    velocity = itemDelta / dt * 16;
    wrap(); render();
    e.preventDefault();
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    viewport.style.cursor = 'grab';
    momentum();
  }

  function momentum() {
    if (Math.abs(velocity) < 0.02) { velocity = 0; return; }
    scrollPos += velocity;
    velocity *= 0.92;
    wrap(); render();
    raf = requestAnimationFrame(momentum);
  }

  function onWheel(e) {
    scrollPos += e.deltaY / rowHeight;
    wrap(); render();
    e.preventDefault();
  }

  // Keyboard: arrow up/down step one row, matches list semantics for
  // accessibility even though the visual now wraps infinitely.
  function onKeyDown(e) {
    if (e.key === 'ArrowDown') { scrollPos += 1; wrap(); render(); e.preventDefault(); }
    if (e.key === 'ArrowUp')   { scrollPos -= 1; wrap(); render(); e.preventDefault(); }
  }

  viewport.style.cursor = 'grab';
  viewport.setAttribute('tabindex', '0');   // enable keyboard focus
  viewport.addEventListener('mousedown', onDown);
  viewport.addEventListener('touchstart', onDown, { passive: false });
  viewport.addEventListener('wheel', onWheel, { passive: false });
  viewport.addEventListener('keydown', onKeyDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onUp);

  const resizeObserver = (typeof ResizeObserver !== 'undefined')
    ? new ResizeObserver(() => render())
    : null;
  if (resizeObserver) resizeObserver.observe(viewport);

  function setItems(newItems) {
    items = newItems || [];
    scrollPos = 0;
    velocity = 0;
    wrap();
    render();
  }

  function scrollToIndex(idx) {
    scrollPos = idx;
    wrap(); render();
  }

  function destroy() {
    viewport.removeEventListener('mousedown', onDown);
    viewport.removeEventListener('touchstart', onDown);
    viewport.removeEventListener('wheel', onWheel);
    viewport.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
    if (resizeObserver) resizeObserver.disconnect();
    if (raf) cancelAnimationFrame(raf);
  }

  render();

  return { setItems, scrollToIndex, destroy, render };
};
