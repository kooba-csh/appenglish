window.CONTENT = window.CONTENT || { decks: [] };
CONTENT.grammar = CONTENT.grammar || [];

CONTENT.grammar.push({
  id: "gr-a1-to-be",
  order: 1,
  title: "Verbo to be (am, is, are)",
  level: "A1",
  summary_pt: "O verbo to be significa ser e estar ao mesmo tempo. No presente ele tem três formas: am (só com I), is (he, she, it e nomes no singular) e are (you, we, they e plurais). Na negativa basta colocar not depois do verbo (I am not, she is not). Na pergunta o verbo vem antes do sujeito (Are you tired?). Na fala usamos quase sempre as contrações: I'm, you're, he's, isn't, aren't.",
  rules: [
    { rule_pt: "Use am com I, is com he/she/it (ou um nome no singular) e are com you/we/they (ou plurais).", examples: ["I am an engineer.", "My brother is at work.", "They are from Brazil."] },
    { rule_pt: "Na negativa coloque not depois do verbo. Contrações comuns: isn't, aren't (com I use I'm not).", examples: ["I'm not hungry.", "The office isn't open on Sundays."] },
    { rule_pt: "Na pergunta inverta: verbo to be antes do sujeito. Respostas curtas usam só o verbo: Yes, I am. / No, it isn't.", examples: ["Are you ready?", "Is this your car?"] },
    { rule_pt: "Use to be para idade, profissão, origem, lugar, estado e clima. Idade usa to be, não have.", examples: ["She is thirty years old.", "It's cold today."] }
  ],
  pitfalls_pt: [
    "Dizer a idade com have: 'I have 30 years' está errado; diga 'I am 30 years old' ou 'I'm 30'.",
    "Esquecer o verbo: 'He very tired' está errado; diga 'He is very tired'. Em inglês a frase sempre precisa de verbo.",
    "Esquecer o sujeito it: 'Is raining' ou 'Is late' estão errados; diga 'It's raining' e 'It's late'."
  ],
  exercises: [
    { type: "mc", prompt: "My parents ___ at home now.", options: ["is", "am", "are", "be"], answer: 2, explain_pt: "My parents é plural (they): are." },
    { type: "mc", prompt: "I ___ a student.", options: ["am", "is", "are", "be"], answer: 0, explain_pt: "Com I o verbo to be é sempre am." },
    { type: "mc", prompt: "___ your sister a doctor?", options: ["Are", "Am", "Do", "Is"], answer: 3, explain_pt: "Your sister = she: na pergunta, Is vem antes do sujeito." },
    { type: "mc", prompt: "We ___ late. The meeting starts at nine.", options: ["isn't", "aren't", "am not", "not"], answer: 1, explain_pt: "We pede are; na negativa, aren't." },
    { type: "mc", prompt: "How old ___ you?", options: ["have", "do", "is", "are"], answer: 3, explain_pt: "Idade usa to be: How old are you?" },
    { type: "fix", prompt: "I have 25 years old.", answer: "I am 25 years old.", alternatives: ["I'm 25 years old.", "I am 25.", "I'm 25."], explain_pt: "Idade em inglês usa to be, não have." },
    { type: "fix", prompt: "She are my friend.", answer: "She is my friend.", alternatives: ["She's my friend."], explain_pt: "Com she use is." },
    { type: "fix", prompt: "Is very hot today.", answer: "It is very hot today.", alternatives: ["It's very hot today."], explain_pt: "Para clima o inglês precisa do sujeito it." },
    { type: "transform", prompt: "Passe para a negativa: He is at the office.", answer: "He is not at the office.", alternatives: ["He isn't at the office.", "He's not at the office."], explain_pt: "Negativa: not depois de is (isn't ou he's not)." },
    { type: "transform", prompt: "Transforme em pergunta: They are engineers.", answer: "Are they engineers?", alternatives: [], explain_pt: "Pergunta: are antes do sujeito." }
  ]
});

