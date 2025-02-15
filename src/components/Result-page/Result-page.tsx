import { Character } from '../../types/characterTypes';
import styles from './Result-page.module.css';
import Loader from '../Loader/Loader';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
// import { store, ShowDetails, HideDetails } from '../../store';
// import { setId } from '../../store/slices/detailsSlice';
// import { useDispatch } from 'react-redux';
import { useTheme } from '../../context';

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
  const { toggleTheme } = useTheme();
  const [isError, setIsError] = useState(false);

  // const dispatch = useDispatch();

  const navigate = useNavigate();
  const currentId = useParams().id;

  useEffect(() => {
    if (isError) throw new Error('This is a test error! ');
  }, [isError]);

  const handleClickError = () => {
    setIsError(true);
  };

  const { characters, errorAPI, isLoading, currentPage, searchQuery } = props;

  // const [, forceUpdate] = useReducer((x) => {
  //   x + 1, 0;
  // });

  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     forceUpdate();
  //   });
  //   return unsubscribe;
  // }, []);

  const handleChooseItem = (character: Character) => {
    const id = extractIdFromUrl(character.url);
    // if (id) dispatch(setId(Number(id)));
    // else dispatch(setId(-1));

    if (currentId === id) {
      navigate(`/?query=${searchQuery}&page=${currentPage}`);
    } else {
      navigate(`/details/${id}?query=${searchQuery}&page=${currentPage}`);
    }
  };

  const extractIdFromUrl = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  if (!characters) {
    return <div>Error 404.</div>;
  }

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
                      }}
                      className={
                        props.currentPage === index + 1 ? styles.active : ''
                      }
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
            <div className={styles.results}>
              <button className={styles.button} onClick={toggleTheme}>
                Change Theme
              </button>
              <button className={styles.button} onClick={handleClickError}>
                Error Button
              </button>
            </div>
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
