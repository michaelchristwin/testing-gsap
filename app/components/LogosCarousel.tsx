import type { RefObject } from "react";
import { companyicons } from "~/assets/images/companies";

type LogosCarouselProps = {
  refs: RefObject<(HTMLDivElement | null)[]>;
};

const LogosCarousel: React.FC<LogosCarouselProps> = ({ refs }) => {
  return (
    <div className={`grid sm:grid-cols-7 grid-cols-1 w-full h-fit card-grid`}>
      {companyicons.map((logo, i) => (
        <div
          key={i}
          ref={(el) => {
            if (refs.current) {
              refs.current[i] = el;
            }
          }}
          className="sm:w-full w-[180px] shadow-[_-1rem_0_3rem_rgba(0,0,0,0.25)] mx-auto sm:aspect-[2.5/3] aspect-[5/1] flex justify-center items-center p-3 lg:rounded-2xl rounded-xl bg-[#faf9f6]"
        >
          <picture>
            {Object.entries(logo.sources).map(([type, srcset]) => (
              <source key={type} type={`image/${type}`} srcSet={srcset} />
            ))}
            <img
              src={logo.img.src}
              width={logo.img.w}
              height={logo.img.h}
              alt={`Card ${i}`}
              className={`transition-all duration-300 ease-in-out object-cover`}
            />
          </picture>
        </div>
      ))}
    </div>
  );
};
export default LogosCarousel;
