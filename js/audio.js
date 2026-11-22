/* AppEnglish — áudio: vozes Kokoro (geradas no navegador, num worker) + voz do navegador como reserva.
   - Velocidades 0.5x a 1.5x sem distorcer a voz (playbackRate + preservesPitch).
   - Pausar/continuar de onde parou; textos longos são lidos frase a frase.
   - Áudios gerados ficam guardados (IndexedDB) para tocar na hora da próxima vez. */
(function () {
  "use strict";
  var KOKORO_URLS = ["https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm", "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js"];
  var MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";
  var VOICES = [
    { id: "af_heart", name: "Heart", desc: "feminina · americana" },
    { id: "am_michael", name: "Michael", desc: "masculina · americana" },
    { id: "bf_emma", name: "Emma", desc: "feminina · britânica" },
    { id: "af_bella", name: "Bella", desc: "feminina · americana" },
    { id: "am_fenrir", name: "Fenrir", desc: "masculina · americana" },
    { id: "native", name: "Voz do navegador", desc: "instantânea, sem download" }
  ];
  var RATES = [0.5, 0.75, 1, 1.1, 1.25, 1.5];

  function prefs() {
    var p = App.ui && App.ui.profile();
    var a = (p && p.audio) || {};
    return { voice: a.voice || "af_heart", rate: a.rate || 1 };
  }
  function setPrefs(ch) {
    var p = App.ui.profile(); if (!p) return;
    p.audio = Object.assign(prefs(), ch); App.storage.save();
  }

  // ---------- cache (IndexedDB) ----------
  var dbP = null;
  function db() {
    if (dbP) return dbP;
    dbP = new Promise(function (res) {
      try {
        var r = indexedDB.open("appenglish-tts", 1);
        r.onupgradeneeded = function () { r.result.createObjectStore("a"); };
        r.onsuccess = function () { res(r.result); };
        r.onerror = function () { res(null); };
      } catch (e) { res(null); }
    });
    return dbP;
  }
  function cacheGet(k) {
    return db().then(function (d) {
      if (!d) return null;
      return new Promise(function (res) {
        try { var q = d.transaction("a").objectStore("a").get(k); q.onsuccess = function () { res(q.result || null); }; q.onerror = function () { res(null); }; }
        catch (e) { res(null); }
      });
    });
  }
  function cachePut(k, blob) {
    db().then(function (d) { try { if (d) d.transaction("a", "readwrite").objectStore("a").put(blob, k); } catch (e) { /* cheio: ignora */ } });
  }
  var mem = {}; // voz|texto -> objectURL

  // ---------- Kokoro em worker ----------
  var worker = null, ready = false, broken = false, seq = 0, waiting = {}, loadWaiters = [], lastPct = -1;
  var WORKER_CODE =
    "let tts=null;const URLS=" + JSON.stringify(KOKORO_URLS) + ";\n" +
    "async function load(){if(tts)return tts;let mod,err;for(const u of URLS){try{mod=await import(u);break;}catch(e){err=e;}}\n" +
    "if(!mod)throw err;tts=await mod.KokoroTTS.from_pretrained(" + JSON.stringify(MODEL) + ",{dtype:'q8',device:'wasm',progress_callback:p=>{if(p&&p.status==='progress'&&p.total)self.postMessage({type:'progress',loaded:p.loaded,total:p.total});}});\n" +
    "self.postMessage({type:'ready'});return tts;}\n" +
    "self.onmessage=async e=>{const m=e.data;try{const t=await load();if(m.type==='gen'){const a=await t.generate(m.text,{voice:m.voice});\n" +
    "const blob=a.toBlob?a.toBlob():new Blob([a.toWav()],{type:'audio/wav'});self.postMessage({type:'audio',id:m.id,blob});}}\n" +
    "catch(err){self.postMessage({type:'error',id:m.id,message:String(err&&err.message||err)});}};";

  function status(msg) { if (App.ui) App.ui.toast(msg); }

  function ensureWorker() {
    if (worker || broken) return;
    try {
      worker = new Worker(URL.createObjectURL(new Blob([WORKER_CODE], { type: "text/javascript" })), { type: "module" });
    } catch (e) { broken = true; return; }
    worker.onmessage = function (e) {
      var m = e.data;
      if (m.type === "progress") {
        var pct = Math.round(100 * m.loaded / m.total);
        if (pct >= lastPct + 10 || pct === 100) { lastPct = pct; status("Baixando a voz (só na primeira vez)… " + pct + "%"); }
      } else if (m.type === "ready") {
        ready = true; loadWaiters.forEach(function (f) { f(); }); loadWaiters = [];
      } else if (m.type === "error" && m.id === undefined) { // falhou ao baixar/carregar a voz
        broken = true; fallbackNote();
      } else if (m.type === "audio" || m.type === "error") {
        var w = waiting[m.id]; delete waiting[m.id];
        if (!w) return;
        if (m.type === "audio") w.ok(m.blob); else w.fail(new Error(m.message));
      }
    };
    worker.onerror = function () { broken = true; Object.keys(waiting).forEach(function (k) { waiting[k].fail(new Error("worker")); }); waiting = {}; };
  }

  function genKokoro(text, voice) {
    var key = voice + "|" + text;
    if (mem[key]) return Promise.resolve(mem[key]);
    return cacheGet(key).then(function (blob) {
      if (blob) return (mem[key] = URL.createObjectURL(blob));
      ensureWorker();
      if (broken) throw new Error("kokoro indisponível");
      return new Promise(function (ok, fail) {
        var id = ++seq;
        waiting[id] = { ok: function (b) { cachePut(key, b); ok(mem[key] = URL.createObjectURL(b)); }, fail: fail };
        worker.postMessage({ type: "gen", id: id, text: text, voice: voice });
        setTimeout(function () { if (waiting[id]) { delete waiting[id]; fail(new Error("tempo esgotado")); } }, ready ? 60000 : 600000);
      });
    });
  }

  // Áudio pronto (memória/cache) ou gerado; se a voz ainda está baixando, devolve null (usa a voz do navegador enquanto isso)
  var warmSent = false;
  function warm() {
    ensureWorker();
    if (worker && !warmSent && !ready) { warmSent = true; worker.postMessage({ type: "warm" }); status("Baixando a voz Kokoro (só na primeira vez). Enquanto isso, uso a voz do navegador."); }
  }
  function getAudio(text, voice) {
    var key = voice + "|" + text;
    if (mem[key]) return Promise.resolve(mem[key]);
    return cacheGet(key).then(function (blob) {
      if (blob) return (mem[key] = URL.createObjectURL(blob));
      if (!ready) { warm(); if (broken) throw new Error("kokoro indisponível"); return null; }
      return genKokoro(text, voice);
    });
  }

  var warned = false;
  function fallbackNote() {
    if (warned) return; warned = true;
    status("Não consegui carregar a voz Kokoro (precisa de internet). Usando a voz do navegador.");
  }

  // ---------- voz do navegador ----------
  function nativeVoice() {
    var vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    return vs.filter(function (x) { return /^en(-|_)US/i.test(x.lang) && /natural|online|google/i.test(x.name); })[0] ||
           vs.filter(function (x) { return /^en(-|_)US/i.test(x.lang); })[0] || vs.filter(function (x) { return /^en/i.test(x.lang); })[0];
  }
  // Fala uma frase com a voz do navegador. A pausa curta antes evita cortar a 1ª palavra.
  var nT = null;
  function nativeSpeak(text, rate, onend) {
    if (!("speechSynthesis" in window)) { if (onend) onend(); return; }
    clearTimeout(nT); speechSynthesis.cancel();
    nT = setTimeout(function () {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = Math.max(0.5, Math.min(1.5, rate)) * 0.92;
      var v = nativeVoice(); if (v) u.voice = v;
      u.onend = function () { if (onend) onend(); };
      u.onerror = function () { if (onend) onend(); };
      speechSynthesis.speak(u);
    }, 180);
  }

  // ---------- frases curtas (botões 🔊) ----------
  var el = new Audio();
  el.preservesPitch = true;
  var sayToken = 0;

  function stopAll() {
    sayToken++; clearTimeout(nT);
    try { el.pause(); } catch (e) { /* ignora */ }
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* ignora */ }
    if (current) current.stop(true);
  }

  // Toca um texto curto. Retorna Promise que resolve quando o áudio começa (ou falha em silêncio).
  function say(text, opts) {
    opts = opts || {};
    var pr = prefs(), voice = opts.voice || pr.voice, rate = opts.rate || pr.rate, my = ++sayToken;
    if (current) current.stop(true);
    try { el.pause(); } catch (e) { /* ignora */ }
    if (voice === "native" || broken) { nativeSpeak(text, rate, opts.onend); return Promise.resolve(); }
    return getAudio(text, voice).then(function (url) {
      if (my !== sayToken) return;
      if (!url) { nativeSpeak(text, rate, opts.onend); return; }
      el.src = url; el.playbackRate = rate; el.preservesPitch = true;
      el.onended = function () { if (opts.onend) opts.onend(); };
      return el.play().catch(function () { /* autoplay bloqueado */ });
    }, function () { fallbackNote(); if (my === sayToken) nativeSpeak(text, rate, opts.onend); });
  }

  // ---------- player para textos longos ----------
  var current = null;

  function splitSentences(text) {
    return (String(text).replace(/\s*\n+\s*/g, " ").match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [text])
      .map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function player(container, text) {
    var esc = App.ui.esc, I = App.icon, pr = prefs();
    var sents = splitSentences(text), idx = 0, state = "idle", useNative = pr.voice === "native" || broken, token = 0, curNative = false;
    var audio = new Audio(); audio.preservesPitch = true;
    container.innerHTML = '<div class="player" role="group" aria-label="Áudio do texto">' +
      '<button class="btn primary" data-pl="toggle" aria-label="Ouvir">' + I("play") + '<span>Ouvir</span></button>' +
      '<button class="btn icon-btn" data-pl="stop" aria-label="Parar e voltar ao início">' + I("square") + '</button>' +
      '<label class="pl-field"><span class="sr">Velocidade</span><select class="input" data-pl="rate">' + RATES.map(function (r) {
        return '<option value="' + r + '"' + (r === pr.rate ? " selected" : "") + '>' + r + 'x</option>'; }).join("") + '</select></label>' +
      '<label class="pl-field"><span class="sr">Voz</span><select class="input" data-pl="voice">' + VOICES.map(function (v) {
        return '<option value="' + v.id + '"' + (v.id === pr.voice ? " selected" : "") + '>' + esc(v.name) + '</option>'; }).join("") + '</select></label>' +
      '<span class="pl-status muted small" aria-live="polite"></span></div>';
    var q = function (s) { return container.querySelector(s); };
    var btn = q('[data-pl="toggle"]'), st = q(".pl-status");
    function label() {
      btn.innerHTML = state === "playing" ? I("pause") + "<span>Pausar</span>" : I("play") + "<span>" + (state === "paused" ? "Continuar" : "Ouvir") + "</span>";
      btn.setAttribute("aria-label", state === "playing" ? "Pausar" : "Ouvir");
      st.textContent = state === "idle" ? "" : (state === "loading" ? "preparando a voz…" : "frase " + (idx + 1) + " de " + sents.length);
    }
    function rate() { return +q('[data-pl="rate"]').value; }
    function voice() { return q('[data-pl="voice"]').value; }
    function playFrom(i) {
      var my = ++token;
      idx = i;
      if (idx >= sents.length) { state = "idle"; idx = 0; label(); return; }
      curNative = false;
      if (useNative) {
        state = "playing"; label();
        nativeSpeak(sents[idx], rate(), function () { if (my === token && state === "playing") playFrom(idx + 1); });
        return;
      }
      state = "loading"; label();
      getAudio(sents[idx], voice()).then(function (url) {
        if (my !== token) return;
        if (!url) { // voz ainda baixando: esta frase vai na voz do navegador
          curNative = true; state = "playing"; label();
          nativeSpeak(sents[idx], rate(), function () { if (my === token && state === "playing") playFrom(idx + 1); });
          return;
        }
        audio.src = url; audio.playbackRate = rate(); audio.preservesPitch = true;
        audio.onended = function () { if (my === token) playFrom(idx + 1); };
        state = "playing"; label();
        audio.play().catch(function () { state = "paused"; label(); });
        if (sents[idx + 1]) getAudio(sents[idx + 1], voice()).catch(function () {}); // prepara a próxima
      }, function () {
        if (my !== token) return;
        fallbackNote(); useNative = true; playFrom(idx);
      });
    }
    var api = {
      toggle: function () {
        if (state === "playing") {
          state = "paused"; label();
          if (useNative || curNative) { try { speechSynthesis.pause(); } catch (e) { /* ignora */ } } else audio.pause();
        } else if (state === "paused") {
          state = "playing"; label();
          if (useNative || curNative) {
            try { if (speechSynthesis.paused) speechSynthesis.resume(); else playFrom(idx); } catch (e) { playFrom(idx); }
          } else audio.play();
        } else if (state === "idle") {
          if (current && current !== api) current.stop(true);
          sayToken++; try { el.pause(); } catch (e) { /* ignora */ }
          current = api; playFrom(idx);
        }
      },
      stop: function (keepUI) {
        token++; state = "idle"; idx = 0;
        try { audio.pause(); } catch (e) { /* ignora */ }
        clearTimeout(nT);
        if (useNative || curNative) try { speechSynthesis.cancel(); } catch (e) { /* ignora */ }
        if (!keepUI || document.body.contains(btn)) label();
      }
    };
    btn.onclick = api.toggle;
    q('[data-pl="stop"]').onclick = function () { api.stop(); };
    q('[data-pl="rate"]').onchange = function () { setPrefs({ rate: rate() }); audio.playbackRate = rate(); };
    q('[data-pl="voice"]').onchange = function () {
      setPrefs({ voice: voice() }); useNative = voice() === "native" || broken;
      var was = state === "playing" || state === "paused" || state === "loading", at = idx;
      api.stop(); if (was) { current = api; playFrom(at); }
    };
    label();
    return api;
  }

  App.audio = { VOICES: VOICES, RATES: RATES, say: say, stop: stopAll, player: player, prefs: prefs, setPrefs: setPrefs,
                split: splitSentences, warm: function () { if (prefs().voice !== "native") warm(); } };
})();
