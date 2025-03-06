import { Character } from 'types/characterTypes';
import styles from './ResultPage.module.css';
import Loader from '../Loader/Loader';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/indexStore';
import { addItem, delItem, delAll } from '../../store/slices/checkedItemsSlice';
import { useRouter } from 'next/router';
import { extractIdFromUrl } from '../../utils/extractIdFromUrl';
// import { getCharacterData } from './characterData';

interface CharacterListProps {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  // errorAPI: string;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  searchQuery: string;
}

export default function ResultPage(props: CharacterListProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const context = useContext(ThemeContext);
  const [isError, setIsError] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const checkedItems = useSelector((state: RootState) => state.items.items);

  const [cartVisible, setCartVisible] = useState(false);
  useEffect(() => {
    setCartVisible(checkedItems.length > 0);
  }, [checkedItems]);

  const router = useRouter();
  const currentId = router.query.id;

  useEffect(() => {
    if (isError) throw new Error('This is a test error! ');
  }, [isError]);

  const handleClickError = () => {
    setIsError(true);
  };

  const {
    characters,
    // errorAPI,
    isLoading,
    currentPage,
    searchQuery,
    onPageChange,
  } = props;

  const handleCheckItem = (e: HTMLInputElement, item: Character) => {
    if (e.checked) dispatch(addItem(item));
    else dispatch(delItem(item));
  };

  const handleChooseItem = (
    e: React.MouseEvent<HTMLElement>,
    character: Character
  ) => {
    const id = extractIdFromUrl(character.url);
    // console.log('currentId: ', currentId, 'character.url id: ', id);
    if ((e.target as HTMLElement).tagName === 'INPUT') {
      handleCheckItem(e as unknown as HTMLInputElement, character);
    } else if (currentId === id) {
      router.push(`/?query=${searchQuery}&page=${currentPage}`);
      console.log('currentId: ', currentId, 'character.url id: ', id);
    } else {
      router.replace(
        `/details/${extractIdFromUrl(character.url)}?query=${searchQuery}&page=${currentPage}`
      );
    }
  };

  const handleDeleteAll = () => {
    dispatch(delAll());
  };

  const handleDownload = () => {
    const headersCharacter: Array<keyof Character> = Object.keys(
      checkedItems[0]
    ) as Array<keyof Character>;
    const records = checkedItems.map((item) =>
      headersCharacter.map((header) => item[header]).join(',')
    );
    const CSVdata = headersCharacter.join(',') + '\n' + records.join('\n');
    const CSV_BLOB_TYPE = 'text/csv;charset=utf-8;';
    const blob = new Blob([CSVdata], { type: CSV_BLOB_TYPE });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${checkedItems.length}_characters.csv`;
      linkRef.current.click();
    }
    URL.revokeObjectURL(url);
  };

  if (!characters) {
    return <div>Error 404.</div>;
  }

  return (
    <>
      <section className={styles.results}>
        {isLoading ? (
          <Loader />
        ) : (
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
                        className="default"
                        checked={checkedItems.some(
                          (item) => item.url === character.url
                        )}
                        onChange={(e) => handleCheckItem(e.target, character)}
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
                  <button onClick={handleDownload}>Download</button>
                  <a ref={linkRef} style={{ display: 'none' }}></a>
                </div>
                <hr></hr>
                <div>
                  <button
                    onClick={() => onPageChange(props.currentPage - 1)}
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
              <p>No characters found.</p>
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
        )}
      </section>
    </>
  );
}
