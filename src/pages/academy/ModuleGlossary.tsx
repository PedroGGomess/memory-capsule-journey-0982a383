import { ModuleLayout, ContentBlock, KeyTakeaway, QuizBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import portWineImg from "@/assets/academy/port-wine-pour.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { Search } from "lucide-react";

interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
}

const ModuleGlossary = () => {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = isEN
    ? ["Wine Making", "Tasting", "Port Wine Types", "The 100's Brand", "Materials"]
    : ["Vinificação", "Prova", "Tipos de Vinho do Porto", "Marca The 100's", "Materiais"];

  const terms: GlossaryTerm[] = isEN ? [
    { term: "Terroir", category: "Wine Making", definition: "The complete natural environment in which the wine is produced — soil, climate, altitude, and human tradition. The Douro Valley's terroir is what makes Port wine unique in the world." },
    { term: "Barrel Ageing", category: "Wine Making", definition: "The process of maturing wine in oak barrels. For Tawny Port, this can last from 10 to over 100 years. The wood gives the wine its amber colour, smoothness, and complex aromas." },
    { term: "Fortification", category: "Wine Making", definition: "The addition of grape spirit (aguardente) during fermentation. This stops fermentation, preserving natural sugars and raising alcohol content — the defining step in creating Port wine." },
    { term: "Lagar", category: "Wine Making", definition: "A traditional stone tank where grapes are foot-trodden. This ancient method extracts colour and flavour gently, producing wines of exceptional depth." },
    { term: "Vintage / Colheita", category: "Wine Making", definition: "Wine from a single exceptional harvest year. A Colheita Tawny is aged in barrel from one specific vintage — a time capsule of that year's conditions." },
    { term: "Blending (Lote)", category: "Wine Making", definition: "The art of combining wines from different years and barrels to achieve a consistent and complex flavour profile. 10-Year, 30-Year, and 50-Year Tawnies are masterful blends." },
    { term: "Douro Valley", category: "Wine Making", definition: "A UNESCO World Heritage wine region in northern Portugal. The steep terraced hillsides along the Douro River have produced wine for over 2,000 years." },
    { term: "Tawny (Colour)", category: "Tasting", definition: "The warm amber-brown colour that develops as Port wine ages in wood. The name 'Tawny' itself refers to this colour — a visual indicator of time spent in barrel." },
    { term: "Nose / Aroma", category: "Tasting", definition: "The scent of the wine. Tawny Port develops notes of caramel, dried fruit, vanilla, nuts, and spice as it ages. The nose alone can reveal the wine's age." },
    { term: "Finish / Aftertaste", category: "Tasting", definition: "The flavour that lingers after swallowing. A long, complex finish is the hallmark of a great aged Port. The longer it lasts, the more extraordinary the wine." },
    { term: "Palate", category: "Tasting", definition: "The taste sensations experienced in the mouth — sweetness, acidity, body, warmth. A great Tawny will be balanced between sweet richness and elegant dryness." },
    { term: "Dried Fruit Notes", category: "Tasting", definition: "Flavours of figs, dates, raisins, and apricots — characteristic of well-aged Tawny Port. These develop naturally through decades of oxidative ageing." },
    { term: "Oxidative Ageing", category: "Tasting", definition: "Controlled exposure to small amounts of oxygen in the barrel. This transforms the wine's colour, aroma and texture — it's what makes Tawny different from Ruby." },
    { term: "Tawny Port", category: "Port Wine Types", definition: "Aged in wooden barrels, developing amber colour and complex flavours. The longer the ageing, the more refined: 10yr (Signature), 30yr (Legacy), 50yr (The Icon), 100yr (The Hundred)." },
    { term: "White Port", category: "Port Wine Types", definition: "Made from white grapes, offering lighter flavours — honey, citrus, almonds. Aged White Port develops extraordinary complexity and golden colour." },
    { term: "Ruby Port", category: "Port Wine Types", definition: "Aged in large tanks to preserve its deep red colour and fresh, fruity character. Young, vibrant, and the most accessible style of Port wine." },
    { term: "Sage Port / Vintage Tawny", category: "Port Wine Types", definition: "A Tawny from a single harvest year, aged in barrel. Combines the elegance of Tawny ageing with the specificity of a single vintage." },
    { term: "Late Bottled Vintage (LBV)", category: "Port Wine Types", definition: "A vintage Port aged in barrel for 4-6 years before bottling. Offers vintage character at a more accessible price point than Vintage Port." },
    { term: "Memory Capsule", category: "The 100's Brand", definition: "The core concept of The 100's — each product is a capsule that preserves a moment in time. 100ml of history, sealed and gifted." },
    { term: "Second Life", category: "The 100's Brand", definition: "The philosophy that every product outlives the wine. After consumption, the container becomes a decorative object — candle holder, diffuser, jewellery box." },
    { term: "Time Stamp", category: "The 100's Brand", definition: "The personalised engraving on each bottle — a specific date and time chosen by the visitor. It makes the product unique in the world." },
    { term: "The Hundred", category: "The 100's Brand", definition: "The pinnacle product — 100-year-old Port wine in 100ml. The ultimate expression of time, patience and legacy." },
    { term: "Floresta de Cilindros", category: "The 100's Brand", definition: "The 'Cylinder Forest' — a display area in the store featuring the cylindrical product range, creating an immersive visual experience." },
    { term: "Cork", category: "Materials", definition: "Sustainable Portuguese material used in product packaging. Connects to Portugal's status as the world's largest cork producer. Warm, tactile, eco-friendly." },
    { term: "Ceramic", category: "Materials", definition: "Used in combination with cork for the two-tone product range. Adds refined texture and visual contrast." },
    { term: "Brass (Latão)", category: "Materials", definition: "Premium metallic accent used in the wood-based products. Represents durability, timelessness, and understated luxury." },
    { term: "Walnut Wood (Nogueira)", category: "Materials", definition: "Dark, rich wood used in premium product casings. Symbolises warmth, heritage, and craftsmanship." },
    { term: "Oak Wood (Carvalho)", category: "Materials", definition: "The pinnacle material — directly connected to the barrels in which Port wine ages. Oak products represent the deepest connection between container and content." },
  ] : [
    { term: "Terroir", category: "Vinificação", definition: "O ambiente natural completo em que o vinho é produzido — solo, clima, altitude e tradição humana. O terroir do Vale do Douro é o que torna o Vinho do Porto único no mundo." },
    { term: "Envelhecimento em Barril", category: "Vinificação", definition: "O processo de maturação do vinho em barris de carvalho. Para Tawny, pode durar de 10 a mais de 100 anos. A madeira dá ao vinho a cor âmbar, suavidade e aromas complexos." },
    { term: "Fortificação", category: "Vinificação", definition: "A adição de aguardente durante a fermentação. Isto interrompe a fermentação, preserva açúcares naturais e eleva o teor alcoólico — o passo que define o Vinho do Porto." },
    { term: "Lagar", category: "Vinificação", definition: "Tanque de pedra tradicional onde as uvas são pisadas a pé. Este método ancestral extrai cor e sabor de forma suave, produzindo vinhos de profundidade excecional." },
    { term: "Colheita", category: "Vinificação", definition: "Vinho de um único ano de colheita excecional. Um Tawny Colheita envelhece em barril desde um ano específico — uma cápsula do tempo das condições desse ano." },
    { term: "Lote (Blending)", category: "Vinificação", definition: "A arte de combinar vinhos de diferentes anos e barris para atingir um perfil de sabor consistente e complexo. Tawnies de 10, 30 e 50 anos são lotes magistrais." },
    { term: "Vale do Douro", category: "Vinificação", definition: "Região vinícola Património Mundial da UNESCO no norte de Portugal. As encostas íngremes em socalcos ao longo do rio Douro produzem vinho há mais de 2.000 anos." },
    { term: "Tawny (Cor)", category: "Prova", definition: "A cor âmbar-acastanhada que se desenvolve com o envelhecimento em madeira. O nome 'Tawny' refere-se a esta cor — um indicador visual do tempo em barril." },
    { term: "Nariz / Aroma", category: "Prova", definition: "O cheiro do vinho. O Tawny desenvolve notas de caramelo, fruta seca, baunilha, frutos secos e especiarias com o envelhecimento." },
    { term: "Final / Retrogosto", category: "Prova", definition: "O sabor que persiste após engolir. Um final longo e complexo é a marca de um grande Porto envelhecido. Quanto mais dura, mais extraordinário é o vinho." },
    { term: "Paladar", category: "Prova", definition: "As sensações gustativas na boca — doçura, acidez, corpo, calor. Um grande Tawny será equilibrado entre riqueza doce e secura elegante." },
    { term: "Notas de Fruta Seca", category: "Prova", definition: "Sabores de figos, tâmaras, passas e damascos — característicos do Tawny bem envelhecido. Desenvolvem-se naturalmente através de décadas de envelhecimento oxidativo." },
    { term: "Envelhecimento Oxidativo", category: "Prova", definition: "Exposição controlada a pequenas quantidades de oxigénio no barril. Transforma a cor, aroma e textura — é o que torna o Tawny diferente do Ruby." },
    { term: "Porto Tawny", category: "Tipos de Vinho do Porto", definition: "Envelhecido em barris de madeira, desenvolvendo cor âmbar e sabores complexos. Quanto mais envelhecimento, mais refinado: 10 anos (Signature), 30 anos (Legacy), 50 anos (The Icon), 100 anos (The Hundred)." },
    { term: "Porto Branco", category: "Tipos de Vinho do Porto", definition: "Feito de uvas brancas, com sabores mais leves — mel, citrinos, amêndoas. O Branco envelhecido desenvolve complexidade extraordinária e cor dourada." },
    { term: "Porto Ruby", category: "Tipos de Vinho do Porto", definition: "Envelhecido em grandes tanques para preservar a cor vermelha profunda e carácter fresco e frutado. Jovem, vibrante e o estilo mais acessível de Vinho do Porto." },
    { term: "Porto Colheita", category: "Tipos de Vinho do Porto", definition: "Um Tawny de um único ano, envelhecido em barril. Combina a elegância do envelhecimento Tawny com a especificidade de uma colheita." },
    { term: "Late Bottled Vintage (LBV)", category: "Tipos de Vinho do Porto", definition: "Um Porto envelhecido em barril 4-6 anos antes de engarrafar. Oferece carácter de colheita a um preço mais acessível." },
    { term: "Memory Capsule", category: "Marca The 100's", definition: "O conceito central do The 100's — cada produto é uma cápsula que preserva um momento no tempo. 100ml de história, selados e oferecidos." },
    { term: "Segunda Vida", category: "Marca The 100's", definition: "A filosofia de que cada produto sobrevive ao vinho. Após o consumo, o recipiente torna-se objeto decorativo — suporte de velas, difusor, porta-joias." },
    { term: "Carimbo de Tempo", category: "Marca The 100's", definition: "A gravação personalizada em cada garrafa — uma data e hora específicas escolhidas pelo visitante. Torna o produto único no mundo." },
    { term: "The Hundred", category: "Marca The 100's", definition: "O produto pináculo — Vinho do Porto de 100 anos em 100ml. A expressão máxima de tempo, paciência e legado." },
    { term: "Floresta de Cilindros", category: "Marca The 100's", definition: "A 'Floresta de Cilindros' — zona de exposição na loja com a gama cilíndrica, criando uma experiência visual imersiva." },
    { term: "Cortiça", category: "Materiais", definition: "Material sustentável português usado nas embalagens. Conecta com o estatuto de Portugal como maior produtor mundial de cortiça. Quente, tátil, ecológico." },
    { term: "Cerâmica", category: "Materiais", definition: "Usada em combinação com cortiça na gama de dois tons. Acrescenta textura refinada e contraste visual." },
    { term: "Latão", category: "Materiais", definition: "Acento metálico premium nos produtos de madeira. Representa durabilidade, intemporalidade e luxo discreto." },
    { term: "Madeira de Nogueira", category: "Materiais", definition: "Madeira escura e rica nas embalagens premium. Simboliza calor, herança e artesanato." },
    { term: "Madeira de Carvalho", category: "Materiais", definition: "O material pináculo — diretamente ligado aos barris onde o Vinho do Porto envelhece. Os produtos de carvalho representam a conexão mais profunda entre recipiente e conteúdo." },
  ];

  const filtered = terms.filter(t => {
    const matchesSearch = !search || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ModuleLayout
      moduleId="glossary"
      moduleNumber={10}
      title={isEN ? "Port Wine Glossary" : "Glossário do Vinho do Porto"}
      subtitle={isEN ? "Every term you need to speak with authority." : "Todos os termos de que precisas para falar com autoridade."}
      heroImage={portWineImg}
    >
      <ContentBlock title={isEN ? "Your Language Is Your Credibility" : "A Tua Linguagem É a Tua Credibilidade"}>
        <p>{isEN
          ? "Visitors trust expertise. When you use the correct terminology naturally — without being academic — you elevate the experience. This glossary covers every term you'll encounter at The 100's."
          : "Os visitantes confiam na expertise. Quando usas a terminologia correta de forma natural — sem ser académico — elevas a experiência. Este glossário cobre todos os termos que encontrarás no The 100's."}</p>
      </ContentBlock>

      <VideoBlock
        title="Glossário do Vinho do Porto"
        description="Termos essenciais que precisas de dominar."
        duration="6:00"
        poster={portWineImg}
      />

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isEN ? "Search terms..." : "Pesquisar termos..."}
            className="w-full bg-background/40 border border-border/30 text-foreground/80 pl-11 pr-4 py-3 text-sm font-light focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs tracking-wider uppercase px-3 py-1.5 border transition-colors ${!activeCategory ? "border-primary text-primary bg-primary/10" : "border-border/30 text-muted-foreground hover:border-primary/30"}`}
          >
            {isEN ? "All" : "Todos"} ({terms.length})
          </button>
          {categories.map(cat => {
            const count = terms.filter(t => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`text-xs tracking-wider uppercase px-3 py-1.5 border transition-colors ${activeCategory === cat ? "border-primary text-primary bg-primary/10" : "border-border/30 text-muted-foreground hover:border-primary/30"}`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((t, i) => (
          <ScrollReveal key={t.term} delay={i * 0.02}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-primary font-light text-lg">{t.term}</h4>
                    <span className="text-[9px] tracking-wider uppercase text-muted-foreground/50 border border-border/30 px-1.5 py-0.5">{t.category}</span>
                  </div>
                  <p className="text-sm text-foreground/60 font-light leading-relaxed">{t.definition}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground/40 text-sm">
            {isEN ? "No terms found." : "Nenhum termo encontrado."}
          </div>
        )}
      </div>

      <KeyTakeaway items={isEN ? [
        "28 essential terms across 5 categories: Wine Making, Tasting, Port Types, The 100's Brand, and Materials",
        "Terroir, Fortification and Barrel Ageing are the three pillars of Port wine production",
        "Know the difference between Tawny (wood-aged, amber) and Ruby (tank-aged, red)",
        "Memory Capsule, Second Life and Time Stamp are the three brand concepts you must articulate",
        "Cork, Ceramic, Brass, Walnut and Oak — know the material hierarchy of the product range",
      ] : [
        "28 termos essenciais em 5 categorias: Vinificação, Prova, Tipos de Porto, Marca The 100's e Materiais",
        "Terroir, Fortificação e Envelhecimento em Barril são os três pilares da produção de Vinho do Porto",
        "Conhece a diferença entre Tawny (envelhecido em madeira, âmbar) e Ruby (envelhecido em tanque, vermelho)",
        "Memory Capsule, Segunda Vida e Carimbo de Tempo são os três conceitos que deves saber articular",
        "Cortiça, Cerâmica, Latão, Nogueira e Carvalho — conhece a hierarquia de materiais da gama",
      ]} />

      <QuizBlock moduleId="glossary" questions={isEN ? [
        { question: "What is 'fortification' in Port wine production?", options: ["Adding sugar to increase sweetness", "Adding grape spirit to stop fermentation", "Ageing in oak barrels for decades", "Blending wines from different years"], correct: 1 },
        { question: "What does the term 'Second Life' refer to at The 100's?", options: ["A second glass of wine for free", "Recycling empty bottles", "The container becoming a decorative object after consumption", "Buying a second bottle at a discount"], correct: 2 },
        { question: "What material is directly connected to Port wine ageing barrels?", options: ["Cork", "Ceramic", "Brass", "Oak wood"], correct: 3 },
      ] : [
        { question: "O que é a 'fortificação' na produção de Vinho do Porto?", options: ["Adicionar açúcar para aumentar a doçura", "Adicionar aguardente para parar a fermentação", "Envelhecer em barris de carvalho durante décadas", "Misturar vinhos de diferentes anos"], correct: 1 },
        { question: "O que significa o termo 'Segunda Vida' no The 100's?", options: ["Um segundo copo de vinho grátis", "Reciclar garrafas vazias", "O recipiente tornar-se objeto decorativo após consumo", "Comprar uma segunda garrafa com desconto"], correct: 2 },
        { question: "Que material está diretamente ligado aos barris de envelhecimento do Vinho do Porto?", options: ["Cortiça", "Cerâmica", "Latão", "Madeira de carvalho"], correct: 3 },
      ]} />

      <ModuleQuizGate
        moduleId="glossary"
        questions={[
          { question: "O que significa 'Colheita' no contexto do Vinho do Porto?", options: ["Uma mistura de vários anos", "Um Tawny de um único ano de colheita", "O ato de colher uvas", "Um tipo de casta"], correctIndex: 1 },
          { question: "O que é a 'fortificação' do vinho?", options: ["Adicionar cor ao vinho", "Adicionar aguardente vínica para parar a fermentação", "Envelhecer em garrafa", "Adicionar açúcar"], correctIndex: 1 },
          { question: "O que são 'castas' no contexto vinícola?", options: ["Caves de envelhecimento", "Variedades de uva usadas na produção", "Tipos de barris", "Regiões demarcadas"], correctIndex: 1 },
          { question: "O que é o DOC Douro?", options: ["Um documento legal", "Denominação de Origem Controlada — certificação de qualidade regional", "Uma marca de vinho", "Um tipo de garrafa"], correctIndex: 1 },
          { question: "O que significa 'envelhecimento oxidativo'?", options: ["O vinho estragou-se", "Maturação em contacto com o ar (em barris de madeira)", "Adição de oxigénio artificial", "Fermentação ao ar livre"], correctIndex: 1 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleGlossary;
