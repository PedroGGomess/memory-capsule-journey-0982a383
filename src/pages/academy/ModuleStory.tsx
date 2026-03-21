import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock, ReflectionBlock, VideoBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import douroValleyImg from "@/assets/douro-valley.jpg";
import heroDropImg from "@/assets/hero-drop.jpg";

const douroImg = douroValleyImg;

const ModuleStory = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const pillars = isEN ? [
    { pillar: "Discovery", desc: "The spark of curiosity" },
    { pillar: "Time", desc: "Patience made tangible" },
    { pillar: "Singularity", desc: "Every bottle, unique" },
    { pillar: "Hedonism", desc: "Pleasure becomes memory" },
    { pillar: "Memory", desc: "The visit sealed forever" },
  ] : [
    { pillar: "Descoberta", desc: "A centelha da curiosidade" },
    { pillar: "Tempo", desc: "A paciência tornada tangível" },
    { pillar: "Singularidade", desc: "Cada garrafa, única" },
    { pillar: "Hedonismo", desc: "O prazer torna-se memória" },
    { pillar: "Memória", desc: "A visita selada para sempre" },
  ];

  return (
    <ModuleLayout
      moduleId="story"
      moduleNumber={1}
      title={isEN ? "The Story of The 100's" : "A História do The 100's"}
      subtitle={isEN ? "Origin, concept, and 400 years of Port wine heritage." : "Origem, conceito e 400 anos de herança de Vinho do Porto."}
      heroImage={douroValleyImg}
    >
      <ContentBlock title={isEN ? "The Origin" : "A Origem"}>
        <p>{isEN
          ? "The 100's was born from a simple, powerful idea: that a visit should never disappear."
          : "O The 100's nasceu de uma ideia simples e poderosa: que uma visita nunca deve desaparecer."}</p>
        <p>{isEN
          ? "In a world that moves too fast, The 100's creates a pause — a space where time stands still, and moments become eternal."
          : "Num mundo que se move demasiado depressa, o The 100's cria uma pausa — um espaço onde o tempo para, e os momentos se tornam eternos."}</p>
        <p>{isEN
          ? "Inspired by over 400 years of Port wine history, the brand transforms a simple visit into something extraordinary."
          : "Inspirado por mais de 400 anos de história do Vinho do Porto, a marca transforma uma simples visita em algo extraordinário."}</p>
      </ContentBlock>

      <VideoBlock
        src="/videos/story.mp4"
        title="A História do The 100's"
        description="A jornada desde a ideia até à criação de uma marca premium."
        duration="8:30"
        poster={douroValleyImg}
      />

      <ImageBlock src={heroDropImg} alt={isEN ? "Wine drop" : "Gota de vinho"} caption={isEN ? "Every drop carries centuries of history" : "Cada gota carrega séculos de história"} />

      <ContentBlock title={isEN ? "The Mission" : "A Missão"}>
        <p>{isEN
          ? "The mission of The 100's is not simply to sell traditional souvenirs. It is to \"bottle\" legacy, emotion and 400 years of Port wine history into a 100ml package."
          : "A missão do The 100's não é simplesmente vender souvenirs tradicionais. É \"engarrafar\" o legado, a emoção e 400 anos de história do Vinho do Porto num pacote de 100ml."}</p>
        <p>{isEN
          ? "The ephemeral tourist experience is converted into something lasting: a Memory Capsule — an object that captures time, place and feeling."
          : "A experiência turística efémera é convertida em algo duradouro: uma Cápsula de Memória — um objeto que captura o tempo, o lugar e o sentimento."}</p>
        <p className="italic text-primary/70">{isEN ? "\"We don't sell wine. We sell legacy.\"" : "\"Não vendemos vinho. Vendemos legado.\""}</p>
      </ContentBlock>

      <ContentBlock title={isEN ? "A Memory Capsule" : "Uma Cápsula de Memória"}>
        <p>{isEN
          ? "At the heart of The 100's lies one concept: the Memory Capsule."
          : "No coração do The 100's reside um conceito: a Cápsula de Memória."}</p>
        <p>{isEN
          ? "Visitors do not simply buy wine. They take home a moment — a memory — a story — a legacy, encapsulated in 100ml of Port wine."
          : "Os visitantes não compram simplesmente vinho. Levam para casa um momento — uma memória — uma história — um legado, encapsulado em 100ml de Vinho do Porto."}</p>
        <p>{isEN
          ? "Each bottle represents centuries of patience, transformed into a single, precious capsule of time."
          : "Cada garrafa representa séculos de paciência, transformados numa única e preciosa cápsula de tempo."}</p>
      </ContentBlock>

      <ContentBlock title="THE HOUSE OF 100S">
        <p>{isEN
          ? "The flagship store carries the designation THE HOUSE OF 100S, giving the brand a 'powerhouse' cultural dimension. It is not a shop — it is a destination, a cultural institution, a living monument to time."
          : "A loja principal ostenta a designação THE HOUSE OF 100S, conferindo à marca uma dimensão cultural de 'powerhouse'. Não é uma loja — é um destino, uma instituição cultural, um monumento vivo ao tempo."}</p>
        <p>{isEN
          ? "Every product in the house bears the designation Port Wine Premium Gift or Port Wine Souvenir, framing the purchase as a meaningful, elevated keepsake rather than a simple transaction."
          : "Todos os produtos da casa ostentam a designação Port Wine Premium Gift ou Port Wine Souvenir, enquadrando a compra como uma lembrança significativa e elevada, e não como uma simples transação."}</p>
      </ContentBlock>

      <ContentBlock title={isEN ? "400 Years of Heritage" : "400 Anos de Herança"}>
        <p>{isEN
          ? "Port wine is one of the world's most historic and cherished wines. Its story begins in the steep terraces of the Douro Valley, where generations of winemakers have perfected their craft."
          : "O Vinho do Porto é um dos vinhos mais históricos e apreciados do mundo. A sua história começa nas íngremes terraços do Vale do Douro, onde gerações de produtores de vinho aperfeiçoaram o seu ofício."}</p>
        <p>{isEN
          ? "The 100's honors this legacy by condensing centuries of tradition into a modern, premium experience that speaks to today's traveler."
          : "O The 100's honra este legado condensando séculos de tradição numa experiência moderna e premium que fala ao viajante de hoje."}</p>
      </ContentBlock>

      <ImageBlock src={douroImg} alt="Douro Valley" caption={isEN ? "The Douro Valley — birthplace of Port wine" : "O Vale do Douro — berço do Vinho do Porto"} />

      <ContentBlock title={isEN ? "The Five Sensory Pillars" : "Os Cinco Pilares Sensoriais"}>
        <p>{isEN
          ? "Every product and every interaction in The 100's is built around five sensory pillars:"
          : "Todos os produtos e interações no The 100's são construídos em torno de cinco pilares sensoriais:"}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {pillars.map(item => (
          <div key={item.pillar} className="border border-border/30 p-4 text-center">
            <p className="text-primary font-light mb-1">{item.pillar}</p>
            <p className="text-[11px] text-muted-foreground font-light">{item.desc}</p>
          </div>
        ))}
      </div>

      <ExpandableSection title={isEN ? "The Second Life Concept" : "O Conceito de Segunda Vida"}>
        <p>{isEN
          ? "After the wine is consumed, the packaging does not become waste. The container begins a second life as a piece of home décor: a candle holder, a diffuser, a jewellery holder, a decorative sculpture."
          : "Depois de o vinho ser consumido, a embalagem não se torna resíduo. O recipiente começa uma segunda vida como peça de decoração: suporte de velas, difusor, porta-joias, escultura decorativa."}</p>
        <p>{isEN
          ? "This philosophy ensures the brand lives permanently in the customer's home — long after they have returned from their trip. The object continues to preserve the memory of the journey."
          : "Esta filosofia garante que a marca vive permanentemente na casa do cliente — muito depois de ele ter regressado da sua viagem. O objeto continua a preservar a memória da jornada."}</p>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "The 100's transforms a visit into an eternal memory",
        "The core concept is the Memory Capsule — 100ml of history",
        "The flagship store is known as THE HOUSE OF 100S",
        "The brand draws from 400+ years of Port wine heritage",
        "Five sensory pillars: Discovery, Time, Singularity, Hedonism, Memory",
        "The Second Life Concept: packaging lives on as home décor after the wine is consumed"
      ] : [
        "O The 100's transforma uma visita numa memória eterna",
        "O conceito central é a Cápsula de Memória — 100ml de história",
        "A loja principal é conhecida como THE HOUSE OF 100S",
        "A marca inspira-se em mais de 400 anos de herança do Vinho do Porto",
        "Cinco pilares sensoriais: Descoberta, Tempo, Singularidade, Hedonismo, Memória",
        "O Conceito de Segunda Vida: a embalagem continua como decoração após o vinho ser consumido"
      ]} />

      <QuizBlock moduleId="story" questions={isEN ? [
        { question: "What is the core concept of The 100's?", options: ["A wine shop", "A Memory Capsule", "A restaurant", "A museum"], correct: 1 },
        { question: "How many years of Port wine heritage inspires the brand?", options: ["100 years", "200 years", "400 years", "50 years"], correct: 2 },
        { question: "What is the name of the flagship store designation?", options: ["THE WINE HOUSE", "THE HOUSE OF 100S", "THE MEMORY VAULT", "THE PORT HOUSE"], correct: 1 },
      ] : [
        { question: "Qual é o conceito central do The 100's?", options: ["Uma loja de vinho", "Uma Cápsula de Memória", "Um restaurante", "Um museu"], correct: 1 },
        { question: "Quantos anos de herança do Vinho do Porto inspiram a marca?", options: ["100 anos", "200 anos", "400 anos", "50 anos"], correct: 2 },
        { question: "Qual é a designação da loja principal?", options: ["THE WINE HOUSE", "THE HOUSE OF 100S", "THE MEMORY VAULT", "THE PORT HOUSE"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "How would you describe The 100's concept to a friend in one sentence?",
        "What does 'taking home a memory' mean to you?",
        "How would you explain the Second Life Concept to a visitor who has just purchased a bottle?"
      ] : [
        "Como descreverias o conceito do The 100's a um amigo numa frase?",
        "O que significa para ti 'levar uma memória para casa'?",
        "Como explicarias o Conceito de Segunda Vida a um visitante que acabou de comprar uma garrafa?"
      ]} />
    </ModuleLayout>
  );
};

export default ModuleStory;
