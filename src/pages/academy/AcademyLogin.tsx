import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";

const AcademyLogin = () => {
  const { isAuthenticated, login } = useAcademyAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/academy", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    const success = login(trimmed);
    if (success) {
      navigate("/academy", { replace: true });
    } else {
      setError("Invalid access code. Please try again.");
      setCode("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-primary/20 mb-6">
            <GraduationCap className="w-7 h-7 text-primary/60" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gold-gradient mb-2">
            The 100's Academy
          </h1>
          <p className="text-sm text-muted-foreground font-light tracking-[0.2em] uppercase">
            Employee Portal
          </p>
        </div>

        {/* Login card */}
        <div className="border border-border/30 p-8 bg-card/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
              >
                Access Code
              </Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                placeholder="Enter your access code"
                className="font-mono tracking-widest text-center bg-background/50 border-border/40 focus:border-primary/40"
                autoComplete="off"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs text-destructive text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={!code.trim()}
              className="w-full border border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary tracking-[0.2em] uppercase text-xs font-light transition-all duration-500"
            >
              Enter Academy
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-8 font-light">
          Access code provided by your manager.
        </p>
      </div>
    </div>
  );
};

export default AcademyLogin;
