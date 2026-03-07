import { useState } from "react";
import { useGymAccess } from "@/contexts/GymAccessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const AccessLogs = () => {
  const { logs, clearLogs } = useGymAccess();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const filtered = logs.filter(
    (l) =>
      (l.userName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      l.accessCode.toLowerCase().includes(search.toLowerCase())
  );

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
          <p className="text-muted-foreground text-sm">
            {t.admin.logs.subtitle} ({logs.length} {t.admin.logs.records})
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setConfirmClear(true)}
          disabled={logs.length === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {t.admin.logs.clearLogs}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t.admin.logs.searchPlaceholder}
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
                filtered.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {log.userName ?? <span className="text-muted-foreground italic">—</span>}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                        {log.accessCode}
                      </code>
                    </TableCell>
                    <TableCell>
                      {log.result === "allowed" ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          {t.admin.logs.allowed}
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          {t.admin.logs.denied}
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
            <AlertDialogDescription>
              {t.admin.logs.clearModal.description}
            </AlertDialogDescription>
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
