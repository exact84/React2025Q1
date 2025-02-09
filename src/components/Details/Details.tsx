import { Character } from 'src/types/characterTypes';
import styles from '../Result-page/Result-page.module.css';
import { useParams, Link } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // const [searchParams] = useSearchParams();
  // const searchQuery = searchParams.get('query') || '';
  // const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        if (!response.ok) {
          throw new Error('Person not find');
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

  console.log('рендер Details.');
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
      {/* <button onClick={props.onClose}> ⇦ Close</button>{' '} */}
      <Link
        // to={`/?query=${searchQuery}&page=${currentPage}`}
        to="/"
        className={styles.button}
      >
        <button> ⇦ Close</button>
      </Link>{' '}
    </div>
  );
}
