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
import SearchBar from "../../pages/catalog/SearchBar";
import { metroSubGroups, whiteFilters } from "./constants";

type Props = {
  selectedFilters: Record<string, string[]>;
  onApply: (filters: Record<string, string[]>) => void;
  onClear: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  activeCount?: number;
};

export default function FiltersSection({
  selectedFilters,
  onApply,
  onClear,
  query,
  onQueryChange,
}: Props) {
  const { openFilter, toggleFilter, searchTerm, setSearchTerm, openSections, toggleSection } =
    useFilterState();

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const dropdownContentRef = useRef<HTMLDivElement | null>(null);
  const [pendingFilters, setPendingFilters] = useState<Record<string, string[]>>(selectedFilters);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;
  
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      // если футер виден, сдвигаем кнопку выше футера
      const offset = Math.max(windowHeight - footerRect.top, 0);
      setBottomOffset(offset);
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // инициализация сразу
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => setPendingFilters(selectedFilters), [selectedFilters]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setScreenSize("mobile");
      else if (w <= 1440) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSelected = Object.values(pendingFilters).reduce((a, arr) => a + (arr?.length || 0), 0);

  const togglePendingOption = (filterName: string, option: string) => {
    setPendingFilters(prev => {
      const prevValues = prev[filterName] || [];
      const exists = prevValues.includes(option);
      return {
        ...prev,
        [filterName]: exists ? prevValues.filter(v => v !== option) : [...prevValues, option],
      };
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
    if (!wasOpen && dropdownContentRef.current) {
      requestAnimationFrame(() => {
        const el = sectionRefs.current[filterName];
        const container = dropdownContentRef.current;
        if (el && container) {
          container.scrollTo({
            top: container.scrollTop + el.getBoundingClientRect().top - container.getBoundingClientRect().top - 20,
            behavior: "smooth",
          });
        }
      });
    }
  };

  const SelectedTags = () => {
    const tags = Object.entries(pendingFilters).flatMap(([f, v]) => v?.map(value => ({ filter: f, value })) || []);
    if (!tags.length) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={`${tag.filter}-${tag.value}`} className="bg-[#EFEFEF] text-sm pl-3 pr-2 py-1 rounded-full flex items-center gap-2">
            <span className="max-w-[140px] truncate">{tag.value}</span>
            <button
              onClick={e => { e.stopPropagation(); togglePendingOption(tag.filter, tag.value); }}
              className="w-6 h-6 rounded-full hover:bg-gray-300 flex items-center justify-center"
            >
              <img src={CloseIcon} alt="remove" className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    );
  };

  const filtersList = ["Metro station", ...Object.keys(whiteFilters)];

  const FiltersButton = () => (
    <div className="relative">
      <button
        onClick={() => toggleFilter("Filters")}
        className={`
          relative flex items-center gap-2 pl-5 pr-5 py-3 
          border rounded-full font-heading font-medium text-white
          transition-all duration-200
          ${openFilter === "Filters" 
            ? "bg-black border-black" 
            : "bg-black border-black hover:bg-black/90"}
        `}
      >
        <img src={FiltersIcon} alt="Filters" className="w-6 h-6" />
        <span>Filters</span>
        {totalSelected > 0 && (
          <span className=" flex items-center justify-center min-w-6 h-6 bg-white text-black text-xs font-bold rounded-full shadow-sm">
            {totalSelected > 99 ? "99+" : totalSelected}
          </span>
        )}
      </button>
    </div>
  );

  const WhiteDropdowns = () => filtersList.map(filterName => (
    <div key={filterName} className="relative">
      <button
        onClick={() => toggleFilter(filterName)}
        className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-colors 
          ${openFilter === filterName ? "border-black bg-gray-100" : "border-gray-400 bg-white"}`}
      >
        {filterName}
        <img src={openFilter === filterName ? ChevronUpIcon : ChevronDownIcon} className="w-5 h-5" alt="" />
      </button>

      {openFilter === filterName && (
        <DropdownWrapper title={filterName} onClose={() => toggleFilter(filterName)}>
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
                  onToggle={s => togglePendingOption("Metro station", s)}
                />
              ))}
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {whiteFilters[filterName].map(option => (
                <CustomCheckbox
                  key={option}
                  checked={pendingFilters[filterName]?.includes(option) || false}
                  onChange={() => togglePendingOption(filterName, option)}
                  label={option}
                />
              ))}
            </div>
          )}
<div className="flex items-center justify-between mt-6 pt-4 border-t- ">

{/* Clear All — слева */}
<button
  onClick={handleClear}
  className="text-[16px] font-heading  "
>
  Clear All
</button>

{/* Spacer 24px */}
<div style={{ width: "24px" }}></div>

{/* Apply — справа */}
<div className="flex-1 flex justify-end">
  <button
    onClick={() => handleApply(filterName)}
    className="w-full py-3 bg-black text-white rounded-full font-heading font-medium "
  >
    Apply
  </button>
</div>

</div>
        </DropdownWrapper>
      )}
    </div>
  ));

  return (
    <div className="w-full">
      {/* ДЕСКТОП */}
      {screenSize === "desktop" && (
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-3 flex-wrap relative">
      <FiltersButton />

      {/* Общий DropdownWrapper */}
      {openFilter === "Filters" && (
        <DropdownWrapper
          title="Filters"
          onClose={() => toggleFilter("Filters")}
          fullScreen={false}
          mobilePositioned={false}
          contentRef={dropdownContentRef}
          footer={
            totalSelected > 0 ? (
              <div className="flex justify-between gap-4">
                <button onClick={handleClear} className="text-black font-heading font-medium w-[120px]">
                  Clear filters
                </button>
                <button
                  onClick={() => handleApply("Filters")}
                  className="w-full py-3 bg-black text-white rounded-full font-heading font-medium"
                >
                  Apply
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleApply("Filters")}
                className="w-full py-3 bg-black text-white rounded-full font-heading font-medium"
              >
                Apply
              </button>
            )
          }
          className="absolute top-full mt-2 w-[300px] max-h-[400px] overflow-auto z-50"
        >
          <SelectedTags />
          {/* Metro + остальные фильтры */}
          <div ref={el => { sectionRefs.current["Metro station"] = el }} className="mt-4">
            <button
              onClick={() => handleToggleSection("Metro station")}
              className="flex justify-between items-center w-full py-3 text-2xl font-bold"
            >
              Metro station
              <img src={openSections["Metro station"] ? ChevronUpIcon : ChevronDownIcon} className="w-6 h-6" alt="" />
            </button>
            {openSections["Metro station"] && (
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
                    onToggle={s => togglePendingOption("Metro station", s)}
                  />
                ))}
              </>
            )}
          </div>

          {Object.entries(whiteFilters).map(([name, options]) => (
            <div key={name} ref={el => { sectionRefs.current[name] = el }} className="">
              <button
                onClick={() => handleToggleSection(name)}
                className="flex justify-between items-center w-full py-3 text-2xl font-bold"
              >
                {name}
                <img src={openSections[name] ? ChevronUpIcon : ChevronDownIcon} className="w-6 h-6" alt="" />
              </button>
              {openSections[name] && (
                <div className="grid grid-cols-2 gap-4 pl-1 mt-4">
                  {options.map(option => (
                    <CustomCheckbox
                      key={option}
                      checked={pendingFilters[name]?.includes(option) || false}
                      onChange={() => togglePendingOption(name, option)}
                      label={option}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </DropdownWrapper>
      )}

      {/* Мини-дропдауны для каждого фильтра */}
      <WhiteDropdowns />
    </div>

    {/* SearchBar справа */}
    <div className="flex-1 ml-6">
      <SearchBar query={query} onQueryChange={onQueryChange} />
    </div>
  </div>
)}

{/* ПЛАНШЕТ */}
{screenSize === "tablet" && (
  <div className="space-y-5 w-[690px]">
    <div className="flex items-center gap-4 relative">
      <FiltersButton />

      <div className="flex-1">
        <div className="inline-flex w-full">
          <SearchBar query={query} onQueryChange={onQueryChange} />
        </div>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      {/* DropdownWrapper под кнопку Filters */}
      {openFilter === "Filters" && (
        <DropdownWrapper
          title="Filters"
          onClose={() => toggleFilter("Filters")}
          fullScreen={false}
          mobilePositioned={false}
          contentRef={dropdownContentRef}
          topOffset="calc(100% - 86px)"
          footer={
            totalSelected > 0 ? (
              <div className="flex justify-between gap-4">
                <button onClick={handleClear} className="text-black font-heading font-medium w-[120px]">
                  Clear filters
                </button>
                <button
                  onClick={() => handleApply("Filters")}
                  className="w-full py-3 bg-black text-white rounded-full font-heading font-medium"
                >
                  Apply
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleApply("Filters")}
                className="w-full py-3 bg-black text-white rounded-full font-heading font-medium"
              >
                Apply
              </button>
            )
          }
        >
          <SelectedTags />
          {/* Metro + остальные фильтры */}
          <div ref={el => { sectionRefs.current["Metro station"] = el }} className="mt-4">
            <button
              onClick={() => handleToggleSection("Metro station")}
              className="flex justify-between items-center w-full py-3 text-2xl font-bold"
            >
              Metro station
            </button>
            {openSections["Metro station"] && (
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
                    onToggle={s => togglePendingOption("Metro station", s)}
                  />
                ))}
              </>
            )}
          </div>

          {Object.entries(whiteFilters).map(([name, options]) => (
            <div key={name} ref={el => { sectionRefs.current[name] = el }} className="">
              <button
                onClick={() => handleToggleSection(name)}
                className="flex justify-between items-center w-full py-3 text-2xl font-bold"
              >
                {name}
              </button>
              {openSections[name] && (
                <div className="grid grid-cols-2 gap-4 pl-1 mt-4">
                  {options.map(option => (
                    <CustomCheckbox
                      key={option}
                      checked={pendingFilters[name]?.includes(option) || false}
                      onChange={() => togglePendingOption(name, option)}
                      label={option}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </DropdownWrapper>
      )}

      {/* Остальные WhiteDropdowns */}
      <WhiteDropdowns />
    </div>
  </div>
)}


      {/* МОБИЛЬНЫЙ */}
      {screenSize === "mobile" && (
        <>
          {/* Верхняя строка: поиск + кнопка Filters (если фильтров нет) */}
          <div className="px-4 pt-4 flex items-center gap-3">
            {totalSelected === 0 && <FiltersButton />}
            <div className="flex-1">
              <SearchBar query={query} onQueryChange={onQueryChange} />
            </div>
          </div>

{/* Фиксированная кнопка снизу — только при выбранных фильтрах */}
{totalSelected > 0 && (
  <div
    className="fixed inset-x-0 p-4 bg-white border-t shadow-2xl z-[100] rounded-[30px]"
    style={{ bottom: `${bottomOffset}px` }}
  >
    <button
      onClick={() => toggleFilter("Filters")}
      className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white rounded-full font-heading font-medium text-lg shadow-lg"
    >
      <img src={FiltersIcon} alt="" className="w-6 h-6" />
      <span>Filters</span>
      <span className="bg-white text-black text-xs font-bold rounded-full min-w-7 h-7 flex items-center justify-center px-2">
        {totalSelected > 99 ? "99+" : totalSelected}
      </span>
    </button>
  </div>
)}

          {/* Дропдаун (не fullscreen, по центру с отступами) */}
          {openFilter === "Filters" && (
            <DropdownWrapper
              title="Filters"
              onClose={() => toggleFilter("Filters")}
              fullScreen={false}
              mobilePositioned={true}
              contentRef={dropdownContentRef}
              footer={
                totalSelected > 0 ? (
                  <div className="flex justify-between gap-4">
                    <button onClick={handleClear} className="text-black font-heading font-medium w-[120px]">
                      Clear filters
                    </button>
                    <button
                      onClick={() => handleApply("Filters")}
                      className="w-full py-3 bg-black text-white rounded-full font-heading font-medium"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply("Filters")}
                    className="w-full py-3 bg-black text-white rounded-full font-heading font-medium"
                  >
                    Apply
                  </button>
                )
              }
            >
              <SelectedTags />
              {/* Metro + остальные фильтры */}
              <div ref={el => { sectionRefs.current["Metro station"] = el }} className="mt-4">
                <button
                  onClick={() => handleToggleSection("Metro station")}
                  className="flex justify-between items-center w-full py-3 text-2xl font-bold"
                >
                  Metro station
                  <img src={openSections["Metro station"] ? ChevronDownIcon : ChevronRightIcon} className="w-6 h-6" alt="" />
                </button>
                {openSections["Metro station"] && (
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
                        onToggle={s => togglePendingOption("Metro station", s)}
                      />
                    ))}
                  </>
                )}
              </div>

              {Object.entries(whiteFilters).map(([name, options]) => (
                <div key={name} ref={el => { sectionRefs.current[name] = el }} className="">
                  <button
                    onClick={() => handleToggleSection(name)}
                    className="flex justify-between items-center w-full py-3 text-2xl font-bold"
                  >
                    {name}
                    <img src={openSections[name] ? ChevronDownIcon : ChevronRightIcon} className="w-6 h-6" alt="" />
                  </button>
                  {openSections[name] && (
                    <div
  className="
  grid gap-4 
  grid-cols-2
  [@media(max-width:400px)]:grid-cols-1
"
  style={{
gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))"
  }}
>
                      {options.map(option => (
                        <CustomCheckbox
                          key={option}
                          checked={pendingFilters[name]?.includes(option) || false}
                          onChange={() => togglePendingOption(name, option)}
                          label={option}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </DropdownWrapper>
          )}
        </>
      )}
    </div>
  );
}
