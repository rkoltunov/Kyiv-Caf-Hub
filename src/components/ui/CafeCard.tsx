import type { FC } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import ArrowShort from "../../assets/icons/arrow-right_16.svg";
import ArrowLong from "../../assets/icons/arrow-right_long_16.svg";

type CafeCardProps = {
  id: number | string;
  title: string;
  metro?: string;
  description?: string;
  image?: string;
  className?: string;
};

export const CafeCard: FC<CafeCardProps> = ({
  id,
  title,
  metro,
  image,
  className = "",
}) => {
  return (
    <Card
      className={`
        group flex flex-col  p-0
        w-full max-w-[300px] sm:max-w-[327px]
        bg-[#F9F8F5]
        border border-transparent
        transition-all duration-300 ease-in-out

        ${className}
      `}
    >
      {/* Фото (кликабельно) */}
      <Link
        to={`/cafes/${id}`}
        className="relative w-full aspect-[4/5] mb-4 border border-gray-300 rounded-[12px] p-4 block overflow-hidden         hover:bg-white hover:shadow-[4px_3px_0_#21262B]"
      >
        <div className="w-full h-full rounded-[8px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="
              w-full h-full object-cover
              transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              group-hover:scale-105
            "
          />
        </div>
      </Link>

      {/* Контент */}
      <div className="flex flex-col flex-1 px-4 pb-4">
        {/* Метро */}
        {metro && (
          <div className="mb-2">
            <span className="inline-block px-3 rounded-[8px] text-gray-700 border border-gray-300 font-medium ">
              {metro}
            </span>
          </div>
        )}

        {/* Название */}
        <h3 className="font-semibold text-lg md:text-xl mb-4">{title}</h3>

        {/* Кнопка */}
        <Link
  to={`/cafes/${id}`}
  className="flex justify-start  group/link"
>
  <div
    className="
      flex items-center gap-1
      text-[#21262B]
      transition-colors duration-200
      hover:text-[#3D464D]
    "
  >
    <span
      className="
        font-heading font-medium underline decoration-2 underline-offset-4
        transition-colors duration-200
      "
    >
      See cafe
    </span>

    {/* Стрелка через иконки */}
    <div className="relative w-[16px] h-[16px]">
      <img
        src={ArrowShort}
        alt=""
        className="absolute inset-0 w-[16px] h-[16px] transition-opacity duration-200 group-hover/link:opacity-0"
      />
      <img
        src={ArrowLong}
        alt=""
        className="absolute inset-0 w-[16px] h-[16px] opacity-0 transition-opacity duration-200 group-hover/link:opacity-100 group-hover/link:[filter:invert(25%)_sepia(7%)_saturate(550%)_hue-rotate(160deg)_brightness(95%)_contrast(90%)]"
      />
    </div>
  </div>
</Link>
      </div>
    </Card>
  );
};