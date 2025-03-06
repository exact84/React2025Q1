// components/ResultPage/ResultPage.js
'use client';

import { Character } from 'types/characterTypes';
import styles from './ResultPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Characters from '@components/Characters/Characters';
import Controls from '@components/Controls/Controls';
import ReduxProvider from '@components/ReduxProvider/ReduxProvider';
import CharacterDetails from '@components/CharacterDetails/CharacterDetails';

interface CharacterListProps {
  characters: Character[];
  totalPages: number;
}

export default function ResultPage(props: CharacterListProps) {
  const context = useContext(ThemeContext);
  const [isError, setIsError] = useState(false);

  const handleClickError = () => {
    setIsError(true);
  };

  const { characters } = props;

  useEffect(() => {
    if (isError) throw new Error('This is a test error! ');
  }, [isError]);

  if (!characters) {
    return <div>Error 404.</div>;
  }

  return (
    <ReduxProvider>
      <section className={styles.results}>
        <div className={styles.list}>
          {characters.length > 0 ? (
            <>
              <Characters characters={characters} />
              <hr></hr>
              <Controls totalPages={props.totalPages} />
            </>
          ) : (
            <p>No characters found.</p>
          )}
          <div className={styles.results}>
            <button className={styles.button} onClick={context.toggleTheme}>
              Change Theme
            </button>
            <button className={styles.button} onClick={handleClickError}>
              Error Button
            </button>
          </div>
        </div>
        <CharacterDetails />
      </section>
    </ReduxProvider>
  );
}
