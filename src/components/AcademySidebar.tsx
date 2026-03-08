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

  const modules = [
    { title: t.academy.nav.dashboard, url: "/academy", icon: LayoutDashboard, id: "" },
    { title: t.academy.nav.story, url: "/academy/module/story", icon: BookOpen, id: "story" },
    { title: t.academy.nav.philosophy, url: "/academy/module/philosophy", icon: Compass, id: "philosophy" },
    { title: t.academy.nav.products, url: "/academy/module/products", icon: Wine, id: "products" },
    { title: t.academy.nav.gift, url: "/academy/module/gift", icon: Gift, id: "gift" },
    { title: t.academy.nav.store, url: "/academy/module/store", icon: Store, id: "store" },
    { title: t.academy.nav.brandVoice, url: "/academy/module/brand-voice", icon: MessageCircle, id: "brand-voice" },
    { title: t.academy.nav.customerExperience, url: "/academy/module/customer-experience", icon: Users, id: "customer-experience" },
    { title: t.academy.nav.businessModel, url: "/academy/module/business-model", icon: BarChart3, id: "business-model" },
    { title: t.academy.nav.askTeam, url: "/academy/module/ask-team", icon: Sparkles, id: "ask-team" },
    { title: t.academy.nav.resources, url: "/academy/module/resources", icon: FolderOpen, id: "resources" },
    { title: t.academy.nav.aiAssistant, url: "/academy/module/ai-assistant", icon: Bot, id: "ai-assistant" },
    { title: t.academy.nav.certification, url: "/academy/module/certification", icon: Award, id: "certification" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/academy/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/30">
      <SidebarContent className="bg-card pt-6">
        {!collapsed && (
          <div className="px-6 pb-6 border-b border-border/20">
            <p className="text-lg font-light text-gold-gradient">The 100's</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1">{t.academy.layout.academy}</p>
          </div>
        )}

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 px-6">{t.academy.layout.navigation}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-6 py-2.5 text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
                      activeClassName="text-primary border-r-2 border-primary bg-primary/5"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                      {!collapsed && item.id && isModuleCompleted(item.id) && (
                        <Check className="w-3.5 h-3.5 text-primary/60" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-card border-t border-border/20 p-3">
        {!collapsed && (
          <div className="flex items-center gap-1 px-6 py-2 mb-1">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 text-[10px] tracking-[0.15em] uppercase transition-colors ${language === "en" ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"}`}
            >
              EN
            </button>
            <span className="text-muted-foreground/30 text-xs">|</span>
            <button
              onClick={() => setLanguage("pt")}
              className={`px-2 py-1 text-[10px] tracking-[0.15em] uppercase transition-colors ${language === "pt" ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"}`}
            >
              PT
            </button>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-6 py-2.5 text-sm font-light text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors duration-300" />
          {!collapsed && (
            <span className="tracking-wide">{t.academy.layout.signOut}</span>
          )}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
