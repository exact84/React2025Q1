'use client';
import React, { ChangeEvent, useRef } from 'react';
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

const Characters = ({ characters }: { characters: Character[] }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();
  const items = useSelector(({ items }: RootState) => items.items);

  const isCharacterChecked = (character: Character) =>
    items.map(({ name }) => name).includes(character.name);

  const handleCheckItem = (
    event: ChangeEvent<HTMLInputElement>,
    character: Character
  ) => {
    if (event.target.checked) dispatch(addItem(character));
    else dispatch(delItem(character));
  };
  const handleChooseItem = (character: Character) => {
    dispatch(selectCharacter(character));
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
      <ul className={styles.character}>
        {characters.map((character) => (
          <CharacterCard
            key={character.url}
            character={character}
            isChecked={isCharacterChecked(character)}
            handleChooseItem={handleChooseItem}
            select={handleCheckItem}
          />
        ))}
      </ul>
      <button onClick={handleDeleteAll}>Unselect all</button>
      <h3>
        <i>{items.length} items are selected</i>
      </h3>
      <button onClick={handleDownload}>Download</button>
      <a ref={linkRef} style={{ display: 'none' }}></a>
    </div>
  );
};

export default Characters;
