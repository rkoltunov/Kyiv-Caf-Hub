import Main from '../assets/home/cafepage/main.png';
import Small1 from '../assets/home/cafepage/Small1.png'; 
import Small2 from '../assets/home/cafepage/Small2.png';
import Right from '../assets/home/cafepage/Right.png';

export type Cafe = {
  id: string;
  title: string;
  address: string;
  metro: string;
  timeOnFoot: string;
  workingHours: {
    weekdays: string;
    weekend: string;
  };
  description: string;
  tags: {
    metroStation: string;
    serving: string[];
    services: string[];
    budget: string;
  };
  photos: string[];
  location: string; // адрес для карты
};

export const cafes: Cafe[] = [
  {
    id: "1",
    title: "Sereda Vegan Point",
    address: "Nyzhnii Val Street, 39, Kyiv",
    metro: "Kontraktova Ploshcha",
    timeOnFoot: "3 minutes on foot",
    workingHours: {
      weekdays: "Mon–Fri from 10:00 AM to 8:00 PM",
      weekend: "Sat–Sun from 11:00 AM to 9:00 PM",
    },
    description:
      "Sereda Vegan Point is a cozy vegan café in Podil, where healthy eating is combined with a love of flavour. Here you will find freshly roasted coffee, vegan desserts and even sweets for diabetics, as well as a warm atmosphere that makes every visit special.",
    tags: {
      metroStation: "Maidan Nezalezhnosti",
      serving: ["Sugar-free desserts", "Vegan desserts", "Alternative milk available"],
      services: ["Cosy for meetings"],
      budget: "$$$",
    },
    photos: [
      Main,
      Small1,
      Small2,
      Right,
    ],
    location: "Nyzhnii Val Street, 39, Kyiv",
  },
];