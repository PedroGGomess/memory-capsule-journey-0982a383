import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MODULE_ORDER } from "@/config/moduleOrder";
import { ChevronRight } from "lucide-react";

export function AcademyBreadcrumb() {
  const location = useLocation();
  const { t, language } = useLanguage();

  // Get the current module from the path
  const pathParts = location.pathname.split("/");
  const isModule = pathParts[3] === "module";
  const moduleId = pathParts[4];

  // Get the module name
  let currentPage = t.academy.nav.dashboard || "Dashboard";
  if (isModule && moduleId) {
    const moduleConfig = MODULE_ORDER.find(m => m.id === moduleId);
    if (moduleConfig) {
      currentPage = t.academy.nav[moduleConfig.navKey as keyof typeof t.academy.nav] || moduleId;
    }
  } else if (pathParts[3] === "profile") {
    currentPage = language === "en" ? "Profile" : "Perfil";
  } else if (pathParts[3] === "admin" && pathParts[4] === "employees") {
    currentPage = language === "en" ? "Team Management" : "Gestão de Equipa";
  }

  return (
    <nav className="flex items-center gap-2 text-[9px] tracking-[0.15em] uppercase text-foreground/50 px-4 py-3 border-b border-border/5 bg-card/30">
      <Link
        to="/academy"
        className="text-primary hover:text-primary/80 transition-colors"
      >
        {t.academy.nav.dashboard || "Dashboard"}
      </Link>
      {(isModule || location.pathname.split("/")[3]) && (
        <>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/60">{currentPage}</span>
        </>
      )}
    </nav>
  );
}
