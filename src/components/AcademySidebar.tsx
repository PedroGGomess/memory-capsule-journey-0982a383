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
  Users, FolderOpen, Award, Sparkles, LayoutDashboard, Check, Bot, BarChart3, LogOut, Home, BookMarked, Target, Image
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
    <Sidebar collapsible="icon" className="border-r border-border/10">
      <SidebarContent className="bg-gradient-to-b from-card via-card to-background pt-0">
        {/* Brand Header */}
        <div className="px-5 py-6 border-b border-border/10 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
              <img src={logoImg} alt="The 100's" className="w-11 h-11 object-contain relative z-10" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-base font-medium text-gold-gradient tracking-wide">The 100's</p>
                <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground/40 mt-0.5">Academy</p>
              </div>
            )}
          </div>
          {!collapsed && userRole && (
            <div className="mt-3 relative z-10">
              <span className="text-[9px] tracking-[0.2em] uppercase text-primary/50 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
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
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-light text-muted-foreground/70 hover:text-foreground rounded-md hover:bg-primary/5 transition-all duration-300"
                  activeClassName="text-foreground bg-primary/8 shadow-[inset_0_0_20px_-12px_hsl(var(--primary)/0.3)]"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="tracking-wide">Dashboard</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Core Modules */}
        <SidebarGroup className="px-2">
          {!collapsed && (
            <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground/30 px-4 mb-1">
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
                        className="group flex items-center gap-3 px-4 py-2 text-sm font-light text-muted-foreground/60 hover:text-foreground rounded-md hover:bg-primary/5 transition-all duration-300"
                        activeClassName="text-foreground bg-primary/8 shadow-[inset_0_0_20px_-12px_hsl(var(--primary)/0.3)]"
                      >
                        {!collapsed ? (
                          <span className={`
                            w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 transition-all duration-300
                            ${completed 
                              ? 'bg-primary/20 text-primary shadow-[0_0_8px_-2px_hsl(var(--primary)/0.4)]' 
                              : 'bg-muted/50 text-muted-foreground/40 group-hover:bg-muted group-hover:text-muted-foreground/60'}
                          `}>
                            {completed ? <Check className="w-3 h-3" /> : item.num}
                          </span>
                        ) : (
                          <item.icon className="w-4 h-4 shrink-0" />
                        )}
                        {!collapsed && (
                          <span className="flex-1 tracking-wide truncate">{item.title}</span>
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
            <SidebarGroupLabel className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground/30 px-4 mb-1">
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
                      className="flex items-center gap-3 px-4 py-2 text-sm font-light text-muted-foreground/60 hover:text-foreground rounded-md hover:bg-primary/5 transition-all duration-300"
                      activeClassName="text-foreground bg-primary/8 shadow-[inset_0_0_20px_-12px_hsl(var(--primary)/0.3)]"
                    >
                      <item.icon className="w-4 h-4 shrink-0 opacity-60" />
                      {!collapsed && <span className="tracking-wide">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-card/80 backdrop-blur-sm border-t border-border/10 p-3">
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
          {!collapsed && <span className="tracking-wide">Página Inicial</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-light text-muted-foreground/50 hover:text-foreground hover:bg-primary/5 transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors duration-300" />
          {!collapsed && <span className="tracking-wide">{t.academy.layout.signOut}</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
