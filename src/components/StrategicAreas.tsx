import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { strategicAreas, type StrategicArea } from "../data/strategicAreas";
import { EASE } from "../lib/motion";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

/**
 * "What We Do" — the four strategic areas as interactive editorial panels.
 * Desktop: vertical panels rebalance on hover/focus (one stays expanded).
 * Mobile: transforms into stacked, expandable accordions.
 */
export function StrategicAreas() {
  const [active, setActive] = useState(0);

  return (
    <section id="what-we-do" className="bg-sand-50 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Do"
          title="Four pathways to transformation."
          lead="Every program SHELIFT runs grows out of the strategic objectives in our 2025–2027 plan — health, education, livelihoods, and the rights and leadership of women and girls."
        />
      </div>

      {/* Desktop — expandable panels */}
      <div className="container-x mt-14 hidden gap-4 lg:flex lg:h-[600px] xl:h-[640px]">
        {strategicAreas.map((area, i) => (
          <DesktopPanel
            key={area.id}
            area={area}
            active={active === i}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>

      {/* Mobile — accordion */}
      <div className="container-x mt-10 flex flex-col gap-4 lg:hidden">
        {strategicAreas.map((area, i) => (
          <MobilePanel
            key={area.id}
            area={area}
            open={active === i}
            onToggle={() => setActive((v) => (v === i ? -1 : i))}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Desktop panel                                                      */
/* ---------------------------------------------------------------- */

interface DesktopPanelProps {
  area: StrategicArea;
  active: boolean;
  onActivate: () => void;
}

function DesktopPanel({ area, active, onActivate }: DesktopPanelProps) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-expanded={active}
      aria-label={`${area.title} — ${active ? "expanded" : "expand"}`}
      initial={false}
      animate={{ flexGrow: active ? 1.5 : 0.6 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative min-w-0 flex-1 overflow-hidden rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-500"
      style={{ flexBasis: 0 }}
    >
      {/* Image */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ scale: active ? 1.06 : 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <SmartImage src={area.image} alt={area.title} className="h-full w-full object-cover" />
      </motion.div>

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/40 to-forest-950/15"
      />

      {/* Gold spine on the active panel */}
      <div
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-1 bg-gold-400 transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-6 xl:p-8">
        <span className="font-display text-3xl text-gold-400 xl:text-4xl">{area.number}</span>
        <h3 className="mt-2 font-display text-xl leading-tight text-ivory xl:text-2xl">
          {area.title}
        </h3>

        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-4"
            >
              <p className="text-sm leading-relaxed text-forest-100/90">{area.description}</p>
              <ul className="mt-5 flex max-w-md flex-wrap gap-2">
                {area.focus.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ivory/25 bg-forest-950/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ivory/85 backdrop-blur-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
/* ---------------------------------------------------------------- */
/* Mobile panel                                                       */
/* ---------------------------------------------------------------- */

interface MobilePanelProps {
  area: StrategicArea;
  open: boolean;
  onToggle: () => void;
}

function MobilePanel({ area, open, onToggle }: MobilePanelProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-forest-900/10 bg-forest-950">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${area.title} — ${open ? "collapse" : "expand"}`}
        className="flex w-full items-center gap-4 px-5 py-5 text-left"
      >
        <span className="font-display text-xl text-gold-400">{area.number}</span>
        <span className="flex-1 font-display text-lg text-ivory">{area.title}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 text-ivory/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6">
              <div className="relative h-44 overflow-hidden rounded-sm">
                <SmartImage
                  src={area.image}
                  alt={`${area.title} — focus area`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-forest-950/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
                  Strategic area {area.number}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-forest-100/85">
                {area.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {area.focus.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ivory/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ivory/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}