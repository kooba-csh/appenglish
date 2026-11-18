window.CONTENT = window.CONTENT || { decks: [] };
CONTENT.shadowing = CONTENT.shadowing || [];
CONTENT.shadowing.push(
  { id: "sh-meet-01", set: "Reuniões", text: "Could we push the meeting back to Thursday afternoon?", pt: "Podemos adiar a reunião para quinta à tarde?", focus: "push back (ligação push_back); entonação subindo na pergunta" },
  { id: "sh-meet-02", set: "Reuniões", text: "Let's get started, we've got a lot to cover today.", pt: "Vamos começar, temos muita coisa para ver hoje.", focus: "get started vira 'ge-started'; we've got com contração" },
  { id: "sh-meet-03", set: "Reuniões", text: "Sorry, could you go over that last point again?", pt: "Desculpe, pode repassar esse último ponto?", focus: "go over ligado; last point sem vogal extra no fim de last" },
  { id: "sh-meet-04", set: "Reuniões", text: "I think we're on the same page here.", pt: "Acho que estamos alinhados aqui.", focus: "TH em think; we're on ligado (we-ron)" },
  { id: "sh-meet-05", set: "Reuniões", text: "Just to sum up, we've agreed on three things.", pt: "Só para resumir, concordamos em três coisas.", focus: "TH em three e things; sum up ligado (su-mup)" },
  { id: "sh-meet-06", set: "Reuniões", text: "Can I jump in for a second?", pt: "Posso interromper um segundo?", focus: "can reduzido (k'n); jump in ligado" },
  { id: "sh-meet-07", set: "Reuniões", text: "Let's take this offline and talk about it later.", pt: "Vamos tratar disso fora da reunião e conversar depois.", focus: "TH em this; talk about it vira 'tal-ka-bou-dit'" },
  { id: "sh-meet-08", set: "Reuniões", text: "Who's going to follow up with the client?", pt: "Quem vai dar retorno ao cliente?", focus: "going to vira gonna; follow up ligado" },
  { id: "sh-meet-09", set: "Reuniões", text: "I'm afraid I can't make it to Monday's meeting.", pt: "Receio que não consiga ir à reunião de segunda.", focus: "can't com T quase mudo; make it ligado" },
  { id: "sh-meet-10", set: "Reuniões", text: "We're running out of time, so let's wrap it up.", pt: "Estamos ficando sem tempo, então vamos encerrar.", focus: "running out of ligado; W de wrap mudo" },

  { id: "sh-site-01", set: "Obra e engenharia", text: "The concrete was poured yesterday, so we're waiting for it to cure.", pt: "O concreto foi lançado ontem, então estamos esperando a cura.", focus: "final -ed de poured (som de D, sem vogal); cure /kjʊr/" },
  { id: "sh-site-02", set: "Obra e engenharia", text: "We need to double-check the rebar before the inspection.", pt: "Precisamos conferir a armadura antes da vistoria.", focus: "TH em the; acento em REbar" },
  { id: "sh-site-03", set: "Obra e engenharia", text: "The formwork has to stay in place for at least two weeks.", pt: "As formas precisam ficar no lugar por pelo menos duas semanas.", focus: "has to vira 'hasta'; at least ligado (a-tleast)" },
  { id: "sh-site-04", set: "Obra e engenharia", text: "There's a crack in the wall that wasn't there last week.", pt: "Tem uma rachadura na parede que não estava lá semana passada.", focus: "TH em there e that; vogal curta em crack" },
  { id: "sh-site-05", set: "Obra e engenharia", text: "The crew showed up late because the truck broke down.", pt: "A equipe chegou atrasada porque o caminhão quebrou.", focus: "showed up ligado (show-dup); broke down" },
  { id: "sh-site-06", set: "Obra e engenharia", text: "We'll have to dig a bit deeper to reach firm soil.", pt: "Vamos ter que escavar um pouco mais fundo para chegar a solo firme.", focus: "vogal curta em dig x longa em deeper; a bit of ligado" },
  { id: "sh-site-07", set: "Obra e engenharia", text: "The drawings don't match what's been built on site.", pt: "Os desenhos não batem com o que foi construído na obra.", focus: "built com I curto; don't match (T quase mudo)" },
  { id: "sh-site-08", set: "Obra e engenharia", text: "Make sure everyone's wearing a helmet and safety boots.", pt: "Garanta que todos estejam de capacete e botas de segurança.", focus: "make sure ligado; helmet com H aspirado" },
  { id: "sh-site-09", set: "Obra e engenharia", text: "The beam's slightly undersized, so we've reinforced it.", pt: "A viga está um pouco subdimensionada, então reforçamos.", focus: "final -ed de reinforced (som de T); beam com I longo" },
  { id: "sh-site-10", set: "Obra e engenharia", text: "Let's run the numbers again before we sign off on it.", pt: "Vamos refazer as contas antes de aprovar.", focus: "sign off on it ligado (sai-no-fo-nit)" },

  { id: "sh-trav-01", set: "Viagem", text: "I'd like to check in, I've got a reservation under Silva.", pt: "Gostaria de fazer check-in, tenho uma reserva no nome Silva.", focus: "I'd like (D quase mudo); check in ligado" },
  { id: "sh-trav-02", set: "Viagem", text: "Excuse me, is this the right line for the bus downtown?", pt: "Com licença, essa é a fila certa para o ônibus para o centro?", focus: "TH em this e the; entonação de pergunta sim/não" },
  { id: "sh-trav-03", set: "Viagem", text: "My flight's been delayed, so I'll miss my connection.", pt: "Meu voo atrasou, então vou perder a conexão.", focus: "final -ed de delayed (som de D); flight's been" },
  { id: "sh-trav-04", set: "Viagem", text: "Could you tell me how to get to the train station?", pt: "Pode me dizer como chegar à estação de trem?", focus: "could you vira 'couldja'; get to com T flap" },
  { id: "sh-trav-05", set: "Viagem", text: "Is breakfast included, or do we pay extra for that?", pt: "O café da manhã está incluído ou pagamos à parte?", focus: "breakfast /ˈbrek-fəst/; final -ed de included (som de ID)" },
  { id: "sh-trav-06", set: "Viagem", text: "We're just looking around for now, thanks.", pt: "Só estamos dando uma olhada por enquanto, obrigado.", focus: "looking around ligado; TH em thanks" },
  { id: "sh-trav-07", set: "Viagem", text: "Can we get the check, please?", pt: "Pode trazer a conta, por favor?", focus: "can we reduzido; vogal curta em check" },
  { id: "sh-trav-08", set: "Viagem", text: "I think I left my jacket in the taxi.", pt: "Acho que esqueci minha jaqueta no táxi.", focus: "TH em think; left my (T quase mudo)" },
  { id: "sh-trav-09", set: "Viagem", text: "How long does it take to get there on foot?", pt: "Quanto tempo leva para chegar lá a pé?", focus: "does it vira 'duzit'; TH em there" },
  { id: "sh-trav-10", set: "Viagem", text: "We ended up staying an extra night because of the storm.", pt: "Acabamos ficando uma noite a mais por causa da tempestade.", focus: "final -ed de ended (ID); ended up ligado" },

  { id: "sh-talk-01", set: "Small talk", text: "So, how do you know the host?", pt: "E aí, como você conhece o anfitrião?", focus: "how do you vira 'howdya'; entonação descendo (pergunta wh-)" },
  { id: "sh-talk-02", set: "Small talk", text: "It's been ages since I last saw you!", pt: "Faz séculos que não te vejo!", focus: "it's been ligado; ênfase em ages" },
  { id: "sh-talk-03", set: "Small talk", text: "What do you do for a living?", pt: "Com o que você trabalha?", focus: "what do you vira 'whaddaya'; ritmo rápido" },
  { id: "sh-talk-04", set: "Small talk", text: "The weather's been crazy this week, hasn't it?", pt: "O tempo está maluco esta semana, né?", focus: "TH em weather e this; tag question com entonação descendo" },
  { id: "sh-talk-05", set: "Small talk", text: "Have you been up to anything fun lately?", pt: "Tem feito algo divertido ultimamente?", focus: "been up to ligado; vogal curta em fun" },
  { id: "sh-talk-06", set: "Small talk", text: "I'm thinking about taking a few days off next month.", pt: "Estou pensando em tirar uns dias de folga mês que vem.", focus: "TH em thinking e month; days off ligado" },
  { id: "sh-talk-07", set: "Small talk", text: "Oh really? I've always wanted to go there.", pt: "Sério? Sempre quis ir lá.", focus: "wanted com final -ed (ID); want to vira wanna em fala rápida" },
  { id: "sh-talk-08", set: "Small talk", text: "That sounds like a lot of work, to be honest.", pt: "Parece bastante trabalho, sinceramente.", focus: "a lot of vira 'a-lodda'; H mudo em honest" },
  { id: "sh-talk-09", set: "Small talk", text: "Anyway, it was really nice talking to you.", pt: "Enfim, foi muito bom conversar com você.", focus: "talking com L mudo; nice talking sem vogal entre" },
  { id: "sh-talk-10", set: "Small talk", text: "Let's keep in touch, I'll drop you a message.", pt: "Vamos manter contato, te mando uma mensagem.", focus: "keep in touch ligado; vogal curta em touch" },

  { id: "sh-opin-01", set: "Opiniões e argumentos", text: "I see your point, but I'm not sure I agree.", pt: "Entendo seu ponto, mas não tenho certeza se concordo.", focus: "entonação de contraste em but; sure /ʃʊr/" },
  { id: "sh-opin-02", set: "Opiniões e argumentos", text: "To be fair, they didn't have much time to prepare.", pt: "Para ser justo, eles não tiveram muito tempo para se preparar.", focus: "TH em they; didn't com T quase mudo" },
  { id: "sh-opin-03", set: "Opiniões e argumentos", text: "That's exactly what I was trying to say.", pt: "É exatamente isso que eu estava tentando dizer.", focus: "TH em that's; ênfase em exactly" },
  { id: "sh-opin-04", set: "Opiniões e argumentos", text: "The way I see it, it's a question of priorities.", pt: "Do meu ponto de vista, é uma questão de prioridades.", focus: "TH em the; it's a ligado" },
  { id: "sh-opin-05", set: "Opiniões e argumentos", text: "I'd go along with that, up to a point.", pt: "Eu concordaria com isso, até certo ponto.", focus: "go along with ligado; up to a point (T flap)" },
  { id: "sh-opin-06", set: "Opiniões e argumentos", text: "It's not that simple, there are other factors involved.", pt: "Não é tão simples, há outros fatores envolvidos.", focus: "TH em that, there, other; final -ed de involved (D)" },
  { id: "sh-opin-07", set: "Opiniões e argumentos", text: "What worries me is the long-term cost.", pt: "O que me preocupa é o custo a longo prazo.", focus: "worries /ˈwɜːr-iz/; long-term com G sem vogal extra" },
  { id: "sh-opin-08", set: "Opiniões e argumentos", text: "Let's not jump to conclusions before we see the data.", pt: "Não vamos tirar conclusões precipitadas antes de ver os dados.", focus: "jump to (P quase mudo); data /ˈdeɪ-tə/" },
  { id: "sh-opin-09", set: "Opiniões e argumentos", text: "I couldn't agree more, it's a brilliant idea.", pt: "Concordo plenamente, é uma ideia brilhante.", focus: "couldn't agree ligado; ênfase em more" },
  { id: "sh-opin-10", set: "Opiniões e argumentos", text: "Fair enough, but have you thought about the risks?", pt: "Justo, mas você pensou nos riscos?", focus: "TH em thought; fair enough ligado (fai-renough)" },

  { id: "sh-phone-01", set: "Telefone e problemas", text: "Hi, this is Cleiton calling from CS Engineering.", pt: "Oi, aqui é o Cleiton, da CS Engenharia.", focus: "TH em this; acento em engiNEERing" },
  { id: "sh-phone-02", set: "Telefone e problemas", text: "Sorry, you're breaking up, can you hear me now?", pt: "Desculpe, está cortando, consegue me ouvir agora?", focus: "breaking up ligado; hear com H aspirado" },
  { id: "sh-phone-03", set: "Telefone e problemas", text: "Could you spell that for me, please?", pt: "Pode soletrar para mim, por favor?", focus: "could you vira 'couldja'; TH em that" },
  { id: "sh-phone-04", set: "Telefone e problemas", text: "I'll put you on hold for a moment.", pt: "Vou te colocar na espera um momento.", focus: "put you on hold ligado (pu-tcha-non)" },
  { id: "sh-phone-05", set: "Telefone e problemas", text: "I'm calling about an order that hasn't arrived yet.", pt: "Estou ligando sobre um pedido que ainda não chegou.", focus: "calling about an ligado; final -ed de arrived (D)" },
  { id: "sh-phone-06", set: "Telefone e problemas", text: "There seems to be a mistake on my bill.", pt: "Parece haver um erro na minha conta.", focus: "TH em there; vogal curta em bill (não 'biu')" },
  { id: "sh-phone-07", set: "Telefone e problemas", text: "Can I leave a message for her?", pt: "Posso deixar um recado para ela?", focus: "leave com I longo; for her vira 'for-er'" },
  { id: "sh-phone-08", set: "Telefone e problemas", text: "I'll get back to you as soon as I find out.", pt: "Te retorno assim que descobrir.", focus: "get back to you (T flap); find out ligado" },
  { id: "sh-phone-09", set: "Telefone e problemas", text: "The heater's stopped working and the room's freezing.", pt: "O aquecedor parou de funcionar e o quarto está congelando.", focus: "final -ed de stopped (T); TH em the" },
  { id: "sh-phone-10", set: "Telefone e problemas", text: "Thanks for sorting that out so quickly.", pt: "Obrigado por resolver isso tão rápido.", focus: "TH em thanks e that; sorting that out ligado" }
);

