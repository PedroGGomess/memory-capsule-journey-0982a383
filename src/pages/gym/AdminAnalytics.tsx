import { useGymAccess } from "@/contexts/GymAccessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, Users, CheckCircle, Clock, HelpCircle, Activity, UserCheck, UserX } from "lucide-react";

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted-foreground))"];
const CHART_COLORS = ["hsl(var(--primary))", "#34d399", "#fb923c", "#60a5fa", "#f472b6"];

const AdminAnalytics = () => {
  const { users, logs, questions } = useGymAccess();
  const { t } = useLanguage();

  const totalEmployees = users.length;
  const onboardingComplete = users.filter((u) => u.onboardingComplete).length;
  const completionRate = totalEmployees > 0 ? Math.round((onboardingComplete / totalEmployees) * 100) : 0;
  const activeEmployees = users.filter((u) => u.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  // Access activity over last 14 days
  const now = new Date();
  const activityData = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toDateString();
    const allowed = logs.filter((l) => l.result === "allowed" && new Date(l.timestamp).toDateString() === dateStr).length;
    const denied = logs.filter((l) => l.result === "denied" && new Date(l.timestamp).toDateString() === dateStr).length;
    return {
      day: d.toLocaleDateString("pt-PT", { day: "2-digit", month: "short" }),
      permitidos: allowed,
      negados: denied,
    };
  });

  // Question categories
  const questionCategories = questions.reduce<Record<string, number>>((acc, q) => {
    const cat = q.module || "geral";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const questionData = Object.entries(questionCategories)
    .map(([name, value]) => ({ name: name.replace(/-/g, " "), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Onboarding pie
  const onboardingPie = [
    { name: "Completo", value: onboardingComplete },
    { name: "Em progresso", value: totalEmployees - onboardingComplete },
  ];

  // Status pie
  const statusPie = [
    { name: "Ativos", value: activeEmployees },
    { name: "Inativos", value: inactiveEmployees },
  ];

  const resolvedQuestions = questions.filter((q) => q.resolved).length;
  const openQuestions = questions.filter((q) => !q.resolved).length;

  // Recent activity
  const recentActivity = logs
    .filter((l) => l.result === "allowed" && l.userName)
    .slice(0, 10)
    .map((l) => ({
      name: l.userName!,
      time: new Date(l.timestamp).toLocaleDateString("pt-PT", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t.admin.analytics.title}</h2>
        <p className="text-muted-foreground text-sm">{t.admin.analytics.subtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
            </div>
            <p className="text-3xl font-bold">{completionRate}%</p>
            <Progress value={completionRate} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Total Colaboradores</p>
            </div>
            <p className="text-3xl font-bold">{totalEmployees}</p>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">{activeEmployees} ativos</span> · {inactiveEmployees} inativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-sm text-muted-foreground">Onboarding Completo</p>
            </div>
            <p className="text-3xl font-bold">{onboardingComplete}</p>
            <p className="text-xs text-muted-foreground mt-1">de {totalEmployees} colaboradores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-destructive" />
              </div>
              <p className="text-sm text-muted-foreground">Perguntas Abertas</p>
            </div>
            <p className="text-3xl font-bold">{openQuestions}</p>
            <p className="text-xs text-muted-foreground mt-1">{resolvedQuestions} resolvidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access activity — area chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Atividade de Acessos (14 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Sem dados de atividade</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={activityData} margin={{ top: 4, right: 8, bottom: 4, left: -20 }}>
                  <defs>
                    <linearGradient id="colorPermitidos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="permitidos" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPermitidos)" strokeWidth={2} />
                  <Area type="monotone" dataKey="negados" stroke="hsl(var(--destructive))" fillOpacity={0.1} fill="hsl(var(--destructive))" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Onboarding + Status pies */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Estado da Equipa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalEmployees === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Sem colaboradores</div>
            ) : (
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <ResponsiveContainer width={140} height={140}>
                    <PieChart>
                      <Pie data={onboardingPie} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={3}>
                        {onboardingPie.map((_, i) => (
                          <Cell key={i} fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-muted-foreground mt-1">Onboarding</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Completo: {onboardingComplete}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <span className="text-xs text-muted-foreground">Em progresso: {totalEmployees - onboardingComplete}</span>
                  </div>
                  <div className="h-px bg-border/20 my-2" />
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs text-muted-foreground">Ativos: {activeEmployees}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserX className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-xs text-muted-foreground">Inativos: {inactiveEmployees}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Questions by topic */}
      {questionData.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              Tópicos Mais Perguntados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={questionData} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 80 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Employee Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Visão Geral dos Colaboradores
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-10">Sem colaboradores.</p>
          ) : (
            <div className="divide-y divide-border/20">
              {users.slice(0, 12).map((user) => (
                <div key={user.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {user.onboardingComplete ? (
                      <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 border-0">
                        <CheckCircle className="w-3 h-3 mr-1" /> Completo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" /> Em Progresso
                      </Badge>
                    )}
                    <Badge variant={user.active ? "secondary" : "outline"} className={`text-xs ${user.active ? "bg-emerald-500/10 text-emerald-600 border-0" : ""}`}>
                      {user.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/10 last:border-0">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold shrink-0">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{item.name}</span> acedeu à plataforma
                </p>
                <span className="ml-auto text-xs text-muted-foreground/50 shrink-0">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminAnalytics;
