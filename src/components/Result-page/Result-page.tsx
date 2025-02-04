import { Component, ReactNode } from 'react';
import { Character } from '../../types/characterTypes';
import styles from './Result-page.module.css';
import loadingGif from '../../assets/star-wars-disney.gif';

interface CharacterListProps {
  characters: Character[];
  errorAPI: string;
  isLoading: boolean;
}

export default class ResultPage extends Component<CharacterListProps> {
  state = {
    isError: false,
    isLoading: false,
  };

  handleClickError = () => {
    console.log('обработчик кнопки ошибки');
    this.setState({ isError: true }, () => {
      throw new Error('This is a test error!');
    });
  };

  render(): ReactNode {
    const { characters, errorAPI, isLoading } = this.props;
    console.log('рендер ResultPage.');
    return (
      <section className={styles.results}>
        {isLoading ? (
          <div className={styles.loading_container}>
            <img width="300px" src={loadingGif} alt="Loader"></img>
            <div>Loading, please wait...</div>
          </div>
        ) : (
          <div>
            {characters.length > 0 ? (
              <ul className={styles.character}>
                {characters.map((character) => (
                  <li key={character.url} className={styles.character}>
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
              <p>No characters found. {errorAPI}</p>
            )}
            <button onClick={this.handleClickError}>Error Button</button>
          </div>
        )}
      </section>
    );
  }
}
