import type { CafeResponseDto } from "../types/dto";
import TeddyBarCafe from '../assets/home/cafepage/teddy.png';
import TeddySmall1 from "../assets/home/cafepage/teddysmal1.png";
import TeddySmall2 from "../assets/home/cafepage/teddysmal2.png";
import TeddyRight from "../assets/home/cafepage/teddyright.png";

import MatchaBar from '../assets/home/cafepage/matcha.png';
import MatchaSmall1 from "../assets/home/cafepage/matchasmal1.png";
import MatchaSmall2 from "../assets/home/cafepage/matchasmal2.png";
import MatchaRight from "../assets/home/cafepage/matcharight.png";
import Photo3 from '../assets/home/cafepage/image3.png';
import Photo4 from '../assets/home/cafepage/image4.png';
import Photo5 from '../assets/home/cafepage/image5.png';
import Photo6 from '../assets/home/cafepage/image6.png';
import Photo7 from '../assets/home/cafepage/image7.png';
import Photo8 from '../assets/home/cafepage/image8.png';
import Sereda from "../assets/home/cafepage/sereda.png";
import SeredaSmall1 from "../assets/home/cafepage/seredasmall1.png";
import SeredaSmall2 from "../assets/home/cafepage/seredasmall2.png";
import SeredaRight from "../assets/home/cafepage/seredaright.png";


