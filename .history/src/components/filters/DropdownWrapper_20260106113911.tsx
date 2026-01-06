import CloseIcon from "../../assets/icons/cancel.svg";
import { useLayoutEffect, useRef, useState, useEffect } from "react";

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "primary" | "white";
  contentRef?: React.RefObject<HTMLDivElement | null>;
  fullScreen?: boolean;
  mobilePositioned?: boolean;
  className?: string;// новый пропс для мобильного
  topOffset?: string;
}

export const DropdownWrapper: React.FC<Props> = ({
  title,
  onClose,
  children,
  footer,
  contentRef,
  fullScreen = false,
  mobilePositioned = false,  topOffset
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const internalContentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>("auto");
  const [shouldOpenLeft, setShouldOpenLeft] = useState(false);

  // --- определение позиции для десктопных дропдаунов ---
  useLayoutEffect(() => {
    const handlePosition = () => {
      const width = window.innerWidth;
      const btnRect = dropdownRef.current?.parentElement?.getBoundingClientRect();
      const dropdownWidth = title === "Filters" || title === "Metro station" ? 474 : 366;
      let openLeft = false;

      if ((title === "Budget" && width < 1100) || (title === "Amenities" && width < 945)) {
        openLeft = true;
      }

      if (btnRect && btnRect.left + dropdownWidth > width - 10) {
        openLeft = true;
      }

      setShouldOpenLeft(openLeft);
    };

    handlePosition();
    window.addEventListener("resize", handlePosition);
    return () => window.removeEventListener("resize", handlePosition);
  }, [title]);

  // --- вычисление высоты для десктопа ---
  const updateHeight = () => {
    if (fullScreen || mobilePositioned) return;
    const dropdownEl = dropdownRef.current;
    if (!dropdownEl) return;

    const rect = dropdownEl.getBoundingClientRect();
    const footerEl = document.querySelector("footer");
    let availableHeight = window.innerHeight;

    if (footerEl) {
      const footerRect = footerEl.getBoundingClientRect();
      const footerTop = footerRect.top + window.scrollY;
      const dropdownTop = rect.top + window.scrollY;
      availableHeight = footerTop - dropdownTop - 50;
    } else {
      availableHeight = window.innerHeight - rect.top - 50;
    }

    setMaxHeight(`${Math.max(availableHeight, 300)}px`);
  };

  useLayoutEffect(() => {
    if (fullScreen || mobilePositioned) return;
    updateHeight();

    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", updateHeight);

    const footer = document.querySelector("footer");
    const resizeObserver = new ResizeObserver(updateHeight);
    const mutationObserver = new MutationObserver(updateHeight);

    if (footer) {
      resizeObserver.observe(footer);
      mutationObserver.observe(footer, { childList: true, subtree: true });
    }
    if (dropdownRef.current) {
      mutationObserver.observe(dropdownRef.current, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", updateHeight);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [fullScreen, mobilePositioned]);

  // --- запрет скролла body для fullscreen ---
  useEffect(() => {
    if (!fullScreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fullScreen]);

  const widthClass = title === "Filters" || title === "Metro station" ? "w-[474px]" : "w-[366px]";

  // --- FULLSCREEN (мобильный fullscreen) ---
  if (fullScreen) {
    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
        <div
          className="fixed inset-x-0 bottom-0 max-h-[92vh] z-[120] 
                     flex flex-col bg-white rounded-t-3xl shadow-2xl
                     animate-in slide-in-from-bottom-full duration-350 ease-out"
          ref={dropdownRef}
        >
          <div className="py-3 flex justify-center">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="flex justify-between items-center px-6 pb-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <button onClick={onClose} className="p-2">
              <img src={CloseIcon} alt="close" className="w-7 h-7" />
            </button>
          </div>

          <div ref={contentRef} className="flex-1 overflow-y-auto px-6 pb-6">
            {children}
          </div>

          {footer && <div className="px-6 py-5 border-t bg-white">{footer}</div>}
        </div>
      </>
    );
  }

  // --- МОБИЛЬНЫЙ позиционированный дропдаун ---
  if (mobilePositioned) {
    return (
      <>
        <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
        <div
          ref={dropdownRef}
          className="fixed z-[120] bg-white rounded-xl shadow-xl flex flex-col"
          style={{
            top: "50px",
            bottom: "50px",
            left: "16px",
            right: "16px",
            overflow: "hidden",
          }}
        >
          <div className="flex justify-between items-center py-4 px-6 bg-white sticky top-0 z-10">
            <h3 className="font-bold text-2xl">{title}</h3>
            <button onClick={onClose}>
              <img src={CloseIcon} alt="Close" className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={(el) => {
              internalContentRef.current = el;
              if (contentRef && "current" in contentRef)
                (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }}
            className="flex-1 p-6 overflow-y-auto"
          >
            {children}
          </div>

          {footer && (
            <div className="px-6 py-4 border-t bg-white sticky bottom-0 z-10">{footer}</div>
          )}
        </div>
      </>
    );
  }

  // --- обычный десктопный dropdown ---
  return (
    <div
      ref={dropdownRef}
      className={`absolute z-50 mt-2 ${shouldOpenLeft ? "right-0" : "left-05"} ${widthClass} flex flex-col rounded-xl border border-black bg-[#F7F7F7] shadow-xl`}
      style={{
        maxHeight: "72vh" || maxHeight ,
        overflow: "hidden",
        top: topOffset ?? "100%",
        // прямо под кнопкой
      }}
    >
      <div className="flex justify-between items-center py-4 px-6 bg-[#F7F7F7] sticky top-0 z-10 h-[65px]">
        <h3 className={title === "Filters" ? "font-bold text-[32px]" : "font-semibold text-[22px]"}>
          {title}
        </h3>
        <button onClick={onClose}>
          <img src={CloseIcon} alt="Close" className="w-6 h-6" />
        </button>
      </div>

      <div
        ref={(el) => {
          internalContentRef.current = el;
          if (contentRef && "current" in contentRef)
            (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className="flex-1  poverflow-y-auto border-t border-gray-300"
      >
        {children}
      </div>

      <div>{footer && (
        <div className="h-[80px] px-6 py-4 bg-[#F7F7F7] border-t border-black sticky bottom-0 z-10">
          {footer}
        </div>
      )}
      </div>
    </div>
  );
};
