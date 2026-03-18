import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Clock, CheckCircle, UserCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface Employee {
  id: string;
  name: string;
  role: string;
  is_active: boolean;
  last_login: string | null;
}

const AccessLogs = () => {
  const { t, language } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("academy_employees")
        .select("id, name, role, is_active, last_login")
        .order("last_login", { ascending: false, nullsLast: true });
      if (error) throw error;
      setEmployees(data || []);
    } catch (err) {
      toast.error(language === "pt" ? "Erro ao carregar registos" : "Failed to load access logs");
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filterStatus === "all" || (filterStatus === "active" && e.is_active) || (filterStatus === "inactive" && !e.is_active);
    return matchSearch && matchFilter;
  });

  const todayStr = new Date().toDateString();
  const todayLogins = employees.filter((e) => e.last_login && new Date(e.last_login).toDateString() === todayStr).length;
  const activeCount = employees.filter((e) => e.is_active).length;
  const inactiveCount = employees.length - activeCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{language === "pt" ? "Registos de Acesso" : "Access Logs"}</h2>
          <p className="text-muted-foreground text-sm">{language === "pt" ? "Acessos à plataforma" : "Platform access records"} ({employees.length} {language === "pt" ? "colaboradores" : "employees"})</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchEmployees}
          disabled={loading}
          className="h-8 gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {language === "pt" ? "Atualizar" : "Refresh"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{employees.length}</p>
                <p className="text-xs text-muted-foreground">{language === "pt" ? "Total de colaboradores" : "Total employees"}</p>
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
                <p className="text-2xl font-bold">{todayLogins}</p>
                <p className="text-xs text-muted-foreground">{language === "pt" ? "Acessos hoje" : "Logins today"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-xs text-muted-foreground">{language === "pt" ? "Colaboradores ativos" : "Active"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === "pt" ? "Procurar por nome ou função..." : "Search by name or role..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs h-8"
            />
            <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as "all" | "active" | "inactive")}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "pt" ? "Todos" : "All"}</SelectItem>
                <SelectItem value="active">{language === "pt" ? "Ativos" : "Active"}</SelectItem>
                <SelectItem value="inactive">{language === "pt" ? "Inativos" : "Inactive"}</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground ml-auto">{filtered.length} {language === "pt" ? "resultados" : "results"}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              {language === "pt" ? "Carregando..." : "Loading..."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "pt" ? "Colaborador" : "Employee"}</TableHead>
                  <TableHead>{language === "pt" ? "Função" : "Role"}</TableHead>
                  <TableHead>{language === "pt" ? "Último Acesso" : "Last Login"}</TableHead>
                  <TableHead>{language === "pt" ? "Estado" : "Status"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-10">
                      {language === "pt" ? "Nenhum registo encontrado." : "No records found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold">
                            {employee.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground capitalize">{employee.role}</span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {employee.last_login
                          ? format(new Date(employee.last_login), "dd/MM/yyyy HH:mm:ss")
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${
                            employee.is_active
                              ? "bg-emerald-500/10 text-emerald-600 border-0"
                              : "bg-muted text-muted-foreground border-0"
                          }`}
                        >
                          {employee.is_active ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {language === "pt" ? "Ativo" : "Active"}
                            </>
                          ) : (
                            language === "pt" ? "Inativo" : "Inactive"
                          )}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessLogs;
