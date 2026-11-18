/* AppEnglish — Fase 2: leitura com glossário clicável, áudio e perguntas de compreensão. */
(function () {
  "use strict";
  var ui = App.ui, U = App.util, S = App.screens, esc = ui.esc;
  var current = null; // { r, answers: [], checked: bool }

  function sentences(text) { return String(text).replace(/\n+/g, " ").match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [text]; }
  function sentenceWith(text, term) {
    var t = term.toLowerCase(), list = sentences(text);
    for (var i = 0; i < list.length; i++) if (list[i].toLowerCase().indexOf(t) >= 0) return list[i].trim();
    return "";
  }

  // Texto com os termos do glossário viram botões
  function markup(r) {
    var marks = [], txt = r.text;
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
    return html.split(/\n\n+/).map(function (par) { return '<p>' + par.replace(/\n/g, "<br>") + '</p>'; }).join("");
  }

  function status(p, r) { return p.readings[r.id]; }

  function suggested(p) {
    var list = ui.content("readings");
    return list.filter(function (r) { return !status(p, r) && r.level === "B2"; })[0] ||
           list.filter(function (r) { return !status(p, r); })[0] || null;
  }

  S.reading = function (id) {
    var p = ui.profile(), list = ui.content("readings");
    if (id) { var r = list.filter(function (x) { return x.id === id; })[0]; if (r) return open(r); }
    var sug = suggested(p);
    ui.view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">← Estudar</button></div><h1>Leitura</h1>' +
      '<p class="muted">Leia sem traduzir tudo: entenda pelo contexto, clique nos termos destacados quando precisar e ouça o texto para treinar o ouvido.</p>' +
      (sug ? '<div class="card highlight"><span class="tag">leitura do dia</span><h2>' + esc(sug.title) + '</h2><p class="muted">' + esc(sug.level) + ' · ' + esc(sug.topic) +
        ' · ~' + Math.max(2, Math.round(U.countWords(sug.text) / 130)) + ' min</p><button class="btn primary" data-go="reading" data-arg="' + esc(sug.id) + '">Ler agora</button></div>' : '') +
      ["B2", "C1"].map(function (lv) {
        var items = list.filter(function (r) { return r.level === lv; });
        if (!items.length) return "";
        return '<h2>' + lv + '</h2><div class="grid cols-2">' + items.map(function (r) {
          var st = status(p, r);
          return '<button class="card tile" data-go="reading" data-arg="' + esc(r.id) + '"><span class="ico" aria-hidden="true">' + (st ? "✅" : "📄") + '</span><span><strong>' + esc(r.title) + '</strong>' +
            '<small class="muted">' + esc(r.topic) + (st ? ' · melhor nota ' + st.best + '/' + r.questions.length : ' · não lido') + '</small></span></button>';
        }).join("") + '</div>';
      }).join("") + (list.length ? "" : '<p class="pitfall">Nenhuma leitura em content/readings.js.</p>') + '</div>';
  };

  function open(r) {
    current = { r: r, answers: [], checked: false };
    render();
  }

  function render() {
    var r = current.r, p = ui.profile(), st = status(p, r);
    ui.view.innerHTML = '<div class="stack reader"><div class="row"><button class="btn ghost" data-go="reading">← Leituras</button></div>' +
      '<div><span class="tag">' + esc(r.level) + '</span><span class="tag">' + esc(r.topic) + '</span>' + (st ? '<span class="tag">já lido</span>' : '') + '</div>' +
      '<h1 class="serif">' + esc(r.title) + '</h1>' +
      '<div class="row"><button class="btn" id="listen">🔊 Ouvir o texto</button><select class="input" id="rate" style="width:auto"><option value="0.85">devagar</option><option value="1" selected>normal</option></select>' +
      '<button class="btn ghost" id="saveSel" title="Selecione uma palavra ou expressão no texto">＋ Salvar seleção no Meu deck</button></div>' +
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
        '<button class="btn primary" data-go="writing" data-arg="reading:' + esc(r.id) + '">Escrever sobre isto</button></div>' : '') +
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
    var listening = false, queue = [];
    var lb = document.getElementById("listen");
    function stopAll() { listening = false; queue = []; ui.stopSpeaking(); lb.textContent = "🔊 Ouvir o texto"; }
    function nextSentence() {
      if (!listening || !document.body.contains(lb)) return;
      var s = queue.shift();
      if (!s) { stopAll(); return; }
      ui.speak(s, { rate: +document.getElementById("rate").value, onend: nextSentence });
    }
    lb.onclick = function () {
      if (listening) { stopAll(); return; }
      listening = true; lb.textContent = "⏹ Parar";
      queue = sentences(r.text).map(function (s) { return s.trim(); }).filter(Boolean);
      nextSentence();
    };
    ui.view.querySelectorAll(".gloss").forEach(function (b) {
      b.onclick = function () {
        var g = r.glossary[+b.getAttribute("data-g")];
        var box = document.getElementById("glossBox");
        box.innerHTML = '<div class="card glosscard"><div class="row" style="justify-content:space-between"><strong class="serif" style="font-size:1.2rem">' + esc(g.term) + '</strong>' +
          '<button class="btn ghost sm" id="glossClose">fechar</button></div><p>' + esc(g.pt) + '</p><p class="muted">' + esc(g.meaning) + '</p>' +
          '<div class="row"><button class="speak" data-say="' + esc(g.term) + '" aria-label="Ouvir">🔊</button><button class="btn sm" id="glossSave">Salvar no Meu deck</button></div></div>';
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
      render();
      var res = document.getElementById("result"); if (res) res.scrollIntoView({ block: "center" });
    };
  }

  App.reading = { sentences: sentences, markup: markup };
})();
