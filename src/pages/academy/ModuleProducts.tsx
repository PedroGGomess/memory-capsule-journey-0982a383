import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, QuizBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import collectionImg from "@/assets/collection.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { ProductGallery } from "@/components/ProductGallery";

// Second Life photos
import difusorImg from "@/assets/second-life/difusor.png";
import plantaImg from "@/assets/second-life/planta.png";
import portaCoposImg from "@/assets/second-life/porta-copos.png";
import velaImg from "@/assets/second-life/vela.png";

// Product photos
import entryGiftImg from "@/assets/produtos/entry-gift.jpg";
import garrafas2Img from "@/assets/produtos/garrafas-2.jpg";
import cilindro2t1 from "@/assets/produtos/cilindro-2t-1.jpg";
import cilindro2t2 from "@/assets/produtos/cilindro-2t-2.jpg";
import cilindro2t3 from "@/assets/produtos/cilindro-2t-3.jpg";
import cilindroCork1 from "@/assets/produtos/cilindro-cork-1.jpg";
import cilindroCork2 from "@/assets/produtos/cilindro-cork-2.jpg";
import cilindroCork3 from "@/assets/produtos/cilindro-cork-3.jpg";
import quadrado2t1 from "@/assets/produtos/quadrado-2t-1.jpg";
import quadrado2t2 from "@/assets/produtos/quadrado-2t-2.jpg";
import quadrado2t3 from "@/assets/produtos/quadrado-2t-3.jpg";
import quadradoCork1 from "@/assets/produtos/quadrado-cork-1.jpg";
import quadradoCork2 from "@/assets/produtos/quadrado-cork-2.jpg";
import quadradoCork3 from "@/assets/produtos/quadrado-cork-3.jpg";
import quadradoCarvalho1 from "@/assets/produtos/quadrado-carvalho-1.jpg";
import quadradoCarvalho2 from "@/assets/produtos/quadrado-carvalho-2.jpg";
import quadradoCarvalho3 from "@/assets/produtos/quadrado-carvalho-3.jpg";
import quadradoNogueira1 from "@/assets/produtos/quadrado-nogueira-1.jpg";
import quadradoNogueira2 from "@/assets/produtos/quadrado-nogueira-2.jpg";
import quadradoNogueira3 from "@/assets/produtos/quadrado-nogueira-3.jpg";

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

  const productPhotos = [
    [entryGiftImg, garrafas2Img],                                // Entry Gift
    [cilindro2t1, cilindro2t2, cilindro2t3],                     // Cilindro de Cortiça com Cerâmica
    [cilindroCork1, cilindroCork2, cilindroCork3],               // Cilindro de Cortiça
    [quadrado2t1, quadrado2t2, quadrado2t3],                     // Cubo de Cortiça com Cerâmica
    [quadradoCork1, quadradoCork2, quadradoCork3],               // Cubo de Cortiça
    [quadradoNogueira1, quadradoNogueira2, quadradoNogueira3],   // Madeira com Latão (Nogueira)
    [quadradoCarvalho1, quadradoCarvalho2, quadradoCarvalho3],   // Madeira de Carvalho com Latão
  ];

  const productPortfolio = (isEN ? [
    {
      name: "Entry Gift",
      desc: "The starting point of the collection. A simple and elegant product that introduces visitors to the concept of the memory capsule.",
      materials: "Cardboard / kraft box with latch closure",
    },
    {
      name: "Cork Cylinder with Ceramic",
      desc: "A cylindrical design combining a ceramic body with cork elements. Balances the warmth of natural cork with the refined texture of ceramic.",
      materials: "Ceramic · Cork · Two-cap variant",
    },
    {
      name: "Cork Cylinder",
      desc: "A fully cork cylindrical design expressing natural simplicity and warmth. The pure cork variant for those who value nature-forward aesthetics.",
      materials: "Cork · Full-cork variant",
    },
    {
      name: "Cork Cube with Ceramic",
      desc: "A modern geometric cube combining ceramic and cork materials. Structure meets natural texture in this collector's piece.",
      materials: "Ceramic · Cork · Neodymium magnet closure (6–8 magnets)",
    },
    {
      name: "Cork Cube",
      desc: "A fully cork geometric cube design. Clean lines and natural material create a minimalist collectible with strong visual presence.",
      materials: "Cork · Neodymium magnet closure (6–8 magnets)",
    },
    {
      name: "Wood with Brass",
      desc: "A premium design crafted with walnut wood and brass elements. Timeless craftsmanship expressed through warm wood tones and metallic accents.",
      materials: "Walnut wood · Brass · Cork",
    },
    {
      name: "Oak Wood with Brass",
      desc: "The pinnacle of the collection, crafted with oak wood and brass elements. Expresses enduring luxury and artisanal excellence.",
      materials: "Oak wood · Brass · Cork",
    },
  ] : [
    {
      name: "Entry Gift",
      desc: "O ponto de partida da coleção. Um produto simples e elegante que introduz os visitantes ao conceito da cápsula de memória.",
      materials: "Caixa de cartão / kraft com fecho",
    },
    {
      name: "Cilindro de Cortiça com Cerâmica",
      desc: "Um design cilíndrico que combina corpo em cerâmica com elementos de cortiça. Equilibra o calor da cortiça natural com a textura refinada da cerâmica.",
      materials: "Cerâmica · Cortiça · Variante de duas tampas",
    },
    {
      name: "Cilindro de Cortiça",
      desc: "Um design cilíndrico totalmente em cortiça, que expressa simplicidade e calor natural. A variante de cortiça pura para quem valoriza a estética da natureza.",
      materials: "Cortiça · Variante de cortiça total",
    },
    {
      name: "Cubo de Cortiça com Cerâmica",
      desc: "Um cubo geométrico moderno que combina cerâmica e cortiça. Estrutura e textura natural fundem-se nesta peça para colecionadores.",
      materials: "Cerâmica · Cortiça · Fecho com ímã de neodímio (6–8 ímanes)",
    },
    {
      name: "Cubo de Cortiça",
      desc: "Um design de cubo geométrico totalmente em cortiça. Linhas limpas e material natural criam uma peça colecionável minimalista com forte presença visual.",
      materials: "Cortiça · Fecho com ímã de neodímio (6–8 ímanes)",
    },
    {
      name: "Madeira com Latão",
      desc: "Um design premium elaborado com madeira de nogueira e elementos de latão. Artesanato intemporal expresso através de tons de madeira quente e acentos metálicos.",
      materials: "Madeira de nogueira · Latão · Cortiça",
    },
    {
      name: "Madeira de Carvalho com Latão",
      desc: "O pináculo da coleção, elaborado com madeira de carvalho e elementos de latão. Expressa luxo duradouro e excelência artesanal.",
      materials: "Madeira de carvalho · Latão · Cortiça",
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

      <VideoBlock
        title="Os Nossos Produtos"
        description="Conhece cada gama, cada material e cada detalhe."
        duration="12:20"
        poster={collectionImg}
      />

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
        {[
          { label: secondLifeUses[0], img: velaImg },
          { label: secondLifeUses[1], img: portaCoposImg },
          { label: secondLifeUses[2], img: difusorImg },
          { label: secondLifeUses[3], img: plantaImg },
        ].map(item => (
          <ScrollReveal key={item.label}>
            <div className="border border-border/30 overflow-hidden group hover:border-primary/20 transition-all duration-500">
              <div className="aspect-square overflow-hidden">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-primary/80 font-light">{item.label}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <KeyTakeaway items={isEN ? [
        "Two main wine categories: Tawny and White Port wines — plus Olive Oil",
        "Five age categories: Young/Ruby Essentials, Signature (10yr), Legacy (30yr), The Icon (50yr), The Hundred (100yr)",
        "Seven individual products: Entry Gift, Cork Cylinder with Ceramic, Cork Cylinder, Cork Cube with Ceramic, Cork Cube, Wood with Brass, Oak Wood with Brass",
        "Four graphic editions: Porto City, Portugality, Literature, Azulejo",
        "The Second Life Concept: containers become decorative objects after use"
      ] : [
        "Duas categorias principais de vinho: Tawny e Branco — mais Azeite",
        "Cinco categorias de idade: Young/Ruby Essentials, Signature (10a), Legacy (30a), The Icon (50a), The Hundred (100a)",
        "Sete produtos individuais: Entry Gift, Cilindro de Cortiça com Cerâmica, Cilindro de Cortiça, Cubo de Cortiça com Cerâmica, Cubo de Cortiça, Madeira com Latão, Madeira de Carvalho com Latão",
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

      <ModuleQuizGate
        moduleId="products"
        questions={[
          { question: "Quantos tipos de containers diferentes existem no The 100's?", options: ["3", "5", "7", "10"], correctIndex: 2 },
          { question: "Qual é o material do container Entry Gift?", options: ["Madeira de nogueira", "Cortiça natural", "Vidro com rolha de cortiça (sem container)", "Cerâmica branca"], correctIndex: 2 },
          { question: "Quais são as madeiras usadas nos containers quadrados premium?", options: ["Pinho e cedro", "Carvalho e nogueira", "Teca e mogno", "Bambu e oliveira"], correctIndex: 1 },
          { question: "O que diferencia a gama Legacy da gama Signature?", options: ["Apenas o preço", "O tipo de container e o envelhecimento do vinho", "A cor da garrafa", "O tamanho da embalagem"], correctIndex: 1 },
          { question: "Qual container combina cerâmica branca com cortiça?", options: ["Quadrado Cork", "Cilindro 2 Tampas", "Cilindro Cork", "Cilindro 1 Tampa"], correctIndex: 2 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleProducts;
