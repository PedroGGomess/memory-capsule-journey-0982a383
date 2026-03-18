import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import logoImg from "@/assets/Logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

const AcademyLogin = () => {
  const { isAuthenticated, login, isLoading: authLoading } = useAcademyAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/academy", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const success = await login(trimmed);
      if (success) {
        navigate("/academy", { replace: true });
      } else {
        setError(t.academy.login.invalidCode);
        setCode("");
      }
    } catch (err) {
      setError(t.academy.login.invalidCode);
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Theme toggle - top right */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 text-foreground/70 hover:text-primary transition-colors duration-200 z-50"
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

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
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl md:text-6xl font-light text-primary mb-2 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
          >
            {t.academy.login.title}
          </motion.h1>
          <motion.p
            className="text-sm text-foreground/60 font-light tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t.academy.login.subtitle}
          </motion.p>
        </div>

        {/* Login card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease }}
        >
          <div className="border border-border bg-card p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="code"
                  className="block text-xs tracking-[0.2em] uppercase text-foreground/60 text-center font-light"
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
                  placeholder="CODE"
                  className="font-light tracking-wider text-center bg-background border border-border focus:border-primary text-foreground placeholder:text-foreground/40 h-12 text-base transition-colors duration-200"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  className="text-xs text-destructive text-center font-light"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={!code.trim() || isLoading}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-background tracking-[0.2em] uppercase text-xs font-light transition-all duration-200 h-12 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="animate-pulse">{t.academy.login.enterButton}</span>
                ) : (
                  t.academy.login.enterButton
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Return link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/"
            className="text-xs tracking-[0.2em] uppercase text-foreground/50 hover:text-primary transition-colors duration-200 font-light"
          >
            {t.academy.login.returnLink}
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
