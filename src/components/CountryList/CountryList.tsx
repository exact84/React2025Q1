import styles from './CountryList.module.css';
import { Country } from 'src/types/Country';

export default function CountryList({ countries }: { countries: Country[] }) {
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
      <div className={styles.users}>
        {countries.map((country) => (
          <div key={country.ccn3} className={`${styles.userCard}`}>
            <h3>{country.name.common}</h3>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Flag: {country.flags.png}</p>
            <img
              src={country.flags.png}
              alt="Flag"
              className={styles.userImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
