window.CONTENT = window.CONTENT || { decks: [] };
CONTENT.writing = CONTENT.writing || [];

CONTENT.writing.push({
  id: "wr-email-client-delay",
  type: "email",
  title: "Avisar o cliente sobre um atraso na obra",
  level: "B2",
  prompt_en: "Write an email to a client explaining that the construction of their house will be two weeks late because of heavy rain and a delay in the delivery of roof tiles. Apologize, explain what you are doing to reduce the delay and give the new completion date.",
  prompt_pt: "Escreva um e-mail a um cliente explicando que a obra da casa vai atrasar duas semanas por causa de chuvas fortes e do atraso na entrega das telhas. Peça desculpas, explique o que está fazendo para reduzir o atraso e informe a nova data de conclusão.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Abra com o motivo do e-mail logo na primeira frase.", "Assuma a responsabilidade sem culpar ninguém de forma agressiva.", "Mostre ações concretas (equipe extra, outro fornecedor).", "Feche com a nova data e oferecendo uma conversa."],
  useful: ["I'm writing to let you know that ...", "Unfortunately, due to ..., we've fallen behind schedule.", "To make up for lost time, we're going to ...", "The new estimated completion date is ...", "I apologize for any inconvenience this may cause.", "Please feel free to give me a call if you have any questions."]
});

CONTENT.writing.push({
  id: "wr-email-supplier-quote",
  type: "email",
  title: "Pedir orçamento e prazo a um fornecedor",
  level: "B2",
  prompt_en: "Write an email to a building materials supplier asking for a quote for 40 cubic meters of ready-mix concrete (fck 25 MPa) and 3 tons of rebar. Ask about delivery times, payment terms and whether they can deliver on a Saturday.",
  prompt_pt: "Escreva um e-mail a um fornecedor de materiais pedindo orçamento de 40 m³ de concreto usinado (fck 25 MPa) e 3 toneladas de aço. Pergunte sobre prazo de entrega, condições de pagamento e se entregam no sábado.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Apresente-se e diga a obra/local em uma frase.", "Liste os itens com quantidades claras.", "Faça as perguntas em ordem, uma por frase.", "Diga até quando precisa da resposta."],
  useful: ["I'd like to request a quote for the following materials:", "Could you let me know your delivery lead time?", "What are your payment terms?", "Would it be possible to deliver on a Saturday morning?", "I'd appreciate it if you could get back to me by Friday.", "Thanks in advance for your help."]
});

CONTENT.writing.push({
  id: "wr-email-foreign-colleague",
  type: "email",
  title: "Responder a um colega estrangeiro sobre um projeto",
  level: "B2",
  prompt_en: "A colleague from a partner company in Canada has sent you the first version of a floor plan and asked for your feedback. Write a friendly reply: thank them, point out two things you like, suggest two changes and propose a short video call next week.",
  prompt_pt: "Um colega de uma empresa parceira no Canadá enviou a primeira versão de uma planta e pediu sua opinião. Responda de forma amigável: agradeça, destaque dois pontos positivos, sugira duas mudanças e proponha uma chamada rápida na próxima semana.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Tom amigável, mas profissional (Hi + nome).", "Use frases de sugestão suaves (maybe, it might be worth).", "Separe elogios e sugestões em parágrafos.", "Ofereça dois horários concretos para a chamada."],
  useful: ["Thanks for sending this over so quickly.", "I really like the way you've ...", "One thing I'd suggest is ...", "It might be worth moving ... to ...", "Would you be free for a quick call on Tuesday or Wednesday?", "Looking forward to hearing your thoughts."]
});

CONTENT.writing.push({
  id: "wr-email-job-application",
  type: "email",
  title: "Candidatura a uma vaga de engenheiro",
  level: "C1",
  prompt_en: "You have seen an advertisement for a project engineer position at an international construction company. Write a cover email applying for the job. Describe your relevant experience, one project you are proud of, your English and software skills, and explain why you want to work for this company.",
  prompt_pt: "Você viu um anúncio de vaga de engenheiro de projetos em uma construtora internacional. Escreva um e-mail de candidatura descrevendo sua experiência, um projeto do qual se orgulha, suas habilidades em inglês e softwares, e por que quer trabalhar nessa empresa.",
  minWords: 150, maxWords: 250,
  tips_pt: ["Diga logo no início a vaga e onde a viu.", "Use resultados concretos (prazos, áreas, economia).", "Conecte sua experiência às necessidades da empresa.", "Termine com uma chamada para ação educada (entrevista)."],
  useful: ["I'm writing to apply for the position of ... advertised on ...", "Over the past ... years, I've been responsible for ...", "One project I'm particularly proud of is ...", "I'm proficient in Revit, AutoCAD and QGIS.", "What attracts me most to your company is ...", "I'd welcome the opportunity to discuss how I could contribute to your team."]
});

