import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useProgress } from "@/contexts/ProgressContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from "@/components/ui/sidebar";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, FolderOpen, Award, Sparkles, LayoutDashboard, Check, Bot, BarChart3, LogOut, Home
} from "lucide-react";
import logoImg from "@/assets/Logo.png";

export function AcademySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isModuleCompleted } = useProgress();
  const { logout } = useAcademyAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const coreModules = [
    { title: t.academy.nav.story, url: "/academy/module/story", icon: BookOpen, id: "story", num: 1 },
    { title: t.academy.nav.philosophy, url: "/academy/module/philosophy", icon: Compass, id: "philosophy", num: 2 },
    { title: t.academy.nav.products, url: "/academy/module/products", icon: Wine, id: "products", num: 3 },
    { title: t.academy.nav.gift, url: "/academy/module/gift", icon: Gift, id: "gift", num: 4 },
    { title: t.academy.nav.store, url: "/academy/module/store", icon: Store, id: "store", num: 5 },
    { title: t.academy.nav.brandVoice, url: "/academy/module/brand-voice", icon: MessageCircle, id: "brand-voice", num: 6 },
    { title: t.academy.nav.customerExperience, url: "/academy/module/customer-experience", icon: Users, id: "customer-experience", num: 7 },
    { title: t.academy.nav.businessModel, url: "/academy/module/business-model", icon: BarChart3, id: "business-model", num: 8 },
    { title: t.academy.nav.certification, url: "/academy/module/certification", icon: Award, id: "certification", num: 9 },
  ];

  const tools = [
    { title: t.academy.nav.askTeam, url: "/academy/module/ask-team", icon: Sparkles, id: "ask-team" },
    { title: t.academy.nav.resources, url: "/academy/module/resources", icon: FolderOpen, id: "resources" },
    { title: t.academy.nav.aiAssistant, url: "/academy/module/ai-assistant", icon: Bot, id: "ai-assistant" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/academy/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/10">
      <SidebarContent className="bg-gradient-to-b from-card via-card to-background pt-0">
        {/* Brand Header */}
        <div className="px-5 py-6 border-b border-border/10 relative overflow-hidden">
          {/* Ambient glow */}
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
