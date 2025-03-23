import { memo } from 'react';
import styles from '../CountryList/CountryList.module.css';
import { Country } from '../../types/Country';

function CountryCard({
  country,
  toggleVisited,
  isVisited,
}: {
  country: Country;
  toggleVisited: (name: string) => void;
  isVisited: boolean;
}) {
  return (
    <div
      key={country.ccn3 || country.name.common}
      className={`${styles.countryCard} ${isVisited ? styles.visited : ''}`}
      onClick={() => toggleVisited(country.name.common)}
    >
      <h3>{country.name.common}</h3>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <img src={country.flags.png} alt="Flag" className={styles.countryImage} />
    </div>
  );
}

export default memo(CountryCard);
