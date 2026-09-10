import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { approach } from "../data/storytelling";
import { EASE, viewportOnce } from "../lib/motion";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Approach() {
  const steps = approach.steps;

  return (
    <section id="approach" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={approach.eyebrow} title={approach.headline} lead={approach.lead} />

        {/* LISTEN → EQUIP → CONNECT → TRANSFORM */}
        <div className="relative mt-16">
          {/* Base channel */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-forest-900/10 lg:block"
          />
          {/* Animated flow */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-7 hidden h-px origin-left bg-gold-500 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.6, ease: EASE }}
          />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.12} className="relative">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-forest-900/15 bg-ivory font-display text-lg text-clay-600 shadow-[0_2px_0_0_rgba(185,138,51,0.35)]">
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-5 top-4 hidden w-5 text-gold-500/80 lg:block"
                  />
                )}
                <h3 className="mt-5 font-display text-2xl text-forest-950">{step.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Values as a flowing pathway */}
        <Reveal className="mt-20 border-t border-forest-900/10 pt-10">
          <p className="eyebrow text-clay-600">Guiding principles in practice</p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
            {approach.values.map((value, i) => (
              <li key={value} className="group flex items-center gap-3">
                <span className="text-sm font-bold tracking-wide text-forest-800">{value}</span>
                {i < approach.values.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-gold-500 transition-transform duration-300 group-hover:scale-125"
                  />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}