import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  ScenarioSimulator,
  PhaseQuiz,
  type Phase,
  type Slide,
  type QuizQuestion,
  type Scenario,
  type ScenarioStep,
} from "@/components/InteractiveModule";

export default function ModuleFinalCertification() {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [currentPhase, setCurrentPhase] = useState(0);
  const [certificationResult, setCertificationResult] = useState<{
    score: number;
    level: string;
    date: string;
  } | null>(null);

  const phases: Phase[] = [
    {
      id: "phase-1-final-exam",
      title: isEN ? "Final Exam (30 Questions)" : "Exame Final (30 Perguntas)",
      description: isEN
        ? "Comprehensive assessment covering all modules. 80% required to pass."
        : "Avaliação abrangente cobrindo todos os módulos. 80% necessário para passar.",
      slides: [] as Slide[],
      quiz: {
        questions: [
          // BRAND & PRODUCTS (5 questions)
          {
            id: "q1-brand",
            question: isEN
              ? "What is The 100's core business philosophy?"
              : "Qual é a filosofia de negócio central da The 100's?",
            options: isEN
              ? ["100% product focus", "70% product, 30% experience", "100% service", "50/50 split"]
              : ["100% foco em produto", "70% produto, 30% experiência", "100% serviço", "Divisão 50/50"],
            correctAnswer: 1,
            explanation: isEN
              ? "The 100's operates on the 70/30 principle: 70% premium products and 30% exceptional experience."
              : "The 100's opera no princípio 70/30: 70% produtos premium e 30% experiência excepcional.",
          },
          {
            id: "q2-tier-premium",
            question: isEN
              ? "What is the price range for Tier 3 (Premium) bottles?"
              : "Qual é a faixa de preço para garrafas Tier 3 (Premium)?",
            options: isEN
              ? ["€30-60", "€60-100", "€100-200", "€200+"]
              : ["€30-60", "€60-100", "€100-200", "€200+"],
            correctAnswer: 2,
            explanation: isEN
              ? "Tier 3 Premium bottles range from €100-200 and target connoisseurs and high-value gifts."
              : "Garrafas Tier 3 Premium variam de €100-200 e visam conhecedores e presentes de alto valor.",
          },
          {
            id: "q3-packaging",
            question: isEN
              ? "What does premium packaging at The 100's communicate to the customer?"
              : "O que embalagem premium na The 100's comunica ao cliente?",
            options: isEN
              ? ["It's cheap and reusable", "Care, quality, and investment value", "Just protection", "Nothing special"]
              : ["É barata e reutilizável", "Cuidado, qualidade, e valor de investimento", "Apenas proteção", "Nada especial"],
            correctAnswer: 1,
            explanation: isEN
              ? "Premium packaging communicates that the product inside is special and worth protecting—reinforcing the premium brand."
              : "Embalagem premium comunica que o produto dentro é especial e vale a pena proteger—reforçando a marca premium.",
          },
          {
            id: "q4-tier-targets",
            question: isEN
              ? "What percentage of daily sales should come from Tier 2+ products?"
              : "Que percentagem de vendas diárias devem vir de produtos Tier 2+?",
            options: isEN
              ? ["30%", "45%", "55%", "70%"]
              : ["30%", "45%", "55%", "70%"],
            correctAnswer: 2,
            explanation: isEN
              ? "The target is 55% of daily sales from Tier 2+, which drives higher margins and profitability."
              : "O alvo é 55% de vendas diárias de Tier 2+, que impulsiona margens e rentabilidade mais altas.",
          },
          {
            id: "q5-limited-edition",
            question: isEN
              ? "How should you position limited-edition bottles to customers?"
              : "Como deve posicionar garrafas de edição limitada aos clientes?",
            options: isEN
              ? [
                  "As 'just regular bottles'",
                  "As investment-grade, collectible pieces with scarcity value",
                  "As mistake bottles",
                  "As generic options",
                ]
              : [
                  "Como 'garrafas apenas regulares'",
                  "Como peças de nível de investimento, colecionáveis com valor de escassez",
                  "Como garrafas de erro",
                  "Como opções genéricas",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Limited editions should be positioned as collectible, investment-grade pieces with scarcity value—justifying premium pricing."
              : "Edições limitadas devem ser posicionadas como peças colecionáveis de nível de investimento com valor de escassez—justificando preço premium.",
          },

          // SALES FUNNEL (5 questions)
          {
            id: "q6-sales-stages",
            question: isEN
              ? "What are the main stages of The 100's sales funnel?"
              : "Quais são os principais estágios do funil de vendas da The 100's?",
            options: isEN
              ? [
                  "Only 'buy now'",
                  "Greet → Diagnose → Present → Upsell → Close",
                  "Price → Pay → Leave",
                  "Chat → Suggest → Done",
                ]
              : [
                  "Apenas 'comprar agora'",
                  "Cumprimento → Diagnóstico → Apresentação → Venda Adicional → Fechamento",
                  "Preço → Pagar → Sair",
                  "Bate-papo → Sugerir → Feito",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "The sales funnel is: Greet (welcome) → Diagnose (understand needs) → Present (show solutions) → Upsell (add value) → Close (confirm)."
              : "O funil de vendas é: Cumprimento (bem-vindo) → Diagnóstico (entender necessidades) → Apresentação (mostrar soluções) → Venda Adicional (adicionar valor) → Fechamento (confirmar).",
          },
          {
            id: "q7-diagnostic-questions",
            question: isEN
              ? "What is the purpose of diagnostic questions in the sales process?"
              : "Qual é o propósito de perguntas diagnósticas no processo de vendas?",
            options: isEN
              ? [
                  "To delay the sale",
                  "To understand customer needs and recommend the right tier",
                  "To make customers uncomfortable",
                  "To waste time",
                ]
              : [
                  "Para atrasar a venda",
                  "Para entender necessidades de cliente e recomendar o tier certo",
                  "Para deixar clientes desconfortáveis",
                  "Para desperdiçar tempo",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Diagnostic questions help you understand: budget, occasion, recipient, preferences—so you can recommend the perfect tier and bottle."
              : "Perguntas diagnósticas ajudam você entender: orçamento, ocasião, destinatário, preferências—para que possa recomendar o tier e garrafa perfeitos.",
          },
          {
            id: "q8-presentation",
            question: isEN
              ? "When presenting a bottle, what should you emphasize first?"
              : "Ao apresentar uma garrafa, o que deve enfatizar primeiro?",
            options: isEN
              ? [
                  "The price",
                  "The story and experience, then the product benefits",
                  "The discount",
                  "That it's expensive",
                ]
              : [
                  "O preço",
                  "A história e experiência, depois os benefícios do produto",
                  "O desconto",
                  "Que é caro",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Lead with story and experience (the 30%), which builds emotional connection. Product benefits follow naturally."
              : "Lidere com história e experiência (o 30%), que constrói conexão emocional. Benefícios de produto seguem naturalmente.",
          },
          {
            id: "q9-upsell-moment",
            question: isEN
              ? "When is the best moment to upsell personalization services?"
              : "Qual é o melhor momento para vender personalização adicional?",
            options: isEN
              ? [
                  "Before the customer decides what they want",
                  "After they've committed to a bottle, during checkout",
                  "Never offer it",
                  "Only if they ask",
                ]
              : [
                  "Antes do cliente decidir o que quer",
                  "Depois de terem comprometido com uma garrafa, durante o checkout",
                  "Nunca ofereça",
                  "Apenas se perguntarem",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Upsell at checkout when they've already decided to buy. At this point, adding €15-20 for personalization feels like a small increment for big value."
              : "Venda adicional no checkout quando já decidiram comprar. Neste ponto, adicionar €15-20 para personalização parece um pequeno incremento por grande valor.",
          },
          {
            id: "q10-close",
            question: isEN
              ? "What does a strong close look like at The 100's?"
              : "Como se vê um fechamento forte na The 100's?",
            options: isEN
              ? [
                  "Just hand them the receipt",
                  "Confirm the decision + offer protection options + request follow-up + thank them",
                  "Never close, let them decide",
                  "Push harder if they hesitate",
                ]
              : [
                  "Apenas entregue-lhes o recibo",
                  "Confirme a decisão + ofereça opções de proteção + solicite acompanhamento + obrigado",
                  "Nunca feche, deixe-os decidir",
                  "Empurre mais se hesitarem",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "A strong close confirms their choice, adds value (protection/personalization), captures contact info for follow-up, and builds relationship."
              : "Um fechamento forte confirma sua escolha, adiciona valor (proteção/personalização), captura informações de contacto para acompanhamento, e constrói relacionamento.",
          },

          // OBJECTION HANDLING (5 questions)
          {
            id: "q11-price-objection",
            question: isEN
              ? "A customer says 'This is too expensive.' What's your best response?"
              : "Um cliente diz 'Isto é muito caro.' Qual é sua melhor resposta?",
            options: isEN
              ? [
                  "'No it's not, you're wrong'",
                  "'I understand. Let me show you the value you're getting for this investment'",
                  "'Okay, let's go cheaper'",
                  "'That's our price, take it or leave it'",
                ]
              : [
                  "'Não, você está errado'",
                  "'Entendo. Deixe-me mostrar o valor que você está obtendo por este investimento'",
                  "'Tudo bem, vamos mais barato'",
                  "'Esse é nosso preço, pegue ou saia'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Reframe price as investment. Focus on value: the quality, experience, story, and how it will be remembered. Premium positioning."
              : "Reformule preço como investimento. Foque em valor: qualidade, experiência, história, e como será lembrado. Posicionamento premium.",
          },
          {
            id: "q12-transport-concern",
            question: isEN
              ? "Customer: 'I'm worried it will break during travel.' Your response?"
              : "Cliente: 'Estou preocupado que quebre durante a viagem.' Sua resposta?",
            options: isEN
              ? [
                  "'That's unlikely'",
                  "'Let me walk you through exactly how we protect bottles for transport. You have options.'",
                  "'Just pack it well'",
                  "'There's nothing I can do about that'",
                ]
              : [
                  "'Isso é improvável'",
                  "'Deixe-me guiá-lo através de exatamente como protegemos garrafas para transporte. Você tem opções.'",
                  "'Apenas empacote bem'",
                  "'Não há nada que eu possa fazer sobre isso'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "This is your expertise moment. Demonstrate knowledge of TSA rules, packing methods, shipping options. Turn worry into confidence."
              : "Este é seu momento de expertise. Demonstre conhecimento de regras TSA, métodos de embalagem, opções de envio. Transforme preocupação em confiança.",
          },
          {
            id: "q13-indecision",
            question: isEN
              ? "Customer is torn between two Tier 2 bottles. How do you handle it?"
              : "Cliente está dividido entre duas garrafas Tier 2. Como lidar?",
            options: isEN
              ? [
                  "Tell them one is better",
                  "Help them decide by asking: 'Who is this for? What's the occasion?' and recommend based on their answer",
                  "Say 'either one is fine'",
                  "Push the more expensive one",
                ]
              : [
                  "Diga-lhes que uma é melhor",
                  "Ajude-os a decidir perguntando: 'Isto é para quem? Qual é a ocasião?' e recomende baseado na resposta",
                  "Diga 'qualquer uma está bem'",
                  "Empurre a mais cara",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Use diagnostic questions to understand the occasion and recipient. Confidence in recommendation closes the decision."
              : "Use perguntas diagnósticas para entender a ocasião e destinatário. Confiança em recomendação fecha a decisão.",
          },
          {
            id: "q14-time-objection",
            question: isEN
              ? "Customer: 'Can I come back later to decide?' Your response?"
              : "Cliente: 'Posso voltar mais tarde para decidir?' Sua resposta?",
            options: isEN
              ? [
                  "'Sure, maybe you won't come back'",
                  "'I understand. Would it help if I reserved this bottle for you? Or let me show you why deciding now is easier'",
                  "'Then you definitely won't buy it'",
                  "'Whatever'",
                ]
              : [
                  "'Claro, talvez você não volte'",
                  "'Entendo. Ajudaria se eu reservasse esta garrafa para você? Ou deixe-me mostrar por que decidir agora é mais fácil'",
                  "'Então você definitivamente não comprará'",
                  "'O que seja'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Offer to reserve it or create urgency by highlighting why now is better (availability, peace of mind, experience). Respect their decision but close the door softly."
              : "Ofereça para reservar ou crie urgência destacando por que agora é melhor (disponibilidade, tranquilidade, experiência). Respeite sua decisão mas feche a porta suavemente.",
          },
          {
            id: "q15-competitor",
            question: isEN
              ? "Customer mentions they saw a cheaper bottle elsewhere. Response?"
              : "Cliente menciona que viu uma garrafa mais barata em outro lugar. Resposta?",
            options: isEN
              ? [
                  "'Our bottles are better'",
                  "'Price is one factor. The 100's offers expertise, experience, and premium service that justifies our pricing'",
                  "'Then go buy it there'",
                  "'We'll match any price'",
                ]
              : [
                  "'Nossas garrafas são melhores'",
                  "'Preço é um fator. The 100's oferece expertise, experiência, e serviço premium que justificam nosso preço'",
                  "'Então vá comprá-la lá'",
                  "'Nós combinaremos qualquer preço'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Never compete on price alone. Highlight your unique value: expertise, experience, service, relationship. The 30% is worth it."
              : "Nunca compita apenas em preço. Destaque seu valor único: expertise, experiência, serviço, relacionamento. O 30% vale a pena.",
          },

          // TOURIST PSYCHOLOGY (3 questions)
          {
            id: "q16-tourist-mindset",
            question: isEN
              ? "What is the primary motivation for most tourist customers at The 100's?"
              : "Qual é a motivação primária para a maioria dos clientes turistas na The 100's?",
            options: isEN
              ? [
                  "Getting the cheapest bottle",
                  "Taking home a memorable experience and premium gift to remember their trip",
                  "Browsing without buying",
                  "Comparison shopping",
                ]
              : [
                  "Obter a garrafa mais barata",
                  "Levar para casa uma experiência memorável e presente premium para lembrar sua viagem",
                  "Navegar sem comprar",
                  "Comparar compras",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Tourists buy memories and stories, not just bottles. They want to bring home something that represents their experience."
              : "Turistas compram memórias e histórias, não apenas garrafas. Querem levar para casa algo que represente sua experiência.",
          },
          {
            id: "q17-limited-time",
            question: isEN
              ? "How should you address a tourist's time constraint?('I have to get back to my hotel')"
              : "Como deve abordar restrição de tempo de um turista? ('Tenho que voltar ao meu hotel')",
            options: isEN
              ? [
                  "Hurry them through",
                  "Make the experience efficient and premium: 'I understand your time is precious. Let me help you find the perfect bottle in 5 minutes'",
                  "Give up on the sale",
                  "Tell them it's too complicated",
                ]
              : [
                  "Apresse-os",
                  "Torne a experiência eficiente e premium: 'Entendo que seu tempo é precioso. Deixe-me ajudá-lo a encontrar a garrafa perfeita em 5 minutos'",
                  "Desista da venda",
                  "Diga-lhes que é muito complicado",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Time-pressured customers need efficiency + premium experience. Fast doesn't mean transactional—it means focused and expert."
              : "Clientes com pressão de tempo precisam de eficiência + experiência premium. Rápido não significa transacional—significa focado e especialista.",
          },
          {
            id: "q18-memory-angle",
            question: isEN
              ? "What story should you tell tourists about their purchase?"
              : "Que história deve contar aos turistas sobre sua compra?",
            options: isEN
              ? [
                  "'This is a bottle'",
                  "'When you open this at home, you'll remember this moment, this conversation, and how special you felt'",
                  "'You bought something'",
                  "'It's just a gift'",
                ]
              : [
                  "'Isto é uma garrafa'",
                  "'Quando abrir isto em casa, lembrará deste momento, desta conversa, e como se sentiu especial'",
                  "'Você comprou algo'",
                  "'É apenas um presente'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Tourists buy moments. Frame their purchase as a memory they'll carry home—a story they'll tell friends and family."
              : "Turistas compram momentos. Enquadre sua compra como uma memória que levarão para casa—uma história que contarão para amigos e família.",
          },

          // CLIENT TYPES (3 questions)
          {
            id: "q19-corporate-buyer",
            question: isEN
              ? "A corporate buyer arrives: 'I need 10 bottles for our client gifts.' Your approach?"
              : "Um comprador corporativo chega: 'Preciso de 10 garrafas para presentes de cliente.' Sua abordagem?",
            options: isEN
              ? [
                  "Just grab 10 bottles at random",
                  "Diagnose: budget, occasion, recipient profiles. Recommend tier. Offer personalization. Handle bulk logistics.",
                  "Give them a discount immediately",
                  "Say we can't do bulk orders",
                ]
              : [
                  "Apenas pegue 10 garrafas aleatoriamente",
                  "Diagnosticar: orçamento, ocasião, perfis de destinatário. Recomendar tier. Ofereça personalização. Trate logística de granel.",
                  "Dê-lhes um desconto imediatamente",
                  "Diga que não podemos fazer pedidos em massa",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Corporate orders are high-value opportunities. Treat as consultative: understand their needs, recommend tier, offer customization, build relationship for repeat business."
              : "Pedidos corporativos são oportunidades de alto valor. Trate como consultativo: entenda suas necessidades, recomende tier, ofereça customização, construa relacionamento para negócio repetido.",
          },
          {
            id: "q20-connoisseur",
            question: isEN
              ? "A wine connoisseur asks detailed questions about vineyard, vintage, tasting notes. How respond?"
              : "Um conhecedor de vinho faz perguntas detalhadas sobre vinhedo, safra, notas de degustação. Como responder?",
            options: isEN
              ? [
                  "Pretend to know more than you do",
                  "Share what you know with confidence, acknowledge their expertise, offer to connect with specialists if needed",
                  "Give generic answers",
                  "Tell them you don't know anything",
                ]
              : [
                  "Fingir saber mais do que sabe",
                  "Compartilhe o que você sabe com confiança, reconheça sua expertise, ofereça conectar com especialistas se necessário",
                  "Dê respostas genéricas",
                  "Diga-lhes que você não sabe nada",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Connoisseurs respect honesty and expertise. Share what you know, be humble about what you don't. Connect them to resources if needed. This builds trust."
              : "Conhecedores respeitam honestidade e expertise. Compartilhe o que sabe, seja humilde sobre o que não sabe. Conecte-os com recursos se necessário. Isto constrói confiança.",
          },
          {
            id: "q21-casual-tourist",
            question: isEN
              ? "A casual tourist says: 'I don't know anything about wine. What do you recommend?' Your response?"
              : "Um turista casual diz: 'Não sei nada sobre vinho. O que você recomenda?' Sua resposta?",
            options: isEN
              ? [
                  "Overwhelm them with technical details",
                  "Ask: 'What's your occasion? Who's this for? What's your budget?' Then recommend confidently based on their answers",
                  "Say 'our most expensive bottle'",
                  "Say 'I don't know either'",
                ]
              : [
                  "Sobrecarregue-os com detalhes técnicos",
                  "Pergunte: 'Qual é sua ocasião? Isto é para quem? Qual é seu orçamento?' Depois recomende com confiança baseado em suas respostas",
                  "Diga 'nossa garrafa mais cara'",
                  "Diga 'eu também não sei'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Casual tourists need simplicity and confidence. Use diagnostic questions to understand their needs, then recommend clearly. 'This is perfect because...' builds trust."
              : "Turistas casuais precisam de simplicidade e confiança. Use perguntas diagnósticas para entender suas necessidades, depois recomende claramente. 'Isto é perfeito porque...' constrói confiança.",
          },

          // TRANSPORT LOGISTICS (2 questions)
          {
            id: "q22-cabin-rules",
            question: isEN
              ? "Can a customer take a 750ml wine bottle in their airplane carry-on?"
              : "Um cliente pode levar uma garrafa de vinho de 750ml em seu carry-on de avião?",
            options: isEN
              ? [
                  "Yes, always",
                  "No, TSA limits cabin liquids to 100ml. Hold baggage is the safe option.",
                  "Only if sealed",
                  "Depends on the airline",
                ]
              : [
                  "Sim, sempre",
                  "Não, TSA limita líquidos de cabine a 100ml. Bagagem de hold é a opção segura.",
                  "Apenas se selada",
                  "Depende da companhia aérea",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "TSA strictly limits cabin liquids to 100ml. A 750ml bottle must go in checked (hold) baggage. Exception: duty-free STEB-sealed bottles within 24 hours of boarding."
              : "TSA estritamente limita líquidos de cabine a 100ml. Uma garrafa de 750ml deve ir em bagagem de hold. Exceção: garrafas duty-free STEB-seladas dentro de 24 horas do embarque.",
          },
          {
            id: "q23-duty-free",
            question: isEN
              ? "When can a customer legally transport a bottle exceeding 100ml in cabin?"
              : "Quando um cliente pode legalmente transportar uma garrafa excedendo 100ml em cabine?",
            options: isEN
              ? [
                  "Never",
                  "When purchased in duty-free at departure airport, sealed in STEB bag, with visible receipt, within 24 hours of boarding",
                  "When they ask nicely",
                  "When it's a gift",
                ]
              : [
                  "Nunca",
                  "Quando comprada em duty-free no aeroporto de partida, selada em saco STEB, com recibo visível, dentro de 24 horas do embarque",
                  "Quando pedem educadamente",
                  "Quando é um presente",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "The STEB (Sealed Tamper-Evident Bag) exception is strict: duty-free origin, official sealing, visible receipt, 24-hour window. Know this to build customer trust."
              : "A exceção STEB (Sealed Tamper-Evident Bag) é rígida: origem duty-free, selagem oficial, recibo visível, janela de 24 horas. Conhecer isto para construir confiança de cliente.",
          },

          // CONDUCT & IMAGE (2 questions)
          {
            id: "q24-professionalism",
            question: isEN
              ? "What does 'postura premium' mean at The 100's?"
              : "O que 'postura premium' significa na The 100's?",
            options: isEN
              ? [
                  "Looking busy all the time",
                  "Combination of presence, elegance, calm, confidence, discretion, and intention",
                  "Being rude to customers",
                  "Ignoring people",
                ]
              : [
                  "Parecer ocupado o tempo todo",
                  "Combinação de presença, elegância, calma, confiança, discrição, e intenção",
                  "Ser rude com clientes",
                  "Ignorar pessoas",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Premium posture combines presence (being fully there), elegance (refined appearance), calm (unrushed), confidence (trust-building), discretion (knowing when to listen), and intention (purposeful action)."
              : "Postura premium combina presença (estar totalmente lá), elegância (aparência refinada), calma (sem pressa), confiança (construir confiança), discrição (saber quando ouvir), e intenção (ação proposital).",
          },
          {
            id: "q25-appearance",
            question: isEN
              ? "How does your personal appearance impact sales at The 100's?"
              : "Como sua aparência pessoal impacta vendas na The 100's?",
            options: isEN
              ? [
                  "It doesn't matter",
                  "Your appearance is the first impression—dressing professionally conveys that the brand and products are premium",
                  "People only care about product quality",
                  "Casual is always better",
                ]
              : [
                  "Não importa",
                  "Sua aparência é a primeira impressão—se vestir profissionalmente transmite que a marca e produtos são premium",
                  "As pessoas se importam apenas com qualidade de produto",
                  "Casual é sempre melhor",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "In premium retail, you ARE part of the product experience. Professional dress signals quality, respect for customers, and brand alignment. It impacts perception and trust."
              : "Em varejo premium, você É parte da experiência do produto. Vestuário profissional sinaliza qualidade, respeito para com clientes, e alinhamento de marca. Impacta perceção e confiança.",
          },

          // GENERAL EXCELLENCE (2 questions)
          {
            id: "q26-customer-experience",
            question: isEN
              ? "What is the most important moment in a customer interaction at The 100's?"
              : "Qual é o momento mais importante em uma interação de cliente na The 100's?",
            options: isEN
              ? [
                  "When they pay",
                  "The moment they walk in—your greeting sets the entire tone",
                  "When they leave",
                  "Never, all moments are equal",
                ]
              : [
                  "Quando pagam",
                  "O momento em que entram—seu cumprimento define o tom inteiro",
                  "Quando saem",
                  "Nunca, todos os momentos são iguais",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "The first 10 seconds are critical. A warm, genuine greeting communicates that you're present, the customer is valued, and they're in for a premium experience."
              : "Os primeiros 10 segundos são críticos. Um cumprimento caloroso e genuíno comunica que está presente, o cliente é valorizado, e está em uma experiência premium.",
          },
          {
            id: "q27-follow-up",
            question: isEN
              ? "After a high-value sale (€150+), what should you do?"
              : "Após uma venda de alto valor (€150+), o que deve fazer?",
            options: isEN
              ? [
                  "Nothing, transaction is complete",
                  "Send email follow-up: 'Did it arrive safely? We stand behind our products and packaging.'",
                  "Ask for a 5-star review immediately",
                  "Ignore them unless they come back",
                ]
              : [
                  "Nada, transação está completa",
                  "Envie acompanhamento por email: 'Chegou com segurança? Apoiamos nossos produtos e embalagem.'",
                  "Peça uma avaliação de 5 estrelas imediatamente",
                  "Ignore-os a menos que voltem",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Follow-up builds loyalty and ensures satisfaction. High-value purchases deserve post-sale care. It leads to repeat business and referrals."
              : "Acompanhamento constrói lealdade e garante satisfação. Compras de alto valor merecem cuidado pós-venda. Leva a negócio repetido e referências.",
          },
          {
            id: "q28-team-culture",
            question: isEN
              ? "What kind of team environment supports premium customer experiences?"
              : "Que tipo de ambiente de equipa suporta experiências de cliente premium?",
            options: isEN
              ? [
                  "Competitive and cutthroat",
                  "Professional, supportive, where people feel trusted and valued",
                  "Disorganized and chaotic",
                  "Where the manager always decides everything",
                ]
              : [
                  "Competitivo e impiedoso",
                  "Profissional, solidário, onde pessoas se sentem confiadas e valorizadas",
                  "Desorganizado e caótico",
                  "Onde o gerente sempre decide tudo",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Happy employees deliver better customer service. A supportive team environment where people feel trusted leads to engagement, lower turnover, and superior customer experiences."
              : "Funcionários felizes entregam serviço de cliente melhor. Um ambiente de equipa solidário onde pessoas se sentem confiadas leva a engajamento, rotatividade mais baixa, e experiências de cliente superiores.",
          },
          {
            id: "q29-continuous-learning",
            question: isEN
              ? "How should you approach continuous improvement at The 100's?"
              : "Como deve abordar melhoria contínua na The 100's?",
            options: isEN
              ? [
                  "Rely only on initial training",
                  "Seek feedback, learn from every customer, ask questions, stay curious, adapt",
                  "Do the same thing every day",
                  "Ignore feedback",
                ]
              : [
                  "Confie apenas no treinamento inicial",
                  "Procure feedback, aprenda de cada cliente, faça perguntas, mantenha curiosidade, adapte",
                  "Faça a mesma coisa todo dia",
                  "Ignore feedback",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Excellence is a journey. The best staff ask questions, learn from customers, adapt to feedback, and continuously improve their craft. This builds expertise and confidence."
              : "Excelência é uma jornada. O melhor pessoal faz perguntas, aprende de clientes, adapta-se ao feedback, e continuamente melhora seu ofício. Isto constrói expertise e confiança.",
          },
          {
            id: "q30-brand-promise",
            question: isEN
              ? "In one sentence, what is The 100's brand promise?"
              : "Em uma frase, qual é a promessa de marca da The 100's?",
            options: isEN
              ? [
                  "'We sell cheap bottles'",
                  "'We deliver premium products and unforgettable experiences that customers will remember forever'",
                  "'We're just a gift shop'",
                  "'We sell whatever customers want'",
                ]
              : [
                  "'Vendemos garrafas baratas'",
                  "'Entregamos produtos premium e experiências inesquecíveis que clientes lembrarão para sempre'",
                  "'Somos apenas uma loja de presentes'",
                  "'Vendemos o que clientes querem'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "This is it. Every interaction should reinforce this promise. Premium products + exceptional service = memories that last. This is The 100's."
              : "Isto é. Cada interação deve reforçar esta promessa. Produtos premium + serviço excepcional = memórias que duram. Isto é The 100's.",
          },
        ] as QuizQuestion[],
        passingScore: 80,
      },
    },
    {
      id: "phase-2-sales-simulator",
      title: isEN ? "Full Sales Simulation" : "Simulação de Vendas Completa",
      description: isEN
        ? "Guide a customer through the entire sales journey"
        : "Guie um cliente através da jornada de vendas inteira",
      slides: [] as Slide[],
      scenarioSimulator: {
        id: "scenario-full-sales",
        title: isEN ? "Complete Customer Journey" : "Jornada de Cliente Completa",
        description: isEN
          ? "A customer walks in. Your goal: deliver a premium experience and close the sale."
          : "Um cliente entra. Seu objetivo: entregar uma experiência premium e fechar a venda.",
        steps: [
          {
            id: "step-1-greeting",
            title: isEN ? "The Greeting" : "O Cumprimento",
            context: isEN
              ? "A tourist enters your store. They look around, slightly uncertain. This is your first 10 seconds."
              : "Um turista entra em sua loja. Olha ao redor, ligeiramente incerto. Estes são seus primeiros 10 segundos.",
            options: [
              {
                id: "opt-greeting-warm",
                label: isEN
                  ? "Warm greeting: 'Welcome! I'm excited to help you find something special today.'"
                  : "Cumprimento caloroso: 'Bem-vindo! Estou entusiasmado em ajudá-lo a encontrar algo especial hoje.'",
                feedback: isEN
                  ? "Perfect. You've set a premium tone, shown presence, and communicated that you're fully here for them."
                  : "Perfeito. Você definiu um tom premium, mostrou presença, e comunicou que está totalmente aqui para eles.",
                isCorrect: true,
              },
              {
                id: "opt-greeting-casual",
                label: isEN
                  ? "Casual: 'Hey, let me know if you need anything.'"
                  : "Casual: 'Ei, me avise se precisar de algo.'",
                feedback: isEN
                  ? "This works, but it's transactional. A warmer greeting builds more trust and signals premium experience."
                  : "Isto funciona, mas é transacional. Um cumprimento mais caloroso constrói mais confiança e sinaliza experiência premium.",
                isCorrect: false,
              },
              {
                id: "opt-greeting-pushy",
                label: isEN
                  ? "Aggressive: 'Can I help you? What do you want to buy?'"
                  : "Agressivo: 'Posso ajudá-lo? O que quer comprar?'",
                feedback: isEN
                  ? "Too pushy. This makes customers feel pressured and defensive. Premium service is invitation-based, not demand-based."
                  : "Muito agressivo. Isto faz clientes se sentirem pressionados e defensivos. Serviço premium é baseado em convite, não demanda.",
                isCorrect: false,
              },
            ],
          },
          {
            id: "step-2-diagnosis",
            title: isEN ? "Understand Their Needs" : "Entenda Suas Necessidades",
            context: isEN
              ? "Customer: 'I'm not sure what I'm looking for. I just arrived in Lisbon and wanted to bring something special home.'"
              : "Cliente: 'Não tenho certeza do que procuro. Acabei de chegar em Lisboa e queria levar algo especial para casa.'",
            options: [
              {
                id: "opt-diagnosis-questions",
                label: isEN
                  ? "Diagnose: 'Perfect. Let me ask: Who is this gift for? Are you looking for yourself or someone special? And what's your budget?'"
                  : "Diagnosticar: 'Perfeito. Deixe-me perguntar: Para quem é este presente? Está procurando para si ou alguém especial? Qual é seu orçamento?'",
                feedback: isEN
                  ? "Excellent. You're gathering intelligence to make the right recommendation. This is consultative selling."
                  : "Excelente. Você está reunindo inteligência para fazer a recomendação certa. Esta é venda consultativa.",
                isCorrect: true,
              },
              {
                id: "opt-diagnosis-assume",
                label: isEN
                  ? "Assume: 'Let me show you our best bottles.'"
                  : "Assumir: 'Deixe-me mostrar nossas melhores garrafas.'",
                feedback: isEN
                  ? "You're skipping diagnosis. Without understanding their needs and budget, your recommendation might miss the mark."
                  : "Você está pulando diagnóstico. Sem entender suas necessidades e orçamento, sua recomendação pode errar o alvo.",
                isCorrect: false,
              },
              {
                id: "opt-diagnosis-price",
                label: isEN
                  ? "Just ask price: 'What's your budget?'"
                  : "Apenas pergunte preço: 'Qual é seu orçamento?'",
                feedback: isEN
                  ? "You're getting closer, but you're missing context: occasion, recipient, and personal preferences. These shape the recommendation."
                  : "Você está chegando perto, mas está perdendo contexto: ocasião, destinatário, e preferências pessoais. Estes moldam a recomendação.",
                isCorrect: false,
              },
            ],
          },
          {
            id: "step-3-presentation",
            title: isEN ? "Present the Solution" : "Apresente a Solução",
            context: isEN
              ? "Customer answers: 'It's for my wife. Our honeymoon. Budget is around €100. She loves wine.'"
              : "Cliente responde: 'É para minha esposa. Nossa lua de mel. Orçamento é em torno de €100. Ela adora vinho.'",
            options: [
              {
                id: "opt-present-story",
                label: isEN
                  ? "Present with story: 'Perfect. This Tier 2 Portuguese red is exceptional. It comes from a family vineyard, has notes of dark cherry and spice, and—this is the real magic—when you open it together at home, you'll remember this moment, this conversation, and how special this trip was. That's what makes it perfect for a honeymoon.'",
                  : "Apresentar com história: 'Perfeito. Este tinto português Tier 2 é excepcional. Vem de um vinhedo familiar, tem notas de cereja escura e especiaria, e—esta é a magia real—quando o abrirão juntos em casa, lembrarão deste momento, desta conversa, e como especial foi esta viagem. Isto é o que o torna perfeito para uma lua de mel.'",
                feedback: isEN
                  ? "Perfect. You've presented the product, shared the story, connected it to their emotion, and positioned the experience value."
                  : "Perfeito. Você apresentou o produto, compartilhou a história, conectou-a à sua emoção, e posicionou o valor da experiência.",
                isCorrect: true,
              },
              {
                id: "opt-present-specs",
                label: isEN
                  ? "Present specs: 'This is a Portuguese red, 14% alcohol, 2019 vintage, tastes like cherries.'"
                  : "Apresentar specs: 'Este é um tinto português, 14% álcool, safra 2019, tem gosto de cerejas.'",
                feedback: isEN
                  ? "You're leading with features, not benefits. For a honeymoon gift, customers care about memory and emotion, not just tasting notes."
                  : "Você está liderando com características, não benefícios. Para um presente de lua de mel, clientes se importam com memória e emoção, não apenas notas de degustação.",
                isCorrect: false,
              },
              {
                id: "opt-present-price",
                label: isEN
                  ? "Lead with price: 'This one is €98.'"
                  : "Lidere com preço: 'Este é €98.'",
                feedback: isEN
                  ? "Price should come last, after you've established value. Lead with story and experience first."
                  : "Preço deve vir por último, depois de ter estabelecido valor. Lidere com história e experiência primeiro.",
                isCorrect: false,
              },
            ],
          },
          {
            id: "step-4-upsell",
            title: isEN ? "Add Value" : "Adicione Valor",
            context: isEN
              ? "Customer is interested. You've made the presentation. Now the upsell moment."
              : "Cliente está interessado. Você fez a apresentação. Agora o momento de upsell.",
            options: [
              {
                id: "opt-upsell-personalization",
                label: isEN
                  ? "Offer personalization: 'This would look even more special with your names engraved on a custom box. Or we can engrave the bottle itself. Would that mean something to you?'",
                  : "Ofereça personalização: 'Isto ficaria ainda mais especial com seus nomes gravados em uma caixa customizada. Ou podemos gravar a garrafa em si. Isto significaria algo para você?'",
                feedback: isEN
                  ? "Perfect. You're offering value (personalization) at the peak of decision, connecting to emotion (it means something). This justifies the add-on price."
                  : "Perfeito. Você está oferecendo valor (personalização) no pico de decisão, conectando a emoção (significa algo). Isto justifica o preço adicional.",
                isCorrect: true,
              },
              {
                id: "opt-upsell-aggressive",
                label: isEN
                  ? "Hard push: 'You should also buy these accessories, this wine glass, this shipping service...'"
                  : "Empurrão duro: 'Você também deve comprar estes acessórios, este copo de vinho, este serviço de envio...'",
                feedback: isEN
                  ? "Too aggressive. After you've made the emotional sale, one thoughtful upsell is enough. More feels transactional and greedy."
                  : "Muito agressivo. Depois que fez a venda emocional, um upsell thoughtful é suficiente. Mais parece transacional e ganancioso.",
                isCorrect: false,
              },
              {
                id: "opt-upsell-skip",
                label: isEN
                  ? "Skip it: 'Shall we ring it up?'"
                  : "Pule isto: 'Vamos anelá-lo?'",
                feedback: isEN
                  ? "You're leaving money on the table. One strategic upsell at the peak of decision adds 15-25% margin and deepens the experience."
                  : "Você está deixando dinheiro na mesa. Um upsell estratégico no pico de decisão adiciona 15-25% de margem e aprofunda a experiência.",
                isCorrect: false,
              },
            ],
          },
          {
            id: "step-5-objection",
            title: isEN ? "Handle Objection" : "Trate Objeção",
            context: isEN
              ? "Customer: 'The personalization sounds nice, but I'm worried about transport. Can bottles really survive airplane travel?'"
              : "Cliente: 'A personalização soa bem, mas estou preocupado com transporte. Garrafas realmente conseguem sobreviver viagem de avião?'",
            options: [
              {
                id: "opt-objection-reassure",
                label: isEN
                  ? "Reassure with expertise: 'That's a great question, and I'm glad you asked. Let me walk you through exactly how we protect bottles. Hold baggage is the safe route—no 100ml limit, and we wrap it specifically for impact. We've sent hundreds internationally with zero breakage. You'll arrive with peace of mind.'",
                  : "Reassegure com expertise: 'Essa é uma ótima pergunta, e fico feliz que perguntou. Deixe-me guiá-lo através de exatamente como protegemos garrafas. Bagagem de hold é a rota segura—sem limite de 100ml, e envolvemos especificamente para impacto. Enviamos centenas internacionalmente com zero quebra. Você chegará com tranquilidade.'",
                feedback: isEN
                  ? "Excellent. You've acknowledged the concern, demonstrated expertise, provided solutions, and rebuilt confidence. This transforms worry into trust."
                  : "Excelente. Você reconheceu a preocupação, demonstrou expertise, forneceu soluções, e reconstruiu confiança. Isto transforma preocupação em confiança.",
                isCorrect: true,
              },
              {
                id: "opt-objection-dismiss",
                label: isEN
                  ? "Dismiss: 'Don't worry, most people do it fine.'"
                  : "Descartar: 'Não se preocupe, a maioria das pessoas faz bem.'",
                feedback: isEN
                  ? "This doesn't address their specific concern. Your customer needs expertise and reassurance, not vague platitudes."
                  : "Isto não aborda sua preocupação específica. Seu cliente precisa de expertise e reassurance, não platitudes vagas.",
                isCorrect: false,
              },
              {
                id: "opt-objection-alternative",
                label: isEN
                  ? "Suggest alternative: 'We can ship it to your home instead.'"
                  : "Sugira alternativa: 'Podemos enviá-lo para sua casa em vez disso.'",
                feedback: isEN
                  ? "Good option (and you should mention it), but lead with the hold baggage solution first, which is what they asked about."
                  : "Boa opção (e você deve mencionar), mas lidere com a solução de hold baggage primeiro, que é o que perguntaram.",
                isCorrect: false,
              },
            ],
          },
          {
            id: "step-6-close",
            title: isEN ? "The Close" : "O Fechamento",
            context: isEN
              ? "Customer is convinced. They've said yes to the bottle and the personalization. Now close with confidence."
              : "Cliente está convencido. Disseram sim à garrafa e à personalização. Agora feche com confiança.",
            options: [
              {
                id: "opt-close-confirm",
                label: isEN
                  ? "Confirm and deepen: 'Perfect. So we have your honeymoon bottle with custom engraving—this is going to be so special. Let me make sure we protect it perfectly. We'll wrap it in our premium protective material and include our transport guide. Any last questions before we finalize?'",
                  : "Confirme e aprofunde: 'Perfeito. Então temos sua garrafa de lua de mel com gravação customizada—isto vai ser tão especial. Deixe-me garantir que protegemos perfeitamente. Embrulharemos em nosso material protetor premium e incluímos nosso guia de transporte. Alguma última pergunta antes de finalizar?'",
                feedback: isEN
                  ? "Perfect. You've confirmed their choice, added value (protection + guide), and left space for last-minute concerns. This is a strong, consultative close."
                  : "Perfeito. Você confirmou sua escolha, adicionou valor (proteção + guia), e deixou espaço para preocupações de último minuto. Este é um fechamento forte e consultativo.",
                isCorrect: true,
              },
              {
                id: "opt-close-rush",
                label: isEN
                  ? "Rush: 'That'll be €135. Here's your receipt.'"
                  : "Apresse: 'Isto será €135. Aqui está seu recibo.'",
                feedback: isEN
                  ? "You've closed the transaction, but not the relationship. You missed the moment to build loyalty and capture contact info."
                  : "Você fechou a transação, mas não o relacionamento. Perdeu o momento de construir lealdade e capturar informações de contacto.",
                isCorrect: false,
              },
              {
                id: "opt-close-weak",
                label: isEN
                  ? "Uncertain: 'Does this work for you?'"
                  : "Incerto: 'Isto funciona para você?'",
                feedback: isEN
                  ? "Your uncertainty transfers to the customer. Lead with confidence. You've made the right recommendation."
                  : "Sua incerteza se transfere ao cliente. Lidere com confiança. Você fez a recomendação certa.",
                isCorrect: false,
              },
            ],
          },
        ] as ScenarioStep[],
        scoring: {
          maxScore: 100,
          feedback: {
            excellent: isEN
              ? "Perfect execution! You guided this customer through a complete premium experience: greeting → diagnosis → presentation → upsell → objection handling → close. You built trust, added value, and closed with confidence. This is The 100's standard."
              : "Execução perfeita! Você guiou este cliente através de uma experiência premium completa: cumprimento → diagnóstico → apresentação → venda adicional → trata objeção → fechamento. Você construiu confiança, adicionou valor, e fechou com confiança. Este é o padrão da The 100's.",
            good: isEN
              ? "Strong work! You hit most of the major moments. Review the areas where you hesitated—especially upselling and closing. These are where premium margins come from."
              : "Bom trabalho! Você atingiu a maioria dos momentos principais. Revise as áreas onde vacilou—especialmente venda adicional e fechamento. É aqui que as margens premium vêm.",
            needsWork: isEN
              ? "You have the basics, but you missed opportunities to build trust and add value. Re-read the consultative selling framework: diagnosis → recommendation → upsell → close. Each step builds on the last."
              : "Você tem o básico, mas perdeu oportunidades para construir confiança e adicionar valor. Releia o framework de venda consultativa: diagnóstico → recomendação → venda adicional → fechamento. Cada passo constrói no anterior.",
          },
        },
      } as Scenario,
    },
    {
      id: "phase-3-certification",
      title: isEN ? "Certification Result" : "Resultado de Certificação",
      description: isEN
        ? "Your certification level based on exam and simulation performance"
        : "Seu nível de certificação baseado no desempenho de exame e simulação",
      slides: [
        {
          id: "slide-cert-result",
          title: isEN ? "Your Certification" : "Sua Certificação",
          content: isEN
            ? "CERTIFICATION LEVELS:\n\n🥉 BRONZE (Score: 60-70%)\nYou have foundational knowledge. Continue practicing and reviewing materials. You're ready to handle basic customer interactions with manager support.\n\n🥈 SILVER (Score: 70-85%)\nYou demonstrate solid competency. You can handle most customer scenarios independently. Continue developing expertise in consultative selling and objection handling.\n\n🥇 GOLD (Score: 85-95%)\nYou show excellent mastery. You can manage complex sales situations and lead by example. You're ready for increased responsibility and team mentoring.\n\n⭐ PLATINUM (Score: 95%+)\nYou demonstrate exceptional mastery of all concepts. You're a brand ambassador and training resource. Leadership path is open to you.\n\nCERTIFICATION VALIDITY:\nYour certification is valid for 12 months. After 12 months, you'll retake the exam to maintain your level.\n\nNEXT STEPS:\n• Review any areas where you scored below 80%\n• Practice the sales simulation weekly\n• Seek feedback from your manager\n• Shadow experienced team members\n• Lead by example in customer service\n\nREMEMBER:\nCertification is the beginning, not the end. Excellence is a journey. Keep learning, stay curious, and always put the customer first."
            : "NÍVEIS DE CERTIFICAÇÃO:\n\n🥉 BRONZE (Pontuação: 60-70%)\nVocê tem conhecimento fundamental. Continue praticando e revisando materiais. Você está pronto para lidar com interações de cliente básicas com suporte de gerente.\n\n🥈 SILVER (Pontuação: 70-85%)\nVocê demonstra competência sólida. Você pode lidar com a maioria dos cenários de cliente de forma independente. Continue desenvolvendo expertise em venda consultativa e tratamento de objeções.\n\n🥇 GOLD (Pontuação: 85-95%)\nVocê mostra domínio excelente. Você pode gerenciar situações de vendas complexas e liderar pelo exemplo. Você está pronto para responsabilidade aumentada e mentoria de equipa.\n\n⭐ PLATINUM (Pontuação: 95%+)\nVocê demonstra domínio excepcional de todos os conceitos. Você é um embaixador de marca e recurso de treinamento. Caminho de liderança está aberto para você.\n\nVALIDADE DE CERTIFICAÇÃO:\nSua certificação é válida por 12 meses. Após 12 meses, você fará novamente o exame para manter seu nível.\n\nPRÓXIMOS PASSOS:\n• Revise qualquer área onde você pontuou abaixo de 80%\n• Pratique a simulação de vendas semanalmente\n• Procure feedback do seu gerente\n• Observe membros de equipa experientes\n• Lidere pelo exemplo em serviço ao cliente\n\nLEMBRE:\nCertificação é o começo, não o fim. Excelência é uma jornada. Continue aprendendo, mantenha curiosidade, e sempre coloque o cliente em primeiro lugar.",
          notes: isEN
            ? "You are now certified. Go deliver exceptional experiences."
            : "Você é agora certificado. Vá entregar experiências excecionais.",
        },
      ] as Slide[],
    },
  ];

  return (
    <ModuleLayout
      moduleId="final-certification"
      title={isEN ? "Final Certification" : "Certificação Final"}
      description={isEN
        ? "Complete your journey: 30-question exam, full sales simulation, and certification"
        : "Complete sua jornada: exame de 30 perguntas, simulação de vendas completa, e certificação"}
      heroImage="/src/assets/collection.jpg"
      area="4"
    >
      <PhaseSystem
        phases={phases}
        currentPhase={currentPhase}
        onPhaseChange={setCurrentPhase}
      />
    </ModuleLayout>
  );
}
