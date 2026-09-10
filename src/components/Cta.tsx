import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cta } from "../data/engage";
import { ButtonLink } from "./ui/ButtonLink";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="partner" ref={ref} className="relative scroll-mt-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div aria-hidden="true" style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <SmartImage
          src={cta.image}
          alt=""
          className="h-full w-full object-cover"
          fallbackLabel="SHELIFT"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-forest-950/80" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(185,138,51,0.18)_0%,transparent_60%)]"
      />

      <div className="container-x relative py-28 lg:py-40">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={cta.eyebrow}
          title={cta.headline}
          lead={cta.text}
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={cta.primaryCta.href} variant="primary" withArrow>
            {cta.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={cta.secondaryCta.href} variant="outline-light">
            {cta.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}