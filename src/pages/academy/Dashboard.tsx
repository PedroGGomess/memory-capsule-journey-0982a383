import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { getRoleLabel } from "@/config/roles";
import { useRef, useState, useEffect } from "react";
import logoImg from "@/assets/Logo.png";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, Sparkles, FolderOpen, Award, ArrowRight, Check, Bot, BarChart3,
  ChevronRight, Gem, BookMarked, Target, Image, Heart, Shield, Plane, Languages, Monitor, Printer, Lock, Briefcase, ClipboardList, Lightbulb, Flame, Star, Crosshair
} from "lucide-react";

const DAILY_TIPS = [
  { pt: "Nunca digas 'posso ajudar?' — diz 'bem-vindo à nossa cápsula do tempo'.", en: "Never say 'can I help?' — say 'welcome to our time capsule'." },
  { pt: "O upsell começa com uma história, não com um preço.", en: "Upselling starts with a story, not a price." },
  { pt: "Cada garrafa de 100ml carrega 400 anos de história — lembra-te disso a cada venda.", en: "Every 100ml bottle carries 400 years of history — remember this with every sale." },
  { pt: "O turista americano quer impacto. O europeu quer autenticidade. Adapta a tua abordagem.", en: "The American tourist wants impact. The European wants authenticity. Adapt your approach." },
  { pt: "A personalização UV transforma uma compra numa memória — torna isto um momento especial.", en: "UV personalization transforms a purchase into a memory — make it a special moment." },
  { pt: "O silêncio é uma ferramenta de venda. Deixa o produto falar.", en: "Silence is a sales tool. Let the product speak." },
  { pt: "Quando um cliente hesita no preço, fala do tempo: 'Este Tawny envelheceu 50 anos para este momento.'", en: "When a client hesitates on price, talk about time: 'This Tawny aged 50 years for this moment.'" },
  { pt: "Pergunta sempre: 'Para quem é este presente?' — abre a porta ao upsell.", en: "Always ask: 'Who is this gift for?' — it opens the door to upselling." },
  { pt: "O conceito Second Life é o teu melhor argumento: 'Esta embalagem torna-se um objeto de decoração.'", en: "The Second Life concept is your best argument: 'This packaging becomes a décor piece.'" },
  { pt: "Memoriza 3 palavras em cada idioma: 'obrigado', 'bem-vindo', 'memória'. Faz toda a diferença.", en: "Memorize 3 words in each language: 'thank you', 'welcome', 'memory'. It makes all the difference." },
  { pt: "Não vendemos vinho. Vendemos tempo engarrafado.", en: "We don't sell wine. We sell bottled time." },
  { pt: "Um sorriso vale mais que qualquer desconto.", en: "A smile is worth more than any discount." },
  { pt: "O cruzeirista tem pouco tempo — apresenta 2-3 opções, não 10.", en: "The cruise passenger has little time — present 2-3 options, not 10." },
  { pt: "Toca nos materiais quando apresentas: cortiça, cerâmica, madeira. O tato vende.", en: "Touch the materials when presenting: cork, ceramic, wood. Touch sells." },
  { pt: "Oferece sempre uma prova. Mesmo quem 'só está a ver' pode comprar depois de provar.", en: "Always offer a tasting. Even someone 'just looking' may buy after tasting." },
  { pt: "O packaging é 50% da venda. Apresenta o embrulho como uma cerimónia.", en: "Packaging is 50% of the sale. Present the wrapping as a ceremony." },
  { pt: "Conhece os 5 pilares de cor: Descoberta, Tempo, Singularidade, Hedonismo, Memória.", en: "Know the 5 brand pillars: Discovery, Time, Singularity, Hedonism, Memory." },
  { pt: "Pede reviews no Google Maps de forma natural: 'Partilhe a sua experiência com outros viajantes.'", en: "Ask for Google Maps reviews naturally: 'Share your experience with other travelers.'" },
  { pt: "O Tax Free é um argumento forte para turistas fora da UE — menciona sempre.", en: "Tax Free is a strong argument for non-EU tourists — always mention it." },
  { pt: "Regra dos 45°: os produtos devem estar sempre inclinados a 45° na montra.", en: "The 45° rule: products should always be angled at 45° in the display." },
  { pt: "Aprende a ler o cliente em 30 segundos: postura, vestuário, companhia — isto diz tudo.", en: "Learn to read the customer in 30 seconds: posture, clothing, company — this tells all." },
  { pt: "Raridade vende. 'Apenas 3 em stock' > 'em promoção'.", en: "Scarcity sells. 'Only 3 in stock' > 'on sale'." },
  { pt: "A porta de vidro devem brilhar — é a primeira impressão.", en: "Glass doors should shine — it's the first impression." },
  { pt: "O cliente que entra aos olhos do vendedor sente-se bem-vindo. Faz contacto visual.", en: "The customer who meets the seller's eyes feels welcomed. Make eye contact." },
  { pt: "Nunca termines a conversa com 'desconto'. Termina com 'esta história'.", en: "Never end the conversation with 'discount'. End with 'this story'." },
  { pt: "Se o cliente quer menos, oferece melhor. Não reduz valor, aumenta significado.", en: "If the customer wants less, offer better. Don't reduce value, increase meaning." },
  { pt: "Um cliente feliz é um embaixador. Uma resenha no Google vale mais que publicidade.", en: "A happy customer is an ambassador. A Google review is worth more than advertising." },
  { pt: "A personalização é um serviço premium — cobra por ela sem desculpas.", en: "Personalization is a premium service — charge for it without excuses." },
  { pt: "Conta a história do vinho: origem, idade, mestre produtor. Isto é propriedade intelectual.", en: "Tell the story of the wine: origin, age, master producer. This is intellectual property." },
  { pt: "Cada visitante é uma oportunidade. Sem pressa, sem pressão. Apenas presença.", en: "Every visitor is an opportunity. No rush, no pressure. Just presence." },
];

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const ALL_MODULES = [
  // Área 1: Marca & Produto
  { id: "brand-story", num: 1, icon: BookOpen, navKey: "brandStory" as const, category: "brand" },
  { id: "product-knowledge", num: 2, icon: Wine, navKey: "productKnowledge" as const, category: "brand" },
  { id: "store-experience", num: 3, icon: Store, navKey: "storeExperience" as const, category: "brand" },
  { id: "glossary-vocab", num: 4, icon: Languages, navKey: "glossaryVocab" as const, category: "brand" },
  // Área 2: Técnica Comercial
  { id: "sales-funnel", num: 5, icon: Target, navKey: "salesFunnel" as const, category: "commercial" },
  { id: "objection-handling", num: 6, icon: Shield, navKey: "objectionHandling" as const, category: "commercial" },
  { id: "closing-consultative", num: 7, icon: MessageCircle, navKey: "closingConsultative" as const, category: "commercial" },
  // Área 3: Conhecer o Cliente
  { id: "tourist-psychology", num: 8, icon: Compass, navKey: "touristPsychology" as const, category: "client" },
  { id: "client-types", num: 9, icon: Users, navKey: "clientTypes" as const, category: "client" },
  { id: "client-culture", num: 10, icon: Heart, navKey: "clientCulture" as const, category: "client" },
  // Área 4: Operações & Liderança
  { id: "transport-logistics", num: 11, icon: Plane, navKey: "transportLogistics" as const, category: "operations" },
  { id: "digital-operations", num: 12, icon: Monitor, navKey: "digitalOperations" as const, category: "operations" },
  { id: "business-leadership", num: 13, icon: Briefcase, navKey: "businessLeadership" as const, category: "operations" },
  { id: "final-certification", num: 14, icon: Award, navKey: "finalCertification" as const, category: "certification" },
];

