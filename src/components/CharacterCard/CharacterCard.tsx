import { Character } from 'types/characterTypes';
import styles from '../ResultPage/ResultPage.module.css';
import { ChangeEvent } from 'react';

interface Props {
  character: Character;
  handleChooseItem: (
    e: React.MouseEvent<HTMLElement> | ChangeEvent<HTMLInputElement>,
    character: Character
  ) => void;
  isChecked: boolean;
}

const CharacterCard = ({ character, handleChooseItem, isChecked }: Props) => {
  return (
    <li
      key={character.url}
      className={styles.character}
      onClick={(e) => handleChooseItem(e, character)}
    >
      <input
        type="checkbox"
        className="default"
        checked={isChecked}
        readOnly
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
