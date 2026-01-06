import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import FiltersSection from "../../components/filters/FiltersSection";
import Breadcrumbs from "../../pages/catalog/Breadcrumbs";
import CafesGrid from "../../pages/catalog/CafesGrid";
import { whiteFilters } from "../../components/filters/constants";
import { cafes as cafesMock } from "../../mocks/cafes";
import { fetchWithFallback } from "../../utils/fetchWithFallback";
import type { CafeResponseDto } from "../../types/dto";

const ITEMS_PER_PAGE = 8;
const FILTER_KEYS: string[] = ["Metro station", ...Object.keys(whiteFilters)];

const normalizeCafe = (c: CafeResponseDto): Cafe => ({
  id: c.id,
  slug: c.slug,
  title: c.name,                      // name → title
  description: c.description || "",
  metro: c.tags?.find((t) => t.category === "METRO")?.name || "",
  tags: c.tags?.map((t) => t.name) || [],
  image: c.images?.[0]?.imageUrl || "",
});
interface Cafe {
  id: number;
  slug: string;
  title: string;
  metro: string;
  description: string;
  image: string;
  tags: string[];
}

export default function CatalogPage() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ вернули
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧭 для стики фильтров
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Загружаем кафе с backend
  useEffect(() => {
    const load = async () => {
      const data = await fetchWithFallback<CafeResponseDto[]>(
        async () => {
          const res = await api.get("/cafe", { params: { size: 100 } });
          return res.data.content;
        },
        cafesMock
      );
  
      setCafes(data.map(normalizeCafe));
      setLoading(false);
    };
  
    load();
  }, []);
  
  

  // ✅ Восстанавливаем фильтры и поиск из URL
  useEffect(() => {
    const restored: Record<string, string[]> = {};
    FILTER_KEYS.forEach((key) => {
      const v = searchParams.get(key);
      if (v) restored[key] = v.split(",").filter(Boolean);
    });
    const q = searchParams.get("search") || "";
    setSelectedFilters(restored);
    setActiveFilters(Object.values(restored).flat());
    setQuery(q);
  }, []); // только при загрузке
  

  // ✅ Фильтрация
  const filteredItems: Cafe[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = cafes;

    if (q) {
      filtered = filtered.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          it.metro.toLowerCase().includes(q)
      );
    }

    // фильтры
    Object.entries(selectedFilters).forEach(([filterName, options]) => {
      if (!options.length) return;
      filtered = filtered.filter((it) => {
        if (filterName === "Metro station") {
          return options.includes(it.metro);
        }
        // ✅ фильтрация по тегам (whiteFilters)
        return options.some((opt) => it.tags.includes(opt));
      });
    });
    

    return [...filtered].sort((a, b) => a.id - b.id);
  }, [cafes, query, selectedFilters]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const handleShowMore = () => setVisibleCount((p) => p + ITEMS_PER_PAGE);

  // ✅ Обновление URL при поиске
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setVisibleCount(ITEMS_PER_PAGE);

    const newParams = new URLSearchParams();
    FILTER_KEYS.forEach((key) => {
      const vals = selectedFilters[key];
      if (vals?.length) newParams.set(key, vals.join(","));
    });
    if (value) newParams.set("search", value);
    setSearchParams(newParams);
  };

  // ✅ Применение фильтров
  const handleApplyFilters = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    setActiveFilters(Object.values(filters).flat().filter(Boolean));
    setVisibleCount(ITEMS_PER_PAGE);

    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      if (values?.length) newParams.set(key, values.join(","));
    });
    if (query) newParams.set("search", query);
    setSearchParams(newParams);
  };

  // ✅ Очистка фильтров
  const handleClearFilters = () => {
    setSelectedFilters({});
    setActiveFilters([]);
    setVisibleCount(ITEMS_PER_PAGE);

    const newParams = new URLSearchParams();
    if (query) newParams.set("search", query);
    setSearchParams(newParams);
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 py-10">Loading cafés...</div>
    );

  return (
    <section className="bg-[#F7F7F7] py-10 sm:py-14 rounded-[30px] sm:rounded-[30px]">
      <Breadcrumbs />

      {/* sticky фильтры */}
      <div
        className={`sticky top-[88px] z-40 bg-[#F9F8F5] px-4 sm:px-8 lg:px-[42px] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_4px_rgba(0,0,0,0.05)]" : "shadow-none"
        }`}
      >
        <div className="mb-6 py-4 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start">
        <FiltersSection
  selectedFilters={selectedFilters}
  onApply={handleApplyFilters}
  onClear={handleClearFilters}
  query={query}
  onQueryChange={handleQueryChange}
  activeCount={activeFilters.length}
/>
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
