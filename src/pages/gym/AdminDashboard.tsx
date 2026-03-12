import { useState } from "react";
import { useGymAccess, GymUser } from "@/contexts/GymAccessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { EMPLOYEE_ROLES, getRoleLabel, type EmployeeRole } from "@/config/roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Users, UserCheck, UserX, Copy, Pencil, Trash2, Plus, RefreshCw, Search, GraduationCap, CheckCircle, Clock, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ease = [0.16, 1, 0.3, 1] as const;
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// ── Form ──────────────────────────────────────────────────────────────────

interface UserFormData {
  name: string;
  email: string;
  notes: string;
  onboardingComplete: boolean;
  role: string;
}

interface UserFormProps {
  initial?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  submitLabel: string;
}

const UserForm = ({ initial, onSubmit, onCancel, submitLabel }: UserFormProps) => {
  const [form, setForm] = useState<UserFormData>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    notes: initial?.notes ?? "",
    onboardingComplete: initial?.onboardingComplete ?? false,
    role: initial?.role ?? "store-employee",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50">Nome Completo *</Label>
        <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="João Silva" required className="bg-background/30 border-border/15 h-11 text-sm font-light" />
      </div>
      <div className="space-y-2">
        <Label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50">Email</Label>
        <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="joao@exemplo.com" className="bg-background/30 border-border/15 h-11 text-sm font-light" />
      </div>
      <div className="space-y-2">
        <Label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50">Cargo / Função *</Label>
        <Select value={form.role} onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}>
          <SelectTrigger className="bg-background/30 border-border/15 h-11 text-sm font-light">
            <SelectValue placeholder="Selecionar cargo..." />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYEE_ROLES.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50">Notas</Label>
        <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Notas opcionais…" rows={2} className="bg-background/30 border-border/15 text-sm font-light" />
      </div>
      <div className="flex items-center gap-3">
        <Switch id="onboarding" checked={form.onboardingComplete} onCheckedChange={(v) => setForm((f) => ({ ...f, onboardingComplete: v }))} />
        <Label htmlFor="onboarding" className="text-sm font-light text-muted-foreground/60">Onboarding completo</Label>
      </div>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onCancel} className="text-muted-foreground/50">Cancelar</Button>
        <Button type="submit" className="border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 tracking-[0.15em] uppercase text-[10px] font-light">{submitLabel}</Button>
      </DialogFooter>
    </form>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────

interface NewEmployeeCredentials {
  name: string;
  academyCode: string;
}

