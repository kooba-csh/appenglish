/* AppEnglish — persistência no navegador (localStorage) + backup JSON. */
(function (root) {
  "use strict";
  var KEY = "appenglish.v1";
  var VERSION = 1;

  function emptyState() { return { version: VERSION, currentProfileId: null, profiles: {} }; }

  function newProfile(name) {
    var id = "p" + Date.now().toString(36);
    return {
      id: id, name: name || "Eu", level: "B2", createdAt: new Date().toISOString(),
      dailyGoal: 30, newPerDay: 10, theme: "auto",
      xp: 0, streak: null, days: {}, cards: {}, sentences: [], disabledDecks: [],
      myCards: [], readings: {}, grammar: {}, writings: [], shadowing: {}, hardWords: {},
      conversations: [], levelTests: [], achievements: {}, drafts: {}, ai: { key: "", model: "claude-sonnet-5-5" },
      knownDecks: [], audio: {}, games: { played: 0, best: {} }, placements: [], picMode: "auto", verter: { done: 0, right: 0 }
    };
  }

  // Migrações futuras: if (s.version === 1) { ...; s.version = 2; }
  function migrate(s) {
    if (!s || typeof s !== "object" || !s.profiles) return emptyState();
    s.version = s.version || 1;
    Object.keys(s.profiles).forEach(function (k) {
      var p = s.profiles[k];
      p.days = p.days || {}; p.cards = p.cards || {}; p.sentences = p.sentences || [];
      p.disabledDecks = p.disabledDecks || [];
      // v1 → campos das Fases 2–6 (adicionados sem perder nada)
      p.myCards = p.myCards || []; p.readings = p.readings || {}; p.grammar = p.grammar || {};
      p.writings = p.writings || []; p.shadowing = p.shadowing || {}; p.hardWords = p.hardWords || {};
      p.conversations = p.conversations || []; p.levelTests = p.levelTests || []; p.achievements = p.achievements || {};
      p.drafts = p.drafts || {};
      p.ai = p.ai || { key: "", model: "claude-sonnet-5-5" };
      // v2: níveis, voz, jogos e nivelamento (knownDecks fica vazio: levels.js decide os decks novos pelo nível)
      p.knownDecks = p.knownDecks || []; p.audio = p.audio || {}; p.games = p.games || { played: 0, best: {} }; p.placements = p.placements || [];
      // v3: figuras e Verter
      p.picMode = p.picMode || "auto"; p.verter = p.verter || { done: 0, right: 0 };
    });
    return s;
  }

  var state = null, memoryOnly = false, listeners = [];

  function load() {
    var raw = null;
    try { raw = root.localStorage.getItem(KEY); }
    catch (e) { memoryOnly = true; state = state || emptyState(); return state; }
    try { state = migrate(raw ? JSON.parse(raw) : emptyState()); }
    catch (e) {
      // dado ilegível: guarda uma cópia antes de começar do zero, para não perder de vez
      try { root.localStorage.setItem(KEY + ".corrompido-" + Date.now(), raw); } catch (e2) { /* sem espaço */ }
      state = emptyState();
    }
    return state;
  }

  function write() {
    try { root.localStorage.setItem(KEY, JSON.stringify(state)); memoryOnly = false; return true; }
    catch (e) { memoryOnly = true; return false; }
  }

  // Salva e avisa quem acompanha (a sincronização com a nuvem)
  function save() {
    if (!state) return false;
    state.savedAt = new Date().toISOString();
    var ok = write();
    listeners.forEach(function (fn) { try { fn(); } catch (e) { /* ignora */ } });
    return ok;
  }

  // Troca o estado pelo que veio da nuvem, mantendo a chave da IA deste navegador
  function adopt(data) {
    var old = state || emptyState();
    data = migrate(JSON.parse(JSON.stringify(data)));
    Object.keys(data.profiles).forEach(function (k) {
      var prev = old.profiles[k];
      if (prev && prev.ai && prev.ai.key && !data.profiles[k].ai.key) data.profiles[k].ai.key = prev.ai.key;
    });
    if (!data.currentProfileId || !data.profiles[data.currentProfileId]) data.currentProfileId = Object.keys(data.profiles)[0] || null;
    state = data; write();
    return state;
  }

  function get() { return state || load(); }

  function current() { var s = get(); return s.currentProfileId ? s.profiles[s.currentProfileId] : null; }

  function createProfile(name) {
    var s = get(), p = newProfile(name);
    s.profiles[p.id] = p; s.currentProfileId = p.id; save();
    return p;
  }

  function selectProfile(id) { var s = get(); if (s.profiles[id]) { s.currentProfileId = id; save(); } }

  function deleteProfile(id) {
    var s = get(); delete s.profiles[id];
    if (s.currentProfileId === id) s.currentProfileId = null;
    save();
  }

  // A chave da IA nunca vai para o backup
  function exportJSON() {
    var copy = JSON.parse(JSON.stringify(get()));
    Object.keys(copy.profiles).forEach(function (k) { if (copy.profiles[k].ai) copy.profiles[k].ai.key = ""; });
    return JSON.stringify({ app: "AppEnglish", exportedAt: new Date().toISOString(), data: copy }, null, 2);
  }

  // Importa backup. Retorna número de perfis importados ou lança erro.
  function importJSON(text) {
    var obj = JSON.parse(text);
    var data = obj && obj.app === "AppEnglish" ? obj.data : obj;
    if (!data || !data.profiles) throw new Error("Arquivo não parece um backup do AppEnglish.");
    var old = get();
    data = migrate(data);
    // mantém a chave da IA já configurada neste navegador
    Object.keys(data.profiles).forEach(function (k) {
      var prev = old.profiles[k];
      if (prev && prev.ai && prev.ai.key && !data.profiles[k].ai.key) data.profiles[k].ai.key = prev.ai.key;
    });
    state = data; save();
    return Object.keys(state.profiles).length;
  }

  root.App = root.App || {};
  root.App.storage = { load: load, save: save, get: get, current: current, createProfile: createProfile,
    selectProfile: selectProfile, deleteProfile: deleteProfile, exportJSON: exportJSON, importJSON: importJSON,
    isMemoryOnly: function () { return memoryOnly; }, adopt: adopt,
    onSave: function (fn) { listeners.push(fn); } };
})(window);
