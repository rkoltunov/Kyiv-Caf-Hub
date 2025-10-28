import type { FC } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../mocks/blogPosts';
import ArrowShort from "../../assets/icons/arrow-right_16.svg";
import ArrowLong from "../../assets/icons/arrow-right_long_16.svg";
import { ButtonIcon } from "../../components/ui/Button";

type BlogPost = (typeof blogPosts.content)[0];

const BlogCard = memo(({ post, index }: { post: BlogPost; index: number }) => {
  const imageOnRight = index < 2;
  const blogLink = `/blog/${post.slug}`;

  const image = post.images?.[0]?.imageUrl ?? '';
  const alt = post.images?.[0]?.altText ?? post.title;


  return (
    <div
      className={`
        w-full max-w-[670px] h-[256px] bg-[#F9F8F5]
        border border-gray-300 rounded-[30px] flex overflow-hidden mx-auto
    transition-all duration-300
    hover:bg-white hover:border-[#21262B]
        ${imageOnRight ? 'md:flex-row-reverse' : ''}
      `}
    >
      {/* Кликабельное изображение */}
      <Link to={blogLink} className="w-1/2 h-full block">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Контент */}
      <div className="w-1/2  md:pb-4 p-6  flex flex-col justify-between">
        <div>


          <h3 className="text-[22px] font-medium mb-2 line-clamp-1">{post.title}</h3>
          <p className="text-[16px] text-gray-600 mb-6 line-clamp-4" >{post.excerpt}</p>
        </div>

        {/* Кнопка */}
        <Link to={blogLink} className="flex justify-end">
  <ButtonIcon label="Read article" />
</Link>
      </div>
    </div>
  );
});
BlogCard.displayName = 'BlogCard';

export const BlogSection: FC = () => {
  // 🟤 Задаём порядок, как ты написал:
  const customOrder = [
    'coffee-that-makes-it-onto-your-instagram', // 1
    'best-croissants-in-kyiv',                  // 2
    'coffee-walk-in-podil',                     // 3
    'kyiv-coffee-shops-where-you-feel-at-home', // 4
  ];

  const orderedPosts = customOrder
    .map(slug => blogPosts.content.find(p => p.slug === slug))
    .filter(Boolean) as BlogPost[];

  return (
    <div className="bg-[#F9F8F5] w-full px-4 md:px-[42px] py-8 md:pb-[128px]">
      {/* Заголовок секции */}
      <div className="grid grid-cols-3 items-center max-w-[1440px] mx-auto mb-6">
        <div></div>
        <h2 className="font-heading text-3xl md:text-4xl font-medium uppercase tracking-wide text-center mb-4">
          our blog
        </h2>
        <Link
  to="/blog"
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
    {/* короткая стрелка */}
    <img
      src={ArrowShort}
      alt=""
      className="
        absolute inset-0 w-4 h-4 transition-opacity duration-200
        group-hover/link:opacity-0
        group-hover/link:[filter:invert(25%)_sepia(7%)_saturate(550%)_hue-rotate(160deg)_brightness(95%)_contrast(90%)]
      "
    />

    {/* длинная стрелка */}
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

      {/* Карточки блога */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 justify-items-center max-w-[1440px] mx-auto">
        {orderedPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
};