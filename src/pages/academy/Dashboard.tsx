import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Progress } from "@/components/ui/progress";
import ScrollReveal from "@/components/ScrollReveal";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, Sparkles, FolderOpen, Award, ArrowRight, Check, Bot
} from "lucide-react";

const modules = [
  { id: "story", num: 1, title: "The Story of The 100's", desc: "Origin, concept and heritage", icon: BookOpen, path: "/academy/module/story" },
  { id: "philosophy", num: 2, title: "Brand Philosophy", desc: "The five pillars of the brand", icon: Compass, path: "/academy/module/philosophy" },
  { id: "products", num: 3, title: "The Products", desc: "Wine collection and categories", icon: Wine, path: "/academy/module/products" },
  { id: "gift", num: 4, title: "Premium Gift Concept", desc: "Packaging, materials and presentation", icon: Gift, path: "/academy/module/gift" },
  { id: "store", num: 5, title: "The Store Experience", desc: "Emotional journey and atmosphere", icon: Store, path: "/academy/module/store" },
  { id: "brand-voice", num: 6, title: "Brand Voice", desc: "How to communicate the brand", icon: MessageCircle, path: "/academy/module/brand-voice" },
  { id: "customer-experience", num: 7, title: "Customer Experience", desc: "Storytelling and visitor interaction", icon: Users, path: "/academy/module/customer-experience" },
  { id: "ask-team", num: 8, title: "Ask the Team", desc: "Questions and internal support", icon: Sparkles, path: "/academy/module/ask-team" },
  { id: "resources", num: 9, title: "Resources", desc: "Brand book, photos and materials", icon: FolderOpen, path: "/academy/module/resources" },
  { id: "ai-assistant", num: 10, title: "AI Assistant", desc: "Ask questions, get instant answers", icon: Bot, path: "/academy/module/ai-assistant" },
  { id: "certification", num: 11, title: "Final Certification", desc: "Complete your onboarding", icon: Award, path: "/academy/module/certification" },
];

const Dashboard = () => {
  const { getCompletionPercentage, isModuleCompleted, completedModules, totalModules } = useProgress();
  const pct = getCompletionPercentage();

  return (
    <div className="section-padding py-16 max-w-6xl mx-auto">
      {/* Welcome */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-4">Welcome to</p>
          <h1 className="text-4xl md:text-6xl font-light text-gold-gradient mb-4">The 100's Academy</h1>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
            Your journey into the world of time, memory and legacy begins here.
          </p>
        </div>
      </ScrollReveal>

      {/* Progress */}
      <ScrollReveal delay={0.2}>
        <div className="border border-border/30 p-8 mb-16">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground font-light">Your onboarding progress</p>
            <p className="text-2xl font-light text-primary">{pct}%</p>
          </div>
          <Progress value={pct} className="h-1 bg-secondary" />
          <p className="text-xs text-muted-foreground/60 mt-3">
            {completedModules} of {totalModules} modules completed
          </p>
        </div>
      </ScrollReveal>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m, i) => {
          const done = isModuleCompleted(m.id);
          return (
            <ScrollReveal key={m.id} delay={0.1 + i * 0.05}>
              <Link to={m.path}>
                <motion.div
                  className={`group border p-6 flex items-start gap-5 transition-all duration-500 hover:border-primary/40 ${
                    done ? "border-primary/20 bg-primary/5" : "border-border/30 hover:bg-card"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className={`p-3 rounded-sm ${done ? "bg-primary/10" : "bg-secondary/50"}`}>
                    <m.icon className={`w-5 h-5 ${done ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
                        Module {m.num}
                      </span>
                      {done && <Check className="w-3.5 h-3.5 text-primary/60" />}
                    </div>
                    <h3 className="text-base font-light text-foreground/90 mb-1">{m.title}</h3>
                    <p className="text-xs text-muted-foreground/60">{m.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors mt-1 shrink-0" />
                </motion.div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Culture quote */}
      <ScrollReveal delay={0.3}>
        <div className="text-center mt-20 py-12 border-t border-border/20">
          <p className="text-xl md:text-2xl font-light text-foreground/50 italic max-w-2xl mx-auto">
            "Time reveals true value."
          </p>
          <p className="text-xs text-muted-foreground/40 mt-4 tracking-[0.2em] uppercase">The 100's</p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Dashboard;
