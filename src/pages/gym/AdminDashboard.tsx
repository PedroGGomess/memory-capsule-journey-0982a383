import { useState } from "react";
import { useGymAccess, GymUser } from "@/contexts/GymAccessContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, UserCheck, UserX, Copy, Pencil, Trash2, Plus, RefreshCw, Search, GraduationCap } from "lucide-react";
import { toast } from "sonner";

// ── Form ─────────────────────────────────────────────────────────────────────

interface UserFormData {
  name: string;
  email: string;
  accessCode: string;
  notes: string;
  onboardingComplete: boolean;
}

interface UserFormProps {
  initial?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  generateCode: () => string;
  submitLabel: string;
}

const UserForm = ({ initial, onSubmit, onCancel, generateCode, submitLabel }: UserFormProps) => {
  const [form, setForm] = useState<UserFormData>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    accessCode: initial?.accessCode ?? "",
    notes: initial?.notes ?? "",
    onboardingComplete: initial?.onboardingComplete ?? false,
  });

  const handleGenerate = () => {
    setForm((f) => ({ ...f, accessCode: generateCode() }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (!form.accessCode.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="João Silva"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="joao@example.com"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="code">Access Code *</Label>
        <div className="flex gap-2">
          <Input
            id="code"
            value={form.accessCode}
            onChange={(e) => setForm((f) => ({ ...f, accessCode: e.target.value.toUpperCase() }))}
            placeholder="XXX-XXXX-XXXX"
            className="font-mono"
            required
          />
          <Button type="button" variant="outline" size="sm" onClick={handleGenerate}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Optional notes…"
          rows={2}
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="onboarding"
          checked={form.onboardingComplete}
          onCheckedChange={(v) => setForm((f) => ({ ...f, onboardingComplete: v }))}
        />
        <Label htmlFor="onboarding">Onboarding complete</Label>
      </div>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  );
};

// ── Stats cards ───────────────────────────────────────────────────────────────

const StatsCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) => (
  <Card>
    <CardContent className="flex items-center gap-4 pt-6">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </CardContent>
  </Card>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const { users, logs, addUser, updateUser, deleteUser, toggleUserActive, generateAccessCode } =
    useGymAccess();
  const {
    getAccessCode,
    generateAccessCode: generateAcademyCode,
    deleteAccessCode,
  } = useAcademyAuth();

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<GymUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GymUser | null>(null);
  const [confirmDeleteAcademy, setConfirmDeleteAcademy] = useState(false);
  const [academyCode, setAcademyCode] = useState<string | null>(() => getAccessCode());

  const handleGenerateAcademyCode = () => {
    const code = generateAcademyCode();
    setAcademyCode(code);
    toast.success("Academy access code generated");
  };

  const handleDeleteAcademyCode = () => {
    deleteAccessCode();
    setAcademyCode(null);
    setConfirmDeleteAcademy(false);
    toast.success("Academy access code deleted");
  };

  const copyAcademyCode = () => {
    if (!academyCode) return;
    navigator.clipboard.writeText(academyCode).then(() => toast.success("Code copied!"));
  };

  const todayStr = new Date().toDateString();
  const todayAccesses = logs.filter(
    (l) => l.result === "allowed" && new Date(l.timestamp).toDateString() === todayStr
  ).length;

  const activeCount = users.filter((u) => u.active).length;
  const inactiveCount = users.length - activeCount;

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.accessCode.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (data: { name: string; email: string; accessCode: string; notes: string; onboardingComplete: boolean }) => {
    addUser({
      name: data.name,
      email: data.email,
      accessCode: data.accessCode,
      notes: data.notes,
      onboardingComplete: data.onboardingComplete,
      active: true,
    });
    setShowAdd(false);
    toast.success("User created successfully");
  };

  const handleEdit = (data: { name: string; email: string; accessCode: string; notes: string; onboardingComplete: boolean }) => {
    if (!editUser) return;
    updateUser(editUser.id, {
      name: data.name,
      email: data.email,
      accessCode: data.accessCode,
      notes: data.notes,
      onboardingComplete: data.onboardingComplete,
    });
    setEditUser(null);
    toast.success("User updated");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteUser(deleteTarget.id);
    setDeleteTarget(null);
    toast.success("User deleted");
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => toast.success("Code copied!"));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground text-sm">Manage gym members and access codes</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={Users} label="Total Members" value={users.length} color="bg-blue-100 text-blue-600" />
        <StatsCard icon={UserCheck} label="Active" value={activeCount} color="bg-green-100 text-green-600" />
        <StatsCard icon={UserX} label="Inactive" value={inactiveCount} color="bg-red-100 text-red-600" />
        <StatsCard icon={UserCheck} label="Today's Entries" value={todayAccesses} color="bg-purple-100 text-purple-600" />
      </div>

      {/* Academy Access Code */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="w-4 h-4" />
            Academy Access Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            {academyCode ? (
              <code className="flex-1 font-mono text-lg tracking-[0.3em] bg-muted px-4 py-2 rounded text-center">
                {academyCode}
              </code>
            ) : (
              <span className="flex-1 text-sm text-muted-foreground italic px-4 py-2">
                No code generated
              </span>
            )}
            {academyCode && (
              <Button variant="outline" size="icon" onClick={copyAcademyCode} title="Copy code">
                <Copy className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Share this code with employees so they can access the academy.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleGenerateAcademyCode}>
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              {academyCode ? "Regenerate Code" : "Generate Code"}
            </Button>
            {academyCode && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setConfirmDeleteAcademy(true)}
              >
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                Delete Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search + table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs h-8"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Access Code</TableHead>
                <TableHead>Onboarding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                    {users.length === 0 ? "No members yet. Add your first member!" : "No results found."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                          {user.accessCode}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyCode(user.accessCode)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.onboardingComplete ? (
                        <Badge variant="secondary" className="text-xs">Done</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.active}
                          onCheckedChange={() => toggleUserActive(user.id)}
                          aria-label="Toggle active"
                        />
                        <span className="text-xs text-muted-foreground">
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditUser(user)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(user)}
                        >
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
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Create a new member and generate their permanent access code.
            </DialogDescription>
          </DialogHeader>
          <UserForm
            initial={{ accessCode: generateAccessCode() }}
            onSubmit={handleAdd}
            onCancel={() => setShowAdd(false)}
            generateCode={generateAccessCode}
            submitLabel="Create Member"
          />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>Update member information or access code.</DialogDescription>
          </DialogHeader>
          {editUser && (
            <UserForm
              initial={editUser}
              onSubmit={handleEdit}
              onCancel={() => setEditUser(null)}
              generateCode={generateAccessCode}
              submitLabel="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action
              cannot be undone and their access code will be permanently revoked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Delete Academy Code Confirmation */}
      <AlertDialog open={confirmDeleteAcademy} onOpenChange={setConfirmDeleteAcademy}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Academy Access Code</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the academy access code? All employees currently
              logged in will be logged out and won't be able to access the academy until a new code
              is generated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAcademyCode}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
