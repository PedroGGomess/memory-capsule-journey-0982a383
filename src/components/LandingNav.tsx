import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

const LandingNav = () => {
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
        <Link
          to="/gym-admin/login"
          className="group inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-all duration-500"
          aria-label="Admin Dashboard"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Admin</span>
        </Link>

        <Link
          to="/academy/login"
          className="group inline-flex items-center gap-2 border border-primary/30 px-5 py-2 text-[11px] tracking-[0.25em] uppercase text-primary/70 transition-all duration-500 hover:border-primary hover:text-primary hover:glow-gold"
        >
          <span>Academy Login</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
            →
          </span>
        </Link>
      </div>
    </motion.header>
  );
};

export default LandingNav;