const AdminDashboard = () => {
  const { users, logs, addUser, updateUser, deleteUser, toggleUserActive, generateAccessCode, generateUserAcademyCode } =
    useGymAccess();
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [filterOnboarding, setFilterOnboarding] = useState<"all" | "complete" | "pending">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [academyEnabled, setAcademyEnabled] = useState(true);
  const [editUser, setEditUser] = useState<GymUser | null>(null);
  const [editAcademyCode, setEditAcademyCode] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<GymUser | null>(null);
  const [newEmployeeAcademyCode, setNewEmployeeAcademyCode] = useState<string>("");
  const [newEmployeeCredentials, setNewEmployeeCredentials] = useState<NewEmployeeCredentials | null>(null);

  const todayStr = new Date().toDateString();
  const todayAccesses = logs.filter((l) => l.result === "allowed" && new Date(l.timestamp).toDateString() === todayStr).length;
  const activeCount = users.filter((u) => u.active).length;
  const inactiveCount = users.length - activeCount;
  const onboardingDone = users.filter((u) => u.onboardingComplete).length;

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.accessCode.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || (filterStatus === "active" ? u.active : !u.active);
    const matchOnboarding = filterOnboarding === "all" || (filterOnboarding === "complete" ? u.onboardingComplete : !u.onboardingComplete);
    return matchSearch && matchStatus && matchOnboarding;
  });

  const sendWelcomeEmail = async (name: string, email: string, academyCode: string) => {
    if (!email) return;
    try {
      const academyUrl = `${window.location.origin}/academy/login`;
      const { data, error } = await supabase.functions.invoke("send-welcome-email", {
        body: { name, email, academyCode, academyUrl },
      });
      if (error) {
        console.error("Email error:", error);
        toast.info("Colaborador criado. Email não enviado (domínio de email pendente).");
        return;
      }
      if (data?.emailSent) {
        toast.success("Email de boas-vindas enviado!");
      } else {
        toast.info("Colaborador criado. Email será enviado quando o domínio estiver configurado.");
      }
    } catch (err) {
      console.error("Email send failed:", err);
    }
  };

  const handleAdd = (data: UserFormData) => {
    const code = academyEnabled ? newEmployeeAcademyCode : undefined;
    addUser({
      name: data.name,
      email: data.email,
      accessCode: generateAccessCode(),
      academyCode: code,
      role: data.role,
      notes: data.notes,
      onboardingComplete: data.onboardingComplete,
      active: true,
    });
    setShowAdd(false);
    toast.success("Colaborador adicionado!");
    if (code) {
      setNewEmployeeCredentials({ name: data.name, academyCode: code });
      if (data.email) {
        sendWelcomeEmail(data.name, data.email, code);
      }
    }
  };

  const handleEdit = (data: UserFormData) => {
    if (!editUser) return;
    updateUser(editUser.id, { name: data.name, email: data.email, notes: data.notes, onboardingComplete: data.onboardingComplete, role: data.role, academyCode: editAcademyCode });
    setEditUser(null);
    toast.success("Colaborador atualizado!");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteUser(deleteTarget.id);
    setDeleteTarget(null);
    toast.success("Colaborador eliminado.");
  };

  const handleOpenEdit = (user: GymUser) => {
    setEditAcademyCode(user.academyCode);
    setEditUser(user);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => toast.success("Código copiado!"));
  };

  const stats = [
    { label: "Total", value: users.length, icon: Users, color: "text-primary" },
    { label: "Ativos", value: activeCount, icon: UserCheck, color: "text-emerald-500" },
    { label: "Inativos", value: inactiveCount, icon: UserX, color: "text-destructive" },
    { label: "Onboarding", value: onboardingDone, icon: GraduationCap, color: "text-primary" },
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extralight text-foreground/80">Gestão de Colaboradores</h2>
          <p className="text-xs text-muted-foreground/40 font-light mt-1">Gerir equipa e acessos à plataforma</p>
        </div>
        <Button
          onClick={() => { setAcademyEnabled(true); setNewEmployeeAcademyCode(generateUserAcademyCode()); setShowAdd(true); }}
          className="border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 tracking-[0.15em] uppercase text-[10px] font-light h-10 px-5"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          Adicionar
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border/10">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center">
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-extralight text-foreground/80">{s.value}</p>
              <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search + Filters + Table */}
      <motion.div variants={itemVariants}>
        <div className="border border-border/10 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-border/10 bg-card/20">
            <div className="flex items-center gap-3 flex-wrap">
              <Search className="w-3.5 h-3.5 text-muted-foreground/30" />
              <Input
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs h-9 bg-background/30 border-border/15 text-sm font-light"
              />
              <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as "all" | "active" | "inactive")}>
                <SelectTrigger className="w-[120px] h-9 bg-background/30 border-border/15 text-sm font-light">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterOnboarding} onValueChange={(v) => setFilterOnboarding(v as "all" | "complete" | "pending")}>
                <SelectTrigger className="w-[150px] h-9 bg-background/30 border-border/15 text-sm font-light">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Onboarding: Todos</SelectItem>
                  <SelectItem value="complete">Completo</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-[9px] tracking-[0.1em] text-muted-foreground/25 ml-auto">{filtered.length} de {users.length}</span>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-border/10 hover:bg-transparent">
                <TableHead className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 font-light">Colaborador</TableHead>
                <TableHead className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 font-light">Cargo</TableHead>
                <TableHead className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 font-light">Código Academy</TableHead>
                <TableHead className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 font-light">Onboarding</TableHead>
                <TableHead className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 font-light">Estado</TableHead>
                <TableHead className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 font-light text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground/30 py-16 text-sm font-light">
                    {users.length === 0 ? "Sem colaboradores. Adicione o primeiro!" : "Sem resultados."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow key={user.id} className="border-border/5 hover:bg-primary/[0.02] transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-light text-foreground/70">{user.name}</p>
                          <p className="text-[10px] text-muted-foreground/30">{user.email || "—"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] tracking-[0.1em] border-border/15 text-muted-foreground/50 font-light">
                        {getRoleLabel(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.academyCode ? (
                        <div className="flex items-center gap-1.5">
                          <code className="text-[10px] bg-muted/30 px-2 py-1 rounded font-mono tracking-wider text-foreground/50">{user.academyCode}</code>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground/30 hover:text-primary" onClick={() => copyCode(user.academyCode!)}>
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/20">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.onboardingComplete ? (
                        <Badge variant="secondary" className="text-[9px] tracking-[0.1em] bg-emerald-500/10 text-emerald-500/70 border-0 font-light">
                          <CheckCircle className="w-3 h-3 mr-1" /> Completo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] tracking-[0.1em] border-border/15 text-muted-foreground/30 font-light">
                          <Clock className="w-3 h-3 mr-1" /> Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={user.active} onCheckedChange={() => toggleUserActive(user.id)} />
                        <span className={`text-[10px] ${user.active ? "text-emerald-500/60" : "text-muted-foreground/30"}`}>
                          {user.active ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/30 hover:text-foreground" onClick={() => handleOpenEdit(user)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/30 hover:text-destructive" onClick={() => setDeleteTarget(user)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Add User Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="border-border/15 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-extralight">Adicionar Colaborador</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground/40 font-light">
              Crie um novo colaborador e opcionalmente gere o código de acesso à Academy.
            </DialogDescription>
          </DialogHeader>
          <div className="border border-border/10 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-light flex items-center gap-2 text-foreground/60">
                <GraduationCap className="w-4 h-4" /> Acesso Academy
              </p>
              <div className="flex items-center gap-2">
                <Switch id="academy-access" checked={academyEnabled} onCheckedChange={(v) => {
                  setAcademyEnabled(v);
                  if (v && !newEmployeeAcademyCode) setNewEmployeeAcademyCode(generateUserAcademyCode());
                }} />
                <Label htmlFor="academy-access" className="text-xs text-muted-foreground/40">{academyEnabled ? "Ativado" : "Desativado"}</Label>
              </div>
            </div>
            {academyEnabled && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="flex-1 font-mono text-sm tracking-[0.2em] bg-muted/20 px-3 py-2 rounded text-center text-foreground/60">{newEmployeeAcademyCode}</code>
                  <Button type="button" variant="ghost" size="icon" className="text-muted-foreground/30 hover:text-primary" onClick={() => copyCode(newEmployeeAcademyCode)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="text-muted-foreground/30 hover:text-primary" onClick={() => setNewEmployeeAcademyCode(generateUserAcademyCode())}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground/30">Código único para aceder à Academy.</p>
              </div>
            )}
            {!academyEnabled && <p className="text-[10px] text-muted-foreground/25">Ative para gerar um código de acesso à Academy.</p>}
          </div>
          <UserForm initial={{}} onSubmit={handleAdd} onCancel={() => setShowAdd(false)} submitLabel="Criar Colaborador" />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
        <DialogContent className="border-border/15 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-extralight">Editar Colaborador</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground/40 font-light">
              Atualizar informações do colaborador.
            </DialogDescription>
          </DialogHeader>
          {editUser && (
            <>
              <div className="border border-border/10 px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light flex items-center gap-2 text-foreground/60">
                    <GraduationCap className="w-4 h-4" /> Acesso Academy
                  </p>
                  <div className="flex items-center gap-2">
                    <Switch id="edit-academy-access" checked={!!editAcademyCode} onCheckedChange={(v) => setEditAcademyCode(v ? generateUserAcademyCode() : undefined)} />
                    <Label htmlFor="edit-academy-access" className="text-xs text-muted-foreground/40">{editAcademyCode ? "Ativado" : "Desativado"}</Label>
                  </div>
                </div>
                {editAcademyCode && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-sm tracking-[0.2em] bg-muted/20 px-3 py-2 rounded text-center text-foreground/60">{editAcademyCode}</code>
                      <Button type="button" variant="ghost" size="icon" className="text-muted-foreground/30 hover:text-primary" onClick={() => copyCode(editAcademyCode)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon" className="text-muted-foreground/30 hover:text-primary" onClick={() => setEditAcademyCode(generateUserAcademyCode())}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <UserForm initial={editUser} onSubmit={handleEdit} onCancel={() => setEditUser(null)} submitLabel="Guardar" />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="border-border/15 bg-card/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-extralight">Eliminar Colaborador</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground/40 font-light">
              Tem a certeza que quer eliminar <strong className="text-foreground/60">{deleteTarget?.name}</strong>? O código de acesso será revogado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-muted-foreground/50">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive/80 hover:bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New Employee Credentials Dialog */}
      <Dialog open={!!newEmployeeCredentials} onOpenChange={(open) => !open && setNewEmployeeCredentials(null)}>
        <DialogContent className="border-border/15 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-extralight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary/60" /> Colaborador Criado
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground/40 font-light">
              Partilhe as credenciais com <strong className="text-foreground/60">{newEmployeeCredentials?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/40">Código de Acesso Academy</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-base tracking-[0.3em] bg-muted/20 px-4 py-3 rounded text-center text-foreground/70">{newEmployeeCredentials?.academyCode}</code>
                <Button variant="ghost" size="icon" className="text-muted-foreground/30 hover:text-primary" onClick={() => copyCode(newEmployeeCredentials?.academyCode ?? "")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground/30">
              O colaborador acede à Academy em <strong className="text-foreground/50">/academy/login</strong> com este código.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setNewEmployeeCredentials(null)} className="border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 tracking-[0.15em] uppercase text-[10px] font-light">Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminDashboard;
