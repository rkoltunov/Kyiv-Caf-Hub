import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// ВАЖНО: читаем ключи фильтров из UI-констант, а не из mocks
import FiltersSection from "../../components/filters/FiltersSection";
import Breadcrumbs from "../../pages/catalog/Breadcrumbs";
import SearchBar from "../../pages/catalog/SearchBar";
import CafesGrid from "../../pages/catalog/CafesGrid";
import { cafes } from "../../mocks/cafes";
import { whiteFilters } from "../../components/filters/constants"; // ✅

const ITEMS_PER_PAGE = 8;

// Ключи фильтров, которые реально есть в UI
const FILTER_KEYS: string[] = ["Metro station", ...Object.keys(whiteFilters)];

interface Cafe {
  id: number;
  slug: string;
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
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // ✅ нормализуем кафе
  const normalizedCafes: Cafe[] = useMemo(
    () =>
      cafes.map((cafe) => ({
        id: cafe.id,
        slug: cafe.slug,
        title: cafe.name,
        description: cafe.description,
        metro: cafe.tags.find((t) => t.category === "METRO")?.name || "",
        image:
          cafe.images && cafe.images.length > 0
            ? cafe.images[0].imageUrl
            : "",
      })),
    []
  );

  // ✅ Парсим URL один раз при загрузке и восстанавливаем состояние
  useEffect(() => {
    const restored: Record<string, string[]> = {};

    // Восстанавливаем фильтры только по тем ключам, которые есть в UI
    FILTER_KEYS.forEach((key) => {
      const v = searchParams.get(key);
      if (v) restored[key] = v.split(",").filter(Boolean);
    });

    // Восстанавливаем поиск
    const q = searchParams.get("search") || "";

    setSelectedFilters(restored);
    setActiveFilters(Object.values(restored).flat());
    setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← важно: только при загрузке

  // ✅ Фильтрация
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
      if (!options.length) return;

      filtered = filtered.filter((it) => {
        const cafeTags = cafes.find((c) => c.id === it.id)?.tags || [];
        if (filterName === "Metro station") {
          return options.includes(it.metro);
        }
        const tagNames = cafeTags.map((t) => t.name);
        return options.some((opt) => tagNames.includes(opt));
      });
    });

    return [...filtered].sort((a, b) => a.id - b.id);
  }, [query, selectedFilters, normalizedCafes]);

  const visibleItems = filteredItems.slice(0, visibleCount);

  // Показать больше
  const handleShowMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  // ✅ Поиск: обновляем URL, но не трогаем фильтры
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setVisibleCount(ITEMS_PER_PAGE);

    const newParams = new URLSearchParams();

    // сохраняем фильтры как есть
    FILTER_KEYS.forEach((key) => {
      const vals = selectedFilters[key];
      if (vals?.length) newParams.set(key, vals.join(","));
    });

    // добавляем/удаляем search
    if (value) newParams.set("search", value);

    setSearchParams(newParams);
  };

  // ✅ Применение фильтров: обновляем стейт и URL
  const handleApplyFilters = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    setActiveFilters(Object.values(filters).flat().filter(Boolean));
    setVisibleCount(ITEMS_PER_PAGE);

    const newParams = new URLSearchParams();

    // фильтры
    Object.entries(filters).forEach(([key, values]) => {
      if (values?.length) newParams.set(key, values.join(","));
    });

    // поисковый запрос сохраняем
    if (query) newParams.set("search", query);

    setSearchParams(newParams);
  };

  // ✅ Очистить фильтры: чистим и URL (кроме поиска)
  const handleClearFilters = () => {
    setSelectedFilters({});
    setActiveFilters([]);
    setVisibleCount(ITEMS_PER_PAGE);

    const newParams = new URLSearchParams();
    if (query) newParams.set("search", query);
    setSearchParams(newParams);
  };

  return (
    <section className="bg-[#F7F7F7] py-10 sm:py-14  rounded-[20px] sm:rounded-[30px]">
      {/* Можешь убрать Breadcrumbs, если не нужен */}
      <Breadcrumbs />

      {/* Фильтры и поиск */}
      <div
  className={`sticky top-[80px] z-40 bg-[#F9F8F5] px-4 sm:px-8 lg:px-[42px] transition-shadow duration-300 ${
    scrolled ? "shadow-[0_4px_4px_rgba(0,0,0,0.05)]" : "shadow-none"
  }`}
>
  <div className="  mb-6 py-4 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start">
    <FiltersSection
      selectedFilters={selectedFilters}
      onApply={handleApplyFilters}
      onClear={handleClearFilters}
    />

    <div className="flex-1 w-full sm:w-auto">
      <SearchBar query={query} onQueryChange={handleQueryChange} />
    </div>
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
