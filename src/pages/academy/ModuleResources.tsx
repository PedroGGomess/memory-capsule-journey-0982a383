import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import ScrollReveal from "@/components/ScrollReveal";
import { FileText, Image, Video, BookOpen } from "lucide-react";
import douroImg from "@/assets/douro-valley.jpg";

const resources = [
  { icon: FileText, title: "Brand Book", desc: "Complete brand guidelines, tone of voice, and visual identity", type: "PDF" },
  { icon: Image, title: "Product Photography", desc: "High-resolution images of the collection for reference", type: "Gallery" },
  { icon: Video, title: "Training Videos", desc: "Visual guides on product knowledge and storytelling", type: "Video" },
  { icon: BookOpen, title: "Tasting Guide", desc: "How to conduct and narrate a tasting experience", type: "PDF" },
  { icon: FileText, title: "FAQ Document", desc: "Answers to the most common visitor questions", type: "PDF" },
  { icon: Image, title: "Store Visual Standards", desc: "How the store should look and feel at all times", type: "Gallery" },
];

const ModuleResources = () => (
  <ModuleLayout
    moduleId="resources"
    moduleNumber={10}
    title="Resources"
    subtitle="Your brand library — everything you need in one place."
    heroImage={douroImg}
  >
    <ContentBlock>
      <p>Access all brand materials, training documents, and visual assets here. This library will be updated regularly.</p>
    </ContentBlock>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((r, i) => (
        <ScrollReveal key={r.title} delay={i * 0.05}>
          <div className="border border-border/30 p-6 hover:border-primary/30 transition-all duration-500 group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-secondary/50 rounded-sm group-hover:bg-primary/10 transition-colors">
                <r.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
      ))}
    </div>

    <ContentBlock>
      <p className="text-muted-foreground/50 text-sm italic">
        Resources are for internal use only. Please do not distribute outside the organization.
      </p>
    </ContentBlock>
  </ModuleLayout>
);

export default ModuleResources;
