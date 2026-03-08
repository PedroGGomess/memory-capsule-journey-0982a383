import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserPlus, Copy, Shield, ShieldCheck } from "lucide-react";
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
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [newAdminCredentials, setNewAdminCredentials] = useState<{ email: string; password: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdmins = async () => {
    const { data } = await supabase
      .from("admin_users")
      .select("id, email, name, must_change_password, is_active, created_at, last_login")
      .order("created_at", { ascending: true });
    if (data) setAdmins(data);
  };

  useEffect(() => { fetchAdmins(); }, []);

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
      if (error.code === "23505") {
        toast.error("Este email já está registado.");
      } else {
        toast.error("Erro ao convidar admin.");
      }
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

  const toggleActive = async (admin: AdminUser) => {
    await supabase
      .from("admin_users")
      .update({ is_active: !admin.is_active })
      .eq("id", admin.id);
    fetchAdmins();
  };

  const copyCredentials = () => {
    if (!newAdminCredentials) return;
    const text = `Email: ${newAdminCredentials.email}\nPassword temporária: ${newAdminCredentials.password}\n\nAceda a: ${window.location.origin}/gym-admin/login\n(Será pedido para alterar a password no primeiro login)`;
    navigator.clipboard.writeText(text).then(() => toast.success("Credenciais copiadas!"));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Admins</h2>
          <p className="text-muted-foreground text-sm">Convide novos administradores para a plataforma</p>
        </div>
        <Button onClick={() => setShowInvite(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Convidar Admin
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Ativo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                    Nenhum admin registado.
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary/60" />
                      {admin.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                    <TableCell>
                      {admin.must_change_password ? (
                        <Badge variant="outline" className="text-xs">Aguarda mudança de password</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs flex items-center gap-1 w-fit">
                          <ShieldCheck className="w-3 h-3" /> Ativo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {admin.must_change_password ? (
                        <span className="text-xs text-amber-500">Temporária</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Definida</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {admin.last_login
                        ? new Date(admin.last_login).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
                        : "Nunca"
                      }
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={admin.is_active}
                        onCheckedChange={() => toggleActive(admin)}
                      />
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
            <DialogDescription>
              Uma password aleatória será gerada. O novo admin terá de a alterar no primeiro login.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-name">Nome</Label>
              <Input
                id="admin-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
              />
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

      {/* Credentials Dialog */}
      <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Criado com Sucesso!</DialogTitle>
            <DialogDescription>
              Partilhe estas credenciais com o novo admin. A password terá de ser alterada no primeiro login.
            </DialogDescription>
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
                <div>
                  <p className="text-xs text-muted-foreground">URL de login</p>
                  <p className="font-mono text-xs">{window.location.origin}/gym-admin/login</p>
                </div>
              </div>
              <Button onClick={copyCredentials} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copiar Credenciais
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => { setShowCredentials(false); setNewAdminCredentials(null); }}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminManagement;
