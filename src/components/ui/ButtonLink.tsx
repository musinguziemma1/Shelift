import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline-light" | "outline-dark" | "ghost-light" | "ghost-dark";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: Variant;
  /** Shows the animated arrow micro-interaction */
  withArrow?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-clay-500 text-ivory hover:bg-clay-600 shadow-[0_12px_30px_-12px_rgba(192,95,53,0.55)]",
  "outline-light":
    "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10",
  "outline-dark":
    "border border-forest-900/30 text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-ivory",
  "ghost-light": "text-ivory underline-offset-4 hover:underline",
  "ghost-dark": "text-forest-900 underline-offset-4 hover:underline",
};

export function ButtonLink({
  children,
  variant = "primary",
  withArrow = false,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold tracking-wide transition-all duration-300 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </a>
  );
}