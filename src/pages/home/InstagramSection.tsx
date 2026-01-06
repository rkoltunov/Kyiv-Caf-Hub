import  type { FC } from 'react';
import  { memo } from 'react';
// Импорты изображений (как в вашем исходном коде)
import Inst1 from '../../assets/home/instag/imageinst1.png';
import Inst2 from '../../assets/home/instag/imageinst2.png';
import Inst3 from '../../assets/home/instag/imageinst3.png'; // Убедитесь, что файл называется правильно (в вашем коде Inst3)
import Inst4 from '../../assets/home/instag/imageinst4.png'; // То же для Inst4

// Данные – вынесены в константу (можно в отдельный файл позже)
const instagramItems = [
  { id: 1, image: Inst1, text: '@jane67', link: 'https://www.instagram.com/jane67/' },
  { id: 2, image: Inst2, text: '@katya_sun', link: 'https://www.instagram.com/katya_sun/' },
  { id: 3, image: Inst3, text: '@max_91', link: 'https://www.instagram.com/max_91/' },
  { id: 4, image: Inst4, text: '@nastya.art', link: 'https://www.instagram.com/nastya.art/' },
];

// Memoized компонент для Instagram‑карточки
const InstagramCard = memo(({ item }: { item: typeof instagramItems[0] }) => (
  <div className="w-full max-w-[327px] border border-gray-300 rounded-[12px] flex flex-col items-start p-3 sm:p-4 bg-[white]">
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="aspect-[295/356] w-full overflow-hidden rounded-[12px] block group"
    >
      <img
        src={item.image}
        alt={`Coffee moment ${item.id}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </a>
    <div className="mt-2">
      <span
        style={{
          fontFamily: "'Hurricane', cursive",
          fontWeight: 500,
          textTransform: 'uppercase',
          color: '#1f2937',
          fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
        }}
      >
        {item.text}
      </span>
    </div>
  </div>
));
InstagramCard.displayName = 'InstagramCard';

export const InstagramSection: FC = () => {
  return (
    <div
      className="bg-[#F9F8F5] w-full px-4 md:px-[42px] py-8 md:pb-[56px]"
      style={{ borderRadius: '0px 0px 30px 30px' }}
    >
      <div className="flex justify-center max-w-[1440px] mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-medium uppercase tracking-wide text-center mb-4 md:mb-[14px]">
          Share the joy of your coffee moment
        </h2>
      </div>

      <p className="text-center text-sm mb-6 md:mb-8 max-w-[1440px] mx-auto">
        Show us your #BestCoffeeMoment by tagging us @Kyivcafehub for a chance to be featured!
      </p>

      <div className="
  grid 
  grid-cols-2           /* mobile → 2 карточки */
  sm:grid-cols-2        /* tablet → 2 карточки */
  xl:grid-cols-4        /* desktop ≥1280 → 4 карточки */
  gap-6 
  justify-items-center 
  max-w-[1440px] 
  mx-auto
">
        {instagramItems.map((item) => (
          <InstagramCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};