import { organisation } from "../data/content";

interface BrandProps {
  /** "light" is used over dark hero imagery. */
  tone?: "light" | "dark";
  onClick?: () => void;
}

/** SHELIFT logo — circular people motif + wordmark. */
export function Brand({ tone = "dark", onClick }: BrandProps) {
  const light = tone === "light";
  return (
    <a
      href="#top"
      onClick={onClick}
      className="group inline-flex items-center"
      aria-label={`${organisation.name} — back to top`}
    >
      {light ? (
        <>
          <svg
            viewBox="0 0 40 40"
            aria-hidden="true"
            className="h-9 w-9 text-gold-400 transition-transform duration-500 group-hover:scale-105"
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
          <span className="font-display text-[1.35rem] leading-none tracking-tight text-ivory">
            SHELIFT
          </span>
        </>
      ) : (
        <img
          src="/images/logo.svg"
          alt=""
          aria-hidden="true"
          className="h-12 w-auto transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </a>
  );
}
