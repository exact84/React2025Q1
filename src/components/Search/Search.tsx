import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Search.module.css';
import { useRouter } from 'next/router';

function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.search) {
      setQuery(router.query.search as string);
    }
  }, [router.query.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { search: query },
    });
  };

  function checkData(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <>
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
    </>
  );
}

export default Search;
