/* AppEnglish — motor de repetição espaçada (SM-2 adaptado). Regras: skill pedagogia-srs. */
(function (root) {
  "use strict";

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  // Data local no formato AAAA-MM-DD
  function today(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function parse(s) {
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0);
  }

  function addDays(s, n) {
    var d = parse(s);
    d.setDate(d.getDate() + n);
    return today(d);
  }

  function diffDays(a, b) { // b - a em dias
    return Math.round((parse(b) - parse(a)) / 86400000);
  }

  function newCard() {
    return { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: null, state: "new", last: null };
  }

  var GRADES = { AGAIN: 0, HARD: 1, GOOD: 2, EASY: 3 };
  var MASTERED_DAYS = 21;

  /**
   * Aplica uma nota ao card.
   * Retorna { card, xp, requeue } — requeue=true quando o card deve voltar ainda nesta sessão.
   */
  function review(card, grade, todayStr) {
    card = Object.assign(newCard(), card || {});
    var wasNew = card.state === "new";
    var prevInterval = card.interval;
    var c = Object.assign({}, card);
    var xp;

    if (grade === GRADES.AGAIN) {
      c.reps = 0;
      c.interval = 0;
      c.lapses = c.lapses + (wasNew ? 0 : 1);
      c.ease = Math.max(1.3, round2(c.ease - 0.2));
      c.state = "learning";
      c.due = todayStr;
      xp = 1;
    } else {
      if (grade === GRADES.HARD) {
        c.interval = Math.max(1, Math.round(c.interval * 1.2));
        c.ease = Math.max(1.3, round2(c.ease - 0.15));
      } else if (grade === GRADES.GOOD) {
        if (c.reps === 0) c.interval = 1;
        else if (c.reps === 1) c.interval = 3;
        else c.interval = Math.max(c.interval + 1, Math.round(c.interval * c.ease));
      } else { // EASY
        if (c.reps === 0) c.interval = 3;
        else if (c.reps === 1) c.interval = 4;
        else c.interval = Math.max(c.interval + 1, Math.round(c.interval * c.ease * 1.3));
        c.ease = round2(c.ease + 0.15);
      }
      c.reps = c.reps + 1;
      c.due = addDays(todayStr, c.interval);
      c.state = c.interval >= MASTERED_DAYS ? "mastered" : (c.interval >= 1 ? "review" : "learning");
      xp = wasNew ? 2 : 5 + Math.min(15, prevInterval);
    }
    c.last = todayStr;
    return { card: c, xp: xp, requeue: grade === GRADES.AGAIN };
  }

  function round2(x) { return Math.round(x * 100) / 100; }

  function isDue(card, todayStr) {
    return !!card && card.state !== "new" && !!card.due && card.due <= todayStr;
  }

  /**
   * Monta a fila do dia: primeiro revisões vencidas (mais atrasadas primeiro), depois novos.
   * items: [{id,...}] ; cards: {id: card}
   */
  function buildQueue(items, cards, todayStr, newLimit, newSeenToday) {
    var due = [], fresh = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i], c = cards[it.id];
      if (!c || c.state === "new") fresh.push(it);
      else if (isDue(c, todayStr)) due.push(it);
    }
    due.sort(function (a, b) { return cards[a.id].due < cards[b.id].due ? -1 : 1; });
    var room = Math.max(0, (newLimit || 0) - (newSeenToday || 0));
    return due.concat(fresh.slice(0, room));
  }

  function stats(items, cards, todayStr) {
    var s = { total: items.length, new: 0, learning: 0, review: 0, mastered: 0, due: 0 };
    items.forEach(function (it) {
      var c = cards[it.id];
      if (!c || c.state === "new") { s.new++; return; }
      s[c.state] = (s[c.state] || 0) + 1;
      if (isDue(c, todayStr)) s.due++;
    });
    return s;
  }

  var api = { today: today, addDays: addDays, diffDays: diffDays, newCard: newCard, review: review,
              buildQueue: buildQueue, isDue: isDue, stats: stats, GRADES: GRADES, MASTERED_DAYS: MASTERED_DAYS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.App = root.App || {}; root.App.srs = api; }
})(typeof window !== "undefined" ? window : this);
