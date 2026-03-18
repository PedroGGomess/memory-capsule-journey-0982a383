import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useProgress } from "@/contexts/ProgressContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getRoleLabel } from "@/config/roles";
import { Sun, Moon, Search } from "lucide-react";
import { useState } from "react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from "@/components/ui/sidebar";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, FolderOpen, Award, Sparkles, LayoutDashboard, Check, Bot, BarChart3, LogOut, Home, BookMarked, Target, Image,
  Heart, Shield, Plane, Languages, Monitor, Printer, Briefcase, ClipboardList, User, Calendar, Zap
} from "lucide-react";
import logoImg from "@/assets/Logo.png";

const ALL_CORE_MODULES = [
  { id: "story", icon: BookOpen, navKey: "story" as const },
  { id: "philosophy", icon: Compass, navKey: "philosophy" as const },
  { id: "products", icon: Wine, navKey: "products" as const },
  { id: "gift", icon: Gift, navKey: "gift" as const },
  { id: "store", icon: Store, navKey: "store" as const },
  { id: "brand-voice", icon: MessageCircle, navKey: "brandVoice" as const },
  { id: "customer-experience", icon: Users, navKey: "customerExperience" as const },
  { id: "business-model", icon: BarChart3, navKey: "businessModel" as const },
  { id: "tasting-guide", icon: Wine, navKey: "tastingGuide" as const },
  { id: "glossary", icon: BookMarked, navKey: "glossary" as const },
  { id: "cross-selling", icon: Target, navKey: "crossSelling" as const },
  { id: "visual-merchandising", icon: Image, navKey: "visualMerchandising" as const },
  { id: "client-profiles", icon: Users, navKey: "clientProfiles" as const },
  { id: "client-culture", icon: Heart, navKey: "clientCulture" as const },
  { id: "conduct", icon: Shield, navKey: "conduct" as const },
  { id: "transport-rules", icon: Plane, navKey: "transportRules" as const },
  { id: "vocabulary", icon: Languages, navKey: "vocabulary" as const },
  { id: "digital-systems", icon: Monitor, navKey: "digitalSystems" as const },
  { id: "uv-printer", icon: Printer, navKey: "uvPrinter" as const },
  { id: "leadership", icon: Briefcase, navKey: "leadership" as const },
  { id: "team-ops", icon: ClipboardList, navKey: "teamOps" as const },
  { id: "certification", icon: Award, navKey: "certification" as const },
];

