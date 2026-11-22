/* AppEnglish — jogos rápidos para memorizar: Memória, Relâmpago, Monte a frase e Ditado. */
(function () {
  "use strict";
  var ui = App.ui, S = App.screens, U = App.util, esc = ui.esc, I = App.icon;
  var GAMES = [
    { id: "memory", icon: "grid-2x2", name: "Memória", desc: "Encontre os pares inglês ↔ português." },
    { id: "flash", icon: "zap", name: "Relâmpago", desc: "60 segundos: escolha o significado certo, o mais rápido que puder." },
    { id: "builder", icon: "shuffle", name: "Monte a frase", desc: "Coloque as palavras na ordem certa." },
    { id: "dictation", icon: "headphones", name: "Ditado", desc: "Ouça a frase e escreva o que entendeu." }
  ];
  var timer = null;
  function clear() { if (timer) { clearInterval(timer); timer = null; } }

  function pool() {
    var p = ui.profile(), items = ui.itemsOf(ui.activeDecks(p)).filter(function (it) { return it.pt && it.term; });
    var seen = items.filter(function (it) { return p.cards[it.id] && p.cards[it.id].state !== "new"; });
    return seen.length >= 12 ? seen : items;
  }
  function few() { S.games(); ui.toast("Ainda há poucas palavras nos seus decks ativos para este jogo. Estude alguns cards primeiro."); }
  function shortPt(s) { return String(s).split(/[,;(]/)[0].trim() || s; }
  function stats() { var p = ui.profile(); p.games = p.games || { played: 0, best: {} }; return p.games; }
  function finish(id, xp, extraBest) {
    var g = stats(); g.played++;
    if (extraBest !== undefined) g.best[id] = Math.max(g.best[id] || 0, extraBest);
    App.storage.save();
    return xp > 0 ? ui.award(xp) : 0;
  }
  function header(title, right) {
    return '<div class="session-top"><button class="btn ghost icon-btn" data-go="games" aria-label="Sair">' + I("x") + '</button>' +
      '<strong class="grow">' + esc(title) + '</strong>' + (right || "") + '</div>';
  }
  function endScreen(title, lines, gained, again) {
    if (App.fx) App.fx.confetti(60);
    ui.view.innerHTML = '<div class="stack narrow"><h1>' + esc(title) + '</h1><div class="card stack">' + lines.map(function (l) { return '<p>' + l + '</p>'; }).join("") +
      '<p class="feedback ok">+' + gained + ' XP</p></div><div class="row"><button class="btn primary" id="again">' + I("rotate-ccw") + ' Jogar de novo</button>' +
      '<button class="btn" data-go="games">Outros jogos</button></div></div>';
    document.getElementById("again").onclick = again;
  }

  S.games = function (id) {
    clear();
    if (id === "memory") return memory();
    if (id === "flash") return flash();
    if (id === "builder") return builder();
    if (id === "dictation") return dictation();
    var g = stats();
    ui.view.innerHTML = '<div class="stack"><div class="row"><button class="btn ghost" data-go="study">' + I("arrow-left") + ' Estudar</button></div><h1>Jogos</h1>' +
      '<p class="muted">Partidas curtas com o vocabulário dos seus decks (de preferência o que você já começou a estudar). Bom para fixar e para os dias corridos.</p>' +
      (pool().length < 8 ? '<p class="pitfall">Estude alguns cards de vocabulário primeiro — os jogos usam os seus decks ativos.</p>' : '') +
      '<div class="grid cols-2">' + GAMES.map(function (x) {
        return '<button class="card tile" data-go="games" data-arg="' + x.id + '"><span class="ico-chip" aria-hidden="true">' + I(x.icon) + '</span><span><strong>' + x.name + '</strong>' +
          '<small class="muted">' + x.desc + (x.id === "flash" && g.best.flash ? ' Recorde: ' + g.best.flash + '.' : '') + '</small></span></button>';
      }).join("") + '</div></div>';
  };

  // ---------- Memória ----------
  function memory() {
    var seenPt = {}, items = U.shuffle(pool()).filter(function (it) { var k = U.norm(shortPt(it.pt)); if (seenPt[k]) return false; seenPt[k] = 1; return true; }).slice(0, 6), tiles = [];
    if (items.length < 4) return few();
    items.forEach(function (it, k) { tiles.push({ k: k, t: it.term, en: true }); tiles.push({ k: k, t: shortPt(it.pt), en: false }); });
    tiles = U.shuffle(tiles);
    var open = [], found = 0, moves = 0, t0 = Date.now(), lock = false;
    ui.view.innerHTML = '<div class="stack narrow">' + header("Memória", '<span class="muted" id="mv">0 jogadas</span>') +
      '<div class="memgrid">' + tiles.map(function (x, i) {
        return '<button class="memtile" data-i="' + i + '" aria-label="Carta virada"><span class="front">' + esc(x.t) + '</span><span class="back" aria-hidden="true">' + I("sparkles") + '</span></button>';
      }).join("") + '</div></div>';
    ui.view.querySelectorAll(".memtile").forEach(function (b) {
      b.onclick = function () {
        var i = +b.getAttribute("data-i");
        if (lock || b.classList.contains("up") || b.classList.contains("done")) return;
        b.classList.add("up"); b.setAttribute("aria-label", tiles[i].t); open.push(b);
        if (tiles[i].en) ui.speak(tiles[i].t);
        if (open.length < 2) return;
        moves++; document.getElementById("mv").textContent = moves + " jogadas";
        var a = tiles[+open[0].getAttribute("data-i")], c = tiles[+open[1].getAttribute("data-i")];
        if (a.k === c.k && a.en !== c.en) {
          open.forEach(function (x) { x.classList.add("done"); }); open = []; found++;
          if (found === items.length) {
            var secs = Math.round((Date.now() - t0) / 1000), xp = 10 + (moves <= items.length + 3 ? 5 : 0);
            setTimeout(function () { if (!document.body.contains(b)) return; endScreen("Todos os pares!", [moves + " jogadas em " + secs + " s."], finish("memory", xp), memory); }, 500);
          }
        } else {
          lock = true;
          setTimeout(function () { open.forEach(function (x) { x.classList.remove("up"); x.setAttribute("aria-label", "Carta virada"); }); open = []; lock = false; }, 850);
        }
      };
    });
  }

  // ---------- Relâmpago ----------
  function flash() {
    var all = pool();
    if (all.length < 4) return few();
    var score = 0, combo = 0, left = 60, q = null;
    function next() {
      if (!document.getElementById("fq")) return; // saiu da tela
      var answered = false;
      var it = all[Math.floor(Math.random() * all.length)];
      var wrong = U.shuffle(all.filter(function (x) { return shortPt(x.pt) !== shortPt(it.pt); })).slice(0, 3).map(function (x) { return shortPt(x.pt); });
      var opts = U.shuffle([shortPt(it.pt)].concat(wrong));
      q = { it: it, opts: opts, ans: opts.indexOf(shortPt(it.pt)) };
      document.getElementById("fq").textContent = it.term;
      document.getElementById("fo").innerHTML = opts.map(function (o, i) { return '<button class="btn choice" data-o="' + i + '">' + esc(o) + '</button>'; }).join("");
      document.querySelectorAll("#fo [data-o]").forEach(function (b) {
        b.onclick = function () {
          if (answered) return; answered = true;
          var ok = +b.getAttribute("data-o") === q.ans;
          if (ok) { score++; combo++; } else { combo = 0; b.classList.add("wrong"); }
          document.getElementById("fs").textContent = score + (combo >= 3 ? " · combo x" + combo : "");
          var box = document.getElementById("fcard"); box.classList.remove("hit", "miss"); void box.offsetWidth; box.classList.add(ok ? "hit" : "miss");
          setTimeout(next, ok ? 120 : 450);
        };
      });
    }
    ui.view.innerHTML = '<div class="stack narrow">' + header("Relâmpago", '<strong id="fs">0</strong>') +
      '<div class="bar"><i id="ft" style="width:100%"></i></div>' +
      '<div class="card stack" id="fcard"><p class="term" id="fq"></p><div class="choices" id="fo"></div></div></div>';
    next();
    timer = setInterval(function () {
      left--;
      var el = document.getElementById("ft");
      if (!el) { clear(); return; }
      el.style.width = (100 * left / 60) + "%";
      if (left <= 0) {
        clear();
        var best = (stats().best.flash || 0);
        endScreen("Tempo!", [score + " acertos" + (score > best ? " — novo recorde!" : " (recorde: " + best + ")")], finish("flash", Math.min(25, score), score), flash);
      }
    }, 1000);
  }

  // ---------- frases dos decks ----------
  function sentences(maxWords) {
    var out = [];
    pool().forEach(function (it) { (it.examples || []).forEach(function (e) { var n = U.countWords(e); if (n >= 4 && n <= maxWords && !/[“”"]/.test(e)) out.push(e); }); });
    return U.shuffle(out).slice(0, 5);
  }

  // ---------- Monte a frase ----------
  function builder() {
    var list = sentences(12), i = 0, right = 0;
    if (!list.length) return few();
    function round() {
      var s = list[i]; if (!s) return endScreen("Fim da rodada", [right + " de " + list.length + " frases montadas certinho."], finish("builder", right * 3), builder);
      var words = s.split(/\s+/), shuffled = U.shuffle(words.map(function (w, k) { return { w: w, k: k }; })), picked = [];
      function draw() {
        ui.view.innerHTML = '<div class="stack narrow">' + header("Monte a frase", '<span class="muted">' + (i + 1) + '/' + list.length + '</span>') +
          '<div class="card stack"><p class="muted">Toque nas palavras na ordem certa. ' + (ui.trOf(s) ? 'Dica: ' + ui.trToggle(ui.trOf(s)) : '') + '</p>' +
          '<div class="buildline" aria-live="polite">' + (picked.length ? picked.map(function (x, j) { return '<button class="chip on" data-back="' + j + '">' + esc(x.w) + '</button>'; }).join("") : '<span class="muted">…</span>') + '</div>' +
          '<div class="chips">' + shuffled.map(function (x, j) { return picked.indexOf(x) >= 0 ? '' : '<button class="chip" data-pick="' + j + '">' + esc(x.w) + '</button>'; }).join("") + '</div>' +
          '<div class="row"><button class="btn primary" id="bCheck"' + (picked.length === words.length ? "" : " disabled") + '>Verificar</button><button class="btn ghost" id="bSkip">Pular</button></div></div></div>';
        ui.bindSpeakButtons();
        ui.view.querySelectorAll("[data-pick]").forEach(function (b) { b.onclick = function () { picked.push(shuffled[+b.getAttribute("data-pick")]); draw(); }; });
        ui.view.querySelectorAll("[data-back]").forEach(function (b) { b.onclick = function () { picked.splice(+b.getAttribute("data-back"), 1); draw(); }; });
        document.getElementById("bSkip").onclick = function () { show(false); };
        document.getElementById("bCheck").onclick = function () {
          show(U.norm(picked.map(function (x) { return x.w; }).join(" ")) === U.norm(s));
        };
      }
      function show(ok) {
        if (ok) right++;
        ui.view.innerHTML = '<div class="stack narrow">' + header("Monte a frase", '<span class="muted">' + (i + 1) + '/' + list.length + '</span>') +
          '<div class="card stack"><p class="feedback ' + (ok ? "ok" : "no") + '">' + (ok ? "Isso!" : "A ordem certa é:") + '</p><p class="cloze">' + esc(s) + ' ' + ui.speakBtn(s) + '</p>' +
          (ui.trOf(s) ? '<p class="muted">' + esc(ui.trOf(s)) + '</p>' : '') + '<button class="btn primary big" id="bNext">Próxima</button></div></div>';
        ui.bindSpeakButtons();
        document.getElementById("bNext").onclick = function () { i++; round(); };
        if (ok) ui.speak(s);
      }
      draw();
    }
    round();
  }

  // ---------- Ditado ----------
  function dictation() {
    var list = sentences(14), i = 0, right = 0;
    if (!list.length) return few();
    function round() {
      var s = list[i]; if (!s) return endScreen("Fim do ditado", [right + " de " + list.length + " frases certas (80% das palavras ou mais)."], finish("dictation", right * 3), dictation);
      ui.view.innerHTML = '<div class="stack narrow">' + header("Ditado", '<span class="muted">' + (i + 1) + '/' + list.length + '</span>') +
        '<div class="card stack"><p class="muted">Ouça quantas vezes quiser e escreva a frase.</p>' +
        '<div class="row"><button class="btn primary" id="dPlay">' + I("volume-2") + ' Ouvir</button><button class="btn" id="dSlow">' + I("headphones") + ' Devagar</button></div>' +
        '<form id="dForm" class="stack"><input class="input" id="dIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escreva o que ouviu">' +
        '<button class="btn primary" type="submit">Conferir</button></form></div></div>';
      document.getElementById("dPlay").onclick = function () { ui.speak(s); };
      document.getElementById("dSlow").onclick = function () { ui.speak(s, { rate: 0.6 }); };
      setTimeout(function () { ui.speak(s); }, 300);
      var inp = document.getElementById("dIn"); setTimeout(function () { inp.focus(); }, 50);
      document.getElementById("dForm").onsubmit = function (e) {
        e.preventDefault();
        var d = U.wordDiff(s, inp.value), ok = d.score >= 0.8;
        if (ok) right++;
        ui.view.innerHTML = '<div class="stack narrow">' + header("Ditado", '<span class="muted">' + (i + 1) + '/' + list.length + '</span>') +
          '<div class="card stack shadow"><p class="feedback ' + (ok ? "ok" : "no") + '">' + Math.round(d.score * 100) + '% das palavras</p>' +
          '<p class="term" style="font-size:1.3rem">' + d.tokens.map(function (t) { return '<span class="' + (t.ok ? "hit" : "miss") + '">' + esc(t.w) + '</span>'; }).join(" ") + '</p>' +
          '<p class="muted small">Você escreveu: ' + esc(inp.value || "—") + '</p>' + (ui.trOf(s) ? '<p class="muted">' + esc(ui.trOf(s)) + '</p>' : '') +
          '<div class="row">' + ui.speakBtn(s) + '<button class="btn primary" id="dNext">Próxima</button></div></div></div>';
        ui.bindSpeakButtons();
        document.getElementById("dNext").onclick = function () { i++; round(); };
      };
    }
    round();
  }

  App.games = { GAMES: GAMES, stop: clear };
})();
