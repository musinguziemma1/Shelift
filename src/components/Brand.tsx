import { organisation } from "../data/content";
import { images } from "../data/images";

interface BrandProps {
  /** "light" is used over dark hero imagery. */
  tone?: "light" | "dark";
  onClick?: () => void;
}

/** SHELIFT brand — official emblem plus wordmark. */
export function Brand({ tone = "dark", onClick }: BrandProps) {
  const light = tone === "light";
  return (
    <a
      href="#top"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5"
      aria-label={`${organisation.name} — back to top`}
    >
      <img
        src={light ? images.logoWhite : images.logo}
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        loading="eager"
        decoding="async"
        className="h-11 w-11 shrink-0 object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <span
        className={`font-display text-[1.35rem] leading-none tracking-tight ${light ? "text-ivory" : "text-forest-950"}`}
      >
        SHELIFT
      </span>
    </a>
  );
}