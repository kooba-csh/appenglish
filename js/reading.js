/* AppEnglish — leitura: temas, níveis, glossário clicável, áudio (player) e tradução por parágrafo. */
(function () {
  "use strict";
  var ui = App.ui, U = App.util, S = App.screens, esc = ui.esc, I = App.icon;
  var LV = ["A1", "A2", "B1", "B2", "C1"];
  var TOPIC_ICON = {
    "Matemática": "calculator", "Física": "atom", "Astronomia": "telescope", "Engenharia": "hard-hat",
    "Xadrez": "crown", "Psicologia": "face-grinning", "Neurociência": "brain", "Curiosidades históricas": "landmark",
    "Desenvolvimento pessoal": "target", "Corpo humano e fitness": "dumbbell", "Filosofia": "scroll", "Biografias": "user-round",
    "Trabalho": "briefcase", "Viagem": "plane", "Tecnologia": "cpu", "Sociedade": "users", "Saúde": "heart-pulse",
    "Cultura": "globe", "Rotina": "sun", "Comida": "utensils", "Cidade": "landmark", "Obra": "hard-hat", "Hobby": "gamepad-2"
  };
  var current = null, filter = "todos";

  function li(l) { var i = LV.indexOf(l); return i < 0 ? 3 : i; }
  function topicIcon(t) { return TOPIC_ICON[cap(t)] || "book-open"; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function sentences(text) { return App.audio ? App.audio.split(text) : [text]; }
  function sentenceWith(text, term) {
    var t = term.toLowerCase(), list = sentences(text);
    for (var i = 0; i < list.length; i++) if (list[i].toLowerCase().indexOf(t) >= 0) return list[i].trim();
    return "";
  }
  function translation(r) {
    var t = r.text_pt || (window.CONTENT && CONTENT.readingTr && CONTENT.readingTr[r.id]) || "";
    return t ? t.split(/\n\n+/) : [];
  }

  // Texto com os termos do glossário viram botões; cada parágrafo ganha "ver tradução"
  function markup(r) {
    var marks = [], txt = r.text, pt = translation(r);
    (r.glossary || []).map(function (g, i) { return { g: g, i: i }; })
      .sort(function (a, b) { return b.g.term.length - a.g.term.length; })
      .forEach(function (x) {
        var idx = txt.toLowerCase().indexOf(x.g.term.toLowerCase());
        if (idx < 0) return;
        var token = "\u0001" + marks.length + "\u0002";
        marks.push({ i: x.i, text: txt.substr(idx, x.g.term.length) });
        txt = txt.slice(0, idx) + token + txt.slice(idx + x.g.term.length);
      });
    var html = esc(txt).replace(/\u0001(\d+)\u0002/g, function (m, n) {
      var mk = marks[+n];
      return '<button class="gloss" data-g="' + mk.i + '">' + esc(mk.text) + '</button>';
    });
    return html.split(/\n\n+/).map(function (par, i) {
      return '<p>' + par.replace(/\n/g, "<br>") + (pt[i] ? ' ' + ui.trToggle(pt[i]) : '') + '</p>';
    }).join("");
  }

  function status(p, r) { return p.readings[r.id]; }

  function suggested(p) {
    var list = ui.content("readings"), my = li(p.level || "B2");
    function unread(f) { return list.filter(function (r) { return !status(p, r) && f(r); })[0]; }
    return unread(function (r) { return li(r.level) === my; }) ||
           unread(function (r) { return Math.abs(li(r.level) - my) <= 1; }) || unread(function () { return true; }) || null;
  }

  function tile(p, r) {
    var st = status(p, r);
    return '<button class="card tile" data-go="reading" data-arg="' + esc(r.id) + '"><span class="ico-chip" aria-hidden="true">' + I(topicIcon(r.topic)) + '</span>' +
      '<span><strong>' + esc(r.title) + '</strong><small class="muted">' + esc(cap(r.topic)) + ' · ' + esc(r.level) +
      (st ? ' · ' + I("circle-check", "ic-sm ok-text") + ' ' + st.best + '/' + r.questions.length : '') + '</small></span></button>';
  }

  S.reading = function (id) {
    var p = ui.profile(), list = ui.content("readings");
    if (id) { var r = list.filter(function (x) { return x.id === id; })[0]; if (r) return open(r); }
    var sug = suggested(p);
    // Temas favoritos (lista do Cleiton) primeiro, depois os outros; "engenharia" e "Engenharia" viram um só
    var FAV = ["Matemática", "Física", "Astronomia", "Engenharia", "Xadrez", "Psicologia", "Neurociência", "Curiosidades históricas",
      "Desenvolvimento pessoal", "Corpo humano e fitness", "Filosofia", "Biografias"];
    var topics = [];
    list.forEach(function (r) { var k = cap(r.topic); if (topics.indexOf(k) < 0) topics.push(k); });
    topics.sort(function (x, y) { var a = FAV.indexOf(x), b = FAV.indexOf(y); a = a < 0 ? 99 : a; b = b < 0 ? 99 : b; return a - b || x.localeCompare(y); });
    var shown = list.filter(function (r) { return filter === "todos" || cap(r.topic) === filter; });
    ui.view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">' + I("arrow-left") + ' Estudar</button></div><h1>Leitura</h1>' +
      '<p class="muted">Leia sem traduzir tudo: entenda pelo contexto, toque nos termos destacados e use <strong>PT</strong> ao fim do parágrafo só quando precisar.</p>' +
      (sug ? '<div class="card highlight"><span class="tag">' + I("sparkles", "ic-sm") + ' leitura do dia · seu nível ' + esc(p.level || "B2") + '</span><h2>' + esc(sug.title) + '</h2><p class="muted">' +
        esc(cap(sug.topic)) + ' · ' + esc(sug.level) + ' · ~' + Math.max(2, Math.round(U.countWords(sug.text) / 130)) + ' min</p><button class="btn primary" data-go="reading" data-arg="' + esc(sug.id) + '">Ler agora</button></div>' : '') +
      '<div class="chips filter" role="group" aria-label="Filtrar por tema">' + ["todos"].concat(topics).map(function (t) {
        return '<button class="chip' + (t === filter ? ' on' : '') + '" data-topicf="' + esc(t) + '" aria-pressed="' + (t === filter) + '">' +
          (t === "todos" ? "Todos" : I(topicIcon(t), "ic-sm") + ' ' + esc(cap(t))) + '</button>';
      }).join("") + '</div>' +
      LV.map(function (lv) {
        var items = shown.filter(function (r) { return r.level === lv; });
        if (!items.length) return "";
        return '<h2>' + lv + '</h2><div class="grid cols-2">' + items.map(function (r) { return tile(p, r); }).join("") + '</div>';
      }).join("") + (list.length ? "" : '<p class="pitfall">Nenhuma leitura em content/.</p>') + '</div>';
    ui.view.querySelectorAll("[data-topicf]").forEach(function (b) {
      b.onclick = function () { filter = b.getAttribute("data-topicf"); S.reading(); };
    });
  };

  function open(r) {
    current = { r: r, answers: [], checked: false };
    render();
  }

  function render() {
    if (current.player) current.player.stop(true);
    var r = current.r, p = ui.profile(), st = status(p, r), hasPt = translation(r).length > 0;
    ui.view.innerHTML = '<div class="stack reader"><div class="row"><button class="btn ghost" data-go="reading">' + I("arrow-left") + ' Leituras</button></div>' +
      '<div class="row"><span class="ico-chip" aria-hidden="true">' + I(topicIcon(r.topic)) + '</span><span class="tag">' + esc(r.level) + '</span><span class="tag">' + esc(cap(r.topic)) + '</span>' +
      (st ? '<span class="tag">já lido</span>' : '') + '</div>' +
      '<h1 class="serif">' + esc(r.title) + '</h1>' +
      '<div id="player"></div>' +
      '<div class="row"><button class="btn ghost sm" id="saveSel" title="Selecione uma palavra ou expressão no texto">' + I("star", "ic-sm") + ' Salvar seleção no Meu deck</button>' +
      (hasPt ? '<button class="btn ghost sm" id="trAll" aria-pressed="false">' + I("languages", "ic-sm") + ' Mostrar toda a tradução</button>' : '') + '</div>' +
      '<article class="card text serif">' + markup(r) + '</article>' +
      '<div id="glossBox"></div>' +
      '<div class="card stack"><h2>Compreensão</h2>' + r.questions.map(function (q, qi) {
        return '<fieldset class="q" data-q="' + qi + '"><legend><strong>' + (qi + 1) + '.</strong> ' + esc(q.q) + '</legend>' + q.options.map(function (o, oi) {
          var cls = "";
          if (current.checked) cls = oi === q.answer ? "right" : (current.answers[qi] === oi ? "wrong" : "");
          return '<label class="opt ' + cls + '"><input type="radio" name="q' + qi + '" value="' + oi + '"' + (current.answers[qi] === oi ? " checked" : "") + (current.checked ? " disabled" : "") + '> ' + esc(o) + '</label>';
        }).join("") + (current.checked ? '<p class="muted small">' + esc(q.explain_pt) + '</p>' : '') + '</fieldset>';
      }).join("") +
      (current.checked ? '<div id="result"></div>' : '<button class="btn primary big" id="check">Corrigir respostas</button>') + '</div>' +
      (current.checked && r.discussion ? '<div class="card"><h2>Agora escreva</h2><p class="serif">' + esc(r.discussion) + '</p>' +
        '<button class="btn primary" data-go="writing" data-arg="reading:' + esc(r.id) + '">' + I("pen-line") + ' Escrever sobre isto</button></div>' : '') +
      '<div class="card"><h2>Glossário</h2><ul class="list">' + (r.glossary || []).map(function (g) {
        return '<li><strong>' + esc(g.term) + '</strong> — ' + esc(g.pt) + '<br><span class="muted small">' + esc(g.meaning) + '</span></li>';
      }).join("") + '</ul></div></div>';
    bind();
    if (current.checked) showResult();
  }

  function showResult() {
    var r = current.r, n = r.questions.filter(function (q, i) { return current.answers[i] === q.answer; }).length;
    var box = document.getElementById("result");
    if (box) box.innerHTML = '<p class="feedback ' + (n / r.questions.length >= 0.8 ? "ok" : n / r.questions.length >= 0.6 ? "almost" : "no") + '">Você acertou ' + n + ' de ' + r.questions.length + '.' +
      (current.gained ? ' +' + current.gained + ' XP' : '') + '</p>';
  }

  function cardFor(g, r) {
    var sentence = sentenceWith(r.text, g.term) || g.term;
    var cloze = U.clozeFromSentence(sentence, g.term);
    var idx = sentence.toLowerCase().indexOf(g.term.toLowerCase());
    var answer = idx >= 0 ? sentence.substr(idx, g.term.length) : g.term;
    return { id: "my-" + U.slug(g.term) + "-" + Date.now().toString(36), term: g.term, meaning: g.meaning || "", pt: g.pt || "",
      examples: [sentence], cloze: cloze && cloze !== "___" ? cloze : "___ (" + (g.pt || g.term) + ")", answer: answer,
      register: "neutral", separable: false, pitfall: "", source: "leitura: " + r.title, created: ui.today() };
  }

  function bind() {
    var r = current.r;
    ui.bindSpeakButtons();
    if (App.audio) current.player = App.audio.player(document.getElementById("player"), r.text);
    var ta = document.getElementById("trAll");
    if (ta) ta.onclick = function () {
      var on = ta.getAttribute("aria-pressed") !== "true";
      ta.setAttribute("aria-pressed", on);
      ta.innerHTML = I("languages", "ic-sm") + (on ? " Esconder a tradução" : " Mostrar toda a tradução");
      ui.view.querySelectorAll("article .tr").forEach(function (s) { s.hidden = !on; });
      ui.view.querySelectorAll("article .trbtn").forEach(function (b) { b.setAttribute("aria-expanded", on); });
    };
    ui.view.querySelectorAll(".gloss").forEach(function (b) {
      b.onclick = function () {
        var g = r.glossary[+b.getAttribute("data-g")];
        var box = document.getElementById("glossBox");
        box.innerHTML = '<div class="card glosscard"><div class="row" style="justify-content:space-between"><strong class="serif" style="font-size:1.2rem">' + esc(g.term) + '</strong>' +
          '<button class="btn ghost sm" id="glossClose">fechar</button></div><p>' + esc(g.pt) + '</p><p class="muted">' + esc(g.meaning) + '</p>' +
          '<div class="row">' + ui.speakBtn(g.term) + '<button class="btn sm" id="glossSave">Salvar no Meu deck</button></div></div>';
        ui.bindSpeakButtons(box);
        document.getElementById("glossClose").onclick = function () { box.innerHTML = ""; };
        document.getElementById("glossSave").onclick = function () {
          var n = ui.addMyCards([cardFor(g, r)]);
          ui.toast(n ? "Salvo no Meu deck — vai aparecer nas revisões." : "Já está no Meu deck.");
        };
        box.scrollIntoView({ block: "nearest", behavior: "smooth" });
      };
    });
    document.getElementById("saveSel").onclick = function () {
      var sel = String(window.getSelection ? window.getSelection() : "").trim().replace(/\s+/g, " ");
      if (!sel) { ui.toast("Selecione uma palavra ou expressão no texto primeiro."); return; }
      if (sel.split(" ").length > 8) { ui.toast("Selecione no máximo 8 palavras."); return; }
      var pt = prompt('Significado em português de "' + sel + '":', "");
      if (pt === null) return;
      var n = ui.addMyCards([cardFor({ term: sel, pt: pt.trim() || "(sem tradução)", meaning: "" }, r)]);
      ui.toast(n ? "Salvo no Meu deck." : "Já está no Meu deck.");
    };
    var chk = document.getElementById("check");
    if (chk) chk.onclick = function () {
      r.questions.forEach(function (q, qi) {
        var c = ui.view.querySelector('input[name="q' + qi + '"]:checked');
        current.answers[qi] = c ? +c.value : -1;
      });
      if (current.answers.some(function (a) { return a < 0; }) && !confirm("Há perguntas sem resposta. Corrigir assim mesmo?")) return;
      var p = ui.profile(), n = r.questions.filter(function (q, i) { return current.answers[i] === q.answer; }).length;
      var prev = p.readings[r.id];
      var xp = prev ? n : n * 5 + 10;  // 1ª leitura vale mais; releitura vale pouco
      p.readings[r.id] = { best: Math.max(n, prev ? prev.best : 0), last: n, date: ui.today(), attempts: (prev ? prev.attempts : 0) + 1 };
      current.checked = true;
      current.gained = ui.award(xp);
      ui.markPlan("reading");
      if (App.fx && n === r.questions.length) App.fx.confetti();
      render();
      var res = document.getElementById("result"); if (res) res.scrollIntoView({ block: "center" });
    };
  }

  App.reading = { sentences: sentences, markup: markup, topicIcon: topicIcon };
})();
