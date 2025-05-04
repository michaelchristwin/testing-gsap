import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

type AnimationContextType = {
  containerRef: RefObject<HTMLDivElement | null>;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  totalSections: RefObject<number>;
  currentPage: RefObject<number>;
  lastAnimationTime: RefObject<number>;
  isAnimating: RefObject<boolean>;
  touchStartY: RefObject<number>;
  sectionAnimations: RefObject<{
    forward: (() => void)[];
    reverse: (() => void)[];
  }>;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context)
    throw new Error("useAnimation must be used within AnimationProvider");
  return context;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isPaused, setIsPaused] = useState(false);
  const currentPage = useRef(0);
  const isAnimating = useRef(false);
  const lastAnimationTime = useRef(0);
  const totalSections = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const sectionAnimations = useRef<{
    forward: (() => void)[];
    reverse: (() => void)[];
  }>({
    forward: [],
    reverse: [],
  });

  return (
    <AnimationContext.Provider
      value={{
        isPaused,
        pause,
        resume,
        totalSections,
        currentPage,
        lastAnimationTime,
        isAnimating,
        touchStartY,
        containerRef,
        sectionAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
