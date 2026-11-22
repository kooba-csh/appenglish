window.CONTENT = window.CONTENT || { decks: [] };
CONTENT.readings = CONTENT.readings || [];

CONTENT.readings.push({
  id: "rd-hot-weather-concrete",
  title: "Pouring Concrete When the Heat Is On",
  level: "B2",
  topic: "engenharia",
  text: "Anyone who has worked on a construction site in a tropical summer knows the feeling: it's barely nine in the morning, the thermometer is already climbing past 32 degrees, and a truck full of fresh concrete is pulling up to the gate. At that moment, the clock is ticking, and every minute counts.\n\nHeat is one of concrete's worst enemies. When temperatures rise, the cement reacts with water faster than normal, so the mix starts to stiffen before the crew has time to place and finish it. At the same time, the sun and the wind pull water out of the surface. The result is a familiar list of problems: plastic shrinkage cracks, cold joints, a weaker surface and, in the long run, lower durability.\n\nThe good news is that most of these problems can be headed off with planning. Experienced engineers start by thinking about timing. Pouring early in the morning, or even at night, is often the simplest way to avoid the worst of the heat. Some contractors also cool the mix itself, using chilled water or ice in place of part of the mixing water, and they keep the aggregate stockpiles in the shade.\n\nOn site, preparation makes a huge difference. Formwork and rebar should be sprayed with water before the pour, because a hot, dry surface will soak up moisture from the fresh concrete. Wind barriers and sunshades can help, and a set retarder may be added to the mix to buy the team some extra time. The crew should be large enough to keep up with the delivery rate, so trucks don't wait in the sun with their drums turning.\n\nAfter the pour, the job is far from over. Curing is where many projects cut corners, and it shows years later. The concrete needs to stay moist for at least seven days, whether by wet burlap, curing compounds or plastic sheets. Skipping this step to save a few hours of labor is a classic false economy.\n\nIn the end, hot-weather concreting is not about heroic effort. It's about doing the boring things right: checking the forecast, talking to the supplier the day before, and making sure everyone knows the plan. As one site manager likes to say, the concrete doesn't care how busy you are.",
  glossary: [
    { term: "the clock is ticking", pt: "o tempo está correndo", meaning: "there is little time left to do something" },
    { term: "stiffen", pt: "endurecer, enrijecer", meaning: "to become firm and less easy to move or shape" },
    { term: "headed off", pt: "evitados, prevenidos", meaning: "stopped before they happen (head off)" },
    { term: "stockpiles", pt: "pilhas de estoque (de agregado)", meaning: "large amounts of material stored for later use" },
    { term: "set retarder", pt: "aditivo retardador de pega", meaning: "a chemical that slows down the hardening of concrete" },
    { term: "keep up with", pt: "acompanhar o ritmo de", meaning: "to move or work at the same speed as something" },
    { term: "cut corners", pt: "economizar de forma irresponsável, fazer de qualquer jeito", meaning: "to do something badly to save time or money" },
    { term: "false economy", pt: "falsa economia", meaning: "a saving that costs more in the long run" }
  ],
  questions: [
    { q: "According to the text, why does heat cause problems for fresh concrete?", options: ["It makes the aggregate expand and crack", "It speeds up the reaction of cement and dries out the surface", "It makes the concrete too liquid to finish", "It damages the steel inside the formwork"], answer: 1, explain_pt: "O texto diz que o cimento reage mais rápido com a água e que o sol e o vento retiram água da superfície." },
    { q: "Which of these is NOT mentioned as a way to cool the mix?", options: ["Using chilled water", "Replacing part of the water with ice", "Keeping aggregate in the shade", "Adding cold sand at the end of mixing"], answer: 3, explain_pt: "Água gelada, gelo e agregado na sombra são citados; areia fria adicionada no final não aparece no texto." },
    { q: "What can we infer about projects where curing is skipped?", options: ["They may show durability problems years later", "They are usually finished more safely", "They always fail inspection immediately", "They need less formwork"], answer: 0, explain_pt: "O autor diz que muitos projetos economizam na cura 'and it shows years later' — ou seja, os problemas aparecem depois." },
    { q: "In the text, 'buy the team some extra time' means:", options: ["pay workers overtime", "hire more people for the pour", "give the team more time before the concrete hardens", "delay the delivery of the trucks"], answer: 2, explain_pt: "'Buy time' é ganhar tempo; o retardador atrasa a pega e dá mais tempo à equipe." },
    { q: "What is the author's main purpose in the last paragraph?", options: ["To praise the hard work of site crews", "To stress that success depends on simple, careful planning", "To criticize concrete suppliers", "To explain a new technology"], answer: 1, explain_pt: "O último parágrafo resume a ideia: não é esforço heroico, é fazer bem as coisas 'chatas' (planejar, conferir, comunicar)." }
  ],
  discussion: "Think about a hot-weather pour you have seen or managed. What went well, and what would you do differently?"
});

