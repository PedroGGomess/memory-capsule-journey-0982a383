import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Dumbbell, History } from "lucide-react";

const GymAdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/gym-admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border/30 bg-card/50 flex flex-col">
        <div className="h-16 flex items-center px-5 border-b border-border/30">
          <Dumbbell className="w-5 h-5 text-primary mr-2" />
          <span className="font-semibold text-sm tracking-wide">Gym Admin</span>
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
            Dashboard
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
            Access Logs
          </NavLink>
        </nav>
        <div className="p-3 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/30 bg-card/50">
          <h1 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Access Control System
          </h1>
          <a
            href="/gym-access"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            Open Verification Terminal →
          </a>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GymAdminLayout;
