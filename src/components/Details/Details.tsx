import { Character } from 'src/types/characterTypes';
import styles from '../Result-page/Result-page.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const currentPage = searchParams.get('page') || '1';

  const navigate = useNavigate();
  const idItem = useSelector((state: RootState) => state.details.idItem);

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
    navigate(`/?query=${searchQuery}&page=${currentPage}`);
  };

  console.log('рендер Details.');
  return (
    <div className={styles.details}>
      <h2>Current ID: {idItem}</h2>
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
