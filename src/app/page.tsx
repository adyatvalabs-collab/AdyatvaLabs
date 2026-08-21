import Hero from "@/sections/hero";
import Marquee from "@/sections/marquee";
import FirstPrinciples from "@/sections/first-principles";
import Layers from "@/sections/layers";
import Stance from "@/sections/stance";
import Work from "@/sections/work";
import Services from "@/sections/services";
import About from "@/sections/about";
import Cta from "@/sections/cta";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Marquee />
      <FirstPrinciples />
      <Layers />
      <Stance />
      <Work />
      <Services />
      <About />
      <Cta />
    </main>
  );
}