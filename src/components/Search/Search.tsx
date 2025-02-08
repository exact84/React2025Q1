import { useState } from 'react';
import styles from './Search.module.css';

interface Props {
  onSearch: (queryString: string) => void;
}

function Search(props: Props) {
  const [queryString, setQueryString] = useState(
    localStorage.getItem('queryString') || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSearch(queryString);
  };

  function checkData(event: React.ChangeEvent<HTMLInputElement>) {
    setQueryString(event.target.value);
  }

  console.log('рендер Search');
  return (
    <>
      <section className={styles.top}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={queryString}
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
