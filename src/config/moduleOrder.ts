// ── Module ordering and navigation mapping ──

export const MODULE_ORDER = [
  { id: "story", navKey: "story" },
  { id: "philosophy", navKey: "philosophy" },
  { id: "products", navKey: "products" },
  { id: "gift", navKey: "gift" },
  { id: "store", navKey: "store" },
  { id: "brand-voice", navKey: "brandVoice" },
  { id: "customer-experience", navKey: "customerExperience" },
  { id: "client-profiles", navKey: "clientProfiles" },
  { id: "client-culture", navKey: "clientCulture" },
  { id: "tasting-guide", navKey: "tastingGuide" },
  { id: "glossary", navKey: "glossary" },
  { id: "cross-selling", navKey: "crossSelling" },
  { id: "conduct", navKey: "conduct" },
  { id: "transport-rules", navKey: "transportRules" },
  { id: "vocabulary", navKey: "vocabulary" },
  { id: "digital-systems", navKey: "digitalSystems" },
  { id: "uv-printer", navKey: "uvPrinter" },
  { id: "visual-merchandising", navKey: "visualMerchandising" },
  { id: "business-model", navKey: "businessModel" },
  { id: "leadership", navKey: "leadership" },
  { id: "team-ops", navKey: "teamOps" },
  { id: "certification", navKey: "certification" },
] as const;

export function getNextModule(currentId: string): { id: string; navKey: string } | null {
  const idx = MODULE_ORDER.findIndex(m => m.id === currentId);
  if (idx === -1 || idx === MODULE_ORDER.length - 1) return null;
  return MODULE_ORDER[idx + 1];
}
