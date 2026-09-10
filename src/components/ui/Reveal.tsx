import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, viewportOnce } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to delay before animating. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
}

/**
 * Scroll-triggered fade + rise reveal. Respects prefers-reduced-motion:
 * when reduced motion is preferred, content simply appears in place.
 */
export function Reveal({ children, className = "", delay = 0, y = 28 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}