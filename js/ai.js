/* AppEnglish — correção e conversa com IA (API do Claude) + modo "copiar e colar" sem chave. */
(function (root) {
  "use strict";
  var U = root.App.util;

  var MODELS = [
    { id: "claude-sonnet-5-5", label: "Claude Sonnet 5.5 (recomendado)" },
    { id: "claude-haiku-5-5", label: "Claude Haiku 5.5 (mais rápido e barato)" },
    { id: "claude-opus-5-5", label: "Claude Opus 5.5 (mais caprichado)" }
  ];

  function hasKey(p) { return !!(p && p.ai && p.ai.key && p.ai.key.trim()); }

  function call(p, system, messages, maxTokens) {
    if (!hasKey(p)) return Promise.reject(new Error("Configure a chave da API em Ajustes, ou use o modo copiar e colar."));
    return fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": p.ai.key.trim(),
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({ model: p.ai.model || MODELS[0].id, max_tokens: maxTokens || 1500, system: system, messages: messages })
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) {
          var msg = (j && j.error && j.error.message) || ("HTTP " + r.status);
          if (r.status === 401) msg = "Chave da API inválida. Confira em Ajustes.";
          else if (r.status === 429) msg = "Limite de uso da API atingido. Tente de novo em alguns minutos.";
          else if (r.status === 404) msg = "Modelo não encontrado (" + (p.ai.model || "") + "). Troque o modelo em Ajustes.";
          throw new Error(msg);
        }
        return (j.content || []).filter(function (b) { return b.type === "text"; }).map(function (b) { return b.text; }).join("");
      });
    }, function () { throw new Error("Sem conexão com a API. Verifique a internet."); });
  }

  var FEEDBACK_SCHEMA =
    '{\n' +
    '  "score": { "grammar": 0-5, "vocabulary": 0-5, "coherence": 0-5, "naturalness": 0-5 },\n' +
    '  "level_estimate": "B1" | "B2" | "C1" | "C2",\n' +
    '  "summary_pt": "2-3 frases em português: o que está bom e o principal ponto a melhorar",\n' +
    '  "corrected_text": "o texto inteiro corrigido e com inglês natural, mantendo as ideias do aluno",\n' +
    '  "errors": [ { "original": "trecho exato do aluno", "correction": "trecho corrigido", "sentence_corrected": "a frase completa já corrigida", "explanation_pt": "explicação curta em português", "type": "grammar" | "vocabulary" | "spelling" | "style" } ],\n' +
    '  "better_expressions": [ { "instead_of": "trecho correto mas pouco natural", "try": "alternativa mais natural/avançada", "why_pt": "por quê, em português" } ]\n' +
    '}';

  var TUTOR = "You are an experienced English teacher for a Brazilian adult (a civil engineer) moving from B2 to C1. " +
    "You are precise, encouraging and honest. You never invent errors: if something is correct, leave it. " +
    "List at most 8 errors, the most important first. Give 2-4 better_expressions that would make the student sound more natural.";

  function writingRequest(task, text) {
    var system = TUTOR + " Reply ONLY with a valid JSON object, no markdown, following exactly this schema:\n" + FEEDBACK_SCHEMA;
    var user = "Writing task (" + (task.level || "B2") + ", " + (task.type || "free") + "): " + task.prompt_en +
      "\nExpected length: " + (task.minWords || 80) + "-" + (task.maxWords || 200) + " words.\n\nStudent's text:\n\"\"\"\n" + text + "\n\"\"\"";
    return { system: system, user: user };
  }

  function conversationSystem(sc) {
    return "Role-play for English speaking practice. You are " + sc.ai_role + ". Setting: " + sc.setting_pt +
      " (the setting is described in Portuguese, but you speak only English). The learner is a Brazilian civil engineer at B2 level. " +
      "Rules: stay in character; reply in 1-3 short, natural spoken sentences; ask questions to keep the conversation going; " +
      "do NOT correct the learner during the conversation; if the learner seems lost, simplify your language. Never use lists or markdown.";
  }

  function conversationFeedback(sc, transcript) {
    var system = TUTOR + " Analyse ONLY the learner's lines (marked LEARNER). Reply ONLY with a valid JSON object, no markdown, following exactly this schema:\n" +
      FEEDBACK_SCHEMA + "\nFor corrected_text, write the learner's lines rewritten in natural English, one per line.";
    var user = "Scenario: " + sc.title + " — goal: " + sc.goal_pt + "\n\nTranscript:\n" + transcript;
    return { system: system, user: user };
  }

  // Texto para colar no claude.ai quando não há chave da API
  function externalPrompt(req) {
    return req.system + "\n\n" + req.user + "\n\nResponda SOMENTE com o JSON.";
  }

  function externalConversationPrompt(sc) {
    return "Let's do an English speaking role-play (you can use voice mode).\n" + conversationSystem(sc) +
      "\nStart with this line: \"" + sc.opener + "\"\nWhen I say 'FEEDBACK', stop the role-play and give me feedback in Portuguese: my main errors (original → correction), " +
      "3 more natural expressions I could have used, and a score from 0 to 5 for grammar, vocabulary, fluency and naturalness.";
  }

  function clamp5(x) { x = +x; return isFinite(x) ? Math.max(0, Math.min(5, Math.round(x))) : 0; }

  function parseFeedback(text) {
    var j = U.parseJSONLoose(text);
    var s = j.score || {};
    return {
      score: { grammar: clamp5(s.grammar), vocabulary: clamp5(s.vocabulary), coherence: clamp5(s.coherence), naturalness: clamp5(s.naturalness) },
      level_estimate: String(j.level_estimate || ""),
      summary_pt: String(j.summary_pt || ""),
      corrected_text: String(j.corrected_text || ""),
      errors: (Array.isArray(j.errors) ? j.errors : []).filter(function (e) { return e && e.original && e.correction; }).map(function (e) {
        return { original: String(e.original), correction: String(e.correction), sentence_corrected: String(e.sentence_corrected || ""),
                 explanation_pt: String(e.explanation_pt || ""), type: String(e.type || "grammar") };
      }),
      better_expressions: (Array.isArray(j.better_expressions) ? j.better_expressions : []).filter(function (b) { return b && b.try; }).map(function (b) {
        return { instead_of: String(b.instead_of || ""), try: String(b.try), why_pt: String(b.why_pt || "") };
      })
    };
  }

  function total(fb) { var s = fb.score; return s.grammar + s.vocabulary + s.coherence + s.naturalness; } // 0–20

  // Converte um erro corrigido em card do "Meu deck"
  function errorToCard(e, source) {
    var sentence = e.sentence_corrected || e.correction;
    var cloze = U.clozeFromSentence(sentence, e.correction);
    if (!cloze || cloze === "___") cloze = "Corrija: “" + e.original + "” → ___";
    return {
      id: "my-" + U.slug(e.correction) + "-" + Date.now().toString(36) + Math.floor(Math.random() * 1000),
      term: e.correction, meaning: e.explanation_pt || "Forma correta", pt: "Você escreveu: “" + e.original + "”",
      examples: [sentence, "✗ " + e.original], cloze: cloze, answer: e.correction,
      register: "neutral", separable: false, pitfall: e.explanation_pt || "", source: source || "erro", created: new Date().toISOString().slice(0, 10)
    };
  }

  root.App.ai = { MODELS: MODELS, hasKey: hasKey, call: call, writingRequest: writingRequest, conversationSystem: conversationSystem,
    conversationFeedback: conversationFeedback, externalPrompt: externalPrompt, externalConversationPrompt: externalConversationPrompt,
    parseFeedback: parseFeedback, total: total, errorToCard: errorToCard };
})(window);
