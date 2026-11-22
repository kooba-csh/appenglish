window.CONTENT = window.CONTENT || { decks: [] };
CONTENT.writing = CONTENT.writing || [];
CONTENT.shadowing = CONTENT.shadowing || [];
CONTENT.scenarios = CONTENT.scenarios || [];

CONTENT.writing.push({
  id: "wr-a2-introduce-yourself",
  type: "description",
  title: "Apresente-se",
  level: "A2",
  prompt_en: "Introduce yourself to a new English-speaking friend. Say your name, age, where you live, what you do and what you like doing in your free time.",
  prompt_pt: "Apresente-se a um novo amigo que fala inglês: nome, idade, onde mora, o que faz e do que gosta no tempo livre.",
  minWords: 20, maxWords: 400,
  tips_pt: ["Use frases curtas com o verbo to be: I'm..., I'm from...", "Para gostos, use I like / I love + verbo-ing (I like reading).", "Termine com uma pergunta ao amigo, por exemplo: What about you?"],
  useful: ["Hi! My name is ...", "I'm ... years old.", "I live in ... with my family.", "I work as ...", "In my free time, I like ...", "What about you?"]
});

CONTENT.writing.push({
  id: "wr-a2-daily-routine",
  type: "description",
  title: "Minha rotina",
  level: "A2",
  prompt_en: "Describe a normal day in your life. What time do you get up? What do you do in the morning, afternoon and evening?",
  prompt_pt: "Descreva um dia normal da sua vida: a que horas acorda e o que faz de manhã, à tarde e à noite.",
  minWords: 20, maxWords: 400,
  tips_pt: ["Use o Present Simple e lembre do -s com he/she/it.", "Use palavras de sequência: first, then, after that, finally.", "Advérbios de frequência vêm antes do verbo: I usually have lunch at noon."],
  useful: ["I usually get up at ...", "First, I have breakfast.", "Then I go to work by car.", "After that, I ...", "In the evening, I ...", "I go to bed at around ..."]
});

CONTENT.writing.push({
  id: "wr-a2-trip",
  type: "story",
  title: "Conte uma viagem",
  level: "A2",
  prompt_en: "Write about a trip you took. Where did you go? Who did you go with? What did you do there? Did you like it?",
  prompt_pt: "Conte uma viagem que você fez: para onde foi, com quem, o que fez lá e se gostou.",
  minWords: 20, maxWords: 400,
  tips_pt: ["Use o Past Simple: went, saw, ate, stayed, visited.", "Diga quando foi: last year, in 2023, two months ago.", "Termine dizendo o que achou: It was amazing / I'd like to go back."],
  useful: ["Last year, I went to ...", "I went there with ...", "We stayed in a small hotel near the beach.", "We visited ... and ate ...", "The best part was ...", "It was a great trip."]
});

CONTENT.writing.push({
  id: "wr-b1-email-colleague",
  type: "email",
  title: "E-mail simples a um colega",
  level: "B1",
  prompt_en: "Write an email to a colleague. You can't go to tomorrow's meeting. Explain why, suggest another day and ask him to send you the notes.",
  prompt_pt: "Escreva um e-mail a um colega: você não pode ir à reunião de amanhã. Explique o motivo, sugira outro dia e peça que ele mande as anotações.",
  minWords: 20, maxWords: 400,
  tips_pt: ["Comece com Hi + nome e vá direto ao assunto.", "Dê o motivo com because ou I have to...", "Peça algo de forma educada com Could you...?", "Termine com Thanks e um fechamento simples: Best, / Cheers,"],
  useful: ["Hi John,", "I'm afraid I can't come to the meeting tomorrow.", "I have to visit a client in another city.", "Could we meet on Thursday instead?", "Could you send me the notes, please?", "Thanks a lot. Best,"]
});

CONTENT.writing.push({
  id: "wr-b1-simple-opinion",
  type: "opinion",
  title: "Opinião simples: cidade ou campo?",
  level: "B1",
  prompt_en: "Is it better to live in a big city or in a small town? Give your opinion and explain your reasons with examples from your life.",
  prompt_pt: "É melhor morar numa cidade grande ou numa cidade pequena? Dê sua opinião e explique os motivos com exemplos da sua vida.",
  minWords: 20, maxWords: 400,
  tips_pt: ["Comece dizendo sua opinião: In my opinion, ...", "Dê dois motivos com firstly / also / another reason is...", "Mostre o outro lado com however.", "Termine com uma conclusão: To sum up, ..."],
  useful: ["In my opinion, it's better to live in ...", "Firstly, life is cheaper and calmer.", "Another reason is that ...", "However, big cities have more jobs.", "For example, in my town ...", "To sum up, I prefer ..."]
});

