import { ModuleLayout, ContentBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { FileText, Image, Video, BookOpen, Download, ExternalLink } from "lucide-react";
import douroImg from "@/assets/douro-valley.jpg";
import { toast } from "sonner";
import jsPDF from "jspdf";

const iconMap = [FileText, FileText, FileText, Image, Video, BookOpen, FileText, Image];

// Pre-defined local URLs for uploaded docs, and placeholders for the rest
const downloadUrls: Record<string, string | null> = {
  // EN titles
  "Brand Book / Dossier": "/downloads/DOSSIER_FINAL-v2.pdf",
  "The 100's Concept": "/downloads/100s_conceito_final.pdf",
  "Summary: What is The 100's": "generate-pdf-resumo",
  "Product Photography": null,
  "Training Videos": null,
  "Tasting Guide": null,
  "FAQ Document": "generate-pdf-faq",
  "Store Visual Standards": null,
  // PT titles
  "O Conceito The 100's": "/downloads/100s_conceito_final.pdf",
  "Resumo: O que é o The 100's": "generate-pdf-resumo",
  "Fotografia de Produtos": null,
  "Vídeos de Formação": null,
  "Guia de Prova": null,
  "Documento de FAQ": "generate-pdf-faq",
  "Padrões Visuais da Loja": null,
};

const ModuleResources = () => {
  const { t, language } = useLanguage();

  // Categorized resources
  const resourcesByCategory = {
    documents: [
      { title: language === "pt" ? "Dossier da Marca" : "Brand Book", desc: language === "pt" ? "Livro da marca com guidelines completos" : "Brand guidelines and visual standards" },
      { title: language === "pt" ? "O Conceito The 100's" : "The 100's Concept", desc: language === "pt" ? "Documento completo do conceito" : "Complete concept documentation" },
      { title: language === "pt" ? "FAQ - Perguntas Frequentes" : "FAQ Document", desc: language === "pt" ? "Respostas às perguntas mais comuns" : "Answers to frequently asked questions" },
    ],
    guides: [
      { title: language === "pt" ? "Guia de Prova" : "Tasting Guide", desc: language === "pt" ? "Como conduzir provas sensoriais" : "How to conduct tastings" },
      { title: language === "pt" ? "Padrões da Loja" : "Store Standards", desc: language === "pt" ? "Normas visuais e operacionais" : "Visual and operational standards" },
      { title: language === "pt" ? "Técnicas de Venda" : "Sales Techniques", desc: language === "pt" ? "Como fazer upsell e técnicas de persuasão" : "Upselling and persuasion techniques" },
    ],
    tools: [
      { title: language === "pt" ? "Catálogo de Produtos" : "Product Catalogue", desc: language === "pt" ? "Todos os produtos e variantes" : "All products and variants" },
      { title: language === "pt" ? "Lista de Preços" : "Price List", desc: language === "pt" ? "Preços atualizados e margens" : "Current pricing and margins" },
      { title: language === "pt" ? "Modelos de Checklist" : "Checklist Templates", desc: language === "pt" ? "Templates para operações diárias" : "Daily operations templates" },
    ],
  };

  const generatePremiumPDF = (type: "faq" | "resumo") => {
    toast.info(language === "pt" ? "A gerar documento PDF premium..." : "Generating premium PDF document...", { duration: 3000 });
    
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w = doc.internal.pageSize.getWidth();
      const h = doc.internal.pageSize.getHeight();

      // Dark Background
      doc.setFillColor(15, 13, 11);
      doc.rect(0, 0, w, h, "F");

      // Gold Border
      doc.setDrawColor(180, 140, 60);
      doc.setLineWidth(0.5);
      doc.rect(10, 10, w - 20, h - 20);

      // Header
      doc.setTextColor(180, 140, 60);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("The 100's Academy", w / 2, 30, { align: "center" });

      const isFAQ = type === "faq";
      const title = isFAQ ? "FAQ - Perguntas Frequentes" : "Resumo: O que é o The 100's?";
      
      const contentFAQ = `1. O que é a The 100's?
A The 100's não é apenas uma loja de vinhos. É um espaço imersivo que transforma a herança do Vinho do Porto numa "Cápsula de Memória". Vendemos tempo, legado e história engarrafados em 100ml.

2. Porquê o formato de 100ml?
É o tamanho ideal para uma lembrança premium e é "Travel-friendly" (pode ser levado na bagagem de cabine).

3. O que é o "Conceito de Segunda Vida"?
Uma vez consumido o vinho, a embalagem pode ser reutilizada como peça de decoração (suporte para velas, difusor, porta-joias).

4. Que tipos de vinho vendem?
Vinho do Porto Tawny, Branco e também Azeite premium.

5. Quais são as categorias de idade disponíveis?
Young / Ruby Essentials, 10 Anos (Signature), 50 Anos (The Icon), 100 Anos (The Hundred).

6. O cliente pode provar antes de comprar?
Sim. As provas são uma verdadeira jornada sensorial.`;

      const contentResumo = `O Conceito
A The 100's é uma loja sensorial e imersiva, destinada a turistas e viajantes, focada na venda de souvenirs que representam a geografia local.

Ponto de Partida
O conceito baseia-se no TEMPO. "É no tempo que se revela o verdadeiro valor."

O Produto
É um souvenir. É Vinho do Porto (cerca de 400 anos de história) engarrafado em 100ml.

Narrativa de Marca: A Memory Capsule
O propósito da marca é transformar o tempo em algo tangível e eterno.

Narrativa de Loja
Desenvolve-se através de um conjunto de sensações: Descoberta, Tempo, Singularidade, Hedonismo, Memória.

Mensagem à entrada da loja:
"Leave your time behind. You're entering a time capsule."`;

      const content = isFAQ ? contentFAQ : contentResumo;

      doc.text(title, w / 2, 45, { align: "center" });
      
      doc.setDrawColor(180, 140, 60);
      doc.setLineWidth(0.2);
      doc.line(w / 2 - 30, 50, w / 2 + 30, 50);

      doc.setFontSize(11);
      doc.setTextColor(200, 190, 180);
      
      const splitText = doc.splitTextToSize(content, w - 40);
      let y = 65;
      
      splitText.forEach((line: string) => {
        if (y > h - 30) {
          doc.addPage();
          doc.setFillColor(15, 13, 11);
          doc.rect(0, 0, w, h, "F");
          doc.setDrawColor(180, 140, 60);
          doc.setLineWidth(0.5);
          doc.rect(10, 10, w - 20, h - 20);
          y = 30;
        }
        
        if (line.match(/^[0-9]\.|^O Conceito|^Ponto de|^O Produto|^Narrativa|^Mensagem/)) {
          doc.setTextColor(180, 140, 60);
          doc.setFont("helvetica", "bold");
          y += 4;
        } else {
          doc.setTextColor(200, 190, 180);
          doc.setFont("helvetica", "normal");
        }
        
        doc.text(line, 20, y);
        y += 7;
      });

      doc.setTextColor(100, 90, 80);
      doc.setFontSize(8);
      doc.text("The 100's Academy - Premium Internal Resources", w / 2, h - 15, { align: "center" });

      doc.save(`The100s_${type.toUpperCase()}.pdf`);
    } catch (e) {
      toast.error("Failed to generate PDF.");
    }
  };

  const handleDownload = (title: string) => {
    if (title === "Fotografia de Produtos" || title === "Product Photography") {
      window.location.href = "/academy/module/products";
      return;
    }

    const url = downloadUrls[title];
    if (url === "generate-pdf-faq") return generatePremiumPDF("faq");
    if (url === "generate-pdf-resumo") return generatePremiumPDF("resumo");
    
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
      hideCompletion
      moduleId="resources"
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

      <VideoBlock
        title="Recursos e Ferramentas"
        description="Materiais de apoio e referência rápida."
        duration="4:30"
        poster={douroImg}
      />

      {/* Documentos / Documents Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-light text-foreground/90 mb-4 flex items-center gap-3">
            <FileText className="w-4 h-4 text-primary" />
            {language === "pt" ? "Documentos" : "Documents"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourcesByCategory.documents.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.05}>
                <div
                  onClick={() => handleDownload(r.title)}
                  className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                      <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-light text-foreground/90">{r.title}</h3>
                      <p className="text-xs text-muted-foreground/60 mt-1">{r.desc}</p>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Guias / Guides Section */}
        <div>
          <h2 className="text-lg font-light text-foreground/90 mb-4 flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-primary" />
            {language === "pt" ? "Guias" : "Guides"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourcesByCategory.guides.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.05}>
                <div
                  onClick={() => handleDownload(r.title)}
                  className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                      <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-light text-foreground/90">{r.title}</h3>
                      <p className="text-xs text-muted-foreground/60 mt-1">{r.desc}</p>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Ferramentas / Tools Section */}
        <div>
          <h2 className="text-lg font-light text-foreground/90 mb-4 flex items-center gap-3">
            <FileText className="w-4 h-4 text-primary" />
            {language === "pt" ? "Ferramentas" : "Tools"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourcesByCategory.tools.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.05}>
                <div
                  onClick={() => handleDownload(r.title)}
                  className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                      <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-light text-foreground/90">{r.title}</h3>
                      <p className="text-xs text-muted-foreground/60 mt-1">{r.desc}</p>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <ContentBlock>
        <p className="text-muted-foreground/50 text-sm italic">
          {t.academy.resources.internalUseNote}
        </p>
      </ContentBlock>

      <ModuleQuizGate
        moduleId="resources"
        questions={[
          { question: "Onde encontrar os materiais de referência rápida?", options: ["No email pessoal", "Na plataforma Academy e em loja (materiais impressos)", "No Google", "Não existem materiais"], correctIndex: 1 },
          { question: "O que é o Cheat Sheet do The 100's?", options: ["Uma cábula para exames", "Guia de referência rápida com informações essenciais de produto e venda", "Um documento financeiro", "Uma lista de preços"], correctIndex: 1 },
          { question: "Para que servem os downloads disponíveis na plataforma?", options: ["Entretenimento", "Consulta rápida de plantas, FAQs e documentos operacionais", "Decoração", "Uso pessoal"], correctIndex: 1 },
          { question: "Como aceder à plataforma de formação fora da loja?", options: ["Não é possível", "Via browser em qualquer dispositivo com credenciais", "Apenas no computador da loja", "Precisa de VPN"], correctIndex: 1 },
          { question: "Que tipo de recursos estão disponíveis na plataforma?", options: ["Apenas vídeos", "Vídeos, documentos, quizzes, glossários e simuladores", "Apenas PDFs", "Apenas textos"], correctIndex: 1 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleResources;
