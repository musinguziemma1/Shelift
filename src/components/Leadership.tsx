import { leadership } from "../data/leadership";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

/**
 * Leadership & Governance — a founder feature followed by the governing
 * board. Sits on deep forest between the 2025–2027 Ambition and Partnerships
 * sections to keep the page's visual rhythm.
 */
export function Leadership() {
  return (
    <section
      id="leadership"
      aria-label="Leadership and governance"
      className="bg-forest-950 py-20 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading
          tone="light"
          eyebrow={leadership.eyebrow}
          title={leadership.headline}
          lead={leadership.lead}
        />

        {/* Founder feature */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full rounded-sm border border-gold-400/30 lg:-left-6 lg:-top-6"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <SmartImage
                src={leadership.founder.image}
                alt="Dorah Nakagga, Founder and Director of SHELIFT"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <span className="absolute bottom-5 left-5 rounded-full bg-forest-950/80 px-4 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.25em] text-gold-400 backdrop-blur-sm">
              {leadership.founder.role}
            </span>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <p className="eyebrow text-gold-400">Founder</p>
              <h3 className="mt-3 font-display text-4xl leading-tight text-ivory sm:text-5xl">
                {leadership.founder.name}
              </h3>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-clay-200">
                {leadership.founder.title}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-6 space-y-4">
              {leadership.founder.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-forest-100/80">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.25} className="mt-8 border-l-2 border-gold-400 pl-5">
              <p className="font-display text-xl italic leading-relaxed text-ivory sm:text-2xl">
                {leadership.founder.pull}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Governing board */}
        <div className="mt-20">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-3 border-t border-ivory/10 pt-8">
            <h3 className="font-display text-3xl text-ivory">{leadership.boardHeading}</h3>
            <span className="eyebrow text-forest-100/50">{leadership.boardSubheading}</span>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.board.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.1} y={24} className="h-full">
                <figure className="group flex h-full flex-col items-center rounded-sm border border-ivory/10 bg-forest-900/40 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/40">
                  <span className="relative block h-28 w-28">
                    <span aria-hidden="true" className="absolute -inset-2 rounded-full border border-ivory/10 transition-colors duration-500 group-hover:border-gold-400/40" />
                    {/* Initials monogram — real portraits replace this once
                        consented photography is available (see README). */}
                    <span
                      aria-hidden="true"
                      className="grid h-28 w-28 place-items-center rounded-full border border-gold-400/30 bg-forest-900 font-display text-3xl tracking-wide text-gold-300"
                    >
                      {member.name
                        .split(" ")
                        .map((part) => part.charAt(0))
                        .filter(Boolean)
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </span>
                  <figcaption className="mt-6">
                    <p className="font-display text-xl text-ivory">{member.name}</p>
                    <p className="mt-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-gold-400">
                      {member.role}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-forest-100/55">
                      {member.short}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-8">
            <p className="text-xs text-forest-100/40">{leadership.boardNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}