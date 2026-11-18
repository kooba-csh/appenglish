window.CONTENT = window.CONTENT || { decks: [] };
CONTENT.grammar = CONTENT.grammar || [];

CONTENT.grammar.push({
  id: "gr-present-perfect",
  order: 1,
  title: "Present Perfect vs Past Simple",
  level: "B2",
  summary_pt: "O Past Simple fala de um momento terminado e definido no passado (yesterday, in 2019, last week, when I was a kid). O Present Perfect liga o passado ao presente: experiências sem data, resultados que importam agora, ou situações que começaram no passado e continuam. Em português usamos o pretérito perfeito para as duas ideias, por isso o erro é tão comum. Pergunte-se: o tempo já acabou e foi mencionado? Então é Past Simple.",
  rules: [
    { rule_pt: "Use Past Simple com tempo terminado e definido (yesterday, last year, in 2015, two days ago, when...).", examples: ["We poured the slab last Friday.", "I visited Lisbon in 2018."] },
    { rule_pt: "Use Present Perfect para experiências de vida sem dizer quando (ever, never, before).", examples: ["Have you ever worked on a bridge project?", "I've never been to Canada."] },
    { rule_pt: "Use Present Perfect para resultados presentes de ações recentes (just, already, yet).", examples: ["The client has just approved the drawings.", "Have you sent the report yet?"] },
    { rule_pt: "Use Present Perfect com for/since para situações que começaram no passado e continuam até agora.", examples: ["I've lived in Rondônia since 2010.", "She has known him for years."] },
    { rule_pt: "Com períodos ainda não terminados (today, this week, this year) use Present Perfect; se o período acabou, Past Simple.", examples: ["I've had three meetings this morning. (ainda é de manhã)", "I had three meetings this morning. (já é tarde)"] }
  ],
  pitfalls_pt: [
    "Usar Present Perfect com marcador de tempo passado: 'I have finished it yesterday' está errado; diga 'I finished it yesterday'.",
    "Usar Past Simple ou Present Simple com since/for para algo que continua: 'I work here since 2019' está errado; diga 'I've worked here since 2019'.",
    "Traduzir 'Você já foi a Londres?' como 'Did you already go to London?'; o natural é 'Have you ever been to London?'.",
    "Confundir 'been' e 'gone': 'She has gone to Brazil' (está lá agora) vs 'She has been to Brazil' (já foi e voltou)."
  ],
  exercises: [
    { type: "mc", prompt: "I ___ the site inspection two days ago.", options: ["have done", "did", "have been doing", "do"], answer: 1, explain_pt: "'Two days ago' é tempo passado definido: Past Simple." },
    { type: "mc", prompt: "___ you ever ___ a structural failure?", options: ["Did / see", "Do / see", "Have / seen", "Had / saw"], answer: 2, explain_pt: "'Ever' indica experiência de vida sem data: Present Perfect." },
    { type: "mc", prompt: "We ___ here since the company opened.", options: ["have worked", "work", "worked", "are working"], answer: 0, explain_pt: "Situação que começou no passado e continua, com 'since': Present Perfect." },
    { type: "mc", prompt: "When ___ you ___ the contract?", options: ["have / signed", "had / signed", "do / sign", "did / sign"], answer: 3, explain_pt: "Perguntas com 'when' pedem um momento definido: Past Simple." },
    { type: "mc", prompt: "Look! The concrete truck ___ arrived.", options: ["just has", "has just", "just", "did just"], answer: 1, explain_pt: "Resultado recente com 'just': has just arrived (just entre has e o particípio)." },
    { type: "fix", prompt: "I have met the new manager last week.", answer: "I met the new manager last week.", alternatives: [], explain_pt: "'Last week' é passado terminado: use Past Simple." },
    { type: "fix", prompt: "I work in this company since 2019.", answer: "I have worked in this company since 2019.", alternatives: ["I've worked in this company since 2019.", "I have been working in this company since 2019.", "I've been working in this company since 2019.", "I have worked at this company since 2019.", "I've worked at this company since 2019.", "I have been working at this company since 2019.", "I've been working at this company since 2019."], explain_pt: "Com 'since' para algo que continua, use Present Perfect (simples ou contínuo)." },
    { type: "fix", prompt: "Did you ever go to the United States?", answer: "Have you ever been to the United States?", alternatives: ["Have you ever gone to the United States?"], explain_pt: "Experiência de vida com 'ever': Present Perfect; o mais natural é 'been to'." },
    { type: "transform", prompt: "Reescreva usando 'for': I bought this car three years ago and I still have it.", answer: "I have had this car for three years.", alternatives: ["I've had this car for three years.", "I have owned this car for three years.", "I've owned this car for three years."], explain_pt: "Situação que continua até hoje com duração: Present Perfect + for." },
    { type: "transform", prompt: "Reescreva usando 'yet' (negativa): The client still hasn't paid the invoice.", answer: "The client hasn't paid the invoice yet.", alternatives: ["The client has not paid the invoice yet."], explain_pt: "'Yet' vai no fim de frases negativas e perguntas no Present Perfect." }
  ]
});

CONTENT.grammar.push({
  id: "gr-present-perfect-continuous",
  order: 2,
  title: "Present Perfect Continuous",
  level: "B2",
  summary_pt: "O Present Perfect Continuous (have/has been + -ing) enfatiza a duração ou a continuidade de uma atividade que começou no passado e continua até agora, ou que acabou de parar e deixou sinais visíveis. O Present Perfect simples enfatiza o resultado ou a quantidade concluída. Verbos de estado (know, believe, own, like, belong) normalmente não vão para a forma contínua. Brasileiros costumam usar o presente ('I am working here for two years'), que está errado.",
  rules: [
    { rule_pt: "Use para atividades que começaram no passado e continuam agora, com foco na duração (for, since, how long, all day).", examples: ["I've been studying English for six years.", "How long have you been waiting?"] },
    { rule_pt: "Use para atividades recém-terminadas que deixam evidência no presente.", examples: ["You look tired. Have you been working all night?", "The ground is wet because it's been raining."] },
    { rule_pt: "Use o Present Perfect simples para resultado ou quantidade concluída (how many, how much, número de vezes).", examples: ["I've written three reports today.", "I've been writing reports all day."] },
    { rule_pt: "Verbos de estado (know, have = possuir, own, believe, understand, like) ficam no Present Perfect simples.", examples: ["I've known her since college.", "We've had this office for ten years."] }
  ],
  pitfalls_pt: [
    "Usar Present Continuous para duração até agora: 'I am waiting for an hour' está errado; diga 'I've been waiting for an hour'.",
    "Colocar verbos de estado na forma contínua: 'I've been knowing him for years' está errado; diga 'I've known him for years'.",
    "Usar a forma contínua com quantidade: 'I've been reading three books this month' soa errado; diga 'I've read three books this month'."
  ],
  exercises: [
    { type: "mc", prompt: "We ___ on this project since January.", options: ["are working", "have been working", "work", "were working"], answer: 1, explain_pt: "Atividade que começou em janeiro e continua: Present Perfect Continuous." },
    { type: "mc", prompt: "I ___ him since we were at university.", options: ["have known", "have been knowing", "know", "am knowing"], answer: 0, explain_pt: "'Know' é verbo de estado: Present Perfect simples." },
    { type: "mc", prompt: "Your hands are dirty. What ___?", options: ["did you do", "have you done", "are you doing", "have you been doing"], answer: 3, explain_pt: "Atividade recente com evidência visível: Present Perfect Continuous." },
    { type: "mc", prompt: "She ___ four site visits this week.", options: ["has been doing", "is doing", "has done", "does"], answer: 2, explain_pt: "Quantidade concluída (four): Present Perfect simples." },
    { type: "mc", prompt: "How long ___ for the permit?", options: ["have you been waiting", "are you waiting", "do you wait", "did you wait"], answer: 0, explain_pt: "'How long' sobre algo que continua: Present Perfect Continuous." },
    { type: "fix", prompt: "I am living in Porto Velho for five years.", answer: "I have been living in Porto Velho for five years.", alternatives: ["I've been living in Porto Velho for five years.", "I have lived in Porto Velho for five years.", "I've lived in Porto Velho for five years."], explain_pt: "Duração até agora com 'for' não usa Present Continuous; use Present Perfect (Continuous)." },
    { type: "fix", prompt: "They have been owning the land since 2005.", answer: "They have owned the land since 2005.", alternatives: ["They've owned the land since 2005."], explain_pt: "'Own' é verbo de estado e não vai para a forma contínua." },
    { type: "fix", prompt: "It has been rain all morning.", answer: "It has been raining all morning.", alternatives: ["It's been raining all morning."], explain_pt: "A estrutura é have/has been + verbo com -ing." },
    { type: "transform", prompt: "Reescreva com o Present Perfect Continuous e 'for': I started reviewing the drawings two hours ago and I'm still reviewing them.", answer: "I have been reviewing the drawings for two hours.", alternatives: ["I've been reviewing the drawings for two hours."], explain_pt: "Atividade em andamento com duração: have been + -ing + for." },
    { type: "transform", prompt: "Faça a pergunta com 'How long' para: She has been teaching for ten years.", answer: "How long has she been teaching?", alternatives: [], explain_pt: "Pergunta: How long + has + sujeito + been + -ing." }
  ]
});

