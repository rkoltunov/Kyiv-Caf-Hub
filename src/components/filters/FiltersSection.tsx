import { useEffect, useRef, useState } from "react";
import FiltersIcon from "../../assets/icons/filter.svg";
import ChevronDownIcon from "../../assets/icons/arrow-down.svg";
import CloseIcon from "../../assets/icons/cancel.svg";
import { DropdownWrapper } from "./DropdownWrapper";
import { CustomCheckbox } from "./CustomCheckbox";
import { StationsGroup } from "./StationsGroup";
import { useFilterState } from "./useFilterState";
import DropdownSearchBar from "./DropdownSearchBar";
import { metroSubGroups, whiteFilters } from "./constants";

type Props = {
  selectedFilters: Record<string, string[]>;
  onFilterToggle: (filterName: string, option: string) => void;
  onClear: () => void;
  onApply: () => void;
};

export default function FiltersSection({
  selectedFilters,
  onFilterToggle,
  onClear,
  onApply,
}: Props) {
  const { openFilter, toggleFilter, searchTerm, setSearchTerm, openSections, toggleSection } =
    useFilterState();

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const dropdownContentRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 873);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasSelectedFilters = Object.values(selectedFilters).some(
    (arr) => arr && arr.length > 0
  );

  const handleApply = (filterName?: string) => {
    onApply();
    if (filterName) toggleFilter(filterName);
    else toggleFilter("Filters");
  };

  const scrollToSectionInDropdown = (
    sectionEl: HTMLElement,
    dropdownEl: HTMLElement,
    offset = 12
  ) => {
    if (!sectionEl || !dropdownEl) return;
    const sectionRect = sectionEl.getBoundingClientRect();
    const containerRect = dropdownEl.getBoundingClientRect();
    const currentScroll = dropdownEl.scrollTop;
    const top = currentScroll + (sectionRect.top - containerRect.top) - offset;
    dropdownEl.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  // when toggling a section, if we open it -> scroll to it
  const handleToggleSection = (filterName: string) => {
    const wasOpen = !!openSections[filterName];
    toggleSection(filterName);

    if (!wasOpen) {
      // wait for render, then scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const sectionEl = sectionRefs.current[filterName];
          const dropdownEl = dropdownContentRef.current;
          if (sectionEl && dropdownEl) {
            scrollToSectionInDropdown(sectionEl, dropdownEl, 12);
          } else if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    }
  };

  const SelectedTags = () => {
    const tags: { filter: string; value: string }[] = [];
    Object.entries(selectedFilters).forEach(([filter, values]) => {
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
                onFilterToggle(tag.filter, tag.value);
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

  return (
    <div className="flex flex-wrap gap-3 relative  items-center">
      {/* Black Filters — НА ВСЕХ ЭКРАНАХ, но на мобиле будем делать её full-width */}
      <div className="relative w-full sm:w-auto">
        <button
          onClick={() => toggleFilter("Filters")}
          className="w-full sm:w-auto flex items-center gap-2 pl-4 pr-5 py-3 border rounded-full bg-black text-white font-heading font-medium"
        >
          <img src={FiltersIcon} alt="Filters" className="w-6 h-6 " />
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
                    onClick={onClear}
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

            {/* Metro station — внутри панели (на мобиле) */}
            <div
              ref={(el) => (sectionRefs.current["Metro station"] = el)}
              className="mt-4 mb-2"
            >
              <button
                className="flex justify-between items-center w-full text-lg font-semibold"
                onClick={() => handleToggleSection("Metro station")}
              >
                <span className="font-bold text-2xl">Metro station</span>
                <img
                  src={
                    openSections["Metro station"]
                      ? "/src/assets/icons/arrow-down.svg"
                      : "/src/assets/icons/arrow-right.svg"
                  }
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
                      selectedStations={selectedFilters["Metro station"] || []}
                      onToggle={(s) => onFilterToggle("Metro station", s)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Остальные фильтры */}
            {Object.entries(whiteFilters).map(([filterName, options]) => (
              <div
                key={filterName}
                ref={(el) => (sectionRefs.current[filterName] = el)}
              >
                <button
                  className="flex justify-between items-center w-full text-lg font-semibold py-2"
                  onClick={() => handleToggleSection(filterName)}
                >
                  <span className="font-bold text-2xl">{filterName}</span>
                  <img
                    src={
                      openSections[filterName]
                        ? "/src/assets/icons/arrow-down.svg"
                        : "/src/assets/icons/arrow-right.svg"
                    }
                    className="w-6 h-6"
                    alt=""
                  />
                </button>

                {openSections[filterName] && (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-4 pl-1">
                    {options.map((option) => (
                      <CustomCheckbox
                        key={option}
                        checked={selectedFilters[filterName]?.includes(option) || false}
                        onChange={() => onFilterToggle(filterName, option)}
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

      {/* --- НА DESKTOP: отдельная белая кнопка Metro station (и остальные white filters) --- */}
      {!isMobile && (
        <>
          {/* Metro station (desktop separate button) */}
          <div className="relative">
            <button
              onClick={() => toggleFilter("Metro station")}
              className="flex items-center gap-2 pl-5 pr-3 py-3 border border-[#C2C9CE] rounded-full bg-[#F7F7F7] text-gray-800"
            >
              <span className="font">Metro station</span>
              <img src={ChevronDownIcon} alt="" className="w-6 h-6" />
            </button>

            {openFilter === "Metro station" && (
              <DropdownWrapper
                title="Metro station"
                onClose={() => toggleFilter("Metro station")}
                contentRef={dropdownContentRef}
                footer={
                  <div className="flex justify-between items-center">
                    <button onClick={onClear} className="cursor-pointer text-sm font-medium font-heading">
                      Clear All
                    </button>
                    <button
                      onClick={() => handleApply("Metro station")}
                      className="flex-1 py-3 rounded-full bg-black text-white font-medium ml-4 font-heading"
                    >
                      Apply
                    </button>
                  </div>
                }
              >
                <DropdownSearchBar value={searchTerm} onChange={setSearchTerm} />
                {Object.entries(metroSubGroups).map(([line, stations]) => (
                  <StationsGroup
                    key={line}
                    line={line}
                    stations={stations}
                    searchTerm={searchTerm}
                    openSections={openSections}
                    toggleSection={toggleSection}
                    selectedStations={selectedFilters["Metro station"] || []}
                    onToggle={(s) => onFilterToggle("Metro station", s)}
                  />
                ))}
              </DropdownWrapper>
            )}
          </div>

          {/* остальные белые фильтры (desktop only) */}
          {Object.keys(whiteFilters).map((filterName) => (
            <div key={filterName} className="relative">
              <button
                onClick={() => toggleFilter(filterName)}
                className="flex items-center gap-2 pl-5 pr-3 py-3 border border-[#C2C9CE] rounded-full bg-[#F7F7F7] text-gray-800"
              >
                <span className="font">{filterName}</span>
                <img src={ChevronDownIcon} alt="" className="w-6 h-6" />
              </button>

              {openFilter === filterName && (
                <DropdownWrapper
                  title={filterName}
                  onClose={() => toggleFilter(filterName)}
                  contentRef={dropdownContentRef}
                  footer={
                    <div className="flex justify-between items-center">
                      <button onClick={onClear} className="cursor-pointer text-sm font-medium font-heading">
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
                  <div className="grid grid-cols-2 gap-x-2 gap-y-4 pl-1">
                    {whiteFilters[filterName].map((option) => (
                      <CustomCheckbox
                        key={option}
                        checked={selectedFilters[filterName]?.includes(option) || false}
                        onChange={() => onFilterToggle(filterName, option)}
                        label={option}
                      />
                    ))}
                  </div>
                </DropdownWrapper>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
