import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { heroCta, heroSlides } from "../data/content";
import { EASE } from "../lib/motion";
import { ButtonLink } from "./ui/ButtonLink";
import { SmartImage } from "./ui/SmartImage";

const AUTOPLAY_MS = 6500;

export function Hero() {
  const reduce = useReducedMotion();
  const motionOn = !reduce;
  const total = heroSlides.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* Auto-advance — paused on hover/focus-in, stops for reduced motion. */
  useEffect(() => {
    if (reduce || paused || hovered) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, hovered, total]);

  const go = (index: number) => setActive(((index % total) + total) % total);

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="SHELIFT highlights"
      aria-live={paused || hovered ? "polite" : "off"}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-forest-950"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cinematic background — crossfade with a slow, elegant settle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroSlides[active].id}
          aria-hidden="true"
          className="absolute inset-0"
          initial={motionOn ? { opacity: 0, scale: 1.04 } : { opacity: 0 }}
          animate={motionOn ? { opacity: 1, scale: 1 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <SmartImage
            src={heroSlides[active].image}
            alt={heroSlides[active].alt}
            priority={active === 0}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Soft overlays for depth and accessible text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(85%_75%_at_72%_18%,transparent_0%,rgba(11,26,18,0.55)_100%)]"
      />

      {/* Quiet decorative rings */}
      <div
        aria-hidden="true"
        className="absolute -right-28 top-16 hidden h-80 w-80 rounded-full border border-gold-400/25 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 top-40 hidden h-44 w-44 rounded-full border border-gold-400/15 lg:block"
      />

      {/* Content */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-end pb-28 pt-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[active].id}
            initial={motionOn ? { opacity: 0, y: 22 } : { opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.p
              initial={motionOn ? { opacity: 0, y: 14 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="eyebrow flex items-center gap-3 text-gold-400"
            >
              <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
              {heroSlides[active].eyebrow}
            </motion.p>

            <h1 className="mt-6 max-w-4xl font-display text-[2.7rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">
              {heroSlides[active].headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block will-change-transform"
                    initial={motionOn ? { y: "110%" } : false}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, ease: EASE, delay: 0.28 + i * 0.13 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={motionOn ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.72 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg"
            >
              {heroSlides[active].supporting}
            </motion.p>

            <motion.div
              initial={motionOn ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.92 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <ButtonLink href={heroCta.primaryCta.href} variant="primary" withArrow>
                {heroCta.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={heroCta.secondaryCta.href} variant="outline-light">
                {heroCta.secondaryCta.label}
              </ButtonLink>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
{/* Compact controls — mobile & tablet */}
      <div className="absolute bottom-5 right-3 z-20 flex items-center gap-2 sm:bottom-6 sm:right-6 lg:hidden">
        <ControlButton label="Previous slide" onClick={() => go(active - 1)} size="sm">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </ControlButton>
        <ControlButton
          label={paused ? "Play slideshow" : "Pause slideshow"}
          onClick={() => setPaused((p) => !p)}
          size="sm"
        >
          {paused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
        </ControlButton>
        <ControlButton label="Next slide" onClick={() => go(active + 1)} size="sm">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </ControlButton>
      </div>

      {/* Full controls — desktop */}
      <div className="absolute bottom-7 right-8 z-20 hidden items-center gap-2 lg:flex">
        <ControlButton label="Previous slide" onClick={() => go(active - 1)}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </ControlButton>

        <div role="group" aria-label="Choose slide" className="flex items-center gap-1.5 px-1">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                active === i ? "w-8 bg-gold-400" : "w-4 bg-ivory/30 hover:bg-ivory/60"
              }`}
            />
          ))}
        </div>

        <ControlButton label="Next slide" onClick={() => go(active + 1)}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </ControlButton>

        <ControlButton
          label={paused ? "Play slideshow" : "Pause slideshow"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
        </ControlButton>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to explore SHELIFT's work"
        initial={motionOn ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/70 transition-colors hover:text-ivory sm:flex"
      >
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.32em]">
          Scroll to explore
        </span>
        <span className="relative flex h-9 w-6 items-start justify-center rounded-full border border-ivory/40 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold-400"
            initial={motionOn ? undefined : { y: 0 }}
            animate={motionOn ? { y: [0, 14], opacity: [1, 0] } : undefined}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

function ControlButton({
  label,
  onClick,
  children,
  size = "md",
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid place-items-center rounded-full border border-ivory/25 text-ivory/80 transition-all duration-300 hover:border-ivory hover:bg-ivory/10 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${
        size === "sm" ? "h-10 w-10" : "h-11 w-11"
      }`}
    >
      {children}
    </button>
  );
}