CONTENT.grammar.push({
  id: "gr-past-perfect",
  order: 3,
  title: "Past Perfect e narrativas",
  level: "B2",
  summary_pt: "O Past Perfect (had + particípio) mostra que uma ação aconteceu ANTES de outro momento no passado. Em narrativas, o Past Simple conta a sequência principal e o Past Perfect volta um passo atrás. O Past Continuous descreve o cenário (o que estava acontecendo). Se a ordem já está clara (com before/after) o Past Perfect é opcional, mas com 'when' ele muda o sentido.",
  rules: [
    { rule_pt: "Use Past Perfect para uma ação anterior a outra ação passada.", examples: ["When we arrived, the meeting had already started.", "She had left before I called."] },
    { rule_pt: "Com 'when', o tempo verbal muda o sentido: Past Simple = em seguida; Past Perfect = antes.", examples: ["When I got there, they left. (saíram depois que cheguei)", "When I got there, they had left. (já tinham saído)"] },
    { rule_pt: "Use Past Continuous para o cenário e Past Simple para os eventos principais.", examples: ["We were pouring the slab when it started to rain.", "I was driving home when the client called."] },
    { rule_pt: "Use Past Perfect Continuous (had been + -ing) para duração antes de um momento passado.", examples: ["They had been working for 12 hours when the crane broke down.", "I was tired because I had been studying all night."] },
    { rule_pt: "Use Past Perfect em expressões como 'It was the first time...', 'by the time...', 'never... before'.", examples: ["It was the first time I had seen such a big dam.", "By the time the inspector came, we had fixed the leak."] }
  ],
  pitfalls_pt: [
    "Usar Past Simple quando é preciso mostrar anterioridade: 'When I arrived, the train left' sugere que saiu depois; use 'had left'.",
    "Usar Past Perfect para tudo no passado, só porque soa mais formal. Na sequência normal dos fatos use Past Simple.",
    "Dizer 'It was the first time I saw' em vez de 'It was the first time I had seen'.",
    "Esquecer o particípio irregular: 'had went' está errado; o correto é 'had gone'."
  ],
  exercises: [
    { type: "mc", prompt: "When I got to the office, my boss ___ home.", options: ["has gone", "had gone", "goes", "was going"], answer: 1, explain_pt: "Ele saiu antes da minha chegada: Past Perfect." },
    { type: "mc", prompt: "We ___ the beams when the power went out.", options: ["were welding", "had welded", "welded", "have welded"], answer: 0, explain_pt: "Ação em andamento interrompida por outra: Past Continuous." },
    { type: "mc", prompt: "It was the first time she ___ abroad.", options: ["travelled", "has travelled", "was travelling", "had travelled"], answer: 3, explain_pt: "'It was the first time' pede Past Perfect." },
    { type: "mc", prompt: "By the time the fire brigade arrived, the fire ___ out.", options: ["has burned", "burns", "had burned", "was burning"], answer: 2, explain_pt: "'By the time' + passado: ação concluída antes, Past Perfect." },
    { type: "mc", prompt: "He was exhausted because he ___ since 5 a.m.", options: ["had been working", "has been working", "worked", "is working"], answer: 0, explain_pt: "Duração antes de um momento passado: Past Perfect Continuous." },
    { type: "fix", prompt: "When we arrived at the site, the workers already left.", answer: "When we arrived at the site, the workers had already left.", alternatives: ["When we arrived at the site the workers had already left.", "When we arrived at the site, the workers had left already."], explain_pt: "A saída aconteceu antes da chegada: Past Perfect." },
    { type: "fix", prompt: "I realized I had forgot my keys in the car.", answer: "I realized I had forgotten my keys in the car.", alternatives: ["I realised I had forgotten my keys in the car.", "I realized I'd forgotten my keys in the car.", "I realised I'd forgotten my keys in the car.", "I realized that I had forgotten my keys in the car.", "I realized that I'd forgotten my keys in the car."], explain_pt: "O particípio de 'forget' é 'forgotten'." },
    { type: "fix", prompt: "She told me she never saw snow before that trip.", answer: "She told me she had never seen snow before that trip.", alternatives: ["She told me she'd never seen snow before that trip.", "She told me that she had never seen snow before that trip.", "She told me that she'd never seen snow before that trip."], explain_pt: "Experiência anterior a um ponto do passado: Past Perfect." },
    { type: "transform", prompt: "Junte as frases em uma só com 'after' e Past Perfect: The inspector checked the scaffolding. Then the work started.", answer: "The work started after the inspector had checked the scaffolding.", alternatives: ["After the inspector had checked the scaffolding, the work started.", "The work started after the inspector'd checked the scaffolding.", "After the inspector had checked the scaffolding the work started."], explain_pt: "A ação anterior (checar) vai para o Past Perfect." },
    { type: "transform", prompt: "Reescreva usando 'by the time': The client arrived. We had already finished the presentation before that.", answer: "By the time the client arrived, we had already finished the presentation.", alternatives: ["By the time the client arrived we had already finished the presentation.", "By the time the client arrived, we'd already finished the presentation.", "By the time the client arrived we'd already finished the presentation.", "We had already finished the presentation by the time the client arrived.", "We'd already finished the presentation by the time the client arrived."], explain_pt: "'By the time' + Past Simple, oração principal no Past Perfect." }
  ]
});

