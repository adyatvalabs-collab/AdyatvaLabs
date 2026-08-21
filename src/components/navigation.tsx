"use client";

import { useEffect, useRef, useState } from "react";
import { useGsapSetup, gsap } from "@/lib/animations";
import { scrollToSection } from "@/lib/lenis";

const LINKS = [
  { label: "Systems", href: "#systems" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export default function Navigation() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useGsapSetup(() => {
    gsap.fromTo(
      headerRef.current,
      { yPercent: -120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.4 }
    );
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = LINKS.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            const link = LINKS.find((l) => l.href === id);
            setActive(link ? link.href : "");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div
        className={`mx-auto flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${
          scrolled
            ? "border border-white/20 bg-white/40 text-ink shadow-[0_10px_40px_rgba(13,12,12,0.10)] backdrop-blur-2xl backdrop-saturate-[1.6]"
            : "border border-white/20 bg-white/[0.07] text-white shadow-[0_8px_32px_rgba(13,12,12,0.25)] backdrop-blur-2xl backdrop-saturate-[1.6]"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="group relative flex items-baseline gap-2"
          aria-label="Adyatva Labs — back to top"
        >
          <span className="text-[0.95rem] font-bold uppercase tracking-tight">
            Adyatva <span className="text-orange">Labs</span>
          </span>
          <span
            className="hand absolute -bottom-2 left-1 whitespace-nowrap text-[0.72rem] opacity-0 transition-all duration-300 group-hover:bottom-2 group-hover:opacity-100"
            style={{ color: scrolled ? "var(--color-orange-deep)" : "var(--color-orange-bright)" }}
          >
            the first principles
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="group relative rounded-lg px-3 py-2"
              >
                <span
                  className={`small-label relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-orange"
                      : scrolled
                        ? "text-ink"
                        : "text-white/85"
                  } group-hover:text-orange`}
                >
                  {link.label}
                </span>
                <span
                  className={`absolute inset-x-2 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-orange transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : ""
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
          <a
            href="#contact"
            data-cursor="SAY HI"
            onClick={(e) => go(e, "#contact")}
            className="group ml-2 rounded-full border border-orange/70 px-4 py-2 transition-colors duration-300 hover:bg-orange"
          >
            <span className="small-label text-orange transition-colors duration-300 group-hover:text-ink">
              Start a conversation
            </span>
          </a>
        </nav>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-[2px] w-6 rounded transition-all duration-300 ${
              open ? "translate-y-[4px] rotate-45" : ""
            } ${scrolled ? "bg-ink" : "bg-white"}`}
          />
          <span
            className={`h-[2px] w-6 rounded transition-all duration-300 ${
              open ? "-translate-y-[4px] -rotate-45" : ""
            } ${scrolled ? "bg-ink" : "bg-white"}`}
          />
        </button>
      </div>

      {open && (
        <div
          className={`mx-auto mt-2 flex flex-col gap-1 rounded-2xl border p-4 backdrop-blur-2xl backdrop-saturate-[1.6] md:hidden ${
            scrolled
              ? "border-white/25 bg-white/45 text-ink shadow-[0_16px_48px_rgba(13,12,12,0.18)]"
              : "border-white/25 bg-white/10 text-white shadow-[0_16px_48px_rgba(13,12,12,0.35)]"
          }`}
        >
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              className="flex items-baseline gap-4 rounded-lg px-3 py-3"
            >
              <span className="hand text-orange">0{i + 1}</span>
              <span className="text-xl font-semibold tracking-tight">
                {link.label}
              </span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="mt-2 rounded-xl bg-orange px-4 py-3 text-ink"
          >
            <span className="small-label">Start a conversation</span>
          </a>
        </div>
      )}
    </header>
  );
}