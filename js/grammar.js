/* AppEnglish — Fase 2: trilha de gramática com lições, 10 exercícios e desbloqueio por desempenho (≥ 80%). */
(function () {
  "use strict";
  var ui = App.ui, U = App.util, S = App.screens, esc = ui.esc;
  var PASS = 0.8, PASS_BONUS = 15;
  var run = null; // { t, i, correct, wrong: [], answered: bool, last: {ok, value} }

  var LV = ["A1", "A2", "B1", "B2", "C1"];
  function li(l) { var i = LV.indexOf(l); return i < 0 ? 3 : i; }
  // Trilha ordenada por nível e, dentro do nível, pela ordem da lição
  function topics() { return ui.content("grammar").slice().sort(function (a, b) { return li(a.level) - li(b.level) || a.order - b.order; }); }
  function st(p, t) { return p.grammar[t.id]; }
  // Abaixo do seu nível: livre (revisão). No seu nível e acima: em sequência.
  function unlocked(p, list, i) {
    var my = li(p.level || "B2"), t = list[i];
    if (li(t.level) < my || !!st(p, t)) return true;
    var first = -1;
    for (var k = 0; k < list.length; k++) if (li(list[k].level) >= my) { first = k; break; }
    return i === first || i === 0 || !!(st(p, list[i - 1]) && st(p, list[i - 1]).passed);
  }

  S.grammar = function (id) {
    var p = ui.profile(), list = topics();
    if (id) { var t = list.filter(function (x) { return x.id === id; })[0]; if (t) return lesson(t); }
    var nextIdx = -1;
    list.forEach(function (t, i) { if (nextIdx < 0 && !(st(p, t) && st(p, t).passed) && unlocked(p, list, i)) nextIdx = i; });
    ui.view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">← Estudar</button></div><h1>Gramática</h1>' +
      '<p class="muted">Uma trilha com os pontos que mais derrubam brasileiros no B2–C1. Acerte 8 de 10 para concluir a lição e liberar a próxima.</p>' +
      '<ol class="track">' + list.map(function (t, i) {
        var s = st(p, t), open = unlocked(p, list, i);
        var cls = s && s.passed ? "done" : (i === nextIdx ? "current" : (open ? "" : "locked"));
        return (i === 0 || list[i - 1].level !== t.level ? '<li class="trackhead">' + esc(t.level) + (li(t.level) < li(p.level || "B2") ? ' · revisão' : '') + '</li>' : '') +
          '<li class="' + cls + '"><button class="trackbtn" data-topic="' + esc(t.id) + '" data-open="' + (open ? 1 : 0) + '">' +
          '<span class="num">' + (s && s.passed ? App.icon("check") : (open ? t.order : App.icon("lock"))) + '</span>' +
          '<span><strong>' + esc(t.title) + '</strong><small class="muted">' + esc(t.level) +
          (s ? ' · melhor ' + s.best + '/10' : '') + (i === nextIdx ? ' · próxima lição' : '') + '</small></span></button></li>';
      }).join("") + '</ol>' + (list.length ? "" : '<p class="pitfall">Nenhuma lição em content/grammar.js.</p>') + '</div>';
    ui.view.querySelectorAll("[data-topic]").forEach(function (b) {
      b.onclick = function () {
        if (b.getAttribute("data-open") !== "1" && !confirm("Recomendo concluir a lição anterior primeiro. Abrir esta assim mesmo?")) return;
        ui.go("grammar", b.getAttribute("data-topic"));
      };
    });
  };

  function lesson(t) {
    var p = ui.profile(), s = st(p, t);
    ui.view.innerHTML = '<div class="stack narrow"><div class="row"><button class="btn ghost" data-go="grammar">← Trilha</button></div>' +
      '<div><span class="tag">' + esc(t.level) + '</span><span class="tag">lição ' + t.order + '</span>' + (s && s.passed ? '<span class="tag">concluída</span>' : '') + '</div>' +
      '<h1>' + esc(t.title) + '</h1><div class="card"><p>' + esc(t.summary_pt) + '</p></div>' +
      '<div class="card stack"><h2>Regras</h2>' + (t.rules || []).map(function (r) {
        return '<div><p><strong>' + esc(r.rule_pt) + '</strong></p><ul class="examples">' + (r.examples || []).map(function (e) {
          return '<li class="serif">' + esc(e) + ' ' + ui.speakBtn(e, true) + ui.trToggle(ui.trOf(e)) + '</li>'; }).join("") + '</ul></div>';
      }).join("") + '</div>' +
      ((t.pitfalls_pt || []).length ? '<div class="card"><h2>Cuidado</h2>' + t.pitfalls_pt.map(function (x) { return '<p class="pitfall">' + esc(x) + '</p>'; }).join("") + '</div>' : '') +
      '<button class="btn primary big" id="practice">Praticar: ' + t.exercises.length + ' exercícios</button></div>';
    ui.bindSpeakButtons();
    document.getElementById("practice").onclick = function () { run = { t: t, i: 0, correct: 0, wrong: [], answered: false }; exercise(); };
  }

  var TYPE_LABEL = { mc: "escolha a opção", fix: "corrija a frase", transform: "reescreva" };

  function exercise() {
    var t = run.t, e = t.exercises[run.i];
    if (!e) return finish();
    var pct = Math.round(100 * run.i / t.exercises.length);
    var html = '<div class="stack narrow"><div class="session-top"><button class="btn ghost" data-go="grammar" aria-label="Sair">' + App.icon("x") + '</button>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div><strong>' + (run.i + 1) + '/' + t.exercises.length + '</strong></div>' +
      '<div class="card stack"><div><span class="tag">' + esc(t.title) + '</span><span class="tag">' + (TYPE_LABEL[e.type] || e.type) + '</span></div>';
    if (e.type === "mc") {
      html += '<p class="cloze">' + esc(e.prompt).replace(/_{2,}/g, '<strong style="color:var(--accent)">_____</strong>') + '</p><div class="choices">' +
        e.options.map(function (o, i) {
          var cls = "";
          if (run.answered) cls = i === e.answer ? "right" : (run.last.value === i ? "wrong" : "");
          return '<button class="btn choice ' + cls + '" data-opt="' + i + '"' + (run.answered ? " disabled" : "") + '>' + esc(o) + '</button>';
        }).join("") + '</div>';
    } else {
      html += (e.type === "fix" ? '<p class="muted">Esta frase tem um erro. Escreva a frase inteira corrigida:</p><p class="cloze">' + esc(e.prompt) + '</p>'
                                : '<p class="cloze" style="font-size:1.15rem">' + esc(e.prompt) + '</p>') +
        '<form id="exForm" class="stack"><input class="input" id="exInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Digite a frase completa"' +
        (run.answered ? ' disabled value="' + esc(run.last.value) + '"' : '') + '>' + (run.answered ? '' : '<button class="btn primary" type="submit">Verificar</button>') + '</form>';
    }
    if (run.answered) {
      var good = run.last.ok;
      html += '<p class="feedback ' + (good ? "ok" : "no") + '">' + (good ? "Correto!" : "Resposta esperada: " + esc(e.type === "mc" ? e.options[e.answer] : e.answer)) + '</p>' +
        (e.type !== "mc" ? '<p class="serif">' + esc(e.answer) + ' ' + ui.speakBtn(e.answer, true) + '</p>' : '') +
        '<p class="muted">' + esc(e.explain_pt) + '</p>' +
        (!good && e.type !== "mc" ? '<button class="btn ghost sm" id="acceptMine">Minha resposta também está certa</button>' : '') +
        '<button class="btn primary big" id="nextEx">' + (run.i + 1 < t.exercises.length ? "Próximo" : "Ver resultado") + '</button>';
    }
    html += '</div></div>';
    ui.view.innerHTML = html;
    ui.bindSpeakButtons();
    ui.view.querySelectorAll("[data-opt]").forEach(function (b) { b.onclick = function () { answer(+b.getAttribute("data-opt")); }; });
    var f = document.getElementById("exForm");
    if (f && !run.answered) {
      var inp = document.getElementById("exInput"); setTimeout(function () { inp.focus(); }, 30);
      if (e.type === "fix") inp.value = e.prompt;
      f.onsubmit = function (ev) { ev.preventDefault(); if (inp.value.trim()) answer(inp.value.trim()); };
    }
    var nx = document.getElementById("nextEx");
    if (nx) { nx.onclick = function () { run.i++; run.answered = false; exercise(); }; setTimeout(function () { nx.focus(); }, 30); }
    var am = document.getElementById("acceptMine");
    if (am) am.onclick = function () {
      run.correct++; run.wrong = run.wrong.filter(function (x) { return x !== e; });
      run.last.ok = true; exercise();
    };
  }

  function answer(value) {
    var e = run.t.exercises[run.i];
    var ok = e.type === "mc" ? value === e.answer : U.answerMatches(value, e.answer, e.alternatives);
    run.answered = true; run.last = { ok: ok, value: value };
    if (ok) run.correct++; else run.wrong.push(e);
    exercise();
  }

  function errorCard(e, t) {
    var sentence, cloze, ans;
    if (e.type === "mc") {
      ans = e.options[e.answer];
      sentence = e.prompt.replace(/_{2,}/, ans);
      cloze = e.prompt.replace(/_{2,}/, "___");
      if (cloze.indexOf("___") < 0) cloze = e.prompt + " → ___";
    } else {
      ans = e.answer; sentence = e.answer;
      cloze = (e.type === "fix" ? "Corrija: " : "") + e.prompt + " → ___";
    }
    return { id: "my-gr-" + U.slug(ans) + "-" + Date.now().toString(36) + Math.floor(Math.random() * 1000), term: ans, meaning: e.explain_pt || "",
      pt: "Gramática: " + t.title, examples: [sentence], cloze: cloze, answer: ans, register: "neutral", separable: false, pitfall: "",
      source: "gramática", created: ui.today() };
  }

  function finish() {
    var t = run.t, p = ui.profile(), n = run.correct, total = t.exercises.length;
    var prev = p.grammar[t.id], passed = n / total >= PASS, firstPass = passed && !(prev && prev.passed);
    p.grammar[t.id] = { best: Math.max(n, prev ? prev.best : 0), last: n, passed: !!(passed || (prev && prev.passed)),
                        attempts: (prev ? prev.attempts : 0) + 1, date: ui.today() };
    var gained = ui.award((prev && prev.passed ? 1 : 3) * n + (firstPass ? PASS_BONUS : 0));
    ui.markPlan("grammar");
    var list = topics(), idx = list.indexOf(t), next = list[idx + 1];
    ui.view.innerHTML = '<div class="stack narrow"><h1>' + (passed ? "Lição concluída!" : "Quase lá") + '</h1>' +
      '<div class="grid cols-2"><div class="card stat"><span class="k">Acertos</span><span class="v">' + n + '/' + total + '</span></div>' +
      '<div class="card stat"><span class="k">XP ganho</span><span class="v">+' + gained + '</span></div></div>' +
      '<div class="card"><p>' + (passed ? (firstPass && next ? "Você liberou a próxima lição: <strong>" + esc(next.title) + "</strong>." : "Ótimo domínio deste ponto.")
        : "Você precisa de " + Math.ceil(PASS * total) + " acertos para concluir. Releia as regras e tente de novo — os exercícios são os mesmos, o objetivo é fixar.") + '</p></div>' +
      (run.wrong.length ? '<div class="card stack"><h2>Para revisar</h2><ul class="list">' + run.wrong.map(function (e) {
        return '<li class="serif">' + esc(e.type === "mc" ? e.prompt.replace(/_{2,}/, e.options[e.answer]) : e.answer) + '</li>'; }).join("") + '</ul>' +
        '<button class="btn" id="wrongToDeck">Enviar para o Meu deck (revisão espaçada)</button></div>' : '') +
      '<div class="row">' + (passed && next ? '<button class="btn primary" data-go="grammar" data-arg="' + esc(next.id) + '">Próxima lição</button>' : '') +
      '<button class="btn' + (passed ? "" : " primary") + '" data-go="grammar" data-arg="' + esc(t.id) + '">' + (passed ? "Rever lição" : "Tentar de novo") + '</button>' +
      '<button class="btn ghost" data-go="dashboard">Painel</button></div></div>';
    var wb = document.getElementById("wrongToDeck");
    if (wb) wb.onclick = function () {
      var k = ui.addMyCards(run.wrong.map(function (e) { return errorCard(e, t); }));
      wb.disabled = true; wb.textContent = k ? k + " item(ns) no Meu deck ✓" : "Já estavam no Meu deck";
    };
  }
})();
