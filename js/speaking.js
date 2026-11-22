/* AppEnglish — Fases 4 e 5: shadowing com reconhecimento de voz e conversação com parceiro de IA. */
(function () {
  "use strict";
  var ui = App.ui, U = App.util, S = App.screens, ai = App.ai, esc = ui.esc;
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var rec = null;
  var GOOD = 0.7;

  function stopRec() { if (rec) { try { rec.abort(); } catch (e) { /* ignora */ } rec = null; } }

  // Ouve o microfone uma vez. cb(err, [transcrições])
  function listen(cb) {
    if (!SR) { cb(new Error("unsupported")); return; }
    stopRec();
    var r = new SR(), done = false;
    rec = r;
    r.lang = "en-US"; r.interimResults = false; r.maxAlternatives = 3; r.continuous = false;
    r.onresult = function (ev) {
      done = true;
      var alts = [], res = ev.results[0];
      for (var i = 0; i < res.length; i++) alts.push(res[i].transcript);
      cb(null, alts);
    };
    r.onerror = function (ev) {
      done = true;
      if (ev.error === "aborted") return; // parado de propósito (troca de tela)
      var m = ev.error === "not-allowed" || ev.error === "service-not-allowed" ? "Permita o uso do microfone para esta página (ícone na barra de endereço)." :
              ev.error === "network" ? "O reconhecimento de voz do navegador precisa de internet." :
              ev.error === "no-speech" ? "Não ouvi nada. Fale mais perto do microfone." : "Erro no reconhecimento de voz: " + ev.error;
      cb(new Error(m));
    };
    r.onend = function () { if (!done) cb(new Error("Não ouvi nada. Tente de novo.")); if (rec === r) rec = null; };
    try { r.start(); } catch (e) { cb(new Error("Não consegui iniciar o microfone.")); }
  }

  // ---------- shadowing ----------
  var sh = null; // { set, items, i, results: [] }

  function sets() {
    var map = {}, order = [];
    ui.content("shadowing").forEach(function (x) { if (!map[x.set]) { map[x.set] = []; order.push(x.set); } map[x.set].push(x); });
    return order.map(function (k) { return { name: k, items: map[k] }; });
  }

  S.speaking = function (arg) {
    var p = ui.profile(), all = sets();
    if (arg) { var s = all.filter(function (x) { return x.name === arg; })[0]; if (s) { sh = { set: s, i: 0, results: [], awarded: [] }; return sentence(); } }
    ui.view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">← Estudar</button></div><h1>Fala — shadowing</h1>' +
      '<p class="muted">Ouça a frase, repita imitando o ritmo e a entonação, e veja quais palavras o reconhecimento de voz entendeu. ' +
      (SR ? 'Funciona melhor no Chrome ou Edge, com internet e o microfone liberado.' : '<strong>Este navegador não tem reconhecimento de voz</strong> — você ainda pode ouvir, repetir e se autoavaliar. Use o Chrome ou o Edge para a pontuação automática.') + '</p>' +
      '<div class="grid cols-2">' + all.map(function (s) {
        var tried = s.items.filter(function (x) { return p.shadowing[x.id]; });
        var avg = tried.length ? Math.round(100 * tried.reduce(function (a, x) { return a + p.shadowing[x.id].best; }, 0) / tried.length) : 0;
        return '<button class="card tile" data-go="speaking" data-arg="' + esc(s.name) + '"><span class="ico-chip" aria-hidden="true">' + App.icon("mic") + '</span><span><strong>' + esc(s.name) + '</strong>' +
          '<small class="muted">' + tried.length + '/' + s.items.length + ' frases' + (tried.length ? ' · média ' + avg + '%' : '') + '</small></span></button>';
      }).join("") + '</div>' + (all.length ? "" : '<p class="pitfall">Nenhuma frase em content/speaking.js.</p>') +
      '<div class="card"><h2>Conversação</h2><p class="muted">Pronto para falar livremente? Converse com um parceiro de IA em situações reais.</p><button class="btn primary" data-go="conversation">Ir para conversação</button></div></div>';
  };

  function sentence() {
    var it = sh.set.items[sh.i];
    if (!it) return shFinish();
    var res = sh.results[sh.i];
    ui.view.innerHTML = '<div class="stack narrow"><div class="session-top"><button class="btn ghost" data-go="speaking" aria-label="Sair">' + App.icon("x") + '</button>' +
      '<div class="bar"><i style="width:' + Math.round(100 * sh.i / sh.set.items.length) + '%"></i></div><strong>' + (sh.i + 1) + '/' + sh.set.items.length + '</strong></div>' +
      '<div class="card stack shadow"><div><span class="tag">' + esc(sh.set.name) + '</span></div>' +
      '<p class="term" style="font-size:1.6rem" id="target">' + (res && res.tokens ? res.tokens.map(function (t) { return '<span class="' + (t.ok ? "hit" : "miss") + '">' + esc(t.w) + '</span>'; }).join(" ") : esc(it.text)) + '</p>' +
      '<p class="muted">' + ui.trToggle(it.pt) + '</p>' + (it.focus ? '<p class="pitfall">' + App.icon("target", "ic-sm") + ' ' + esc(it.focus) + '</p>' : '') +
      '<div class="row"><button class="btn" id="play">' + App.icon("volume-2") + ' Ouvir</button><button class="btn" id="slow">' + App.icon("headphones") + ' Devagar</button>' +
      (SR ? '<button class="btn primary" id="mic">' + App.icon("mic") + ' Falar</button>' : '') + '</div>' +
      '<div id="shRes">' + (res ? resultHTML(res) : (SR ? '' : selfHTML())) + '</div>' +
      (res ? '<button class="btn primary big" id="shNext">' + (sh.i + 1 < sh.set.items.length ? "Próxima frase" : "Terminar") + '</button>' : '') +
      '</div><p class="kbd">Dica: ouça 2–3 vezes antes de falar. Copie a melodia, não só as palavras.</p></div>';
    document.getElementById("play").onclick = function () { ui.speak(it.text); };
    document.getElementById("slow").onclick = function () { ui.speak(it.text, { rate: 0.6 }); };
    ui.bindSpeakButtons();
    var mic = document.getElementById("mic");
    if (mic) mic.onclick = function () {
      ui.stopSpeaking();
      mic.disabled = true; mic.innerHTML = App.icon("mic") + " Ouvindo…";
      listen(function (err, alts) {
        mic.disabled = false; mic.innerHTML = App.icon("mic") + " Falar";
        if (err) { ui.toast(err.message); return; }
        var best = null;
        alts.forEach(function (a) { var d = U.wordDiff(it.text, a); d.heard = a; if (!best || d.score > best.score) best = d; });
        record(it, best.score, best.tokens, best.heard);
      });
    };
    ui.view.querySelectorAll("[data-self]").forEach(function (b) {
      b.onclick = function () { record(it, b.getAttribute("data-self") === "good" ? 1 : 0.4, null, null); };
    });
    var nx = document.getElementById("shNext");
    if (nx) nx.onclick = function () { sh.i++; sentence(); };
    var rt = document.getElementById("retry");
    if (rt) rt.onclick = function () { sh.results[sh.i] = null; sentence(); };
    if (!res) setTimeout(function () { ui.speak(it.text); }, 250);
  }

  function selfHTML() {
    return '<p class="muted">Repita em voz alta e avalie:</p><div class="row"><button class="btn" data-self="good">' + App.icon("check") + ' Saiu bem</button><button class="btn" data-self="bad">' + App.icon("repeat") + ' Preciso treinar</button></div>';
  }
  function resultHTML(r) {
    var pct = Math.round(r.score * 100);
    return '<p class="feedback ' + (r.score >= 0.9 ? "ok" : r.score >= GOOD ? "almost" : "no") + '">' + (r.tokens ? pct + "% das palavras reconhecidas" : (r.score >= GOOD ? "Autoavaliação: saiu bem" : "Autoavaliação: treinar mais")) + '</p>' +
      (r.heard ? '<p class="muted small">Entendi: “' + esc(r.heard) + '”</p>' : '') +
      (r.tokens && r.score < 1 ? '<p class="muted small">Palavras em vermelho não foram reconhecidas — ouça de novo e tente outra vez.</p>' : '') +
      '<button class="btn ghost sm" id="retry">Tentar de novo</button>';
  }

  function record(it, score, tokens, heard) {
    var p = ui.profile(), prev = p.shadowing[it.id];
    p.shadowing[it.id] = { best: Math.max(score, prev ? prev.best : 0), last: score, attempts: (prev ? prev.attempts : 0) + 1, date: ui.today() };
    if (tokens) tokens.forEach(function (t) {
      var w = U.norm(t.w);
      if (!t.ok && w.length >= 3) p.hardWords[w] = (p.hardWords[w] || 0) + 1;
    });
    var first = !sh.awarded[sh.i];
    sh.awarded[sh.i] = true;
    sh.results[sh.i] = { score: score, tokens: tokens, heard: heard };
    App.storage.save();
    if (first) ui.award(score >= GOOD ? 2 : 1);
    sentence();
  }

  function shFinish() {
    var done = sh.results.filter(Boolean), avg = done.length ? Math.round(100 * done.reduce(function (a, r) { return a + r.score; }, 0) / done.length) : 0;
    if (done.length >= 5) ui.markPlan("output");
    ui.view.innerHTML = '<div class="stack narrow"><h1>Set concluído</h1><div class="grid cols-2">' +
      '<div class="card stat"><span class="k">Frases</span><span class="v">' + done.length + '</span></div>' +
      '<div class="card stat"><span class="k">Média</span><span class="v">' + avg + '%</span></div></div>' +
      '<div class="card"><p>As palavras que o reconhecimento não entendeu foram para o Caderno → Palavras difíceis. Treine-as isoladas e depois na frase.</p></div>' +
      '<div class="row"><button class="btn primary" data-go="speaking">Outro set</button><button class="btn" data-go="notebook">Ver palavras difíceis</button><button class="btn ghost" data-go="dashboard">Painel</button></div></div>';
  }

  // ---------- conversação ----------
  var conv = null; // { sc, msgs: [{role, content}], busy, voice, ended }
  var START = "[The role-play starts now. Say your first line.]";

  S.conversation = function (arg) {
    var p = ui.profile(), list = ui.content("scenarios");
    if (arg) { var sc = list.filter(function (x) { return x.id === arg; })[0]; if (sc) return chat(sc); }
    ui.view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">← Estudar</button></div><h1>Conversação</h1>' +
      '<p class="muted">Um parceiro de IA faz o papel do outro lado. Ele não corrige durante a conversa — no fim você recebe a correção completa e os erros viram cards.' +
      (ai.hasKey(p) ? '' : ' <strong>Sem chave de API:</strong> você recebe um roteiro para fazer a conversa no claude.ai (de preferência no modo de voz).') + '</p>' +
      '<div class="grid cols-2">' + list.map(function (sc) {
        var n = p.conversations.filter(function (c) { return c.scenarioId === sc.id; }).length;
        return '<button class="card tile" data-go="conversation" data-arg="' + esc(sc.id) + '"><span class="ico-chip" aria-hidden="true">' + App.icon("messages-square") + '</span><span><strong>' + esc(sc.title) + '</strong>' +
          '<small class="muted">' + esc(sc.level) + (n ? ' · feita ' + n + '×' : '') + '</small></span></button>';
      }).join("") + '</div>' + (list.length ? "" : '<p class="pitfall">Nenhum cenário em content/speaking.js.</p>') + '</div>';
  };

  function chat(sc) {
    var p = ui.profile();
    conv = { sc: sc, msgs: [{ role: "assistant", content: sc.opener }], busy: false, voice: true, ended: false };
    if (!ai.hasKey(p)) return offline(sc);
    renderChat();
    if (conv.voice) ui.speak(sc.opener);
  }

  function offline(sc) {
    ui.view.innerHTML = '<div class="stack narrow"><div class="row"><button class="btn ghost" data-go="conversation">← Cenários</button></div><h1>' + esc(sc.title) + '</h1>' +
      '<div class="card"><p>' + esc(sc.setting_pt) + '</p><p><strong>Seu objetivo:</strong> ' + esc(sc.goal_pt) + '</p></div>' +
      usefulHTML(sc) +
      '<div class="card stack"><h2>Fazer no claude.ai</h2><ol class="muted"><li>Clique em <strong>Copiar roteiro</strong>.</li><li>Abra o claude.ai (de preferência o <strong>modo de voz</strong> no celular), cole e envie.</li>' +
      '<li>Converse por 5–10 minutos. No final, diga <strong>FEEDBACK</strong> para receber a correção.</li></ol>' +
      '<div class="row"><button class="btn primary" id="cpy">Copiar roteiro</button><button class="btn" id="didIt">Fiz a conversa ✓</button></div>' +
      '<p class="muted small">Com uma chave de API em Ajustes, a conversa acontece aqui dentro, com voz e correção automática.</p></div></div>';
    ui.bindSpeakButtons();
    document.getElementById("cpy").onclick = function () { ui.copyText(ai.externalConversationPrompt(sc)); };
    var did = document.getElementById("didIt");
    var already = ui.profile().conversations.some(function (c) { return c.scenarioId === sc.id && c.external && c.date === ui.today(); });
    if (already) { did.disabled = true; did.textContent = "Registrado hoje ✓"; }
    did.onclick = function () {
      var p = ui.profile();
      p.conversations.unshift({ scenarioId: sc.id, title: sc.title, date: ui.today(), turns: 0, external: true });
      App.storage.save(); ui.award(15); ui.markPlan("output");
      this.disabled = true; this.textContent = "Registrado ✓ (+15 XP)";
    };
  }

  function usefulHTML(sc) {
    return (sc.useful || []).length ? '<details class="card"><summary><strong>Frases úteis</strong></summary><ul class="list">' + sc.useful.map(function (u) {
      return '<li class="serif">' + esc(u) + ' ' + ui.speakBtn(u, true) + ui.trToggle(ui.trOf(u)) + '</li>'; }).join("") + '</ul></details>' : '';
  }

  function learnerTurns() { return conv.msgs.filter(function (m) { return m.role === "user"; }).length; }

  function renderChat() {
    var sc = conv.sc;
    ui.view.innerHTML = '<div class="stack narrow chatwrap"><div class="row" style="justify-content:space-between"><button class="btn ghost" data-go="conversation">← Cenários</button>' +
      '<label class="switch small"><input type="checkbox" id="voiceTog"' + (conv.voice ? " checked" : "") + '> voz da IA</label></div>' +
      '<h1>' + esc(sc.title) + '</h1><div class="card"><p class="small">' + esc(sc.setting_pt) + ' <strong>Objetivo:</strong> ' + esc(sc.goal_pt) + '</p></div>' + usefulHTML(sc) +
      '<div class="chat" id="chat">' + conv.msgs.map(function (m) {
        return '<div class="bubble ' + (m.role === "user" ? "me" : "them") + '">' + esc(m.content) +
          (m.role === "assistant" ? ' ' + ui.speakBtn(m.content, true) : '') + '</div>';
      }).join("") + (conv.busy ? '<div class="bubble them typing">…</div>' : '') + '</div>' +
      (conv.ended ? '<div id="convFb"></div>' :
      '<form id="chatForm" class="chatbar">' + (SR ? '<button type="button" class="btn" id="cmic" aria-label="Falar"' + (conv.busy ? " disabled" : "") + '>' + App.icon("mic") + '</button>' : '') +
        '<input class="input" id="cin" autocomplete="off" placeholder="Type or speak your answer..."' + (conv.busy ? " disabled" : "") + '>' +
        '<button class="btn primary" type="submit"' + (conv.busy ? " disabled" : "") + '>Enviar</button></form>' +
      '<button class="btn big" id="endConv"' + (learnerTurns() < 3 || conv.busy ? " disabled" : "") + '>Encerrar e receber correção' + (learnerTurns() < 3 ? " (fale pelo menos 3 vezes)" : "") + '</button>') +
      '</div>';
    ui.bindSpeakButtons();
    var box = document.getElementById("chat"); box.scrollTop = box.scrollHeight;
    document.getElementById("voiceTog").onchange = function () { conv.voice = this.checked; if (!conv.voice) ui.stopSpeaking(); };
    var f = document.getElementById("chatForm");
    if (f) {
      var inp = document.getElementById("cin");
      if (conv.draft && !conv.busy) { inp.value = conv.draft; conv.draft = ""; }
      if (!conv.busy) setTimeout(function () { inp.focus(); }, 30);
      f.onsubmit = function (e) { e.preventDefault(); send(inp.value.trim()); };
      var m = document.getElementById("cmic");
      if (m) m.onclick = function () {
        ui.stopSpeaking(); m.disabled = true; m.classList.add("rec");
        listen(function (err, alts) {
          var mm = document.getElementById("cmic"), ci = document.getElementById("cin");
          if (mm) { mm.disabled = !!conv.busy; mm.classList.remove("rec"); }
          if (err) { ui.toast(err.message); return; }
          if (ci && !ci.disabled) { ci.value = (ci.value ? ci.value + " " : "") + alts[0]; ci.focus(); }
          else conv.draft = (conv.draft ? conv.draft + " " : "") + alts[0];
        });
      };
      document.getElementById("endConv").onclick = endConv;
    }
  }

  function apiMessages() { return [{ role: "user", content: START }].concat(conv.msgs); }

  function send(text) {
    if (!text || conv.busy) return;
    conv.msgs.push({ role: "user", content: text });
    conv.busy = true; renderChat();
    var p = ui.profile(), mine = conv;
    ai.call(p, ai.conversationSystem(conv.sc), apiMessages(), 300).then(function (reply) {
      if (conv !== mine) return;
      conv.busy = false; conv.msgs.push({ role: "assistant", content: reply.trim() });
      if (ui.route() === "conversation" && document.getElementById("chat")) { renderChat(); if (conv.voice) ui.speak(reply); }
    }, function (err) {
      if (conv !== mine) return;
      conv.busy = false; conv.msgs.pop();
      if (ui.route() === "conversation" && document.getElementById("chat")) { renderChat(); document.getElementById("cin").value = text; }
      ui.toast(err.message);
    });
  }

  function endConv() {
    var sc = conv.sc, p = ui.profile(), mine = conv;
    var transcript = conv.msgs.map(function (m) { return (m.role === "user" ? "LEARNER: " : "PARTNER: ") + m.content; }).join("\n");
    var req = ai.conversationFeedback(sc, transcript);
    conv.ended = true; ui.stopSpeaking(); renderChat();
    var area = document.getElementById("convFb");
    area.innerHTML = '<div class="card"><p class="muted">Analisando sua conversa...</p><div class="bar"><i class="loading"></i></div></div>';
    var entry = { scenarioId: sc.id, title: sc.title, date: ui.today(), turns: learnerTurns(), feedback: null };
    p.conversations.unshift(entry); App.storage.save();
    var gained = ui.award(25); ui.markPlan("output");
    ai.call(p, req.system, [{ role: "user", content: req.user }], 3000).then(function (txt) {
      if (conv !== mine) return;
      var fb = ai.parseFeedback(txt); entry.feedback = fb; App.storage.save();
      area.innerHTML = '<p class="feedback ok">Conversa concluída: +' + gained + ' XP</p>' + ui.feedbackHTML(fb) +
        '<div class="row"><button class="btn primary" data-go="conversation">Outro cenário</button><button class="btn" data-go="dashboard">Painel</button></div>';
      ui.bindFeedback(fb, "conversa: " + sc.title);
    }, function (err) {
      if (conv !== mine) return;
      area.innerHTML = '<p class="feedback no">' + esc(err.message) + '</p>' + ui.pasteBackHTML("cv");
      document.getElementById("cvCopy").onclick = function () { ui.copyText(ai.externalPrompt(req)); };
      document.getElementById("cvApply").onclick = function () {
        try { var fb = ai.parseFeedback(document.getElementById("cvPaste").value); entry.feedback = fb; App.storage.save(); area.innerHTML = ui.feedbackHTML(fb); ui.bindFeedback(fb, "conversa: " + sc.title); }
        catch (e) { ui.toast("Não reconheci a resposta: " + e.message); }
      };
    });
  }

  App.speaking = { stop: function () { stopRec(); }, listen: listen };
})();
