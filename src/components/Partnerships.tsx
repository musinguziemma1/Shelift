import { ArrowRight, ArrowUpRight, Building2, Factory, Globe2, GraduationCap, HandHeart, Landmark } from "lucide-react";
import { partnerships } from "../data/engage";
import { fadeUpItem, staggerContainer, viewportOnce } from "../lib/motion";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const categoryIcons = [Landmark, Factory, HandHeart, GraduationCap, Building2, Globe2] as const;

/**
 * Partnership section. Category rows are placeholders only — no partner
 * names or logos are invented.
 */
export function Partnerships() {
  return (
    <section aria-label="Partnerships" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        {/* Editorial header: heading left, invitation right */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={partnerships.eyebrow}
              title={partnerships.headline}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-charcoal/70 lg:ml-auto">
              {partnerships.lead}
            </p>
            <a
              href="#contact"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-clay-600 transition-colors hover:text-forest-900"
            >
              Become a partner
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* Partner categories — editorial index rows */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 border-b border-forest-900/10"
        >
          {partnerships.categories.map((category, i) => {
            const Icon = categoryIcons[i % categoryIcons.length];
            return (
              <motion.li key={category} variants={fadeUpItem} className="border-t border-forest-900/10">
                <div className="group flex items-center gap-4 py-5 transition-colors duration-300 hover:bg-white/70 sm:gap-6 sm:px-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-950/[0.05] text-forest-800 ring-1 ring-forest-900/10 transition-colors duration-300 group-hover:bg-forest-950 group-hover:text-gold-300">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl leading-snug text-forest-950 transition-colors duration-300 group-hover:text-clay-700 sm:text-2xl">
                      {category}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-charcoal/50 sm:text-[0.83rem]">
                      Partner logo space — awaiting approved artwork and link.
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden font-display text-sm italic text-forest-900/30 sm:block"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-forest-900/15 text-forest-800 transition-all duration-300 group-hover:border-clay-500 group-hover:bg-clay-500 group-hover:text-ivory"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Inviting logo-wall placeholder */}
        <Reveal delay={0.1} className="mt-8">
          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-forest-900/25 bg-sand-50 px-6 py-10 text-center sm:px-10">
            <p className="eyebrow text-clay-600">Your logo here</p>
            <p className="max-w-xl text-sm leading-relaxed text-charcoal/65 sm:text-base">
              We reserve this wall for the government agencies, companies, NGOs, universities,
              microfinance organisations, and development partners who will walk with SHELIFT.
            </p>
            <a
              href="#contact"
              className="group mt-1 inline-flex items-center gap-2 rounded-full bg-forest-950 px-6 py-3 text-sm font-bold text-ivory transition-colors duration-300 hover:bg-clay-500"
            >
              Start a conversation
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-charcoal/50">
            Placeholders only — no partner names or logos are shown until formally approved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}