const DAILY_CHALLENGES = [
  { pt: "Pratica a frase de boas-vindas com 3 colegas diferentes.", en: "Practice the welcome phrase with 3 different colleagues." },
  { pt: "Apresenta o conceito Second Life a um amigo em 30 segundos.", en: "Present the Second Life concept to a friend in 30 seconds." },
  { pt: "Identifica 3 produtos na loja que seriam perfeitos para um cruzeirista.", en: "Identify 3 products in the store that would be perfect for a cruise passenger." },
  { pt: "Treina a resposta à objeção 'é caro' em frente ao espelho.", en: "Practice the 'it's expensive' objection response in front of a mirror." },
  { pt: "Escreve 3 frases de upsell diferentes para o mesmo produto.", en: "Write 3 different upsell phrases for the same product." },
  { pt: "Descreve um Tawny 30 anos em 3 palavras que não sejam técnicas.", en: "Describe a 30-year Tawny in 3 non-technical words." },
  { pt: "Pede a um colega para fingir ser um turista — faz o atendimento completo.", en: "Ask a colleague to pretend to be a tourist — do the full service." },
  { pt: "Memoriza os preços das 3 gamas mais vendidas.", en: "Memorize the prices of the top 3 selling ranges." },
  { pt: "Pratica dizer 'bem-vindo' em 5 idiomas diferentes.", en: "Practice saying 'welcome' in 5 different languages." },
  { pt: "Faz uma degustação sozinho e escreve 3 notas de prova.", en: "Do a solo tasting and write 3 tasting notes." },
  { pt: "Encontra 3 formas de sugerir a personalização UV sem ser forçado.", en: "Find 3 ways to suggest UV personalization without being pushy." },
  { pt: "Cronometra quanto tempo demoras a fazer o embrulho perfeito.", en: "Time how long it takes you to do the perfect wrapping." },
  { pt: "Explica o conceito 'Cápsula de Memória' em inglês a um colega.", en: "Explain the 'Memory Capsule' concept in English to a colleague." },
  { pt: "Verifica se todas as garrafas estão a 45° na montra.", en: "Check if all bottles are at 45° in the display." },
  { pt: "Pede pelo menos 1 review no Google Maps a um cliente satisfeito.", en: "Ask at least 1 Google Maps review from a satisfied customer." },
  { pt: "Lê um artigo sobre o Vale do Douro e aprende 1 novo facto.", en: "Read an article about the Douro Valley and learn 1 new fact." },
  { pt: "Observa um colega experiente e identifica 3 técnicas que usa.", en: "Watch an experienced colleague and identify 3 techniques they use." },
  { pt: "Cria uma comparação entre Port Ruby e Tawny para um cliente.", en: "Create a comparison between Ruby Port and Tawny for a customer." },
  { pt: "Organiza a montra focando a história visual dos produtos.", en: "Organize the display focusing on the visual story of products." },
  { pt: "Treina como receber uma reclamação com calma e solução.", en: "Practice how to handle a complaint calmly and with a solution." }
];

