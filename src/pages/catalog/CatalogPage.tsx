import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { filterOptions } from "../../mocks/filterOptions";
import FiltersSection from "../../components/Filters/FiltersSection";
import Breadcrumbs from "../../pages/catalog/Breadcrumbs";
import SearchBar from "../../pages/catalog/SearchBar";
import CafesGrid from "../../pages/catalog/CafesGrid";
import { popularCafes } from "../../mocks/popularCafes";

const ITEMS_PER_PAGE = 8;

interface Cafe {
  id: string;
  title: string;
  metro: string;
  description: string;
  image: string;
}

export default function CatalogPage() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const normalizedCafes: Cafe[] = useMemo(
    () => popularCafes.map(cafe => ({ ...cafe, id: cafe.id.toString() })),
    []
  );

  // 🧭 Чтение параметров из URL при загрузке
  useEffect(() => {
    const searchValue = searchParams.get("search") || "";
    const filterValue = searchParams.get("filter");

    if (searchValue) {
      setQuery(searchValue);
    }

    if (filterValue) {
      const [category, value] = filterValue.split(":");
      if (category && value && filterOptions[category]?.includes(value)) {
        setSelectedFilters({ [category]: [value] });
        setActiveFilters([value]);
      }
    }
  }, [searchParams]);

  const toggleFilterOption = (filterName: string, option: string) => {
    setSelectedFilters(prev => {
      const prevOptions = prev[filterName] || [];
      const isSelected = prevOptions.includes(option);
      const newOptions = isSelected
        ? prevOptions.filter(o => o !== option)
        : [...prevOptions, option];

      if (newOptions.length === 0) {
        const { [filterName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [filterName]: newOptions };
    });
  };

  // 🔍 Фильтрация
  const filteredItems: Cafe[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = normalizedCafes;

    if (q) {
      filtered = filtered.filter(
        it =>
          it.title.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          it.metro.toLowerCase().includes(q)
      );
    }

    Object.entries(selectedFilters).forEach(([filterName, options]) => {
      if (options.length) {
        filtered = filtered.filter(it => {
          if (filterName === "Metro station") return options.includes(it.metro);
          if (filterName === "Category") {
            // пример: фильтр по matcha, sugar-free, pet-friendly
            return options.some(opt => it.description.toLowerCase().includes(opt.toLowerCase()));
          }
          return true;
        });
      }
    });

    return [...filtered].sort((a, b) => Number(a.id) - Number(b.id));
  }, [query, selectedFilters, normalizedCafes]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const handleShowMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams(value ? { search: value } : {}); // обновляем URL
  };

  return (
    <section className="bg-[#F7F7F7] py-10 sm:py-14 px-4 sm:px-8 lg:px-[42px] rounded-[20px] sm:rounded-[30px]">
      <Breadcrumbs activeFilters={activeFilters} />

      {/* Фильтры и поиск */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start mb-8 sm:mb-10">
        <FiltersSection
          selectedFilters={selectedFilters}
          onFilterToggle={(filterName: string, option: string) => {
            toggleFilterOption(filterName, option);
            setActiveFilters(prev =>
              prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
            );
            setVisibleCount(ITEMS_PER_PAGE);
            setSearchParams({ filter: option }); // фильтр → в URL
          }}
          onClear={() => {
            setSelectedFilters({});
            setActiveFilters([]);
            setVisibleCount(ITEMS_PER_PAGE);
            setSearchParams({}); // очищаем URL
          }}
          onApply={() => {
            console.log("Применены фильтры:", selectedFilters);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
        />

        <div className="flex-1 w-full sm:w-auto">
          <SearchBar query={query} onQueryChange={handleQueryChange} />
        </div>
      </div>

      <CafesGrid
        visibleItems={visibleItems}
        filteredItems={filteredItems}
        onShowMore={handleShowMore}
      />
    </section>
  );
}