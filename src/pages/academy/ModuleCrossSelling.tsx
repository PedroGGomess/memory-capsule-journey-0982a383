import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import heroImg from "@/assets/collection.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const ModuleCrossSelling = () => {
  const { language } = useLanguage();
  return (
    <ModuleLayout
      moduleId="cross-selling"
      moduleNumber={11}
      title="Cross-Selling"
      subtitle={language === "pt" ? "Como vender complementos naturais." : "How to sell natural add-ons."}
      heroImage={heroImg}
    >
      <ContentBlock title={language === "pt" ? "Arte do Cross-selling" : "The Art of Cross-selling"}>
        <p>Em breve...</p>
      </ContentBlock>
    </ModuleLayout>
  );
};
export default ModuleCrossSelling;