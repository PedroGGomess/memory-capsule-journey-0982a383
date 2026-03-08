import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserPlus, Copy, Shield, ShieldCheck, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  must_change_password: boolean;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

function generateRandomPassword(length = 10): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [newAdminCredentials, setNewAdminCredentials] = useState<{ email: string; password: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [editAdmin, setEditAdmin] = useState<AdminUser | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const fetchAdmins = async () => {
    const { data } = await supabase
      .from("admin_users")
      .select("id, email, name, must_change_password, is_active, created_at, last_login")
      .order("created_at", { ascending: true });
    if (data) setAdmins(data);
  };

  useEffect(() => { fetchAdmins(); }, []);

  const filtered = admins.filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = async () => {
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    const password = generateRandomPassword();
    const { error } = await supabase.from("admin_users").insert({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      password_hash: password,
      must_change_password: true,
    });
    if (error) {
      toast.error(error.code === "23505" ? "Este email já está registado." : "Erro ao convidar admin.");
      setLoading(false);
      return;
    }
    setNewAdminCredentials({ email: email.trim().toLowerCase(), password });
    setShowInvite(false);
    setShowCredentials(true);
    setName("");
    setEmail("");
    setLoading(false);
    fetchAdmins();
    toast.success("Admin convidado com sucesso!");
  };

  const handleEdit = async () => {
    if (!editAdmin || !editName.trim() || !editEmail.trim()) return;
    await supabase.from("admin_users").update({
      name: editName.trim(),
      email: editEmail.trim().toLowerCase(),
    }).eq("id", editAdmin.id);
    setEditAdmin(null);
    fetchAdmins();
    toast.success("Admin atualizado!");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await supabase.from("admin_users").delete().eq("id", deleteTarget.id);
    setDeleteTarget(null);
    fetchAdmins();
    toast.success("Admin eliminado.");
  };

  const toggleActive = async (admin: AdminUser) => {
    await supabase.from("admin_users").update({ is_active: !admin.is_active }).eq("id", admin.id);
    fetchAdmins();
  };

  const resetPassword = async (admin: AdminUser) => {
    const password = generateRandomPassword();
    await supabase.from("admin_users").update({ password_hash: password, must_change_password: true }).eq("id", admin.id);
    setNewAdminCredentials({ email: admin.email, password });
    setShowCredentials(true);
    fetchAdmins();
    toast.success("Password resetada!");
  };

  const copyCredentials = () => {
    if (!newAdminCredentials) return;
    const text = `Email: ${newAdminCredentials.email}\nPassword temporária: ${newAdminCredentials.password}\n\nLogin: ${window.location.origin}/gym-admin/login\n(Alterar password no primeiro login)`;
    navigator.clipboard.writeText(text).then(() => toast.success("Credenciais copiadas!"));
  };

  const openEdit = (admin: AdminUser) => {
    setEditName(admin.name);
    setEditEmail(admin.email);
    setEditAdmin(admin);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Admins</h2>
          <p className="text-muted-foreground text-sm">Gerir administradores da plataforma ({admins.length})</p>
        </div>
        <Button onClick={() => setShowInvite(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Convidar Admin
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input placeholder="Pesquisar por nome ou email..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs h-8" />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                    {admins.length === 0 ? "Nenhum admin registado." : "Sem resultados."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="w-3.5 h-3.5 text-primary/60" />
                        </div>
                        {admin.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                    <TableCell>
                      {admin.must_change_password ? (
                        <Badge variant="outline" className="text-xs">Aguarda password</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs flex items-center gap-1 w-fit">
                          <ShieldCheck className="w-3 h-3" /> Verificado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {admin.last_login
                        ? new Date(admin.last_login).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
                        : "Nunca"}
                    </TableCell>
                    <TableCell>
                      <Switch checked={admin.is_active} onCheckedChange={() => toggleActive(admin)} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(admin)} title="Editar">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => resetPassword(admin)} title="Resetar password">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(admin)} title="Eliminar">
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

      {/* Invite Dialog */}
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convidar Novo Admin</DialogTitle>
            <DialogDescription>Uma password aleatória será gerada. O novo admin terá de a alterar no primeiro login.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowInvite(false)}>Cancelar</Button>
            <Button onClick={handleInvite} disabled={loading || !name.trim() || !email.trim()}>
              {loading ? "A criar..." : "Criar Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editAdmin} onOpenChange={(open) => !open && setEditAdmin(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Admin</DialogTitle>
            <DialogDescription>Atualizar informações do administrador.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditAdmin(null)}>Cancelar</Button>
            <Button onClick={handleEdit} disabled={!editName.trim() || !editEmail.trim()}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credentials Dialog */}
      <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credenciais Geradas</DialogTitle>
            <DialogDescription>Partilhe estas credenciais. A password terá de ser alterada no primeiro login.</DialogDescription>
          </DialogHeader>
          {newAdminCredentials && (
            <div className="space-y-4">
              <div className="rounded-md border bg-muted/50 p-4 space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-mono text-sm">{newAdminCredentials.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Password temporária</p>
                  <p className="font-mono text-sm tracking-wider">{newAdminCredentials.password}</p>
                </div>
              </div>
              <Button onClick={copyCredentials} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" /> Copiar Credenciais
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => { setShowCredentials(false); setNewAdminCredentials(null); }}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Admin</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que quer eliminar <strong>{deleteTarget?.name}</strong>? Esta ação não pode ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminManagement;
