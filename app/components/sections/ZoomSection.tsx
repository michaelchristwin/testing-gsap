import { gsap } from "gsap";
import { useRef } from "react";
import { AnimeBg, Island } from "~/assets/images";
import usePageScroller from "~/hooks/usePageScroller";

function ZoomSection() {
  const islandRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  const animateIsland = () => {
    tl.current = gsap.timeline();
    tl.current.fromTo(
      islandRef.current,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 5, duration: 1 }
    );
  };

  const reverseIslandAnimation = () => {
    if (!tl.current) return;
    tl.current.reverse();
  };

  usePageScroller(animateIsland, reverseIslandAnimation, 1);
  return (
    <div className="islandSection section h-screen flex justify-center items-center relative">
      <div
        style={{ backgroundImage: `url(${AnimeBg.img.src})` }}
        className="absolute inset-0 z-10 flex justify-center items-center bg-no-repeat bg-cover bg-center"
      >
        <div className="transition-all duration-700 ease-out flex items-center justify-center">
          <div
            className="w-24 h-24 island md:w-32 md:h-32 rounded-full flex items-center justify-center"
            ref={islandRef}
          >
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
  );
}
export default ZoomSection;
