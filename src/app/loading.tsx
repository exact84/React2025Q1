import styles from './loading.module.css';
const loadingGif = '/assets/star-wars-disney.gif';

export default function Loader() {
  return (
    <div className={styles.loading_container} data-testid="loader">
      <img width="300px" src={loadingGif} alt="Loader"></img>
      <div>Loading, please wait...</div>
    </div>
  );
}
