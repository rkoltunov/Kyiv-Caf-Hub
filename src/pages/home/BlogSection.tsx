import type { FC } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { blogItems } from '../../mocks/popularBlogs';
import ArrowIcon from '../../assets/icons/arrow-right_16.svg';

// Memoized компонент для карточки блога
const BlogCard = memo(({ item, index }: { item: typeof blogItems[0]; index: number }) => {
  const imageOnRight = index < 2;
  const blogLink = `/blog/${item.id}`;

  return (
    <div
      className={`
        w-full max-w-[670px] h-[256px] bg-[#F9F8F5]
        border border-gray-300 rounded-[30px] flex overflow-hidden mx-auto
        ${imageOnRight ? 'md:flex-row-reverse' : ''}
      `}
    >
      {/* Кликабельное изображение */}
      <Link to={blogLink} className="w-1/2 h-full block">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Контент */}
      <div className="w-1/2 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        </div>

        {/* Кнопка "Read now" */}
        <Link to={blogLink} className="flex justify-end">
          <img
            src={item.buttonIcon || ArrowIcon}
            alt="Read now"
            className="h-8 md:h-12 transition-transform duration-300 hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
});
BlogCard.displayName = 'BlogCard';

export const BlogSection: FC = () => {
  return (
    <div className="bg-[#F9F8F5] w-full px-4 md:px-[42px] py-8 md:pb-[128px]">
      {/* Заголовок секции */}
      <div className="grid grid-cols-3 items-center max-w-[1440px] mx-auto mb-6">
        <div></div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wide text-center mb-4">
          our blog
        </h2>
        <Link
          to="/blog"
          className="font-heading font-medium flex items-center gap-2 text-black underline justify-self-end mt-[28px]"
        >
          Read more
          <img src={ArrowIcon} alt="" className="w-4 h-4" />
        </Link>
      </div>

      {/* Карточки блога */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-items-center max-w-[1440px] mx-auto">
        {blogItems.map((item, index) => (
          <BlogCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};