CONTENT.readings.push({
  id: "rd-bim-beyond-3d",
  title: "BIM Is Not a Drawing Tool",
  level: "C1",
  topic: "engenharia",
  text: "Ask a room full of architects and engineers what BIM is, and you'll get a surprising range of answers. For some, it's simply the software they draw in. For others, it's a buzzword that consultants throw around to justify higher fees. Both views miss the point, and the gap between them goes a long way towards explaining why so many firms invest heavily in Building Information Modeling and come away disappointed.\n\nAt its core, BIM is less about geometry than about information. A wall in a well-built model is not just two parallel lines; it knows what it's made of, how thick each layer is, what fire rating it carries and which room it belongs to. Once that information is in place, quantities, schedules and clash reports become by-products rather than separate tasks. The drawing, in other words, is the output, not the point.\n\nThe trouble is that many offices adopt the software without rethinking the workflow. They hire a Revit operator, ask for the same plans they used to produce in CAD, and wonder why productivity drops. Without shared standards, naming conventions and templates, every project ends up being modeled in a slightly different way, and the data becomes unreliable. A model that nobody trusts is, for all intents and purposes, just an expensive 3D sketch.\n\nFirms that get it right tend to share a few traits. They treat their template as a living asset, refined after every job rather than set in stone. They agree, early on, on what level of detail each discipline will deliver and when. And crucially, they automate the repetitive work, from numbering sheets to filling title blocks, so that skilled people can focus on design decisions instead of clerical chores.\n\nSmaller practices often assume this is a game only big players can afford. In reality, they may have the edge. A two-person office can change its standards over a weekend, whereas a large firm may need months of meetings to agree on a single parameter name. With a handful of well-written scripts, a small team can punch well above its weight.\n\nNone of this happens overnight. But the firms that stop seeing BIM as a fancier way to draw, and start seeing it as a way to manage information, are the ones reaping the rewards.",
  glossary: [
    { term: "buzzword", pt: "palavra da moda", meaning: "a fashionable word used to sound impressive" },
    { term: "throw around", pt: "usar à toa, ficar repetindo", meaning: "to use words casually or without much thought" },
    { term: "goes a long way towards", pt: "contribui muito para", meaning: "helps a lot to achieve or explain something" },
    { term: "by-products", pt: "subprodutos", meaning: "things produced as a side result of another process" },
    { term: "for all intents and purposes", pt: "na prática, para todos os efeitos", meaning: "in effect; in every important way" },
    { term: "set in stone", pt: "imutável, gravado em pedra", meaning: "fixed and impossible to change" },
    { term: "edge", pt: "vantagem", meaning: "an advantage over others" },
    { term: "punch well above its weight", pt: "render muito além do esperado para o tamanho", meaning: "to achieve more than expected for its size" },
    { term: "reaping the rewards", pt: "colhendo os frutos", meaning: "getting the benefits of earlier effort" }
  ],
  questions: [
    { q: "What is the author's main argument about BIM?", options: ["It is mostly marketing invented by consultants", "It only works for very large firms", "Its real value lies in managing information, not drawing", "It should replace architects in the design process"], answer: 2, explain_pt: "O texto repete que BIM é 'less about geometry than about information' e termina dizendo que deve ser visto como gestão de informação." },
    { q: "Why, according to the text, does productivity often drop after firms adopt BIM?", options: ["They adopt the software without changing workflows or standards", "The software is too expensive to maintain", "Clients refuse to accept 3D models", "Operators are not paid enough"], answer: 0, explain_pt: "O terceiro parágrafo diz que muitos escritórios adotam o software 'without rethinking the workflow'." },
    { q: "What does the author suggest about a firm's template?", options: ["It should be bought from a large company", "It should never be changed once approved", "It matters less than the hardware used", "It should be improved continuously after each project"], answer: 3, explain_pt: "'A living asset, refined after every job rather than set in stone' — ou seja, deve ser melhorado continuamente." },
    { q: "In the fifth paragraph, 'they may have the edge' suggests that small offices:", options: ["are at greater risk", "might actually have an advantage", "are close to giving up", "cannot compete with big firms"], answer: 1, explain_pt: "'Have the edge' significa ter vantagem; o autor argumenta que escritórios pequenos mudam padrões mais rápido." },
    { q: "What can be inferred about the author's attitude towards automation?", options: ["It is risky and should be avoided", "It is only useful for big firms", "It frees skilled people for more valuable work", "It is a temporary trend"], answer: 2, explain_pt: "O autor diz que automatizar tarefas repetitivas permite que pessoas qualificadas foquem em decisões de projeto." }
  ],
  discussion: "How do you use information in your own models or projects? What repetitive task would you automate first, and why?"
});

CONTENT.readings.push({
  id: "rd-site-safety-culture",
  title: "Safety Is a Habit, Not a Sign",
  level: "B2",
  topic: "engenharia",
  text: "Walk onto almost any construction site and you'll see the signs: 'Hard hats required', 'Danger: work at height', 'Safety first'. They're bright, they're big, and, if we're honest, most people stopped reading them a long time ago. Signs are important, but they don't change behavior on their own. Real safety comes from culture, and culture is built one small decision at a time.\n\nThink about how accidents usually happen. It's rarely a dramatic failure. More often, it's a worker who doesn't clip on his harness because he only needs to reach one more bolt, or a scaffold that someone puts up in a hurry because the crew is behind schedule. Each shortcut seems harmless, and most of the time nothing goes wrong. That's exactly the problem: people get used to taking risks, and the risk starts to feel normal.\n\nSo how do you turn things around? First, leaders have to set the example. If the site engineer walks around without a helmet, no speech in the world will convince the crew to wear theirs. Workers watch what managers do far more closely than they listen to what managers say.\n\nSecond, people need to feel safe to speak up. On many sites, the newest or youngest worker sees a problem but keeps quiet, afraid of looking slow or causing trouble. Good teams make it clear that stopping the job to point out a hazard is a sign of professionalism, not weakness. Some companies even reward the person who reports the most near misses each month.\n\nThird, safety talks should be short and specific. A ten-minute meeting at the start of the day about today's real tasks, such as the crane lift at eleven or the excavation next to the road, is worth more than an hour-long lecture about general rules that everyone has heard before.\n\nFinally, it pays to look into every near miss as seriously as an accident. A falling hammer that lands a meter away from someone is not good luck; it's a free lesson. Teams that learn from these moments are the ones that go home in one piece, every single day.",
  glossary: [
    { term: "clip on", pt: "prender, engatar (o cinto)", meaning: "to attach something with a clip" },
    { term: "harness", pt: "cinto de segurança tipo paraquedista", meaning: "a set of straps that keeps a worker attached to a safe point" },
    { term: "puts up", pt: "monta, ergue", meaning: "builds or assembles a structure (put up)" },
    { term: "behind schedule", pt: "atrasado no cronograma", meaning: "later than planned" },
    { term: "turn things around", pt: "mudar a situação, reverter", meaning: "to change a bad situation into a good one" },
    { term: "speak up", pt: "falar, se manifestar", meaning: "to say what you think, especially about a problem" },
    { term: "near misses", pt: "quase-acidentes", meaning: "events that almost caused an accident" },
    { term: "look into", pt: "investigar", meaning: "to examine or investigate something" },
    { term: "in one piece", pt: "inteiro, são e salvo", meaning: "without being hurt" }
  ],
  questions: [
    { q: "What is the main idea of the text?", options: ["Construction sites need more warning signs", "Accidents are usually caused by faulty equipment", "Safety meetings should last at least an hour", "Safety depends on daily behavior and culture, not just rules and signs"], answer: 3, explain_pt: "Logo no início: 'Real safety comes from culture, and culture is built one small decision at a time.'" },
    { q: "According to the text, why do small shortcuts become dangerous?", options: ["They are always illegal", "People get used to the risk because nothing usually happens", "Managers encourage them", "They make the work slower"], answer: 1, explain_pt: "O texto diz que, como quase sempre nada dá errado, as pessoas se acostumam e o risco parece normal." },
    { q: "What can we infer about workers who see a site engineer without a helmet?", options: ["They will report him to the company", "They will feel safer", "They will probably not take helmet rules seriously", "They will ask for a safety talk"], answer: 2, explain_pt: "O autor diz que os trabalhadores observam o que os gestores fazem; logo, tendem a não levar a regra a sério." },
    { q: "In the last paragraph, 'it's a free lesson' means that a near miss:", options: ["is a chance to learn without anyone getting hurt", "should be ignored because no one was injured", "costs the company nothing", "must be reported to the police"], answer: 0, explain_pt: "Um quase-acidente ensina algo sem o 'custo' de alguém se ferir — por isso é uma lição gratuita." },
    { q: "Why does the author mention the crane lift and the excavation?", options: ["To show that cranes are the main danger", "To criticize the site manager", "To explain a new law", "To give examples of specific, real tasks for short safety talks"], answer: 3, explain_pt: "São exemplos de tarefas concretas do dia, que tornam o DDS curto e específico mais útil." }
  ],
  discussion: "What is one thing you could change on your sites tomorrow to improve safety culture? Explain how you would do it."
});

