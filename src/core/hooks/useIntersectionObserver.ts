import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  freeze?: boolean; // New: prevents callback but keeps observer alive
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  freeze = false,
  rootMargin = '400px', // Increased default for smoother loading
  threshold = 0.01, // Lower threshold for faster trigger
}: UseIntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const onIntersectRef = useRef(onIntersect);
  const isIntersectingRef = useRef(false);

  // Keep onIntersect current without re-triggering effect
  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled) {
      isIntersectingRef.current = false;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !freeze) {
            onIntersectRef.current();
          }
        });
      },
      { rootMargin, threshold },
    );

    const el = targetRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [enabled, rootMargin, threshold, freeze]); // Added freeze to deps to re-check when un-freezing

  return targetRef;
}