CONTENT.grammar.push({
  id: "gr-a1-present-simple",
  order: 2,
  title: "Present Simple (rotina, do/does)",
  level: "A1",
  summary_pt: "O Present Simple fala de rotina, hábitos e fatos que são sempre verdade. Com I, you, we e they o verbo fica na forma básica (I work). Com he, she e it acrescentamos -s ou -es (she works, he watches). Na negativa e na pergunta usamos o auxiliar do (ou does com he/she/it), e o verbo principal volta à forma básica. Palavras como always, usually, often, sometimes e never costumam aparecer antes do verbo.",
  rules: [
    { rule_pt: "Use para rotina, hábitos e fatos permanentes. Com I/you/we/they o verbo fica na forma básica.", examples: ["I wake up at six every day.", "We live in a small town."] },
    { rule_pt: "Com he/she/it acrescente -s (works), -es depois de -ch, -sh, -s, -x, -o (watches, goes) e troque -y por -ies depois de consoante (studies). Have vira has.", examples: ["She works in a bank.", "My father watches the news every night."] },
    { rule_pt: "Negativa: don't/doesn't + verbo na forma básica (sem -s).", examples: ["I don't drink coffee.", "He doesn't like football."] },
    { rule_pt: "Pergunta: Do/Does + sujeito + verbo na forma básica. Advérbios de frequência vêm antes do verbo principal.", examples: ["Do you speak English?", "Does she usually walk to work?"] }
  ],
  pitfalls_pt: [
    "Esquecer o -s com he/she/it: 'She work here' está errado; diga 'She works here'.",
    "Manter o -s depois de does/doesn't: 'Does he works?' e 'He doesn't works' estão errados; o -s fica só no auxiliar.",
    "Fazer pergunta sem auxiliar, como em português: 'You like pizza?' é informal demais; o padrão é 'Do you like pizza?'."
  ],
  exercises: [
    { type: "mc", prompt: "My sister ___ in a hospital.", options: ["work", "works", "working", "is work"], answer: 1, explain_pt: "Sister = she: verbo com -s." },
    { type: "mc", prompt: "___ you go to the gym on Mondays?", options: ["Does", "Are", "Do", "Is"], answer: 2, explain_pt: "Pergunta com you no Present Simple: Do." },
    { type: "mc", prompt: "He ___ meat. He's a vegetarian.", options: ["doesn't eat", "don't eat", "doesn't eats", "not eat"], answer: 0, explain_pt: "He pede doesn't + verbo na forma básica." },
    { type: "mc", prompt: "Tom ___ English at night.", options: ["studys", "study", "studyes", "studies"], answer: 3, explain_pt: "Consoante + y vira -ies: studies." },
    { type: "mc", prompt: "We ___ dinner at eight o'clock.", options: ["has", "have", "haves", "having"], answer: 1, explain_pt: "Com we o verbo fica na forma básica: have (has é só para he/she/it)." },
    { type: "fix", prompt: "She live near the school.", answer: "She lives near the school.", alternatives: [], explain_pt: "Com she o verbo leva -s: lives." },
    { type: "fix", prompt: "Does he works on Saturdays?", answer: "Does he work on Saturdays?", alternatives: [], explain_pt: "Depois de does o verbo volta à forma básica." },
    { type: "fix", prompt: "I no like cold weather.", answer: "I don't like cold weather.", alternatives: ["I do not like cold weather."], explain_pt: "A negativa usa don't, não no." },
    { type: "transform", prompt: "Reescreva com 'My brother' no lugar de 'I': I play the guitar every weekend.", answer: "My brother plays the guitar every weekend.", alternatives: [], explain_pt: "My brother = he: play vira plays." },
    { type: "transform", prompt: "Transforme em pergunta: She speaks Spanish.", answer: "Does she speak Spanish?", alternatives: [], explain_pt: "Does + sujeito + verbo sem -s." }
  ]
});

CONTENT.grammar.push({
  id: "gr-a1-there-is-are",
  order: 3,
  title: "There is / There are",
  level: "A1",
  summary_pt: "There is e there are equivalem ao nosso 'tem' ou 'há' quando falamos que algo existe num lugar. Use there is com uma coisa no singular ou incontável e there are com plurais. Na negativa: there isn't / there aren't, geralmente com any. Na pergunta: Is there...? / Are there...? Nunca use have para isso: 'tem um banco aqui perto' é 'there is a bank near here'.",
  rules: [
    { rule_pt: "There is (there's) + singular ou incontável; there are + plural.", examples: ["There is a bank near my house.", "There are two bedrooms in the apartment."] },
    { rule_pt: "Negativa: there isn't / there aren't; com plurais e incontáveis é comum usar any.", examples: ["There isn't any milk in the fridge.", "There aren't any chairs in the room."] },
    { rule_pt: "Pergunta: Is there...? / Are there...? Resposta curta: Yes, there is. / No, there aren't.", examples: ["Is there a pharmacy around here?", "Are there any good restaurants on this street?"] },
    { rule_pt: "Para perguntar quantidade use How many + plural + are there?", examples: ["How many people are there in your family?"] }
  ],
  pitfalls_pt: [
    "Traduzir 'tem' com have: 'Have a supermarket here' está errado; diga 'There is a supermarket here'.",
    "Usar there is com plural: 'There is three windows' está errado; diga 'There are three windows'.",
    "Confundir there (existe) com their (deles) e they're (eles são/estão): a pronúncia é parecida, a escrita não."
  ],
  exercises: [
    { type: "mc", prompt: "___ a big park in my city.", options: ["There are", "It has", "There is", "Have"], answer: 2, explain_pt: "Um parque (singular): There is." },
    { type: "mc", prompt: "There ___ five people in the meeting room.", options: ["are", "is", "be", "has"], answer: 0, explain_pt: "Five people é plural: there are." },
    { type: "mc", prompt: "___ any eggs in the kitchen?", options: ["Is there", "Has there", "There are", "Are there"], answer: 3, explain_pt: "Pergunta com plural: Are there...?" },
    { type: "mc", prompt: "There ___ any water in the bottle.", options: ["aren't", "isn't", "not", "don't"], answer: 1, explain_pt: "Water é incontável: there isn't." },
    { type: "mc", prompt: "How many rooms ___ in your house?", options: ["is there", "there are", "are there", "have there"], answer: 2, explain_pt: "How many + plural + are there?" },
    { type: "fix", prompt: "Have a bus stop near the hotel.", answer: "There is a bus stop near the hotel.", alternatives: ["There's a bus stop near the hotel."], explain_pt: "Para dizer que algo existe num lugar use there is, não have." },
    { type: "fix", prompt: "There is two cars in the garage.", answer: "There are two cars in the garage.", alternatives: [], explain_pt: "Two cars é plural: there are." },
    { type: "fix", prompt: "Are there a hospital in this town?", answer: "Is there a hospital in this town?", alternatives: [], explain_pt: "A hospital é singular: Is there...?" },
    { type: "transform", prompt: "Passe para a negativa: There are some books on the table.", answer: "There aren't any books on the table.", alternatives: ["There are not any books on the table.", "There are no books on the table."], explain_pt: "Na negativa some vira any: there aren't any." },
    { type: "transform", prompt: "Transforme em pergunta: There is a supermarket near here.", answer: "Is there a supermarket near here?", alternatives: [], explain_pt: "Inverta: Is there...?" }
  ]
});

