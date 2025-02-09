import { Character } from '../../types/characterTypes';
import styles from './Result-page.module.css';
import Loader from '../Loader/Loader';
// import Details from '../Details/Details';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

interface CharacterListProps {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  errorAPI: string;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  searchQuery: string;
}

export default function ResultPage(props: CharacterListProps) {
  const [isError, setIsError] = useState(false);
  // const [choosenCharacter, setChoosenCharacter] = useState<Character | null>(
  //   null
  // );
  const navigate = useNavigate();
  const currentId = useParams().id;

  // navigate("/"); // Перенаправляем на главную
  // const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const characterId = searchParams.get('id');
  //   if (characterId) {
  //     const foundCharacter = props.characters.find(
  //       (char) => extractIdFromUrl(char.url) === characterId
  //     );
  //     // if (foundCharacter) setChoosenCharacter(foundCharacter);
  //   }
  // }, [searchParams, props.characters]);

  useEffect(() => {
    if (isError) throw new Error('This is a test error! ');
  }, [isError]);

  const handleClickError = () => {
    console.log('обработчик кнопки ошибки');
    setIsError(true);
  };

  const { characters, errorAPI, isLoading, currentPage, searchQuery } = props;

  const handleChooseItem = (character: Character) => {
    const id = extractIdFromUrl(character.url);
    // const currentId = searchParams.get('id');

    if (currentId === id) {
      navigate(`/?query=${searchQuery}&page=${currentPage}`);
    } else {
      navigate(`/details/${id}?query=${searchQuery}&page=${currentPage}`);
    }

    // if (currentId === id) {
    //   setSearchParams({
    //     query: searchQuery,
    //     page: String(currentPage),
    //   });
    // } else {
    //   setSearchParams({
    //     id,
    //     query: searchQuery,
    //     page: String(currentPage),
    //   });
    // }
    console.log('Chosen one:', character);
    // console.log(...searchParams);
  };

  // const handlerClose = () => {
  //   setChoosenCharacter({});
  // };

  const extractIdFromUrl = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  console.log('рендер ResultPage.', props.errorAPI);
  return (
    <section className={styles.results}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.list}>
            {characters.length > 0 ? (
              <>
                <ul className={styles.character}>
                  {characters.map((character) => (
                    <li
                      key={character.url}
                      className={styles.character}
                      onClick={() => handleChooseItem(character)}
                    >
                      {/* <Link
                        to={`/details/${extractIdFromUrl(character.url)}`}
                        className={styles.character_link}
                      > */}
                      <h3 className={styles.character_name}>
                        {character.name}
                      </h3>
                      <span className={styles.character_property}>
                        <strong>Height:</strong> {character.height},
                      </span>
                      <span className={styles.character_property}>
                        <strong>Hair Color:</strong> {character.hair_color}
                      </span>
                      <span className={styles.character_property}>
                        <strong>Gender:</strong> {character.gender}
                      </span>
                      {/* </Link> */}
                    </li>
                  ))}
                </ul>
                <div>
                  <button
                    onClick={() => props.onPageChange(props.currentPage - 1)}
                    disabled={props.currentPage === 1}
                  >
                    ◀
                  </button>
                  {Array.from({ length: props.totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => {
                        props.onPageChange(index + 1);
                        // e.target.classlist.add('choosen');
                      }}
                      disabled={props.currentPage === index + 1}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => props.onPageChange(props.currentPage + 1)}
                    disabled={props.currentPage === props.totalPages}
                  >
                    ►
                  </button>
                </div>
              </>
            ) : (
              <p>No characters found. {errorAPI}</p>
            )}
            <button className={styles.button} onClick={handleClickError}>
              Error Button
            </button>
          </div>
          {currentId ? (
            <div className={styles.details_container}>
              <Outlet />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </section>
  );
}
