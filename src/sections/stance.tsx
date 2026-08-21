"use client";

import { useRef } from "react";
import { gsap, qa, useGsapSetup, prefersReducedMotion } from "@/lib/animations";

export default function Stance() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGsapSetup(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      qa(sectionRef.current, ".verb"),
      { y: "0.6em", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          once: true,
        },
      }
    );
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-28 text-white md:py-44"
    >
      <div className="container-x">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="verb text-[clamp(2.6rem,9.5vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight">
            We think.
          </h2>
          <h2 className="verb ml-[4vw] text-[clamp(2.6rem,9.5vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight md:ml-[8vw]">
            <span className="text-orange">We build.</span>
            <span className="hand mt-1 block text-2xl text-orange-bright md:ml-6 md:mt-0 md:inline md:align-middle md:text-3xl">
              ← the verb we&apos;re most proud of
            </span>
          </h2>
          <h2 className="verb ml-[8vw] text-[clamp(2.6rem,9.5vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight md:ml-[16vw]">
            We operate.
          </h2>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-8 border-t border-white/15 pt-8 md:mt-24 md:flex-row md:items-end">
          <p className="max-w-lg text-xl leading-relaxed text-white/75 md:text-2xl">
            Strategy is only useful when it{" "}
            <span className="text-orange-bright">survives contact with reality</span>.
          </p>
          <p className="small-label flex flex-wrap gap-x-4 gap-y-2 text-white/60">
            <span>STRATEGY</span>
            <span className="text-orange">{"\u00d7"}</span>
            <span>DESIGN</span>
            <span className="text-orange">{"\u00d7"}</span>
            <span>TECHNOLOGY</span>
            <span className="text-orange">{"\u00d7"}</span>
            <span>EXECUTION</span>
          </p>
        </div>
      </div>
    </section>
  );
}