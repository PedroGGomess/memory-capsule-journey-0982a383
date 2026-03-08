import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LandingNav = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between section-padding py-5 bg-background/80 backdrop-blur-sm border-b border-border/10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
    >
      <p className="text-sm tracking-[0.3em] uppercase text-primary/70 font-light">
        The 100's
      </p>

      <div className="flex items-center gap-3">
        {/* Language switcher */}
        <div className="flex items-center gap-1 border border-border/20 rounded-sm overflow-hidden">
          <button
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
              language === "en"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <div className="w-px h-3 bg-border/30" />
          <button
            onClick={() => setLanguage("pt")}
            className={`px-2.5 py-1.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
              language === "pt"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
            aria-label="Mudar para Português"
          >
            PT
          </button>
        </div>

        {/* Admin link — hidden, triple-click to reveal */}
        <Link
          to="/gym-admin/login"
          className="opacity-0 hover:opacity-20 transition-opacity duration-1000 px-2 py-2"
          aria-label="Admin"
        >
          <LayoutDashboard className="w-3 h-3" />
        </Link>

        <Link
          to="/academy/login"
          className="group inline-flex items-center gap-2 border border-primary/30 px-5 py-2 text-[11px] tracking-[0.25em] uppercase text-primary/70 transition-all duration-500 hover:border-primary hover:text-primary hover:glow-gold"
        >
          <span>{t.nav.academyLogin}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
            →
          </span>
        </Link>
      </div>
    </motion.header>
  );
};

export default LandingNav;
