import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Printer } from "lucide-react";

const CheatSheet = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const handlePrint = () => { window.print(); };

  const zones = [
    {
      zone: "The Cellar", floor: isEN ? "Piso 0" : "Piso 0",
      products: isEN ? [
        { name: "Entry Gift", price: "€19.99", note: "Ruby · Kraft box" },
        { name: "Cork Cylinder with Ceramic", price: "€29.99 – €54.99", note: "10yr · Two-cap variant" },
        { name: "Cork Cylinder", price: "€49.99 – €74.99", note: "10yr · Full cork" },
        { name: "Cork Cube with Ceramic", price: "€69.99 – €99.99", note: "10yr · Magnet closure" },
        { name: "Cork Cube", price: "€99.99 – €130", note: "10yr · Magnet closure" },
        { name: "Walnut Wood + Brass", price: "From €120", note: "Signature · Premium" },
        { name: "Oak Wood + Brass", price: "From €130", note: "Signature · Top packaging" },
      ] : [
        { name: "Entry Gift", price: "€19.99", note: "Ruby · Caixa kraft" },
        { name: "Cilindro com Cerâmica", price: "€29.99 – €54.99", note: "10a · Duas tampas" },
        { name: "Cilindro Cortiça", price: "€49.99 – €74.99", note: "10a · Cortiça total" },
        { name: "Cubo com Cerâmica", price: "€69.99 – €99.99", note: "10a · Fecho ímã" },
        { name: "Cubo Cortiça", price: "€99.99 – €130", note: "10a · Fecho ímã" },
        { name: "Madeira Nogueira + Latão", price: "A partir de €120", note: "Signature · Premium" },
        { name: "Madeira Carvalho + Latão", price: "A partir de €130", note: "Signature · Top embalagem" },
      ],
    },
    {
      zone: "The Vault", floor: "Piso 1",
      products: isEN ? [
        { name: "The Icon", price: "€275 – €375", note: "50 Years Tawny" },
        { name: "THE HUNDRED", price: "€1,000", note: "100 Years — 1 century of patience" },
      ] : [
        { name: "The Icon", price: "€275 – €375", note: "Tawny 50 Anos" },
        { name: "THE HUNDRED", price: "€1.000", note: "100 Anos — 1 século de paciência" },
      ],
    },
    {
      zone: "Ancient Flavours", floor: "Piso 0",
      products: isEN ? [
        { name: "Olive Oil", price: "€34.99 – €265", note: "Centenary trees · First cold press" },
        { name: "Honey", price: "—", note: "Heritage apiaries · Cork packaging" },
        { name: "Sea Salt", price: "—", note: "Atlantic fleur de sel · Millenary salt pans" },
        { name: "Heritage Tea", price: "—", note: "Azores · Europe's only tea region" },
      ] : [
        { name: "Azeite", price: "€34.99 – €265", note: "Oliveiras centenárias · Primeira prensagem" },
        { name: "Mel", price: "—", note: "Apários de herança · Embalagem cortiça" },
        { name: "Sal Marinho", price: "—", note: "Flor de sal atlântica · Marinhas milenares" },
        { name: "Chá de Herança", price: "—", note: "Açores · Única região de chá da Europa" },
      ],
    },
    {
      zone: "The Still Hours", floor: "Piso 0",
      products: isEN ? [
        { name: "Candles", price: "—", note: "Cedar, lavender, marine salt" },
        { name: "Diffusers", price: "—", note: "Long-diffusion reeds · Portuguese botanicals" },
      ] : [
        { name: "Velas", price: "—", note: "Cedro, lavanda, sal marinho" },
        { name: "Difusores", price: "—", note: "Varas de longa difusão · Botânicos portugueses" },
      ],
    },
    {
      zone: "The Numbered", floor: "Piso 1",
      products: isEN ? [
        { name: "Cubo 2 Tampas Cerâmico", price: "Limited", note: "Numbered · Collectible ceramic editions" },
      ] : [
        { name: "Cubo 2 Tampas Cerâmico", price: "Limitado", note: "Numerado · Edições cerâmicas colecionáveis" },
      ],
    },
  ];

  const personas = isEN ? [
    { persona: "EU Tourist", phrases: ["Take a piece of Porto home forever"] },
    { persona: "US Tourist", phrases: ["This is our most exclusive collection"] },
    { persona: "Cruise Passenger", phrases: ["Ready to fly — fits the 100ml carry-on rule exactly"] },
    { persona: "Local / Resident", phrases: ["Start your collection with this vintage"] },
    { persona: "Wine Connoisseur", phrases: ["50yr Tawny — dried figs, dark chocolate, ancient wood"] },
    { persona: "No Wine Knowledge", phrases: ["Let me show you something special — not wine, but time"] },
    { persona: "Corporate Buyer", phrases: ["We can personalise all 10 and ship worldwide via Send a Memory"] },
  ] : [
    { persona: "Turista UE", phrases: ["Leva um pedaço do Porto contigo para sempre"] },
    { persona: "Turista US", phrases: ["Esta é a nossa coleção mais exclusiva"] },
    { persona: "Cruzeirista", phrases: ["Pronto para voar — encaixa na regra de 100ml de cabine"] },
    { persona: "Residente", phrases: ["Começa a tua coleção com este vintage"] },
    { persona: "Conhecedor de Vinho", phrases: ["Tawny 50a — figos secos, chocolate negro, madeira antiga"] },
    { persona: "Sem Conhecimento", phrases: ["Deixa-me mostrar-te algo especial — não é vinho, é tempo"] },
    { persona: "Compra Corporativa", phrases: ["Personalizamos todas as 10 e enviamos para todo o mundo via Send a Memory"] },
  ];

  const objections = isEN ? [
    { obj: "It's expensive", resp: "You're not buying wine — you're buying X years of time, sealed in this moment." },
    { obj: "I'm just looking", resp: "Explore freely — this is a time capsule, not a shop." },
    { obj: "I don't drink wine", resp: "Follow me — we have Ancient Flavours that have nothing to do with wine." },
    { obj: "I already have wine", resp: "This isn't wine. It's a design object that becomes a decorative piece." },
    { obj: "I have no luggage space", resp: "100ml fits in your carry-on liquids bag. Or we send it to your door — Send a Memory." },
    { obj: "It's too fragile to travel", resp: "Cork and magnet closures are engineered for travel. Or we ship it safely via Send a Memory." },
  ] : [
    { obj: "É caro", resp: "Não estás a comprar vinho — estás a comprar X anos de tempo, selado neste momento." },
    { obj: "Só estou a ver", resp: "Explora à vontade — isto é uma cápsula do tempo, não uma loja." },
    { obj: "Não bebo vinho", resp: "Segue-me — temos Ancient Flavours que nada têm a ver com vinho." },
    { obj: "Já tenho vinho", resp: "Isto não é vinho. É um objeto de design que se torna uma peça decorativa." },
    { obj: "Não tenho espaço na bagagem", resp: "100ml cabe no saco de líquidos de cabine. Ou enviamos para a tua porta — Send a Memory." },
    { obj: "É frágil para viajar", resp: "Os fechos de cortiça e ímane são concebidos para viagem. Ou enviamos por Send a Memory." },
  ];

  const transport = isEN ? [
    { method: "Carry-on bag", rule: "100ml per container, max 1L in clear bag (TSA 3-1-1) ✓ Our format fits exactly" },
    { method: "Checked baggage", rule: "Unlimited quantity, no size restrictions" },
    { method: "Send a Memory", rule: "International shipping worldwide · Premium packaging · No luggage needed" },
  ] : [
    { method: "Bagagem de mão", rule: "100ml por recipiente, máx 1L em saco transparente (TSA 3-1-1) ✓ O nosso formato encaixa na perfeição" },
    { method: "Bagagem despachada", rule: "Quantidade ilimitada, sem restrições de tamanho" },
    { method: "Send a Memory", rule: "Envio internacional para todo o mundo · Embalagem premium · Sem bagagem necessária" },
  ];

  const openChecklist = isEN ? [
    "Check and restock all display zones",
    "Clean glass doors and all surfaces (they must shine)",
    "Verify UV personalisation station is ready",
    "Confirm WinMax4 is synced on all Sunmi devices",
    "Count cash float",
    "Check Send a Memory queue for any pending orders",
    "Verify 45° angle rule across all product displays",
    "Review new stock arrivals in WinMax4",
  ] : [
    "Verificar e reabastecer todas as zonas de exposição",
    "Limpar portas de vidro e todas as superfícies (devem brilhar)",
    "Verificar se a estação de personalização UV está pronta",
    "Confirmar que o WinMax4 está sincronizado em todos os Sunmi",
    "Contar cash float",
    "Verificar fila Send a Memory para encomendas pendentes",
    "Verificar regra dos 45° em todos os displays de produto",
    "Rever novas entradas de stock no WinMax4",
  ];

  const keyPhrases = isEN ? [
    "\"Welcome to our time capsule. Feel free to look around.\"",
    "\"Who is this gift for? I can personalise it with a specific date.\"",
    "\"This bottle carries [X] years of patience — sealed at this very moment.\"",
    "\"Once the wine is gone, this becomes a decorative piece.\"",
    "\"100ml fits perfectly in your carry-on liquids bag.\"",
    "\"Let me show you something that's never been given before.\"",
    "\"In your hands is a piece of time.\"",
  ] : [
    "\"Bem-vindo à nossa cápsula do tempo. Fica à vontade.\"",
    "\"Para quem é o presente? Posso personalizar com uma data especial.\"",
    "\"Esta garrafa carrega [X] anos de paciência — selada neste momento.\"",
    "\"Quando o vinho acabar, esta embalagem torna-se uma peça decorativa.\"",
    "\"100ml cabe perfeitamente no teu saco de líquidos de cabine.\"",
    "\"Deixa-me mostrar-te algo que nunca foi dado antes.\"",
    "\"Nas tuas mãos está um pedaço de tempo.\"",
  ];

  return (
    <motion.div
      className="min-h-screen pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-border/20">
        <div className="max-w-5xl mx-auto flex items-start justify-between">
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/40 mb-2">The 100's Academy</p>
            <h1 className="text-3xl font-light text-foreground">{isEN ? "Cheat Sheet" : "Cheat Sheet"}</h1>
            <p className="text-sm text-foreground/40 font-light mt-1">{isEN ? "Quick reference for the sales floor" : "Referência rápida para o chão de loja"}</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 border border-border/30 px-4 py-2.5 text-xs tracking-wider uppercase text-muted-foreground/50 hover:border-primary/30 hover:text-primary/60 transition-all duration-200"
          >
            <Printer className="w-4 h-4" />
            {isEN ? "Print" : "Imprimir"}
          </button>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-16 pt-10 max-w-5xl mx-auto space-y-12">

        {/* ── Key Phrases ── */}
        <ScrollReveal>
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">{isEN ? "Key Phrases" : "Frases-Chave"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {keyPhrases.map((phrase, i) => (
                <div key={i} className="border border-border/20 border-l-2 border-l-primary/30 p-4">
                  <p className="text-sm font-light text-foreground/70 italic">{phrase}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Zones & Prices ── */}
        <ScrollReveal>
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">{isEN ? "Zones & Prices" : "Zonas & Preços"}</p>
            <div className="space-y-6">
              {zones.map((z) => (
                <div key={z.zone}>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-sm font-light text-foreground/80">{z.zone}</p>
                    <span className="text-[9px] tracking-wider uppercase text-muted-foreground/40 border border-border/20 px-2 py-0.5">{z.floor}</span>
                  </div>
                  <div className="space-y-1">
                    {z.products.map((p) => (
                      <div key={p.name} className="flex items-center justify-between border border-border/15 px-4 py-2.5 hover:border-border/30 transition-colors">
                        <div>
                          <span className="text-sm font-light text-foreground/70">{p.name}</span>
                          <span className="text-[10px] text-muted-foreground/40 ml-3">{p.note}</span>
                        </div>
                        <span className="text-sm font-light text-primary/70">{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Client Personas ── */}
        <ScrollReveal>
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">{isEN ? "Client Personas" : "Personas de Cliente"}</p>
            <div className="space-y-2">
              {personas.map((p, i) => (
                <div key={i} className="flex items-start gap-4 border border-border/15 px-4 py-3">
                  <span className="text-xs text-primary/50 font-light w-32 shrink-0">{p.persona}</span>
                  <span className="text-xs text-foreground/60 font-light italic">{p.phrases[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Objections ── */}
        <ScrollReveal>
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">{isEN ? "Objections & Responses" : "Objeções & Respostas"}</p>
            <div className="space-y-2">
              {objections.map((o, i) => (
                <div key={i} className="grid grid-cols-[1fr_2fr] gap-4 border border-border/15 px-4 py-3 items-start">
                  <p className="text-xs text-amber-500/70 font-light italic">"{o.obj}"</p>
                  <p className="text-xs text-foreground/60 font-light">→ {o.resp}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Transport ── */}
        <ScrollReveal>
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">{isEN ? "Transport Rules" : "Regras de Transporte"}</p>
            <div className="space-y-2">
              {transport.map((t, i) => (
                <div key={i} className="flex items-start gap-4 border border-border/15 px-4 py-3">
                  <span className="text-xs text-primary/50 font-light w-32 shrink-0">{t.method}</span>
                  <span className="text-xs text-foreground/60 font-light">{t.rule}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Open Checklist ── */}
        <ScrollReveal>
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">{isEN ? "Opening Checklist" : "Checklist de Abertura"}</p>
            <div className="space-y-1.5">
              {openChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 border border-border/15 px-4 py-2.5">
                  <div className="w-4 h-4 border border-border/30 shrink-0" />
                  <p className="text-xs font-light text-foreground/60">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Devices quick ref ── */}
        <ScrollReveal>
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">{isEN ? "Devices Quick Reference" : "Referência Rápida de Dispositivos"}</p>
            <div className="space-y-1.5">
              {(isEN ? [
                { device: "Sunmi D3 Pro", where: "Piso 0 counter (×2)", use: "Fixed POS — all receipts, Tax Free, fiscal invoice" },
                { device: "Sunmi L3", where: "All floors (×5 approx.)", use: "Mobile sales, stock check, floor payments" },
                { device: "Sunmi CPad Pay", where: "Piso 1 (×2)", use: "Ceremonial presentations in The Vault & The Numbered" },
              ] : [
                { device: "Sunmi D3 Pro", where: "Balcão Piso 0 (×2)", use: "POS fixo — todos os recibos, Tax Free, fatura fiscal" },
                { device: "Sunmi L3", where: "Todos os pisos (×5 aprox.)", use: "Vendas móveis, verificação de stock, pagamentos no chão" },
                { device: "Sunmi CPad Pay", where: "Piso 1 (×2)", use: "Apresentações cerimoniais em The Vault & The Numbered" },
              ]).map((d, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_2fr] gap-3 border border-border/15 px-4 py-2.5 items-start">
                  <p className="text-xs text-primary/60 font-light">{d.device}</p>
                  <p className="text-xs text-muted-foreground/50 font-light">{d.where}</p>
                  <p className="text-xs text-foreground/60 font-light">{d.use}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <div className="border-t border-border/20 pt-8 text-center">
          <p className="text-[8px] tracking-[0.5em] uppercase text-muted-foreground/30">The 100's · Porto · Bottled Memories</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CheatSheet;
