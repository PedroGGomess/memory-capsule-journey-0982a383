import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, MapPin, User, ChevronDown } from "lucide-react";

interface Session {
  startTime: string;
  endTime: string;
  title: string;
  speaker?: string;
  location?: string;
}

interface DaySchedule {
  day: number;
  titlePt: string;
  titleEn: string;
  duration: string;
  sessions: Session[];
}

const PRESENTIAL_TRAINING: DaySchedule[] = [
  {
    day: 1,
    titlePt: "Produto e Marca",
    titleEn: "Product & Brand",
    duration: "5h",
    sessions: [
      { startTime: "09:00", endTime: "09:30", title: "Boas-Vindas + Visão Estratégica / Welcome + Strategic Vision" },
      { startTime: "09:30", endTime: "10:30", title: "Storytelling da Marca / Brand Storytelling" },
      { startTime: "10:45", endTime: "11:45", title: "História e Herança do Vinho do Porto / Port Wine History & Heritage", speaker: "Rita Carvalho" },
      { startTime: "13:00", endTime: "15:00", title: "Degustação Técnica / Technical Tasting", speaker: "Rita Carvalho" },
      { startTime: "15:15", endTime: "16:15", title: "Tipologias: Ruby, Tawny, White, Rosé, LBV, Vintage, Colheita / Port Types" },
    ],
  },
  {
    day: 2,
    titlePt: "Operação Gift",
    titleEn: "Gift Operations",
    duration: "6h45",
    sessions: [
      { startTime: "09:00", endTime: "11:00", title: "Curadoria de Produtos / Product Curation" },
      { startTime: "11:15", endTime: "12:00", title: "Harmonizações e Second Life (Cross-Selling) / Pairings & Cross-Selling" },
      { startTime: "12:00", endTime: "13:00", title: "Workshop: A Arte de Embrulhar / Gift Wrapping Workshop" },
      { startTime: "14:00", endTime: "17:00", title: "Técnica de Venda: Upsell por eixo / Upsell Technique by Category" },
    ],
  },
  {
    day: 3,
    titlePt: "Venda & Psicologia",
    titleEn: "Sales & Psychology",
    duration: "8h",
    sessions: [
      { startTime: "09:00", endTime: "10:30", title: "Funil Comercial: Entrada→Diagnóstico→Upgrade→Fecho→Upsell / Sales Funnel" },
      { startTime: "10:45", endTime: "12:15", title: "Diagnóstico Rápido do Cliente / Quick Client Diagnosis" },
      { startTime: "13:15", endTime: "15:15", title: "Mapa de Upgrade com frases ensaiadas / Upgrade Map with Scripted Phrases" },
      { startTime: "15:15", endTime: "16:15", title: "Gestão de Objeções / Objection Handling" },
      { startTime: "16:30", endTime: "18:00", title: "Técnica de Fecho Premium / Premium Closing Technique" },
    ],
  },
  {
    day: 4,
    titlePt: "Atendimento Turístico",
    titleEn: "Tourist Service",
    duration: "7h",
    sessions: [
      { startTime: "09:00", endTime: "10:30", title: "Psicologia do Turista / Tourist Psychology" },
      { startTime: "10:45", endTime: "13:15", title: "Inglês Técnico para Retalho / Technical English for Retail", speaker: "Sandra Stutafford" },
      { startTime: "14:30", endTime: "15:30", title: "Venda Consultiva (Luxury Selling) / Consultative Selling" },
      { startTime: "15:30", endTime: "16:30", title: "Logística de Transporte (TSA/IATA) / Transport Logistics" },
      { startTime: "16:45", endTime: "17:45", title: "Conduta e Imagem / Conduct & Image" },
    ],
  },
  {
    day: 5,
    titlePt: "Operação",
    titleEn: "Operations",
    duration: "7h15",
    sessions: [
      { startTime: "09:00", endTime: "10:30", title: "Armazém & Stock / Warehouse & Stock" },
      { startTime: "10:45", endTime: "11:45", title: "Etiquetagem & Pricing / Labeling & Pricing" },
      { startTime: "11:45", endTime: "13:15", title: "Simulador de Vendas / Sales Simulator" },
      { startTime: "14:30", endTime: "15:30", title: "TPA & Meios de Pagamento / Payment Methods" },
      { startTime: "15:30", endTime: "17:00", title: "Concierge & WhatsApp / Customer Relations" },
      { startTime: "17:15", endTime: "18:00", title: "Checklist Diário de Loja / Daily Store Checklist" },
    ],
  },
  {
    day: 6,
    titlePt: "Performance e Alinhamento",
    titleEn: "Performance & Alignment",
    duration: "6h",
    sessions: [
      { startTime: "09:00", endTime: "10:00", title: "KPIs de Sucesso e Objetivos por Função / KPIs & Goals" },
      { startTime: "10:00", endTime: "10:45", title: "Incentivos Comerciais / Commercial Incentives" },
      { startTime: "11:00", endTime: "12:00", title: "Cultura de Feedback / Feedback Culture" },
      { startTime: "12:00", endTime: "13:00", title: "Marketing de Recomendação / Referral Marketing" },
      { startTime: "14:00", endTime: "15:30", title: "Software POS (Caixa) / POS Software" },
      { startTime: "15:30", endTime: "16:15", title: "Políticas de Envio / Shipping Policies" },
      { startTime: "16:30", endTime: "17:30", title: "Obrigações Legais (ACT) / Legal Obligations" },
    ],
  },
  {
    day: 7,
    titlePt: "Soft Opening",
    titleEn: "Soft Opening",
    duration: "Full Day",
    sessions: [
      { startTime: "09:00", endTime: "17:00", title: "Role-Playing Intensivo / Intensive Role-Playing" },
      { startTime: "09:00", endTime: "17:00", title: "Gestão de Reclamações / Complaint Management" },
      { startTime: "09:00", endTime: "17:00", title: "Visual Merchandising / Visual Merchandising" },
      { startTime: "09:00", endTime: "17:00", title: "Formação Anti-Furto / Loss Prevention" },
      { startTime: "09:00", endTime: "17:00", title: "Gestão de Picos de Fluxo / Peak Management" },
      { startTime: "09:00", endTime: "17:00", title: "Protocolo VIP / VIP Protocol" },
      { startTime: "09:00", endTime: "17:00", title: "Comunicação Interna / Internal Communication" },
    ],
  },
  {
    day: 8,
    titlePt: "Soft Opening (Continuação)",
    titleEn: "Soft Opening (Continued)",
    duration: "Full Day",
    sessions: [
      { startTime: "09:00", endTime: "17:00", title: "Role-Playing Intensivo / Intensive Role-Playing" },
      { startTime: "09:00", endTime: "17:00", title: "Gestão de Reclamações / Complaint Management" },
      { startTime: "09:00", endTime: "17:00", title: "Visual Merchandising / Visual Merchandising" },
      { startTime: "09:00", endTime: "17:00", title: "Formação Anti-Furto / Loss Prevention" },
      { startTime: "09:00", endTime: "17:00", title: "Gestão de Picos de Fluxo / Peak Management" },
      { startTime: "09:00", endTime: "17:00", title: "Protocolo VIP / VIP Protocol" },
      { startTime: "09:00", endTime: "17:00", title: "Comunicação Interna / Internal Communication" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function PresentialTraining() {
  const { language, t } = useLanguage();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const getTitle = (day: DaySchedule) => {
    return language === "pt" ? `Dia ${day.day} — ${day.titlePt}` : `Day ${day.day} — ${day.titleEn}`;
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-background via-background to-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Header ── */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-6"
            >
              <Calendar className="w-12 h-12 text-primary/60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-5xl md:text-6xl font-light text-primary mb-4 leading-tight"
            >
              {language === "pt" ? "Formação Presencial" : "In-Person Training"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm md:text-base text-foreground/50 font-light max-w-xl leading-relaxed italic"
            >
              {language === "pt"
                ? "Programa completo de 8 dias para transformar colaboradores em embaixadores The 100's."
                : "Complete 8-day program to transform employees into The 100's ambassadors."}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="px-6 md:px-12 lg:px-16 max-w-4xl mx-auto pb-24">
        {/* ── Overview Stats ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light mb-2">
                {language === "pt" ? "Duração Total" : "Total Duration"}
              </p>
              <p className="text-3xl font-light text-primary">48h+</p>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light mb-2">
                {language === "pt" ? "Dias de Formação" : "Training Days"}
              </p>
              <p className="text-3xl font-light text-primary">8</p>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light mb-2">
                {language === "pt" ? "Sessões" : "Sessions"}
              </p>
              <p className="text-3xl font-light text-primary">50+</p>
            </div>
          </div>
        </motion.section>

        {/* ── Schedule Days ── */}
        <motion.section variants={itemVariants} className="space-y-3">
          {PRESENTIAL_TRAINING.map((daySchedule) => {
            const isExpanded = expandedDay === daySchedule.day;

            return (
              <motion.div
                key={daySchedule.day}
                variants={itemVariants}
                className="bg-card border border-border transition-all duration-300"
              >
                {/* Day Header */}
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : daySchedule.day)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-primary/4 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 border border-primary/25 flex-shrink-0">
                      <span className="text-[10px] font-medium text-primary">{String(daySchedule.day).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-light text-foreground">{getTitle(daySchedule)}</h3>
                      <p className="text-xs text-foreground/50 font-light mt-1">{daySchedule.duration}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground/50"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Sessions List - Expandable */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border/50 overflow-hidden"
                  >
                    <div className="px-6 py-4 space-y-3">
                      {daySchedule.sessions.map((session, idx) => (
                        <div key={idx} className="flex gap-4 pb-3 last:pb-0 border-b border-border/30 last:border-0">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="flex items-center gap-2 text-muted-foreground/60 flex-shrink-0 pt-0.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-xs font-light tracking-wide">{session.startTime}—{session.endTime}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-light text-foreground">{session.title}</p>
                              {session.speaker && (
                                <p className="text-xs text-foreground/60 font-light mt-1 flex items-center gap-1.5">
                                  <User className="w-3 h-3" />
                                  {session.speaker}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.section>

        {/* ── Info Section ── */}
        <motion.section variants={itemVariants} className="mt-16 bg-card border border-border/30 p-8">
          <h2 className="text-lg font-light text-foreground mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-primary/60 rounded-full" />
            {language === "pt" ? "Informações Importantes" : "Important Information"}
          </h2>
          <div className="space-y-4 text-sm font-light text-foreground/70">
            <p>
              {language === "pt"
                ? "Este programa presencial é o pilar central da formação The 100's, complementando o aprendizado digital. Todos os colaboradores devem participar na integração da equipa na loja."
                : "This in-person program is the central pillar of The 100's training, complementing digital learning. All employees must participate in the team integration at the store."}
            </p>
            <p>
              {language === "pt"
                ? "Os dias 7 e 8 (Soft Opening) ocorrem na loja, com simulações reais e role-playing com clientes."
                : "Days 7 and 8 (Soft Opening) take place in the store with real simulations and customer role-playing."}
            </p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
