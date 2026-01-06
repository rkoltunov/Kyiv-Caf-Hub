import type { FC } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import ArrowShort from "../../assets/icons/arrow-right_16.svg";
import ArrowLong from "../../assets/icons/arrow-right_long_16.svg";

type CafeCardProps = {
  id: number;
  slug: string;
  title: string;
  metro?: string;
  description?: string;
  image?: string;
  className?: string;
};

export const CafeCard: FC<CafeCardProps> = ({
  id,
  slug,
  title,
  metro,
  image,
  className = "",
}) => {
  const cafeUrl = `/cafe/${id}-${slug}`;

  return (
    <>
      {/* ================= DESKTOP ≥1280px ================= */}
      <Card
        className={`
          hidden xl:flex flex-col p-0
          w-full max-w-[327px]          /* Жёсткий лимит для десктопа */
          mx-auto                       /* центрируем, если ячейка шире */
          bg-[#F9F8F5]
          border border-transparent
          transition-all duration-300
          ${className}
        `}
      >
        {/* Фото */}
        <Link
          to={cafeUrl}
          className="relative w-full aspect-[4/5] mb-4 border border-gray-300 rounded-[12px] p-4 block overflow-hidden hover:bg-white hover:shadow-[4px_3px_0_#21262B] transition-all"
        >
          <div className="w-full h-full rounded-[8px] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Контент — растягивается, кнопка всегда внизу */}
        <div className="flex flex-col flex-1 px-4  min-h-0">
          {metro && (
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-[8px] text-gray-700 border border-gray-300 font-medium text-sm">
                {metro}
              </span>
            </div>
          )}

          <h3 className="font-semibold text-lg md:text-xl mb-4 line-clamp-2">
            {title}
          </h3>

          {/* Кнопка всегда внизу */}
          <Link to={cafeUrl} className="mt-auto flex justify-start group/link">
            <div className="flex items-center gap-1 text-[#21262B] hover:text-[#3D464D] transition-colors">
              <span className="font-heading font-medium underline decoration-2 underline-offset-4">
                See cafe
              </span>
              <div className="relative w-[16px] h-[16px]">
                <img src={ArrowShort} alt="" className="absolute inset-0 opacity-100 group-hover/link:opacity-0 transition-opacity" />
                <img src={ArrowLong} alt="" className="absolute inset-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        </div>
      </Card>

      {/* ================= MOBILE + TABLET <1280px ================= */}
      <Link
        to={cafeUrl}
        className={`
          xl:hidden block
          w-full
          max-w-[343px]           /* мобильный */
          sm:max-w-[334px]        /* планшет */
          mx-auto                 /* центрируем карточку в ячейке */
          rounded-[20px] bg-[#F9F8F5] border border-gray-300
          overflow-hidden transition-all active:scale-[0.98]
          ${className}
        `}
      >
        <div className="p-4">
          <div className="w-full h-[350px] rounded-[12px] overflow-hidden border border-gray-300">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4">
            {metro && (
              <span className="inline-block mb-2 px-3 py-[2px] rounded-[8px] text-gray-700 border border-gray-300 font-medium text-sm">
                {metro}
              </span>
            )}
            <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
};