CONTENT.readings.push({
  id: "rd-raising-your-rates",
  title: "How to Raise Your Prices Without Losing Clients",
  level: "B2",
  topic: "trabalho",
  text: "If you work for yourself, there's one conversation you probably dread more than any other: telling a client that your prices are going up. Many freelancers and small business owners put it off for years, charging the same fee while their costs, their experience and their skills keep growing. Eventually, they end up overworked and underpaid, and they can't figure out where things went wrong.\n\nThe first step is to change the way you see the issue. A price increase is not a favor you're asking for; it's a normal part of doing business. Fuel, software licenses and rent go up every year, and your clients know it. Most reasonable people expect a professional's prices to follow the same path.\n\nTiming matters, too. The best moment to bring it up is not in the middle of a stressful project or right after a mistake. Instead, choose a calm period, ideally after delivering something the client was happy with. Give them plenty of notice, at least a month, so they can plan their budget and don't feel caught off guard.\n\nWhen you write the message, keep it short and confident. You don't need to apologize or write three paragraphs of excuses. A simple structure works well: thank them for the partnership, state the new price and the date it starts, and briefly mention the value you bring, such as faster turnaround, new tools or extra services. Avoid phrases like 'I hope this is okay', which sound as if you're asking for permission.\n\nWhat if a client pushes back? Listen, and don't panic. Sometimes you can offer a middle ground, like keeping the old price for one more month or reducing the scope of the work. But be prepared for the possibility that some clients will walk away. That's not always a disaster. Losing one client who pays too little can free up time for two who value your work properly.\n\nIn the long run, clients tend to respect professionals who respect their own time. Raising your prices, done the right way, isn't just about money. It's a signal that you take your business seriously, and it often encourages others to do the same.",
  glossary: [
    { term: "dread", pt: "temer, ter pavor de", meaning: "to feel very worried about something that will happen" },
    { term: "put it off", pt: "adiar", meaning: "to delay doing something" },
    { term: "figure out", pt: "descobrir, entender", meaning: "to understand or solve something" },
    { term: "bring it up", pt: "tocar no assunto", meaning: "to start talking about a subject" },
    { term: "caught off guard", pt: "pego de surpresa", meaning: "surprised because you were not prepared" },
    { term: "turnaround", pt: "prazo de entrega, tempo de resposta", meaning: "the time needed to complete a job" },
    { term: "pushes back", pt: "resiste, contesta", meaning: "argues against or resists something (push back)" },
    { term: "middle ground", pt: "meio-termo", meaning: "a compromise between two positions" },
    { term: "walk away", pt: "ir embora, desistir do acordo", meaning: "to leave a deal or relationship" }
  ],
  questions: [
    { q: "What is the main message of the text?", options: ["Raising prices is normal and can be done professionally", "Freelancers should never lose a client", "Clients usually refuse price increases", "Small businesses should lower their costs"], answer: 0, explain_pt: "O texto inteiro defende que aumentar preços é parte normal do negócio e mostra como fazer isso bem." },
    { q: "According to the author, when is a bad time to talk about a price increase?", options: ["After a successful delivery", "During a calm period", "In the middle of a stressful project", "A month before the change"], answer: 2, explain_pt: "O autor diz que o pior momento é no meio de um projeto estressante ou logo após um erro." },
    { q: "Why does the author recommend avoiding 'I hope this is okay'?", options: ["It is too informal", "It sounds like you're asking for permission", "It is grammatically wrong", "It is too long"], answer: 1, explain_pt: "O texto diz que essas frases soam como se você estivesse pedindo permissão, o que enfraquece a mensagem." },
    { q: "In the text, 'some clients will walk away' means they will:", options: ["visit your office", "pay more than expected", "recommend you to friends", "stop working with you"], answer: 3, explain_pt: "'Walk away' aqui é desistir da relação comercial, deixar de ser cliente." },
    { q: "What can we infer from the sentence about losing one client and gaining two?", options: ["Losing a low-paying client can be an opportunity", "Freelancers always find new clients quickly", "Clients who pay little are dishonest", "It is better to work with fewer clients in general"], answer: 0, explain_pt: "A ideia é que perder um cliente que paga pouco libera tempo para clientes melhores — uma oportunidade." }
  ],
  discussion: "Have you ever had to raise your prices or ask for more money? How did you handle it, or how would you handle it now?"
});

