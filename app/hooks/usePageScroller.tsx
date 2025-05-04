import { useEffect } from "react";
import { useAnimation } from "~/context/AnimationContext";
import { gsap } from "gsap";

function usePageScroller(
  animation: () => void,
  reverseAnimation: () => void,
  sectionIndex: number
) {
  const {
    lastAnimationTime,
    isAnimating,
    currentPage,
    totalSections,
    touchStartY,
    containerRef,
    sectionAnimations,
  } = useAnimation();

  useEffect(() => {
    // Ensure array has enough slots
    while (sectionAnimations.current.forward.length <= sectionIndex) {
      sectionAnimations.current.forward.push(() => {});
      sectionAnimations.current.reverse.push(() => {});
    }

    // Register animations
    sectionAnimations.current.forward[sectionIndex] = animation;
    sectionAnimations.current.reverse[sectionIndex] = reverseAnimation;

    return () => {
      // Clean up animations when component unmounts
      sectionAnimations.current.forward[sectionIndex] = () => {};
      sectionAnimations.current.reverse[sectionIndex] = () => {};
    };
  }, [animation, reverseAnimation, sectionIndex]);

  const wheelListener = (e: WheelEvent) => {
    const now = Date.now();
    if (isAnimating.current || now - lastAnimationTime.current < 1000) return;
    // Determine scroll direction based on deltaY value.
    if (e.deltaY > 0 && currentPage.current < totalSections.current - 1) {
      // Scrolling down
      goToPage(currentPage.current + 1);
      lastAnimationTime.current = now;
    } else if (e.deltaY < 0 && currentPage.current > 0) {
      // Scrolling up
      goToPage(currentPage.current - 1);
      lastAnimationTime.current = now;
    }
  };

  const touchStartListener = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const touchEndListener = (e: TouchEvent) => {
    if (isAnimating.current) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    // Determine if the gesture is a tap or a swipe.
    if (Math.abs(deltaY) < 10) {
      // Tap gesture: treat as "next page" if not on the last page.
      if (currentPage.current < totalSections.current - 1) {
        goToPage(currentPage.current + 1);
      }
    } else if (deltaY > 50) {
      // Swipe up: next page.
      if (currentPage.current < totalSections.current - 1) {
        goToPage(currentPage.current + 1);
      }
    } else if (deltaY < -50) {
      // Swipe down: previous page.
      if (currentPage.current > 0) {
        goToPage(currentPage.current - 1);
      }
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex < 0) pageIndex = 0;
    if (pageIndex >= totalSections.current)
      pageIndex = totalSections.current - 1;
    if (pageIndex === currentPage.current) return;
    const oldPage = currentPage.current;
    const scrollDirection = pageIndex > oldPage ? "down" : "up";
    console.log(`Scrolling ${scrollDirection}`);
    currentPage.current = pageIndex;
    isAnimating.current = true;
    if (
      scrollDirection === "down" &&
      sectionAnimations.current.forward[oldPage]
    ) {
      sectionAnimations.current.forward[oldPage]();
    } else if (
      scrollDirection === "up" &&
      sectionAnimations.current.reverse[pageIndex]
    ) {
      sectionAnimations.current.reverse[pageIndex]();
    }

    gsap.to(containerRef.current, {
      duration: 1,
      y: -pageIndex * window.innerHeight,
      ease: "power2.inOut",
      onComplete: function () {
        isAnimating.current = false;
      },
    });
  };

  const handleResize = () => {
    gsap.set(containerRef.current, {
      y: -currentPage.current * window.innerHeight,
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const sections = document.querySelectorAll(".section");
    totalSections.current = sections.length;
    console.log(totalSections.current);
    window.addEventListener("wheel", wheelListener);
    window.addEventListener("touchstart", touchStartListener);
    window.addEventListener("touchend", touchEndListener);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", wheelListener);
      window.removeEventListener("touchstart", touchStartListener);
      window.removeEventListener("touchend", touchEndListener);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}
export default usePageScroller;
