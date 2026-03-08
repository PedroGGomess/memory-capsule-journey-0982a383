import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock, QuizBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import collectionImg from "@/assets/collection.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { ShoppingBag, Gift, Users, TrendingUp, ArrowRight } from "lucide-react";

const ModuleCrossSelling = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const strategies = isEN ? [
    {
      icon: Gift, title: "The Gift Bundle Strategy",
      desc: "Most visitors are buying souvenirs. Position The 100's as the complete gift solution.",
      tactics: [
        "Suggest pairing: '100ml of Port + 100ml of Olive Oil — the perfect dual gift from Portugal.'",
        "For couples: 'One Tawny, one White — two memories in one trip.'",
        "For families: 'The Entry Gift for the kids to give grandparents — even they become part of the memory.'",
        "Anniversary visitors: 'Engrave the year you met. Two bottles, one shared timestamp.'",
      ],
    },
    {
      icon: TrendingUp, title: "The Age Upgrade",
      desc: "Guide visitors naturally from accessible to premium products — without pressure.",
      tactics: [
        "Start the tasting with 10-year: 'This is where the journey begins.'",
        "Then 30-year: 'Now feel the difference three decades make.'",
        "If they react positively: 'Imagine what 50 years does — would you like to try?'",
        "Never jump straight to premium. Build the story through time.",
      ],
    },
    {
      icon: ShoppingBag, title: "The Material Upgrade",
      desc: "The packaging is a product in itself. Use the material hierarchy to create aspiration.",
      tactics: [
        "Show the Entry Gift first, then the Cork, then Wood: 'Each material tells a different story.'",
        "Cork: 'This is Portugal in your hands — sustainable, warm, natural.'",
        "Wood + Brass: 'This is for someone who appreciates true craftsmanship.'",
        "Oak: 'The ultimate — made from the same wood that ages the wine. The container mirrors the content.'",
      ],
    },
    {
      icon: Users, title: "The Group Sale",
      desc: "Tour groups and families are high-value. Engage the whole group, not just the buyer.",
      tactics: [
        "Address the group: 'Each of you can choose a different collection — Porto City, Azulejo, Literature...'",
        "Create friendly competition: 'Who has the best taste? Let's find out with a tasting.'",
        "Offer to personalise multiple bottles: 'You can all engrave the same date — the day you were here together.'",
        "For tour leaders: 'We can prepare a curated selection if you bring groups regularly.'",
      ],
    },
  ] : [
    {
      icon: Gift, title: "Estratégia de Bundle de Presentes",
      desc: "A maioria dos visitantes está a comprar lembranças. Posiciona o The 100's como a solução completa de presentes.",
      tactics: [
        "Sugere combinação: '100ml de Porto + 100ml de Azeite — o presente duplo perfeito de Portugal.'",
        "Para casais: 'Um Tawny, um Branco — duas memórias numa viagem.'",
        "Para famílias: 'O Entry Gift para as crianças darem aos avós — até eles se tornam parte da memória.'",
        "Visitantes de aniversário: 'Grava o ano em que se conheceram. Duas garrafas, um carimbo partilhado.'",
      ],
    },
    {
      icon: TrendingUp, title: "O Upgrade de Idade",
      desc: "Guia visitantes naturalmente do acessível ao premium — sem pressão.",
      tactics: [
        "Começa a prova com 10 anos: 'É aqui que a jornada começa.'",
        "Depois 30 anos: 'Agora sente a diferença que três décadas fazem.'",
        "Se reagirem positivamente: 'Imagina o que 50 anos fazem — gostariam de provar?'",
        "Nunca saltes direto para o premium. Constrói a história através do tempo.",
      ],
    },
    {
      icon: ShoppingBag, title: "O Upgrade de Material",
      desc: "A embalagem é um produto em si. Usa a hierarquia de materiais para criar aspiração.",
      tactics: [
        "Mostra o Entry Gift primeiro, depois Cortiça, depois Madeira: 'Cada material conta uma história diferente.'",
        "Cortiça: 'Isto é Portugal nas tuas mãos — sustentável, quente, natural.'",
        "Madeira + Latão: 'Isto é para quem aprecia o verdadeiro artesanato.'",
        "Carvalho: 'O máximo — feito da mesma madeira que envelhece o vinho. O recipiente espelha o conteúdo.'",
      ],
    },
    {
      icon: Users, title: "A Venda de Grupo",
      desc: "Grupos de turismo e famílias são de alto valor. Envolve o grupo todo, não apenas o comprador.",
      tactics: [
        "Dirige-te ao grupo: 'Cada um pode escolher uma coleção diferente — Porto City, Azulejo, Literatura...'",
        "Cria competição amigável: 'Quem tem o melhor paladar? Vamos descobrir com uma prova.'",
        "Oferece personalizar várias garrafas: 'Podem todos gravar a mesma data — o dia em que estiveram aqui juntos.'",
        "Para líderes de grupo: 'Podemos preparar uma seleção curada se trouxerem grupos regularmente.'",
      ],
    },
  ];

  const oliveOilTactics = isEN ? [
    { situation: "They don't drink alcohol", response: "\"Perfect — we also have premium Portuguese olive oil in the same collectible packaging. The capsule becomes a beautiful kitchen piece.\"" },
    { situation: "They already chose Port wine", response: "\"Would you like to add the olive oil? Port + Olive Oil — it's the quintessential Portuguese pair.\"" },
    { situation: "They're buying for a foodie", response: "\"For someone who loves food, the olive oil is incredible. Single-origin Portuguese olive oil in a collectible design.\"" },
    { situation: "They're buying multiple gifts", response: "\"Mix it up — Port wine for some, olive oil for others. Everyone gets a unique Memory Capsule from Portugal.\"" },
  ] : [
    { situation: "Não bebe álcool", response: "\"Perfeito — temos também azeite premium português na mesma embalagem colecionável. A cápsula torna-se uma peça bonita para a cozinha.\"" },
    { situation: "Já escolheram Vinho do Porto", response: "\"Gostariam de juntar o azeite? Porto + Azeite — é o par quintessencialmente português.\"" },
    { situation: "Estão a comprar para um foodie", response: "\"Para alguém que adora comida, o azeite é incrível. Azeite português de origem única num design colecionável.\"" },
    { situation: "Estão a comprar vários presentes", response: "\"Mistura — Vinho do Porto para uns, azeite para outros. Todos recebem uma Memory Capsule única de Portugal.\"" },
  ];

  const avgTicket = isEN ? [
    { level: "Entry", range: "€15–25", products: "Entry Gift (single)", approach: "Quick, spontaneous purchase" },
    { level: "Standard", range: "€25–50", products: "Cork product + personalisation", approach: "Tasting + storytelling" },
    { level: "Premium", range: "€50–100", products: "Wood product or bundle", approach: "Full ritual + age upgrade" },
    { level: "Luxury", range: "€100+", products: "Oak + personalisation + bundle", approach: "Complete immersive experience" },
  ] : [
    { level: "Entrada", range: "€15–25", products: "Entry Gift (individual)", approach: "Compra rápida e espontânea" },
    { level: "Standard", range: "€25–50", products: "Produto cortiça + personalização", approach: "Prova + storytelling" },
    { level: "Premium", range: "€50–100", products: "Produto madeira ou bundle", approach: "Ritual completo + upgrade de idade" },
    { level: "Luxo", range: "€100+", products: "Carvalho + personalização + bundle", approach: "Experiência imersiva completa" },
  ];

  return (
    <ModuleLayout
      moduleId="cross-selling"
      moduleNumber={11}
      title={isEN ? "Cross-Selling & Upselling" : "Cross-Selling & Upselling"}
      subtitle={isEN ? "The art of suggesting more — without pushing." : "A arte de sugerir mais — sem forçar."}
      heroImage={collectionImg}
    >
      <ContentBlock title={isEN ? "Sell the Story, Not the Product" : "Vende a História, Não o Produto"}>
        <p>{isEN
          ? "At The 100's, cross-selling is never aggressive. It's about enriching the visitor's experience. Every suggestion should feel like a natural extension of their journey — not a sales pitch."
          : "No The 100's, o cross-selling nunca é agressivo. Trata-se de enriquecer a experiência do visitante. Cada sugestão deve parecer uma extensão natural da jornada — não um pitch de vendas."}</p>
        <p>{isEN
          ? "The key principle: listen first, then connect. What's their story? Who are they buying for? What moment do they want to remember?"
          : "O princípio-chave: ouve primeiro, depois conecta. Qual é a história deles? Para quem estão a comprar? Que momento querem lembrar?"}</p>
      </ContentBlock>

      <ContentBlock title={isEN ? "Four Core Strategies" : "Quatro Estratégias Centrais"}>
        <p>{isEN
          ? "Master these four approaches and you'll naturally increase the average ticket while making every visitor feel special."
          : "Domina estas quatro abordagens e vais naturalmente aumentar o ticket médio enquanto fazes cada visitante sentir-se especial."}</p>
      </ContentBlock>

      <div className="space-y-8">
        {strategies.map((s) => {
          const Icon = s.icon;
          return (
            <ScrollReveal key={s.title}>
              <div className="border border-border/30 overflow-hidden hover:border-primary/20 transition-all duration-500">
                <div className="flex items-center gap-5 px-8 py-6 border-b border-border/20 bg-card/20">
                  <div className="p-3 bg-primary/5 rounded-sm">
                    <Icon className="w-6 h-6 text-primary/60" />
                  </div>
                  <div>
                    <p className="text-lg font-light text-primary">{s.title}</p>
                    <p className="text-sm text-foreground/50 font-light mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="px-8 py-6 space-y-3">
                  {s.tactics.map((tactic, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ArrowRight className="w-3.5 h-3.5 text-primary/40 mt-1 shrink-0" />
                      <p className="text-sm text-foreground/60 font-light leading-relaxed">{tactic}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ContentBlock title={isEN ? "The Olive Oil Opportunity" : "A Oportunidade do Azeite"}>
        <p>{isEN
          ? "Olive oil is the most powerful cross-sell tool in the store. It opens doors that wine cannot."
          : "O azeite é a ferramenta de cross-sell mais poderosa da loja. Abre portas que o vinho não consegue."}</p>
      </ContentBlock>

      <div className="space-y-3">
        {oliveOilTactics.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500">
              <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-2">{isEN ? "Situation" : "Situação"}: {t.situation}</p>
              <p className="text-sm text-foreground/70 font-light italic">{t.response}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Average Ticket Guide" : "Guia de Ticket Médio"}>
        <p>{isEN
          ? "Understanding the ticket tiers helps you identify where each visitor sits and how to guide them to the next level."
          : "Compreender os níveis de ticket ajuda-te a identificar onde cada visitante está e como guiá-lo ao próximo nível."}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {avgTicket.map((tier, i) => (
          <ScrollReveal key={tier.level} delay={i * 0.05}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
              <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-1">{tier.level}</p>
              <p className="text-2xl font-light text-primary mb-3">{tier.range}</p>
              <p className="text-sm text-foreground/70 font-light mb-2">{tier.products}</p>
              <p className="text-xs text-muted-foreground/50 mt-auto italic">{tier.approach}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "Power Phrases for Cross-Selling" : "Frases-Chave para Cross-Selling"}>
        <div className="space-y-4">
          {(isEN ? [
            { trigger: "After a tasting:", phrase: "'Which age spoke to you the most? Let me show you the perfect capsule for it.'" },
            { trigger: "When they pick a product:", phrase: "'That's a beautiful choice. Have you thought about who else would love to receive one?'" },
            { trigger: "At personalisation:", phrase: "'Most visitors engrave two — one for themselves, one for someone they love.'" },
            { trigger: "Near checkout:", phrase: "'The olive oil makes the gift complete — Porto's two treasures in one package.'" },
            { trigger: "For hesitant buyers:", phrase: "'The Entry Gift is a beautiful start — and you can always come back for the next level.'" },
          ] : [
            { trigger: "Após uma prova:", phrase: "'Qual idade falou mais contigo? Deixa-me mostrar a cápsula perfeita para ela.'" },
            { trigger: "Quando escolhem um produto:", phrase: "'Excelente escolha. Já pensaste em quem mais adoraria receber uma?'" },
            { trigger: "Na personalização:", phrase: "'A maioria dos visitantes grava duas — uma para si, uma para alguém que amam.'" },
            { trigger: "Perto do checkout:", phrase: "'O azeite completa o presente — dois tesouros do Porto numa só embalagem.'" },
            { trigger: "Para compradores hesitantes:", phrase: "'O Entry Gift é um começo bonito — e podes sempre voltar para o próximo nível.'" },
          ]).map((p, i) => (
            <div key={i}>
              <p className="text-sm text-primary/70 font-medium">{p.trigger}</p>
              <p className="text-sm text-foreground/60 font-light italic">{p.phrase}</p>
            </div>
          ))}
        </div>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "Four core strategies: Gift Bundles, Age Upgrade, Material Upgrade, Group Sales",
        "Olive oil is the #1 cross-sell tool — works for non-drinkers, foodies, and bundle buyers",
        "Never push a sale. Listen first, connect to their story, then suggest naturally",
        "Build the tasting journey from young to old — let time do the selling",
        "Know the four ticket tiers: Entry (€15-25), Standard (€25-50), Premium (€50-100), Luxury (€100+)",
        "Personalisation is the strongest upsell — it transforms a product into an irreplaceable memory",
      ] : [
        "Quatro estratégias centrais: Bundles de Presentes, Upgrade de Idade, Upgrade de Material, Vendas de Grupo",
        "O azeite é a ferramenta #1 de cross-sell — funciona para quem não bebe, foodies e compradores de bundles",
        "Nunca forces uma venda. Ouve primeiro, conecta com a história deles, depois sugere naturalmente",
        "Constrói a jornada de prova do jovem ao velho — deixa o tempo fazer a venda",
        "Conhece os quatro níveis de ticket: Entrada (€15-25), Standard (€25-50), Premium (€50-100), Luxo (€100+)",
        "A personalização é o upsell mais forte — transforma um produto numa memória insubstituível",
      ]} />

      <QuizBlock moduleId="cross-selling" questions={isEN ? [
        { question: "A visitor says they don't drink alcohol. What's your best cross-sell move?", options: ["Suggest they buy for someone else", "Offer the olive oil in collectible packaging", "Show them the cheapest wine", "Tell them to come back another time"], correct: 1 },
        { question: "What's the correct order for an Age Upgrade during tasting?", options: ["50yr → 30yr → 10yr", "Random for surprise", "10yr → 30yr → 50yr", "Start with the most expensive"], correct: 2 },
        { question: "What is the most powerful upsell tool at The 100's?", options: ["Offering discounts", "Personalised Time Stamp engraving", "Showing social media reviews", "Comparing to competitor prices"], correct: 1 },
      ] : [
        { question: "Um visitante diz que não bebe álcool. Qual o melhor movimento de cross-sell?", options: ["Sugerir que compre para outra pessoa", "Oferecer o azeite em embalagem colecionável", "Mostrar o vinho mais barato", "Dizer para voltar noutra altura"], correct: 1 },
        { question: "Qual a ordem correta para um Upgrade de Idade durante a prova?", options: ["50 anos → 30 anos → 10 anos", "Aleatório para surpresa", "10 anos → 30 anos → 50 anos", "Começar pelo mais caro"], correct: 2 },
        { question: "Qual é a ferramenta de upsell mais poderosa no The 100's?", options: ["Oferecer descontos", "Gravação personalizada do Carimbo de Tempo", "Mostrar reviews das redes sociais", "Comparar com preços da concorrência"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "A couple enters the store. She wants Port wine, he wants something non-alcoholic. Write the script you would use to serve both and maximise the sale.",
        "Describe how you would guide a visitor from an Entry Gift (€15) to a Premium Wood product (€80) without them feeling pressured.",
        "A tour group of 8 people enters. You have 15 minutes. What's your strategy?",
      ] : [
        "Um casal entra na loja. Ela quer Vinho do Porto, ele quer algo não-alcoólico. Escreve o guião que usarias para servir ambos e maximizar a venda.",
        "Descreve como guiarias um visitante de um Entry Gift (€15) para um produto Premium de Madeira (€80) sem que se sintam pressionados.",
        "Um grupo de turismo de 8 pessoas entra. Tens 15 minutos. Qual é a tua estratégia?",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleCrossSelling;
