import { ArrowRight } from "lucide-react";
import { about } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

export function About() {
  return (
    <section id="about" className="bg-ivory py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Editorial portrait with a soft offset frame */}
        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-md border border-clay-300/70 lg:-left-6 lg:-top-6"
          />
          <SmartImage
            src={about.image}
            alt="A Ugandan woman in a floral dress — representative photography of the women SHELIFT serves"
            className="relative aspect-[4/5] w-full rounded-md object-cover"
          />
          <div className="absolute bottom-5 left-5 max-w-[75%] rounded-md bg-forest-950/85 px-5 py-4 backdrop-blur-sm">
            <p className="eyebrow text-gold-400">Established in Uganda</p>
            <p className="mt-1.5 text-sm leading-snug text-ivory/90">
              Founded from the lived experiences and vision of Dorah Nagawa.
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeading eyebrow={about.eyebrow} title={about.headline} />
          <Reveal delay={0.1} className="mt-6 space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-charcoal/70 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <a
              href={about.storyLink.href}
              className="group inline-flex items-center gap-2 text-sm font-bold tracking-wide text-clay-600 transition-colors hover:text-forest-950"
            >
              {about.storyLink.label}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}