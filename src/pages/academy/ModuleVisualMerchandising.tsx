import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, ReflectionBlock, QuizBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import vmImg from "@/assets/academy/visual-merchandising.jpg";
import storeImg from "@/assets/store-interior.jpg";
import plantaMinus1 from "@/assets/planta-piso-minus1.jpg";
import plantaPiso0 from "@/assets/planta-piso0.jpg";
import plantaPiso1 from "@/assets/planta-piso1.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Layers, Eye, Lightbulb, Download } from "lucide-react";

const ModuleVisualMerchandising = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const floors = isEN ? [
    {
      name: "Floor -1 — Back of House",
      planImg: plantaMinus1,
      desc: "The invisible engine of the store. Everything the visitor sees upstairs is prepared and stored here.",
      areas: [
        { area: "Storage & Preparation", size: "18.36m²", detail: "Capacity for 1,350 products. Stock is organised by type, age and packaging. FIFO (First In, First Out) rule always applies." },
        { area: "Interactive Boxes (×3)", size: "3.06 – 4.22m²", detail: "Three immersive experience rooms for special events, private tastings or VIP moments. Each has a unique atmosphere." },
        { area: "Back Office", size: "4.13m²", detail: "Administrative area for daily operations, reporting and stock management." },
        { area: "Safe Room", size: "1.88m²", detail: "Secure storage for high-value products — Very Old, 50-year and 100-year bottles." },
        { area: "Staff Facilities", size: "13.44m²", detail: "Lockers, kitchen/copa and WC. A comfortable space for the team — you perform better when you rest well." },
      ],
    },
    {
      name: "Floor 0 — The Main Stage",
      planImg: plantaPiso0,
      desc: "The heart of the experience. Two entrances (Rua Sá da Bandeira + Rua de Passos Manuel), two shop windows, and the core product display area.",
      areas: [
        { area: "Shop Windows (Montras)", size: "2 × street-facing", detail: "The giant ampoule, the lit podium — the first impression. Must be immaculate at all times. Clean glass twice daily." },
        { area: "Product & Experience Zone", size: "14.87m²", detail: "The main display with the product range organised by material and age. Visitors touch, explore, and discover." },
        { area: "TRADITION Zone", size: "26.65m²", detail: "The largest single area. A sweeping display of the heritage collection, graphic editions and thematic walls." },
        { area: "Interactive Zones (×2)", size: "Various", detail: "Touchscreen areas for the Memory Zone (note to the future) and personalisation stations." },
        { area: "Electrical / Infrastructure", size: "Concealed", detail: "All technical systems hidden behind walls. Visitors must never see cables, storage, or maintenance elements." },
      ],
    },
    {
      name: "Floor 1 — The Premium Level",
      planImg: plantaPiso1,
      desc: "The upper floor is the most intimate space — tastings, premium products, the sales counter and the Cylinder Forest.",
      areas: [
        { area: "Tasting Area + Timeline", size: "22.56m²", detail: "The largest experience zone. Immersive tasting sessions with a visual timeline of Port wine history. This is where visitors fall in love." },
        { area: "Floresta de Cilindros (Cylinder Forest)", size: "8.90m²", detail: "An immersive display of the cylindrical product range. The forest metaphor — walking among capsules of time." },
        { area: "Second Life Display", size: "Within Cylinder Forest", detail: "Showcasing products in their 'after wine' form — candle holders, diffusers, decorative objects." },
        { area: "Sales Counter (Balcão)", size: "Central", detail: "The final moment. Wrap products with theatrical care. The counter is a stage, not a desk." },
        { area: "Premium Product Space", size: "Adjacent to counter", detail: "50-year and 100-year bottles displayed in individual spotlights. Touch-with-permission only." },
        { area: "Client WC", size: "2.05m²", detail: "Impeccable. Scented. The brand must be present even here — details define luxury." },
      ],
    },
  ] : [
    {
      name: "Piso -1 — Bastidores",
      planImg: plantaMinus1,
      desc: "O motor invisível da loja. Tudo o que o visitante vê lá em cima é preparado e armazenado aqui.",
      areas: [
        { area: "Armazenamento e Preparação", size: "18.36m²", detail: "Capacidade para 1.350 produtos. Stock organizado por tipo, idade e embalagem. Regra FIFO (First In, First Out) aplica-se sempre." },
        { area: "Boxes Interativas (×3)", size: "3.06 – 4.22m²", detail: "Três salas de experiência imersiva para eventos especiais, provas privadas ou momentos VIP. Cada uma tem atmosfera única." },
        { area: "Back Office", size: "4.13m²", detail: "Área administrativa para operações diárias, relatórios e gestão de stock." },
        { area: "Área Cofre", size: "1.88m²", detail: "Armazenamento seguro para produtos de alto valor — Very Old, garrafas de 50 e 100 anos." },
        { area: "Instalações Staff", size: "13.44m²", detail: "Balneários, copa e WC. Um espaço confortável para a equipa — o desempenho melhora com bom descanso." },
      ],
    },
    {
      name: "Piso 0 — O Palco Principal",
      planImg: plantaPiso0,
      desc: "O coração da experiência. Duas entradas (Rua Sá da Bandeira + Rua de Passos Manuel), duas montras e a zona principal de produto.",
      areas: [
        { area: "Montras", size: "2 × frente de rua", detail: "A ampola gigante, o pódio iluminado — a primeira impressão. Deve estar imaculada. Limpar vidro duas vezes por dia." },
        { area: "Zona de Produto e Experiência", size: "14.87m²", detail: "A exposição principal com a gama organizada por material e idade. Visitantes tocam, exploram e descobrem." },
        { area: "Zona TRADITION", size: "26.65m²", detail: "A maior área individual. Exposição da coleção heritage, edições gráficas e paredes temáticas." },
        { area: "Zonas Interativas (×2)", size: "Várias", detail: "Áreas de touchscreen para a Zona de Memória (nota para o futuro) e estações de personalização." },
        { area: "Elétrico / Infraestrutura", size: "Oculto", detail: "Todos os sistemas técnicos escondidos atrás das paredes. Visitantes nunca devem ver cabos, armazém ou manutenção." },
      ],
    },
    {
      name: "Piso 1 — O Nível Premium",
      planImg: plantaPiso1,
      desc: "O piso superior é o espaço mais íntimo — provas, produtos premium, o balcão de venda e a Floresta de Cilindros.",
      areas: [
        { area: "Área de Provas + Timeline", size: "22.56m²", detail: "A maior zona de experiência. Sessões de prova imersivas com timeline visual da história do Vinho do Porto. É aqui que os visitantes se apaixonam." },
        { area: "Floresta de Cilindros", size: "8.90m²", detail: "Exposição imersiva da gama cilíndrica. A metáfora da floresta — caminhar entre cápsulas de tempo." },
        { area: "Exposição Segunda Vida", size: "Dentro da Floresta", detail: "Mostra dos produtos na forma 'após o vinho' — suportes de velas, difusores, objetos decorativos." },
        { area: "Balcão de Venda", size: "Central", detail: "O momento final. Embrulha os produtos com cuidado teatral. O balcão é um palco, não uma secretária." },
        { area: "Espaço Produto Premium", size: "Adjacente ao balcão", detail: "Garrafas de 50 e 100 anos em holofotes individuais. Tocar apenas com permissão." },
        { area: "WC Cliente", size: "2.05m²", detail: "Impecável. Perfumado. A marca deve estar presente até aqui — os detalhes definem o luxo." },
      ],
    },
  ];

  const visualRules = isEN ? [
    { rule: "The 2-Second Rule", desc: "A visitor should understand the store's purpose within 2 seconds of looking at the window. If the window needs explanation, it's failed." },
    { rule: "The Touch Principle", desc: "Every product on display must be touchable. The materials — cork, ceramic, wood, brass — are the best salespeople." },
    { rule: "The 45° Angle", desc: "Products should be angled at 45° on shelves — never flat, never vertical. This creates visual depth and invites closer inspection." },
    { rule: "The Light Hierarchy", desc: "Premium products get dedicated spotlights. Standard products get ambient light. The eye follows brightness." },
    { rule: "The Empty Space Rule", desc: "Luxury is defined by what's NOT there. Never overcrowd displays. Each product deserves breathing room." },
    { rule: "The Scent Layer", desc: "The store must have a consistent scent — subtle, warm, woody. Scent triggers memory more powerfully than any other sense." },
  ] : [
    { rule: "A Regra dos 2 Segundos", desc: "Um visitante deve entender o propósito da loja em 2 segundos ao olhar para a montra. Se a montra precisa de explicação, falhou." },
    { rule: "O Princípio do Toque", desc: "Todo produto exposto deve ser tocável. Os materiais — cortiça, cerâmica, madeira, latão — são os melhores vendedores." },
    { rule: "O Ângulo de 45°", desc: "Os produtos devem estar a 45° nas prateleiras — nunca planos, nunca verticais. Isto cria profundidade visual e convida a inspeção." },
    { rule: "A Hierarquia de Luz", desc: "Produtos premium têm holofotes dedicados. Produtos standard têm luz ambiente. O olho segue o brilho." },
    { rule: "A Regra do Espaço Vazio", desc: "O luxo define-se pelo que NÃO está lá. Nunca sobrelotes as exposições. Cada produto merece espaço para respirar." },
    { rule: "A Camada de Aroma", desc: "A loja deve ter um aroma consistente — subtil, quente, amadeirado. O aroma despoleta memórias mais poderosamente que qualquer outro sentido." },
  ];

  const dailyChecklist = isEN ? [
    "Clean all glass surfaces (windows, display cases, ampoule)",
    "Check all spotlights — replace any that flicker or dim",
    "Restock display shelves to exact product positions",
    "Verify all touchscreens are functioning (Memory Zone, personalisation)",
    "Check scent diffuser levels — refill if below 30%",
    "Align all products at 45° angle",
    "Clear any fingerprints from premium display area",
    "Ensure WC is spotless — replace hand towels, check fragrance",
    "Confirm floor inscription lighting is functioning",
    "Walk the full customer journey — fix anything that breaks the immersion",
  ] : [
    "Limpar todas as superfícies de vidro (montras, vitrinas, ampola)",
    "Verificar todos os holofotes — substituir os que tremelicam ou enfraquecem",
    "Repor prateleiras de exposição nas posições exatas",
    "Verificar que todos os touchscreens funcionam (Zona de Memória, personalização)",
    "Verificar níveis do difusor de aroma — reabastecer se abaixo de 30%",
    "Alinhar todos os produtos a 45°",
    "Limpar impressões digitais da zona de produto premium",
    "Garantir WC impecável — trocar toalhas, verificar fragrância",
    "Confirmar que iluminação da inscrição no chão funciona",
    "Percorrer toda a jornada do cliente — corrigir tudo o que quebre a imersão",
  ];

  const handleDownloadPlan = (floor: string) => {
    const urls: Record<string, string> = {
      "-1": "/downloads/planta-piso-minus1.pdf",
      "0": "/downloads/planta-piso0.pdf",
      "1": "/downloads/planta-piso1.pdf",
    };
    const a = document.createElement("a");
    a.href = urls[floor];
    a.download = `The100s_Planta_Piso_${floor}.pdf`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ModuleLayout
      moduleId="visual-merchandising"
      moduleNumber={12}
      title={isEN ? "Visual Standards & Store Layout" : "Padrões Visuais & Layout da Loja"}
      subtitle={isEN ? "The immaculate aesthetic that defines The 100's." : "A estética imaculada que define o The 100's."}
      heroImage={storeImg}
    >
      <ContentBlock title={isEN ? "Every Detail Is Intentional" : "Cada Detalhe É Intencional"}>
        <p>{isEN
          ? "The 100's store is not decorated — it's choreographed. Every spotlight, every angle, every scent and every centimetre of space serves the brand's singular purpose: to transform time into something tangible."
          : "A loja do The 100's não é decorada — é coreografada. Cada holofote, cada ângulo, cada aroma e cada centímetro de espaço serve o propósito singular da marca: transformar o tempo em algo tangível."}</p>
        <p>{isEN
          ? "This module gives you the complete layout of the store — floor by floor — and the visual rules you must uphold every day."
          : "Este módulo dá-te o layout completo da loja — piso a piso — e as regras visuais que deves manter todos os dias."}</p>
      </ContentBlock>

      {/* Floor Plans */}
      <ContentBlock title={isEN ? "Store Layout — Three Floors" : "Layout da Loja — Três Pisos"}>
        <p>{isEN
          ? "The store occupies three levels on the corner of Rua Sá da Bandeira and Rua de Passos Manuel, Porto. Each floor has a distinct purpose in the visitor journey."
          : "A loja ocupa três níveis na esquina da Rua Sá da Bandeira com a Rua de Passos Manuel, Porto. Cada piso tem um propósito distinto na jornada do visitante."}</p>
      </ContentBlock>

      {floors.map((floor, fi) => (
        <ScrollReveal key={floor.name}>
          <div className="border border-border/30 overflow-hidden mb-8">
            <div className="flex items-center justify-between px-8 py-5 border-b border-border/20 bg-card/20">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-primary/5 rounded-sm">
                  <Layers className="w-5 h-5 text-primary/60" />
                </div>
                <div>
                  <p className="text-lg font-light text-primary">{floor.name}</p>
                  <p className="text-sm text-foreground/50 font-light mt-0.5">{floor.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownloadPlan(String(fi - 1))}
                className="flex items-center gap-2 text-xs tracking-wider uppercase text-primary/60 hover:text-primary border border-border/30 hover:border-primary/30 px-3 py-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                PDF
              </button>
            </div>

            <div className="p-6">
              <div className="relative overflow-hidden rounded-sm mb-6 bg-secondary/20">
                <img src={floor.planImg} alt={floor.name} className="w-full object-contain max-h-[500px]" />
              </div>
              <div className="space-y-3">
                {floor.areas.map((a, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border border-border/20 hover:border-primary/10 transition-colors">
                    <MapPin className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-sm font-light text-foreground/80">{a.area}</p>
                        <span className="text-[9px] tracking-wider uppercase text-muted-foreground/50 border border-border/30 px-1.5 py-0.5">{a.size}</span>
                      </div>
                      <p className="text-xs text-foreground/50 font-light leading-relaxed">{a.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}

      <ContentBlock title={isEN ? "The Six Visual Rules" : "As Seis Regras Visuais"}>
        <p>{isEN
          ? "These rules are non-negotiable. They define the difference between a beautiful store and an unforgettable experience."
          : "Estas regras são inegociáveis. Definem a diferença entre uma loja bonita e uma experiência inesquecível."}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visualRules.map((r, i) => (
          <ScrollReveal key={r.rule} delay={i * 0.05}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-4 h-4 text-primary/50" />
                <p className="text-primary font-light">{r.rule}</p>
              </div>
              <p className="text-sm text-foreground/60 font-light leading-relaxed">{r.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "Daily Opening Checklist" : "Checklist Diário de Abertura"}>
        <div className="space-y-3">
          {dailyChecklist.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1.5 w-4 h-4 border border-primary/30 rounded-sm shrink-0 flex items-center justify-center">
                <span className="text-[10px] text-primary/50">{i + 1}</span>
              </div>
              <p className="text-sm text-foreground/60 font-light">{item}</p>
            </div>
          ))}
        </div>
      </ExpandableSection>

      <ImageBlock src={storeImg} alt={isEN ? "Store atmosphere" : "Atmosfera da loja"} caption={isEN ? "Every element curated to create an immersive time capsule" : "Cada elemento curado para criar uma cápsula do tempo imersiva"} />

      <KeyTakeaway items={isEN ? [
        "Three floors: Back of House (-1), Main Stage (0), Premium Level (1)",
        "1,350 product capacity in storage — FIFO rule applies",
        "Two street entrances and two shop windows — both must be immaculate",
        "Floresta de Cilindros (Cylinder Forest) is the signature display on Floor 1",
        "Six visual rules: 2-Second Rule, Touch Principle, 45° Angle, Light Hierarchy, Empty Space, Scent Layer",
        "Daily checklist: 10 critical items from glass cleaning to full journey walkthrough",
      ] : [
        "Três pisos: Bastidores (-1), Palco Principal (0), Nível Premium (1)",
        "Capacidade de 1.350 produtos em armazém — regra FIFO aplica-se",
        "Duas entradas de rua e duas montras — ambas devem estar imaculadas",
        "Floresta de Cilindros é a exposição assinatura no Piso 1",
        "Seis regras visuais: Regra dos 2 Segundos, Princípio do Toque, Ângulo 45°, Hierarquia de Luz, Espaço Vazio, Camada de Aroma",
        "Checklist diário: 10 itens críticos da limpeza de vidros ao percurso completo da jornada",
      ]} />

      <QuizBlock moduleId="visual-merchandising" questions={isEN ? [
        { question: "At what angle should products be displayed on shelves?", options: ["90° (vertical)", "0° (flat)", "45°", "30°"], correct: 2 },
        { question: "What is the 'Floresta de Cilindros'?", options: ["A wine cellar in the basement", "An immersive display of cylindrical products on Floor 1", "A forest-themed exterior decoration", "The name of the store's ventilation system"], correct: 1 },
        { question: "How many products can be stored in the basement storage area?", options: ["500", "850", "1,350", "2,000"], correct: 2 },
      ] : [
        { question: "A que ângulo devem os produtos ser expostos nas prateleiras?", options: ["90° (vertical)", "0° (plano)", "45°", "30°"], correct: 2 },
        { question: "O que é a 'Floresta de Cilindros'?", options: ["Uma cave de vinho no subsolo", "Uma exposição imersiva de produtos cilíndricos no Piso 1", "Uma decoração exterior com tema de floresta", "O nome do sistema de ventilação da loja"], correct: 1 },
        { question: "Quantos produtos podem ser armazenados no subsolo?", options: ["500", "850", "1.350", "2.000"], correct: 2 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "You arrive at the store and notice the window display has fingerprints, one spotlight is off, and a product is misaligned. In what order do you fix these, and why?",
        "A visitor says 'This feels like a museum, not a shop.' Is that a compliment or a problem? How do you respond?",
        "Describe how you would rearrange the premium display if a new 100-year bottle arrives in the collection.",
      ] : [
        "Chegas à loja e notas que a montra tem impressões digitais, um holofote está apagado e um produto está desalinhado. Em que ordem corriges e porquê?",
        "Um visitante diz 'Isto parece um museu, não uma loja.' É um elogio ou um problema? Como respondes?",
        "Descreve como reorganizarias a exposição premium se chegasse uma nova garrafa de 100 anos à coleção.",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleVisualMerchandising;
