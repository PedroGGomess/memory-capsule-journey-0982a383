import { useState, useRef } from "react";
import { useGymAccess } from "@/contexts/GymAccessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type VerifyState = "idle" | "allowed" | "denied";

const AccessVerification = () => {
  const { verifyAccessCode } = useGymAccess();
  const { t } = useLanguage();
  const [code, setCode] = useState("");
  const [state, setState] = useState<VerifyState>("idle");
  const [memberName, setMemberName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const result = verifyAccessCode(code.trim());

    if (result.allowed && result.user) {
      setState("allowed");
      setMemberName(result.user.name);
    } else {
      setState("denied");
      setMemberName(null);
    }
  };

  const handleReset = () => {
    setState("idle");
    setCode("");
    setMemberName(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Dumbbell className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{t.gymAccess.title}</h1>
          <p className="text-muted-foreground text-sm">
            {t.gymAccess.subtitle}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleVerify} className="space-y-4">
                <Input
                  ref={inputRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="XXX-XXXX-XXXX"
                  className="text-center text-lg font-mono tracking-widest h-14"
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                />
                <Button type="submit" className="w-full h-12 text-base" disabled={!code.trim()}>
                  {t.gymAccess.verifyButton}
                </Button>
              </form>
            </motion.div>
          )}

          {state === "allowed" && (
            <motion.div
              key="allowed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <p className="text-green-600 font-semibold text-lg">{t.gymAccess.allowed.welcome}</p>
                <p className="text-2xl font-bold mt-1">{memberName}</p>
                <p className="text-muted-foreground text-sm mt-1">{t.gymAccess.allowed.message}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                {t.gymAccess.tryAgain}
              </Button>
            </motion.div>
          )}

          {state === "denied" && (
            <motion.div
              key="denied"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <p className="text-red-600 font-semibold text-lg">{t.gymAccess.denied.title}</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {t.gymAccess.denied.message}
                </p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                {t.gymAccess.tryAgain}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-muted-foreground/50">
          <a href="/gym-admin/login" className="hover:underline">
            Admin
          </a>
        </p>
      </div>
    </div>
  );
};

export default AccessVerification;
