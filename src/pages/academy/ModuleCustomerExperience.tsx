import { ModuleLayout, ContentBlock, KeyTakeaway, ReflectionBlock, QuizBlock } from "@/components/ModuleComponents";
import storeImg from "@/assets/store-interior.jpg";

const ModuleCustomerExperience = () => (
  <ModuleLayout
    moduleId="customer-experience"
    moduleNumber={7}
    title="The Customer Experience"
    subtitle="Every interaction is part of the story."
    heroImage={storeImg}
  >
    <ContentBlock title="You Are a Storyteller">
      <p>As a member of The 100's team, your role is not to sell. Your role is to guide visitors through a story — the story of time, memory and legacy.</p>
      <p>Every interaction should feel personal, thoughtful and unhurried.</p>
    </ContentBlock>

    <ContentBlock title="The Three Principles">
      <p>Every visitor interaction follows three guiding principles:</p>
    </ContentBlock>

    <div className="space-y-6">
      {[
        { principle: "Storytelling", desc: "Share the brand story naturally. Let the heritage speak. Connect the visitor to the history and emotion behind each bottle." },
        { principle: "Emotion", desc: "Create a feeling, not a transaction. Ask about their journey. Listen. Connect the wine to their personal experience." },
        { principle: "Experience", desc: "Make the visit memorable. The tasting, the presentation, the farewell — every moment is part of the capsule." },
      ].map(p => (
        <div key={p.principle} className="border border-border/30 p-6">
          <p className="text-lg font-light text-primary mb-2">{p.principle}</p>
          <p className="text-foreground/60 font-light text-sm">{p.desc}</p>
        </div>
      ))}
    </div>

    <ContentBlock title="Guiding the Journey">
      <p>Think of yourself as a museum guide, not a shop assistant. You are taking visitors on a journey through time. Walk slowly. Speak gently. Let silence do its work.</p>
    </ContentBlock>

    <KeyTakeaway items={[
      "You are a storyteller, not a salesperson",
      "Three principles: Storytelling, Emotion, Experience",
      "Every interaction should feel personal and unhurried",
      "Think museum guide, not shop assistant"
    ]} />

    <QuizBlock moduleId="customer-experience" questions={[
      { question: "What is your primary role as a team member?", options: ["Salesperson", "Cashier", "Storyteller", "Manager"], correct: 2 },
      { question: "Which of these is NOT one of the three principles?", options: ["Storytelling", "Efficiency", "Emotion", "Experience"], correct: 1 },
    ]} />

    <ReflectionBlock questions={["Describe how you would guide a visitor from the moment they enter to the moment they leave."]} />
  </ModuleLayout>
);

export default ModuleCustomerExperience;
