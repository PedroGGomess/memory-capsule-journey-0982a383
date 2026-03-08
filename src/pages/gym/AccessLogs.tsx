import { useState } from "react";
import { useGymAccess } from "@/contexts/GymAccessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Trash2, Search, Clock, CheckCircle, ShieldAlert, Filter } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const AccessLogs = () => {
  const { logs, clearLogs } = useGymAccess();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [filterResult, setFilterResult] = useState<"all" | "allowed" | "denied">("all");

  const filtered = logs.filter((l) => {
    const matchSearch =
      (l.userName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      l.accessCode.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterResult === "all" || l.result === filterResult;
    return matchSearch && matchFilter;
  });

  const todayStr = new Date().toDateString();
  const todayAccesses = logs.filter((l) => l.result === "allowed" && new Date(l.timestamp).toDateString() === todayStr).length;
  const todayDenied = logs.filter((l) => l.result === "denied" && new Date(l.timestamp).toDateString() === todayStr).length;
  const totalAllowed = logs.filter((l) => l.result === "allowed").length;
  const totalDenied = logs.filter((l) => l.result === "denied").length;

  const handleClear = () => {
    clearLogs();
    setConfirmClear(false);
    toast.success(t.admin.logs.logsCleared);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t.admin.logs.title}</h2>
          <p className="text-muted-foreground text-sm">{t.admin.logs.subtitle} ({logs.length} {t.admin.logs.records})</p>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setConfirmClear(true)} disabled={logs.length === 0}>
          <Trash2 className="w-4 h-4 mr-2" /> {t.admin.logs.clearLogs}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{logs.length}</p>
                <p className="text-xs text-muted-foreground">Total de registos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayAccesses}</p>
                <p className="text-xs text-muted-foreground">Acessos hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayDenied}</p>
                <p className="text-xs text-muted-foreground">Negados hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Filter className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAllowed > 0 ? Math.round((totalAllowed / (totalAllowed + totalDenied)) * 100) : 0}%</p>
                <p className="text-xs text-muted-foreground">Taxa de sucesso</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input placeholder={t.admin.logs.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs h-8" />
            <Select value={filterResult} onValueChange={(v) => setFilterResult(v as "all" | "allowed" | "denied")}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="allowed">Permitidos</SelectItem>
                <SelectItem value="denied">Negados</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground ml-auto">{filtered.length} resultados</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.admin.logs.tableHeaders.time}</TableHead>
                <TableHead>{t.admin.logs.tableHeaders.name}</TableHead>
                <TableHead>{t.admin.logs.tableHeaders.code}</TableHead>
                <TableHead>{t.admin.logs.tableHeaders.result}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-10">
                    {t.admin.logs.noLogs}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.slice(0, 100).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      {log.userName ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold">
                            {log.userName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{log.userName}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{log.accessCode}</code>
                    </TableCell>
                    <TableCell>
                      {log.result === "allowed" ? (
                        <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 border-0">
                          <CheckCircle className="w-3 h-3 mr-1" /> {t.admin.logs.allowed}
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          <ShieldAlert className="w-3 h-3 mr-1" /> {t.admin.logs.denied}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.admin.logs.clearModal.title}</AlertDialogTitle>
            <AlertDialogDescription>{t.admin.logs.clearModal.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.admin.logs.clearModal.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear} className="bg-destructive hover:bg-destructive/90">
              {t.admin.logs.clearModal.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccessLogs;
