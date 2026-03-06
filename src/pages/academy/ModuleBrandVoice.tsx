import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock } from "@/components/ModuleComponents";
import hedonismImg from "@/assets/hedonism.jpg";

const ModuleBrandVoice = () => (
  <ModuleLayout
    moduleId="brand-voice"
    moduleNumber={6}
    title="Brand Voice"
    subtitle="The tone, the words, the feeling."
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

    <ContentBlock title="Brand Phrases">
      <p>Here are examples of how to communicate the brand essence:</p>
    </ContentBlock>

    <div className="space-y-4">
      {[
        "We encapsulate memories.",
        "This is not just wine. It is a moment in time.",
        "100ml of history, sealed for the future.",
        "Time reveals true value.",
        "Take home a capsule of time.",
        "Help visitors bottle a memory."
      ].map(phrase => (
        <div key={phrase} className="border-l-2 border-primary/30 pl-6 py-2">
          <p className="text-foreground/80 font-light italic text-lg">"{phrase}"</p>
        </div>
      ))}
    </div>

    <ExpandableSection title="What NOT to say">
      <p>Avoid transactional language. Never say "buy", "purchase", or "product" when speaking to visitors.</p>
      <p>Instead of "Would you like to buy a bottle?", say "Would you like to take a memory home?"</p>
      <p>Instead of "This costs €X", say "This capsule carries X years of history."</p>
    </ExpandableSection>

    <ExpandableSection title="Adapting to the visitor">
      <p>Every visitor is unique. Observe and adapt. Some visitors want details and history. Others want a quiet, contemplative experience. Read the moment, and respond accordingly.</p>
      <p>Your role is not simply to sell a product. Your role is to help visitors bottle a memory.</p>
    </ExpandableSection>

    <KeyTakeaway items={[
      "Sophisticated — heritage, craftsmanship, cultural value",
      "Minimal — concise, elegant, never over-explain",
      "Emotional — evoke memory and discovery",
      "Timeless — permanence and legacy over trends",
      "Never use transactional language; speak about memories, not products"
    ]} />

    <ReflectionBlock questions={[
      "Practice: How would you introduce The 100's to a visitor using all four principles in three sentences?",
      "What words would you avoid? What words would you embrace?"
    ]} />
  </ModuleLayout>
);

export default ModuleBrandVoice;
