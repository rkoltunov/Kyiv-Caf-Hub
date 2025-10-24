import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTopButton } from '../../components/ui/ScrollToTopButton';

export const MainLayout: FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <ScrollToTopButton />
  </div>
);