// ── Role definitions and module access ──

export type UserRole = 
  | "store-employee" 
  | "team-leader" 
  | "store-manager" 
  | "marketing" 
  | "hr" 
  | "it" 
  | "admin";

// New 14-module structure
const BASE_MODULES = [
  "brand-story",
  "product-knowledge",
  "store-experience",
  "glossary-vocab",
  "sales-funnel",
  "objection-handling",
  "closing-consultative",
  "tourist-psychology",
  "client-types",
  "client-culture",
  "transport-logistics",
  "digital-operations",
  "final-certification",
];

const LEADERSHIP_MODULES = [
  ...BASE_MODULES,
  "business-leadership",
];

const ROLE_MODULES: Record<string, string[]> = {
  "store-employee": BASE_MODULES,
  "team-leader": LEADERSHIP_MODULES,
  "store-manager": LEADERSHIP_MODULES,
  "marketing": LEADERSHIP_MODULES,
  "hr": LEADERSHIP_MODULES,
  "it": LEADERSHIP_MODULES,
  "admin": LEADERSHIP_MODULES,
};

export function getModulesForRole(role?: string): string[] {
  if (!role) return BASE_MODULES;
  return ROLE_MODULES[role] || BASE_MODULES;
}

export function getRoleLabel(role?: string, lang: "pt" | "en" = "pt"): string {
  const labels: Record<string, { pt: string; en: string }> = {
    "store-employee": { pt: "Colaborador", en: "Store Employee" },
    "team-leader": { pt: "Team Leader", en: "Team Leader" },
    "store-manager": { pt: "Store Manager", en: "Store Manager" },
    "marketing": { pt: "Marketing", en: "Marketing" },
    "hr": { pt: "Recursos Humanos", en: "Human Resources" },
    "it": { pt: "IT", en: "IT" },
    "admin": { pt: "Administrador", en: "Administrator" },
  };
  return labels[role || ""]?.[lang] || (lang === "pt" ? "Colaborador" : "Employee");
}
