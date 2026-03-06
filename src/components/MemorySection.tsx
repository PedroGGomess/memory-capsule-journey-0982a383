import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const MemorySection = () => {
  const [message, setMessage] = useState("");
  const [sealed, setSealed] = useState(false);

  const handleSeal = () => {
    if (message.trim()) {
      setSealed(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding py-32">
      <div className="max-w-2xl mx-auto text-center w-full">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-6">Memory</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-light text-gold-gradient mb-8">Memory</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="text-lg text-foreground/70 font-light mb-4">A visit should never disappear.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <p className="text-lg text-foreground/70 font-light mb-4">
            At The 100's, you can seal your moment in time.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <p className="text-lg text-foreground/70 font-light mb-12">
            Your journey becomes a message for the future.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <AnimatePresence mode="wait">
            {!sealed ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <p className="text-sm tracking-[0.2em] uppercase text-primary/50 mb-4">
                  What memory will you leave for the future?
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message to the future..."
                  className="w-full min-h-[140px] bg-secondary/50 border border-border text-foreground p-6 text-base font-light resize-none focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/40"
                />
                <button
                  onClick={handleSeal}
                  disabled={!message.trim()}
                  className="border border-primary/30 px-10 py-3 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Seal your memory
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="sealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="space-y-6"
              >
                <div className="inline-block border border-primary/30 px-12 py-10 glow-gold">
                  <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">
                    Memory Sealed
                  </p>
                  <p className="text-lg text-foreground/80 font-light italic">"{message}"</p>
                  <div className="mt-6 h-px w-16 mx-auto bg-primary/30" />
                  <p className="mt-4 text-xs text-muted-foreground">
                    Encapsulated in time — The 100's
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MemorySection;
