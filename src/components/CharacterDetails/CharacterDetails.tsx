'use client';

import Loader from '@components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/indexStore';
import { useGetCharacterQuery } from 'store/slices/apiSlice';
import { extractIdFromUrl } from 'utils/extractIdFromUrl';
import styles from '../../components/ResultPage/ResultPage.module.css';
import { skipToken } from '@reduxjs/toolkit/query';
import { selectCharacter } from 'store/slices/checkedItemsSlice';

const CharacterDetails = () => {
  const dispatch = useDispatch();
  const selectedCharacter = useSelector(
    (state: RootState) => state.items.selectedCharacter
  );

  const characterId = selectedCharacter
    ? extractIdFromUrl(selectedCharacter.url)
    : null;

  const { data, isLoading, isFetching } = useGetCharacterQuery(
    characterId ?? skipToken
  );

  if (!characterId) return null;

  const handleCloseClick = () => {
    const url = new URL(window.location.href);
    dispatch(selectCharacter(null));
    url.pathname = '/';
    window.history.pushState({}, '', url);
  };

  return (
    <div className={styles.details}>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        data && (
          <>
            <ul className={styles.character}>
              {Object.entries(data ?? {})
                .filter(([, value]) => typeof value !== 'object')
                .map(([key, value]) => (
                  <li key={key} className={styles['character-info']}>
                    <strong>{key}:</strong> {String(value)}
                  </li>
                ))}
            </ul>
            <button onClick={handleCloseClick} className="close">
              ⇦ Close
            </button>
          </>
        )
      )}
    </div>
  );
};

export default CharacterDetails;
