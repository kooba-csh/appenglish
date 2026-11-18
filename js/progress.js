/* AppEnglish — Fase 6: estatísticas, conquistas e prova de nível. */
(function () {
  "use strict";
  var ui = App.ui, U = App.util, S = App.screens, esc = ui.esc, srs = App.srs, game = App.game;

  function stats(p) {
    var cards = Object.keys(p.cards).map(function (k) { return p.cards[k]; });
    var days = Object.keys(p.days).filter(function (k) { return p.days[k].xp > 0; });
    var fbs = p.writings.filter(function (w) { return w.feedback; });
    return {
      xp: p.xp || 0,
      activeDays: days.length,
      goalDays: Object.keys(p.days).filter(function (k) { return p.days[k].goalMet; }).length,
      fullDays: Object.keys(p.days).filter(function (k) { return p.days[k].plan && p.days[k].plan.bonus; }).length,
      seen: cards.filter(function (c) { return c.state !== "new"; }).length,
      mastered: cards.filter(function (c) { return c.state === "mastered"; }).length,
      reviews: Object.keys(p.days).reduce(function (a, k) { return a + (p.days[k].reviews || 0); }, 0),
      readings: Object.keys(p.readings).length,
      grammar: Object.keys(p.grammar).filter(function (k) { return p.grammar[k].passed; }).length,
      writings: p.writings.length,
      writingAvg: fbs.length ? Math.round(10 * fbs.reduce(function (a, w) { return a + App.ai.total(w.feedback); }, 0) / fbs.length) / 10 : null,
      bosses: p.writings.filter(function (w) { return w.bossWon; }).length,
      shadowing: Object.keys(p.shadowing).length,
      conversations: p.conversations.length,
      sentences: p.sentences.length,
      myCards: p.myCards.length,
      best: (p.streak && p.streak.best) || 0
    };
  }

  var BADGES = [
    { id: "first-day", icon: "🌱", name: "Primeiro passo", desc: "Ganhar XP no primeiro dia", test: function (s) { return s.activeDays >= 1; } },
    { id: "full-day", icon: "🗓️", name: "Dia completo", desc: "Cumprir as 4 etapas do plano num dia", test: function (s) { return s.fullDays >= 1; } },
    { id: "streak-7", icon: "🔥", name: "Uma semana", desc: "Sequência de 7 dias", test: function (s) { return s.best >= 7; } },
    { id: "streak-30", icon: "🏆", name: "Um mês", desc: "Sequência de 30 dias", test: function (s) { return s.best >= 30; } },
    { id: "seen-50", icon: "🃏", name: "50 expressões", desc: "Estudar 50 itens de vocabulário", test: function (s) { return s.seen >= 50; } },
    { id: "mastered-25", icon: "🧠", name: "Memória longa", desc: "Dominar 25 itens (21+ dias)", test: function (s) { return s.mastered >= 25; } },
    { id: "mastered-100", icon: "💎", name: "Vocabulário sólido", desc: "Dominar 100 itens", test: function (s) { return s.mastered >= 100; } },
    { id: "reader-5", icon: "📖", name: "Leitor", desc: "Ler 5 textos", test: function (s) { return s.readings >= 5; } },
    { id: "reader-all", icon: "📚", name: "Biblioteca", desc: "Ler todos os textos", test: function (s) { return s.readings >= ui.content("readings").length && s.readings > 0; } },
    { id: "grammar-4", icon: "🧩", name: "Base firme", desc: "Concluir 4 lições de gramática", test: function (s) { return s.grammar >= 4; } },
    { id: "grammar-all", icon: "🎓", name: "Trilha completa", desc: "Concluir todas as lições", test: function (s) { return s.grammar >= ui.content("grammar").length && s.grammar > 0; } },
    { id: "writer-1", icon: "✍️", name: "Primeiro texto", desc: "Escrever e enviar um texto", test: function (s) { return s.writings >= 1; } },
    { id: "writer-10", icon: "🖋️", name: "Escritor", desc: "Escrever 10 textos", test: function (s) { return s.writings >= 10; } },
    { id: "boss-1", icon: "⚔️", name: "Caçador de chefões", desc: "Vencer um chefão semanal", test: function (s) { return s.bosses >= 1; } },
    { id: "speaker-20", icon: "🎙️", name: "Voz ativa", desc: "Praticar 20 frases de shadowing", test: function (s) { return s.shadowing >= 20; } },
    { id: "talk-3", icon: "💬", name: "Conversador", desc: "Fazer 3 conversas", test: function (s) { return s.conversations >= 3; } },
    { id: "sentences-25", icon: "💡", name: "Autor de frases", desc: "Criar 25 frases próprias", test: function (s) { return s.sentences >= 25; } },
    { id: "errors-10", icon: "🔧", name: "Aprendendo com erros", desc: "Ter 10 cards no Meu deck", test: function (s) { return s.myCards >= 10; } }
  ];

  function check() {
    var p = ui.profile(); if (!p) return;
    var s = stats(p), fresh = [];
    BADGES.forEach(function (b) { if (!p.achievements[b.id] && b.test(s)) { p.achievements[b.id] = ui.today(); fresh.push(b); } });
    if (fresh.length) { App.storage.save(); setTimeout(function () { ui.toast("Conquista: " + fresh[0].icon + " " + fresh[0].name); }, 900); }
  }

  S.progress = function () {
    check();
    var p = ui.profile(), s = stats(p), T = ui.today(), li = game.levelInfo(s.xp);
    var days = [];
    for (var i = 29; i >= 0; i--) { var k = srs.addDays(T, -i), d = p.days[k]; days.push({ k: k, xp: d ? d.xp : 0, met: d ? d.goalMet : false }); }
    var max = Math.max(p.dailyGoal, Math.max.apply(null, days.map(function (d) { return d.xp; })));
    var week = days.slice(-7).reduce(function (a, d) { return a + d.xp; }, 0), prevWeek = days.slice(-14, -7).reduce(function (a, d) { return a + d.xp; }, 0);
    var lastTest = p.levelTests[0];
    function tile(k, v, sub) { return '<div class="card stat"><span class="k">' + k + '</span><span class="v">' + v + '</span>' + (sub ? '<span class="muted small">' + sub + '</span>' : '') + '</div>'; }
    ui.view.innerHTML = '<div class="stack"><h1>Progresso</h1>' +
      '<div class="grid cols-3">' + tile("Nível", li.level, s.xp + " XP no total") +
        tile("Esta semana", week + " XP", prevWeek ? (week >= prevWeek ? "▲ " : "▼ ") + "semana passada: " + prevWeek + " XP" : "") +
        tile("Dias de estudo", s.activeDays, s.goalDays + " com meta cumprida · recorde " + s.best) + '</div>' +
      '<div class="card"><h2>Últimos 30 dias</h2><div class="weekbars month">' + days.map(function (d) {
        return '<div title="' + esc(d.k) + ': ' + d.xp + ' XP"><div style="height:' + Math.max(3, Math.round(110 * d.xp / max)) + 'px;background:' + (d.met ? "var(--accent)" : "var(--surface-2)") + '"></div></div>';
      }).join("") + '</div></div>' +
      '<div class="grid cols-3">' + tile("Vocabulário", s.seen, s.mastered + " dominados · " + s.reviews + " revisões") +
        tile("Leitura", s.readings, "de " + ui.content("readings").length + " textos") +
        tile("Gramática", s.grammar, "de " + ui.content("grammar").length + " lições") +
        tile("Escrita", s.writings, s.writingAvg !== null ? "nota média " + s.writingAvg + "/20" : "sem correção ainda") +
        tile("Shadowing", s.shadowing, "frases praticadas") +
        tile("Conversas", s.conversations, s.sentences + " frases criadas") + '</div>' +
      '<div class="card"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Prova de nível</h2>' +
        (lastTest ? '<span class="level-badge">' + esc(lastTest.level) + '</span>' : '') + '</div>' +
        '<p class="muted">20 questões de gramática e vocabulário, sorteadas da trilha e dos decks. Faça uma vez por mês para acompanhar a evolução.' +
        (lastTest ? ' Última: ' + esc(lastTest.date) + ' — ' + lastTest.score + '/' + lastTest.total + '.' : '') + '</p>' +
        '<button class="btn primary" data-go="leveltest">Fazer a prova</button>' +
        (p.levelTests.length > 1 ? '<p class="muted small">Histórico: ' + p.levelTests.slice(0, 6).map(function (t) { return esc(t.date) + " " + esc(t.level); }).join(" · ") + '</p>' : '') + '</div>' +
      '<div class="card"><h2>Conquistas (' + Object.keys(p.achievements).length + '/' + BADGES.length + ')</h2><div class="badges">' + BADGES.map(function (b) {
        var got = p.achievements[b.id];
        return '<div class="badge' + (got ? " got" : "") + '"><span class="ico" aria-hidden="true">' + b.icon + '</span><strong>' + esc(b.name) + '</strong><small class="muted">' + esc(b.desc) + (got ? ' · ' + esc(got) : '') + '</small></div>';
      }).join("") + '</div></div></div>';
  };

  // ---------- prova de nível ----------
  var test = null;

  function buildTest() {
    var qs = [];
    var gram = [];
    ui.content("grammar").forEach(function (t) { t.exercises.forEach(function (e) { if (e.type === "mc") gram.push({ t: t, e: e }); }); });
    U.shuffle(gram).slice(0, 15).forEach(function (x) {
      qs.push({ kind: "Gramática", level: x.t.level, prompt: x.e.prompt, options: x.e.options, answer: x.e.answer, explain: x.e.explain_pt });
    });
    var items = [];
    ui.content("decks").forEach(function (d) { d.items.forEach(function (it) { if (it.cloze && it.answer) items.push({ d: d, it: it }); }); });
    U.shuffle(items).slice(0, 20 - qs.length).forEach(function (x) {
      var others = U.shuffle(x.d.items.filter(function (o) { return o.id !== x.it.id && U.norm(o.answer) !== U.norm(x.it.answer); })).slice(0, 3).map(function (o) { return o.answer; });
      var opts = U.shuffle([x.it.answer].concat(others));
      qs.push({ kind: "Vocabulário", level: x.d.level, prompt: x.it.cloze, options: opts, answer: opts.indexOf(x.it.answer), explain: x.it.term + " — " + x.it.pt });
    });
    return U.shuffle(qs);
  }

  function estimate(ratio) { return ratio >= 0.85 ? "C1" : ratio >= 0.7 ? "B2+" : ratio >= 0.5 ? "B2" : "B1"; }

  S.leveltest = function () {
    var qs = buildTest();
    if (qs.length < 5) { ui.view.innerHTML = '<div class="stack narrow"><p class="pitfall">Conteúdo insuficiente para a prova.</p><button class="btn" data-go="progress">Voltar</button></div>'; return; }
    test = { qs: qs, i: 0, answers: [] };
    ui.view.innerHTML = '<div class="stack narrow"><div class="row"><button class="btn ghost" data-go="progress">← Progresso</button></div><h1>Prova de nível</h1>' +
      '<div class="card"><p>' + qs.length + ' questões, sem consulta e sem pressa. Não há XP por acerto: o objetivo é medir, então responda com sinceridade (se não souber, chute — não pesquise).</p></div>' +
      '<button class="btn primary big" id="startTest">Começar</button></div>';
    document.getElementById("startTest").onclick = question;
  };

  function question() {
    var q = test.qs[test.i];
    if (!q) return result();
    ui.view.innerHTML = '<div class="stack narrow"><div class="session-top"><button class="btn ghost" data-go="progress" aria-label="Sair">✕</button>' +
      '<div class="bar"><i style="width:' + Math.round(100 * test.i / test.qs.length) + '%"></i></div><strong>' + (test.i + 1) + '/' + test.qs.length + '</strong></div>' +
      '<div class="card stack"><div><span class="tag">' + esc(q.kind) + '</span></div><p class="cloze">' + esc(q.prompt).replace(/_{2,}/g, '<strong style="color:var(--accent)">_____</strong>') + '</p>' +
      '<div class="choices">' + q.options.map(function (o, i) { return '<button class="btn choice" data-opt="' + i + '">' + esc(o) + '</button>'; }).join("") + '</div></div></div>';
    ui.view.querySelectorAll("[data-opt]").forEach(function (b) {
      b.onclick = function () {
        if (Date.now() < (test.lockUntil || 0)) return; // evita que um duplo clique responda a próxima
        test.lockUntil = Date.now() + 350;
        test.answers[test.i] = +b.getAttribute("data-opt"); test.i++; question();
      };
    });
  }

  function result() {
    var p = ui.profile(), n = test.qs.filter(function (q, i) { return test.answers[i] === q.answer; }).length, total = test.qs.length;
    var lv = estimate(n / total), prev = p.levelTests[0];
    p.levelTests.unshift({ date: ui.today(), score: n, total: total, level: lv });
    App.storage.save();
    var todayTests = p.levelTests.filter(function (t) { return t.date === ui.today(); }).length;
    var gained = todayTests > 1 ? 0 : ui.award(20); // XP da prova só uma vez por dia
    var wrong = test.qs.filter(function (q, i) { return test.answers[i] !== q.answer; });
    ui.view.innerHTML = '<div class="stack narrow"><h1>Resultado: ' + lv + '</h1>' +
      '<div class="grid cols-2"><div class="card stat"><span class="k">Acertos</span><span class="v">' + n + '/' + total + '</span>' +
        (prev ? '<span class="muted small">anterior: ' + prev.score + '/' + prev.total + ' (' + esc(prev.level) + ')</span>' : '') + '</div>' +
      '<div class="card stat"><span class="k">XP pela prova</span><span class="v">+' + gained + '</span></div></div>' +
      '<div class="card"><p class="muted">Estimativa interna e aproximada (gramática e vocabulário). Para um nível oficial, faça um teste reconhecido (Cambridge, EF SET, TOEFL/IELTS).</p></div>' +
      (wrong.length ? '<div class="card"><h2>Revise</h2><ul class="list">' + wrong.map(function (q) {
        return '<li><span class="serif">' + esc(q.prompt.replace(/_{2,}/, q.options[q.answer])) + '</span><br><span class="muted small">' + esc(q.explain || "") + '</span></li>'; }).join("") + '</ul></div>' : '') +
      '<div class="row"><button class="btn primary" data-go="progress">Ver progresso</button><button class="btn" data-go="grammar">Ir para a gramática</button></div></div>';
  }

  App.progress = { check: check, stats: stats, BADGES: BADGES, estimate: estimate };
})();
