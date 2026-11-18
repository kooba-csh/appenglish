/* AppEnglish — XP, nível, meta diária e sequência (streak). Regras: skill pedagogia-srs. */
(function (root) {
  "use strict";
  var srs = (typeof module !== "undefined" && module.exports) ? require("./srs.js") : root.App.srs;

  var GOAL_BONUS = 20;
  var SENTENCE_XP = 10;

  // XP acumulado necessário para atingir o nível L (nível 1 = 0 XP)
  function xpForLevel(L) { return Math.round(100 * Math.pow(L - 1, 1.5)); }

  function levelInfo(xp) {
    var L = 1;
    while (xp >= xpForLevel(L + 1)) L++;
    var base = xpForLevel(L), next = xpForLevel(L + 1);
    return { level: L, xpInLevel: xp - base, xpToNext: next - base, progress: (xp - base) / (next - base) };
  }

  // Segunda-feira da semana da data (AAAA-MM-DD)
  function weekKey(dateStr) {
    var p = dateStr.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2], 12);
    var dow = (d.getDay() + 6) % 7; // 0 = segunda
    d.setDate(d.getDate() - dow);
    return srs.today(d);
  }

  function ensureStreak(profile, todayStr) {
    var s = profile.streak = profile.streak || { count: 0, best: 0, lastDay: null, freezes: 1, freezeWeek: null };
    var wk = weekKey(todayStr);
    if (s.freezeWeek !== wk) { s.freezes = 1; s.freezeWeek = wk; }
    return s;
  }

  function day(profile, todayStr) {
    profile.days = profile.days || {};
    return profile.days[todayStr] = profile.days[todayStr] ||
      { xp: 0, reviews: 0, correct: 0, newSeen: 0, sentences: 0, goalMet: false };
  }

  // Sequência exibida hoje (zera se quebrou e não há congelamento que cubra)
  function currentStreak(profile, todayStr) {
    var s = ensureStreak(profile, todayStr);
    if (!s.lastDay) return 0;
    var gap = srs.diffDays(s.lastDay, todayStr);
    if (gap <= 1) return s.count;
    if (gap === 2 && s.freezes > 0) return s.count;
    return 0;
  }

  function registerGoal(profile, todayStr) {
    var s = ensureStreak(profile, todayStr);
    if (s.lastDay === todayStr) return { usedFreeze: false };
    var usedFreeze = false;
    var gap = s.lastDay ? srs.diffDays(s.lastDay, todayStr) : 99;
    if (gap === 1) s.count += 1;
    else if (gap === 2 && s.freezes > 0) { s.freezes -= 1; s.count += 1; usedFreeze = true; }
    else s.count = 1;
    s.lastDay = todayStr;
    s.best = Math.max(s.best || 0, s.count);
    return { usedFreeze: usedFreeze };
  }

  /**
   * Soma XP no perfil. Retorna { gained, goalJustMet, levelUp, usedFreeze }.
   */
  function addXp(profile, amount, todayStr) {
    var d = day(profile, todayStr);
    var before = levelInfo(profile.xp || 0).level;
    profile.xp = (profile.xp || 0) + amount;
    d.xp += amount;
    var res = { gained: amount, goalJustMet: false, levelUp: false, usedFreeze: false };
    if (!d.goalMet && d.xp >= (profile.dailyGoal || 50)) {
      d.goalMet = true;
      profile.xp += GOAL_BONUS;
      d.xp += GOAL_BONUS;
      res.gained += GOAL_BONUS;
      res.goalJustMet = true;
      res.usedFreeze = registerGoal(profile, todayStr).usedFreeze;
    }
    res.levelUp = levelInfo(profile.xp).level > before;
    return res;
  }

  var api = { xpForLevel: xpForLevel, levelInfo: levelInfo, weekKey: weekKey, day: day, addXp: addXp,
              currentStreak: currentStreak, ensureStreak: ensureStreak, GOAL_BONUS: GOAL_BONUS, SENTENCE_XP: SENTENCE_XP };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.App = root.App || {}; root.App.game = api; }
})(typeof window !== "undefined" ? window : this);
