import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export interface ProductItem {
  name: string;
  desc: string;
  materials: string;
  photos: string[];
}

interface ProductGalleryProps {
  products: ProductItem[];
  viewLabel: string;
  collectionLabel: string;
  photoLabel: string;
  photosLabel: string;
}

export function ProductGallery({
  products,
  viewLabel,
  collectionLabel,
  photoLabel,
  photosLabel,
}: ProductGalleryProps) {
  const [selected, setSelected] = useState<ProductItem | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const openGallery = (product: ProductItem) => {
    setSelected(product);
    setPhotoIndex(0);
    setDirection(0);
  };

  const closeGallery = () => {
    setSelected(null);
    setPhotoIndex(0);
  };

  const navigate = (dir: number) => {
    if (!selected) return;
    setDirection(dir);
    setPhotoIndex((prev) => (prev + dir + selected.photos.length) % selected.photos.length);
  };

  const goTo = (i: number) => {
    setDirection(i > photoIndex ? 1 : -1);
    setPhotoIndex(i);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <ScrollReveal key={product.name}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative border border-border/30 overflow-hidden cursor-pointer group"
              onClick={() => openGallery(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openGallery(product)}
              aria-label={`${viewLabel} ${product.name}`}
            >
              {/* Cover photo */}
              <div className="relative h-52 overflow-hidden bg-secondary/20">
                <img
                  src={product.photos[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Camera icon on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-background/70 backdrop-blur-sm border border-primary/40 rounded-full p-2">
                    <Camera className="w-4 h-4 text-primary" />
                  </div>
                </motion.div>

                {/* Photo count badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] tracking-[0.2em] text-primary/80 bg-background/70 backdrop-blur-sm px-2 py-1 border border-primary/20">
                    {product.photos.length}&nbsp;{product.photos.length === 1 ? photoLabel : photosLabel}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="text-base font-light text-primary mb-1">{product.name}</h4>
                <p className="text-xs text-foreground/60 font-light mb-2">{product.desc}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40">
                  {product.materials}
                </p>
              </div>

              {/* Hover border highlight */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 transition-all duration-500 pointer-events-none" />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Premium Modal Gallery ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeGallery}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(24px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-background/90"
            />

            {/* Modal panel */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 48 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 48 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 w-full max-w-3xl mx-4 select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className="text-[10px] tracking-[0.35em] uppercase text-primary/50 mb-1">
                    {collectionLabel}
                  </p>
                  <h3 className="text-2xl font-light text-gold-gradient">{selected.name}</h3>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  onClick={closeGallery}
                  className="p-2 border border-border/30 text-foreground/50 hover:text-primary hover:border-primary/40 transition-all duration-300"
                  aria-label="Close gallery"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Main photo */}
              <div className="relative overflow-hidden bg-secondary/10 border border-border/20">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={`${selected.name}-${photoIndex}`}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ x: d > 0 ? "30%" : "-30%", opacity: 0, scale: 1.04 }),
                      center: { x: "0%", opacity: 1, scale: 1 },
                      exit: (d: number) => ({ x: d > 0 ? "-30%" : "30%", opacity: 0, scale: 0.96 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    src={selected.photos[photoIndex]}
                    alt={`${selected.name} — ${photoIndex + 1}`}
                    className="w-full h-[52vh] object-cover"
                  />
                </AnimatePresence>

                {/* Left / Right arrows */}
                {selected.photos.length > 1 && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => navigate(-1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-sm border border-border/30 p-2.5 hover:border-primary/50 hover:text-primary transition-all duration-300"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => navigate(1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-sm border border-border/30 p-2.5 hover:border-primary/50 hover:text-primary transition-all duration-300"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </>
                )}

                {/* Dot indicators */}
                {selected.photos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selected.photos.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all duration-400 ${
                          i === photoIndex
                            ? "bg-primary w-5"
                            : "bg-foreground/25 w-1.5 hover:bg-foreground/50"
                        }`}
                        aria-label={`Go to photo ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {selected.photos.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex gap-2 mt-3"
                >
                  {selected.photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`flex-1 h-16 overflow-hidden border transition-all duration-350 ${
                        i === photoIndex
                          ? "border-primary/60"
                          : "border-border/20 opacity-45 hover:opacity-80"
                      }`}
                      aria-label={`Thumbnail ${i + 1}`}
                    >
                      <img
                        src={photo}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Caption row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-4 flex items-start justify-between gap-4"
              >
                <p className="text-sm text-foreground/55 font-light flex-1">{selected.desc}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 text-right shrink-0">
                  {selected.materials}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