CONTENT.grammar.push({
  id: "gr-a1-can",
  order: 4,
  title: "Can / Can't (habilidade, pedido, permissão)",
  level: "A1",
  summary_pt: "Can expressa habilidade (saber, conseguir), possibilidade, pedido e permissão (poder). A forma é a mesma para todas as pessoas: I can, she can, they can, sem -s. Depois de can o verbo vem na forma básica, sem to. Na negativa use can't (cannot). Na pergunta, can vem antes do sujeito: Can you help me?",
  rules: [
    { rule_pt: "Can + verbo na forma básica para habilidade. A forma não muda com he/she/it.", examples: ["I can swim.", "She can speak three languages."] },
    { rule_pt: "Negativa: can't ou cannot (uma palavra só).", examples: ["He can't drive.", "I cannot find my keys."] },
    { rule_pt: "Pergunta: Can + sujeito + verbo. Resposta curta: Yes, I can. / No, I can't.", examples: ["Can you cook?", "Can I sit here?"] },
    { rule_pt: "Use Can you...? para pedidos e Can I...? para pedir permissão. Could é uma versão mais educada.", examples: ["Can you open the window, please?", "Could I use your phone?"] }
  ],
  pitfalls_pt: [
    "Colocar to depois de can: 'I can to help you' está errado; diga 'I can help you'.",
    "Acrescentar -s: 'She cans' ou 'He can drives' estão errados; diga 'She can drive'.",
    "Usar do na pergunta: 'Do you can come?' está errado; diga 'Can you come?'."
  ],
  exercises: [
    { type: "mc", prompt: "My son is two, but he ___ read yet.", options: ["can't", "doesn't can", "not can", "isn't can"], answer: 0, explain_pt: "Negativa de can: can't." },
    { type: "mc", prompt: "She can ___ the piano very well.", options: ["plays", "to play", "playing", "play"], answer: 3, explain_pt: "Depois de can, verbo na forma básica sem to." },
    { type: "mc", prompt: "___ I pay by card?", options: ["Do", "Can", "Am", "Does"], answer: 1, explain_pt: "Pedido de permissão: Can I...?" },
    { type: "mc", prompt: "A: Can you ride a bike? B: Yes, I ___.", options: ["do", "am", "can", "ride"], answer: 2, explain_pt: "Resposta curta repete o auxiliar: Yes, I can." },
    { type: "mc", prompt: "Which sentence is correct?", options: ["He cans swim.", "He can swims.", "He can to swim.", "He can swim."], answer: 3, explain_pt: "Can não muda e o verbo fica na forma básica." },
    { type: "fix", prompt: "I can to speak a little English.", answer: "I can speak a little English.", alternatives: [], explain_pt: "Não use to depois de can." },
    { type: "fix", prompt: "Do you can help me?", answer: "Can you help me?", alternatives: [], explain_pt: "Can já é auxiliar: não precisa de do." },
    { type: "fix", prompt: "My father can drives a truck.", answer: "My father can drive a truck.", alternatives: [], explain_pt: "Depois de can o verbo não leva -s." },
    { type: "transform", prompt: "Passe para a negativa: We can come to the party.", answer: "We can't come to the party.", alternatives: ["We cannot come to the party.", "We can not come to the party."], explain_pt: "Negativa: can't ou cannot." },
    { type: "transform", prompt: "Transforme em pergunta: She can use the computer.", answer: "Can she use the computer?", alternatives: [], explain_pt: "Pergunta: Can antes do sujeito." }
  ]
});

CONTENT.grammar.push({
  id: "gr-a2-past-simple",
  order: 1,
  title: "Past Simple (regulares, irregulares e did)",
  level: "A2",
  summary_pt: "O Past Simple fala de ações terminadas num momento do passado (yesterday, last week, in 2020, two days ago). Verbos regulares ganham -ed (worked, played, studied). Os irregulares têm forma própria que precisa ser decorada (go/went, have/had, see/saw, buy/bought). A forma é a mesma para todas as pessoas. Na negativa e na pergunta usamos did/didn't e o verbo volta à forma básica.",
  rules: [
    { rule_pt: "Verbos regulares: + -ed (work/worked); terminados em -e só + -d (live/lived); consoante + y vira -ied (study/studied).", examples: ["I worked until seven yesterday.", "We studied English last night."] },
    { rule_pt: "Verbos irregulares têm forma própria no passado: go/went, have/had, see/saw, buy/bought, eat/ate, make/made.", examples: ["She went to the beach last weekend.", "I bought a new phone two days ago."] },
    { rule_pt: "Negativa: didn't + verbo na forma básica (para todas as pessoas).", examples: ["He didn't call me.", "We didn't see the game."] },
    { rule_pt: "Pergunta: Did + sujeito + verbo na forma básica. O verbo to be é exceção: was/were, sem did.", examples: ["Did you sleep well?", "Where were you last night?"] }
  ],
  pitfalls_pt: [
    "Usar o passado depois de did: 'Did you went?' e 'I didn't saw' estão errados; diga 'Did you go?' e 'I didn't see'.",
    "Colocar -ed em verbo irregular: 'goed', 'buyed', 'eated' não existem; o certo é went, bought, ate.",
    "Usar did com o verbo to be: 'Did you were tired?' está errado; diga 'Were you tired?'."
  ],
  exercises: [
    { type: "mc", prompt: "Last Sunday we ___ to my grandmother's house.", options: ["go", "goes", "went", "goed"], answer: 2, explain_pt: "Go é irregular: went." },
    { type: "mc", prompt: "I ___ TV last night. I was too tired.", options: ["didn't watch", "didn't watched", "don't watched", "not watched"], answer: 0, explain_pt: "Didn't + verbo na forma básica." },
    { type: "mc", prompt: "___ you see the email from the boss?", options: ["Do", "Were", "Was", "Did"], answer: 3, explain_pt: "Pergunta no passado com verbo comum: Did." },
    { type: "mc", prompt: "She ___ a delicious cake for my birthday.", options: ["maked", "made", "make", "did make"], answer: 1, explain_pt: "Make é irregular: made." },
    { type: "mc", prompt: "The children ___ very happy at the party.", options: ["was", "did", "were", "are been"], answer: 2, explain_pt: "To be no passado, plural: were." },
    { type: "fix", prompt: "I buyed a new jacket yesterday.", answer: "I bought a new jacket yesterday.", alternatives: [], explain_pt: "Buy é irregular: bought." },
    { type: "fix", prompt: "Did you went to the doctor?", answer: "Did you go to the doctor?", alternatives: [], explain_pt: "Depois de did o verbo fica na forma básica." },
    { type: "fix", prompt: "We don't see him last week.", answer: "We didn't see him last week.", alternatives: ["We did not see him last week."], explain_pt: "Last week pede passado: didn't." },
    { type: "transform", prompt: "Passe para o passado com 'yesterday': I play football with my friends.", answer: "I played football with my friends yesterday.", alternatives: ["Yesterday I played football with my friends.", "Yesterday, I played football with my friends."], explain_pt: "Play é regular: played." },
    { type: "transform", prompt: "Transforme em pergunta: She arrived on time.", answer: "Did she arrive on time?", alternatives: [], explain_pt: "Did + sujeito + verbo na forma básica (arrive)." }
  ]
});