CONTENT.readings.push({
  id: "rd-career-portfolio",
  title: "The Rise of the Portfolio Career",
  level: "C1",
  topic: "trabalho",
  text: "For most of the twentieth century, the ideal career followed a fairly predictable script. You picked a profession, joined a company, climbed the ladder and, with a bit of luck, retired with a watch and a pension. Changing direction halfway through was seen as a sign that something had gone wrong. Today, that script looks increasingly out of date.\n\nA growing number of professionals are opting instead for what has been dubbed a 'portfolio career': a mix of several income streams that may include consulting, part-time employment, teaching, freelance projects and even a small business on the side. Rather than putting all their eggs in one basket, they spread their time and skills across different activities, each feeding into the others.\n\nThe appeal is easy to understand. A portfolio career offers variety, a degree of independence and, paradoxically, a certain kind of security. If one client cuts back or one sector goes through a rough patch, the others can keep things afloat. Many people also find that the combination is more stimulating than any single job; an engineer who teaches, for instance, often becomes better at explaining things to clients, and vice versa.\n\nThat said, it would be naïve to paint too rosy a picture. Juggling multiple commitments demands a level of self-discipline that many underestimate. Deadlines collide, invoices pile up and the line between work and rest can blur to the point of disappearing. Without a clear system for organizing tasks, what starts as freedom can quickly turn into a permanent state of mild panic.\n\nThere is also the question of identity. When someone asks 'So, what do you do?', a portfolio worker may struggle to come up with a neat answer. For some, this is liberating; for others, it's a source of quiet anxiety, a feeling of never fully belonging to any one professional community.\n\nThose who make it work tend to treat their career as a business in its own right. They set boundaries, keep track of where their time and money actually go, and periodically drop the activities that no longer pull their weight. In a labor market that rewards adaptability, that mindset may turn out to be the most valuable skill of all.",
  glossary: [
    { term: "climbed the ladder", pt: "subiu na carreira", meaning: "moved up to higher positions in an organization" },
    { term: "dubbed", pt: "apelidado, chamado de", meaning: "given a particular name or description" },
    { term: "putting all their eggs in one basket", pt: "colocar todos os ovos na mesma cesta", meaning: "depending completely on one thing" },
    { term: "rough patch", pt: "fase difícil", meaning: "a difficult period" },
    { term: "afloat", pt: "à tona, funcionando financeiramente", meaning: "able to survive, especially financially" },
    { term: "paint too rosy a picture", pt: "pintar um quadro otimista demais", meaning: "to describe something as better than it really is" },
    { term: "juggling", pt: "conciliando, fazendo malabarismo", meaning: "managing several activities at the same time" },
    { term: "pile up", pt: "acumular-se", meaning: "to increase in quantity, often in an unwelcome way" },
    { term: "pull their weight", pt: "fazer sua parte, compensar", meaning: "to contribute a fair share" }
  ],
  questions: [
    { q: "How was changing careers halfway through generally seen in the past?", options: ["As a smart financial move", "As a sign that something had gone wrong", "As a requirement for promotion", "As common among engineers"], answer: 1, explain_pt: "O primeiro parágrafo diz que mudar de direção era visto como sinal de que algo tinha dado errado." },
    { q: "Why does the author say a portfolio career offers 'paradoxically' a kind of security?", options: ["Because several income streams reduce dependence on any single one", "Because portfolio workers earn much more", "Because the government protects freelancers", "Because companies prefer to hire them"], answer: 0, explain_pt: "É paradoxal porque parece instável, mas se uma fonte de renda cai, as outras mantêm a pessoa." },
    { q: "Which of the following is NOT presented as a challenge of portfolio careers?", options: ["Colliding deadlines", "A blurred line between work and rest", "Difficulty describing one's job", "Being forced to retire early"], answer: 3, explain_pt: "Prazos, limite trabalho/descanso e identidade são citados; aposentadoria precoce não aparece." },
    { q: "In the final paragraph, activities that 'no longer pull their weight' are ones that:", options: ["are physically demanding", "are too popular", "no longer contribute enough to justify the effort", "require heavy equipment"], answer: 2, explain_pt: "'Pull one's weight' é fazer sua parte; atividades que não compensam mais o esforço são abandonadas." },
    { q: "What is the author's overall attitude toward portfolio careers?", options: ["Completely enthusiastic", "Balanced: positive but aware of real drawbacks", "Strongly negative", "Indifferent"], answer: 1, explain_pt: "O autor mostra vantagens, mas diz que seria ingênuo pintar um quadro só positivo — postura equilibrada." }
  ],
  discussion: "Do you see your own work as a portfolio career? What are the advantages and the biggest challenge for you?"
});

CONTENT.readings.push({
  id: "rd-slow-travel",
  title: "Why I Stopped Trying to See Everything",
  level: "B2",
  topic: "viagem",
  text: "On my first trip to Europe, I visited six countries in twelve days. I have hundreds of photos to prove it, and I barely remember any of it. Most of what comes back to me is train stations, hotel check-ins and the constant feeling that I was running late for something. When I got home, a friend asked me what my favorite place had been. I honestly couldn't say.\n\nThat trip was a turning point. Since then, I've been trying a different approach, often called 'slow travel'. The idea is simple: fewer places, more time in each. Instead of rushing through a checklist of famous sights, you settle into one town or neighborhood for a week or more, and let the place reveal itself little by little.\n\nAt first, it felt like a waste. Why stay five days in a small coastal town when there's a world-famous city just two hours away? But something interesting happened by the third day. The man at the bakery started saying good morning. I figured out which bus actually went where I needed. I found a tiny restaurant that never appears in any guide, where the owner talked me into trying a dish I couldn't even pronounce. I wasn't a tourist passing through anymore; I was, for a short while, part of the scenery.\n\nSlow travel also tends to be cheaper. Weekly rentals usually cost less per night than hotels, and when you have a kitchen, you don't need to eat out three times a day. You spend less on transport because you're not jumping on a train every other morning. And you come back rested, rather than needing a vacation from your vacation.\n\nOf course, it's not for everyone. If you only have a few days off a year, it's natural to want to make the most of them. But even on a short trip, you can slow down a little: pick two cities instead of four, leave an afternoon with no plans, sit in a square and watch life go by.\n\nThese days, my photo albums are much smaller. But ask me about any trip from the last five years, and I'll talk your ear off.",
  glossary: [
    { term: "running late", pt: "atrasado", meaning: "later than you should be" },
    { term: "turning point", pt: "ponto de virada", meaning: "a moment when an important change happens" },
    { term: "settle into", pt: "se instalar, se acostumar a", meaning: "to become comfortable in a new place" },
    { term: "talked me into", pt: "me convenceu a", meaning: "persuaded me to do something" },
    { term: "passing through", pt: "de passagem", meaning: "visiting a place briefly on the way to another" },
    { term: "eat out", pt: "comer fora", meaning: "to eat in a restaurant" },
    { term: "make the most of", pt: "aproveitar ao máximo", meaning: "to use something in the best possible way" },
    { term: "talk your ear off", pt: "falar sem parar", meaning: "to talk to someone for a very long time" }
  ],
  questions: [
    { q: "What was the main problem with the author's first trip to Europe?", options: ["It was too expensive", "The trains were always late", "It was so rushed that he remembers very little", "He didn't take enough photos"], answer: 2, explain_pt: "Ele visitou seis países em doze dias e diz que quase não lembra de nada." },
    { q: "Which benefit of slow travel is NOT mentioned?", options: ["Lower accommodation costs", "Spending less on transport", "Coming back more rested", "Learning the local language fluently"], answer: 3, explain_pt: "Hospedagem mais barata, menos transporte e voltar descansado são citados; fluência no idioma não." },
    { q: "What does the author mean by 'part of the scenery'?", options: ["He felt like a local, not just a visitor", "He was photographed by tourists", "He worked at the restaurant", "He got lost in the town"], answer: 0, explain_pt: "Ele deixou de ser turista de passagem e passou a fazer parte do lugar, como um morador." },
    { q: "'A vacation from your vacation' suggests that fast trips can:", options: ["be very relaxing", "leave you exhausted", "be cheaper than expected", "last too long"], answer: 1, explain_pt: "A expressão brinca com a ideia de precisar descansar depois de uma viagem cansativa." },
    { q: "Why does the author include advice for people with only a few days off?", options: ["To say slow travel is impossible for them", "To sell a travel package", "To show that the idea can be adapted to short trips too", "To criticize people who travel quickly"], answer: 2, explain_pt: "Ele reconhece a limitação e sugere desacelerar um pouco mesmo em viagens curtas." }
  ],
  discussion: "Do you prefer to see many places quickly or to stay longer in one place? Describe a trip that shows your preference."
});

