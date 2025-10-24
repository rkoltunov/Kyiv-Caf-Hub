import BlogImage1 from '../assets/home/blog/imageblog1.png';
import BlogImage2 from '../assets/home/blog/imageblog2.png';
import BlogImage3 from '../assets/home/blog/imageblog3.png';
import BlogImage4 from '../assets/home/blog/imageblog4.png';
import type { PageBlogPostResponseDto } from '../types/dto';

export const blogPosts: PageBlogPostResponseDto = {
  totalPages: 1,
  totalElements: 4,
  size: 4,
  number: 0,
  first: true,
  last: true,
  empty: false,
  numberOfElements: 4,
  sort: [],
  pageable: {
    offset: 0,
    sort: [],
    unpaged: false,
    paged: true,
    pageNumber: 0,
    pageSize: 4,
  },
  content: [
    {
      id: 1,
      title: 'Coffee walk in Podil',
      excerpt:
        'Autumn in Kyiv is especially beautiful in Podil. Fog over the Dnipro, yellowed leaves, old streets where coffee smells stronger than any perfume...',
      content: '',
      slug: 'coffee-walk-in-podil',
      categories: [{ id: 1, name: 'About baristas' }],
      tags: [
        { id: 1, name: 'Podil', slug: 'podil', category: 'VIBE' },
        { id: 2, name: 'Walk', slug: 'walk', category: 'OTHER' },
      ],
      images: [
        { id: 1, imageUrl: BlogImage3, altText: 'Coffee walk in Podil' },
      ],
    },
    {
      id: 2,
      title: 'Coffee that makes it onto your Instagram',
      excerpt:
        "Kyiv is a city that not only impresses with its architectural beauty and history, but also delights gourmets with delicious coffee drinks. The capital's Instagram...",
      content: '',
      slug: 'coffee-that-makes-it-onto-your-instagram',
      categories: [{ id: 2, name: 'Café review' }],
      tags: [
        { id: 3, name: 'Instagrammable', slug: 'instagrammable', category: 'VIBE' },
      ],
      images: [
        { id: 2, imageUrl: BlogImage1, altText: 'Coffee that makes it onto your Instagram' },
      ],
    },
    {
      id: 3,
      title: 'Kyiv coffee shops where you feel at home',
      excerpt:
        'Kyiv is a city that knows how to combine the taste of coffee with an atmosphere of comfort and literature. If you like to enjoy a cup of aromatic coffee while...',
      content: '',
      slug: 'kyiv-coffee-shops-where-you-feel-at-home',
      categories: [{ id: 3, name: 'Coffee history' }],
      tags: [{ id: 4, name: 'Cozy', slug: 'cozy', category: 'VIBE' }],
      images: [
        { id: 3, imageUrl: BlogImage4, altText: 'Kyiv coffee shops where you feel at home' },
      ],
    },
    {
      id: 4,
      title: '8 cafés in Kyiv with the best croissants',
      excerpt:
        "A croissant is not just dough and butter. It is a test of a baker's skill, their ability to work with time, temperature and patience. Kyiv has long spoken the...",
      content: '',
      slug: 'best-croissants-in-kyiv',
      categories: [{ id: 4, name: 'Best croissants' }],
      tags: [{ id: 5, name: 'Croissants', slug: 'croissants', category: 'MENU' }],
      images: [
        { id: 4, imageUrl: BlogImage2, altText: '8 cafés in Kyiv with the best croissants' },
      ],
    },
  ],
};