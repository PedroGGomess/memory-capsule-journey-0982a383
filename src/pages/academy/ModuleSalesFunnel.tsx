import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  ScenarioSimulator,
  TipBlock,
  PhraseCard,
  type Phase,
  type Slide,
  type Scenario,
  type ScenarioStep,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ModuleSalesFunnel() {
  const { language } = useLanguage();
  const isEN = language === "en";

  const phases: Phase[] = [
    {
      id: "entrada",
      title: isEN ? "Entry: Premium First Impression" : "Entrada: A Primeira Impressão Premium",
      description: isEN
        ? "The moment a client decides whether to trust us. Create warmth, confidence, and sophistication through presence, body language, and genuine welcome."
        : "O instante em que o cliente decide se confia em nós. Acolhimento genuíno, presença confiante, sofisticação discreta.",
      slides: [
        {
          id: "entrada-1",
          title: isEN ? "The Power of First Contact" : "O Poder do Primeiro Contacto",
          content: isEN
            ? "Entry is where the brand comes alive through posture, eye contact, and energy. What the client feels in the first 10 seconds determines the entire experience."
            : "É o momento em que a marca ganha vida através da postura, do olhar e da energia do colaborador.",
          image: "@/assets/store-interior.jpg",
        },
        {
          id: "entrada-2",
          title: isEN ? "Essential Principles" : "Princípios Essenciais",
          content: isEN
            ? "Warm greeting with subtle smile and open posture. Calm, confident body language. Warm, open question that invites sharing. Careful observation of client style and rhythm. Energy adjusted to profile—never invasive, always present."
            : "Cumprimento premium: sorriso suave, contacto visual, postura aberta. Linguagem corporal que transmite calma e segurança. Pergunta aberta que convida à partilha.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "What to Do" : "O que Fazer",
            items: [
              isEN ? "Smile warmly and make genuine eye contact" : "Sorrir genuinamente e manter contacto visual",
              isEN ? "Use open body language" : "Usar linguagem corporal aberta",
              isEN ? "Match client's energy and pace" : "Adaptar energia ao ritmo do cliente",
              isEN ? "Observe style and intentions carefully" : "Observar o estilo e intenções",
            ],
          },
          {
            title: isEN ? "What to Avoid" : "O que Evitar",
            items: [
              isEN ? "Mechanical or rushed approaches" : "Abordagens mecânicas ou apressadas",
              isEN ? "Early pressure" : "Pressão precoce",
              isEN ? "Focus on internal tasks instead of client" : "Foco em tarefas em vez do cliente",
              isEN ? "Ignoring non-verbal signals" : "Ignorar sinais não verbais",
            ],
          },
        ],
        phrases: [
          {
            pt: "Bem-vindo à The 100's. O que o trouxe até nós hoje?",
            en: "Welcome to The 100's. What brings you in today?",
            context: isEN ? "Warm, open greeting" : "Saudação calorosa e aberta",
          },
          {
            pt: "Bem-vindo à The 100's. Explore à vontade — cada zona da loja tem a sua própria história do tempo.",
            en: "Welcome to The 100's. Please explore freely — each area of the store has its own story of time.",
            context: isEN ? "Inviting exploration" : "Convidando à exploração",
          },
          {
            pt: "Posso ajudar a encontrar algo que combine com o que procura?",
            en: "May I help you find something that matches what you're looking for?",
            context: isEN ? "Consultative offer" : "Oferta consultiva",
          },
          {
            pt: "Se quiser ver algo mais de perto, diga-me.",
            en: "If you'd like to see anything up close, just let me know.",
            context: isEN ? "Available but non-intrusive" : "Disponível mas não intrusivo",
          },
        ],
        quiz: [
          {
            question: isEN ? "What is the primary goal of the Entry phase?" : "Qual é o objetivo principal da fase Entrada?",
            options: [
              {
                text: isEN
                  ? "To immediately present the best products"
                  : "Apresentar imediatamente os melhores produtos",
                correct: false,
              },
              {
                text: isEN
                  ? "To build trust and create comfort through genuine warmth"
                  : "Criar confiança e conforto através de acolhimento genuíno",
                correct: true,
              },
              {
                text: isEN ? "To take the client's contact information" : "Registar os dados do cliente",
                correct: false,
              },
              {
                text: isEN ? "To identify the client's budget immediately" : "Identificar o orçamento do cliente",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "Which body language communicates premium presence?"
              : "Qual linguagem corporal comunica presença premium?",
            options: [
              {
                text: isEN ? "Standing very close to the client" : "Ficar muito próximo do cliente",
                correct: false,
              },
              {
                text: isEN ? "Open posture, subtle smile, calm presence" : "Postura aberta, sorriso subtil, presença calma",
                correct: true,
              },
              {
                text: isEN ? "Maintaining formal distance" : "Manter distância formal",
                correct: false,
              },
              {
                text: isEN ? "Speaking quickly to show enthusiasm" : "Falar rapidamente para mostrar entusiasmo",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What should you do if a client seems reserved?"
              : "O que fazer se o cliente parece reservado?",
            options: [
              {
                text: isEN ? "Press them with more questions" : "Pressionar com mais perguntas",
                correct: false,
              },
              {
                text: isEN
                  ? "Respect their space, maintain calm presence, invite gentle exploration"
                  : "Respeitar o espaço, manter presença calma, convidar exploração",
                correct: true,
              },
              {
                text: isEN ? "Leave them alone completely" : "Deixá-los completamente sozinhos",
                correct: false,
              },
              {
                text: isEN ? "Tell them about all products at once" : "Contar sobre todos os produtos",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "diagnostico",
      title: isEN ? "Diagnosis: Understanding True Needs" : "Diagnóstico: Compreender Necessidades Reais",
      description: isEN
        ? "Active listening and open questions reveal what the client truly seeks—even what they can't articulate themselves. This phase builds trust and prepares perfect recommendations."
        : "Perguntas abertas e escuta ativa revelam o que o cliente realmente procura. Diagnóstico forte prepara recomendações perfeitas.",
      slides: [
        {
          id: "diag-1",
          title: isEN ? "Diagnosis Is the Heart of Premium Selling" : "O Diagnóstico É o Coração da Venda Premium",
          content: isEN
            ? "Diagnosis allows us to understand needs, identify intentions, discover context, build trust, and prepare aligned recommendations. A weak diagnosis compromises the entire experience."
            : "O Diagnóstico permite entender necessidades, identificar intenções, descobrir contexto, criar confiança e preparar recomendações alinhadas.",
        },
        {
          id: "diag-2",
          title: isEN ? "Essential Practices" : "Práticas Essenciais",
          content: isEN
            ? "Open questions that encourage sharing. Active and silent listening. Reformulation and validation to ensure alignment. Observation of non-verbal signals. Gentle exploration of preferences and style."
            : "Perguntas abertas que incentivam a partilha. Escuta ativa. Reformulação e validação. Observação de sinais não verbais.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Strong Diagnosis" : "Diagnóstico Forte",
            items: [
              isEN ? "Ask open questions that invite deeper sharing" : "Fazer perguntas abertas que convidam",
              isEN ? "Listen more than you speak" : "Ouvir mais do que falar",
              isEN ? "Validate what client shares" : "Validar o que o cliente partilha",
              isEN ? "Observe non-verbal cues carefully" : "Observar sinais não verbais",
              isEN ? "Reformulate to confirm understanding" : "Reformular para confirmar compreensão",
            ],
          },
          {
            title: isEN ? "Weak Diagnosis" : "Diagnóstico Fraco",
            items: [
              isEN ? "Speaking more than listening" : "Falar mais do que ouvir",
              isEN ? "Asking closed questions that limit conversation" : "Perguntas fechadas que limitam",
              isEN ? "Assuming preferences without confirming" : "Assumir preferências sem confirmar",
              isEN ? "Repeating questions already answered" : "Repetir perguntas já respondidas",
              isEN ? "Lack of validation" : "Falta de validação",
            ],
          },
        ],
        phrases: [
          {
            pt: "Prefere algo para beber e celebrar, ou algo que fique em casa durante anos?",
            en: "Would you prefer something to open and celebrate with, or something that stays on display for years?",
            context: isEN ? "Essentials vs Vault positioning" : "Essentials vs Vault",
          },
          {
            pt: "É para recordar esta visita ao Porto, ou vai ser uma memória de Portugal para alguém que não esteve aqui?",
            en: "Is this to remember your own visit to Porto, or to give someone a memory of Portugal they didn't experience?",
            context: isEN ? "Personal vs Gift context" : "Pessoal vs Oferta",
          },
          {
            pt: "Quer explorar o Vinho do Porto, ou prefere levar outros sabores de Portugal — azeite, mel, sal marinho?",
            en: "Are you drawn to Port Wine, or would you like to explore Portugal's other flavours — olive oil, honey, sea salt?",
            context: isEN ? "Category exploration" : "Exploração de categoria",
          },
          {
            pt: "O que o atraiu especificamente neste Gift?",
            en: "What specifically drew you to this Gift?",
            context: isEN ? "Understanding preferences" : "Compreender preferências",
          },
          {
            pt: "Se me disser o que tem em mente, posso sugerir duas opções perfeitas.",
            en: "If you tell me what you have in mind, I can suggest two perfect options.",
            context: isEN ? "Collaborative approach" : "Abordagem colaborativa",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "What is the purpose of open questions in diagnosis?"
              : "Qual é o propósito das perguntas abertas no diagnóstico?",
            options: [
              {
                text: isEN ? "To quickly close the sale" : "Fechar rapidamente a venda",
                correct: false,
              },
              {
                text: isEN
                  ? "To reveal needs and build trust through genuine understanding"
                  : "Revelar necessidades e criar confiança",
                correct: true,
              },
              {
                text: isEN ? "To determine the client's budget" : "Determinar o orçamento",
                correct: false,
              },
              {
                text: isEN ? "To showcase all products" : "Mostrar todos os produtos",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "In the Diagnosis phase, what should the collaborator focus on most?"
              : "Na fase Diagnóstico, em que deve focar-se mais?",
            options: [
              {
                text: isEN ? "Presenting features of products" : "Apresentar características dos produtos",
                correct: false,
              },
              {
                text: isEN ? "Talking about the company history" : "Falar da história da empresa",
                correct: false,
              },
              {
                text: isEN
                  ? "Listening actively and asking clarifying questions"
                  : "Ouvir ativamente e fazer perguntas esclarecedoras",
                correct: true,
              },
              {
                text: isEN ? "Deciding what to show first" : "Decidir o que mostrar primeiro",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "Why is personal space important during diagnosis?"
              : "Por que é importante o espaço pessoal no diagnóstico?",
            options: [
              {
                text: isEN ? "It's not important at all" : "Não é importante",
                correct: false,
              },
              {
                text: isEN ? "Because clients like to feel pressured" : "Os clientes gostam de pressão",
                correct: false,
              },
              {
                text: isEN
                  ? "Too close = pressure; too far = indifference. Balance communicates respect and sophistication."
                  : "Muito próximo = pressão; muito longe = indiferença",
                correct: true,
              },
              {
                text: isEN ? "The distance doesn't matter in premium sales" : "A distância não importa",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "upsell",
      title: isEN ? "Upsell: Elevating the Proposal" : "Upsell: Elevar a Proposta",
      description: isEN
        ? "Present superior options naturally, based on what the client shared. Focus on benefits and emotional connection, never features or pressure. Upsell must feel natural, never strategic."
        : "Apresentar opções superiores com naturalidade, fundamentado no que o cliente partilhou. Focar nos benefícios, não nas características.",
      slides: [
        {
          id: "upsell-1",
          title: isEN ? "Upsell Is About Adding Value" : "Upsell É Sobre Adicionar Valor",
          content: isEN
            ? "Upsell creates perceived value, reinforces brand sophistication, surprises positively, and demonstrates care and attention. Always justified by the diagnosis."
            : "O Upsell deve criar valor percebido, reforçar a sofisticação da marca, surpreender de forma positiva e mostrar cuidado.",
        },
        {
          id: "upsell-2",
          title: isEN ? "Premium Upsell Practices" : "Práticas Premium de Upsell",
          content: isEN
            ? "Present superior alternatives naturally. Focus on benefits, not features. Connect emotionally to the piece. Demonstrate with confidence and knowledge. Always justify based on diagnosis."
            : "Apresentar alternativas superiores com naturalidade. Focar nos benefícios. Conectar emocionalmente. Demonstrar com segurança.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Successful Upsell" : "Upsell Bem-Sucedido",
            items: [
              isEN
                ? "Base upsell on specific details client shared"
                : "Basear o upsell nos detalhes específicos partilhados",
              isEN ? "Focus on benefits and experience" : "Focar nos benefícios e experiência",
              isEN ? "Create emotional connection" : "Criar conexão emocional",
              isEN ? "Present 1-2 alternatives, not many" : "Apresentar 1-2 alternativas",
              isEN ? "Let it feel like natural progression" : "Deixar parecer progressão natural",
            ],
          },
          {
            title: isEN ? "What Doesn't Work" : "O Que Não Funciona",
            items: [
              isEN ? "Forcing more expensive products without context" : "Forçar produtos mais caros",
              isEN ? "Presenting too many options" : "Apresentar muitas opções",
              isEN ? "Suggesting without justifying" : "Sugerir sem justificar",
              isEN ? "Creating sense of pressure" : "Criar sensação de pressão",
            ],
          },
        ],
        phrases: [
          {
            pt: "Este Gift tem um design mais distinto — cerâmica artesanal com o Port Wine Gift de 10 anos — e transmite exatamente o que descreveu.",
            en: "This Gift has a more distinctive design — handcrafted ceramic with the 10-year Port Wine Gift — and conveys exactly what you described.",
            context: isEN ? "Tailored premium option" : "Opção premium personalizada",
          },
          {
            pt: "Se procura algo verdadeiramente especial, o nosso Cilindro Cortiça com o Port Wine Gift eleva a experiência de forma única e memorável.",
            en: "If you're looking for something truly special, our Cork Cylinder with the Port Wine Gift elevates the experience in a unique and memorable way.",
            context: isEN ? "Premium elevation" : "Elevação premium",
          },
          {
            pt: "Esta versão complementa melhor a intenção que descreveu — os materiais artesanais e a apresentação reforçam essa memória especial.",
            en: "This version better complements the intention you described — the artisanal materials and presentation reinforce that special memory.",
            context: isEN ? "Benefit-focused positioning" : "Posicionamento focado no benefício",
          },
          {
            pt: "O detalhe que diferencia este Gift é precisamente o cuidado artesanal que procura.",
            en: "The detail that sets this Gift apart is precisely the artisanal care you're looking for.",
            context: isEN ? "Quality and care emphasis" : "Ênfase em qualidade",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "What should upsell always be based on?"
              : "Em que deve basear-se sempre o upsell?",
            options: [
              {
                text: isEN ? "The highest price point" : "O preço mais alto",
                correct: false,
              },
              {
                text: isEN ? "What the client shared in diagnosis" : "O que o cliente partilhou no diagnóstico",
                correct: true,
              },
              {
                text: isEN ? "What the store needs to sell" : "O que a loja precisa de vender",
                correct: false,
              },
              {
                text: isEN ? "Random product combinations" : "Combinações de produtos aleatórias",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "When presenting a higher-value option, what should you emphasize?"
              : "Ao apresentar uma opção de maior valor, o que enfatizar?",
            options: [
              {
                text: isEN ? "The higher price point" : "O preço mais elevado",
                correct: false,
              },
              {
                text: isEN
                  ? "Benefits and emotional connection to the client's intention"
                  : "Benefícios e conexão emocional",
                correct: true,
              },
              {
                text: isEN ? "The technical specifications" : "As especificações técnicas",
                correct: false,
              },
              {
                text: isEN ? "How rare the item is" : "Como é raro o artigo",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "How many options should you present during upsell?"
              : "Quantas opções apresentar no upsell?",
            options: [
              {
                text: isEN ? "As many as possible to give choice" : "O máximo possível para escolha",
                correct: false,
              },
              {
                text: isEN ? "Just one, for simplicity" : "Apenas uma, por simplicidade",
                correct: false,
              },
              {
                text: isEN ? "1-2 carefully selected, premium alternatives" : "1-2 alternativas cuidadosamente selecionadas",
                correct: true,
              },
              {
                text: isEN ? "5+ to ensure something appeals" : "5+, para garantir que algo apele",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "fecho",
      title: isEN ? "Closing: The Elegant Decision" : "Fecho: A Decisão com Elegância",
      description: isEN
        ? "Guide the client to decide with confidence and calm. The close is gentle, clear, secure, and natural. Recap benefits briefly, reinforce the right fit, ask a soft closing question. Respect client rhythm and confidence."
        : "Ajudar o cliente a tomar uma decisão com segurança. O fecho é suave, claro, seguro e natural.",
      slides: [
        {
          id: "fecho-1",
          title: isEN ? "Closing Is the Natural Consequence" : "O Fecho É Consequência Natural",
          content: isEN
            ? "The close is not a final moment—it's the natural consequence of a good journey. The client must feel clarity, security, trust, and elegance in your guidance."
            : "O fecho não é um momento final — é a consequência natural de uma boa jornada.",
        },
        {
          id: "fecho-2",
          title: isEN ? "Essential Practices" : "Práticas Essenciais",
          content: isEN
            ? "Recapitulate benefits briefly and elegantly. Reinforce the appropriateness of the choice. Ask a soft closing question. Maintain calm and confidence. Respect client's pace. Most importantly: after the question, stay silent. The silence is part of the technique—it's where the client decides."
            : "Recapitular benefícios brevemente. Reforçar a adequação da escolha. Fazer uma pergunta de fecho suave. Respeitar o ritmo do cliente.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Premium Closing" : "Fecho Premium",
            items: [
              isEN ? "Recapitulate benefits briefly and elegantly" : "Recapitular benefícios brevemente",
              isEN ? "Reinforce alignment with what client described" : "Reforçar alinhamento",
              isEN ? "Ask with 'prefer' not 'want'" : "Perguntar com 'prefere' não 'quer'",
              isEN ? "Silence after the question is part of the technique" : "Silêncio após pergunta é parte da técnica",
              isEN ? "Maintain calm, confident presence" : "Manter presença calma e confiante",
            ],
          },
          {
            title: isEN ? "What to Avoid" : "O Que Evitar",
            items: [
              isEN ? "Pressuring or rushing" : "Pressionar ou apressar",
              isEN ? "Talking too much" : "Falar demasiado",
              isEN ? "Ignoring buying signals" : "Ignorar sinais de compra",
              isEN ? "Continuing to present options after decision" : "Continuar a mostrar opções",
              isEN ? "Creating artificial urgency" : "Criar urgência artificial",
            ],
          },
        ],
        phrases: [
          {
            pt: "Entre estas duas opções, qual sente que é mais a sua cara?",
            en: "Between these two, which one feels more like you?",
            context: isEN ? "Style-based closing" : "Fechamento com base no estilo",
          },
          {
            pt: "Prefere o Cilindro — mais compacto e fácil de levar — ou o Cubo, que tem mais presença em casa?",
            en: "Would you prefer the Cylinder — more compact and travel-friendly — or the Cube, which has more presence at home?",
            context: isEN ? "Practical preference close" : "Fechamento com preferência prática",
          },
          {
            pt: "Qual destes dois imagina a exibir mais vezes em casa?",
            en: "Which of these two do you see displaying more often at home?",
            context: isEN ? "Emotional connection close" : "Fechamento com conexão emocional",
          },
          {
            pt: "Qual destes dois transmite melhor aquilo que procura?",
            en: "Which of these two better conveys what you're looking for?",
            context: isEN ? "Value alignment close" : "Fechamento com alinhamento de valor",
          },
          {
            pt: "Entre estes dois, qual prefere levar hoje?",
            en: "Between these two, which would you like to take home today?",
            context: isEN ? "Direct but premium" : "Direto mas premium",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "Which closing question is premium?"
              : "Qual pergunta de fecho é premium?",
            options: [
              {
                text: isEN ? "Do you want this?" : "Quer este?",
                correct: false,
              },
              {
                text: isEN ? "Yes or no?" : "Sim ou não?",
                correct: false,
              },
              {
                text: isEN
                  ? "Which of these two feels more like you?"
                  : "Qual destes dois sente que é mais a sua cara?",
                correct: true,
              },
              {
                text: isEN ? "Are you ready to buy?" : "Está pronto para comprar?",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What should you do immediately after asking a closing question?"
              : "O que fazer imediatamente após fazer uma pergunta de fecho?",
            options: [
              {
                text: isEN ? "Answer it for the client" : "Responder pela cliente",
                correct: false,
              },
              {
                text: isEN ? "Repeat the question" : "Repetir a pergunta",
                correct: false,
              },
              {
                text: isEN
                  ? "Stay silent and let the client decide"
                  : "Ficar em silêncio e deixar o cliente decidir",
                correct: true,
              },
              {
                text: isEN ? "Present more options" : "Apresentar mais opções",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "Why do we avoid yes/no questions in the close?"
              : "Por que evitar perguntas sim/não no fecho?",
            options: [
              {
                text: isEN ? "They are always wrong" : "Estão sempre erradas",
                correct: false,
              },
              {
                text: isEN
                  ? "They make 'no' too easy and create pressure"
                  : "Tornam 'não' fácil e criam pressão",
                correct: true,
              },
              {
                text: isEN ? "Clients prefer them" : "Os clientes preferem-nas",
                correct: false,
              },
              {
                text: isEN ? "They are more premium" : "São mais premium",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "crosssell",
      title: isEN ? "Cross-Sell: Completing the Experience" : "Cross-Selling: Completar a Experiência",
      description: isEN
        ? "The final stage—elevate the experience with one suggestion that makes sense for the client. Timing is perfect: after the decision, before payment. Relevant, useful, discrete, elegant. Only ONE suggestion—premium is focused."
        : "Elevar a experiência com um detalhe que faz sentido. Timing perfeito: após a decisão, antes do pagamento. Apenas uma sugestão.",
      slides: [
        {
          id: "cross-1",
          title: isEN ? "Cross-Sell Is About Completeness" : "Cross-Selling É Sobre Completude",
          content: isEN
            ? "Cross-sell is the final stage where we elevate the experience with a detail that makes sense for the client. It must be relevant, useful, discrete, and elegant—never forced."
            : "Cross-selling é a etapa final — onde elevamos a experiência com um detalhe que faz sentido.",
        },
        {
          id: "cross-2",
          title: isEN ? "Essential Practices" : "Práticas Essenciais",
          content: isEN
            ? "Personalized suggestions. Clear explanation of utility. Demonstration of how it complements the purchase. Perfect timing: after decision, before payment. Only ONE suggestion—premium is focus."
            : "Sugestões personalizadas. Explicação clara da utilidade. Timing perfeito. Apenas uma sugestão — premium é foco.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Successful Cross-Sell" : "Cross-Sell Bem-Sucedido",
            items: [
              isEN ? "Suggest only ONE item" : "Sugerir apenas UM artigo",
              isEN ? "Base it on what client selected" : "Basear no que o cliente selecionou",
              isEN ? "Explain how it complements the gift" : "Explicar como complementa",
              isEN ? "Focus on utility and experience" : "Focar na utilidade e experiência",
              isEN ? "Suggest after decision, before payment" : "Sugerir após decisão, antes do pagamento",
            ],
          },
          {
            title: isEN ? "What Doesn't Work" : "O Que Não Funciona",
            items: [
              isEN ? "Suggesting irrelevant items" : "Sugerir artigos irrelevantes",
              isEN ? "Making it seem like a forced sale" : "Parecer uma venda forçada",
              isEN ? "Presenting multiple options" : "Apresentar várias opções",
              isEN ? "Suggesting before the decision" : "Sugerir antes da decisão",
              isEN ? "Being pushy or insistent" : "Ser invasivo ou insistente",
            ],
          },
        ],
        phrases: [
          {
            pt: "Para acompanhar este Port Wine de 10 anos, o nosso mel artesanal cria um contraste de sabores que eleva a degustação a um nível verdadeiramente gastronómico — é um presente que surpreende em dois sentidos.",
            en: "To complement this 10-year Port Wine, our artisanal honey creates a flavour contrast that elevates the tasting to a truly gastronomic level — a gift that surprises on two levels.",
            context: isEN ? "Flavour pairing" : "Harmonização de sabores",
          },
          {
            pt: "Este Gift de azeite / mel / sal marinho complementa perfeitamente a sua escolha — uma experiência completa dos sabores de Portugal.",
            en: "This olive oil / honey / sea salt Gift perfectly complements your choice — a complete experience of Portugal's flavours.",
            context: isEN ? "Flavour collection completion" : "Coleção de sabores completa",
          },
          {
            pt: "Esta embalagem premium protege o seu Port Wine Gift e torna a oferta ainda mais especial — perfeita para levar ou enviar.",
            en: "This premium gift box protects your Port Wine Gift and makes the gift even more special — perfect to carry or send.",
            context: isEN ? "Packaging enhancement" : "Melhoria de apresentação",
          },
          {
            pt: "Um cartão personalizado com data e mensagem transforma este Gift numa memória permanente — algo que o destinatário guardará para sempre.",
            en: "A personalized card with date and message transforms this Gift into a lasting memory — something the recipient will treasure forever.",
            context: isEN ? "Personalization addition" : "Adição de personalização",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "When is the ideal time for cross-selling?"
              : "Qual é o tempo ideal para cross-selling?",
            options: [
              {
                text: isEN ? "At the very beginning of the interaction" : "No início da interação",
                correct: false,
              },
              {
                text: isEN ? "Immediately after diagnosis" : "Imediatamente após o diagnóstico",
                correct: false,
              },
              {
                text: isEN
                  ? "After the client has decided, before payment"
                  : "Após o cliente decidir, antes do pagamento",
                correct: true,
              },
              {
                text: isEN ? "While the client is leaving" : "Quando o cliente está a sair",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "How many cross-sell suggestions should you make?"
              : "Quantas sugestões de cross-sell fazer?",
            options: [
              {
                text: isEN ? "2-3 options for variety" : "2-3 opções para variedade",
                correct: false,
              },
              {
                text: isEN ? "As many as possible" : "O máximo possível",
                correct: false,
              },
              {
                text: isEN ? "Only ONE suggestion—premium is focused" : "Apenas UMA — premium é focado",
                correct: true,
              },
              {
                text: isEN ? "No suggestions at all" : "Nenhuma sugestão",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What makes a cross-sell suggestion successful?"
              : "O que torna bem-sucedida uma sugestão de cross-sell?",
            options: [
              {
                text: isEN ? "Its high price point" : "O seu preço elevado",
                correct: false,
              },
              {
                text: isEN
                  ? "Its relevance to the client's purchase and clear value"
                  : "Sua relevância e valor claro para o cliente",
                correct: true,
              },
              {
                text: isEN ? "Its scarcity or exclusivity" : "Sua escassez ou exclusividade",
                correct: false,
              },
              {
                text: isEN ? "The insistence with which it's presented" : "A insistência na apresentação",
                correct: false,
              },
            ],
          },
        ],
      },
    },
  ];

  const scenario: Scenario = {
    id: "funnel-complete",
    title: isEN ? "Complete Funnel: French Anniversary Couple" : "Funil Completo: Casal Francês Aniversário",
    description: isEN
      ? "A French couple, 40-50 years old, walks in looking for a special anniversary gift. Guide them through all 5 funnel stages with premium elegance."
      : "Casal francês, 40-50 anos, procura presente especial para aniversário de casamento. Guide through all 5 funnel stages.",
    customerProfile: isEN
      ? "French couple, 40-50 years old, celebrating a special wedding anniversary. They value design and emotional meaning over price. They appreciate careful, non-invasive guidance."
      : "Casal francês, 40-50 anos, celebrando aniversário de casamento especial. Valorizam design e significado emocional.",
    steps: [
      {
        id: "funnel-entrada",
        phase: "entrada",
        scenario: isEN
          ? "The couple enters the store, looking around with mild interest. They're well-dressed, composed, slightly reserved."
          : "O casal entra na loja, olhando ao redor com interesse moderado. Bem-vestido, composto, ligeiramente reservado.",
        options: [
          {
            text: isEN
              ? "Smile warmly, give them space, welcome them with 'Explore freely, each piece tells a story.'"
              : "Sorrir calosamente, dar espaço, acolher: 'Explore à vontade...'",
            score: 3,
            feedback: isEN
              ? "Perfect. You respected their reserved nature while creating a warm, sophisticated welcome."
              : "Perfeito. Respeitou a natureza reservada enquanto criava acolhimento sophisticado.",
          },
          {
            text: isEN
              ? "Immediately ask 'What brings you in today? Are you looking for something specific?'"
              : "Perguntar imediatamente 'O que o traz aqui? Procura algo específico?'",
            score: 1,
            feedback: isEN
              ? "Too direct and pressuring. French clients appreciate more space initially."
              : "Demasiado direto. Clientes franceses apreciam mais espaço.",
          },
          {
            text: isEN
              ? "Ignore them and continue with your tasks, waiting for them to approach you."
              : "Ignorá-los e continuar com tarefas, esperando aproximação.",
            score: 0,
            feedback: isEN
              ? "Too distant. They need to feel your presence and availability, even if not immediately engaged."
              : "Demasiado distante. Precisam sentir sua presença e disponibilidade.",
          },
        ],
      },
      {
        id: "funnel-diag",
        phase: "diagnostico",
        scenario: isEN
          ? "After exploring, they pause near a premium Port Wine Gift set. The woman touches it gently. This is your moment."
          : "Após exploração, eles pausam perto de um Gift de Port Wine. A mulher toca nele suavemente. Este é seu momento.",
        options: [
          {
            text: isEN
              ? "Approach gently with: 'That collection is quite special. Is this for a particular celebration, or are you drawn to the design itself?'"
              : "Aproximar-se suavemente: 'Essa coleção é especial. É para celebração ou pelo design?'",
            score: 3,
            feedback: isEN
              ? "Excellent. You asked an open question that reveals both occasion and preference without pressure."
              : "Excelente. Pergunta aberta que revela ocasião e preferência sem pressão.",
          },
          {
            text: isEN
              ? "Quickly say: 'Great choice! That's one of our best sellers. It's €180.'"
              : "Dizer rapidamente: 'Ótima escolha! É um dos melhores. É €180.'",
            score: 0,
            feedback: isEN
              ? "No diagnosis. You jumped to product features and price, missing the emotional context."
              : "Sem diagnóstico. Saltou para features e preço, perdendo o contexto emocional.",
          },
          {
            text: isEN
              ? "Ask: 'How much are you looking to spend?' and 'Is this a gift or for yourself?'"
              : "Perguntar: 'Quanto quer gastar?' e 'É para si ou para oferecer?'",
            score: 1,
            feedback: isEN
              ? "Too transactional. The budget question feels pushy. Lead with intention and emotion first."
              : "Demasiado transacional. Pergunta sobre orçamento parece invasiva.",
          },
        ],
      },
      {
        id: "funnel-upsell",
        phase: "upsell",
        scenario: isEN
          ? "They mention it's for their 25th wedding anniversary—they want something both elegant and memorable. They're drawn to the design but uncertain about the specific model."
          : "Eles mencionam 25º aniversário — querem algo elegante e memorável. Atraídos pelo design mas incertos sobre o modelo específico.",
        options: [
          {
            text: isEN
              ? "Show the Premium Cylinder with 10-year Port Wine: 'This version offers handcrafted ceramic and aged wine—it's designed for moments exactly like yours. It becomes a piece of art in your home.'"
              : "Mostrar Cilindro Premium com Port Wine de 10 anos: 'Esta versão oferece cerâmica artesanal e vinho envelhecido...'",
            score: 3,
            feedback: isEN
              ? "Perfect. You elevated the proposal based on their stated intention (memorable, elegant) and focused on emotional benefit, not features."
              : "Perfeito. Elevou a proposta baseado em intenção (memorável, elegante) e benefício emocional.",
          },
          {
            text: isEN
              ? "Show them all 5 models and let them decide: 'Which one do you like best?'"
              : "Mostrar todos os 5 modelos e deixá-los decidir: 'Qual vocês gostam mais?'",
            score: 0,
            feedback: isEN
              ? "Too many options. Premium selling means curation. You should have presented 1-2 premium alternatives based on diagnosis."
              : "Muitas opções. Venda premium é curadoria. Apresentar 1-2 alternativas.",
          },
          {
            text: isEN
              ? "Suggest the cheapest option: 'This is our entry-level gift. Perfect for anniversaries.'"
              : "Sugerir opção mais barata: 'Este é nosso gift de entrada. Perfeito para aniversários.'",
            score: 0,
            feedback: isEN
              ? "Missed the opportunity. They expressed wanting elegance and memorability—you should upsell value, not down-sell."
              : "Perdeu oportunidade. Expressaram querer elegância — deveria fazer upsell de valor.",
          },
        ],
      },
      {
        id: "funnel-fecho",
        phase: "fecho",
        scenario: isEN
          ? "They're clearly drawn to the Premium Cylinder with 10-year Port. They compare it with a mid-tier option. Now it's time to close elegantly."
          : "Eles estão claramente atraídos pelo Cilindro Premium. Comparam com uma opção mid-tier. Hora de fechar com elegância.",
        options: [
          {
            text: isEN
              ? "Say: 'Between these two, which one feels more like the moment you want to celebrate? Which would you display more proudly in your home?'"
              : "Dizer: 'Entre estes dois, qual sente que é mais o momento que quer celebrar?'",
            score: 3,
            feedback: isEN
              ? "Ideal. You used an emotional, preference-based closing question that respected their autonomy while guiding the decision."
              : "Ideal. Pergunta de fecho emocional que respeita autonomia enquanto guia a decisão.",
          },
          {
            text: isEN
              ? "Ask: 'Do you want this one or the other?' and wait for a yes/no answer."
              : "Perguntar: 'Querem este ou o outro?' e esperar resposta sim/não.",
            score: 0,
            feedback: isEN
              ? "Too binary. This makes 'no' too easy. Premium closing avoids yes/no questions."
              : "Demasiado binário. Isso torna 'não' fácil. Premium evita perguntas sim/não.",
          },
          {
            text: isEN
              ? "Present the whole range again: 'I have 5 models. Which catches your eye?'"
              : "Apresentar toda a gama: 'Tenho 5 modelos. Qual chama a sua atenção?'",
            score: 0,
            feedback: isEN
              ? "Too many options at close time. By now, you should have narrowed to 1-2 choices. You're creating confusion, not simplification."
              : "Muitas opções no fecho. Deveria estreitar para 1-2. Cria confusão, não simplicidade.",
          },
        ],
      },
      {
        id: "funnel-crosssell",
        phase: "crosssell",
        scenario: isEN
          ? "They've decided on the Premium Cylinder with 10-year Port Wine. Payment is being processed. One final opportunity to elevate the experience."
          : "Decidiram pelo Cilindro Premium. Pagamento em processo. Uma última oportunidade para elevar.",
        options: [
          {
            text: isEN
              ? "Suggest: 'A personalized card with your anniversary date transforms this into a permanent memory. Shall I prepare one for you?'"
              : "Sugerir: 'Um cartão personalizado com data do aniversário torna isto numa memória permanente.'",
            score: 3,
            feedback: isEN
              ? "Perfect. One relevant suggestion that complements without pressure. It's personal, meaningful, and appropriate for their occasion."
              : "Perfeito. Uma sugestão relevante que complementa sem pressão. Pessoal e significativa.",
          },
          {
            text: isEN
              ? "Offer: 'Want to add our premium box, the artisanal honey, a engraved bottle opener, and our gift wrapping? They're all just €150 more.'"
              : "Oferecer: 'Quer adicionar caixa premium, mel, abridor, embrulho? Mais €150.'",
            score: 0,
            feedback: isEN
              ? "Too many options and too pushy. Premium cross-sell is ONE suggestion. This feels like an upsell pile-on."
              : "Muitas opções e invasivo. Cross-sell premium é UMA sugestão. Isto parece uma aglomeração.",
          },
          {
            text: isEN
              ? "Say nothing and hand them the receipt. Their experience is complete."
              : "Não dizer nada e entregar recibo. Experiência completa.",
            score: 1,
            feedback: isEN
              ? "Missed an elegant finishing touch. A well-timed, single cross-sell suggestion elevates the final moment without pressure."
              : "Perdeu toque final elegante. Uma sugestão bem-timing eleva o momento final.",
          },
        ],
      },
    ],
  };

  return (
    <ModuleLayout
      moduleId="sales-funnel"
      title={isEN ? "Sales Funnel: The 100's Premium Approach" : "Funil Comercial: Abordagem Premium The 100's"}
      description={isEN
        ? "Master the 5 stages of the premium sales funnel: Entry, Diagnosis, Upsell, Closing, and Cross-Sell. Each stage is an opportunity to create impact, elevate perception, and reinforce brand identity."
        : "Domine os 5 estágios do funil comercial premium: Entrada, Diagnóstico, Upsell, Fecho e Cross-Selling."}
    >
      <ContentBlock>
        <PhaseSystem phases={phases} />
      </ContentBlock>

      <ContentBlock>
        <h2>{isEN ? "Complete Funnel Simulation" : "Simulação do Funil Completo"}</h2>
        <p>
          {isEN
            ? "Practice the complete customer journey through all 5 funnel stages. Make premium choices at each moment."
            : "Pratique a jornada completa do cliente através dos 5 estágios do funil."}
        </p>
        <ScenarioSimulator scenario={scenario} />
      </ContentBlock>
    </ModuleLayout>
  );
}
