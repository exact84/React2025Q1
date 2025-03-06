import React, { ChangeEvent } from 'react';
import { Character } from 'types/characterTypes';
import styles from '../ResultPage/ResultPage.module.css';

interface Props {
  character: Character;
  handleChooseItem: (character: Character) => void;
  isChecked: boolean;
  select: (e: ChangeEvent<HTMLInputElement>, character: Character) => void;
}

const CharacterCard = ({
  character,
  handleChooseItem,
  isChecked,
  select,
}: Props) => {
  return (
    <li
      key={character.url}
      className={styles.character}
      onClick={() => handleChooseItem(character)}
    >
      <input
        type="checkbox"
        className="default"
        checked={isChecked}
        onChange={(e) => select(e, character)}
      ></input>
      <h3 className={styles.character_name}>{character.name}</h3>
      <br />
      <span className={styles.character_property}>
        <strong>Height:</strong> {character.height},
      </span>
      <span className={styles.character_property}>
        <strong>Hair Color:</strong> {character.hair_color}
      </span>
      <span className={styles.character_property}>
        <strong>Gender:</strong> {character.gender}
      </span>
    </li>
  );
};

export default CharacterCard;
