"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap, isTouch, prefersReducedMotion } from "@/lib/animations";

const QUERY = "(pointer: fine)";
const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Adyatva cursor. Fine pointers only.
 *  - small orange dot tracks the pointer 1:1
 *  - a glass ring eases behind it, expands over interactive elements
 *  - `data-cursor="VIEW"` paints contextual text into the ring
 */
export default function Cursor() {
  const finePointer = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion() || isTouch() || !finePointer) return;

    document.documentElement.classList.add("has-cursor");

    const xDot = gsap.quickTo(dotRef.current, "x", {
      duration: 0.15,
      ease: "power3.out",
    });
    const yDot = gsap.quickTo(dotRef.current, "y", {
      duration: 0.15,
      ease: "power3.out",
    });
    const xRing = gsap.quickTo(ringRef.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const yRing = gsap.quickTo(ringRef.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    let hoverEl: Element | null = null;

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      hoverEl = (e.target as Element | null)?.closest?.(
        "a, button, [data-cursor]"
      ) as Element | null;
      if (hoverEl) {
        const label = hoverEl.getAttribute("data-cursor");
        gsap.to(ringRef.current, {
          scale: label ? 2.6 : 1.6,
          duration: 0.35,
          ease: "back.out(1.4)",
        });
        gsap.to([dotRef.current, ringRef.current], {
          opacity: 1,
          duration: 0.2,
        });
        if (label && labelRef.current) {
          labelRef.current.textContent = label;
        }
        requestAnimationFrame(() => {
          if (labelRef.current)
            labelRef.current.style.opacity = label ? "1" : "0";
        });
      } else {
        gsap.to(ringRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
        if (labelRef.current) labelRef.current.style.opacity = "0";
      }
    };

    const onDown = () => {
      gsap.to(dotRef.current, { scale: 0.5, duration: 0.15 });
    };
    const onUp = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    };
    const onLeave = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-orange/60 bg-ink/5 backdrop-blur-sm"
      >
        <span
          ref={labelRef}
          className="small-label text-[0.55rem] opacity-0 transition-opacity duration-150 text-orange"
        />
      </div>
    </div>
  );
}