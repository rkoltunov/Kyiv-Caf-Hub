import { useEffect, useRef, useState } from "react";
import FiltersIcon from "../../assets/icons/filter.svg";
import ChevronDownIcon from "../../assets/icons/arrow-down.svg";
import ChevronRightIcon from "../../assets/icons/arrow-right.svg";
import ChevronUpIcon from "../../assets/icons/arrow-up.svg";
import CloseIcon from "../../assets/icons/cancel.svg";
import { DropdownWrapper } from "./DropdownWrapper";
import { CustomCheckbox } from "./CustomCheckbox";
import { StationsGroup } from "./StationsGroup";
import { useFilterState } from "./useFilterState";
import DropdownSearchBar from "./DropdownSearchBar";
import { metroSubGroups, whiteFilters } from "./constants";

type Props = {
  selectedFilters: Record<string, string[]>;
  onApply: (filters: Record<string, string[]>) => void;
  onClear: () => void;
};

export default function FiltersSection({ selectedFilters, onApply, onClear }: Props) {
  const { openFilter, toggleFilter, searchTerm, setSearchTerm, openSections, toggleSection } =
    useFilterState();

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const dropdownContentRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<Record<string, string[]>>(selectedFilters);

  // 🔄 Синхронизация при сбросе
  useEffect(() => {
    setPendingFilters(selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 873);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasSelectedFilters = Object.values(pendingFilters).some(
    (arr) => arr && arr.length > 0
  );

  // 🔘 Локальное изменение чекбокса
  const togglePendingOption = (filterName: string, option: string) => {
    setPendingFilters((prev) => {
      const prevValues = prev[filterName] || [];
      const exists = prevValues.includes(option);
      const newValues = exists
        ? prevValues.filter((v) => v !== option)
        : [...prevValues, option];
      return { ...prev, [filterName]: newValues };
    });
  };

  const handleApply = (filterName?: string) => {
    onApply(pendingFilters);
    if (filterName) toggleFilter(filterName);
    else toggleFilter("Filters");
  };

  const handleClear = () => {
    setPendingFilters({});
    onClear();
  };

  const handleToggleSection = (filterName: string) => {
    const wasOpen = !!openSections[filterName];
    toggleSection(filterName);

    if (!wasOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const sectionEl = sectionRefs.current[filterName];
          const dropdownEl = dropdownContentRef.current;
          if (sectionEl && dropdownEl) {
            const sectionRect = sectionEl.getBoundingClientRect();
            const containerRect = dropdownEl.getBoundingClientRect();
            const currentScroll = dropdownEl.scrollTop;
            const top =
              currentScroll + (sectionRect.top - containerRect.top) - 12;
            dropdownEl.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
          }
        });
      });
    }
  };

  // 🎯 Отображение активных тегов
  const SelectedTags = () => {
    const tags: { filter: string; value: string }[] = [];
    Object.entries(pendingFilters).forEach(([filter, values]) => {
      if (Array.isArray(values)) {
        values.forEach((val) => tags.push({ filter, value: val }));
      }
    });
    if (!tags.length) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={`${tag.filter}-${tag.value}`}
            className="bg-[#EFEFEF] text-sm pl-2 py-1 rounded-full flex items-center"
          >
            <span className="truncate max-w-[140px]">{tag.value}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePendingOption(tag.filter, tag.value);
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-300 ml-1"
            >
              <img src={CloseIcon} alt="remove" className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    );
  };

  // === RENDER ===
  return (
    <div className="flex flex-wrap gap-3 relative items-center">
      {/* 🖤 Filters кнопка (всегда) */}
      <div className="relative w-full sm:w-auto">
        <button
          onClick={() => toggleFilter("Filters")}
          className={`w-full sm:w-auto flex items-center gap-2 pl-4 pr-5 py-3 border rounded-full font-heading font-medium transition-colors
            ${openFilter === "Filters"
              ? "border-black bg-black/90 text-white"
              : "border-black bg-black text-white hover:bg-black/90"}`}
        >
          <img src={FiltersIcon} alt="Filters" className="w-6 h-6" />
          Filters
        </button>

        {openFilter === "Filters" && (
          <DropdownWrapper
            title="Filters"
            onClose={() => toggleFilter("Filters")}
            fullScreen={isMobile}
            contentRef={dropdownContentRef}
            footer={
              hasSelectedFilters ? (
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <button
                    onClick={handleClear}
                    className="cursor-pointer font-medium text-black font-heading"
                  >
                    Clear filters
                  </button>
                  <button
                    onClick={() => handleApply("Filters")}
                    className="py-3 px-6 rounded-full bg-black text-white font-medium w-[313px] min-w-[150px] font-heading"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleApply("Filters")}
                  className="w-full py-3 rounded-full bg-black text-white font-medium font-heading"
                >
                  Apply
                </button>
              )
            }
          >
            <SelectedTags />

            {/* 🚇 Metro station внутри Filters */}
            <div ref={(el) => {
              sectionRefs.current["Metro station"] = el;
            }} className="mt-4 mb-2">
              <button
                className="flex justify-between items-center w-full text-lg font-semibold"
                onClick={() => handleToggleSection("Metro station")}
              >
                <span className="font-bold text-2xl">Metro station</span>
                <img
                  src={openSections["Metro station"] ? ChevronDownIcon : ChevronRightIcon}
                  className="w-6 h-6"
                  alt=""
                />
              </button>

              {openSections["Metro station"] && (
                <div>
                  <DropdownSearchBar value={searchTerm} onChange={setSearchTerm} />
                  {Object.entries(metroSubGroups).map(([line, stations]) => (
                    <StationsGroup
                      key={line}
                      line={line}
                      stations={stations}
                      searchTerm={searchTerm}
                      openSections={openSections}
                      toggleSection={toggleSection}
                      selectedStations={pendingFilters["Metro station"] || []}
                      onToggle={(s) => togglePendingOption("Metro station", s)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 🤍 Остальные фильтры */}
            {Object.entries(whiteFilters).map(([filterName, options]) => (
              <div key={filterName} ref={(el) => {
                sectionRefs.current[filterName] = el;
              }}>
                <button
                  className="flex justify-between items-center w-full text-lg font-semibold py-2"
                  onClick={() => handleToggleSection(filterName)}
                >
                  <span className="font-bold text-2xl">{filterName}</span>
                  <img
                    src={openSections[filterName] ? ChevronDownIcon : ChevronRightIcon}
                    className="w-6 h-6"
                    alt=""
                  />
                </button>

                {openSections[filterName] && (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-4 pl-1">
                    {options.map((option) => (
                      <CustomCheckbox
                        key={option}
                        checked={pendingFilters[filterName]?.includes(option) || false}
                        onChange={() => togglePendingOption(filterName, option)}
                        label={option}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </DropdownWrapper>
        )}
      </div>

      {/* 🤍 Отдельные белые кнопки на десктопе */}
      {!isMobile &&
        Object.keys({ "Metro station": metroSubGroups, ...whiteFilters }).map((filterName) => (
          <div key={filterName} className="relative">
            <button
              onClick={() => toggleFilter(filterName)}
              className={`flex items-center gap-2 pl-5 pr-3 py-3 border rounded-full bg-[#F7F7F7] text-gray-800 transition-colors
                ${openFilter === filterName ? "border-black" : "border-[#C2C9CE]"}`}
            >
              <span className="font">{filterName}</span>
              <img
                src={openFilter === filterName ? ChevronUpIcon : ChevronDownIcon}
                alt=""
                className="w-6 h-6"
              />
            </button>

            {openFilter === filterName && (
              <DropdownWrapper
                title={filterName}
                onClose={() => toggleFilter(filterName)}
                contentRef={dropdownContentRef}
                footer={
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleClear}
                      className="cursor-pointer text-sm font-medium font-heading"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => handleApply(filterName)}
                      className="flex-1 py-3 rounded-full bg-black text-white font-medium ml-4 font-heading"
                    >
                      Apply
                    </button>
                  </div>
                }
              >
                {filterName === "Metro station" ? (
                  <>
                    <DropdownSearchBar value={searchTerm} onChange={setSearchTerm} />
                    {Object.entries(metroSubGroups).map(([line, stations]) => (
                      <StationsGroup
                        key={line}
                        line={line}
                        stations={stations}
                        searchTerm={searchTerm}
                        openSections={openSections}
                        toggleSection={toggleSection}
                        selectedStations={pendingFilters["Metro station"] || []}
                        onToggle={(s) => togglePendingOption("Metro station", s)}
                      />
                    ))}
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-4 pl-1">
                    {whiteFilters[filterName].map((option) => (
                      <CustomCheckbox
                        key={option}
                        checked={pendingFilters[filterName]?.includes(option) || false}
                        onChange={() => togglePendingOption(filterName, option)}
                        label={option}
                      />
                    ))}
                  </div>
                )}
              </DropdownWrapper>
            )}
          </div>
        ))}
    </div>
  );
}
