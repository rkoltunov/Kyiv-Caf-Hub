import type { FC} from 'react';
import {useRef, useState } from 'react';
import { Helmet } from 'react-helmet'; // Для SEO

// Импорты компонентов
import { HeroSection } from '../../pages/home/HeroSection';
import { PopularCafesSection } from '../../pages/home//PopularCafesSection';
import { BlogSection } from '../../pages/home/BlogSection';
import { InstagramSection } from '../../pages/home/InstagramSection';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const HomePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } else {
      alert('Голосовой поиск не поддерживается вашим браузером');
    }
  };

  return (
    <>
      <Helmet>
        <title>Kyiv Café Hub – лучшие кафе Киева</title>
        <meta
          name="description"
          content="Откройте для себя лучшие кофейни Киева: фотографии, атмосфера, меню, карты. Найдите идеальное место для кофе‑брейка."
        />
      </Helmet>

      <section className="w-full">
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isListening={isListening}
          onVoiceToggle={handleVoiceSearch}
        />

        <PopularCafesSection />

        <BlogSection />

        <InstagramSection />
      </section>
    </>
  );
};

export default HomePage;

