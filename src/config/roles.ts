// ── Role definitions and module access mapping ──

export const EMPLOYEE_ROLES = [
  { value: "store-employee", label: "Funcionário de Loja", labelEn: "Store Employee" },
  { value: "team-leader", label: "Team Leader", labelEn: "Team Leader" },
  { value: "store-manager", label: "Gerente de Loja", labelEn: "Store Manager" },
  { value: "internal-it", label: "IT Interno", labelEn: "Internal IT" },
  { value: "hr", label: "Recursos Humanos", labelEn: "Human Resources" },
  { value: "marketing", label: "Marketing", labelEn: "Marketing" },
] as const;

export type EmployeeRole = (typeof EMPLOYEE_ROLES)[number]["value"];

// Base modules everyone sees
const BASE_MODULES = ["story", "philosophy", "products", "brand-voice"];

// Role → modules mapping
const ROLE_MODULES: Record<EmployeeRole, string[]> = {
  "store-employee": [
    ...BASE_MODULES,
    "gift", "store", "customer-experience",
    "tasting-guide", "glossary", "cross-selling",
    "client-profiles", "client-culture", "conduct", "transport-rules", "vocabulary",
    "digital-systems", "uv-printer",
    "certification",
  ],
  "team-leader": [
    ...BASE_MODULES,
    "gift", "store", "customer-experience",
    "tasting-guide", "glossary", "cross-selling",
    "business-model", "visual-merchandising",
    "client-profiles", "client-culture", "conduct", "transport-rules", "vocabulary",
    "digital-systems", "uv-printer",
    "team-ops",
    "certification",
  ],
  "store-manager": [
    ...BASE_MODULES,
    "gift", "store", "customer-experience",
    "business-model", "tasting-guide", "glossary",
    "cross-selling", "visual-merchandising",
    "client-profiles", "client-culture", "conduct", "transport-rules", "vocabulary",
    "digital-systems", "uv-printer",
    "leadership", "team-ops",
    "certification",
  ],
  "internal-it": [
    ...BASE_MODULES,
    "business-model",
    "digital-systems",
    "certification",
  ],
  "hr": [
    ...BASE_MODULES,
    "customer-experience", "business-model",
    "client-profiles", "client-culture", "conduct",
    "certification",
  ],
  "marketing": [
    ...BASE_MODULES,
    "gift", "customer-experience",
    "cross-selling", "visual-merchandising",
    "business-model",
    "client-profiles", "client-culture", "vocabulary",
    "certification",
  ],
};

export function getModulesForRole(role?: EmployeeRole | string): string[] {
  if (!role || !(role in ROLE_MODULES)) {
    // Default: all modules (backwards compat)
    return [
      "story", "philosophy", "products", "gift", "store",
      "brand-voice", "customer-experience", "business-model",
      "tasting-guide", "glossary", "cross-selling", "visual-merchandising",
      "client-profiles", "client-culture", "conduct", "transport-rules", "vocabulary",
      "digital-systems", "uv-printer",
      "certification",
    ];
  }
  return ROLE_MODULES[role as EmployeeRole];
}

export function getRoleLabel(role?: string, lang: "pt" | "en" = "pt"): string {
  const found = EMPLOYEE_ROLES.find((r) => r.value === role);
  if (!found) return role || "—";
  return lang === "en" ? found.labelEn : found.label;
}
