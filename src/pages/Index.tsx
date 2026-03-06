import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import MemorySection from "@/components/MemorySection";
import CollectionSection from "@/components/CollectionSection";

import heroDropImg from "@/assets/hero-drop.jpg";
import hourglassImg from "@/assets/hourglass.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";
import hedonismImg from "@/assets/hedonism.jpg";

const Index = () => {
  const [started, setStarted] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);

  const handleBegin = () => {
    setStarted(true);
    setTimeout(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="bg-background min-h-screen">
      <HeroSection onBegin={handleBegin} />

      <AnimatePresence>
        {started && (
          <motion.div
            ref={journeyRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Divider */}
            <div className="flex items-center justify-center py-16">
              <div className="h-px w-24 bg-primary/20" />
              <div className="mx-4 h-1.5 w-1.5 rounded-full bg-primary/40" />
              <div className="h-px w-24 bg-primary/20" />
            </div>

            {/* Section 2 — Discovery */}
            <StorySection
              image={heroDropImg}
              title="Discovery"
              imagePosition="right"
              lines={[
                "The first moment of time is discovery.",
                "In every journey there is a moment when curiosity meets history.",
                "In The 100's, that moment is revealed drop by drop.",
              ]}
            />

            {/* Section 3 — Time */}
            <StorySection
              image={hourglassImg}
              title="Time"
              imagePosition="left"
              lines={[
                "Time is the substance that gives meaning.",
                "Here it pauses between memory and promise.",
                "Each bottle carries centuries of patience.",
              ]}
            />

            {/* Section 4 — Singularity */}
            <StorySection
              image={bottleImg}
              title="Singularity"
              imagePosition="right"
              lines={[
                "Every liquid holds its own story.",
                "In silence, time transforms wine into something rare.",
                "Each drop becomes a fragment of history waiting to be discovered.",
              ]}
            />

            {/* Section 5 — Hedonism */}
            <StorySection
              image={hedonismImg}
              title="Hedonism"
              imagePosition="full"
              lines={[
                "Time dissolves into light, color and experience.",
                "Wine becomes pleasure.",
                "Pleasure becomes memory.",
              ]}
            />

            {/* Section 6 — Memory */}
            <MemorySection />

            {/* Section 7 — Collection */}
            <CollectionSection />

            {/* Footer */}
            <footer className="py-20 text-center section-padding border-t border-border/30">
              <p className="text-2xl md:text-3xl font-light text-gold-gradient mb-4">The 100's</p>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
                A Memory Capsule Experience
              </p>
              <Link
                to="/academy"
                className="inline-block border border-primary/30 px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold"
              >
                Enter the Academy
              </Link>
              <div className="mt-8 h-px w-16 mx-auto bg-primary/20" />
              <p className="mt-8 text-xs text-muted-foreground/50">
                © {new Date().getFullYear()} The 100's. All rights reserved.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
