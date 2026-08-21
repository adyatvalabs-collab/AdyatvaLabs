"use client";

import { useRef } from "react";
import { gsap, qa, useGsapSetup, prefersReducedMotion } from "@/lib/animations";

const LAYERS = [
  {
    n: "01",
    name: "THINK",
    items: ["First-principles strategy", "Problem definition", "Positioning", "Market understanding"],
    hand: "think longer than feels comfortable",
  },
  {
    n: "02",
    name: "SHAPE",
    items: ["Branding", "Content", "Creative direction", "Digital experience"],
    hand: "give it a point of view",
  },
  {
    n: "03",
    name: "DISTRIBUTE",
    items: ["Go-to-market", "Content distribution", "Growth", "Market systems"],
    hand: "an idea that stays quiet doesn't work",
  },
  {
    n: "04",
    name: "BUILD",
    items: ["Automation", "AI systems", "Internal tools", "Digital products"],
    hand: "the system actually runs",
  },
];

export default function Layers() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGsapSetup(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      qa(sectionRef.current, ".layer-row"),
      { x: -28, opacity: 0.4 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          once: true,
        },
      }
    );
  });

  return (
    <section
      ref={sectionRef}
      id="systems"
      className="relative bg-white-deep py-24 text-ink md:py-32"
    >
      <div className="container-x">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-24">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
              <p className="small-label text-white-mute">What we do</p>
            </div>
            <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5.5vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-tight">
              Four layers. One <span className="text-orange-deep">line</span> you move across.
            </h2>
          </div>
          <p className="hand max-w-xs text-2xl leading-tight text-orange-deep">
            we don&apos;t sell services. we get an idea across the whole line.
          </p>
        </div>

        <div className="border-t-2 border-ink">
          {LAYERS.map((layer) => (
            <div
              key={layer.n}
              className="layer-row group relative grid gap-4 overflow-hidden border-b-2 border-ink py-10 md:grid-cols-12 md:items-center md:py-12"
            >
              {/* hover sweep */}
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-orange transition-all duration-500 ease-out group-hover:w-[6px]"
                aria-hidden="true"
              />

              <span className="hand text-3xl text-orange-deep md:col-span-1 md:text-4xl">
                {layer.n}
              </span>

              <div className="md:col-span-4 md:pl-4">
                <h3 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold uppercase leading-none tracking-tight transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {layer.name}
                </h3>
              </div>

              <ul className="flex flex-wrap content-start gap-x-3 gap-y-2 md:col-span-6 md:flex-col md:gap-1.5">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5">
                    <span className="hidden h-1 w-1 rounded-full bg-orange md:block" aria-hidden="true" />
                    <span className="text-sm font-medium text-ink/80 md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <span
                className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-3xl text-ink/20 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-orange-deep md:block md:col-span-1"
                aria-hidden="true"
              >
                {"\u2192"}
              </span>

              <span className="hand md:hidden text-xl text-orange-deep/70">
                {layer.hand}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-white-mute">
          Each layer feeds the next. Brand informs the message, the message
          feeds distribution, distribution forces the operation — and
          everything loops back into strategy.
        </p>
      </div>
    </section>
  );
}