import { useState } from "react";
import { ModuleLayout, ContentBlock, ExpandableSection } from "@/components/ModuleComponents";
import ScrollReveal from "@/components/ScrollReveal";
import heroDropImg from "@/assets/hero-drop.jpg";
import { useGymAccess } from "@/contexts/GymAccessContext";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const ModuleAskTeam = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("product");
  const [submitted, setSubmitted] = useState(false);
  const { submitQuestion } = useGymAccess();
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
      toast.success("Question submitted to the team!");
    }
  };

  return (
    <ModuleLayout
      moduleId="ask-team"
      moduleNumber={9}
      title="Ask the Team"
      subtitle="Questions, support and internal communication."
      heroImage={heroDropImg}
    >
      <ContentBlock title="We're Here to Help">
        <p>Have a question about the brand, a product, or a customer situation? This is your space to ask. No question is too small.</p>
      </ContentBlock>

      <ExpandableSection title="Frequently Asked Questions">
        <p className="font-medium text-foreground/80 mb-2">What if a customer asks about the grape varieties?</p>
        <p>Port wine is typically made from a blend of indigenous Portuguese grape varieties including Touriga Nacional, Touriga Franca, Tinta Roriz, Tinta Barroca and Tinto Cão.</p>
      </ExpandableSection>

      <ExpandableSection title="How do I describe the aging process?">
        <p>Tawny Port ages in wooden barrels (pipes), gradually developing its characteristic amber color and complex flavors. The contact with wood and controlled oxidation creates layers of caramel, nuts, dried fruits and spice.</p>
      </ExpandableSection>

      <ExpandableSection title="Can I offer tastings?">
        <p>Yes, tastings are a core part of the experience. Always present them as a journey, not just a sample. Guide the visitor through the colors, aromas and flavors, connecting each element to the brand story.</p>
      </ExpandableSection>

      <ScrollReveal>
        <div className="border border-border/30 p-8 space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60">Submit a Question</p>
          {!submitted ? (
            <>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-secondary/30 border border-border/30 text-foreground p-4 text-sm font-light focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-secondary/30 border border-border/30 text-foreground/70 p-4 text-sm font-light focus:outline-none focus:border-primary/30"
              >
                <option value="product">Product Question</option>
                <option value="customer">Customer Situation</option>
                <option value="brand">Brand Guidelines</option>
                <option value="store">Store Experience</option>
                <option value="other">Other</option>
              </select>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Your question..."
                className="w-full min-h-[120px] bg-secondary/30 border border-border/30 text-foreground p-4 text-sm font-light resize-none focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
              />
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !question.trim()}
                className="border border-primary/30 px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary transition-all duration-500 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Submit question
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-primary text-sm mb-2">Question submitted successfully.</p>
              <p className="text-muted-foreground text-xs">The team will get back to you shortly.</p>
              <button
                onClick={() => { setSubmitted(false); setName(""); setQuestion(""); setCategory("product"); }}
                className="mt-4 text-xs text-muted-foreground/50 hover:text-muted-foreground underline"
              >
                Submit another question
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>
    </ModuleLayout>
  );
};

export default ModuleAskTeam;
