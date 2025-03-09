'use client';

import Loader from '@components/Loader/Loader';
import styles from '../../components/ResultPage/ResultPage.module.css';
import { Character } from 'types/characterTypes';

interface CharacterDetailsProps {
  character: Character | null;
  isLoading: boolean;
  error: string | null;
  handleCloseClick: () => void;
}

const CharacterDetails = ({
  character,
  isLoading,
  error,
  handleCloseClick,
}: CharacterDetailsProps) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!character) {
    return;
  }

  return (
    <div className={styles.details}>
      <ul className={styles.character}>
        {Object.entries(character ?? {})
          .filter(([, value]) => typeof value !== 'object')
          .map(([key, value]) => (
            <li key={key} className={styles['character-info']}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
      </ul>
      <button onClick={handleCloseClick} className="close">
        ⇦ Close
      </button>
    </div>
  );
};

export default CharacterDetails;
