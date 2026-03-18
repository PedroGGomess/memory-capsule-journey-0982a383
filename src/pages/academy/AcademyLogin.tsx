import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import logoImg from "@/assets/Logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

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
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle paper texture background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay pointer-events-none" />

      {/* Minimal background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease }}
        >
          <div className="relative">
            <img src={logoImg} alt="The 100's" className="w-20 h-20 object-contain" />
          </div>
        </motion.div>

        {/* Title section */}
        <div className="text-center mb-10">
          <motion.p
            className="text-[9px] tracking-[0.6em] uppercase text-primary/40 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            {t.academy.login.tagline}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-extralight text-gold-gradient mb-3 tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
          >
            {t.academy.login.title}
          </motion.h1>
          <motion.p
            className="text-[10px] text-muted-foreground/40 font-light tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t.academy.login.subtitle}
          </motion.p>
        </div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/20" />
          <div className="mx-4 w-1.5 h-1.5 rounded-full bg-primary/20" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/20" />
        </motion.div>

        {/* Login card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease }}
        >
          <div className="border border-border/30 bg-card p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/35 text-center mb-8">
              {t.academy.login.portalLabel}
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label
                  htmlFor="code"
                  className="block text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40 text-center"
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
                  className="font-mono tracking-[0.5em] text-center bg-background border-border/40 focus:border-primary/40 focus:bg-background focus:ring-1 focus:ring-primary/15 text-foreground/80 placeholder:text-muted-foreground/30 h-14 text-lg transition-all duration-500"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  className="text-xs text-destructive/80 text-center font-light"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={!code.trim()}
                className="w-full border border-primary/30 bg-primary/3 text-primary hover:bg-primary/8 hover:border-primary/40 tracking-[0.3em] uppercase text-[10px] font-light transition-all duration-500 h-14 disabled:opacity-30"
              >
                {t.academy.login.enterButton}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Hint text */}
        <motion.p
          className="text-center text-[9px] text-muted-foreground/25 mt-10 font-light tracking-wider leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {t.academy.login.codeHint}
        </motion.p>

        {/* Return link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-muted-foreground/20 hover:text-muted-foreground/50 transition-colors duration-500"
          >
            <span className="w-4 h-px bg-current" />
            {t.academy.login.returnLink}
            <span className="w-4 h-px bg-current" />
          </Link>
        </motion.div>

        {/* Bottom branding */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-[8px] tracking-[0.5em] uppercase text-muted-foreground/10">
            The 100's © 2024
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AcademyLogin;
