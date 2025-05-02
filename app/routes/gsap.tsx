import type { Route } from "./+types/gsap";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import Snap from "lenis/snap";
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
import Applications from "~/components/Applications";
import "lenis/dist/lenis.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GSAP" },
    { name: "description", content: "Welcome to Gsap testing ground!" },
  ];
}

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<LenisRef>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const sections = 6;
      const endScroll = window.innerHeight * (sections - 1);
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${endScroll}`,
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: true,
        },
      });

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

      // Section 1 exit
      tl.to(".hero", { opacity: 0, duration: 0.5 }, 0.2);

      // Section 2 enter
      tl.fromTo(
        ".one",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.inOut" },
        0.5
      );
      tl.fromTo(
        ".island",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 5, duration: 2, ease: "power1.out" },
        0.7
      );

      // Section 2 exit
      tl.to(".one", { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 2);

      // Section 3 enter
      tl.fromTo(
        ".two",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" },
        2.2
      );
      // Section 3 exit
      tl.to(
        ".two",
        { x: "-100%", opacity: 0, duration: 1, ease: "power1.inOut" },
        3
      );
      // Section 4 enter
      tl.fromTo(
        ".three",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" },
        3.5
      );
      // Section 4 exit
      tl.to(
        ".three",
        { y: "-100%", opacity: 0, duration: 0.5, ease: "power1.inOut" },
        4.5
      );
      // Section 5 enter
      tl.fromTo(
        ".four",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" },
        4.8
      );
      // Section 5 exit
      tl.to(
        ".four",
        { x: "100%", opacity: 0, duration: 0.5, ease: "power1.inOut" },
        5.5
      );
      // Section 6 enter
      tl.fromTo(
        ".five",
        { opacity: 0, display: "none" },
        { opacity: 1, display: "flex", duration: 0.5, ease: "power1.out" },
        6
      );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (!lenisRef.current) return;
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  const lenis = useLenis(ScrollTrigger.update);
  useEffect(() => ScrollTrigger.refresh(), [lenis]);

  useEffect(() => {
    if (!lenis) return;
    const snap = new Snap(lenis, { velocityThreshold: 10 });
    Array.from({ length: 6 }).map((_, i) => {
      snap.add(window.innerHeight * i);
      console.log("Added snap for index: ", i + 1);
    });
  }, [lenis]);

  return (
    <ReactLenis
      options={{ autoRaf: false }}
      ref={lenisRef}
      root
      className={`h-screen w-full`}
    >
      <div
        ref={containerRef}
        style={{ padding: 0, margin: 0 }}
        className="w-full h-screen "
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
        <div className="one h-screen flex justify-center items-center absolute inset-0">
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
        <div className="two h-screen flex justify-center items-center absolute inset-0 px-4">
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
        {/* Section 4*/}
        <div className="three h-screen flex justify-center items-center absolute inset-0 px-4">
          <div className={`flex justify-center items-center w-full h-full`}>
            <div className="w-full h-it sm:space-y-8 space-y-4 transition-all duration-700 ease-out px-4">
              <h2
                className={`text-center text-black font-semibold lg:text-[30px] md:text-[28px] text-[20px] fade-in-block`}
              >
                Let's build your project next
              </h2>
              <LogosCarousel />
            </div>
          </div>
        </div>
        {/*Section 5*/}
        <div
          className={`four h-screen flex justify-center items-center absolute inset-0 px-4`}
        >
          <div className="text-center text-black px-4 w-full">
            <h2 className="text-4xl md:text-6xl font-bold">Right Exit</h2>
            <p className="mt-4 text-xl md:text-2xl">
              Content slides out to the right
            </p>
            <div className="mt-8 w-32 h-1 bg-indigo-400 mx-auto"></div>
          </div>
        </div>
        {/* Section 6*/}
        <div
          className={`five h-screen flex-col justify-between items-center hidden absolute inset-0`}
        >
          <Applications />
          <footer
            className={`w-full h-[100px] flex justify-between bg-neutral-800 text-white p-4`}
          >
            <p className="text-[20px] font-semibold">M3tering</p>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-white hover:text-gray-300 transition"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Page;
