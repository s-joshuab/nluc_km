import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/**
 * True while an Inertia visit is in flight (with a small delay so
 * fast visits don't flash). Layouts use this to show skeleton
 * overlays — only the content area changes, never the whole page.
 */
export function useNavigationLoading(delay = 180) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer = null;
    const offStart = router.on('start', () => {
      timer = setTimeout(() => setLoading(true), delay);
    });
    const offFinish = router.on('finish', () => {
      if (timer) clearTimeout(timer);
      setLoading(false);
    });
    return () => {
      offStart();
      offFinish();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  return loading;
}
