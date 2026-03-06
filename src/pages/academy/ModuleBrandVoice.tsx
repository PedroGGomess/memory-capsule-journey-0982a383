import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock } from "@/components/ModuleComponents";
import hedonismImg from "@/assets/hedonism.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const ModuleBrandVoice = () => (
  <ModuleLayout
    moduleId="brand-voice"
    moduleNumber={6}
    title="Brand Voice & Identity"
    subtitle="The tone, the words, the feeling — and the visual language behind it all."
    heroImage={hedonismImg}
  >
    <ContentBlock title="Four Communication Principles">
      <p>The communication of The 100's follows four core principles. Every message, every conversation, every interaction should reflect these values.</p>
    </ContentBlock>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { tone: "Sophisticated", desc: "The tone reflects heritage, craftsmanship and cultural value. We speak with authority and elegance." },
        { tone: "Minimal", desc: "Luxury communication is concise and elegant. We never over-explain. We trust the product to speak." },
        { tone: "Emotional", desc: "Every message should evoke memory and discovery. We speak to the heart, not just the mind." },
        { tone: "Timeless", desc: "The brand speaks about permanence and legacy rather than trends. Our story has no expiry date." },
      ].map(item => (
        <div key={item.tone} className="border border-border/30 p-6">
          <p className="text-lg font-light text-primary mb-2">{item.tone}</p>
          <p className="text-sm text-foreground/60 font-light leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    <ContentBlock title="Brand Slogans">
      <p>The 100's operates with a set of core slogans that distil the brand's philosophy into a single line. These are used across all communications:</p>
    </ContentBlock>

    <div className="space-y-4">
      {[
        { slogan: "Gifts shaped by time", note: "Primary slogan — connects the gift format to the passage of time." },
        { slogan: "Gifts made present", note: "Dual meaning: a gift given now, and the act of making time feel present." },
        { slogan: "Locked Memories", note: "Evokes the seal of the bottle, the memory preserved inside." },
        { slogan: "Time deserves to be remembered — and remembered beautifully.", note: "The philosophical manifesto of the brand." },
      ].map(item => (
        <ScrollReveal key={item.slogan}>
          <div className="border-l-2 border-primary/30 pl-6 py-3">
            <p className="text-foreground/80 font-light italic text-lg">"{item.slogan}"</p>
            <p className="text-xs text-muted-foreground/50 mt-1">{item.note}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ContentBlock title="Brand Phrases for Team Use">
      <p>Use these in conversations with visitors to authentically communicate the brand essence:</p>
    </ContentBlock>

    <div className="space-y-4">
      {[
        "We encapsulate memories.",
        "This is not just wine. It is a moment in time.",
        "100ml of history, sealed for the future.",
        "Time reveals true value.",
        "Take home a capsule of time.",
        "Help visitors bottle a memory.",
      ].map(phrase => (
        <div key={phrase} className="border-l-2 border-primary/30 pl-6 py-2">
          <p className="text-foreground/80 font-light italic text-lg">"{phrase}"</p>
        </div>
      ))}
    </div>

    <ContentBlock title="Visual Identity — Colours">
      <p>The institutional colour palette of The 100's is built around two anchoring tones:</p>
    </ContentBlock>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ScrollReveal>
        <div className="border border-border/30 p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-sm shrink-0 bg-black border border-border/30" />
          <div>
            <p className="text-lg font-light text-foreground/90">Pantone Black</p>
            <p className="text-sm text-muted-foreground font-light">The anchor of the brand — depth, elegance, timelessness.</p>
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="border border-border/30 p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-sm shrink-0" style={{ backgroundColor: "#A8872D" }} />
          <div>
            <p className="text-lg font-light text-foreground/90">Pantone 871C — Gold</p>
            <p className="text-sm text-muted-foreground font-light">The spirit of the brand — heritage, luxury, warmth. The colour of aged Port wine.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>

    <ContentBlock>
      <p className="text-sm text-foreground/60 font-light">While Black and Gold are the institutional constants, the brand allows flexibility in chromatic expression and textures across different collections and editions.</p>
    </ContentBlock>

    <ContentBlock title="Visual Identity — Typography">
      <p>The 100's uses <strong>Aller</strong> as its primary narrative typeface, available in three weights:</p>
    </ContentBlock>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { weight: "Aller Light", use: "Long-form text, poetic narrative, product descriptions" },
        { weight: "Aller Regular", use: "General communications, body copy, UI elements" },
        { weight: "Aller Bold", use: "Headlines, key phrases, emphasis points" },
      ].map(item => (
        <div key={item.weight} className="border border-border/30 p-5">
          <p className="text-primary font-light text-lg mb-2">{item.weight}</p>
          <p className="text-xs text-muted-foreground font-light">{item.use}</p>
        </div>
      ))}
    </div>

    <ContentBlock>
      <p className="text-sm text-foreground/60 font-light">The logo uses a modern geometric sans-serif with subtle serif support — fusing classical legacy with contemporary precision. The geometry of "100", "the" and "S" is constant and inviolable — it is the visual symbol of an experience that spans centuries.</p>
    </ContentBlock>

    <ExpandableSection title="What NOT to say">
      <p>Avoid transactional language. Never say "buy", "purchase", or "product" when speaking to visitors.</p>
      <p>Instead of "Would you like to buy a bottle?", say "Would you like to take a memory home?"</p>
      <p>Instead of "This costs €X", say "This capsule carries X years of history."</p>
      <p>The brand does not sell wine — it sells legacy. Every word should reflect this.</p>
    </ExpandableSection>

    <ExpandableSection title="Adapting to the visitor">
      <p>Every visitor is unique. Observe and adapt. Some visitors want details and history. Others want a quiet, contemplative experience. Read the moment, and respond accordingly.</p>
      <p>Your role is not simply to sell a product. Your role is to help visitors bottle a memory.</p>
    </ExpandableSection>

    <KeyTakeaway items={[
      "Four principles: Sophisticated, Minimal, Emotional, Timeless",
      "Three core slogans: 'Gifts shaped by time', 'Gifts made present', 'Locked Memories'",
      "Institutional colours: Pantone Black + Pantone 871C (Gold)",
      "Primary typeface: Aller (Light, Regular, Bold)",
      "Logo geometry (100, the, S) is constant and inviolable",
      "Never use transactional language; speak about memories, not products"
    ]} />

    <ReflectionBlock questions={[
      "Practice: How would you introduce The 100's to a visitor using all four principles in three sentences?",
      "Which of the three slogans best captures the brand for you, and why?",
      "What words would you avoid? What words would you embrace?"
    ]} />
  </ModuleLayout>
);

export default ModuleBrandVoice;
