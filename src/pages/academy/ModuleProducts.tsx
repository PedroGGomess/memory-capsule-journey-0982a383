import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock } from "@/components/ModuleComponents";
import collectionImg from "@/assets/collection.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";

const ModuleProducts = () => (
  <ModuleLayout
    moduleId="products"
    moduleNumber={3}
    title="The Products"
    subtitle="Understanding the wine collection and age categories."
    heroImage={collectionImg}
  >
    <ContentBlock title="100ml of History">
      <p>Every bottle in The 100's collection is a 100ml capsule of Port wine history. The format is deliberate — small enough to be a precious souvenir, significant enough to carry centuries of craft.</p>
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

    <KeyTakeaway items={[
      "Two main categories: Tawny and White Port wines",
      "Five age categories from Young to Very Very Old",
      "Each age represents a deeper level of time and craft",
      "The 100ml format makes each bottle a precious capsule"
    ]} />

    <QuizBlock moduleId="products" questions={[
      { question: "What volume is each bottle in The 100's collection?", options: ["50ml", "100ml", "200ml", "750ml"], correct: 1 },
      { question: "What are the two main wine categories?", options: ["Red and Rosé", "Tawny and White", "Sweet and Dry", "Young and Old"], correct: 1 },
    ]} />
  </ModuleLayout>
);

export default ModuleProducts;
