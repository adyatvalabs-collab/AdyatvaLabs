"use client";

import { useRef } from "react";
import { gsap, qa, useGsapSetup, prefersReducedMotion } from "@/lib/animations";

const STAGES = [
  {
    n: "01",
    word: "Problem",
    note: "What is actually wrong?",
    hand: "not the symptom. the constraint.",
    decision: false,
  },
  {
    n: "02",
    word: "Why?",
    note: "Keep asking until the answer is useful.",
    hand: "five times, at least",
    decision: false,
  },
  {
    n: "03",
    word: "What is actually true?",
    note: "Strip assumptions. Keep evidence.",
    hand: "this is where most agencies stop",
    decision: false,
  },
  {
    n: "04",
    word: "What needs to exist?",
    note: "Now it becomes a decision. Not an option.",
    hand: "orange: a decision was made",
    decision: true,
  },
  {
    n: "05",
    word: "Build",
    note: "The simplest system that can work properly.",
    hand: "build it like you mean it",
    decision: false,
  },
  {
    n: "06",
    word: "Execute",
    note: "Put it in the real world. Let it respond.",
    hand: "then compound. no rush.",
    decision: true,
  },
];

type Pt = { x: number; y: number };

/* ── Geometric walkway ────────────────────────────────────────
   The S-path in viewBox space (x: 0-100 of container width,
   y: real px since steps are fixed-height rows). */

const NODE_X = (even: boolean) => (even ? 62 : 38);
const NODE_Y = (i: number) => 150 + i * 300;

function journeySegments(): [Pt, Pt, Pt, Pt][] {
  const segs: [Pt, Pt, Pt, Pt][] = [];
  segs.push([
    { x: 38, y: 36 },
    { x: 38, y: 80 },
    { x: 38, y: 110 },
    { x: 38, y: NODE_Y(0) },
  ]);
  for (let i = 0; i < STAGES.length - 1; i++) {
    const a: Pt = { x: NODE_X(i % 2 === 1), y: NODE_Y(i) };
    const b: Pt = { x: NODE_X((i + 1) % 2 === 1), y: NODE_Y(i + 1) };
    segs.push([a, { x: a.x, y: a.y + 90 }, { x: b.x, y: b.y - 90 }, b]);
  }
  const last: Pt = { x: NODE_X((STAGES.length - 1) % 2 === 1), y: NODE_Y(STAGES.length - 1) };
  segs.push([last, { x: 62, y: 1680 }, { x: 62, y: 1710 }, { x: 62, y: 1740 }]);
  return segs;
}

function journeyPath() {
  const segs = journeySegments();
  const [p0] = segs[0];
  const parts: string[] = [`M ${p0.x} ${p0.y}`];
  for (const [, p1, p2, p3] of segs) {
    parts.push(`C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`);
  }
  return parts.join(" ");
}

export default function FirstPrinciples() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGsapSetup(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    qa(sectionRef.current, ".fp-stage").forEach((stage, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 74%",
          once: true,
          onEnter: () => {
            stage.classList.add("fp-on");
            if (STAGES[i].decision) stage.classList.add("fp-orange");
          },
        },
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      id="first-principles"
      className="relative overflow-hidden bg-white py-28 text-ink md:py-40"
    >
      <div className="container-x">
        <div className="mb-20 md:mb-24">
          <div className="flex items-baseline gap-4">
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            <p className="small-label text-white-mute">The method</p>
          </div>
          <h2 className="mt-6 text-[clamp(2.2rem,6vw,5rem)] font-bold uppercase leading-[0.98] tracking-tight">
            Walk the whole way. <span className="text-orange">step by step.</span>
          </h2>
        </div>
      </div>

      <div className="container-x">
        <div className="relative">
          {/* curved dotted walkway (desktop) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-[1800px] w-full md:block"
            viewBox="0 0 100 1800"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={journeyPath()}
              fill="none"
              stroke="var(--color-white-mute)"
              strokeOpacity="0.85"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          {/* dotted walk (mobile) */}
          <div
            className="absolute left-[7px] top-2 h-[calc(100%-6rem)] w-[2px] border-l-2 border-dotted border-white-line md:hidden"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-16 md:gap-0">
            {STAGES.map((stage, i) => {
              const even = i % 2 === 1;
              return (
                <div key={stage.n} className="relative md:h-[300px]">
                  <div className="fp-stage flex flex-col gap-1 pl-10 md:pl-0" data-stage={stage.n}>
                    <div
                      className={`relative flex w-full items-start gap-5 md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[34%] ${
                        even
                          ? "md:right-0 md:flex-row-reverse md:text-right"
                          : "md:left-0"
                      }`}
                    >
                      <div className="flex-1">
                        <span className="hand block text-xl text-orange-deep md:mb-1 md:text-2xl">
                          step {stage.n}
                        </span>
                        <h3 className="fp-word text-[clamp(2rem,6vw,3.2rem)] font-bold uppercase leading-[1.02] tracking-tight text-white-faint transition-colors duration-700">
                          {stage.word}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white-mute md:text-base">
                          {stage.note}
                        </p>
                        <span className="hand mt-1 inline-block text-xl text-orange-deep/90">
                          {stage.hand}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-20 max-w-md text-sm leading-relaxed text-white-mute">
          Everything below on this page is evidence this method runs. Brand.
          Content. Distribution. Systems. Products.
        </p>
      </div>
    </section>
  );
}