CONTENT.grammar.push({
  id: "gr-a2-present-continuous",
  order: 2,
  title: "Present Continuous vs Present Simple",
  level: "A2",
  summary_pt: "O Present Continuous (am/is/are + verbo-ing) fala do que está acontecendo agora ou nestes dias, e de planos já combinados. O Present Simple fala de rotina, hábitos e fatos. Compare: 'I work in an office' (sempre) e 'I'm working from home this week' (temporário). Alguns verbos de estado (like, want, know, need, understand) quase nunca vão para o -ing.",
  rules: [
    { rule_pt: "Present Continuous = am/is/are + verbo-ing, para ações acontecendo agora (now, right now, at the moment).", examples: ["I'm cooking dinner right now.", "Look! It's raining."] },
    { rule_pt: "Use também para situações temporárias (this week, these days) e planos já combinados para o futuro próximo.", examples: ["She's staying with her parents this month.", "We're meeting the client tomorrow."] },
    { rule_pt: "Present Simple para rotina, hábitos e fatos (every day, usually, always, never).", examples: ["He usually takes the bus to work.", "Water boils at 100 degrees."] },
    { rule_pt: "Verbos de estado (like, love, want, need, know, understand, believe) ficam no Present Simple mesmo agora.", examples: ["I need a coffee now.", "Do you understand the question?"] }
  ],
  pitfalls_pt: [
    "Usar o Present Simple para algo acontecendo agora: 'Where do you go now?' está errado; diga 'Where are you going now?'.",
    "Esquecer o verbo to be: 'I working now' está errado; diga 'I'm working now'.",
    "Colocar verbo de estado no -ing: 'I'm knowing him' e 'I'm wanting a pizza' estão errados; diga 'I know him' e 'I want a pizza'."
  ],
  exercises: [
    { type: "mc", prompt: "Be quiet, please. The baby ___.", options: ["sleeps", "is sleeping", "sleep", "are sleeping"], answer: 1, explain_pt: "Acontecendo agora: is sleeping." },
    { type: "mc", prompt: "My father ___ to work every day.", options: ["drives", "is driving", "drive", "driving"], answer: 0, explain_pt: "Rotina (every day): Present Simple." },
    { type: "mc", prompt: "I ___ what you mean.", options: ["am understanding", "understanding", "understands", "understand"], answer: 3, explain_pt: "Understand é verbo de estado: Present Simple." },
    { type: "mc", prompt: "What ___ you doing at the moment?", options: ["do", "does", "are", "is"], answer: 2, explain_pt: "At the moment pede Present Continuous: are you doing." },
    { type: "mc", prompt: "This week I ___ from home because my car is broken.", options: ["am working", "work", "works", "worked"], answer: 0, explain_pt: "Situação temporária (this week): Present Continuous." },
    { type: "fix", prompt: "Listen! Someone knock on the door.", answer: "Listen! Someone is knocking on the door.", alternatives: ["Listen! Someone's knocking on the door.", "Listen! Somebody is knocking on the door.", "Listen! Somebody's knocking on the door."], explain_pt: "Listen! indica agora: is knocking." },
    { type: "fix", prompt: "I'm wanting a glass of water.", answer: "I want a glass of water.", alternatives: [], explain_pt: "Want é verbo de estado: não use -ing." },
    { type: "fix", prompt: "She is go to the gym three times a week.", answer: "She goes to the gym three times a week.", alternatives: [], explain_pt: "Hábito (three times a week): Present Simple." },
    { type: "transform", prompt: "Reescreva com 'right now': I read a book.", answer: "I am reading a book right now.", alternatives: ["I'm reading a book right now.", "Right now I am reading a book.", "Right now I'm reading a book.", "Right now, I'm reading a book.", "Right now, I am reading a book."], explain_pt: "Right now pede am + verbo-ing." },
    { type: "transform", prompt: "Transforme em pergunta: They are watching a movie.", answer: "Are they watching a movie?", alternatives: [], explain_pt: "Pergunta: Are antes do sujeito." }
  ]
});

