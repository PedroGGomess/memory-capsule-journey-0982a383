import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useProgress } from "@/contexts/ProgressContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getRoleLabel } from "@/config/roles";
import { MODULE_ORDER, AREA_LABELS, type ModuleInfo } from "@/config/moduleOrder";
import { Sun, Moon, Search } from "lucide-react";
import { useState } from "react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from "@/components/ui/sidebar";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, FolderOpen, Award, Sparkles, LayoutDashboard, Check, Bot, BarChart3, LogOut, Home, BookMarked, Target, Image,
  Heart, Shield, Plane, Languages, Monitor, Printer, Briefcase, ClipboardList, User, Calendar, Zap, Gamepad2,
  Brain, Layers, ShoppingCart, Handshake, Globe, Eye, Trophy
} from "lucide-react";

// Icon mapping for each module
const MODULE_ICONS: Record<string, any> = {
  "brand-story": BookOpen,
  "product-knowledge": Wine,
  "store-experience": Store,
  "glossary-vocab": Languages,
  "sales-funnel": Target,
  "objection-handling": Shield,
  "closing-consultative": Handshake,
  "tourist-psychology": Globe,
  "client-types": Layers,
  "client-culture": Heart,
  "transport-logistics": Plane,
  "digital-operations": Monitor,
  "business-leadership": Briefcase,
  "final-certification": Trophy,
};

// Area accent colors for visual grouping
const AREA_COLORS: Record<string, string> = {
  brand: "text-[#C9A96E]",
  commercial: "text-[#C4704D]",
  client: "text-[#2B4D9B]",
  operations: "text-[#3A3A4A] dark:text-[#aaa]",
};

export function AcademySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isModuleCompleted, allowedModules, userRole, progress } = useProgress();
  const { logout } = useAcademyAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const needsRetry = (moduleId: string) => {
    const score = progress[moduleId]?.quizScore;
    return score !== undefined && score < 80;
  };

  const getModuleIndicator = (moduleId: string, moduleNum: number) => {
    const completed = isModuleCompleted(moduleId);
    const retry = needsRetry(moduleId);
    if (completed) return <Check className="w-3 h-3 text-sidebar-primary" />;
    if (retry) return <span className="text-[10px] font-medium text-yellow-500">{moduleNum}</span>;
    return <span className="text-[10px] font-medium text-sidebar-foreground/40">{moduleNum}</span>;
  };

  // Build modules with nav info
  const allModules = MODULE_ORDER
    .filter(m => allowedModules.includes(m.id))
    .map((m, i) => ({
      ...m,
      num: i + 1,
      title: t.academy?.nav?.[m.navKey as keyof typeof t.academy.nav] || m.id,
      url: `/academy/module/${m.id}`,
      Icon: MODULE_ICONS[m.id] || BookOpen,
    }));

  // Group by area
  const areas: { key: string; label: string; modules: typeof allModules }[] = [
    { key: "brand", label: language === "en" ? AREA_LABELS.brand.en : AREA_LABELS.brand.pt, modules: allModules.filter(m => m.area === "brand") },
    { key: "commercial", label: language === "en" ? AREA_LABELS.commercial.en : AREA_LABELS.commercial.pt, modules: allModules.filter(m => m.area === "commercial") },
    { key: "client", label: language === "en" ? AREA_LABELS.client.en : AREA_LABELS.client.pt, modules: allModules.filter(m => m.area === "client") },
    { key: "operations", label: language === "en" ? AREA_LABELS.operations.en : AREA_LABELS.operations.pt, modules: allModules.filter(m => m.area === "operations") },
  ].filter(a => a.modules.length > 0);

  // Filter by search
  const filteredAreas = searchQuery.trim()
    ? areas.map(a => ({
        ...a,
        modules: a.modules.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(a => a.modules.length > 0)
    : areas;

  const tools = [
    { title: language === "en" ? "Profile" : "Perfil", url: "/academy/profile", icon: User, id: "profile" },
    { title: language === "en" ? "In-Person Training" : "Formação Presencial", url: "/academy/presential-training", icon: Calendar, id: "presential-training" },
    { title: language === "en" ? "Quick Guide" : "Guia Rápido", url: "/academy/cheat-sheet", icon: Zap, id: "cheat-sheet" },
    { title: language === "en" ? "Sales Simulator" : "Simulador de Vendas", url: "/academy/sales-simulator", icon: Gamepad2, id: "sales-simulator" },
    { title: t.academy?.nav?.askTeam || "Ask Team", url: "/academy/module/ask-team", icon: Sparkles, id: "ask-team" },
    { title: t.academy?.nav?.resources || "Resources", url: "/academy/module/resources", icon: FolderOpen, id: "resources" },
    { title: t.academy?.nav?.aiAssistant || "AI Assistant", url: "/academy/module/ai-assistant", icon: Bot, id: "ai-assistant" },
  ];

  const managerTools = (userRole === "store-manager" || userRole === "team-leader") ? [
    { title: language === "en" ? "My Team" : "A Minha Equipa", url: "/academy/team", icon: Users, id: "my-team" },
  ] : [];

  const handleLogout = () => {
    logout();
    navigate("/academy/login");
  };

  const roleLabel = getRoleLabel(userRole, language as "pt" | "en");

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar-background">
      <SidebarContent className="scrollbar-thin">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <NavLink to="/academy" end className="flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    {!collapsed && <span className="text-sm">Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Search */}
        {!collapsed && (
          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sidebar-foreground/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === "en" ? "Search modules..." : "Procurar módulos..."}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-sidebar-accent/30 border border-sidebar-border/30 text-sidebar-foreground placeholder:text-sidebar-foreground/30 focus:outline-none focus:border-sidebar-primary/30"
              />
            </div>
          </div>
        )}

        {/* Module Areas */}
        {filteredAreas.map(area => (
          <SidebarGroup key={area.key}>
            <SidebarGroupLabel className={`text-[10px] tracking-widest uppercase ${AREA_COLORS[area.key] || ""}`}>
              {!collapsed ? area.label : area.label.charAt(0)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {area.modules.map(mod => (
                  <SidebarMenuItem key={mod.id}>
                    <SidebarMenuButton asChild tooltip={mod.title}>
                      <NavLink to={mod.url} className="flex items-center gap-3 text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
                        <div className="flex items-center justify-center w-5 h-5">
                          {getModuleIndicator(mod.id, mod.num)}
                        </div>
                        {!collapsed && (
                          <>
                            <mod.Icon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="text-xs truncate">{mod.title}</span>
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-widest uppercase text-sidebar-foreground/30">
            {!collapsed ? (language === "en" ? "Tools" : "Ferramentas") : "T"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[...tools, ...managerTools].map(tool => (
                <SidebarMenuItem key={tool.id}>
                  <SidebarMenuButton asChild tooltip={tool.title}>
                    <NavLink to={tool.url} className="flex items-center gap-3 text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
                      <tool.icon className="w-4 h-4" />
                      {!collapsed && <span className="text-xs">{tool.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="text-[10px] text-sidebar-foreground/30">
              <span className="capitalize">{roleLabel}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <button onClick={toggleTheme} className="p-1.5 text-sidebar-foreground/30 hover:text-sidebar-foreground transition-colors" title={theme === "dark" ? "Light mode" : "Dark mode"}>
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "pt" : "en")}
              className="p-1.5 text-sidebar-foreground/30 hover:text-sidebar-foreground transition-colors text-[10px] font-bold"
            >
              {language === "en" ? "PT" : "EN"}
            </button>
            <button onClick={handleLogout} className="p-1.5 text-sidebar-foreground/30 hover:text-destructive transition-colors" title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
