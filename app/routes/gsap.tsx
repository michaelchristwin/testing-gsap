import type { Route } from "./+types/gsap";
import Hero from "~/components/sections/Hero";
import ZoomSection from "~/components/sections/ZoomSection";
import MetricsSection from "~/components/sections/MetricsSection";
import CompaniesSection from "~/components/sections/CompaniesSection";
import RightExit from "~/components/sections/RightExit";
import FinalSection from "~/components/sections/FinalSection";
import { useAnimation } from "~/context/AnimationContext";
import IslandSection from "~/components/sections/IslandSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GSAP" },
    { name: "description", content: "Welcome to Gsap testing ground!" },
  ];
}

const Page = () => {
  const { containerRef } = useAnimation();

  return (
    <div className="overflow-hidden h-[100%]">
      <div ref={containerRef} className="w-full h-[100dvh] p-0 m-0 relative">
        <Hero />
        <ZoomSection />
        <IslandSection />
        <MetricsSection />
        <CompaniesSection />
        <RightExit />
        <FinalSection />
      </div>
    </div>
  );
};

export default Page;
