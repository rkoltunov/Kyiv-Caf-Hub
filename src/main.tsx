import { ScrollToTop } from './components/ui/ScrollToTop';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import './index.css';               // Tailwind
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/hurricane";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScrollToTop>
      <RouterProvider router={router} />
    </ScrollToTop>
  </React.StrictMode>,
);