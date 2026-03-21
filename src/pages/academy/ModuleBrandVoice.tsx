import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock, VideoBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import bottleCloseupImg from "@/assets/bottle-closeup.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const ModuleBrandVoice = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const principles = isEN ? [
    { tone: "Sophisticated", desc: "The tone reflects heritage, craftsmanship and cultural value. We speak with authority and elegance." },
    { tone: "Minimal", desc: "Luxury communication is concise and elegant. We never over-explain. We trust the product to speak." },
    { tone: "Emotional", desc: "Every message should evoke memory and discovery. We speak to the heart, not just the mind." },
    { tone: "Timeless", desc: "The brand speaks about permanence and legacy rather than trends. Our story has no expiry date." },
  ] : [
    { tone: "Sofisticado", desc: "O tom reflete herança, artesanato e valor cultural. Falamos com autoridade e elegância." },
    { tone: "Minimalista", desc: "A comunicação de luxo é concisa e elegante. Nunca explicamos em excesso. Confiamos no produto para falar." },
    { tone: "Emocional", desc: "Cada mensagem deve evocar memória e descoberta. Falamos ao coração, não apenas à mente." },
    { tone: "Intemporal", desc: "A marca fala de permanência e legado em vez de tendências. A nossa história não tem data de validade." },
  ];

  const slogans = isEN ? [
    { slogan: "Gifts shaped by time", note: "Primary slogan — connects the gift format to the passage of time." },
    { slogan: "Gifts made present", note: "Dual meaning: a gift given now, and the act of making time feel present." },
    { slogan: "Locked Memories", note: "Evokes the seal of the bottle, the memory preserved inside." },
    { slogan: "Time deserves to be remembered — and remembered beautifully.", note: "The philosophical manifesto of the brand." },
  ] : [
    { slogan: "Presentes moldados pelo tempo", note: "Slogan principal — liga o formato de presente à passagem do tempo." },
    { slogan: "Presentes tornados presentes", note: "Duplo significado: um presente dado agora, e o ato de tornar o tempo presente." },
    { slogan: "Memórias Seladas", note: "Evoca o selo da garrafa, a memória preservada dentro." },
    { slogan: "O tempo merece ser lembrado — e lembrado de forma bela.", note: "O manifesto filosófico da marca." },
  ];

  const phrases = isEN ? [
    "We encapsulate memories.",
    "This is not just wine. It is a moment in time.",
    "100ml of history, sealed for the future.",
    "Time reveals true value.",
    "Take home a capsule of time.",
    "Help visitors bottle a memory.",
  ] : [
    "Encapsulamos memórias.",
    "Isto não é apenas vinho. É um momento no tempo.",
    "100ml de história, selados para o futuro.",
    "O tempo revela o verdadeiro valor.",
    "Leva para casa uma cápsula de tempo.",
    "Ajuda os visitantes a engarrafar uma memória.",
  ];

  return (
    <ModuleLayout
      moduleId="brand-voice"
      moduleNumber={6}
      title={isEN ? "Brand Voice & Identity" : "Voz e Identidade da Marca"}
      subtitle={isEN ? "The tone, the words, the feeling — and the visual language behind it all." : "O tom, as palavras, o sentimento — e a linguagem visual por detrás de tudo."}
      heroImage={bottleCloseupImg}
    >
      <ContentBlock title={isEN ? "Four Communication Principles" : "Quatro Princípios de Comunicação"}>
        <p>{isEN
          ? "The communication of The 100's follows four core principles. Every message, every conversation, every interaction should reflect these values."
          : "A comunicação do The 100's segue quatro princípios fundamentais. Cada mensagem, cada conversa, cada interação deve refletir estes valores."}</p>
      </ContentBlock>

      <VideoBlock
        title="Voz da Marca"
        description="Como comunicamos — tom, linguagem e atitude."
        duration="7:30"
        poster={bottleCloseupImg}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {principles.map(item => (
          <div key={item.tone} className="border border-border/30 p-6">
            <p className="text-lg font-light text-primary mb-2">{item.tone}</p>
            <p className="text-sm text-foreground/60 font-light leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <ContentBlock title={isEN ? "Brand Slogans" : "Slogans da Marca"}>
        <p>{isEN
          ? "The 100's operates with a set of core slogans that distil the brand's philosophy into a single line. These are used across all communications:"
          : "O The 100's opera com um conjunto de slogans fundamentais que destilam a filosofia da marca numa única linha. Estes são usados em todas as comunicações:"}</p>
      </ContentBlock>

      <div className="space-y-4">
        {slogans.map(item => (
          <ScrollReveal key={item.slogan}>
            <div className="border-l-2 border-primary/30 pl-6 py-3">
              <p className="text-foreground/80 font-light italic text-lg">"{item.slogan}"</p>
              <p className="text-xs text-muted-foreground/50 mt-1">{item.note}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Brand Phrases for Team Use" : "Frases da Marca para Uso da Equipa"}>
        <p>{isEN
          ? "Use these in conversations with visitors to authentically communicate the brand essence:"
          : "Usa estas frases em conversas com visitantes para comunicar autenticamente a essência da marca:"}</p>
      </ContentBlock>

      <div className="space-y-4">
        {phrases.map(phrase => (
          <div key={phrase} className="border-l-2 border-primary/30 pl-6 py-2">
            <p className="text-foreground/80 font-light italic text-lg">"{phrase}"</p>
          </div>
        ))}
      </div>

      <ContentBlock title={isEN ? "Visual Identity — Colours" : "Identidade Visual — Cores"}>
        <p>{isEN
          ? "The institutional colour palette of The 100's is built around two anchoring tones:"
          : "A paleta de cores institucional do The 100's é construída em torno de dois tons fundamentais:"}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ScrollReveal>
          <div className="border border-border/30 p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-sm shrink-0 bg-black border border-border/30" />
            <div>
              <p className="text-lg font-light text-foreground/90">Pantone Black</p>
              <p className="text-sm text-muted-foreground font-light">{isEN ? "The anchor of the brand — depth, elegance, timelessness." : "A âncora da marca — profundidade, elegância, atemporalidade."}</p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-border/30 p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-sm shrink-0" style={{ backgroundColor: "#A8872D" }} />
            <div>
              <p className="text-lg font-light text-foreground/90">Pantone 871C — {isEN ? "Gold" : "Ouro"}</p>
              <p className="text-sm text-muted-foreground font-light">{isEN ? "The spirit of the brand — heritage, luxury, warmth. The colour of aged Port wine." : "O espírito da marca — herança, luxo, calor. A cor do Vinho do Porto envelhecido."}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ContentBlock title={isEN ? "Visual Identity — Typography" : "Identidade Visual — Tipografia"}>
        <p>{isEN
          ? "The 100's uses Aller as its primary narrative typeface, available in three weights:"
          : "O The 100's usa Aller como tipografia narrativa principal, disponível em três pesos:"}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { weight: "Aller Light", use: isEN ? "Long-form text, poetic narrative, product descriptions" : "Texto longo, narrativa poética, descrições de produtos" },
          { weight: "Aller Regular", use: isEN ? "General communications, body copy, UI elements" : "Comunicações gerais, corpo de texto, elementos de UI" },
          { weight: "Aller Bold", use: isEN ? "Headlines, key phrases, emphasis points" : "Títulos, frases-chave, pontos de ênfase" },
        ].map(item => (
          <div key={item.weight} className="border border-border/30 p-5">
            <p className="text-primary font-light text-lg mb-2">{item.weight}</p>
            <p className="text-xs text-muted-foreground font-light">{item.use}</p>
          </div>
        ))}
      </div>

      <ExpandableSection title={isEN ? "What NOT to say" : "O Que NÃO Dizer"}>
        <p>{isEN
          ? "Avoid transactional language. Never say \"buy\", \"purchase\", or \"product\" when speaking to visitors."
          : "Evita linguagem transacional. Nunca digas \"comprar\", \"adquirir\" ou \"produto\" ao falar com visitantes."}</p>
        <p>{isEN
          ? "Instead of \"Would you like to buy a bottle?\", say \"Would you like to take a memory home?\""
          : "Em vez de \"Gostaria de comprar uma garrafa?\", diz \"Gostaria de levar uma memória para casa?\""}</p>
        <p>{isEN
          ? "The brand does not sell wine — it sells legacy. Every word should reflect this."
          : "A marca não vende vinho — vende legado. Cada palavra deve refletir isto."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "Adapting to the visitor" : "Adaptar ao Visitante"}>
        <p>{isEN
          ? "Every visitor is unique. Observe and adapt. Some visitors want details and history. Others want a quiet, contemplative experience. Read the moment, and respond accordingly."
          : "Cada visitante é único. Observa e adapta-te. Alguns querem detalhes e história. Outros querem uma experiência tranquila e contemplativa. Lê o momento e responde em conformidade."}</p>
        <p>{isEN
          ? "Your role is not simply to sell a product. Your role is to help visitors bottle a memory."
          : "O teu papel não é simplesmente vender um produto. O teu papel é ajudar os visitantes a engarrafar uma memória."}</p>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "Four principles: Sophisticated, Minimal, Emotional, Timeless",
        "Three core slogans: 'Gifts shaped by time', 'Gifts made present', 'Locked Memories'",
        "Institutional colours: Pantone Black + Pantone 871C (Gold)",
        "Primary typeface: Aller (Light, Regular, Bold)",
        "Logo geometry (100, the, S) is constant and inviolable",
        "Never use transactional language; speak about memories, not products"
      ] : [
        "Quatro princípios: Sofisticado, Minimalista, Emocional, Intemporal",
        "Três slogans fundamentais: 'Presentes moldados pelo tempo', 'Presentes tornados presentes', 'Memórias Seladas'",
        "Cores institucionais: Pantone Black + Pantone 871C (Ouro)",
        "Tipografia principal: Aller (Light, Regular, Bold)",
        "A geometria do logótipo (100, the, S) é constante e inviolável",
        "Nunca usar linguagem transacional; falar de memórias, não de produtos"
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Practice: How would you introduce The 100's to a visitor using all four principles in three sentences?",
        "Which of the three slogans best captures the brand for you, and why?",
        "What words would you avoid? What words would you embrace?"
      ] : [
        "Prática: Como apresentarias o The 100's a um visitante usando os quatro princípios em três frases?",
        "Qual dos três slogans melhor captura a marca para ti, e porquê?",
        "Que palavras evitarias? Que palavras abraçarias?"
      ]} />
    </ModuleLayout>
  );
};

export default ModuleBrandVoice;
