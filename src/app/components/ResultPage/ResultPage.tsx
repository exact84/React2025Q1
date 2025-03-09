'use client';

import { Character } from 'types/characterTypes';
import styles from './ResultPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import Characters from '@/app/components/Characters/Characters';
import Controls from '@/app/components/Controls/Controls';
import CharacterDetails from '@/app/components/CharacterDetails/CharacterDetails';
import { RootState } from 'store/indexStore';
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacter } from '@/store/slices/checkedItemsSlice';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface CharacterListProps {
  characters: Character[];
  totalPages: number;
}

export default function ResultPage(props: CharacterListProps) {
  const selectedCharacter = useSelector(
    ({ items }: RootState) => items.selectedCharacter
  );

  const [detailsId, setDetailsId] = useState<null | string>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams) setDetailsId(searchParams.get('details'));
  }, []);

  useEffect(() => {
    if (detailsId) {
      dispatch(selectCharacter(props.characters[Number(detailsId)]));
    }
  }, [detailsId, dispatch, props.characters]);

  const context = useContext(ThemeContext);
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    dispatch(selectCharacter(null));

    const newParams = new URLSearchParams();
    newParams.set('page', searchParams.get('page') || '');
    newParams.set('search', searchParams.get('search') || '');
    newParams.delete('details');
    router.push(`${pathname}?${newParams.toString()}`);
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
