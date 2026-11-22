/* AppEnglish — figuras para memorizar (OpenMoji, CC BY-SA 4.0).
   - CONTENT.pic[idDoItem] = { e: ["HEX", ...], m: "imagem mental em PT" }  (content/imagens.js)
   - CONTENT.svg[HEX] = "<svg ...>"  (content/imagens-svg.js — carregado só quando a 1ª figura aparece)
   As figuras entram como <img> (o SVG não executa nada) e são preenchidas automaticamente
   sempre que uma tela é desenhada. */
(function () {
  "use strict";
  var ui = App.ui, S = App.screens, esc = ui.esc;
  var state = (window.CONTENT && CONTENT.svg) ? "ready" : "idle", cache = {};

  function data(id) { return (window.CONTENT && CONTENT.pic && CONTENT.pic[id]) || null; }
  function has(id) { return !!data(id); }

  function src(hex) {
    if (!cache[hex]) cache[hex] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(CONTENT.svg[hex]);
    return cache[hex];
  }

  // HTML das figuras de um item (ou de uma lista de códigos)
  function imgs(idOrHexes, size) {
    var hexes = Array.isArray(idOrHexes) ? idOrHexes : ((data(idOrHexes) || {}).e || []);
    if (!hexes.length) return "";
    return '<span class="pic pic-' + (size || "md") + '" aria-hidden="true">' +
      hexes.map(function (h) { return '<img data-hex="' + esc(h) + '" alt="" draggable="false">'; }).join("") + '</span>';
  }

  // Bloco do verso do card: figura + imagem mental
  function block(it) {
    var d = data(it.id);
    if (!d || mode() === "off") return "";
    return '<div class="picrow">' + imgs(it.id, "md") + (d.m ? '<p class="mnemo"><span class="muted small">Imagem mental</span><br>' + esc(d.m) + '</p>' : '') + '</div>';
  }

  // "back" = só no verso (padrão B2–C1) · "front" = também na frente (padrão A1–B1) · "off"
  function mode() {
    var p = ui.profile(), m = p && p.picMode;
    if (m === "back" || m === "front" || m === "off") return m;
    return p && ["A1", "A2", "B1"].indexOf(p.level) >= 0 ? "front" : "back";
  }
  function front(it) { return mode() === "front" && has(it.id) ? '<div class="picfront">' + imgs(it.id, "lg") + '</div>' : ""; }

  function load() {
    if (state !== "idle") return;
    state = "loading";
    var sc = document.createElement("script");
    sc.src = "content/imagens-svg.js";
    sc.onload = function () { state = (window.CONTENT && CONTENT.svg) ? "ready" : "failed"; fill(document); };
    sc.onerror = function () { state = "failed"; };
    document.head.appendChild(sc);
  }

  function fill(root) {
    var list = (root || document).querySelectorAll("img[data-hex]:not([src])");
    if (!list.length) return;
    if (state !== "ready") { load(); return; }
    Array.prototype.forEach.call(list, function (im) {
      var h = im.getAttribute("data-hex");
      if (CONTENT.svg[h]) im.src = src(h); else im.parentNode && im.parentNode.removeChild(im);
    });
  }

  // Preenche as figuras sempre que a tela muda
  if (window.MutationObserver) new MutationObserver(function () { fill(ui.view); }).observe(ui.view, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", function () { fill(document); });

  // Ajustes: onde mostrar as figuras
  var origSettings = S.settings;
  S.settings = function (arg) {
    origSettings(arg);
    var anchor = document.getElementById("prefs"), p = ui.profile();
    if (!anchor || !p) return;
    var m = mode();
    anchor.insertAdjacentHTML("beforebegin", '<div class="card" id="picCard"><h2>Figuras nos cards</h2>' +
      '<p class="muted small">Uma figura e uma "imagem mental" ajudam a fixar o significado (codificação dupla).</p>' +
      '<select class="input" id="picSel" style="width:auto">' +
      [["back", "Só no verso, junto com a resposta"], ["front", "Também na frente (facilita — bom para iniciantes)"], ["off", "Não mostrar"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (o[0] === m ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select>' +
      '<p class="muted small" style="margin-top:10px">Figuras: <a href="https://openmoji.org" target="_blank" rel="noopener">OpenMoji</a> — licença CC BY-SA 4.0.</p></div>');
    document.getElementById("picSel").onchange = function () { p.picMode = this.value; App.storage.save(); ui.toast("Preferência salva."); };
  };

  App.pics = { has: has, data: data, imgs: imgs, block: block, front: front, mode: mode, fill: fill, load: load };
})();
