import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTopButton } from '../../components/ui/ScrollToTopButton';

export const MainLayout: FC = () => (
  <HelmetProvider>
  <div className="flex flex-col min-h-screen ">
    <Header />
    {/* Здесь будет «внутри» текущий роут, который совпадает с вложенными маршрутами */}
    <main className="flex-1 ">
      <Outlet />
    </main>
    <Footer />
    <ScrollToTopButton />
    </div>
    </HelmetProvider>
);