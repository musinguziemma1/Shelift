import type { Variants } from "framer-motion";

/** Signature easing used across the site — calm, intentional deceleration. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/* Reveal variants -------------------------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/* Image reveal — clip-path wipe, editorial feel ---------------------- */

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 24 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

/* Shared viewport config for whileInView ----------------------------- */

export const viewportOnce = { once: true, margin: "-80px" } as const;