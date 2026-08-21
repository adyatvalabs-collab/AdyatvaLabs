"use client";

import { useEffect, useRef } from "react";
import { gsap, qa, prefersReducedMotion } from "@/lib/animations";
import { PROJECTS } from "@/lib/data";
import WorkCard from "@/components/work-card";

export default function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => {
        const track = trackRef.current;
        return track ? track.scrollWidth - window.innerWidth : 0;
      };
      const tween = gsap.to(trackRef.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // reveal the header + cards as they appear
    gsap.fromTo(
      qa(sectionRef.current, ".work-reveal"),
      { opacity: 0.2, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="bg-white py-24 lg:py-0">
      <div className="container-x pt-24 lg:pt-32">
        <div className="work-reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
              <p className="small-label text-white-mute">Selected work</p>
            </div>
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.98] tracking-tight">
              A body of work, not a{" "}
              <span className="text-orange-deep">portfolio grid.</span>
            </h2>
          </div>
          <p className="hand max-w-[16rem] text-2xl leading-tight text-orange-deep">
            <span className="lg:hidden">swipe sideways. </span>
            no invented metrics here. just what exists.
          </p>
        </div>
      </div>

      {/* horizontal track — native scroll + snap under lg, pinned scrub on lg+ */}
      <div
        ref={pinRef}
        className="no-scrollbar snap-x snap-proximity overflow-x-auto lg:snap-none lg:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex w-max shrink-0 gap-6 p-4 will-change-transform md:gap-10 md:p-10 md:pr-[20vw] lg:pr-[40vw]"
        >
          {PROJECTS.map((project, i) => (
            <div key={project.name} className="work-reveal snap-start">
              <WorkCard project={project} />
              <p className="mt-3 pl-1 text-xs font-medium text-white-mute">
                {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x pb-24 lg:pb-20 lg:pt-10">
        <p className="flex flex-wrap items-center gap-x-4 text-sm leading-relaxed text-white-mute">
          <span className="hand text-xl text-orange-deep lg:hidden">{"\u2192"} sideways</span>
          We take on a small number of engagements at a time. If a problem is
          worth solving properly, we solve it properly.
        </p>
      </div>
    </section>
  );
}