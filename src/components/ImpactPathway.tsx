import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  HeartPulse,
  Scale,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { impactPathway } from "../data/storytelling";
import { EASE, viewportOnce } from "../lib/motion";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  Health: HeartPulse,
  Education: GraduationCap,
  Livelihoods: Briefcase,
  Leadership: Scale,
};

export function ImpactPathway() {
  const nodes = impactPathway.nodes;
  const outcome = impactPathway.outcome;

  return (
    <section className="bg-sand-100 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={impactPathway.eyebrow}
          title={impactPathway.headline}
          lead={impactPathway.lead}
        />

        <div className="relative mt-20">
          {/* Connecting line — desktop */}
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-7 hidden h-px bg-forest-900/15 lg:block"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-8 right-8 top-7 hidden h-px origin-left bg-clay-500 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.8, ease: EASE }}
          />
          {/* Connecting line — mobile (vertical) */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-7 top-4 w-px bg-forest-900/15 lg:hidden"
          />

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-4">
            {nodes.map((node, i) => {
              const Icon = icons[node.label] ?? Sprout;
              return (
                <Reveal key={node.label} delay={i * 0.12} y={24}>
                  <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                    <motion.span
                      className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-forest-900/15 bg-ivory text-forest-800 shadow-[0_2px_0_0_rgba(185,138,51,0.35)]"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </motion.span>
                    <div>
                      <h3 className="font-display text-xl text-forest-950">{node.label}</h3>
                      <p className="mt-1 text-sm text-charcoal/60">{node.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Destination — resilient communities */}
            <Reveal delay={0.5} y={24}>
              <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                <motion.span
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gold-500 text-forest-950 shadow-[0_10px_24px_-10px_rgba(185,138,51,0.9)]"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <Sprout className="h-6 w-6" aria-hidden="true" />
                </motion.span>
                <div>
                  <h3 className="font-display text-xl text-clay-700">{outcome.label}</h3>
                  <p className="mt-1 text-sm text-charcoal/60">{outcome.text}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}