CONTENT.grammar.push({
  id: "gr-conditionals-0-1-2",
  order: 4,
  title: "Condicionais: zero, primeira e segunda",
  level: "B2",
  summary_pt: "Zero conditional: verdades gerais e fatos técnicos (If + presente, presente). First conditional: situação real e possível no futuro (If + presente, will). Second conditional: situação hipotética, improvável ou irreal no presente/futuro (If + passado, would). O erro clássico de brasileiro é colocar 'will' ou 'would' dentro da oração com 'if', copiando o 'se eu for' / 'se eu fosse'.",
  rules: [
    { rule_pt: "Zero: If/When + presente, presente. Para fatos sempre verdadeiros.", examples: ["If you heat steel, it expands.", "If concrete dries too fast, it cracks."] },
    { rule_pt: "First: If + presente, will/can/may + verbo. Para possibilidades reais no futuro.", examples: ["If it rains tomorrow, we'll postpone the pour.", "If you send me the plans, I can check them tonight."] },
    { rule_pt: "Second: If + passado, would/could/might + verbo. Para hipóteses irreais ou improváveis.", examples: ["If I had more time, I would take a master's degree.", "If we won the tender, we could hire ten people."] },
    { rule_pt: "Na segunda condicional, 'were' é usado para todas as pessoas, especialmente em 'If I were you' (conselho).", examples: ["If I were you, I'd ask for a written contract.", "If she were here, she would know what to do."] },
    { rule_pt: "Unless = if... not; as long as / provided that = desde que.", examples: ["We won't start unless the permit is approved.", "You can use my truck as long as you return it by Friday."] }
  ],
  pitfalls_pt: [
    "Usar 'will' depois de 'if': 'If it will rain, we will stop' está errado; diga 'If it rains, we'll stop'.",
    "Usar 'would' depois de 'if': 'If I would have money...' está errado; diga 'If I had money...'.",
    "Usar presente na segunda condicional para algo irreal: 'If I am rich, I would...' está errado; diga 'If I were rich, I would...'.",
    "Usar 'unless' com outra negação: 'unless you don't pay' está errado; diga 'unless you pay'."
  ],
  exercises: [
    { type: "mc", prompt: "If the client ___ the budget, we'll start next week.", options: ["will approve", "approves", "would approve", "approved"], answer: 1, explain_pt: "First conditional: presente depois de 'if', nunca 'will'." },
    { type: "mc", prompt: "If I ___ you, I would accept the offer.", options: ["am", "will be", "were", "have been"], answer: 2, explain_pt: "Conselho com 'If I were you' (second conditional)." },
    { type: "mc", prompt: "If you mix cement with water, it ___.", options: ["hardens", "would harden", "will have hardened", "hardened"], answer: 0, explain_pt: "Fato técnico geral: zero conditional (presente + presente)." },
    { type: "mc", prompt: "If we had a bigger crane, we ___ finish the roof faster.", options: ["can", "will", "would have", "could"], answer: 3, explain_pt: "Hipótese irreal no presente: If + passado, could/would + verbo." },
    { type: "mc", prompt: "We won't sign the contract ___ they reduce the price.", options: ["unless", "if", "provided", "when"], answer: 0, explain_pt: "Unless = a menos que (if... not): não assinamos se eles não reduzirem." },
    { type: "fix", prompt: "If it will rain tomorrow, we will cancel the concrete pour.", answer: "If it rains tomorrow, we will cancel the concrete pour.", alternatives: ["If it rains tomorrow, we'll cancel the concrete pour.", "If it rains tomorrow we will cancel the concrete pour.", "If it rains tomorrow we'll cancel the concrete pour."], explain_pt: "Na oração com 'if' use o presente, não 'will'." },
    { type: "fix", prompt: "If I would have more money, I would buy a new truck.", answer: "If I had more money, I would buy a new truck.", alternatives: ["If I had more money, I'd buy a new truck.", "If I had more money I would buy a new truck.", "If I had more money I'd buy a new truck."], explain_pt: "Second conditional: If + passado, sem 'would' na oração do 'if'." },
    { type: "fix", prompt: "We can't start unless you don't sign the form.", answer: "We can't start unless you sign the form.", alternatives: ["We cannot start unless you sign the form.", "We can't start if you don't sign the form.", "We cannot start if you don't sign the form.", "We can't start if you do not sign the form.", "We cannot start if you do not sign the form."], explain_pt: "'Unless' já é negativo; não use 'don't' depois dele." },
    { type: "transform", prompt: "Reescreva como second conditional: I don't speak German, so I can't work in Munich.", answer: "If I spoke German, I could work in Munich.", alternatives: ["If I spoke German I could work in Munich.", "If I spoke German, I would be able to work in Munich.", "If I spoke German I would be able to work in Munich.", "If I spoke German, I'd be able to work in Munich.", "If I spoke German I'd be able to work in Munich.", "I could work in Munich if I spoke German.", "If I could speak German, I could work in Munich.", "If I could speak German I could work in Munich."], explain_pt: "Situação irreal no presente: If + passado, could + verbo." },
    { type: "transform", prompt: "Reescreva com 'unless': If you don't wear a helmet, you can't enter the site.", answer: "Unless you wear a helmet, you can't enter the site.", alternatives: ["Unless you wear a helmet you can't enter the site.", "Unless you wear a helmet, you cannot enter the site.", "Unless you wear a helmet you cannot enter the site.", "You can't enter the site unless you wear a helmet.", "You cannot enter the site unless you wear a helmet."], explain_pt: "Unless = if... not; a oração com unless fica afirmativa." }
  ]
});