CONTENT.readings.push({
  id: "rd-missed-connection",
  title: "Surviving a Missed Connection",
  level: "B2",
  topic: "viagem",
  text: "It's every traveler's nightmare. Your first flight takes off forty minutes late, the pilot promises to make up time in the air, and you land with exactly twelve minutes to catch your connection, at a gate on the other side of a huge airport. You run, you sweat, you arrive just in time to see the door close. Now what?\n\nFirst of all, don't waste energy arguing with the gate agent. The plane is gone, and shouting won't bring it back. Instead, take a deep breath and act quickly, because you're probably not the only passenger in this situation, and seats on the next flights will fill up fast.\n\nThe smartest move is often to do two things at once. Get in line at the transfer desk, and while you wait, call the airline or open its app. In many cases, the app will already have rebooked you automatically, and you can check whether the new option makes sense. If it doesn't, an agent on the phone may sort it out before you even reach the front of the line.\n\nWhen you speak to someone, be polite but clear. Explain that you missed the connection because of the delay on the first flight, not because you showed up late. That detail matters. If the airline caused the problem, it's usually responsible for getting you to your destination and, depending on the country and the length of the delay, it may have to provide meals, a hotel room or even financial compensation. Ask about these things directly; they're rarely offered unless you bring them up.\n\nKeep every document: boarding passes, receipts for food and transport, and screenshots of delay notifications. If you end up claiming compensation later, this paper trail will make the process much easier.\n\nFinally, a few habits can save you from this headache in the first place. When booking, avoid very short connections, especially in big airports or when you need to change terminals. Travel with a small bag you can carry on, so your luggage doesn't get lost along the way. And always keep a charger, a snack and a bit of patience in your backpack. You may not need them, but if you do, you'll be glad they're there.",
  glossary: [
    { term: "make up time", pt: "recuperar o tempo perdido", meaning: "to go faster to reduce a delay" },
    { term: "gate agent", pt: "atendente do portão de embarque", meaning: "an airline employee who works at the boarding gate" },
    { term: "fill up", pt: "lotar, encher", meaning: "to become full" },
    { term: "rebooked", pt: "remarcado", meaning: "given a new reservation on a different flight" },
    { term: "sort it out", pt: "resolver isso", meaning: "to solve a problem" },
    { term: "showed up", pt: "chegou, apareceu", meaning: "arrived somewhere (show up)" },
    { term: "paper trail", pt: "registro documental, comprovantes", meaning: "documents that prove what happened" },
    { term: "carry on", pt: "levar na cabine (bagagem de mão)", meaning: "to take a bag with you onto the plane" }
  ],
  questions: [
    { q: "What does the author recommend doing first after missing a connection?", options: ["Complaining to the gate agent", "Going to a hotel", "Waiting for the airline to call", "Staying calm and acting quickly"], answer: 3, explain_pt: "O texto diz para não discutir com o atendente, respirar fundo e agir rápido." },
    { q: "Why is it smart to call the airline while waiting in line?", options: ["Calls are cheaper than desks", "The desk only speaks English", "An agent might solve the problem before you reach the desk", "The app doesn't work in airports"], answer: 2, explain_pt: "Enquanto você espera na fila, um atendente por telefone pode já resolver a remarcação." },
    { q: "Why is it important to explain that the first flight was delayed?", options: ["To get a seat upgrade", "Because the airline may then be responsible for meals, hotels or compensation", "Because the gate agent needs it for statistics", "To avoid paying for luggage"], answer: 1, explain_pt: "Se a companhia causou o problema, ela costuma ser responsável por assistência e possível compensação." },
    { q: "In the text, 'paper trail' refers to:", options: ["documents and records that prove what happened", "a path inside the airport", "the airline's printed timetable", "a type of boarding pass"], answer: 0, explain_pt: "'Paper trail' são os comprovantes (cartões de embarque, recibos, prints) que documentam o ocorrido." },
    { q: "What is the purpose of the last paragraph?", options: ["To describe the author's worst trip", "To criticize big airports", "To recommend a specific airline", "To give tips for avoiding the problem in the future"], answer: 3, explain_pt: "O último parágrafo dá dicas preventivas: conexões mais longas, bagagem de mão, carregador etc." }
  ],
  discussion: "Describe a problem you had while traveling (or one you fear). How did you, or how would you, deal with it?"
});

CONTENT.readings.push({
  id: "rd-ai-coworker",
  title: "My New Coworker Never Sleeps",
  level: "B2",
  topic: "tecnologia",
  text: "A year ago, I was skeptical about AI assistants. I'd seen the headlines promising that they would either replace us all or solve every problem in the world, and I assumed the truth was somewhere in between, probably closer to 'not very useful'. Then my manager asked the whole team to try one for a month. I went along with it, mostly to avoid an argument. I haven't looked back since.\n\nThe first surprise was how much time I'd been wasting on small, boring tasks. Writing the same type of email five times a day, turning meeting notes into a tidy summary, reformatting a messy spreadsheet: none of these jobs is hard, but together they ate up hours every week. Now I hand them off to the assistant, check the result, and move on.\n\nThe second surprise was that it's genuinely helpful when I'm stuck. If I can't remember the right formula, or I need to explain a technical idea to a client who isn't an expert, I ask for a few options and pick the one that fits. It's like having a colleague who is always available and never gets tired of questions.\n\nThat said, I've learned the hard way that it's not perfect. Early on, I copied a figure from one of its answers straight into a report without checking it. The number was completely made up. My boss spotted it before the report went out, but it was embarrassing. Since then, I treat the assistant like a smart intern: fast, enthusiastic and occasionally wrong with total confidence.\n\nThere are also things I simply don't hand over. Anything involving confidential client data stays out of it, unless the company has approved the tool for that use. And final decisions, especially the ones that involve people or money, are still mine.\n\nSo, is AI going to take my job? I don't think so, at least not yet. But I've noticed that colleagues who refuse to use it are falling behind. The skill that matters now isn't just knowing your field; it's knowing how to work alongside a tool that is very good at some things and surprisingly bad at others.",
  glossary: [
    { term: "went along with", pt: "aceitei, concordei (sem muita vontade)", meaning: "agreed to something, often without enthusiasm" },
    { term: "looked back", pt: "olhei para trás, me arrependi", meaning: "thought about the past (often: never regretted a change)" },
    { term: "ate up", pt: "consumiam, devoravam", meaning: "used a large amount of something, like time" },
    { term: "hand them off", pt: "passo adiante, delego", meaning: "to give a task to someone else" },
    { term: "stuck", pt: "travado, sem saber como continuar", meaning: "unable to continue or solve a problem" },
    { term: "the hard way", pt: "do jeito difícil, sofrendo", meaning: "through a bad or painful experience" },
    { term: "made up", pt: "inventado", meaning: "invented; not true" },
    { term: "spotted", pt: "percebeu, notou", meaning: "noticed something" },
    { term: "falling behind", pt: "ficando para trás", meaning: "failing to keep up with others" }
  ],
  questions: [
    { q: "How did the author feel about AI assistants at the beginning?", options: ["Skeptical", "Very excited", "Afraid of losing his job immediately", "Completely uninterested in technology"], answer: 0, explain_pt: "A primeira frase diz: 'I was skeptical about AI assistants.'" },
    { q: "What was the first benefit the author noticed?", options: ["Better relationships with clients", "Saving time on small, repetitive tasks", "Getting a promotion", "Learning to program"], answer: 1, explain_pt: "A primeira surpresa foi quanto tempo ele perdia com tarefas pequenas e chatas." },
    { q: "Why does the author compare the assistant to 'a smart intern'?", options: ["Because it is cheap", "Because it only works part-time", "Because it is fast and helpful but can be confidently wrong", "Because it needs a lot of training"], answer: 2, explain_pt: "Ele descreve: rápido, entusiasmado e às vezes errado com total confiança — como um estagiário esperto." },
    { q: "What does the author suggest about colleagues who refuse to use AI?", options: ["They are protecting client data better", "They are more creative", "They will soon be promoted", "They are losing ground compared to others"], answer: 3, explain_pt: "'Falling behind' indica que estão ficando para trás em relação aos colegas." },
    { q: "Why does the author tell the story about the made-up number?", options: ["To warn readers to always check AI output", "To show that his boss is very strict", "To explain how reports are written", "To prove that AI is useless"], answer: 0, explain_pt: "A história serve de alerta: a ferramenta pode inventar dados, então é preciso conferir." }
  ],
  discussion: "Which tasks in your work would you hand off to an AI assistant, and which would you never hand over? Explain."
});

