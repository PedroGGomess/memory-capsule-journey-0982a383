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

const ModuleClientTypes = () => {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const phases: Phase[] = [
    {
      id: "cliente-expansivo-reservado",
      title: isEN ? "Outgoing vs. Reserved Clients" : "Cliente Expansivo vs. Reservado",
      description: isEN
        ? "Reading personality extremes and adjusting your energy"
        : "Ler extremos de personalidade e ajustar sua energia",
      content: [
        {
          type: "text",
          heading: isEN ? "The Spectrum: Expansive to Reserved" : "O Espectro: Expansivo a Reservado",
          text: isEN
            ? "Some clients enter with high energy, talk freely, and want interaction. Others are quiet, observant, and prefer minimal engagement. Premium service means matching their energy without overwhelming or isolating them."
            : "Alguns clientes entram com alta energia, falam livremente e querem interação. Outros são silenciosos, observadores e preferem envolvimento mínimo. Serviço premium significa corresponder sua energia sem os sobrecarregar ou isolar.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "The Expansive Client" : "O Cliente Expansivo",
          items: [
            isEN ? "HIGH ENERGY, TALKATIVE, ENGAGING" : "ENERGIA ALTA, FALADOR, ENVOLVENTE",
            isEN ? "Signs: Immediate eye contact, quick questions, enthusiasm" : "Sinais: Contacto visual imediato, perguntas rápidas, entusiasmo",
            isEN ? "What they want: Interaction, speed, recognition" : "O que querem: Interação, velocidade, reconhecimento",
            isEN ? "Language: 'Perfect! Love your energy. Let me show you...' (match their pace)" : "Linguagem: 'Perfeito! Adoro sua energia. Deixe-me mostrar...' (corresponder seu ritmo)",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "The Reserved Client" : "O Cliente Reservado",
          items: [
            isEN ? "QUIET, OBSERVANT, PRIVATE" : "SILENCIOSO, OBSERVADOR, PRIVADO",
            isEN ? "Signs: Limited eye contact, exploration without asking, short responses" : "Sinais: Contacto visual limitado, exploração sem pedir, respostas curtas",
            isEN ? "What they want: Space, calm, clarity without pressure" : "O que querem: Espaço, calma, clareza sem pressão",
            isEN ? "Language: 'Explore freely. I'm here if you'd like to know more.' (give space)" : "Linguagem: 'Explore livremente. Estou aqui se quiser saber mais.' (dar espaço)",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-type1",
            question: isEN
              ? "An expansive client walks in and immediately greets you with enthusiasm. What's the best response?"
              : "Um cliente expansivo entra e imediatamente cumprimenta com entusiasmo. Qual é a melhor resposta?",
            options: [
              isEN ? "Stay quiet and reserved" : "Fique calado e reservado",
              isEN
                ? "Match their energy, engage quickly, keep the pace moving"
                : "Corresponda à sua energia, envolva-se rapidamente, mantenha o ritmo",
              isEN ? "Ignore them and let them browse" : "Ignore-os e deixe-os navegar",
              isEN ? "Slow them down with detailed questions" : "Desacelere-os com perguntas detalhadas",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-type1",
            question: isEN
              ? "A reserved client is exploring quietly without asking questions. What should you do?"
              : "Um cliente reservado está explorando silenciosamente sem fazer perguntas. O que deve fazer?",
            options: [
              isEN ? "Force engagement with constant questions" : "Força envolvimento com perguntas constantes",
              isEN
                ? "Give them space, observe, and offer help with a gentle opening: 'Explore freely—I'm here if you'd like to know more.'"
                : "Dê-lhes espaço, observe e ofereça ajuda com uma abertura suave: 'Explore livremente—estou aqui se quiser saber mais.'",
              isEN ? "Assume they're not interested" : "Assuma que não estão interessados",
              isEN ? "Leave them completely alone" : "Deixe-os completamente sozinhos",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "cliente-indeciso-pressa",
      title: isEN ? "Indecisive vs. Rushed Clients" : "Cliente Indeciso vs. Com Pressa",
      description: isEN
        ? "Managing decision paralysis and time pressure"
        : "Gerenciar paralisia de decisão e pressão de tempo",
      content: [
        {
          type: "text",
          heading: isEN ? "Opposite Pressures, Same Goal" : "Pressões Opostas, Mesmo Objetivo",
          text: isEN
            ? "The indecisive client is overwhelmed by choices; the rushed client has no time. Premium service means reducing friction for both."
            : "O cliente indeciso fica sobrecarregado por escolhas; o cliente com pressa não tem tempo. Serviço premium significa reduzir fricção para ambos.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "The Indecisive Client" : "O Cliente Indeciso",
          items: [
            isEN ? "OVERWHELMED BY OPTIONS, SEEKS REASSURANCE" : "SOBRECARREGADO POR OPÇÕES, BUSCA REASSEGURAÇÃO",
            isEN ? "Signs: Picks up multiple items, changes mind frequently, asks 'Which is best?'" : "Sinais: Pega em múltiplos itens, muda de ideia frequentemente, pergunta 'Qual é o melhor?'",
            isEN ? "What they need: FEWER OPTIONS (not more), expert guidance, permission to decide" : "O que precisam: MENOS OPÇÕES (não mais), orientação especializada, permissão para decidir",
            isEN
              ? "Language: 'Based on what you've told me, I'd recommend these two. Which resonates more?'"
              : "Linguagem: 'Com base no que me disse, recomendaria estes dois. Qual ressoa mais?'",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "The Rushed Client" : "O Cliente Com Pressa",
          items: [
            isEN ? "TIME PRESSURE, WANTS EFFICIENCY" : "PRESSÃO TEMPORAL, QUER EFICIÊNCIA",
            isEN ? "Signs: Glances at watch, rapid browsing, 'I have 10 minutes'" : "Sinais: Olha para o relógio, navegação rápida, 'Tenho 10 minutos'",
            isEN ? "What they need: SPEED, CLARITY, ONE STRONG RECOMMENDATION" : "O que precisam: VELOCIDADE, CLAREZA, UMA RECOMENDAÇÃO FORTE",
            isEN
              ? "Language: 'You're short on time—I have the perfect solution. Our Essentials are travel-ready and premium.'"
              : "Linguagem: 'Está com pressa—tenho a solução perfeita. Nossos Essentials são prontos para viagem e premium.'",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-type2",
            question: isEN
              ? "An indecisive client keeps asking 'Which one should I choose?' How do you help them?"
              : "Um cliente indeciso continua perguntando 'Qual devo escolher?' Como o ajuda?",
            options: [
              isEN ? "Show them ALL options to explore more" : "Mostre-lhes TODAS as opções para explorar mais",
              isEN
                ? "Narrow it down: 'Based on what you've told me, I'd recommend these two. Which one feels right?'"
                : "Reduza: 'Com base no que me disse, recomendaria estes dois. Qual se sente certo?'",
              isEN ? "Leave them to decide alone" : "Deixe-os decidir sozinhos",
              isEN ? "Push the most expensive option" : "Empurre a opção mais cara",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-type2",
            question: isEN
              ? "A client looks at their watch and says 'I have 5 minutes.' What's your move?"
              : "Um cliente olha para o relógio e diz 'Tenho 5 minutos.' Qual é seu movimento?",
            options: [
              isEN ? "Launch into a long product story" : "Comece uma história de produto longa",
              isEN
                ? "Be direct: 'Perfect. Our Essentials are exactly what you need—premium, compact, ready to go. Let me wrap one up.'"
                : "Seja direto: 'Perfeito. Nossos Essentials são exatamente o que você precisa—premium, compacto, pronto. Deixe-me embrulhar um.'",
              isEN ? "Slow them down further" : "Desacelere-os ainda mais",
              isEN ? "Assume they're not serious" : "Assuma que não são sérios",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "cliente-analitico-emocional",
      title: isEN ? "Analytical vs. Emotional Clients" : "Cliente Analítico vs. Emocional",
      description: isEN
        ? "Balancing data and feeling in your approach"
        : "Equilibrar dados e sentimento em sua abordagem",
      content: [
        {
          type: "text",
          heading: isEN ? "Head vs. Heart" : "Cabeça vs. Coração",
          text: isEN
            ? "Analytical clients want facts, origins, quality metrics. Emotional clients want stories, feeling, and connection. Premium service speaks both languages."
            : "Clientes analíticos querem fatos, origens, métricas de qualidade. Clientes emocionais querem histórias, sentimento e conexão. Serviço premium fala ambas as línguas.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "The Analytical Client" : "O Cliente Analítico",
          items: [
            isEN ? "WANTS DATA, FACTS, PROOF" : "QUER DADOS, FATOS, PROVA",
            isEN ? "Signs: Asks about origins, aging, process, asks 'Why this over that?'" : "Sinais: Pergunta sobre origens, envelhecimento, processo, pergunta 'Por que isto em vez daquilo?'",
            isEN ? "What they want: INFORMATION, SUBSTANTIATION, LOGIC" : "O que querem: INFORMAÇÃO, FUNDAMENTAÇÃO, LÓGICA",
            isEN
              ? "Language: 'This Colheita is 20 years old—made via the solera method, which develops complexity layer by layer. The aging process ensures...'"
              : "Linguagem: 'Este Colheita tem 20 anos—feito via o método solera, que desenvolve complexidade camada por camada. O processo de envelhecimento assegura...'",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "The Emotional Client" : "O Cliente Emocional",
          items: [
            isEN ? "WANTS FEELING, STORY, CONNECTION" : "QUER SENTIMENTO, HISTÓRIA, CONEXÃO",
            isEN
              ? "Signs: Says 'I love this,' touches items gently, asks about the 'why' behind the brand"
              : "Sinais: Diz 'Amo isto', toca itens gentilmente, pergunta sobre o 'porquê' por trás da marca",
            isEN ? "What they want: MEANING, EXPERIENCE, MEMORY" : "O que querem: SIGNIFICADO, EXPERIÊNCIA, MEMÓRIA",
            isEN
              ? "Language: 'Every bottle in our Icon Collection tells a story of the person who crafted it. When you open it, you're opening a moment in time.'"
              : "Linguagem: 'Cada garrafa em nossa Icon Collection conta a história da pessoa que a criou. Quando a abre, está abrindo um momento no tempo.'",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-type3",
            question: isEN
              ? "An analytical client asks about the aging process. How do you respond?"
              : "Um cliente analítico pergunta sobre o processo de envelhecimento. Como responde?",
            options: [
              isEN ? "Give a brief, emotional response" : "Dê uma resposta breve e emocional",
              isEN
                ? "Provide detailed, factual information: methodology, timeframes, chemical transformations, quality metrics"
                : "Forneça informações detalhadas e factuais: metodologia, prazos, transformações químicas, métricas de qualidade",
              isEN ? "Avoid technical details" : "Evite detalhes técnicos",
              isEN ? "Just say 'It's good'" : "Apenas diga 'É bom'",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-type3",
            question: isEN
              ? "An emotional client gently touches a product and asks 'What's the story behind this?' How do you respond?"
              : "Um cliente emocional toca gentilmente num produto e pergunta 'Qual é a história por trás disto?' Como responde?",
            options: [
              isEN ? "Give them technical specifications" : "Dê-lhes especificações técnicas",
              isEN
                ? "Tell the story: the craftspeople, the tradition, the moment they'll experience when they open it, what memory they're taking home"
                : "Conte a história: os artesãos, a tradição, o momento que viverão quando a abrem, que memória estão levando para casa",
              isEN ? "Minimize the emotional aspect" : "Minimize o aspecto emocional",
              isEN ? "Focus only on price" : "Focar apenas no preço",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "cliente-so-ver-decidido",
      title: isEN ? "Just Browsing vs. Decided Clients" : "Cliente 'Só a Ver' vs. Decidido",
      description: isEN
        ? "Distinguishing real interest from casual browsing"
        : "Distinguir interesse real de navegação casual",
      content: [
        {
          type: "text",
          heading: isEN ? "Reading Purchase Intent" : "Lendo Intenção de Compra",
          text: isEN
            ? "Some clients are exploring without intention to buy. Others know exactly what they want. Your approach must be different for each."
            : "Alguns clientes exploram sem intenção de compra. Outros sabem exatamente o que querem. Sua abordagem deve ser diferente para cada um.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "The 'Just Browsing' Client" : "O Cliente 'Só a Ver'",
          items: [
            isEN ? "EXPLORING WITHOUT COMMITMENT" : "EXPLORANDO SEM COMPROMISSO",
            isEN
              ? "Signs: Moves slowly, touches items casually, no rush, says 'Just looking around'"
              : "Sinais: Move-se lentamente, toca itens casualmente, sem pressa, diz 'Apenas a ver'",
            isEN
              ? "What they want: EXPERIENCE, EDUCATION, MAYBE A FUTURE CONNECTION"
              : "O que querem: EXPERIÊNCIA, EDUCAÇÃO, TALVEZ UMA CONEXÃO FUTURA",
            isEN
              ? "Language: 'Feel free to explore. Each piece has its own story. Happy to share if anything catches your eye.'"
              : "Linguagem: 'Sinta-se livre para explorar. Cada peça tem sua própria história. Feliz em compartilhar se algo lhe chamar a atenção.'",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "The Decided Client" : "O Cliente Decidido",
          items: [
            isEN ? "KNOWS WHAT THEY WANT, READY TO BUY" : "SAI O QUE QUER, PRONTO PARA COMPRAR",
            isEN
              ? "Signs: Goes directly to a product, asks specific questions, checks price/details, ready to transact"
              : "Sinais: Vai diretamente para um produto, faz perguntas específicas, verifica preço/detalhes, pronto para transacionar",
            isEN
              ? "What they want: EFFICIENCY, CONFIRMATION, SMOOTH TRANSACTION"
              : "O que querem: EFICIÊNCIA, CONFIRMAÇÃO, TRANSAÇÃO SUAVE",
            isEN
              ? "Language: 'Excellent choice. Let me wrap it beautifully for you. Would you like it gift-wrapped?'"
              : "Linguagem: 'Excelente escolha. Deixe-me embrulhá-lo lindamente. Gostaria de embrulho de presente?'",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-type4",
            question: isEN
              ? "A client is moving slowly, touching items casually, and shows no urgency. What's your approach?"
              : "Um cliente move-se lentamente, toca itens casualmente e não mostra urgência. Qual é sua abordagem?",
            options: [
              isEN ? "Push them toward a purchase immediately" : "Empurre-os imediatamente em direção a uma compra",
              isEN
                ? "Give them space to explore; offer education and stories; plant seeds for future interest"
                : "Dê-lhes espaço para explorar; ofereça educação e histórias; plante sementes para interesse futuro",
              isEN ? "Leave them alone entirely" : "Deixe-os completamente sozinhos",
              isEN ? "Assume they won't buy" : "Assuma que não comprarão",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-type4",
            question: isEN
              ? "A client goes directly to a specific product, checks the price, and asks 'Do you have this in gift wrap?' What do they signal?"
              : "Um cliente vai diretamente para um produto específico, verifica o preço e pergunta 'Têm isto embrulhado de presente?' O que sinalizam?",
            options: [
              isEN ? "They're still browsing" : "Ainda estão navegando",
              isEN
                ? "High purchase intent—they've decided and are moving toward transaction"
                : "Alto intento de compra—decidiram e estão avançando para transação",
              isEN ? "They're not interested" : "Não estão interessados",
              isEN ? "They want a discount" : "Querem um desconto",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "cliente-status-turista",
      title: isEN ? "Status-Seeker vs. Tourist Clients" : "Cliente de Status vs. Turista",
      description: isEN
        ? "Understanding what drives different value systems"
        : "Compreender o que impulsiona diferentes sistemas de valor",
      content: [
        {
          type: "text",
          heading: isEN ? "Different Motivations, Same Premium Service" : "Motivações Diferentes, Mesmo Serviço Premium",
          text: isEN
            ? "Status-seekers want prestige and exclusivity; tourists want memories and experiences. Both deserve premium attention, but for different reasons."
            : "Buscadores de status querem prestígio e exclusividade; turistas querem memórias e experiências. Ambos merecem atenção premium, mas por razões diferentes.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "The Status-Seeking Client" : "O Cliente que Busca Status",
          items: [
            isEN ? "WANTS EXCLUSIVITY, PRESTIGE, RECOGNITION" : "QUER EXCLUSIVIDADE, PRESTÍGIO, RECONHECIMENTO",
            isEN
              ? "Signs: Asks about rarity, limited editions, collector items, how exclusive it is"
              : "Sinais: Pergunta sobre raridade, edições limitadas, itens de colecionador, como é exclusivo",
            isEN
              ? "What they want: THE RAREST, THE LIMITED, THE 'ONLY FEW PEOPLE HAVE THIS'"
              : "O que querem: O MAIS RARO, O LIMITADO, O 'APENAS ALGUNS TÊMOS ISTO'",
            isEN
              ? "Language: 'This THE HUNDRED is one of only 100 ever made. It's a collector's piece—the kind people pass down to generations.'"
              : "Linguagem: 'Este THE HUNDRED é um de apenas 100 já feitos. É uma peça de colecionador—o tipo que as pessoas passam para gerações.'",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "The Tourist Client" : "O Cliente Turista",
          items: [
            isEN ? "WANTS MEMORY, EXPERIENCE, 'PIECE OF HOME'" : "QUER MEMÓRIA, EXPERIÊNCIA, 'PEDAÇO DE CASA'",
            isEN
              ? "Signs: Says 'I want something to remember this by,' asks about origins, interested in the story"
              : "Sinais: Diz 'Quero algo para me lembrar disto', pergunta sobre origens, interessado na história",
            isEN
              ? "What they want: THE STORY, THE CONNECTION, THE EMOTIONAL VALUE"
              : "O que querem: A HISTÓRIA, A CONEXÃO, O VALOR EMOCIONAL",
            isEN
              ? "Language: 'Every time you open this, you'll remember this day in Portugal—the taste, the moment, the people you met.'"
              : "Linguagem: 'Cada vez que abrir isto, irá lembrar-se deste dia em Portugal—o sabor, o momento, as pessoas que conheceu.'",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-type5",
            question: isEN
              ? "A client asks 'How many of these have been made?' What does this signal?"
              : "Um cliente pergunta 'Quantos destes foram feitos?' O que isto sinaliza?",
            options: [
              isEN ? "They're not interested" : "Não estão interessados",
              isEN
                ? "Possible status-seeking: they're evaluating exclusivity and rarity"
                : "Possível busca de status: estão avaliando exclusividade e raridade",
              isEN ? "They want a discount" : "Querem um desconto",
              isEN ? "Just casual curiosity" : "Apenas curiosidade casual",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-type5",
            question: isEN
              ? "A tourist says 'I want something that reminds me of this moment.' How do you respond?"
              : "Um turista diz 'Quero algo que me recorde este momento.' Como responde?",
            options: [
              isEN ? "Show them the most expensive items" : "Mostre-lhes os itens mais caros",
              isEN
                ? "Connect them to products with strong stories: 'This Vintage carries the memory of the harvest year it was made. When you taste it later, you'll be back here.'"
                : "Conecte-os a produtos com histórias fortes: 'Este Vintage carrega a memória do ano de colheita em que foi feito. Quando o provar depois, voltará aqui.'",
              isEN ? "Recommend the cheapest option" : "Recomende a opção mais barata",
              isEN ? "Downplay the emotional aspect" : "Minimize o aspecto emocional",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "cliente-residente-conhecedor",
      title: isEN ? "Local vs. Wine Expert Clients" : "Cliente Residente vs. Conhecedor",
      description: isEN
        ? "Serving locals and connoisseurs with expertise"
        : "Servir locais e connoisseurs com expertise",
      content: [
        {
          type: "text",
          heading: isEN ? "Two Different Expertise Levels" : "Dois Níveis Diferentes de Expertise",
          text: isEN
            ? "Residents know the region but may not know wine. Connoisseurs know wine but may not know The 100's. Adapt your depth accordingly."
            : "Residentes conhecem a região mas podem não conhecer vinho. Connoisseurs conhecem vinho mas podem não conhecer The 100's. Adapte sua profundidade adequadamente.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "The Resident Client" : "O Cliente Residente",
          items: [
            isEN ? "KNOWS THE REGION, MAY NOT KNOW WINES DEEPLY" : "CONHECE A REGIÃO, PODE NÃO CONHECER VINHOS PROFUNDAMENTE",
            isEN
              ? "Signs: Says 'I'm local,' familiar with area references, curious but not technical"
              : "Sinais: Diz 'Sou local', familiarizado com referências da área, curioso mas não técnico",
            isEN
              ? "What they want: LOCAL PRIDE, DISCOVERY, COMMUNITY CONNECTION"
              : "O que querem: ORGULHO LOCAL, DESCOBERTA, CONEXÃO COMUNITÁRIA",
            isEN
              ? "Language: 'As someone from here, you know our region's heart. Our wines capture that—the terroir, the craftsmanship, the generations of care.'"
              : "Linguagem: 'Como alguém daqui, conhece o coração da nossa região. Nossos vinhos capturam isso—o terroir, o artesanato, as gerações de cuidado.'",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "The Wine Connoisseur" : "O Connoisseur de Vinho",
          items: [
            isEN ? "KNOWS WINES DEEPLY, MAY NOT KNOW THE 100'S" : "CONHECE VINHOS PROFUNDAMENTE, PODE NÃO CONHECER THE 100'S",
            isEN
              ? "Signs: Uses technical language, asks about aging curves, tannin structure, comparisons to other producers"
              : "Sinais: Usa linguagem técnica, pergunta sobre curvas de envelhecimento, estrutura de taninos, comparações com outros produtores",
            isEN
              ? "What they want: TECHNICAL DETAIL, COMPARISON TO THEIR EXPERIENCE, PROOF OF QUALITY"
              : "O que querem: DETALHE TÉCNICO, COMPARAÇÃO COM SUA EXPERIÊNCIA, PROVA DE QUALIDADE",
            isEN
              ? "Language: 'This Colheita has a 40+ year aging curve. The acidity is balanced, the complexity develops in layers—I'd compare it favorably to the '70 vintage.'"
              : "Linguagem: 'Este Colheita tem uma curva de envelhecimento de 40+ anos. A acidez é equilibrada, a complexidade desenvolve-se em camadas—comparo favoravelmente ao vintage '70.'",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-type6",
            question: isEN
              ? "A local client asks 'What makes your wines special compared to other producers here?' How do you respond?"
              : "Um cliente local pergunta 'O que torna seus vinhos especiais em comparação com outros produtores aqui?' Como responde?",
            options: [
              isEN ? "Criticize other local producers" : "Critique outros produtores locais",
              isEN
                ? "Celebrate what makes The 100's unique: heritage, family tradition, commitment to excellence that represents the region's pride"
                : "Celebrate o que torna The 100's único: herança, tradição familiar, compromisso com excelência que representa o orgulho da região",
              isEN ? "Downplay the regional aspect" : "Minimize o aspecto regional",
              isEN ? "Focus only on price" : "Focar apenas no preço",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-type6",
            question: isEN
              ? "A connoisseur asks 'How does your aging structure compare to Tawny producers from the 1990s?' How do you handle this?"
              : "Um connoisseur pergunta 'Como sua estrutura de envelhecimento compara com produtores de Tawny dos anos 1990?' Como lida com isto?",
            options: [
              isEN ? "Avoid the technical question" : "Evite a pergunta técnica",
              isEN
                ? "Engage with technical detail: 'Our solera method from that era developed differently—here's the complexity curve...'"
                : "Envolva-se com detalhe técnico: 'Nosso método solera daquele período desenvolveu-se diferentemente—aqui está a curva de complexidade...'",
              isEN ? "Give a vague answer" : "Dê uma resposta vaga",
              isEN ? "Say you don't know" : "Diga que não sabe",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "personalizacao-premium",
      title: isEN
        ? "Premium Personalization: Adapting to All Types"
        : "Personalização Premium: Adaptar a Todos os Tipos",
      description: isEN
        ? "Final synthesis: recognizing and adapting to client profiles in real time"
        : "Síntese final: reconhecer e adaptar a perfis de clientes em tempo real",
      content: [
        {
          type: "text",
          heading: isEN ? "The Art of Reading and Adapting" : "A Arte de Ler e Adaptar",
          text: isEN
            ? "Premium service is not one-size-fits-all. It's the ability to read a client instantly, understand their motivations, and adjust your approach—your language, your pace, your depth—to match exactly what they need. This is where expertise becomes art."
            : "Serviço premium não é tamanho único. É a capacidade de ler um cliente instantaneamente, entender suas motivações e ajustar sua abordagem—seu idioma, seu ritmo, sua profundidade—para corresponder exatamente ao que precisam. Aqui é onde a expertise se torna arte.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "The Reading Sequence" : "A Sequência de Leitura",
          items: [
            isEN ? "FIRST 30 SECONDS: Energy level (expansive or reserved?)" : "PRIMEIROS 30 SEGUNDOS: Nível de energia (expansivo ou reservado?)",
            isEN
              ? "NEXT 30 SECONDS: Decision state (decided, indecisive, browsing, time-pressed?)"
              : "PRÓXIMOS 30 SEGUNDOS: Estado de decisão (decidido, indeciso, navegando, com pressa?)",
            isEN
              ? "LISTEN TO QUESTIONS: Are they analytical (facts), emotional (stories), or experience-focused?"
              : "OUÇA AS PERGUNTAS: São analíticos (fatos), emocionais (histórias) ou focados em experiência?",
            isEN
              ? "WATCH FOR SIGNALS: Status-seeking, local pride, tourist seeking memory, connoisseur depth"
              : "OBSERVE SINAIS: Busca de status, orgulho local, turista procurando memória, profundidade de connoisseur",
          ],
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "Once You Know the Type, You Know..." : "Uma Vez Que Você Saiba o Tipo, Você Sabe...",
          items: [
            isEN
              ? "ENERGY LEVEL → How fast to talk, how much interaction they want"
              : "NÍVEL DE ENERGIA → Quão rápido falar, quanto de interação querem",
            isEN
              ? "DECISION STATE → Whether to offer fewer options (indecisive) or be faster (rushed)"
              : "ESTADO DE DECISÃO → Se oferecer menos opções (indeciso) ou ser mais rápido (apressado)",
            isEN
              ? "THINKING STYLE → Whether to lead with facts (analytical) or stories (emotional)"
              : "ESTILO DE PENSAMENTO → Se liderar com fatos (analítico) ou histórias (emocional)",
            isEN
              ? "MOTIVATION → What to emphasize: exclusivity (status), memory (tourist), expertise (connoisseur), or pride (local)"
              : "MOTIVAÇÃO → O que enfatizar: exclusividade (status), memória (turista), expertise (connoisseur) ou orgulho (local)",
          ],
        },
      ],
      scenario: {
        title: isEN
          ? "Real-World Client Type Scenarios"
          : "Cenários de Tipos de Clientes do Mundo Real",
        description: isEN
          ? "Test your ability to identify and adapt to different client types"
          : "Teste sua capacidade de identificar e adaptar a diferentes tipos de clientes",
        scenarios: [
          {
            id: "scenario-type1",
            title: isEN ? "Scenario 1: The Analytical Status-Seeker" : "Cenário 1: O Buscador de Status Analítico",
            description: isEN
              ? "A man in his 50s enters confidently, examines a premium bottle closely, asks detailed questions about production method, rarity, and collector value"
              : "Um homem nos seus 50s entra confiante, examina uma garrafa premium de perto, faz perguntas detalhadas sobre método de produção, raridade e valor de colecionador",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "Client shows both technical knowledge AND interest in exclusivity"
                  : "Cliente mostra conhecimento técnico E interesse em exclusividade",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Give a simple, emotional response"
                      : "Dê uma resposta simples e emocional",
                    feedback: isEN
                      ? "Incorrect. This client needs technical detail AND exclusivity messaging."
                      : "Incorreto. Este cliente precisa de detalhe técnico E mensagem de exclusividade.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Combine both: 'This Colheita uses the solera method—20-year aging curve. It's from the 2003 harvest, and only 100 bottles were produced that year. It's a serious collector's piece.'"
                      : "Combine ambos: 'Este Colheita usa o método solera—curva de envelhecimento de 20 anos. É da colheita de 2003 e apenas 100 garrafas foram produzidas nesse ano. É uma peça séria de colecionador.'",
                    feedback: isEN
                      ? "Correct! You matched his analytical mindset with technical detail while also speaking to his status motivations through rarity and exclusivity."
                      : "Correto! Correspondeu à sua mentalidade analítica com detalhe técnico enquanto também falava às suas motivações de status através de raridade e exclusividade.",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
          {
            id: "scenario-type2",
            title: isEN
              ? "Scenario 2: The Expansive Emotional Tourist"
              : "Cenário 2: O Turista Emocional Expansivo",
            description: isEN
              ? "A woman enters with high energy, smiles broadly, touches items gently, and says 'This is my first time in Portugal—I want something special to remember this moment!'"
              : "Uma mulher entra com alta energia, sorri amplamente, toca itens gentilmente e diz 'Esta é minha primeira vez em Portugal—quero algo especial para me lembrar deste momento!'",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "Client is energetic, emotionally driven, wants memory and experience"
                  : "Cliente é energético, emocionalmente impulsionado, quer memória e experiência",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Give technical specifications about aging and production"
                      : "Dê especificações técnicas sobre envelhecimento e produção",
                    feedback: isEN
                      ? "Incorrect. This client wants story and emotion, not technical details."
                      : "Incorreto. Este cliente quer história e emoção, não detalhes técnicos.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Match her energy and emotion: 'I love your enthusiasm! This vintage captures the essence of Portugal—every time you open it, you'll taste the harvest moment and remember exactly how you felt today. You're taking home a memory.'"
                      : "Corresponda a sua energia e emoção: 'Adoro seu entusiasmo! Este vintage captura a essência de Portugal—cada vez que o abre, prova o momento da colheita e lembra exatamente como se sentiu hoje. Está levando para casa uma memória.'",
                    feedback: isEN
                      ? "Correct! You matched her emotional energy, emphasized the memory and experience, and spoke directly to her desire to carry this moment home."
                      : "Correto! Correspondeu à sua energia emocional, enfatizou a memória e experiência e falou diretamente ao seu desejo de levar este momento para casa.",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
          {
            id: "scenario-type3",
            title: isEN
              ? "Scenario 3: The Reserved, Time-Pressed Local"
              : "Cenário 3: O Local Reservado e Apressado",
            description: isEN
              ? "A man enters quickly, looks at his watch, nods briefly, browses quietly and efficiently without much engagement, and seems to know what he wants but is in a hurry"
              : "Um homem entra rapidamente, olha para o relógio, acena brevemente, navega silenciosamente e eficientemente sem muito envolvimento e parece saber o que quer mas está com pressa",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "Client is reserved, time-pressed, efficient—probably knows the local products already"
                  : "Cliente é reservado, apressado, eficiente—provavelmente já conhece os produtos locais",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Launch into a long story about the brand heritage"
                      : "Comece uma história longa sobre a herança da marca",
                    feedback: isEN
                      ? "Incorrect. This creates friction with a time-pressed client."
                      : "Incorreto. Isto cria fricção com um cliente apressado.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Give him space, be efficient: 'Welcome. I know you're short on time. Is there something specific I can help with, or would you like to browse?'"
                      : "Dê-lhe espaço, seja eficiente: 'Bem-vindo. Sei que está com pressa. Há algo específico com que possa ajudar ou gostaria de navegar?'",
                    feedback: isEN
                      ? "Correct! You respected his reserve and time constraint, offered efficiency without pressure, and left the choice to him."
                      : "Correto! Respeitou sua reserva e restrição de tempo, ofereceu eficiência sem pressão e deixou a escolha para ele.",
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
          {
            id: "scenario-type4",
            title: isEN
              ? "Scenario 4: The Indecisive Connoisseur"
              : "Cenário 4: O Connoisseur Indeciso",
            description: isEN
              ? "An older woman examines multiple premium bottles, keeps picking them up and putting them down, asks 'Which one do you think is best?' multiple times, shows technical knowledge but can't commit to a choice"
              : "Uma mulher mais velha examina várias garrafas premium, continua pegando e colocando-as, pergunta 'Qual acha que é o melhor?' várias vezes, mostra conhecimento técnico mas não consegue se comprometer com uma escolha",
            steps: [
              {
                id: "step-1",
                situation: isEN
                  ? "Client is knowledgeable but paralyzed by choice—needs expert recommendation + reassurance"
                  : "Cliente é conhecedor mas paralisado pela escolha—precisa de recomendação especializada + reasseguração",
                options: [
                  {
                    id: "opt-1",
                    text: isEN
                      ? "Show her even more options to help her decide"
                      : "Mostre-lhe ainda mais opções para ajudá-la a decidir",
                    feedback: isEN
                      ? "Incorrect. More options increase paralysis."
                      : "Incorreto. Mais opções aumentam a paralisia.",
                    isCorrect: false,
                  },
                  {
                    id: "opt-2",
                    text: isEN
                      ? "Narrow it down with expertise: 'Based on your knowledge and what you've shown interest in, I'd recommend this Colheita—the aging structure aligns with your preferences, and collectors value it highly. Shall I wrap it for you?'"
                      : "Reduza com expertise: 'Com base no seu conhecimento e no que mostrou interesse, recomendaria este Colheita—a estrutura de envelhecimento está alinhada com suas preferências e colecionadores a valorizam muito. Embrulho para si?'",
                    feedback: isEN
                      ? "Correct! You provided expert guidance, spoke to her technical knowledge, and gave her permission to decide by offering confidence."
                      : "Correto! Forneceu orientação especializada, falou ao seu conhecimento técnico e deu-lhe permissão para decidir oferecendo confiança.",
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
            id: "q1-personalization",
            question: isEN
              ? "What's the most important principle of client type adaptation?"
              : "Qual é o princípio mais importante de adaptação ao tipo de cliente?",
            options: [
              isEN ? "Everyone gets the same approach" : "Todos recebem a mesma abordagem",
              isEN
                ? "Read the client, understand their motivations, adjust language, pace, and depth accordingly"
                : "Leia o cliente, entenda suas motivações, ajuste linguagem, ritmo e profundidade adequadamente",
              isEN ? "Treat status-seekers better than tourists" : "Trate buscadores de status melhor do que turistas",
              isEN ? "Never ask questions" : "Nunca faça perguntas",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-personalization",
            question: isEN
              ? "A client shows both technical expertise and interest in rarity. Which approach combines both?"
              : "Um cliente mostra expertise técnica e interesse em raridade. Qual abordagem combina ambos?",
            options: [
              isEN ? "Focus only on technical details" : "Focar apenas em detalhes técnicos",
              isEN ? "Focus only on exclusivity" : "Focar apenas em exclusividade",
              isEN
                ? "Blend both: technical detail + exclusivity messaging + collector value"
                : "Misture ambos: detalhe técnico + mensagem de exclusividade + valor de colecionador",
              isEN ? "Ignore the technical interest" : "Ignore o interesse técnico",
            ],
            correctAnswer: 2,
          },
        ],
      },
    },
  ];

  return (
    <ModuleLayout
      moduleId="client-types"
      title={isEN ? "Module 9: Client Types" : "Módulo 9: Tipos de Cliente"}
      description={
        isEN
          ? "Master the 12 client types and learn how to read, adapt, and serve each one with premium precision"
          : "Domine os 12 tipos de clientes e aprenda a ler, adaptar e servir cada um com precisão premium"
      }
      heroImage="/assets/store-interior.jpg"
      area="area3"
      moduleNumber={9}
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

export default ModuleClientTypes;
