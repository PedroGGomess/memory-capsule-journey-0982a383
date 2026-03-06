import { useGymAccess } from "@/contexts/GymAccessContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, CheckCircle, Clock, HelpCircle, Activity } from "lucide-react";

const COLORS = ["#a78bfa", "#34d399", "#fb923c", "#60a5fa", "#f472b6"];

const AdminAnalytics = () => {
  const { users, logs, questions } = useGymAccess();

  const totalEmployees = users.length;
  const onboardingComplete = users.filter((u) => u.onboardingComplete).length;
  const completionRate = totalEmployees > 0 ? Math.round((onboardingComplete / totalEmployees) * 100) : 0;
  const activeEmployees = users.filter((u) => u.active).length;

  // Access activity over the last 7 days
  const now = new Date();
  const activityData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toDateString();
    const count = logs.filter(
      (l) => l.result === "allowed" && new Date(l.timestamp).toDateString() === dateStr
    ).length;
    return {
      day: d.toLocaleDateString(undefined, { weekday: "short" }),
      accesses: count,
    };
  });

  // Question categories
  const questionCategories = questions.reduce<Record<string, number>>((acc, q) => {
    const cat = q.module || "general";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const questionData = Object.entries(questionCategories)
    .map(([name, value]) => ({ name: name.replace(/-/g, " "), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Onboarding pie chart
  const onboardingPie = [
    { name: "Completed", value: onboardingComplete },
    { name: "In Progress", value: totalEmployees - onboardingComplete },
  ];

  // Recent activity feed
  const recentActivity = logs
    .filter((l) => l.result === "allowed" && l.userName)
    .slice(0, 8)
    .map((l) => ({
      name: l.userName!,
      action: "accessed the platform",
      time: new Date(l.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    }));

  const resolvedQuestions = questions.filter((q) => q.resolved).length;
  const openQuestions = questions.filter((q) => !q.resolved).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-muted-foreground text-sm">Onboarding performance and employee activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
            <p className="text-3xl font-bold">{completionRate}%</p>
            <Progress value={completionRate} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </div>
            <p className="text-3xl font-bold">{totalEmployees}</p>
            <p className="text-xs text-muted-foreground mt-1">{activeEmployees} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
              <p className="text-sm text-muted-foreground">Onboarding Done</p>
            </div>
            <p className="text-3xl font-bold">{onboardingComplete}</p>
            <p className="text-xs text-muted-foreground mt-1">of {totalEmployees} employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <p className="text-sm text-muted-foreground">Open Questions</p>
            </div>
            <p className="text-3xl font-bold">{openQuestions}</p>
            <p className="text-xs text-muted-foreground mt-1">{resolvedQuestions} resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Platform Activity (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                No activity data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={activityData} margin={{ top: 4, right: 8, bottom: 4, left: -20 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                  <Bar dataKey="accesses" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Onboarding status pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Onboarding Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalEmployees === 0 ? (
              <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                No employees yet
              </div>
            ) : (
              <div className="flex items-center justify-around">
                <ResponsiveContainer width="60%" height={160}>
                  <PieChart>
                    <Pie data={onboardingPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                      {onboardingPie.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {onboardingPie.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                      <span className="text-xs font-semibold">{item.value}</span>
                    </div>
                  ))}
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
              Most Asked Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={questionData} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 80 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                <Bar dataKey="value" fill="#34d399" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Employee onboarding progress table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Employee Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-10">No employees yet.</p>
          ) : (
            <div className="divide-y divide-border/20">
              {users.slice(0, 10).map((user) => (
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
                    <div className="hidden sm:block">
                      <p className="text-xs text-muted-foreground mb-1">
                        Started {new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    {user.onboardingComplete ? (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        In Progress
                      </Badge>
                    )}
                    <Badge
                      variant={user.active ? "default" : "secondary"}
                      className={`text-xs ${user.active ? "bg-green-100 text-green-700 hover:bg-green-100 border-0" : ""}`}
                    >
                      {user.active ? "Active" : "Inactive"}
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
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/10 last:border-0">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold shrink-0">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{item.name}</span>{" "}
                  {item.action}
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