CONTENT.grammar.push({
  id: "gr-a2-future",
  order: 3,
  title: "Futuro: going to e will",
  level: "A2",
  summary_pt: "Going to (am/is/are going to + verbo) é usado para planos e intenções já decididos antes de falar, e para previsões com evidência (dá para ver que vai acontecer). Will + verbo é usado para decisões tomadas na hora, promessas, ofertas e previsões de opinião (I think...). Na fala, will vira 'll (I'll, you'll) e a negativa é won't.",
  rules: [
    { rule_pt: "Going to para planos e intenções já decididos.", examples: ["I'm going to visit my parents next weekend.", "We're going to buy a new car this year."] },
    { rule_pt: "Going to para previsões com evidência no presente.", examples: ["Look at those clouds. It's going to rain."] },
    { rule_pt: "Will para decisões na hora, ofertas e promessas.", examples: ["The phone is ringing. I'll answer it.", "I'll help you with your bags.", "I promise I won't be late."] },
    { rule_pt: "Will para previsões e opiniões sobre o futuro, muitas vezes com I think, probably, maybe.", examples: ["I think it will be a great year.", "She'll probably get the job."] }
  ],
  pitfalls_pt: [
    "Colocar to depois de will: 'I will to call you' está errado; diga 'I will call you' ou 'I'll call you'.",
    "Esquecer o to be antes de going to: 'I going to travel' está errado; diga 'I'm going to travel'.",
    "Usar o presente para oferecer ajuda: 'I help you!' soa estranho; diga 'I'll help you!'."
  ],
  exercises: [
    { type: "mc", prompt: "A: I'm thirsty. B: Wait, I ___ get you some water.", options: ["am going to", "'ll", "going to", "will to"], answer: 1, explain_pt: "Oferta decidida na hora: will ('ll)." },
    { type: "mc", prompt: "We've already booked the hotel. We ___ stay in Rio for a week.", options: ["will to", "are going", "are going to", "go to"], answer: 2, explain_pt: "Plano já decidido: are going to." },
    { type: "mc", prompt: "Watch out! You ___ fall!", options: ["are going to", "will to", "going to", "are fall"], answer: 0, explain_pt: "Previsão com evidência (dá para ver): going to." },
    { type: "mc", prompt: "Don't worry. I ___ tell anyone your secret.", options: ["am not", "willn't", "don't going to", "won't"], answer: 3, explain_pt: "Promessa negativa: won't." },
    { type: "mc", prompt: "I think Brazil ___ win the next World Cup.", options: ["is win", "will", "will to", "wins to"], answer: 1, explain_pt: "Opinião sobre o futuro com I think: will." },
    { type: "fix", prompt: "I will to call you tomorrow.", answer: "I will call you tomorrow.", alternatives: ["I'll call you tomorrow."], explain_pt: "Depois de will não use to." },
    { type: "fix", prompt: "She going to study medicine.", answer: "She is going to study medicine.", alternatives: ["She's going to study medicine."], explain_pt: "Going to precisa do verbo to be: is going to." },
    { type: "fix", prompt: "Are you going to traveling in July?", answer: "Are you going to travel in July?", alternatives: [], explain_pt: "Depois de going to o verbo fica na forma básica." },
    { type: "transform", prompt: "Passe para a negativa: They are going to sell the house.", answer: "They are not going to sell the house.", alternatives: ["They aren't going to sell the house.", "They're not going to sell the house."], explain_pt: "Negativa: not depois do verbo to be." },
    { type: "transform", prompt: "Reescreva com will (forma contraída): I promise to send you the photos.", answer: "I'll send you the photos.", alternatives: ["I promise I'll send you the photos.", "I promise I will send you the photos.", "I will send you the photos."], explain_pt: "Promessa: will ('ll) + verbo." }
  ]
});

