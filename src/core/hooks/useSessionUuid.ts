import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fp:sessionUuid';

/**
 * Returns a stable per-browser-session UUID (kept in sessionStorage so it
 * survives soft navigations but resets when the tab is closed). Empty string
 * during SSR / before mount — callers should gate API calls on a non-empty value.
 */
export function useSessionUuid(): string {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    let stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      stored = crypto.randomUUID();
      window.sessionStorage.setItem(STORAGE_KEY, stored);
    }
    setUuid(stored);
  }, []);

  return uuid;
}
