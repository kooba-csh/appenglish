/* AppEnglish — sincronização automática com o Supabase (login por e-mail e senha).
   Regras:
   - O navegador continua com a cópia local (funciona offline); a nuvem recebe tudo alguns segundos depois de cada mudança.
   - Ao abrir o app, vale a versão mais recente (campo savedAt). Uma cópia local vazia nunca apaga a da nuvem.
   - A chave da API do Claude NUNCA sobe para a nuvem. */
(function () {
  "use strict";
  var CFG = window.APP_CLOUD || {}, store = App.storage;
  var SKEY = "appenglish.cloud";
  var DEBOUNCE = 3000;
  var session = null, timer = null, busy = false, pending = false;
  var status = "off"; // off | idle | saving | saved | offline | error
  var lastError = "";

  function enabled() { return !!(CFG.url && CFG.key); }
  function loadSession() { try { session = JSON.parse(localStorage.getItem(SKEY) || "null"); } catch (e) { session = null; } }
  function saveSession() { try { if (session) localStorage.setItem(SKEY, JSON.stringify(session)); else localStorage.removeItem(SKEY); } catch (e) { /* ignora */ } }

  function setStatus(s, err) {
    status = s; if (err !== undefined) lastError = err;
    var el = document.getElementById("syncStatus");
    if (!el) return;
    var map = { off: "", idle: "☁", saving: "☁ salvando…", saved: "☁ salvo", offline: "☁ offline", error: "☁ erro" };
    el.textContent = session ? (map[s] || "") : "";
    el.className = "sync " + s;
    el.title = s === "error" ? lastError : (s === "offline" ? "Sem conexão — salvo neste aparelho; envia quando a internet voltar." : (session ? "Sincronizado como " + session.email : ""));
  }

  function headers(auth) {
    var h = { "apikey": CFG.key, "content-type": "application/json" };
    if (auth && session) h.authorization = "Bearer " + session.access_token;
    return h;
  }

  function req(method, path, body, auth, extra) {
    var h = headers(auth);
    if (extra) Object.keys(extra).forEach(function (k) { h[k] = extra[k]; });
    return fetch(CFG.url + path, { method: method, headers: h, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) {
        return r.text().then(function (t) {
          var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) { j = null; }
          if (!r.ok) {
            var msg = (j && (j.msg || j.message || j.error_description || j.error)) || ("HTTP " + r.status);
            var err = new Error(msg); err.status = r.status; throw err;
          }
          return j;
        });
      }, function () { var e = new Error("offline"); e.offline = true; throw e; });
  }

  function keepSession(j) {
    session = { access_token: j.access_token, refresh_token: j.refresh_token,
                expires_at: Date.now() + ((j.expires_in || 3600) - 60) * 1000,
                user_id: j.user && j.user.id, email: j.user && j.user.email };
    saveSession();
  }

  function ensureToken() {
    if (!session) return Promise.reject(new Error("Não conectado."));
    if (Date.now() < session.expires_at) return Promise.resolve();
    return req("POST", "/auth/v1/token?grant_type=refresh_token", { refresh_token: session.refresh_token }, false)
      .then(keepSession, function (e) {
        if (!e.offline && (e.status === 400 || e.status === 401)) { session = null; saveSession(); setStatus("off"); }
        throw e;
      });
  }

  // Dados que sobem: tudo, menos a chave da IA
  function payload() {
    var copy = JSON.parse(JSON.stringify(store.get()));
    Object.keys(copy.profiles || {}).forEach(function (k) { if (copy.profiles[k].ai) copy.profiles[k].ai.key = ""; });
    return copy;
  }
  function hasData(s) { return !!(s && s.profiles && Object.keys(s.profiles).length); }

  function push() {
    if (!session) return Promise.resolve();
    if (busy) { pending = true; return Promise.resolve(); }
    busy = true; setStatus("saving");
    var data = payload();
    return ensureToken().then(function () {
      return req("POST", "/rest/v1/progress?on_conflict=user_id", { user_id: session.user_id, data: data, updated_at: new Date().toISOString() }, true,
                 { prefer: "resolution=merge-duplicates,return=minimal" });
    }).then(function () { setStatus("saved", ""); }, function (e) {
      setStatus(e.offline ? "offline" : "error", e.message);
    }).then(function () {
      busy = false;
      if (pending) { pending = false; schedule(); }
    });
  }

  function schedule() {
    if (!session) return;
    clearTimeout(timer);
    setStatus("saving");
    timer = setTimeout(push, DEBOUNCE);
  }

  // Busca a nuvem e decide quem vence. Retorna Promise<"remote"|"local"|"same">
  function xpOf(s) { return Object.keys(s.profiles || {}).reduce(function (a, k) { return a + (s.profiles[k].xp || 0); }, 0); }

  function pull(firstLogin) {
    if (!session) return Promise.resolve("none");
    setStatus("saving");
    return ensureToken().then(function () {
      return req("GET", "/rest/v1/progress?select=data,updated_at&user_id=eq." + encodeURIComponent(session.user_id), null, true);
    }).then(function (rows) {
      var remote = rows && rows[0] ? rows[0].data : null, local = store.get();
      if (!hasData(remote)) { return push().then(function () { return "local"; }); }
      var rT = remote.savedAt || "", lT = local.savedAt || "";
      // Primeiro login neste aparelho com progresso dos dois lados: pergunta em vez de sobrescrever
      if (firstLogin && hasData(local)) {
        var useRemote = confirm("A nuvem já tem um progresso salvo (" + xpOf(remote) + " XP) e este aparelho tem outro (" + xpOf(local) + " XP).\n\n" +
          "OK = usar o progresso da NUVEM neste aparelho (recomendado)\nCancelar = substituir a nuvem pelo progresso DESTE aparelho");
        if (useRemote) { store.adopt(remote); setStatus("saved", ""); return "remote"; }
        return push().then(function () { return "local"; });
      }
      if (!hasData(local) || rT > lT) {
        store.adopt(remote);
        setStatus("saved", "");
        return "remote";
      }
      if (lT > rT) return push().then(function () { return "local"; });
      setStatus("saved", "");
      return "same";
    }, function (e) { setStatus(e.offline ? "offline" : "error", e.message); return "error"; });
  }

  function afterAuth(j) {
    keepSession(j);
    return pull(true);
  }

  function signIn(email, password) {
    return req("POST", "/auth/v1/token?grant_type=password", { email: email, password: password }, false).then(afterAuth);
  }
  function signUp(email, password) {
    return req("POST", "/auth/v1/signup", { email: email, password: password }, false).then(function (j) {
      if (!j || !j.access_token) throw new Error("Conta criada, mas o Supabase pediu confirmação por e-mail. Desligue \"Confirm email\" em Authentication → Email e tente entrar.");
      return afterAuth(j);
    });
  }
  function signOut() {
    var tok = session && session.access_token;
    clearTimeout(timer);
    if (tok) fetch(CFG.url + "/auth/v1/logout", { method: "POST", headers: { apikey: CFG.key, authorization: "Bearer " + tok } }).catch(function () {});
    session = null; saveSession(); setStatus("off");
  }

  function friendly(e) {
    var m = String(e && e.message || e);
    if (e && e.offline) return "Sem conexão com a internet.";
    if (/invalid login credentials/i.test(m)) return "E-mail ou senha incorretos.";
    if (/already registered|already exists/i.test(m)) return "Este e-mail já tem conta. Use \"Entrar\".";
    if (/password/i.test(m) && /least|short|characters/i.test(m)) return "Senha muito curta (mínimo 6 caracteres).";
    if (/email not confirmed/i.test(m)) return "E-mail não confirmado. Desligue \"Confirm email\" no Supabase (Authentication → Email) ou confirme pelo link recebido.";
    if (/signups not allowed|signup is disabled/i.test(m)) return "Novos cadastros estão desligados neste projeto.";
    return m;
  }

  function rerender() {
    var r = App.ui.route();
    if (["session", "conversation", "writing", "grammar", "speaking", "leveltest", "reading"].indexOf(r) >= 0) return;
    App.ui.go(store.current() ? (r === "profiles" ? "dashboard" : r) : "profiles");
  }

  // ---------- telas ----------
  function cardHTML() {
    var esc = App.ui.esc;
    if (!enabled()) return "";
    if (session) {
      return '<div class="card" id="cloudCard"><h2>Nuvem</h2><p>Conectado como <strong>' + esc(session.email) + '</strong>. Seu progresso é salvo automaticamente na nuvem e carregado em qualquer aparelho em que você entrar com este e-mail.</p>' +
        '<p class="muted small">Status: <span id="cloudSt">' + esc(status === "error" ? "erro — " + lastError : status === "offline" ? "offline (envia quando a internet voltar)" : "ok") + '</span></p>' +
        '<div class="row"><button class="btn" id="cloudSync">Sincronizar agora</button><button class="btn ghost" id="cloudOut">Sair da nuvem</button></div></div>';
    }
    return '<form class="card" id="cloudCard"><h2>Nuvem — salvar automaticamente</h2>' +
      '<p class="muted">Entre com e-mail e senha para o progresso ficar salvo na nuvem e aparecer em qualquer computador ou celular. Na primeira vez, clique em <strong>Criar conta</strong>.</p>' +
      '<label class="field"><span>E-mail</span><input class="input" name="email" type="email" autocomplete="username" required></label>' +
      '<label class="field"><span>Senha (mínimo 6 caracteres)</span><input class="input" name="password" type="password" autocomplete="current-password" minlength="6" required></label>' +
      '<div class="row"><button class="btn primary" type="submit" data-act="in">Entrar</button><button class="btn" type="submit" data-act="up">Criar conta</button></div>' +
      '<p class="muted small" id="cloudMsg"></p></form>';
  }

  function bindCard() {
    var ui = App.ui, f = document.getElementById("cloudCard");
    if (!f) return;
    if (session) {
      document.getElementById("cloudSync").onclick = function () {
        var b = this; b.disabled = true; b.textContent = "Sincronizando…";
        pull().then(function (r) {
          ui.toast(r === "remote" ? "Progresso da nuvem carregado." : r === "error" ? "Não consegui sincronizar: " + lastError : "Tudo sincronizado ✓");
          if (r === "remote") ui.go("settings"); else { b.disabled = false; b.textContent = "Sincronizar agora"; }
        });
      };
      document.getElementById("cloudOut").onclick = function () {
        if (!confirm("Sair da nuvem? O progresso continua neste navegador, mas deixa de ser enviado.")) return;
        signOut(); ui.go("settings");
      };
      return;
    }
    var act = "in";
    f.querySelectorAll("[data-act]").forEach(function (b) { b.onclick = function () { act = b.getAttribute("data-act"); }; });
    f.onsubmit = function (e) {
      e.preventDefault();
      var msg = document.getElementById("cloudMsg"), email = f.email.value.trim(), pw = f.password.value;
      msg.textContent = act === "up" ? "Criando conta…" : "Entrando…";
      f.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
      (act === "up" ? signUp(email, pw) : signIn(email, pw)).then(function (r) {
        ui.toast(r === "remote" ? "Conectado! Progresso da nuvem carregado." : "Conectado! Seu progresso agora é salvo na nuvem.");
        var from = ui.route();
        ui.go(!store.current() ? "profiles" : (from === "profiles" ? "dashboard" : "settings"));
      }, function (err) {
        msg.textContent = friendly(err);
        f.querySelectorAll("button").forEach(function (b) { b.disabled = false; });
      });
    };
  }

  // Ajustes: acrescenta o cartão da nuvem no topo
  var origSettings = App.screens.settings;
  App.screens.settings = function (arg) {
    origSettings(arg);
    var first = App.ui.view.querySelector(".stack > h1");
    if (first) first.insertAdjacentHTML("afterend", cardHTML());
    bindCard();
  };
  // Tela de perfis: convite para entrar na nuvem
  var origProfiles = App.screens.profiles;
  App.screens.profiles = function (arg) {
    origProfiles(arg);
    if (!enabled() || session) return;
    var st = App.ui.view.querySelector(".stack");
    if (st) {
      st.insertAdjacentHTML("beforeend", cardHTML());
      bindCard();
    }
  };

  // Salva na nuvem a cada mudança; ao sair/ocultar a aba, envia na hora
  store.onSave(function () { schedule(); });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden" && session && timer) { clearTimeout(timer); timer = null; push(); }
    if (document.visibilityState === "visible" && session) pull().then(function (r) { if (r === "remote") rerender(); });
  });
  window.addEventListener("online", function () { if (session) push(); });

  // Início: abre com a cópia local e depois confere a nuvem
  var origBoot = App.boot;
  App.boot = function () {
    loadSession();
    origBoot();
    setStatus(session ? "idle" : "off");
    if (session && enabled()) pull().then(function (r) { if (r === "remote") rerender(); });
  };

  App.cloud = { pull: pull, push: push, signIn: signIn, signUp: signUp, signOut: signOut,
                session: function () { return session; }, status: function () { return status; } };
})();