CONTENT.writing.push({
  id: "wr-opinion-remote-work",
  type: "opinion",
  title: "Trabalho remoto na engenharia",
  level: "B2",
  prompt_en: "Some people say that engineers can work from home most of the time, while others believe they need to be on site every day. What do you think? Give your opinion with at least two reasons and an example from your experience.",
  prompt_pt: "Alguns dizem que engenheiros podem trabalhar de casa na maior parte do tempo; outros acham que precisam estar na obra todo dia. O que você pensa? Dê sua opinião com pelo menos duas razões e um exemplo da sua experiência.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Deixe sua posição clara na primeira frase.", "Uma razão por parágrafo, com exemplo.", "Reconheça o outro lado em uma frase (On the other hand).", "Conclua retomando sua opinião com outras palavras."],
  useful: ["In my view, ...", "The main reason is that ...", "For example, last year I ...", "On the other hand, it's true that ...", "That's why I believe ...", "All in all, ..."]
});

CONTENT.writing.push({
  id: "wr-opinion-social-media",
  type: "opinion",
  title: "Redes sociais: ajudam ou atrapalham?",
  level: "B2",
  prompt_en: "Do social media platforms do more good than harm to small businesses and professionals? Write your opinion, giving reasons and at least one concrete example.",
  prompt_pt: "As redes sociais fazem mais bem do que mal a pequenas empresas e profissionais? Escreva sua opinião, com razões e pelo menos um exemplo concreto.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Evite começar com 'Nowadays' (clichê).", "Use conectivos variados: what's more, however, as a result.", "Dê um exemplo real ou plausível.", "Feche com uma frase de equilíbrio."],
  useful: ["I'd argue that ...", "What's more, ...", "A good example of this is ...", "However, there's a downside:", "As a result, ...", "Overall, I think the benefits outweigh the drawbacks."]
});

CONTENT.writing.push({
  id: "wr-opinion-housing-cities",
  type: "opinion",
  title: "Moradia acessível nas cidades",
  level: "C1",
  prompt_en: "Many medium-sized cities are growing fast, and housing is becoming unaffordable for young people. Who should be mainly responsible for solving this problem: the government, private developers or the community? Write a well-argued opinion essay, considering at least two perspectives.",
  prompt_pt: "Muitas cidades médias crescem rápido e a moradia fica cara para os jovens. Quem deve ser o principal responsável por resolver isso: governo, incorporadoras ou a comunidade? Escreva um texto argumentativo considerando pelo menos duas perspectivas.",
  minWords: 150, maxWords: 250,
  tips_pt: ["Introdução: contextualize e apresente sua tese.", "Use hedging para soar maduro (arguably, to some extent).", "Traga um contra-argumento e refute-o.", "Use vocabulário técnico: zoning, land use, infrastructure."],
  useful: ["It's widely acknowledged that ...", "Arguably, the main responsibility lies with ...", "To some extent, developers could ...", "Critics might argue that ..., but ...", "A more balanced approach would be to ...", "In conclusion, while ..., I'm convinced that ..."]
});

CONTENT.writing.push({
  id: "wr-opinion-ai-engineering",
  type: "opinion",
  title: "Inteligência artificial e o futuro da engenharia",
  level: "C1",
  prompt_en: "Artificial intelligence can already generate drawings, estimates and reports. Will AI replace engineers, or will it simply change the way they work? Discuss both sides and give your own well-supported opinion.",
  prompt_pt: "A inteligência artificial já gera desenhos, orçamentos e relatórios. A IA vai substituir engenheiros ou só mudar a forma como trabalham? Discuta os dois lados e dê sua opinião bem fundamentada.",
  minWords: 150, maxWords: 250,
  tips_pt: ["Estruture: introdução, lado A, lado B, sua opinião.", "Use exemplos da sua rotina (Revit, memoriais, automação).", "Fale de responsabilidade técnica (accountability).", "Varie a estrutura das frases (inversões, orações relativas)."],
  useful: ["There's no denying that ...", "Proponents of this view claim that ...", "That said, ...", "What AI can't do, however, is ...", "Rather than replacing engineers, AI is likely to ...", "Ultimately, ..."]
});

