import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { getRoleLabel } from "@/config/roles";
import { Users, ChevronDown, Mail, Calendar, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMPLOYEE_ROLES } from "@/config/roles";
import { useToast } from "@/hooks/use-toast";

type Employee = Tables<"academy_employees">;

interface EmployeeWithProgress extends Employee {
  progressPercent: number;
  quizAverage: number;
  lastLoginFormatted: string;
}

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

export default function TeamView() {
  const { language, t } = useLanguage();
  const { user } = useAcademyAuth();
  const { userRole } = useProgress();
  const { toast } = useToast();

  const [employees, setEmployees] = useState<EmployeeWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "store-employee" as const,
  });

  const isManager = userRole === "store-manager" || userRole === "team-leader";
  const isStoreManager = userRole === "store-manager";

  const generateAccessCode = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomValues = new Uint32Array(8);
    crypto.getRandomValues(randomValues);
    return Array.from(randomValues, (v) => chars[v % chars.length]).join("");
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("academy_employees")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const processed = (data || []).map((emp) => {
        const progress = emp.progress as Record<string, any> || {};
        const quizScores = emp.quiz_scores as Record<string, number> || {};

        const completedCount = Object.values(progress).filter((p: any) => p?.completed).length;
        const totalModules = 22;
        const progressPercent = Math.round((completedCount / totalModules) * 100);

        const scores = Object.values(quizScores) as number[];
        const quizAverage = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

        const lastLogin = emp.last_login ? new Date(emp.last_login) : null;
        const lastLoginFormatted = lastLogin
          ? `${lastLogin.toLocaleDateString(language === "pt" ? "pt-PT" : "en-US")} ${lastLogin.toLocaleTimeString(language === "pt" ? "pt-PT" : "en-US", { hour: "2-digit", minute: "2-digit" })}`
          : language === "pt"
          ? "Nunca"
          : "Never";

        return {
          ...emp,
          progressPercent,
          quizAverage,
          lastLoginFormatted,
        };
      });

      setEmployees(processed);
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erro",
        description: language === "en" ? "Failed to load team" : "Falha ao carregar equipa",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEmployee = async () => {
    if (!formData.name.trim()) {
      toast({
        title: language === "en" ? "Validation Error" : "Erro de Validação",
        description: language === "en" ? "Name is required" : "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }

    try {
      const accessCode = generateAccessCode();
      const { error } = await supabase.from("academy_employees").insert({
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        role: formData.role,
        access_code: accessCode,
        is_active: true,
      });

      if (error) throw error;

      toast({
        title: language === "en" ? "Success" : "Sucesso",
        description: language === "en" ? "Employee created successfully" : "Funcionário criado com sucesso",
      });

      setFormData({ name: "", email: "", role: "store-employee" });
      setShowCreateDialog(false);
      await loadTeam();
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erro",
        description: language === "en" ? "Failed to create employee" : "Falha ao criar funcionário",
        variant: "destructive",
      });
    }
  };

  const avgProgress = employees.length > 0 ? Math.round(employees.reduce((sum, e) => sum + e.progressPercent, 0) / employees.length) : 0;
  const avgQuiz = employees.length > 0 ? Math.round(employees.reduce((sum, e) => sum + e.quizAverage, 0) / employees.length) : 0;

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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-6"
            >
              <Users className="w-12 h-12 text-primary/60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-5xl md:text-6xl font-light text-primary mb-4 leading-tight"
            >
              {language === "pt" ? "A Minha Equipa" : "My Team"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm md:text-base text-foreground/50 font-light max-w-xl leading-relaxed italic"
            >
              {language === "pt"
                ? "Acompanha o progresso de aprendizagem e desempenho da tua equipa."
                : "Track your team's learning progress and performance."}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto pb-24">
        {/* ── Team Stats ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light mb-2">
                {language === "pt" ? "Total de Membros" : "Total Members"}
              </p>
              <p className="text-3xl font-light text-primary">{employees.length}</p>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light mb-2">
                {language === "pt" ? "Progresso Médio" : "Average Progress"}
              </p>
              <p className="text-3xl font-light text-primary">{avgProgress}%</p>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-light mb-2">
                {language === "pt" ? "Avaliação Média" : "Average Score"}
              </p>
              <p className="text-3xl font-light text-primary">{avgQuiz}%</p>
            </div>
          </div>
        </motion.section>

        {/* ── Add Employee Button (Store Manager only) ── */}
        {isStoreManager && (
          <motion.section variants={itemVariants} className="mb-8">
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-wider"
            >
              <Plus className="w-4 h-4 mr-2" />
              {language === "pt" ? "Adicionar Colaborador" : "Add Employee"}
            </Button>
          </motion.section>
        )}

        {/* ── Team Members ── */}
        {isLoading ? (
          <motion.section variants={itemVariants} className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border overflow-hidden">
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 skeleton-circle" />
                    <div className="flex-1 space-y-2">
                      <div className="w-24 h-4 skeleton" />
                      <div className="w-32 h-3 skeleton" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 hidden sm:flex">
                    <div className="w-16 h-5 skeleton" />
                    <div className="w-16 h-5 skeleton" />
                  </div>
                </div>
              </div>
            ))}
          </motion.section>
        ) : employees.length === 0 ? (
          <motion.section variants={itemVariants} className="bg-card border border-border/30 p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-sm text-foreground/60 font-light mb-6">
              {language === "pt"
                ? "Adiciona o primeiro colaborador para começar"
                : "Add your first team member to get started"}
            </p>
            {isStoreManager && (
              <button
                onClick={() => setShowCreateDialog(true)}
                className="inline-block border border-primary/30 px-8 py-4 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                {language === "pt" ? "Adicionar Colaborador" : "Add Employee"}
              </button>
            )}
          </motion.section>
        ) : (
          <motion.section variants={itemVariants} className="space-y-3">
            {employees.map((employee) => {
              const isExpanded = expandedEmployee === employee.id;

              return (
                <motion.div key={employee.id} variants={itemVariants} className="bg-card border border-border transition-all duration-300">
                  {/* Employee Header */}
                  <button
                    onClick={() => setExpandedEmployee(isExpanded ? null : employee.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-primary/4 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 border border-primary/25 flex-shrink-0">
                        <span className="text-[10px] font-medium text-primary">
                          {employee.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-light text-foreground">{employee.name}</h3>
                        <p className="text-xs text-foreground/50 font-light mt-0.5">
                          {getRoleLabel(employee.role, language as "pt" | "en")}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-foreground/70">
                            <TrendingUp className="w-3.5 h-3.5 text-primary/60" />
                            <span className="text-sm font-light">{employee.progressPercent}%</span>
                          </div>
                          <p className="text-xs text-foreground/50 font-light">{language === "pt" ? "Progresso" : "Progress"}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-light text-foreground/70">{employee.quizAverage}%</p>
                          <p className="text-xs text-foreground/50 font-light">{language === "pt" ? "Avaliação" : "Score"}</p>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground/50 ml-4"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Employee Details - Expandable */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/50 overflow-hidden"
                    >
                      <div className="px-6 py-4 space-y-4">
                        {/* Contact Info */}
                        {employee.email && (
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-primary/60 flex-shrink-0" />
                            <span className="text-sm font-light text-foreground/70">{employee.email}</span>
                          </div>
                        )}

                        {/* Last Login */}
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-primary/60 flex-shrink-0" />
                          <div>
                            <p className="text-xs tracking-[0.1em] uppercase text-foreground/50 font-light">
                              {language === "pt" ? "Último Acesso" : "Last Login"}
                            </p>
                            <p className="text-sm font-light text-foreground/70">{employee.lastLoginFormatted}</p>
                          </div>
                        </div>

                        {/* Progress Details */}
                        <div className="pt-4 border-t border-border/30">
                          <p className="text-xs tracking-[0.1em] uppercase text-foreground/50 font-light mb-3">
                            {language === "pt" ? "Detalhes de Progresso" : "Progress Details"}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-light text-foreground/70">
                                {language === "pt" ? "Progresso Geral" : "Overall Progress"}
                              </span>
                              <span className="text-sm font-light text-primary">{employee.progressPercent}%</span>
                            </div>
                            <div className="h-1 w-full bg-border overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${employee.progressPercent}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-sm font-light text-foreground/70">
                                {language === "pt" ? "Pontuação Média de Quiz" : "Average Quiz Score"}
                              </span>
                              <span className="text-sm font-light text-primary">{employee.quizAverage}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="pt-2">
                          <span
                            className={`inline-block px-3 py-1 text-[10px] tracking-[0.1em] uppercase font-light border ${
                              employee.is_active
                                ? "bg-green-950/20 border-green-600/40 text-green-600"
                                : "bg-red-950/20 border-red-600/40 text-red-600"
                            }`}
                          >
                            {employee.is_active ? (language === "pt" ? "Ativo" : "Active") : language === "pt" ? "Inativo" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.section>
        )}
      </div>

      {/* ── Create Employee Dialog (Store Manager only) ── */}
      {isStoreManager && (
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="border border-border">
            <DialogHeader>
              <DialogTitle>{language === "pt" ? "Adicionar Colaborador" : "Add Employee"}</DialogTitle>
              <DialogDescription>{language === "pt" ? "Cria um novo membro de equipa com código de acesso." : "Create a new team member with access code."}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-light text-foreground/70 mb-2">
                  {language === "pt" ? "Nome *" : "Name *"}
                </label>
                <Input
                  type="text"
                  placeholder={language === "pt" ? "Nome completo" : "Full name"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border border-border text-foreground text-sm font-light"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-foreground/70 mb-2">
                  {language === "pt" ? "Email" : "Email"}
                </label>
                <Input
                  type="email"
                  placeholder={language === "pt" ? "E-mail (opcional)" : "Email (optional)"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border border-border text-foreground text-sm font-light"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-foreground/70 mb-2">
                  {language === "pt" ? "Função" : "Role"}
                </label>
                <Select value={formData.role} onValueChange={(val: any) => setFormData({ ...formData, role: val })}>
                  <SelectTrigger className="bg-background border border-border text-foreground text-sm font-light">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYEE_ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {language === "pt" ? role.label : role.labelEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="flex-1">
                  {language === "pt" ? "Cancelar" : "Cancel"}
                </Button>
                <Button onClick={handleCreateEmployee} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-light">
                  {language === "pt" ? "Criar" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}
