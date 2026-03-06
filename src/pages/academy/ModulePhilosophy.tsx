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
    subtitle="The five pillars that define everything we do."
    heroImage={hourglassImg}
  >
    <ContentBlock>
      <p>The 100's brand philosophy is built on five interconnected pillars. Each represents a stage in the journey from curiosity to lasting memory.</p>
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
      <div className="mt-4">
        <img src={hourglassImg} alt="Time" className="w-full rounded-sm opacity-80" />
      </div>
    </ExpandableSection>

    <ExpandableSection title="III — Singularity">
      <p>Every liquid holds its own story. In silence, time transforms wine into something rare.</p>
      <p>Each drop becomes a fragment of history waiting to be discovered. No two bottles are the same — each carries a unique narrative shaped by decades of careful aging.</p>
      <div className="mt-4">
        <img src={bottleImg} alt="Singularity" className="w-full rounded-sm opacity-80" />
      </div>
    </ExpandableSection>

    <ExpandableSection title="IV — Hedonism">
      <p>Time dissolves into light, color and experience. Wine becomes pleasure. Pleasure becomes memory.</p>
      <p>Hedonism celebrates the sensory experience — the color, aroma, taste and emotion of tasting a wine shaped by time.</p>
      <div className="mt-4">
        <img src={hedonismImg} alt="Hedonism" className="w-full rounded-sm opacity-80" />
      </div>
    </ExpandableSection>

    <ExpandableSection title="V — Memory">
      <p>A visit should never disappear. At The 100's, you can seal your moment in time.</p>
      <p>Memory is the final pillar — the culmination of the journey. Your experience becomes a message for the future, encapsulated in a bottle.</p>
    </ExpandableSection>

    <KeyTakeaway items={[
      "Discovery — the spark of curiosity",
      "Time — patience transforms everything",
      "Singularity — every bottle is unique",
      "Hedonism — pleasure becomes memory",
      "Memory — sealing moments for the future"
    ]} />

    <QuizBlock moduleId="philosophy" questions={[
      { question: "What is the first pillar of The 100's philosophy?", options: ["Time", "Memory", "Discovery", "Hedonism"], correct: 2 },
      { question: "Which pillar celebrates the sensory experience?", options: ["Singularity", "Hedonism", "Discovery", "Time"], correct: 1 },
    ]} />

    <ReflectionBlock questions={["Which pillar resonates with you most? Why?"]} />
  </ModuleLayout>
);

export default ModulePhilosophy;
