import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ReflectionBlock, QuizBlock } from "@/components/ModuleComponents";
import storeImg from "@/assets/store-interior.jpg";

const ModuleStore = () => (
  <ModuleLayout
    moduleId="store"
    moduleNumber={5}
    title="The Store Experience"
    subtitle="The store is a time capsule. Visitors enter another world."
    heroImage={storeImg}
  >
    <ContentBlock title="A Time Capsule, Not a Shop">
      <p>When visitors enter The 100's, they should feel like they are stepping into a different dimension of time. The store is not a retail space — it is an immersive experience.</p>
      <p>Think of it as a gallery, a museum, a memory vault. Every detail — light, sound, material, scent — is carefully curated to create a moment of contemplation.</p>
    </ContentBlock>

    <ImageBlock src={storeImg} alt="Store interior" caption="The store experience — museum meets time capsule" />

    <ContentBlock title="The Emotional Journey">
      <p>Every visitor goes through four emotional stages:</p>
    </ContentBlock>

    <div className="space-y-6">
      {[
        { stage: "Discovery", desc: "The first impression. Curiosity is awakened. The space invites exploration." },
        { stage: "Contemplation", desc: "The visitor slows down. They absorb the atmosphere, the story, the heritage." },
        { stage: "Emotion", desc: "A connection forms. The visitor feels something — wonder, nostalgia, inspiration." },
        { stage: "Memory", desc: "The visitor chooses to take a piece of this moment home. The memory is sealed." },
      ].map((s, i) => (
        <div key={s.stage} className="flex gap-6 items-start">
          <span className="text-3xl font-light text-primary/30">{i + 1}</span>
          <div>
            <p className="text-lg font-light text-primary mb-1">{s.stage}</p>
            <p className="text-foreground/60 font-light text-sm">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <KeyTakeaway items={[
      "The store is a time capsule, not a traditional shop",
      "Four stages: Discovery, Contemplation, Emotion, Memory",
      "Every detail is curated for atmosphere and feeling",
      "Visitors should feel they are entering another world"
    ]} />

    <QuizBlock moduleId="store" questions={[
      { question: "What is the correct order of the emotional journey?", options: [
        "Emotion, Memory, Discovery, Contemplation",
        "Discovery, Contemplation, Emotion, Memory",
        "Memory, Discovery, Emotion, Contemplation",
        "Contemplation, Discovery, Memory, Emotion"
      ], correct: 1 },
    ]} />

    <ReflectionBlock questions={["Describe a time you entered a space that made you feel something special. What elements created that feeling?"]} />
  </ModuleLayout>
);

export default ModuleStore;
