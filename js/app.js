/* AppEnglish — núcleo da interface: perfis, painel com plano do dia, sessão de vocabulário, decks, caderno e ajustes.
   Módulos (leitura, gramática, escrita, fala, progresso) registram telas em App.screens e são carregados depois deste arquivo.
   O app começa em App.boot() (chamado no fim do index.html). */
(function () {
  "use strict";
  var srs = App.srs, game = App.game, store = App.storage, U = App.util;
  var view = document.getElementById("view");
  var nav = document.getElementById("nav");
  var session = null;
  var route = "dashboard";
  var screens = {};

  // ---------- utilidades ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function today() { return srs.today(); }
  function profile() { return store.current(); }
  function content(key) { return (window.CONTENT && window.CONTENT[key]) || []; }

  function myDeck(p) {
    return { id: "my-deck", title: "Meu deck (erros e palavras salvas)", type: "custom", level: "pessoal", items: p.myCards || [] };
  }
  function decks(p) {
    var list = content("decks").slice();
    p = p || profile();
    if (p && p.myCards && p.myCards.length) list.unshift(myDeck(p));
    return list;
  }
  function activeDecks(p) { return decks(p).filter(function (d) { return p.disabledDecks.indexOf(d.id) < 0; }); }
  function itemsOf(list) {
    var out = [];
    list.forEach(function (d) { d.items.forEach(function (it) { out.push(Object.assign({ _deck: d }, it)); }); });
    return out;
  }
  function findItem(id) {
    var all = itemsOf(decks());
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  var norm = U.norm;
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }
  function plural(n, s, p) { return n + " " + (n === 1 ? s : p); }
  function intervalLabel(days) {
    if (days <= 0) return "hoje";
    if (days === 1) return "1 dia";
    if (days < 30) return days + " dias";
    var m = Math.round(days / 30); return m === 1 ? "1 mês" : m + " meses";
  }

  function speak(text, opts) {
    opts = opts || {};
    try {
      if (!("speechSynthesis" in window)) { toast("Seu navegador não tem leitura em voz alta."); return null; }
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = opts.rate || 0.95;
      var voices = window.speechSynthesis.getVoices();
      var v = voices.filter(function (x) { return /^en(-|_)US/i.test(x.lang); })[0] ||
              voices.filter(function (x) { return /^en/i.test(x.lang); })[0];
      if (v) u.voice = v;
      if (opts.onend) u.onend = opts.onend;
      window.speechSynthesis.speak(u);
      return u;
    } catch (e) { return null; }
  }
  function stopSpeaking() { try { window.speechSynthesis.cancel(); } catch (e) { /* ignora */ } }

  function copyText(text) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("Copiado!"); } catch (e) { toast("Não consegui copiar. Selecione e copie manualmente."); }
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { toast("Copiado!"); }, fallback);
    else fallback();
  }

  function applyTheme(p) {
    var t = p && p.theme;
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }

  function reportXp(res) {
    if (res.levelUp) toast("Subiu para o nível " + game.levelInfo(profile().xp).level + "!");
    else if (res.goalJustMet) toast("Meta diária cumprida! +" + game.GOAL_BONUS + " XP" + (res.usedFreeze ? " (congelamento usado)" : ""));
  }

  // Soma XP no perfil atual, salva e avisa. Retorna o XP ganho (com bônus).
  function award(amount) {
    var p = profile(), res = game.addXp(p, amount, today());
    store.save(); reportXp(res);
    if (App.progress && App.progress.check) App.progress.check();
    return res.gained;
  }

  // ---------- plano do dia (sessão guiada) ----------
  var PLAN = [
    { key: "vocab", label: "Revisão de vocabulário", hint: "flashcards e frases", go: "session" },
    { key: "reading", label: "Leitura do dia", hint: "texto + perguntas", go: "reading" },
    { key: "grammar", label: "Gramática", hint: "uma lição da trilha", go: "grammar" },
    { key: "output", label: "Produção", hint: "escrever, falar ou conversar", go: "writing" }
  ];
  var DAY_BONUS = 15;
  function planOf(p, T) { var d = game.day(p, T || today()); d.plan = d.plan || {}; return d.plan; }
  function markPlan(key) {
    var p = profile(), T = today(), plan = planOf(p, T);
    if (plan[key]) return;
    plan[key] = true;
    store.save();
    var all = PLAN.every(function (s) { return plan[s.key]; });
    if (all && !plan.bonus) { plan.bonus = true; award(DAY_BONUS); toast("Dia completo! +" + DAY_BONUS + " XP de bônus"); }
  }

  // ---------- roteamento ----------
  var NAV_OF = { session: "study", reading: "study", grammar: "study", writing: "study", speaking: "study", conversation: "study",
                 decks: "study", leveltest: "progress", summary: "dashboard" };
  function go(name, arg) {
    if (!profile() && name !== "profiles") name = "profiles";
    if (route === "session" && name !== "session") session = null;
    if (route !== name) stopSpeaking();
    if (App.speaking && App.speaking.stop) App.speaking.stop();
    route = name;
    nav.classList.toggle("hidden", name === "profiles");
    var navName = NAV_OF[name] || name;
    Array.prototype.forEach.call(nav.querySelectorAll("button"), function (b) {
      b.classList.toggle("active", b.getAttribute("data-go") === navName);
    });
    (screens[name] || screens.dashboard)(arg);
    view.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-go]");
    if (el) { e.preventDefault(); go(el.getAttribute("data-go"), el.getAttribute("data-arg") || undefined); }
  });

  // ---------- perfis ----------
  screens.profiles = function () {
    var s = store.get(), ids = Object.keys(s.profiles);
    view.innerHTML =
      '<div class="stack narrow">' +
      '<h1>Bem-vindo ao App<span style="color:var(--accent)">English</span></h1>' +
      '<p class="muted">Treino diário do B2 ao C1. Seu progresso fica salvo neste navegador — faça backup em Ajustes de vez em quando.</p>' +
      (ids.length ? '<div class="card"><h2>Escolher perfil</h2><ul class="list">' + ids.map(function (id) {
        var p = s.profiles[id], li = game.levelInfo(p.xp || 0);
        return '<li class="row" style="justify-content:space-between"><div><strong>' + esc(p.name) + '</strong><br><span class="muted">Nível ' + li.level + ' · ' + (p.xp || 0) + ' XP</span></div>' +
          '<button class="btn primary" data-pick="' + esc(id) + '">Entrar</button></li>';
      }).join("") + '</ul></div>' : '') +
      '<form class="card" id="newProfile"><h2>' + (ids.length ? "Novo perfil" : "Criar seu perfil") + '</h2>' +
      '<label class="field"><span>Seu nome</span><input class="input" name="name" required maxlength="40" placeholder="Ex.: Cleiton"></label>' +
      '<button class="btn primary big" type="submit">Começar</button></form>' +
      (store.isMemoryOnly() ? '<p class="pitfall">Este navegador está bloqueando o salvamento. Use Chrome ou Edge e abra o arquivo index.html direto.</p>' : '') +
      '</div>';
    view.querySelectorAll("[data-pick]").forEach(function (b) {
      b.onclick = function () { store.selectProfile(b.getAttribute("data-pick")); applyTheme(profile()); go("dashboard"); };
    });
    document.getElementById("newProfile").onsubmit = function (e) {
      e.preventDefault();
      var name = e.target.name.value.trim(); if (!name) return;
      store.createProfile(name); applyTheme(profile()); go("dashboard");
    };
  };

  // ---------- painel ----------
  function vocabToday(p, T) {
    var d = game.day(p, T), items = itemsOf(activeDecks(p)), s = srs.stats(items, p.cards, T);
    return { stats: s, newLeft: Math.min(s.new, Math.max(0, p.newPerDay - d.newSeen)) };
  }

  screens.dashboard = function () {
    var p = profile(), T = today();
    var d = game.day(p, T), li = game.levelInfo(p.xp || 0);
    var streak = game.currentStreak(p, T), st = game.ensureStreak(p, T);
    var v = vocabToday(p, T), s = v.stats, newLeft = v.newLeft;
    if (s.due + newLeft === 0 && (d.reviews + d.newSeen) > 0) markPlan("vocab");
    var plan = planOf(p, T);
    var next = PLAN.filter(function (x) { return !plan[x.key]; })[0];
    var goalPct = Math.min(100, Math.round(100 * d.xp / p.dailyGoal));
    var hour = new Date().getHours();
    var hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    var week = [];
    for (var i = 6; i >= 0; i--) {
      var k = srs.addDays(T, -i), dd = p.days[k];
      week.push({ k: k, xp: dd ? dd.xp : 0, met: dd ? dd.goalMet : false });
    }
    var maxW = Math.max(p.dailyGoal, Math.max.apply(null, week.map(function (w) { return w.xp; })));
    var wd = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
    var doneCount = PLAN.filter(function (x) { return plan[x.key]; }).length;

    view.innerHTML =
      '<div class="stack">' +
      '<div class="hero"><div><p class="muted" style="margin:0">' + hello + ',</p><h1>' + esc(p.name) + '</h1></div>' +
      '<div style="min-width:240px;flex:1;max-width:360px"><div class="row" style="justify-content:space-between;margin-bottom:6px">' +
      '<span class="level-badge">Nível ' + li.level + '</span><span class="muted">' + li.xpInLevel + ' / ' + li.xpToNext + ' XP</span></div>' +
      '<div class="bar"><i style="width:' + Math.round(li.progress * 100) + '%"></i></div></div></div>' +

      '<div class="card plan"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Plano de hoje</h2>' +
      '<span class="muted">' + doneCount + '/4' + (plan.bonus ? ' · dia completo ✓' : ' · +' + DAY_BONUS + ' XP ao completar') + '</span></div>' +
      '<ol class="steps">' + PLAN.map(function (x, n) {
        var extra = x.key === "vocab" ? ' · ' + plural(s.due, "revisão", "revisões") + ' + ' + plural(newLeft, "novo", "novos") : '';
        return '<li class="' + (plan[x.key] ? "done" : (next && next.key === x.key ? "current" : "")) + '"><span class="num">' + (plan[x.key] ? "✓" : n + 1) + '</span>' +
          '<button class="linklike" data-go="' + (x.key === "vocab" ? "study" : x.go) + '"' + (x.key === "vocab" ? ' data-arg="vocab"' : '') + '><strong>' + x.label + '</strong><small class="muted">' + x.hint + extra + '</small></button></li>';
      }).join("") + '</ol>' +
      (next ? '<button class="btn primary big" id="continue">' + (doneCount ? "Continuar: " : "Começar: ") + next.label + '</button>'
            : '<p class="feedback ok">Plano de hoje concluído. Volte amanhã — ou pratique livremente em Estudar.</p>') +
      '</div>' +

      '<div class="grid cols-3">' +
      '<div class="card stat"><span class="k">Sequência</span><span class="v">' + streak + (streak === 1 ? " dia" : " dias") + '</span>' +
      '<span class="muted small">Recorde ' + (st.best || 0) + ' · ' + (st.freezes > 0 ? "1 congelamento disponível" : "congelamento usado nesta semana") + '</span></div>' +
      '<div class="card stat"><span class="k">Meta de hoje</span><span class="v">' + d.xp + ' <small class="muted" style="font-size:1rem">/ ' + p.dailyGoal + ' XP</small></span>' +
      '<div class="bar"><i style="width:' + goalPct + '%"></i></div></div>' +
      '<div class="card stat"><span class="k">Vocabulário hoje</span><span class="v">' + (s.due + newLeft) + '</span>' +
      '<span class="muted small">' + plural(s.due, "revisão", "revisões") + ' + ' + plural(newLeft, "novo", "novos") + '</span></div>' +
      '</div>' +

      '<div class="grid cols-2">' +
      '<div class="card"><h2>Domínio por deck</h2>' + activeDecks(p).map(function (dk) {
        var ds = srs.stats(itemsOf([dk]), p.cards, T), tot = ds.total || 1;
        return '<div style="margin:12px 0"><div class="row" style="justify-content:space-between"><strong>' + esc(dk.title) + '</strong>' +
          '<span class="muted small">' + ds.mastered + '/' + ds.total + ' dominados</span></div>' +
          '<div class="mastery"><i class="m-mastered" style="width:' + (100 * ds.mastered / tot) + '%"></i><i class="m-review" style="width:' + (100 * ds.review / tot) + '%"></i><i class="m-learning" style="width:' + (100 * ds.learning / tot) + '%"></i></div></div>';
      }).join("") + (activeDecks(p).length ? '' : '<p class="muted">Nenhum deck ativo. Veja Estudar → Decks.</p>') +
      '<div class="legend"><span style="--c:var(--hard)">aprendendo</span><span style="--c:var(--good)">revisando</span><span style="--c:var(--easy)">dominado (21+ dias)</span></div></div>' +

      '<div class="card"><h2>Últimos 7 dias</h2><div class="weekbars">' +
      week.map(function (w) {
        var h = Math.round(110 * w.xp / maxW), p2 = w.k.split("-"), dow = new Date(+p2[0], +p2[1] - 1, +p2[2]).getDay();
        return '<div><div title="' + w.xp + ' XP" style="height:' + Math.max(3, h) + 'px;background:' +
          (w.met ? "var(--accent)" : "var(--surface-2)") + '"></div><small class="muted">' + wd[dow] + '</small></div>';
      }).join("") + '</div><p class="muted small" style="margin-top:8px">Barras laranja = meta cumprida.</p></div>' +
      '</div></div>';

    var c = document.getElementById("continue");
    if (c) c.onclick = function () {
      if (next.key === "vocab") { if (!startSession(0)) { markPlan("vocab"); screens.dashboard(); } }
      else go(next.go);
    };
  };

  // ---------- Estudar (hub) ----------
  screens.study = function (arg) {
    var p = profile(), T = today(), v = vocabToday(p, T);
    var g = content("grammar"), r = content("readings"), w = content("writing"), sh = content("shadowing"), sc = content("scenarios");
    var gDone = g.filter(function (t) { return p.grammar[t.id] && p.grammar[t.id].passed; }).length;
    var rDone = r.filter(function (x) { return p.readings[x.id]; }).length;
    function tile(goName, icon, title, sub) {
      return '<button class="card tile" data-go="' + goName + '"><span class="ico" aria-hidden="true">' + icon + '</span>' +
        '<span><strong>' + title + '</strong><small class="muted">' + sub + '</small></span></button>';
    }
    view.innerHTML = '<div class="stack"><h1>Estudar</h1>' +
      '<div class="grid cols-2">' +
      '<div class="card tile" id="vocabTile" role="button" tabindex="0"><span class="ico" aria-hidden="true">🃏</span><span><strong>Vocabulário</strong><small class="muted">' +
        plural(v.stats.due, "revisão", "revisões") + ' + ' + plural(v.newLeft, "novo", "novos") + ' hoje</small></span></div>' +
      tile("reading", "📖", "Leitura", rDone + "/" + r.length + " textos lidos") +
      tile("grammar", "🧩", "Gramática", gDone + "/" + g.length + " lições concluídas") +
      tile("writing", "✍️", "Escrita", p.writings.length + " de " + w.length + " propostas · correção por IA") +
      tile("speaking", "🎙️", "Fala (shadowing)", sh.length + " frases para repetir em voz alta") +
      tile("conversation", "💬", "Conversação", sc.length + " cenários com parceiro de IA") +
      '</div>' +
      '<div class="row"><button class="btn" data-go="decks">Gerenciar decks</button><button class="btn" data-go="leveltest">Prova de nível</button></div></div>';
    var vt = document.getElementById("vocabTile");
    function startVocab() {
      if (!startSession(0)) {
        if (v.stats.new > 0 && confirm("Vocabulário em dia por hoje. Estudar 5 itens novos extras?")) startSession(5);
        else toast("Vocabulário em dia por hoje.");
      }
    }
    vt.onclick = startVocab;
    vt.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startVocab(); } };
    if (arg === "vocab") startVocab();
  };

  // ---------- sessão de vocabulário ----------
  function startSession(extraNew) {
    var p = profile(), T = today(), d = game.day(p, T);
    var items = itemsOf(activeDecks(p));
    var q = srs.buildQueue(items, p.cards, T, p.newPerDay + (extraNew || 0), d.newSeen);
    if (!q.length) return false;
    session = { queue: q, i: 0, total: q.length, xp: 0, correct: 0, wrong: 0, produced: 0, sinceProduce: 0,
                candidates: [], phase: null, item: null, flipped: false, checked: null };
    go("session");
    return true;
  }

  function modeFor(item, card) {
    if (!card || card.state === "new" || card.state === "learning") return "flash";
    return ((card.reps + card.lapses) % 2 === 1 && item.cloze) ? "cloze" : "flash";
  }

  screens.session = function () {
    if (!session) { go("dashboard"); return; }
    var s = session;
    if (s.phase !== "produce") {
      if (s.i >= s.queue.length) { screens.summary(); return; }
      s.item = s.queue[s.i];
      var card = profile().cards[s.item.id];
      s.phase = modeFor(s.item, card); s.flipped = false; s.checked = null;
    }
    render();
  };

  function header() {
    var s = session, pct = Math.round(100 * Math.min(s.i, s.queue.length) / Math.max(1, s.queue.length));
    return '<div class="session-top"><button class="btn ghost" data-go="dashboard" aria-label="Sair">✕</button>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div><strong class="xp-pop">+' + s.xp + ' XP</strong></div>';
  }

  function tags(it) {
    var t = '<span class="tag">' + esc(it._deck.title) + '</span>';
    if (it.register && it.register !== "neutral") t += '<span class="tag">' + esc(it.register) + '</span>';
    if (it._deck.type === "phrasal") t += '<span class="tag">' + (it.separable ? "separável" : "inseparável") + '</span>';
    return t;
  }

  function details(it) {
    return '<div class="answer"><p class="meaning"><strong>' + esc(it.meaning) + '</strong></p>' +
      '<p class="muted">PT: ' + esc(it.pt) + '</p><ul>' +
      (it.examples || []).map(function (e) { return '<li>' + esc(e) + ' <button class="speak sm" data-say="' + esc(e) + '" aria-label="Ouvir exemplo">🔊</button></li>'; }).join("") +
      '</ul>' + (it.pitfall && it._deck.type !== "custom" ? '<p class="pitfall">⚠ ' + esc(it.pitfall) + '</p>' : '') + '</div>';
  }

  function gradeButtons() {
    var c = profile().cards[session.item.id] || srs.newCard(), T = today();
    var labels = ["Errei", "Difícil", "Bom", "Fácil"];
    return '<div class="grades">' + [0, 1, 2, 3].map(function (g) {
      var next = srs.review(c, g, T).card.interval;
      return '<button class="btn g' + g + '" data-grade="' + g + '">' + labels[g] + '<small>' + (g === 0 ? "de novo" : intervalLabel(next)) + '</small></button>';
    }).join("") + '</div><p class="kbd">Teclas 1–4 para responder</p>';
  }

  function render() {
    var s = session, it = s.item, html = header();
    if (s.phase === "flash") {
      html += '<div class="card flash"><div>' + tags(it) + '</div>' +
        '<div class="term">' + esc(it.term) + '</div>' +
        '<div><button class="speak" data-say="' + esc(it.term) + '" aria-label="Ouvir">🔊</button></div>' +
        (s.flipped ? details(it) + gradeButtons()
                   : '<button class="btn primary big" id="flip">Mostrar resposta</button><p class="kbd">Espaço para virar</p>') +
        '</div>';
    } else if (s.phase === "cloze") {
      var parts = it.cloze.split("___");
      html += '<div class="card stack"><div>' + tags(it) + '<span class="tag">complete a frase</span></div>' +
        '<p class="cloze">' + esc(parts[0]) + '<strong style="color:var(--accent)">_____</strong>' + esc(parts[1] || "") + '</p>' +
        '<p class="muted">Dica: ' + esc(it.pt) + '</p>';
      if (!s.checked) {
        html += '<form id="clozeForm" class="row"><input class="input" id="clozeInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Digite a expressão" style="flex:1">' +
          '<button class="btn primary" type="submit">Verificar</button></form><button class="btn ghost" id="giveUp">Não sei</button>';
      } else {
        var full = parts[0] + it.answer + (parts[1] || "");
        html += (s.checked === "ok" ? '<p class="feedback ok">Correto!</p>' : s.checked === "almost" ? '<p class="feedback almost">Quase! A expressão está certa, mas nesta frase a forma é: ' + esc(it.answer) + '</p>' : '<p class="feedback no">Resposta: ' + esc(it.answer) + (s.typed ? ' — você escreveu "' + esc(s.typed) + '"' : '') + '</p>') +
          '<p class="cloze">' + esc(full) + ' <button class="speak" data-say="' + esc(full) + '" aria-label="Ouvir">🔊</button></p>' +
          details(it) + gradeButtons() +
          (s.checked !== "ok" ? '<p class="kbd">Se foi só erro de digitação, pode escolher Bom.</p>' : '');
      }
      html += '</div>';
    } else if (s.phase === "produce") {
      var pi = s.produceItem;
      html += '<div class="card stack"><div><span class="tag">produção</span><span class="tag">+' + game.SENTENCE_XP + ' XP</span></div>' +
        '<h2>Crie sua frase</h2><p>Escreva uma frase <strong>sua</strong>, sobre a sua vida ou trabalho, usando:</p>' +
        '<p class="term" style="font-size:1.6rem">' + esc(pi.term) + '</p><p class="muted">' + esc(pi.meaning) + ' — ' + esc(pi.pt) + '</p>' +
        '<textarea class="input" id="sentence" placeholder="Write your sentence here..."></textarea>' +
        '<details><summary class="muted">Confira antes de salvar</summary><ul class="muted"><li>Usei a expressão com o sentido certo?</li><li>O verbo está no tempo certo?</li><li>Leia em voz alta: soa natural?</li></ul></details>' +
        '<div class="row"><button class="btn primary" id="saveSentence">Salvar frase</button><button class="btn ghost" id="skipSentence">Pular</button></div></div>';
    }
    view.innerHTML = html;
    bindSession();
  }

  function bindSpeakButtons(root) {
    (root || view).querySelectorAll("[data-say]").forEach(function (b) { b.onclick = function () { speak(b.getAttribute("data-say")); }; });
  }

  function bindSession() {
    var s = session;
    bindSpeakButtons();
    view.querySelectorAll("[data-grade]").forEach(function (b) { b.onclick = function () { grade(+b.getAttribute("data-grade")); }; });
    var f = document.getElementById("flip"); if (f) f.onclick = flip;
    var cf = document.getElementById("clozeForm");
    if (cf) {
      var inp = document.getElementById("clozeInput"); setTimeout(function () { inp.focus(); }, 30);
      cf.onsubmit = function (e) { e.preventDefault(); checkCloze(inp.value); };
      document.getElementById("giveUp").onclick = function () { checkCloze(""); };
    }
    var ss = document.getElementById("saveSentence");
    if (ss) {
      var ta = document.getElementById("sentence"); setTimeout(function () { ta.focus(); }, 30);
      ss.onclick = function () { saveSentence(ta.value); };
      document.getElementById("skipSentence").onclick = function () { s.phase = null; screens.session(); };
    }
  }

  function flip() { session.flipped = true; render(); speak(session.item.term); }

  function checkCloze(value) {
    var s = session, it = s.item;
    var v = norm(value);
    s.typed = value.trim();
    s.checked = v === norm(it.answer) ? "ok" : (v && v === norm(it.term) ? "almost" : "no");
    render();
  }

  function grade(g) {
    var s = session, p = profile(), T = today(), it = s.item;
    var prev = p.cards[it.id], wasNew = !prev || prev.state === "new";
    var r = srs.review(prev || srs.newCard(), g, T);
    p.cards[it.id] = r.card;
    var d = game.day(p, T);
    if (wasNew) d.newSeen++; else d.reviews++;
    if (g > 0) { d.correct++; s.correct++; } else s.wrong++;
    var res = game.addXp(p, r.xp, T);
    s.xp += res.gained;
    store.save();
    reportXp(res);
    if (r.requeue) s.queue.push(it);
    if (g >= 2 && s.candidates.indexOf(it) < 0) s.candidates.push(it);
    s.i++; s.sinceProduce++;
    if (s.sinceProduce >= 5 && s.candidates.length) {
      s.sinceProduce = 0;
      s.produceItem = s.candidates.splice(Math.floor(Math.random() * s.candidates.length), 1)[0];
      s.phase = "produce";
    } else s.phase = null;
    screens.session();
  }

  function saveSentence(text) {
    var s = session, p = profile(), T = today(), it = s.produceItem;
    text = text.trim();
    if (text.length < 12 || text.split(/\s+/).length < 4) { toast("Escreva uma frase completa (pelo menos 4 palavras)."); return; }
    var key = norm(it.term).split(" ")[0].replace(/[^a-z']/g, "").slice(0, 4);
    if (key && norm(text).indexOf(key) < 0) toast("Dica: a expressão parece não estar na frase. Salvei mesmo assim.");
    p.sentences.unshift({ itemId: it.id, term: it.term, text: text, date: T });
    game.day(p, T).sentences++;
    var res = game.addXp(p, game.SENTENCE_XP, T);
    s.xp += res.gained; s.produced++;
    store.save(); reportXp(res);
    s.phase = null; screens.session();
  }

  document.addEventListener("keydown", function (e) {
    if (route !== "session" || !session) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "textarea" || tag === "input") return;
    if (e.code === "Space" && session.phase === "flash" && !session.flipped) { e.preventDefault(); flip(); return; }
    if (/^[1-4]$/.test(e.key)) {
      var b = view.querySelector('[data-grade="' + (+e.key - 1) + '"]');
      if (b) { e.preventDefault(); b.click(); }
    }
  });

  screens.summary = function () {
    var s = session;
    if (!s) { go("dashboard"); return; }
    var p = profile(), T = today(), d = game.day(p, T);
    var acc = s.correct + s.wrong ? Math.round(100 * s.correct / (s.correct + s.wrong)) : 0;
    markPlan("vocab");
    var plan = planOf(p, T), next = PLAN.filter(function (x) { return !plan[x.key]; })[0];
    view.innerHTML = '<div class="stack narrow"><h1>Sessão concluída</h1>' +
      '<div class="grid cols-3"><div class="card stat"><span class="k">XP ganho</span><span class="v">+' + s.xp + '</span></div>' +
      '<div class="card stat"><span class="k">Acertos</span><span class="v">' + acc + '%</span></div>' +
      '<div class="card stat"><span class="k">Frases criadas</span><span class="v">' + s.produced + '</span></div></div>' +
      '<div class="card"><p>' + (d.goalMet ? "Meta diária cumprida. Sequência: <strong>" + plural(game.currentStreak(p, T), "dia", "dias") + "</strong>."
        : "Faltam <strong>" + Math.max(0, p.dailyGoal - d.xp) + " XP</strong> para a meta de hoje.") + '</p>' +
      '<p class="muted">O que você errou hoje volta amanhã. O que acertou volta só quando estiver quase esquecendo — é aí que a memória fixa.</p></div>' +
      (next ? '<button class="btn primary big" data-go="' + next.go + '">Próximo passo: ' + next.label + '</button>' : '') +
      '<button class="btn big" data-go="dashboard">Voltar ao painel</button></div>';
    session = null;
  };

  // ---------- decks ----------
  screens.decks = function () {
    var p = profile(), T = today();
    view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">← Estudar</button></div><h1>Decks</h1>' +
      '<p class="muted">Desative um deck para tirá-lo da sessão diária (o progresso dele fica guardado). O "Meu deck" recebe seus erros corrigidos pela IA e as palavras que você salva nas leituras.</p>' +
      decks(p).map(function (dk) {
        var st = srs.stats(itemsOf([dk]), p.cards, T), on = p.disabledDecks.indexOf(dk.id) < 0;
        return '<div class="card"><div class="row" style="justify-content:space-between"><div><h2 style="margin:0">' + esc(dk.title) + '</h2>' +
          '<span class="muted">' + dk.items.length + ' itens · ' + esc(dk.level || "") + '</span></div>' +
          '<label class="switch"><input type="checkbox" data-deck="' + esc(dk.id) + '"' + (on ? " checked" : "") + '> ativo</label></div>' +
          '<div class="legend" style="margin-top:10px"><span style="--c:var(--line)">' + st.new + ' novos</span><span style="--c:var(--hard)">' + st.learning + ' aprendendo</span>' +
          '<span style="--c:var(--good)">' + st.review + ' revisando</span><span style="--c:var(--easy)">' + st.mastered + ' dominados</span></div>' +
          '<details style="margin-top:10px"><summary class="muted">Ver itens</summary><ul class="list">' + dk.items.map(function (it) {
            var c = p.cards[it.id];
            return '<li><strong>' + esc(it.term) + '</strong> — <span class="muted">' + esc(it.pt) + '</span>' +
              (c && c.state !== "new" ? ' <span class="tag">próxima: ' + esc(c.due) + '</span>' : '') +
              (dk.type === "custom" ? ' <button class="btn ghost sm" data-del-card="' + esc(it.id) + '">remover</button>' : '') + '</li>';
          }).join("") + '</ul></details></div>';
      }).join("") + (content("decks").length ? "" : '<p class="pitfall">Nenhum conteúdo encontrado na pasta content/.</p>') + '</div>';
    view.querySelectorAll("[data-deck]").forEach(function (cb) {
      cb.onchange = function () {
        var id = cb.getAttribute("data-deck"), list = p.disabledDecks.filter(function (x) { return x !== id; });
        if (!cb.checked) list.push(id);
        p.disabledDecks = list; store.save();
      };
    });
    view.querySelectorAll("[data-del-card]").forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute("data-del-card");
        p.myCards = p.myCards.filter(function (c) { return c.id !== id; }); delete p.cards[id];
        store.save(); screens.decks();
      };
    });
  };

  // Adiciona cards ao "Meu deck" (sem repetir o mesmo termo). Retorna quantos entraram.
  function addMyCards(cards) {
    var p = profile(), have = {};
    p.myCards.forEach(function (c) { have[norm(c.term)] = true; });
    var n = 0;
    cards.forEach(function (c) { if (!have[norm(c.term)]) { p.myCards.push(c); have[norm(c.term)] = true; n++; } });
    store.save();
    return n;
  }

  // ---------- feedback da IA (escrita e conversa) ----------
  function scoreBar(label, v) {
    return '<div class="scorerow"><span>' + label + '</span><div class="bar"><i style="width:' + (v * 20) + '%"></i></div><strong>' + v + '/5</strong></div>';
  }
  function feedbackHTML(fb) {
    return '<div class="card stack fb"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Correção</h2>' +
      (fb.level_estimate ? '<span class="level-badge">' + esc(fb.level_estimate) + '</span>' : '') + '</div>' +
      (fb.summary_pt ? '<p>' + esc(fb.summary_pt) + '</p>' : '') +
      '<div class="scores">' + scoreBar("Gramática", fb.score.grammar) + scoreBar("Vocabulário", fb.score.vocabulary) +
      scoreBar("Coesão", fb.score.coherence) + scoreBar("Naturalidade", fb.score.naturalness) + '</div>' +
      (fb.errors.length ? '<h3>Erros (' + fb.errors.length + ')</h3><ul class="list">' + fb.errors.map(function (e) {
        return '<li><span class="strike">' + esc(e.original) + '</span> → <strong class="fix">' + esc(e.correction) + '</strong> <span class="tag">' + esc(e.type) + '</span><br><span class="muted">' + esc(e.explanation_pt) + '</span></li>';
      }).join("") + '</ul><button class="btn" id="fbToDeck">Enviar estes erros para o Meu deck</button>' : '<p class="feedback ok">Nenhum erro encontrado!</p>') +
      (fb.better_expressions.length ? '<h3>Soaria mais natural</h3><ul class="list">' + fb.better_expressions.map(function (b) {
        return '<li>' + (b.instead_of ? '<span class="muted">' + esc(b.instead_of) + '</span> → ' : '') + '<strong>' + esc(b.try) + '</strong><br><span class="muted">' + esc(b.why_pt) + '</span></li>';
      }).join("") + '</ul>' : '') +
      (fb.corrected_text ? '<details><summary><strong>Ver versão corrigida completa</strong></summary><p class="serif">' + esc(fb.corrected_text).replace(/\n/g, "<br>") +
        '</p><button class="speak" data-say="' + esc(fb.corrected_text) + '" aria-label="Ouvir">🔊</button></details>' : '') +
      '</div>';
  }
  function bindFeedback(fb, source, onAdded) {
    bindSpeakButtons();
    var b = document.getElementById("fbToDeck");
    if (b) b.onclick = function () {
      var n = addMyCards(fb.errors.map(function (e) { return App.ai.errorToCard(e, source); }));
      b.disabled = true; b.textContent = n ? n + " erro(s) adicionados ao Meu deck ✓" : "Já estavam no Meu deck";
      if (n) award(n * 2);
      if (onAdded) onAdded(n);
    };
  }

  // Bloco "sem chave": copiar prompt e colar a resposta do Claude
  function pasteBackHTML(prefix) {
    return '<div class="card stack"><h3>Corrigir sem chave de API</h3>' +
      '<ol class="muted"><li>Clique em <strong>Copiar pedido de correção</strong>.</li><li>Cole numa conversa no claude.ai e envie.</li><li>Copie a resposta inteira e cole abaixo.</li></ol>' +
      '<button class="btn" id="' + prefix + 'Copy">Copiar pedido de correção</button>' +
      '<textarea class="input" id="' + prefix + 'Paste" placeholder="Cole aqui a resposta do Claude (o JSON)"></textarea>' +
      '<button class="btn primary" id="' + prefix + 'Apply">Aplicar correção</button></div>';
  }

  // ---------- caderno ----------
  screens.notebook = function () {
    var p = profile();
    var weak = Object.keys(p.cards).filter(function (id) { return (p.cards[id].lapses || 0) >= 2; })
      .map(function (id) { return { it: findItem(id), c: p.cards[id] }; }).filter(function (x) { return x.it; })
      .sort(function (a, b) { return b.c.lapses - a.c.lapses; });
    var hard = Object.keys(p.hardWords).sort(function (a, b) { return p.hardWords[b] - p.hardWords[a]; }).slice(0, 30);
    view.innerHTML = '<div class="stack"><h1>Caderno</h1>' +
      '<div class="card"><h2>Pontos fracos</h2><p class="muted">Expressões que você já errou 2 vezes ou mais. Elas aparecem mais vezes nas revisões automaticamente.</p>' +
      (weak.length ? '<ul class="list">' + weak.map(function (x) {
        return '<li><strong>' + esc(x.it.term) + '</strong> — ' + esc(x.it.pt) + ' <span class="tag">' + x.c.lapses + ' erros</span></li>'; }).join("") + '</ul>'
        : '<p class="muted">Nada aqui ainda. Ótimo sinal!</p>') + '</div>' +
      '<div class="card"><h2>Meu deck (' + p.myCards.length + ')</h2><p class="muted">Erros corrigidos e palavras salvas. Eles entram nas revisões diárias.</p>' +
      (p.myCards.length ? '<ul class="list">' + p.myCards.slice().reverse().slice(0, 40).map(function (c) {
        return '<li><strong>' + esc(c.term) + '</strong> <span class="muted">— ' + esc(c.pt) + '</span></li>'; }).join("") + '</ul>'
        : '<p class="muted">Vazio por enquanto.</p>') + '</div>' +
      '<div class="card"><h2>Palavras difíceis de pronunciar</h2>' +
      (hard.length ? '<div class="chips">' + hard.map(function (w) { return '<button class="chip" data-say="' + esc(w) + '">' + esc(w) + ' <small>' + p.hardWords[w] + '×</small></button>'; }).join("") + '</div>'
        : '<p class="muted">Aparecem aqui as palavras que o reconhecimento de voz não entendeu no shadowing.</p>') + '</div>' +
      '<div class="card"><h2>Meus textos (' + p.writings.length + ')</h2>' +
      (p.writings.length ? '<ul class="list">' + p.writings.map(function (w) {
        return '<li><div class="row" style="justify-content:space-between"><strong>' + esc(w.title) + '</strong><span class="muted small">' + esc(w.date) + ' · ' + w.words + ' palavras' +
          (w.feedback ? ' · nota ' + App.ai.total(w.feedback) + '/20' : '') + '</span></div>' +
          '<details><summary class="muted">Ver texto' + (w.feedback ? ' e correção' : '') + '</summary><p class="serif">' + esc(w.text).replace(/\n/g, "<br>") + '</p>' +
          (w.feedback && w.feedback.corrected_text ? '<p class="muted"><strong>Corrigido:</strong></p><p class="serif">' + esc(w.feedback.corrected_text).replace(/\n/g, "<br>") + '</p>' : '') +
          '</details></li>'; }).join("") + '</ul>'
        : '<p class="muted">Os textos da aba Escrita aparecem aqui.</p>') + '</div>' +
      '<div class="card"><h2>Minhas frases (' + p.sentences.length + ')</h2>' +
      (p.sentences.length ? '<ul class="list">' + p.sentences.map(function (s) {
        return '<li><span class="tag">' + esc(s.term) + '</span> <span class="muted small">' + esc(s.date) + '</span><br>' +
          '<span class="serif">' + esc(s.text) + '</span> <button class="speak sm" data-say="' + esc(s.text) + '" aria-label="Ouvir">🔊</button></li>'; }).join("") + '</ul>'
        : '<p class="muted">As frases que você criar nas sessões aparecem aqui.</p>') + '</div></div>';
    bindSpeakButtons();
  };

  // ---------- ajustes ----------
  screens.settings = function () {
    var p = profile();
    view.innerHTML = '<div class="stack narrow"><h1>Ajustes</h1>' +
      '<form class="card" id="prefs"><h2>Perfil e metas</h2>' +
      '<label class="field"><span>Nome</span><input class="input" name="name" value="' + esc(p.name) + '" maxlength="40"></label>' +
      '<label class="field"><span>Meta diária de XP</span><select class="input" name="goal">' + [20, 30, 50, 80].map(function (v) {
        return '<option value="' + v + '"' + (p.dailyGoal === v ? " selected" : "") + '>' + v + ' XP' + (v === 20 ? " (leve)" : v === 30 ? " (padrão)" : v === 50 ? " (forte)" : " (intenso)") + '</option>'; }).join("") + '</select></label>' +
      '<label class="field"><span>Itens novos de vocabulário por dia</span><select class="input" name="newPerDay">' + [5, 10, 15, 20].map(function (v) {
        return '<option' + (p.newPerDay === v ? " selected" : "") + '>' + v + '</option>'; }).join("") + '</select></label>' +
      '<label class="field"><span>Tema</span><select class="input" name="theme">' + [["auto", "Automático"], ["light", "Claro"], ["dark", "Escuro"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (p.theme === o[0] ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select></label>' +
      '<button class="btn primary" type="submit">Salvar</button></form>' +

      '<form class="card" id="aiForm"><h2>Correção por IA (opcional)</h2>' +
      '<p class="muted">Com uma chave da API do Claude, a correção de textos e a conversação acontecem direto no app. Sem chave, tudo funciona no modo <strong>copiar e colar</strong> com o claude.ai.</p>' +
      '<label class="field"><span>Chave da API (console.anthropic.com → API Keys)</span><input class="input" name="key" type="password" autocomplete="off" placeholder="sk-ant-..." value="' + esc(p.ai.key) + '"></label>' +
      '<label class="field"><span>Modelo</span><select class="input" name="model">' + App.ai.MODELS.map(function (m) {
        return '<option value="' + m.id + '"' + (p.ai.model === m.id ? " selected" : "") + '>' + m.label + '</option>'; }).join("") + '</select></label>' +
      '<p class="muted small">A chave fica só neste navegador e <strong>não</strong> vai para o arquivo de backup. Cada correção custa centavos de dólar na sua conta da API.</p>' +
      '<div class="row"><button class="btn primary" type="submit">Salvar</button><button class="btn" type="button" id="aiTest">Testar conexão</button>' +
      (p.ai.key ? '<button class="btn ghost" type="button" id="aiClear">Remover chave</button>' : '') + '</div></form>' +

      '<div class="card"><h2>Backup</h2><p class="muted">O progresso fica salvo neste navegador. Exporte um backup de vez em quando (e guarde no OneDrive) para não perder nada ou para levar para outro computador.</p>' +
      '<div class="row"><button class="btn" id="exp">Exportar backup</button><label class="btn" style="display:inline-flex;align-items:center">Importar backup<input type="file" id="imp" accept=".json,application/json" hidden></label></div></div>' +
      '<div class="card"><h2>Perfis</h2><div class="row"><button class="btn" id="switch">Trocar de perfil</button><button class="btn ghost" id="del" style="color:var(--again)">Excluir este perfil</button></div></div></div>';

    document.getElementById("prefs").onsubmit = function (e) {
      e.preventDefault(); var f = e.target;
      p.name = f.name.value.trim() || p.name; p.dailyGoal = +f.goal.value; p.newPerDay = +f.newPerDay.value; p.theme = f.theme.value;
      store.save(); applyTheme(p); toast("Ajustes salvos.");
    };
    var aiForm = document.getElementById("aiForm");
    aiForm.onsubmit = function (e) {
      e.preventDefault();
      p.ai.key = aiForm.key.value.trim(); p.ai.model = aiForm.model.value;
      store.save(); toast(p.ai.key ? "Chave salva neste navegador." : "Sem chave: modo copiar e colar.");
      screens.settings();
    };
    document.getElementById("aiTest").onclick = function () {
      var b = this; p.ai.key = aiForm.key.value.trim(); p.ai.model = aiForm.model.value; store.save();
      b.disabled = true; b.textContent = "Testando...";
      App.ai.call(p, "Reply with exactly: OK", [{ role: "user", content: "Test" }], 10)
        .then(function () { toast("Conexão com a IA funcionando ✓"); }, function (err) { toast(err.message); })
        .then(function () { b.disabled = false; b.textContent = "Testar conexão"; });
    };
    var clr = document.getElementById("aiClear");
    if (clr) clr.onclick = function () { p.ai.key = ""; store.save(); toast("Chave removida."); screens.settings(); };
    document.getElementById("exp").onclick = function () {
      var blob = new Blob([store.exportJSON()], { type: "application/json" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = "AppEnglish-backup-" + today() + ".json"; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      toast("Backup exportado.");
    };
    document.getElementById("imp").onchange = function (e) {
      var file = e.target.files[0]; e.target.value = ""; if (!file) return;
      if (!confirm("Importar substitui os dados atuais deste navegador pelos do backup. Continuar?")) return;
      var r = new FileReader();
      r.onload = function () {
        try { var n = store.importJSON(r.result); toast("Backup importado: " + plural(n, "perfil", "perfis") + "."); applyTheme(profile()); go(profile() ? "dashboard" : "profiles"); }
        catch (err) { toast("Não consegui importar: " + err.message); }
      };
      r.readAsText(file);
    };
    document.getElementById("switch").onclick = function () { store.get().currentProfileId = null; store.save(); go("profiles"); };
    document.getElementById("del").onclick = function () {
      if (confirm('Excluir o perfil "' + p.name + '" e todo o progresso dele? Isso não pode ser desfeito (a não ser que você tenha um backup).')) {
        store.deleteProfile(p.id); go("profiles");
      }
    };
  };

  // ---------- API para os módulos ----------
  App.screens = screens;
  App.ui = {
    view: view, esc: esc, today: today, profile: profile, content: content, toast: toast, plural: plural, speak: speak,
    stopSpeaking: stopSpeaking, copyText: copyText, go: go, award: award, markPlan: markPlan, addMyCards: addMyCards,
    feedbackHTML: feedbackHTML, bindFeedback: bindFeedback, pasteBackHTML: pasteBackHTML, bindSpeakButtons: bindSpeakButtons,
    route: function () { return route; }, decks: decks, itemsOf: itemsOf
  };
  App.boot = function () {
    store.load();
    applyTheme(profile());
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
    go(profile() ? "dashboard" : "profiles");
  };
})();
