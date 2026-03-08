import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import collectionImg from "@/assets/collection.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";
import giftImg from "@/assets/gift-packaging.jpg";
import storeImg from "@/assets/store-interior.jpg";
import hourglassImg from "@/assets/hourglass.jpg";
import hedonismImg from "@/assets/hedonism.jpg";
import douroImg from "@/assets/douro-valley.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { ProductGallery } from "@/components/ProductGallery";

const ModuleProducts = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const ageCategories = isEN ? [
    { age: "Young / Ruby Essentials", desc: "Fresh, vibrant, the beginning of the journey. The accessible entry point into the world of The 100's." },
    { age: "10 Years — Signature", desc: "The first evolution — complexity emerges. The signature expression of The 100's experience." },
    { age: "30 Years — Legacy", desc: "Deep maturity — a story told in layers. A wine that carries the weight and beauty of three decades." },
    { age: "50 Years — The Icon", desc: "Rare and extraordinary — living history. One of the most precious expressions in the collection." },
    { age: "Very Very Old / 100 Years — The Hundred", desc: "The pinnacle — time itself, liquified. The ultimate capsule, representing a full century of patience." },
  ] : [
    { age: "Young / Ruby Essentials", desc: "Fresco, vibrante, o início da jornada. O ponto de entrada acessível no mundo do The 100's." },
    { age: "10 Anos — Signature", desc: "A primeira evolução — a complexidade emerge. A expressão característica da experiência The 100's." },
    { age: "30 Anos — Legacy", desc: "Maturidade profunda — uma história contada em camadas. Um vinho que carrega o peso e a beleza de três décadas." },
    { age: "50 Anos — The Icon", desc: "Raro e extraordinário — história viva. Uma das expressões mais preciosas da coleção." },
    { age: "Very Very Old / 100 Anos — The Hundred", desc: "O pináculo — o tempo em si, liquefeito. A cápsula definitiva, representando um século completo de paciência." },
  ];

  const collections = isEN ? [
    { name: "Porto City Collection", desc: "Iconic imagery from the city of Porto: the Ribeira waterfront, the Torre dos Clérigos, the Dom Luís Bridge, the Igreja do Carmo and the famous Elétrico (tram)." },
    { name: "Portugality Collection", desc: "The soul of Portuguese culture: Lenços dos Namorados (love handkerchiefs), Fado music, filigree jewellery, sardines, sailing ships and the Galo de Barcelos." },
    { name: "Literature Collection", desc: "Dedicated to Portugal's literary giants: Fernando Pessoa, José Saramago, Eça de Queirós and Luís de Camões. For those who find poetry in every drop." },
    { name: "Azulejo Collection", desc: "A homage to Portugal's iconic blue-and-white tile tradition, featuring monuments such as the Palácio da Pena, Rossio station and the Madre de Deus church." },
    { name: "Further Subcollections (Planned)", desc: "Grandes Navegações (caravels, compasses), Engenharias (balconies, cobblestone), Lifestyle & Vida (sardines, pastéis de nata), and Botânica (olive trees, grapevines)." },
  ] : [
    { name: "Coleção Porto City", desc: "Imagens icónicas da cidade do Porto: a Ribeira, a Torre dos Clérigos, a Ponte Dom Luís, a Igreja do Carmo e o famoso Elétrico." },
    { name: "Coleção Portugality", desc: "A alma da cultura portuguesa: Lenços dos Namorados, música Fado, joalharia filigrana, sardinhas, navios e o Galo de Barcelos." },
    { name: "Coleção Literatura", desc: "Dedicada aos gigantes literários de Portugal: Fernando Pessoa, José Saramago, Eça de Queirós e Luís de Camões. Para quem encontra poesia em cada gota." },
    { name: "Coleção Azulejo", desc: "Uma homenagem à tradição dos azulejos portugueses, com monumentos como o Palácio da Pena, a estação do Rossio e a igreja da Madre de Deus." },
    { name: "Subcoleções Adicionais (Planeadas)", desc: "Grandes Navegações (caravelas, bússolas), Engenharias (varandas, calçada), Lifestyle & Vida (sardinhas, pastéis de nata) e Botânica (oliveiras, videiras)." },
  ];

  // Shared product photo arrays — replace with real product photos when available
  const productPhotos = [
    [collectionImg, giftImg, bottleImg],        // Entry Gift
    [bottleImg, collectionImg, storeImg],       // Cylinder Collection
    [hourglassImg, collectionImg, storeImg],    // Cube Collection
    [hedonismImg, douroImg, hourglassImg],      // Wood & Brass Collection
  ];

  const productPortfolio = (isEN ? [
    {
      name: "Entry Gift",
      desc: "The starting point of the collection. A simple and elegant product that introduces visitors to the concept of the memory capsule.",
      materials: "Cardboard / kraft box with latch closure",
    },
    {
      name: "Cylinder Collection",
      desc: "Elegant cylindrical designs combining ceramic and cork materials. These products balance minimalism with warmth and natural texture.",
      materials: "Ceramic · Cork · Two-cap and full-cork variants",
    },
    {
      name: "Cube Collection",
      desc: "Modern geometric designs created for collectors. These pieces emphasize structure and visual presence.",
      materials: "Ceramic · Cork · Neodymium magnet closure (6–8 magnets)",
    },
    {
      name: "Wood & Brass Collection",
      desc: "The most premium collection, crafted with oak wood, walnut wood and brass or pewter elements. These designs express timeless luxury and craftsmanship.",
      materials: "Oak wood · Walnut wood · Brass / pewter · Cork",
    },
  ] : [
    {
      name: "Entry Gift",
      desc: "O ponto de partida da coleção. Um produto simples e elegante que introduz os visitantes ao conceito da cápsula de memória.",
      materials: "Caixa de cartão / kraft com fecho",
    },
    {
      name: "Coleção Cilindro",
      desc: "Designs cilíndricos elegantes que combinam materiais cerâmicos e de cortiça. Estes produtos equilibram o minimalismo com a textura natural.",
      materials: "Cerâmica · Cortiça · Variantes de duas tampas e cortiça total",
    },
    {
      name: "Coleção Cubo",
      desc: "Designs geométricos modernos criados para colecionadores. Estas peças enfatizam a estrutura e a presença visual.",
      materials: "Cerâmica · Cortiça · Fecho com ímã de neodímio (6–8 ímanes)",
    },
    {
      name: "Coleção Madeira & Latão",
      desc: "A coleção mais premium, elaborada com madeira de carvalho, madeira de nogueira e elementos de latão ou peltre. Estes designs expressam luxo intemporal e artesanato.",
      materials: "Madeira de carvalho · Madeira de nogueira · Latão / peltre · Cortiça",
    },
  ]).map((p, i) => ({ ...p, photos: productPhotos[i] }));

  const secondLifeUses = isEN
    ? ["Candle holder", "Jewelry holder", "Diffuser", "Decorative sculpture"]
    : ["Suporte de velas", "Porta-joias", "Difusor", "Escultura decorativa"];

  return (
    <ModuleLayout
      moduleId="products"
      moduleNumber={3}
      title={isEN ? "The Products" : "Os Produtos"}
      subtitle={isEN ? "The wine collection and the collectible design portfolio." : "A coleção de vinhos e o portfólio de design colecionável."}
      heroImage={collectionImg}
    >
      <ContentBlock title={isEN ? "100ml of History" : "100ml de História"}>
        <p>{isEN
          ? "Every bottle in The 100's collection is a 100ml capsule of Port wine history. The format is deliberate — small enough to be a precious souvenir, significant enough to carry centuries of craft."
          : "Cada garrafa na coleção The 100's é uma cápsula de 100ml da história do Vinho do Porto. O formato é deliberado — pequeno o suficiente para ser uma lembrança preciosa, significativo o suficiente para transportar séculos de artesanato."}</p>
        <p>{isEN
          ? "Each product becomes a collectible piece that represents a moment, a place, a cultural story and an emotional experience."
          : "Cada produto torna-se uma peça colecionável que representa um momento, um lugar, uma história cultural e uma experiência emocional."}</p>
      </ContentBlock>

      <ImageBlock src={collectionImg} alt={isEN ? "The 100's Collection" : "Coleção The 100's"} caption={isEN ? "The curated collection" : "A coleção curada"} />

      <ContentBlock title={isEN ? "Wine Types" : "Tipos de Vinho"}>
        <p>{isEN
          ? "The collection is organized into two main categories, each offering a distinct experience."
          : "A coleção está organizada em duas categorias principais, cada uma oferecendo uma experiência distinta."}</p>
      </ContentBlock>

      <ExpandableSection title={isEN ? "Tawny Wines" : "Vinhos Tawny"}>
        <p>{isEN
          ? "Tawny Port wines are aged in wooden barrels, developing rich amber tones and complex flavors of caramel, dried fruit and spice. The longer they age, the more refined and precious they become."
          : "Os vinhos do Porto Tawny envelhecem em barris de madeira, desenvolvendo tons âmbar ricos e sabores complexos de caramelo, fruta seca e especiaria. Quanto mais envelhecem, mais refinados e preciosos se tornam."}</p>
        <p>{isEN
          ? "Tawny represents the essence of time — each year in the barrel adds depth, character and story."
          : "O Tawny representa a essência do tempo — cada ano no barril acrescenta profundidade, carácter e história."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "White Wines" : "Vinhos Brancos"}>
        <p>{isEN
          ? "White Port wines offer a lighter, more delicate experience. Golden in color, they bring notes of honey, citrus and almonds. Aged White Ports develop extraordinary complexity."
          : "Os vinhos do Porto Branco oferecem uma experiência mais leve e delicada. De cor dourada, trazem notas de mel, citrinos e amêndoas. Os Brancos envelhecidos desenvolvem uma complexidade extraordinária."}</p>
      </ExpandableSection>

      <ExpandableSection title={isEN ? "Olive Oil Souvenir" : "Souvenir de Azeite"}>
        <p>{isEN
          ? "Alongside the wine range, The 100's also offers an exclusive Olive Oil souvenir — a celebration of another pillar of Portuguese culinary heritage. Available in the same premium packaging formats as the wine, the olive oil collection broadens the gifting offering beyond wine."
          : "Para além da gama de vinhos, o The 100's oferece também um souvenir exclusivo de Azeite — uma celebração de outro pilar do património culinário português. Disponível nos mesmos formatos de embalagem premium do vinho, a coleção de azeite alarga a oferta de presentes para além do vinho."}</p>
      </ExpandableSection>

      <ContentBlock title={isEN ? "Age Categories & Product Names" : "Categorias de Idade e Nomes dos Produtos"}>
        <p>{isEN
          ? "Each age category has its own identity and name within The 100's universe:"
          : "Cada categoria de idade tem a sua própria identidade e nome no universo The 100's:"}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ageCategories.map(item => (
          <div key={item.age} className="border border-border/30 p-5 hover:border-primary/30 transition-colors">
            <p className="text-primary font-light text-lg mb-1">{item.age}</p>
            <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
          </div>
        ))}
      </div>

      <ImageBlock src={bottleImg} alt={isEN ? "Premium bottle" : "Garrafa premium"} caption={isEN ? "Each bottle carries its own story" : "Cada garrafa carrega a sua própria história"} />

      <ContentBlock title={isEN ? "Collections & Graphic Editions" : "Coleções e Edições Gráficas"}>
        <p>{isEN
          ? "The 100's launches exclusive editions inspired by Portuguese geography and culture. Each collection tells a different story, connecting the product to the rich heritage of Portugal."
          : "O The 100's lança edições exclusivas inspiradas na geografia e cultura portuguesas. Cada coleção conta uma história diferente, ligando o produto ao rico património de Portugal."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {collections.map(col => (
          <ScrollReveal key={col.name}>
            <div className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500">
              <h4 className="text-lg font-light text-primary mb-2">{col.name}</h4>
              <p className="text-sm text-foreground/70 font-light">{col.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Product Portfolio" : "Portfólio de Produtos"}>
        <p>{isEN
          ? "The 100's products are designed as collectible pieces. Each design combines aesthetic beauty with symbolic meaning. The containers are crafted to outlive the wine inside them. Click on any product to explore its gallery."
          : "Os produtos do The 100's são concebidos como peças colecionáveis. Cada design combina beleza estética com significado simbólico. Os recipientes são criados para durar mais do que o vinho que contêm. Clique em qualquer produto para explorar a galeria."}</p>
      </ContentBlock>

      <ProductGallery
        products={productPortfolio}
        viewLabel={isEN ? "View gallery for" : "Ver galeria de"}
        collectionLabel={isEN ? "The 100's Collection" : "Coleção The 100's"}
        photoLabel={isEN ? "PHOTO" : "FOTO"}
        photosLabel={isEN ? "PHOTOS" : "FOTOS"}
      />

      <ContentBlock title={isEN ? "The Second Life Concept" : "O Conceito de Segunda Vida"}>
        <p>{isEN
          ? "Every product is designed to live beyond the wine. Once the bottle is opened, the container becomes a decorative object."
          : "Cada produto é concebido para viver para além do vinho. Uma vez aberta a garrafa, o recipiente torna-se um objeto decorativo."}</p>
        <p>{isEN
          ? "This philosophy ensures that the product remains present in the customer's home long after the wine is consumed — the object continues to preserve the memory of the trip."
          : "Esta filosofia garante que o produto permanece presente na casa do cliente muito depois de o vinho ser consumido — o objeto continua a preservar a memória da viagem."}</p>
      </ContentBlock>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {secondLifeUses.map(use => (
          <div key={use} className="border border-border/30 p-4 text-center">
            <p className="text-sm text-primary/80 font-light">{use}</p>
          </div>
        ))}
      </div>

      <KeyTakeaway items={isEN ? [
        "Two main wine categories: Tawny and White Port wines — plus Olive Oil",
        "Five age categories: Young/Ruby Essentials, Signature (10yr), Legacy (30yr), The Icon (50yr), The Hundred (100yr)",
        "Four design collections: Entry Gift, Cylinder, Cube, Wood & Brass",
        "Four graphic editions: Porto City, Portugality, Literature, Azulejo",
        "The Second Life Concept: containers become decorative objects after use"
      ] : [
        "Duas categorias principais de vinho: Tawny e Branco — mais Azeite",
        "Cinco categorias de idade: Young/Ruby Essentials, Signature (10a), Legacy (30a), The Icon (50a), The Hundred (100a)",
        "Quatro coleções de design: Entry Gift, Cilindro, Cubo, Madeira & Latão",
        "Quatro edições gráficas: Porto City, Portugality, Literatura, Azulejo",
        "O Conceito de Segunda Vida: os recipientes tornam-se objetos decorativos após uso"
      ]} />

      <QuizBlock moduleId="products" questions={isEN ? [
        { question: "What volume is each bottle in The 100's collection?", options: ["50ml", "100ml", "200ml", "750ml"], correct: 1 },
        { question: "What are the two main wine categories?", options: ["Red and Rosé", "Tawny and White", "Sweet and Dry", "Young and Old"], correct: 1 },
        { question: "What is the product name for the 10-year wine?", options: ["The Hundred", "The Icon", "Signature", "Legacy"], correct: 2 },
        { question: "What is the Second Life Concept?", options: [
          "Bottles are refilled after use",
          "Old bottles are donated to museums",
          "The container becomes a decorative object after the wine is consumed",
          "Customers receive a second bottle for free"
        ], correct: 2 },
      ] : [
        { question: "Qual é o volume de cada garrafa na coleção The 100's?", options: ["50ml", "100ml", "200ml", "750ml"], correct: 1 },
        { question: "Quais são as duas categorias principais de vinho?", options: ["Tinto e Rosé", "Tawny e Branco", "Doce e Seco", "Jovem e Velho"], correct: 1 },
        { question: "Qual é o nome do produto para o vinho de 10 anos?", options: ["The Hundred", "The Icon", "Signature", "Legacy"], correct: 2 },
        { question: "O que é o Conceito de Segunda Vida?", options: [
          "As garrafas são recarregadas após uso",
          "As garrafas antigas são doadas a museus",
          "O recipiente torna-se um objeto decorativo após o vinho ser consumido",
          "Os clientes recebem uma segunda garrafa gratuitamente"
        ], correct: 2 },
      ]} />
    </ModuleLayout>
  );
};

export default ModuleProducts;
