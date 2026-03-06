import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useProgress } from "@/contexts/ProgressContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from "@/components/ui/sidebar";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, FolderOpen, Award, Sparkles, LayoutDashboard, Check
} from "lucide-react";

const modules = [
  { title: "Dashboard", url: "/academy", icon: LayoutDashboard, id: "" },
  { title: "The Story", url: "/academy/module/story", icon: BookOpen, id: "story" },
  { title: "Philosophy", url: "/academy/module/philosophy", icon: Compass, id: "philosophy" },
  { title: "Products", url: "/academy/module/products", icon: Wine, id: "products" },
  { title: "Gift Concept", url: "/academy/module/gift", icon: Gift, id: "gift" },
  { title: "Store Experience", url: "/academy/module/store", icon: Store, id: "store" },
  { title: "Brand Voice", url: "/academy/module/brand-voice", icon: MessageCircle, id: "brand-voice" },
  { title: "Customer Experience", url: "/academy/module/customer-experience", icon: Users, id: "customer-experience" },
  { title: "Ask the Team", url: "/academy/module/ask-team", icon: Sparkles, id: "ask-team" },
  { title: "Resources", url: "/academy/module/resources", icon: FolderOpen, id: "resources" },
  { title: "Certification", url: "/academy/module/certification", icon: Award, id: "certification" },
];

export function AcademySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isModuleCompleted } = useProgress();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/30">
      <SidebarContent className="bg-card pt-6">
        {/* Brand */}
        {!collapsed && (
          <div className="px-6 pb-6 border-b border-border/20">
            <p className="text-lg font-light text-gold-gradient">The 100's</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1">Academy</p>
          </div>
        )}

        <SidebarGroup defaultOpen>
          {!collapsed && <SidebarGroupLabel className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 px-6">Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((item) => (
                <SidebarMenuItem key={item.title}>
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
    </Sidebar>
  );
}
