import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const AcademyLogin = () => {
  const { isAuthenticated, login } = useAcademyAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/academy", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    const success = login(trimmed);
    if (success) {
      navigate("/academy", { replace: true });
    } else {
      setError(t.academy.login.invalidCode);
      setCode("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px] animate-slow-pulse" />
      </div>
      <div className="absolute left-1/2 top-0 h-32 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <motion.div
        className="w-full max-w-sm relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="text-center mb-12">
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase text-primary/50 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {t.academy.login.tagline}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-light text-gold-gradient mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {t.academy.login.title}
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground font-light tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            {t.academy.login.subtitle}
          </motion.p>
        </div>

        <motion.div
          className="flex items-center justify-center mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="h-px w-16 bg-primary/20" />
          <div className="mx-3 h-1 w-1 rounded-full bg-primary/40" />
          <div className="h-px w-16 bg-primary/20" />
        </motion.div>

        <motion.div
          className="border border-border/30 p-8 bg-card/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 text-center mb-6">
            {t.academy.login.portalLabel}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="code"
                className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70 text-center"
              >
                {t.academy.login.codeLabel}
              </label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                placeholder="· · · · · · · ·"
                className="font-mono tracking-[0.4em] text-center bg-background/50 border-border/30 focus:border-primary/40 text-primary placeholder:text-muted-foreground/30 h-12"
                autoComplete="off"
                autoFocus
              />
            </div>

            {error && (
              <motion.p
                className="text-xs text-destructive text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={!code.trim()}
              className="w-full border border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary tracking-[0.3em] uppercase text-xs font-light transition-all duration-500 h-12"
            >
              {t.academy.login.enterButton}
            </Button>
          </form>
        </motion.div>

        <motion.p
          className="text-center text-[10px] text-muted-foreground/40 mt-8 font-light tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {t.academy.login.codeHint}
        </motion.p>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <Link
            to="/"
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-500"
          >
            {t.academy.login.returnLink}
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default AcademyLogin;
