import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChapterProps {
  title: string;
  lines: readonly string[];
  index: number;
}

const Chapter = ({ title, lines, index }: ChapterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center section-padding py-24 relative"
    >
      {/* Subtle chapter number */}
      <span className="absolute top-12 right-8 md:right-16 text-[8rem] font-light text-white/[0.03] select-none leading-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="max-w-3xl mx-auto text-center w-full">
        {/* Chapter label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs tracking-[0.5em] uppercase text-white/25 mb-10 font-light"
        >
          {title}
        </motion.p>

        {/* Lines */}
        <div className="space-y-5">
          {lines.map((line, li) => (
            <motion.p
              key={li}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.15 + li * 0.12,
              }}
              className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/80"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Chapter divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 + lines.length * 0.12 }}
          className="mt-16 h-px w-12 bg-white/10 mx-auto origin-left"
        />
      </div>
    </div>
  );
};

const TaglineSection = ({ tagline }: { tagline: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.4]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="min-h-screen flex flex-col items-center justify-center section-padding py-32 text-center relative"
    >
      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-16 h-px mb-16 origin-center"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 80% 65%), transparent)" }}
      />

      {/* Main tagline */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        className="text-3xl md:text-5xl lg:text-6xl font-light text-gold-gradient max-w-3xl mx-auto leading-tight"
      >
        {tagline}
      </motion.h2>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="w-16 h-px mt-16 origin-center"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43 80% 65%), transparent)" }}
      />
    </motion.div>
  );
};

const CinematicStorytellingSection = () => {
  const { t } = useLanguage();
  const { storytelling } = t;

  return (
    <section className="bg-black relative overflow-hidden">
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(43 72% 50%), transparent), radial-gradient(ellipse 60% 40% at 50% 100%, hsl(43 72% 50%), transparent)",
          }}
        />
      </div>

      {/* Chapters */}
      {storytelling.chapters.map((chapter, ci) => (
        <Chapter
          key={ci}
          title={chapter.title}
          lines={chapter.lines}
          index={ci}
        />
      ))}

      {/* Final tagline */}
      <TaglineSection tagline={storytelling.tagline} />
    </section>
  );
};

export default CinematicStorytellingSection;