CONTENT.readings.push({
  id: "rd-seeing-is-not-believing",
  title: "When Seeing Is No Longer Believing",
  level: "C1",
  topic: "tecnologia",
  text: "For most of modern history, a photograph or a video carried a kind of built-in authority. If you could see it, the reasoning went, it had probably happened. That assumption, however shaky it may always have been, is now crumbling at an alarming rate. Generative AI tools can produce convincing images, voices and footage in seconds, and they are no longer the preserve of specialists with expensive equipment.\n\nThe obvious danger is deception. A fake audio clip of a company director authorizing a payment, or a fabricated video of a politician saying something outrageous days before an election, can do real damage long before anyone manages to debunk it. Lies, as the old saying goes, travel halfway around the world while the truth is still putting on its shoes.\n\nYet some researchers argue that the subtler threat lies elsewhere. Once people know that anything can be faked, they may start to dismiss genuine evidence as well. A politician caught on camera can simply shrug it off as a deepfake, and a significant share of the public may give them the benefit of the doubt. This phenomenon, sometimes called the 'liar's dividend', erodes trust not in a particular piece of content but in the very idea of shared facts.\n\nTechnical solutions are being rolled out, with mixed results. Some camera makers and software companies now attach digital credentials to files, recording where and how an image was created. Detection tools can flag certain telltale signs of manipulation. But detection is an arms race: every improvement in spotting fakes is quickly followed by better fakes. And credentials only help if platforms display them and audiences actually bother to check.\n\nUltimately, the burden may fall back on old-fashioned habits. Checking the source, looking for independent confirmation and pausing before sharing something that seems designed to make you angry are not glamorous skills, but they are surprisingly effective. Organizations, too, are adapting: some now require a second channel, such as a phone call to a known number, before acting on any unusual request, however authentic it sounds.\n\nNone of this means we should become cynical about everything we see. It does mean that trust, more than ever, has to be earned rather than taken for granted.",
  glossary: [
    { term: "shaky", pt: "frágil, instável", meaning: "not firm or reliable" },
    { term: "crumbling", pt: "desmoronando", meaning: "breaking into small pieces; failing gradually" },
    { term: "preserve", pt: "domínio exclusivo", meaning: "an activity or area limited to a particular group" },
    { term: "debunk", pt: "desmentir, desmascarar", meaning: "to show that a claim is false" },
    { term: "shrug it off", pt: "não dar importância, descartar", meaning: "to treat something as unimportant" },
    { term: "benefit of the doubt", pt: "benefício da dúvida", meaning: "choosing to believe someone without proof" },
    { term: "rolled out", pt: "lançados, implantados", meaning: "introduced gradually to the public" },
    { term: "telltale", pt: "revelador", meaning: "showing something that is meant to be hidden" },
    { term: "arms race", pt: "corrida armamentista (disputa sem fim)", meaning: "a competition where each side keeps trying to outdo the other" },
    { term: "taken for granted", pt: "dado como certo", meaning: "assumed to be true or available without thinking" }
  ],
  questions: [
    { q: "According to the text, what has changed about creating fake images and videos?", options: ["It is now illegal everywhere", "It has become fast, easy and widely accessible", "It requires more expensive equipment", "It is only used for entertainment"], answer: 1, explain_pt: "O texto diz que ferramentas geram conteúdo convincente em segundos e não são mais exclusivas de especialistas." },
    { q: "What is the 'liar's dividend'?", options: ["Money earned from selling fake videos", "A tax on social media platforms", "A reward for detecting deepfakes", "The advantage liars gain when real evidence can be dismissed as fake"], answer: 3, explain_pt: "É o benefício para quem mente: como tudo pode ser falso, provas reais podem ser descartadas como deepfake." },
    { q: "Why does the author describe detection as 'an arms race'?", options: ["Because it is used by the military", "Because it is very expensive", "Because better detection leads to better fakes, endlessly", "Because governments control it"], answer: 2, explain_pt: "Cada avanço na detecção é seguido de falsificações melhores — uma disputa sem fim." },
    { q: "What can be inferred from the example of the 'second channel'?", options: ["Organizations no longer fully trust a single voice or message", "Phone calls are easier to fake than emails", "Companies have stopped making payments", "Detection software is now mandatory"], answer: 0, explain_pt: "Exigir um segundo canal mostra que um único áudio ou mensagem já não basta como prova." },
    { q: "What is the author's main conclusion?", options: ["We should distrust everything we see", "Trust must now be earned and verified, not assumed", "Technology will soon solve the problem completely", "Old habits are useless against AI"], answer: 1, explain_pt: "A frase final diz que a confiança precisa ser conquistada, não dada como certa — sem cair no cinismo." }
  ],
  discussion: "Have you ever received or shared something that turned out to be fake? What habits do you use to check information?"
});

