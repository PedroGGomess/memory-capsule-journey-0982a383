import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useProgress } from "@/contexts/ProgressContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRoleLabel } from "@/config/roles";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from "@/components/ui/sidebar";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, FolderOpen, Award, Sparkles, LayoutDashboard, Check, Bot, BarChart3, LogOut, Home, BookMarked, Target, Image,
  Heart, Shield, Plane, Languages, Monitor, Printer
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
  { id: "certification", icon: Award, navKey: "certification" as const },
];

export function AcademySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isModuleCompleted, allowedModules, userRole } = useProgress();
  const { logout } = useAcademyAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const coreModules = ALL_CORE_MODULES
    .filter((m) => allowedModules.includes(m.id))
    .map((m, i) => ({
      ...m,
      num: i + 1,
      title: t.academy.nav[m.navKey] || m.id,
      url: `/academy/module/${m.id}`,
    }));

  const tools = [
    { title: t.academy.nav.askTeam, url: "/academy/module/ask-team", icon: Sparkles, id: "ask-team" },
    { title: t.academy.nav.resources, url: "/academy/module/resources", icon: FolderOpen, id: "resources" },
    { title: t.academy.nav.aiAssistant, url: "/academy/module/ai-assistant", icon: Bot, id: "ai-assistant" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/academy/login");
  };

  const roleLabel = getRoleLabel(userRole, language as "pt" | "en");

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/30 bg-sidebar">
      <SidebarContent className="bg-sidebar pt-0">
        {/* Brand Header - Clean, elegant */}
        <div className="px-5 py-6 border-b border-sidebar-border/40 relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <img src={logoImg} alt="The 100's" className="w-11 h-11 object-contain" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-base font-light text-sidebar-foreground tracking-widest">The 100's</p>
                <p className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/50 mt-0.5">Academy</p>
              </div>
            )}
          </div>
          {!collapsed && userRole && (
            <div className="mt-3 relative z-10">
              <span className="text-[9px] tracking-[0.2em] uppercase text-sidebar-primary bg-sidebar-primary/15 px-2.5 py-1 rounded-sm border border-sidebar-primary/30">
                {roleLabel}
              </span>
            </div>
          )}
        </div>

        {/* Dashboard Link */}
        <div className="px-2 pt-4 pb-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/academy"
                  end
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-sm hover:bg-sidebar-accent/30 transition-all duration-300 border-l-2 border-transparent"
                  activeClassName="text-sidebar-primary bg-sidebar-accent/40 border-l-2 border-sidebar-primary"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="tracking-wider">Dashboard</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Core Modules */}
        <SidebarGroup className="px-2">
          {!collapsed && (
            <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/40 px-4 mb-1">
              {t.academy.layout.navigation}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {coreModules.map((item) => {
                const completed = isModuleCompleted(item.id);
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="group flex items-center gap-3 px-4 py-2 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-sm hover:bg-sidebar-accent/30 transition-all duration-300 border-l-2 border-transparent"
                        activeClassName="text-sidebar-primary bg-sidebar-accent/40 border-l-2 border-sidebar-primary"
                      >
                        {!collapsed ? (
                          <span className={`
                            w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 transition-all duration-300
                            ${completed
                              ? 'bg-sidebar-primary/25 text-sidebar-primary'
                              : 'bg-sidebar-accent/20 text-sidebar-foreground/40 group-hover:bg-sidebar-primary/20 group-hover:text-sidebar-primary'}
                          `}>
                            {completed ? <Check className="w-3 h-3" /> : item.num}
                          </span>
                        ) : (
                          <item.icon className="w-4 h-4 shrink-0" />
                        )}
                        {!collapsed && (
                          <span className="flex-1 tracking-wider truncate">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup className="px-2 mt-1">
          {!collapsed && (
            <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-sidebar-foreground/40 px-4 mb-1">
              Ferramentas
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
                      className="flex items-center gap-3 px-4 py-2 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-sm hover:bg-sidebar-accent/30 transition-all duration-300 border-l-2 border-transparent"
                      activeClassName="text-sidebar-primary bg-sidebar-accent/40 border-l-2 border-sidebar-primary"
                    >
                      <item.icon className="w-4 h-4 shrink-0 opacity-70" />
                      {!collapsed && <span className="tracking-wider">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar border-t border-sidebar-border/40 p-3">
        {!collapsed && (
          <div className="flex items-center justify-center gap-0.5 px-4 py-2 mb-1">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 rounded-sm text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                language === "en"
                  ? "text-sidebar-primary bg-sidebar-primary/20 border border-sidebar-primary/40"
                  : "text-sidebar-foreground/40 hover:text-sidebar-foreground/60 hover:bg-sidebar-accent/30"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("pt")}
              className={`px-3 py-1.5 rounded-sm text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                language === "pt"
                  ? "text-sidebar-primary bg-sidebar-primary/20 border border-sidebar-primary/40"
                  : "text-sidebar-foreground/40 hover:text-sidebar-foreground/60 hover:bg-sidebar-accent/30"
              }`}
            >
              PT
            </button>
          </div>
        )}
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-sm px-4 py-2.5 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-all duration-300 group"
        >
          <Home className="w-4 h-4 shrink-0 group-hover:text-sidebar-primary transition-colors duration-300" />
          {!collapsed && <span className="tracking-wider">Página Inicial</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-sm px-4 py-2.5 text-sm font-light text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:text-sidebar-primary transition-colors duration-300" />
          {!collapsed && <span className="tracking-wider">{t.academy.layout.signOut}</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
