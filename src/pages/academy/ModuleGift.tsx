import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, ReflectionBlock } from "@/components/ModuleComponents";
import giftImg from "@/assets/gift-packaging.jpg";
import ScrollReveal from "@/components/ScrollReveal";

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

    <ExpandableSection title="Wood (Oak & Walnut)">
      <p>Wood evokes the barrels where Port wine ages for decades. Oak brings warmth, history and a sense of timelessness. Walnut adds a darker, more luxurious character — the ultimate expression of premium craftsmanship.</p>
    </ExpandableSection>

    <ExpandableSection title="Ceramic">
      <p>Ceramic adds an artisanal, museum-quality feel. It bridges tradition and modernity — rough and refined in equal measure.</p>
    </ExpandableSection>

    <ExpandableSection title="Brass & Pewter">
      <p>Metal accents — brass or pewter — elevate the most prestigious editions. They speak of permanence, weight and value, turning the packaging into a luxury object in its own right.</p>
    </ExpandableSection>

    <ExpandableSection title="Neodymium Magnets">
      <p>All cubic and cylindrical formats use neodymium magnet closures — between 6 and 8 high-strength magnets per box. The satisfying, precise snap of the opening mechanism signals quality before the bottle is even seen.</p>
    </ExpandableSection>

    <ContentBlock title="Packaging Models & Price Guide">
      <p>The 100's packaging ranges from accessible entry-level gifts to ultra-luxury collectible cases. Each tier is designed to match the age and rarity of the wine inside.</p>
    </ContentBlock>

    <div className="space-y-4">
      {[
        {
          name: "Entry Gift",
          desc: "Kraft/cardboard box with a latch closure. Simple, elegant, accessible.",
          price: "From €19.99",
          range: "Young / Ruby Essentials",
        },
        {
          name: "Cylinder — Two Caps",
          desc: "Ceramic body with cork top caps. A timeless cylindrical design.",
          price: "Wine 10yr from €29.99 · Olive Oil from €34.99",
          range: "Signature (10yr) · Olive Oil",
        },
        {
          name: "Cylinder — Full Cork",
          desc: "Fully cork-clad cylinder. Natural, tactile, warm.",
          price: "Wine 10yr from €49.99 · Olive Oil from €54.99",
          range: "Signature (10yr) · Olive Oil",
        },
        {
          name: "Cube / Square — Two Caps",
          desc: "Ceramic body with cork top and base. Geometric precision meets natural warmth.",
          price: "Wine 10yr from €69.99 · Olive Oil from €74.99",
          range: "Signature (10yr) · Olive Oil",
        },
        {
          name: "Cube — Full Cork",
          desc: "Fully cork-clad cube with neodymium magnets. From Signature to The Icon.",
          price: "Wine 10yr from €99.99 — up to €275 (50yr The Icon)",
          range: "Signature · Legacy · The Icon",
        },
        {
          name: "Cube — Oak Wood (Dark/Natural) + Cork/Brass",
          desc: "Premium oak wood cube with cork or brass accents. Ideal for Legacy and Very Very Old editions.",
          price: "Legacy (30yr) from €230 — up to €1,000 (Very Very Old)",
          range: "Legacy · The Icon · The Hundred",
        },
        {
          name: "Cube — Walnut Wood + Brass",
          desc: "The most prestigious format. Walnut and brass — the pinnacle of The 100's collection.",
          price: "Up to €1,000 (top editions)",
          range: "The Icon · The Hundred",
        },
      ].map(pkg => (
        <ScrollReveal key={pkg.name}>
          <div className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <h4 className="text-lg font-light text-primary">{pkg.name}</h4>
              <span className="text-xs tracking-[0.15em] uppercase text-primary/60 border border-primary/20 px-3 py-1">{pkg.price}</span>
            </div>
            <p className="text-sm text-foreground/70 font-light mb-2">{pkg.desc}</p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/50">Range: {pkg.range}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ContentBlock title="Ultra-Luxury Outer Packaging">
      <p>For The Icon (50yr) and The Hundred (Very Very Old / 100yr) editions, there is an optional ultra-luxury outer case:</p>
      <ul className="list-disc list-inside space-y-1 text-foreground/70 font-light text-sm mt-3">
        <li>Compact cardboard construction with gold metalised foil coating</li>
        <li>Deep-embossed relief stamping</li>
        <li>Wooden base with a shell-style opening mechanism</li>
      </ul>
      <p className="mt-3">This outer case transforms the unboxing into a ritual — the ultimate expression of time and luxury.</p>
    </ContentBlock>

    <ContentBlock title="The Importance of Presentation">
      <p>How a gift is presented is as important as what's inside. The unboxing moment should feel ceremonial — a quiet, beautiful experience that mirrors the brand's philosophy of time and care.</p>
    </ContentBlock>

    <KeyTakeaway items={[
      "The 100's sells premium gifts, not just wine",
      "Materials include cork, ceramic, oak wood, walnut, brass and pewter",
      "Seven packaging tiers from €19.99 (Entry Gift) to €1,000 (Very Very Old editions)",
      "Neodymium magnet closures (6–8 magnets) on cube and cylinder formats",
      "Ultra-luxury outer packaging available for The Icon and The Hundred editions",
      "The unboxing moment must feel ceremonial and special"
    ]} />

    <ReflectionBlock questions={[
      "Think of a gift you received that felt truly special. What made the experience memorable?",
      "How can you convey the gift concept — and the pricing range — when speaking to visitors?",
      "A visitor asks about the difference between the Cube Cork and the Oak Cube. How would you explain it?"
    ]} />
  </ModuleLayout>
);

export default ModuleGift;
