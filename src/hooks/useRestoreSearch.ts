import { useState, useEffect } from 'react';

export function useRestoreSearch(key: string = 'queryString') {
  const [query, setQuery] = useState(() => localStorage.getItem(key) || '');

  useEffect(() => {
    localStorage.setItem(key, query);
  }, [query, key]);

  return [query, setQuery] as const;
}
