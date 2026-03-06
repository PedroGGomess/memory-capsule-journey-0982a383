import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, QuizBlock, ReflectionBlock } from "@/components/ModuleComponents";
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

    <ContentBlock title="A Memory Capsule">
      <p>At the heart of The 100's lies one concept: the Memory Capsule.</p>
      <p>Visitors do not simply buy wine. They take home a moment — a memory — a story — a legacy, encapsulated in 100ml of Port wine.</p>
      <p>Each bottle represents centuries of patience, transformed into a single, precious capsule of time.</p>
    </ContentBlock>

    <ContentBlock title="400 Years of Heritage">
      <p>Port wine is one of the world's most historic and cherished wines. Its story begins in the steep terraces of the Douro Valley, where generations of winemakers have perfected their craft.</p>
      <p>The 100's honors this legacy by condensing centuries of tradition into a modern, premium experience that speaks to today's traveler.</p>
    </ContentBlock>

    <ImageBlock src={douroImg} alt="Douro Valley" caption="The Douro Valley — birthplace of Port wine" />

    <KeyTakeaway items={[
      "The 100's transforms a visit into an eternal memory",
      "The core concept is the Memory Capsule — 100ml of history",
      "The brand draws from 400+ years of Port wine heritage",
      "Visitors take home a moment in time, not just a product"
    ]} />

    <QuizBlock moduleId="story" questions={[
      { question: "What is the core concept of The 100's?", options: ["A wine shop", "A Memory Capsule", "A restaurant", "A museum"], correct: 1 },
      { question: "How many years of Port wine heritage inspires the brand?", options: ["100 years", "200 years", "400 years", "50 years"], correct: 2 },
    ]} />

    <ReflectionBlock questions={[
      "How would you describe The 100's concept to a friend in one sentence?",
      "What does 'taking home a memory' mean to you?"
    ]} />
  </ModuleLayout>
);

export default ModuleStory;
