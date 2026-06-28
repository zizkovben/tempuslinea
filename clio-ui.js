// ============================================================
// CHRONOS — clio-ui.js
// CLIO AI Assistant — UI panel, toggle, message rendering
// ============================================================

const ClioUI = (() => {

  let panel, messagesEl, inputEl, sendBtn, toggleBtn;
  let isOpen = false;

  // ── Build panel DOM ────────────────────────────────────────
  function buildPanel() {
    // Toggle button (fixed bottom-right)
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'clio-toggle';
    toggleBtn.innerHTML = '✦ Ask CLIO';
    toggleBtn.setAttribute('aria-label', 'Open CLIO AI assistant');
    toggleBtn.addEventListener('click', toggle);
    document.body.appendChild(toggleBtn);

    // Main panel
    panel = document.createElement('div');
    panel.id = 'clio-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div id="clio-header">
        <div id="clio-title">
          <span id="clio-dot"></span>
          <span>CLIO</span>
          <span id="clio-subtitle">Civilisation Intelligence</span>
        </div>
        <button id="clio-close" aria-label="Close CLIO">✕</button>
      </div>
      <div id="clio-messages" role="log" aria-live="polite"></div>
      <div id="clio-input-row">
        <textarea id="clio-input" placeholder="Ask about any civilisation, theory, or researcher…" rows="2" maxlength="500"></textarea>
        <button id="clio-send" aria-label="Send message">➤</button>
      </div>
      <div id="clio-footer">Powered by Claude · Tempus Linea</div>
    `;
    document.body.appendChild(panel);

    // Wire up elements
    messagesEl = document.getElementById('clio-messages');
    inputEl    = document.getElementById('clio-input');
    sendBtn    = document.getElementById('clio-send');

    document.getElementById('clio-close').addEventListener('click', close);
    sendBtn.addEventListener('click', handleSend);
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });

    injectStyles();
    showWelcome();
  }

  // ── Welcome message ────────────────────────────────────────
  function showWelcome() {
    appendMessage('clio', `Welcome to Tempus Linea. I'm CLIO — your guide to 1,000 civilisations across human history, from confirmed archaeology to the most fiercely debated alternative theories.\n\nAsk me about any civilisation, researcher, theory, or historical event. All perspectives are welcome here.`);
  }

  // ── Toggle open/close ──────────────────────────────────────
  function toggle() { isOpen ? close() : open(); }

  function open() {
    isOpen = true;
    panel.classList.add('clio-open');
    panel.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('clio-active');
    inputEl.focus();
  }

  function close() {
    isOpen = false;
    panel.classList.remove('clio-open');
    panel.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('clio-active');
  }

  // ── Send message ───────────────────────────────────────────
  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    sendBtn.disabled = true;
    appendMessage('user', text);

    const typing = appendTyping();

    try {
      const reply = await Clio.ask(text);
      typing.remove();
      appendMessage('clio', reply);
    } catch (err) {
      typing.remove();
      appendMessage('error', 'CLIO is temporarily unavailable. Please try again.');
      console.error('CLIO error:', err);
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  // ── Append a message bubble ────────────────────────────────
  function appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `clio-msg clio-msg-${role}`;

    if (role === 'clio') {
      msg.innerHTML = `<span class="clio-msg-label">CLIO</span><div class="clio-msg-body">${formatText(text)}</div>`;
    } else if (role === 'user') {
      msg.innerHTML = `<div class="clio-msg-body">${escapeHtml(text)}</div>`;
    } else {
      msg.innerHTML = `<div class="clio-msg-body clio-msg-err">${escapeHtml(text)}</div>`;
    }

    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  // ── Typing indicator ───────────────────────────────────────
  function appendTyping() {
    const el = document.createElement('div');
    el.className = 'clio-msg clio-msg-clio clio-typing';
    el.innerHTML = `<span class="clio-msg-label">CLIO</span><div class="clio-msg-body"><span class="clio-dots"><span></span><span></span><span></span></span></div>`;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  // ── Public method: open panel with pre-filled question ─────
  function askAbout(civName) {
    open();
    inputEl.value = `Tell me about ${civName}`;
    handleSend();
  }

  // ── Text formatting ────────────────────────────────────────
  function formatText(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Inject styles ──────────────────────────────────────────
  function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
      #clio-toggle {
        position: fixed; bottom: 24px; right: 24px; z-index: 9000;
        background: var(--gold, #d4a017); color: #06080f;
        border: none; padding: 10px 18px; font-family: var(--font-mono, monospace);
        font-size: 12px; font-weight: bold; letter-spacing: 1px;
        border-radius: 20px; cursor: pointer; box-shadow: 0 4px 20px rgba(212,160,23,.4);
        transition: all .2s;
      }
      #clio-toggle:hover, #clio-toggle.clio-active {
        background: #e8b520; box-shadow: 0 4px 30px rgba(212,160,23,.6);
      }
      #clio-panel {
        position: fixed; bottom: 80px; right: 24px; z-index: 8999;
        width: 360px; max-height: 520px;
        background: var(--bg-panel, #0a0d18);
        border: 1px solid var(--gold-dim, #9a6e08);
        border-radius: 10px; display: flex; flex-direction: column;
        box-shadow: 0 8px 40px rgba(0,0,0,.6);
        transform: translateY(20px) scale(.97); opacity: 0;
        pointer-events: none; transition: all .25s cubic-bezier(.4,0,.2,1);
      }
      #clio-panel.clio-open {
        transform: translateY(0) scale(1); opacity: 1; pointer-events: all;
      }
      #clio-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 16px; border-bottom: 1px solid #1a3040;
      }
      #clio-title { display: flex; align-items: center; gap: 8px; }
      #clio-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--gold, #d4a017); animation: clio-pulse 2s infinite;
      }
      @keyframes clio-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
      #clio-title span:nth-child(2) {
        color: var(--gold, #d4a017); font-family: var(--font-display, Georgia, serif);
        font-size: 14px; letter-spacing: 2px;
      }
      #clio-subtitle { color: var(--text-secondary, #445566); font-size: 10px; letter-spacing: 1px; }
      #clio-close {
        background: none; border: none; color: var(--text-secondary, #445566);
        font-size: 14px; cursor: pointer; padding: 4px 6px; border-radius: 4px;
        transition: color .15s;
      }
      #clio-close:hover { color: var(--text-primary, #8899aa); }
      #clio-messages {
        flex: 1; overflow-y: auto; padding: 12px 14px;
        display: flex; flex-direction: column; gap: 10px;
        scrollbar-width: thin; scrollbar-color: #1a3040 transparent;
      }
      .clio-msg { display: flex; flex-direction: column; gap: 3px; }
      .clio-msg-label {
        font-size: 9px; letter-spacing: 2px; color: var(--gold-dim, #9a6e08);
        text-transform: uppercase;
      }
      .clio-msg-body {
        font-family: var(--font-mono, monospace); font-size: 12px;
        line-height: 1.7; color: var(--text-primary, #8899aa);
        background: var(--bg-card, #0d1120); border-radius: 6px;
        padding: 8px 10px;
      }
      .clio-msg-user .clio-msg-body {
        background: rgba(212,160,23,.1); border: 1px solid rgba(212,160,23,.2);
        color: var(--text-primary, #8899aa); align-self: flex-end;
      }
      .clio-msg-err { color: #cc4444 !important; }
      .clio-dots { display: flex; gap: 4px; padding: 2px 0; }
      .clio-dots span {
        width: 5px; height: 5px; border-radius: 50%;
        background: var(--gold-dim, #9a6e08); animation: clio-bounce .9s infinite;
      }
      .clio-dots span:nth-child(2) { animation-delay: .15s; }
      .clio-dots span:nth-child(3) { animation-delay: .3s; }
      @keyframes clio-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
      #clio-input-row {
        display: flex; gap: 8px; padding: 10px 12px;
        border-top: 1px solid #1a3040;
      }
      #clio-input {
        flex: 1; background: var(--bg-card, #0d1120); border: 1px solid #1a3040;
        color: var(--text-primary, #8899aa); border-radius: 6px;
        padding: 8px 10px; font-family: var(--font-mono, monospace); font-size: 12px;
        resize: none; outline: none; line-height: 1.5;
        transition: border-color .15s;
      }
      #clio-input:focus { border-color: var(--gold-dim, #9a6e08); }
      #clio-input::placeholder { color: #1a3040; }
      #clio-send {
        background: var(--gold, #d4a017); color: #06080f;
        border: none; border-radius: 6px; padding: 8px 12px;
        font-size: 14px; cursor: pointer; transition: background .15s;
        align-self: flex-end;
      }
      #clio-send:hover { background: #e8b520; }
      #clio-send:disabled { background: #1a3040; color: #445566; cursor: not-allowed; }
      #clio-footer {
        font-size: 9px; color: #1a3040; text-align: center;
        padding: 6px; letter-spacing: 1px;
      }
      @media (max-width: 420px) {
        #clio-panel { width: calc(100vw - 32px); right: 16px; bottom: 72px; }
      }
    `;
    document.head.appendChild(s);
  }

  // ── Init ───────────────────────────────────────────────────
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildPanel);
    } else {
      buildPanel();
    }
  }

  return { init, open, close, toggle, askAbout };

})();

ClioUI.init();
