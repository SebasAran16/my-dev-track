import { useCallback } from "react";
import { useLenis } from "@/providers/LenisProvider";
import styles from "@/styles/Home.module.sass";

// Cross-links between the experience cards and the certification cards ride on
// element ids, so both directions share one scroll + highlight behaviour.
export const experienceAnchorId = (companyId) => `experience-${companyId}`;
export const certificationAnchorId = (certificationId) =>
  `certification-${certificationId}`;

const FLASH_MS = 1600;

// Keep targets clear of the fixed header (its height lives in a CSS variable).
export const headerOffset = () => {
  if (typeof window === "undefined") return 0;
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-h"
  );
  return -((parseFloat(value) || 72) + 16);
};

export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target, { offset = headerOffset() } = {}) => {
      if (target == null) return;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
        return;
      }
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
      }
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [lenis]
  );
}

export function useScrollToAnchor() {
  const scrollTo = useScrollTo();

  return useCallback(
    (anchorId) => {
      const target = document.getElementById(anchorId);
      if (!target) return;

      scrollTo(target);

      // Re-trigger the flash even when the same card is clicked twice in a row.
      target.classList.remove(styles.anchorFlash);
      void target.offsetWidth;
      target.classList.add(styles.anchorFlash);
      window.setTimeout(
        () => target.classList.remove(styles.anchorFlash),
        FLASH_MS
      );
    },
    [scrollTo]
  );
}
