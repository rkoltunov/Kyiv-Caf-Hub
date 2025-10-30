import type { FC } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CafeCard } from "../../components/ui/CafeCard";
import { cafes as mockCafes } from "../../mocks/cafes";
import api from "../../api";
import ArrowShort from "../../assets/icons/arrow-right_16.svg";
import ArrowLong from "../../assets/icons/arrow-right_long_16.svg";

export const PopularCafesSection: FC = () => {
  const [popularCafes, setPopularCafes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopular = async () => {
      try {
        let data: any[] = [];
  
        if (import.meta.env.PROD) {
          // 🟣 В проде (Vercel) берём данные из моков
          console.warn("⚠️ Using mock cafes for PopularCafesSection (no backend in production)");
          data = mockCafes;
        } else {
          // 🟢 Локально — реальный backend
          const res = await api.get("/cafe", { params: { size: 16 } });
          data = res.data.content || res.data || [];
        }
  
        // ✅ сортируем по id
        const sorted = [...data].sort((a: any, b: any) => a.id - b.id);
  
        const normalized = sorted.map((c: any) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          metro: c.tags?.find((t: any) => t.category === "METRO")?.name || "—",
          image: c.images?.[0]?.imageUrl || "",
        }));
  
        setPopularCafes(normalized.slice(0, 4)); // первые 4
      } catch (err) {
        console.error("Ошибка загрузки популярных кафе:", err);
      } finally {
        setLoading(false);
      }
    };
  
    loadPopular();
  }, []);
  
  if (loading)
    return (
      <div className="text-center text-gray-500 py-10">Loading popular cafés...</div>
    );

  return (
    <div className="bg-[#F9F8F5] w-full px-4 md:px-[42px] py-8 md:pb-[128px]">
      {/* Заголовок */}
      <div className="grid grid-cols-3 items-center max-w-[1440px] mx-auto mb-6">
        <div></div>
        <h2 className="font-heading text-3xl md:text-4xl font-medium uppercase tracking-wide text-center mb-4">
          Popular in Kyiv
        </h2>
        <Link
          to="/catalog"
          className="
            font-heading font-medium flex items-center gap-1
            text-[#21262B] underline justify-self-end mt-[28px]
            transition-colors duration-200
            hover:text-[#3D464D]
            group/link
          "
        >
          See more
          <div className="relative w-4 h-4 ml-1">
            <img
              src={ArrowShort}
              alt=""
              className="
                absolute inset-0 w-4 h-4 transition-opacity duration-200
                group-hover/link:opacity-0
                group-hover/link:[filter:invert(25%)_sepia(7%)_saturate(550%)_hue-rotate(160deg)_brightness(95%)_contrast(90%)]
              "
            />
            <img
              src={ArrowLong}
              alt=""
              className="
                absolute inset-0 w-4 h-4 opacity-0 transition-opacity duration-200
                group-hover/link:opacity-100
                group-hover/link:[filter:invert(25%)_sepia(7%)_saturate(550%)_hue-rotate(160deg)_brightness(95%)_contrast(90%)]
              "
            />
          </div>
        </Link>
      </div>

      {/* Сетка кафе */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center max-w-[1440px] mx-auto">
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
    </div>
  );
};