export function AcademySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isModuleCompleted, allowedModules, userRole, progress } = useProgress();
  const { logout } = useAcademyAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to check if module needs retry (quiz score < 80%)
  const needsRetry = (moduleId: string) => {
    const score = progress[moduleId]?.quizScore;
    return score !== undefined && score < 80;
  };

  // Count team members below 50% progress
  const getTeamMembersBelow50Percent = () => {
    // This would need to be passed from a team data source
    // For now, we'll leave it as a placeholder that can be filled in later
    return 0;
  };

  let coreModules = ALL_CORE_MODULES
    .filter((m) => allowedModules.includes(m.id))
    .map((m, i) => ({
      ...m,
      num: i + 1,
      title: t.academy.nav[m.navKey] || m.id,
      url: `/academy/module/${m.id}`,
    }));

  // Filter modules based on search query
  const filteredModules = searchQuery.trim()
    ? coreModules.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : coreModules;

  const tools = [
    { title: language === "en" ? "Profile" : "Perfil", url: "/academy/profile", icon: User, id: "profile" },
    { title: language === "en" ? "In-Person Training" : "Formação Presencial", url: "/academy/presential-training", icon: Calendar, id: "presential-training" },
    { title: language === "en" ? "Quick Guide" : "Guia Rápido", url: "/academy/cheat-sheet", icon: Zap, id: "cheat-sheet" },
    { title: t.academy.nav.askTeam, url: "/academy/module/ask-team", icon: Sparkles, id: "ask-team" },
    { title: t.academy.nav.resources, url: "/academy/module/resources", icon: FolderOpen, id: "resources" },
    { title: t.academy.nav.aiAssistant, url: "/academy/module/ai-assistant", icon: Bot, id: "ai-assistant" },
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
      <SidebarContent className="bg-sidebar-background pt-0">
        {/* Brand Header - Clean, minimal */}
        <div className="px-5 py-6 border-b border-sidebar-border relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <img src={logoImg} alt="The 100's" className="w-11 h-11 object-contain" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-base font-light text-sidebar-foreground tracking-widest">THE 100'S</p>
                <p className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/50 mt-0.5">ACADEMY</p>
              </div>
            )}
          </div>
          {!collapsed && userRole && (
            <div className="mt-3 relative z-10">
              <span className="text-[9px] tracking-[0.2em] uppercase text-sidebar-primary bg-transparent px-2.5 py-1 border border-sidebar-primary">
                {roleLabel}
              </span>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {!collapsed && (
          <div className="px-4 py-4">
            <div className="space-y-2">
              <div className="h-0.5 w-full bg-sidebar-border overflow-hidden">
                <div
                  className="h-full bg-sidebar-primary transition-all duration-500"
                  style={{ width: `${useProgress().getCompletionPercentage()}%` }}
                />
              </div>
              <p className="text-[9px] tracking-[0.15em] uppercase text-sidebar-foreground/40 font-light">
                {useProgress().completedModules} / {useProgress().totalModules} {language === "en" ? "modules" : "módulos"}
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Link */}
        <div className="px-2 pt-2 pb-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/academy"
                  end
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200 border-l-2 border-transparent"
                  activeClassName="text-sidebar-primary border-l-2 border-sidebar-primary"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="tracking-wider">DASHBOARD</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Module Search - Only show when not collapsed */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sidebar-foreground/40 pointer-events-none" />
              <input
                type="text"
                placeholder={language === "pt" ? "Pesquisar módulos..." : "Search modules..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-sidebar-border text-sidebar-foreground text-xs placeholder:text-sidebar-foreground/30 pl-8 pr-3 py-2 focus:outline-none focus:border-sidebar-primary/50 transition-colors duration-200"
              />
            </div>
          </div>
        )}

        {/* Core Modules */}
        <SidebarGroup className="px-2">
          {!collapsed && (
            <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/40 px-4 mb-2">
              {t.academy.layout.navigation}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            {filteredModules.length === 0 && searchQuery.trim() ? (
              <div className="px-4 py-6 text-center">
                <p className="text-[9px] tracking-[0.1em] uppercase text-sidebar-foreground/40 font-light">
                  {language === "pt" ? "Sem resultados" : "No results"}
                </p>
              </div>
            ) : (
            <SidebarMenu>
              {filteredModules.map((item) => {
                const completed = isModuleCompleted(item.id);
                const retryNeeded = needsRetry(item.id);
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="group flex items-center gap-3 px-4 py-2 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200 border-l-2 border-transparent"
                        activeClassName="text-sidebar-primary border-l-2 border-sidebar-primary"
                      >
                        <div className="relative">
                          {!collapsed ? (
                            <span className={`
                              w-5 h-5 flex items-center justify-center text-[10px] font-medium shrink-0 transition-colors duration-200
                              ${completed
                                ? 'text-sidebar-primary'
                                : 'text-sidebar-foreground/40 group-hover:text-sidebar-primary'}
                            `}>
                              {completed ? <Check className="w-3 h-3" /> : item.num}
                            </span>
                          ) : (
                            <item.icon className="w-4 h-4 shrink-0" />
                          )}
                          {/* Gold dot badge for quiz retry needed */}
                          {retryNeeded && !completed && (
                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-yellow-500/80 border border-sidebar-background shadow-md" />
                          )}
                        </div>
                        {!collapsed && (
                          <span className="flex-1 tracking-wider truncate text-xs">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup className="px-2 mt-1">
          {!collapsed && (
            <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/40 px-4 mb-2">
              {language === "en" ? "TOOLS" : "FERRAMENTAS"}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-4 py-2 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200 border-l-2 border-transparent"
                      activeClassName="text-sidebar-primary border-l-2 border-sidebar-primary"
                    >
                      <item.icon className="w-4 h-4 shrink-0 opacity-70" />
                      {!collapsed && <span className="tracking-wider text-xs">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Manager Tools Section - only for store-manager and team-leader */}
        {(userRole === "store-manager" || userRole === "team-leader") && managerTools.length > 0 && (
          <SidebarGroup className="px-2 mt-1">
            {!collapsed && (
              <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/40 px-4 mb-2">
                {language === "en" ? "MANAGEMENT" : "GESTÃO"}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {managerTools.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="group flex items-center gap-3 px-4 py-2 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200 border-l-2 border-transparent"
                        activeClassName="text-sidebar-primary border-l-2 border-sidebar-primary"
                      >
                        <div className="relative">
                          <item.icon className="w-4 h-4 shrink-0 opacity-70" />
                          {/* Team count badge */}
                          {item.id === "my-team" && getTeamMembersBelow50Percent() > 0 && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sidebar-primary/70 flex items-center justify-center text-[9px] font-semibold text-sidebar-background">
                              {Math.min(getTeamMembersBelow50Percent(), 9)}
                            </div>
                          )}
                        </div>
                        {!collapsed && <span className="tracking-wider text-xs flex-1">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Admin Section - only for store-manager and hr */}
        {(userRole === "store-manager" || userRole === "hr") && (
          <SidebarGroup className="px-2 mt-1">
            {!collapsed && (
              <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/40 px-4 mb-2">
                {language === "en" ? "ADMIN" : "ADMIN"}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/academy/admin/employees"
                      end
                      className="flex items-center gap-3 px-4 py-2 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200 border-l-2 border-transparent"
                      activeClassName="text-sidebar-primary border-l-2 border-sidebar-primary"
                    >
                      <Users className="w-4 h-4 shrink-0 opacity-70" />
                      {!collapsed && (
                        <span className="tracking-wider text-xs">
                          {language === "en" ? "TEAM MANAGEMENT" : "GESTÃO DE EQUIPA"}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="bg-sidebar-background border-t border-sidebar-border p-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200 group"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 shrink-0" />
          ) : (
            <Moon className="w-4 h-4 shrink-0" />
          )}
          {!collapsed && (
            <span className="tracking-wider text-xs">
              {theme === "dark" ? (language === "en" ? "LIGHT" : "CLARO") : (language === "en" ? "DARK" : "ESCURO")}
            </span>
          )}
        </button>

        {/* Language Selector */}
        {!collapsed && (
          <div className="flex items-center justify-center gap-0.5 px-4 py-2">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 border ${
                language === "en"
                  ? "text-sidebar-primary border-sidebar-primary bg-transparent"
                  : "text-sidebar-foreground/40 hover:text-sidebar-foreground/60 border-sidebar-foreground/20"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("pt")}
              className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 border ${
                language === "pt"
                  ? "text-sidebar-primary border-sidebar-primary bg-transparent"
                  : "text-sidebar-foreground/40 hover:text-sidebar-foreground/60 border-sidebar-foreground/20"
              }`}
            >
              PT
            </button>
          </div>
        )}

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200"
        >
          <Home className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="tracking-wider text-xs">{language === "en" ? "HOME" : "PÁGINA INICIAL"}</span>}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="tracking-wider text-xs">{t.academy.layout.signOut}</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
