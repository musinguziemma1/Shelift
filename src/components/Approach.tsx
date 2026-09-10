import { motion } from "framer-motion";
import { Handshake, Lightbulb, Scale, ShieldCheck, Users } from "lucide-react";
import { approach } from "../data/storytelling";
import { fadeUpItem, staggerContainer, viewportOnce } from "../lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

const principleDetails = [
  {
    icon: Users,
    text: "Priorities are set with — never for — girls, women, households, and local leaders.",
  },
  {
    icon: ShieldCheck,
    text: "Clear targets, open books, and honest reporting to communities and partners.",
  },
  {
    icon: Lightbulb,
    text: "Practical, low-cost approaches that evolve with what the evidence shows works.",
  },
  {
    icon: Handshake,
    text: "Government, communities, NGOs, and the private sector moving together.",
  },
  {
    icon: Scale,
    text: "Those furthest from opportunity come first — no one left at the margins.",
  },
] as const;

export function Approach() {
  const steps = approach.steps;
  const principles = approach.values.map((value, i) => ({
    value,
    ...principleDetails[i],
  }));

  return (
    <section id="approach" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={approach.eyebrow} title={approach.headline} lead={approach.lead} />

        {/* LISTEN → EQUIP → CONNECT → TRANSFORM */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              variants={fadeUpItem}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-forest-900/10 bg-white p-7 shadow-[0_1px_2px_rgba(11,26,18,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:border-clay-500/30 hover:shadow-[0_20px_45px_-20px_rgba(168,76,40,0.35)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-clay-500 via-clay-400 to-gold-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-forest-950 font-display text-base text-gold-300 ring-4 ring-forest-950/5 transition-transform duration-500 group-hover:scale-105">
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className="eyebrow text-forest-900/30"
                >
                  Step {i + 1} / {steps.length}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[1.65rem] leading-none text-forest-950">
                {step.label}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">{step.text}</p>
              <span
                aria-hidden="true"
                className="mt-6 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-clay-600"
              >
                {i < steps.length - 1 ? (
                  <>
                    <span className="h-px w-8 bg-clay-500/50 transition-all duration-500 group-hover:w-12 group-hover:bg-clay-500" />
                    Next
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    Lasting change
                  </>
                )}
              </span>
            </motion.li>
          ))}
        </motion.ol>

        {/* Guiding principles in practice — five premium cards */}
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-forest-950 p-8 sm:p-10 lg:mt-20 lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-forest-700/50 blur-[100px]" />
            <div className="absolute -bottom-36 -left-16 h-72 w-72 rounded-full bg-clay-700/25 blur-[100px]" />
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent sm:inset-x-14" />
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-gold-400">Guiding principles in practice</p>
              <h3 className="mt-3 max-w-xl font-display text-3xl leading-tight text-ivory sm:text-4xl">
                Five commitments shape every programme we run.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-forest-100/75">
              From the Strategic Plan 2025–2027 — the standards our teams, partners, and communities hold us to.
            </p>
          </div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-5"
          >
            {principles.map((principle) => (
              <motion.li
                key={principle.value}
                variants={fadeUpItem}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-ivory/12 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/45 hover:bg-white/[0.08]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-clay-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300 transition-transform duration-500 group-hover:scale-110">
                  <principle.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h4 className="mt-5 font-display text-xl leading-snug text-ivory">
                  {principle.value}
                </h4>
                <p className="mt-2.5 flex-1 text-[0.83rem] leading-relaxed text-forest-100/70">
                  {principle.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}