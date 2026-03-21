import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, QuizBlock, ReflectionBlock, VideoBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart, TrendingUp, Gift, Users, MessageCircle, Target } from "lucide-react";
import clientCultureImg from "@/assets/academy/client-culture.svg";

const ModuleClientCulture = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const pillars = isEN ? [
    {
      icon: Heart,
      title: "Client Importance",
      desc: "Volume depends on expectations. Every client is an opportunity to create an ambassador.",
    },
    {
      icon: Target,
      title: "Expectation",
      desc: "Every touchpoint exceeds the expected (Storefront → Entry → Tasting → Personalization → Purchase)",
    },
    {
      icon: Gift,
      title: "Delight",
      desc: "Wrapping ceremony, live personalization, tone of voice, genuine care",
    },
    {
      icon: TrendingUp,
      title: "Loyalty",
      desc: "Memory → Return → Incentive cycle. CRM and Concierge as engines",
    },
    {
      icon: MessageCircle,
      title: "Advocacy Marketing",
      desc: "Client as ambassador. Reviews, social sharing, recommendation",
    },
    {
      icon: Users,
      title: "Emotional Journey",
      desc: "Capture → Explore → Experience → Engagement → Purchase",
    },
  ] : [
    {
      icon: Heart,
      title: "Importância do Cliente",
      desc: "Volume depende das expectativas. Cada cliente é oportunidade de criar embaixador.",
    },
    {
      icon: Target,
      title: "Expectativa",
      desc: "Cada touchpoint supera o esperado (Montra → Entrada → Provas → Personalização → Compra)",
    },
    {
      icon: Gift,
      title: "Encantamento",
      desc: "Cerimónia do embrulho, personalização ao vivo, tom de voz, cuidado genuíno",
    },
    {
      icon: TrendingUp,
      title: "Fidelização",
      desc: "Ciclo Memória → Retorno → Incentivo. CRM e Concierge como motores",
    },
    {
      icon: MessageCircle,
      title: "Advocacy Marketing",
      desc: "Cliente como embaixador. Reviews, partilha social, recomendação",
    },
    {
      icon: Users,
      title: "Jornada Emocional",
      desc: "Captar → Explorar → Experimentar → Engagement → Compra",
    },
  ];

  return (
    <ModuleLayout
      moduleId="client-culture"
      moduleNumber={13}
      title={isEN ? "Client Culture" : "Cultura de Cliente"}
      subtitle={isEN ? "Build relationships that turn buyers into advocates." : "Constrói relacionamentos que transformam compradores em embaixadores."}
      heroImage={clientCultureImg}
    >
      <ContentBlock title={isEN ? "Beyond the Transaction" : "Além da Transação"}>
        <p>{isEN
          ? "At The 100's, we don't operate with a transaction mindset. Every interaction is an opportunity to build something larger: a relationship, a memory, and ultimately, an advocate for the brand."
          : "No The 100's, não operamos com uma mentalidade transacional. Cada interação é uma oportunidade de construir algo maior: um relacionamento, uma memória, e, finalmente, um embaixador da marca."}</p>
        <p>{isEN
          ? "Client culture is the philosophy that guides how we treat everyone who walks through the door — not as a sale, but as a human being worthy of an extraordinary experience."
          : "A cultura de cliente é a filosofia que guia como tratamos todos que entram pela porta — não como uma venda, mas como uma pessoa humana digna de uma experiência extraordinária."}</p>
      </ContentBlock>

      <VideoBlock
        title="Cultura de Cliente"
        description="A importância do cliente como centro de tudo."
        duration="8:20"
        poster={clientCultureImg}
      />

      <ContentBlock title={isEN ? "The Six Pillars of Client Culture" : "Os Seis Pilares da Cultura de Cliente"}>
        <p>{isEN
          ? "These six pillars form the foundation of how we engage, serve, and build lasting relationships with every visitor."
          : "Estes seis pilares formam a base de como nos envolvemos, servimos e construímos relacionamentos duradouros com cada visitante."}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 bg-primary/5 rounded-sm shrink-0">
                    <Icon className="w-5 h-5 text-primary/60" />
                  </div>
                  <div>
                    <p className="text-base font-light text-primary">{pillar.title}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/60 font-light">{pillar.desc}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ContentBlock title={isEN ? "The Client Journey Cycle" : "O Ciclo da Jornada do Cliente"}>
        <p>{isEN
          ? "Every client passes through five distinct emotional stages, and our job is to excel at each one:"
          : "Cada cliente passa por cinco fases emocionais distintas, e o nosso trabalho é exceler em cada uma:"}</p>
      </ContentBlock>

      <div className="space-y-3">
        {(isEN ? [
          { stage: "Capture", desc: "They see the storefront, the design, the brand. First impression matters. Make it irresistible." },
          { stage: "Explore", desc: "They enter, walk around, observe the collections. Guide without pushing. Let curiosity lead." },
          { stage: "Experience", desc: "They taste, feel the materials, imagine owning it. This is the emotional hook. Make it sensory." },
          { stage: "Engagement", desc: "They ask questions, smile, personalize, connect. The sale becomes secondary to the conversation." },
          { stage: "Purchase", desc: "They buy. But this is not the end — it's the beginning of their advocacy phase." },
        ] : [
          { stage: "Captar", desc: "Vêem a montra, o design, a marca. A primeira impressão importa. Torna-a irresistível." },
          { stage: "Explorar", desc: "Entram, caminham, observam as coleções. Guia sem forçar. Deixa a curiosidade liderar." },
          { stage: "Experimentar", desc: "Provam, sentem os materiais, imaginam possuir. Este é o gancho emocional. Torna-o sensorial." },
          { stage: "Engagement", desc: "Fazem perguntas, sorriem, personalizam, conectam. A venda torna-se secundária à conversa." },
          { stage: "Compra", desc: "Compram. Mas isto não é o fim — é o início da fase de advocacy." },
        ]).map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-5 hover:border-primary/20 transition-all duration-500">
              <p className="text-sm font-light text-primary mb-1.5">{item.stage}</p>
              <p className="text-sm text-foreground/60 font-light">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "Creating WOW Moments" : "Criando Momentos WOW"}>
        <p className="text-sm text-foreground/70 mb-3">{isEN
          ? "WOW moments are small, unexpected touches that transform an ordinary visit into a memorable one. Examples:"
          : "Momentos WOW são pequenos toques inesperados que transformam uma visita comum numa memorável. Exemplos:"}</p>
        <div className="space-y-2 text-sm text-foreground/70">
          <p>• {isEN ? "Wrapping ceremony:" : "Cerimónia de embrulho:"} {isEN ? "Turn packaging into ritual. Slow down. Make it special." : "Transforma embalagem em ritual. Desacelera. Torna-o especial."}</p>
          <p>• {isEN ? "Live personalization:" : "Personalização ao vivo:"} {isEN ? "Engrave their name or date while they watch. Make them part of the creation." : "Grava o seu nome ou data enquanto observam. Torna-os parte da criação."}</p>
          <p>• {isEN ? "Unexpected gift:" : "Presente inesperado:"} {isEN ? "A small token, a card, a story — something they didn't expect." : "Um pequeno brinde, um cartão, uma história — algo que não esperavam."}</p>
          <p>• {isEN ? "Personal touch:" : "Toque pessoal:"} {isEN ? "Remember details about their trip, ask about their plans, reference their story." : "Lembra detalhes da sua viagem, pergunta sobre os seus planos, faz referência à sua história."}</p>
          <p>• {isEN ? "Farewell moment:" : "Momento de despedida:"} {isEN ? "Don't just say goodbye. Send them off with words that resonate — 'This is a piece of time you're taking home.'" : "Não apenas dizes adeus. Despede-os com palavras que ressoem — 'Isto é um pedaço de tempo que estás a levar para casa.'"}</p>
        </div>
      </ExpandableSection>

      <ContentBlock title={isEN ? "From Client to Ambassador" : "Do Cliente ao Embaixador"}>
        <p>{isEN
          ? "The goal of client culture is not just satisfaction — it's advocacy. When a customer leaves The 100's feeling that they've experienced something extraordinary, they become brand ambassadors."
          : "O objetivo da cultura de cliente não é apenas satisfação — é advocacy. Quando um cliente sai do The 100's sentindo que experimentou algo extraordinário, torna-se embaixador da marca."}</p>
        <p>{isEN
          ? "They'll review it online, recommend it to friends, post on social media, and return themselves. This multiplier effect is more valuable than any marketing campaign."
          : "Vão classificar-lo online, recomendá-lo a amigos, postar nas redes sociais e voltar. Este efeito multiplicador é mais valioso do que qualquer campanha de marketing."}</p>
      </ContentBlock>

      <KeyTakeaway items={isEN ? [
        "Client culture transforms transactions into relationships",
        "Six pillars: Client Importance, Expectation, Delight, Loyalty, Advocacy, Emotional Journey",
        "Every touchpoint must exceed expectations — from storefront to farewell",
        "The five-stage journey: Capture → Explore → Experience → Engagement → Purchase",
        "WOW moments (wrapping ceremony, personalization, farewell) turn visitors into advocates",
        "Satisfied clients become brand ambassadors — they bring more clients through word-of-mouth and social sharing",
      ] : [
        "A cultura de cliente transforma transações em relacionamentos",
        "Seis pilares: Importância, Expectativa, Encantamento, Fidelização, Advocacy, Jornada Emocional",
        "Cada touchpoint deve superar expectativas — desde a montra à despedida",
        "A jornada de cinco fases: Captar → Explorar → Experimentar → Engagement → Compra",
        "Momentos WOW (cerimónia de embrulho, personalização, despedida) transformam visitantes em embaixadores",
        "Clientes satisfeitos tornam-se embaixadores da marca — trazem mais clientes através de boca-a-boca e partilha social",
      ]} />

      <QuizBlock moduleId="client-culture" questions={isEN ? [
        { question: "What are the six pillars of client culture?", options: ["Speed, Price, Design, Quality", "Capture, Explore, Experience, Engagement, Purchase", "Client Importance, Expectation, Delight, Loyalty, Advocacy, Emotional Journey", "Online, Offline, Social, Reviews, Email"], correct: 2 },
        { question: "Which stage is about making the experience sensory and emotional?", options: ["Capture", "Explore", "Experience", "Engagement"], correct: 2 },
        { question: "What turns a satisfied client into an advocate?", options: ["A discount", "A WOW moment they didn't expect", "A survey", "A newsletter"], correct: 1 },
      ] : [
        { question: "Quais são os seis pilares da cultura de cliente?", options: ["Velocidade, Preço, Design, Qualidade", "Captar, Explorar, Experimentar, Engagement, Compra", "Importância, Expectativa, Encantamento, Fidelização, Advocacy, Jornada Emocional", "Online, Offline, Social, Reviews, Email"], correct: 2 },
        { question: "Qual fase é sobre tornar a experiência sensória e emocional?", options: ["Captar", "Explorar", "Experimentar", "Engagement"], correct: 2 },
        { question: "O que transforma um cliente satisfeito num embaixador?", options: ["Um desconto", "Um momento WOW que não esperavam", "Um inquérito", "Uma newsletter"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Think of a time when a business gave you a WOW moment. What was it? How did it make you feel? How did you share it?",
        "Describe three WOW moments you could create for different client personas at The 100's.",
        "How would you turn a hesitant cruise passenger into a brand advocate?",
      ] : [
        "Pensa num momento em que um negócio te deu um momento WOW. O que foi? Como te fez sentir? Como o partilhaste?",
        "Descreve três momentos WOW que poderias criar para diferentes personas no The 100's.",
        "Como transformarias um cruzeirista hesitante num embaixador da marca?",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleClientCulture;
