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
import LogosCarousel from "~/components/LogosCarousel";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GSAP" },
    { name: "description", content: "Welcome to Gsap testing ground!" },
  ];
}
const Page = () => {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapper.current) return;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scrollCcontainer",
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: true,
          snap: 1 / 4,
        },
      });

      tl.to(".one", {
        duration: 2,
        xPercent: -110,
      });

      tl.to(".two", {
        yPercent: -110,
        duration: 2,
      });

      tl.to(".three", {
        xPercent: 110,
        duration: 2,
      });
    },
    { scope: wrapper }
  );
  return (
    <div
      ref={wrapper}
      style={{ padding: "none", margin: "none" }}
      className={`w-full`}
    >
      <div
        className={`first h-[100vh] m-0 p-0 box-border flex justify-center items-center`}
      >
        <Particles />
        <div className="w-[90%] sm:w-[50%] text-white">
          <div className={`w-full`}>
            <h1 className="text-2xl text-start md:text-3xl font-bold mb-4">
              <span className="inline-block transition-all duration-700 ease-out playwrite-hr">
                Introducing
              </span>
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span
                className="inline-block transition-all duration-700 ease-out june-expt-variable"
                style={{
                  fontVariationSettings: ` 'STYL' 60`,
                }}
              >
                M3tering
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-6xl text-end md:text-8xl font-bold">
              <span
                className="inline-block transition-all duration-700 ease-out june-expt-variable"
                style={{
                  fontVariationSettings: ` 'STYL' 60`,
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
      <div
        className={`scrollCcontainer h-[100vh] bg-orange-400 m-0 p-0 relative flex justify-center items-center`}
      >
        <h1>The animation is finished</h1>
        <div className="one h-[100vh] flex justify-center items-center absolute top-0 right-0 left-0 bottom-0 z-10">
          <div
            style={{ backgroundImage: `url(${AnimeBg.img.src})` }}
            className="absolute inset-0 z-10 flex justify-center items-center bg-no-repeat bg-cover bg-center"
          >
            <div className="transition-all duration-700 ease-out flex items-center justify-center">
              {/* Placeholder logo/image */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
                <picture>
                  {Object.entries(Island.sources).map(([type, srcset]) => (
                    <source key={type} type={`image/${type}`} srcSet={srcset} />
                  ))}
                  <img
                    src={Island.img.src}
                    width={Island.img.w}
                    height={Island.img.h}
                    alt={`Island`}
                    className={`max-w-full max-h-full transition-all duration-300 ease-in-out object-contain`}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div className="two h-[100vh] flex justify-center items-center absolute top-0 right-0 left-0 bottom-0 z-9 bg-[#f08080]">
          <div className="absolute inset-0 bg-[#faf9f6] px-4 z-9 flex justify-center items-center">
            <div className="w-full transition-all duration-700 ease-out">
              <section className={`h-fit w-full mb-[100px]`}>
                <div className="h-fit py-12">
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
                          <Counter from={0} to={10000} />
                          <p className={`font-[600] text-[20px] fade-in-block`}>
                            kWh of electricity generated
                          </p>
                        </div>
                      </Metric>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Bottom row: 3 cards */}
                      <Metric image={WindTurbine.img.src}>
                        <div
                          className={`block text-center space-y-[5px] w-full z-2 text-white`}
                        >
                          <Counter from={0} to={4000} />
                          <p className={`font-[600] text-[20px] fade-in-block`}>
                            Tonnes of CO₂ prevented
                          </p>
                        </div>
                      </Metric>

                      <Metric image={Revenue.img.src}>
                        <div
                          className={`block text-center space-y-[5px] w-full z-2 text-white`}
                        >
                          <Counter from={0} to={30000} prefix="$" />
                          <p className={`font-[600] text-[20px] fade-in-block`}>
                            Revenue generated
                          </p>
                        </div>
                      </Metric>

                      <Metric image={EcoVillages.img.src}>
                        <div
                          className={`block text-center space-y-[5px] w-full z-2 text-white`}
                        >
                          <Counter from={0} to={6} />
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
        </div>
        <div className="three h-[100vh] flex justify-center items-center absolute top-0 right-0 left-0 bottom-0 z-8 bg-[#e0ffff]">
          <div className="absolute inset-0 bg-[#faf9f6] z-8 flex justify-center items-center">
            <div className="w-full space-y-6 transition-all duration-700 ease-out px-4">
              <h2
                className={`text-center font-semibold lg:text-[30px] md:text-[28px] text-[25px] fade-in-block`}
              >
                Let's build your project next
              </h2>
              <LogosCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
