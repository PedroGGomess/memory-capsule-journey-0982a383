import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { RotateCcw, Gamepad2, Trophy, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SCENARIOS = [
  {
    id: "american-tourist",
    titlePt: "O Turista Americano",
    titleEn: "The American Tourist",
    descPt: "Um casal confiante entra. Querem 'algo impressionante'.",
    descEn: "A confident couple enters. They want 'something impressive'.",
    steps: [
      {
        textPt: "Como os recebes?",
        textEn: "How do you greet them?",
        options: [
          { textPt: "Posso ajudar?", textEn: "Can I help you?", feedback: { ptFeedback: "Nunca digas isto. Recebe-os como guardiões do tempo.", enFeedback: "Never say this. Welcome them as guardians of time." }, points: 0 },
          { textPt: "Bem-vindo à nossa cápsula do tempo. Fiquem à vontade.", textEn: "Welcome to our time capsule. Feel free to look around.", feedback: { ptFeedback: "Perfeito! Os primeiros 10 segundos definem tudo. +10pts", enFeedback: "Perfect! The first 10 seconds define everything. +10pts" }, points: 10 },
          { textPt: "Ignoro e espero", textEn: "Ignore and wait", feedback: { ptFeedback: "Os primeiros 10 segundos definem o tom — nunca ignores.", enFeedback: "The first 10 seconds set the tone — never ignore." }, points: 0 },
        ],
      },
      {
        textPt: "Pegam num Entry Gift. O que fazes?",
        textEn: "They pick up an Entry Gift. What do you do?",
        options: [
          { textPt: "A nossa opção mais acessível.", textEn: "Our most affordable option.", feedback: { ptFeedback: "Nunca fales de acessibilidade. Fala de significado.", enFeedback: "Never talk affordability. Talk significance." }, points: 0 },
          { textPt: "Boa escolha. Já viram a versão em carvalho? Transforma-se numa peça de decoração depois.", textEn: "Great choice. Have you seen the oak version? It becomes a decorative piece after.", feedback: { ptFeedback: "Upsell + Segunda Vida num único movimento. Excelente! +15pts", enFeedback: "Upsell + Second Life in one move. Excellent! +15pts" }, points: 15 },
          { textPt: "Quer adicionar personalização UV?", textEn: "Would you like to add UV personalization?", feedback: { ptFeedback: "Bom instinto, mas perdeste o upsell de produto. +5pts", enFeedback: "Good instinct, but you missed the product upsell. +5pts" }, points: 5 },
        ],
      },
      {
        textPt: "Dizem: 'É caro.' Como respondes?",
        textEn: "They say: 'It's expensive.' How do you respond?",
        options: [
          { textPt: "Temos opções mais baratas.", textEn: "We have cheaper options.", feedback: { ptFeedback: "Nunca desvaloriz o produto com isso.", enFeedback: "Never devalue the product that way." }, points: 0 },
          { textPt: "Não estão a comprar vinho. Estão a comprar 50 anos de tempo, selado neste momento.", textEn: "You're not buying wine. You're buying 50 years of time, sealed in this moment.", feedback: { ptFeedback: "Magia pura. +15pts", enFeedback: "Pure magic. +15pts" }, points: 15 },
          { textPt: "Deixa-me ver se há promoções.", textEn: "Let me check for any promotions.", feedback: { ptFeedback: "Nunca menciones promoções como resposta a objeção de preço.", enFeedback: "Never mention promotions as a response to a price objection." }, points: 0 },
        ],
      },
      {
        textPt: "Querem levar de oferta. Como finalizes a venda?",
        textEn: "They want it as a gift. How do you close?",
        options: [
          { textPt: "Embrulho-os rapidamente e processo o pagamento.", textEn: "I wrap quickly and process payment.", feedback: { ptFeedback: "Muito apressado. O embrulho é cerimónia, não logística. +5pts", enFeedback: "Too rushed. Wrapping is ceremony, not logistics. +5pts" }, points: 5 },
          { textPt: "Posso gravar uma data especial na garrafa — um aniversário, hoje. Torna-a única no mundo.", textEn: "I can engrave a special date — an anniversary, today. It makes it unique in the world.", feedback: { ptFeedback: "Personalização como fecho emocional. +15pts", enFeedback: "Personalisation as emotional close. +15pts" }, points: 15 },
          { textPt: "Processamento normal do pagamento.", textEn: "Standard payment processing.", feedback: { ptFeedback: "Perdes o momento de personalização. +3pts", enFeedback: "You miss the personalisation moment. +3pts" }, points: 3 },
        ],
      },
    ],
  },
  {
    id: "rush-passenger",
    titlePt: "O Cruzeirista com Pressa",
    titleEn: "The Rushed Cruise Passenger",
    descPt: "Um grupo de 4. Têm 20 minutos.",
    descEn: "A group of 4. They have 20 minutes.",
    steps: [
      {
        textPt: "Como os abordas?",
        textEn: "How do you approach?",
        options: [
          { textPt: "Tour completo da história da marca.", textEn: "Full brand history tour.", feedback: { ptFeedback: "Não têm tempo. Lê o contexto.", enFeedback: "They don't have time. Read the context." }, points: 0 },
          { textPt: "Bem-vindo! Sei que têm pressa — deixa-me mostrar os 3 melhores prontos para levar.", textEn: "Welcome! I know you're on a schedule — let me show you our top 3 ready-to-go gifts.", feedback: { ptFeedback: "Respeitas o tempo deles — confiança imediata. +10pts", enFeedback: "You respect their time — instant trust. +10pts" }, points: 10 },
          { textPt: "Fiquem à vontade para explorar.", textEn: "Feel free to look around.", feedback: { ptFeedback: "Precisam de orientação urgente, não de tempo livre.", enFeedback: "They need urgent guidance, not free time." }, points: 0 },
        ],
      },
      {
        textPt: "Querem 4 presentes, preços diferentes. O que sugeris?",
        textEn: "They want 4 gifts, different prices. What do you suggest?",
        options: [
          { textPt: "4 Entry Gifts para todos.", textEn: "4 Entry Gifts for everyone.", feedback: { ptFeedback: "Sem variedade, sem upsell. +2pts", enFeedback: "No variety, no upsell. +2pts" }, points: 2 },
          { textPt: "2 Cilindros de Cortiça para amigos, 2 Cubos de Carvalho para família — personalizamos as datas?", textEn: "2 Cork Cylinders for friends, 2 Oak Cubes for family — shall I personalise the dates?", feedback: { ptFeedback: "Mix inteligente + personalização. Perfeito! +15pts", enFeedback: "Smart mix + personalisation. Perfect! +15pts" }, points: 15 },
          { textPt: "4 cubos iguais em cortiça.", textEn: "4 identical cork cubes.", feedback: { ptFeedback: "Perdes a personalização e o upsell de madeira. +5pts", enFeedback: "Missing personalisation and wood upsell. +5pts" }, points: 5 },
        ],
      },
      {
        textPt: "Um deles pergunta se pode levar no avião. O que respondes?",
        textEn: "One of them asks if they can take it on the plane. What do you say?",
        options: [
          { textPt: "Acho que sim, mas não tenho a certeza.", textEn: "I think so, but I'm not sure.", feedback: { ptFeedback: "Nunca mostres incerteza nas regras de transporte.", enFeedback: "Never show uncertainty on transport rules." }, points: 0 },
          { textPt: "As nossas garrafas são 100ml — encaixam na regra TSA para bagagem de mão. Cabem em qualquer avião.", textEn: "Our bottles are 100ml — they fit the TSA carry-on rule exactly. They fly on any plane.", feedback: { ptFeedback: "Confiança que fecha vendas. +10pts", enFeedback: "Confidence that closes sales. +10pts" }, points: 10 },
          { textPt: "Ofereces envio por Send a Memory.", textEn: "You offer Send a Memory shipping.", feedback: { ptFeedback: "Boa alternativa, mas primeiro responde à dúvida. +5pts", enFeedback: "Good alternative, but answer the question first. +5pts" }, points: 5 },
        ],
      },
    ],
  },
  {
    id: "wine-expert",
    titlePt: "O Conhecedor de Vinho",
    titleEn: "The Wine Connoisseur",
    descPt: "Um homem entra sozinho, pergunta diretamente pelo Tawny 50 anos.",
    descEn: "A man enters alone, asks directly about the 50-year Tawny.",
    steps: [
      {
        textPt: "Ele pergunta: 'O que faz este Porto ser diferente dos outros 50 anos do mercado?'",
        textEn: "He asks: 'What makes this Port different from other 50-year Ports on the market?'",
        options: [
          { textPt: "É muito raro e muito antigo.", textEn: "It's very rare and very old.", feedback: { ptFeedback: "Demasiado vago para um conhecedor. Ele quer profundidade.", enFeedback: "Too vague for a connoisseur. He wants depth." }, points: 0 },
          { textPt: "O formato — 100ml captura a expressão precisa deste lote. Não diluis com uma garrafa inteira. É concentração pura de 50 anos.", textEn: "The format — 100ml captures the precise expression of this batch. You're not diluting with a full bottle. It's pure concentration of 50 years.", feedback: { ptFeedback: "Diferenciação premium e inteligente. +15pts", enFeedback: "Smart premium differentiation. +15pts" }, points: 15 },
          { textPt: "Este é o nosso produto mais premium.", textEn: "This is our most premium product.", feedback: { ptFeedback: "Não acrescenta nada a um conhecedor. +2pts", enFeedback: "Adds nothing to a connoisseur. +2pts" }, points: 2 },
        ],
      },
      {
        textPt: "Ele quer notas de prova detalhadas. O que dizes?",
        textEn: "He wants detailed tasting notes. What do you say?",
        options: [
          { textPt: "Sabe a caramelo e a fruta.", textEn: "It tastes of caramel and fruit.", feedback: { ptFeedback: "Insuficiente. Um conhecedor espera mais.", enFeedback: "Insufficient. A connoisseur expects more." }, points: 0 },
          { textPt: "Âmbar profundo. Nariz de figos secos, chocolate negro, tâmaras e um toque de madeira antiga — o que acontece quando décadas de envelhecimento oxidativo convergem.", textEn: "Deep amber. Nose of dried figs, dark chocolate, dates, and a whisper of ancient wood — what happens when decades of oxidative ageing converge.", feedback: { ptFeedback: "Linguagem de prova que ganha respeito. +15pts", enFeedback: "Tasting language that earns respect. +15pts" }, points: 15 },
          { textPt: "Deixo-o provar e que decida.", textEn: "I let him taste and decide.", feedback: { ptFeedback: "Boa estratégia, mas deves ainda enquadrar com vocabulário de prova. +7pts", enFeedback: "Good strategy, but you should still frame with tasting vocabulary. +7pts" }, points: 7 },
        ],
      },
      {
        textPt: "Ele hesita no preço (€275). Como fechas?",
        textEn: "He hesitates at the price (€275). How do you close?",
        options: [
          { textPt: "Posso fazer um pequeno desconto.", textEn: "I can offer a small discount.", feedback: { ptFeedback: "Nunca. Descontos destroem a aura de raridade.", enFeedback: "Never. Discounts destroy the aura of rarity." }, points: 0 },
          { textPt: "€275 para 50 anos de história. Por garrafa de tamanho normal, este vinho custa 10 vezes mais — aqui tens a expressão pura numa cápsula de 100ml.", textEn: "€275 for 50 years of history. A full bottle of this wine costs 10x more — here you have the pure expression in a 100ml capsule.", feedback: { ptFeedback: "Contexto de valor irresistível. +15pts", enFeedback: "Irresistible value context. +15pts" }, points: 15 },
          { textPt: "Temos opções mais acessíveis se preferir.", textEn: "We have more accessible options if you prefer.", feedback: { ptFeedback: "Recuares implica que o produto não vale o preço. +2pts", enFeedback: "Backing down implies the product isn't worth it. +2pts" }, points: 2 },
        ],
      },
    ],
  },
  {
    id: "the-vault",
    titlePt: "The Vault — THE HUNDRED",
    titleEn: "The Vault — THE HUNDRED",
    descPt: "Uma cliente sobe ao Piso 1. Pergunta sobre THE HUNDRED €1.000.",
    descEn: "A female client goes up to Piso 1. She asks about THE HUNDRED €1,000.",
    steps: [
      {
        textPt: "Qual é o teu primeiro movimento?",
        textEn: "What is your first move?",
        options: [
          { textPt: "Processo o pagamento diretamente no D3 Pro no Piso 0.", textEn: "Process payment on the D3 Pro downstairs.", feedback: { ptFeedback: "Nunca. Usa o CPad Pay — este é um momento cerimonial, não uma transação.", enFeedback: "Never. Use the CPad Pay — this is a ceremonial moment, not a transaction." }, points: 0 },
          { textPt: "Pego no CPad Pay, mostro a ficha completa do produto, os 100 anos de história, e ofereço uma prova antes de qualquer conversa sobre preço.", textEn: "I take the CPad Pay, show the full product profile, the 100 years of history, and offer a tasting before any price conversation.", feedback: { ptFeedback: "Cerimonial. Exato. A tecnologia a servir a experiência. +15pts", enFeedback: "Ceremonial. Exactly right. Technology serving the experience. +15pts" }, points: 15 },
          { textPt: "Explico o preço e peço se tem a certeza.", textEn: "I explain the price and ask if she's sure.", feedback: { ptFeedback: "Nunca questiones a decisão do cliente. Eleva a experiência.", enFeedback: "Never question the client's decision. Elevate the experience." }, points: 0 },
        ],
      },
      {
        textPt: "Ela pergunta: 'O que existe de especial neste vinho que justifica €1.000?'",
        textEn: "She asks: 'What makes this wine worth €1,000?'",
        options: [
          { textPt: "É muito raro. Muito poucas garrafas existem.", textEn: "It's very rare. Very few bottles exist.", feedback: { ptFeedback: "Correto mas incompleto. Precisa de substância.", enFeedback: "Correct but thin. Needs substance." }, points: 5 },
          { textPt: "Um século de paciência. O produtor que o criou pode já não estar vivo. Estás a segurar um século — não vinho, mas tempo líquido. Não há segunda garrafa no mundo igual.", textEn: "A century of patience. The winemaker who created it may no longer be alive. You're holding a century — not wine, but liquid time. No two bottles in the world are the same.", feedback: { ptFeedback: "Poesia que justifica qualquer preço. +15pts", enFeedback: "Poetry that justifies any price. +15pts" }, points: 15 },
          { textPt: "É o nosso produto mais exclusivo e temos poucas unidades.", textEn: "It's our most exclusive product and we have few units.", feedback: { ptFeedback: "Melhor — a escassez ajuda. Mas falta a narrativa. +8pts", enFeedback: "Better — scarcity helps. But missing the narrative. +8pts" }, points: 8 },
        ],
      },
      {
        textPt: "Ela decide comprar. Como processas?",
        textEn: "She decides to buy. How do you process?",
        options: [
          { textPt: "Vou ao balcão do Piso 0 para processar no D3 Pro.", textEn: "I go to the Piso 0 counter to process on the D3 Pro.", feedback: { ptFeedback: "Quebras o ritual. Mantém tudo no Piso 1 via CPad Pay.", enFeedback: "You break the ritual. Keep everything on Piso 1 via CPad Pay." }, points: 3 },
          { textPt: "Processo no CPad Pay ali mesmo, pergunto se quer personalização — data, hora, mensagem — e embalo como se fosse um artefacto de museu.", textEn: "I process on the CPad Pay right there, ask about personalisation — date, time, message — and wrap it like a museum artefact.", feedback: { ptFeedback: "O ritual completo. Excelente. +15pts", enFeedback: "The complete ritual. Excellent. +15pts" }, points: 15 },
          { textPt: "Processo normalmente e ofereço saco de papel.", textEn: "Standard processing and paper bag.", feedback: { ptFeedback: "Um produto de €1.000 merece muito mais cerimónia. +2pts", enFeedback: "A €1,000 product deserves far more ceremony. +2pts" }, points: 2 },
        ],
      },
    ],
  },
  {
    id: "ancient-flavours",
    titlePt: "Ancient Flavours — O Upsell Inesperado",
    titleEn: "Ancient Flavours — The Unexpected Upsell",
    descPt: "Uma cliente olha para o azeite. 'Não bebo vinho, por isso...'",
    descEn: "A female client looks at the olive oil. 'I don't drink wine, so...'",
    steps: [
      {
        textPt: "Ela diz: 'Não bebo muito vinho. Não sei se isto é para mim.'",
        textEn: "She says: 'I don't drink much wine. I'm not sure this is for me.'",
        options: [
          { textPt: "Temos também vinho branco que é mais suave.", textEn: "We also have white wine which is lighter.", feedback: { ptFeedback: "Perdes a oportunidade de mostrar a loja completa.", enFeedback: "You miss the chance to show the full store." }, points: 3 },
          { textPt: "Perfeito. Segue-me — tens o espaço errado. Aqui temos algo para ti.", textEn: "Perfect. Follow me — you're in the wrong space. We have something for you right here.", feedback: { ptFeedback: "Curiosidade sem pressão. Leva-a para Ancient Flavours. +15pts", enFeedback: "Curiosity without pressure. Take her to Ancient Flavours. +15pts" }, points: 15 },
          { textPt: "Está à vontade para explorar.", textEn: "Feel free to look around.", feedback: { ptFeedback: "Perdes uma venda certa. +0pts", enFeedback: "You lose a guaranteed sale. +0pts" }, points: 0 },
        ],
      },
      {
        textPt: "Em Ancient Flavours, ela pega no azeite (€34.99). Como presents?",
        textEn: "In Ancient Flavours, she picks up the olive oil (€34.99). How do you present?",
        options: [
          { textPt: "É azeite extra virgem de olivas centenárias.", textEn: "It's extra virgin olive oil from centenary olives.", feedback: { ptFeedback: "Factualmente correto mas sem alma. +5pts", enFeedback: "Factually correct but soulless. +5pts" }, points: 5 },
          { textPt: "Estas oliveiras têm mais de 100 anos. O azeite que aqui está envolveu o sol do Alentejo durante séculos. O mesmo conceito que o vinho — o tempo é o ingrediente.", textEn: "These olive trees are over 100 years old. The oil here absorbed the Alentejo sun for centuries. Same concept as the wine — time is the ingredient.", feedback: { ptFeedback: "Ligação ao conceito central da marca. Brilhante. +15pts", enFeedback: "Connected to the brand's core concept. Brilliant. +15pts" }, points: 15 },
          { textPt: "É um dos nossos produtos mais populares.", textEn: "It's one of our most popular products.", feedback: { ptFeedback: "Social proof mas sem narrativa de marca. +5pts", enFeedback: "Social proof but no brand narrative. +5pts" }, points: 5 },
        ],
      },
      {
        textPt: "Ela compra o azeite (€34.99). Tentas adicionar algo?",
        textEn: "She buys the olive oil (€34.99). Do you try to add anything?",
        options: [
          { textPt: "Processo e agradeço.", textEn: "Process and thank her.", feedback: { ptFeedback: "Venda fechada mas opportunity missed. +5pts", enFeedback: "Sale closed but opportunity missed. +5pts" }, points: 5 },
          { textPt: "E o mel? Também de produtores centenários — os dois juntos contam a despensa inteira de Portugal.", textEn: "What about the honey? Also from centenary producers — the two together tell the whole story of Portugal's pantry.", feedback: { ptFeedback: "Cross-sell dentro de Ancient Flavours. Perfeito. +15pts", enFeedback: "Cross-sell within Ancient Flavours. Perfect. +15pts" }, points: 15 },
          { textPt: "Mostro também as velas de The Still Hours.", textEn: "I also show her The Still Hours candles.", feedback: { ptFeedback: "Boa ideia mas adicionar dois produtos de uma vez pode sobrecarregar. +8pts", enFeedback: "Good idea but adding two at once can overwhelm. +8pts" }, points: 8 },
        ],
      },
    ],
  },
  {
    id: "group-upsell",
    titlePt: "O Grupo Corporativo",
    titleEn: "The Corporate Group",
    descPt: "Um gestor entra com 3 colegas. Procuram 'algo para um cliente importante'.",
    descEn: "A manager enters with 3 colleagues. Looking for 'something for an important client'.",
    steps: [
      {
        textPt: "Como qualificas a compra?",
        textEn: "How do you qualify the purchase?",
        options: [
          { textPt: "Mostro a gama completa de produtos.", textEn: "I show the full product range.", feedback: { ptFeedback: "Demasiado amplo. Qualifica primeiro.", enFeedback: "Too broad. Qualify first." }, points: 3 },
          { textPt: "'Para quem é o presente? Que relação têm com essa pessoa?' — isto diz-me exactamente o que precisas.", textEn: "'Who is the gift for? What's your relationship with them?' — this tells me exactly what you need.", feedback: { ptFeedback: "Qualificação cirúrgica. A pergunta certa abre o upsell. +15pts", enFeedback: "Surgical qualification. The right question opens the upsell. +15pts" }, points: 15 },
          { textPt: "Pergunto o orçamento.", textEn: "I ask for the budget.", feedback: { ptFeedback: "Demasiado transacional para início de conversa premium. +5pts", enFeedback: "Too transactional for the opening of a premium conversation. +5pts" }, points: 5 },
        ],
      },
      {
        textPt: "É para um CEO estrangeiro — empresa portuguesa quer impressionar. Que sugeres?",
        textEn: "It's for a foreign CEO — Portuguese company wants to impress. What do you suggest?",
        options: [
          { textPt: "Um Cubo de Cortiça com Signature — é o mais popular.", textEn: "A Cork Cube with Signature — it's our most popular.", feedback: { ptFeedback: "Popular não é premium. Este CEO merece mais. +3pts", enFeedback: "Popular isn't premium. This CEO deserves more. +3pts" }, points: 3 },
          { textPt: "The Icon 50 anos em Cubo de Carvalho com gravação do nome do destinatário — a data de hoje torna-o único no mundo.", textEn: "The Icon 50yr in an Oak Cube with the recipient's name engraved — today's date makes it unique in the world.", feedback: { ptFeedback: "Premium + personalização + narrativa. Venda premium garantida. +15pts", enFeedback: "Premium + personalisation + narrative. Guaranteed premium sale. +15pts" }, points: 15 },
          { textPt: "Mostro THE HUNDRED de €1.000.", textEn: "I show THE HUNDRED €1,000.", feedback: { ptFeedback: "Ambicioso, mas arriscas parecer excessivo sem qualificar melhor. +8pts", enFeedback: "Ambitious, but risky without better qualification. +8pts" }, points: 8 },
        ],
      },
      {
        textPt: "O gestor pergunta: 'Podem fazer 10 iguais para outros clientes internacionais?'",
        textEn: "The manager asks: 'Can you make 10 identical ones for other international clients?'",
        options: [
          { textPt: "Tenho de verificar o stock e responder depois.", textEn: "I need to check stock and get back to you.", feedback: { ptFeedback: "Razoável, mas o WinMax4 no L3 diz-te já. +5pts", enFeedback: "Reasonable, but the L3 WinMax4 tells you right now. +5pts" }, points: 5 },
          { textPt: "Verifico o stock no L3 ali mesmo, confirmo disponibilidade, e ofereço Send a Memory para entrega direta nos escritórios deles no mundo inteiro.", textEn: "I check stock on the L3 right there, confirm availability, and offer Send a Memory for direct delivery to their offices worldwide.", feedback: { ptFeedback: "Tecnologia + Send a Memory = venda de 10 unidades premium. +15pts", enFeedback: "Technology + Send a Memory = 10 premium units sold. +15pts" }, points: 15 },
          { textPt: "Digo que não é possível personalizar em quantidade.", textEn: "I say we can't personalise in bulk.", feedback: { ptFeedback: "Podemos. Nunca digas não sem verificar.", enFeedback: "We can. Never say no without checking." }, points: 0 },
        ],
      },
    ],
  },
];

export default function SalesSimulator() {
  const { language } = useLanguage();
  const isEN = language === "en";

  const [selectedScenario, setSelectedScenario] = useState<typeof SCENARIOS[0] | null>(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [lastPoints, setLastPoints] = useState<number | null>(null);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [maxScore, setMaxScore] = useState(0);

  const handleSelect = (opt: typeof SCENARIOS[0]["steps"][0]["options"][0]) => {
    const pts = opt.points;
    setScore((s) => s + pts);
    setLastPoints(pts);
    setLastFeedback(isEN ? opt.feedback.enFeedback : opt.feedback.ptFeedback);

    setTimeout(() => {
      setLastPoints(null);
      setLastFeedback(null);
      if (selectedScenario && step < selectedScenario.steps.length - 1) {
        setStep((s) => s + 1);
      } else {
        setFinished(true);
      }
    }, 1800);
  };

  const handleStartScenario = (scenario: typeof SCENARIOS[0]) => {
    const max = scenario.steps.reduce((acc, s) => acc + Math.max(...s.options.map((o) => o.points)), 0);
    setMaxScore(max);
    setSelectedScenario(scenario);
    setStep(0);
    setScore(0);
    setFinished(false);
    setLastPoints(null);
    setLastFeedback(null);
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setStep(0);
    setScore(0);
    setFinished(false);
    setLastPoints(null);
    setLastFeedback(null);
  };

  const getScoreMessage = () => {
    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (pct >= 90) return isEN ? "Outstanding — you think like a guardian of time." : "Excelente — pensas como um guardião do tempo.";
    if (pct >= 70) return isEN ? "Strong performance. A few moments to sharpen." : "Boa performance. Alguns momentos a afinar.";
    if (pct >= 50) return isEN ? "Good instincts, but review the key techniques." : "Bons instintos, mas revê as técnicas principais.";
    return isEN ? "Practice makes perfect. Review the modules and try again." : "A prática leva à perfeição. Revê os módulos e tenta de novo.";
  };

  const getStarRating = () => {
    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (pct >= 90) return 3;
    if (pct >= 70) return 2;
    return 1;
  };

  if (!selectedScenario) {
    return (
      <ModuleLayout
        moduleId="sales-simulator"
        moduleNumber={0}
        title={isEN ? "Sales Simulator" : "Simulador de Vendas"}
        subtitle={isEN ? "Practice real scenarios. Make mistakes safely. Sell better." : "Pratica cenários reais. Erra em segurança. Vende melhor."}
        heroImage=""
        hideCompletion
      >
        <ContentBlock title={isEN ? "Choose a Scenario" : "Escolhe um Cenário"}>
          <p>{isEN
            ? "Six real scenarios. Each tests a different skill. Your choices have consequences — just like the real floor."
            : "Seis cenários reais. Cada um testa uma competência diferente. As tuas escolhas têm consequências — tal como no chão de loja real."}</p>
        </ContentBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SCENARIOS.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.05}>
              <motion.button
                className="w-full text-left border border-border/30 p-6 hover:border-primary/40 transition-all duration-300 group"
                whileHover={{ y: -2 }}
                onClick={() => handleStartScenario(s)}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                  <Gamepad2 className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary/40 transition-colors" />
                </div>
                <p className="text-base font-light text-foreground/80 mb-2 group-hover:text-foreground transition-colors">
                  {isEN ? s.titleEn : s.titlePt}
                </p>
                <p className="text-xs text-muted-foreground/50 font-light">{isEN ? s.descEn : s.descPt}</p>
                <p className="text-[9px] tracking-wider uppercase text-primary/40 mt-3">
                  {s.steps.length} {isEN ? "decisions" : "decisões"}
                </p>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </ModuleLayout>
    );
  }

  if (finished) {
    const stars = getStarRating();
    return (
      <ModuleLayout
        moduleId="sales-simulator"
        moduleNumber={0}
        title={isEN ? "Sales Simulator" : "Simulador de Vendas"}
        subtitle=""
        heroImage=""
        hideCompletion
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((n) => (
              <Star key={n} className={`w-8 h-8 ${n <= stars ? "fill-primary text-primary" : "text-muted-foreground/20"}`} />
            ))}
          </div>
          <p className="text-4xl font-light text-primary mb-2">{score} <span className="text-lg text-foreground/40">/ {maxScore}</span></p>
          <p className="text-sm text-foreground/60 font-light italic mb-8">{getScoreMessage()}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="border border-primary/30 px-8 py-4 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/5 transition-all duration-200 flex items-center gap-2 justify-center"
              whileHover={{ y: -1 }}
              onClick={() => handleStartScenario(selectedScenario)}
            >
              <RotateCcw className="w-4 h-4" />
              {isEN ? "Try again" : "Tentar de novo"}
            </motion.button>
            <motion.button
              className="border border-border/30 px-8 py-4 text-sm tracking-[0.2em] uppercase text-foreground/50 hover:border-primary/20 transition-all duration-200"
              whileHover={{ y: -1 }}
              onClick={handleReset}
            >
              {isEN ? "Choose another scenario" : "Escolher outro cenário"}
            </motion.button>
          </div>
        </motion.div>
      </ModuleLayout>
    );
  }

  const currentStep = selectedScenario.steps[step];

  return (
    <ModuleLayout
      moduleId="sales-simulator"
      moduleNumber={0}
      title={isEN ? selectedScenario.titleEn : selectedScenario.titlePt}
      subtitle={isEN ? selectedScenario.descEn : selectedScenario.descPt}
      heroImage=""
      hideCompletion
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {selectedScenario.steps.map((_, i) => (
            <div key={i} className={`h-1 w-8 transition-all duration-300 ${i < step ? "bg-primary" : i === step ? "bg-primary/60" : "bg-border/30"}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground/50 font-light">{isEN ? "Score:" : "Pontos:"} {score}</p>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          <div className="border-l-4 border-l-primary/40 pl-6 mb-8">
            <p className="text-lg font-light text-foreground/80">
              {isEN ? currentStep.textEn : currentStep.textPt}
            </p>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {lastFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`border p-4 mb-6 ${lastPoints && lastPoints >= 10 ? "border-green-500/30 bg-green-950/20" : lastPoints && lastPoints >= 5 ? "border-amber-500/30 bg-amber-950/20" : "border-red-500/30 bg-red-950/20"}`}
              >
                <p className="text-sm font-light text-foreground/80">{lastFeedback}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options */}
          <div className="space-y-3">
            {currentStep.options.map((opt, i) => (
              <motion.button
                key={i}
                className="w-full text-left border border-border/30 p-5 hover:border-primary/40 transition-all duration-200 text-sm font-light text-foreground/70 hover:text-foreground"
                whileHover={{ x: 4 }}
                onClick={() => handleSelect(opt)}
                disabled={lastFeedback !== null}
              >
                <span className="text-primary/40 mr-3">{String.fromCharCode(65 + i)}.</span>
                {isEN ? opt.textEn : opt.textPt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </ModuleLayout>
  );
}