CONTENT.grammar.push({
  id: "gr-third-mixed-conditionals",
  order: 5,
  title: "Terceira condicional e condicionais mistas",
  level: "B2",
  summary_pt: "A terceira condicional fala de um passado que não aconteceu e de seu resultado imaginário no passado: If + had + particípio, would have + particípio. As condicionais mistas cruzam tempos: uma condição passada com resultado no presente (If I had studied..., I would be...) ou uma característica presente com resultado passado (If I were more careful, I wouldn't have...). Brasileiros costumam dizer 'If I would have known' ou esquecer o 'have'.",
  rules: [
    { rule_pt: "Terceira: If + had + particípio, would/could/might have + particípio. Passado irreal.", examples: ["If we had checked the soil, the wall wouldn't have collapsed.", "If I had known, I would have called you."] },
    { rule_pt: "Mista (passado para presente): If + had + particípio, would + verbo (resultado agora).", examples: ["If I had accepted that job, I would live in São Paulo now.", "If they had built a proper drainage system, the street wouldn't flood every year."] },
    { rule_pt: "Mista (presente para passado): If + passado simples, would have + particípio.", examples: ["If I spoke English fluently, I would have got that contract.", "If he weren't so stubborn, he would have listened to us."] },
    { rule_pt: "Na fala, 'would have' vira 'would've' e 'had' vira 'd. Nunca escreva 'would of'.", examples: ["If you'd told me, I would've helped.", "I'd have come if I'd been invited."] }
  ],
  pitfalls_pt: [
    "Usar 'would have' depois de 'if': 'If I would have known' está errado; diga 'If I had known'.",
    "Esquecer o 'have': 'I would called you' está errado; diga 'I would have called you'.",
    "Usar a terceira condicional quando o resultado é presente: 'If I had studied engineering, I would have been an engineer now' está errado; diga 'I would be an engineer now'.",
    "Escrever 'would of' por imitar a pronúncia de 'would've'."
  ],
  exercises: [
    { type: "mc", prompt: "If we ___ the forecast, we wouldn't have poured the concrete.", options: ["checked", "would have checked", "had checked", "have checked"], answer: 2, explain_pt: "Terceira condicional: If + had + particípio." },
    { type: "mc", prompt: "If she had taken the job in Canada, she ___ in Toronto now.", options: ["would live", "would have lived", "will live", "had lived"], answer: 0, explain_pt: "Condição passada com resultado presente ('now'): would + verbo." },
    { type: "mc", prompt: "I ___ you if I had had your number.", options: ["would call", "will have called", "had called", "would have called"], answer: 3, explain_pt: "Resultado passado irreal: would have + particípio." },
    { type: "mc", prompt: "If he ___ so careless, he wouldn't have lost the files.", options: ["isn't", "weren't", "hadn't", "wouldn't be"], answer: 1, explain_pt: "Característica permanente (presente) com resultado passado: If + passado (weren't)." },
    { type: "mc", prompt: "We ___ the deadline if the supplier had delivered on time.", options: ["could have met", "could meet", "can meet", "had met"], answer: 0, explain_pt: "Passado irreal: could have + particípio." },
    { type: "fix", prompt: "If I would have known about the meeting, I would have come.", answer: "If I had known about the meeting, I would have come.", alternatives: ["If I'd known about the meeting, I would have come.", "If I had known about the meeting, I'd have come.", "If I'd known about the meeting, I'd have come.", "If I had known about the meeting, I would've come.", "If I'd known about the meeting, I would've come.", "If I had known about the meeting I would have come."], explain_pt: "Na oração com 'if' use had + particípio, não 'would have'." },
    { type: "fix", prompt: "If they had followed the design, the roof wouldn't collapsed.", answer: "If they had followed the design, the roof wouldn't have collapsed.", alternatives: ["If they had followed the design, the roof would not have collapsed.", "If they'd followed the design, the roof wouldn't have collapsed.", "If they'd followed the design, the roof would not have collapsed.", "If they had followed the design the roof wouldn't have collapsed."], explain_pt: "Falta o 'have': wouldn't have + particípio." },
    { type: "fix", prompt: "If I had taken that course, I would have been a manager now.", answer: "If I had taken that course, I would be a manager now.", alternatives: ["If I had taken that course, I'd be a manager now.", "If I'd taken that course, I would be a manager now.", "If I'd taken that course, I'd be a manager now.", "If I had taken that course I would be a manager now.", "If I'd taken that course I'd be a manager now."], explain_pt: "Resultado no presente (now): condicional mista com would + verbo, não would have been." },
    { type: "transform", prompt: "Reescreva como terceira condicional: We didn't have a backup, so we lost all the data.", answer: "If we had had a backup, we wouldn't have lost all the data.", alternatives: ["If we had had a backup, we would not have lost all the data.", "If we'd had a backup, we wouldn't have lost all the data.", "If we'd had a backup, we would not have lost all the data.", "If we had had a backup we wouldn't have lost all the data.", "If we'd had a backup we wouldn't have lost all the data.", "We wouldn't have lost all the data if we had had a backup.", "We wouldn't have lost all the data if we'd had a backup."], explain_pt: "Passado irreal: If + had had, wouldn't have + particípio." },
    { type: "transform", prompt: "Reescreva como condicional mista: I didn't learn English as a child, so I'm not fluent now.", answer: "If I had learned English as a child, I would be fluent now.", alternatives: ["If I had learnt English as a child, I would be fluent now.", "If I'd learned English as a child, I would be fluent now.", "If I'd learned English as a child, I'd be fluent now.", "If I had learned English as a child, I'd be fluent now.", "If I'd learnt English as a child, I'd be fluent now.", "If I had learned English as a child I would be fluent now.", "I would be fluent now if I had learned English as a child.", "I'd be fluent now if I'd learned English as a child."], explain_pt: "Condição passada (had learned) com resultado presente (would be)." }
  ]
});

CONTENT.grammar.push({
  id: "gr-passive-voice",
  order: 6,
  title: "Voz passiva (inclusive em relatórios técnicos)",
  level: "B2",
  summary_pt: "A voz passiva (be + particípio) coloca o foco na ação ou no objeto, não em quem fez. É muito usada em relatórios técnicos, especificações e atas: 'The samples were tested', 'The slab will be poured'. O verbo 'be' carrega o tempo verbal. Use 'by' só quando o agente for importante. Em português usamos 'foi feito' ou o 'se' (vende-se); em inglês o 'se' vira passiva ou sujeito genérico.",
  rules: [
    { rule_pt: "Forme com be (no tempo certo) + particípio. O tempo verbal fica no 'be'.", examples: ["The report is reviewed every month.", "The foundations were inspected yesterday.", "The bridge has been closed for repairs."] },
    { rule_pt: "Com modais: modal + be + particípio; no passado: modal + have been + particípio.", examples: ["The beams must be checked before loading.", "The cracks should have been reported earlier."] },
    { rule_pt: "Passiva contínua: be being + particípio.", examples: ["The road is being resurfaced this week.", "The walls were being painted when we arrived."] },
    { rule_pt: "Passiva impessoal para relatórios: It is said/believed/expected that... ou Sujeito + is said/thought to...", examples: ["It is expected that the works will be completed by May.", "The building is thought to have been built in the 1950s."] },
    { rule_pt: "Use 'have/get something done' quando outra pessoa faz o serviço para você.", examples: ["We had the soil tested by an external lab.", "I need to get my car repaired."] }
  ],
  pitfalls_pt: [
    "Esquecer o 'be': 'The samples tested in the lab' (incompleto); diga 'The samples were tested in the lab'.",
    "Usar o verbo principal no passado em vez do particípio: 'was wrote' está errado; diga 'was written'.",
    "Traduzir o 'se' literalmente: 'Sells houses' ou 'It sells houses' para 'Vendem-se casas'; diga 'Houses for sale' ou 'Houses are sold here'.",
    "Abusar do 'by' sem necessidade: 'The report was written by someone' é redundante; omita o agente."
  ],
  exercises: [
    { type: "mc", prompt: "The concrete samples ___ to the lab last Monday.", options: ["sent", "were sent", "have sent", "are sending"], answer: 1, explain_pt: "Passiva no passado: were + particípio." },
    { type: "mc", prompt: "The new viaduct ___ at the moment.", options: ["is being built", "is built", "is building", "has built"], answer: 0, explain_pt: "Ação em andamento na passiva: is being + particípio." },
    { type: "mc", prompt: "All welds must ___ before painting.", options: ["inspect", "be inspect", "being inspected", "be inspected"], answer: 3, explain_pt: "Modal + be + particípio." },
    { type: "mc", prompt: "The damage ___ by the heavy rain last night.", options: ["caused", "has caused", "was caused", "was causing"], answer: 2, explain_pt: "Passiva com agente (by the heavy rain) no passado: was caused." },
    { type: "mc", prompt: "We ___ the roof repaired after the storm.", options: ["had", "were", "did", "made"], answer: 0, explain_pt: "Have something done: outra pessoa fez o serviço." },
    { type: "fix", prompt: "The report was wrote by the site engineer.", answer: "The report was written by the site engineer.", alternatives: [], explain_pt: "Passiva usa o particípio: written, não wrote." },
    { type: "fix", prompt: "The drawings have been approve by the city hall.", answer: "The drawings have been approved by the city hall.", alternatives: ["The drawings have been approved by city hall."], explain_pt: "Depois de 'been' vem o particípio: approved." },
    { type: "fix", prompt: "The cracks should have reported to the engineer.", answer: "The cracks should have been reported to the engineer.", alternatives: ["The cracks should've been reported to the engineer."], explain_pt: "Passiva com modal no passado: should have been + particípio." },
    { type: "transform", prompt: "Passe para a voz passiva, sem o agente: The contractor will finish the foundations next week.", answer: "The foundations will be finished next week.", alternatives: ["The foundations are going to be finished next week.", "The foundations will be completed next week.", "Next week the foundations will be finished.", "Next week, the foundations will be finished."], explain_pt: "Futuro na passiva: will be + particípio; o agente pode ser omitido." },
    { type: "transform", prompt: "Reescreva em estilo de relatório começando com 'It is expected that': Everyone expects the project to be delayed.", answer: "It is expected that the project will be delayed.", alternatives: ["It's expected that the project will be delayed.", "It is expected that the project is going to be delayed.", "It's expected that the project is going to be delayed."], explain_pt: "Passiva impessoal: It is expected that + oração." }
  ]
});

