import { useState, useEffect } from 'react';

export function useRestoreSearch(key: string = 'queryString') {
  const [query, setQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem(key, query);
  }, [query, key]);

  return [query, setQuery] as const;
}
