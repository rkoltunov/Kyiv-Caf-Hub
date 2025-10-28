import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { filterOptions } from "../../mocks/filterOptions";
import FiltersSection from "../../components/filters/FiltersSection";
import Breadcrumbs from "../../pages/catalog/Breadcrumbs";
import SearchBar from "../../pages/catalog/SearchBar";
import CafesGrid from "../../pages/catalog/CafesGrid";
import { cafes } from "../../mocks/cafes";

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
    () =>
      cafes.map((cafe) => ({
        id: cafe.id.toString(),
        title: cafe.name,
        description: cafe.description,
        metro: cafe.tags.find((t) => t.category === "METRO")?.name || "",
        image:
          cafe.images && cafe.images.length > 0
            ? cafe.images[0].imageUrl // берём первое изображение из массива
            : "", // если нет фото
      })),
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

  // 🔍 Фильтрация
  const filteredItems: Cafe[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = normalizedCafes;

    if (q) {
      filtered = filtered.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          it.metro.toLowerCase().includes(q)
      );
    }

    Object.entries(selectedFilters).forEach(([filterName, options]) => {
      if (options.length) {
        filtered = filtered.filter((it) => {
          const cafeTags = cafes.find((c) => c.id.toString() === it.id)?.tags || [];
          if (filterName === "Metro station") {
            return options.includes(it.metro);
          }
          const tagNames = cafeTags.map((t) => t.name);
          return options.some((opt) => tagNames.includes(opt));
        });
      }
    });

    return [...filtered].sort((a, b) => Number(a.id) - Number(b.id));
  }, [query, selectedFilters, normalizedCafes]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const handleShowMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams(value ? { search: value } : {}); // обновляем URL
  };

  // 🧩 Обработка применения фильтров
  const handleApplyFilters = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    setActiveFilters(
      Object.values(filters)
        .flat()
        .filter((v) => !!v)
    );
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams({}); // можно позже добавить sync с URL, если нужно
    console.log("✅ Применены фильтры:", filters);
  };

  return (
    <section className="bg-[#F7F7F7] py-10 sm:py-14 px-4 sm:px-8 lg:px-[42px] rounded-[20px] sm:rounded-[30px]">
      <Breadcrumbs activeFilters={activeFilters} />

      {/* Фильтры и поиск */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start mb-8 sm:mb-10">
        <FiltersSection
          selectedFilters={selectedFilters}
          onApply={handleApplyFilters}
          onClear={() => {
            setSelectedFilters({});
            setActiveFilters([]);
            setVisibleCount(ITEMS_PER_PAGE);
            setSearchParams({});
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
