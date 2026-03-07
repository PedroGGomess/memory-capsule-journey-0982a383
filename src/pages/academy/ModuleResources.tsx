import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { FileText, Image, Video, BookOpen } from "lucide-react";
import douroImg from "@/assets/douro-valley.jpg";

const iconMap = [FileText, Image, Video, BookOpen, FileText, Image];

const ModuleResources = () => {
  const { t, language } = useLanguage();

  return (
    <ModuleLayout
      moduleId="resources"
      moduleNumber={10}
      title={language === "pt" ? "Recursos" : "Resources"}
      subtitle={language === "pt" ? "A tua biblioteca da marca — tudo o que precisas num só lugar." : "Your brand library — everything you need in one place."}
      heroImage={douroImg}
    >
      <ContentBlock>
        <p>{language === "pt"
          ? "Acede a todos os materiais da marca, documentos de formação e recursos visuais aqui. Esta biblioteca será atualizada regularmente."
          : "Access all brand materials, training documents, and visual assets here. This library will be updated regularly."
        }</p>
      </ContentBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {t.academy.resources.items.map((r, i) => {
          const Icon = iconMap[i] ?? FileText;
          return (
            <ScrollReveal key={r.title} delay={i * 0.05}>
              <div className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-secondary/50 rounded-sm group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-light text-foreground/90">{r.title}</h3>
                      <span className="text-[9px] tracking-wider uppercase text-muted-foreground/50 border border-border/30 px-1.5 py-0.5">{r.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/60">{r.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ContentBlock>
        <p className="text-muted-foreground/50 text-sm italic">
          {t.academy.resources.internalUseNote}
        </p>
      </ContentBlock>
    </ModuleLayout>
  );
};

export default ModuleResources;
