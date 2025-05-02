import type { Route } from "./+types/test";
import { useState, useEffect, useCallback } from "react";

const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test" },
    { name: "description", content: "Welcome to testing ground!" },
  ];
}

export default function Page() {
  const [index, setIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const next = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, sections.length - 1));
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (scrolling) return;

      setScrolling(true);
      if (e.deltaY > 0) {
        next();
      } else {
        prev();
      }

      setTimeout(() => setScrolling(false), 500); // Lockout time between scrolls
    },
    [scrolling, next, prev]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-black text-white text-3xl transition-all duration-700">
      {sections[index]}
    </div>
  );
}