CONTENT.grammar.push({
  id: "gr-a2-comparatives",
  order: 4,
  title: "Comparativos e superlativos",
  level: "A2",
  summary_pt: "Para comparar duas coisas usamos o comparativo + than: adjetivos curtos ganham -er (cheaper than) e adjetivos longos usam more (more expensive than). Para dizer que algo é o mais de um grupo usamos the + superlativo: -est nos curtos (the cheapest) e the most nos longos (the most expensive). Há irregulares importantes: good/better/the best, bad/worse/the worst, far/farther/the farthest.",
  rules: [
    { rule_pt: "Adjetivos de uma sílaba: + -er / the + -est. Vogal + consoante final dobra (big/bigger); -y vira -ier/-iest (easy/easier).", examples: ["My car is older than yours.", "This is the biggest room in the house.", "English is easier than Chinese."] },
    { rule_pt: "Adjetivos de duas ou mais sílabas (sem -y): more ... than / the most ...", examples: ["This hotel is more comfortable than the other one.", "It's the most beautiful city in Brazil."] },
    { rule_pt: "Irregulares: good/better/the best; bad/worse/the worst; far/farther/the farthest.", examples: ["Her English is better than mine.", "That was the worst day of my life."] },
    { rule_pt: "Para igualdade use as ... as; na negativa, not as ... as.", examples: ["My brother is as tall as my father.", "The new phone isn't as fast as I expected."] }
  ],
  pitfalls_pt: [
    "Usar more com -er: 'more cheaper' está errado; diga 'cheaper'.",
    "Usar that ou of no lugar de than: 'bigger that' está errado; diga 'bigger than'.",
    "Esquecer o the no superlativo: 'She is best student' está errado; diga 'She is the best student'."
  ],
  exercises: [
    { type: "mc", prompt: "A plane is ___ than a train.", options: ["more fast", "faster", "fastest", "the fastest"], answer: 1, explain_pt: "Fast é curto: faster than." },
    { type: "mc", prompt: "This is ___ restaurant in town.", options: ["the most expensive", "the expensivest", "more expensive", "most expensive than"], answer: 0, explain_pt: "Adjetivo longo no superlativo: the most expensive." },
    { type: "mc", prompt: "My new job is ___ than my old one.", options: ["gooder", "more good", "best", "better"], answer: 3, explain_pt: "Good é irregular: better." },
    { type: "mc", prompt: "Today is ___ day of the year.", options: ["hotter", "the hotest", "the hottest", "the most hot"], answer: 2, explain_pt: "Hot dobra o t: the hottest." },
    { type: "mc", prompt: "My house isn't as big ___ yours.", options: ["as", "than", "that", "like"], answer: 0, explain_pt: "Igualdade: as ... as." },
    { type: "fix", prompt: "São Paulo is more bigger than Rio.", answer: "São Paulo is bigger than Rio.", alternatives: [], explain_pt: "Não use more com adjetivo em -er." },
    { type: "fix", prompt: "This exercise is easier that the last one.", answer: "This exercise is easier than the last one.", alternatives: [], explain_pt: "Comparativo usa than, não that." },
    { type: "fix", prompt: "He is the most tall player on the team.", answer: "He is the tallest player on the team.", alternatives: ["He's the tallest player on the team."], explain_pt: "Tall é curto: the tallest." },
    { type: "transform", prompt: "Reescreva usando 'than': The blue shirt costs 50 dollars. The red shirt costs 30 dollars. (cheap)", answer: "The red shirt is cheaper than the blue shirt.", alternatives: ["The red shirt is cheaper than the blue one.", "The red one is cheaper than the blue one.", "The red one is cheaper than the blue shirt."], explain_pt: "Cheap é curto: cheaper than." },
    { type: "transform", prompt: "Reescreva com 'not as ... as': Paris is bigger than Lyon. (Comece com 'Lyon')", answer: "Lyon is not as big as Paris.", alternatives: ["Lyon isn't as big as Paris.", "Lyon's not as big as Paris."], explain_pt: "Not as + adjetivo na forma normal + as." }
  ]
});

CONTENT.grammar.push({
  id: "gr-b1-past-continuous",
  order: 1,
  title: "Past Continuous vs Past Simple",
  level: "B1",
  summary_pt: "O Past Continuous (was/were + verbo-ing) descreve uma ação que estava em andamento num momento do passado, como um cenário de fundo. O Past Simple descreve ações completas, muitas vezes em sequência, ou a ação curta que interrompe a mais longa. A combinação típica é: 'I was driving (ação longa) when the phone rang (ação curta)'. Com while geralmente vem a ação longa; com when, a curta.",
  rules: [
    { rule_pt: "Past Continuous = was/were + verbo-ing, para uma ação em andamento num momento do passado.", examples: ["At eight o'clock last night I was having dinner.", "They were working all afternoon."] },
    { rule_pt: "Ação longa (Past Continuous) interrompida por ação curta (Past Simple), em geral com when.", examples: ["I was taking a shower when the lights went out.", "When you called, I was driving."] },
    { rule_pt: "Duas ações longas ao mesmo tempo: while + Past Continuous nas duas partes.", examples: ["While I was cooking, my wife was reading."] },
    { rule_pt: "Ações completas em sequência ficam todas no Past Simple. Verbos de estado (know, want, like) ficam no Past Simple.", examples: ["She got up, had a coffee and left for work.", "I didn't know the answer."] }
  ],
  pitfalls_pt: [
    "Usar o Past Simple para o cenário de fundo: 'I walked home when I saw the accident' muda o sentido; para dizer que você estava a caminho, diga 'I was walking home when I saw the accident'.",
    "Colocar a ação curta no -ing: 'When I was arriving, they had dinner' está errado; diga 'When I arrived, they were having dinner'.",
    "Trocar was e were: com I/he/she/it use was; com you/we/they use were."
  ],
  exercises: [
    { type: "mc", prompt: "I ___ TV when the doorbell rang.", options: ["watched", "was watching", "were watching", "am watching"], answer: 1, explain_pt: "Ação longa interrompida: was watching." },
    { type: "mc", prompt: "While we ___ in the park, it started to rain.", options: ["were walking", "walked", "was walking", "are walking"], answer: 0, explain_pt: "While + ação longa: were walking (we)." },
    { type: "mc", prompt: "She ___ her leg while she was skiing.", options: ["was breaking", "breaks", "has broke", "broke"], answer: 3, explain_pt: "Ação curta que acontece durante a longa: Past Simple." },
    { type: "mc", prompt: "What ___ you doing at 10 p.m. yesterday?", options: ["did", "was", "were", "are"], answer: 2, explain_pt: "Ação em andamento num horário passado, com you: were." },
    { type: "mc", prompt: "He opened the door, ___ the lights on and sat down.", options: ["was turning", "turned", "turning", "were turning"], answer: 1, explain_pt: "Sequência de ações completas: Past Simple." },
    { type: "fix", prompt: "When I was arriving at the office, my boss was waiting for me.", answer: "When I arrived at the office, my boss was waiting for me.", alternatives: [], explain_pt: "A chegada é a ação curta: Past Simple (arrived)." },
    { type: "fix", prompt: "They was playing football when the storm began.", answer: "They were playing football when the storm began.", alternatives: [], explain_pt: "Com they use were." },
    { type: "fix", prompt: "I was knowing the answer, but I was nervous.", answer: "I knew the answer, but I was nervous.", alternatives: ["I knew the answer but I was nervous."], explain_pt: "Know é verbo de estado: Past Simple (knew)." },
    { type: "transform", prompt: "Junte as frases usando 'when': I was sleeping. The phone rang.", answer: "I was sleeping when the phone rang.", alternatives: ["When the phone rang, I was sleeping.", "When the phone rang I was sleeping."], explain_pt: "Ação longa no Past Continuous + when + ação curta no Past Simple." },
    { type: "transform", prompt: "Junte as frases usando 'while': My mother was cooking. My father was cleaning the car.", answer: "While my mother was cooking, my father was cleaning the car.", alternatives: ["My father was cleaning the car while my mother was cooking.", "While my mother was cooking my father was cleaning the car.", "My mother was cooking while my father was cleaning the car."], explain_pt: "Duas ações longas simultâneas: while + Past Continuous." }
  ]
});

