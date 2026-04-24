import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  ScenarioSimulator,
  TipBlock,
  PhraseCard,
  type Phase,
  type Scenario,
  type ScenarioStep,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ModuleObjectionHandling() {
  const { language } = useLanguage();
  const isEN = language === "en";

  const phases: Phase[] = [
    {
      id: "editorial-principle",
      title: isEN ? "Editorial Principle: Validate → Reformulate → Respond" : "Princípio Editorial: Validar → Reformular → Responder",
      description: isEN
        ? "The foundation of premium objection handling. Never contradict, never discount. Objections are not barriers—they are opportunities to deepen trust and clarify value."
        : "A base do tratamento premium de objeções. Nunca contradizer, nunca descontar. Objeções são oportunidades, não barreiras.",
      slides: [
        {
          id: "principle-1",
          title: isEN ? "Objections Are Invitations" : "Objeções São Convites",
          content: isEN
            ? "In premium selling, objections reveal a doubt, need, or fear that hasn't been resolved yet. How we respond defines the client's final perception of the brand. Objections are signals of interest—if the client wasn't interested, they wouldn't bother objecting."
            : "Objeções revelam uma dúvida ou receio não resolvido. A forma como respondemos define a percepção final do cliente.",
        },
        {
          id: "principle-2",
          title: isEN ? "The Premium Philosophy" : "A Filosofia Premium",
          content: isEN
            ? "Response must be: Calm (never defensive), Clear (without excess justification), Elegant (carefully chosen language), Structured (always follows the same method), Client-oriented (not argument-oriented)."
            : "Calma, clara, elegante, estruturada, orientada ao cliente — nunca defensiva.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "The Golden Rule" : "A Regra de Ouro",
            items: [
              isEN
                ? "Objections are not combated. Objections are dissolved."
                : "Objeções não se combatem. Objeções dissolvem-se.",
              isEN ? "Stay calm and composed" : "Manter-se calmo e composto",
              isEN ? "Listen completely before responding" : "Ouvir completamente antes de responder",
              isEN ? "Never become defensive" : "Nunca ficar defensivo",
              isEN ? "Focus on dissolving doubt, not winning an argument" : "Focar em dissolver dúvida, não ganhar argumento",
            ],
          },
          {
            title: isEN ? "Method: 3 Steps" : "Método: 3 Passos",
            items: [
              isEN ? "1. VALIDATE: Show you understand the concern" : "1. VALIDAR: Mostrar compreensão",
              isEN ? "2. REFORMULATE: Reposition perception with clear information" : "2. REFORMULAR: Reposicionar com informação clara",
              isEN ? "3. ADVANCE: Guide softly to decision or next step" : "3. AVANÇAR: Guiar suavemente para decisão",
            ],
          },
        ],
        phrases: [
          {
            pt: "Percebo perfeitamente o que diz.",
            en: "I completely understand what you mean.",
            context: isEN ? "Validation opening" : "Abertura de validação",
          },
          {
            pt: "Claro, faz todo o sentido.",
            en: "Of course, that makes perfect sense.",
            context: isEN ? "Agreement and validation" : "Acordo e validação",
          },
          {
            pt: "É uma preocupação muito válida.",
            en: "That's a very valid concern.",
            context: isEN ? "Legitimate acknowledgement" : "Reconhecimento legítimo",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "What is the fundamental principle for handling objections?"
              : "Qual é o princípio fundamental para lidar com objeções?",
            options: [
              {
                text: isEN ? "Combat and win the argument" : "Combater e ganhar o argumento",
                correct: false,
              },
              {
                text: isEN ? "Lower the price to close the sale" : "Baixar o preço para fechar",
                correct: false,
              },
              {
                text: isEN
                  ? "Validate, reformulate, and advance—dissolving doubt, not fighting it"
                  : "Validar, reformular e avançar—dissolving doubt",
                correct: true,
              },
              {
                text: isEN ? "Ignore the objection and move forward" : "Ignorar a objeção",
                correct: false,
              },
            ],
          },
          {
            question: isEN ? "What does 'Validate' mean in objection handling?" : "O que significa 'Validar' no tratamento de objeções?",
            options: [
              {
                text: isEN ? "Agree that the customer is right" : "Concordar que o cliente tem razão",
                correct: false,
              },
              {
                text: isEN
                  ? "Show you understand the concern or feeling behind the objection"
                  : "Mostrar compreensão da preocupação",
                correct: true,
              },
              {
                text: isEN ? "Approve their decision to not buy" : "Aprovar não-compra",
                correct: false,
              },
              {
                text: isEN ? "Check their email" : "Verificar email",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "How should you respond to an objection emotionally?"
              : "Como responder a uma objeção emocionalmente?",
            options: [
              {
                text: isEN ? "Defensively, protecting the product" : "Defensivamente, protegendo o produto",
                correct: false,
              },
              {
                text: isEN ? "Calmly, elegantly, without defensiveness" : "Calmamente, elegantemente, sem defensiva",
                correct: true,
              },
              {
                text: isEN ? "With frustration at the client's doubt" : "Com frustração à dúvida do cliente",
                correct: false,
              },
              {
                text: isEN ? "With urgency to close the sale" : "Com urgência para fechar",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "price-objection",
      title: isEN ? "Price Objections: 'It's Expensive'" : "Objeções de Preço: 'É Caro Demais'",
      description: isEN
        ? "'It's expensive' is rarely about price. It's about perceived value, comparison, or decision confidence. Respond by reframing value—craftsmanship, uniqueness, lasting impact."
        : "'É caro demais' raramente é sobre preço. É sobre valor percebido. Responda reformulando valor.",
      slides: [
        {
          id: "price-1",
          title: isEN ? "Understanding Price Objections" : "Compreender Objeções de Preço",
          content: isEN
            ? "'It's expensive' typically signals one of these: unclear value perception, price comparison with alternatives, or insecurity about the decision. The response is never to discount—it's to reframe value and confirm alignment."
            : "'É caro' revela: valor percebido unclear, comparação com alternativas, ou insegurança na decisão.",
        },
        {
          id: "price-2",
          title: isEN ? "Three Response Approaches" : "Três Abordagens de Resposta",
          content: isEN
            ? "Emotional approach: emphasize memory and uniqueness. Rational approach: highlight craftsmanship and materials. Minimalist approach: focus on what you get—design, history, lasting object. Choose based on client profile."
            : "Abordagem emocional, racional ou minimalista—escolher com base no perfil do cliente.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Price Objection Response" : "Resposta a Objeção de Preço",
            items: [
              isEN ? "Never discount or apologize for premium pricing" : "Nunca descontar ou pedir desculpa",
              isEN ? "Validate the concern immediately" : "Validar a preocupação imediatamente",
              isEN ? "Reframe from price to value and durability" : "Mudar de preço para valor e durabilidade",
              isEN ? "Highlight artisan quality and materials" : "Destacar qualidade artesanal e materiais",
              isEN ? "Connect to emotional benefit and lasting memory" : "Conectar a benefício emocional",
            ],
          },
          {
            title: isEN ? "Value Anchors" : "Âncoras de Valor",
            items: [
              isEN ? "Handcrafted materials (ceramic, cork, oak wood)" : "Materiais artesanais",
              isEN ? "Artisanal production and limited quantities" : "Produção artesanal e quantidade limitada",
              isEN ? "400 years of Port Wine heritage" : "400 anos de herança do Port Wine",
              isEN ? "Design object that lasts decades" : "Objeto de design que dura décadas",
              isEN ? "Memory preservation beyond the product itself" : "Preservação de memória",
            ],
          },
        ],
        phrases: [
          {
            pt: "Percebo perfeitamente o que diz. O nosso Port Wine Gift destaca-se pelos materiais artesanais — cerâmica, cortiça, madeira de carvalho — e pelo vinho envelhecido no seu interior, que garantem uma presença duradoura.",
            en: "I completely understand. Our Port Wine Gift stands out through handcrafted materials — ceramic, cork, oak wood — and the aged wine within, which ensure lasting presence.",
            context: isEN ? "Rational value reframe" : "Reformulação racional de valor",
          },
          {
            pt: "É um investimento numa Gift que preserva exatamente a memória e a emoção que descreveu.",
            en: "It's an investment in a Gift that perfectly preserves the memory and emotion you described.",
            context: isEN ? "Emotional value reframe" : "Reformulação emocional de valor",
          },
          {
            pt: "Os materiais artesanais fazem com que este Gift se mantenha impecável durante muito tempo, muito além do vinho.",
            en: "The handcrafted materials ensure this Gift remains impeccable for a long time, well beyond the wine itself.",
            context: isEN ? "Durability emphasis" : "Ênfase em durabilidade",
          },
          {
            pt: "É um Gift que vale pelo que entrega: memória, design e história de Portugal, numa única peça.",
            en: "It's a Gift that earns its value: memory, design, and the history of Portugal, all in one piece.",
            context: isEN ? "Minimalist value" : "Valor minimalista",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "When a client says 'It's expensive,' what should you do first?"
              : "Quando um cliente diz 'É caro', o que fazer primeiro?",
            options: [
              {
                text: isEN ? "Lower the price immediately" : "Baixar o preço imediatamente",
                correct: false,
              },
              {
                text: isEN ? "Explain why it costs so much" : "Explicar porque custa tanto",
                correct: false,
              },
              {
                text: isEN
                  ? "Validate the concern and reframe value (not price)"
                  : "Validar a preocupação e reformular valor",
                correct: true,
              },
              {
                text: isEN ? "Suggest a cheaper alternative" : "Sugerir alternativa mais barata",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What is the key to responding to price objections in premium selling?"
              : "Qual é a chave para responder a objeções de preço em venda premium?",
            options: [
              {
                text: isEN ? "Never mention price again" : "Nunca mencionar preço novamente",
                correct: false,
              },
              {
                text: isEN
                  ? "Shift focus from price to value, durability, and emotional benefit"
                  : "Mudar foco de preço para valor, durabilidade e benefício emocional",
                correct: true,
              },
              {
                text: isEN ? "Offer payment plans" : "Oferecer planos de pagamento",
                correct: false,
              },
              {
                text: isEN ? "Accept the objection and move on" : "Aceitar a objeção e avançar",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "Which value anchor should you emphasize for a long-term gift?"
              : "Qual âncora de valor enfatizar para um gift de longo prazo?",
            options: [
              {
                text: isEN ? "Current fashion trend" : "Tendência de moda atual",
                correct: false,
              },
              {
                text: isEN
                  ? "Handcrafted durability and lasting presence over decades"
                  : "Durabilidade artesanal e presença lasting",
                correct: true,
              },
              {
                text: isEN ? "Comparison to fast fashion" : "Comparação com fast fashion",
                correct: false,
              },
              {
                text: isEN ? "Limited time discount" : "Desconto por tempo limitado",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "logistics-objection",
      title: isEN ? "Logistics Objections: 'I Don't Have Space'" : "Objeções de Logística: 'Não Tenho Espaço'",
      description: isEN
        ? "Common travel objections: luggage space, fear of breakage during transit. These are practical concerns that require calm, information-based responses. Address fear with product knowledge and protective solutions."
        : "Objeções de viagem: espaço na mala, medo de quebra. Responda com conhecimento do produto e soluções de proteção.",
      slides: [
        {
          id: "logistics-1",
          title: isEN ? "Luggage Space Concerns" : "Preocupações com Espaço na Mala",
          content: isEN
            ? "For travelers, concern about luggage space is legitimate. Solution: Design specifications (cylinder is only 8cm diameter), premium protective packaging, and clear explanation of how it fits."
            : "Para viajantes, espaço na mala é legítimo. Solução: especificações de design, embalagem premium, explicação clara.",
        },
        {
          id: "logistics-2",
          title: isEN ? "Breakage During Travel" : "Risco de Quebra em Viagem",
          content: isEN
            ? "Fear of breakage is about protecting a special gift. Solution: detailed explanation of protective packaging, ceramic/cork durability, material thickness designed for transport, offer extra protection at no cost."
            : "Medo de quebra é sobre proteger um gift especial. Solução: embalagem protetora, durabilidade, espessura pensada para transporte.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Logistics Response" : "Resposta a Objeção de Logística",
            items: [
              isEN ? "Validate the concern immediately" : "Validar a preocupação imediatamente",
              isEN ? "Provide specific design dimensions" : "Fornecer dimensões específicas de design",
              isEN ? "Explain protective packaging in detail" : "Explicar embalagem de proteção em detalhe",
              isEN ? "Emphasize material durability and thickness" : "Destacar durabilidade e espessura do material",
              isEN ? "Offer extra protection at no additional cost" : "Oferecer proteção extra sem custo adicional",
            ],
          },
          {
            title: isEN ? "Specific Answers" : "Respostas Específicas",
            items: [
              isEN
                ? "Cylinder diameter: 8cm (fits cabin backpack)"
                : "Diâmetro do cilindro: 8cm (cabe em mochila de cabine)",
              isEN
                ? "Premium packaging designed for travel protection"
                : "Embalagem premium desenhada para proteção em viagem",
              isEN
                ? "Ceramic and cork built with transport thickness"
                : "Cerâmica e cortiça com espessura de transporte",
              isEN
                ? "Wrap with extra protective layers at no cost"
                : "Embrulhar com camadas extras sem custo",
            ],
          },
        ],
        phrases: [
          {
            pt: "Compreendo perfeitamente — é sempre um desafio gerir o espaço. O nosso cilindro foi desenhado para caber numa mochila de cabine — tem apenas 8 cm de diâmetro.",
            en: "I completely understand — it's always a challenge to manage luggage space. Our cylinder was designed to fit in a cabin backpack — it's only 8cm in diameter.",
            context: isEN ? "Space solution" : "Solução de espaço",
          },
          {
            pt: "É uma preocupação muito válida — e percebo que não queira arriscar um presente especial. A nossa embalagem foi desenhada para proteger o conteúdo em viagem.",
            en: "That's a very valid concern — I understand you wouldn't want to risk a special gift. Our packaging was designed to protect the contents during travel.",
            context: isEN ? "Breakage concern validation" : "Validação de preocupação de quebra",
          },
          {
            pt: "As nossas peças em cerâmica e cortiça têm uma espessura pensada para resistir ao transporte normal de bagagem.",
            en: "Our ceramic and cork pieces are built with thickness specifically designed for normal baggage transport.",
            context: isEN ? "Material durability" : "Durabilidade do material",
          },
          {
            pt: "Para maior segurança, posso embrulhá-lo com proteção extra — sem custo adicional. Fica como se fosse feito para voar.",
            en: "For extra peace of mind, I can wrap it with additional protection — at no extra cost. It'll be ready to fly.",
            context: isEN ? "Extra protection offer" : "Oferta de proteção extra",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "How should you respond to 'I don't have space in my luggage'?"
              : "Como responder a 'Não tenho espaço na mala'?",
            options: [
              {
                text: isEN ? "Tell them to check another store" : "Dizer-lhes para verificar outra loja",
                correct: false,
              },
              {
                text: isEN
                  ? "Validate and provide specific dimensions showing it fits cabin luggage"
                  : "Validar e fornecer dimensões específicas",
                correct: true,
              },
              {
                text: isEN ? "Offer to ship it later" : "Oferecer enviar mais tarde",
                correct: false,
              },
              {
                text: isEN ? "Suggest a smaller product" : "Sugerir produto menor",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What is the cylinder's design dimension for travel?"
              : "Qual é a dimensão do cilindro para viagem?",
            options: [
              {
                text: isEN ? "15cm diameter" : "Diâmetro de 15cm",
                correct: false,
              },
              {
                text: isEN ? "8cm diameter—fits cabin luggage" : "Diâmetro de 8cm—cabe em bagagem de cabine",
                correct: true,
              },
              {
                text: isEN ? "12cm diameter" : "Diâmetro de 12cm",
                correct: false,
              },
              {
                text: isEN ? "It's not designed for travel" : "Não é desenhado para viagem",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "When addressing breakage fears, what should you emphasize?"
              : "Ao abordar medos de quebra, o que enfatizar?",
            options: [
              {
                text: isEN ? "The rarity of breakage" : "A raridade de quebra",
                correct: false,
              },
              {
                text: isEN
                  ? "Material durability, protective packaging, and extra protection available"
                  : "Durabilidade, embalagem protetora e proteção extra",
                correct: true,
              },
              {
                text: isEN ? "The cost of replacement" : "O custo de substituição",
                correct: false,
              },
              {
                text: isEN ? "Insurance options" : "Opções de seguro",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "interactive-roleplay",
      title: isEN ? "Interactive Role-Play: Real Objection Scenarios" : "Role-Play Interativo: Cenários Reais de Objeção",
      description: isEN
        ? "Face real objections and practice the 3-step response: Validate → Reformulate → Advance. Test your ability to stay calm, elegant, and client-focused under objection pressure."
        : "Enfrente objeções reais e pratique a resposta em 3 passos. Teste sua capacidade de ficar calmo, elegante e focado no cliente.",
      slides: [
        {
          id: "roleplay-intro",
          title: isEN ? "Objection Response Framework" : "Framework de Resposta a Objeções",
          content: isEN
            ? "All premium objection responses follow the same structure: (1) Validate—show you understand. (2) Reformulate—reposition perception with clear information. (3) Advance—guide gently to decision. This framework ensures consistency and elegance."
            : "Todas as respostas seguem: (1) Validar, (2) Reformular, (3) Avançar. Este framework garante consistência e elegância.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Stay Calm Under Objection" : "Manter Calma Sob Objeção",
            items: [
              isEN ? "Take a brief pause before responding" : "Fazer pausa breve antes de responder",
              isEN ? "Breathe—you've trained for this" : "Respirar—está treinado",
              isEN ? "Remember: objection = interest" : "Lembrar: objeção = interesse",
              isEN ? "Smile subtly to maintain composure" : "Sorrir subtilmente para manter compostura",
              isEN ? "Slow your pace and speak clearly" : "Abrandar o ritmo e falar claramente",
            ],
          },
          {
            title: isEN ? "Remember" : "Lembre-se",
            items: [
              isEN ? "Never discount or become defensive" : "Nunca descontar ou ficar defensivo",
              isEN ? "Objections are invitations to deepen trust" : "Objeções são convites para aprofundar confiança",
              isEN ? "Premium response is always calm and elegant" : "Resposta premium é sempre calma e elegante",
              isEN ? "You represent the brand—embody its sophistication" : "Você representa a marca—incorpore sofisticação",
            ],
          },
        ],
        phrases: [],
        quiz: [],
      },
    },
  ];

  const scenario: Scenario = {
    id: "objection-complete",
    title: isEN ? "Objection Handling: Client Questions Value" : "Gestão de Objeções: Cliente Questiona Valor",
    description: isEN
      ? "A client says: 'It's too expensive for such a small bottle.' Practice validating, reformulating value, and advancing to closure with premium elegance."
      : "Cliente diz: 'É muito caro para uma garrafa tão pequena.' Pratique validar, reformular valor e avançar.",
    customerProfile: isEN
      ? "Interested client, but has price comparison concerns. Needs clarity on value beyond the bottle itself. Appreciates data and clear explanation. May need emotional reconnection to the occasion."
      : "Cliente interessado mas com preocupações de comparação de preço. Precisa de clareza sobre valor além da garrafa.",
    steps: [
      {
        id: "objection-validate",
        phase: "editorial-principle",
        scenario: isEN
          ? "Customer picks up the Port Wine Gift, examines it, then says: 'It's nice, but it's really expensive for just a small bottle of wine.'"
          : "Cliente examina o Gift e diz: 'É bonito, mas é muito caro para apenas uma pequena garrafa de vinho.'",
        options: [
          {
            text: isEN
              ? "Respond: 'I understand completely. You're right that the bottle itself is small. But what you're investing in is far more than just wine.'"
              : "Responder: 'Compreendo completamente. O que investe é muito mais que apenas vinho.'",
            score: 3,
            feedback: isEN
              ? "Perfect. You validated the concern, acknowledged the observation, and immediately began reformulating the frame."
              : "Perfeito. Validou a preocupação e começou a reformular o quadro.",
          },
          {
            text: isEN
              ? "Respond: 'Well, the wine itself is 10 years old, so it's not just any bottle. It's premium Port Wine.'"
              : "Responder: 'O vinho tem 10 anos, por isso não é apenas qualquer garrafa. É Port Wine premium.'",
            score: 1,
            feedback: isEN
              ? "You defended the product but didn't validate the client's concern first. This can feel dismissive."
              : "Defendeu o produto mas não validou a preocupação primeiro. Pode parecer dismissivo.",
          },
          {
            text: isEN
              ? "Respond: 'You're right, it is expensive. I can give you a discount if you decide today.'"
              : "Responder: 'Tem razão, é caro. Posso-lhe dar um desconto se decidir hoje.'",
            score: 0,
            feedback: isEN
              ? "No. Never discount in response to a price objection. This trains clients to expect discounts and undermines premium positioning."
              : "Nunca descontar. Isto treina clientes a esperar descontos e undermina posicionamento premium.",
          },
        ],
      },
      {
        id: "objection-reformulate",
        phase: "editorial-principle",
        scenario: isEN
          ? "After validation, the client is listening. Now reformulate what the purchase really represents."
          : "Após validação, o cliente está ouvindo. Agora reformule o que a compra representa.",
        options: [
          {
            text: isEN
              ? "Continue: 'This Gift is not just wine—it's a handcrafted object of design. The ceramic, the cork, the oak-aged wine inside—all designed to last decades. You're buying a memory that becomes a permanent part of your home.'"
              : "Continuar: 'Este Gift não é apenas vinho—é um objeto de design artesanal. A cerâmica, cortiça, vinho envelhecido—tudo pensado para durar décadas.'",
            score: 3,
            feedback: isEN
              ? "Excellent. You shifted the frame from 'small bottle' to 'lasting design object and memory.' You emphasized durability and emotional value, not features."
              : "Excelente. Mudou de 'pequena garrafa' para 'objeto de design duradouro e memória'. Enfatizou valor emocional.",
          },
          {
            text: isEN
              ? "Continue: 'The Port Wine inside is 10 years old. That aging process increases its value significantly.'"
              : "Continuar: 'O Port Wine é envelhecido 10 anos. Isso aumenta significativamente o valor.'",
            score: 1,
            feedback: isEN
              ? "You focused on product age/value, but didn't address the core issue: the perceived size of the bottle. You're still defending the product, not reframing the perception."
              : "Focou na idade do produto mas não abordou o core issue. Ainda está defendendo, não reformulando.",
          },
          {
            text: isEN
              ? "Continue: 'It's actually a great investment. Many customers who buy this tell us they keep it for 20+ years without opening it.'"
              : "Continuar: 'Na verdade é um ótimo investimento. Muitos clientes guardam isto 20+ anos sem abrir.'",
            score: 0,
            feedback: isEN
              ? "Wrong direction. You're claiming value without explaining what value means to THIS client. You haven't addressed their specific concern about size vs. price."
              : "Dirección errada. Está afirmando valor sem explicar. Não abordou a preocupação específica do cliente.",
          },
        ],
      },
      {
        id: "objection-advance",
        phase: "editorial-principle",
        scenario: isEN
          ? "The client nods, understanding that this is more than just wine. Now guide them to commitment."
          : "O cliente aceita que é mais que apenas vinho. Agora guie-o para comprometimento.",
        options: [
          {
            text: isEN
              ? "Advance: 'So if what you're looking for is something that marks this moment with elegance and lasts for years, this is exactly the right choice. Shall we go ahead?'"
              : "Avançar: 'Se o que procura é algo que marca este momento com elegância e dura anos, é a escolha certa. Vamos avançar?'",
            score: 3,
            feedback: isEN
              ? "Perfect. You've validated the concern, reframed the value, and now you're guiding toward commitment by connecting back to their original intention."
              : "Perfeito. Validou, reformulou e agora guia para compromisso conectando à intenção original.",
          },
          {
            text: isEN
              ? "Advance: 'Now I understand why you're hesitant. Let me show you a cheaper option instead.'"
              : "Avançar: 'Agora entendo sua hesitação. Deixe-me mostrar uma opção mais barata.'",
            score: 0,
            feedback: isEN
              ? "No. You just lost all the reformulation work. Never retreat to a cheaper option after successfully reframing value. This signals you didn't believe your own argument."
              : "Perdeu o trabalho de reformulação. Nunca retreat para opção mais barata após reformular com sucesso.",
          },
          {
            text: isEN
              ? "Advance: 'Yes, it's expensive. But it's worth it. Trust me.'"
              : "Avançar: 'Sim, é caro. Mas vale a pena. Confie em mim.'",
            score: 1,
            feedback: isEN
              ? "Weak closing. You're asking them to trust you, but you haven't fully connected the value back to THEIR intention and context. You need to tie the reframe to their original reason for being interested."
              : "Fraco. Pede confiança mas não conectou valor à intenção deles. Precisa conectar à razão original.",
          },
        ],
      },
      {
        id: "objection-close",
        phase: "editorial-principle",
        scenario: isEN
          ? "Client seems convinced of the value but is still slightly uncertain. Provide one final elegant close."
          : "Cliente parece convencido mas ainda ligeiramente incerto. Forneça fecho final elegante.",
        options: [
          {
            text: isEN
              ? "Close: 'Between this premium version and the standard option, which one feels more aligned with the special moment you want to mark?'"
              : "Fechar: 'Entre a versão premium e a opção standard, qual se sente mais alinhada com o momento especial?'",
            score: 3,
            feedback: isEN
              ? "Ideal. You've used a preference-based closing question that respects their autonomy while confirming their choice. You're letting them decide, not forcing them."
              : "Ideal. Pergunta de fecho baseada em preferência que respeita autonomia. Deixando-o decidir, não forçando.",
          },
          {
            text: isEN
              ? "Close: 'So, do you want to buy it?'"
              : "Fechar: 'Então, quer comprar?'",
            score: 0,
            feedback: isEN
              ? "Too blunt and binary. This makes it easy for them to say no. Premium closing is always preference-based, not yes/no."
              : "Demasiado direto e binário. Fácil dizer não. Premium usa preferência, nunca sim/não.",
          },
          {
            text: isEN
              ? "Close: 'You'll love this purchase. I guarantee you'll be happy with it.'"
              : "Fechar: 'Vai adorar esta compra. Garanto que vai estar feliz.'",
            score: 0,
            feedback: isEN
              ? "Overconfident and pushy. You're making a guarantee they didn't ask for. Let them decide based on the value you've articulated. Trust the reframe."
              : "Demasiado confiante e invasivo. Está fazendo garantia que não pediram. Deixe decidir com base no valor.",
          },
        ],
      },
    ],
  };

  return (
    <ModuleLayout
      moduleId="objection-handling"
      title={isEN ? "Objection Handling: Transform Resistance into Trust" : "Gestão de Objeções: Transformar Resistência em Confiança"}
      description={isEN
        ? "Master the art of responding to objections with calm, elegance, and premium sophistication. Every objection is an invitation to deepen trust and clarify value. Use the Validate → Reformulate → Advance framework to dissolve doubt."
        : "Domine a arte de responder a objeções com calma, elegância e sofisticação premium. O framework Validar → Reformular → Avançar dissolve dúvida."}
    >
      <ContentBlock>
        <PhaseSystem phases={phases} />
      </ContentBlock>

      <ContentBlock>
        <h2>{isEN ? "Real Objection Simulation" : "Simulação de Objeção Real"}</h2>
        <p>
          {isEN
            ? "Practice handling a real price objection with the complete 3-step framework. How you respond will determine whether the client trusts you and the brand."
            : "Pratique lidar com uma objeção de preço real com o framework de 3 passos. Como responde determinará confiança."}
        </p>
        <ScenarioSimulator scenario={scenario} />
      </ContentBlock>
    </ModuleLayout>
  );
}
