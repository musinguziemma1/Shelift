import { ImageOff } from "lucide-react";
import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Set true for the LCP hero image. */
  priority?: boolean;
  /** Monogram / icon shown if the image fails to load. */
  fallbackLabel?: string;
}

/**
 * Image with an elegant built-in fallback: if the asset is unavailable the
 * surrounding frame keeps its gradient and shows a quiet monogram instead of
 * a broken-image glyph.
 */
export function SmartImage({
  src,
  alt,
  className = "",
  priority = false,
  fallbackLabel = "SHELIFT",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-[radial-gradient(120%_120%_at_20%_0%,#2e543e_0%,#12291e_55%,#0b1a12_100%)] ${className}`}
      >
        <span className="flex items-center gap-2 text-ivory/60">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">{fallbackLabel}</span>
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
