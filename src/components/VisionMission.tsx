import { motion } from "framer-motion";
import { ArrowRight, Compass, Eye } from "lucide-react";
import { visionMission } from "../data/content";
import { fadeUpItem, staggerContainer, viewportOnce } from "../lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const panels = [
  {
    id: "vision",
    icon: Eye,
    eyebrow: "Our Vision",
    title: "Where we are headed",
    quote: visionMission.vision,
    points: ["Equitable access", "Resilient communities", "Girls, women & households"],
  },
  {
    id: "mission",
    icon: Compass,
    eyebrow: "Our Mission",
    title: "How we get there",
    quote: visionMission.mission,
    points: ["Holistic health", "Quality education", "Economic opportunity"],
  },
] as const;

export function VisionMission() {
  return (
    <section id="vision" className="relative overflow-hidden bg-forest-950 py-24 lg:py-32">
      {/* Ambient decoration — soft glows + fine grain, no giant letters */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-forest-700/40 blur-[120px]" />
        <div className="absolute -bottom-48 -left-32 h-[26rem] w-[26rem] rounded-full bg-clay-700/20 blur-[110px]" />
        <div className="absolute -bottom-40 -right-24 h-[24rem] w-[24rem] rounded-full bg-gold-500/10 blur-[110px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          align="center"
          tone="light"
          eyebrow="Why we exist"
          title="A clear vision. A practical mission."
          lead="Taken directly from the SHELIFT Strategic Plan 2025–2027 — the standard every programme, partnership, and decision is measured against."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2"
        >
          {panels.map((panel) => (
            <motion.article
              key={panel.id}
              variants={fadeUpItem}
              aria-labelledby={`${panel.id}-label`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ivory/12 bg-white/[0.045] p-8 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/40 hover:bg-white/[0.06] sm:p-10"
            >
              {/* Top gold accent that grows on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-400 via-gold-300 to-clay-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300">
                  <panel.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-ivory/10 transition-colors duration-500 group-hover:text-gold-400/25"
                >
                  {panel.id === "vision" ? "01" : "02"}
                </span>
              </div>

              <p id={`${panel.id}-label`} className="eyebrow mt-7 text-gold-400">
                {panel.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ivory/90 sm:text-[1.7rem]">
                {panel.title}
              </h3>

              <blockquote className="relative mt-5 flex-1">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-1 -top-5 select-none font-display text-6xl leading-none text-gold-400/25"
                >
                  &ldquo;
                </span>
                <p className="relative font-display text-[1.35rem] leading-[1.45] text-ivory sm:text-[1.5rem] sm:leading-[1.4]">
                  {panel.quote}
                </p>
              </blockquote>

              <ul aria-label={`${panel.eyebrow} focus areas`} className="mt-8 flex flex-wrap gap-2 border-t border-ivory/10 pt-6">
                {panel.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-ivory/15 bg-ivory/[0.06] px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-forest-100/85"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 text-center text-sm text-forest-100/70 sm:text-base"
        >
          This is how purpose becomes practice.{" "}
          <a
            href="#what-we-do"
            className="link-underline inline-flex items-center gap-1.5 font-bold text-gold-300 hover:text-gold-400"
          >
            See our four pathways
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </motion.p>
      </div>
    </section>
  );
}