CONTENT.grammar.push({
  id: "gr-b1-modals-obligation",
  order: 2,
  title: "Obrigação e conselho: must, have to, should",
  level: "B1",
  summary_pt: "Must e have to expressam obrigação. Must costuma mostrar uma obrigação que vem de quem fala (regra pessoal, algo que você acha muito importante) ou aparece em avisos e regras escritas. Have to mostra obrigação externa (lei, chefe, horário) e é o mais comum na fala. Should é conselho ou recomendação (deveria). Atenção às negativas: mustn't = é proibido; don't have to = não é necessário; shouldn't = não é uma boa ideia.",
  rules: [
    { rule_pt: "Must + verbo para obrigação forte, regras escritas ou algo que quem fala considera necessário. Não muda com he/she/it.", examples: ["I must call my mother tonight.", "Passengers must wear a seat belt."] },
    { rule_pt: "Have to / has to + verbo para obrigação externa. No passado use had to (must não tem passado).", examples: ["I have to be at work at seven.", "She has to wear a uniform.", "We had to wait two hours at the airport."] },
    { rule_pt: "Mustn't = proibido. Don't/doesn't have to = não é necessário (você pode, mas não precisa).", examples: ["You mustn't smoke in the hospital.", "You don't have to bring anything. We have everything."] },
    { rule_pt: "Should / shouldn't + verbo para conselhos e opiniões sobre o que é certo.", examples: ["You should see a doctor.", "You shouldn't work so late."] }
  ],
  pitfalls_pt: [
    "Confundir mustn't com don't have to: 'You mustn't come tomorrow' significa que é proibido vir; se não é necessário, diga 'You don't have to come tomorrow'.",
    "Colocar to depois de must ou should: 'You should to rest' está errado; diga 'You should rest'.",
    "Tentar usar must no passado: 'Yesterday I must work' está errado; diga 'Yesterday I had to work'."
  ],
  exercises: [
    { type: "mc", prompt: "You ___ park here. It's a fire station exit.", options: ["don't have to", "mustn't", "shouldn't to", "haven't to"], answer: 1, explain_pt: "É proibido: mustn't." },
    { type: "mc", prompt: "Tomorrow is a holiday, so we ___ go to work.", options: ["don't have to", "mustn't", "must", "should"], answer: 0, explain_pt: "Não é necessário: don't have to." },
    { type: "mc", prompt: "You look tired. You ___ go to bed early tonight.", options: ["has to", "must to", "should", "had to"], answer: 2, explain_pt: "Conselho: should." },
    { type: "mc", prompt: "Last year my brother ___ work on weekends.", options: ["must", "has to", "musted", "had to"], answer: 3, explain_pt: "Obrigação no passado: had to." },
    { type: "mc", prompt: "My wife ___ start work at 6 a.m. every day.", options: ["have to", "has to", "must to", "should to"], answer: 1, explain_pt: "Obrigação externa com she: has to." },
    { type: "fix", prompt: "You should to drink more water.", answer: "You should drink more water.", alternatives: [], explain_pt: "Depois de should não use to." },
    { type: "fix", prompt: "He have to finish the report today.", answer: "He has to finish the report today.", alternatives: [], explain_pt: "Com he: has to." },
    { type: "fix", prompt: "Yesterday I must stay late at the office.", answer: "Yesterday I had to stay late at the office.", alternatives: [], explain_pt: "Must não tem passado: use had to." },
    { type: "transform", prompt: "Reescreva usando 'should': It's a good idea to save some money every month.", answer: "You should save some money every month.", alternatives: ["We should save some money every month.", "I should save some money every month."], explain_pt: "Conselho: should + verbo na forma básica." },
    { type: "transform", prompt: "Reescreva com 'don't have to': It isn't necessary to wear a tie at the party.", answer: "You don't have to wear a tie at the party.", alternatives: ["You do not have to wear a tie at the party.", "We don't have to wear a tie at the party.", "We do not have to wear a tie at the party."], explain_pt: "Não é necessário: don't have to." }
  ]
});

