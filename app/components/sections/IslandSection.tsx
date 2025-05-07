import { useEffect, useRef } from "react";
import { gsap, Power4, Power2 } from "gsap";
import usePageScroller from "~/hooks/usePageScroller";

const animations = [
  {
    selector: "#app-store",
    duration: 3,
    scale: 0.9,
    x: 500,
    y: 100,
    ease: Power4.easeOut,
  },
  {
    selector: "#screen-time",
    duration: 3,
    scale: 0.9,
    x: -500,
    y: -300,
    ease: Power2.easeOut,
  },
  {
    selector: "#weather",
    duration: 3,
    scale: 1.1,
    x: -400,
    y: 350,
    ease: Power4.easeOut,
  },
  {
    selector: "#stocks",
    duration: 3,
    scale: 0.9,
    x: 530,
    y: -170,
    ease: Power4.easeOut,
  },
  {
    selector: "#fitness",
    duration: 3,
    scale: 1.1,
    x: -350,
    y: -100,
    ease: Power2.easeOut,
  },
  {
    selector: "#find-my",
    duration: 3,
    scale: 1.1,
    x: 400,
    y: -360,
    ease: Power4.easeOut,
  },
  {
    selector: "#calendar",
    duration: 3,
    scale: 0.9,
    x: -630,
    y: 0,
    ease: Power2.easeOut,
  },

  {
    selector: "#wallet",
    duration: 3,
    scale: 1,
    x: -280,
    y: 100,
    ease: Power4.easeOut,
  },
  {
    selector: "#apple-tv",
    duration: 3,
    scale: 1,
    x: 500,
    y: 300,
    ease: Power4.easeOut,
  },
  {
    selector: "#sleep",
    duration: 3,
    scale: 0.9,
    x: 270,
    y: -50,
    ease: Power2.easeOut,
  },
  {
    selector: "#socials",
    duration: 3,
    scale: 1,
    x: 330,
    y: 120,
    ease: Power2.easeOut,
  },
];

function IslandSection() {
  const masterTimeline = useRef<gsap.core.Timeline>(null);
  const iphoneRef = useRef<HTMLImageElement>(null);
  const widgetsRef = useRef<(HTMLImageElement | HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!iphoneRef.current && widgetsRef.current.length == 0) return;
    gsap.set(iphoneRef.current, { x: -450, rotation: 90 });
    gsap.set(widgetsRef.current, { opacity: 0, scale: 0 });
  }, []);

  function iPhoneAnimation() {
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.to(iphoneRef.current, { x: 0 })
      .to(iphoneRef.current, { rotation: 0, scale: 0.9 })
      .to(iphoneRef.current, { duration: 3, scale: 1 });
    return tl;
  }

  function widgetAnimation() {
    const tl = gsap.timeline();
    tl.to(widgetsRef.current, { duration: 0, opacity: 1 });
    return tl;
  }

  const animation = () => {
    const startTime = 2;
    masterTimeline.current = gsap.timeline();
    masterTimeline.current
      .add(iPhoneAnimation())
      .add(widgetAnimation(), startTime);

    animations.forEach((animation, index) => {
      const { selector, duration, scale, x, y, ease } = animation;
      const element = document.querySelector(selector);
      if (!masterTimeline.current) return;
      masterTimeline.current.add(
        gsap.to(element, { duration, scale, x, y, ease }),
        startTime + (index % 3) / 2
      );
    });
  };

  const reverseAnaimation = () => {
    if (!masterTimeline.current) return;
    masterTimeline.current.reverse();
  };

  usePageScroller(animation, reverseAnaimation, 2);
  return (
    <section className="animation relative flex justify-center items-center w-[100vw] h-[100vh]">
      <img
        ref={iphoneRef}
        className="iphone absolute h-[600px]"
        src="https://assets.codepen.io/8292695/iphone-14.svg"
        alt=""
      />
      <img
        id="app-store"
        ref={(el) => {
          widgetsRef.current[0] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/appstore-widget.svg"
        alt=""
      />
      <img
        id="screen-time"
        ref={(el) => {
          widgetsRef.current[1] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/screen-time-widget.svg"
        alt=""
      />
      <img
        id="weather"
        ref={(el) => {
          widgetsRef.current[2] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/weather-widget.svg"
        alt=""
      />
      <img
        id="stocks"
        ref={(el) => {
          widgetsRef.current[3] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/stocks-widget.svg"
        alt=""
      />
      <img
        id="calendar"
        ref={(el) => {
          widgetsRef.current[4] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/calendar-widget.svg"
        alt=""
      />
      <img
        id="fitness"
        ref={(el) => {
          widgetsRef.current[5] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/fitness-widget.svg"
        alt=""
      />
      <img
        id="find-my"
        ref={(el) => {
          widgetsRef.current[6] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/find-my-widget.svg"
        alt=""
      />
      <img
        id="sleep"
        ref={(el) => {
          widgetsRef.current[7] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/sleep-widget.svg"
        alt=""
      />
      <img
        id="apple-tv"
        ref={(el) => {
          widgetsRef.current[8] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/apple-tv.svg"
        alt=""
      />
      <img
        id="wallet"
        ref={(el) => {
          widgetsRef.current[9] = el;
        }}
        className="widgets absolute z-[-1] scale-0"
        src="https://assets.codepen.io/8292695/wallet.svg"
        alt=""
      />
      <div
        id="socials"
        ref={(el) => {
          widgetsRef.current[10] = el;
        }}
        style={{ background: `linear-gradient(#ff348b, #e30217)` }}
        className="widgets absolute z-[-1] scale-0 rounded-[30px] aspect-square flex justify-evenly items-center flex-wrap h-[140px]"
      >
        <a
          href="https://twitter.com/GibsonSMurray"
          target="_blank"
          title="𝕏 account"
        >
          <span>𝕏</span>
        </a>
        <a href="https://haptic.app/" target="_blank" title="inspiration">
          <span>✰</span>
        </a>
      </div>
    </section>
  );
}
export default IslandSection;
