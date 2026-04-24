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

export default function ModuleClosingConsultative() {
  const { language } = useLanguage();
  const isEN = language === "en";

  const phases: Phase[] = [
    {
      id: "premium-closing",
      title: isEN ? "Premium Closing Technique: Choice, Not Pressure" : "Técnica de Fecho Premium: Escolha, Não Pressão",
      description: isEN
        ? "Don't ask 'Do you want this?' Ask 'Which of these do you prefer?' The close is gentle, elegant, and guided. It removes the binary 'yes/no' and keeps the client within the decision."
        : "Não perguntar 'Quer este?' Perguntar 'Qual prefere?' O fecho é suave, elegante e guiado.",
      slides: [
        {
          id: "premium-close-1",
          title: isEN ? "The Philosophy of Premium Closing" : "A Filosofia do Fecho Premium",
          content: isEN
            ? "The close is not a final moment—it's the natural consequence of a good journey. The client must feel clarity, security, trust, and elegance in your guidance. Premium closing never forces, never pressures, never rushes. It guides, clarifies, and elevates the experience."
            : "O fecho é consequência natural de uma boa jornada. O cliente deve sentir clareza, segurança, confiança e elegância.",
        },
        {
          id: "premium-close-2",
          title: isEN ? "The Golden Rule" : "A Regra de Ouro",
          content: isEN
            ? "Never ask if the client wants it. Always ask which they prefer. The question 'Which do you prefer—this more elegant or this more exclusive?' keeps them within the decision frame. The answer cannot be 'no.' It can only be 'this one' or 'that one.'"
            : "Nunca perguntar 'Quer este?' Perguntar 'Qual prefere?' A resposta não pode ser 'não', apenas 'este' ou 'aquele'.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Premium Close Practices" : "Práticas de Fecho Premium",
            items: [
              isEN ? "Recapitulate benefits briefly and elegantly" : "Recapitular benefícios brevemente",
              isEN ? "Reinforce alignment with what client described" : "Reforçar alinhamento",
              isEN ? "Ask with 'prefer' not 'want'" : "Perguntar com 'prefere' não 'quer'",
              isEN ? "Use silence after the question—it's part of the technique" : "Usar silêncio após pergunta",
              isEN ? "Maintain calm, confident presence" : "Manter presença calma",
            ],
          },
          {
            title: isEN ? "Never Do This" : "Nunca Fazer Isto",
            items: [
              isEN ? "Ask yes/no questions" : "Perguntar sim/não",
              isEN ? "Pressure or rush" : "Pressionar ou apressar",
              isEN ? "Talk too much after the close question" : "Falar demasiado após pergunta",
              isEN ? "Present too many options at close time" : "Apresentar muitas opções",
              isEN ? "Create artificial urgency" : "Criar urgência artificial",
            ],
          },
        ],
        phrases: [
          {
            pt: "Prefere o Cilindro — mais compacto e fácil de levar — ou o Cubo, que tem mais presença em casa?",
            en: "Would you prefer the Cylinder — more compact and travel-friendly — or the Cube, which has more presence at home?",
            context: isEN ? "Practical preference" : "Preferência prática",
          },
          {
            pt: "Entre estas duas opções, qual sente que é mais a sua cara?",
            en: "Between these two, which one feels more like you?",
            context: isEN ? "Style-based close" : "Fecho baseado em estilo",
          },
          {
            pt: "Qual destes dois imagina a exibir mais vezes em casa?",
            en: "Which of these two do you see displaying more often at home?",
            context: isEN ? "Emotional visualization" : "Visualização emocional",
          },
          {
            pt: "Qual destes dois transmite melhor aquilo que procura?",
            en: "Which of these two better conveys what you're looking for?",
            context: isEN ? "Value alignment" : "Alinhamento de valor",
          },
        ],
        quiz: [
          {
            question: isEN ? "What is the core principle of premium closing?" : "Qual é o princípio core do fecho premium?",
            options: [
              {
                text: isEN ? "Push for the sale aggressively" : "Empurrar agressivamente para venda",
                correct: false,
              },
              {
                text: isEN ? "Ask yes/no questions to speed up decision" : "Perguntar sim/não para acelerar",
                correct: false,
              },
              {
                text: isEN
                  ? "Ask preference-based questions that keep client within the decision frame"
                  : "Perguntar baseado em preferência mantendo cliente no quadro",
                correct: true,
              },
              {
                text: isEN ? "Offer discounts to close faster" : "Oferecer descontos para fechar",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "Why is the silence after a closing question important?"
              : "Por que é importante o silêncio após pergunta de fecho?",
            options: [
              {
                text: isEN ? "It looks professional" : "Parece profissional",
                correct: false,
              },
              {
                text: isEN
                  ? "It's the space where the client decides—don't interrupt it"
                  : "É onde o cliente decide—não interromper",
                correct: true,
              },
              {
                text: isEN ? "It makes the client uncomfortable" : "Torna cliente desconfortável",
                correct: false,
              },
              {
                text: isEN ? "It allows you to think of another option" : "Permite pensar outra opção",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What should you never ask in a premium close?"
              : "O que nunca perguntar num fecho premium?",
            options: [
              {
                text: isEN ? "'Which do you prefer?'" : "'Qual prefere?'",
                correct: false,
              },
              {
                text: isEN ? "'Do you want this?'" : "'Quer este?'",
                correct: true,
              },
              {
                text: isEN ? "'Which feels more like you?'" : "'Qual se sente mais como você?'",
                correct: false,
              },
              {
                text: isEN ? "'Which one would you like?'" : "'Qual preferia levar?'",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "consultative-selling",
      title: isEN ? "What Is Consultative Selling?" : "O Que É Venda Consultiva?",
      description: isEN
        ? "Consultative selling is the art of guiding the client, not pressuring them. The client feels freedom, the collaborator conducts with elegance, the decision is born naturally, and the experience is as valuable as the product itself. In luxury, we don't sell. We help the client discover."
        : "Venda consultiva é guiar o cliente, não pressionar. O cliente sente liberdade, o colaborador conduz com elegância, a experiência vale tanto quanto o produto.",
      slides: [
        {
          id: "consultative-1",
          title: isEN ? "Consultative vs. Transactional" : "Consultativo vs. Transacional",
          content: isEN
            ? "Transactional: 'What do you want? Here it is. Will you buy?' Consultative: 'What brings you here? Let me understand your need. Here are two perfect options. Which feels right to you?' Consultative is patience, listening, curation, and trust-building."
            : "Transacional: 'O que quer? Aqui está. Compra?' Consultativo: 'O que o traz? Deixe-me compreender. Aqui estão duas opções perfeitas.'",
        },
        {
          id: "consultative-2",
          title: isEN ? "The Museum Guide Analogy" : "A Analogia do Guia de Museu",
          content: isEN
            ? "A museum guide doesn't pressure you to buy a painting. They show you the collection, share the stories, and help you understand why each piece matters. The best guide makes you feel like the paintings were waiting for you specifically. That's consultative selling."
            : "Um guia de museu não pressiona a comprar uma pintura. Mostra a coleção, partilha histórias, ajuda a compreender por que cada peça importa.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Consultative Selling Principles" : "Princípios da Venda Consultativa",
            items: [
              isEN ? "Client feels freedom to explore and choose" : "Cliente sente liberdade",
              isEN ? "Collaborator conducts with elegance and patience" : "Colaborador conduz com elegância",
              isEN ? "Decision is born naturally, not forced" : "Decisão nasce naturalmente",
              isEN ? "Experience matters as much as the product" : "Experiência vale tanto quanto produto",
              isEN ? "No selling—only helping the client discover" : "Não vender—ajudar cliente a descobrir",
            ],
          },
          {
            title: isEN ? "Never Transactional" : "Nunca Transacional",
            items: [
              isEN ? "Don't rush to close" : "Não apressar o fecho",
              isEN ? "Don't focus on the sale above the person" : "Não focar na venda acima da pessoa",
              isEN ? "Don't present options as a menu—curate instead" : "Não apresentar como menu—curar",
              isEN ? "Don't ignore emotional context and intention" : "Não ignorar contexto emocional",
              isEN ? "Don't pressure with time limits or discounts" : "Não pressionar com tempo ou descontos",
            ],
          },
        ],
        phrases: [
          {
            pt: "No luxo, não vendemos. Ajudamos o cliente a descobrir.",
            en: "In luxury, we don't sell. We help the client discover.",
            context: isEN ? "Core principle" : "Princípio core",
          },
          {
            pt: "Bem-vindo à The 100's. Explore à vontade — cada peça conta uma história.",
            en: "Welcome to The 100's. Please explore freely — each piece tells a story.",
            context: isEN ? "Inviting exploration" : "Convidando exploração",
          },
          {
            pt: "Gosto da forma como descreveu esse momento — deixe-me mostrar-lhe o Gift que melhor o preserva.",
            en: "I love how you described that moment — let me show you the Gift that best preserves it.",
            context: isEN ? "Consultative guidance" : "Guiança consultativa",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "What is the primary difference between consultative and transactional selling?"
              : "Qual é a diferença primária entre venda consultativa e transacional?",
            options: [
              {
                text: isEN ? "Speed of closing" : "Velocidade de fecho",
                correct: false,
              },
              {
                text: isEN
                  ? "Consultative focuses on discovery and trust; transactional focuses on the sale"
                  : "Consultativa: descoberta; transacional: venda",
                correct: true,
              },
              {
                text: isEN ? "Price point" : "Ponto de preço",
                correct: false,
              },
              {
                text: isEN ? "Number of products shown" : "Número de produtos mostrados",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "In consultative selling, what matters as much as the product?"
              : "Na venda consultativa, o que importa tanto quanto o produto?",
            options: [
              {
                text: isEN ? "The store decor" : "A decoração da loja",
                correct: false,
              },
              {
                text: isEN ? "The experience and emotional connection" : "A experiência e conexão emocional",
                correct: true,
              },
              {
                text: isEN ? "The customer's budget" : "O orçamento do cliente",
                correct: false,
              },
              {
                text: isEN ? "The sales target" : "A meta de vendas",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What is the museum guide analogy about?"
              : "A que se refere a analogia do guia de museu?",
            options: [
              {
                text: isEN ? "Explaining the history of Port Wine" : "Explicar história do Port Wine",
                correct: false,
              },
              {
                text: isEN
                  ? "Showing, storytelling, and helping clients understand why pieces matter without pressure"
                  : "Mostrar, contar histórias e ajudar sem pressão",
                correct: true,
              },
              {
                text: isEN ? "Creating a formal sales environment" : "Criar ambiente formal",
                correct: false,
              },
              {
                text: isEN ? "Following a strict sales script" : "Seguir script rígido",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "open-questions",
      title: isEN ? "Open Questions: The Foundation of Consultative Selling" : "Perguntas Abertas: A Base da Venda Consultativa",
      description: isEN
        ? "Open questions reveal needs, create conversation, show genuine interest, enable personalization, and help identify client profile. Closed questions create pressure. Open questions create trust."
        : "Perguntas abertas revelam necessidades, criam conversa, mostram interesse genuíno. Perguntas fechadas criam pressão.",
      slides: [
        {
          id: "open-questions-1",
          title: isEN ? "Open vs. Closed Questions" : "Perguntas Abertas vs. Fechadas",
          content: isEN
            ? "Closed: 'Do you want this?' 'Are you looking for a gift?' 'Is this for yourself?' Open: 'What brings you here?' 'What would make this moment special?' 'Tell me about the person you're shopping for.' Open questions invite depth. Closed questions shut conversations down."
            : "Fechada: 'Quer isto?' Aberta: 'O que o traz?' Perguntas abertas convidam profundidade. Fechadas fecham conversas.",
        },
        {
          id: "open-questions-2",
          title: isEN ? "Examples: Open Questions for Discovery" : "Exemplos: Perguntas Abertas para Descoberta",
          content: isEN
            ? "To understand intention: 'What brought you to The 100's today?' To understand style: 'What matters most to you in a choice like this?' To understand occasion: 'Is there a special moment you'd like to mark?' To understand emotions: 'What memory would you like to preserve with this Gift?'"
            : "Para intenção: 'O que o traz?' Para estilo: 'O que importa mais?' Para ocasião: 'Há momento especial?' Para emoções: 'Que memória quer preservar?'",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Powerful Open Questions" : "Perguntas Abertas Poderosas",
            items: [
              isEN ? "What brings you in today?" : "O que o traz?",
              isEN ? "What would make this moment special?" : "O que tornaria especial?",
              isEN ? "Tell me about the person you're shopping for" : "Fale-me sobre a pessoa",
              isEN ? "What matters most to you in a choice like this?" : "O que importa mais?",
              isEN ? "What memory would you like to preserve?" : "Que memória quer preservar?",
            ],
          },
          {
            title: isEN ? "Close Questions to Avoid" : "Perguntas Fechadas a Evitar",
            items: [
              isEN ? "'Do you want this?' (yes/no)" : "'Quer isto?' (sim/não)",
              isEN ? "'Is this a gift?' (yes/no)" : "'É uma oferta?' (sim/não)",
              isEN ? "'How much do you want to spend?' (pressure)" : "'Quanto quer gastar?' (pressão)",
              isEN ? "'Are you interested?' (yes/no)" : "'Está interessado?' (sim/não)",
            ],
          },
        ],
        phrases: [
          {
            pt: "O que o trouxe à The 100's hoje — está a explorar, ou já tem algo em mente?",
            en: "What brought you to The 100's today — are you exploring, or do you already have something in mind?",
            context: isEN ? "Intention discovery" : "Descoberta de intenção",
          },
          {
            pt: "Prefere algo para levar hoje, ou quer ver as peças mais exclusivas da coleção?",
            en: "Would you prefer something to take home today, or would you like to see the more exclusive pieces in the collection?",
            context: isEN ? "Tier and preference discovery" : "Descoberta de preferência",
          },
          {
            pt: "Costuma preferir o vinho como parte da experiência, ou é o contentor — o design, os materiais — que mais o atrai?",
            en: "Are you more drawn to the wine itself, or is it the container — the design, the materials — that appeals to you most?",
            context: isEN ? "Product focus discovery" : "Descoberta de foco de produto",
          },
          {
            pt: "Há algum momento especial que queira marcar?",
            en: "Is there a special moment you'd like to mark?",
            context: isEN ? "Occasion discovery" : "Descoberta de ocasião",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "Why are open questions more effective in consultative selling?"
              : "Por que perguntas abertas são mais eficazes na venda consultativa?",
            options: [
              {
                text: isEN ? "They speed up the sale" : "Aceleram a venda",
                correct: false,
              },
              {
                text: isEN
                  ? "They reveal needs, create conversation, and build trust"
                  : "Revelam necessidades, criam conversa e confiança",
                correct: true,
              },
              {
                text: isEN ? "They are easier to ask" : "São mais fáceis de fazer",
                correct: false,
              },
              {
                text: isEN ? "They guarantee a yes answer" : "Garantem resposta sim",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "Which is an open question?"
              : "Qual é uma pergunta aberta?",
            options: [
              {
                text: isEN ? "'Do you want this?'" : "'Quer isto?'",
                correct: false,
              },
              {
                text: isEN ? "'What brought you to The 100's today?'" : "'O que o traz à The 100's?'",
                correct: true,
              },
              {
                text: isEN ? "'Are you looking for a gift?'" : "'Procura uma oferta?'",
                correct: false,
              },
              {
                text: isEN ? "'Is this for yourself?'" : "'É para si?'",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What should you do if a client answers an open question with a short response?"
              : "O que fazer se cliente responde curto a pergunta aberta?",
            options: [
              {
                text: isEN ? "Move on to the next topic" : "Avançar para próximo tópico",
                correct: false,
              },
              {
                text: isEN
                  ? "Gently follow up with another open question to deepen understanding"
                  : "Seguir com outra pergunta aberta para aprofundar",
                correct: true,
              },
              {
                text: isEN ? "Ask a closed yes/no question" : "Perguntar sim/não",
                correct: false,
              },
              {
                text: isEN ? "Assume you understand and continue" : "Assumir e continuar",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "emotional-connection",
      title: isEN ? "Emotional Connection: Linking Product to Memory" : "Conexão Emocional: Ligar Produto a Memória",
      description: isEN
        ? "Premium selling happens at the emotional level. Connect the Gift not to features, but to the memory, occasion, and feeling the client wants to preserve. Use stories, details, and validation to create the moment where the client feels seen and understood."
        : "Venda premium acontece ao nível emocional. Conecte o Gift à memória, ocasião e sentimento que o cliente quer preservar.",
      slides: [
        {
          id: "emotional-1",
          title: isEN ? "What Is Emotional Connection?" : "O Que É Conexão Emocional?",
          content: isEN
            ? "It's the moment when the client feels: understood, valued, accompanied, respected, seen as unique. When emotional connection happens, the client is no longer shopping—they're discovering something that was waiting for them."
            : "É quando o cliente sente: compreendido, valorizado, acompanhado, respeitado, visto como único.",
        },
        {
          id: "emotional-2",
          title: isEN ? "How to Create Emotional Connection" : "Como Criar Conexão Emocional",
          content: isEN
            ? "1. Mirror the client (rhythm, energy, language). 2. Validate emotions and intentions. 3. Use elegant storytelling (history, detail, meaning). 4. Reinforce client's intention back to them. 5. Create moments (demonstration, touch, premium comparison)."
            : "Espelhar o cliente. Validar emoções. Usar storytelling. Reforçar intenção. Criar momentos.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Creating the Connection" : "Criando a Conexão",
            items: [
              isEN ? "Listen for the emotion beneath the words" : "Ouvir emoção por baixo das palavras",
              isEN ? "Reflect back what you hear to confirm understanding" : "Refletir o que ouve para confirmar",
              isEN ? "Use the client's own words and intentions" : "Usar palavras e intenções do cliente",
              isEN ? "Tell the story of the product—not its features" : "Contar história—não features",
              isEN ? "Connect every suggestion to their specific moment" : "Conectar cada sugestão ao seu momento",
            ],
          },
          {
            title: isEN ? "Premium Emotional Phrases" : "Frases Emocionais Premium",
            items: [
              isEN
                ? "'I understand exactly what you're describing'"
                : "'Compreendo exatamente o que descreve'",
              isEN
                ? "'This Gift preserves that specific memory perfectly'"
                : "'Este Gift preserva essa memória perfeitamente'",
              isEN
                ? "'What you've described fits this piece exactly'"
                : "'O que descreveu combina exatamente'",
              isEN
                ? "'This is the kind of moment The 100's was created for'"
                : "'Este é o tipo de momento para o qual The 100's foi criada'",
            ],
          },
        ],
        phrases: [
          {
            pt: "O que descreveu combina muito com este Gift — é exatamente a memória que a The 100's foi criada para preservar.",
            en: "What you described fits this Gift perfectly — it's exactly the kind of memory The 100's was created to preserve.",
            context: isEN ? "Perfect alignment" : "Alinhamento perfeito",
          },
          {
            pt: "Percebo perfeitamente o estilo que procura.",
            en: "I understand perfectly the style you're looking for.",
            context: isEN ? "Understanding validation" : "Validação de compreensão",
          },
          {
            pt: "Este Gift tem exatamente a presença e o caráter que mencionou.",
            en: "This Gift has exactly the presence and character you mentioned.",
            context: isEN ? "Character alignment" : "Alinhamento de caráter",
          },
          {
            pt: "Se a intenção é marcar este momento em Portugal, o nosso Port Wine Gift é uma excelente opção — uma memória engarrafada que dura para sempre.",
            en: "If the intention is to mark this moment in Portugal, our Port Wine Gift is an excellent option — a bottled memory that lasts forever.",
            context: isEN ? "Occasion-specific positioning" : "Posicionamento específico de ocasião",
          },
          {
            pt: "Gosto da forma como descreveu esse momento — deixe-me mostrar-lhe o Gift que melhor o preserva.",
            en: "I love how you described that moment — let me show you the Gift that best preserves it.",
            context: isEN ? "Guided discovery" : "Descoberta guiada",
          },
        ],
        quiz: [
          {
            question: isEN
              ? "What is the goal of creating emotional connection in consultative selling?"
              : "Qual é o objetivo de criar conexão emocional na venda consultativa?",
            options: [
              {
                text: isEN ? "To manipulate the client into buying" : "Manipular o cliente",
                correct: false,
              },
              {
                text: isEN
                  ? "To make the client feel understood, valued, and seen so they discover the perfect fit"
                  : "Fazer cliente sentir compreendido, valorizado, visto",
                correct: true,
              },
              {
                text: isEN ? "To speed up the decision process" : "Acelerar processo de decisão",
                correct: false,
              },
              {
                text: isEN ? "To increase the transaction value" : "Aumentar valor transacional",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "How should you validate a client's emotion or intention?"
              : "Como validar emoção ou intenção de um cliente?",
            options: [
              {
                text: isEN ? "Tell them they're wrong and correct them" : "Dizer que está errado",
                correct: false,
              },
              {
                text: isEN
                  ? "Reflect back what you heard to show understanding"
                  : "Refletir o que ouve para mostrar compreensão",
                correct: true,
              },
              {
                text: isEN ? "Ignore it and move forward" : "Ignorar e avançar",
                correct: false,
              },
              {
                text: isEN ? "Ask them to explain more" : "Pedir mais explicação",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What should emotional connection be based on?"
              : "Em que deve basear-se a conexão emocional?",
            options: [
              {
                text: isEN ? "Product features" : "Características do produto",
                correct: false,
              },
              {
                text: isEN
                  ? "The client's specific moment, memory, and intention"
                  : "O momento, memória e intenção específicos do cliente",
                correct: true,
              },
              {
                text: isEN ? "The sales target" : "Meta de vendas",
                correct: false,
              },
              {
                text: isEN ? "The store decor" : "Decoração da loja",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "consultative-framework",
      title: isEN ? "The Complete Consultative Selling Framework" : "O Framework Completo da Venda Consultativa",
      description: isEN
        ? "5 integrated steps: (1) Approach with elegance, (2) Ask open questions, (3) Create emotional connection, (4) Present two perfect options, (5) Close with preference-based guidance. Each step builds on the previous. Master this and you've mastered premium selling."
        : "5 passos integrados: Abordar, perguntar, conectar, apresentar, fechar. Cada passo constrói no anterior.",
      slides: [
        {
          id: "framework-1",
          title: isEN ? "The 5-Step Framework" : "O Framework de 5 Passos",
          content: isEN
            ? "1. APPROACH with elegance (soft, non-intrusive). 2. ASK open questions (discover intention, style, occasion). 3. CREATE emotional connection (validate, story-tell, reflect back). 4. PRESENT two curated options (not 5, not 1—exactly 2, premium). 5. CLOSE with preference-based guidance ('Which feels right to you?')."
            : "1. Abordar. 2. Perguntar. 3. Conectar. 4. Apresentar duas opções. 5. Fechar com preferência.",
        },
        {
          id: "framework-2",
          title: isEN ? "Why This Framework Works" : "Por Que Este Framework Funciona",
          content: isEN
            ? "Each step builds trust and confidence. The client is never pressured—they're guided. They're never confused by choice—exactly 2 curated options. They never feel sold to—they feel discovered. By step 5, the close is inevitable and natural."
            : "Cada passo constrói confiança. Cliente nunca é pressionado, guiado. Nunca confuso, 2 opções. Nunca vendido, descoberto.",
        },
      ],
      components: {
        tips: [
          {
            title: isEN ? "Framework Essentials" : "Essenciais do Framework",
            items: [
              isEN ? "Step 1: Elegance over urgency" : "Passo 1: Elegância sobre urgência",
              isEN ? "Step 2: Listening is more important than talking" : "Passo 2: Ouvir > falar",
              isEN ? "Step 3: Make the client feel understood" : "Passo 3: Fazer cliente sentir compreendido",
              isEN ? "Step 4: Curation, not options. 2, not 5." : "Passo 4: Curadoria. 2, não 5.",
              isEN ? "Step 5: Preference, not pressure" : "Passo 5: Preferência, não pressão",
            ],
          },
          {
            title: isEN ? "Timeline" : "Cronograma",
            items: [
              isEN ? "Minutes 1-2: Approach and initial impression" : "1-2 min: Abordar",
              isEN ? "Minutes 3-7: Ask, listen, understand deeply" : "3-7 min: Perguntar e ouvir",
              isEN ? "Minutes 8-12: Connect emotionally and curate selection" : "8-12 min: Conectar e curar",
              isEN ? "Minutes 13-15: Present options with confidence" : "13-15 min: Apresentar",
              isEN ? "Minutes 16+: Close with elegance and grace" : "16+ min: Fechar",
            ],
          },
        ],
        phrases: [],
        quiz: [
          {
            question: isEN
              ? "How many options should you present to a client in step 4?"
              : "Quantas opções apresentar no passo 4?",
            options: [
              {
                text: isEN ? "1 option—simplify completely" : "1 opção—simplificar",
                correct: false,
              },
              {
                text: isEN ? "Exactly 2 carefully curated options" : "Exatamente 2 opções curadas",
                correct: true,
              },
              {
                text: isEN ? "3-4 options for variety" : "3-4 opções para variedade",
                correct: false,
              },
              {
                text: isEN ? "5+ options to maximize choice" : "5+ opções para maximizar",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "In the consultative framework, which step is most important?"
              : "No framework consultativo, qual passo é mais importante?",
            options: [
              {
                text: isEN ? "Step 5—the close" : "Passo 5—o fecho",
                correct: false,
              },
              {
                text: isEN
                  ? "Step 2—listening and understanding; all others depend on it"
                  : "Passo 2—ouvir e compreender; todos dependem disto",
                correct: true,
              },
              {
                text: isEN ? "Step 4—presenting options" : "Passo 4—apresentar",
                correct: false,
              },
              {
                text: isEN ? "Step 1—the first impression" : "Passo 1—primeira impressão",
                correct: false,
              },
            ],
          },
          {
            question: isEN
              ? "What is the ultimate goal of the consultative selling framework?"
              : "Qual é o objetivo último do framework de venda consultativa?",
            options: [
              {
                text: isEN ? "Close as many sales as possible" : "Fechar tantas vendas quanto possível",
                correct: false,
              },
              {
                text: isEN ? "Maximize transaction value" : "Maximizar valor transacional",
                correct: false,
              },
              {
                text: isEN
                  ? "Make the client feel discovered, understood, and confident in their choice"
                  : "Fazer cliente sentir descoberto, compreendido, confiante",
                correct: true,
              },
              {
                text: isEN ? "Build the company's reputation" : "Construir reputação da empresa",
                correct: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: "consultative-complete",
      title: isEN ? "Complete Consultative Journey" : "Jornada Consultativa Completa",
      description: isEN
        ? "From greeting to farewell: a full consultative experience where every moment strengthens trust and guides the client naturally toward the perfect choice. The entire interaction demonstrates elegance, intention, and care."
        : "Do saudação ao adeus: experiência consultativa completa onde cada momento fortalece confiança e guia o cliente.",
      slides: [
        {
          id: "journey-1",
          title: isEN ? "The Consultative Journey" : "A Jornada Consultativa",
          content: isEN
            ? "Greeting (elegance & warmth) → Exploration (respectful space) → Discovery (open questions) → Understanding (emotional connection) → Curation (two perfect options) → Guidance (preference-based close) → Closure (memory created, not just a transaction)"
            : "Saudação → Exploração → Descoberta → Compreensão → Curadoria → Guiança → Encerramento.",
        },
      ],
      components: {
        tips: [],
        phrases: [],
        quiz: [],
      },
    },
  ];

  const scenario: Scenario = {
    id: "consultative-complete",
    title: isEN
      ? "Complete Consultative Sale: American Impulse Buyer"
      : "Venda Consultativa Completa: Cliente Americano",
    description: isEN
      ? "An American client in their 30s walks in and says 'Something unique from Portugal.' No clear intention, but interested in impulse purchase. Guide them through the complete consultative experience from greeting to decision."
      : "Cliente americano, 30s, diz 'Algo único de Portugal.' Sem intenção clara, mas interessado em compra impulsiva. Guie pela experiência consultativa completa.",
    customerProfile: isEN
      ? "American, 30s, enjoys unique cultural souvenirs. Energetic, somewhat spontaneous. Appreciates knowledgeable guidance but doesn't want to feel pressured. Wants something 'authentic' and 'special.'"
      : "Americano, 30s, aprecia souvenires únicos. Energético, espontâneo. Aprecia guiança mas não quer pressão. Quer algo 'autêntico' e 'especial'.",
    steps: [
      {
        id: "consultative-greeting",
        phase: "consultative-selling",
        scenario: isEN
          ? "Client enters with high energy, looks around with fascination. Says: 'Wow, this is cool. I want something unique from Portugal. Something that's truly special.'"
          : "Cliente entra com energia, olha ao redor. Diz: 'Uau, isto é legal. Quero algo único de Portugal. Algo verdadeiramente especial.'",
        options: [
          {
            text: isEN
              ? "Welcome with: 'Welcome to The 100's. I can see you're already drawn to something here. Explore freely — each piece tells a story. I'm here if you'd like to know more about any of them.'"
              : "Saudar: 'Bem-vindo à The 100's. Explore à vontade — cada peça conta uma história. Estou aqui se quiser saber mais.'",
            score: 3,
            feedback: isEN
              ? "Perfect. You matched their energy, invited exploration, and positioned yourself as available without being intrusive. You're setting up for consultative selling."
              : "Perfeito. Combinou energia, convidou exploração, posicionou-se disponível. Preparando para consultativa.",
          },
          {
            text: isEN
              ? "Immediately ask: 'What kind of unique gift are you looking for? Budget?'"
              : "Perguntar imediatamente: 'Que tipo de oferta procura? Orçamento?'",
            score: 0,
            feedback: isEN
              ? "Too transactional. You asked closed questions and focused on budget right away. This kills the consultative mood you need to build trust."
              : "Demasiado transacional. Perguntas fechadas e foco no orçamento. Isto mata o mood consultativo.",
          },
          {
            text: isEN
              ? "Show them 5 different products and say: 'These are our most popular items. Which interests you?'"
              : "Mostrar 5 produtos: 'Estes são os mais populares. Qual o interessa?'",
            score: 0,
            feedback: isEN
              ? "Too many options at once. You've overwhelmed their choice rather than curated it. You're not listening to their specific intention yet."
              : "Muitas opções de uma vez. Sobrecarga em vez de curadoria. Não está ouvindo intenção específica.",
          },
        ],
      },
      {
        id: "consultative-discovery",
        phase: "open-questions",
        scenario: isEN
          ? "After exploring, they pause at the Port Wine Gift collection. They look engaged but not sure what to choose. Time to discover their deeper intention."
          : "Após exploração, pausam perto da coleção de Port Wine Gift. Parecem engajados mas incertos. Hora de descobrir intenção profunda.",
        options: [
          {
            text: isEN
              ? "Approach gently and ask: 'Tell me—what draws you to this collection? Are you looking to take a piece of Portugal home with you, or is this a gift for someone special?'"
              : "Aproximar e perguntar: 'O que o atrai nesta coleção? Levar Portugal consigo ou oferta para alguém?'",
            score: 3,
            feedback: isEN
              ? "Excellent. You asked open questions that reveal whether this is personal or a gift, and what emotional driver matters to them. You're listening, not assuming."
              : "Excelente. Perguntas abertas que revelam contexto e driver emocional. Está ouvindo, não assumindo.",
          },
          {
            text: isEN
              ? "Ask: 'Do you like this one?' and wait for yes/no answer."
              : "Perguntar: 'Gosta deste?' e esperar sim/não.",
            score: 0,
            feedback: isEN
              ? "Too narrow. You're asking for a yes/no opinion without understanding what they truly need. You're skipping the discovery phase."
              : "Demasiado estreito. Pergunta sim/não sem compreender necessidade. Está pulando descoberta.",
          },
          {
            text: isEN
              ? "Explain the history of Port Wine and why our bottles are special."
              : "Explicar história do Port Wine e por que as nossas garrafas são especiais.",
            score: 1,
            feedback: isEN
              ? "Educational but premature. You're talking at them instead of discovering their need first. Save the storytelling for after you understand what matters to them."
              : "Educacional mas prematuro. Está falando, não descobrindo. Guarde storytelling para depois.",
          },
        ],
      },
      {
        id: "consultative-emotion",
        phase: "emotional-connection",
        scenario: isEN
          ? "They answer: 'Actually, I've fallen in love with Porto. This is my first trip to Portugal, and I want something that captures that feeling—like I'm taking the essence of this city home.'"
          : "Respondem: 'Na verdade, apaixonei-me por Porto. É minha primeira viagem a Portugal, e quero algo que capture esse sentimento.'",
        options: [
          {
            text: isEN
              ? "Validate and reflect: 'I love that. You want to capture this feeling you've discovered here. That's exactly what The 100's gifts are designed to do—preserve a moment in Portugal forever. Let me show you two options that do that beautifully.'"
              : "Validar e refletir: 'Adoro. Quer capturar esse sentimento. Exatamente o que The 100's faz—preservar um momento de Portugal para sempre.'",
            score: 3,
            feedback: isEN
              ? "Perfect. You validated their emotion, reflected it back, and connected their feeling to what The 100's offers. You're creating the emotional bridge. Now you'll present curated options."
              : "Perfeito. Validou emoção, refletiu, conectou ao que The 100's oferece. Criando ponte emocional.",
          },
          {
            text: isEN
              ? "Say: 'That's nice. So which of these 5 options appeals to you most?'"
              : "Dizer: 'Isto é bonito. Qual destes 5 apela mais a você?'",
            score: 0,
            feedback: isEN
              ? "You didn't validate or deepen the emotional understanding. You jumped straight to presenting 5 options—that's not curation, that's overwhelming them."
              : "Não validou nem aprofundou. Saltou para 5 opções—não é curadoria, é sobrecarga.",
          },
          {
            text: isEN
              ? "Ask: 'How much are you willing to spend on capturing that feeling?'"
              : "Perguntar: 'Quanto está disposto a gastar em capturar esse sentimento?'",
            score: 0,
            feedback: isEN
              ? "Wrong direction. You're reducing an emotional moment to a budget question. You're being transactional when you should be deepening the emotional connection."
              : "Dirección errada. Reduzindo momento emocional a pergunta de orçamento. Transacional quando deveria aprofundar.",
          },
        ],
      },
      {
        id: "consultative-curation",
        phase: "consultative-framework",
        scenario: isEN
          ? "They're now emotionally connected to the idea. Time to present exactly two curated options that each address their desire to 'capture Porto' in different ways."
          : "Agora emocionalmente conectados. Hora de apresentar exatamente dois opções curadas que abordem seu desejo de 'capturar Porto'.",
        options: [
          {
            text: isEN
              ? "Present: 'Here are two ways to capture Porto: This Premium Cylinder with 10-year Port Wine—elegant, compact, designed to last decades. And this Cube collection—bolder, more sculptural, has more presence in your home. Both preserve that Porto moment. Which feels more like how you want to remember it?'"
              : "Apresentar: 'Aqui estão duas formas de capturar Porto: Este Cilindro Premium com Port Wine de 10 anos—elegante, compacto. E este Cube—mais ousado, mais escultural. Qual se sente mais como quer recordar?'",
            score: 3,
            feedback: isEN
              ? "Excellent. You presented exactly 2 options, each connected to their emotional intention (capturing Porto), with clear differentiation. You're setting them up for a natural close."
              : "Excelente. Exatamente 2 opções, cada uma conectada à intenção emocional. Diferenciação clara. Preparando para fecho natural.",
          },
          {
            text: isEN
              ? "Show all 8 products and say: 'Pick whichever one speaks to you.'"
              : "Mostrar todos os 8 produtos: 'Escolha qual o fala.'",
            score: 0,
            feedback: isEN
              ? "You've abandoned curation completely. Too many choices for an emotionally engaged but undecided client. This causes paralysis, not clarity."
              : "Abandonou curadoria. Muitas escolhas causar paralisia, não clareza.",
          },
          {
            text: isEN
              ? "Present 1 option: 'This is THE gift for someone who loves Porto. Buy it.'"
              : "Apresentar 1 opção: 'Este é O gift para quem ama Porto. Compre.'",
            score: 0,
            feedback: isEN
              ? "Too pushy and no choice. You're forcing a decision instead of guiding them. Even with good emotional setup, removing choice feels manipulative."
              : "Demasiado invasivo e sem escolha. Forçando decisão. Sem escolha parece manipulador.",
          },
        ],
      },
      {
        id: "consultative-close",
        phase: "premium-closing",
        scenario: isEN
          ? "They look between the two options, clearly drawn to both but needing guidance. They're ready for a gentle, preference-based close."
          : "Olham para ambas opções, atraídos mas precisando de guiança. Prontos para fecho suave.",
        options: [
          {
            text: isEN
              ? "Close with: 'Between these two, which one feels more like the Porto moment you want to carry with you? Which would you reach for more often at home?'"
              : "Fechar: 'Entre estes dois, qual se sente mais como o momento Porto que quer levar? Qual pegaria mais vezes em casa?'",
            score: 3,
            feedback: isEN
              ? "Perfect. Preference-based question that doesn't allow for 'no.' You've guided them to see both options through the lens of their emotional intention. The close is natural and elegant."
              : "Perfeito. Pergunta baseada em preferência. Guiou-os a ver ambas através da lente da intenção emocional. Fecho natural e elegante.",
          },
          {
            text: isEN
              ? "Ask: 'So which one are you going to buy?'"
              : "Perguntar: 'Então qual vai comprar?'",
            score: 1,
            feedback: isEN
              ? "Less refined. You're asking them to decide, but not helping them see how the choice connects to their intention. Missing the emotional bridge in the final moment."
              : "Menos refinado. Pedindo decisão mas não conectando à intenção. Perdendo ponte emocional no momento final.",
          },
          {
            text: isEN
              ? "Say: 'I think you should get both. They work great together.' (pushing for higher value)"
              : "Dizer: 'Acho que deveria levar ambos. Funcionam bem juntos.' (empurrando valor)",
            score: 0,
            feedback: isEN
              ? "Manipulative. You're abandoning the consultative approach to chase a bigger sale. This breaks the trust you've built."
              : "Manipulador. Abandonando consultativo para perseguir venda maior. Quebra confiança construída.",
          },
        ],
      },
      {
        id: "consultative-farewell",
        phase: "consultative-complete",
        scenario: isEN
          ? "They've chosen the Premium Cylinder. Payment is complete. Now send them off with a memory, not just a transaction. This final moment is as important as the opening."
          : "Escolheram o Cilindro Premium. Pagamento completo. Agora envie com memória, não apenas transação. Momento final é tão importante quanto a abertura.",
        options: [
          {
            text: isEN
              ? "Say: 'This Gift carries Porto with it now. Every time you see it or open it, you'll be back here in this moment. Welcome to The 100's family. You'll always have this piece of Portugal with you.'"
              : "Dizer: 'Este Gift carrega Porto consigo agora. Sempre que o ver ou abrir, estará de volta aqui. Bem-vindo à família The 100's.'",
            score: 3,
            feedback: isEN
              ? "Beautiful. You've closed the consultative loop by reminding them of the emotional intention they came in with. They're leaving with more than a product—they have a memory. Perfect end to a consultative journey."
              : "Bonito. Fechou o loop consultativo. Não saem apenas com produto—têm memória. Fim perfeito de jornada consultativa.",
          },
          {
            text: isEN
              ? "Say: 'Thank you for your purchase. Here's your receipt. Have a great day.'"
              : "Dizer: 'Obrigado pela compra. Aqui está recibo. Tenha um ótimo dia.'",
            score: 0,
            feedback: isEN
              ? "Transactional and forgettable. You've just turned a beautiful consultative experience into a generic transaction. The memory you built is wasted."
              : "Transacional e esquecível. Transformou experiência bonita em transação genérica. Memória construída é desperdiçada.",
          },
          {
            text: isEN
              ? "Ask: 'Want to add anything else?' (cross-sell pressure)"
              : "Perguntar: 'Quer adicionar algo?' (pressão de cross-sell)",
            score: 0,
            feedback: isEN
              ? "Wrong moment. You've just completed a perfect consultative experience. Adding pressure now diminishes the memory. Let them leave in peace with what they've chosen."
              : "Momento errado. Completou experiência perfeita. Pressão agora diminui memória. Deixe sair em paz.",
          },
        ],
      },
    ],
  };

  return (
    <ModuleLayout
      moduleId="closing-consultative"
      title={isEN
        ? "Premium Closing & Consultative Selling: The Complete Experience"
        : "Fecho Premium & Venda Consultiva: A Experiência Completa"}
      description={isEN
        ? "Master the art of guiding clients to natural decisions through premium closing techniques and consultative selling. From first greeting to final farewell, every moment demonstrates elegance, intention, and care. The client doesn't just buy—they discover."
        : "Domine a arte de guiar clientes a decisões naturais. Do primeiro saudação ao adeus final, cada momento demonstra elegância, intenção e cuidado."}
    >
      <ContentBlock>
        <PhaseSystem phases={phases} />
      </ContentBlock>

      <ContentBlock>
        <h2>{isEN ? "Complete Consultative Journey Simulation" : "Simulação de Jornada Consultativa Completa"}</h2>
        <p>
          {isEN
            ? "From greeting to farewell: guide an interested but undecided American client through the complete consultative selling experience. Every interaction matters. Every moment builds trust."
            : "Do saudação ao adeus: guie cliente através da experiência consultativa completa. Cada interação importa. Cada momento constrói confiança."}
        </p>
        <ScenarioSimulator scenario={scenario} />
      </ContentBlock>
    </ModuleLayout>
  );
}
