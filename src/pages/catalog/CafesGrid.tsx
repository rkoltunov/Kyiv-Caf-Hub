import { CafeCard } from "../../components/ui/CafeCard";
import ShowMoreIcon from "../../assets/icons/add-filled-circle.svg";

interface Cafe {
  id: string;
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
      {/* Кол-во результатов */}
      <div className="text-gray-600 font-medium mb-6 text-left">
        {filteredItems.length} results
      </div>

      {/* Сетка карточек */}
      <div className="flex justify-center">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 justify-items-center w-full max-w-[1440px]"
        >
          {visibleItems.map(({ id, title, description, image, metro }: Cafe) => (
      <CafeCard
      key={id}
      id={id}
      title={title}
      description={description}
      image={image}
      metro={metro}
      className="w-full max-w-[300px] sm:max-w-[320px]"
    />
          ))}
        </div>
      </div>

      {/* Кнопка "Show more" */}
      {visibleItems.length < filteredItems.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onShowMore}
            className="flex items-center gap-2 px-4 py-2  font-medium font-heading text-black hover:text-gray-700 transition-colors "
          >
            Show more
            <img src={ShowMoreIcon} alt="" className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}