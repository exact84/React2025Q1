'use client';

import { Character } from 'types/characterTypes';
import styles from './ResultPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Characters from '@components/Characters/Characters';
import Controls from '@components/Controls/Controls';
import CharacterDetails from '@components/CharacterDetails/CharacterDetails';

interface CharacterListProps {
  characters: Character[];
  totalPages: number;
}

export default function ResultPage(props: CharacterListProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const context = useContext(ThemeContext);
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setSelectedCharacter(null);
    const url = new URL(window.location.href);
    url.pathname = '/';
    window.history.pushState({}, '', url);
  };

  const handleClickError = () => {
    setIsError(true);
  };

  const { characters } = props;

  useEffect(() => {
    if (isError) throw new Error('This is a test error! ');
  }, [isError]);

  // if (!characters) {
  //   return <div>Error 404.</div>;
  // }

  return (
    <section className={styles.results}>
      <div className={styles.list}>
        {characters.length > 0 ? (
          <>
            <Characters
              characters={characters}
              onSelectCharacter={setSelectedCharacter}
            />
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
      <CharacterDetails
        character={selectedCharacter}
        isLoading={false}
        error={null}
        handleCloseClick={handleClose}
      />
    </section>
  );
}
