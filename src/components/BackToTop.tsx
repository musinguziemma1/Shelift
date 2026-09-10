import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE } from "../lib/motion";

const SHOW_AFTER_PX = 640;

/**
 * Back-to-top button. Fades in once the visitor has scrolled past the hero,
 * uses smooth scrolling (auto for reduced-motion), and sits below the mobile
 * menu overlay in the stacking order.
 */
export function BackToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-forest-950 text-ivory shadow-[0_14px_34px_-12px_rgba(11,26,18,0.65)] ring-1 ring-ivory/15 transition-colors duration-300 hover:bg-clay-500 hover:ring-clay-400/40 sm:bottom-7 sm:right-7"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}