CONTENT.grammar.push({
  id: "gr-relative-clauses",
  order: 7,
  title: "Relative clauses (defining e non-defining)",
  level: "B2",
  summary_pt: "Relative clauses dão informação sobre um substantivo. As defining identificam de qual coisa/pessoa falamos e não têm vírgulas; nelas podemos usar that e, quando o pronome é objeto, omiti-lo. As non-defining acrescentam informação extra, vêm entre vírgulas, NUNCA usam 'that' e o pronome não pode ser omitido. Use who para pessoas, which para coisas, whose para posse, where para lugares e when para tempo.",
  rules: [
    { rule_pt: "Defining: sem vírgulas; who/which/that. Essencial para identificar.", examples: ["The engineer who signed the project is on holiday.", "The crane that broke down is being repaired."] },
    { rule_pt: "Se o pronome é objeto da oração relativa, pode ser omitido (só nas defining).", examples: ["The house (that) we designed won an award.", "The client (who) I met yesterday wants a quote."] },
    { rule_pt: "Non-defining: com vírgulas; who/which (nunca that); informação extra.", examples: ["My brother, who lives in Lisbon, is an architect.", "The new bridge, which cost 20 million, opened last week."] },
    { rule_pt: "Whose indica posse; where indica lugar; 'which' pode se referir à frase inteira.", examples: ["That's the company whose bid was accepted.", "This is the site where the accident happened.", "The supplier was late again, which delayed everything."] },
    { rule_pt: "Em estilo formal, a preposição vai antes de whom/which; no informal, vai para o fim.", examples: ["The person to whom I spoke was very helpful.", "The person I spoke to was very helpful."] }
  ],
  pitfalls_pt: [
    "Usar 'that' em non-defining: 'My car, that is red, ...' está errado; diga 'My car, which is red, ...'.",
    "Repetir o pronome: 'The house that I bought it' está errado; diga 'The house that I bought'.",
    "Usar 'what' como pronome relativo ('o que'): 'The thing what I need' está errado; diga 'The thing (that) I need'.",
    "Usar 'who's' (who is) no lugar de 'whose' (de quem)."
  ],
  exercises: [
    { type: "mc", prompt: "The architect ___ designed this building won several awards.", options: ["which", "who", "whose", "where"], answer: 1, explain_pt: "Pessoa como sujeito: who (ou that)." },
    { type: "mc", prompt: "Our main office, ___ is in Porto Velho, has 40 employees.", options: ["that", "what", "where", "which"], answer: 3, explain_pt: "Non-defining (entre vírgulas) sobre coisa: which, nunca that." },
    { type: "mc", prompt: "That's the contractor ___ company went bankrupt.", options: ["whose", "who's", "who", "which"], answer: 0, explain_pt: "Posse (a empresa dele): whose." },
    { type: "mc", prompt: "This is the town ___ I grew up.", options: ["which", "that", "where", "who"], answer: 2, explain_pt: "Lugar sem preposição no fim: where." },
    { type: "mc", prompt: "The pump stopped working, ___ flooded the basement.", options: ["what", "which", "that", "who"], answer: 1, explain_pt: "'Which' pode se referir à frase inteira anterior." },
    { type: "fix", prompt: "The software that we bought it last year is already outdated.", answer: "The software that we bought last year is already outdated.", alternatives: ["The software which we bought last year is already outdated.", "The software we bought last year is already outdated."], explain_pt: "Não repita o objeto: o pronome relativo já ocupa o lugar de 'it'." },
    { type: "fix", prompt: "My boss, that is very demanding, wants the report today.", answer: "My boss, who is very demanding, wants the report today.", alternatives: [], explain_pt: "Em non-defining (entre vírgulas) não se usa 'that'." },
    { type: "fix", prompt: "This is exactly the material what we need for the job.", answer: "This is exactly the material that we need for the job.", alternatives: ["This is exactly the material which we need for the job.", "This is exactly the material we need for the job."], explain_pt: "'What' não é pronome relativo depois de substantivo; use that/which ou omita." },
    { type: "transform", prompt: "Junte as frases com uma non-defining clause: Rolim de Moura is in Rondônia. It has about 50,000 inhabitants.", answer: "Rolim de Moura, which is in Rondônia, has about 50,000 inhabitants.", alternatives: ["Rolim de Moura, which has about 50,000 inhabitants, is in Rondônia."], explain_pt: "Informação extra entre vírgulas com which." },
    { type: "transform", prompt: "Junte as frases com 'whose': I know a surveyor. His drone can map 100 hectares a day.", answer: "I know a surveyor whose drone can map 100 hectares a day.", alternatives: [], explain_pt: "Whose substitui 'his' e liga a posse ao substantivo." }
  ]
});

