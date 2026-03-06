import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock } from "@/components/ModuleComponents";
import collectionImg from "@/assets/collection.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const ModuleProducts = () => (
  <ModuleLayout
    moduleId="products"
    moduleNumber={3}
    title="The Products"
    subtitle="The wine collection and the collectible design portfolio."
    heroImage={collectionImg}
  >
    <ContentBlock title="100ml of History">
      <p>Every bottle in The 100's collection is a 100ml capsule of Port wine history. The format is deliberate — small enough to be a precious souvenir, significant enough to carry centuries of craft.</p>
      <p>Each product becomes a collectible piece that represents a moment, a place, a cultural story and an emotional experience.</p>
    </ContentBlock>

    <ImageBlock src={collectionImg} alt="The 100's Collection" caption="The curated collection" />

    <ContentBlock title="Wine Types">
      <p>The collection is organized into two main categories, each offering a distinct experience.</p>
    </ContentBlock>

    <ExpandableSection title="Tawny Wines">
      <p>Tawny Port wines are aged in wooden barrels, developing rich amber tones and complex flavors of caramel, dried fruit and spice. The longer they age, the more refined and precious they become.</p>
      <p>Tawny represents the essence of time — each year in the barrel adds depth, character and story.</p>
    </ExpandableSection>

    <ExpandableSection title="White Wines">
      <p>White Port wines offer a lighter, more delicate experience. Golden in color, they bring notes of honey, citrus and almonds. Aged White Ports develop extraordinary complexity.</p>
      <p>White wines show that elegance and power can coexist in a single glass.</p>
    </ExpandableSection>

    <ContentBlock title="Age Categories">
      <p>Each age represents a different depth of experience:</p>
    </ContentBlock>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { age: "Young", desc: "Fresh, vibrant, the beginning of the journey" },
        { age: "10 Years", desc: "The first evolution — complexity emerges" },
        { age: "30 Years", desc: "Deep maturity — a story told in layers" },
        { age: "50 Years", desc: "Rare and extraordinary — living history" },
        { age: "Very Very Old", desc: "The pinnacle — time itself, liquified" },
      ].map(item => (
        <div key={item.age} className="border border-border/30 p-5 hover:border-primary/30 transition-colors">
          <p className="text-primary font-light text-lg mb-1">{item.age}</p>
          <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
        </div>
      ))}
    </div>

    <ImageBlock src={bottleImg} alt="Premium bottle" caption="Each bottle carries its own story" />

    <ContentBlock title="Product Portfolio">
      <p>The 100's products are designed as collectible pieces. Each design combines aesthetic beauty with symbolic meaning. The containers are crafted to outlive the wine inside them.</p>
    </ContentBlock>

    <div className="space-y-4">
      {[
        {
          name: "Entry Gift",
          desc: "The starting point of the collection. A simple and elegant product that introduces visitors to the concept of the memory capsule.",
          materials: "Minimalist design, accessible price point",
        },
        {
          name: "Cylinder Collection",
          desc: "Elegant cylindrical designs combining ceramic and cork materials. These products balance minimalism with warmth and natural texture.",
          materials: "Ceramic · Cork",
        },
        {
          name: "Cube Collection",
          desc: "Modern geometric designs created for collectors. These pieces emphasize structure and visual presence.",
          materials: "Premium finish · Geometric form",
        },
        {
          name: "Wood & Brass Collection",
          desc: "The most premium collection, crafted with oak wood, walnut wood and brass elements. These designs express timeless luxury and craftsmanship.",
          materials: "Oak wood · Walnut wood · Brass elements",
        },
      ].map(product => (
        <ScrollReveal key={product.name}>
          <div className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500">
            <h4 className="text-lg font-light text-primary mb-2">{product.name}</h4>
            <p className="text-sm text-foreground/70 font-light mb-3">{product.desc}</p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/50">{product.materials}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ContentBlock title="The Second Life Concept">
      <p>Every product is designed to live beyond the wine. Once the bottle is opened, the container becomes a decorative object.</p>
      <p>This philosophy ensures that the product remains present in the customer's home long after the wine is consumed — the object continues to preserve the memory of the trip.</p>
    </ContentBlock>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {["Candle holder", "Jewelry holder", "Diffuser", "Decorative sculpture"].map(use => (
        <div key={use} className="border border-border/30 p-4 text-center">
          <p className="text-sm text-primary/80 font-light">{use}</p>
        </div>
      ))}
    </div>

    <KeyTakeaway items={[
      "Two main wine categories: Tawny and White Port wines",
      "Five age categories from Young to Very Very Old",
      "Four design collections: Entry Gift, Cylinder, Cube, Wood & Brass",
      "The Second Life Concept: containers become decorative objects after use",
      "At the center: 100ml of wine represents centuries of history"
    ]} />

    <QuizBlock moduleId="products" questions={[
      { question: "What volume is each bottle in The 100's collection?", options: ["50ml", "100ml", "200ml", "750ml"], correct: 1 },
      { question: "What are the two main wine categories?", options: ["Red and Rosé", "Tawny and White", "Sweet and Dry", "Young and Old"], correct: 1 },
      { question: "What is the Second Life Concept?", options: [
        "Bottles are refilled after use",
        "Old bottles are donated to museums",
        "The container becomes a decorative object after the wine is consumed",
        "Customers receive a second bottle for free"
      ], correct: 2 },
    ]} />
  </ModuleLayout>
);

export default ModuleProducts;
