import { useEffect, useState, memo, useCallback } from 'react';
import styles from './CountryList.module.css';
import { Country } from '../../types/Country';
import CountryCard from '../CountryCard/CountryCard';

const VISITED_COUNTRIES_KEY = 'visitedCountries';

function CountryList({ countries }: { countries: Country[] }) {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    const savedVisited = localStorage.getItem(VISITED_COUNTRIES_KEY);
    if (savedVisited) {
      setVisitedCountries(JSON.parse(savedVisited));
    }
  }, []);

  const toggleVisited = useCallback(function (countryName: string) {
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
  }, []);

  return (
    <div className={styles.container}>
      <h1>Country List</h1>
      <div className={styles.countrys}>
        {countries.map((country) => (
          <CountryCard
            key={country.ccn3 || country.name.common}
            country={country}
            toggleVisited={toggleVisited}
            isVisited={visitedCountries.includes(country.name.common)}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(CountryList);
