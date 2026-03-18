import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { EMPLOYEE_ROLES, getRoleLabel } from "@/config/roles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, Trash2, RotateCw, Plus } from "lucide-react";

type Employee = Tables<"academy_employees">;

export default function AdminEmployees() {
  const { language, t } = useLanguage();
  const { user } = useAcademyAuth();
  const { toast } = useToast();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "store-employee" as const,
  });

  const generateAccessCode = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomValues = new Uint32Array(8);
    crypto.getRandomValues(randomValues);
    return Array.from(randomValues, (v) => chars[v % chars.length]).join("");
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("academy_employees")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erro",
        description: language === "en" ? "Failed to load employees" : "Falha ao carregar funcionários",
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
      await loadEmployees();
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erro",
        description: language === "en" ? "Failed to create employee" : "Falha ao criar funcionário",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("academy_employees")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      setEmployees(employees.map((e) => (e.id === id ? { ...e, is_active: !currentStatus } : e)));

      toast({
        title: language === "en" ? "Success" : "Sucesso",
        description: language === "en" ? "Employee status updated" : "Status do funcionário atualizado",
      });
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erro",
        description: language === "en" ? "Failed to update employee" : "Falha ao atualizar funcionário",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const { error } = await supabase.from("academy_employees").delete().eq("id", id);

      if (error) throw error;

      setEmployees(employees.filter((e) => e.id !== id));
      setShowDeleteDialog(null);

      toast({
        title: language === "en" ? "Success" : "Sucesso",
        description: language === "en" ? "Employee deleted successfully" : "Funcionário deletado com sucesso",
      });
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erro",
        description: language === "en" ? "Failed to delete employee" : "Falha ao deletar funcionário",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateCode = async (id: string) => {
    try {
      const newCode = generateAccessCode();
      const { error } = await supabase
        .from("academy_employees")
        .update({ access_code: newCode })
        .eq("id", id);

      if (error) throw error;

      setEmployees(employees.map((e) => (e.id === id ? { ...e, access_code: newCode } : e)));
      setShowRegenerateDialog(null);

      toast({
        title: language === "en" ? "Success" : "Sucesso",
        description: language === "en" ? "Access code regenerated" : "Código de acesso regenerado",
      });
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erro",
        description: language === "en" ? "Failed to regenerate code" : "Falha ao regenerar código",
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      description: language === "en" ? "Code copied to clipboard" : "Código copiado para área de transferência",
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "en" ? "en-US" : "pt-PT", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-wider text-foreground">
              {language === "en" ? "Team Management" : "Gestão de Equipa"}
            </h1>
            <p className="text-sm text-foreground/60 mt-1">
              {language === "en"
                ? "Create and manage academy employee accounts"
                : "Crie e gerencie contas de funcionários da academia"}
            </p>
          </div>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="gap-2 bg-primary/15 hover:bg-primary/25 text-primary border border-primary/40 hover:border-primary/60"
          >
            <Plus className="w-4 h-4" />
            {language === "en" ? "Create Employee" : "Criar Funcionário"}
          </Button>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-light">
              {language === "en" ? "Active Employees" : "Funcionários Ativos"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? `Total: ${employees.length}`
                : `Total: ${employees.length}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-foreground/60">
                {language === "en" ? "Loading..." : "Carregando..."}
              </div>
            ) : employees.length === 0 ? (
              <div className="text-center py-8 text-foreground/60">
                {language === "en" ? "No employees yet" : "Sem funcionários ainda"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-light text-foreground/70">
                        {language === "en" ? "Name" : "Nome"}
                      </th>
                      <th className="text-left py-3 px-4 font-light text-foreground/70">
                        {language === "en" ? "Email" : "E-mail"}
                      </th>
                      <th className="text-left py-3 px-4 font-light text-foreground/70">
                        {language === "en" ? "Role" : "Função"}
                      </th>
                      <th className="text-left py-3 px-4 font-light text-foreground/70">
                        {language === "en" ? "Access Code" : "Código de Acesso"}
                      </th>
                      <th className="text-left py-3 px-4 font-light text-foreground/70">
                        {language === "en" ? "Status" : "Status"}
                      </th>
                      <th className="text-left py-3 px-4 font-light text-foreground/70">
                        {language === "en" ? "Last Login" : "Último Acesso"}
                      </th>
                      <th className="text-left py-3 px-4 font-light text-foreground/70">
                        {language === "en" ? "Actions" : "Ações"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp, idx) => (
                      <tr key={emp.id} className={`border-b border-border/40 transition-colors ${idx % 2 === 0 ? 'bg-secondary/20' : 'bg-secondary/10'} hover:bg-secondary/30`}>
                        <td className="py-3 px-4 text-foreground">{emp.name}</td>
                        <td className="py-3 px-4 text-foreground/70 text-xs">{emp.email || "—"}</td>
                        <td className="py-3 px-4 text-foreground/70 text-xs">
                          {getRoleLabel(emp.role, language as "pt" | "en")}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <code className="bg-secondary/40 px-2 py-1 rounded text-xs font-mono text-foreground/70">
                              {emp.access_code}
                            </code>
                            <button
                              onClick={() => handleCopyCode(emp.access_code)}
                              className="p-1 hover:bg-primary/15 rounded transition-colors text-foreground/60 hover:text-primary"
                              title={language === "en" ? "Copy code" : "Copiar código"}
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              emp.is_active
                                ? "bg-green-950/40 text-green-400"
                                : "bg-red-950/40 text-red-400"
                            }`}
                          >
                            {emp.is_active ? (language === "en" ? "Active" : "Ativo") : language === "en" ? "Inactive" : "Inativo"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-foreground/70 text-xs">{formatDate(emp.last_login)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setShowRegenerateDialog(emp.id)}
                              className="p-1 hover:bg-primary/15 rounded transition-colors text-foreground/60 hover:text-primary"
                              title={language === "en" ? "Regenerate code" : "Regenerar código"}
                            >
                              <RotateCw className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleToggleActive(emp.id, emp.is_active)}
                              className="text-xs px-2 py-1 rounded hover:bg-primary/15 transition-colors text-foreground/70"
                            >
                              {emp.is_active ? (language === "en" ? "Deactivate" : "Desativar") : language === "en" ? "Activate" : "Ativar"}
                            </button>
                            <button
                              onClick={() => setShowDeleteDialog(emp.id)}
                              className="p-1 hover:bg-red-950/40 rounded transition-colors text-red-400"
                              title={language === "en" ? "Delete" : "Deletar"}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-light">
              {language === "en" ? "Create New Employee" : "Criar Novo Funcionário"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Add a new employee to the academy"
                : "Adicione um novo funcionário à academia"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-light text-foreground mb-2 block">
                {language === "en" ? "Name" : "Nome"}
              </label>
              <Input
                placeholder={language === "en" ? "Employee name" : "Nome do funcionário"}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="text-sm font-light text-foreground mb-2 block">
                {language === "en" ? "Email" : "E-mail"} ({language === "en" ? "Optional" : "Opcional"})
              </label>
              <Input
                type="email"
                placeholder="employee@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="text-sm font-light text-foreground mb-2 block">
                {language === "en" ? "Role" : "Função"}
              </label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {EMPLOYEE_ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {getRoleLabel(role.value, language as "pt" | "en")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-accent/30 border border-accent/50 rounded p-3 text-sm text-foreground/70">
              {language === "en"
                ? "A unique access code will be automatically generated for this employee."
                : "Um código de acesso único será gerado automaticamente para este funcionário."}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="border-border hover:bg-secondary/30">
              {language === "en" ? "Cancel" : "Cancelar"}
            </Button>
            <Button onClick={handleCreateEmployee} className="bg-primary/15 hover:bg-primary/25 text-primary border border-primary/40">
              {language === "en" ? "Create" : "Criar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!showDeleteDialog} onOpenChange={(open) => !open && setShowDeleteDialog(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-light">
              {language === "en" ? "Delete Employee" : "Deletar Funcionário"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "en"
                ? "Are you sure you want to delete this employee? This action cannot be undone."
                : "Tem certeza de que deseja deletar este funcionário? Esta ação não pode ser desfeita."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="bg-background border-border hover:bg-secondary/30">
              {language === "en" ? "Cancel" : "Cancelar"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeleteDialog && handleDeleteEmployee(showDeleteDialog)}
              className="bg-red-950/60 hover:bg-red-950/80 text-red-400"
            >
              {language === "en" ? "Delete" : "Deletar"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!showRegenerateDialog} onOpenChange={(open) => !open && setShowRegenerateDialog(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-light">
              {language === "en" ? "Regenerate Access Code" : "Regenerar Código de Acesso"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "en"
                ? "The current access code will be replaced with a new one. Share the new code with the employee."
                : "O código de acesso atual será substituído por um novo. Compartilhe o novo código com o funcionário."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="bg-background border-border hover:bg-secondary/30">
              {language === "en" ? "Cancel" : "Cancelar"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showRegenerateDialog && handleRegenerateCode(showRegenerateDialog)}
              className="bg-primary/15 hover:bg-primary/25 text-primary border border-primary/40"
            >
              {language === "en" ? "Regenerate" : "Regenerar"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
