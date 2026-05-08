import { useEffect, useState } from 'react';

/**
 * Returns `value` delayed by `delay` ms; the timer resets each time `value` changes.
 * Useful for batching rapid filter/input changes before firing expensive work
 * (network requests, heavy computations, etc.).
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handle);
  }, [value, delay]);

  return debounced;
}
