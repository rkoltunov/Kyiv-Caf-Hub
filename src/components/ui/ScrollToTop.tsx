import { useEffect } from 'react';
import { router } from '../../routes/router';

export const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const unsubscribe = router.subscribe(() => {
      window.scrollTo(0, 0);
    });
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};