import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** Tone on a dark background uses ivory/light colors. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const onLight = tone === "light";
  const alignCenter = align === "center";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`max-w-2xl ${alignCenter ? "mx-auto text-center" : ""} ${className}`}
    >
      <motion.p
        variants={fadeUp}
        className={`eyebrow flex items-center gap-3 ${
          onLight ? "text-gold-400" : "text-clay-600"
        } ${alignCenter ? "justify-center" : ""}`}
      >
        <span
          aria-hidden="true"
          className={`h-px w-8 ${onLight ? "bg-gold-400" : "bg-clay-600"}`}
        />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className={`mt-4 font-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem] ${
          onLight ? "text-ivory" : "text-forest-950"
        }`}
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            onLight ? "text-forest-100/85" : "text-charcoal/70"
          }`}
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  );
}