import { Character } from '../../types/characterTypes';
import styles from './Result-page.module.css';
import Loader from '../Loader/Loader';
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
// import { store, ShowDetails, HideDetails } from '../../store';
// import { setId } from '../../store/slices/detailsSlice';
// import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/simpleStore';

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
  const context = useContext(ThemeContext);
  const [isError, setIsError] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const checkedItems = useSelector((state: RootState) => state.items);

  const [cartVisible, setCartVisible] = useState(false);
  useEffect(() => {
    setCartVisible(checkedItems.length > 0);
    console.log('изменился checkedItems');
  }, [checkedItems]);

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

  const handleCheckItem = (e: HTMLInputElement, id: string) => {
    // const target = e as HTMLElement;
    console.log('INPUT');
    if (e.checked) dispatch({ type: 'ADD_ITEM', payload: id });
    else dispatch({ type: 'DEL_ITEM', payload: id });
  };

  const handleChooseItem = (
    e: React.MouseEvent<HTMLElement>,
    character: Character
  ) => {
    const id = extractIdFromUrl(character.url);
    if ((e.target as HTMLElement).tagName === 'INPUT') {
      handleCheckItem(e as unknown as HTMLInputElement, id);
      // const target = e.target as HTMLInputElement;
      // console.log('INPUT');
      // if (target.checked) dispatch({ type: 'ADD_ITEM', payload: id });
      // else dispatch({ type: 'DEL_ITEM', payload: id });
    } else if (currentId === id) {
      navigate(`/?query=${searchQuery}&page=${currentPage}`);
    } else {
      navigate(`/details/${id}?query=${searchQuery}&page=${currentPage}`);
    }
  };

  const handleDeleteAll = () => {
    dispatch({ type: 'DEL_ALL' });
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
                      onClick={(e) => handleChooseItem(e, character)}
                    >
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(
                          extractIdFromUrl(character.url)
                        )}
                        onChange={(e) =>
                          handleCheckItem(
                            e.target,
                            extractIdFromUrl(character.url)
                          )
                        }
                      ></input>
                      <h3 className={styles.character_name}>
                        {character.name}
                      </h3>
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
                  ))}
                </ul>
                <div
                  className={`${styles['flyout-element']} ${
                    cartVisible ? styles.active : styles.hidden
                  }`}
                >
                  <button onClick={handleDeleteAll}>Unselect all</button>
                  <h3>
                    <i>{checkedItems.length} items are selected</i>
                  </h3>
                  <button>Download</button>
                </div>
                <hr></hr>
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
              <button className={styles.button} onClick={context.toggleTheme}>
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
