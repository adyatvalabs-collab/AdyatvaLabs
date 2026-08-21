"use client";

import { useRef } from "react";
import { gsap, useGsapSetup, prefersReducedMotion } from "@/lib/animations";
import TextLine from "@/components/ui/text-line";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const arrowPathRef = useRef<SVGPathElement | null>(null);

  useGsapSetup(() => {
    if (prefersReducedMotion()) return;
    if (!sectionRef.current) return;

    if (arrowPathRef.current) {
      gsap.fromTo(
        arrowPathRef.current,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          delay: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    scrollTl.to(contentRef.current, {
      yPercent: -10,
      opacity: 0.3,
      ease: "none",
    });
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-white"
    >
      {/* vertical desk note */}
      <span
        className="hand pointer-events-none absolute left-3 top-1/3 hidden origin-left -rotate-90 whitespace-nowrap text-xl text-white/25 lg:block"
        aria-hidden="true"
      >
        think like a scientist — build like a craftsman
      </span>

      {/* oversized ghost word */}
      <span
        className="pointer-events-none absolute -right-6 top-16 select-none text-[24vw] font-black uppercase leading-none text-white/[0.045] lg:text-[18vw]"
        aria-hidden="true"
      >
        WHY?
      </span>

      <div className="container-x relative flex flex-1 flex-col pb-12 pt-36 md:pt-44">
        <div ref={contentRef} className="will-change-transform">
          <div className="flex items-baseline gap-4">
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            <p className="small-label text-white/70">
              Adyatva Labs <span className="text-orange">·</span> The first
              principles studio
            </p>
          </div>

          <h1 className="mt-10 max-w-5xl text-[clamp(2.4rem,6.5vw,5.8rem)] font-bold uppercase leading-[0.98] tracking-tight">
            <TextLine>We don&apos;t start</TextLine>
            <TextLine delay={0.07} className="text-white/45">
              with&nbsp;the&nbsp;solution.
            </TextLine>
            <TextLine delay={0.14}>We&nbsp;start&nbsp;with&nbsp;the</TextLine>
            <TextLine delay={0.21}>
              <span className="relative whitespace-nowrap">
                <span className="text-orange">problem.</span>
                {/* hand annotation + arrow */}
                <span className="pointer-events-none absolute left-full top-0 hidden xl:block">
                  <svg
                    className="h-16 w-24 stroke-orange lg:h-20 lg:w-32"
                    viewBox="0 0 120 80"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      ref={arrowPathRef}
                      d="M6 70 C 30 66, 44 40, 52 26 M52 26 C 56 18, 62 12, 70 6 M56 20 L 72 14 M74 22 L 70 5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                    />
                  </svg>
                  <span className="hand absolute left-[92%] top-4 whitespace-nowrap text-[1.05rem] text-white/60">
                    and actually stay there a while
                  </span>
                </span>
              </span>
            </TextLine>
          </h1>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/15 pt-8 md:mt-16 md:flex-row md:items-end">
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/60 md:text-base">
            We approach each problem from first principles and build what
            actually needs to exist — nothing more, nothing decorative.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {["Brand", "Content", "Distribution", "Systems", "Products"].map(
              (item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="h-1 w-1 rounded-full bg-orange" aria-hidden="true" />
                  )}
                  <span className="small-label text-white/80">{item}</span>
                </span>
              )
            )}
          </div>
        </div>

        <a
          href="#first-principles"
          data-cursor="DESCEND"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#first-principles")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group mt-10 flex items-center gap-3 self-start"
        >
          <span className="small-label text-orange transition-transform duration-300 group-hover:translate-y-1">
            start with the problem
          </span>
          <span className="text-orange transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
            {"\u2193"}
          </span>
        </a>
      </div>
    </section>
  );
}