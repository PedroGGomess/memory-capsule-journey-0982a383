import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, History, Bot, BarChart2, MessageSquare, Home } from "lucide-react";
import logoImg from "@/assets/Logo.png";

const GymAdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate("/gym-admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border/30 bg-card/50 flex flex-col">
        <div className="h-16 flex items-center gap-3 px-5 border-b border-border/30">
          <img src={logoImg} alt="The 100's" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-sm tracking-wide">{t.admin.layout.brandTitle}</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <NavLink
            to="/gym-admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            {t.admin.layout.dashboard}
          </NavLink>
          <NavLink
            to="/gym-admin/analytics"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <BarChart2 className="w-4 h-4" />
            {t.admin.layout.analytics}
          </NavLink>
          <NavLink
            to="/gym-admin/questions"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <MessageSquare className="w-4 h-4" />
            {t.admin.layout.questionsInbox}
          </NavLink>
          <NavLink
            to="/gym-admin/logs"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <History className="w-4 h-4" />
            {t.admin.layout.accessLogs}
          </NavLink>
          <NavLink
            to="/gym-admin/chat"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <Bot className="w-4 h-4" />
            {t.admin.layout.aiAssistant}
          </NavLink>
        </nav>
        <div className="p-3 border-t border-border/30 space-y-1">
          <div className="flex items-center gap-2 px-3 py-2">
            <button
              onClick={() => setLanguage("en")}
              className={`text-xs tracking-[0.15em] uppercase transition-colors ${language === "en" ? "text-primary font-medium" : "text-muted-foreground/60 hover:text-muted-foreground"}`}
            >
              EN
            </button>
            <span className="text-muted-foreground/30">|</span>
            <button
              onClick={() => setLanguage("pt")}
              className={`text-xs tracking-[0.15em] uppercase transition-colors ${language === "pt" ? "text-primary font-medium" : "text-muted-foreground/60 hover:text-muted-foreground"}`}
            >
              PT
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
            {t.admin.layout.homePage}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            {t.admin.layout.logout}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/30 bg-card/50">
          <h1 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            {t.admin.layout.headerTitle}
          </h1>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GymAdminLayout;
