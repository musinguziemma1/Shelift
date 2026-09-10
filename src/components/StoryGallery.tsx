import { gallery } from "../data/storytelling";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

/**
 * Photo Story — a true magazine-style editorial spread on desktop:
 * sticky intro column + staggered 2-up photo grid, with numbered plates,
 * always-visible captions, and a swipeable track on mobile.
 */
export function StoryGallery() {
  return (
    <section aria-label="Photo story" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          {/* Sticky intro column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={gallery.eyebrow}
              title={gallery.headline}
              lead={gallery.lead}
            />
            <Reveal delay={0.15} className="mt-8">
              <ol className="space-y-4 border-t border-forest-900/10 pt-6">
                {gallery.tiles.map((tile, i) => (
                  <li key={tile.label} className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-sm text-clay-600"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-forest-950">
                        {tile.label}
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-charcoal/60">
                        {tile.caption}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Mosaic — swipeable on mobile, staggered grid on desktop */}
          <div>
            <div className="grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto pb-4 sm:auto-cols-[46%] lg:grid-flow-row lg:grid-cols-12 lg:auto-rows-[180px] lg:overflow-visible lg:pb-0 xl:auto-rows-[200px]">
              {gallery.tiles.map((tile, i) => (
                <Reveal
                  key={tile.image}
                  delay={i * 0.07}
                  y={24}
                  className={`snap-start ${tile.span}`}
                >
                  <figure className="group relative h-64 overflow-hidden rounded-2xl shadow-[0_18px_40px_-24px_rgba(11,26,18,0.45)] sm:h-72 lg:h-full lg:min-h-0">
                    <SmartImage
                      src={tile.image}
                      alt={`${tile.label}: ${tile.caption} Representative Unsplash photography.`}
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                    />
                    {/* Legibility gradient */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/15 to-transparent"
                    />
                    {/* Top row: plate number + focus area */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
                      <span className="rounded-full border border-ivory/25 bg-forest-950/45 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
                        {tile.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-lg italic text-ivory/70"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <span
                        aria-hidden="true"
                        className="mb-2 block h-px w-10 bg-gold-400 transition-all duration-500 group-hover:w-16"
                      />
                      <span className="block font-display text-lg leading-snug text-ivory sm:text-xl">
                        {tile.caption}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-4 lg:mt-6">
              <p className="text-xs leading-relaxed text-charcoal/50">{gallery.note}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}