CONTENT.grammar.push({
  id: "gr-gerund-infinitive",
  order: 8,
  title: "Gerúndio vs infinitivo",
  level: "B2",
  summary_pt: "Alguns verbos pedem -ing (enjoy, avoid, finish, suggest, mind, consider), outros pedem to + verbo (want, decide, plan, agree, refuse, expect). Depois de preposição sempre vem -ing, inclusive em 'look forward to', 'be used to' e 'object to', onde o 'to' é preposição. Alguns verbos mudam de sentido conforme a forma (stop, remember, forget, try). Brasileiros erram muito com 'suggest to do' e 'look forward to see'.",
  rules: [
    { rule_pt: "Verbos seguidos de -ing: enjoy, avoid, finish, mind, suggest, consider, keep, recommend, risk, deny, can't stand.", examples: ["I suggest postponing the meeting.", "Would you mind sending me the file?"] },
    { rule_pt: "Verbos seguidos de to + verbo: want, decide, plan, agree, refuse, manage, hope, expect, afford, promise.", examples: ["We decided to hire a new surveyor.", "They refused to pay the extra cost."] },
    { rule_pt: "Depois de preposições use -ing, inclusive quando a preposição é 'to' (look forward to, be used to, get used to, object to).", examples: ["I'm looking forward to hearing from you.", "She's used to working under pressure."] },
    { rule_pt: "Stop/remember/forget/try mudam de sentido: stop doing (parar de) x stop to do (parar para); remember doing (lembrar de ter feito) x remember to do (lembrar de fazer).", examples: ["He stopped smoking last year.", "We stopped to have lunch.", "Remember to lock the site gate."] },
    { rule_pt: "Verbos como let, make + objeto + verbo sem 'to'; allow, ask, tell, want + objeto + to.", examples: ["The boss made us redo the calculations.", "The boss asked us to redo the calculations."] }
  ],
  pitfalls_pt: [
    "'Suggest to do' está errado: diga 'suggest doing' ou 'suggest that we do'.",
    "'Look forward to see you' está errado: diga 'look forward to seeing you'.",
    "'Make him to work' está errado: diga 'make him work'.",
    "Confundir 'stop to smoke' (parar para fumar) com 'stop smoking' (parar de fumar)."
  ],
  exercises: [
    { type: "mc", prompt: "We managed ___ the project before the deadline.", options: ["finishing", "finish", "to finish", "finished"], answer: 2, explain_pt: "'Manage' é seguido de to + verbo." },
    { type: "mc", prompt: "Would you mind ___ the window?", options: ["closing", "to close", "close", "closed"], answer: 0, explain_pt: "'Mind' é seguido de -ing." },
    { type: "mc", prompt: "I'm not used to ___ so early.", options: ["wake up", "waking up", "woke up", "be waking up"], answer: 1, explain_pt: "'Be used to' + -ing: o 'to' é preposição." },
    { type: "mc", prompt: "On the way to the site, we stopped ___ fuel.", options: ["buying", "buy", "bought", "to buy"], answer: 3, explain_pt: "Stop to do = parar para fazer outra coisa." },
    { type: "mc", prompt: "The inspector made us ___ the scaffolding.", options: ["to dismantle", "dismantling", "dismantle", "dismantled"], answer: 2, explain_pt: "Make + objeto + verbo sem 'to'." },
    { type: "fix", prompt: "I look forward to meet you at the conference.", answer: "I look forward to meeting you at the conference.", alternatives: ["I'm looking forward to meeting you at the conference.", "I am looking forward to meeting you at the conference."], explain_pt: "Em 'look forward to', o 'to' é preposição: use -ing." },
    { type: "fix", prompt: "The engineer suggested to use steel beams instead of wood.", answer: "The engineer suggested using steel beams instead of wood.", alternatives: ["The engineer suggested that we use steel beams instead of wood.", "The engineer suggested we use steel beams instead of wood.", "The engineer suggested that we should use steel beams instead of wood."], explain_pt: "'Suggest' + -ing ou + that-clause, nunca + to." },
    { type: "fix", prompt: "We can't afford hiring more workers this year.", answer: "We can't afford to hire more workers this year.", alternatives: ["We cannot afford to hire more workers this year."], explain_pt: "'Afford' é seguido de to + verbo." },
    { type: "transform", prompt: "Reescreva usando 'avoid': We didn't work during the hottest hours of the day.", answer: "We avoided working during the hottest hours of the day.", alternatives: [], explain_pt: "'Avoid' + -ing." },
    { type: "transform", prompt: "Reescreva usando 'remember to': Don't forget to send the invoice to the client.", answer: "Remember to send the invoice to the client.", alternatives: ["Please remember to send the invoice to the client.", "Remember to send the client the invoice."], explain_pt: "Remember to do = lembrar de fazer algo (ação futura)." }
  ]
});

CONTENT.grammar.push({
  id: "gr-modals-deduction-past",
  order: 9,
  title: "Modais de dedução e de passado (must have, might have, should have)",
  level: "C1",
  summary_pt: "Para deduzir sobre o presente use must (certeza de que sim), can't (certeza de que não), might/may/could (possibilidade) + verbo. Para o passado, acrescente have + particípio: must have done, can't have done, might have done. Para crítica ou arrependimento use should have / shouldn't have done, e para algo possível que não aconteceu, could have done. O erro de brasileiro é usar 'mustn't' para dedução negativa e esquecer o 'have'.",
  rules: [
    { rule_pt: "Dedução no presente: must (tenho certeza que sim), can't (tenho certeza que não), might/may/could (talvez).", examples: ["He must be at the site; his car is here.", "That can't be the right figure; it's too low.", "She might be in a meeting."] },
    { rule_pt: "Dedução no passado: must have / can't have / couldn't have + particípio.", examples: ["The pipe must have burst during the night.", "He can't have finished already; he only started an hour ago."] },
    { rule_pt: "Possibilidade no passado: might/may/could have + particípio.", examples: ["The documents might have been lost in the mail.", "They may have misunderstood the instructions."] },
    { rule_pt: "Crítica ou arrependimento: should have / shouldn't have + particípio.", examples: ["We should have hired a geotechnical consultant.", "You shouldn't have signed without reading."] },
    { rule_pt: "Could have = era possível, mas não aconteceu; needn't have = fez algo desnecessário.", examples: ["Someone could have been seriously injured.", "You needn't have brought your laptop; we had one."] }
  ],
  pitfalls_pt: [
    "Usar 'mustn't' para dedução negativa: 'He mustn't be at home' significa proibição; diga 'He can't be at home'.",
    "Esquecer o 'have' no passado: 'He must left early' está errado; diga 'He must have left early'.",
    "Usar o passado simples depois de 'have': 'should have went' está errado; diga 'should have gone'.",
    "Traduzir 'deveria ter feito' como 'must have done'; o certo é 'should have done'."
  ],
  exercises: [
    { type: "mc", prompt: "The ground is completely wet. It ___ rained last night.", options: ["should have", "must have", "can't have", "needn't have"], answer: 1, explain_pt: "Dedução com certeza sobre o passado: must have + particípio." },
    { type: "mc", prompt: "She ___ seen the email; she was on holiday with no internet.", options: ["must have", "should have", "might have", "can't have"], answer: 3, explain_pt: "Certeza de que não aconteceu: can't have + particípio." },
    { type: "mc", prompt: "We ___ checked the soil before building. Now the walls are cracking.", options: ["should have", "must have", "can't have", "might"], answer: 0, explain_pt: "Arrependimento/crítica: should have + particípio." },
    { type: "mc", prompt: "I'm not sure where the keys are. I ___ left them in the truck.", options: ["must", "can't have", "might have", "should have"], answer: 2, explain_pt: "Possibilidade no passado sem certeza: might have." },
    { type: "mc", prompt: "That ___ be Paulo at the door; he's in São Paulo this week.", options: ["mustn't", "can't", "shouldn't", "might"], answer: 1, explain_pt: "Dedução negativa no presente: can't, não mustn't." },
    { type: "fix", prompt: "He must left early because his office was empty.", answer: "He must have left early because his office was empty.", alternatives: ["He must've left early because his office was empty.", "He must have left early, because his office was empty."], explain_pt: "Dedução no passado: must have + particípio." },
    { type: "fix", prompt: "You should have went to the meeting yesterday.", answer: "You should have gone to the meeting yesterday.", alternatives: ["You should've gone to the meeting yesterday."], explain_pt: "Depois de 'have' vem o particípio: gone." },
    { type: "fix", prompt: "The report mustn't be correct; the numbers don't add up.", answer: "The report can't be correct; the numbers don't add up.", alternatives: ["The report cannot be correct; the numbers don't add up.", "The report can't be correct, the numbers don't add up.", "The report can't be correct because the numbers don't add up.", "The report couldn't be correct; the numbers don't add up."], explain_pt: "Dedução negativa usa can't; mustn't é proibição." },
    { type: "transform", prompt: "Reescreva com 'should have': It was a mistake not to back up the files.", answer: "We should have backed up the files.", alternatives: ["We should've backed up the files.", "I should have backed up the files.", "I should've backed up the files.", "You should have backed up the files.", "You should've backed up the files.", "They should have backed up the files."], explain_pt: "Crítica/arrependimento sobre o passado: should have + particípio." },
    { type: "transform", prompt: "Reescreva com um modal de dedução: I'm sure the driver took the wrong road.", answer: "The driver must have taken the wrong road.", alternatives: ["The driver must've taken the wrong road."], explain_pt: "Certeza sobre o passado: must have + particípio (taken)." }
  ]
});