CONTENT.tr = CONTENT.tr || {};
Object.assign(CONTENT.tr, {
  "I am an engineer.": "Eu sou engenheiro.",
  "My brother is at work.": "Meu irmão está no trabalho.",
  "They are from Brazil.": "Eles são do Brasil.",
  "I'm not hungry.": "Não estou com fome.",
  "The office isn't open on Sundays.": "O escritório não abre aos domingos.",
  "Are you ready?": "Você está pronto?",
  "Is this your car?": "Este é o seu carro?",
  "She is thirty years old.": "Ela tem trinta anos.",
  "It's cold today.": "Está frio hoje.",
  "I wake up at six every day.": "Eu acordo às seis todos os dias.",
  "We live in a small town.": "Nós moramos numa cidade pequena.",
  "She works in a bank.": "Ela trabalha num banco.",
  "My father watches the news every night.": "Meu pai assiste ao jornal todas as noites.",
  "I don't drink coffee.": "Eu não tomo café.",
  "He doesn't like football.": "Ele não gosta de futebol.",
  "Do you speak English?": "Você fala inglês?",
  "Does she usually walk to work?": "Ela costuma ir a pé para o trabalho?",
  "There is a bank near my house.": "Tem um banco perto da minha casa.",
  "There are two bedrooms in the apartment.": "Há dois quartos no apartamento.",
  "There isn't any milk in the fridge.": "Não tem leite na geladeira.",
  "There aren't any chairs in the room.": "Não há cadeiras na sala.",
  "Is there a pharmacy around here?": "Tem alguma farmácia por aqui?",
  "Are there any good restaurants on this street?": "Tem algum restaurante bom nesta rua?",
  "How many people are there in your family?": "Quantas pessoas há na sua família?",
  "I can swim.": "Eu sei nadar.",
  "She can speak three languages.": "Ela fala três idiomas.",
  "He can't drive.": "Ele não sabe dirigir.",
  "I cannot find my keys.": "Não consigo achar minhas chaves.",
  "Can you cook?": "Você sabe cozinhar?",
  "Can I sit here?": "Posso sentar aqui?",
  "Can you open the window, please?": "Você pode abrir a janela, por favor?",
  "Could I use your phone?": "Eu poderia usar o seu telefone?",
  "I worked until seven yesterday.": "Ontem trabalhei até as sete.",
  "We studied English last night.": "Estudamos inglês ontem à noite.",
  "She went to the beach last weekend.": "Ela foi à praia no fim de semana passado.",
  "I bought a new phone two days ago.": "Comprei um celular novo há dois dias.",
  "He didn't call me.": "Ele não me ligou.",
  "We didn't see the game.": "Não vimos o jogo.",
  "Did you sleep well?": "Você dormiu bem?",
  "Where were you last night?": "Onde você estava ontem à noite?",
  "I'm cooking dinner right now.": "Estou fazendo o jantar agora mesmo.",
  "Look! It's raining.": "Olha! Está chovendo.",
  "She's staying with her parents this month.": "Ela está ficando com os pais este mês.",
  "We're meeting the client tomorrow.": "Vamos nos reunir com o cliente amanhã.",
  "He usually takes the bus to work.": "Ele costuma pegar o ônibus para o trabalho.",
  "Water boils at 100 degrees.": "A água ferve a 100 graus.",
  "I need a coffee now.": "Preciso de um café agora.",
  "Do you understand the question?": "Você entende a pergunta?",
  "I'm going to visit my parents next weekend.": "Vou visitar meus pais no próximo fim de semana.",
  "We're going to buy a new car this year.": "Vamos comprar um carro novo este ano.",
  "Look at those clouds. It's going to rain.": "Olha aquelas nuvens. Vai chover.",
  "The phone is ringing. I'll answer it.": "O telefone está tocando. Eu atendo.",
  "I'll help you with your bags.": "Eu te ajudo com as malas.",
  "I promise I won't be late.": "Prometo que não vou me atrasar.",
  "I think it will be a great year.": "Acho que vai ser um ótimo ano.",
  "She'll probably get the job.": "Ela provavelmente vai conseguir o emprego.",
  "My car is older than yours.": "Meu carro é mais velho que o seu.",
  "This is the biggest room in the house.": "Este é o maior cômodo da casa.",
  "English is easier than Chinese.": "Inglês é mais fácil que chinês.",
  "This hotel is more comfortable than the other one.": "Este hotel é mais confortável que o outro.",
  "It's the most beautiful city in Brazil.": "É a cidade mais bonita do Brasil.",
  "Her English is better than mine.": "O inglês dela é melhor que o meu.",
  "That was the worst day of my life.": "Aquele foi o pior dia da minha vida.",
  "My brother is as tall as my father.": "Meu irmão é tão alto quanto meu pai.",
  "The new phone isn't as fast as I expected.": "O celular novo não é tão rápido quanto eu esperava.",
  "At eight o'clock last night I was having dinner.": "Às oito horas de ontem à noite eu estava jantando.",
  "They were working all afternoon.": "Eles estavam trabalhando a tarde toda.",
  "I was taking a shower when the lights went out.": "Eu estava tomando banho quando a luz acabou.",
  "When you called, I was driving.": "Quando você ligou, eu estava dirigindo.",
  "While I was cooking, my wife was reading.": "Enquanto eu cozinhava, minha esposa estava lendo.",
  "She got up, had a coffee and left for work.": "Ela se levantou, tomou um café e saiu para o trabalho.",
  "I didn't know the answer.": "Eu não sabia a resposta.",
  "I must call my mother tonight.": "Preciso ligar para minha mãe hoje à noite.",
  "Passengers must wear a seat belt.": "Os passageiros devem usar cinto de segurança.",
  "I have to be at work at seven.": "Tenho que estar no trabalho às sete.",
  "She has to wear a uniform.": "Ela tem que usar uniforme.",
  "We had to wait two hours at the airport.": "Tivemos que esperar duas horas no aeroporto.",
  "You mustn't smoke in the hospital.": "É proibido fumar no hospital.",
  "You don't have to bring anything. We have everything.": "Você não precisa trazer nada. Temos tudo.",
  "You should see a doctor.": "Você deveria ir ao médico.",
  "You shouldn't work so late.": "Você não deveria trabalhar até tão tarde."
});
