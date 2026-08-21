"use client";

import { useRef, useState } from "react";
import { gsap, qa, useGsapSetup, prefersReducedMotion } from "@/lib/animations";
import Magnetic from "@/components/ui/magnetic";

const EMAIL = "ceo@adyatvalabs.com";

export default function Cta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [ctaCopied, setCtaCopied] = useState(false);
  const [footerCopied, setFooterCopied] = useState(false);
  const ctaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const footerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = (
    setCopied: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2600);
  };

  useGsapSetup(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      qa(sectionRef.current, ".cta-reveal"),
      { y: 30, opacity: 0 },
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
    <section ref={sectionRef} id="contact" className="relative bg-white py-28 text-ink md:py-44">
      <div className="container-x">
        <div className="cta-reveal max-w-5xl">
          <div className="flex items-baseline gap-4">
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            <p className="small-label text-white-mute">Last thing</p>
          </div>

          <h2 className="mt-8 text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Have a problem
          </h2>
          <h2 className="text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.95] tracking-tight">
            worth <span className="text-orange">solving?</span>
          </h2>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
            Or something worth building. Bring us the problem, the mess, the
            thing that keeps not working. Let&apos;s start with why.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${EMAIL}`}
                data-cursor="MAIL"
                onClick={() => flash(setCtaCopied, ctaTimer)}
                className="group inline-flex items-center gap-4 rounded-full bg-orange px-8 py-4 text-ink transition-all duration-300 hover:bg-ink hover:text-white"
              >
                <span className="small-label">Start a conversation</span>
                <span
                  className="text-xl transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                >
                  {ctaCopied ? "\u2713" : "\u2192"}
                </span>
              </a>
            </Magnetic>
            <span className="hand text-2xl text-orange-deep" aria-live="polite">
              {ctaCopied
                ? `${EMAIL} copied \u2014 paste it anywhere.`
                : "one email is enough. we\u2019ll take it from the questions."}
            </span>
          </div>
        </div>
      </div>

      <footer className="mt-24 bg-ink text-white md:mt-32">
        <div className="container-x py-12">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div>
              <p className="text-lg font-bold uppercase tracking-tight">
                Adyatva <span className="text-orange">Labs</span>
              </p>
              <p className="hand mt-2 text-xl text-white/60">
                the first principles studio
              </p>
            </div>

            <nav className="flex flex-col gap-3">
              <a href="#systems" className="small-label text-white/60 transition-colors duration-300 hover:text-orange">
                Systems
              </a>
              <a href="#work" className="small-label text-white/60 transition-colors duration-300 hover:text-orange">
                Work
              </a>
              <a href="#services" className="small-label text-white/60 transition-colors duration-300 hover:text-orange">
                Services
              </a>
              <a href="#about" className="small-label text-white/60 transition-colors duration-300 hover:text-orange">
                About
              </a>
            </nav>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => flash(setFooterCopied, footerTimer)}
                className="small-label text-white/80 underline-offset-4 hover:text-orange hover:underline"
              >
                {footerCopied ? "copied to clipboard \u2713" : EMAIL}
              </a>
              <span className="small-label text-white/40">No offices. Just the work.</span>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
            <p className="text-xs text-white/40">
              {"\u00a9"} {new Date().getFullYear()} Adyatva Labs. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              THINK FROM FIRST PRINCIPLES. BUILD WITH PRECISION. EXECUTE DELIBERATELY.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}