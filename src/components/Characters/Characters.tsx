'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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
import { extractIdFromUrl } from 'utils/extractIdFromUrl';
// import { useRouter } from 'next/router';

const Characters = ({ characters }: { characters: Character[] }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();
  const items = useSelector(({ items }: RootState) => items.items);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // const currentId = router.query.id;

  useEffect(() => {
    if (characters.length > 0) {
      setIsLoading(false);
    }
  }, [characters]);

  const isCharacterChecked = (character: Character) =>
    items.map(({ name }) => name).includes(character.name);

  const handleChooseItem = (
    e: React.MouseEvent<HTMLElement> | ChangeEvent<HTMLInputElement>,
    character: Character
  ) => {
    const characterId = extractIdFromUrl(character.url);
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT') {
      e.stopPropagation();
      const checkbox = target as HTMLInputElement;
      if (checkbox.checked) dispatch(addItem(character));
      else dispatch(delItem(character));
    } else {
      const url = new URL(window.location.href);
      const currentId = extractIdFromUrl(url.toString());
      if (currentId !== characterId) {
        console.log('currentId', currentId, 'characterId', characterId);
        dispatch(selectCharacter(character));
        // const newURL = new URL(window.location.href);
        url.pathname = `/details/${characterId}`;
        // const characterId = extractIdFromUrl(character.url);
        window.history.pushState({}, '', url.toString());
        // чтобы отображался адрес
        // router.push(`/details/${characterId}`);
        // router.replace(`/details/${characterId}`, undefined, { shallow: true });
      } else {
        dispatch(selectCharacter(null));
        console.log('меняем адрес обратно');
        url.pathname = '/';
        window.history.pushState({}, '', url);
      }
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
      {/* {isLoading ? (
        <div className={styles.loader}>Loading...</div>
      ) : ( */}
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
      {/* )} */}
    </div>
  );
};

export default Characters;
