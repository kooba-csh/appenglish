/* AppEnglish — funções puras de texto (testáveis com node). */
(function (root) {
  "use strict";

  function norm(s) {
    return String(s == null ? "" : s).toLowerCase()
      .replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/[.,!?;:"()\[\]{}—–-]/g, " ")
      .replace(/\s+/g, " ").trim();
  }

  function words(s) { var n = norm(s); return n ? n.split(" ") : []; }

  function countWords(s) { var t = String(s || "").trim(); return t ? t.split(/\s+/).length : 0; }

  // Compara resposta com a esperada e alternativas (ignora maiúsculas e pontuação)
  function answerMatches(value, answer, alternatives) {
    var v = norm(value);
    if (!v) return false;
    var list = [answer].concat(alternatives || []);
    for (var i = 0; i < list.length; i++) if (norm(list[i]) === v) return true;
    return false;
  }

  /**
   * Alinha palavras faladas com a frase alvo (LCS).
   * Retorna { score: 0..1, tokens: [{ w: palavraOriginal, ok: bool }] }
   */
  function wordDiff(target, said) {
    var rawT = String(target || "").split(/\s+/).filter(Boolean);
    var t = rawT.map(function (w) { return norm(w); });
    var s = words(said);
    var n = t.length, m = s.length, i, j;
    var L = [];
    for (i = 0; i <= n; i++) { L.push(new Array(m + 1).fill(0)); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) {
      L[i][j] = (t[i] && t[i] === s[j]) ? 1 + L[i + 1][j + 1] : Math.max(L[i + 1][j], L[i][j + 1]);
    }
    var ok = new Array(n).fill(false);
    i = 0; j = 0;
    while (i < n && j < m) {
      if (t[i] && t[i] === s[j]) { ok[i] = true; i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) i++;
      else j++;
    }
    var counted = t.filter(Boolean).length || 1;
    var hits = ok.filter(Boolean).length;
    return { score: hits / counted, tokens: rawT.map(function (w, k) { return { w: w, ok: ok[k] || !t[k] }; }) };
  }

  // Troca a primeira ocorrência de chunk por ___ (ignora maiúsculas). null se não achar.
  function clozeFromSentence(sentence, chunk) {
    if (!sentence || !chunk) return null;
    var idx = sentence.toLowerCase().indexOf(String(chunk).toLowerCase());
    if (idx < 0) return null;
    return sentence.slice(0, idx) + "___" + sentence.slice(idx + chunk.length);
  }

  // Extrai o primeiro objeto JSON de um texto (aceita ```json ... ```)
  function parseJSONLoose(text) {
    var s = String(text || "");
    var start = s.indexOf("{");
    if (start < 0) throw new Error("Não encontrei JSON na resposta.");
    var depth = 0, inStr = false, esc = false;
    for (var i = start; i < s.length; i++) {
      var c = s[i];
      if (inStr) {
        if (esc) esc = false;
        else if (c === "\\") esc = true;
        else if (c === '"') inStr = false;
      } else if (c === '"') inStr = true;
      else if (c === "{") depth++;
      else if (c === "}") { depth--; if (depth === 0) return JSON.parse(s.slice(start, i + 1)); }
    }
    throw new Error("JSON incompleto na resposta.");
  }

  function slug(s) { return norm(s).replace(/[^a-z0-9' ]/g, "").replace(/['\s]+/g, "-").slice(0, 40) || "x"; }

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  var api = { norm: norm, words: words, countWords: countWords, answerMatches: answerMatches, wordDiff: wordDiff,
              clozeFromSentence: clozeFromSentence, parseJSONLoose: parseJSONLoose, slug: slug, shuffle: shuffle };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.App = root.App || {}; root.App.util = api; }
})(typeof window !== "undefined" ? window : this);
