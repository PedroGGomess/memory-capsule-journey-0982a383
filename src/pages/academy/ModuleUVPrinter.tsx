import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, QuizBlock, ReflectionBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Printer, Zap } from "lucide-react";

const ModuleUVPrinter = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const steps = isEN ? [
    { step: "1. Client Chooses Design", desc: "Name, date, message, collection design. Simple interface in-store." },
    { step: "2. Upload File", desc: "Digital design is prepped (PNG, PDF, JPG accepted). Takes 2-3 minutes." },
    { step: "3. Setup Printer", desc: "UV printer is calibrated for the container type (cylinder, cube, wood, etc)." },
    { step: "4. Print", desc: "Ink is UV-cured instantly. No drying time needed. High-resolution, permanent finish." },
    { step: "5. Inspect", desc: "Quality check: color accuracy, clarity, placement. If perfect, hand to customer." },
  ] : [
    { step: "1. Cliente Escolhe Design", desc: "Nome, data, mensagem, design de coleção. Interface simples na loja." },
    { step: "2. Carregar Ficheiro", desc: "Design digital é preparado (PNG, PDF, JPG aceitos). Leva 2-3 minutos." },
    { step: "3. Configurar Impressora", desc: "Impressora UV é calibrada para o tipo de recipiente (cilindro, cubo, madeira, etc)." },
    { step: "4. Imprimir", desc: "Tinta é curada a UV instantaneamente. Sem tempo de secagem necessário. Acabamento de alta resolução, permanente." },
    { step: "5. Inspecionar", desc: "Verificação de qualidade: precisão de cor, clareza, colocação. Se perfeito, entrega ao cliente." },
  ];

  const expectations = isEN ? [
    { wait: "Simple text personalization", time: "3-5 minutes" },
    { wait: "Complex design (multi-color, detailed graphics)", time: "10-15 minutes" },
    { wait: "Reprint (if quality issue)", time: "5 minutes additional" },
  ] : [
    { wait: "Personalização de texto simples", time: "3-5 minutos" },
    { wait: "Design complexo (multi-cor, gráficos detalhados)", time: "10-15 minutos" },
    { wait: "Reimpressão (se problema de qualidade)", time: "5 minutos adicionais" },
  ];

  const wow = isEN ? [
    "Show the client the preview on screen before printing — let them see their personalization come to life",
    "Explain the technology: 'This is UV-cured ink. It bonds permanently to the container. Your personalization will last forever.'",
    "Print in front of them if possible — watching the printer work is part of the WOW moment",
    "Quality check together — make them part of the process, not a bystander",
    "Wrap with ceremony — the personalization makes this their unique Memory Capsule",
  ] : [
    "Mostra ao cliente a pré-visualização no ecrã antes de imprimir — deixa-o ver a sua personalização ganhar vida",
    "Explica a tecnologia: 'Esta é tinta curada a UV. Liga-se permanentemente ao recipiente. A tua personalização vai durar para sempre.'",
    "Imprime à sua frente se possível — observar a impressora trabalhar é parte do momento WOW",
    "Verificação de qualidade em conjunto — torna-o parte do processo, não um mero observador",
    "Embrulha com cerimónia — a personalização torna esta a sua Memory Capsule única",
  ];

  return (
    <ModuleLayout
      moduleId="uv-printer"
      moduleNumber={17}
      title={isEN ? "UV Personalization Technology" : "Impressora UV"}
      subtitle={isEN ? "Transform a product into a personal memory. Master the technology, perfect the ceremony." : "Transforma um produto numa memória pessoal. Domina a tecnologia, perfecciona a cerimónia."}
      heroImage="/placeholder.svg"
    >
      <ContentBlock title={isEN ? "What is UV Personalization?" : "O que é Personalização UV?"}>
        <p>{isEN
          ? "UV (ultraviolet) printing is a technique where ink is instantly cured using ultraviolet light. Unlike traditional printing, there's no drying time — the moment the ink hits the bottle, it's permanently bonded to the surface."
          : "A impressão UV (ultravioleta) é uma técnica em que a tinta é curada instantaneamente usando luz ultravioleta. Ao contrário da impressão tradicional, não há tempo de secagem — no momento em que a tinta atinge a garrafa, fica permanentemente ligada à superfície."}</p>
        <p>{isEN
          ? "At The 100's, this means we can personalize bottles, cubes, and wooden containers with names, dates, messages, or custom designs — all while the customer watches."
          : "No The 100's, isto significa que podemos personalizar garrafas, cubos e recipientes de madeira com nomes, datas, mensagens, ou designs personalizados — tudo enquanto o cliente observa."}</p>
      </ContentBlock>

      <div className="border border-primary/20 bg-primary/5 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary mb-2">{isEN ? "The Key Advantage" : "A Vantagem Principal"}</p>
            <p className="text-sm text-foreground/70 font-light">
              {isEN
                ? "UV-cured ink is permanent, water-resistant, and scratch-resistant. It won't fade, peel, or wash off. The personalization becomes part of the object — just like the Memory Capsule itself."
                : "A tinta curada a UV é permanente, resistente à água e resistente a arranhões. Não desbota, descasca ou lava. A personalização torna-se parte do objeto — tal como a Memory Capsule em si."}</p>
          </div>
        </div>
      </div>

      <ContentBlock title={isEN ? "What Can We Personalize?" : "O Que Podemos Personalizar?"}>
        <p>{isEN
          ? "Almost anything in The 100's collection can be personalized:"
          : "Quase tudo na coleção do The 100's pode ser personalizado:"}</p>
      </ContentBlock>

      <div className="space-y-3">
        {(isEN ? [
          { item: "Bottles (Cylinders)", example: "Name, date, 'Happy Birthday', initials, coordinates, QR codes" },
          { item: "Cubes", example: "Full names, romantic messages, 'Mr & Mrs', wedding dates, coordinates" },
          { item: "Wooden Containers", example: "Dates, monograms, logos, artwork, maps, personal messages" },
          { item: "Box Packaging", example: "Special messages, dates, collection themes" },
        ] : [
          { item: "Garrafas (Cilindros)", example: "Nome, data, 'Feliz Aniversário', iniciais, coordenadas, códigos QR" },
          { item: "Cubos", example: "Nomes completos, mensagens românticas, 'Sr & Sra', datas de casamento, coordenadas" },
          { item: "Recipientes de Madeira", example: "Datas, monogramas, logos, obras de arte, mapas, mensagens pessoais" },
          { item: "Embalagem de Caixa", example: "Mensagens especiais, datas, temas de coleção" },
        ]).map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500">
              <p className="text-sm font-light text-primary mb-1">{item.item}</p>
              <p className="text-xs text-foreground/60 font-light italic">{item.example}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "How to Operate the UV Printer" : "Como Operar a Impressora UV"}>
        <p>{isEN
          ? "The process is simple when you break it down into five steps:"
          : "O processo é simples quando o divides em cinco passos:"}</p>
      </ContentBlock>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-5 hover:border-primary/20 transition-all duration-500">
              <div className="flex items-start gap-3">
                <Printer className="w-4 h-4 text-primary/60 shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-light text-primary mb-1">{s.step}</p>
                  <p className="text-sm text-foreground/60 font-light">{s.desc}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Managing Wait Time Expectations" : "Gestão de Expectativas de Tempo de Espera"}>
        <p>{isEN
          ? "Always set expectations upfront. Most clients are happy to wait 10-15 minutes if they understand why and know it's worth it."
          : "Sempre define expectativas antecipadamente. A maioria dos clientes fica feliz em esperar 10-15 minutos se compreender porquê e sabe que vale a pena."}</p>
      </ContentBlock>

      <div className="space-y-3">
        {expectations.map((e, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500 flex justify-between items-center">
              <p className="text-sm font-light text-foreground/70">{e.wait}</p>
              <p className="text-xs font-medium text-primary/70 bg-primary/5 px-3 py-1 rounded">{e.time}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "File Formats & Best Practices" : "Formatos de Ficheiro & Melhores Práticas"}>
        <div className="space-y-3 text-sm text-foreground/70 font-light">
          <p><span className="text-primary/70 font-medium">{isEN ? "Accepted formats:" : "Formatos aceitos:"}</span> PNG, PDF, JPG</p>
          <p><span className="text-primary/70 font-medium">{isEN ? "Resolution:" : "Resolução:"}</span> {isEN ? "300 DPI minimum for best quality" : "300 DPI mínimo para melhor qualidade"}</p>
          <p><span className="text-primary/70 font-medium">{isEN ? "Color mode:" : "Modo de cor:"}</span> {isEN ? "RGB for digital designs, CMYK for print files" : "RGB para designs digitais, CMYK para ficheiros de impressão"}</p>
          <p><span className="text-primary/70 font-medium">{isEN ? "Pro tip:" : "Dica profissional:"}</span> {isEN ? "If customer brings design on phone, take a screenshot and convert to digital file" : "Se cliente traz design no telemóvel, tira uma captura de ecrã e converte para ficheiro digital"}</p>
        </div>
      </ExpandableSection>

      <ContentBlock title={isEN ? "Making UV Personalization a WOW Moment" : "Tornando a Personalização UV um Momento WOW"}>
        <p>{isEN
          ? "The technology is cool, but the ceremony is what creates the memory. Here's how to turn personalization into an unforgettable experience:"
          : "A tecnologia é interessante, mas a cerimónia é o que cria a memória. Eis como transformar a personalização numa experiência inesquecível:"}</p>
      </ContentBlock>

      <div className="space-y-2 text-sm text-foreground/70 font-light">
        {wow.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="flex items-start gap-3 p-3 border border-border/20 rounded">
              <span className="text-primary/50 shrink-0">•</span>
              <p>{item}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <KeyTakeaway items={isEN ? [
        "UV printing = instant ink curing using ultraviolet light. No drying time, permanent finish",
        "Personalization can include: names, dates, messages, initials, coordinates, QR codes, artwork",
        "Five-step process: Choose Design → Upload File → Setup → Print → Inspect",
        "Wait time: 3-5 minutes for simple text, 10-15 minutes for complex designs",
        "File formats: PNG, PDF, JPG at 300 DPI minimum",
        "UV-cured ink is permanent, water-resistant, and scratch-resistant",
        "Turn personalization into a WOW moment by showing the preview, explaining technology, printing in front of them, and wrapping with ceremony",
      ] : [
        "Impressão UV = curação instantânea de tinta usando luz ultravioleta. Sem tempo de secagem, acabamento permanente",
        "Personalização pode incluir: nomes, datas, mensagens, iniciais, coordenadas, códigos QR, obras de arte",
        "Processo de cinco passos: Escolher Design → Carregar Ficheiro → Configurar → Imprimir → Inspecionar",
        "Tempo de espera: 3-5 minutos para texto simples, 10-15 minutos para designs complexos",
        "Formatos de ficheiro: PNG, PDF, JPG a 300 DPI mínimo",
        "Tinta curada a UV é permanente, resistente à água e resistente a arranhões",
        "Transforma a personalização num momento WOW mostrando a pré-visualização, explicando tecnologia, imprimindo à sua frente e embrulhando com cerimónia",
      ]} />

      <QuizBlock moduleId="uv-printer" questions={isEN ? [
        { question: "What does UV stand for in UV printing?", options: ["Ultra Value", "Ultraviolet", "Ultra Vertical", "Universal Vinyl"], correct: 1 },
        { question: "How long does UV ink take to dry?", options: ["24 hours", "30 minutes", "Instantly (no drying time)", "1 hour"], correct: 2 },
        { question: "What file formats are accepted for UV printing?", options: ["Word documents", "PNG, PDF, JPG", "Only JPG", "PNG only"], correct: 1 },
      ] : [
        { question: "O que significa UV na impressão UV?", options: ["Ultra Valor", "Ultravioleta", "Ultra Vertical", "Vinil Universal"], correct: 1 },
        { question: "Quanto tempo leva a tinta UV a secar?", options: ["24 horas", "30 minutos", "Instantaneamente (sem tempo de secagem)", "1 hora"], correct: 2 },
        { question: "Que formatos de ficheiro são aceitos para impressão UV?", options: ["Documentos Word", "PNG, PDF, JPG", "Apenas JPG", "PNG apenas"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Describe how you would explain UV personalization to someone who has never seen it before.",
        "A customer wants to personalize a cube with their wedding date and names. Walk through the process step-by-step.",
        "How would you turn the wait time for personalization printing into part of the WOW experience?",
      ] : [
        "Descreve como explicarias a personalização UV a alguém que nunca viu antes.",
        "Um cliente quer personalizar um cubo com a data do casamento e nomes. Percorre o processo passo a passo.",
        "Como transformarias o tempo de espera da impressão de personalização em parte da experiência WOW?",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleUVPrinter;
