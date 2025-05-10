import type { CountUp } from "countup.js";
import { useEffect, useRef } from "react";

const Counter: React.FC<{ to: number }> = ({ to }) => {
  const spanElement = useRef<HTMLDivElement>(null);
  let countUpAnim: CountUp;
  const observer = useRef<IntersectionObserver | null>(null);
  const isVisible = useRef(false);

  async function initCountUp() {
    if (!spanElement.current) return;
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(spanElement.current, to, {
      duration: 2.5,
      useEasing: true,
      useGrouping: true,
    });
  }

  const setupObserver = () => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.current && countUpAnim) {
            isVisible.current = true;
            countUpAnim.reset();
            countUpAnim.start();
          }

          if (!entry.isIntersecting && isVisible.current) {
            isVisible.current = false;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (spanElement.current) {
      observer.current.observe(spanElement.current);
    }
  };

  useEffect(() => {
    if (countUpAnim) {
      countUpAnim.update(to);
      if (isVisible.current) {
        countUpAnim.start();
      }
    }
  }, [to]);

  useEffect(() => {
    initCountUp().then(setupObserver);
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <span
      ref={spanElement}
      className={`font-mono font-extrabold xl:text-[60px] lg:text-[50px] md:text-[35px] text-[60px] text-white`}
    >
      0
    </span>
  );
};

export default Counter;