CONTENT.writing.push({
  id: "wr-b1-describe-house",
  type: "description",
  title: "Descreva a sua casa",
  level: "B1",
  prompt_en: "Describe your house or apartment. How many rooms are there? What is your favorite room and why? Is there anything you would like to change?",
  prompt_pt: "Descreva sua casa ou apartamento: quantos cômodos tem, qual é o seu cômodo favorito e por quê, e se há algo que você gostaria de mudar.",
  minWords: 20, maxWords: 400,
  tips_pt: ["Use there is / there are para dizer o que existe.", "Use preposições de lugar: next to, opposite, upstairs, downstairs.", "Para o que gostaria de mudar, use I'd like to... ou If I could, I would..."],
  useful: ["I live in a house with three bedrooms.", "There is a small garden at the back.", "My favorite room is the kitchen because ...", "It's bright and comfortable.", "The living room is next to the kitchen.", "I'd like to have a bigger garage."]
});

CONTENT.shadowing.push(
  { id: "sh-basic-01", set: "Básico (A1–A2)", text: "Nice to meet you.", pt: "Prazer em conhecer você.", focus: "nice to juntos: 'naistə'; meet you soa 'mee-tchu'" },
  { id: "sh-basic-02", set: "Básico (A1–A2)", text: "Where are you from?", pt: "De onde você é?", focus: "entonação descendo no fim de pergunta com where; are you fraco: 'ər yə'" },
  { id: "sh-basic-03", set: "Básico (A1–A2)", text: "Could you repeat that, please?", pt: "Você poderia repetir, por favor?", focus: "could you soa 'kudju'; tônica em repeat" },
  { id: "sh-basic-04", set: "Básico (A1–A2)", text: "Can you speak more slowly?", pt: "Você pode falar mais devagar?", focus: "can fraco 'kən'; tônica em slowly" },
  { id: "sh-basic-05", set: "Básico (A1–A2)", text: "How much is this shirt?", pt: "Quanto custa esta camisa?", focus: "how much juntos; sh de shirt bem chiado" },
  { id: "sh-basic-06", set: "Básico (A1–A2)", text: "I'd like a coffee, please.", pt: "Eu gostaria de um café, por favor.", focus: "I'd like = 'aid laik'; pedido educado" },
  { id: "sh-basic-07", set: "Básico (A1–A2)", text: "Where is the nearest bathroom?", pt: "Onde fica o banheiro mais próximo?", focus: "where is vira 'where's'; th de bathroom com a língua entre os dentes" },
  { id: "sh-basic-08", set: "Básico (A1–A2)", text: "I don't understand the question.", pt: "Não entendo a pergunta.", focus: "don't sem o t forte: 'doun'; tônica em understand" },
  { id: "sh-basic-09", set: "Básico (A1–A2)", text: "What time does the bus leave?", pt: "A que horas o ônibus sai?", focus: "does fraco 'dəz'; leave com i longo (diferente de live)" },
  { id: "sh-basic-10", set: "Básico (A1–A2)", text: "See you tomorrow, have a good night.", pt: "Até amanhã, tenha uma boa noite.", focus: "see you = 'see-ya'; good night juntos, o d quase some" }
);

CONTENT.scenarios.push({
  id: "sc-a2-introduce-event",
  title: "Apresentar-se num evento",
  level: "A2",
  setting_pt: "Você está num evento de negócios e começa a conversar com uma pessoa que fala inglês e que você ainda não conhece.",
  ai_role: "a friendly person at a business event who wants to meet new people; use very simple English (A2 level): short sentences, common words, present and past simple only; speak slowly, ask one simple question at a time, and if the learner makes a mistake, just repeat the correct form naturally in your answer",
  goal_pt: "Dizer seu nome, de onde você é e o que faz, e fazer pelo menos duas perguntas à outra pessoa.",
  opener: "Hi there! I don't think we've met. I'm Sarah. What's your name?",
  useful: ["Hi, I'm ... Nice to meet you.", "I'm from Brazil.", "I'm an engineer. I work in ...", "What do you do?", "Is this your first time here?", "It was nice talking to you."]
});