CONTENT.readings.push({
  id: "rd-small-town-revival",
  title: "The Quiet Comeback of the Small Town",
  level: "C1",
  topic: "sociedade",
  text: "For decades, the story of small towns was one of steady decline. Young people left for big cities in search of jobs and opportunities, shops on the main street closed one after another, and the population that remained grew older year by year. In many places, the question was not whether the town would shrink, but how fast.\n\nRecently, however, that narrative has begun to shift, at least in some regions. The spread of remote work, combined with soaring housing costs in major cities, has prompted a modest but noticeable flow of people in the opposite direction. Professionals who can do their jobs from anywhere with a decent internet connection are trading cramped apartments for houses with gardens, and long commutes for a five-minute walk to the bakery.\n\nThe benefits for the towns themselves can be considerable. New residents bring income that is earned elsewhere but spent locally, breathing new life into restaurants, gyms and hardware stores. Some set up small businesses of their own; others get involved in schools and community associations, bringing in skills that were previously in short supply.\n\nBut the picture is far from uniformly positive. In popular destinations, the influx has driven up property prices, sometimes pricing out the very families whose roots in the area go back generations. Long-time residents may also bristle at newcomers who expect city-style services, or who seem to treat the town as a pleasant backdrop rather than a community with its own customs and history. Tensions over everything from noise to new construction are not uncommon.\n\nInfrastructure is another sticking point. Water systems, roads and clinics designed for a few thousand people can come under strain when the population grows quickly, and local governments rarely have the budget to keep pace. Planners who fail to anticipate this risk turning a welcome revival into a source of frustration.\n\nWhether this trend will last remains an open question. Some companies are already calling staff back to the office, and the novelty of rural life does wear off for some. Still, for towns that manage the transition thoughtfully, balancing growth with the interests of those who were there first, the current moment may be a rare chance to rewrite a story that once seemed to have only one ending.",
  glossary: [
    { term: "soaring", pt: "disparando, em alta", meaning: "rising very quickly" },
    { term: "cramped", pt: "apertado", meaning: "too small for the people or things inside" },
    { term: "breathing new life into", pt: "revitalizando", meaning: "giving new energy or success to something" },
    { term: "in short supply", pt: "em falta, escasso", meaning: "not available in large enough amounts" },
    { term: "influx", pt: "afluxo, chegada em massa", meaning: "the arrival of a large number of people" },
    { term: "pricing out", pt: "expulsando pelo preço", meaning: "making something too expensive for someone to afford" },
    { term: "bristle", pt: "irritar-se, eriçar-se", meaning: "to react with annoyance or anger" },
    { term: "sticking point", pt: "ponto de atrito, impasse", meaning: "a problem that stops progress or agreement" },
    { term: "keep pace", pt: "acompanhar o ritmo", meaning: "to move or develop at the same speed" },
    { term: "wear off", pt: "passar, perder o efeito", meaning: "to gradually disappear" }
  ],
  questions: [
    { q: "According to the text, what two factors have encouraged people to move to small towns?", options: ["Better schools and cheaper cars", "Government incentives and tourism", "Remote work and high housing costs in big cities", "New highways and lower taxes"], answer: 2, explain_pt: "O segundo parágrafo cita o trabalho remoto e os custos de moradia em alta nas grandes cidades." },
    { q: "How do new residents help the local economy, according to the author?", options: ["They spend money earned elsewhere in local businesses", "They pay higher taxes than locals", "They bring factories with them", "They work for the local government"], answer: 0, explain_pt: "A renda é ganha fora, mas gasta localmente, revitalizando o comércio." },
    { q: "What can be inferred about some long-time residents?", options: ["They are moving to big cities in large numbers", "They may feel newcomers do not respect local culture", "They welcome all new construction", "They have stopped paying property taxes"], answer: 1, explain_pt: "O texto diz que eles podem se irritar com quem trata a cidade como cenário e ignora seus costumes." },
    { q: "In the text, 'come under strain' most nearly means:", options: ["become more modern", "be sold to private companies", "be closed permanently", "be put under heavy pressure"], answer: 3, explain_pt: "'Come under strain' é ficar sobrecarregado, sob pressão, por causa do aumento da população." },
    { q: "What is the author's overall position on the small-town revival?", options: ["It is a temporary fashion with no benefits", "It will certainly continue for decades", "It is an opportunity, but only if managed carefully", "It should be stopped by local governments"], answer: 2, explain_pt: "O autor vê benefícios e problemas e conclui que pode ser uma chance rara, se a transição for bem conduzida." }
  ],
  discussion: "Has your town changed because of people arriving from bigger cities, or the opposite? What are the effects?"
});

CONTENT.readings.push({
  id: "rd-sleep-debt",
  title: "Paying Off Your Sleep Debt",
  level: "B2",
  topic: "saúde",
  text: "Most of us treat sleep as the first thing we can cut when life gets busy. A project deadline is coming up? Stay up until two. Kids woke up early? Push through the day with an extra coffee. We tell ourselves we'll catch up on the weekend, and then the weekend fills up too. Before we know it, we've been running on six hours a night for months.\n\nScientists have a name for this: sleep debt. Every hour you sleep less than your body needs is added to the bill, and like any debt, it eventually has to be paid. The symptoms creep up slowly, so they're easy to miss. You find it harder to concentrate, you snap at people over small things, you crave sugar and you make more mistakes. Many people get so used to feeling this way that they think it's simply who they are.\n\nThe good news is that small changes can make a big difference. The most powerful one is also the most boring: going to bed and waking up at roughly the same time every day, including weekends. Your body loves routine, and a regular schedule helps your internal clock know when to wind down.\n\nLight plays a huge role, too. Getting some daylight in the morning, even ten minutes outside, tells your brain that the day has started. At night, the opposite is true. Bright screens close to bedtime can trick your brain into thinking it's still daytime. Try to put your phone away at least thirty minutes before sleep, or at least turn the brightness down.\n\nWhat you eat and drink also matters. Caffeine can stay in your system for many hours, so that afternoon coffee might be the reason you're lying awake at midnight. Alcohol may help you fall asleep faster, but it tends to make sleep lighter and more broken later in the night.\n\nFinally, be patient. You can't pay off months of sleep debt in a single long weekend. But if you stick to better habits for a few weeks, you'll probably notice that you feel sharper, calmer and less dependent on coffee. And you may realize that the tired, grumpy person you thought you were was just someone who needed more sleep.",
  glossary: [
    { term: "stay up", pt: "ficar acordado até tarde", meaning: "to not go to bed" },
    { term: "push through", pt: "aguentar firme, seguir em frente", meaning: "to continue despite difficulty" },
    { term: "catch up", pt: "recuperar, pôr em dia", meaning: "to do something you didn't have time to do before" },
    { term: "creep up", pt: "aparecer aos poucos", meaning: "to happen slowly without being noticed" },
    { term: "snap at", pt: "responder com grosseria", meaning: "to speak to someone in a sudden, angry way" },
    { term: "wind down", pt: "relaxar, desacelerar", meaning: "to relax after activity or stress" },
    { term: "stick to", pt: "manter, seguir firmemente", meaning: "to continue doing something as planned" },
    { term: "grumpy", pt: "mal-humorado, ranzinza", meaning: "in a bad mood and easily annoyed" }
  ],
  questions: [
    { q: "What is the main idea of the text?", options: ["Coffee is the main cause of poor sleep", "Weekends are the best time to sleep more", "Sleeping six hours a night is enough for most people", "Lost sleep adds up, but better habits can help you recover"], answer: 3, explain_pt: "O texto explica o 'sleep debt' e como hábitos simples ajudam a recuperá-lo." },
    { q: "Why are the symptoms of sleep debt easy to miss?", options: ["Doctors rarely talk about them", "They appear slowly over time", "They only appear on weekends", "They are very similar to a cold"], answer: 1, explain_pt: "'The symptoms creep up slowly, so they're easy to miss.'" },
    { q: "According to the author, what is the most powerful change you can make?", options: ["Keeping a regular sleep schedule every day", "Buying a new mattress", "Drinking less water at night", "Sleeping longer on weekends"], answer: 0, explain_pt: "O autor diz que a mudança mais poderosa (e mais chata) é dormir e acordar no mesmo horário todos os dias." },
    { q: "What can we infer about alcohol from the text?", options: ["It is the best way to fall asleep", "It has no effect on sleep", "It may reduce the quality of sleep even if it helps you fall asleep", "It works better than caffeine"], answer: 2, explain_pt: "O texto diz que ajuda a pegar no sono, mas deixa o sono mais leve e interrompido." },
    { q: "What is the author's purpose in the final sentence?", options: ["To criticize grumpy people", "To recommend a medical treatment", "To describe his own personality", "To suggest that tiredness, not personality, may explain your bad mood"], answer: 3, explain_pt: "A frase final sugere que a pessoa cansada e irritada talvez só precisasse dormir mais." }
  ],
  discussion: "How many hours do you usually sleep? What habit would you like to change to sleep better, and how will you do it?"
});

