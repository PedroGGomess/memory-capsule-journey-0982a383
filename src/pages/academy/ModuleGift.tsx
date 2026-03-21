import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import giftImg from "@/assets/gift-packaging.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const ModuleGift = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const packages = isEN ? [
    { name: "Entry Gift", desc: "Kraft/cardboard box with a latch closure. Simple, elegant, accessible.", price: "From €19.99", range: "Young / Ruby Essentials" },
    { name: "Cylinder — Two Caps", desc: "Ceramic body with cork top caps. A timeless cylindrical design.", price: "Wine 10yr from €29.99 · Olive Oil from €34.99", range: "Signature (10yr) · Olive Oil" },
    { name: "Cylinder — Full Cork", desc: "Fully cork-clad cylinder. Natural, tactile, warm.", price: "Wine 10yr from €49.99 · Olive Oil from €54.99", range: "Signature (10yr) · Olive Oil" },
    { name: "Cube / Square — Two Caps", desc: "Ceramic body with cork top and base. Geometric precision meets natural warmth.", price: "Wine 10yr from €69.99 · Olive Oil from €74.99", range: "Signature (10yr) · Olive Oil" },
    { name: "Cube — Full Cork", desc: "Fully cork-clad cube with neodymium magnets. From Signature to The Icon.", price: "Wine 10yr from €99.99 — up to €275 (50yr The Icon)", range: "Signature · Legacy · The Icon" },
    { name: "Cube — Oak Wood (Dark/Natural) + Cork/Brass", desc: "Premium oak wood cube with cork or brass accents. Ideal for Legacy and Very Very Old editions.", price: "Legacy (30yr) from €230 — up to €1,000 (Very Very Old)", range: "Legacy · The Icon · The Hundred" },
    { name: "Cube — Walnut Wood + Brass", desc: "The most prestigious format. Walnut and brass — the pinnacle of The 100's collection.", price: "Up to €1,000 (top editions)", range: "The Icon · The Hundred" },
  ] : [
    { name: "Entry Gift", desc: "Caixa de kraft/cartão com fecho. Simples, elegante, acessível.", price: "A partir de €19,99", range: "Young / Ruby Essentials" },
    { name: "Cilindro — Duas Tampas", desc: "Corpo de cerâmica com tampas de cortiça. Um design cilíndrico intemporal.", price: "Vinho 10a a partir de €29,99 · Azeite a partir de €34,99", range: "Signature (10a) · Azeite" },
    { name: "Cilindro — Cortiça Total", desc: "Cilindro totalmente revestido de cortiça. Natural, táctil, quente.", price: "Vinho 10a a partir de €49,99 · Azeite a partir de €54,99", range: "Signature (10a) · Azeite" },
    { name: "Cubo / Quadrado — Duas Tampas", desc: "Corpo de cerâmica com tampo e base de cortiça. Precisão geométrica encontra calor natural.", price: "Vinho 10a a partir de €69,99 · Azeite a partir de €74,99", range: "Signature (10a) · Azeite" },
    { name: "Cubo — Cortiça Total", desc: "Cubo totalmente revestido de cortiça com ímanes de neodímio. De Signature a The Icon.", price: "Vinho 10a a partir de €99,99 — até €275 (50a The Icon)", range: "Signature · Legacy · The Icon" },
    { name: "Cubo — Carvalho (Escuro/Natural) + Cortiça/Latão", desc: "Cubo de madeira de carvalho premium com acabamentos em cortiça ou latão.", price: "Legacy (30a) a partir de €230 — até €1.000 (Very Very Old)", range: "Legacy · The Icon · The Hundred" },
    { name: "Cubo — Nogueira + Latão", desc: "O formato mais prestigiado. Nogueira e latão — o pináculo da coleção The 100's.", price: "Até €1.000 (edições de topo)", range: "The Icon · The Hundred" },
  ];

  return (
    <ModuleLayout
      moduleId="gift"
      moduleNumber={4}
      title={isEN ? "The Premium Gift Concept" : "O Conceito de Oferta Premium"}
      subtitle={isEN ? "We don't sell wine. We sell premium gifts." : "Não vendemos vinho. Vendemos ofertas premium."}
      heroImage={giftImg}
    >
      <ContentBlock title={isEN ? "Beyond Wine" : "Para Além do Vinho"}>
        <p>{isEN
          ? "The 100's is not simply selling wine. It is creating premium gifts that encapsulate time, memory and meaning."
          : "O The 100's não está simplesmente a vender vinho. Está a criar presentes premium que encapsulam tempo, memória e significado."}</p>
        <p>{isEN
          ? "Every bottle is a gift — to yourself, to someone you love, to the future. The packaging and presentation must reflect this philosophy."
          : "Cada garrafa é um presente — para ti, para alguém que amas, para o futuro. A embalagem e a apresentação devem refletir esta filosofia."}</p>
      </ContentBlock>

      <VideoBlock
        title="A Arte do Gift Premium"
        description="Como transformar um produto num presente inesquecível."
        duration="9:15"
        poster={giftImg}
      />

      <ImageBlock src={giftImg} alt={isEN ? "Premium packaging" : "Embalagem premium"} caption={isEN ? "Premium materials elevate the experience" : "Os materiais premium elevam a experiência"} />

      <ContentBlock title={isEN ? "Materials & Craft" : "Materiais e Artesanato"}>
        <p>{isEN ? "The choice of materials is deliberate. Every element of the packaging tells a story:" : "A escolha dos materiais é deliberada. Cada elemento da embalagem conta uma história:"}</p>
      </ContentBlock>

      <ExpandableSection title={isEN ? "Cork" : "Cortiça"}>
        <p>{isEN
          ? "Cork is native to Portugal and deeply connected to the wine tradition. It represents authenticity, nature, and the Portuguese identity that runs through The 100's."
          : "A cortiça é nativa de Portugal e profundamente ligada à tradição vinícola. Representa autenticidade, natureza e a identidade portuguesa que percorre o The 100's."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "Wood (Oak & Walnut)" : "Madeira (Carvalho e Nogueira)"}>
        <p>{isEN
          ? "Wood evokes the barrels where Port wine ages for decades. Oak brings warmth, history and a sense of timelessness. Walnut adds a darker, more luxurious character."
          : "A madeira evoca os barris onde o Vinho do Porto envelhece durante décadas. O carvalho traz calor, história e uma sensação de atemporalidade. A nogueira acrescenta um carácter mais escuro e luxuoso."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "Ceramic" : "Cerâmica"}>
        <p>{isEN
          ? "Ceramic adds an artisanal, museum-quality feel. It bridges tradition and modernity — rough and refined in equal measure."
          : "A cerâmica acrescenta uma sensação artesanal e de qualidade museológica. Faz a ponte entre tradição e modernidade — rústica e refinada em igual medida."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "Brass & Pewter" : "Latão e Peltre"}>
        <p>{isEN
          ? "Metal accents — brass or pewter — elevate the most prestigious editions. They speak of permanence, weight and value."
          : "Os acabamentos metálicos — latão ou peltre — elevam as edições mais prestigiadas. Falam de permanência, peso e valor."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "Neodymium Magnets" : "Ímanes de Neodímio"}>
        <p>{isEN
          ? "All cubic and cylindrical formats use neodymium magnet closures — between 6 and 8 high-strength magnets per box. The satisfying, precise snap of the opening mechanism signals quality before the bottle is even seen."
          : "Todos os formatos cúbicos e cilíndricos utilizam fechos com ímanes de neodímio — entre 6 e 8 ímanes de alta resistência por caixa. O clique preciso e satisfatório do mecanismo de abertura sinaliza qualidade antes de a garrafa ser sequer vista."}</p>
      </ExpandableSection>

      <ContentBlock title={isEN ? "Packaging Models & Price Guide" : "Modelos de Embalagem e Guia de Preços"}>
        <p>{isEN
          ? "The 100's packaging ranges from accessible entry-level gifts to ultra-luxury collectible cases."
          : "As embalagens do The 100's variam de presentes de entrada acessíveis a estojos colecionáveis ultra-luxo."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {packages.map(pkg => (
          <ScrollReveal key={pkg.name}>
            <div className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <h4 className="text-lg font-light text-primary">{pkg.name}</h4>
                <span className="text-xs tracking-[0.15em] uppercase text-primary/60 border border-primary/20 px-3 py-1">{pkg.price}</span>
              </div>
              <p className="text-sm text-foreground/70 font-light mb-2">{pkg.desc}</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/50">{isEN ? "Range:" : "Gama:"} {pkg.range}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "The Importance of Presentation" : "A Importância da Apresentação"}>
        <p>{isEN
          ? "How a gift is presented is as important as what's inside. The unboxing moment should feel ceremonial — a quiet, beautiful experience that mirrors the brand's philosophy of time and care."
          : "A forma como um presente é apresentado é tão importante quanto o que está dentro. O momento de abertura deve parecer cerimonial — uma experiência tranquila e bela que espelha a filosofia da marca de tempo e cuidado."}</p>
      </ContentBlock>

      <KeyTakeaway items={isEN ? [
        "The 100's sells premium gifts, not just wine",
        "Materials include cork, ceramic, oak wood, walnut, brass and pewter",
        "Seven packaging tiers from €19.99 (Entry Gift) to €1,000 (Very Very Old editions)",
        "Neodymium magnet closures (6–8 magnets) on cube and cylinder formats",
        "The unboxing moment must feel ceremonial and special"
      ] : [
        "O The 100's vende presentes premium, não apenas vinho",
        "Os materiais incluem cortiça, cerâmica, madeira de carvalho, nogueira, latão e peltre",
        "Sete níveis de embalagem de €19,99 (Entry Gift) a €1.000 (edições Very Very Old)",
        "Fechos com ímanes de neodímio (6–8 ímanes) nos formatos cúbico e cilíndrico",
        "O momento de abertura deve parecer cerimonial e especial"
      ]} />

      <ModuleQuizGate
        moduleId="gift"
        questions={[
          { question: "Qual é o conceito central do 'Gift Premium' no The 100's?", options: ["Um produto barato para turistas", "Uma experiência de presente que transcende o produto", "Uma embalagem standard com logotipo", "Um voucher de desconto"], correctIndex: 1 },
          { question: "A personalização UV/Laser permite:", options: ["Mudar o sabor do vinho", "Gravar nomes, datas e mensagens nos containers", "Alterar a cor do container", "Reduzir o preço do produto"], correctIndex: 1 },
          { question: "Qual a importância do packaging no conceito gift?", options: ["É secundário ao produto", "É parte fundamental da experiência premium", "Serve apenas para proteger o produto", "Não tem relevância para o cliente"], correctIndex: 1 },
          { question: "Como transformar o packaging em argumento de venda?", options: ["Oferecer desconto na embalagem", "Mostrar o conceito 'second life' e personalização", "Esconder o packaging até ao pagamento", "Focar apenas no vinho"], correctIndex: 1 },
          { question: "O que torna um gift The 100's diferente de uma garrafa de vinho normal?", options: ["O preço mais alto", "O design, container, personalização e storytelling", "A marca conhecida", "O tamanho maior"], correctIndex: 1 },
        ]}
      />

      <ReflectionBlock questions={isEN ? [
        "Think of a gift you received that felt truly special. What made the experience memorable?",
        "How can you convey the gift concept — and the pricing range — when speaking to visitors?",
        "A visitor asks about the difference between the Cube Cork and the Oak Cube. How would you explain it?"
      ] : [
        "Pensa num presente que recebeste e que pareceu verdadeiramente especial. O que tornou a experiência memorável?",
        "Como podes transmitir o conceito de presente — e a gama de preços — ao falar com os visitantes?",
        "Um visitante pergunta sobre a diferença entre o Cubo Cortiça e o Cubo Carvalho. Como explicarias?"
      ]} />
    </ModuleLayout>
  );
};

export default ModuleGift;