// 👇 Моковые данные для разработки
const mockCafes: CafeResponseDto[] = [

  {
    id: 1,
    name: "Teddy Bar Cafe",
    excerpt: "Modern café with excellent coffee",
    description: "Teddy Bar Cafe is a bright pink coffee shop near the Slavutych metro station, where all the walls are covered with teddy bears, creating a cosy and cute atmosphere. It is the perfect place for incredible photos, where stylish design is combined with delicious coffee and an original cocktail menu.",
slug: "teddy-bar-cafe",
    address: "21a Tsentralna Street, building 2, Kyiv",
    latitude: 50.4836, 
    longitude: 30.4005,
    hours:"Mon-Sun from 9:00 AM to 9:00 PM",
    tags: [
      { id: 9, name: "Slavutych", slug: "slavutych", category: "METRO" },
      { id: 12, name: "Instagrammable", slug: "instagrammable", category: "VIBE" },
      { id: 13, name: "Alternative milk", slug: "alternative-milk", category: "MENU" },
      { id: 16, name: "$$", slug: "budget-2", category: "BUDGET" }
    ],
    images: [
      { id: 3, imageUrl: TeddyBarCafe, altText: "Teddy Bar Cafe" },
      { id: 4, imageUrl: TeddySmall1, altText: "Teddy Bar Cafe" },
      { id: 5, imageUrl: TeddySmall2, altText: "Teddy Bar Cafe" },
      { id: 6, imageUrl: TeddyRight , altText: "Teddy Bar Cafe" }
    ]
  },
  {
    id: 2,
    name: "DOT. MATCHA BAR & COFFEE",
    excerpt: "Relaxed vibe and great lattes",
    description: "DOT. MATCHA BAR & COFFEE is a bright spot for matcha lovers in the city centre, where every drink and dessert creates a mood. Here, a stylish atmosphere is combined with a creative menu, and matcha sweets and drinks made with alternative milk become a real ritual of energy and inspiration.",
slug: "dot-matcha-bar-coffee",
    address: "1/2 Baseina Street, Kyiv",
    latitude: 50.4417, 
    longitude: 30.5224,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 25, name: "Palats Sportu", slug: "palats-sportu", category: "METRO" },
      { id: 37, name: "Alternative milk", slug: "alternative-milk", category: "MENU" },
      { id: 20, name: "Matcha", slug: "matcha", category: "MENU" },
      { id: 28, name: "Instagrammable", slug: "instagrammable", category: "VIBE" },
      { id: 30, name: "Restrooms", slug: "restrooms", category: "ACCESSIBILITY" },
      { id: 31, name: "Accessibility", slug: "accessibility", category: "ACCESSIBILITY" },
      { id: 32, name: "$$$", slug: "budget-3", category: "BUDGET" }
    ],
    images: [
      { id: 5, imageUrl: MatchaBar, altText: "Latte Lounge" },
      { id: 6, imageUrl: MatchaSmall1, altText: "Latte Lounge" },
      { id: 7, imageUrl: MatchaSmall2, altText: "Latte Lounge" },
      { id: 8, imageUrl: MatchaRight, altText: "Latte Lounge" }
    ]
  },
  {
    id: 3,
    name: "Cafe Marko",
    excerpt: "Small cozy corner for coffee lovers",
    description: "Barista Corner offers a wide variety of coffee and tea in a homely atmosphere, perfect for quiet afternoons.",
slug: "cafe-marko",
    address: "Bohdana Khmelnytskoho Street, 14, Kyiv",
    latitude: 50.4444,
    longitude: 30.5180,
    hours:"Mon-Fri 09:00-19:00; Sat-Sun 10:00-18:00",
    tags: [
      { id: 17, name: "Maidan Nezalezhnosti", slug: "maidan", category: "METRO" },
      { id: 18, name: "Kid-friendly", slug: "kid-friendly", category: "VIBE" },
      { id: 19, name: "Instagrammable", slug: "instagrammable", category: "VIBE" },
      { id: 20, name: "Matcha", slug: "matcha", category: "MENU" },
      { id: 21, name: "Sugar-free desserts", slug: "sugar-free-desserts", category: "MENU" },
      { id: 22, name: "Outdoor seating", slug: "outdoor-seating", category: "ACCESSIBILITY" },
      { id: 23, name: "Free Wi-Fi", slug: "free-wifi", category: "ACCESSIBILITY" },
      { id: 24, name: "$", slug: "budget-1", category: "BUDGET" }
    ],
    images: [
      { id: 4, imageUrl: Photo3, altText: "Barista Corner" }
    ]
  },

  {
    id: 4,
    name: "Sereda Vegan Point",
    excerpt: "Cozy vegan café in Podil",
    description: "Sereda Vegan Point is a cosy vegan café in Podil, where healthy eating is combined with a love of flavour. Here you will find freshly roasted coffee, vegan desserts and even sweets for diabetics, as well as a warm atmosphere that makes every visit special.",
slug: "sereda-vegan-point",
    address: "Nyzhnii Val Street, 39, Kyiv",
    latitude: 50.4684,
    longitude: 30.5151,
    hours: "Mon-Fri from 10:00 AM to 8:00 PM; Sat-Sun from 11:00 AM to 9:00 PM",
    tags: [
      { id: 1, name: "Kontraktova Ploshcha", slug: "kontraktova-ploshcha", category: "METRO" },
      { id: 2, name: "Cozy for meetings", slug: "cozy-for-meetings", category: "VIBE" },
      { id: 3, name: "Alternative milk available", slug: "alt-milk", category: "MENU" },
      { id: 4, name: "Vegan desserts", slug: "vegan-desserts", category: "MENU" },
      { id: 5, name: "Sugar-free desserts", slug: "sugar-free-desserts", category: "MENU" },
      { id: 6, name: "Accessibility", slug: "accessibility", category: "ACCESSIBILITY" },
      { id: 7, name: "Free Wi-Fi", slug: "free-wifi", category: "ACCESSIBILITY" },
      { id: 8, name: "$$$", slug: "budget-3", category: "BUDGET" }
    ],
    images: [{ id: 1, imageUrl: Sereda, altText: "Main photo" },
      { id: 2, imageUrl: SeredaSmall1, altText: "Small photo 1" },
      { id: 3, imageUrl: SeredaSmall2, altText: "Small photo 2" },
      { id: 4, imageUrl: SeredaRight, altText: "Right photo" },],
  },
  {
    id: 5,
    name: "KATIMO CAFÉ – KATIMO MATCHA CLUB",
    excerpt: "Eco-friendly café with fresh options",
    description: "Green Bean Café focuses on sustainability and organic ingredients. A perfect spot for healthy eating and coffee lovers.",
    slug: "green-bean-cafe",
    address: "Velyka Vasylkivska St, 18, Kyiv",
    latitude: 50.4475,
    longitude: 30.5210,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 33, name: "Zoloti Vorota", slug: "zoloti-vorota", category: "METRO" },
      { id: 34, name: "Instagrammable", slug: "instagrammable", category: "VIBE" },
      { id: 35, name: "With terrace", slug: "with-terrace", category: "VIBE" },
      { id: 36, name: "Vegan desserts", slug: "vegan-desserts", category: "MENU" },
      { id: 37, name: "Alternative milk", slug: "alternative-milk", category: "MENU" },
      { id: 38, name: "Outdoor seating", slug: "outdoor-seating", category: "ACCESSIBILITY" },
      { id: 39, name: "Free Wi-Fi", slug: "free-wifi", category: "ACCESSIBILITY" },
      { id: 40, name: "$$", slug: "budget-2", category: "BUDGET" }
    ],
    images: [
      { id: 6, imageUrl: Photo5, altText: "Green Bean Café" }
    ]
  },
  {
    id: 6,
    name: "Set Cafe",
    excerpt: "Experimental coffee and trendy atmosphere",
    description: "Urban Coffee Lab serves unique coffee blends in a modern, minimalist space ideal for young professionals.",
    slug: "urban-coffee-lab",
    address: "Obolon Ave, 5, Kyiv",
    latitude: 50.4810,
    longitude: 30.4980,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 41, name: "Kontraktova Ploshcha", slug: "kontraktova-ploshcha", category: "METRO" },
      { id: 42, name: "Work-friendly", slug: "work-friendly", category: "VIBE" },
      { id: 43, name: "Cozy for meetings", slug: "cozy-for-meetings", category: "VIBE" },
      { id: 44, name: "Finest pastries", slug: "finest-pastries", category: "MENU" },
      { id: 45, name: "Matcha", slug: "matcha", category: "MENU" },
      { id: 46, name: "Power outlets", slug: "power-outlets", category: "ACCESSIBILITY" },
      { id: 47, name: "Restrooms", slug: "restrooms", category: "ACCESSIBILITY" },
      { id: 48, name: "$", slug: "budget-1", category: "BUDGET" }
    ],
    images: [
      { id: 7, imageUrl: Photo6, altText: "Urban Coffee Lab" }
    ]
  },
  {
    id: 7,
    name: "Cafe Charlotte",
    excerpt: "Chill café for coffee and desserts",
    description: "Mocha Mood offers relaxing atmosphere, specialty mochas, cakes and a friendly environment for small gatherings.",
    slug: "mocha-mood",
    address: "Velyka Zhytomyrska St, 2, Kyiv",
    latitude: 50.4530,
    longitude: 30.5170,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 49, name: "Maidan Nezalezhnosti", slug: "maidan", category: "METRO" },
      { id: 50, name: "Kid-friendly", slug: "kid-friendly", category: "VIBE" },
      { id: 51, name: "With music", slug: "with-music", category: "VIBE" },
      { id: 52, name: "Vegan desserts", slug: "vegan-desserts", category: "MENU" },
      { id: 53, name: "Sugar-free desserts", slug: "sugar-free-desserts", category: "MENU" },
      { id: 54, name: "Outdoor seating", slug: "outdoor-seating", category: "ACCESSIBILITY" },
      { id: 55, name: "Accessibility", slug: "accessibility", category: "ACCESSIBILITY" },
      { id: 56, name: "$$", slug: "budget-2", category: "BUDGET" }
    ],
    images: [
      { id: 8, imageUrl: Photo7, altText: "Mocha Mood" }
    ]
  },
  {
    id: 8,
    name: "Lila Cake",
    excerpt: "Relaxed vibe and great lattes",
    description: "Latte Lounge is the perfect place to relax with friends, enjoy specialty lattes and light snacks.",
    slug: "latte-lounge",
    address: "Shevchenko Blvd, 12, Kyiv",
    latitude: 50.4470,
    longitude: 30.5190,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 25, name: "Teatralna", slug: "teatralna", category: "METRO" },
      { id: 26, name: "With terrace", slug: "with-terrace", category: "VIBE" },
      { id: 27, name: "Pet-friendly", slug: "pet-friendly", category: "VIBE" },
      { id: 28, name: "Finest pastries", slug: "finest-pastries", category: "MENU" },
      { id: 29, name: "Vegan desserts", slug: "vegan-desserts", category: "MENU" },
      { id: 30, name: "Restrooms", slug: "restrooms", category: "ACCESSIBILITY" },
      { id: 31, name: "Accessibility", slug: "accessibility", category: "ACCESSIBILITY" },
      { id: 32, name: "$$", slug: "budget-2", category: "BUDGET" }
    ],
    images: [
      { id: 5, imageUrl: Photo8, altText: "Latte Lounge" }
    ]
  },
  {
    id: 9,
    name: "Sereda Vegan Point",
    excerpt: "Cozy vegan café in Podil",
    description:
      "Sereda Vegan Point is a cozy vegan café in Podil, where healthy eating is combined with a love of flavour. Freshly roasted coffee, vegan desserts and sugar-free options await.",
    slug: "sereda-vegan-point",
    address: "Nyzhnii Val Street, 39, Kyiv",
    latitude: 50.4684,
    longitude: 30.5151,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 10, name: "Kontraktova Ploshcha", slug: "kontraktova-ploshcha", category: "METRO" },
      { id: 1, name: "Vegan desserts", slug: "vegan", category: "MENU" },
      { id: 2, name: "Cosy for meeting", slug: "cosy", category: "VIBE" },
      { id: 3, name: "$$$", slug: "budget-3", category: "BUDGET" }
    ],
    images: [
      { id: 1, imageUrl: TeddyBarCafe, altText: "Main photo" },

    ]
  },
  {
    id: 10,
    name: "Coffee Hub",
    excerpt: "Modern café with excellent coffee",
    description:
      "Coffee Hub serves specialty coffee and homemade pastries. Perfect spot for work or meetings in the heart of Kyiv.",
    slug: "coffee-hub",
    address: "Khreshchatyk Street, 22, Kyiv",
    latitude: 50.4501,
    longitude: 30.5234,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 11, name: "Khreshchatyk", slug: "khreshchatyk", category: "METRO" },
      { id: 4, name: "Coffee & pastries", slug: "coffee", category: "MENU" },
      { id: 5, name: "Fast WiFi", slug: "wifi", category: "VIBE" },
      { id: 6, name: "$$", slug: "budget-2", category: "BUDGET" }
    ],
    images: [
      { id: 3, imageUrl: MatchaBar, altText: "Coffee Hub" }
    ]
  },
  {
    id: 11,
    name: "Barista Corner",
    excerpt: "Small cozy corner for coffee lovers",
    description:
      "Barista Corner offers a wide variety of coffee and tea in a homely atmosphere, perfect for quiet afternoons.",
    slug: "barista-corner",
    address: "Bohdana Khmelnytskoho Street, 14, Kyiv",
    latitude: 50.4444,
    longitude: 30.5180,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 12, name: "Teatralna", slug: "teatralna", category: "METRO" },
      { id: 7, name: "Quiet place", slug: "quiet", category: "VIBE" },
      { id: 8, name: "$$", slug: "budget-2", category: "BUDGET" }
    ],
    images: [
      { id: 4, imageUrl: Photo3, altText: "Barista Corner" }
    ]
  },
  {
    id: 12,
    name: "Latte Lounge",
    excerpt: "Relaxed vibe and great lattes",
    description:
      "Latte Lounge is the perfect place to relax with friends, enjoy specialty lattes and light snacks.",
    slug: "latte-lounge",
    address: "Shevchenko Blvd, 12, Kyiv",
    latitude: 50.4470,
    longitude: 30.5190,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 13, name: "Universytet", slug: "universytet", category: "METRO" },
      { id: 9, name: "Latte", slug: "latte", category: "MENU" },
      { id: 10, name: "$$", slug: "budget-2", category: "BUDGET" }
    ],
    images: [
      { id: 5, imageUrl: Photo4, altText: "Latte Lounge" }
    ]
  },
  {
    id: 13,
    name: "Bean & Brew",
    excerpt: "Hip café with specialty beans",
    description:
      "Bean & Brew offers a modern hip vibe with specialty coffee beans roasted on-site and light bites.",
    slug: "bean-brew",
    address: "Podilskyi St, 7, Kyiv",
    latitude: 50.4685,
    longitude: 30.5150,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 14, name: "Kontraktova Ploshcha", slug: "kontraktova-ploshcha", category: "METRO" },
      { id: 11, name: "Hip vibe", slug: "hip", category: "VIBE" },
      { id: 12, name: "$$$", slug: "budget-3", category: "BUDGET" }
    ],
    images: [
      { id: 6, imageUrl: Photo5, altText: "Bean & Brew" }
    ]
  },
  {
    id: 14,
    name: "Mocha Magic",
    excerpt: "Chocolaty drinks and desserts",
    description:
      "Mocha Magic specializes in chocolatey drinks and desserts, perfect for sweet tooth lovers.",
    slug: "mocha-magic",
    address: "Velyka Vasylkivska, 21, Kyiv",
    latitude: 50.4330,
    longitude: 30.5210,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 15, name: "Olimpiiska", slug: "olimpiiska", category: "METRO" },
      { id: 13, name: "Chocolate", slug: "chocolate", category: "MENU" },
      { id: 14, name: "$", slug: "budget-1", category: "BUDGET" }
    ],
    images: [
      { id: 7, imageUrl: Photo6, altText: "Mocha Magic" }
    ]
  },
  {
    id: 15,
    name: "Espresso Express",
    excerpt: "Quick coffee to go",
    description:
      "Espresso Express is ideal for grabbing a quick coffee to go without sacrificing quality.",
    slug: "espresso-express",
    address: "Maiden Lane, 3, Kyiv",
    latitude: 50.4500,
    longitude: 30.5200,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 16, name: "Maidan Nezalezhnosti", slug: "maidan", category: "METRO" },
      { id: 15, name: "Takeaway", slug: "takeaway", category: "VIBE" },
      { id: 16, name: "$", slug: "budget-1", category: "BUDGET" }
    ],
    images: [
      { id: 8, imageUrl: Photo7, altText: "Espresso Express" }
    ]
  },
  {
    id: 16,
    name: "Green Leaf Café",
    excerpt: "Healthy salads and drinks",
    description:
      "Green Leaf Café offers healthy salads, fresh juices and vegan-friendly dishes in a bright atmosphere.",
    slug: "green-leaf-cafe",
    address: "St. Andrew’s Street, 15, Kyiv",
    latitude: 50.4440,
    longitude: 30.5155,
    hours: "Mon-Sun from 08:00 AM to 10:00 PM",
    tags: [
      { id: 17, name: "Kontraktova Ploshcha", slug: "kontraktova-ploshcha", category: "METRO" },
      { id: 18, name: "Healthy", slug: "healthy", category: "MENU" },
      { id: 19, name: "Vegan", slug: "vegan", category: "MENU" }
    ],
    images: [
      { id: 9, imageUrl: Photo8, altText: "Green Leaf Café" }
    ]
  },
  // 9–16 аналогично: разные имена, адреса, description, METRO и остальные теги
];
export const cafes = mockCafes;
// ===============================
// Функция для получения данных
// ===============================
export const fetchCafes = async (): Promise<CafeResponseDto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCafes), 300);
  });
};