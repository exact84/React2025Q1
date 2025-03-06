/* eslint-disable react-refresh/only-export-components */
import { useRouter } from 'next/router';
import { Character } from 'types/characterTypes';
import styles from '../../components/ResultPage/ResultPage.module.css';
import { getCharacterData } from '../characterData';
import { GetServerSideProps } from 'next';
import Home from 'pages/Home';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { props } = await getCharacterData(context);
  return { props };
};

export default function Page({
  character,
  characters,
  count,
}: {
  character: Character;
  characters: Character[];
  count: number;
}) {
  const router = useRouter();
  const searchQuery =
    typeof router.query.query === 'string' ? router.query.query : '';
  const currentPage = Number(router.query.page) || 1;

  if (!character) {
    return <p>Person not found</p>;
  }

  const handleCloseClick = () => {
    router.replace(`/?query=${searchQuery}&page=${currentPage}`, undefined, {
      shallow: true,
    });
  };

  console.log('отображаем в detais:', character);
  return (
    <Home characters={characters} count={count}>
      <div className={styles.details}>
        <ul className={styles.character}>
          {Object.entries(character)
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
      </div>
    </Home>
  );
}
