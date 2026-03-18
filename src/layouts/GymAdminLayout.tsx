import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LayoutDashboard, LogOut, History, BarChart2, MessageSquare, Home, UserPlus, Menu } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/Logo.png";

const GymAdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/gym-admin/login");
  };

  const navItems = [
    { to: "/gym-admin", end: true, icon: LayoutDashboard, label: language === "pt" ? "Painel" : "Dashboard" },
    { to: "/gym-admin/analytics", end: false, icon: BarChart2, label: language === "pt" ? "Análises" : "Analytics" },
    { to: "/gym-admin/questions", end: false, icon: MessageSquare, label: language === "pt" ? "Caixa de Perguntas" : "Question Inbox" },
    { to: "/gym-admin/logs", end: false, icon: History, label: language === "pt" ? "Registos de Acesso" : "Access Logs" },
    { to: "/gym-admin/admins", end: false, icon: UserPlus, label: language === "pt" ? "Admins" : "Admins" },
  ];

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} border-r border-border/10 bg-gradient-to-b from-card via-card to-background flex flex-col transition-all duration-300 shrink-0`}>
        {/* Brand */}
        <div className="px-5 py-6 border-b border-border/10 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
              <img src={logoImg} alt="The 100's" className="w-11 h-11 object-contain relative z-10" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-base font-medium text-gold-gradient tracking-wide">The 100's</p>
                <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground/40 mt-0.5">Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 pt-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-light transition-all duration-300 ${
                  isActive
                    ? "text-foreground bg-primary/[0.08] shadow-[inset_0_0_20px_-12px_hsl(var(--primary)/0.3)]"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-primary/5"
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="tracking-wide">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border/10 space-y-1">
          {!collapsed && (
            <div className="flex items-center justify-center gap-0.5 px-4 py-2 mb-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-md text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  language === "en"
                    ? "text-primary bg-primary/10 shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)]"
                    : "text-muted-foreground/40 hover:text-muted-foreground/60 hover:bg-muted/30"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("pt")}
                className={`px-3 py-1.5 rounded-md text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  language === "pt"
                    ? "text-primary bg-primary/10 shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)]"
                    : "text-muted-foreground/40 hover:text-muted-foreground/60 hover:bg-muted/30"
                }`}
              >
                PT
              </button>
            </div>
          )}
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-light text-muted-foreground/50 hover:text-foreground hover:bg-primary/5 transition-all duration-300 group"
          >
            <Home className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors duration-300" />
            {!collapsed && <span className="tracking-wide">{t.admin.layout.homePage}</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-light text-muted-foreground/50 hover:text-foreground hover:bg-primary/5 transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors duration-300" />
            {!collapsed && <span className="tracking-wide">{t.admin.layout.logout}</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 flex items-center border-b border-border/10 px-6 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground/40 hover:text-foreground transition-colors mr-4"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="h-px flex-1 bg-border/10" />
          <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground/30 ml-4">
            Painel de Administração
          </p>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GymAdminLayout;
