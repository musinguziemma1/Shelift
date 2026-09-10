import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { visionMission } from "../data/content";
import { EASE, viewportOnce } from "../lib/motion";
import { Reveal } from "./ui/Reveal";

export function VisionMission() {
  return (
    <section id="vision" className="relative overflow-hidden bg-forest-950 py-24 lg:py-36">
      {/* Oversized watermarks */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-8 select-none font-display text-[16rem] leading-none text-forest-800/40 lg:text-[24rem]"
      >
        V
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 bottom-4 select-none font-display text-[16rem] leading-none text-forest-800/25 lg:text-[22rem]"
      >
        M
      </span>

      <div className="container-x relative">
        <div className="grid gap-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Deconstructed labels column */}
          <Reveal className="space-y-20">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow text-gold-400">OUR VISION</span>
              <span className="mt-3 block h-px w-16 bg-gold-400/60" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="space-y-20">
            {/* Vision quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <Quote
                aria-hidden="true"
                className="mb-6 h-10 w-10 text-gold-400/80"
                strokeWidth={1.5}
              />
              <p className="font-display text-[1.7rem] leading-[1.25] text-ivory sm:text-4xl lg:text-[2.6rem]">
                {visionMission.vision}
              </p>
            </motion.blockquote>

            <div className="h-px w-full bg-ivory/10" aria-hidden="true" />

            {/* Mission quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            >
              <span className="eyebrow text-gold-400">OUR MISSION</span>
              <p className="mt-6 font-display text-[1.7rem] leading-[1.25] text-ivory sm:text-4xl lg:text-[2.6rem]">
                {visionMission.mission}
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}