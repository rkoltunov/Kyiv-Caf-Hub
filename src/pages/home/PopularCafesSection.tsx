import type { FC } from "react";
import { Link } from "react-router-dom";
import { CafeCard } from "../../components/ui/CafeCard";
import { cafes } from "../../mocks/cafes";
import ArrowIcon from "../../assets/icons/arrow-right_16.svg";

export const PopularCafesSection: FC = () => {
  // Пока просто берём первые 4 как "популярные"
  const popularCafes = [...cafes]
    .sort((a, b) => a.id - b.id)
    .slice(0, 4);

  return (
    <div className="bg-[#F9F8F5] w-full px-4 md:px-[42px] py-8 md:pb-[128px]">
      {/* Заголовок */}
      <div className="grid grid-cols-3 items-center max-w-[1440px] mx-auto mb-6">
        <div></div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wide text-center mb-4">
          Popular in Kyiv
        </h2>
        <Link
          to="/catalog"
          className="font-heading font-medium flex items-center gap-2 text-black underline justify-self-end mt-[28px]"
        >
          See more
          <img src={ArrowIcon} alt="" className="w-4 h-4" />
        </Link>
      </div>

      {/* Сетка кафе */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center max-w-[1440px] mx-auto">
        {popularCafes.map((cafe) => {
          // достаём метро через теги
          const metroTag = cafe.tags.find((t) => t.category === "METRO");
          const metro = metroTag ? metroTag.name : "—";

          // достаём первую картинку
          const image = cafe.images?.[0]?.imageUrl ?? "";

          return (
            <CafeCard
              key={cafe.id}
              id={cafe.id}
              title={cafe.name}
              metro={metro}
              image={image}
              className="w-full max-w-[300px] mx-auto"
            />
          );
        })}
      </div>
    </div>
  );
};