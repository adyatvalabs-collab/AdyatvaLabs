"use client";

import { useRef } from "react";
import { gsap, useGsapSetup, prefersReducedMotion } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the line enters. */
  delay?: number;
};

/**
 * Masked line reveal. Each instance is one masked line; the inner
 * content translates up from a clipped container on enter.
 */
export default function TextLine({ children, className = "", delay = 0 }: Props) {
  const maskRef = useRef<HTMLSpanElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useGsapSetup(() => {
    if (prefersReducedMotion()) return;
    const inner = innerRef.current;
    if (!inner) return;

    const tween = gsap.fromTo(
      inner,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        delay,
        scrollTrigger: {
          trigger: maskRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
    };
  });

  return (
    <span ref={maskRef} className={`reveal-mask block ${className}`}>
      <span ref={innerRef} className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}
