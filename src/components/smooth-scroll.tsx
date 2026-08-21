"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations";
import { setLenisInstance } from "@/lib/lenis";

/**
 * Wires Lenis smooth scrolling to GSAP's ticker + ScrollTrigger.
 * Respects reduced-motion by falling back to native scroll.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    instance.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    setLenisInstance(instance);

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      setLenisInstance(null);
    };
  }, []);

  return <>{children}</>;
}
