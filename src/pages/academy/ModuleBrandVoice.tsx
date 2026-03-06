import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock } from "@/components/ModuleComponents";
import hedonismImg from "@/assets/hedonism.jpg";

const ModuleBrandVoice = () => (
  <ModuleLayout
    moduleId="brand-voice"
    moduleNumber={6}
    title="How to Talk About the Brand"
    subtitle="The tone, the words, the feeling."
    heroImage={hedonismImg}
  >
    <ContentBlock title="Tone of Voice">
      <p>The way we speak about The 100's is as important as the product itself. Our words should feel like the brand — minimal, poetic, calm, and deeply premium.</p>
    </ContentBlock>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {["Poetic", "Minimal", "Inspiring", "Calm", "Premium"].map(tone => (
        <div key={tone} className="border border-border/30 p-4 text-center">
          <p className="text-sm text-primary font-light">{tone}</p>
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
        "Take home a capsule of time."
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
    </ExpandableSection>

    <KeyTakeaway items={[
      "Our tone is poetic, minimal, inspiring, calm and premium",
      "Never use transactional language",
      "Speak about memories, not products",
      "Adapt your communication to each visitor"
    ]} />

    <ReflectionBlock questions={[
      "Practice: How would you introduce The 100's to a visitor in three sentences?",
      "What words would you avoid? What words would you embrace?"
    ]} />
  </ModuleLayout>
);

export default ModuleBrandVoice;
