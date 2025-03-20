import { useEffect, useState } from 'react';
import styles from './CountryList.module.css';
import { Country } from 'src/types/Country';

const VISITED_COUNTRIES_KEY = 'visitedCountries';

export default function CountryList({ countries }: { countries: Country[] }) {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    const savedVisited = localStorage.getItem(VISITED_COUNTRIES_KEY);
    if (savedVisited) {
      setVisitedCountries(JSON.parse(savedVisited));
    }
  }, []);

  const toggleVisited = (countryName: string) => {
    setVisitedCountries((prev) => {
      const updatedVisited = prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName];

      localStorage.setItem(
        VISITED_COUNTRIES_KEY,
        JSON.stringify(updatedVisited)
      );
      return updatedVisited;
    });
  };
  console.log('Render CountryList');
  return (
    <div className={styles.container}>
      <h1>Country List</h1>
      {/* <div className={styles.links}>
        <Link to="/redux-store" className={styles.link}>
          Using Redux
        </Link>
        <Link to="/state-store" className={styles.link}>
          Using State
        </Link>
      </div> */}
      <div className={styles.countrys}>
        {countries.map((country) => (
          <div
            key={country.ccn3}
            className={`${styles.countryCard} ${visitedCountries.includes(country.name.common) ? styles.visited : ''}`}
            onClick={() => toggleVisited(country.name.common)}
          >
            <h3>{country.name.common}</h3>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p style={{ fontSize: '12px' }}>Flag: {country.flags.png}</p>
            <img
              src={country.flags.png}
              alt="Flag"
              className={styles.countryImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
