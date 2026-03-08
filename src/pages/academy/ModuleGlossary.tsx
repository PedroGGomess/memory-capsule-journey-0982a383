import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import heroImg from "@/assets/douro-valley.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const ModuleGlossary = () => {
  const { language } = useLanguage();
  return (
    <ModuleLayout
      moduleId="glossary"
      moduleNumber={10}
      title={language === "pt" ? "Glossário do Vinho" : "Wine Glossary"}
      subtitle={language === "pt" ? "Os termos essenciais do Vinho do Porto." : "Essential Port wine terms."}
      heroImage={heroImg}
    >
      <ContentBlock title="Termos Essenciais">
        <p>Em breve...</p>
      </ContentBlock>
    </ModuleLayout>
  );
};
export default ModuleGlossary;