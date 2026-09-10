import { organisation } from "../data/content";

interface BrandProps {
  /** "light" is used over dark hero imagery. */
  tone?: "light" | "dark";
  onClick?: () => void;
}

/** SHELIFT wordmark — a rising sun over a horizon curve. */
export function Brand({ tone = "dark", onClick }: BrandProps) {
  const light = tone === "light";
  return (
    <a
      href="#top"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5"
      aria-label={`${organisation.name} — back to top`}
    >
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={`h-9 w-9 transition-transform duration-500 group-hover:scale-105 ${light ? "text-gold-400" : "text-clay-500"}`}
      >
        <path
          d="M4 34 C 11 6, 29 6, 36 34"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="17" r="5.2" fill="currentColor" />
      </svg>
      <span
        className={`font-display text-[1.35rem] leading-none tracking-tight ${light ? "text-ivory" : "text-forest-950"}`}
      >
        SHELIFT
      </span>
    </a>
  );
}