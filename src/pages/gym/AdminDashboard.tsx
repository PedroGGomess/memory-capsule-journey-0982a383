import { useState } from "react";
import { useGymAccess, GymUser } from "@/contexts/GymAccessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
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

// ── Form ──────────────────────────────────────────────────────────────────

interface UserFormData {
  name: string;
  email: string;
  notes: string;
  onboardingComplete: boolean;
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Nome Completo *</Label>
        <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="João Silva" required />
      </div>
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="joao@exemplo.com" />
      </div>
      <div className="space-y-1.5">
        <Label>Notas</Label>
        <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Notas opcionais…" rows={2} />
      </div>
      <div className="flex items-center gap-2">
        <Switch id="onboarding" checked={form.onboardingComplete} onCheckedChange={(v) => setForm((f) => ({ ...f, onboardingComplete: v }))} />
        <Label htmlFor="onboarding">Onboarding completo</Label>
      </div>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">{submitLabel}</Button>
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
      notes: data.notes,
      onboardingComplete: data.onboardingComplete,
      active: true,
    });
    setShowAdd(false);
    toast.success("Colaborador adicionado!");
    if (code) {
      setNewEmployeeCredentials({ name: data.name, academyCode: code });
      // Send welcome email with academy link and code
      if (data.email) {
        sendWelcomeEmail(data.name, data.email, code);
      }
    }
  };

  const handleEdit = (data: UserFormData) => {
    if (!editUser) return;
    updateUser(editUser.id, { name: data.name, email: data.email, notes: data.notes, onboardingComplete: data.onboardingComplete, academyCode: editAcademyCode });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Colaboradores</h2>
          <p className="text-muted-foreground text-sm">Gerir equipa e acessos à plataforma</p>
        </div>
        <Button onClick={() => { setAcademyEnabled(true); setNewEmployeeAcademyCode(generateUserAcademyCode()); setShowAdd(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Colaborador
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-xs text-muted-foreground">Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                <UserX className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inactiveCount}</p>
                <p className="text-xs text-muted-foreground">Inativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{onboardingDone}</p>
                <p className="text-xs text-muted-foreground">Onboarding completo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters + Table */}
      <Card>
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center gap-3 flex-wrap">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input placeholder="Pesquisar por nome, email ou código..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs h-8" />
            <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as "all" | "active" | "inactive")}>
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterOnboarding} onValueChange={(v) => setFilterOnboarding(v as "all" | "complete" | "pending")}>
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Onboarding: Todos</SelectItem>
                <SelectItem value="complete">Completo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground ml-auto">{filtered.length} de {users.length}</span>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Código Academy</TableHead>
                <TableHead>Onboarding</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                    {users.length === 0 ? "Sem colaboradores. Adicione o primeiro!" : "Sem resultados."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email || "—"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.academyCode ? (
                        <div className="flex items-center gap-1">
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{user.academyCode}</code>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyCode(user.academyCode!)}>
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.onboardingComplete ? (
                        <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 border-0">
                          <CheckCircle className="w-3 h-3 mr-1" /> Completo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" /> Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={user.active} onCheckedChange={() => toggleUserActive(user.id)} />
                        <span className={`text-xs ${user.active ? "text-emerald-500" : "text-muted-foreground"}`}>
                          {user.active ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(user)} title="Editar">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(user)} title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Colaborador</DialogTitle>
            <DialogDescription>Crie um novo colaborador e opcionalmente gere o código de acesso à Academy.</DialogDescription>
          </DialogHeader>
          <div className="rounded-md border px-4 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Acesso Academy
              </p>
              <div className="flex items-center gap-2">
                <Switch id="academy-access" checked={academyEnabled} onCheckedChange={(v) => {
                  setAcademyEnabled(v);
                  if (v && !newEmployeeAcademyCode) setNewEmployeeAcademyCode(generateUserAcademyCode());
                }} />
                <Label htmlFor="academy-access" className="text-sm text-muted-foreground">{academyEnabled ? "Ativado" : "Desativado"}</Label>
              </div>
            </div>
            {academyEnabled && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="flex-1 font-mono text-sm tracking-[0.2em] bg-muted px-3 py-1.5 rounded text-center">{newEmployeeAcademyCode}</code>
                  <Button type="button" variant="outline" size="icon" onClick={() => copyCode(newEmployeeAcademyCode)} title="Copiar">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => setNewEmployeeAcademyCode(generateUserAcademyCode())} title="Regenerar">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Código único. Partilhe com o colaborador para aceder à Academy.</p>
              </div>
            )}
            {!academyEnabled && <p className="text-xs text-muted-foreground">Ative para gerar um código de acesso à Academy.</p>}
          </div>
          <UserForm initial={{}} onSubmit={handleAdd} onCancel={() => setShowAdd(false)} submitLabel="Criar Colaborador" />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Colaborador</DialogTitle>
            <DialogDescription>Atualizar informações do colaborador.</DialogDescription>
          </DialogHeader>
          {editUser && (
            <>
              <div className="rounded-md border px-4 py-3 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Acesso Academy
                  </p>
                  <div className="flex items-center gap-2">
                    <Switch id="edit-academy-access" checked={!!editAcademyCode} onCheckedChange={(v) => setEditAcademyCode(v ? generateUserAcademyCode() : undefined)} />
                    <Label htmlFor="edit-academy-access" className="text-sm text-muted-foreground">{editAcademyCode ? "Ativado" : "Desativado"}</Label>
                  </div>
                </div>
                {editAcademyCode && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-sm tracking-[0.2em] bg-muted px-3 py-1.5 rounded text-center">{editAcademyCode}</code>
                      <Button type="button" variant="outline" size="icon" onClick={() => copyCode(editAcademyCode)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="outline" size="icon" onClick={() => setEditAcademyCode(generateUserAcademyCode())}>
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Colaborador</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que quer eliminar <strong>{deleteTarget?.name}</strong>? O código de acesso será revogado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New Employee Credentials Dialog */}
      <Dialog open={!!newEmployeeCredentials} onOpenChange={(open) => !open && setNewEmployeeCredentials(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Colaborador Criado
            </DialogTitle>
            <DialogDescription>
              Partilhe as credenciais com <strong>{newEmployeeCredentials?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <p className="text-sm font-medium">Código de Acesso Academy</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-base tracking-[0.2em] bg-muted px-4 py-2 rounded text-center">{newEmployeeCredentials?.academyCode}</code>
                <Button variant="outline" size="icon" onClick={() => copyCode(newEmployeeCredentials?.academyCode ?? "")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              O colaborador acede à Academy em <strong>/academy/login</strong> com este código.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setNewEmployeeCredentials(null)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
