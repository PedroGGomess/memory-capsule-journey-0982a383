import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AcademySidebar } from "@/components/AcademySidebar";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { AcademyBreadcrumb } from "@/components/AcademyBreadcrumb";
import { AcademyOnboardingTour } from "@/components/AcademyOnboardingTour";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const AcademyLayout = () => {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <ProgressProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full bg-background">
          <AcademySidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <header className="border-b border-border/10 bg-card backdrop-blur-sm sticky top-0 z-50">
              <div className="h-14 flex items-center px-4 gap-2 md:gap-4">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <div className="ml-2 md:ml-4 h-px flex-1 bg-border/10" />
                <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 ml-2 md:ml-4 truncate">
                  {t.academy.layout.internalPlatform}
                </p>
              </div>
              <AcademyBreadcrumb />
            </header>
            <main className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
        <AcademyOnboardingTour />
      </SidebarProvider>
    </ProgressProvider>
  );
};

export default AcademyLayout;