CONTENT.grammar.push({
  id: "gr-reported-speech",
  order: 10,
  title: "Reported speech (discurso indireto)",
  level: "B2",
  summary_pt: "Para relatar o que alguém disse, normalmente recuamos um tempo verbal (is vira was, will vira would, did vira had done) quando o verbo introdutório está no passado. Perguntas indiretas usam a ordem de frase afirmativa e não usam do/did. Pedidos e ordens usam ask/tell + objeto + to. 'Tell' exige objeto (tell me); 'say' não (say that). Se o fato continua verdadeiro, o recuo é opcional.",
  rules: [
    { rule_pt: "Recue os tempos: presente vira passado, passado/present perfect vira past perfect, will vira would, can vira could.", examples: ["'I'm busy.' She said she was busy.", "'We will finish soon.' They said they would finish soon."] },
    { rule_pt: "Say + (that); tell + pessoa + (that). Nunca 'say me' nem 'tell that'.", examples: ["He said (that) the budget was too high.", "He told me (that) the budget was too high."] },
    { rule_pt: "Perguntas indiretas: ordem sujeito + verbo, sem do/did; yes/no usa if/whether.", examples: ["She asked where I worked.", "He asked if the drawings were ready."] },
    { rule_pt: "Ordens e pedidos: tell/ask + objeto + (not) to + verbo.", examples: ["The foreman told us to wear helmets.", "She asked me not to call after 6 p.m."] },
    { rule_pt: "Ajuste referências de tempo e lugar: today vira that day, tomorrow vira the next day, here vira there, ago vira before.", examples: ["'I'll call you tomorrow.' He said he would call me the next day.", "'I saw him two days ago.' She said she had seen him two days before."] }
  ],
  pitfalls_pt: [
    "'He said me that...' está errado: diga 'He told me that...' ou 'He said that...'.",
    "Manter a ordem de pergunta: 'She asked where did I live' está errado; diga 'She asked where I lived'.",
    "'He told me that I call him' para ordens; diga 'He told me to call him'.",
    "Esquecer do 'if/whether' em perguntas sim/não: 'He asked was I ready' é informal; diga 'He asked if I was ready'."
  ],
  exercises: [
    { type: "mc", prompt: "She ___ me that the meeting had been cancelled.", options: ["said", "told", "spoke", "asked"], answer: 1, explain_pt: "'Tell' exige a pessoa: told me." },
    { type: "mc", prompt: "He asked me where ___.", options: ["did I live", "do I live", "I lived", "lived I"], answer: 2, explain_pt: "Pergunta indireta: ordem afirmativa, sem did." },
    { type: "mc", prompt: "'I will send the plans.' She said she ___ the plans.", options: ["would send", "will sent", "sends", "has sent"], answer: 0, explain_pt: "Will recua para would." },
    { type: "mc", prompt: "The manager told us ___ late again.", options: ["don't be", "not being", "to not been", "not to be"], answer: 3, explain_pt: "Ordem negativa: tell + objeto + not to + verbo." },
    { type: "mc", prompt: "The client asked ___ we could finish by June.", options: ["that", "if", "what", "do"], answer: 1, explain_pt: "Pergunta sim/não indireta: if/whether." },
    { type: "fix", prompt: "He said me that the truck had broken down.", answer: "He told me that the truck had broken down.", alternatives: ["He told me the truck had broken down.", "He said that the truck had broken down.", "He said the truck had broken down."], explain_pt: "'Say' não aceita objeto pessoal direto; use 'tell me' ou só 'said'." },
    { type: "fix", prompt: "She asked me what time did the inspection start.", answer: "She asked me what time the inspection started.", alternatives: ["She asked me what time the inspection would start.", "She asked me what time the inspection was starting."], explain_pt: "Pergunta indireta não usa did; ordem sujeito + verbo." },
    { type: "fix", prompt: "The engineer told the workers that they wear gloves.", answer: "The engineer told the workers to wear gloves.", alternatives: ["The engineer told the workers that they had to wear gloves.", "The engineer told the workers that they should wear gloves.", "The engineer told the workers they had to wear gloves.", "The engineer told the workers they should wear gloves."], explain_pt: "Ordens: tell + pessoa + to + verbo." },
    { type: "transform", prompt: "Passe para o discurso indireto começando com 'He said': 'I am working on the budget now.'", answer: "He said he was working on the budget then.", alternatives: ["He said that he was working on the budget then.", "He said he was working on the budget at that moment.", "He said he was working on the budget at the time.", "He said that he was working on the budget at the time.", "He said that he was working on the budget at that moment.", "He said he was working on the budget.", "He said that he was working on the budget."], explain_pt: "Am working vira was working; now vira then (ou pode ser omitido)." },
    { type: "transform", prompt: "Passe para o discurso indireto começando com 'She asked me': 'Have you finished the report?'", answer: "She asked me if I had finished the report.", alternatives: ["She asked me whether I had finished the report.", "She asked me if I'd finished the report.", "She asked me whether I'd finished the report."], explain_pt: "Pergunta sim/não: if/whether + ordem afirmativa; have finished vira had finished." }
  ]
});

