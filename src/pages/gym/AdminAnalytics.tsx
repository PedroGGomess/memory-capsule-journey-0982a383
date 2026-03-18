import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, Users, CheckCircle, Clock, HelpCircle, Activity, UserCheck, UserX, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted-foreground))"];
const CHART_COLORS = ["hsl(var(--primary))", "#34d399", "#fb923c", "#60a5fa", "#f472b6"];

interface Employee {
  id: string;
  name: string;
  email: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
  progress: Record<string, any>;
  quiz_scores: Record<string, any>;
}

const AdminAnalytics = () => {
  const { t, language } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("academy_employees")
        .select("*")
        .order("name");
      if (error) throw error;
      setEmployees(data || []);
    } catch (err) {
      toast.error(language === "pt" ? "Erro ao carregar dados" : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Parse progress JSONB
  const moduleCount = (progress: any): number => {
    if (!progress || typeof progress !== 'object') return 0;
    return Object.values(progress).filter((p: any) => p?.completed).length;
  };

  // Total modules (assuming 6 modules based on typical academy structure)
  const TOTAL_MODULES = 6;

  // Parse quiz scores JSONB
  const avgScore = (scores: any): number => {
    if (!scores || typeof scores !== 'object') return 0;
    const vals = Object.values(scores).filter((s: any) => typeof s === 'number') as number[];
    return vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  };

  // Calculate KPIs
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.is_active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;
  const completeCount = employees.filter((e) => moduleCount(e.progress) === TOTAL_MODULES).length;
  const completionRate = totalEmployees > 0
    ? Math.round(
        (employees.reduce((sum, e) => sum + moduleCount(e.progress), 0) /
          (totalEmployees * TOTAL_MODULES)) * 100
      )
    : 0;

  // Recent logins (activity over last 14 days)
  const now = new Date();
  const recentLogins = employees
    .filter((e) => e.last_login)
    .sort((a, b) => new Date(b.last_login!).getTime() - new Date(a.last_login!).getTime())
    .slice(0, 10)
    .map((e) => ({
      name: e.name,
      time: new Date(e.last_login!).toLocaleDateString("pt-PT", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

  // Completion pie
  const completionPie = [
    { name: language === "pt" ? "Completo" : "Complete", value: completeCount },
    { name: language === "pt" ? "Em progresso" : "In Progress", value: totalEmployees - completeCount },
  ];

  // Status pie
  const statusPie = [
    { name: language === "pt" ? "Ativos" : "Active", value: activeEmployees },
    { name: language === "pt" ? "Inativos" : "Inactive", value: inactiveEmployees },
  ];

  // Module performance
  const modulePerformance: Record<string, { avg: number; count: number }> = {};
  employees.forEach((e) => {
    Object.entries(e.quiz_scores || {}).forEach(([module, score]) => {
      if (!modulePerformance[module]) {
        modulePerformance[module] = { avg: 0, count: 0 };
      }
      if (typeof score === 'number') {
        modulePerformance[module].avg += score;
        modulePerformance[module].count += 1;
      }
    });
  });

  const moduleData = Object.entries(modulePerformance)
    .map(([name, { avg, count }]) => ({
      name: name.replace(/-/g, " "),
      score: count > 0 ? Math.round(avg / count) : 0,
      completions: count,
    }))
    .sort((a, b) => b.completions - a.completions)
    .slice(0, 8);

  // Toggle row expansion
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Get status label
  const getStatus = (employee: Employee) => {
    const completed = moduleCount(employee.progress);
    if (completed === 0) {
      return { label: language === "pt" ? "Não Iniciado" : "Not Started", color: "bg-gray-500/10 text-gray-600 border-0" };
    } else if (completed === TOTAL_MODULES) {
      return { label: language === "pt" ? "Completo" : "Complete", color: "bg-emerald-500/10 text-emerald-600 border-0" };
    } else {
      return { label: language === "pt" ? "Em Progresso" : "In Progress", color: "bg-amber-500/10 text-amber-600 border-0" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{language === "pt" ? "Análises" : "Analytics"}</h2>
          <p className="text-muted-foreground text-sm">{language === "pt" ? "Desempenho e progresso da formação" : "Training performance and progress"}</p>
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

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          {language === "pt" ? "Carregando dados..." : "Loading data..."}
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === "pt" ? "Total Colaboradores" : "Total Employees"}</p>
                </div>
                <p className="text-3xl font-bold">{totalEmployees}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500">{activeEmployees} {language === "pt" ? "ativos" : "active"}</span> · {inactiveEmployees} {language === "pt" ? "inativos" : "inactive"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === "pt" ? "Formação Completa" : "Training Complete"}</p>
                </div>
                <p className="text-3xl font-bold">{completeCount}</p>
                <p className="text-xs text-muted-foreground mt-1">{language === "pt" ? "de" : "of"} {totalEmployees}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === "pt" ? "Taxa de Conclusão" : "Completion Rate"}</p>
                </div>
                <p className="text-3xl font-bold">{completionRate}%</p>
                <Progress value={completionRate} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === "pt" ? "Score Médio" : "Avg Quiz Score"}</p>
                </div>
                <p className="text-3xl font-bold">
                  {totalEmployees > 0
                    ? Math.round(
                        employees.reduce((sum, e) => sum + avgScore(e.quiz_scores), 0) /
                        totalEmployees
                      )
                    : 0}
                  %
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Completion + Status Pies */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {language === "pt" ? "Estado da Equipa" : "Team Status"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {totalEmployees === 0 ? (
                  <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                    {language === "pt" ? "Sem colaboradores" : "No employees"}
                  </div>
                ) : (
                  <div className="flex items-center justify-around">
                    <div className="text-center">
                      <ResponsiveContainer width={140} height={140}>
                        <PieChart>
                          <Pie data={completionPie} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={3}>
                            {completionPie.map((_, i) => (
                              <Cell key={i} fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <p className="text-xs text-muted-foreground mt-1">{language === "pt" ? "Conclusão" : "Completion"}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">{language === "pt" ? "Completo" : "Complete"}: {completeCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted" />
                        <span className="text-xs text-muted-foreground">{language === "pt" ? "Em progresso" : "In Progress"}: {totalEmployees - completeCount}</span>
                      </div>
                      <div className="h-px bg-border/20 my-2" />
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs text-muted-foreground">{language === "pt" ? "Ativos" : "Active"}: {activeEmployees}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserX className="w-3.5 h-3.5 text-destructive" />
                        <span className="text-xs text-muted-foreground">{language === "pt" ? "Inativos" : "Inactive"}: {inactiveEmployees}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Module Performance */}
            {moduleData.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-primary" />
                    {language === "pt" ? "Desempenho dos Módulos" : "Module Performance"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={moduleData} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 100 }}>
                      <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                      <Bar dataKey="score" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Individual Employee Reports */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                {language === "pt" ? "Relatórios por Colaborador" : "Individual Reports"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/20">
                {employees.map((employee) => {
                  const completed = moduleCount(employee.progress);
                  const status = getStatus(employee);
                  const isExpanded = expandedRows.has(employee.id);

                  return (
                    <div key={employee.id}>
                      <button
                        onClick={() => toggleRow(employee.id)}
                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">
                            {employee.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.role}</p>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {completed}/{TOTAL_MODULES}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {language === "pt" ? "Módulos" : "Modules"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{avgScore(employee.quiz_scores)}%</p>
                              <p className="text-xs text-muted-foreground">
                                {language === "pt" ? "Score" : "Score"}
                              </p>
                            </div>
                            <Badge className={`text-xs ${status.color}`}>{status.label}</Badge>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bg-muted/20 px-6 py-4 border-t border-border/20 space-y-3">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(employee.progress || {}).map(([moduleName, progress]) => (
                              <div key={moduleName} className="border border-border/30 p-3">
                                <p className="text-xs font-medium text-foreground mb-2">
                                  {moduleName.replace(/-/g, " ")}
                                </p>
                                <div className="space-y-2">
                                  {(progress as any)?.completed ? (
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                      <span className="text-xs text-emerald-600">
                                        {language === "pt" ? "Concluído" : "Complete"}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                                      <span className="text-xs text-amber-600">
                                        {language === "pt" ? "Em progresso" : "In Progress"}
                                      </span>
                                    </div>
                                  )}
                                  {employee.quiz_scores?.[moduleName] !== undefined && (
                                    <p className="text-xs text-muted-foreground">
                                      Quiz: {employee.quiz_scores[moduleName]}%
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          {employee.last_login && (
                            <p className="text-xs text-muted-foreground">
                              {language === "pt" ? "Último acesso" : "Last login"}:{" "}
                              {new Date(employee.last_login).toLocaleDateString("pt-PT", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          {recentLogins.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  {language === "pt" ? "Atividade Recente" : "Recent Activity"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentLogins.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/10 last:border-0">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold flex-shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">{item.name}</span>{" "}
                      {language === "pt" ? "acedeu à plataforma" : "accessed the platform"}
                    </p>
                    <span className="ml-auto text-xs text-muted-foreground/50 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AdminAnalytics;
