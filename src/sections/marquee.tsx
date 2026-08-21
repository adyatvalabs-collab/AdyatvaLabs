const ITEMS = [
  "WHAT IS ACTUALLY TRUE?",
  "WHAT IS THE REAL PROBLEM?",
  "THE SIMPLEST SYSTEM THAT WORKS",
  "THINK, THEN BUILD, THEN EXECUTE",
  "NO RUSH. MAKE IT WORK.",
  "WHAT NEEDS TO EXIST?",
];

export default function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 text-[1.4rem] font-bold uppercase leading-none tracking-tight text-ink md:px-10 md:text-[2rem]">
            {item}
          </span>
          <span className="text-[1.4rem] text-ink/70 md:text-[2rem]" aria-hidden="true">
            *
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative z-[5] -my-6 rotate-[-1.3deg] overflow-hidden border-y-2 border-ink bg-orange py-4 md:py-5"
      aria-hidden="true"
    >
      <div
        className="flex w-max"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}