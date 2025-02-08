import { Character } from '../../types/characterTypes';
import styles from './Result-page.module.css';
import Loader from '../Loader/Loader';
import { useEffect, useState } from 'react';

interface CharacterListProps {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  errorAPI: string;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function ResultPage(props: CharacterListProps) {
  const [isError, setIsError] = useState(false);
  const [choosenCharacter, setChoosenCharacter] = useState({});

  useEffect(() => {
    if (isError) throw new Error('This is a test error! ');
  }, [isError]);

  const handleClickError = () => {
    console.log('обработчик кнопки ошибки');
    setIsError(true);
  };

  const { characters, errorAPI, isLoading } = props;
  console.log('рендер ResultPage.', props.errorAPI);

  const handleChooseItem = (character: Character) => {
    if (choosenCharacter !== character) setChoosenCharacter(character);
    else setChoosenCharacter({});
    // console.log('Chosen one:', character);
  };

  const handlerClose = () => {
    setChoosenCharacter({});
  };

  return (
    <section className={styles.results}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.list}>
            {characters.length > 0 ? (
              <>
                <ul className={styles.character}>
                  {characters.map((character) => (
                    <li
                      key={character.url}
                      className={styles.character}
                      onClick={() => handleChooseItem(character)}
                    >
                      <h3 className={styles.character_name}>
                        {character.name}
                      </h3>
                      <span className={styles.character_property}>
                        <strong>Height:</strong> {character.height},
                      </span>
                      <span className={styles.character_property}>
                        <strong>Mass:</strong> {character.mass}
                      </span>
                      <span className={styles.character_property}>
                        <strong>Hair Color:</strong> {character.hair_color}
                      </span>
                      <span className={styles.character_property}>
                        <strong>Gender:</strong> {character.gender}
                      </span>
                    </li>
                  ))}
                </ul>
                <div>
                  {Array.from({ length: props.totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => props.onPageChange(index + 1)}
                      disabled={props.currentPage === index + 1}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p>No characters found. {errorAPI}</p>
            )}
            <button className={styles.button} onClick={handleClickError}>
              Error Button
            </button>
          </div>
          {JSON.stringify(choosenCharacter) !== '{}' ? (
            <div className={styles.details}>
              <ul className={styles.character}>
                {Object.entries(choosenCharacter)
                  .filter(([, value]) => typeof value !== 'object')
                  .map(([key, value]) => (
                    <li key={key} className={styles['character-info']}>
                      <strong>{key}:</strong> {String(value)}
                    </li>
                  ))}
              </ul>
              <button onClick={handlerClose}>Close</button>
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </section>
  );
}
