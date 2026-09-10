import { gallery } from "../data/storytelling";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SmartImage } from "./ui/SmartImage";

/**
 * Asymmetric photo story — an editorial mosaic in the spirit of premium
 * development-organisation storytelling. Hover reveals captions; every tile
 * stays labelled for accessibility.
 */
export function StoryGallery() {
  return (
    <section aria-label="Photo story" className="bg-sand-50 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.headline} lead={gallery.lead} />

        <div className="mt-12 grid grid-cols-2 gap-3 auto-rows-[150px] sm:auto-rows-[180px] md:gap-4 lg:grid-cols-4 lg:auto-rows-[200px] xl:auto-rows-[220px]">
          {gallery.tiles.map((tile, i) => (
            <Reveal key={tile.image} delay={i * 0.08} y={20} className={tile.span}>
              <figure className="group relative h-full overflow-hidden rounded-sm">
                <SmartImage
                  src={tile.image}
                  alt={`${tile.label} — representative Unsplash photography`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="eyebrow text-gold-400">{tile.label}</span>
                  <span className="mt-1 block max-w-xs text-sm leading-snug text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0">
                    {tile.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-6">
          <p className="text-xs leading-relaxed text-charcoal/50">{gallery.note}</p>
        </Reveal>
      </div>
    </section>
  );
}