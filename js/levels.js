/* AppEnglish — níveis A1–C1, teste de nivelamento adaptativo e escolha do nível. */
(function () {
  "use strict";
  var ui = App.ui, S = App.screens, U = App.util, esc = ui.esc, I = App.icon;
  var LV = ["A1", "A2", "B1", "B2", "C1"];
  var INFO = {
    A1: ["Iniciante", "Entende e usa frases bem simples do dia a dia."],
    A2: ["Básico", "Fala de rotina, compras, viagens e passado simples."],
    B1: ["Intermediário", "Se vira em viagens, conta experiências e dá opiniões simples."],
    B2: ["Intermediário avançado", "Conversa com fluência razoável e lê textos do trabalho."],
    C1: ["Avançado", "Usa o inglês com flexibilidade em contextos profissionais e acadêmicos."]
  };
  var PER_LEVEL = 4, PASS = 3;

  function li(l) { var i = LV.indexOf(l); return i < 0 ? 3 : i; }
  function inBand(p, lvl) { var d = li(lvl) - li(p.level || "B2"); return d >= -1 && d <= 1; }

  // Decks novos que o perfil ainda não conhecia: liga só os da faixa do seu nível (um abaixo até um acima)
  function syncDecks(p) {
    if (!p) return;
    p.knownDecks = p.knownDecks || [];
    var changed = false;
    ui.content("decks").forEach(function (d) {
      if (p.knownDecks.indexOf(d.id) >= 0) return;
      p.knownDecks.push(d.id); changed = true;
      if (!inBand(p, d.level) && p.disabledDecks.indexOf(d.id) < 0) p.disabledDecks.push(d.id);
    });
    if (changed) App.storage.save();
  }

  function applyLevel(p, lvl) {
    p.level = lvl;
    var ids = ui.content("decks").map(function (d) { return d.id; });
    p.disabledDecks = p.disabledDecks.filter(function (id) { return ids.indexOf(id) < 0; }); // mantém escolhas de decks pessoais
    ui.content("decks").forEach(function (d) { if (!inBand(p, d.level)) p.disabledDecks.push(d.id); });
    p.knownDecks = ids.slice();
    App.storage.save();
  }

  function levelButtons() {
    return '<div class="grid cols-2">' + LV.map(function (l) {
      return '<button class="card tile" data-lvl="' + l + '"><span class="ico-chip lvl" aria-hidden="true"><b>' + l + '</b></span><span><strong>' + l + ' · ' + INFO[l][0] + '</strong>' +
        '<small class="muted">' + INFO[l][1] + '</small></span></button>';
    }).join("") + '</div>';
  }

  // ---------- tela inicial do nivelamento ----------
  S.placement = function (arg) {
    var p = ui.profile(), isNew = arg === "novo";
    var bank = ui.content("placement");
    ui.view.innerHTML = '<div class="stack narrow">' + (isNew ? '' : '<div class="row"><button class="btn ghost" data-go="study">' + I("arrow-left") + ' Estudar</button></div>') +
      '<h1>' + (isNew ? "Qual é o seu nível de inglês?" : "Teste de nivelamento") + '</h1>' +
      '<div class="card stack"><div class="row"><span class="ico-chip" aria-hidden="true">' + I("graduation-cap") + '</span><div><h2 style="margin:0">Fazer o teste (5–8 min)</h2>' +
      '<p class="muted" style="margin:0">Perguntas de gramática, vocabulário e leitura que ficam mais difíceis conforme você acerta. No fim, o app indica onde começar.</p></div></div>' +
      (bank.length ? '<button class="btn primary big" id="plStart">Começar o teste</button>' : '<p class="pitfall">Banco de questões não encontrado (content/nivelamento.js).</p>') + '</div>' +
      '<h2>Ou escolha o nível</h2>' + levelButtons() +
      (isNew ? '<button class="btn ghost" id="plSkip">Pular por agora (começo no B2)</button>' : '<p class="muted small">Nível atual: <strong>' + esc(p.level || "B2") + '</strong>. Mudar de nível ajusta quais decks entram na revisão diária e onde a trilha de gramática começa.</p>') +
      '</div>';
    var st = document.getElementById("plStart"); if (st) st.onclick = start;
    var sk = document.getElementById("plSkip"); if (sk) sk.onclick = function () { applyLevel(p, "B2"); ui.go("dashboard"); };
    ui.view.querySelectorAll("[data-lvl]").forEach(function (b) {
      b.onclick = function () { applyLevel(p, b.getAttribute("data-lvl")); ui.toast("Nível " + p.level + " definido."); ui.go("dashboard"); };
    });
  };

  // ---------- teste adaptativo (sobe enquanto acerta 3 de 4) ----------
  var t = null;
  function pool(lvl) { return U.shuffle(ui.content("placement").filter(function (q) { return q.level === lvl; })).slice(0, PER_LEVEL); }
  function start() {
    t = { lvl: 1, passed: -1, tried: {}, qs: pool(LV[1]), i: 0, right: 0, total: 0, lockUntil: 0 };
    question();
  }
  function question() {
    var q = t.qs[t.i];
    if (!q) return endLevel();
    var n = t.total + 1;
    ui.view.innerHTML = '<div class="stack narrow"><div class="session-top"><button class="btn ghost icon-btn" data-go="placement" aria-label="Sair">' + I("x") + '</button>' +
      '<div class="bar"><i style="width:' + Math.min(100, Math.round(100 * t.total / 16)) + '%"></i></div><strong>' + n + '</strong></div>' +
      '<div class="card stack"><div><span class="tag">' + esc(q.kind === "vocab" ? "vocabulário" : q.kind === "reading" ? "leitura" : "gramática") + '</span></div>' +
      '<p class="cloze prewrap">' + esc(q.q).replace(/_{2,}/g, '<strong style="color:var(--primary)">_____</strong>') + '</p>' +
      '<div class="choices">' + q.options.map(function (o, i) { return '<button class="btn choice" data-opt="' + i + '">' + esc(o) + '</button>'; }).join("") + '</div>' +
      '<button class="btn ghost sm" data-opt="-1">Não sei</button></div></div>';
    ui.view.querySelectorAll("[data-opt]").forEach(function (b) {
      b.onclick = function () {
        if (Date.now() < t.lockUntil) return;
        t.lockUntil = Date.now() + 350;
        if (+b.getAttribute("data-opt") === q.answer) t.right++;
        t.i++; t.total++; question();
      };
    });
  }
  function endLevel() {
    t.tried[t.lvl] = t.right;
    var ok = t.right >= PASS;
    if (ok) t.passed = Math.max(t.passed, t.lvl);
    var next = null;
    if (ok && t.lvl < LV.length - 1 && t.tried[t.lvl + 1] === undefined) next = t.lvl + 1;
    else if (!ok && t.passed < 0 && t.lvl > 0 && t.tried[t.lvl - 1] === undefined) next = t.lvl - 1;
    if (next !== null) { t.lvl = next; t.qs = pool(LV[next]); t.i = 0; t.right = 0; return question(); }
    result();
  }
  function result() {
    var p = ui.profile(), lvl = LV[Math.max(0, t.passed)];
    p.placements = p.placements || [];
    var firstToday = !p.placements.some(function (x) { return x.date === ui.today(); });
    p.placements.unshift({ date: ui.today(), level: lvl, answered: t.total });
    App.storage.save();
    if (firstToday) ui.award(20); // XP só uma vez por dia
    if (App.fx) App.fx.confetti();
    ui.view.innerHTML = '<div class="stack narrow"><h1>Seu nível: ' + lvl + '</h1>' +
      '<div class="card stack"><div class="row"><span class="ico-chip lvl big" aria-hidden="true"><b>' + lvl + '</b></span><div><h2 style="margin:0">' + INFO[lvl][0] + '</h2>' +
      '<p class="muted" style="margin:0">' + INFO[lvl][1] + '</p></div></div>' +
      '<p>Vou ajustar o app para você: a revisão diária usa os decks do <strong>' + (lvl === "A1" ? "A1 e A2" : lvl === "C1" ? "B2 e C1" : LV[li(lvl) - 1] + " ao " + LV[li(lvl) + 1]) +
      '</strong>, as leituras sugeridas começam no ' + lvl + ' e a trilha de gramática abre a partir do ' + lvl + ' (os níveis abaixo ficam liberados para revisão).</p>' +
      '<p class="muted small">É uma estimativa rápida. Você pode mudar o nível quando quiser em Ajustes.</p></div>' +
      '<button class="btn primary big" id="plApply">Começar no ' + lvl + '</button>' +
      '<p class="muted small">Prefere outro nível? Escolha abaixo.</p>' + levelButtons() + '</div>';
    document.getElementById("plApply").onclick = function () { applyLevel(p, lvl); ui.go("dashboard"); };
    ui.view.querySelectorAll("[data-lvl]").forEach(function (b) {
      b.onclick = function () { applyLevel(p, b.getAttribute("data-lvl")); ui.go("dashboard"); };
    });
  }

  // ---------- integra com o resto do app ----------
  // Antes das telas que usam decks, liga/desliga os decks novos conforme o nível
  ["dashboard", "study", "session", "decks", "games"].forEach(function (name) {
    var orig = S[name]; if (!orig) return;
    S[name] = function (arg) { syncDecks(ui.profile()); return orig(arg); };
  });

  var origSettings = S.settings;
  S.settings = function (arg) {
    origSettings(arg);
    var p = ui.profile(), anchor = document.getElementById("prefs");
    if (!anchor) return;
    anchor.insertAdjacentHTML("beforebegin", '<div class="card" id="levelCard"><h2>Nível de inglês</h2>' +
      '<div class="row"><span class="ico-chip lvl" aria-hidden="true"><b>' + esc(p.level || "B2") + '</b></span><div><strong>' + esc(INFO[p.level || "B2"][0]) + '</strong>' +
      '<p class="muted small" style="margin:0">Define quais decks entram na revisão e onde a trilha de gramática começa.</p></div></div>' +
      '<div class="row" style="margin-top:12px"><button class="btn" data-go="placement">Mudar nível ou refazer o teste</button></div></div>' +
      '<div class="card" id="audioCard"><h2>Voz e velocidade</h2>' +
      '<p class="muted small">As vozes Kokoro são geradas no seu navegador (na primeira vez baixa cerca de 90 MB). A voz do navegador é instantânea.</p>' +
      '<div class="row"><select class="input" id="voiceSel" style="width:auto">' + App.audio.VOICES.map(function (v) {
        return '<option value="' + v.id + '"' + (v.id === App.audio.prefs().voice ? " selected" : "") + '>' + esc(v.name) + ' — ' + esc(v.desc) + '</option>'; }).join("") + '</select>' +
      '<select class="input" id="rateSel" style="width:auto">' + App.audio.RATES.map(function (r) {
        return '<option value="' + r + '"' + (r === App.audio.prefs().rate ? " selected" : "") + '>' + r + 'x</option>'; }).join("") + '</select>' +
      '<button class="btn" id="voiceTest">' + I("volume-2") + ' Testar</button></div></div>');
    document.getElementById("voiceSel").onchange = function () { App.audio.setPrefs({ voice: this.value }); };
    document.getElementById("rateSel").onchange = function () { App.audio.setPrefs({ rate: +this.value }); };
    document.getElementById("voiceTest").onclick = function () {
      var b = this; b.classList.add("busy");
      var pr = App.audio.say("Hi! This is how I sound. Let's practice English together.");
      var off = function () { b.classList.remove("busy"); };
      if (pr && pr.then) pr.then(off, off); else off();
    };
  };

  App.levels = { LV: LV, INFO: INFO, applyLevel: applyLevel, syncDecks: syncDecks, inBand: inBand, idx: li };
})();
