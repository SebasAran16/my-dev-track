import { useEffect } from "react";

const REVEALED = "is-revealed";

/**
 * Fades/slides in every `[data-reveal]` element the first time it enters the
 * viewport. One shared observer for the whole page keeps it cheap; elements
 * can set `--d` (style) to stagger their delay.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll(`[data-reveal]:not(.${REVEALED})`)
    );
    if (!nodes.length) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add(REVEALED));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(REVEALED);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
