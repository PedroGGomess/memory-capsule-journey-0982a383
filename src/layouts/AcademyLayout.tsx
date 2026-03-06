import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AcademySidebar } from "@/components/AcademySidebar";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { AIAssistantBubble } from "@/components/AIAssistantBubble";

const AcademyLayout = () => {
  return (
    <ProgressProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AcademySidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <header className="h-14 flex items-center border-b border-border/20 px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="ml-4 h-px flex-1 bg-border/10" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 ml-4">
                Internal Platform
              </p>
            </header>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
        <AIAssistantBubble />
      </SidebarProvider>
    </ProgressProvider>
  );
};

export default AcademyLayout;
