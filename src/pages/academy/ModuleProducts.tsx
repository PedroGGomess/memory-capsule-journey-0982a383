import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
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

  const storeZones = isEN ? [
    {
      zone: "The Cellar", floor: "Piso 0", color: "text-amber-500/80",
      desc: "The anchor zone. Port Wine Souvenir in two tiers — Essentials and Signature — across all packaging formats. This is where the majority of volume happens.",
      tiers: [
        { name: "Essentials (Ruby)", age: "Young / Ruby", priceRange: "€19.99 – €99.99", desc: "Fresh, vibrant — the accessible gateway to The 100's universe." },
        { name: "Signature", age: "10 Years", priceRange: "€44.99 – €130", desc: "The signature expression. First evolution of complexity — caramel, dried fruit, elegance." },
      ],
    },
    {
      zone: "Ancient Flavours", floor: "Piso 0", color: "text-green-600/70",
      desc: "Portugal's pantry. Premium souvenirs built around the country's finest pantry products — each as time-saturated as the wine.",
      products: [
        { name: "Olive Oil", note: "Centenary olive trees. First cold press. €34.99 – €265" },
        { name: "Artisanal Honey", note: "Heritage apiaries. Slow-harvested. In premium cork packaging." },
        { name: "Sea Salt", note: "Atlantic fleur de sel. Millenary salt pans of Portugal." },
        { name: "Heritage Tea", note: "Azorean tea — Europe's only tea-producing region." },
      ],
    },
    {
      zone: "The Still Hours", floor: "Piso 0", color: "text-purple-400/70",
      desc: "Time made sensory. Candles and diffusers that transport the packaging concept into the home — marking the slow hours, the quiet rituals.",
      products: [
        { name: "Candles", note: "Portuguese botanical scents — cedar, lavender, marine salt. Cork packaging." },
        { name: "Diffusers", note: "Long-diffusion reeds. Immersive home fragrance with The 100's aesthetic." },
      ],
    },
    {
      zone: "The Numbered", floor: "Piso 1", color: "text-sky-400/70",
      desc: "Collectible limited edition ceramics. Exclusively the Cubo 2 Tampas Cerâmico format — numbered, unique, collectible. Where the product becomes a cultural artefact.",
      products: [
        { name: "Cubo 2 Tampas Cerâmico", note: "Limited ceramic editions. Numbered. Collectible. The 100's as museum piece." },
      ],
    },
    {
      zone: "The Vault", floor: "Piso 1", color: "text-primary/80",
      desc: "The pinnacle. Ultra-premium Port Wine — decades of patience, sealed in 100ml. Sold in a ceremonial, almost reverent environment.",
      tiers: [
        { name: "The Icon", age: "50 Years", priceRange: "€275 – €375", desc: "Rare and extraordinary — living history. One of Portugal's most precious wine expressions in 100ml." },
        { name: "THE HUNDRED", age: "100 Years", priceRange: "€1,000", desc: "The pinnacle. Time itself, liquified. A full century of patience in a single 100ml capsule." },
      ],
    },
  ] : [
    {
      zone: "The Cellar", floor: "Piso 0", color: "text-amber-500/80",
      desc: "A zona âncora. Vinho do Porto Souvenir em dois tiers — Essentials e Signature — em todos os formatos de embalagem. É aqui que acontece a maioria do volume.",
      tiers: [
        { name: "Essentials (Ruby)", age: "Young / Ruby", priceRange: "€19.99 – €99.99", desc: "Fresco, vibrante — o ponto de entrada acessível ao universo The 100's." },
        { name: "Signature", age: "10 Anos", priceRange: "€44.99 – €130", desc: "A expressão característica. Primeira evolução de complexidade — caramelo, fruta seca, elegância." },
      ],
    },
    {
      zone: "Ancient Flavours", floor: "Piso 0", color: "text-green-600/70",
      desc: "A despensa de Portugal. Souvenirs premium construídos em torno dos melhores produtos de despensa do país — cada um tão saturado de tempo como o vinho.",
      products: [
        { name: "Azeite", note: "Oliveiras centenárias. Primeira prensagem a frio. €34.99 – €265" },
        { name: "Mel Artesanal", note: "Apários de herança. Colheita lenta. Em embalagem premium de cortiça." },
        { name: "Sal Marinho", note: "Flor de sal atlântica. Marinhas milenares de Portugal." },
        { name: "Chá de Herança", note: "Chá dos Açores — a única região produtora de chá da Europa." },
      ],
    },
    {
      zone: "The Still Hours", floor: "Piso 0", color: "text-purple-400/70",
      desc: "O tempo tornado sensorial. Velas e difusores que transportam o conceito de embalagem para o lar — marcando as horas lentas, os rituais tranquilos.",
      products: [
        { name: "Velas", note: "Aromas botânicos portugueses — cedro, lavanda, sal marinho. Embalagem em cortiça." },
        { name: "Difusores", note: "Varas de difusão longa. Fragrância doméstica imersiva com a estética The 100's." },
      ],
    },
    {
      zone: "The Numbered", floor: "Piso 1", color: "text-sky-400/70",
      desc: "Cerâmicas colecionáveis de edição limitada. Exclusivamente o formato Cubo 2 Tampas Cerâmico — numerado, único, colecionável. Onde o produto se torna um artefacto cultural.",
      products: [
        { name: "Cubo 2 Tampas Cerâmico", note: "Edições cerâmicas limitadas. Numeradas. Colecionáveis. The 100's como peça de museu." },
      ],
    },
    {
      zone: "The Vault", floor: "Piso 1", color: "text-primary/80",
      desc: "O pináculo. Vinho do Porto ultra-premium — décadas de paciência, seladas em 100ml. Vendido num ambiente cerimonial, quase reverente.",
      tiers: [
        { name: "The Icon", age: "50 Anos", priceRange: "€275 – €375", desc: "Raro e extraordinário — história viva. Uma das expressões mais preciosas do vinho português em 100ml." },
        { name: "THE HUNDRED", age: "100 Anos", priceRange: "€1.000", desc: "O pináculo. O tempo em si, liquefeito. Um século completo de paciência numa única cápsula de 100ml." },
      ],
    },
  ];

  const wineTypes = isEN ? [
    { type: "Tawny Port", desc: "Aged in small oak barrels — amber colour, caramel, dried fruit, spice. The core of The Cellar and The Vault." },
    { type: "Ruby / Essentials", desc: "Aged in large tanks — deep red colour, fresh fruit character. The vibrant, accessible entry of The Cellar." },
    { type: "White Port", desc: "From white grapes — golden colour, honey, citrus, almonds. Lighter and delicate. Aged White develops extraordinary complexity." },
  ] : [
    { type: "Porto Tawny", desc: "Envelhecido em pequenos barris de carvalho — cor âmbar, caramelo, fruta seca, especiaria. O núcleo de The Cellar e The Vault." },
    { type: "Ruby / Essentials", desc: "Envelhecido em grandes tanques — cor vermelha profunda, carácter frutado fresco. A entrada vibrante de The Cellar." },
    { type: "Porto Branco", desc: "De uvas brancas — cor dourada, mel, citrinos, amêndoas. Mais leve e delicado. O Branco envelhecido é extraordinariamente complexo." },
  ];

  const collections = isEN ? [
    { name: "Porto City Collection", accent: "Porto Rose", desc: "Iconic imagery from Porto: the Ribeira, Torre dos Clérigos, Ponte Dom Luís, Igreja do Carmo, and the famous Elétrico (tram)." },
    { name: "Portugality Collection", accent: "Terracotta", desc: "The soul of Portuguese culture: Lenços dos Namorados, Fado, filigree jewellery, sardines, the Galo de Barcelos." },
    { name: "Literature Collection", accent: "Literary Ink", desc: "Portugal's literary giants: Fernando Pessoa, José Saramago, Eça de Queirós, Luís de Camões. For those who find poetry in every drop." },
    { name: "Azulejo Collection", accent: "Portuguese Blue", desc: "A homage to Portugal's tile tradition — Palácio da Pena, Rossio station, Igreja da Madre de Deus." },
  ] : [
    { name: "Coleção Porto City", accent: "Porto Rose", desc: "Imagens icónicas do Porto: a Ribeira, Torre dos Clérigos, Ponte Dom Luís, Igreja do Carmo e o famoso Elétrico." },
    { name: "Coleção Portugality", accent: "Terracotta", desc: "A alma da cultura portuguesa: Lenços dos Namorados, Fado, joalharia filigrana, sardinhas, o Galo de Barcelos." },
    { name: "Coleção Literatura", accent: "Literary Ink", desc: "Os gigantes literários de Portugal: Fernando Pessoa, José Saramago, Eça de Queirós, Luís de Camões." },
    { name: "Coleção Azulejo", accent: "Portuguese Blue", desc: "Uma homenagem à tradição dos azulejos — Palácio da Pena, estação do Rossio, Igreja da Madre de Deus." },
  ];

  const productPhotos = [
    [entryGiftImg, garrafas2Img],
    [cilindro2t1, cilindro2t2, cilindro2t3],
    [cilindroCork1, cilindroCork2, cilindroCork3],
    [quadrado2t1, quadrado2t2, quadrado2t3],
    [quadradoCork1, quadradoCork2, quadradoCork3],
    [quadradoNogueira1, quadradoNogueira2, quadradoNogueira3],
    [quadradoCarvalho1, quadradoCarvalho2, quadradoCarvalho3],
  ];

  const productPortfolio = (isEN ? [
    { name: "Entry Gift", desc: "Starting point. Introduces visitors to the Memory Capsule concept.", materials: "Cardboard / kraft box with latch closure" },
    { name: "Cork Cylinder with Ceramic", desc: "Cylindrical design combining ceramic body with cork — warmth meets refined texture.", materials: "Ceramic · Cork · Two-cap variant" },
    { name: "Cork Cylinder", desc: "Fully cork cylindrical design — natural simplicity and warmth.", materials: "Cork · Full-cork variant" },
    { name: "Cork Cube with Ceramic", desc: "Modern geometric cube combining ceramic and cork. Structure meets natural texture.", materials: "Ceramic · Cork · Neodymium magnet closure (6–8 magnets)" },
    { name: "Cork Cube", desc: "Fully cork geometric cube. Clean lines, minimalist collectible.", materials: "Cork · Neodymium magnet closure (6–8 magnets)" },
    { name: "Wood with Brass (Walnut)", desc: "Walnut wood and brass. Timeless craftsmanship with warm tones and metallic accents.", materials: "Walnut wood · Brass · Cork" },
    { name: "Oak Wood with Brass", desc: "The pinnacle packaging — oak wood directly connected to the barrels where Port wine ages.", materials: "Oak wood · Brass · Cork" },
  ] : [
    { name: "Entry Gift", desc: "Ponto de partida. Introduz os visitantes ao conceito Memory Capsule.", materials: "Caixa de cartão / kraft com fecho" },
    { name: "Cilindro de Cortiça com Cerâmica", desc: "Design cilíndrico combinando corpo cerâmico com cortiça — calor e textura refinada.", materials: "Cerâmica · Cortiça · Variante de duas tampas" },
    { name: "Cilindro de Cortiça", desc: "Design cilíndrico totalmente em cortiça — simplicidade e calor naturais.", materials: "Cortiça · Variante de cortiça total" },
    { name: "Cubo de Cortiça com Cerâmica", desc: "Cubo geométrico moderno que combina cerâmica e cortiça. Estrutura encontra textura natural.", materials: "Cerâmica · Cortiça · Fecho com ímã de neodímio (6–8 ímanes)" },
    { name: "Cubo de Cortiça", desc: "Cubo geométrico totalmente em cortiça. Linhas limpas, peça colecionável minimalista.", materials: "Cortiça · Fecho com ímã de neodímio (6–8 ímanes)" },
    { name: "Madeira com Latão (Nogueira)", desc: "Madeira de nogueira premium e latão. Artesanato intemporal com tons quentes e acentos metálicos.", materials: "Madeira de nogueira · Latão · Cortiça" },
    { name: "Madeira de Carvalho com Latão", desc: "A embalagem pináculo — madeira de carvalho ligada aos barris onde o Vinho do Porto envelhece.", materials: "Madeira de carvalho · Latão · Cortiça" },
  ]).map((p, i) => ({ ...p, photos: productPhotos[i] }));

  const secondLifeUses = isEN
    ? ["Candle holder", "Jewellery box", "Diffuser", "Decorative sculpture"]
    : ["Suporte de velas", "Porta-joias", "Difusor", "Escultura decorativa"];

  return (
    <ModuleLayout
      moduleId="products"
      moduleNumber={3}
      title={isEN ? "The Products" : "Os Produtos"}
      subtitle={isEN ? "Five store zones. 298 SKUs. One concept: time made tangible." : "Cinco zonas. 298 SKUs. Um conceito: o tempo tornado tangível."}
      heroImage={collectionImg}
    >
      <ContentBlock title={isEN ? "The Store Is a Universe" : "A Loja É um Universo"}>
        <p>{isEN
          ? "The 100's Porto is not a traditional retail space. It is structured around five distinct zones — each with its own identity, product family, and emotional register."
          : "A The 100's Porto não é um espaço de retalho tradicional. Está estruturada em torno de cinco zonas distintas — cada uma com a sua identidade, família de produtos e registo emocional."}</p>
        <p>{isEN
          ? "Together, these zones form a portfolio of 298 SKUs. Knowing them — their names, products, and stories — is fundamental to every interaction on the floor."
          : "Juntas, estas zonas formam um portfólio de 298 SKUs. Conhecê-las — os seus nomes, produtos e histórias — é fundamental para cada interação no chão de loja."}</p>
      </ContentBlock>

      <ImageBlock src={collectionImg} alt={isEN ? "The 100's Collection" : "Coleção The 100's"} caption={isEN ? "Five zones. One store. Infinite time." : "Cinco zonas. Uma loja. Tempo infinito."} />

      <VideoBlock
        title="Os Produtos The 100's"
        description="As cinco zonas, os 298 SKUs e a lógica da gama completa."
        duration="12:20"
        poster={collectionImg}
      />

      <ContentBlock title={isEN ? "The Five Zones" : "As Cinco Zonas"}>
        <p>{isEN
          ? "Memorise these five zones. Know which floor they're on, what they sell, and who they're for. This is your map."
          : "Memoriza estas cinco zonas. Sabe em que piso estão, o que vendem e para quem são. Este é o teu mapa."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {storeZones.map((zone, i) => (
          <ScrollReveal key={zone.zone} delay={i * 0.05}>
            <div className="border border-border/30 overflow-hidden hover:border-primary/30 transition-all duration-500">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs tracking-[0.3em] uppercase font-light border border-border/30 px-2 py-0.5 ${zone.color}`}>{zone.floor}</span>
                    </div>
                    <h3 className={`text-xl font-light ${zone.color}`}>{zone.zone}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground/40 font-light">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm text-foreground/60 font-light leading-relaxed mb-4">{zone.desc}</p>

                {"tiers" in zone && zone.tiers && (
                  <div className="space-y-2">
                    {zone.tiers.map((tier) => (
                      <div key={tier.name} className="bg-background/40 border border-border/20 p-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-light text-foreground/80">{tier.name}</p>
                          <p className="text-xs text-primary/60 font-light">{tier.priceRange}</p>
                        </div>
                        <p className="text-xs text-muted-foreground/60 font-light">
                          {isEN ? "Wine age:" : "Idade do vinho:"} {tier.age} · {tier.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {"products" in zone && zone.products && (
                  <div className="space-y-2">
                    {zone.products.map((prod) => (
                      <div key={prod.name} className="bg-background/40 border border-border/20 p-3">
                        <p className="text-sm font-light text-foreground/80">{prod.name}</p>
                        <p className="text-xs text-muted-foreground/60 font-light mt-0.5">{prod.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Port Wine Types" : "Tipos de Vinho do Porto"}>
        <p>{isEN
          ? "Within The Cellar and The Vault, three wine types define the range. Know the difference — clients will ask."
          : "Dentro de The Cellar e The Vault, três tipos de vinho definem a gama. Conhece a diferença — os clientes vão perguntar."}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {wineTypes.map((w) => (
          <div key={w.type} className="border border-border/30 p-5 hover:border-primary/30 transition-colors">
            <p className="text-primary font-light text-base mb-2">{w.type}</p>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>

      <ImageBlock src={bottleImg} alt={isEN ? "Premium bottle" : "Garrafa premium"} caption={isEN ? "Each bottle carries its own story" : "Cada garrafa carrega a sua própria história"} />

      <ContentBlock title={isEN ? "The Four Collections" : "As Quatro Coleções"}>
        <p>{isEN
          ? "All Port Wine Souvenir products exist in four graphic collections — each telling a different story of Portugal. Each has its own accent colour and visual language."
          : "Todos os produtos Port Wine Souvenir existem em quatro coleções gráficas — cada uma contando uma história diferente de Portugal. Cada uma tem a sua cor de acento e linguagem visual próprias."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {collections.map((col) => (
          <ScrollReveal key={col.name}>
            <div className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-base font-light text-primary">{col.name}</h4>
                <span className="text-[9px] tracking-wider uppercase text-muted-foreground/50 border border-border/30 px-2 py-0.5">{col.accent}</span>
              </div>
              <p className="text-sm text-foreground/70 font-light">{col.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "The Packaging Portfolio" : "O Portfólio de Embalagens"}>
        <p>{isEN
          ? "Seven packaging formats serve across the five zones. Each is designed as a collectible piece — crafted to outlive the product inside. Click any product to explore its gallery."
          : "Sete formatos de embalagem servem as cinco zonas. Cada um é concebido como uma peça colecionável. Clica em qualquer produto para explorar a galeria."}</p>
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
          ? "Every packaging is designed to live beyond the product inside. Once the wine, oil, or candle is consumed, the container becomes a decorative object. This is not a bonus — it is a design principle."
          : "Cada embalagem é concebida para viver além do produto que contém. Uma vez consumido o vinho, o azeite ou a vela, o recipiente torna-se um objeto decorativo. Isto não é um bónus — é um princípio de design."}</p>
        <p>{isEN
          ? "Lead with it in your pitch: 'This packaging becomes a decorative piece — the memory stays with you long after the wine is gone.'"
          : "Lidera com ele no teu pitch: 'Esta embalagem torna-se uma peça decorativa — a memória fica contigo muito depois de o vinho acabar.'"}</p>
      </ContentBlock>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: secondLifeUses[0], img: velaImg },
          { label: secondLifeUses[1], img: portaCoposImg },
          { label: secondLifeUses[2], img: difusorImg },
          { label: secondLifeUses[3], img: plantaImg },
        ].map((item) => (
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
        "Five zones: The Cellar (Piso 0), Ancient Flavours (Piso 0), The Still Hours (Piso 0), The Numbered (Piso 1), The Vault (Piso 1)",
        "The Cellar: Essentials (Ruby, €19.99–€99.99) + Signature (10yr, €44.99–€130) — the volume zone",
        "The Vault: The Icon (50yr, €275–€375) + THE HUNDRED (100yr, €1,000) — the prestige zone",
        "Ancient Flavours: olive oil, honey, sea salt, tea — Portugal's pantry, not just wine",
        "The Still Hours: candles and diffusers — time made sensory in the home",
        "The Numbered: limited numbered ceramics — collectibles on Piso 1",
        "Total portfolio: 298 SKUs across 4 collections and 7 packaging formats",
        "Second Life: every packaging outlives its contents — a design principle, not a bonus",
      ] : [
        "Cinco zonas: The Cellar (Piso 0), Ancient Flavours (Piso 0), The Still Hours (Piso 0), The Numbered (Piso 1), The Vault (Piso 1)",
        "The Cellar: Essentials (Ruby, €19.99–€99.99) + Signature (10a, €44.99–€130) — a zona de volume",
        "The Vault: The Icon (50a, €275–€375) + THE HUNDRED (100a, €1.000) — a zona de prestígio",
        "Ancient Flavours: azeite, mel, sal marinho, chá — a despensa de Portugal, não só vinho",
        "The Still Hours: velas e difusores — o tempo tornado sensorial em casa",
        "The Numbered: cerâmicas numeradas limitadas — colecionáveis no Piso 1",
        "Portfólio total: 298 SKUs em 4 coleções e 7 formatos de embalagem",
        "Segunda Vida: cada embalagem sobrevive ao seu conteúdo — princípio de design, não bónus",
      ]} />

      <ModuleQuizGate
        moduleId="products"
        questions={[
          {
            question: isEN ? "What are the five store zones of The 100's Porto?" : "Quais são as cinco zonas da The 100's Porto?",
            options: ["The Bar, Shop, Gallery, Cellar, Vault", "The Cellar, Ancient Flavours, The Still Hours, The Numbered, The Vault", "The Douro, Coast, City, Museum, Shop", "Essentials, Signature, Icon, Hundred, Olive Oil"],
            correctIndex: 1,
          },
          {
            question: isEN ? "Which zone contains ultra-premium wine (50yr and 100yr)?" : "Qual zona contém vinho ultra-premium (50 anos e 100 anos)?",
            options: ["The Cellar", "The Numbered", "The Vault", "Ancient Flavours"],
            correctIndex: 2,
          },
          {
            question: isEN ? "What products are in the Ancient Flavours zone?" : "Que produtos estão na zona Ancient Flavours?",
            options: isEN
              ? ["Only wine", "Olive oil, honey, sea salt, and heritage tea", "Candles and diffusers", "Limited ceramics"]
              : ["Apenas vinho", "Azeite, mel, sal marinho e chá de herança", "Velas e difusores", "Cerâmicas limitadas"],
            correctIndex: 1,
          },
          {
            question: isEN ? "On which floor are The Numbered and The Vault zones?" : "Em que piso estão as zonas The Numbered e The Vault?",
            options: ["Piso -1", "Piso 0", "Piso 1", "Piso 2"],
            correctIndex: 2,
          },
          {
            question: isEN ? "What is the total SKU count in The 100's Porto?" : "Qual é o número total de SKUs na The 100's Porto?",
            options: ["45", "128", "298", "512"],
            correctIndex: 2,
          },
          {
            question: isEN ? "What does the Second Life concept mean?" : "O que significa o conceito Segunda Vida?",
            options: isEN
              ? ["The wine can be refilled", "The packaging becomes a decorative object after the product is consumed", "A second bottle is gifted", "The product can be returned"]
              : ["O vinho pode ser reabastecido", "A embalagem torna-se um objeto decorativo após consumir o produto", "Uma segunda garrafa é oferecida", "O produto pode ser devolvido"],
            correctIndex: 1,
          },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleProducts;
