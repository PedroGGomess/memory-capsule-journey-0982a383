import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ReflectionBlock, QuizBlock } from "@/components/ModuleComponents";
import storeImg from "@/assets/store-interior.jpg";
import ScrollReveal from "@/components/ScrollReveal";

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

    <ContentBlock title="The Six-Zone Customer Journey">
      <p>The store is divided into six distinct zones, each designed to move the visitor through a specific emotional state — from first impression to lasting memory.</p>
    </ContentBlock>

    <div className="space-y-8">
      {[
        {
          num: "01",
          zone: "Shop Window — Captação",
          emoji: "🪟",
          desc: "The first contact with the brand happens before visitors even enter the store.",
          details: [
            "A monumental glass ampoule in the window slowly releases wine drop by drop — a dramatic contrast with the fast pace of tourists on the street.",
            "A single 100ml bottle sits on a lit central podium, bathed in a single focused beam of light.",
            "The message is immediate and wordless: time moves differently here.",
          ],
        },
        {
          num: "02",
          zone: "Entrance — Exploração",
          emoji: "🏔️",
          desc: "The visitor steps inside and enters the Douro Valley.",
          details: [
            "The entrance uses stone blocks styled after the terraced slopes of the Douro Valley.",
            "Unstable ceiling elements create a sense of drama and wonder.",
            "Glass ampoules filled with wine in rich Ruby, Tawny and White tones hang from above, each illuminated in precise detail.",
            "The geography and terroir of Port wine production are rendered in physical space.",
          ],
        },
        {
          num: "03",
          zone: "Tasting — Experimentação",
          emoji: "🍬",
          desc: "The tasting experience breaks with tradition to create a vivid, unforgettable sensory memory.",
          details: [
            "Rather than a conventional glass of wine, the tasting is presented as intense gummies, gelatin, or small concentrated cubes and lollipops infused with the essence and flavour of the wine.",
            "The format creates a fast but deeply vivid memory — a sensory imprint that visitors carry long after they leave.",
            "This unexpected format sparks conversation, wonder and engagement.",
          ],
        },
        {
          num: "04",
          zone: "Memory Zone — Envolvimento",
          emoji: "💌",
          desc: "The emotional centrepiece of the store.",
          details: [
            "A large glass tube at the centre of the store contains suspended messages and memories from previous visitors.",
            "Visitors approach a screen and type a 'note to the future' — a personal message, a thought, a wish.",
            "The message is virtually 'sucked' into the tube, receiving an exact temporal seal: day, hour and second.",
            "Exactly one year later, the visitor receives an SMS or WhatsApp message reminding them of their visit — and offering a discount for a new purchase.",
            "This transforms a one-time visit into a lasting relationship between visitor and brand.",
          ],
        },
        {
          num: "05",
          zone: "Personalisation — Personalização",
          emoji: "⌚",
          desc: "The visitor makes the product uniquely theirs.",
          details: [
            "A gallery-style area, brightly lit, where bottles are physically personalised on the spot.",
            "The visitor engraves a 'Time Stamp' directly onto the bottle: the exact date and time of a personal memory, or the moment of their visit.",
            "The result is a bottle that is unique in the world — sealed at a specific second in time.",
          ],
        },
        {
          num: "06",
          zone: "Purchase & Farewell — Compra",
          emoji: "✨",
          desc: "The final act — a moment of quiet theatre.",
          details: [
            "The purchase area is a visual sanctuary: ordered, golden-lit, surrounded by the full collection.",
            "As the visitor moves toward the exit, a phrase is revealed in the floor — visible only from the perfect angle, under a hidden spotlight:",
            '"In your hands is a piece of time. At the end, what you do with it becomes the memory. See you next time..."',
            "The farewell is not a goodbye. It is an invitation to return.",
          ],
        },
      ].map(zone => (
        <ScrollReveal key={zone.num}>
          <div className="border border-border/30 overflow-hidden">
            <div className="flex items-center gap-6 px-8 py-6 border-b border-border/20 bg-card/20">
              <span className="text-3xl font-light text-primary/20 shrink-0">{zone.num}</span>
              <div>
                <p className="text-lg font-light text-primary">{zone.zone}</p>
                <p className="text-sm text-foreground/50 font-light italic mt-0.5">{zone.desc}</p>
              </div>
            </div>
            <div className="px-8 py-6 space-y-3">
              {zone.details.map((detail, i) => (
                <p key={i} className={`text-sm font-light leading-relaxed ${detail.startsWith('"') ? "text-primary/70 italic text-base" : "text-foreground/60"}`}>{detail}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ContentBlock title="Why the Experience Matters">
      <p>Every element of the store is designed with purpose. The drip of wine in the window, the scent in the entrance, the unexpected tasting format, the personal message sealed in glass — each moment is engineered to create an emotional memory that lasts long after the visit.</p>
      <p>The store does not simply sell wine. It sells time. And the visitor leaves carrying a piece of it.</p>
    </ContentBlock>

    <KeyTakeaway items={[
      "Six distinct zones: Window, Entrance, Tasting, Memory Zone, Personalisation, Purchase",
      "The giant ampoule in the window creates a first impression before visitors even enter",
      "The Memory Zone glass tube: visitors leave a note, receive an SMS reminder exactly 1 year later",
      "Tasting uses gummies, gelatin or lollipops — unexpected, memorable, sensory",
      "Personalisation engraves a unique Time Stamp directly onto the bottle",
      "Farewell inscription on the floor: visible only from the perfect angle under a hidden spotlight"
    ]} />

    <QuizBlock moduleId="store" questions={[
      {
        question: "What is visible in the shop window to attract visitors from the street?",
        options: [
          "A digital screen showing wine statistics",
          "A giant ampoule slowly releasing wine drop by drop",
          "A wall of product bottles",
          "A live tasting demonstration"
        ],
        correct: 1,
      },
      {
        question: "What happens exactly one year after a visitor leaves a message in the Memory Zone?",
        options: [
          "Their message appears on the brand's social media",
          "They receive a free bottle by post",
          "They receive an SMS or WhatsApp reminding them of the visit and offering a discount",
          "Their message is printed and framed"
        ],
        correct: 2,
      },
      {
        question: "What is the correct order of the six-zone customer journey?",
        options: [
          "Entrance, Window, Tasting, Purchase, Memory Zone, Personalisation",
          "Window, Entrance, Tasting, Memory Zone, Personalisation, Purchase",
          "Tasting, Entrance, Memory Zone, Window, Personalisation, Purchase",
          "Window, Tasting, Memory Zone, Entrance, Purchase, Personalisation"
        ],
        correct: 1,
      },
    ]} />

    <ReflectionBlock questions={[
      "Describe how you would guide a visitor through all six zones. What would you say at each stage?",
      "Why is the Memory Zone important for the long-term business strategy of The 100's?",
      "How does the unconventional tasting format reinforce the brand philosophy?"
    ]} />
  </ModuleLayout>
);

export default ModuleStore;
