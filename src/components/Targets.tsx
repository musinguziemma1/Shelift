import { Info } from "lucide-react";
import { targets } from "../data/engage";
import { Counter } from "./ui/Counter";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * Strategic targets for 2025–2027. These are ambitions from the M&E
 * framework — deliberately framed as "targets", never as achieved impact.
 */
export function Targets() {
  return (
    <section id="impact" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={targets.eyebrow}
          title={targets.headline}
          lead="Four measurable ambitions guide SHELIFT's 2025–2027 strategic plan — each tied directly to one of our four areas of work."
        />

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {targets.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1} className="group">
              <div className="border-t-2 border-gold-500 pt-6 transition-transform duration-500 group-hover:translate-y-1">
                <p className="font-display text-6xl leading-none text-forest-800 lg:text-7xl">
                  <span className="text-clay-500" aria-hidden="true">
                    +
                  </span>
                  <Counter to={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-charcoal/70">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-14">
          <p className="flex max-w-2xl items-start gap-3 rounded-sm border border-forest-900/10 bg-sand-50 p-4 text-xs leading-relaxed text-charcoal/60">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-gold-600"
            />
            {targets.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}