CONTENT.writing.push({
  id: "wr-story-trip-problem",
  type: "story",
  title: "Uma viagem em que algo deu errado",
  level: "B2",
  prompt_en: "Write about a trip when something went wrong (a missed flight, lost luggage, a car breaking down, bad weather). Describe what happened, how you felt, how you solved the problem and what you learned.",
  prompt_pt: "Conte uma viagem em que algo deu errado (voo perdido, mala extraviada, carro quebrado, mau tempo). Descreva o que aconteceu, como se sentiu, como resolveu e o que aprendeu.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Use past simple para a sequência e past continuous para o cenário.", "Inclua sentimentos (I was furious, I felt relieved).", "Use marcadores de tempo: at first, then, in the end.", "Termine com uma lição ou frase de efeito."],
  useful: ["It was supposed to be a relaxing trip, but ...", "While we were waiting at the airport, ...", "At first, I didn't know what to do.", "Luckily, a local guy helped us out.", "In the end, everything worked out.", "Looking back, I learned that ..."]
});

CONTENT.writing.push({
  id: "wr-story-first-job",
  type: "story",
  title: "Meu primeiro trabalho como engenheiro",
  level: "B2",
  prompt_en: "Tell the story of your first job or first project as an engineer. What was it, what challenges did you face, and what is one thing you would do differently today?",
  prompt_pt: "Conte a história do seu primeiro emprego ou primeiro projeto como engenheiro. O que era, quais desafios enfrentou e o que faria diferente hoje?",
  minWords: 80, maxWords: 150,
  tips_pt: ["Dê contexto: quando, onde, quem.", "Escolha um desafio específico, não uma lista.", "Use would/should have para o que faria diferente.", "Mantenha um tom pessoal e honesto."],
  useful: ["My first project was ...", "I'd just graduated and ...", "The biggest challenge was ...", "I had no idea how to ...", "If I could go back, I would have ...", "It taught me that ..."]
});

CONTENT.writing.push({
  id: "wr-story-memorable-place",
  type: "story",
  title: "Um lugar que marcou você",
  level: "C1",
  prompt_en: "Write a personal narrative about a place (a city, a building, a natural landscape) that had a strong impact on you. Bring the reader there: describe the atmosphere, the people and a specific moment, and reflect on why it stayed with you.",
  prompt_pt: "Escreva uma narrativa pessoal sobre um lugar (cidade, edifício, paisagem) que te marcou. Leve o leitor até lá: descreva a atmosfera, as pessoas e um momento específico, e reflita sobre por que ficou na sua memória.",
  minWords: 150, maxWords: 250,
  tips_pt: ["Comece no meio da cena para prender o leitor.", "Use os cinco sentidos (sons, cheiros, luz).", "Misture tempos verbais com intenção (past perfect para o antes).", "Feche com uma reflexão, não com um resumo."],
  useful: ["The first thing that struck me was ...", "I'll never forget the moment when ...", "The air smelled of ...", "I'd never seen anything quite like it.", "It wasn't until later that I realized ...", "To this day, whenever I ..., I think of ..."]
});

CONTENT.writing.push({
  id: "wr-tech-concrete-slab",
  type: "technical",
  title: "Explicar a concretagem de uma laje",
  level: "B2",
  prompt_en: "Explain to a non-engineer, step by step, how a reinforced concrete slab is poured on a small residential building: from checking the formwork and rebar to curing the concrete. Use simple, clear language.",
  prompt_pt: "Explique a um leigo, passo a passo, como se concreta uma laje de concreto armado em uma obra residencial pequena: da conferência das formas e armaduras até a cura do concreto. Use linguagem simples e clara.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Use a voz passiva para processos (the concrete is poured).", "Numere ou use sequenciadores: first, next, after that, finally.", "Explique termos técnicos rapidamente entre vírgulas.", "Diga por que cada etapa importa."],
  useful: ["First of all, the formwork and rebar are checked to make sure ...", "Next, the concrete is poured and spread evenly.", "It's then compacted with a vibrator to remove air bubbles.", "After that, the surface is leveled and finished.", "Finally, the slab has to be kept wet for at least seven days so that it cures properly.", "This step is important because ..."]
});

