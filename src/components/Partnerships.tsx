import { partnerships } from "../data/engage";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * Partnership section. Logo tiles are visible placeholders only — no partner
 * names or logos are invented.
 */
export function Partnerships() {
  return (
    <section aria-label="Partnerships" className="bg-sand-50 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow={partnerships.eyebrow}
          title={partnerships.headline}
          lead={partnerships.lead}
        />

        <Reveal className="mt-14">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {partnerships.categories.map((category) => (
              <li
                key={category}
                className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-forest-900/25 bg-ivory p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60"
              >
                <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.3em] text-forest-800/50">
                  Partner Logo
                </span>
                <span className="text-[0.65rem] leading-snug text-forest-800/40">{category}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 text-center">
          <p className="text-xs text-charcoal/50">
            Placeholders awaiting approved partner logos and links.
          </p>
        </Reveal>
      </div>
    </section>
  );
}