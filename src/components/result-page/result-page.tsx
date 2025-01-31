import { Component, ReactNode } from 'react';
import { Character } from '../../types/characterTypes';
import styles from './result-page.module.css';

interface CharacterListProps {
  characters: Character[];
}

export default class ResultPage extends Component<CharacterListProps> {
  shouldComponentUpdate(nextProps: CharacterListProps) {
    return this.props.characters !== nextProps.characters;
  }
  render(): ReactNode {
    const { characters } = this.props;
    return (
      <div>
        {characters.length > 0 ? (
          <ul className={styles.character}>
            {characters.map((character, index) => (
              <li key={index} className={styles.character}>
                <h3 className={styles.character_name}>{character.name}</h3>
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
        ) : (
          <p>No characters found.</p>
        )}
      </div>
    );
  }
}
