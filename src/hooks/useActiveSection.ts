import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in view — used for the animated
 * active-link indicator in the navigation.
 *
 * Sections are lazily loaded, so a MutationObserver re-binds observers as
 * section DOM mounts/unmounts; the active state only becomes non-empty once
 * a tracked section is actually observed in view.
 *
 * The observer is debounced to avoid excessive re-scanning on rapid DOM
 * changes (e.g. Framer Motion layout animations).
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let observers: IntersectionObserver[] = [];
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

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

    const debouncedObserveAll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(observeAll, 200);
    };

    observeAll();

    /* Only watch direct children of #main for added/removed sections,
       not the entire document tree. */
    const mainEl = document.getElementById("main");
    const mo = new MutationObserver(debouncedObserveAll);
    mo.observe(mainEl ?? document.body, { childList: true, subtree: true });

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      mo.disconnect();
      disconnectAll();
    };
  }, [ids]);

  return active;
}
