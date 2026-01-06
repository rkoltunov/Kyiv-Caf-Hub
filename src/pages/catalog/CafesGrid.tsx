import { CafeCard } from "../../components/ui/CafeCard";
import ShowMoreIcon from "../../assets/icons/add-filled-circle.svg";

interface Cafe {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  metro: string;
}

interface CafesGridProps {
  visibleItems: Cafe[];
  filteredItems: Cafe[];
  onShowMore: () => void;
}

export default function CafesGrid({
  visibleItems,
  filteredItems,
  onShowMore,
}: CafesGridProps) {
  return (
    <>
      {/* Количество результатов */}
      <div className="text-gray-600 px-4 sm:px-8 lg:px-[42px] font-medium mb-6 text-left">
        {filteredItems.length} results
      </div>

      {/* Адаптивная сетка */}
      <div className="px-4 sm:px-8 lg:px-[42px]">
        <div
          className="
            w-full max-w-[1440px] mx-auto
            grid
            gap-x-6 gap-y-8
            justify-center                /* центрируем сетку */
            
            grid-cols-1                   /* мобильные */
            sm:grid-cols-2                /* планшеты и большие телефоны */
            lg:grid-cols-3                /* маленькие ноутбуки */
            xl:grid-cols-4                /* десктоп */
          "
        >
          {visibleItems.map((cafe) => (
            <CafeCard
              key={cafe.id}
              id={cafe.id}
              slug={cafe.slug}
              title={cafe.title}
              description={cafe.description}
              image={cafe.image}
              metro={cafe.metro}
              // Никаких max-w здесь больше не нужно!
            />
          ))}
        </div>
      </div>

      {/* Кнопка Show more */}
      {visibleItems.length < filteredItems.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={onShowMore}
            className="
              flex items-center gap-3 px-6 py-3
              font-heading font-medium text-black
               border-black rounded-full
              hover:bg-black hover:text-white
              active:scale-95 transition-transform
            "
          >
            Show more
            <img src={ShowMoreIcon} alt="" className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}