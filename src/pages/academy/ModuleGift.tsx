import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, ReflectionBlock } from "@/components/ModuleComponents";
import giftImg from "@/assets/gift-packaging.jpg";

const ModuleGift = () => (
  <ModuleLayout
    moduleId="gift"
    moduleNumber={4}
    title="The Premium Gift Concept"
    subtitle="We don't sell wine. We sell premium gifts."
    heroImage={giftImg}
  >
    <ContentBlock title="Beyond Wine">
      <p>The 100's is not simply selling wine. It is creating premium gifts that encapsulate time, memory and meaning.</p>
      <p>Every bottle is a gift — to yourself, to someone you love, to the future. The packaging and presentation must reflect this philosophy.</p>
    </ContentBlock>

    <ImageBlock src={giftImg} alt="Premium packaging" caption="Premium materials elevate the experience" />

    <ContentBlock title="Materials & Craft">
      <p>The choice of materials is deliberate. Every element of the packaging tells a story:</p>
    </ContentBlock>

    <ExpandableSection title="Cork">
      <p>Cork is native to Portugal and deeply connected to the wine tradition. It represents authenticity, nature, and the Portuguese identity that runs through The 100's.</p>
    </ExpandableSection>

    <ExpandableSection title="Wood">
      <p>Wood evokes the barrels where Port wine ages for decades. It brings warmth, craft, and a sense of timelessness to the presentation.</p>
    </ExpandableSection>

    <ExpandableSection title="Ceramic">
      <p>Ceramic adds an artisanal, museum-quality feel. It bridges tradition and modernity — rough and refined in equal measure.</p>
    </ExpandableSection>

    <ExpandableSection title="Premium Boxes">
      <p>The presentation boxes are designed to feel like opening a treasure. Each box is crafted to protect, present, and elevate the bottle inside.</p>
    </ExpandableSection>

    <ContentBlock title="The Importance of Presentation">
      <p>How a gift is presented is as important as what's inside. The unboxing moment should feel ceremonial — a quiet, beautiful experience that mirrors the brand's philosophy of time and care.</p>
    </ContentBlock>

    <KeyTakeaway items={[
      "The 100's sells premium gifts, not just wine",
      "Materials include cork, wood, ceramic and premium boxes",
      "Packaging is part of the experience and brand story",
      "The unboxing moment must feel ceremonial and special"
    ]} />

    <ReflectionBlock questions={[
      "Think of a gift you received that felt truly special. What made the experience memorable?",
      "How can you convey the gift concept when speaking to visitors?"
    ]} />
  </ModuleLayout>
);

export default ModuleGift;