CONTENT.grammar.push({
  id: "gr-wish-if-only-rather",
  order: 11,
  title: "Wish, If only e I'd rather",
  level: "C1",
  summary_pt: "Wish e If only expressam desejos sobre situações irreais e funcionam como as condicionais: para o presente use o passado (I wish I had more time), para o passado use o past perfect (I wish I had studied), e para reclamar de comportamento alheio use would (I wish you would stop). I'd rather + verbo sem 'to' fala da sua preferência; I'd rather + outra pessoa + passado expressa o que você prefere que o outro faça. Em português usamos 'quem dera' e 'prefiro que', o que leva a erros como 'I wish I have' e 'I'd rather you don't'.",
  rules: [
    { rule_pt: "Desejo sobre o presente: wish/if only + passado simples (were para todas as pessoas no estilo cuidadoso).", examples: ["I wish I spoke French.", "If only we were closer to the city."] },
    { rule_pt: "Arrependimento sobre o passado: wish/if only + past perfect.", examples: ["I wish I had taken that job.", "If only we hadn't signed that contract."] },
    { rule_pt: "Irritação ou desejo de mudança no comportamento de outros: wish + pessoa + would.", examples: ["I wish the neighbours would turn the music down.", "I wish you would stop interrupting me."] },
    { rule_pt: "I'd rather + verbo sem 'to' (eu prefiro); I'd rather + pessoa + passado (prefiro que você...).", examples: ["I'd rather work from home today.", "I'd rather you didn't tell the client yet."] },
    { rule_pt: "It's (high) time + sujeito + passado: já passou da hora de algo acontecer.", examples: ["It's time we updated our software.", "It's high time the city fixed this road."] }
  ],
  pitfalls_pt: [
    "'I wish I have more time' está errado: diga 'I wish I had more time'.",
    "'I wish I would be taller' está errado (não use would para você mesmo); diga 'I wish I were taller'.",
    "'I'd rather you don't come' está errado: diga 'I'd rather you didn't come'.",
    "'I'd rather to stay' está errado: diga 'I'd rather stay'."
  ],
  exercises: [
    { type: "mc", prompt: "I wish I ___ more free time to study.", options: ["have", "had", "would have", "will have"], answer: 1, explain_pt: "Desejo irreal no presente: wish + passado." },
    { type: "mc", prompt: "If only I ___ the fine print before signing!", options: ["read", "would read", "have read", "had read"], answer: 3, explain_pt: "Arrependimento sobre o passado: if only + past perfect." },
    { type: "mc", prompt: "I'd rather you ___ smoke on the construction site.", options: ["didn't", "don't", "won't", "not"], answer: 0, explain_pt: "I'd rather + outra pessoa + passado." },
    { type: "mc", prompt: "I wish the supplier ___ answer my emails. It's so frustrating.", options: ["will", "had", "would", "does"], answer: 2, explain_pt: "Irritação com o comportamento de outra pessoa: wish + would." },
    { type: "mc", prompt: "It's high time we ___ a decision.", options: ["make", "made", "will make", "have made"], answer: 1, explain_pt: "It's high time + sujeito + passado." },
    { type: "fix", prompt: "I wish I have a bigger office.", answer: "I wish I had a bigger office.", alternatives: [], explain_pt: "Wish sobre o presente pede o passado: had." },
    { type: "fix", prompt: "I'd rather to take the train than drive.", answer: "I'd rather take the train than drive.", alternatives: ["I would rather take the train than drive."], explain_pt: "I'd rather + verbo sem 'to'." },
    { type: "fix", prompt: "She wishes she didn't quit her job last year.", answer: "She wishes she hadn't quit her job last year.", alternatives: ["She wishes she had not quit her job last year."], explain_pt: "Arrependimento sobre o passado (last year): past perfect." },
    { type: "transform", prompt: "Reescreva com 'I wish': I regret not learning English when I was younger.", answer: "I wish I had learned English when I was younger.", alternatives: ["I wish I had learnt English when I was younger.", "I wish I'd learned English when I was younger.", "I wish I'd learnt English when I was younger."], explain_pt: "Arrependimento sobre o passado: wish + past perfect." },
    { type: "transform", prompt: "Reescreva com 'I'd rather you': Please don't call me during the meeting.", answer: "I'd rather you didn't call me during the meeting.", alternatives: ["I would rather you didn't call me during the meeting.", "I'd rather you did not call me during the meeting.", "I would rather you did not call me during the meeting."], explain_pt: "I'd rather + pessoa + passado (didn't call)." }
  ]
});

CONTENT.grammar.push({
  id: "gr-inversion-emphasis",
  order: 12,
  title: "Inversão e estruturas enfáticas",
  level: "C1",
  summary_pt: "No inglês formal ou enfático, expressões negativas ou restritivas no início da frase (Never, Rarely, Not only, No sooner, Hardly, Under no circumstances, Only when) provocam inversão: auxiliar + sujeito, como numa pergunta. Também existem as cleft sentences (It was... that...; What I need is...) e o 'do' enfático (I do agree), que destacam uma parte da frase. Essas estruturas são típicas de C1 em apresentações, relatórios e textos argumentativos.",
  rules: [
    { rule_pt: "Advérbio negativo/restritivo no início + auxiliar + sujeito + verbo.", examples: ["Never have I seen such poor workmanship.", "Rarely do we get a client so well organised."] },
    { rule_pt: "Not only... but also; No sooner... than; Hardly/Scarcely... when (geralmente com past perfect).", examples: ["Not only did they finish early, but they also cut costs.", "No sooner had we started than it began to rain.", "Hardly had I arrived when the alarm went off."] },
    { rule_pt: "Only when/after/if... e Under no circumstances: a inversão ocorre na oração principal.", examples: ["Only when the test results arrive will we pour the slab.", "Under no circumstances should visitors enter without a helmet."] },
    { rule_pt: "Condicionais com inversão (formal): Had I known = If I had known; Should you need = If you need; Were it not for = If it weren't for.", examples: ["Had we known about the delay, we would have warned the client.", "Should you have any questions, please contact me."] },
    { rule_pt: "Cleft sentences e 'do' enfático para destacar informação.", examples: ["What we need is a clear schedule.", "It was the drainage that caused the problem.", "I do understand your concern."] }
  ],
  pitfalls_pt: [
    "Esquecer o auxiliar: 'Never I have seen' ou 'Never I saw' está errado; diga 'Never have I seen'.",
    "Inverter na oração errada com 'Only when': 'Only when did he arrive we started' está errado; diga 'Only when he arrived did we start'.",
    "Usar 'than' com 'hardly' ou 'when' com 'no sooner': o par é 'No sooner... than' e 'Hardly... when'.",
    "Usar inversão em conversa informal: soa exagerado; guarde para textos formais e ênfase."
  ],
  exercises: [
    { type: "mc", prompt: "Never ___ such a well-organized construction site.", options: ["I have seen", "have I seen", "I saw", "did I saw"], answer: 1, explain_pt: "Negativo no início: auxiliar + sujeito + particípio." },
    { type: "mc", prompt: "No sooner had we signed the contract ___ the prices went up.", options: ["when", "that", "than", "then"], answer: 2, explain_pt: "O par correto é 'No sooner... than'." },
    { type: "mc", prompt: "___ you need any further information, please do not hesitate to contact us.", options: ["Should", "Would", "Unless", "Had"], answer: 0, explain_pt: "Should you need = If you need (formal)." },
    { type: "mc", prompt: "Only after the inspection ___ allowed to occupy the building.", options: ["we were", "were we", "we are", "did we"], answer: 1, explain_pt: "Only after... : inversão na oração principal (were we)." },
    { type: "mc", prompt: "___ is a reliable supplier, not a cheaper one.", options: ["That we need", "It we need", "Which we need", "What we need"], answer: 3, explain_pt: "Cleft sentence: What we need is..." },
    { type: "fix", prompt: "Not only they delivered late, but they also sent the wrong steel.", answer: "Not only did they deliver late, but they also sent the wrong steel.", alternatives: ["Not only did they deliver late but they also sent the wrong steel.", "Not only did they deliver late, they also sent the wrong steel."], explain_pt: "Not only no início pede inversão com auxiliar: did they deliver." },
    { type: "fix", prompt: "Under no circumstances workers should remove the guardrails.", answer: "Under no circumstances should workers remove the guardrails.", alternatives: [], explain_pt: "Under no circumstances + auxiliar + sujeito." },
    { type: "fix", prompt: "Had I know about the problem, I would have fixed it.", answer: "Had I known about the problem, I would have fixed it.", alternatives: ["Had I known about the problem, I'd have fixed it.", "Had I known about the problem, I would've fixed it.", "Had I known about the problem I would have fixed it."], explain_pt: "Had + sujeito + particípio: known." },
    { type: "transform", prompt: "Reescreva começando com 'Rarely': We rarely receive such detailed drawings.", answer: "Rarely do we receive such detailed drawings.", alternatives: [], explain_pt: "Rarely no início: do + sujeito + verbo." },
    { type: "transform", prompt: "Reescreva com inversão, sem 'if': If I had known the soil was so weak, I would have chosen deep foundations.", answer: "Had I known the soil was so weak, I would have chosen deep foundations.", alternatives: ["Had I known the soil was so weak I would have chosen deep foundations.", "Had I known the soil was so weak, I'd have chosen deep foundations.", "Had I known the soil was so weak, I would've chosen deep foundations.", "Had I known that the soil was so weak, I would have chosen deep foundations.", "Had I known that the soil was so weak, I'd have chosen deep foundations."], explain_pt: "Inversão na terceira condicional: Had + sujeito + particípio." }
  ]
});
