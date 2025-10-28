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
}

export const DropdownWrapper: React.FC<Props> = ({
  title,
  onClose,
  children,
  footer,
  contentRef,
  fullScreen = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const internalContentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>("auto");
  const [shouldOpenLeft, setShouldOpenLeft] = useState(false);

  // ✅ единый эффект, который решает обе задачи:
  // - открывать Budget/Amenities влево при определённой ширине
  // - открывать влево, если не помещается справа
  useLayoutEffect(() => {
    const handlePosition = () => {
      const width = window.innerWidth;
      const btnRect = dropdownRef.current?.parentElement?.getBoundingClientRect();
      const dropdownWidth =
        title === "Filters" || title === "Metro station" ? 474 : 366;

      // по умолчанию — вправо
      let openLeft = false;

      // специальные правила
      if (
        (title === "Budget" && width < 1100) ||
        (title === "Amenities" && width < 945)
      ) {
        openLeft = true;
      }

      // если элемент не помещается на экране — тоже влево
      if (btnRect && btnRect.left + dropdownWidth > width - 10) {
        openLeft = true;
      }

      setShouldOpenLeft(openLeft);
    };

    handlePosition();
    window.addEventListener("resize", handlePosition);
    return () => window.removeEventListener("resize", handlePosition);
  }, [title]);

  // === Высота для десктопа ===
  const updateHeight = () => {
    if (fullScreen) return;
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
    if (fullScreen) return;
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
  }, [fullScreen]);

  // 🚫 запрет скролла body, если fullscreen
  useEffect(() => {
    if (!fullScreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fullScreen]);

  const widthClass =
    title === "Filters" || title === "Metro station" ? "w-[474px]" : "w-[366px]";

  // === FULLSCREEN (мобильный) ===
  if (fullScreen) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
          aria-hidden
        />
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#F7F7F7] rounded-none"
          ref={dropdownRef}
        >
          <div className="flex justify-between items-center py-4 px-6 border-b bg-white sticky top-0 z-10">
            <h3 className=" font-bold text-3xl">{title}</h3>
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
            className="flex-1 px-6 py-4 overflow-y-auto"
          >
            {children}
          </div>

          {footer && (
            <div className="px-6 py-4 bg-white border-t sticky bottom-0 z-10">
              {footer}
            </div>
          )}
        </div>
      </>
    );
  }

  // === Обычный dropdown (десктоп) ===
  return (
    <div
      ref={dropdownRef}
      className={`
        absolute z-50 mt-2 ${shouldOpenLeft ? "right-0" : "left-0"}
        ${widthClass}
        flex flex-col rounded-xl border border-black bg-[#F7F7F7] shadow-xl
      `}
      style={{
        maxHeight: "75vh" || maxHeight ,
        overflow: "hidden",
      }}
    >
      {/* header */}
      <div className="flex justify-between items-center py-4 px-6 bg-[#F7F7F7] sticky top-0 z-10 h-[80px]">
        <h3
          className={
            title === "Filters"
              ? " font-bold text-4xl"
              : " font-semibold text-3xl"
          }
        >
          {title}
        </h3>
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
        className="flex-1 p-6  overflow-y-auto border-t border-gray-300"
      >
        {children}
      </div>

      {footer && (
        <div className="h-[80px] px-6 py-4 bg-[#F7F7F7] border-t border-black sticky bottom-0 z-10">
          {footer}
        </div>
      )}
    </div>
  );
};