import { useState } from "react";
import { ModuleLayout, ContentBlock, ExpandableSection } from "@/components/ModuleComponents";
import ScrollReveal from "@/components/ScrollReveal";
import heroDropImg from "@/assets/hero-drop.jpg";
import { useGymAccess } from "@/contexts/GymAccessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const ModuleAskTeam = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("product");
  const [submitted, setSubmitted] = useState(false);
  const { submitQuestion } = useGymAccess();
  const { t, language } = useLanguage();
  const location = useLocation();
  const currentModule = location.pathname.split("/module/")[1] ?? "ask-team";

  const handleSubmit = () => {
    if (name.trim() && question.trim()) {
      submitQuestion({
        employeeName: name.trim(),
        question: question.trim(),
        module: category !== "other" ? category : currentModule,
      });
      setSubmitted(true);
      toast.success(language === "pt" ? "Pergunta enviada com sucesso!" : "Question submitted to the team!");
    }
  };

  return (
    <ModuleLayout
      moduleId="ask-team"
      moduleNumber={9}
      title={language === "pt" ? "Perguntar à Equipa" : "Ask the Team"}
      subtitle={language === "pt" ? "Perguntas, suporte e comunicação interna." : "Questions, support and internal communication."}
      heroImage={heroDropImg}
    >
      <ContentBlock title={language === "pt" ? "Estamos Aqui para Ajudar" : "We're Here to Help"}>
        <p>{language === "pt"
          ? "Tens uma pergunta sobre a marca, um produto ou uma situação com um cliente? Este é o teu espaço para perguntar. Não há perguntas demasiado pequenas."
          : "Have a question about the brand, a product, or a customer situation? This is your space to ask. No question is too small."
        }</p>
      </ContentBlock>

      <ExpandableSection title={language === "pt" ? "Perguntas Frequentes" : "Frequently Asked Questions"}>
        <p className="font-medium text-foreground/80 mb-2">
          {language === "pt"
            ? "O que fazer se um cliente perguntar sobre as castas?"
            : "What if a customer asks about the grape varieties?"
          }
        </p>
        <p>{language === "pt"
          ? "O Vinho do Porto é tipicamente produzido a partir de uma mistura de castas indígenas portuguesas, incluindo Touriga Nacional, Touriga Franca, Tinta Roriz, Tinta Barroca e Tinto Cão."
          : "Port wine is typically made from a blend of indigenous Portuguese grape varieties including Touriga Nacional, Touriga Franca, Tinta Roriz, Tinta Barroca and Tinto Cão."
        }</p>
      </ExpandableSection>

      <ExpandableSection title={language === "pt" ? "Como descrevo o processo de envelhecimento?" : "How do I describe the aging process?"}>
        <p>{language === "pt"
          ? "O Vinho do Porto Tawny envelhece em barris de madeira (pipas), desenvolvendo gradualmente a sua cor âmbar característica e sabores complexos. O contacto com a madeira e a oxidação controlada criam camadas de caramelo, frutos secos, frutas secas e especiarias."
          : "Tawny Port ages in wooden barrels (pipes), gradually developing its characteristic amber color and complex flavors. The contact with wood and controlled oxidation creates layers of caramel, nuts, dried fruits and spice."
        }</p>
      </ExpandableSection>

      <ExpandableSection title={language === "pt" ? "Posso oferecer provas?" : "Can I offer tastings?"}>
        <p>{language === "pt"
          ? "Sim, as provas são uma parte central da experiência. Apresenta-as sempre como uma jornada, não apenas uma amostra. Guia o visitante pelas cores, aromas e sabores, ligando cada elemento à história da marca."
          : "Yes, tastings are a core part of the experience. Always present them as a journey, not just a sample. Guide the visitor through the colors, aromas and flavors, connecting each element to the brand story."
        }</p>
      </ExpandableSection>

      <ScrollReveal>
        <div className="border border-border/30 p-8 space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60">{t.academy.askTeam.submitLabel}</p>
          {!submitted ? (
            <>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.academy.askTeam.namePlaceholder}
                className="w-full bg-secondary/30 border border-border/30 text-foreground p-4 text-sm font-light focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-secondary/30 border border-border/30 text-foreground/70 p-4 text-sm font-light focus:outline-none focus:border-primary/30"
              >
                <option value="product">{t.academy.askTeam.categoryProduct}</option>
                <option value="customer">{t.academy.askTeam.categoryCustomer}</option>
                <option value="brand">{t.academy.askTeam.categoryBrand}</option>
                <option value="store">{t.academy.askTeam.categoryStore}</option>
                <option value="other">{t.academy.askTeam.categoryOther}</option>
              </select>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder={t.academy.askTeam.questionPlaceholder}
                className="w-full min-h-[120px] bg-secondary/30 border border-border/30 text-foreground p-4 text-sm font-light resize-none focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
              />
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !question.trim()}
                className="border border-primary/30 px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary transition-all duration-500 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t.academy.askTeam.submitButton}
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-primary text-sm mb-2">{t.academy.askTeam.submittedSuccess}</p>
              <p className="text-muted-foreground text-xs">{t.academy.askTeam.submittedNote}</p>
              <button
                onClick={() => { setSubmitted(false); setName(""); setQuestion(""); setCategory("product"); }}
                className="mt-4 text-xs text-muted-foreground/50 hover:text-muted-foreground underline"
              >
                {t.academy.askTeam.submitAnother}
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>
    </ModuleLayout>
  );
};

export default ModuleAskTeam;
