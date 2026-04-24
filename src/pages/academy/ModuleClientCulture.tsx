import { ModuleLayout } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  TipBlock,
  PhraseCard,
  ScenarioSimulator,
  type Phase,
  type Scenario,
  type ScenarioStep,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const ModuleClientCulture = () => {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const phases: Phase[] = [
    {
      id: "importancia-cliente",
      title: isEN ? "The Importance of Client Culture" : "A Importância da Cultura de Cliente",
      description: isEN
        ? "Understanding why every interaction is an investment in your brand"
        : "Compreender por que cada interação é um investimento na sua marca",
      content: [
        {
          type: "text",
          heading: isEN
            ? "The Client is the Center. The Experience is the Product."
            : "O Cliente é o Centro. A Experiência é o Produto.",
          text: isEN
            ? "A client is not a transaction—it's a relationship. And every relationship can multiply. Without a client, there is no sale. Without experience, there is no repetition. Without repetition, there is no brand. Client culture defines how we think, how we act, and how we create impact in every single interaction."
            : "Um cliente não é uma transação—é uma relação. E cada relação pode multiplicar-se. Sem cliente não há venda. Sem experiência não há repetição. Sem repetição não há marca. Cultura de cliente define como pensamos, como agimos e como criamos impacto em cada interação.",
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN
            ? "The Three Laws of Client Culture"
            : "As Três Leis da Cultura de Cliente",
          items: [
            isEN
              ? "THE CLIENT IS THE MOST VALUABLE ASSET: Every client is a potential multiplier—word-of-mouth, reviews, return visits, brand advocacy"
              : "O CLIENTE É O ATIVO MAIS VALIOSO: Cada cliente é um multiplicador potencial—boca a boca, avaliações, visitas repetidas, advocacy de marca",
            isEN
              ? "THE EXPERIENCE BECOMES THE PRODUCT: What they remember is not just what they buy, but how they felt when they bought it"
              : "A EXPERIÊNCIA SE TORNA O PRODUTO: O que eles recordam não é apenas o que compraram, mas como se sentiram quando compraram",
            isEN
              ? "REPETITION IS GROWTH: One client who returns is worth 10 one-time buyers. Loyalty is built through consistent, premium experiences"
              : "REPETIÇÃO É CRESCIMENTO: Um cliente que volta é digno de 10 compradores únicos. Lealdade é construída através de experiências consistentes e premium",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase1",
            question: isEN
              ? "What is the primary difference between viewing a client as a transaction versus a relationship?"
              : "Qual é a diferença primária entre visualizar um cliente como uma transação versus uma relação?",
            options: [
              isEN
                ? "There is no difference—a sale is a sale"
                : "Não há diferença—uma venda é uma venda",
              isEN
                ? "A transaction ends after payment; a relationship can multiply into word-of-mouth, reviews, return visits, and brand advocacy"
                : "Uma transação termina após o pagamento; uma relação pode multiplicar-se em boca a boca, avaliações, visitas repetidas e advocacy de marca",
              isEN
                ? "Relationships cost more"
                : "Relações custam mais",
              isEN
                ? "Transactions are more important"
                : "Transações são mais importantes",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase1",
            question: isEN
              ? "Why is the experience more valuable than the product alone?"
              : "Por que a experiência é mais valiosa do que o produto sozinho?",
            options: [
              isEN
                ? "It's not—only the product matters"
                : "Não é—apenas o produto importa",
              isEN
                ? "Because clients remember HOW THEY FELT more vividly than what they bought. That emotion drives recommendations, reviews, and return visits"
                : "Porque clientes recordam COMO SE SENTIRAM mais vividamente do que o que compraram. Essa emoção impulsiona recomendações, avaliações e visitas repetidas",
              isEN
                ? "Experience is cheaper"
                : "A experiência é mais barata",
              isEN
                ? "It doesn't matter what clients feel"
                : "Não importa como os clientes se sentem",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "ler-expectativas",
      title: isEN
        ? "Reading Expectations in Seconds"
        : "Ler Expectativas em Segundos",
      description: isEN
        ? "Learning to diagnose what clients expect before they speak"
        : "Aprender a diagnosticar o que os clientes esperam antes de falarem",
      content: [
        {
          type: "text",
          heading: isEN
            ? "What Clients Expect (But Don't Always Say)"
            : "O Que os Clientes Esperam (Mas Nem Sempre Dizem)",
          text: isEN
            ? "Every client enters with silent expectations. They expect to be welcomed, understood, guided elegantly, surprised positively, and treated as unique. Premium service means meeting and exceeding these unspoken expectations before they even ask."
            : "Cada cliente entra com expectativas silenciosas. Eles esperam ser bem-vindos, compreendidos, guiados com elegância, surpreendidos positivamente e tratados como únicos. Serviço premium significa atender e exceder essas expectativas não ditas antes mesmo de perguntarem.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN
            ? "The 5 Silent Client Expectations"
            : "As 5 Expectativas Silenciosas do Cliente",
          items: [
            isEN
              ? "TO BE WELCOMED: Acknowledged, greeted with warmth, made to feel their presence matters"
              : "SEREM BEM-VINDOS: Reconhecidos, saudados com calor, fez-se sentir que sua presença importa",
            isEN
              ? "TO BE UNDERSTOOD: That you 'get' who they are without forcing them to explain"
              : "SEREM COMPREENDIDOS: Que você 'compreende' quem são sem forçá-los a explicar",
            isEN
              ? "TO BE GUIDED WITH ELEGANCE: Not pushed, but gently steered toward the right choice"
              : "SEREM GUIADOS COM ELEGÂNCIA: Não empurrados, mas gentilmente orientados para a escolha certa",
            isEN
              ? "TO BE SURPRISED: Positively surprised by attention to detail, unexpected kindness, going beyond what was asked"
              : "SEREM SURPREENDIDOS: Positivamente surpreendidos por atenção aos detalhes, bondade inesperada, ir além do que foi pedido",
            isEN
              ? "TO FEEL UNIQUE: That this experience is personal, not generic, not one-size-fits-all"
              : "SENTIREM-SE ÚNICOS: Que esta experiência é pessoal, não genérica, não tamanho único",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN
            ? "Reading Expectations in Real Time"
            : "Lendo Expectativas em Tempo Real",
          items: [
            isEN
              ? "CLIENT RHYTHM: Fast, leisurely, urgent, or relaxed? Adjust your pace to match"
              : "RITMO DO CLIENTE: Rápido, tranquilo, urgente ou relaxado? Ajuste seu ritmo para corresponder",
            isEN
              ? "CLIENT ENERGY: High-energy, withdrawn, curious, reserved? Match or balance accordingly"
              : "ENERGIA DO CLIENTE: Energia alta, retraído, curioso, reservado? Corresponda ou equilibre adequadamente",
            isEN
              ? "KNOWLEDGE LEVEL: Do they know wines? Gifts? The region? Adjust depth and complexity"
              : "NÍVEL DE CONHECIMENTO: Conhecem vinhos? Prendas? A região? Ajuste profundidade e complexidade",
            isEN
              ? "EMOTIONAL STATE: Happy, stressed, contemplative, excited? Recognize it and honor it"
              : "ESTADO EMOCIONAL: Feliz, estressado, contemplativo, excitado? Reconheça e honre-o",
            isEN
              ? "INTENTION: Gift, personal, collector, memory, local pride? Understand the 'why' behind their visit"
              : "INTENÇÃO: Prenda, pessoal, colecionador, memória, orgulho local? Entenda o 'porquê' por trás da sua visita",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase2",
            question: isEN
              ? "What is the difference between explicit and implicit client expectations?"
              : "Qual é a diferença entre expectativas de cliente explícitas e implícitas?",
            options: [
              isEN
                ? "There is no difference"
                : "Não há diferença",
              isEN
                ? "Explicit: spoken directly. Implicit: silent expectations that clients hold but don't voice. Premium service meets BOTH"
                : "Explícita: falada diretamente. Implícita: expectativas silenciosas que os clientes têm mas não expressam. Serviço premium atende AMBAS",
              isEN
                ? "Implicit expectations don't matter"
                : "As expectativas implícitas não importam",
              isEN
                ? "Only explicit expectations need to be met"
                : "Apenas expectativas explícitas precisam ser atendidas",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase2",
            question: isEN
              ? "How can you read a client's emotional state without them telling you?"
              : "Como pode ler o estado emocional de um cliente sem ele lhe dizer?",
            options: [
              isEN
                ? "You can't—ask them directly"
                : "Você não consegue—pergunte diretamente",
              isEN
                ? "Observe: body language, facial expression, pace of movement, tone of voice, energy level, what they gravitate toward"
                : "Observe: linguagem corporal, expressão facial, ritmo do movimento, tom de voz, nível de energia, o que gravita para",
              isEN
                ? "Assume they're happy"
                : "Assuma que estão felizes",
              isEN
                ? "Emotional state doesn't matter"
                : "O estado emocional não importa",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "superar-expectativas",
      title: isEN
        ? "Exceeding Expectations"
        : "Superar Expectativas",
      description: isEN
        ? "Going beyond to create memorable moments"
        : "Ir além para criar momentos memoráveis",
      content: [
        {
          type: "text",
          heading: isEN
            ? "Enchantment: Exceeding What Was Imagined"
            : "Encantamento: Exceder o Que Foi Imaginado",
          text: isEN
            ? "Enchanting a client is not doing more—it's doing what matters most. It's anticipating needs before they ask, creating moments of surprise, elevating the experience in unexpected ways. Enchantment is the difference between a good experience and one they'll tell others about."
            : "Encantar um cliente não é fazer mais—é fazer o que mais importa. É antecipar necessidades antes que peçam, criar momentos de surpresa, elevar a experiência de maneiras inesperadas. Encantamento é a diferença entre uma boa experiência e uma que eles contarão aos outros.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN
            ? "Practical Enchantment Techniques"
            : "Técnicas Práticas de Encantamento",
          items: [
            isEN
              ? "ANTICIPATE NEEDS: 'I notice you're traveling light—let me show you our compact options that fit cabin luggage'"
              : "ANTECIPAR NECESSIDADES: 'Noto que está viajando leve—deixe-me mostrar nossas opções compactas que se encaixam na bagagem de cabine'",
            isEN
              ? "CREATE SURPRISE MOMENTS: Upgrade the packaging, add a personal note, suggest a pairing they didn't ask for"
              : "CRIAR MOMENTOS DE SURPRESA: Atualize a embalagem, adicione uma nota pessoal, sugira um emparelhamento que não pediram",
            isEN
              ? "ELEVATE THE EXPERIENCE: Not just sell a product—create a memory. Tell the story, make it personal, make it matter"
              : "ELEVAR A EXPERIÊNCIA: Não apenas vender um produto—criar uma memória. Contar a história, torná-la pessoal, fazer-lhe importar",
            isEN
              ? "TREAT AS UNIQUE: Remember details ('You were here last year...'), personalize recommendations, show you're paying attention"
              : "TRATAR COMO ÚNICO: Recordar detalhes ('Esteve aqui no ano passado...'), personalize recomendações, mostre que está prestando atenção",
            isEN
              ? "FOLLOW THROUGH: If you promise something, deliver. If you suggest something, follow up. Consistency builds trust"
              : "SEGUIR ATRAVÉS: Se prometer algo, entregue. Se sugerir algo, dê seguimento. Consistência constrói confiança",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase3",
            question: isEN
              ? "What is the key difference between 'good service' and 'enchantment'?"
              : "Qual é a diferença chave entre 'bom serviço' e 'encantamento'?",
            options: [
              isEN
                ? "Good service meets expectations; enchantment exceeds them in meaningful ways"
                : "Bom serviço atende expectativas; encantamento excede-as de maneiras significativas",
              isEN
                ? "There is no difference"
                : "Não há diferença",
              isEN
                ? "Enchantment means spending more money"
                : "Encantamento significa gastar mais dinheiro",
              isEN
                ? "Good service is always better"
                : "Bom serviço é sempre melhor",
            ],
            correctAnswer: 0,
          },
          {
            id: "q2-phase3",
            question: isEN
              ? "A client is traveling light and carrying a small backpack. How can you enchant them?"
              : "Um cliente está viajando leve e carrega uma pequena mochila. Como pode encantá-lo?",
            options: [
              isEN
                ? "Ignore the detail and recommend large bottles"
                : "Ignore o detalhe e recomende garrafas grandes",
              isEN
                ? "ANTICIPATE: 'I see you're traveling light. Let me show you our compact Essentials that fit perfectly in carry-on luggage. Perfect for your journey.'"
                : "ANTECIPAR: 'Vejo que está viajando leve. Deixe-me mostrar nossos Essentials compactos que se encaixam perfeitamente na bagagem de cabine. Perfeito para sua jornada.'",
              isEN
                ? "Recommend the most expensive item"
                : "Recomende o item mais caro",
              isEN
                ? "Tell them to come back later with more space"
                : "Diga-lhes para voltar mais tarde com mais espaço",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "criar-advocates",
      title: isEN
        ? "Creating Brand Advocates"
        : "Criar Advocates de Marca",
      description: isEN
        ? "Turning satisfied clients into ambassadors"
        : "Transformar clientes satisfeitos em embaixadores",
      content: [
        {
          type: "text",
          heading: isEN
            ? "From Satisfied Client to Brand Ambassador"
            : "De Cliente Satisfeito a Embaixador de Marca",
          text: isEN
            ? "A satisfied client buys once. A client turned into an advocate buys repeatedly, recommends to friends, leaves positive reviews, and speaks about your brand unprompted. Advocacy is earned through consistent, premium experiences that exceed expectations. It's the highest form of loyalty."
            : "Um cliente satisfeito compra uma vez. Um cliente transformado em advocate compra repetidamente, recomenda aos amigos, deixa avaliações positivas e fala sobre sua marca sem ser solicitado. Advocacy é ganho através de experiências consistentes e premium que excedem expectativas. É a forma mais alta de lealdade.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN
            ? "The Advocate Conversion Cycle"
            : "O Ciclo de Conversão de Advocate",
          items: [
            isEN
              ? "PHASE 1 - FIRST EXPERIENCE: Premium welcome, excellent service, exceeded expectations → Client feels valued"
              : "FASE 1 - PRIMEIRA EXPERIÊNCIA: Bem-vindo premium, excelente serviço, expectativas excedidas → Cliente sente-se valorizado",
            isEN
              ? "PHASE 2 - EMOTIONAL CONNECTION: Story, memory, feeling of uniqueness → Client remembers not the product, but the feeling"
              : "FASE 2 - CONEXÃO EMOCIONAL: História, memória, sentimento de unicidade → Cliente recorda não o produto, mas o sentimento",
            isEN
              ? "PHASE 3 - NATURAL RECOMMENDATION: Client tells a friend/family, leaves a positive review, mentions on social media (unprompted)"
              : "FASE 3 - RECOMENDAÇÃO NATURAL: Cliente conta a um amigo/família, deixa avaliação positiva, menciona nas redes sociais (sem solicitação)",
            isEN
              ? "PHASE 4 - REPEAT VISIT: Client returns because they want to recreate that feeling, buy gifts for others, deepen the relationship"
              : "FASE 4 - VISITA REPETIDA: Cliente volta porque quer recrear esse sentimento, compra prendas para outros, aprofunda a relação",
            isEN
              ? "PHASE 5 - ADVOCACY: Client becomes a vocal advocate—recommends consistently, refers customers, defends the brand"
              : "FASE 5 - ADVOCACY: Cliente torna-se um advocate vocal—recomenda consistentemente, refere clientes, defende a marca",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN
            ? "What Turns Satisfaction into Advocacy?"
            : "O Que Transforma Satisfação em Advocacy?",
          items: [
            isEN
              ? "CONSISTENCY: Every visit feels premium, every interaction exceeds expectations. No bad days."
              : "CONSISTÊNCIA: Cada visita se sente premium, cada interação excede expectativas. Sem dias ruins.",
            isEN
              ? "PERSONALIZATION: They feel known, understood, treated as an individual, not a number"
              : "PERSONALIZAÇÃO: Sentem-se conhecidos, compreendidos, tratados como indivíduo, não como número",
            isEN
              ? "MEANINGFUL MOMENTS: You create memories, not just transactions. They remember how you made them feel"
              : "MOMENTOS SIGNIFICATIVOS: Você cria memórias, não apenas transações. Recordam como os fez sentir",
            isEN
              ? "SURPRISE & DELIGHT: You anticipate needs, create pleasant surprises, go above and beyond"
              : "SURPRESA E ENCANTO: Antecipa necessidades, cria surpresas agradáveis, vai acima e além",
            isEN
              ? "AUTHENTICITY: Your care is genuine, not transactional. Clients sense authenticity and respond to it"
              : "AUTENTICIDADE: Seu cuidado é genuíno, não transacional. Clientes sentem autenticidade e respondem a ela",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase4",
            question: isEN
              ? "What is the difference between a satisfied client and an advocate?"
              : "Qual é a diferença entre um cliente satisfeito e um advocate?",
            options: [
              isEN
                ? "There is no difference"
                : "Não há diferença",
              isEN
                ? "Satisfied client: buys once or occasionally. Advocate: buys repeatedly, recommends unprompted, leaves positive reviews, speaks about the brand naturally"
                : "Cliente satisfeito: compra uma ou ocasionalmente. Advocate: compra repetidamente, recomenda sem solicitação, deixa avaliações positivas, fala sobre a marca naturalmente",
              isEN
                ? "Advocates are less important"
                : "Advocates são menos importantes",
              isEN
                ? "Advocacy can't be created—it just happens"
                : "Advocacy não pode ser criada—apenas acontece",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase4",
            question: isEN
              ? "Which of these best creates advocacy?"
              : "Qual destes cria melhor advocacy?",
            options: [
              isEN
                ? "Offering discounts"
                : "Oferecer descontos",
              isEN
                ? "Creating consistent premium experiences, personalization, meaningful moments, and genuine care that exceed expectations"
                : "Criar experiências premium consistentes, personalização, momentos significativos e cuidado genuíno que excedem expectativas",
              isEN
                ? "Asking clients to recommend you"
                : "Pedir aos clientes que o recomiendem",
              isEN
                ? "Having a large inventory"
                : "Ter um grande inventário",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "cultura-pratica-diaria",
      title: isEN
        ? "Client Culture in Daily Practice"
        : "Cultura de Cliente na Prática Diária",
      description: isEN
        ? "Making client culture real through daily habits and team alignment"
        : "Tornar a cultura de cliente real através de hábitos diários e alinhamento de equipa",
      content: [
        {
          type: "text",
          heading: isEN
            ? "From Philosophy to Action"
            : "Da Filosofia à Ação",
          text: isEN
            ? "Client culture is not a slogan—it's a daily practice. It lives in small habits: how you greet, how you listen, how you follow through, how you treat difficult moments, how you celebrate successes with your clients. It's built through consistency, alignment across the team, and genuine commitment to the premium experience in every single interaction."
            : "Cultura de cliente não é um slogan—é uma prática diária. Vive em pequenos hábitos: como você cumprimenta, como você ouve, como você cumpre, como você trata momentos difíceis, como você celebra sucessos com seus clientes. É construída através de consistência, alinhamento em toda a equipa e compromisso genuíno com a experiência premium em cada interação.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN
            ? "Daily Habits That Build Client Culture"
            : "Hábitos Diários Que Construem Cultura de Cliente",
          items: [
            isEN
              ? "GREETING: Every client is welcomed warmly, by name if possible, with genuine attention—they matter"
              : "SAUDAÇÃO: Cada cliente é bem-vindo calorosa, por nome se possível, com atenção genuína—importam",
            isEN
              ? "LISTENING: Actually listen—not just wait to speak. Understand what they're saying, what they're not saying, what they need"
              : "OUVIR: Realmente ouvir—não apenas esperar para falar. Entenda o que estão dizendo, o que não estão dizendo, o que precisam",
            isEN
              ? "REMEMBERING: If they visited before, remember details. If they bought something, ask how they're using it. Show you care beyond the transaction"
              : "RECORDAR: Se visitaram antes, recorde detalhes. Se compraram algo, pergunte como estão usando. Mostre que se importa além da transação",
            isEN
              ? "FOLLOWING THROUGH: If you promise something, deliver. If you suggest something, check in. Your word is your reputation"
              : "CUMPRIR: Se prometer algo, entregue. Se sugerir algo, dê seguimento. Sua palavra é sua reputação",
            isEN
              ? "HANDLING DIFFICULTIES: When something goes wrong, see it as an opportunity to strengthen the relationship, not damage it. Apologize, fix it, surprise them with recovery"
              : "LIDAR COM DIFICULDADES: Quando algo corre mal, veja-o como oportunidade de fortalecer a relação, não danificá-la. Peça desculpas, corrija, surpreenda-os com recuperação",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN
            ? "Team Alignment & Consistency"
            : "Alinhamento de Equipa e Consistência",
          items: [
            isEN
              ? "EVERYONE OWNS CLIENT CULTURE: Not just sales staff—every team member (back office, packaging, follow-up) represents the brand"
              : "TODOS POSSUEM CULTURA DE CLIENTE: Não apenas pessoal de vendas—cada membro da equipa (back office, embalagem, acompanhamento) representa a marca",
            isEN
              ? "SHARED STANDARDS: Everyone knows what 'premium' means. What 'great service' looks like. What 'going beyond' feels like"
              : "PADRÕES COMPARTILHADOS: Todos sabem o que 'premium' significa. Como 'grande serviço' parece. Como 'ir além' se sente",
            isEN
              ? "FEEDBACK LOOP: Clients tell you what works. Listen. Adapt. Share insights with the team"
              : "LOOP DE FEEDBACK: Clientes dizem-lhe o que funciona. Ouça. Adapte. Partilhe insights com a equipa",
            isEN
              ? "CELEBRATE SUCCESS: When a client becomes an advocate, when someone leaves a great review, celebrate it. This reinforces the culture"
              : "CELEBRAR SUCESSO: Quando um cliente se torna um advocate, quando alguém deixa uma ótima avaliação, celebre. Isto reforça a cultura",
            isEN
              ? "FINAL COMMITMENT: This isn't a program—it's a philosophy. Live it every day, with every client, without exception"
              : "COMPROMISSO FINAL: Isto não é um programa—é uma filosofia. Viva-a todos os dias, com cada cliente, sem exceção",
          ],
        },
      ],
      scenario: {
        title: isEN
          ? "Client Culture in Practice: Real Scenarios"
          : "Cultura de Cliente na Prática: Cenários Reais",
        description: isEN
          ? "Apply client culture principles to real situations"
          : "Aplicar princípios de cultura de cliente a situações reais",
        scenarios: [
          {
            id: "scenario-culture1",
            title: isEN
              ? "Scenario 1: The Returning Client"
              : "Cenário 1: O Cliente Repetido",
            description: isEN
              ? "A client who visited last year enters the store. You recognize them. They don't expect you to remember them."
              : "Um cliente que visitou no ano passado entra na loja. Você o reconhece. Não esperam que o recorde.",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "Opportunity to show personalization and strengthen the relationship"
                  : "Oportunidade de mostrar personalização e fortalecer a relação",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Greet them the same way as any new client"
                      : "Cumprimenta-los da mesma forma que qualquer novo cliente",
                    feedback: isEN
                      ? "Incorrect. You've missed an opportunity to show they matter."
                      : "Incorreto. Perdeu uma oportunidade de mostrar que importam.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Light up with genuine recognition: 'Welcome back! I remember you from last year. How did you enjoy the vintage you chose? Did you get to taste it?'"
                      : "Ilumine com reconhecimento genuíno: 'Bem-vindo de volta! Recordo-o do ano passado. Como apreciou o vintage que escolheu? Conseguiu provou-lo?'",
                    feedback: isEN
                      ? "Correct! You showed you remember them, care about their experience beyond the transaction, and want to deepen the relationship."
                      : "Correto! Mostrou que se recorda deles, se importa com a experiência para além da transação e quer aprofundar a relação.",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
          {
            id: "scenario-culture2",
            title: isEN
              ? "Scenario 2: The Difficult Moment"
              : "Cenário 2: O Momento Difícil",
            description: isEN
              ? "A client receives a broken bottle and is visibly upset. They expected better quality for the premium price paid."
              : "Um cliente recebe uma garrafa quebrada e está visivelmente chateado. Esperava melhor qualidade pelo preço premium pago.",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "A premium experience has been compromised. How you handle this determines if they become an advocate or spread negative reviews."
                  : "Uma experiência premium foi comprometida. Como lida com isto determina se se tornam um advocate ou espalham avaliações negativas.",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Offer a basic replacement"
                      : "Ofereça uma substituição básica",
                    feedback: isEN
                      ? "Incorrect. This doesn't address the emotional damage or turn the moment around."
                      : "Incorreto. Isto não aborda o dano emocional ou inverte o momento.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Apologize sincerely, acknowledge their disappointment, replace immediately with a premium upgrade, add a personal note explaining the value you place on their experience, and follow up to ensure they're satisfied"
                      : "Peça desculpas sinceramente, reconheça a decepção, substitua imediatamente com uma atualização premium, adicione uma nota pessoal explicando o valor que coloca em sua experiência e dê seguimento para garantir que estão satisfeitos",
                    feedback: isEN
                      ? "Correct! You've turned a negative moment into an opportunity to show genuine care, rebuild trust, and often create stronger loyalty than if the issue hadn't occurred."
                      : "Correto! Transformou um momento negativo numa oportunidade de mostrar cuidado genuíno, reconstruir confiança e frequentemente criar lealdade mais forte do que se a questão não tivesse ocorrido.",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
          {
            id: "scenario-culture3",
            title: isEN
              ? "Scenario 3: The Upsell vs. The Right Choice"
              : "Cenário 3: O Upsell vs. A Escolha Certa",
            description: isEN
              ? "A client is browsing Essentials (lower price point). You know they could be happy with an Icon (higher price). Do you push the higher-value item?"
              : "Um cliente está navegando Essentials (ponto de preço mais baixo). Você sabe que poderiam estar felizes com um Icon (preço mais alto). Você empurra o item de maior valor?",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "Choice between maximizing this transaction vs. building long-term trust"
                  : "Escolha entre maximizar esta transação vs. construir confiança a longo prazo",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Hard sell them on the Icon despite their clear interest in Essentials"
                      : "Venda-lhes fortemente o Icon apesar do claro interesse em Essentials",
                    feedback: isEN
                      ? "Incorrect. This prioritizes short-term revenue over client culture and genuine service."
                      : "Incorreto. Isto prioriza receita de curto prazo sobre cultura de cliente e serviço genuíno.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Ask what appeals to them about Essentials. If it's about value-for-money or portability, recommend Essentials confidently. If they have budget and want more prestige, gently suggest Icon. Let them decide. Build trust by serving their needs, not your commission."
                      : "Pergunte o que os atrai em Essentials. Se é sobre relação qualidade-preço ou portabilidade, recomende Essentials com confiança. Se têm orçamento e querem mais prestígio, sugira gentilmente Icon. Deixe-os decidir. Construa confiança servindo suas necessidades, não sua comissão.",
                    feedback: isEN
                      ? "Correct! You're building long-term client culture and trust. A client who feels served (not sold to) becomes loyal and recommends you. That's worth more than one higher transaction."
                      : "Correto! Está construindo cultura de cliente e confiança a longo prazo. Um cliente que se sente servido (não vendido) torna-se leal e o recomenda. Isso vale mais do que uma transação mais alta.",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
          {
            id: "scenario-culture4",
            title: isEN
              ? "Scenario 4: The Small Detail That Matters"
              : "Cenário 4: O Pequeno Detalhe Que Importa",
            description: isEN
              ? "A client is buying a gift for their anniversary. You know they love the product but are on a tight budget. You could save them €5-10 through a subtle discount. Do you offer it?"
              : "Um cliente está comprando uma prenda para seu aniversário. Você sabe que adoram o produto mas estão num orçamento apertado. Poderia economizar €5-10 através de um desconto subtil. Oferece?",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "Opportunity to create a moment of unexpected generosity"
                  : "Oportunidade de criar um momento de generosidade inesperada",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Follow normal pricing—they didn't ask for a discount"
                      : "Siga preços normais—não pediram desconto",
                    feedback: isEN
                      ? "Not necessarily incorrect, but you've missed an opportunity to enchant."
                      : "Não necessariamente incorreto, mas perdeu uma oportunidade de encantar.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Subtly offer: 'I see this is for an anniversary. As a small gesture, let me offer you a 10% friends-and-family discount. You deserve to celebrate beautifully.' Wrap it perfectly. Add a handwritten note. They'll never forget this kindness."
                      : "Subtilmente ofereça: 'Vejo que é para um aniversário. Como pequeno gesto, deixe-me oferecer um desconto de 10% para amigos e família. Merece celebrar lindamente.' Embrulhe perfeitamente. Adicione uma nota manuscrita. Nunca esquecerão essa bondade.",
                    feedback: isEN
                      ? "Correct! This is enchantment. You've created a memorable moment, strengthened emotional connection, and likely created an advocate who will tell others about your generosity and care."
                      : "Correto! Isto é encantamento. Criou um momento memorável, fortaleceu conexão emocional e provavelmente criou um advocate que contará aos outros sobre sua generosidade e cuidado.",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1-phase5",
            question: isEN
              ? "What is the core principle of client culture in daily practice?"
              : "Qual é o princípio central da cultura de cliente na prática diária?",
            options: [
              isEN
                ? "Close as many sales as possible"
                : "Fechar tantas vendas quanto possível",
              isEN
                ? "Every interaction is an opportunity to build trust, exceed expectations, and create an experience worth sharing"
                : "Cada interação é uma oportunidade de construir confiança, exceder expectativas e criar uma experiência digna de partilha",
              isEN
                ? "Focus on profit margins"
                : "Focar em margens de lucro",
              isEN
                ? "Client culture is just a marketing slogan"
                : "Cultura de cliente é apenas um slogan de marketing",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase5",
            question: isEN
              ? "When a client has a problem (broken product, wrong order), what should your priority be?"
              : "Quando um cliente tem um problema (produto quebrado, pedido errado), qual deve ser sua prioridade?",
            options: [
              isEN
                ? "Minimize costs, offer minimum compensation"
                : "Minimize custos, ofereça compensação mínima",
              isEN
                ? "Fix the problem, acknowledge the disappointment, and use it as an opportunity to rebuild and strengthen the relationship beyond what it was before"
                : "Corrija o problema, reconheça a decepção e use-o como oportunidade de reconstruir e fortalecer a relação para além do que era antes",
              isEN
                ? "Blame the customer"
                : "Culpe o cliente",
              isEN
                ? "Ignore it and hope it goes away"
                : "Ignore-o e espere que desapareça",
            ],
            correctAnswer: 1,
          },
          {
            id: "q3-phase5",
            question: isEN
              ? "What creates true loyalty: discounts or genuine care?"
              : "O que cria verdadeira lealdade: descontos ou cuidado genuíno?",
            options: [
              isEN
                ? "Only discounts work"
                : "Apenas descontos funcionam",
              isEN
                ? "Genuine care—clients remember how you made them feel more than what you sold them"
                : "Cuidado genuíno—clientes recordam como os fez sentir mais do que o que lhes vendeu",
              isEN
                ? "Neither matters"
                : "Nem um nem outro importa",
              isEN
                ? "Both matter equally"
                : "Ambos importam igualmente",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
  ];

  return (
    <ModuleLayout
      moduleId="client-culture"
      title={isEN ? "Module 10: Client Culture" : "Módulo 10: Cultura de Cliente"}
      description={
        isEN
          ? "Build the soul of your brand through client-centered philosophy, practices, and daily commitment to premium experiences"
          : "Construa a alma de sua marca através de filosofia centrada no cliente, práticas e compromisso diário com experiências premium"
      }
      heroImage="/assets/collection.jpg"
      area="area3"
      moduleNumber={10}
    >
      <PhaseSystem
        phases={phases}
        onQuizComplete={(phaseId) => {
          if (!completedQuizzes.includes(phaseId)) {
            setCompletedQuizzes([...completedQuizzes, phaseId]);
          }
        }}
      />
    </ModuleLayout>
  );
};

export default ModuleClientCulture;
