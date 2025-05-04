import { useRef } from "react";
import { gsap } from "gsap";
import Particles from "../Particles";
import usePageScroller from "~/hooks/usePageScroller";

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  const textAnimation = () => {
    tl.current = gsap.timeline();
    tl.current.to(
      text1Ref.current,
      {
        duration: 1,
        opacity: 0,
        x: -700,
        ease: "power1.out",
      },
      0
    );
    tl.current.to(
      text2Ref.current,
      { opacity: 0, x: 700, ease: "power1.out", duration: 1 },
      0
    );
  };

  const reverseTextAnimation = () => {
    if (!tl.current) return;
    tl.current.reverse();
  };
  usePageScroller(textAnimation, reverseTextAnimation, 0);

  return (
    <section
      ref={heroRef}
      className="h-screen hero relative section m-0 p-0 box-border flex justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a4a 100%)",
      }}
    >
      <Particles />
      <div className="w-[90%] sm:w-[50%] text-white">
        <div className="w-full heroText1" ref={text1Ref}>
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
        <div className="heroText2 w-full" ref={text2Ref}>
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
    </section>
  );
}
export default Hero;
