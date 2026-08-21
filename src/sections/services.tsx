"use client";

import { useRef } from "react";
import { gsap, qa, useGsapSetup, prefersReducedMotion } from "@/lib/animations";

const SERVICES = [
  {
    n: "01",
    name: "Web development",
    desc: "Websites, products, and internal tools. The simplest system that works — built properly, front to back.",
    hand: "no template. no bloat. no invented jelly.",
    tags: ["Design & build", "Frontend", "Backend", "Web apps"],
  },
  {
    n: "02",
    name: "Systems thinking consultancy",
    desc: "Understand the whole system before touching a single part. Strategy that survives contact with reality.",
    hand: "first principles, applied",
    tags: ["Positioning", "Operating model", "Process design"],
  },
  {
    n: "03",
    name: "Video & filmmaking",
    desc: "Vibrant video — captured for the real world, or crafted digitally. Films that make people stop and watch.",
    hand: "vibrant. made for the actual screen.",
    tags: ["Real-world film", "Digital & motion", "Direction"],
  },
  {
    n: "04",
    name: "Content creation",
    desc: "Words, images, and ideas shaped into a voice that carries the message far beyond the launch.",
    hand: "a voice, not a feed",
    tags: ["Copy & writing", "Art direction", "Social systems"],
  },
  {
    n: "05",
    name: "Distribution",
    desc: "Placing that voice in front of the right people, on purpose — so the work actually has to do its job.",
    hand: "distribution is a feature, not an afterthought",
    tags: ["Go-to-market", "Channels", "Growth loops"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGsapSetup(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      qa(sectionRef.current, ".service-card"),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          once: true,
        },
      }
    );
  });

  return (
    <section ref={sectionRef} id="services" className="bg-white py-24 text-ink md:py-32">
      <div className="container-x">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
              <p className="small-label text-white-mute">Our services</p>
            </div>
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.98] tracking-tight">
              Five ways we <span className="text-orange-deep">move the line.</span>
            </h2>
          </div>
          <p className="hand max-w-[15rem] text-2xl leading-tight text-orange-deep">
            every engagement runs the whole method, not one menu item.
          </p>
        </div>

        <div className="grid gap-px border-2 border-ink bg-white-line lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.n}
              data-cursor="EXPLORE"
              className="service-card group relative flex flex-col justify-between gap-10 bg-white p-7 transition-colors duration-500 hover:bg-white-deep md:p-9"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="hand text-2xl text-orange-deep md:text-3xl">
                    {service.n}
                  </span>
                  <span
                    className="text-2xl text-ink/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-orange-deep"
                    aria-hidden="true"
                  >
                    {"\u2197"}
                  </span>
                </div>

                <h3 className="mt-6 text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold uppercase leading-[1.02] tracking-tight transition-colors duration-300 group-hover:text-orange-deep">
                  {service.name}
                </h3>

                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
                  {service.desc}
                </p>
              </div>

              <div>
                <span className="hand block text-xl text-ink/60 transition-colors duration-300 group-hover:text-orange-deep">
                  {service.hand}
                </span>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-ink/50">
                  {service.tags.map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-orange" aria-hidden="true" />
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}

          {/* sixth cell — the thread tying services together */}
          <div className="relative flex flex-col justify-between gap-8 bg-ink p-7 text-white md:p-9">
            <p className="small-label text-white/50">Same method, any of these</p>
            <p className="text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
              None of this works alone. The <span className="text-orange">line</span> is the point.
            </p>
            <a
              href="#contact"
              data-cursor="MAIL"
              className="group flex items-center gap-3 self-start"
            >
              <span className="small-label text-orange transition-transform duration-300 group-hover:translate-x-1">
                Start a conversation
              </span>
              <span className="text-orange transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                {"\u2192"}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}