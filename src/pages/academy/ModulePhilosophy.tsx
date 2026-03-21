import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock, ReflectionBlock, VideoBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import hourglassImg from "@/assets/hourglass.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";
import hedonismImg from "@/assets/hedonism.jpg";
import heroDropImg from "@/assets/hero-drop.jpg";

const ModulePhilosophy = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const pillars = isEN ? [
    {
      title: "Time",
      subtitle: "Time is the ultimate creator of value.",
      desc: "Great wine is the result of patience, maturation and heritage. Our brand celebrates the beauty of time. Each bottle carries centuries of patience — time doesn't rush, it reveals.",
      img: hourglassImg,
    },
    {
      title: "Emotion",
      subtitle: "A meaningful gift carries emotion.",
      desc: "The 100's products are designed to represent experiences and stories rather than simple transactions. Every interaction should feel personal, thoughtful and deeply human.",
      img: hedonismImg,
    },
    {
      title: "Memory",
      subtitle: "The purpose of every product is to preserve memory.",
      desc: "A visitor leaves with something that connects them permanently to the place they visited. Memory is the final act — the moment a visit becomes eternal.",
      img: bottleImg,
    },
  ] : [
    {
      title: "Tempo",
      subtitle: "O tempo é o criador último de valor.",
      desc: "O grande vinho é o resultado da paciência, maturação e herança. A nossa marca celebra a beleza do tempo. Cada garrafa carrega séculos de paciência — o tempo não apressa, revela.",
      img: hourglassImg,
    },
    {
      title: "Emoção",
      subtitle: "Um presente significativo carrega emoção.",
      desc: "Os produtos do The 100's são concebidos para representar experiências e histórias em vez de simples transações. Cada interação deve parecer pessoal, cuidadosa e profundamente humana.",
      img: hedonismImg,
    },
    {
      title: "Memória",
      subtitle: "O propósito de cada produto é preservar a memória.",
      desc: "Um visitante parte com algo que o conecta permanentemente ao lugar que visitou. A memória é o ato final — o momento em que uma visita se torna eterna.",
      img: bottleImg,
    },
  ];

  return (
    <ModuleLayout
      moduleId="philosophy"
      moduleNumber={2}
      title={isEN ? "Brand Philosophy" : "Filosofia da Marca"}
      subtitle={isEN ? "Three fundamental ideas that define everything we do." : "Três ideias fundamentais que definem tudo o que fazemos."}
      heroImage={hourglassImg}
    >
      <ContentBlock>
        <p>{isEN
          ? "The philosophy of The 100's revolves around three fundamental ideas. Together, they form the foundation of every product, every interaction and every story we tell."
          : "A filosofia do The 100's gira em torno de três ideias fundamentais. Juntas, formam a base de cada produto, cada interação e cada história que contamos."}</p>
        <p className="italic text-primary/70">{isEN
          ? "Time deserves to be remembered — and remembered beautifully."
          : "O tempo merece ser lembrado — e lembrado de forma bela."}</p>
      </ContentBlock>

      <VideoBlock
        title="Filosofia da Marca"
        description="Tempo, Emoção e Memória — os três pilares que nos definem."
        duration="6:45"
        poster={hourglassImg}
      />

      <div className="space-y-6">
        {pillars.map((pillar, i) => (
          <div key={pillar.title} className="border border-border/30 overflow-hidden">
            <img src={pillar.img} alt={pillar.title} className="w-full h-48 object-cover opacity-50" />
            <div className="p-8">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl font-light text-primary/20">{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-light text-primary">{pillar.title}</h3>
                  <p className="text-sm text-foreground/60 italic mt-0.5">{pillar.subtitle}</p>
                </div>
              </div>
              <p className="text-foreground/70 font-light leading-relaxed">{pillar.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <ContentBlock title={isEN ? "The Five Pillars of Experience" : "Os Cinco Pilares da Experiência"}>
        <p>{isEN
          ? "Beyond the three fundamental ideas, The 100's brand journey unfolds through five experiential stages that take every visitor from curiosity to lasting memory."
          : "Para além das três ideias fundamentais, a jornada da marca The 100's desenrola-se através de cinco etapas experienciais que levam cada visitante da curiosidade à memória duradoura."}</p>
      </ContentBlock>

      <ExpandableSection title={isEN ? "I — Discovery" : "I — Descoberta"}>
        <p>{isEN
          ? "The first moment of time is discovery. In every journey there is a moment when curiosity meets history."
          : "O primeiro momento do tempo é a descoberta. Em cada jornada existe um momento em que a curiosidade encontra a história."}</p>
        <p>{isEN
          ? "Discovery is the spark — the beginning of something meaningful. At The 100's, that moment is revealed drop by drop."
          : "A descoberta é a centelha — o início de algo significativo. No The 100's, esse momento é revelado gota a gota."}</p>
        <div className="mt-4">
          <img src={heroDropImg} alt="Discovery" className="w-full rounded-sm opacity-80" />
        </div>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "II — Time" : "II — Tempo"}>
        <p>{isEN
          ? "Time is the substance that gives meaning. Here it pauses between memory and promise."
          : "O tempo é a substância que dá significado. Aqui pausa entre memória e promessa."}</p>
        <p>{isEN
          ? "Each bottle carries centuries of patience. Time doesn't rush — it reveals. The beauty of Port wine lies in what time has done to transform it."
          : "Cada garrafa carrega séculos de paciência. O tempo não apressa — revela. A beleza do Vinho do Porto reside no que o tempo fez para o transformar."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "III — Singularity" : "III — Singularidade"}>
        <p>{isEN
          ? "Every liquid holds its own story. In silence, time transforms wine into something rare."
          : "Cada líquido guarda a sua própria história. Em silêncio, o tempo transforma o vinho em algo raro."}</p>
        <p>{isEN
          ? "Each drop becomes a fragment of history waiting to be discovered. No two bottles are the same — each carries a unique narrative shaped by decades of careful aging."
          : "Cada gota torna-se um fragmento de história à espera de ser descoberto. Não há duas garrafas iguais — cada uma carrega uma narrativa única moldada por décadas de envelhecimento cuidadoso."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "IV — Hedonism" : "IV — Hedonismo"}>
        <p>{isEN
          ? "Time dissolves into light, color and experience. Wine becomes pleasure. Pleasure becomes memory."
          : "O tempo dissolve-se em luz, cor e experiência. O vinho torna-se prazer. O prazer torna-se memória."}</p>
        <p>{isEN
          ? "Hedonism celebrates the sensory experience — the color, aroma, taste and emotion of tasting a wine shaped by time."
          : "O hedonismo celebra a experiência sensorial — a cor, o aroma, o sabor e a emoção de provar um vinho moldado pelo tempo."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "V — Memory" : "V — Memória"}>
        <p>{isEN
          ? "A visit should never disappear. At The 100's, you can seal your moment in time."
          : "Uma visita nunca deve desaparecer. No The 100's, podes selar o teu momento no tempo."}</p>
        <p>{isEN
          ? "Memory is the final pillar — the culmination of the journey. Your experience becomes a message for the future, encapsulated in a bottle."
          : "A memória é o pilar final — o culminar da jornada. A tua experiência torna-se uma mensagem para o futuro, encapsulada numa garrafa."}</p>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "Time — the ultimate creator of value; patience transforms everything",
        "Emotion — meaningful gifts carry stories, not just transactions",
        "Memory — the purpose of every product is to preserve a moment",
        "Five experiential stages: Discovery, Time, Singularity, Hedonism, Memory",
        "Our philosophy: Time deserves to be remembered — and remembered beautifully"
      ] : [
        "Tempo — o criador último de valor; a paciência transforma tudo",
        "Emoção — presentes significativos carregam histórias, não apenas transações",
        "Memória — o propósito de cada produto é preservar um momento",
        "Cinco etapas experienciais: Descoberta, Tempo, Singularidade, Hedonismo, Memória",
        "A nossa filosofia: O tempo merece ser lembrado — e lembrado de forma bela"
      ]} />

      <QuizBlock moduleId="philosophy" questions={isEN ? [
        { question: "What are the three fundamental ideas of The 100's philosophy?", options: ["Design, Craft, Heritage", "Time, Emotion, Memory", "Discovery, Hedonism, Singularity", "Wine, Place, Culture"], correct: 1 },
        { question: "Which pillar celebrates the sensory experience of taste and color?", options: ["Singularity", "Hedonism", "Discovery", "Time"], correct: 1 },
      ] : [
        { question: "Quais são as três ideias fundamentais da filosofia do The 100's?", options: ["Design, Craft, Heritage", "Tempo, Emoção, Memória", "Descoberta, Hedonismo, Singularidade", "Vinho, Lugar, Cultura"], correct: 1 },
        { question: "Qual pilar celebra a experiência sensorial do sabor e da cor?", options: ["Singularidade", "Hedonismo", "Descoberta", "Tempo"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Which of the three fundamental ideas (Time, Emotion, Memory) resonates most with you, and why?",
        "How would you communicate the philosophy of The 100's to a visitor in a single sentence?"
      ] : [
        "Qual das três ideias fundamentais (Tempo, Emoção, Memória) ressoa mais contigo, e porquê?",
        "Como comunicarias a filosofia do The 100's a um visitante numa única frase?"
      ]} />
    </ModuleLayout>
  );
};

export default ModulePhilosophy;
