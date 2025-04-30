import type { Route } from "./+types/gsap";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "~/components/Particles";
import { AnimeBg, Island } from "~/assets/images";
import Metric from "~/components/Metric";
import Counter from "~/components/Counter";
import {
  EcoVillages,
  Panel,
  Revenue,
  WindTurbine,
} from "~/assets/images/metrics";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GSAP" },
    { name: "description", content: "Welcome to Gsap testing ground!" },
  ];
}

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      // Create timeline for section transitions
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: true,
          snap: {
            snapTo: 1 / 3,
            duration: 0.5,
            ease: "power1.inOut",
          },
        },
      });

      // Section 1 exit
      tl.to(
        ".heroText1",
        { opacity: 0, x: -700, ease: "power1.out", duration: 0.3 },
        0
      );
      tl.to(
        ".heroText2",
        { opacity: 0, x: 700, ease: "power1.out", duration: 0.3 },
        0
      );
      tl.to(".hero", { opacity: 0, duration: 0.5 }, 0.2);

      // Section 2 enter
      tl.fromTo(
        ".one",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.inOut" },
        0.3
      );
      tl.fromTo(
        ".island",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 2, ease: "power1.out" },
        0.4
      );

      // Section 2 exit
      tl.to(".one", { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 0.7);

      // Section 3 enter
      tl.fromTo(
        ".two",
        { x: -300 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" },
        0.75
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{ padding: 0, margin: 0 }}
      className="w-full h-screen overflow-hidden"
    >
      {/* Section 1 */}
      <div
        className="first h-screen hero m-0 p-0 box-border flex justify-center items-center absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a4a 100%)",
        }}
      >
        <Particles />
        <div className="w-[90%] sm:w-[50%] text-white">
          <div className="w-full heroText1">
            <h1 className="text-2xl text-start md:text-3xl font-bold mb-4">
              <span className="inline-block transition-all duration-700 ease-out playwrite-hr">
                Introducing
              </span>
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span
                className="inline-block transition-all duration-700 ease-out june-expt-variable"
                style={{
                  fontVariationSettings: "'STYL' 60",
                }}
              >
                M3tering
              </span>
            </h1>
          </div>
          <div className="heroText2 w-full">
            <h1 className="text-6xl text-end md:text-8xl font-bold">
              <span
                className="inline-block transition-all duration-700 ease-out june-expt-variable"
                style={{
                  fontVariationSettings: "'STYL' 60",
                }}
              >
                Protocol
              </span>
            </h1>
            <h1 className="text-2xl text-end md:text-3xl font-bold">
              <span className="inline-block transition-all duration-700 ease-out playwrite-hr">
                V2
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="one h-screen flex justify-center items-center absolute inset-0 opacity-0">
        <div
          style={{ backgroundImage: `url(${AnimeBg.img.src})` }}
          className="absolute inset-0 z-10 flex justify-center items-center bg-no-repeat bg-cover bg-center"
        >
          <div className="transition-all duration-700 ease-out flex items-center justify-center">
            <div className="w-24 h-24 island md:w-32 md:h-32 rounded-full flex items-center justify-center">
              <picture>
                {Object.entries(Island.sources).map(([type, srcset]) => (
                  <source key={type} type={`image/${type}`} srcSet={srcset} />
                ))}
                <img
                  src={Island.img.src}
                  width={Island.img.w}
                  height={Island.img.h}
                  alt="Island"
                  className="max-w-full max-h-full transition-all duration-300 ease-in-out object-contain"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div className="two h-screen justify-center items-center absolute inset-0 opacity-0 px-4">
        <section className={`h-full w-full bg-[#faf9f6] text-black`}>
          <div className="h-full py-12">
            <div className="space-y-[50px]">
              <h2
                className={`text-center font-semibold lg:text-[30px] md:text-[28px] text-[25px] fade-in-block`}
              >
                Real Environmental Impact; Real Economic Value
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Top row: 2 cards */}
                <div className="bg-white rounded-lg shadow-sm h-64 flex items-center justify-center text-center">
                  <div className="w-full h-full">
                    <video
                      src="/videos/m3terhead.webm"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    ></video>
                  </div>
                </div>

                <Metric image={Panel.img.src}>
                  <div
                    className={`block text-center space-y-[5px] w-full z-2 text-white`}
                  >
                    <Counter to={10000} />
                    <p className={`font-[600] text-[20px] fade-in-block`}>
                      kWh of electricity generated
                    </p>
                  </div>
                </Metric>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Metric image={WindTurbine.img.src}>
                  <div
                    className={`block text-center space-y-[5px] w-full z-2 text-white`}
                  >
                    <Counter to={4000} />
                    <p className={`font-[600] text-[20px] fade-in-block`}>
                      Tonnes of CO₂ prevented
                    </p>
                  </div>
                </Metric>

                <Metric image={Revenue.img.src}>
                  <div
                    className={`block text-center space-y-[5px] w-full z-2 text-white`}
                  >
                    <Counter to={30000} />
                    <p className={`font-[600] text-[20px] fade-in-block`}>
                      Revenue generated
                    </p>
                  </div>
                </Metric>

                <Metric image={EcoVillages.img.src}>
                  <div
                    className={`block text-center space-y-[5px] w-full z-2 text-white`}
                  >
                    <Counter to={6} />
                    <p className={`font-[600] text-[20px] fade-in-block`}>
                      Ecovillages
                    </p>
                  </div>
                </Metric>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
