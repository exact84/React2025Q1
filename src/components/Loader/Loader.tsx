import styles from './Loader.module.css';
import loadingGif from '../../assets/star-wars-disney.gif';

export default function Loader() {
  return (
    <div className={styles.loading_container}>
      <img width="300px" src={loadingGif} alt="Loader"></img>
      <div>Loading, please wait...</div>
    </div>
  );
}