const getDailyTip = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
};

const getDailyChallenge = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
};

const getTimeBasedGreeting = (language: string) => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return language === "pt" ? "Bom dia," : "Good morning,";
  } else if (hour < 18) {
    return language === "pt" ? "Boa tarde," : "Good afternoon,";
  } else {
    return language === "pt" ? "Boa noite," : "Good evening,";
  }
};

const Dashboard = () => {
  const { getCompletionPercentage, isModuleCompleted, completedModules, totalModules, allowedModules, userRole, progress, streak } = useProgress();
  const { t, language } = useLanguage();
  const { user } = useAcademyAuth();
  const pct = getCompletionPercentage();
  const dailyTip = getDailyTip();
  const dailyChallenge = getDailyChallenge();
  const timeBasedGreeting = getTimeBasedGreeting(language);

  // Streak milestone message
  const getStreakMessage = () => {
    if (streak.streakDays === 0) return null;
    if (streak.streakDays === 7) return language === "pt" ? "🎉 Uma semana completa!" : "🎉 One week complete!";
    if (streak.streakDays === 14) return language === "pt" ? "🌟 Duas semanas seguidas!" : "🌟 Two weeks in a row!";
    if (streak.streakDays === 30) return language === "pt" ? "👑 Um mês perfeito!" : "👑 A perfect month!";
    return null;
  };

  // Get bookmarked modules
  const [bookmarkedModuleIds, setBookmarkedModuleIds] = useState<string[]>([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("the100s-bookmarks") || "[]");
    setBookmarkedModuleIds(saved);
  }, []);

  // Get last visited module
  const [lastModule, setLastModule] = useState<{ id: string; title: string } | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem("the100s-last-module");
    if (saved) {
      setLastModule(JSON.parse(saved));
    }
  }, []);

  // Get motivational quote based on progress
  const getMotivationalQuote = () => {
    if (pct === 0) {
      return language === "pt"
        ? "A tua jornada pelo mundo do tempo começa aqui."
        : "Your journey through the world of time begins here.";
    } else if (pct < 25) {
      return language === "pt"
        ? "A tua jornada pelo mundo do tempo começa aqui."
        : "Your journey through the world of time begins here.";
    } else if (pct < 50) {
      return language === "pt"
        ? "Cada módulo é uma cápsula de conhecimento."
        : "Every module is a capsule of knowledge.";
    } else if (pct < 75) {
      return language === "pt"
        ? "Estás a tornar-te um verdadeiro guardião do tempo."
        : "You're becoming a true guardian of time.";
    } else if (pct < 100) {
      return language === "pt"
        ? "Quase lá — o teu legado The 100's está quase completo."
        : "Almost there — your The 100's legacy is nearly complete.";
    } else {
      return language === "pt"
        ? "Parabéns — és oficialmente um guardião do tempo."
        : "Congratulations — you're officially a guardian of time.";
    }
  };

  const modules = ALL_MODULES
    .filter((m) => allowedModules.includes(m.id))
    .map((m) => ({
      ...m,
      title: t.academy.nav[m.navKey] || m.id,
      path: m.id === "final-certification" ? "/academy/module/final-certification" : `/academy/module/${m.id}`,
    }));

  const tools = [
    { id: "ask-team", title: t.academy.nav.askTeam, icon: Sparkles, path: "/academy/module/ask-team" },
    { id: "resources", title: t.academy.nav.resources, icon: FolderOpen, path: "/academy/module/resources" },
    { id: "ai-assistant", title: t.academy.nav.aiAssistant, icon: Bot, path: "/academy/module/ai-assistant" },
  ];

  const bookmarkedModules = modules.filter(m => bookmarkedModuleIds.includes(m.id));
  const recentlyCompleted = modules.filter((m) => isModuleCompleted(m.id)).slice(-3).reverse();
  const nextModule = modules.find((m) => !isModuleCompleted(m.id));
  const roleLabel = getRoleLabel(userRole, language as "pt" | "en");

  // Separate certification module from others
  const regularModules = modules.filter((m) => m.id !== "certification");
  const certificationModule = modules.find((m) => m.id === "certification");

  // Calculate evaluation stats
  const modulesWithScores = regularModules.filter((m) => progress[m.id]?.quizScore !== undefined);
  const modulesPassed = modulesWithScores.filter((m) => (progress[m.id]?.quizScore || 0) >= 80).length;
  const averageScore = modulesWithScores.length > 0
    ? Math.round(modulesWithScores.reduce((sum, m) => sum + (progress[m.id]?.quizScore || 0), 0) / modulesWithScores.length)
    : 0;

  // Helper to get score color - adjusted for dark theme
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-950/40";
    if (score >= 60) return "bg-yellow-950/40";
    return "bg-red-950/40";
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-background via-background to-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Hero/Welcome Section ── */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-5xl mx-auto">
          {/* Animated accent line above hero */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-12 origin-center"
          />

          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-6"
            >
              <img src={logoImg} alt="The 100's" className="w-12 h-12 object-contain" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="text-[10px] tracking-[0.6em] uppercase text-primary/60 mb-3"
            >
              {timeBasedGreeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease }}
              className="text-5xl md:text-6xl font-light text-primary mb-4 leading-tight"
            >
              {user?.name ? user.name : t.academy.dashboard.title}
            </motion.h1>

            {/* Decorative line under name */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              className="h-px w-16 bg-primary/40 mb-6 origin-center"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-sm md:text-base text-foreground/50 font-light max-w-xl leading-relaxed italic"
            >
              {getMotivationalQuote()}
            </motion.p>

            {userRole && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-6 px-4 py-1.5 bg-transparent border border-primary"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-light">{roleLabel}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto pb-24">
        {/* ── Progress Overview ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="bg-card border border-border/60 p-8 relative overflow-hidden">
            {/* Subtle gradient background accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl opacity-30 -z-10" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div className="space-y-1 flex-1">
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light">
                  {t.academy.dashboard.progressLabel}
                </p>
                {nextModule && pct < 100 ? (
                  <p className="text-sm text-foreground/60 font-light">
                    {t.academy.dashboard.nextLabel} <span className="text-foreground/80 font-normal">{nextModule.title}</span>
                  </p>
                ) : pct === 100 ? (
                  <div className="flex items-center gap-2 text-primary/80">
                    <Gem className="w-4 h-4" />
                    <p className="text-sm font-light">{t.academy.dashboard.onboardingComplete}</p>
                  </div>
                ) : null}
              </div>

              <div className="flex items-end gap-2">
                <motion.span
                  className="text-5xl md:text-6xl font-light text-primary leading-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {pct}
                </motion.span>
                <span className="text-base text-foreground/40 font-light mb-2">%</span>
              </div>
            </div>

            {/* Progress Bar with enhanced styling */}
            <div className="space-y-3 border-t border-border/40 pt-6">
              <div className="h-1.5 w-full bg-border/40 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-primary to-primary/70 shadow-lg shadow-primary/30"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.5, duration: 1.2, ease }}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light">
                  {completedModules} / {totalModules} {t.academy.dashboard.moduleLabel.toLowerCase()}s
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Last Visited Module ── */}
        {lastModule && (
          <motion.section variants={itemVariants} className="mb-16">
            <Link to={`/academy/module/${lastModule.id}`}>
              <motion.div
                className="relative overflow-hidden bg-card border border-border/50 p-6 transition-all duration-300 group hover:border-primary/40"
                whileHover={{ y: -2 }}
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary/60"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/50 mb-1 group-hover:text-primary/70 transition-colors duration-300">
                        {language === "pt" ? "Último módulo" : "Last module"}
                      </p>
                      <p className="text-sm text-foreground font-light group-hover:text-primary transition-colors duration-300">{lastModule.title}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.section>
        )}

        {/* ── Daily Tip and Challenge Cards ── */}
        <motion.section variants={itemVariants} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Tip - Premium Quote Card */}
          <motion.div
            className="border-l-4 border-l-primary/60 bg-card border border-border/50 p-8 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
            whileHover={{ y: -2 }}
          >
            {/* Decorative quote mark background */}
            <div className="absolute -top-8 -right-8 text-primary/8 text-8xl font-light select-none pointer-events-none">
              "
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <Lightbulb className="w-5 h-5 text-primary/70 shrink-0 mt-0.5 group-hover:text-primary transition-colors duration-300" />
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4 font-light">
                  {language === "pt" ? "Dica do Dia" : "Tip of the Day"}
                </p>
                <motion.p
                  className="text-base text-foreground/80 font-light italic leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {language === "pt" ? dailyTip.pt : dailyTip.en}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div
            className="border-l-4 border-l-primary/60 bg-card border border-border/50 p-8 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
            whileHover={{ y: -2 }}
          >
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start gap-4">
              <Crosshair className="w-5 h-5 text-primary/70 shrink-0 mt-0.5 group-hover:text-primary transition-colors duration-300" />
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4 font-light">
                  {language === "pt" ? "Desafio do Dia" : "Daily Challenge"}
                </p>
                <motion.p
                  className="text-base text-foreground/80 font-light italic leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {language === "pt" ? dailyChallenge.pt : dailyChallenge.en}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Learning Streak ── */}
        {streak.streakDays > 0 && (
          <motion.section variants={itemVariants} className="mb-16">
            <div className="relative overflow-hidden bg-gradient-to-r from-primary/12 via-primary/8 to-primary/5 border border-primary/30 p-8">
              {/* Animated flame glow background */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Flame className="w-6 h-6 text-primary drop-shadow-lg drop-shadow-primary/50" />
                  </motion.div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-1 font-light">
                      {language === "pt" ? "Sequência Ativa" : "Active Streak"}
                    </p>
                    <motion.p
                      className="text-3xl font-light text-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {streak.streakDays} <span className="text-base font-light text-primary/70">{language === "pt" ? "dias" : "days"}</span>
                    </motion.p>
                  </div>
                </div>
                {getStreakMessage() && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-lg font-light text-primary text-right"
                  >
                    {getStreakMessage()}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── Continue Where You Left Off ── */}
        {nextModule && pct < 100 && (
          <motion.section variants={itemVariants} className="mb-16">
            <Link to={nextModule.path}>
              <motion.div
                className="relative overflow-hidden bg-background border border-primary/30 p-8 transition-all duration-300 group hover:border-primary/70"
                whileHover={{ y: -3 }}
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-primary/60"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-[9px] tracking-[0.3em] uppercase text-primary/60 font-light">
                        {language === "pt" ? "Continua de onde ficaste" : "Continue where you left off"}
                      </p>
                    </div>
                    <h3 className="text-2xl font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {nextModule.title}
                    </h3>
                    <p className="text-sm text-foreground/60 font-light max-w-lg">
                      {language === "pt" ? "Retoma o teu progresso e completa este módulo para avançar na tua jornada." : "Pick up where you left off and complete this module to progress on your journey."}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-primary/70 group-hover:text-primary transition-all duration-300 shrink-0">
                    <span className="text-sm tracking-[0.2em] uppercase font-light">
                      {language === "pt" ? "Continuar" : "Continue"}
                    </span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.section>
        )}

        {/* ── Empty State: No modules started ── */}
        {pct === 0 && (
          <motion.section variants={itemVariants} className="mb-16">
            <div className="bg-card border border-border/30 p-12 text-center">
              <BookOpen className="w-12 h-12 text-primary/30 mx-auto mb-4" />
              <h2 className="text-2xl font-light text-foreground mb-3">
                {language === "pt" ? "Comece a sua jornada" : "Start your journey"}
              </h2>
              <p className="text-foreground/60 font-light mb-6 max-w-md mx-auto">
                {language === "pt"
                  ? "Bem-vindo à The 100's Academy. Clique abaixo para começar o primeiro módulo."
                  : "Welcome to The 100's Academy. Click below to start your first module."}
              </p>
              {nextModule && (
                <Link
                  to={nextModule.path}
                  className="inline-block border border-primary/30 px-8 py-4 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  {language === "pt" ? "Iniciar →" : "Start →"}
                </Link>
              )}
            </div>
          </motion.section>
        )}

        {/* ── Saved Modules (Bookmarks) ── */}
        {bookmarkedModules.length > 0 && (
          <motion.section variants={itemVariants} className="mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                <h2 className="text-lg font-light text-foreground/90 tracking-wide">{language === "pt" ? "Guardados" : "Saved"}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {bookmarkedModules.map((m) => {
                  const done = isModuleCompleted(m.id);
                  const score = progress[m.id]?.quizScore;

                  return (
                    <motion.div key={m.id} variants={itemVariants}>
                      <Link to={m.path}>
                        <motion.div
                          className="group relative bg-card border border-primary/40 p-6 flex flex-col gap-4 transition-all duration-500 h-full overflow-hidden hover:border-primary/70 shadow-lg shadow-primary/5"
                          whileHover={{ y: -3, boxShadow: "0 12px 24px rgba(212, 175, 55, 0.15)" }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Animated background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                          <div className="flex items-start justify-between relative z-10">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 border border-primary/30 flex-shrink-0 group-hover:bg-primary/15 transition-all duration-300">
                              <span className="text-[10px] font-medium text-primary">{String(m.num).padStart(2, "0")}</span>
                            </div>
                            <motion.div
                              animate={{ rotate: [0, 5, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <Star className="w-4 h-4 fill-primary/70 text-primary/70 group-hover:fill-primary group-hover:text-primary transition-colors duration-300" />
                            </motion.div>
                          </div>

                          <div className="flex justify-center py-2">
                            <m.icon className={`w-6 h-6 transition-all duration-300 ${
                              done ? "text-primary/70" : "text-muted-foreground/50 group-hover:text-primary group-hover:scale-110"
                            }`} />
                          </div>

                          <div className="flex-1">
                            <h3 className={`text-sm font-light text-center leading-snug transition-colors duration-300 ${
                              done ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
                            }`}>
                              {m.title}
                            </h3>
                          </div>

                          <div className="text-center">
                            {done ? (
                              score !== undefined ? (
                                <span className={`text-[10px] font-medium tracking-[0.1em] ${
                                  score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"
                                }`}>
                                  {score}%
                                </span>
                              ) : (
                                <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-light">
                                  ✓ {t.academy.dashboard.completed.toLowerCase()}
                                </span>
                              )
                            ) : (
                              <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30">—</span>
                            )}
                          </div>

                          {/* Progress bar at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary via-primary to-primary/60"
                              initial={{ width: 0 }}
                              animate={{ width: done ? "100%" : "0%" }}
                              transition={{ delay: 0.1, duration: 0.6 }}
                            />
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── Recently Completed ── */}
        {recentlyCompleted.length > 0 && (
          <motion.section variants={itemVariants} className="mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                <h2 className="text-lg font-light text-foreground/90 tracking-wide">{language === "pt" ? "Recentemente concluído" : "Recently completed"}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {recentlyCompleted.map((m) => {
                  const score = progress[m.id]?.quizScore;

                  return (
                    <motion.div key={m.id} variants={itemVariants}>
                      <Link to={m.path}>
                        <motion.div
                          className="group relative bg-card border border-border/40 p-6 flex flex-col gap-4 transition-all duration-500 h-full overflow-hidden hover:border-green-500/40 shadow-lg shadow-green-950/10"
                          whileHover={{ y: -3, boxShadow: "0 12px 24px rgba(74, 222, 128, 0.1)" }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Success glow on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-green-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                          <div className="flex items-start justify-between relative z-10">
                            <motion.div
                              className="w-8 h-8 rounded-full flex items-center justify-center bg-green-950/50 border border-green-600/50 flex-shrink-0 group-hover:bg-green-900/60 group-hover:border-green-500/70 transition-all duration-300"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                            >
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Check className="w-4 h-4 text-green-400" />
                              </motion.div>
                            </motion.div>
                          </div>

                          <div className="flex justify-center py-2">
                            <m.icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-sm font-light text-center leading-snug text-foreground group-hover:text-foreground transition-colors duration-300">
                              {m.title}
                            </h3>
                          </div>

                          <div className="text-center">
                            {score !== undefined ? (
                              <span className={`text-[10px] font-medium tracking-[0.1em] ${
                                score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"
                              }`}>
                                {score}%
                              </span>
                            ) : (
                              <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-light">
                                ✓ {t.academy.dashboard.completed.toLowerCase()}
                              </span>
                            )}
                          </div>

                          {/* Completion indicator at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-950/30">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-400 via-green-400 to-green-500/60"
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                            />
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── Module Sections by Category ── */}
        <motion.section variants={itemVariants} className="mb-16">
          {/* Define category labels */}
          {(() => {
            const categoryLabels = {
              product: { pt: "Marca & Produto", en: "Brand & Product" },
              sales: { pt: "Vendas & Cliente", en: "Sales & Customer" },
              operations: { pt: "Loja & Operações", en: "Store & Operations" },
              knowledge: { pt: "Conhecimento", en: "Knowledge" },
              leadership: { pt: "Liderança", en: "Leadership" },
              certification: { pt: "Certificação", en: "Certification" },
            };

            const categories = ["product", "sales", "operations", "knowledge", "leadership", "certification"] as const;

            return categories.map((category) => {
              const modulesByCategory = regularModules.filter((m) => m.category === category);
              if (modulesByCategory.length === 0) return null;

              const categoryLabel = categoryLabels[category][language === "pt" ? "pt" : "en"];

              return (
                <div key={category} className="mb-12">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                    <h2 className="text-lg font-light text-foreground/90 tracking-wide">{categoryLabel}</h2>
                  </div>

                  {/* Module Grid - 1 col on mobile, 2 on tablet, 3+ on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {modulesByCategory.map((m) => {
                      const done = isModuleCompleted(m.id);
                      const isNext = nextModule?.id === m.id;
                      const score = progress[m.id]?.quizScore;

                      return (
                        <motion.div key={m.id} variants={itemVariants}>
                          <Link to={m.path}>
                            <motion.div
                              className={`group relative bg-card border border-border/40 p-6 flex flex-col gap-4 transition-all duration-500 h-full overflow-hidden ${
                                isNext ? "border-primary/50 bg-primary/4 shadow-lg shadow-primary/10" : "hover:border-primary/40"
                              } ${done ? "border-border/60" : ""}`}
                              whileHover={{ y: -3, boxShadow: "0 12px 24px rgba(212, 175, 55, 0.12)" }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Left gold border accent for available modules */}
                              {!done && !isNext && (
                                <motion.div
                                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  initial={{ height: 0 }}
                                  whileHover={{ opacity: 1 }}
                                />
                              )}

                              {/* Module Number Badge */}
                              <div className="flex items-start justify-between relative z-10">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 border border-primary/25 flex-shrink-0 group-hover:bg-primary/15 group-hover:border-primary/40 transition-all duration-300">
                                  <span className="text-[10px] font-medium text-primary">{String(m.num).padStart(2, "0")}</span>
                                </div>
                                {done && (
                                  <motion.div
                                    className="text-green-400/80"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                  >
                                    <Check className="w-4 h-4" />
                                  </motion.div>
                                )}
                              </div>

                              {/* Icon */}
                              <div className="flex justify-center py-2">
                                <m.icon className={`w-6 h-6 transition-all duration-300 ${
                                  done ? "text-primary/70" : "text-muted-foreground/50 group-hover:text-primary group-hover:scale-110"
                                }`} />
                              </div>

                              {/* Title */}
                              <div className="flex-1">
                                <h3 className={`text-sm font-light text-center leading-snug transition-colors duration-300 ${
                                  done ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
                                }`}>
                                  {m.title}
                                </h3>
                              </div>

                              {/* Status Indicator */}
                              <div className="text-center">
                                {done ? (
                                  score !== undefined ? (
                                    <span className={`text-[10px] font-medium tracking-[0.1em] ${getScoreColor(score)}`}>
                                      {score}%
                                    </span>
                                  ) : (
                                    <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-light">
                                      ✓ {t.academy.dashboard.completed.toLowerCase()}
                                    </span>
                                  )
                                ) : isNext ? (
                                  <span className="text-[9px] tracking-[0.15em] uppercase text-primary/70 font-light">
                                    {language === "pt" ? "Próximo" : "Next"}
                                  </span>
                                ) : (
                                  <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30">—</span>
                                )}
                              </div>

                              {/* Progress indicator bar at bottom */}
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/20">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-primary via-primary to-primary/60"
                                  initial={{ width: 0 }}
                                  animate={{ width: done ? "100%" : "0%" }}
                                  transition={{ delay: 0.1, duration: 0.6 }}
                                />
                              </div>
                            </motion.div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            });
          })()}

          {/* Certification Card - Always Last and Special */}
          {certificationModule && (
            <div className="mt-16 pt-8 border-t border-border/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                <h2 className="text-lg font-light text-foreground/90 tracking-wide">
                  {language === "pt" ? "Certificação" : "Certification"}
                </h2>
              </div>

              <Link to={certificationModule.path}>
                <motion.div
                  className={`group relative bg-card border-2 border-primary/30 p-6 flex flex-col gap-4 transition-all duration-500 w-full sm:w-fit ${
                    pct === 100 ? "hover:border-primary/60" : "opacity-60 cursor-not-allowed"
                  }`}
                  whileHover={pct === 100 ? { y: -2, boxShadow: "0 8px 16px rgba(50, 35, 20, 0.08)" } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {/* Module Number Badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/15 border border-primary/30 flex-shrink-0">
                      <span className="text-[10px] font-medium text-primary">{String(certificationModule.num).padStart(2, "0")}</span>
                    </div>
                    {pct === 100 ? (
                      <div className="text-primary/70">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground/40" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center py-2">
                    <certificationModule.icon className={`w-6 h-6 transition-colors duration-300 ${
                      pct === 100 ? "text-primary/70" : "text-muted-foreground/30"
                    }`} />
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h3 className={`text-sm font-light text-center leading-snug transition-colors duration-300 ${
                      pct === 100 ? "text-foreground" : "text-foreground/50"
                    }`}>
                      {certificationModule.title}
                    </h3>
                  </div>

                  {/* Status Indicator */}
                  <div className="text-center">
                    {pct === 100 ? (
                      <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-light">
                        {language === "pt" ? "Desbloqueado" : "Unlocked"}
                      </span>
                    ) : (
                      <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30">{language === "pt" ? "Bloqueado" : "Locked"}</span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </div>
          )}
        </motion.section>

        {/* ── Evaluations Section ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="relative overflow-hidden bg-card border border-border/40 p-8 shadow-sm">
            {/* Subtle gradient background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl opacity-20 -z-10 -mr-48 -mt-48" />

            <h2 className="text-lg font-light text-foreground mb-8 flex items-center gap-3 relative z-10">
              <motion.div
                className="w-1 h-6 bg-primary/60 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: 24 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
              {t.academy.dashboard.evaluationsTitle}
            </h2>

            {modulesWithScores.length > 0 ? (
              <div className="space-y-6 relative z-10">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <motion.div
                    className="bg-background/40 border border-border/30 p-4 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                      {t.academy.dashboard.averageScore}
                    </p>
                    <motion.p
                      className="text-3xl font-light text-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {averageScore}%
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className="bg-background/40 border border-border/30 p-4 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                      {t.academy.dashboard.modulesPassed}
                    </p>
                    <motion.p
                      className="text-3xl font-light text-foreground/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {modulesPassed}/{modulesWithScores.length}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className="bg-background/40 border border-border/30 p-4 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                      {language === "pt" ? "Taxa de Aprovação" : "Pass Rate"}
                    </p>
                    <motion.p
                      className="text-3xl font-light text-foreground/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      {modulesWithScores.length > 0 ? Math.round((modulesPassed / modulesWithScores.length) * 100) : 0}%
                    </motion.p>
                  </motion.div>
                </div>

                {/* Scores List */}
                <div className="space-y-3">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-4">
                    {language === "pt" ? "Detalhes por módulo" : "Module details"}
                  </p>
                  {modulesWithScores.map((m, idx) => {
                    const score = progress[m.id]?.quizScore || 0;
                    const isPassed = score >= 80;
                    return (
                      <motion.div
                        key={m.id}
                        className={`flex items-center justify-between p-4 border border-border/20 transition-all duration-300 hover:border-primary/30 ${getScoreBgColor(score)}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx, duration: 0.3 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-[10px] font-medium text-muted-foreground/70 w-6 text-center">{m.num.toString().padStart(2, "0")}</span>
                          <span className="text-sm font-light text-foreground/80 flex-1">{m.title}</span>
                        </div>
                        <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                          {score}% {isPassed ? "✓" : ""}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 relative z-10">
                <BarChart3 className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-sm text-foreground/60 font-light">
                  {language === "pt"
                    ? "Completa quizzes para ver as tuas avaliações"
                    : "Complete quizzes to see your evaluations"}
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── Tools Section ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="mb-8">
            <h2 className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/50 text-center">
              {language === "pt" ? "ferramentas" : "tools"}
            </h2>
          </div>

          <div className="relative overflow-hidden bg-card border border-border/40">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />

            {tools.map((tool, idx) => (
              <Link key={tool.id} to={tool.path}>
                <motion.div
                  className={`group relative flex items-center gap-4 px-6 py-5 hover:bg-primary/5 transition-all duration-300 ${
                    idx !== tools.length - 1 ? "border-b border-border/20" : ""
                  }`}
                  whileHover={{ x: 3, paddingLeft: 24 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <tool.icon className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  <span className="text-sm font-light text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300 flex-1">
                    {tool.title}
                  </span>
                  <motion.div
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-primary/60 transition-all duration-300" />
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── Quote ── */}
        <motion.section variants={itemVariants} className="py-16">
          <div className="text-center">
            {/* Decorative lines */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ originX: 0 }}
              />
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary/40"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
              <motion.div
                className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ originX: 1 }}
              />
            </motion.div>

            {/* Quote */}
            <motion.p
              className="text-lg md:text-xl font-light text-foreground/50 italic max-w-lg mx-auto leading-relaxed tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t.academy.dashboard.quote}
            </motion.p>

            {/* Signature */}
            <motion.p
              className="text-[8px] tracking-[0.5em] uppercase text-muted-foreground/35 mt-8 letter-spacing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              The 100's
            </motion.p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
