'use client';
import React, { ChangeEvent, useRef } from 'react';
import { useEffect, useState } from 'react';
import { Character } from 'types/characterTypes';
import styles from '../ResultPage/ResultPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  delAll,
  delItem,
  selectCharacter,
} from 'store/slices/checkedItemsSlice';
import { RootState } from 'store/indexStore';
import CharacterCard from '@components/CharacterCard/CharacterCard';
import Loader from '@components/Loader/Loader';
import { useRouter } from 'next/router';
import { extractIdFromUrl } from 'utils/extractIdFromUrl';

interface CharactersProps {
  characters: Character[];
}

const Characters = ({ characters }: CharactersProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();
  const items = useSelector(({ items }: RootState) => items.items);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const selectedCharacter = useSelector(
    ({ items }: RootState) => items.selectedCharacter
  );

  useEffect(() => {
    // работает только первый раз ((
    setIsLoading(characters.length === 0);
  }, [characters]);

  const isCharacterChecked = (character: Character) =>
    items.map(({ name }) => name).includes(character.name);

  const handleChooseItem = (
    e: React.MouseEvent<HTMLElement> | ChangeEvent<HTMLInputElement>,
    character: Character
  ) => {
    const target = e.target as HTMLElement;
    const targetCharacterId = extractIdFromUrl(character.url);
    if (target.tagName === 'INPUT') {
      e.stopPropagation();
      const checkbox = target as HTMLInputElement;
      if (checkbox.checked) dispatch(addItem(character));
      else dispatch(delItem(character));
    } else {
      const selectedCharacterId = extractIdFromUrl(selectedCharacter?.url);
      const isSameCharacter = selectedCharacterId === targetCharacterId;
      dispatch(selectCharacter(isSameCharacter ? null : character));
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          details: isSameCharacter ? null : targetCharacterId,
        },
      });
    }
  };

  const handleDeleteAll = () => {
    dispatch(delAll());
  };

  const handleDownload = () => {
    const headersCharacter: Array<keyof Character> = Object.keys(
      items[0]
    ) as Array<keyof Character>;
    const records = items.map((item) =>
      headersCharacter.map((header) => item[header]).join(',')
    );
    const CSVdata = headersCharacter.join(',') + '\n' + records.join('\n');
    const CSV_BLOB_TYPE = 'text/csv;charset=utf-8;';
    const blob = new Blob([CSVdata], { type: CSV_BLOB_TYPE });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${items.length}_characters.csv`;
      linkRef.current.click();
    }
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.characters}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.characters}>
          <ul className={styles.character}>
            {characters.map((character) => (
              <CharacterCard
                key={character.url}
                character={character}
                isChecked={isCharacterChecked(character)}
                handleChooseItem={(e) => handleChooseItem(e, character)}
              />
            ))}
          </ul>
          <div
            className={`${styles['flyout-element']} ${
              items.length > 0 ? styles.active : styles.hidden
            }`}
          >
            <button onClick={handleDeleteAll}>Unselect all</button>
            <h3>
              <i>{items.length} items are selected</i>
            </h3>
            <button onClick={handleDownload}>Download</button>
            <a ref={linkRef} style={{ display: 'none' }}></a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
