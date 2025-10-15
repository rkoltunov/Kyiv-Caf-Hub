import BlogImage1 from '../assets/home/blog/imageblog1.png';
import BlogImage2 from '../assets/home/blog/imageblog2.png'; 
import BlogImage3 from '../assets/home/blog/imageblog3.png';
import BlogImage4 from '../assets/home/blog/imageblog4.png';
import ButtonIcon from '../assets/home/blog/menu8.svg';

export interface BlogItem {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonIcon: string;
  imagePosition: 'left' | 'right'; // Добавляем позицию изображения
}

export const blogItems: BlogItem[] = [
  {
    id: 1,
    title: "The Art of Coffee Brewing",
    description: "Discover the secrets behind perfect coffee brewing techniques...",
    image: BlogImage1,
    buttonIcon: ButtonIcon,
    imagePosition: 'left'
  },
  {
    id: 2,
    title: "Top 5 Coffee Shops in Kyiv",
    description: "Explore the best coffee spots in Kyiv that offer unique atmospheres...",
    image: BlogImage2,
    buttonIcon: ButtonIcon,
    imagePosition: 'left'
  },
  {
    id: 3, 
    title: "Sustainable Coffee Practices",
    description: "Learn about eco-friendly coffee production and how your choices impact...",
    image: BlogImage3,
    buttonIcon: ButtonIcon,
    imagePosition: 'right'
  },
  {
    id: 4,
    title: "Coffee and Productivity",
    description: "How the right coffee can boost your productivity and enhance your daily work...",
    image: BlogImage4,
    buttonIcon: ButtonIcon,
    imagePosition: 'right'
  }
];