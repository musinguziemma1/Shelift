import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in view — used for the animated
 * active-link indicator in the navigation.
 *
 * Sections are lazily loaded, so a MutationObserver re-binds observers as
 * section DOM mounts/unmounts; the active state only becomes non-empty once
 * a tracked section is actually observed in view.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let observers: IntersectionObserver[] = [];

    const disconnectAll = () => {
      observers.forEach((observer) => observer.disconnect());
      observers = [];
    };

    const observeAll = () => {
      disconnectAll();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) setActive(id);
            }
          },
          { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
        );
        observer.observe(el);
        observers.push(observer);
      }
    };

    observeAll();

    // Re-bind when lazily-loaded sections enter the DOM.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      disconnectAll();
    };
  }, [ids]);

  return active;
}