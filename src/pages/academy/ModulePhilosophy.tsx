import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock, ReflectionBlock } from "@/components/ModuleComponents";
import hourglassImg from "@/assets/hourglass.jpg";
import heroDropImg from "@/assets/hero-drop.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";
import hedonismImg from "@/assets/hedonism.jpg";

const ModulePhilosophy = () => (
  <ModuleLayout
    moduleId="philosophy"
    moduleNumber={2}
    title="Brand Philosophy"
    subtitle="Three fundamental ideas that define everything we do."
    heroImage={hourglassImg}
  >
    <ContentBlock>
      <p>The philosophy of The 100's revolves around three fundamental ideas. Together, they form the foundation of every product, every interaction and every story we tell.</p>
      <p className="italic text-primary/70">Time deserves to be remembered — and remembered beautifully.</p>
    </ContentBlock>

    <div className="space-y-6">
      {[
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
      ].map((pillar, i) => (
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

    <ContentBlock title="The Five Pillars of Experience">
      <p>Beyond the three fundamental ideas, The 100's brand journey unfolds through five experiential stages that take every visitor from curiosity to lasting memory.</p>
    </ContentBlock>

    <ExpandableSection title="I — Discovery">
      <p>The first moment of time is discovery. In every journey there is a moment when curiosity meets history.</p>
      <p>Discovery is the spark — the beginning of something meaningful. At The 100's, that moment is revealed drop by drop.</p>
      <div className="mt-4">
        <img src={heroDropImg} alt="Discovery" className="w-full rounded-sm opacity-80" />
      </div>
    </ExpandableSection>

    <ExpandableSection title="II — Time">
      <p>Time is the substance that gives meaning. Here it pauses between memory and promise.</p>
      <p>Each bottle carries centuries of patience. Time doesn't rush — it reveals. The beauty of Port wine lies in what time has done to transform it.</p>
    </ExpandableSection>

    <ExpandableSection title="III — Singularity">
      <p>Every liquid holds its own story. In silence, time transforms wine into something rare.</p>
      <p>Each drop becomes a fragment of history waiting to be discovered. No two bottles are the same — each carries a unique narrative shaped by decades of careful aging.</p>
    </ExpandableSection>

    <ExpandableSection title="IV — Hedonism">
      <p>Time dissolves into light, color and experience. Wine becomes pleasure. Pleasure becomes memory.</p>
      <p>Hedonism celebrates the sensory experience — the color, aroma, taste and emotion of tasting a wine shaped by time.</p>
    </ExpandableSection>

    <ExpandableSection title="V — Memory">
      <p>A visit should never disappear. At The 100's, you can seal your moment in time.</p>
      <p>Memory is the final pillar — the culmination of the journey. Your experience becomes a message for the future, encapsulated in a bottle.</p>
    </ExpandableSection>

    <KeyTakeaway items={[
      "Time — the ultimate creator of value; patience transforms everything",
      "Emotion — meaningful gifts carry stories, not just transactions",
      "Memory — the purpose of every product is to preserve a moment",
      "Five experiential stages: Discovery, Time, Singularity, Hedonism, Memory",
      "Our philosophy: Time deserves to be remembered — and remembered beautifully"
    ]} />

    <QuizBlock moduleId="philosophy" questions={[
      { question: "What are the three fundamental ideas of The 100's philosophy?", options: ["Design, Craft, Heritage", "Time, Emotion, Memory", "Discovery, Hedonism, Singularity", "Wine, Place, Culture"], correct: 1 },
      { question: "Which pillar celebrates the sensory experience of taste and color?", options: ["Singularity", "Hedonism", "Discovery", "Time"], correct: 1 },
    ]} />

    <ReflectionBlock questions={[
      "Which of the three fundamental ideas (Time, Emotion, Memory) resonates most with you, and why?",
      "How would you communicate the philosophy of The 100's to a visitor in a single sentence?"
    ]} />
  </ModuleLayout>
);

export default ModulePhilosophy;
