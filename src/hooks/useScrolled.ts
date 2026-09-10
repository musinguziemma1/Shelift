import { useCallback, useEffect, useState } from "react";

/**
 * Reports whether the page has been scrolled past the given threshold.
 * Used by the navbar to switch from transparent to compact/solid.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrolled;
}