import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import heroImg from "@/assets/store-interior.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const ModuleTastingGuide = () => {
  const { language } = useLanguage();
  return (
    <ModuleLayout
      moduleId="tasting-guide"
      moduleNumber={9}
      title={language === "pt" ? "Guia de Prova" : "Tasting Guide"}
      subtitle={language === "pt" ? "O ritual de apresentar The 100's." : "The ritual of presenting The 100's."}
      heroImage={heroImg}
    >
      <ContentBlock title={language === "pt" ? "Ritual de Vendas" : "Sales Ritual"}>
        <p>Em breve...</p>
      </ContentBlock>
    </ModuleLayout>
  );
};
export default ModuleTastingGuide;