// Gnoke Axioms — engine. Deck content lives in js/decks.js (GX_DECKS),
// loaded before this file. Nothing below needs to change to add a deck.

const EMOJI = {
  Lock: "🔒", KeyRound: "🔑", Bot: "🤖", MessageSquareWarning: "💬",
  Footprints: "👣", Flag: "🏁", Rabbit: "🐇", Turtle: "🐢",
  Wrench: "🔧", Factory: "🏭", Sun: "☀️", CloudLightning: "⛈️",
  Scale: "⚖️", Settings: "⚙️", GitFork: "🔀", MapPin: "📍",
  Puzzle: "🧩", LayoutGrid: "🔲", ScrollText: "📜", TriangleAlert: "⚠️",
  Flame: "🔥", Snowflake: "❄️", Droplet: "💧", CloudRain: "🌧️",
  Atom: "⚛️", Zap: "⚡", FlaskConical: "🧪", Thermometer: "🌡️", Repeat: "🔁",
  Eye: "👁️",
};
function emoji(name) { return EMOJI[name] || "❓"; }

function shuffledOrder(len) {
  const arr = Array.from({ length: len }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const state = {
  deckKey: "axioms",
  order: shuffledOrder(GX_DECKS.axioms.levels.length),
  pos: 0,
  picked: null,
  solved: false,
  streak: 0,
  menuOpen: null,
};

function currentDeck() { return GX_DECKS[state.deckKey]; }
function currentLevel() { return currentDeck().levels[state.order[state.pos]]; }

function choose(i) {
  if (state.solved) return;
  state.picked = i;
  if (i === currentLevel().correct) {
    state.solved = true;
    state.streak++;
  }
  render();
}

function next() {
  const deck = currentDeck();
  state.pos++;
  if (state.pos >= state.order.length) {
    state.order = shuffledOrder(deck.levels.length);
    state.pos = 0;
  }
  state.picked = null;
  state.solved = false;
  render();
}

function switchDeck(key) {
  state.deckKey = key;
  state.order = shuffledOrder(GX_DECKS[key].levels.length);
  state.pos = 0;
  state.picked = null;
  state.solved = false;
  state.streak = 0;
  state.menuOpen = null;
  render();
}

function toggleMenu(name) {
  state.menuOpen = state.menuOpen === name ? null : name;
  render();
}

// GS2 integration point: apps navigate home via GnokeApp.home(). Guarded so
// this app still runs standalone (outside GS2) without throwing.
function goHome() {
  if (typeof GnokeApp !== "undefined" && typeof GnokeApp.home === "function") {
    GnokeApp.home();
  } else {
    console.log("[gnoke-axioms] GnokeApp.home() not available — standalone mode");
  }
}

function render() {
  const deck = currentDeck();
  const lvl = currentLevel();
  const app = document.getElementById("app");

  const deckItemsHtml = Object.keys(GX_DECKS).map(key =>
    `<button class="menu-item${key === state.deckKey ? " active" : ""}" data-deck="${key}">${GX_DECKS[key].title}${key === state.deckKey ? " ✓" : ""}</button>`
  ).join("");

  let bodyHtml;
  if (!state.solved) {
    const optionsHtml = lvl.options.map((opt, i) => {
      const wrong = state.picked === i && i !== lvl.correct;
      return `<button class="opt${wrong ? " wrong" : ""}" data-choice="${i}">${opt}${wrong ? " ✕" : ""}</button>`;
    }).join("");
    bodyHtml = `
      <p class="prompt">Which one is this?</p>
      <div class="options">${optionsHtml}</div>
    `;
  } else {
    bodyHtml = `
      <div class="result">
        <div class="correct-line">✓ ${lvl.options[lvl.correct]}</div>
        <div class="stamp">
          <span class="tag">${lvl.tag}</span>
          <p class="detail">${lvl.detail}</p>
        </div>
        <button class="next-btn" id="next-btn">Next →</button>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="window">
      <div class="titlebar">
        <div class="traffic">
          <span class="dot red" id="gx-home" title="Home"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <span class="wintitle">Gnoke Axioms</span>
      </div>
      <div class="menubar">
        <div class="menu${state.menuOpen === "decks" ? " open" : ""}">
          <button class="menu-label" id="menu-decks-btn">Decks ▾</button>
          <div class="menu-dropdown">${deckItemsHtml}</div>
        </div>
        <div class="menu${state.menuOpen === "help" ? " open" : ""}">
          <button class="menu-label" id="menu-help-btn">Help ▾</button>
          <div class="menu-dropdown">
            <p class="menu-help-text">Look at the pair. Pick the axiom it's pointing at. Wrong picks just shake, no penalty, keep going.</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="meta-row">
          <span class="deck-name">${deck.subtitle}</span>
          <span class="streak">🔥 ${state.streak}</span>
        </div>
        <div class="scene">
          <span>${emoji(lvl.icons[0])}</span>
          <span class="arrow">→</span>
          <span>${emoji(lvl.icons[1])}</span>
        </div>
        ${bodyHtml}
      </div>
    </div>
  `;

  document.getElementById("gx-home").addEventListener("click", goHome);
  document.getElementById("menu-decks-btn").addEventListener("click", () => toggleMenu("decks"));
  document.getElementById("menu-help-btn").addEventListener("click", () => toggleMenu("help"));
  app.querySelectorAll("[data-deck]").forEach(btn =>
    btn.addEventListener("click", () => switchDeck(btn.dataset.deck))
  );
  app.querySelectorAll(".opt").forEach(btn =>
    btn.addEventListener("click", () => choose(Number(btn.dataset.choice)))
  );
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.addEventListener("click", next);
}

// GS2 integration point: apps that persist state normally wait for the
// gnoke:db-ready event before touching AppDB. This app doesn't persist
// anything yet (streak resets on reload), so it just renders on load —
// swap this for a gnoke:db-ready listener if/when streak or a "last deck"
// preference should survive across sessions.
render();
