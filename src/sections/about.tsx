const BELIEFS = [
  "Not every problem needs another tool.",
  "Understand the system first — then design the simplest thing that works.",
  "Build it properly. No shortcuts that come back to bite.",
  "Put it into the real world, let it respond, and compound.",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-ink py-28 text-white md:py-44"
    >
      <span
        className="hand pointer-events-none absolute right-8 top-12 hidden -rotate-2 whitespace-nowrap text-2xl text-orange-bright/80 lg:block"
        aria-hidden="true"
      >
        we didn&apos;t use a template. you&apos;re reading the result.
      </span>

      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-baseline gap-4">
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            <p className="small-label text-white/60">About</p>
          </div>

          <h2 className="mt-8 text-[clamp(1.9rem,4.5vw,3.8rem)] font-bold uppercase leading-[1.02] tracking-tight">
            Adyatva means approaching things from their{" "}
            <span className="text-orange">fundamental truth</span>.
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/75">
            The name is the method. We don&apos;t rush to execution. We don&apos;t
            start with what everyone else is doing. We start with what is true —
            then with the real problem, then with the simplest system that can
            solve it properly.
          </p>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55">
            That is why this studio looks the way it does, works the way it
            does, and builds its own ventures. The website is the first
            example of the philosophy.
          </p>

          <p className="mt-12 text-sm font-medium text-white/50">
            STRATEGY <span className="text-orange">{"\u00d7"}</span> DESIGN{" "}
            <span className="text-orange">{"\u00d7"}</span> TECHNOLOGY{" "}
            <span className="text-orange">{"\u00d7"}</span> EXECUTION
          </p>
        </div>

        <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8 lg:justify-center">
          <p className="small-label mb-8 text-white/60">What we believe</p>
          <div className="flex flex-col">
            {BELIEFS.map((belief, i) => (
              <div
                key={i}
                className="group flex items-baseline justify-between gap-6 border-b border-white/15 py-5 transition-colors duration-300 hover:border-orange/50"
              >
                <p className="max-w-md text-base font-medium leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white md:text-lg">
                  {belief}
                </p>
                <span className="hand shrink-0 text-2xl text-orange">
                  {["one", "two", "three", "four"][i]}
                </span>
              </div>
            ))}
          </div>

          <p className="hand mt-10 text-2xl leading-tight text-orange-bright/90">
            no rush. no unnecessary complexity. just thoughtful work that works.
          </p>
        </div>
      </div>
    </section>
  );
}