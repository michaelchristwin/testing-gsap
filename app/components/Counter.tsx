import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({
  from,
  to,
  duration = 2.5,
  className = "",
  prefix = "",
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(from);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useGSAP(() => {
    if (!spanRef.current || hasAnimatedRef.current) return;
    const obj = { val: from };

    ScrollTrigger.create({
      trigger: spanRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        hasAnimatedRef.current = true;
        gsap.to(obj, {
          val: to,
          duration,
          ease: "power1.out",
          onUpdate: () => {
            setDisplayValue(Math.round(obj.val));
          },
        });
      },
    });
  }, [from, to, duration]);
  return (
    <span
      ref={spanRef}
      className={`font-mono font-extrabold xl:text-[60px] lg:text-[50px] md:text-[35px] text-[60px] text-white ${className}`}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export default Counter;