CONTENT.writing.push({
  id: "wr-tech-inspection-report",
  type: "technical",
  title: "Relatório curto de vistoria",
  level: "C1",
  prompt_en: "You inspected a two-story house before it was sold and found cracks in some walls, signs of moisture in the bathroom and a problem with the roof drainage. Write a short inspection report with: purpose, findings, likely causes, risk level and recommendations.",
  prompt_pt: "Você vistoriou uma casa de dois pavimentos antes da venda e encontrou fissuras em algumas paredes, sinais de umidade no banheiro e problema na drenagem do telhado. Escreva um relatório curto com: objetivo, constatações, causas prováveis, nível de risco e recomendações.",
  minWords: 150, maxWords: 250,
  tips_pt: ["Use títulos curtos: Purpose, Findings, Recommendations.", "Seja objetivo e impessoal (it was observed that).", "Diferencie fato observado de hipótese (appears to, is likely).", "Recomendações com verbos no imperativo ou should."],
  useful: ["The purpose of this inspection was to assess ...", "Diagonal cracks were observed near ...", "This appears to be caused by ...", "The issue does not pose an immediate structural risk; however, ...", "It is recommended that ...", "Further investigation is required to ..."]
});

CONTENT.writing.push({
  id: "wr-tech-design-decision",
  type: "technical",
  title: "Justificar uma decisão de projeto",
  level: "C1",
  prompt_en: "Your client wanted a flat concrete roof, but you recommended a pitched metal roof with thermal insulation for their house in a hot and rainy region. Write a short memo justifying your decision, comparing cost, maintenance, thermal comfort and drainage.",
  prompt_pt: "Seu cliente queria laje plana impermeabilizada, mas você recomendou telhado metálico inclinado com isolamento térmico para a casa numa região quente e chuvosa. Escreva um memorando curto justificando a decisão, comparando custo, manutenção, conforto térmico e drenagem.",
  minWords: 150, maxWords: 250,
  tips_pt: ["Apresente as duas opções de forma justa antes de concluir.", "Use comparativos (more cost-effective, far less likely to).", "Use dados aproximados para dar credibilidade.", "Reconheça a preferência estética do cliente e ofereça alternativa."],
  useful: ["After comparing both options, we recommend ...", "While a flat roof offers ..., it tends to ...", "In terms of maintenance, ...", "Given the local climate, ...", "This option is far more cost-effective in the long run.", "If appearance is a priority, we could ..."]
});

CONTENT.writing.push({
  id: "wr-desc-hometown",
  type: "description",
  title: "Descrever a sua cidade",
  level: "B2",
  prompt_en: "Describe your hometown to a foreign friend who is planning to visit. Talk about its size, location, climate, what people do there, and two places they shouldn't miss.",
  prompt_pt: "Descreva sua cidade para um amigo estrangeiro que planeja visitá-la. Fale do tamanho, localização, clima, o que as pessoas fazem lá e dois lugares imperdíveis.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Use adjetivos variados (laid-back, lively, surrounded by).", "Dê números para dar ideia de escala.", "Faça recomendações diretas (you should, make sure you).", "Inclua um detalhe cultural (comida, festa)."],
  useful: ["My hometown is a small city in the ... of Brazil.", "It's surrounded by ...", "The weather is hot most of the year, with ...", "Most people make a living from ...", "If you come, make sure you try ...", "It's not a tourist spot, but it has its own charm."]
});

CONTENT.writing.push({
  id: "wr-desc-dream-house",
  type: "description",
  title: "Descrever a casa ideal (projeto)",
  level: "B2",
  prompt_en: "Describe a house you would like to design for yourself. Include the layout, the number of rooms, materials, special features and how the house would deal with the local climate.",
  prompt_pt: "Descreva uma casa que você gostaria de projetar para si mesmo. Inclua a distribuição dos ambientes, número de cômodos, materiais, recursos especiais e como a casa lidaria com o clima local.",
  minWords: 80, maxWords: 150,
  tips_pt: ["Organize do geral para o detalhe (térreo, depois cômodos).", "Use would para o hipotético.", "Use preposições de lugar (next to, facing, at the back).", "Cite materiais e soluções de conforto térmico."],
  useful: ["It would be a single-story house with ...", "The living room would open onto ...", "At the back, there would be ...", "I'd use ... because it ...", "To keep it cool, ...", "My favorite feature would be ..."]
});
