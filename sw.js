/* AppEnglish — service worker: permite instalar o app e abrir sem internet.
   Estratégia: rede primeiro (para receber atualizações), cache como reserva.
   Chamadas para outros sites (Supabase, API do Claude, vozes Kokoro, fontes) não passam por aqui. */
var CACHE = "appenglish-v2";
var FILES = [
  "./", "index.html", "manifest.webmanifest", "css/style.css",
  "content/phrasal-verbs.js", "content/idioms.js", "content/collocations.js", "content/iniciante-vocab.js",
  "content/readings.js", "content/readings-temas-1.js", "content/readings-temas-2.js", "content/iniciante-leituras.js",
  "content/readings-pt.js", "content/grammar.js", "content/iniciante-gramatica.js", "content/writing.js",
  "content/speaking.js", "content/iniciante-extra.js", "content/nivelamento.js", "content/translations.js",
  "js/srs.js", "js/game.js", "js/util.js", "js/storage.js", "js/icons.js", "js/ai.js", "js/app.js", "js/audio.js",
  "js/reading.js", "js/grammar.js", "js/writing.js", "js/speaking.js", "js/progress.js", "js/levels.js",
  "js/games.js", "js/fx.js", "js/cloud-config.js", "js/cloud.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/favicon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || caches.match("index.html"); });
    })
  );
});
