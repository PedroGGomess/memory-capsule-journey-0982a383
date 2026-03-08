import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import heroImg from "@/assets/store-interior.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const ModuleVisualMerchandising = () => {
  const { language } = useLanguage();
  return (
    <ModuleLayout
      moduleId="visual-merchandising"
      moduleNumber={12}
      title={language === "pt" ? "Padrões Visuais" : "Visual Standards"}
      subtitle={language === "pt" ? "A estética imaculada da loja." : "The immaculate store aesthetic."}
      heroImage={heroImg}
    >
      <ContentBlock title="Visual Merchandising">
        <p>Em breve...</p>
      </ContentBlock>
    </ModuleLayout>
  );
};
export default ModuleVisualMerchandising;