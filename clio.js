/* ============================================================
   CHRONOS · clio.js  (Phase 3)
   CLIO — AI assistant powered by Claude API.
   Persistent bottom-right panel on all pages.
   Full conversation history sent each request.
   Personality: knowledgeable, even-handed, never condescending.
   Equally respectful of mainstream archaeology and alternative
   researchers. Does not take editorial sides.
   Depends on: data.js, data-extended.js (for civ context)
   Exposes: CLIO (global)
   ============================================================ */

window.CLIO = (() => {

  // ── STATE ─────────────────────────────────────────────────
  let isOpen       = false;
  let isLoading    = false;
  let history      = [];    // [{role, content}] — full convo for API
  let activeCiv    = null;  // civ object if user is viewing one
  let panelEl      = null;
  let messagesEl   = null;
  let inputEl      = null;

  // ── SYSTEM PROMPT ─────────────────────────────────────────
  // Encodes CLIO's personality, role, and knowledge of CHRONOS.
  // Bible §17: even-handed, intellectually generous, diplomatically honest.
  const SYSTEM_PROMPT = `You are CLIO — the AI assistant for CHRONOS, the definitive interactive archive of human civilizations. You are named after the Greek Muse of History.

PERSONALITY:
- Knowledgeable, curious, intellectually generous, diplomatically honest
- You never condescend. You treat every question as worth taking seriously.
- You are equally respectful of peer-reviewed archaeology AND alternative researchers like Graham Hancock, Robert Schoch, Matthew LaCroix, and Randall Carlson
- You do not editorially dismiss theories — you present the evidence landscape and let the community decide plausibility
- You are aware that mainstream consensus has been wrong before (e.g. Göbekli Tepe overturned the farming-precedes-temples assumption entirely)
- When discussing contested claims, you always note: what the mainstream position is, what the alternative position is, what evidence each side marshals, and what remains genuinely unresolved

YOUR ROLES IN CHRONOS:
1. Navigation guide — help users find civilizations, epochs, filter combinations
2. Knowledge companion — discuss any civilization in depth
3. Debate facilitator — present multiple sides of contested theories fairly
4. Onboarding helper — explain how CHRONOS works
5. Research assistant — help users articulate and source their own theories

CHRONOS KNOWLEDGE:
- The app has 90 civilizations spanning from 450,000 BCE to present
- Three status types: confirmed (archaeological consensus), debated (physical evidence, contested interpretation), theorized (no direct physical evidence — textual, astronomical, or alternative)
- All entries before 10,800 BCE (the Younger Dryas boundary) are classified debated or theorized by default
- The Younger Dryas (~12,900–11,700 years ago) was a catastrophic cooling event. Sea level was 60–120m lower. Doggerland, the Sunda Shelf, the Persian Gulf basin, and the Bahama Banks were dry land.
- The globe shows two Earth states: Holocene (modern coastlines) and Glacial (sea level −120m). Crossing the 10,800 BCE line triggers a visible morph transition.
- Location types: A = confirmed fixed location, B = debated location with competing proposals, C = user-mapped (heat map of community pins, no official location — used for Atlantis, Lemuria, Pre-Flood Culture)

KEY RESEARCHERS IN THE DATABASE:
- Graham Hancock: pre-YD advanced civilization thesis, Sphinx water erosion, Amazonian scale
- Robert Schoch: geological dating of Sphinx enclosure via water erosion patterns
- Randall Carlson: Younger Dryas cosmic impact, geological catastrophism
- Matthew LaCroix: pre-YD Sumerian mythology, underground sites beneath Mesopotamian tells
- Zecharia Sitchin: Anunnaki as extraterrestrial beings (widely rejected by Assyriologists)
- Erich von Däniken: ancient alien intervention hypothesis

CONVERSATION STYLE:
- Keep responses focused and substantive. Avoid filler.
- Use paragraph breaks for readability. No excessive bullet lists.
- When a user asks about a specific civilization, draw on the rich detail in CHRONOS.
- Flag when something is mainstream consensus vs. contested vs. highly speculative.
- Invite further questions. Be a companion, not a search engine.
- Never say "I cannot" — you can always discuss, contextualize, or redirect thoughtfully.`;

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    _buildPanel();
    _wireToggle();
    _greet();
  }

  // ── BUILD PANEL ───────────────────────────────────────────
  function _buildPanel() {
    // Container
    panelEl = document.createElement('div');
    panelEl.id = 'clio-panel';
    panelEl.innerHTML = `
      <div id="clio-header">
        <div id="clio-title">
          <span id="clio-sigil">✦</span>
          <span>CLIO</span>
          <span id="clio-subtitle">MUSE OF HISTORY</span>
        </div>
        <div id="clio-header-btns">
          <button id="clio-clear" title="Clear conversation">↺</button>
          <button id="clio-close" title="Close">✕</button>
        </div>
      </div>
      <div id="clio-context-bar" style="display:none;">
        <span id="clio-context-label"></span>
      </div>
      <div id="clio-messages"></div>
      <div id="clio-input-wrap">
        <textarea id="clio-input"
          placeholder="Ask CLIO anything about civilization…"
          rows="2"></textarea>
        <button id="clio-send">
          <span id="clio-send-icon">→</span>
        </button>
      </div>
    `;
    document.body.appendChild(panelEl);

    // Toggle button (always visible bottom-right)
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'clio-toggle';
    toggleBtn.innerHTML = `<span>✦</span><span>CLIO</span>`;
    toggleBtn.title = 'Open CLIO — AI History Assistant';
    document.body.appendChild(toggleBtn);

    // Cache refs
    messagesEl = document.getElementById('clio-messages');
    inputEl    = document.getElementById('clio-input');

    // Wire buttons
    document.getElementById('clio-close').addEventListener('click', close);
    document.getElementById('clio-clear').addEventListener('click', clearConversation);
    document.getElementById('clio-send').addEventListener('click', _sendMessage);
    toggleBtn.addEventListener('click', toggle);

    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        _sendMessage();
      }
    });
  }

  function _wireToggle() {
    // Keyboard shortcut: Alt+C
    document.addEventListener('keydown', e => {
      if (e.altKey && e.key === 'c') toggle();
    });
  }

  // ── GREETING ──────────────────────────────────────────────
  function _greet() {
    const greetings = [
      "I am CLIO — keeper of history's records. Ask me about any civilization, theory, or mystery in the archive.",
      "Welcome to CHRONOS. I'm CLIO, your guide through the full spectrum of human civilization — from confirmed archaeology to the most debated alternative theories.",
      "History is never fully settled. I'm CLIO — ask me anything, and I'll present what we know, what we debate, and what remains genuinely mysterious.",
    ];
    const msg = greetings[Math.floor(Math.random() * greetings.length)];
    _appendMessage('clio', msg);
  }

  // ── TOGGLE / OPEN / CLOSE ─────────────────────────────────
  function toggle() { isOpen ? close() : open(); }

  function open() {
    isOpen = true;
    panelEl.classList.add('open');
    document.getElementById('clio-toggle').classList.add('active');
    setTimeout(() => inputEl && inputEl.focus(), 300);
  }

  function close() {
    isOpen = false;
    panelEl.classList.remove('open');
    document.getElementById('clio-toggle').classList.remove('active');
  }

  // ── SET ACTIVE CIVILIZATION CONTEXT ───────────────────────
  // Called by ui.js or globe-ui.js when user selects a civ.
  // Gives CLIO context for more relevant responses.
  function setActiveCiv(civ) {
    activeCiv = civ;
    const bar   = document.getElementById('clio-context-bar');
    const label = document.getElementById('clio-context-label');
    if (!bar || !label) return;
    if (civ) {
      const tc = { confirmed:'#c09010', theorized:'#9a60c0', debated:'#3aabb0' }[civ.t];
      bar.style.display = 'flex';
      bar.style.borderColor = tc + '44';
      label.innerHTML =
        `<span style="color:${tc};">◈ ${civ.t.toUpperCase()}</span>` +
        `<span style="color:#445566;margin:0 6px;">·</span>` +
        `<span style="color:#8899aa;">${civ.n}</span>`;
    } else {
      bar.style.display = 'none';
    }
  }

  // ── SEND MESSAGE ──────────────────────────────────────────
  async function _sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isLoading) return;
    inputEl.value = '';
    inputEl.style.height = '';

    // Append user message to UI and history
    _appendMessage('user', text);
    history.push({ role: 'user', content: _buildUserContent(text) });

    // Show loading indicator
    isLoading = true;
    const loadingId = _appendLoading();
    document.getElementById('clio-send').disabled = true;

    try {
      const reply = await _callClaudeAPI();
      _removeLoading(loadingId);
      _appendMessage('clio', reply);
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      _removeLoading(loadingId);
      _appendMessage('error',
        'CLIO is temporarily unreachable. Please check your connection and try again.');
      // Remove the failed user message from history so it can be retried
      history.pop();
    } finally {
      isLoading = false;
      document.getElementById('clio-send').disabled = false;
      inputEl.focus();
    }
  }

  // Inject active civ context into user message if relevant
  function _buildUserContent(text) {
    if (!activeCiv) return text;
    return `[User is currently viewing: ${activeCiv.n} (${activeCiv.t}, ${activeCiv.r}, ` +
           `${_fmtYear(activeCiv.s)} – ${_fmtYear(activeCiv.e)})]\n\n${text}`;
  }

  // ── CLAUDE API CALL ───────────────────────────────────────
  async function _callClaudeAPI() {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     SYSTEM_PROMPT,
        messages:   history,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data = await response.json();
    // Extract text from content blocks
    return data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');
  }

  // ── MESSAGE RENDERING ─────────────────────────────────────
  function _appendMessage(role, text) {
    const el = document.createElement('div');
    el.className = `clio-msg clio-msg-${role}`;

    if (role === 'clio') {
      el.innerHTML = `
        <div class="clio-msg-sigil">✦</div>
        <div class="clio-msg-body">${_formatText(text)}</div>`;
    } else if (role === 'user') {
      el.innerHTML = `
        <div class="clio-msg-body">${_escapeHtml(text)}</div>`;
    } else if (role === 'error') {
      el.innerHTML = `
        <div class="clio-msg-body clio-msg-error-text">⚠ ${_escapeHtml(text)}</div>`;
    }

    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function _appendLoading() {
    const id = 'clio-loading-' + Date.now();
    const el = document.createElement('div');
    el.id = id;
    el.className = 'clio-msg clio-msg-clio clio-msg-loading';
    el.innerHTML = `
      <div class="clio-msg-sigil">✦</div>
      <div class="clio-msg-body">
        <span class="clio-dot">·</span>
        <span class="clio-dot">·</span>
        <span class="clio-dot">·</span>
      </div>`;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return id;
  }

  function _removeLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // ── CLEAR ─────────────────────────────────────────────────
  function clearConversation() {
    history = [];
    messagesEl.innerHTML = '';
    _greet();
  }

  // ── SEND PROMPT EXTERNALLY ────────────────────────────────
  // Called from other modules to pre-populate a question.
  // e.g. "Tell me more about Atlantis" button in pin panel.
  function ask(prompt) {
    if (!isOpen) open();
    inputEl.value = prompt;
    setTimeout(_sendMessage, 100);
  }

  // ── FORMAT HELPERS ────────────────────────────────────────
  function _formatText(text) {
    // Convert newlines to paragraphs, preserve basic markdown bold
    return text
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p)
      .map(p => `<p>${_escapeHtml(p).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
      .join('');
  }

  function _escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function _fmtYear(y) {
    if (y === 0) return '1 CE';
    return y < 0 ? Math.abs(y).toLocaleString() + ' BCE' : y.toLocaleString() + ' CE';
  }

  // ── PUBLIC API ────────────────────────────────────────────
  return { init, open, close, toggle, setActiveCiv, ask, clearConversation };

})();

document.addEventListener('DOMContentLoaded', CLIO.init);
