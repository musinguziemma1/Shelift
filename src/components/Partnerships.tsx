import { ArrowRight, Building2, Factory, Globe2, GraduationCap, HandHeart, Landmark, Pause, Play } from "lucide-react";
import { useId, useState } from "react";
import { partnerships } from "../data/engage";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const categoryIcons = [Landmark, Factory, HandHeart, GraduationCap, Building2, Globe2] as const;

/**
 * Partnership section — an infinite sliding logo wall. Tiles are visible
 * placeholders for partner categories only; no partner names or logos
 * are invented.
 */
export function Partnerships() {
  const [paused, setPaused] = useState(false);
  const labelId = useId();
  const pausedClass = paused ? "is-paused" : "";

  return (
    <section aria-labelledby={labelId} className="overflow-hidden bg-ivory py-20 lg:py-28">
      <div className="container-x" id={labelId}>
        <SectionHeading
          align="center"
          eyebrow={partnerships.eyebrow}
          title={partnerships.headline}
          lead={partnerships.lead}
        />

        <Reveal delay={0.1} className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex items-center gap-2 rounded-full border border-forest-900/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-forest-800 transition-colors duration-300 hover:border-clay-500/50 hover:text-clay-700"
          >
            {paused ? (
              <Play aria-hidden="true" className="h-3.5 w-3.5" />
            ) : (
              <Pause aria-hidden="true" className="h-3.5 w-3.5" />
            )}
            {paused ? "Play logos" : "Pause logos"}
          </button>
        </Reveal>
      </div>

      {/* Sliding logo wall */}
      <Reveal delay={0.15} className="mt-12">
        <div
          className="marquee relative"
          role="region"
          aria-label="Partner categories logo wall (placeholders)"
        >
          {/* Edge fades */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ivory to-transparent sm:w-24" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ivory to-transparent sm:w-24" />

          <div className="overflow-hidden">
            <div className={`marquee-track flex w-max ${pausedClass}`}>
              <LogoHalf ariaHidden={false} />
              <LogoHalf ariaHidden />
            </div>
          </div>

          <div className="mt-5 overflow-hidden">
            <div className={`marquee-track marquee-track-fast marquee-reverse flex w-max ${pausedClass}`}>
              <LogoHalf ariaHidden={false} flip />
              <LogoHalf ariaHidden flip />
            </div>
          </div>
        </div>
      </Reveal>

      <div className="container-x">
        <Reveal delay={0.1} className="mt-10">
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

function LogoHalf({ ariaHidden, flip = false }: { ariaHidden?: boolean; flip?: boolean }) {
  const order = flip ? [...partnerships.categories].reverse() : partnerships.categories;
  return (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-stretch gap-5 pr-5">
      {order.map((category, i) => {
        const Icon = categoryIcons[(flip ? order.length - 1 - i : i) % categoryIcons.length];
        return (
          <div
            key={`${category}-${flip ? "b" : "a"}`}
            className="group flex w-60 shrink-0 flex-col justify-between rounded-2xl border border-forest-900/10 bg-white p-5 text-left shadow-[0_14px_30px_-22px_rgba(11,26,18,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_22px_40px_-22px_rgba(185,138,51,0.45)] sm:w-72"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-950 text-gold-300 transition-colors duration-300 group-hover:bg-clay-500 group-hover:text-ivory">
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.28em] text-forest-800/45">
                Partner logo
              </span>
            </div>
            <p className="mt-5 font-display text-lg leading-snug text-forest-950">{category}</p>
            <p className="mt-1 text-xs text-charcoal/50">Awaiting approved artwork</p>
          </div>
        );
      })}
    </div>
  );
}