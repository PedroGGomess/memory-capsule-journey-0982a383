import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Lock, KeyRound, Eye, EyeOff } from "lucide-react";
import logoImg from "@/assets/Logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

const AdminLogin = () => {
  const { login, isAuthenticated, adminUser, changePassword } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && adminUser && !adminUser.must_change_password) {
      navigate("/gym-admin", { replace: true });
    }
  }, [isAuthenticated, adminUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email.trim(), password);
    if (result.success) {
      if (result.mustChangePassword) {
        setMustChangePassword(true);
      } else {
        navigate("/gym-admin", { replace: true });
      }
    } else {
      setError("Credenciais inválidas ou conta inativa.");
    }
    setLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("A password deve ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("As passwords não coincidem.");
      return;
    }
    setChangingPassword(true);
    setError("");
    const ok = await changePassword(newPassword);
    if (ok) {
      navigate("/gym-admin", { replace: true });
    } else {
      setError("Erro ao alterar password. Tente novamente.");
    }
    setChangingPassword(false);
  };

  if (mustChangePassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />
        </div>

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
              <div className="w-14 h-14 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center relative z-10">
                <KeyRound className="w-6 h-6 text-primary/70" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-extralight text-foreground/80 mb-2">Alterar Password</h1>
            <p className="text-xs text-muted-foreground/40 font-light leading-relaxed max-w-xs mx-auto">
              Por questões de segurança, precisa de definir uma nova password.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="border border-border/15 bg-card/20 backdrop-blur-xl p-10">
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40">Nova Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Mínimo 6 caracteres"
                    autoFocus
                    className="bg-background/30 border-border/15 focus:border-primary/30 h-12 text-sm font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40">Confirmar Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repita a password"
                    className="bg-background/30 border-border/15 focus:border-primary/30 h-12 text-sm font-light"
                  />
                </div>
                {error && (
                  <motion.p className="text-xs text-destructive/80 text-center font-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {error}
                  </motion.p>
                )}
                <Button
                  type="submit"
                  disabled={changingPassword}
                  className="w-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 tracking-[0.3em] uppercase text-[10px] font-light transition-all duration-500 h-14 disabled:opacity-30"
                >
                  <Lock className="w-3.5 h-3.5 mr-2" />
                  {changingPassword ? "A guardar..." : "Definir Nova Password"}
                </Button>
              </form>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-40 bg-gradient-to-t from-transparent via-primary/10 to-transparent" />
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
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
            <img src={logoImg} alt="The 100's" className="w-20 h-20 object-contain relative z-10" />
          </div>
        </motion.div>

        {/* Title */}
        <div className="text-center mb-10">
          <motion.p
            className="text-[9px] tracking-[0.6em] uppercase text-primary/40 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            Painel de Administração
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-extralight text-gold-gradient mb-3 tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
          >
            The 100's
          </motion.h1>
          <motion.p
            className="text-[10px] text-muted-foreground/40 font-light tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Admin
          </motion.p>
        </div>

        {/* Divider */}
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
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          <div className="border border-border/15 bg-card/20 backdrop-blur-xl p-10">
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/30 text-center mb-8">
              Acesso Restrito
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40">
                  Email
                </label>
                <Input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  required
                  placeholder="admin@the100s.com"
                  className="bg-background/30 border-border/15 focus:border-primary/30 focus:bg-background/50 text-foreground/80 placeholder:text-muted-foreground/20 h-14 text-sm font-light transition-all duration-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    required
                    placeholder="••••••••"
                    className="bg-background/30 border-border/15 focus:border-primary/30 focus:bg-background/50 text-foreground/80 placeholder:text-muted-foreground/20 h-14 text-sm font-light transition-all duration-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p className="text-xs text-destructive/80 text-center font-light" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 tracking-[0.3em] uppercase text-[10px] font-light transition-all duration-500 h-14 disabled:opacity-30"
              >
                <Lock className="w-3.5 h-3.5 mr-2" />
                {loading ? "A entrar..." : "Entrar"}
              </Button>
            </form>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </motion.div>

        {/* Hint */}
        <motion.p
          className="text-center text-[9px] text-muted-foreground/20 mt-10 font-light tracking-wider font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          admin@the100s.com · admin123
        </motion.p>

        {/* Branding */}
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

export default AdminLogin;