CONTENT.scenarios.push({
  id: "sc-a2-restaurant",
  title: "Pedir comida num restaurante",
  level: "A2",
  setting_pt: "Você está num restaurante nos Estados Unidos. O garçom chega à sua mesa para anotar o pedido.",
  ai_role: "a polite waiter in a simple restaurant in the United States; use very simple English (A2 level): short sentences and common words; ask one thing at a time (drinks, main course, side dish, dessert, the check); if the learner seems confused, rephrase more simply",
  goal_pt: "Pedir uma bebida e um prato, perguntar sobre um item do cardápio e pedir a conta no final.",
  opener: "Hi, welcome! Here's the menu. Can I get you something to drink?",
  useful: ["Can I have a glass of water, please?", "I'd like the chicken, please.", "What comes with the steak?", "Does it have any onions?", "That's all, thank you.", "Can I have the check, please?"]
});

CONTENT.tr = CONTENT.tr || {};
Object.assign(CONTENT.tr, {
  "Hi! My name is ...": "Oi! Meu nome é ...",
  "I'm ... years old.": "Eu tenho ... anos.",
  "I live in ... with my family.": "Eu moro em ... com minha família.",
  "I work as ...": "Eu trabalho como ...",
  "In my free time, I like ...": "No meu tempo livre, eu gosto de ...",
  "What about you?": "E você?",
  "I usually get up at ...": "Eu normalmente acordo às ...",
  "First, I have breakfast.": "Primeiro, eu tomo café da manhã.",
  "Then I go to work by car.": "Depois vou para o trabalho de carro.",
  "After that, I ...": "Depois disso, eu ...",
  "In the evening, I ...": "À noite, eu ...",
  "I go to bed at around ...": "Vou dormir por volta das ...",
  "Last year, I went to ...": "No ano passado, eu fui para ...",
  "I went there with ...": "Fui para lá com ...",
  "We stayed in a small hotel near the beach.": "Ficamos num hotel pequeno perto da praia.",
  "We visited ... and ate ...": "Visitamos ... e comemos ...",
  "The best part was ...": "A melhor parte foi ...",
  "It was a great trip.": "Foi uma ótima viagem.",
  "Hi John,": "Oi, John,",
  "I'm afraid I can't come to the meeting tomorrow.": "Infelizmente não vou poder ir à reunião amanhã.",
  "I have to visit a client in another city.": "Tenho que visitar um cliente em outra cidade.",
  "Could we meet on Thursday instead?": "Podemos nos reunir na quinta, em vez disso?",
  "Could you send me the notes, please?": "Você poderia me mandar as anotações, por favor?",
  "Thanks a lot. Best,": "Muito obrigado. Abraço,",
  "In my opinion, it's better to live in ...": "Na minha opinião, é melhor morar em ...",
  "Firstly, life is cheaper and calmer.": "Em primeiro lugar, a vida é mais barata e mais tranquila.",
  "Another reason is that ...": "Outro motivo é que ...",
  "However, big cities have more jobs.": "No entanto, as cidades grandes têm mais empregos.",
  "For example, in my town ...": "Por exemplo, na minha cidade ...",
  "To sum up, I prefer ...": "Resumindo, eu prefiro ...",
  "I live in a house with three bedrooms.": "Moro numa casa com três quartos.",
  "There is a small garden at the back.": "Tem um jardim pequeno nos fundos.",
  "My favorite room is the kitchen because ...": "Meu cômodo favorito é a cozinha porque ...",
  "It's bright and comfortable.": "É claro e confortável.",
  "The living room is next to the kitchen.": "A sala fica ao lado da cozinha.",
  "I'd like to have a bigger garage.": "Eu gostaria de ter uma garagem maior.",
  "Hi, I'm ... Nice to meet you.": "Oi, eu sou ... Prazer em conhecer você.",
  "I'm from Brazil.": "Sou do Brasil.",
  "I'm an engineer. I work in ...": "Sou engenheiro. Trabalho em ...",
  "What do you do?": "O que você faz?",
  "Is this your first time here?": "É a sua primeira vez aqui?",
  "It was nice talking to you.": "Foi bom conversar com você.",
  "Can I have a glass of water, please?": "Pode me trazer um copo de água, por favor?",
  "I'd like the chicken, please.": "Eu quero o frango, por favor.",
  "What comes with the steak?": "O que acompanha o bife?",
  "Does it have any onions?": "Tem cebola?",
  "That's all, thank you.": "É só isso, obrigado.",
  "Can I have the check, please?": "Pode trazer a conta, por favor?"
});
