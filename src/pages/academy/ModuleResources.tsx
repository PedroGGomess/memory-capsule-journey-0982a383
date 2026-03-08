import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { FileText, Image, Video, BookOpen, Download, ExternalLink } from "lucide-react";
import douroImg from "@/assets/douro-valley.jpg";
import { toast } from "sonner";

const iconMap = [FileText, Image, Video, BookOpen, FileText, Image];

// Placeholder download URLs — replace with real Supabase Storage URLs when files are uploaded
const downloadUrls: Record<string, string | null> = {
  "Brand Book": null,
  "Product Photography": null,
  "Training Videos": null,
  "Tasting Guide": null,
  "FAQ Document": null,
  "Store Visual Standards": null,
  // PT titles
  "Fotografia de Produtos": null,
  "Vídeos de Formação": null,
  "Guia de Prova": null,
  "Documento de FAQ": null,
  "Padrões Visuais da Loja": null,
};

const ModuleResources = () => {
  const { t, language } = useLanguage();

  const handleDownload = (title: string) => {
    const url = downloadUrls[title];
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      toast.info(
        language === "pt"
          ? "Ficheiro ainda não disponível. Será adicionado em breve."
          : "File not yet available. It will be added soon."
      );
    }
  };

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
          const hasFile = !!downloadUrls[r.title];
          return (
            <ScrollReveal key={r.title} delay={i * 0.05}>
              <div
                onClick={() => handleDownload(r.title)}
                className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500 group cursor-pointer"
              >
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
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {hasFile ? (
                      <Download className="w-4 h-4 text-primary" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-muted-foreground/40" />
                    )}
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
