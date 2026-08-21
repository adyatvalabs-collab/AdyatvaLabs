"use client";

import Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToSection(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el as HTMLElement, {
      offset: 0,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
