import { useEffect, useState, useCallback } from "react";
import ArrowUpIcon from "../../assets/icons/Activeblack.svg";

type ScrollToTopProps = {
  showAfter?: number;
  scrollDuration?: number;
};

export const ScrollToTopButton = ({
  showAfter = 200,
  scrollDuration = 500,
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [distanceToFooter, setDistanceToFooter] = useState(40);

  // Показать кнопку после прокрутки
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > showAfter);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  // Рассчитываем расстояние до футера
  useEffect(() => {
    const calculateDistance = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const footerTop = footerRect.top;
      
      // Если футер виден в viewport
      if (footerTop < viewportHeight) {
        // Расстояние от нижней границы viewport до верха футера
        const overlap = viewportHeight - footerTop;
        // Фиксированный отступ 40px от футера
        setDistanceToFooter(overlap + 40);
      } else {
        // Стандартный отступ от нижнего края
        setDistanceToFooter(40);
      }
    };

    const throttledCalculate = throttle(calculateDistance, 100);
    window.addEventListener("scroll", throttledCalculate);
    window.addEventListener("resize", throttledCalculate);
    calculateDistance(); // Первоначальный расчет

    return () => {
      window.removeEventListener("scroll", throttledCalculate);
      window.removeEventListener("resize", throttledCalculate);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const start = window.scrollY;
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      const ease = easeOutCubic(progress);
      window.scrollTo(0, start * (1 - ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [scrollDuration]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed right-[42px]
        w-12 h-12
        flex items-center justify-center
        bg-[#21262B] text-white
        rounded-full shadow-lg
        hover:bg-purple-700
        transition-all duration-200
        z-50
      `}
      style={{
        bottom: `${distanceToFooter}px`,
        transition: "bottom 0.2s ease-out",
      }}
    >
      <img src={ArrowUpIcon} alt="Scroll to top" className="w-12 h-12" />
    </button>
  );
};

// Вспомогательная функция throttle
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return function(this: any, ...args: Parameters<T>) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  } as T;
}