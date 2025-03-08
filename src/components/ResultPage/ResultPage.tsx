'use client';

import { Character } from 'types/characterTypes';
import styles from './ResultPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Characters from '@components/Characters/Characters';
import Controls from '@components/Controls/Controls';
import CharacterDetails from '@components/CharacterDetails/CharacterDetails';
import { RootState } from 'store/indexStore';
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacter } from 'store/slices/checkedItemsSlice';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

interface CharacterListProps {
  characters: Character[];
  totalPages: number;
}

export default function ResultPage(props: CharacterListProps) {
  const selectedCharacter = useSelector(
    ({ items }: RootState) => items.selectedCharacter
  );

  const [detailsId, setDetailsId] = useState<null | string>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    setDetailsId(searchParams.get('details'));
  }, []);

  useEffect(() => {
    if (detailsId) {
      console.log(detailsId);
      dispatch(selectCharacter(props.characters[Number(detailsId)]));
    }
  }, [detailsId, dispatch, props.characters]);

  const context = useContext(ThemeContext);
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    dispatch(selectCharacter(null));
    const { page, search } = router.query;
    const details = '';
    router.push({
      pathname: router.pathname,
      query: { page, search, details },
    });
  };

  const handleClickError = () => {
    setIsError(true);
  };

  const { characters } = props;

  useEffect(() => {
    if (isError) throw new Error('This is a test error! ');
  }, [isError]);

  return (
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
      <CharacterDetails
        character={selectedCharacter}
        isLoading={false}
        error={null}
        handleCloseClick={handleClose}
      />
    </section>
  );
}
