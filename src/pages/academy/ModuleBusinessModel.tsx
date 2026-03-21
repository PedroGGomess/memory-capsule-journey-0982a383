import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, QuizBlock, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import heroDrop from "@/assets/hero-drop.jpg";
import { QrCode, Smartphone, TrendingUp, Globe, Store, ShoppingCart, User } from "lucide-react";

const ModuleBusinessModel = () => {
  const { language } = useLanguage();
  const isEN = language === "en";
  return (
  <ModuleLayout
    moduleId="business-model"
    moduleNumber={8}
    title={isEN ? "Business Model & Digital Strategy" : "Modelo de Negócio e Estratégia Digital"}
    subtitle={isEN ? "How The 100's operates, grows and captures lasting relationships." : "Como o The 100's opera, cresce e cria relações duradouras."}
    heroImage={heroDrop}
  >
    <ContentBlock title={isEN ? "What We Do" : "O Que Fazemos"}>
      <p>{isEN
        ? "The 100's operates at the intersection of four key areas. Together, they form a system that transforms a tourist moment into a lasting emotional and commercial relationship."
        : "O The 100's opera na interseção de quatro áreas-chave. Juntas, formam um sistema que transforma um momento turístico numa relação emocional e comercial duradoura."}</p>
    </ContentBlock>

    <VideoBlock
      title="Modelo de Negócio"
      description="Break-even, margens e sustentabilidade financeira."
      duration="10:15"
      poster={heroDrop}
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {(isEN ? [
        { title: "Product Design & Personalization", desc: "We design collectible objects inspired by culture, time and place. Every product is created with premium materials and refined aesthetics, transforming traditional souvenirs into meaningful design pieces." },
        { title: "Immersive Retail Experience", desc: "Our stores are designed as experiential destinations. The space invites visitors to slow down, explore and interact with the products — immersive, emotionally engaging and aesthetically memorable." },
        { title: "AI & Data-Driven Conversion", desc: "The 100's integrates technology into the retail experience. Through digital capture tools, we transform visitors into long-term customers and analyze behavior to optimize engagement." },
        { title: "Tourism Premium Gifting", desc: "We are creating a new category in tourism retail. Instead of traditional souvenirs, we offer premium collectible gifts that represent cultural heritage and emotional value." },
      ] : [
        { title: "Design e Personalização de Produtos", desc: "Concebemos objetos colecionáveis inspirados na cultura, tempo e lugar. Cada produto é criado com materiais premium e estética refinada, transformando souvenirs tradicionais em peças de design significativas." },
        { title: "Experiência de Retalho Imersiva", desc: "As nossas lojas são concebidas como destinos experienciais. O espaço convida os visitantes a abrandar, explorar e interagir com os produtos — imersivo, emocionalmente envolvente e esteticamente memorável." },
        { title: "Conversão com IA e Dados", desc: "O The 100's integra tecnologia na experiência de retalho. Através de ferramentas de captura digital, transformamos visitantes em clientes de longo prazo e analisamos comportamentos para otimizar o envolvimento." },
        { title: "Ofertas Premium de Turismo", desc: "Estamos a criar uma nova categoria no retalho turístico. Em vez de souvenirs tradicionais, oferecemos presentes colecionáveis premium que representam herança cultural e valor emocional." },
      ]).map(area => (
        <ScrollReveal key={area.title}>
          <div className="border border-border/30 p-6 h-full">
            <h4 className="text-base font-light text-primary mb-3">{area.title}</h4>
            <p className="text-sm text-foreground/60 font-light leading-relaxed">{area.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ContentBlock title="Digital Capture Strategy">
      <p>A key component of the brand is its digital capture system. The physical experience connects with a digital ecosystem that allows The 100's to maintain a relationship with the visitor after the trip.</p>
    </ContentBlock>

    <div className="space-y-4">
      {[
        {
          icon: QrCode,
          title: "Visitor Data Capture",
          desc: "QR codes and digital interactions throughout the store capture visitor contact information at the moment of highest engagement.",
        },
        {
          icon: Smartphone,
          title: "WhatsApp Automation",
          desc: "Automated WhatsApp flows allow the brand to follow up with visitors immediately after their experience, deepening the emotional connection.",
        },
        {
          icon: TrendingUp,
          title: "Behavioral Data Intelligence",
          desc: "Customer behavior is analyzed to understand preferences and engagement patterns, optimizing the experience and increasing long-term conversion.",
        },
        {
          icon: ShoppingCart,
          title: "Post-Visit Monetization",
          desc: "After leaving the store, visitors receive personalized offers, remarketing campaigns, new product releases and collectible editions — converting a single visit into a long-term customer relationship.",
        },
      ].map(item => (
        <ScrollReveal key={item.title}>
          <div className="border border-border/30 p-6 flex gap-5 items-start">
            <div className="p-3 bg-primary/10 rounded-sm shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-base font-light text-foreground/90 mb-2">{item.title}</h4>
              <p className="text-sm text-foreground/60 font-light leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ContentBlock title="Business Model">
      <p>The 100's is designed as a globally scalable retail system. The model is built around three interconnected components that allow rapid growth while maintaining brand quality.</p>
    </ContentBlock>

    <div className="space-y-6">
      {[
        {
          icon: Store,
          num: "01",
          title: "Flagship Retail Stores",
          desc: "Premium stores located in major tourism destinations. These stores create immersive brand experiences and sell collectible editions. They are the heart of the brand — spaces where time is celebrated and memories are made.",
        },
        {
          icon: Globe,
          num: "02",
          title: "Satellite Stores & Franchise Model",
          desc: "Smaller retail units allow the brand to expand rapidly across tourism hotspots worldwide. Examples include The 100s Sevilla and The 100s London. The franchise model ensures consistency in brand experience while enabling local adaptation.",
        },
        {
          icon: ShoppingCart,
          num: "03",
          title: "E-commerce & Post-Visit Sales",
          desc: "Visitors can continue purchasing products after their visit through online channels. The concept of 'Send a Memory' allows customers to gift experiences internationally — extending the brand's reach beyond the physical store.",
        },
      ].map(model => (
        <ScrollReveal key={model.title}>
          <div className="border border-border/30 p-8 flex gap-6 items-start">
            <span className="text-4xl font-light text-primary/20 shrink-0">{model.num}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <model.icon className="w-5 h-5 text-primary/60" />
                <h4 className="text-lg font-light text-foreground/90">{model.title}</h4>
              </div>
              <p className="text-sm text-foreground/60 font-light leading-relaxed">{model.desc}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <ExpandableSection title="The 'Send a Memory' Concept">
      <p>One of the most powerful expressions of the business model is the ability to gift a memory across borders.</p>
      <p>A visitor who experienced The 100's in Lisbon can send a bottle — and its story — to a friend in Tokyo, New York or London. The emotional connection travels with the product.</p>
      <p>This concept turns every customer into a brand ambassador, expanding the ecosystem organically through personal connections.</p>
    </ExpandableSection>

    <ContentBlock title="The Transformation System">
      <p>At its core, The 100's is a system designed to convert:</p>
    </ContentBlock>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { from: "moments", arrow: "→", to: "objects" },
        { from: "experiences", arrow: "→", to: "memories" },
        { from: "visitors", arrow: "→", to: "long-term relationships" },
      ].map(item => (
        <div key={item.from} className="border border-border/30 p-6 text-center">
          <p className="text-muted-foreground/50 text-sm font-light italic">{item.from}</p>
          <p className="text-primary/40 text-xl my-2">{item.arrow}</p>
          <p className="text-primary text-sm font-light">{item.to}</p>
        </div>
      ))}
    </div>

    <ContentBlock title="The Executive Team">
      <p>The 100's is led by a team of experienced founders and executives, each bringing deep expertise in their respective domains:</p>
    </ContentBlock>

    <div className="space-y-4">
      {[
        {
          name: "Rui Marques",
          role: "CEO & Founder",
          bio: "Ex-CEO of GoContact, with over 20 years of entrepreneurial experience. The visionary behind The 100's concept and ecosystem.",
        },
        {
          name: "Carla Machado",
          role: "Chief Operating Officer (COO)",
          bio: "Responsible for the operational excellence of the brand — ensuring that the experience is consistently delivered across every touchpoint.",
        },
        {
          name: "Paulo Gonçalves",
          role: "Chief Marketing Officer & CPO",
          bio: "Leads brand marketing and product strategy, ensuring the visual and narrative identity of The 100's remains coherent and powerful.",
        },
        {
          name: "João Camarate",
          role: "Head of Innovation & M&A",
          bio: "Drives innovation within the ecosystem and leads mergers and acquisition strategy to accelerate global expansion.",
        },
        {
          name: "Bruno Azevedo",
          role: "Chief Financial Officer (CFO)",
          bio: "Oversees the financial architecture of the brand, supporting sustainable growth and investment readiness.",
        },
      ].map(person => (
        <ScrollReveal key={person.name}>
          <div className="border border-border/30 p-6 flex gap-5 items-start">
            <div className="p-3 bg-primary/10 rounded-sm shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-base font-light text-foreground/90 mb-0.5">{person.name}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-primary/60 mb-2">{person.role}</p>
              <p className="text-sm text-foreground/60 font-light leading-relaxed">{person.bio}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <KeyTakeaway items={[
      "Four areas: Product Design, Immersive Retail, AI & Data-Driven Conversion, Premium Gifting",
      "Digital capture: QR codes, WhatsApp automation and digital funnels",
      "Memory Zone: SMS/WhatsApp sent exactly 1 year after visit — converting a visit into a long-term relationship",
      "Three business model pillars: Flagship stores, Satellite/Franchise (e.g. The 100s Sevilla, The 100s London), E-commerce",
      "'Send a Memory' allows the brand to reach customers globally",
      "Executive team: Rui Marques (CEO), Carla Machado (COO), Paulo Gonçalves (CMO/CPO), João Camarate (Innovation), Bruno Azevedo (CFO)"
    ]} />

    <QuizBlock moduleId="business-model" questions={[
      {
        question: "What are the three components of The 100's business model?",
        options: [
          "Wine, Design, Tourism",
          "Flagship Stores, Satellite/Franchise, E-commerce",
          "QR codes, WhatsApp, Digital funnels",
          "Storytelling, Emotion, Memory"
        ],
        correct: 1,
      },
      {
        question: "What does the 'Send a Memory' concept allow customers to do?",
        options: [
          "Return products for a refund",
          "Send a digital postcard",
          "Gift The 100's experience internationally",
          "Subscribe to a wine club"
        ],
        correct: 2,
      },
    ]} />

    <ReflectionBlock questions={[
      "How would you explain the digital capture strategy to a fellow team member?",
      "Why is post-visit monetization important for a tourism brand like The 100's?"
    ]} />

    <ModuleQuizGate
      moduleId="business-model"
      questions={[
        { question: "O que é o break-even point da loja?", options: ["O lucro máximo", "O ponto onde receitas igualam custos — a loja começa a dar lucro", "O dia de maior venda", "O orçamento anual"], correctIndex: 1 },
        { question: "Porque é importante a equipa conhecer o modelo de negócio?", options: ["Não é importante", "Para entender como cada venda contribui para a sustentabilidade", "Apenas para gestores", "Para pedir aumento"], correctIndex: 1 },
        { question: "O que acontece quando o ticket médio é inferior a €60?", options: ["É normal", "Pode indicar risco para a sustentabilidade financeira", "É excelente", "Não tem impacto"], correctIndex: 1 },
        { question: "Como se calcula a taxa de conversão?", options: ["Vendas totais / dias abertos", "Número de compras / número de visitantes × 100", "Lucro / investimento", "Produtos vendidos / stock total"], correctIndex: 1 },
        { question: "Qual a gama que mais contribui para a margem do negócio?", options: ["Entry Gift", "Legacy e Icon (gamas premium)", "Apenas o THE HUNDRED", "Todas contribuem igual"], correctIndex: 1 },
      ]}
    />
  </ModuleLayout>
  );
};

export default ModuleBusinessModel;
