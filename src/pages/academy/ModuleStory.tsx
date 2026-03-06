import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock, ReflectionBlock } from "@/components/ModuleComponents";
import heroDropImg from "@/assets/hero-drop.jpg";
import douroImg from "@/assets/douro-valley.jpg";

const ModuleStory = () => (
  <ModuleLayout
    moduleId="story"
    moduleNumber={1}
    title="The Story of The 100's"
    subtitle="Origin, concept, and 400 years of Port wine heritage."
    heroImage={douroImg}
  >
    <ContentBlock title="The Origin">
      <p>The 100's was born from a simple, powerful idea: that a visit should never disappear.</p>
      <p>In a world that moves too fast, The 100's creates a pause — a space where time stands still, and moments become eternal.</p>
      <p>Inspired by over 400 years of Port wine history, the brand transforms a simple visit into something extraordinary.</p>
    </ContentBlock>

    <ImageBlock src={heroDropImg} alt="Wine drop" caption="Every drop carries centuries of history" />

    <ContentBlock title="The Mission">
      <p>The mission of The 100's is not simply to sell traditional souvenirs. It is to "bottle" legacy, emotion and 400 years of Port wine history into a 100ml package.</p>
      <p>The ephemeral tourist experience is converted into something lasting: a <strong>Memory Capsule</strong> — an object that captures time, place and feeling.</p>
      <p className="italic text-primary/70">"We don't sell wine. We sell legacy."</p>
    </ContentBlock>

    <ContentBlock title="A Memory Capsule">
      <p>At the heart of The 100's lies one concept: the Memory Capsule.</p>
      <p>Visitors do not simply buy wine. They take home a moment — a memory — a story — a legacy, encapsulated in 100ml of Port wine.</p>
      <p>Each bottle represents centuries of patience, transformed into a single, precious capsule of time.</p>
    </ContentBlock>

    <ContentBlock title="THE HOUSE OF 100S">
      <p>The flagship store carries the designation <strong>THE HOUSE OF 100S</strong>, giving the brand a 'powerhouse' cultural dimension. It is not a shop — it is a destination, a cultural institution, a living monument to time.</p>
      <p>Every product in the house bears the designation <em>Port Wine Premium Gift</em> or <em>Port Wine Souvenir</em>, framing the purchase as a meaningful, elevated keepsake rather than a simple transaction.</p>
    </ContentBlock>

    <ContentBlock title="400 Years of Heritage">
      <p>Port wine is one of the world's most historic and cherished wines. Its story begins in the steep terraces of the Douro Valley, where generations of winemakers have perfected their craft.</p>
      <p>The 100's honors this legacy by condensing centuries of tradition into a modern, premium experience that speaks to today's traveler.</p>
    </ContentBlock>

    <ImageBlock src={douroImg} alt="Douro Valley" caption="The Douro Valley — birthplace of Port wine" />

    <ContentBlock title="The Five Sensory Pillars">
      <p>Every product and every interaction in The 100's is built around five sensory pillars:</p>
    </ContentBlock>

    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
      {[
        { pillar: "Discovery", desc: "The spark of curiosity" },
        { pillar: "Time", desc: "Patience made tangible" },
        { pillar: "Singularity", desc: "Every bottle, unique" },
        { pillar: "Hedonism", desc: "Pleasure becomes memory" },
        { pillar: "Memory", desc: "The visit sealed forever" },
      ].map(item => (
        <div key={item.pillar} className="border border-border/30 p-4 text-center">
          <p className="text-primary font-light mb-1">{item.pillar}</p>
          <p className="text-[11px] text-muted-foreground font-light">{item.desc}</p>
        </div>
      ))}
    </div>

    <ExpandableSection title="The Second Life Concept">
      <p>After the wine is consumed, the packaging does not become waste. The container begins a second life as a piece of home décor: a candle holder, a diffuser, a jewellery holder, a decorative sculpture.</p>
      <p>This philosophy ensures the brand lives permanently in the customer's home — long after they have returned from their trip. The object continues to preserve the memory of the journey.</p>
    </ExpandableSection>

    <KeyTakeaway items={[
      "The 100's transforms a visit into an eternal memory",
      "The core concept is the Memory Capsule — 100ml of history",
      "The flagship store is known as THE HOUSE OF 100S",
      "The brand draws from 400+ years of Port wine heritage",
      "Five sensory pillars: Discovery, Time, Singularity, Hedonism, Memory",
      "The Second Life Concept: packaging lives on as home décor after the wine is consumed"
    ]} />

    <QuizBlock moduleId="story" questions={[
      { question: "What is the core concept of The 100's?", options: ["A wine shop", "A Memory Capsule", "A restaurant", "A museum"], correct: 1 },
      { question: "How many years of Port wine heritage inspires the brand?", options: ["100 years", "200 years", "400 years", "50 years"], correct: 2 },
      { question: "What is the name of the flagship store designation?", options: ["THE WINE HOUSE", "THE HOUSE OF 100S", "THE MEMORY VAULT", "THE PORT HOUSE"], correct: 1 },
    ]} />

    <ReflectionBlock questions={[
      "How would you describe The 100's concept to a friend in one sentence?",
      "What does 'taking home a memory' mean to you?",
      "How would you explain the Second Life Concept to a visitor who has just purchased a bottle?"
    ]} />
  </ModuleLayout>
);

export default ModuleStory;
