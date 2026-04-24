import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  ScenarioSimulator,
  TipBlock,
  PhaseQuiz,
  type Phase,
  type Slide,
  type QuizQuestion,
  type Scenario,
  type ScenarioStep,
} from "@/components/InteractiveModule";

export default function ModuleTransportLogistics() {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases: Phase[] = [
    {
      id: "phase-1-tsa-iata",
      title: isEN ? "TSA/IATA Rules" : "Regras TSA/IATA",
      description: isEN
        ? "Understanding cabin vs hold baggage regulations"
        : "Compreender regulações de bagagem de cabine vs porão",
      slides: [
        {
          id: "slide-1-intro",
          title: isEN ? "Why This Module is Critical" : "Porquê Este Módulo é Crítico?",
          content: isEN
            ? "Most The 100's customers—especially tourists—have real doubts about transporting bottles safely. When your team masters these rules:\n\n• Increases customer confidence\n• Reduces decision hesitation\n• Prevents returns and frustrations\n• Facilitates sales closure\n• Elevates the premium experience\n• Shows professionalism and credibility"
            : "A maioria dos clientes da The 100's—especialmente turistas—tem dúvidas reais sobre transporte de garrafas. Quando a equipa domina estas regras:\n\n• Aumenta a confiança do cliente\n• Reduz indecisão\n• Evita devoluções e frustrações\n• Facilita o fecho da venda\n• Eleva a experiência premium\n• Mostra profissionalismo e credibilidade",
          notes: isEN
            ? "Knowing transport rules is not an extra. It's part of the premium experience."
            : "Saber as regras de transporte não é um extra. É parte da experiência premium.",
        },
        {
          id: "slide-2-cabin-rules",
          title: isEN ? "Cabin Baggage Rules" : "Regras de Bagagem de Cabine",
          content: isEN
            ? "LIQUIDS IN CABIN:\n\n• 100ml maximum per container\n• Must be in transparent, resealable plastic bag (1L total)\n• Common items affected: wine, spirits, perfume, oils\n• No exceptions for sealed bottles\n• TSA/IATA applies to all international flights\n\nTHE RULE:\n'If it's a liquid at cabin temperature, it counts. If the seal is broken or tamper-evident bag is not intact, it cannot pass.'"
            : "LÍQUIDOS EM CABINE:\n\n• Máximo 100ml por recipiente\n• Deve estar em saco plástico transparente e resealável (1L total)\n• Itens comuns afetados: vinho, bebidas espirituosas, perfume, óleos\n• Sem exceções para garrafas seladas\n• TSA/IATA aplica-se a todos os voos internacionais\n\nA REGRA:\n'Se é um líquido à temperatura da cabine, conta. Se o selo está quebrado ou saco à prova de manipulação não está intacto, não pode passar.'",
          notes: isEN
            ? "The 100ml rule is absolute. There are no premium exceptions."
            : "A regra de 100ml é absoluta. Não há exceções premium.",
        },
        {
          id: "slide-3-hold-baggage",
          title: isEN ? "Hold Baggage Rules" : "Regras de Bagagem de Porão",
          content: isEN
            ? "LIQUIDS IN HOLD (CHECKED BAGGAGE):\n\n• No 100ml limit\n• Bottles can be ANY size\n• No transparent bag needed\n• Must be well-packed and protected\n• Still subject to dangerous goods restrictions (spirits content limits)\n\nBEST PRACTICE FOR TRANSPORT:\n• Wrap bottles in protective material\n• Place in center of luggage\n• Surround with soft items\n• Use 'This Side Up' marker if applicable\n• Inform airline of valuable contents"
            : "LÍQUIDOS EM PORÃO (BAGAGEM DESPACHADA):\n\n• Sem limite de 100ml\n• Garrafas podem ser de QUALQUER tamanho\n• Sem necessidade de saco transparente\n• Deve estar bem embalado e protegido\n• Ainda sujeito a restrições de bens perigosos (limites de teor de álcool)\n\nMELHOR PRÁTICA PARA TRANSPORTE:\n• Embrulhe garrafas em material protetor\n• Coloque no centro da mala\n• Envolva com itens macios\n• Use marcador 'Este Lado Para Cima' se aplicável\n• Informe à companhia aérea sobre conteúdo valioso",
          notes: isEN
            ? "Hold baggage is the safe choice for wine and spirits—no volume limits."
            : "Bagagem de porão é a escolha segura para vinho e bebidas—sem limites de volume.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-cabin-limit",
            question: isEN
              ? "What is the maximum volume of liquid allowed in a single cabin baggage container?"
              : "Qual é o volume máximo de líquido permitido num único recipiente de bagagem de cabine?",
            options: isEN
              ? ["50ml", "100ml", "250ml", "500ml"]
              : ["50ml", "100ml", "250ml", "500ml"],
            correctAnswer: 1,
            explanation: isEN
              ? "TSA/IATA strictly limits cabin liquids to 100ml per container, with a 1L bag total."
              : "TSA/IATA limita estritamente líquidos de cabine a 100ml por recipiente, com total de 1L por saco.",
          },
          {
            id: "q2-hold-bottles",
            question: isEN
              ? "Can a 750ml wine bottle be transported in checked hold baggage?"
              : "Uma garrafa de vinho de 750ml pode ser transportada em bagagem de porão despachada?",
            options: isEN
              ? ["Yes, with no restrictions", "Yes, but must be in transparent bag", "No, never", "Only if sealed"]
              : ["Sim, sem restrições", "Sim, mas em saco transparente", "Não, nunca", "Apenas se selada"],
            correctAnswer: 0,
            explanation: isEN
              ? "Hold baggage has no volume limit for liquids. A 750ml bottle travels safely in checked luggage when properly protected."
              : "Bagagem de porão não tem limite de volume para líquidos. Uma garrafa de 750ml viaja segura em bagagem despachada quando bem protegida.",
          },
          {
            id: "q3-transparent-bag",
            question: isEN
              ? "Is a transparent, resealable plastic bag required for liquids in hold baggage?"
              : "Um saco plástico transparente e resealável é necessário para líquidos em bagagem de porão?",
            options: isEN
              ? ["Yes, always", "No, only for cabin", "Sometimes", "Never needed"]
              : ["Sim, sempre", "Não, apenas para cabine", "Às vezes", "Nunca necessário"],
            correctAnswer: 1,
            explanation: isEN
              ? "The transparent bag rule applies only to cabin baggage. Hold baggage just needs proper protective wrapping."
              : "A regra do saco transparente aplica-se apenas a bagagem de cabine. Bagagem de porão apenas precisa de embrulho protetor adequado.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
    {
      id: "phase-2-duty-free",
      title: isEN ? "Duty Free Exception" : "Exceção Duty Free",
      description: isEN
        ? "The special rule for duty-free purchases"
        : "A regra especial para compras duty-free",
      slides: [
        {
          id: "slide-1-duty-free-intro",
          title: isEN ? "The Duty Free Game Changer" : "A Mudança de Jogo Duty Free",
          content: isEN
            ? "There IS a legal exception to the 100ml cabin rule—but it has strict conditions.\n\nDUTY FREE EXCEPTION:\nBottles purchased in duty-free shops at departure airports CAN exceed 100ml in cabin IF:\n• Purchased IN THE DEPARTURE AIRPORT duty-free shop\n• Bottle is sealed in a tamper-evident bag\n• Receipt is visible and intact\n• STEB (Sealed Tamper-Evident Bag) label is applied\n• Purchase made within 24 hours before boarding\n\nWhy this matters for sales: Many customers will ask this. Being able to explain it accurately positions The 100's as the expert guide."
            : "Existe SIM uma exceção legal à regra de 100ml em cabine—mas tem condições rigorosas.\n\nEXCEÇÃO DUTY FREE:\nGarrafas compradas em lojas duty-free em aeroportos de partida PODEM exceder 100ml em cabine SE:\n• Compradas NA LOJA duty-free do aeroporto de partida\n• Garrafa está selada em saco à prova de manipulação\n• Recibo está visível e intacto\n• Rótulo STEB (Sealed Tamper-Evident Bag) está aplicado\n• Compra realizada dentro de 24 horas antes do embarque\n\nPorquê isto importa para vendas: Muitos clientes perguntarão isto. Conseguir explicar com precisão posiciona a The 100's como guia especializada.",
          notes: isEN
            ? "Duty Free is a powerful selling tool when explained correctly."
            : "Duty Free é uma ferramenta de vendas poderosa quando explicada corretamente.",
        },
        {
          id: "slide-2-steb-requirements",
          title: isEN ? "STEB Requirements" : "Requisitos STEB",
          content: isEN
            ? "WHAT IS STEB?\nSealed Tamper-Evident Bag—the official plastic bag system for duty-free liquids.\n\nSTEB CHECKLIST:\n✓ Plastic bag provided by the duty-free shop\n✓ Receipt clearly visible through/attached to bag\n✓ Seal intact (cannot be opened or resealed)\n✓ Official STEB logo/label on bag\n✓ No tampering signs\n\nWHEN SELLING BOTTLES AT THE 100'S:\n'If you buy this in our shop today, it travels in your checked luggage. But if you find an identical bottle in duty-free at the airport, you can legally bring it in your cabin—just ask for the STEB bag and keep your receipt.'\n\nThis builds trust and positions The 100's as the knowledgeable partner."
            : "O QUE É STEB?\nSaco à Prova de Manipulação Selado—o sistema oficial de saco plástico para líquidos duty-free.\n\nCHECKLIST STEB:\n✓ Saco plástico fornecido pela loja duty-free\n✓ Recibo claramente visível através/anexado ao saco\n✓ Selo intacto (não pode ser aberto ou resselado)\n✓ Logo/rótulo STEB oficial no saco\n✓ Sem sinais de manipulação\n\nAO VENDER GARRAFAS NA THE 100'S:\n'Se compra isto na nossa loja hoje, viaja em sua bagagem despachada. Mas se encontrar uma garrafa idêntica em duty-free no aeroporto, pode legalmente levá-la em cabine—apenas peça o saco STEB e guarde o recibo.'\n\nIsso constrói confiança e posiciona a The 100's como parceira conhecedora.",
          notes: isEN
            ? "STEB knowledge is a competitive advantage in selling premium bottles."
            : "Conhecimento STEB é uma vantagem competitiva em vender garrafas premium.",
        },
        {
          id: "slide-3-customer-conversation",
          title: isEN ? "How to Explain to Customers" : "Como Explicar aos Clientes",
          content: isEN
            ? "CUSTOMER: 'Can I take a bottle home in my carry-on?'\n\nYOUR RESPONSE (Framework):\n\n1. ACKNOWLEDGE: 'Great question—most tourists ask this.'\n\n2. EXPLAIN THE RULE: 'TSA/IATA limits cabin liquids to 100ml. That's why our bottles usually travel in checked luggage.'\n\n3. INTRODUCE THE EXCEPTION: 'There IS a workaround: if you buy duty-free at the airport, a STEB-sealed bottle can go in your cabin.'\n\n4. SET EXPECTATIONS: 'The best experience is to have it shipped to your home or take it checked. That way, you avoid airport hassle and ensure it arrives perfectly.'\n\n5. OFFER SOLUTIONS: 'We can help with that—shipping options, gift wrapping for checked luggage, or I can note your address for future duty-free coordination.'\n\nThis turns logistics into a premium service conversation."
            : "CLIENTE: 'Posso levar uma garrafa no meu carry-on?'\n\nSUA RESPOSTA (Framework):\n\n1. RECONHEÇA: 'Ótima pergunta—a maioria dos turistas pergunta isto.'\n\n2. EXPLIQUE A REGRA: 'TSA/IATA limita líquidos de cabine a 100ml. É por isso que nossas garrafas geralmente viajam em bagagem despachada.'\n\n3. INTRODUZA A EXCEÇÃO: 'Existe uma solução alternativa: se compra duty-free no aeroporto, uma garrafa STEB-selada pode ir em sua cabine.'\n\n4. ESTABELEÇA EXPECTATIVAS: 'A melhor experiência é tê-la enviada para casa ou levá-la despachada. Assim evita aborrecimento no aeroporto e garante que chega perfeitamente.'\n\n5. OFEREÇA SOLUÇÕES: 'Podemos ajudar—opções de envio, embrulho de presente para bagagem despachada, ou posso anotar seu endereço para futura coordenação duty-free.'\n\nIsso transforma logística numa conversa de serviço premium.",
          notes: isEN
            ? "Master this framework and you become the customer's transport expert."
            : "Domine este framework e torna-se o especialista em transporte do cliente.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-steb-location",
            question: isEN
              ? "Where must a bottle be purchased to qualify for the duty-free STEB exception?"
              : "Onde uma garrafa deve ser comprada para se qualificar para a exceção STEB duty-free?",
            options: isEN
              ? ["Any duty-free shop", "Departure airport duty-free only", "Arrival airport duty-free", "Any airport shop"]
              : ["Qualquer loja duty-free", "Apenas duty-free de aeroporto de partida", "Duty-free de aeroporto de chegada", "Qualquer loja de aeroporto"],
            correctAnswer: 1,
            explanation: isEN
              ? "The STEB exception applies only to bottles purchased at the DEPARTURE airport duty-free shop, within 24 hours of boarding."
              : "A exceção STEB aplica-se apenas a garrafas compradas na loja duty-free do aeroporto de PARTIDA, dentro de 24 horas do embarque.",
          },
          {
            id: "q2-steb-requirement",
            question: isEN
              ? "What is the primary requirement for a duty-free bottle to be legal in cabin?"
              : "Qual é o requisito principal para uma garrafa duty-free ser legal em cabine?",
            options: isEN
              ? ["Bottle must be unopened", "Receipt must be visible", "STEB seal must be intact", "All of the above"]
              : ["Garrafa deve estar fechada", "Recibo deve estar visível", "Selo STEB deve estar intacto", "Tudo o anterior"],
            correctAnswer: 3,
            explanation: isEN
              ? "All conditions must be met: sealed STEB bag, visible receipt, and no tampering. It's a complete system."
              : "Todas as condições devem ser cumpridas: saco STEB selado, recibo visível, e sem manipulação. É um sistema completo.",
          },
          {
            id: "q3-duty-free-pitch",
            question: isEN
              ? "When a customer asks about carrying wine home in their carry-on, what is your primary recommendation?"
              : "Quando um cliente pergunta sobre levar vinho em seu carry-on, qual é sua recomendação principal?",
            options: isEN
              ? ["Tell them to buy duty-free only", "Recommend checked luggage or shipping", "Say it's impossible", "Suggest they break the seal"]
              : ["Diga-lhes para comprarem apenas duty-free", "Recomende bagagem despachada ou envio", "Diga que é impossível", "Sugira que quebrem o selo"],
            correctAnswer: 1,
            explanation: isEN
              ? "While STEB is an option, the premium and reliable solution is checked luggage or shipping—no airport hassle, no risk."
              : "Enquanto STEB é uma opção, a solução premium e confiável é bagagem despachada ou envio—sem aborrecimento no aeroporto, sem risco.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
    {
      id: "phase-3-team-expert",
      title: isEN ? "Team as Transport Expert" : "Equipa como Especialista em Transporte",
      description: isEN
        ? "Making your team a trusted logistics advisor"
        : "Tornar sua equipa uma conselheira de logística confiável",
      slides: [
        {
          id: "slide-1-expertise",
          title: isEN ? "The Expert Positioning" : "O Posicionamento de Especialista",
          content: isEN
            ? "When customers buy premium bottles, transport is their #1 concern.\n\nTHE PROBLEM: Most gift shops just hand over the bottle. 'Thank you, come again.'\n\nTHE 100'S DIFFERENCE: Your team PROACTIVELY addresses transport.\n\nTHE SHIFT IN PERCEPTION:\n'Gift shop' → 'Transport expert'\n'Transactional' → 'Consultative'\n'Risky purchase' → 'Confident investment'\n\nWHAT EXPERTISE LOOKS LIKE:\n• Asking proactively: 'How are you traveling home? I want to make sure this arrives safely.'\n• Offering options: 'We can wrap this specifically for checked luggage, or I recommend our shipping service.'\n• Following up: 'Here's a card with transport tips you can reference at the airport.'\n• Problem-solving: 'If you're worried, we offer travel insurance for high-value bottles.'"
            : "Quando clientes compram garrafas premium, transporte é sua preocupação #1.\n\nO PROBLEMA: A maioria das lojas de presentes apenas entregam a garrafa. 'Obrigado, volte sempre.'\n\nA DIFERENÇA THE 100'S: Sua equipa aborda o transporte PROATIVAMENTE.\n\nA MUDANÇA DE PERCEÇÃO:\n'Loja de presentes' → 'Especialista em transporte'\n'Transacional' → 'Consultativa'\n'Compra arriscada' → 'Investimento confiante'\n\nCOMO SE VÊ A EXPERTISE:\n• Perguntar proativamente: 'Como viaja para casa? Quero garantir que isto chega com segurança.'\n• Oferecer opções: 'Podemos embrulhar isto especificamente para bagagem despachada, ou recomendo nosso serviço de envio.'\n• Acompanhamento: 'Aqui está um cartão com dicas de transporte que pode consultar no aeroporto.'\n• Resolução de problemas: 'Se está preocupado, oferecemos seguro de viagem para garrafas de alto valor.'",
          notes: isEN
            ? "Expertise builds trust, trust builds loyalty, loyalty builds lifetime value."
            : "Expertise constrói confiança, confiança constrói lealdade, lealdade constrói valor ao longo da vida.",
        },
        {
          id: "slide-2-proactive-process",
          title: isEN ? "Proactive Transport Process" : "Processo de Transporte Proativo",
          content: isEN
            ? "STEP 1: BEFORE THE PURCHASE\n'May I ask how you're traveling today? Domestic flight, international, or car?'\n→ Listen. This determines your entire approach.\n\nSTEP 2: DURING THE SALE\n'I want to make sure this arrives as beautifully as it left our shop.'\n→ Offer packaging options (checked-luggage wrap, shipping, gift protection)\n\nSTEP 3: AT THE CHECKOUT\nProvide written guidance:\n• Transport rules card (TSA/IATA basics)\n• Packing tips sheet\n• Our contact for claims/issues\n• Optional: QR code to video on safe packing\n\nSTEP 4: EMOTIONAL REASSURANCE\n'This bottle is in the right hands now. We've sold hundreds internationally, and our packing method has never failed. You're good.'\n→ Confidence is contagious.\n\nSTEP 5: FOLLOW-UP (Premium Tier)\nFor high-value purchases (€150+):\n• Email follow-up: 'Did your bottle arrive safely?'\n• Offer travel insurance for next purchase\n• Build repeat business"
            : "PASSO 1: ANTES DA COMPRA\n'Posso perguntar como viaja hoje? Voo doméstico, internacional, ou carro?'\n→ Ouça. Isto determina sua abordagem inteira.\n\nPASSO 2: DURANTE A VENDA\n'Quero garantir que isto chega tão bonito quanto saiu da nossa loja.'\n→ Ofereça opções de embalagem (embrulho para bagagem despachada, envio, proteção de presente)\n\nPASSO 3: NO CHECKOUT\nFornecha orientação escrita:\n• Cartão de regras de transporte (TSA/IATA básico)\n• Folha de dicas de embalagem\n• Nosso contacto para reclamações/problemas\n• Opcional: Código QR para vídeo sobre embalagem segura\n\nPASSO 4: REASSURANCE EMOCIONAL\n'Esta garrafa está em boas mãos. Vendemos centenas internacionalmente, e nosso método de embalagem nunca falhou. Está seguro.'\n→ Confiança é contagiosa.\n\nPASSO 5: ACOMPANHAMENTO (Tier Premium)\nPara compras de alto valor (€150+):\n• Acompanhamento por email: 'Sua garrafa chegou com segurança?'\n• Ofereça seguro de viagem para próxima compra\n• Construa negócio repetido",
          notes: isEN
            ? "This process transforms a transactional sale into a relationship."
            : "Este processo transforma uma venda transacional numa relação.",
        },
        {
          id: "slide-3-reassurance-language",
          title: isEN ? "Language of Reassurance" : "Linguagem de Reassurance",
          content: isEN
            ? "WHAT TO SAY (DO):\n\n✓ 'We ship internationally every week—I'll make sure your bottle is protected.'\n✓ 'This is how we pack every bottle that leaves our store.'\n✓ 'Most customers travel with wine from us without any issues.'\n✓ 'If anything happens, we stand behind our packaging and can help coordinate replacement.'\n✓ 'You've made an excellent choice—this bottle travels well.'\n✓ 'Let me show you exactly how we protect premium bottles for travel.'\n\nWHAT NOT TO SAY (DON'T):\n\n✗ 'Well, officially it can't go in carry-on, so... [shrug]'\n✗ 'I don't know much about transport rules.'\n✗ 'It's your risk once it leaves here.'\n✗ 'Lots of people break these rules anyway.'\n✗ 'You could probably fit it if you really wanted to.'\n\nTHE DIFFERENCE:\nDO = Trust, expertise, partnership\nDON'T = Liability, uncertainty, transactional"
            : "O QUE DIZER (FAÇA):\n\n✓ 'Enviamos internacionalmente todas as semanas—vou garantir que sua garrafa está protegida.'\n✓ 'É assim que embalamos cada garrafa que sai da nossa loja.'\n✓ 'A maioria dos clientes viaja com vinho de nós sem qualquer problema.'\n✓ 'Se algo acontecer, apoiamos nossa embalagem e podemos ajudar a coordenar reposição.'\n✓ 'Fez uma excelente escolha—esta garrafa viaja bem.'\n✓ 'Deixe-me mostrar-lhe exatamente como protegemos garrafas premium para viagem.'\n\nO QUE NÃO DIZER (NÃO FAÇA):\n\n✗ 'Bem, oficialmente não pode ir em carry-on, então... [encolher de ombros]'\n✗ 'Não sei muito sobre regras de transporte.'\n✗ 'É seu risco uma vez que sai daqui.'\n✗ 'Muitas pessoas quebram estas regras de qualquer forma.'\n✗ 'Poderia provavelmente caber se realmente quisesse.'\n\nA DIFERENÇA:\nFAÇA = Confiança, expertise, parceria\nNÃO FAÇA = Responsabilidade, incerteza, transacional",
          notes: isEN
            ? "Your words either build confidence or erode it. Choose wisely."
            : "Suas palavras constroem ou prejudicam confiança. Escolha com sabedoria.",
        },
      ] as Slide[],
      scenarioSimulator: {
        id: "scenario-transport-expert",
        title: isEN ? "Help a Worried Customer" : "Ajude um Cliente Preocupado",
        description: isEN
          ? "A customer is nervous about taking wine home. Guide them through the solution."
          : "Um cliente está nervoso sobre levar vinho para casa. Guie-o através da solução.",
        steps: [
          {
            id: "step-1-concern",
            title: isEN ? "Identify the Concern" : "Identifique a Preocupação",
            context: isEN
              ? "Customer: 'I love these bottles, but I'm flying back to Germany tomorrow and I'm worried they'll break. Can they even travel safely?'"
              : "Cliente: 'Amo estas garrafas, mas estou voando para a Alemanha amanhã e estou preocupado que quebrem. Conseguem viajar com segurança?'",
            options: [
              {
                id: "opt-1-dismissive",
                label: isEN
                  ? "Dismiss: 'Don't worry, lots of people do it.'"
                  : "Descartar: 'Não se preocupe, muitas pessoas fazem isto.'",
                feedback: isEN
                  ? "Dismissive—doesn't address the real concern about safety and TSA rules. The customer wants reassurance, not platitudes."
                  : "Descartar—não aborda a preocupação real sobre segurança e regras TSA. O cliente quer reassurance, não lugares-comuns.",
                isCorrect: false,
              },
              {
                id: "opt-1-acknowledge",
                label: isEN
                  ? "Acknowledge: 'That's a great question. Let me walk you through exactly how we ensure safe transport.'"
                  : "Reconhecer: 'Essa é uma ótima pergunta. Deixe-me guiá-lo através de exatamente como garantimos transporte seguro.'",
                feedback: isEN
                  ? "Perfect. You acknowledge the concern as valid and position yourself as the expert guide."
                  : "Perfeito. Você reconhece a preocupação como válida e se posiciona como guia especializada.",
                isCorrect: true,
              },
              {
                id: "opt-1-complicated",
                label: isEN
                  ? "Overwhelm: 'Well, there's TSA, IATA, checked vs carry-on, duty-free exceptions...'"
                  : "Sobrecarregar: 'Bem, há TSA, IATA, bagagem despachada vs carry-on, exceções duty-free...'",
                feedback: isEN
                  ? "Too much information at once. The customer is nervous—simplify first, then offer depth."
                  : "Muita informação de uma vez. O cliente está nervoso—simplifique primeiro, depois ofereça profundidade.",
                isCorrect: false,
              },
            ],
          },
          {
            id: "step-2-explain",
            title: isEN ? "Explain the Solution" : "Explique a Solução",
            context: isEN
              ? "Customer is now listening. You have their attention. Explain the transport rules and your solution."
              : "Cliente está ouvindo. Tem sua atenção. Explique as regras de transporte e sua solução.",
            options: [
              {
                id: "opt-2-checked",
                label: isEN
                  ? "Recommend: 'These travel beautifully in checked luggage. No volume limits, and we pack them specifically for that. Zero risk.'"
                  : "Recomendar: 'Estas viajam lindamente em bagagem despachada. Sem limites de volume, e as embalamos especificamente para isso. Zero risco.'",
                feedback: isEN
                  ? "Excellent. Clear, reassuring, addresses the concern directly. This is consultative selling."
                  : "Excelente. Claro, reassegurador, aborda a preocupação diretamente. Esta é venda consultativa.",
                isCorrect: true,
              },
              {
                id: "opt-2-rules",
                label: isEN
                  ? "Explain: 'TSA says 100ml in carry-on, unlimited in hold. But if you buy at duty-free...'"
                  : "Explicar: 'TSA diz 100ml em carry-on, ilimitado em hold. Mas se compra em duty-free...'",
                feedback: isEN
                  ? "Rules are important, but the customer is nervous—they want a solution first, rules second."
                  : "Regras são importantes, mas o cliente está nervoso—quer uma solução primeiro, regras segundo.",
                isCorrect: false,
              },
              {
                id: "opt-2-downplay",
                label: isEN
                  ? "Downplay: 'Honestly, I'm not really sure about all the rules, but people do it all the time.'"
                  : "Minimizar: 'Honestamente, não tenho certeza sobre todas as regras, mas as pessoas fazem isto o tempo todo.'",
                feedback: isEN
                  ? "Worst possible answer. You just lost credibility. The customer now trusts you even less."
                  : "Pior resposta possível. Você acabou de perder credibilidade. O cliente agora confia menos.",
                isCorrect: false,
              },
            ],
          },
          {
            id: "step-3-offer",
            title: isEN ? "Offer Premium Service" : "Ofereça Serviço Premium",
            context: isEN
              ? "Customer is reassured about the solution. Now offer premium packaging and services to make it even easier."
              : "Cliente está reassegurado sobre a solução. Agora ofereça embalagem e serviços premium para tornar ainda mais fácil.",
            options: [
              {
                id: "opt-3-extra",
                label: isEN
                  ? "Upsell: 'We also offer protective padding at €5, travel insurance at €8, and GPS tracking at €12.'"
                  : "Venda adicional: 'Também oferecemos preenchimento protetor a €5, seguro de viagem a €8, e rastreamento GPS a €12.'",
                feedback: isEN
                  ? "Too aggressive after the customer just expressed worry. Offer, don't push."
                  : "Muito agressivo depois que o cliente acabou de expressar preocupação. Ofereça, não pressione.",
                isCorrect: false,
              },
              {
                id: "opt-3-premium",
                label: isEN
                  ? "Offer: 'We have premium protective wrapping—it's included with purchases over €100. Would that give you peace of mind?'"
                  : "Ofereça: 'Temos embrulho protetor premium—está incluído em compras acima de €100. Isto lhe daria tranquilidade?'",
                feedback: isEN
                  ? "Perfect. You offer value-add without being pushy, and you tie it to their concern (peace of mind)."
                  : "Perfeito. Você oferece valor adicional sem ser agressivo, e vincula a sua preocupação (tranquilidade).",
                isCorrect: true,
              },
              {
                id: "opt-3-shipping",
                label: isEN
                  ? "Alternative: 'Or we can ship directly to your home in Germany for €45. Fully insured.'"
                  : "Alternativa: 'Ou podemos enviar diretamente para sua casa na Alemanha por €45. Totalmente segurado.'",
                feedback: isEN
                  ? "Good option, but should mention checking luggage first—it's safer and easier."
                  : "Boa opção, mas deve mencionar bagagem despachada primeiro—é mais segura e fácil.",
                isCorrect: false,
              },
            ],
          },
        ] as ScenarioStep[],
        scoring: {
          maxScore: 100,
          feedback: {
            excellent: isEN
              ? "Excellent! You guided the customer from worry to confidence, offered premium solutions, and positioned yourself as the expert. This is exactly how premium consultative selling works."
              : "Excelente! Você guiou o cliente de preocupação a confiança, ofereceu soluções premium, e se posicionou como especialista. É exatamente assim que funciona venda consultativa premium.",
            good: isEN
              ? "Good work! You addressed the concern and offered solutions. Next time, try to be even more consultative—offer premium services that remove all remaining doubt."
              : "Bom trabalho! Você abordou a preocupação e ofereceu soluções. Próxima vez, tente ser ainda mais consultativo—ofereça serviços premium que removem toda dúvida restante.",
            needsWork: isEN
              ? "You started well, but didn't fully capitalize on the opportunity to position yourself as the transport expert. Remember: acknowledge concern → explain solution → offer premium service."
              : "Começou bem, mas não capitalizou completamente na oportunidade de se posicionar como especialista em transporte. Lembre: reconheça preocupação → explique solução → ofereça serviço premium.",
          },
        },
      } as Scenario,
      quiz: {
        questions: [
          {
            id: "q1-proactive",
            question: isEN
              ? "What is the FIRST question you should ask a customer who just selected a premium bottle?"
              : "Qual é a PRIMEIRA pergunta que deve fazer a um cliente que acabou de selecionar uma garrafa premium?",
            options: isEN
              ? ["'That's our most expensive bottle'", "'How are you traveling home?'", "'Do you want gift wrapping?'", "'Is this for yourself?'"]
              : ["'Esta é nossa garrafa mais cara'", "'Como viaja para casa?'", "'Quer embrulho de presente?'", "'É para si?'"],
            correctAnswer: 1,
            explanation: isEN
              ? "Understanding their travel method determines your entire transport strategy. This is proactive consultative selling."
              : "Compreender seu método de viagem determina sua estratégia de transporte inteira. Esta é venda consultativa proativa.",
          },
          {
            id: "q2-language",
            question: isEN
              ? "Which statement best builds transport expertise and confidence?"
              : "Qual afirmação melhor constrói expertise em transporte e confiança?",
            options: isEN
              ? [
                  "'It's your risk once it leaves here'",
                  "'We ship internationally every week—I'll ensure your bottle is protected'",
                  "'Lots of people break TSA rules anyway'",
                  "'Honestly, I'm not sure about all the rules'",
                ]
              : [
                  "'É seu risco uma vez que sai daqui'",
                  "'Enviamos internacionalmente cada semana—vou garantir que sua garrafa está protegida'",
                  "'Muitas pessoas quebram regras TSA de qualquer forma'",
                  "'Honestamente, não tenho certeza sobre todas as regras'",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "This statement demonstrates expertise, reassurance, and partnership. It transforms the transaction into a relationship."
              : "Esta afirmação demonstra expertise, reassurance, e parceria. Transforma a transação numa relação.",
          },
          {
            id: "q3-follow-up",
            question: isEN
              ? "For high-value bottles (€150+), what should you do after the sale?"
              : "Para garrafas de alto valor (€150+), o que deve fazer após a venda?",
            options: isEN
              ? [
                  "Forget about it—they have what they wanted",
                  "Send a follow-up email asking if the bottle arrived safely",
                  "Assume it arrived fine and move on",
                  "Ask for a 5-star review immediately",
                ]
              : [
                  "Esqueça—eles têm o que queriam",
                  "Envie um email de acompanhamento perguntando se a garrafa chegou com segurança",
                  "Assuma que chegou bem e siga em frente",
                  "Peça uma avaliação de 5 estrelas imediatamente",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Follow-up builds loyalty and gives you the chance to ensure satisfaction. This is how premium businesses create repeat customers."
              : "Acompanhamento constrói lealdade e lhe dá a chance de garantir satisfação. É assim que negócios premium criam clientes repetidos.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
  ];

  return (
    <ModuleLayout
      moduleId="transport-logistics"
      title={isEN ? "Transport & Logistics" : "Transporte & Logística"}
      description={isEN
        ? "Master TSA/IATA rules, duty-free exceptions, and become your customer's transport expert"
        : "Domine regras TSA/IATA, exceções duty-free, e torne-se especialista em transporte do cliente"}
      heroImage="/src/assets/hero-drop.jpg"
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
