import { blogPageBackendMock } from './blogPageBackendMock';

import BlogImage2 from '../assets/home/blog/imageblog2.png'; 

// ===============================
// 📦 Типы для старого формата
// ===============================
type Place = {
  id: number;
  title: string;
  description: string;
  verdict: string;
  image: any;
};

type BlogPost = {
  id: number;
  title: string;
  category: string;
  categorySlug: string;
  image: any;
  date: string;
  readTime: string;
  intro: string;
  places: Place[];
  outro: string;
  tags: string[];
};

// ===============================
// 📍 Список заголовков и картинок для кафе
// ===============================
// ===============================
// 🔁 Функция конвертации бэкенд-данных в старый формат
// ===============================
export const convertBackendToOldFormat = (
  backendData: typeof blogPageBackendMock
): BlogPost[] => {
  return backendData.map(post => {
    // Вытаскиваем все <p>...</p> из контента
    const paragraphs = post.content.match(/<p>.*?<\/p>/gs) || [];

    const intro = paragraphs[0] || '';
    const outro = paragraphs[paragraphs.length - 1] || '';

    // Всё, что между — это контент для places
    const middleContent = post.content.split(/<h2>/).slice(1);
    const places: Place[] = middleContent.map((block, index) => {
      const title = block.match(/^(.*?)<\/h2>/)?.[1]?.trim() || `Place ${index + 1}`;
      const body = block.replace(/.*?<\/h2>/, ''); // всё, что после заголовка
      const description = body.match(/<(p|ul)[\s\S]*?<\/\1>/g)?.join(' ') || '<p>Description not provided</p>';
      const verdict = body.match(/<em>.*?<\/em>/)?.[0] || '<em>Verdict not found</em>';
      const image = post.images[index + 1]?.imageUrl || ''; // пропускаем main image
      
      return {
        id: index + 1,
        title,
        description,
        verdict: `<p>${verdict}</p>`,
        image
      };
    }).reverse(); // чтобы 8 был сверху

    return {
      id: post.id,
      title: post.title,
      category: post.categories[0]?.name || 'Uncategorized',
      categorySlug: post.slug,
      image: BlogImage2,
      date: 'Jun 19, 2025',
      readTime: '10 min read',
      intro,
      places,
      outro,
      tags: post.tags.map(t => t.name)
    };
  });
};

// ===============================
// ✅ Готовый мок в старом формате
// ===============================
export const blogPage = convertBackendToOldFormat(blogPageBackendMock);