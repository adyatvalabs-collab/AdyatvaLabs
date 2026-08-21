"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouch() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Safely query elements inside a ref-owned root. */
export function qa(root: Element | null | undefined, selector: string) {
  if (!root) return [] as Element[];
  return Array.from(root.querySelectorAll(selector));
}

/**
 * Mount-only hook. Runs `setup` once inside a gsap.context so all
 * selector-based tweens + ScrollTriggers are reverted/cleaned up
 * automatically when the component unmounts.
 */
export function useGsapSetup(setup: () => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      setup();
    });
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
