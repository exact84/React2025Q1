import { Character } from 'src/types/characterTypes';
import styles from '../ResultPage/ResultPage.module.css';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/router';

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const searchQuery = router.query.query || '';
  const currentPage = router.query.page || '1';

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        if (!response.ok) {
          throw new Error('404. Person not found.');
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!character) {
    return <p>Person not found</p>;
  }
  const handleCloseClick = () => {
    router.push(`/?query=${searchQuery}&page=${currentPage}`);
  };

  return (
    <div className={styles.details}>
      <ul className={styles.character}>
        {Object.entries(character)
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
}
