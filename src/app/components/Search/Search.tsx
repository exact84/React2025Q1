'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Search.module.css';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    setQuery(searchQuery);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    params.delete('details');
    router.push(`${pathname}?${params.toString()}`);
  };

  function checkData(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={checkData}
          placeholder="Enter request..."
        ></input>
        <button type="submit">Search</button>
      </form>
    </section>
  );
}

export default Search;