CONTENT.scenarios = CONTENT.scenarios || [];
CONTENT.scenarios.push(
  {
    id: "sc-site-visit", title: "Visita de obra com o cliente", level: "B2",
    setting_pt: "Você é o engenheiro e mostra a obra da casa a um cliente estrangeiro que chegou de surpresa.",
    ai_role: "a foreign client visiting the construction site of his new house; friendly and curious, but a bit worried about delays and the budget",
    goal_pt: "Explicar a etapa atual da obra, justificar um pequeno atraso e combinar o próximo passo.",
    opener: "Hi! So this is it? Honestly, it looks a bit different from the drawings you sent me...",
    useful: ["We're currently working on ...", "That's because the drawings show the finished version.", "We're about a week behind, mainly because of the rain.", "The next step is to ...", "Don't worry, it's still within budget.", "Would you like to see the ... area?"]
  },
  {
    id: "sc-online-meeting", title: "Reunião de projeto online", level: "C1",
    setting_pt: "Chamada de vídeo com a arquiteta de uma empresa parceira para revisar a planta de um prédio comercial.",
    ai_role: "an experienced architect from a partner firm in the US; direct, detail-oriented, sometimes interrupts to ask about costs and deadlines",
    goal_pt: "Apresentar as alterações feitas, defender uma decisão técnica e definir responsáveis e prazos.",
    opener: "Hey, can you hear me okay? Great. So, I had a quick look at the revised layout last night, and I've got a few concerns. Do you want to walk me through the changes first?",
    useful: ["Sure, let me share my screen.", "The main change is that we've moved ...", "We did that because ...", "I see your point, but ...", "Could you clarify what you mean by ...?", "So, just to recap, I'll ... and you'll ... by Friday."]
  },
  {
    id: "sc-job-interview", title: "Entrevista de emprego", level: "C1",
    setting_pt: "Entrevista em inglês para uma vaga de engenheiro de projetos numa construtora internacional.",
    ai_role: "a hiring manager at an international construction company; polite but probing, asks follow-up questions about real examples and weaknesses",
    goal_pt: "Apresentar sua experiência, dar um exemplo concreto de problema resolvido e fazer uma pergunta sobre a vaga.",
    opener: "Thanks for joining us today. To start off, could you tell me a little about yourself and your background?",
    useful: ["I'm a civil engineer with ... years of experience in ...", "One example that comes to mind is ...", "The biggest challenge was ..., so I ...", "As a result, we managed to ...", "I'd say my main weakness is ..., but I'm working on it by ...", "Could you tell me more about the team I'd be working with?"]
  },
  {
    id: "sc-hotel-problem", title: "Check-in no hotel com problema", level: "B2",
    setting_pt: "Você chega tarde ao hotel e descobrem que a reserva está errada (quarto e datas).",
    ai_role: "a tired but polite hotel receptionist on the night shift; the system shows a different booking and the hotel is almost full",
    goal_pt: "Explicar o problema, mostrar a confirmação e conseguir um quarto adequado ou uma compensação.",
    opener: "Good evening, welcome! Can I have your name, please? ... Hmm, I'm sorry, I'm seeing a single room for tomorrow night, not tonight.",
    useful: ["There must be some mistake.", "I've got the confirmation email right here.", "I booked a double room for three nights.", "Is there anything you can do?", "Could I speak to the manager, please?", "Would you be able to offer a discount or an upgrade?"]
  },
  {
    id: "sc-restaurant", title: "No restaurante", level: "B2",
    setting_pt: "Jantar num restaurante nos EUA: pedir, perguntar sobre um prato e resolver um pedido errado.",
    ai_role: "a cheerful, chatty waiter at a busy American restaurant who recommends dishes and asks many questions about how you want your food",
    goal_pt: "Fazer o pedido, perguntar sobre ingredientes, reclamar educadamente de um prato errado e pedir a conta.",
    opener: "Hi there, welcome in! My name's Jake and I'll be taking care of you tonight. Can I start you off with something to drink?",
    useful: ["Could I get ..., please?", "What would you recommend?", "Does it come with ...?", "Medium rare, please.", "Excuse me, I think this isn't what I ordered.", "Can we get the check, please?"]
  },
  {
    id: "sc-directions", title: "Pedindo direções", level: "B2",
    setting_pt: "Você está perdido numa cidade estrangeira e precisa chegar a um museu antes que feche.",
    ai_role: "a helpful local passer-by who gives directions quickly, uses landmarks and sometimes changes their mind about the best route",
    goal_pt: "Pedir e confirmar direções, entender pontos de referência e perguntar sobre transporte.",
    opener: "Oh, you look a bit lost. Can I help you find something?",
    useful: ["I'm trying to get to ...", "Is it within walking distance?", "So I go straight and then turn left at ...?", "Sorry, could you say that again more slowly?", "Is there a bus or subway that goes there?", "Thanks so much, you've been really helpful."]
  },
  {
    id: "sc-event-smalltalk", title: "Small talk em evento", level: "B2",
    setting_pt: "Coffee break numa feira de construção; você puxa conversa com outro participante.",
    ai_role: "a friendly engineer from Portugal attending the same construction fair; enjoys talking about travel, work and new technologies",
    goal_pt: "Manter uma conversa leve por alguns minutos, falar do seu trabalho e trocar contatos.",
    opener: "Great coffee, isn't it? First time at this fair, or have you been before?",
    useful: ["It's my first time, actually.", "So, what brings you here?", "I work mostly with ...", "Oh, that sounds interesting. How did you get into that?", "Have you seen the ... stand?", "It was great talking to you. Shall we connect on LinkedIn?"]
  },
  {
    id: "sc-supplier-deadline", title: "Negociar prazo com fornecedor", level: "C1",
    setting_pt: "O fornecedor de esquadrias avisa que vai atrasar três semanas; isso trava a obra.",
    ai_role: "a sales manager at a window and door supplier; apologetic but firm, blames the factory, tries to avoid giving discounts",
    goal_pt: "Negociar uma entrega parcial ou mais rápida e alguma compensação pelo atraso.",
    opener: "Hi, thanks for calling back. Look, I'll be honest with you, the factory's had some issues and we're looking at about three more weeks.",
    useful: ["I understand, but three weeks just isn't workable for us.", "Is there any way you could deliver part of the order first?", "What if we ...? Would that help?", "We'd need some kind of compensation for the delay.", "I'd like to have that in writing, please.", "If we can't reach an agreement, we may have to look elsewhere."]
  },
  {
    id: "sc-tech-problem-manager", title: "Explicar um problema técnico ao gerente", level: "C1",
    setting_pt: "Você encontrou fissuras numa viga logo após a desforma e precisa explicar ao gerente, que não é engenheiro.",
    ai_role: "a project manager with a business background, not an engineer; worried about cost and schedule, wants a clear answer and a decision",
    goal_pt: "Explicar o problema em linguagem simples, avaliar o risco e propor uma solução com custo e prazo.",
    opener: "Okay, I got your message about the beam. Is it serious? Do we need to stop the work?",
    useful: ["In simple terms, what's happening is ...", "It's not an immediate safety risk, but ...", "The most likely cause is ...", "What I'd recommend is ...", "It would cost roughly ... and take about ... days.", "If we leave it, it could lead to ..."]
  },
  {
    id: "sc-doctor", title: "Consulta médica simples", level: "B2",
    setting_pt: "Durante uma viagem você fica doente e vai a uma clínica.",
    ai_role: "a calm, friendly doctor at a walk-in clinic who asks precise questions about symptoms, duration and allergies",
    goal_pt: "Descrever sintomas, responder perguntas sobre histórico e entender o tratamento.",
    opener: "Hello, please have a seat. So, what seems to be the problem today?",
    useful: ["I've had a sore throat and a fever since yesterday.", "It hurts when I swallow.", "I'm not allergic to anything, as far as I know.", "How often should I take it?", "Is it okay to travel tomorrow?", "Do I need to come back for a follow-up?"]
  }
);
