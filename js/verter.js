/* AppEnglish — Verter (português → inglês): você monta a frase em inglês, com dicas em 3 passos.
   Usa as frases de exemplo dos seus decks ativos que têm tradução (CONTENT.tr). */
(function () {
  "use strict";
  var ui = App.ui, S = App.screens, U = App.util, esc = ui.esc, I = App.icon;
  var ROUND = 8, MAX_WORDS = 20;
  var run = null;

  function profileStats() { var p = ui.profile(); p.verter = p.verter || { done: 0, right: 0 }; return p.verter; }

  function pool() {
    var p = ui.profile(), out = [], seen = {};
    var items = ui.itemsOf(ui.activeDecks(p));
    var started = items.filter(function (it) { return p.cards[it.id] && p.cards[it.id].state !== "new"; });
    (started.length >= 10 ? started : items).forEach(function (it) {
      (it.examples || []).forEach(function (en) {
        var pt = ui.trOf(en);
        if (!pt || seen[en] || U.countWords(en) > MAX_WORDS) return;
        seen[en] = 1; out.push({ en: en, pt: pt, item: it });
      });
    });
    return out;
  }

  // Passo 3: esqueleto — primeira letra de cada palavra e o resto em traços
  function skeleton(en) {
    return en.split(/\s+/).map(function (w) {
      var m = w.match(/^([^A-Za-z]*)([A-Za-z])([A-Za-z'’-]*)(.*)$/);
      return m ? m[1] + m[2] + m[3].replace(/[A-Za-z]/g, "_") + m[4] : w;
    }).join(" ");
  }
  function opening(en) {
    var w = en.split(/\s+/), n = Math.max(1, Math.ceil(w.length / 3));
    return w.slice(0, n).join(" ") + " …";
  }

  S.verter = function () {
    var list = U.shuffle(pool()).slice(0, ROUND);
    if (!list.length) {
      ui.view.innerHTML = '<div class="stack narrow"><div class="row"><button class="btn ghost" data-go="study">' + I("arrow-left") + ' Estudar</button></div>' +
        '<h1>Verter frases</h1><p class="pitfall">Nenhuma frase com tradução nos seus decks ativos. Ative um deck em Estudar → Gerenciar decks.</p></div>';
      return;
    }
    run = { list: list, i: 0, right: 0, xp: 0 };
    intro();
  };

  function intro() {
    ui.view.innerHTML = '<div class="stack narrow"><div class="row"><button class="btn ghost" data-go="study">' + I("arrow-left") + ' Estudar</button></div>' +
      '<h1>Verter frases (PT → EN)</h1>' +
      '<div class="card stack"><p>Você vê uma frase em <strong>português</strong> e escreve em <strong>inglês</strong>. É o caminho inverso da leitura — e o que mais treina a fala.</p>' +
      '<p class="muted">Travou? Use as dicas em 3 passos:</p><ol class="steps3">' +
      '<li><strong>Expressão-chave</strong> — qual expressão do deck a frase usa.</li>' +
      '<li><strong>Começo</strong> — como a frase começa (quem faz o quê).</li>' +
      '<li><strong>Esqueleto</strong> — a primeira letra de cada palavra.</li></ol>' +
      '<p class="muted small">Sem dica vale mais XP. Outra forma correta também vale — se tiver dúvida, peça para a IA conferir.</p></div>' +
      '<button class="btn primary big" id="vStart">Começar (' + run.list.length + ' frases)</button></div>';
    document.getElementById("vStart").onclick = question;
  }

  function header() {
    return '<div class="session-top"><button class="btn ghost icon-btn" data-go="study" aria-label="Sair">' + I("x") + '</button>' +
      '<div class="bar"><i style="width:' + Math.round(100 * run.i / run.list.length) + '%"></i></div><strong>' + (run.i + 1) + '/' + run.list.length + '</strong></div>';
  }

  function question() {
    var q = run.list[run.i];
    if (!q) return finish();
    q.hints = q.hints || 0;
    var hints = [
      'Expressão-chave: <strong>' + esc(q.item.term) + '</strong> <span class="muted">(' + esc(q.item.pt) + ')</span>',
      'Começo: <span class="serif">' + esc(opening(q.en)) + '</span>',
      'Esqueleto: <span class="serif skel">' + esc(skeleton(q.en)) + '</span>'
    ];
    ui.view.innerHTML = '<div class="stack narrow">' + header() +
      '<div class="card stack"><div><span class="tag">' + I("languages", "ic-sm") + ' português → inglês</span></div>' +
      '<div class="verter-q">' + (App.pics ? App.pics.imgs(q.item.id, "md") : '') + '<p class="cloze">' + esc(q.pt) + '</p></div>' +
      (q.hints ? '<ol class="hints">' + hints.slice(0, q.hints).map(function (h) { return '<li>' + h + '</li>'; }).join("") + '</ol>' : '') +
      '<form id="vForm" class="stack"><textarea class="input" id="vIn" rows="2" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Write it in English…"></textarea>' +
      '<div class="row"><button class="btn primary" type="submit">Conferir</button>' +
      (q.hints < 3 ? '<button class="btn" type="button" id="vHint">' + I("lightbulb") + ' Dica ' + (q.hints + 1) + ' de 3</button>' : '') +
      '<button class="btn ghost" type="button" id="vSkip">Não sei</button></div></form></div></div>';
    var inp = document.getElementById("vIn");
    if (q.typed) inp.value = q.typed;
    setTimeout(function () { inp.focus(); }, 30);
    var hb = document.getElementById("vHint");
    if (hb) hb.onclick = function () { q.typed = inp.value; q.hints++; question(); };
    document.getElementById("vSkip").onclick = function () { q.typed = inp.value; check(q, ""); };
    inp.onkeydown = function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); document.getElementById("vForm").requestSubmit ? document.getElementById("vForm").requestSubmit() : check(q, inp.value); } };
    document.getElementById("vForm").onsubmit = function (e) { e.preventDefault(); check(q, inp.value); };
  }

  function check(q, typed) {
    typed = String(typed || "").trim();
    var exact = typed && U.answerMatches(typed, q.en, []);
    var d = U.wordDiff(q.en, typed);
    var verdict = exact ? "ok" : (typed && d.score >= 0.85 ? "almost" : "no");
    show(q, typed, verdict, d, null);
  }

  function points(q) { return Math.max(1, 4 - q.hints); }

  function show(q, typed, verdict, d, aiNote) {
    if (!q.scored && (verdict === "ok" || verdict === "almost")) { q.scored = true; run.right++; run.xp += points(q); }
    var msg = verdict === "ok" ? "Perfeito!" : verdict === "almost" ? "Quase lá — compare as palavras destacadas." : (typed ? "Ainda não. Veja uma forma correta:" : "Uma forma correta:");
    ui.view.innerHTML = '<div class="stack narrow">' + header() +
      '<div class="card stack shadow"><p class="muted">' + esc(q.pt) + '</p>' +
      '<p class="feedback ' + verdict + '">' + msg + (q.scored ? ' +' + points(q) + ' XP' : '') + '</p>' +
      '<p class="cloze">' + d.tokens.map(function (t) { return '<span class="' + (t.ok ? "hit" : "miss") + '">' + esc(t.w) + '</span>'; }).join(" ") + ' ' + ui.speakBtn(q.en) + '</p>' +
      (typed ? '<p class="muted small">Você escreveu: <span class="serif">' + esc(typed) + '</span></p>' : '') +
      (aiNote || '') +
      (App.pics && App.pics.has(q.item.id) ? App.pics.block(q.item) : '') +
      '<div class="row" id="vActs">' +
      (verdict !== "ok" && typed && !q.scored && !aiNote ? (App.ai.hasKey(ui.profile()) ? '<button class="btn" id="vAi">' + I("sparkles") + ' Minha versão está certa? Perguntar à IA</button>'
                                                           : '<button class="btn" id="vMine">' + I("check") + ' Minha versão também está certa</button>') : '') +
      '<button class="btn primary" id="vNext">Próxima</button></div></div></div>';
    ui.bindSpeakButtons();
    if (verdict === "ok") ui.speak(q.en);
    document.getElementById("vNext").onclick = function () { run.i++; question(); };
    var mine = document.getElementById("vMine");
    if (mine) mine.onclick = function () { show(q, typed, "ok", d, '<p class="muted small">Marcado como certo por você. Na dúvida, compare com a frase acima e leia as duas em voz alta.</p>'); };
    var ab = document.getElementById("vAi");
    if (ab) ab.onclick = function () { askAI(q, typed, d, ab); };
  }

  function askAI(q, typed, d, btn) {
    var p = ui.profile();
    btn.classList.add("busy");
    var fast = { ai: Object.assign({}, p.ai, { model: "claude-haiku-5-5" }) };
    var system = "You are a precise English teacher for a Brazilian learner. The student translated a Portuguese sentence into English. " +
      "Judge ONLY whether the student's sentence is grammatically correct and conveys the same meaning naturally (it may differ from the reference). " +
      'Reply with JSON only: {"ok": true|false, "better": "a corrected or more natural version", "note_pt": "one short explanation in Brazilian Portuguese"}';
    var user = "Portuguese: " + q.pt + "\nReference: " + q.en + "\nStudent: " + typed;
    App.ai.call(fast, system, [{ role: "user", content: user }], 300, { timeout: 40000, idle: 25000 }).then(function (txt) {
      var j = U.parseJSONLoose(txt) || {};
      if (!document.body.contains(btn)) return;
      var note = '<div class="card ' + (j.ok ? 'glosscard' : '') + '"><p><strong>IA:</strong> ' + esc(j.note_pt || "") + '</p>' +
        (j.better ? '<p class="serif">' + esc(j.better) + ' ' + ui.speakBtn(j.better) + '</p>' : '') + '</div>';
      show(q, typed, j.ok ? "ok" : "no", d, note);
    }, function (err) {
      if (!document.body.contains(btn)) return;
      btn.classList.remove("busy");
      ui.toast(err.message);
    });
  }

  function finish() {
    var st = profileStats();
    st.done += run.list.length; st.right += run.right;
    App.storage.save();
    var gained = run.xp ? ui.award(run.xp) : 0;
    if (run.right) ui.markPlan("output");
    if (App.fx && run.right === run.list.length) App.fx.confetti();
    ui.view.innerHTML = '<div class="stack narrow"><h1>Fim da rodada</h1><div class="card stack">' +
      '<p><strong>' + run.right + ' de ' + run.list.length + '</strong> frases certas.</p>' +
      '<p class="feedback ok">+' + gained + ' XP</p>' +
      '<p class="muted small">Dica: leia em voz alta as frases que errou. Elas voltam em outras rodadas.</p></div>' +
      '<div class="row"><button class="btn primary" id="vAgain">' + I("rotate-ccw") + ' Outra rodada</button><button class="btn" data-go="dashboard">Painel</button></div></div>';
    document.getElementById("vAgain").onclick = function () { S.verter(); };
  }

  App.verter = { skeleton: skeleton, opening: opening, pool: pool };
})();
