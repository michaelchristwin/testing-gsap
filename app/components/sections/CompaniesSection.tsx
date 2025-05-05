// CompaniesSection.tsx
import { useEffect, useRef } from "react";
import LogosCarousel from "../LogosCarousel";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { companyicons } from "~/assets/images/companies";
gsap.registerPlugin(SplitText);

export default function CompaniesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize the refs array with the correct length
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, companyicons.length);
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (splitTextRef.current) {
        gsap.set(splitTextRef.current, { opacity: 1 });
      }
    });
  }, []);

  useEffect(() => {
    if (!splitTextRef.current) return;

    const tl = gsap.timeline({ paused: true });
    const split = new SplitText(splitTextRef.current, {
      type: "words",
      wordsClass: "word",
    });

    // Filter out null refs
    const validCards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    tl.from(
      split.words,
      {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      0
    );

    tl.fromTo(
      validCards,
      {
        y: 50,
        opacity: 0,
        duration: 1,
        onStart: () => {
          console.log("Cards animation");
        },
      },
      { ease: "power2.out", y: 0, stagger: 0.1, opacity: 1 },
      1 // Reduced delay to make cards appear sooner
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Lower threshold
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      split.revert();
    };
  }, []);

  return (
    <div
      className="three section h-screen flex justify-center items-center px-4"
      ref={containerRef}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-full h-fit sm:space-y-8 space-y-4 transition-all duration-700 ease-out px-4">
          <h2
            ref={splitTextRef}
            aria-label="Let's build your project next"
            className="text-center opacity-0 will-change-transform text-black font-semibold lg:text-[30px] md:text-[28px] text-[20px]"
          >
            Let's build your project next
          </h2>
          <LogosCarousel refs={cardsRef} />
        </div>
      </div>
    </div>
  );
}