CONTENT.readings.push({
  id: "rd-accent-anxiety",
  title: "Making Peace with Your Accent",
  level: "C1",
  topic: "cultura",
  text: "Ask adult language learners what holds them back, and a surprising number will mention not grammar or vocabulary but their accent. They can read technical reports, follow a podcast and write a perfectly decent email, yet the moment they have to speak in a meeting, they freeze. The fear is rarely of being misunderstood; it's of sounding foreign, and therefore, they assume, less competent.\n\nIt's worth unpacking that assumption. English is now spoken by far more non-native speakers than native ones, and in international workplaces, a conversation between, say, a Brazilian engineer, a German supplier and an Indian consultant is entirely routine. In that setting, there is no single 'correct' accent to aim for. What matters is intelligibility: whether your listener can understand you without straining.\n\nResearchers who study this distinguish between accent, which is simply how you sound, and comprehensibility, which is how much effort it takes to follow you. The two are related but far from identical. Plenty of speakers with a strong accent are remarkably easy to understand, while others with a near-native sound mumble, rush or swallow the ends of their words. Focusing on the right features pays off far more than trying to erase every trace of your first language.\n\nFor Portuguese speakers, a handful of issues tend to cause most of the confusion: adding an extra vowel at the end of words, so that 'big' comes out as 'bigee'; mixing up the vowels in pairs like 'live' and 'leave'; and pronouncing the 'th' sound as a 't' or 'f'. Word stress is another big one. Putting the emphasis on the wrong syllable can throw a listener off more than any single sound.\n\nNone of this requires sounding like a Hollywood actor. Short daily practice, such as shadowing a recording and comparing it with your own voice, can bring about noticeable improvements within weeks. Recording yourself is often uncomfortable, but it's one of the few ways to hear what others actually hear.\n\nPerhaps the most important shift, though, is psychological. An accent is not a flaw to be hidden; it's evidence that you've taken on the considerable challenge of operating in a second language. Native speakers who have never attempted that are hardly in a position to judge. Once learners come to terms with this, many find that their fluency improves almost by itself, simply because they've stopped holding back.",
  glossary: [
    { term: "holds them back", pt: "os impede de avançar", meaning: "stops someone from making progress" },
    { term: "freeze", pt: "travar, congelar", meaning: "to suddenly become unable to act or speak" },
    { term: "unpacking", pt: "analisando em detalhe", meaning: "examining an idea carefully to understand it" },
    { term: "straining", pt: "fazer esforço excessivo", meaning: "making a great effort" },
    { term: "mumble", pt: "murmurar, falar enrolado", meaning: "to speak quietly and unclearly" },
    { term: "pays off", pt: "compensa, vale a pena", meaning: "brings good results" },
    { term: "throw a listener off", pt: "confundir o ouvinte", meaning: "to confuse someone" },
    { term: "bring about", pt: "provocar, causar", meaning: "to make something happen" },
    { term: "come to terms with", pt: "aceitar, conformar-se com", meaning: "to accept a difficult situation" }
  ],
  questions: [
    { q: "What, according to the text, is the real fear of many adult learners when speaking?", options: ["Sounding foreign and therefore less competent", "Making grammar mistakes in emails", "Not understanding podcasts", "Forgetting technical vocabulary"], answer: 0, explain_pt: "O texto diz que o medo raramente é não ser entendido, mas soar estrangeiro e parecer menos competente." },
    { q: "What is the difference between accent and comprehensibility?", options: ["They mean exactly the same thing", "Accent is about grammar; comprehensibility is about vocabulary", "Accent is how you sound; comprehensibility is how easy you are to follow", "Comprehensibility only applies to native speakers"], answer: 2, explain_pt: "O terceiro parágrafo define: sotaque é como você soa; compreensibilidade é o esforço para te entender." },
    { q: "Which pronunciation issue for Portuguese speakers is NOT mentioned?", options: ["Adding an extra vowel at the end of words", "Confusing vowels in pairs like 'live' and 'leave'", "Pronouncing 'th' as 't' or 'f'", "Pronouncing every 'r' like an 'h'"], answer: 3, explain_pt: "As três primeiras aparecem no texto; o 'r' pronunciado como 'h' não é citado." },
    { q: "In the text, 'throw a listener off' means to:", options: ["interrupt the listener", "confuse the listener", "ignore the listener", "impress the listener"], answer: 1, explain_pt: "'Throw someone off' é confundir, desorientar — o acento tônico errado atrapalha a compreensão." },
    { q: "What is the author's main purpose in the final paragraph?", options: ["To encourage learners to accept their accent and stop holding back", "To criticize native speakers", "To argue that pronunciation practice is useless", "To recommend acting classes"], answer: 0, explain_pt: "O autor propõe uma mudança psicológica: o sotaque não é defeito; aceitá-lo ajuda a fluência." }
  ],
  discussion: "How do you feel about your accent in English? Which pronunciation point from the text would you like to work on first, and how?"
});
