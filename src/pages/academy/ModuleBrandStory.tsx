import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  TipBlock,
  PhraseCard,
  type Phase,
  type Slide,
  type QuizQuestion,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";

// Import hero image
import heroDrop from "@/assets/hero-drop.jpg";

export default function ModuleBrandStory() {
  const { language } = useLanguage();
  const isEN = language === "en";

  // PHASE 1: Filosofia da Marca
  const phase1Slides: Slide[] = [
    {
      title: isEN ? "Brand Origin" : "Origem da Marca",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            {isEN
              ? "The 100's was born from a simple question: How do we preserve the essence of moments?"
              : "The 100's nasceu de uma pergunta simples: Como preservamos a essência dos momentos?"}
          </p>
          <p className="text-base text-foreground/70">
            {isEN
              ? "In the Douro Valley, we discovered that Portugal's greatest treasures aren't monuments or landscapes—they're experiences bottled in time."
              : "No Vale do Douro, descobrimos que os maiores tesouros de Portugal não são monumentos ou paisagens—são experiências engarrafadas no tempo."}
          </p>
        </div>
      ),
      image: heroDrop,
    },
    {
      title: isEN ? "Our Mission" : "Nossa Missão",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-semibold text-primary">
            {isEN ? '"The substance of time"' : '"A substância do tempo"'}
          </p>
          <p className="text-base leading-relaxed">
            {isEN
              ? "Every product we create celebrates the passage of time. From a 100-year-old Port Wine to artisan salt from the sea—each tells a story of patience, craft, and memory."
              : "Cada produto que criamos celebra a passagem do tempo. De um Vinho do Porto de 100 anos a sal artesanal do mar—cada um conta uma história de paciência, ofício e memória."}
          </p>
        </div>
      ),
    },
    {
      title: isEN ? '"Bottled Memories"' : '"Memórias Engarrafadas"',
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Our slogan encapsulates everything we are. We don't sell products—we sell moments. Premium gifts that transform ordinary occasions into unforgettable memories."
              : "Nosso slogan encapsula tudo o que somos. Não vendemos produtos—vendemos momentos. Presentes premium que transformam ocasiões ordinárias em memórias inesquecíveis."}
          </p>
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
            <p className="text-sm italic text-foreground/80">
              {isEN
                ? "Every purchase is an investment in memory. Every moment becomes timeless."
                : "Cada compra é um investimento em memória. Cada momento torna-se intemporal."}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const phase1Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What is the core concept of The 100's brand?"
        : "Qual é o conceito central da marca The 100's?",
      options: [
        isEN ? "Fast fashion retail" : "Retalho de moda rápida",
        isEN ? "Time as the substance of all products" : "O tempo como substância de todos os produtos",
        isEN ? "Wine production and distribution" : "Produção e distribuição de vinho",
        isEN ? "Tourism services in Douro Valley" : "Serviços de turismo no Vale do Douro",
      ],
      correctIndex: 1,
      explanation: isEN
        ? "Time is the fundamental substance—every product represents aged craftsmanship and memories."
        : "O tempo é a substância fundamental—cada produto representa artesanato envelhecido e memórias.",
    },
    {
      question: isEN ? "What does 'Bottled Memories' mean?" : "O que significa 'Memórias Engarrafadas'?",
      options: [
        isEN ? "Only wine bottles are sold" : "Apenas garrafas de vinho são vendidas",
        isEN
          ? "Premium gifts that turn moments into timeless memories"
          : "Presentes premium que transformam momentos em memórias atemporais",
        isEN ? "Literal glass bottles for storage" : "Garrafas de vidro literalmente para armazenamento",
        isEN ? "A marketing campaign slogan" : "Um slogan de campanha de marketing",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 2: Conceito do Tempo
  const phase2Slides: Slide[] = [
    {
      title: isEN ? "Time as Core Substance" : "O Tempo como Substância Central",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Unlike other brands, The 100's doesn't sell individual products—we sell the TIME embedded in each one."
              : "Diferentemente de outras marcas, The 100's não vende produtos individuais—vendemos o TEMPO incorporado em cada um."}
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isEN
                  ? "Port Wine: 10, 50, 100 years of aging"
                  : "Vinho do Porto: 10, 50, 100 anos de envelhecimento"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isEN ? "Olive Oil: Century-old olive groves" : "Azeite: Oliveiras centenárias"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isEN ? "Sea Salt: Millennia of crystallization" : "Sal do Mar: Milênios de cristalização"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isEN ? "Tea: Heritage cultivars, generations old" : "Chá: Cultivares de herança, com gerações"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isEN ? "Honey: Annual flowering cycles, slow extraction" : "Mel: Ciclos de floração anuais, extração lenta"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                {isEN
                  ? "Candles & Diffusers: Marking slow hours, rituals of time"
                  : "Velas & Difusores: Marcando horas lentas, rituais do tempo"}
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: isEN ? "Time in Packaging" : "O Tempo na Embalagem",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Every packaging material tells a story of time. Cork from ancient oaks. Ceramic that takes weeks to craft. Wood that's been seasoning for years."
              : "Cada material de embalagem conta uma história de tempo. Cortiça de carvalhos antigos. Cerâmica que leva semanas para fabricar. Madeira que está envelhecendo há anos."}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Cork" : "Cortiça"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN ? "Harvested every 9 years" : "Colhida a cada 9 anos"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Ceramic" : "Cerâmica"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN ? "Hand-thrown and fired" : "Moldada e queimada à mão"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Wood" : "Madeira"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN ? "Aged and grain-selected" : "Envelhecida e selecionada"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Brass" : "Bronze"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN ? "Patina develops over time" : "Pátina desenvolve com tempo"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: isEN ? "The Philosophy in Practice" : "A Filosofia na Prática",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="core"
            title={isEN ? "Time-Centric Sales" : "Vendas Centradas no Tempo"}
            items={[
              isEN
                ? "Always speak of aging, heritage, craft time"
                : "Sempre fale de envelhecimento, herança, tempo de ofício",
              isEN
                ? "Connect products to memory and ritual"
                : "Conecte produtos a memória e ritual",
              isEN
                ? "Price = investment in time, not consumption"
                : "Preço = investimento em tempo, não consumo",
              isEN
                ? "Every detail (packaging, presentation) matters"
                : "Cada detalhe (embalagem, apresentação) importa",
            ]}
          />
        </div>
      ),
    },
  ];

  const phase2Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "How is time embedded in The 100's Port Wine?"
        : "Como o tempo é incorporado no Vinho do Porto The 100's?",
      options: [
        isEN ? "It's just marketing" : "É apenas marketing",
        isEN ? "Through years of aging (10, 50, 100 years)" : "Através de anos de envelhecimento (10, 50, 100 anos)",
        isEN ? "In the bottle design" : "No design da garrafa",
        isEN ? "It doesn't contain time" : "Não contém tempo",
      ],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "What makes cork a time-relevant packaging material?"
        : "O que torna a cortiça um material de embalagem relevante ao tempo?",
      options: [
        isEN ? "It's cheaper than other materials" : "É mais barato que outros materiais",
        isEN ? "Cork is harvested every 9 years from ancient oaks" : "Cortiça é colhida a cada 9 anos de carvalhos antigos",
        isEN ? "It keeps products fresh" : "Mantém produtos frescos",
        isEN ? "It looks premium" : "Parece premium",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 3: Brand Voice & Tom
  const phase3Slides: Slide[] = [
    {
      title: isEN ? "Brand Voice Guidelines" : "Diretrizes de Voz da Marca",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="warning"
            title={isEN ? "The 100's Voice is..." : "A Voz The 100's é..."}
            items={[
              isEN
                ? "Sophisticated but accessible (not elitist, not casual)"
                : "Sofisticada mas acessível (não elitista, não casual)",
              isEN
                ? "Poetic but precise (sensorial yet factual)"
                : "Poética mas precisa (sensorial mas factual)",
              isEN
                ? "Modern but reverent (contemporary without dismissing heritage)"
                : "Moderna mas reverente (contemporânea sem descartar herança)",
              isEN
                ? "Sensorial and slow (encourage pausing, tasting, experiencing)"
                : "Sensorial e lenta (encoraje pausas, degustação, experiência)",
              isEN
                ? "Direct and product-oriented (not abstract, always tie back to what we sell)"
                : "Direta e orientada para o produto (não abstrata, sempre ligada ao que vendemos)",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Brand Voice Examples PT/EN" : "Exemplos de Voz da Marca PT/EN",
      content: (
        <div className="space-y-3">
          <PhraseCard
            pt="O nosso Porto de 100 anos é mais que um vinho—é um tesouro liquido de paciência e ofício."
            en="Our 100-year Port Wine is more than wine—it's liquid treasure of patience and craft."
            context={isEN ? "Describing premium tiers" : "Descrevendo tiers premium"}
          />
          <PhraseCard
            pt="Cada garrafa marca um momento. Cada momento torna-se uma memória."
            en="Every bottle marks a moment. Every moment becomes a memory."
            context={isEN ? "Core philosophy" : "Filosofia central"}
          />
          <PhraseCard
            pt="Este sal cristalizou-se ao longo de milênios. Agora cristaliza-se no seu paladar."
            en="This salt crystallized over millennia. Now it crystallizes on your palate."
            context={isEN ? "Sea salt tasting" : "Degustação de sal"}
          />
          <PhraseCard
            pt="A nossa cerâmica é moldada manualmente. Tal como cada momento singular é moldado pela sua presença."
            en="Our ceramics are hand-thrown. Just as every singular moment is shaped by your presence."
            context={isEN ? "Packaging philosophy" : "Filosofia de embalagem"}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Tone in Different Contexts" : "Tom em Diferentes Contextos",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-semibold text-sm">
              {isEN ? "With customers (relaxed):" : "Com clientes (relaxado):"}
            </p>
            <p className="text-sm text-foreground/80 bg-foreground/5 p-3 rounded italic">
              {isEN
                ? '"Want to know a secret? Our 50-year Port Wine was aging when your parents met."'
                : '"Quer saber um segredo? O nosso Porto de 50 anos estava envelhecendo quando os seus pais se encontraram."'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-sm">
              {isEN ? "Product descriptions (precise):" : "Descrições de produto (preciso):"}
            </p>
            <p className="text-sm text-foreground/80 bg-foreground/5 p-3 rounded italic">
              {isEN
                ? '"Tawny Port, 10 years aged in oak. Notes of caramel, hazelnut, spice. ABV 19%. Gift-wrapped in ceramic."'
                : '"Porto Tawny, 10 anos envelhecido em carvalho. Notas de caramelo, avelã, especiaria. ABV 19%. Embrulhado em cerâmica."'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-sm">
              {isEN ? "Brand narrative (elevated):" : "Narrativa de marca (elevada):"}
            </p>
            <p className="text-sm text-foreground/80 bg-foreground/5 p-3 rounded italic">
              {isEN
                ? '"Time is the only luxury that becomes more precious with age. The 100\'s honours this through every craft and bottle."'
                : '"O tempo é o único luxo que se torna mais precioso com a idade. The 100\'s honra isso através de cada ofício e garrafa."'}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const phase3Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "Which best describes The 100's brand voice?"
        : "Qual melhor descreve a voz da marca The 100's?",
      options: [
        isEN ? "Elitist and exclusive" : "Elitista e exclusiva",
        isEN ? "Sophisticated but accessible, poetic but precise" : "Sofisticada mas acessível, poética mas precisa",
        isEN ? "Casual and trendy" : "Casual e na moda",
        isEN ? "Technical and corporate" : "Técnica e corporativa",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 4: Vocabulário Premium (Quiz-heavy)
  const phase4Slides: Slide[] = [
    {
      title: isEN ? "Premium Vocabulary Rules" : "Regras de Vocabulário Premium",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="error"
            title={isEN ? "Never Say..." : "Nunca Diga..."}
            items={[
              isEN
                ? '"Wine shop" → Say "Premium gifts heritage collection"'
                : '"Loja de vinho" → Diga "Coleção de herança de presentes premium"',
              isEN
                ? '"Bottle of wine" → Say "Port Wine gift" or "premium gift vessel"'
                : '"Garrafa de vinho" → Diga "presente de Vinho do Porto" ou "vaso de presente premium"',
              isEN
                ? '"Vineyard, grapes, barrels" (wine clichés) → Focus on time, craftsmanship, memory'
                : '"Vinhedo, uvas, barris" (clichês de vinho) → Foque em tempo, artesanato, memória',
              isEN
                ? '"Buy" → Say "invest in" or "curate"'
                : '"Comprar" → Diga "investir em" ou "curar"',
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "What To Say Instead" : "O Que Dizer em Vez Disso",
      content: (
        <div className="space-y-3">
          <PhraseCard
            pt="Este é um presente de Vinho do Porto com 50 anos de herança."
            en="This is a 50-year heritage Port Wine gift."
            context={isEN ? "Instead of 'bottle of wine'" : "Em vez de 'garrafa de vinho'"}
          />
          <PhraseCard
            pt="Você investe em memórias quando seleciona The 100's."
            en="You invest in memories when you select The 100's."
            context={isEN ? "Instead of 'buy'" : "Em vez de 'comprar'"}
          />
          <PhraseCard
            pt="Nossa coleção celebra séculos de ofício português."
            en="Our collection celebrates centuries of Portuguese craftsmanship."
            context={isEN ? "Heritage focus" : "Foco em herança"}
          />
          <PhraseCard
            pt="O sal marinho The 100's é uma experiência sensorial."
            en="The 100's sea salt is a sensorial experience."
            context={isEN ? "Product focus, not wine-centric" : "Foco no produto, não centrado em vinho"}
          />
        </div>
      ),
    },
  ];

  const phase4Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "Which phrase is correct for The 100's brand language?"
        : "Qual frase é correta para a linguagem da marca The 100's?",
      options: [
        isEN ? "We sell the best wine bottles" : "Vendemos as melhores garrafas de vinho",
        isEN
          ? "Invest in premium heritage gifts, not just wine"
          : "Invista em presentes de herança premium, não apenas vinho",
        isEN ? "Shop for wine at our store" : "Compre vinho na nossa loja",
        isEN ? "Our vineyards produce excellent grapes" : "Os nossos vinhedos produzem uvas excelentes",
      ],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "How should you refer to our products?"
        : "Como você deveria se referir aos nossos produtos?",
      options: [
        isEN ? "Wine bottles" : "Garrafas de vinho",
        isEN ? "Premium gifts marking time and memory" : "Presentes premium marcando tempo e memória",
        isEN ? "Luxury items for the rich" : "Itens de luxo para os ricos",
        isEN ? "Expensive souvenirs" : "Lembranças caras",
      ],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "What's the core vocabulary rule for The 100's?"
        : "Qual é a regra de vocabulário central para The 100's?",
      options: [
        isEN
          ? "Always use wine industry jargon"
          : "Sempre use jargão da indústria de vinho",
        isEN
          ? "Connect every product to time, craft, and memory"
          : "Conecte cada produto ao tempo, ofício e memória",
        isEN
          ? "Focus only on price and availability"
          : "Foque apenas em preço e disponibilidade",
        isEN
          ? "Use casual, everyday language"
          : "Use linguagem casual, cotidiana",
      ],
      correctIndex: 1,
    },
  ];

  // Phase structure
  const phases: Phase[] = [
    {
      id: "filosofia-marca",
      title: isEN ? "Brand Philosophy" : "Filosofia da Marca",
      subtitle: isEN ? "Origins and Mission" : "Origens e Missão",
      content: <SlideViewer slides={phase1Slides} onComplete={() => {}} />,
      quiz: phase1Quiz,
      passingScore: 50,
    },
    {
      id: "conceito-tempo",
      title: isEN ? "Time as Substance" : "Conceito do Tempo",
      subtitle: isEN ? "Core philosophy and practice" : "Filosofia e prática central",
      content: <SlideViewer slides={phase2Slides} onComplete={() => {}} />,
      quiz: phase2Quiz,
      passingScore: 50,
    },
    {
      id: "brand-voice",
      title: isEN ? "Brand Voice" : "Brand Voice & Tom",
      subtitle: isEN ? "Communication guidelines" : "Diretrizes de comunicação",
      content: <SlideViewer slides={phase3Slides} onComplete={() => {}} />,
      quiz: phase3Quiz,
      passingScore: 50,
    },
    {
      id: "vocabulario",
      title: isEN ? "Premium Vocabulary" : "Vocabulário Premium",
      subtitle: isEN ? "Words that matter" : "Palavras que importam",
      content: <SlideViewer slides={phase4Slides} onComplete={() => {}} />,
      quiz: phase4Quiz,
      passingScore: 66,
    },
  ];

  return (
    <ModuleLayout
      moduleId="brand-story"
      moduleNumber={1}
      title={isEN ? "Brand Story" : "História da Marca"}
      subtitle={isEN
        ? "Philosophy, Voice, and Vocabulary"
        : "Filosofia, Voz e Vocabulário"}
      heroImage={heroDrop}
    >
      <PhaseSystem moduleId="brand-story" phases={phases} />
    </ModuleLayout>
  );
}
