import type { FC } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CafeCard } from "../../components/ui/CafeCard";
import { cafes as mockCafes } from "../../mocks/cafes";
import { fetchWithFallback } from "../../utils/fetchWithFallback";
import api from "../../api";
import ArrowShort from "../../assets/icons/arrow-right_16.svg";
import ArrowLong from "../../assets/icons/arrow-right_long_16.svg";

export const PopularCafesSection: FC = () => {
  const [popularCafes, setPopularCafes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ⬆️ Простой хелпер обработки данных бэка/мока
  const normalizeCafes = (data: any[]) => {
    const sorted = [...data].sort((a, b) => a.id - b.id);

    return sorted.map((c: any) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      metro:
        c.tags?.find((t: any) => t.category?.toUpperCase() === "METRO")?.name ||
        "—",
      image: c.images?.[0]?.imageUrl || "",
    }));
  };


  useEffect(() => {
    const load = async () => {
      const backendData = await fetchWithFallback(
        // API call
        async () => {
          const res = await api.get("/cafe", { params: { size: 16 } });
          return res.data.content;
        },
        // fallback
        mockCafes
      );
  
      const normalized = normalizeCafes(backendData);
      setPopularCafes(normalized.slice(0, 4));
      setLoading(false);
    };
  
    load();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 py-10">
        Loading popular cafés...
      </div>
    );

    return (
<div className="bg-[#F9F8F5] w-full px-4 md:px-[42px] py-8 pb-[64px] xl:pb-[128px]">

    
        {/* ===== DESKTOP HEADER (>=1280px) ===== */}
        <div className="hidden xl:grid grid-cols-3 items-center max-w-[1440px] mx-auto mb-6">
          <div></div>
    
          <h2 className="font-heading text-3xl md:text-4xl font-medium uppercase tracking-wide text-center mb-4">
            Popular in Kyiv
          </h2>
    
          <Link
            to="/catalog"
            className="
              font-heading font-medium flex items-center gap-1
              text-[#21262B] underline justify-self-end mt-[28px]
              transition-colors duration-200 hover:text-[#3D464D]
              group/link
            "
          >
            See more
            <div className="relative w-4 h-4 ml-1">
              <img src={ArrowShort} className="absolute inset-0 w-4 h-4 transition-opacity duration-200 group-hover/link:opacity-0" />
              <img src={ArrowLong} className="absolute inset-0 w-4 h-4 opacity-0 transition-opacity duration-200 group-hover/link:opacity-100" />
            </div>
          </Link>
        </div>
    
        {/* ===== TABLET + MOBILE HEADER (<1280px) ===== */}
        <div className="xl:hidden text-center mb-6">
          <h2 className="font-heading text-3xl md:text-4xl font-medium uppercase tracking-wide">
            Popular in Kyiv
          </h2>
        </div>
    
        {/* ===== DESKTOP GRID (>=1280px) ===== */}
        <div className="hidden xl:grid xl:grid-cols-4 gap-6 justify-items-center max-w-[1440px] mx-auto">
          {popularCafes.map((cafe) => (
            <CafeCard
              key={cafe.id}
              id={cafe.id}
              slug={cafe.slug}
              title={cafe.name}
              metro={cafe.metro}
              image={cafe.image}
            />
          ))}
        </div>
    
        {/* ===== TABLET + MOBILE SLIDER (<1280px) ===== */}
        <div
          className="
            xl:hidden
            flex gap-4 overflow-x-auto no-scrollbar
            max-w-[1440px] mx-auto pb-4
          "
        >
          {popularCafes.map((cafe) => (
            <div
              key={cafe.id}
              className="flex-shrink-0 w-[300px] md:w-[300px]"
            >
              <CafeCard
                id={cafe.id}
                slug={cafe.slug}
                title={cafe.name}
                metro={cafe.metro}
                image={cafe.image}
              />
            </div>
          ))}
        </div>
    
        {/* ===== TABLET + MOBILE SEE MORE BUTTON ===== */}
        <div className="flex xl:hidden justify-center">
          <Link
            to="/catalog"
            className="
              font-heading font-medium flex items-center gap-1
              text-[#21262B] underline
              transition-colors duration-200 hover:text-[#3D464D]
              group/link
            "
          >
            See more
            <div className="relative w-4 h-4 ml-1">
              <img src={ArrowShort} className="absolute inset-0 w-4 h-4 transition-opacity duration-200 group-hover/link:opacity-0" />
              <img src={ArrowLong} className="absolute inset-0 w-4 h-4 opacity-0 transition-opacity duration-200 group-hover/link:opacity-100" />
            </div>
          </Link>
        </div>
    
      </div>
    );
    
    
};
