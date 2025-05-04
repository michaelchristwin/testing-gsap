import { useEffect, useRef } from "react";
import LogosCarousel from "../LogosCarousel";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

export default function CompaniesSection() {
  const containerRef = useRef(null);
  const splitTextRef = useRef(null); // Fixed ref name for clarity

  useEffect(() => {
    // Wait for fonts to load before setting initial opacity
    document.fonts.ready.then(() => {
      if (splitTextRef.current) {
        gsap.set(splitTextRef.current, { opacity: 1 });
      }
    });
  }, []);

  useEffect(() => {
    // Make sure the DOM element exists before proceeding
    if (!splitTextRef.current) return;

    // Create timeline
    const tl = gsap.timeline({ paused: true });

    // Create the SplitText instance properly
    const split = new SplitText(splitTextRef.current, {
      type: "words",
      wordsClass: "word",
    });

    // Define the animation
    tl.from(
      split.words,
      {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)", // Added more specific ease for better animation
      },
      0
    );

    // Intersection Observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
            console.log("SplitText animation played");
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      { threshold: 0.3 } // Reduced threshold to trigger earlier
    );

    observer.observe(splitTextRef.current);

    // Cleanup function
    return () => {
      observer.disconnect();
      if (split) split.revert(); // Clean up SplitText
    };
  }, []);

  return (
    <div
      className="three section h-screen flex justify-center items-center px-4"
      ref={containerRef}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-full h-it sm:space-y-8 space-y-4 transition-all duration-700 ease-out px-4">
          <h2
            ref={splitTextRef}
            aria-label="Let's build your project next"
            className="text-center opacity-0 will-change-transform text-black font-semibold lg:text-[30px] md:text-[28px] text-[20px] fade-in-block"
          >
            Let's build your project next
          </h2>
          <LogosCarousel />
        </div>
      </div>
    </div>
  );
}
