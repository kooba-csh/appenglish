/* AppEnglish — Fase 3: escrita com correção por IA, caderno de erros e Chefão da semana. */
(function () {
  "use strict";
  var ui = App.ui, U = App.util, S = App.screens, ai = App.ai, esc = ui.esc;
  var BOSS_XP = 50, BOSS_MIN = 12, WRITE_XP = 20, REVIEW_XP = 10;
  var TYPE = { email: "E-mail", opinion: "Opinião", story: "Relato", technical: "Técnico", description: "Descrição" };

  function weekKey() { return App.game.weekKey(ui.today()); }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function bossTask() {
    var list = ui.content("writing"), LV = ["A1", "A2", "B1", "B2", "C1"], p = ui.profile();
    var me = Math.max(0, LV.indexOf((p && p.level) || "B2")), want = LV[Math.min(4, me + 1)];
    // Chefão = um nível acima do seu (no C1, o próprio C1); se não houver, o mais difícil disponível
    var pool = list.filter(function (w) { return w.level === want; });
    for (var k = 4; !pool.length && k >= 0; k--) pool = list.filter(function (w) { return w.level === LV[k]; });
    if (!pool.length) pool = list;
    return pool.length ? pool[hash(weekKey()) % pool.length] : null;
  }
  function bossDone(p) { return p.writings.some(function (w) { return w.boss && w.week === weekKey() && w.bossWon; }); }

  function taskFromArg(arg) {
    if (!arg) return null;
    if (arg.indexOf("reading:") === 0) {
      var r = ui.content("readings").filter(function (x) { return x.id === arg.slice(8); })[0];
      if (!r) return null;
      return { id: "free-" + r.id, type: "opinion", title: "Sobre a leitura: " + r.title, level: r.level, prompt_en: r.discussion,
               prompt_pt: "Responda à pergunta da leitura com a sua opinião e exemplos.", minWords: 80, maxWords: 150, tips_pt: [], useful: [] };
    }
    if (arg === "boss") { var b = bossTask(); return b ? Object.assign({ boss: true }, b) : null; }
    return ui.content("writing").filter(function (w) { return w.id === arg; })[0] || null;
  }

  S.writing = function (arg) {
    var task = taskFromArg(arg);
    if (task) return editor(task);
    var p = ui.profile(), list = ui.content("writing"), boss = bossTask(), done = {};
    p.writings.forEach(function (w) { done[w.promptId] = true; });
    ui.view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">← Estudar</button></div><h1>Escrita</h1>' +
      '<p class="muted">Escrever é onde o inglês "passivo" vira ativo. A IA corrige, explica em português e seus erros viram cards de revisão.' +
      (ai.hasKey(p) ? '' : ' Sem chave de API configurada: a correção funciona no modo <strong>copiar e colar</strong> com o claude.ai.') + '</p>' +
      (boss ? '<div class="card boss"><span class="tag">' + App.icon("swords", "ic-sm") + ' chefão da semana · +' + BOSS_XP + ' XP</span><h2>' + esc(boss.title) + '</h2><p class="serif">' + esc(boss.prompt_en) + '</p>' +
        '<p class="muted small">Vença com nota de ' + BOSS_MIN + '/20 ou mais na correção por IA.</p>' +
        (bossDone(p) ? '<p class="feedback ok">Chefão desta semana vencido ✓</p>' : '<button class="btn primary" data-go="writing" data-arg="boss">Enfrentar o chefão</button>') + '</div>' : '') +
      Object.keys(TYPE).map(function (type) {
        var items = list.filter(function (w) { return w.type === type; });
        if (!items.length) return "";
        return '<h2>' + TYPE[type] + '</h2><div class="grid cols-2">' + items.map(function (w) {
          return '<button class="card tile" data-go="writing" data-arg="' + esc(w.id) + '"><span class="ico-chip" aria-hidden="true">' + App.icon(done[w.id] ? "circle-check" : "pen-line") + '</span><span><strong>' + esc(w.title) + '</strong>' +
            '<small class="muted">' + esc(w.level) + '</small></span></button>';
        }).join("") + '</div>';
      }).join("") + (list.length ? "" : '<p class="pitfall">Nenhuma proposta em content/writing.js.</p>') + '</div>';
  };

  function draftKey(task) { return "draft:" + task.id; }

  function editor(task) {
    var p = ui.profile();
    p.drafts = p.drafts || {};
    ui.view.innerHTML = '<div class="stack narrow"><div class="row"><button class="btn ghost" data-go="writing">← Escrita</button></div>' +
      '<div><span class="tag">' + esc(TYPE[task.type] || task.type) + '</span><span class="tag">' + esc(task.level) + '</span>' + (task.boss ? '<span class="tag">' + App.icon("swords", "ic-sm") + ' chefão</span>' : '') + '</div>' +
      '<h1>' + esc(task.title) + '</h1>' +
      '<div class="card"><p class="serif" style="font-size:1.1rem">' + esc(task.prompt_en) + '</p>' + (task.prompt_pt ? '<p class="muted">' + esc(task.prompt_pt) + '</p>' : '') + '</div>' +
      ((task.tips_pt || []).length || (task.useful || []).length ? '<details class="card"><summary><strong>Dicas e frases úteis</strong></summary>' +
        (task.tips_pt || []).map(function (t) { return '<p class="muted">• ' + esc(t) + '</p>'; }).join("") +
        ((task.useful || []).length ? '<div class="chips">' + task.useful.map(function (u) { return '<button class="chip" data-insert="' + esc(u) + '">' + esc(u) + '</button>'; }).join("") + '</div><p class="muted small">Clique numa frase para inserir no texto.</p>' : '') +
        '</details>' : '') +
      '<textarea class="input writing" id="wText" placeholder="Write here...">' + esc(p.drafts[draftKey(task)] || "") + '</textarea>' +
      '<p class="muted small">Sem limite de tamanho: escreva o quanto conseguir. Mais texto = mais prática e uma correção mais completa.</p>' +
      '<div class="row" style="justify-content:space-between"><span id="wCount" class="muted"></span><button class="btn primary" id="wSubmit">Enviar para correção</button></div></div>';
    var ta = document.getElementById("wText"), cnt = document.getElementById("wCount");
    function update() {
      var n = U.countWords(ta.value);
      cnt.textContent = n + (n === 1 ? " palavra" : " palavras");
      cnt.className = "muted";
    }
    var t0;
    ta.oninput = function () {
      update(); clearTimeout(t0);
      t0 = setTimeout(function () { p.drafts[draftKey(task)] = ta.value; App.storage.save(); }, 600);
    };
    update();
    ui.view.querySelectorAll("[data-insert]").forEach(function (b) {
      b.onclick = function () {
        var s = b.getAttribute("data-insert"), pos = ta.selectionStart || ta.value.length;
        ta.value = ta.value.slice(0, pos) + (pos && !/\s$/.test(ta.value.slice(0, pos)) ? " " : "") + s + " " + ta.value.slice(pos);
        ta.focus(); ta.oninput();
      };
    });
    document.getElementById("wSubmit").onclick = function () {
      clearTimeout(t0);
      var text = ta.value.trim(), n = U.countWords(text);
      if (!n) { ui.toast("Escreva alguma coisa antes de enviar."); return; }
      var entry = { id: "w" + Date.now().toString(36), promptId: task.id, title: task.title, type: task.type, level: task.level, text: text, words: n,
                    date: ui.today(), boss: !!task.boss, week: weekKey(), feedback: null };
      p.writings.unshift(entry);
      delete p.drafts[draftKey(task)];
      App.storage.save();
      ui.award(WRITE_XP);
      ui.markPlan("output");
      correction(task, entry);
    };
  }

  function correction(task, entry) {
    var p = ui.profile(), req = ai.writingRequest(task, entry.text);
    ui.view.innerHTML = '<div class="stack narrow"><div class="row"><button class="btn ghost" data-go="writing">← Escrita</button></div><h1>' + esc(task.title) + '</h1>' +
      '<p class="feedback ok">Texto salvo (+' + WRITE_XP + ' XP). Agora a parte mais importante: a correção.</p>' +
      '<details class="card"><summary><strong>Seu texto</strong> · ' + entry.words + ' palavras</summary><p class="serif">' + esc(entry.text).replace(/\n/g, "<br>") + '</p></details>' +
      '<div id="fbArea"></div></div>';
    var area = document.getElementById("fbArea");
    function apply(fb) {
      entry.feedback = fb; App.storage.save();
      var total = ai.total(fb), extra = ui.award(REVIEW_XP), won = false;
      if (entry.boss && !bossDone(p) && total >= BOSS_MIN) { entry.bossWon = true; App.storage.save(); extra += ui.award(BOSS_XP); won = true; }
      area.innerHTML = (entry.boss ? '<p class="feedback ' + (won ? "ok" : "almost") + '">' + (won ? "Chefão vencido! +" + BOSS_XP + " XP" : "Nota " + total + "/20 — o chefão pede " + BOSS_MIN + ". Reescreva usando a correção e tente de novo.") + '</p>' : '') +
        ui.feedbackHTML(fb) + '<p class="muted small">+' + extra + ' XP pela correção.</p>' +
        '<div class="row"><button class="btn primary" data-go="writing">Outra proposta</button><button class="btn" data-go="dashboard">Painel</button></div>';
      ui.bindFeedback(fb, "escrita: " + task.title);
    }
    function run() {
      area.innerHTML = '<div class="card stack" aria-live="polite"><p class="muted" id="wrProg">Enviando para a IA…</p><div class="bar"><i class="loading"></i></div>' +
        '<p class="muted small">Dica: o modelo Haiku (Ajustes) corrige bem mais rápido.</p></div>';
      var prog = document.getElementById("wrProg");
      ai.call(p, req.system, [{ role: "user", content: req.user }], 2500, {
        onProgress: function (t, secs) { if (prog) prog.textContent = "Recebendo a correção… " + Math.round(secs) + " s"; }
      }).then(function (txt) {
        var fb;
        try { fb = ai.parseFeedback(txt); } catch (e) { throw new Error("A resposta da IA veio incompleta. Tente de novo."); }
        if (!document.body.contains(area)) { entry.feedback = fb; App.storage.save(); ui.toast("Correção pronta — veja no Caderno."); return; }
        apply(fb);
      }).catch(function (err) {
        if (!document.body.contains(area)) return;
        area.innerHTML = '<p class="feedback no">' + esc(err.message) + '</p><div class="row"><button class="btn primary" id="wrRetry">Tentar de novo</button></div>' + ui.pasteBackHTML("wr");
        document.getElementById("wrRetry").onclick = run;
        bindPaste();
      });
    }
    if (ai.hasKey(p)) {
      run();
    } else {
      area.innerHTML = ui.pasteBackHTML("wr");
      bindPaste();
    }
    function bindPaste() {
      document.getElementById("wrCopy").onclick = function () { ui.copyText(ai.externalPrompt(req)); };
      document.getElementById("wrApply").onclick = function () {
        try { apply(ai.parseFeedback(document.getElementById("wrPaste").value)); }
        catch (e) { ui.toast("Não reconheci a resposta: " + e.message + " Cole a resposta inteira do Claude."); }
      };
    }
  }

  App.writing = { bossTask: bossTask };
})();
