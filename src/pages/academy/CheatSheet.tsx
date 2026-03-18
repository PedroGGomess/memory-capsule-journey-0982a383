import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Printer } from "lucide-react";

const CheatSheet = () => {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handlePrint = () => {
    window.print();
  };

  const gamas = [
    { name: language === "pt" ? "Entry Gift" : "Entry Gift", price: "€19.99" },
    { name: language === "pt" ? "Cylinder Two Caps (10yr)" : "Cylinder Two Caps (10yr)", price: "€29.99-54.99" },
    { name: language === "pt" ? "Full Cork Cylinder (10yr)" : "Full Cork Cylinder (10yr)", price: "€49.99-54.99" },
    { name: language === "pt" ? "Cube Two Caps (10yr)" : "Cube Two Caps (10yr)", price: "€69.99-74.99" },
    { name: language === "pt" ? "Full Cork Cube (10yr-50yr)" : "Full Cork Cube (10yr-50yr)", price: "€99.99-275" },
    { name: language === "pt" ? "Oak Wood Cube" : "Oak Wood Cube", price: "até €1,000" },
    { name: language === "pt" ? "Walnut Wood Cube" : "Walnut Wood Cube", price: "até €1,000" },
  ];

  const personas = [
    {
      persona: language === "pt" ? "Turista EU" : "EU Tourist",
      phrases: [language === "pt" ? "Leva um pedaço do Porto contigo" : "Take a piece of Porto home"],
    },
    {
      persona: language === "pt" ? "Turista US" : "US Tourist",
      phrases: [language === "pt" ? "Esta é a nossa coleção mais exclusiva" : "This is our most exclusive collection"],
    },
    {
      persona: language === "pt" ? "Cruzeirista" : "Cruise Passenger",
      phrases: [language === "pt" ? "Pronto para levar — perfeito para a tua viagem" : "Ready to go — perfect for your trip"],
    },
    {
      persona: language === "pt" ? "Residente" : "Resident",
      phrases: [language === "pt" ? "Começa a tua coleção com este vintage" : "Start your collection with this vintage"],
    },
    {
      persona: language === "pt" ? "Conhecedor" : "Connoisseur",
      phrases: [language === "pt" ? "Tawny de 30 anos, notas de fruta seca e caramelo" : "30 year old Tawny, notes of dried fruit and caramel"],
    },
    {
      persona: language === "pt" ? "Sem Conhecimento" : "No Knowledge",
      phrases: [language === "pt" ? "Deixa-me mostrar-te algo especial" : "Let me show you something special"],
    },
  ];

  const objections = [
    {
      objection: language === "pt" ? "É caro" : "It's expensive",
      response: language === "pt" ? "Não é vinho, é tempo. 30 anos de envelhecimento." : "It's not wine, it's time. 30 years of aging.",
    },
    {
      objection: language === "pt" ? "Só estou a ver" : "I'm just looking",
      response: language === "pt" ? "Explora à vontade — isto é uma cápsula do tempo, não uma loja." : "Explore freely — this is a time capsule, not a store.",
    },
    {
      objection: language === "pt" ? "Já tenho vinho" : "I already have wine",
      response: language === "pt" ? "Isto não é vinho. É um presente premium, uma peça de decoração." : "This isn't wine. It's a premium gift, a décor piece.",
    },
  ];

  const tsaRules = [
    {
      rule: language === "pt" ? "Cabine" : "Cabin",
      details: language === "pt" ? "máx 100ml por recipiente (o nosso formato!)" : "max 100ml per container (our format!)",
    },
    {
      rule: language === "pt" ? "Porão" : "Hold",
      details: language === "pt" ? "sem limite" : "no limit",
    },
    {
      rule: language === "pt" ? "Send a Memory" : "Send a Memory",
      details: language === "pt" ? "envio internacional disponível" : "international shipping available",
    },
  ];

  const checklist = [
    language === "pt" ? "Verificar stock nos displays" : "Check stock in displays",
    language === "pt" ? "Limpar portas de vidro e superfícies" : "Clean glass doors and surfaces",
    language === "pt" ? "Preparar tabelas de preços e promoções" : "Prepare price tables and promotions",
    language === "pt" ? "Verificar personalização UV" : "Check UV personalization",
    language === "pt" ? "Contar cash float" : "Count cash float",
    language === "pt" ? "Revisar novo inventário" : "Review new inventory",
  ];

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="section-padding py-16 max-w-5xl mx-auto">
        {/* Header */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-light text-primary mb-3 tracking-tight">
                {language === "pt" ? "Guia Rápido" : "Quick Guide"}
              </h1>
              <p className="text-lg text-foreground/70 font-light">
                {language === "pt" ? "Referência rápida para vendedores" : "Quick reference for sales staff"}
              </p>
            </div>
            <motion.button
              whileHover={{ y: -2 }}
              onClick={handlePrint}
              className="flex items-center gap-2 border border-primary px-6 py-3 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200 print:hidden"
            >
              <Printer className="w-4 h-4" />
              {language === "pt" ? "Imprimir" : "Print"}
            </motion.button>
          </div>
        </motion.section>

        {/* Gamas & Preços */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-light text-primary tracking-tight mb-2">
                {language === "pt" ? "Gamas & Preços" : "Ranges & Prices"}
              </h2>
              <p className="text-foreground/60 font-light">{language === "pt" ? "Tabela de preços por produto" : "Product pricing table"}</p>
            </div>

            <div className="overflow-x-auto border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-foreground/70 font-light tracking-wide">
                      {language === "pt" ? "Produto" : "Product"}
                    </th>
                    <th className="text-left p-4 text-foreground/70 font-light tracking-wide">
                      {language === "pt" ? "Preço" : "Price"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gamas.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-border/50 ${idx % 2 === 0 ? "bg-transparent" : "bg-primary/2"}`}
                    >
                      <td className="p-4 text-foreground/80 font-light">{item.name}</td>
                      <td className="p-4 text-primary font-light">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Frases-Chave por Perfil */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-light text-primary tracking-tight mb-2">
                {language === "pt" ? "Frases-Chave por Perfil" : "Key Phrases by Persona"}
              </h2>
              <p className="text-foreground/60 font-light">{language === "pt" ? "Abordagem rápida por tipo de cliente" : "Quick approach by customer type"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personas.map((item, idx) => (
                <div key={idx} className="border border-border p-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-3 font-light">
                    {item.persona}
                  </p>
                  <p className="text-foreground/80 font-light italic">"{item.phrases[0]}"</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Objeções Rápidas */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-light text-primary tracking-tight mb-2">
                {language === "pt" ? "Objeções Rápidas" : "Quick Objection Handling"}
              </h2>
              <p className="text-foreground/60 font-light">{language === "pt" ? "Respostas eficazes" : "Effective responses"}</p>
            </div>

            <div className="space-y-4">
              {objections.map((item, idx) => (
                <div key={idx} className="border border-border p-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-2 font-light">
                    {language === "pt" ? "Objeção" : "Objection"}
                  </p>
                  <p className="text-foreground/80 font-light mb-4">"{item.objection}"</p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary/50 mb-2 font-light">
                    → {language === "pt" ? "Resposta" : "Response"}
                  </p>
                  <p className="text-foreground/70 font-light italic">"{item.response}"</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* TSA Rules */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-light text-primary tracking-tight mb-2">
                {language === "pt" ? "Regras TSA" : "TSA Rules"}
              </h2>
              <p className="text-foreground/60 font-light">{language === "pt" ? "Transporte e bagagem" : "Transport & luggage"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tsaRules.map((item, idx) => (
                <div key={idx} className="border border-border p-6 text-center">
                  <p className="text-2xl font-light text-primary mb-2">{item.rule}</p>
                  <p className="text-foreground/70 font-light text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Daily Checklist */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-light text-primary tracking-tight mb-2">
                {language === "pt" ? "Checklist Diário" : "Daily Checklist"}
              </h2>
              <p className="text-foreground/60 font-light">{language === "pt" ? "Abertura e encerramento" : "Opening & closing"}</p>
            </div>

            <div className="border border-border p-8">
              <ul className="space-y-4">
                {checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-primary rounded accent-primary mt-1 cursor-pointer"
                    />
                    <span className="text-foreground/80 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.section variants={itemVariants} className="text-center py-12 border-t border-border">
          <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/40 font-light">
            The 100's Academy — {language === "pt" ? "Guia de Referência Rápida" : "Quick Reference Guide"}
          </p>
        </motion.section>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .bg-background {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .bg-primary\\/2 {
            background-color: transparent;
          }
          h1, h2 {
            color: #2c2c2c !important;
            page-break-after: avoid;
          }
          table, .border {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CheatSheet;
