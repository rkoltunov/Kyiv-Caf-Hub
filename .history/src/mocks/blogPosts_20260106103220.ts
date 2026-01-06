import BlogImage1 from '../assets/home/blog/imageblog1.png';
import BlogImage2 from '../assets/home/blog/imageblog2.png';
import BlogImage3 from '../assets/home/blog/imageblog3.png';
import BlogImage4 from '../assets/home/blog/imageblog4.png';
import Image1 from '../assets/home/blog/image1.png'; 
import Image2 from '../assets/home/blog/image2.png'; 
import Image3 from '../assets/home/blog/image3.png'; 
import Image4 from '../assets/home/blog/image4.png'; 
import Image5 from '../assets/home/blog/image5.png'; 
import Image6 from '../assets/home/blog/image6.png'; 
import Image7 from '../assets/home/blog/image7.png'; 
import Image8 from '../assets/home/blog/image8.png'; 
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
        content: `
        <p>A croissant is not just dough and butter. It is a test of a baker’s skill, their ability to work with time, temperature and patience. Kyiv has long spoken the language of coffee, but who can say “bonjour” through a croissant? Here is my secret list of those who truly master this art.</p>
  
        <h2>1. Franik — Crunchy Croissants</h2>
        <p>The French would give a standing ovation. Here, the croissants have a distinct layered texture and a crunch that can be heard even by the neighbour at the next table.</p>
        <ul>
          <li>Pistachio-chocolate — a favourite among gourmets (198 UAH): covered with white chocolate mixed with pistachios. This is a dessert for aristocrats. </li>
          <li>Chocolate praline — milk chocolate adds tenderness.</li>
          <li>Almond, pistachio frangipane, classic — each is worth trying.</li>
        </ul>
        <p><em>Verdict: the perfect choice for those who consider croissants an art form rather than breakfast</em></p>
                <p>Kyiv lives for croissants as much as it does for coffee. If you are looking for the perfect crunch, go to Franik. If you want a classic without surprises, go to Paul. If you are looking for gastronomic experiments, your destination is Juju or Barbara. Overall, my opinion is subjective, so it is worth visiting all the cafés to make your own verdict.</p>
      `,
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
        content: `
        <p>A croissant is not just dough and butter. It is a test of a baker’s skill, their ability to work with time, temperature and patience. Kyiv has long spoken the language of coffee, but who can say “bonjour” through a croissant? Here is my secret list of those who truly master this art.</p>
  
        <h2>1. Franik — Crunchy Croissants</h2>
        <p>The French would give a standing ovation. Here, the croissants have a distinct layered texture and a crunch that can be heard even by the neighbour at the next table.</p>
        <ul>
          <li>Pistachio-chocolate — a favourite among gourmets (198 UAH): covered with white chocolate mixed with pistachios. This is a dessert for aristocrats. </li>
          <li>Chocolate praline — milk chocolate adds tenderness.</li>
          <li>Almond, pistachio frangipane, classic — each is worth trying.</li>
        </ul>
        <p><em>Verdict: the perfect choice for those who consider croissants an art form rather than breakfast</em></p>
  
        <h2>2. Paul</h2>
        <p>A timeless classic. The atmosphere of Paris, recipes proven over a century.</p>
        <ul>
          <li>Paul croissant (110 UAH) — the absolute standard: golden crust, light butter.</li>
          <li>Almond and pistachio — for those who love a richer taste.</li>
        </ul>
        <p><em>Verdict: Paul is not an experiment, but a confidence that this is how it should be</em></p>
  
        <h2>3. Volkonsky</h2>
        <p>Here, croissants smell of real butter and memories of old Europe.</p>
        <ul>
          <li>Almond croissant (200 UAH) — a favourite, a sweet classic for those who love the balance of crunch and filling.</li>
        </ul>
        <p>There are also orange, orange with almonds, chocolate, and chocolate with almonds.</p>
        <p><em>Verdict: for connoisseurs of traditional French flavours</em></p>
  
        <h2>4. Remi Café</h2>
        <p>A place for those who are not afraid of sweet candour.</p>
        <ul>
          <li>With Nutella (230 UAH) — a favourite that is sure to impress.</li>
        </ul>
              <p>Also on the menu: almond frangipane, strawberry ice cream, classic.</p>
        <p><em>Verdict: a sweet paradise for those who believe that croissants should be generously filled</em></p>
  
        <h2>5. BoHlib</h2>
        <p>Here, croissants are not aristocrats, but sincere friends. Accessible, warm, and always served with coffee.</p>
        <ul>
          <li>Mini croissant with lemon curd (79 UAH) — sweet and sour happiness.
  </li>
          <li>Croissant with spinach and brynza cheese (46 UAH) — proof that savoury 
  croissants exist for a reason.</li>
        </ul>
        <p><em>Verdict: for those who want soulfulness and taste without pretension</em></p>
  
        <h2>6. Juju</h2>
        <p>Third wave coffee and very bold pastries.</p>
        <ul>
          <li>Raspberry cheesecake (200 UAH) — a favourite, with a round shape and berry nutrition.</li>
                </ul>
  <p>There is also a large selection of sweet options.</p>
        
        <p><em>Verdict: for those who want a gastronomic experience, not just a snack</em></p>
  
        <h2>7. Barbara Food & Coffee Bar</h2>
              <ul>
        <li>A place where croissants are a separate menu.</li>
          <li>Ban mi with veal (135 UAH) — Asian mood in French pastry.</li>
          <li>Cream cheese with apricot jam (99 UAH) — lightness and sweetness in a pair.</li>
        </ul>
        <p><em>Verdict: for those who want a gastronomic experience, not just a snack</em></p>
  
        <h2>8. Lviv Croissants</h2>
        <p>A legendary chain that has conquered all of Ukraine. The choice is so vast that it's hard to stop. They have everything here: from classics to fillings you've never tried before.</p>
        <p><em>Verdict: for those who love choice and the confidence that ‘I’ll definitely find something delicious</em></p>
  
        <p>Kyiv lives for croissants as much as it does for coffee. If you are looking for the perfect crunch, go to Franik. If you want a classic without surprises, go to Paul. If you are looking for gastronomic experiments, your destination is Juju or Barbara. Overall, my opinion is subjective, so it is worth visiting all the cafés to make your own verdict.</p>
      `,
      slug: 'best-croissants-in-kyiv',
      categories: [{ id: 4, name: 'Best croissants' }],
      tags: [
        { id: 1, name: 'Croissants Kyiv', slug: 'croissants-kyiv', category: 'OTHER' },
        { id: 2, name: 'Best croissants', slug: 'best-croissants', category: 'OTHER' },
        { id: 3, name: 'Coffee shops in Kyiv', slug: 'coffee-shops-kyiv', category: 'OTHER' },
        { id: 4, name: 'French pastries', slug: 'french-pastries', category: 'OTHER' },
        { id: 5, name: 'Top coffee shops in Kyiv', slug: 'top-coffee-shops-kyiv', category: 'OTHER' },
        { id: 6, name: 'Where to eat croissants in Kyiv', slug: 'where-to-eat-croissants-kyiv', category: 'OTHER' },
        { id: 7, name: '#Desserts in Kyiv', slug: 'desserts-in-kyiv', category: 'OTHER' },
      ],
      images: [
        { id: 1, imageUrl: BlogImage2, altText: 'Main blog image' },
        { id: 2, imageUrl: Image1, altText: 'Franik — Crunchy Croissants' },
        { id: 3, imageUrl: Image2, altText: 'Paul Café' },
        { id: 4, imageUrl: Image3, altText: 'Volkonsky' },
        { id: 5, imageUrl: Image4, altText: 'Remi Café' },
        { id: 6, imageUrl: Image5, altText: 'BoHlib' },
        { id: 7, imageUrl: Image6, altText: 'Juju' },
        { id: 8, imageUrl: Image7, altText: 'Barbara Food & Coffee Bar' },
        { id: 9, imageUrl: Image8, altText: 'Lviv Croissants' },
      ],
    },
  ],
};