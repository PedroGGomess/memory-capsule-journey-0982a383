// ── New Module Structure: 4 Areas, 14 Modules ──

export interface ModuleInfo {
  id: string;
  navKey: string;
  area: "brand" | "commercial" | "client" | "operations";
  areaNumber: number;
}

// Area 1: Marca & Produto
// Area 2: Técnica Comercial
// Area 3: Conhecer o Cliente
// Area 4: Operações & Liderança

export const MODULE_ORDER: ModuleInfo[] = [
  // ── Area 1: Marca & Produto ──
  { id: "brand-story", navKey: "brandStory", area: "brand", areaNumber: 1 },
  { id: "product-knowledge", navKey: "productKnowledge", area: "brand", areaNumber: 1 },
  { id: "store-experience", navKey: "storeExperience", area: "brand", areaNumber: 1 },
  { id: "glossary-vocab", navKey: "glossaryVocab", area: "brand", areaNumber: 1 },

  // ── Area 2: Técnica Comercial ──
  { id: "sales-funnel", navKey: "salesFunnel", area: "commercial", areaNumber: 2 },
  { id: "objection-handling", navKey: "objectionHandling", area: "commercial", areaNumber: 2 },
  { id: "closing-consultative", navKey: "closingConsultative", area: "commercial", areaNumber: 2 },

  // ── Area 3: Conhecer o Cliente ──
  { id: "tourist-psychology", navKey: "touristPsychology", area: "client", areaNumber: 3 },
  { id: "client-types", navKey: "clientTypes", area: "client", areaNumber: 3 },
  { id: "client-culture", navKey: "clientCulture", area: "client", areaNumber: 3 },

  // ── Area 4: Operações & Liderança ──
  { id: "transport-logistics", navKey: "transportLogistics", area: "operations", areaNumber: 4 },
  { id: "digital-operations", navKey: "digitalOperations", area: "operations", areaNumber: 4 },
  { id: "business-leadership", navKey: "businessLeadership", area: "operations", areaNumber: 4 },
  { id: "final-certification", navKey: "finalCertification", area: "operations", areaNumber: 4 },
];

export const AREA_LABELS = {
  brand: { pt: "Marca & Produto", en: "Brand & Product" },
  commercial: { pt: "Técnica Comercial", en: "Sales Technique" },
  client: { pt: "Conhecer o Cliente", en: "Know Your Client" },
  operations: { pt: "Operações & Liderança", en: "Operations & Leadership" },
};

export function getNextModule(currentId: string): ModuleInfo | null {
  const idx = MODULE_ORDER.findIndex(m => m.id === currentId);
  if (idx === -1 || idx === MODULE_ORDER.length - 1) return null;
  return MODULE_ORDER[idx + 1];
}

export function getModuleNumber(moduleId: string): number {
  const idx = MODULE_ORDER.findIndex(m => m.id === moduleId);
  return idx === -1 ? 0 : idx + 1;
}

export function getModulesByArea(area: ModuleInfo["area"]): ModuleInfo[] {
  return MODULE_ORDER.filter(m => m.area === area);
}
