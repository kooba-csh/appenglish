/* AppEnglish — animações de recompensa: confete e subida de nível. Respeitam "reduzir movimento". */
(function () {
  "use strict";
  function reduced() { return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }

  function confetti(amount) {
    if (reduced()) return;
    var c = document.createElement("canvas"), ctx = c.getContext && c.getContext("2d");
    if (!ctx) return;
    var W = c.width = innerWidth, H = c.height = innerHeight, n = amount || 90, parts = [];
    c.className = "fx-canvas"; c.setAttribute("aria-hidden", "true");
    document.body.appendChild(c);
    var css = getComputedStyle(document.documentElement);
    var colors = ["--primary", "--accent", "--good", "--easy", "--hard"].map(function (v) { return css.getPropertyValue(v).trim() || "#4F46E5"; });
    for (var i = 0; i < n; i++) parts.push({ x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35, vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 12 - 4,
      s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: colors[i % colors.length] });
    var t0 = performance.now();
    (function frame(t) {
      var k = (t - t0) / 1600;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - k); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
      });
      if (k < 1) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }

  function levelUp(level) {
    confetti(140);
    var d = document.createElement("div");
    d.className = "fx-level"; d.setAttribute("role", "status");
    d.innerHTML = '<div class="fx-level-card">' + App.icon("trophy", "ic-xl") + '<strong>Nível ' + level + '!</strong><span>Continue assim.</span></div>';
    document.body.appendChild(d);
    setTimeout(function () { d.classList.add("out"); }, 1800);
    setTimeout(function () { d.remove(); }, 2300);
    d.onclick = function () { d.remove(); };
  }

  App.fx = { confetti: confetti, levelUp: levelUp };
})();
