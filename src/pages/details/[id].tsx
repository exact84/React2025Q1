/* eslint-disable react-refresh/only-export-components */
import { useRouter } from 'next/router';
import { Character } from 'types/characterTypes';
import styles from '../ResultPage.module.css';
import { getServerSideProps } from '../characterData';

const Page = ({ character }: { character: Character }) => {
  const router = useRouter();
  const searchQuery =
    typeof router.query.query === 'string' ? router.query.query : '';
  const currentPage = Number(router.query.page) || 1;

  if (!character) {
    return <p>Person not found</p>;
  }

  const handleCloseClick = () => {
    router.replace(`/?query=${searchQuery}&page=${currentPage}`);
  };

  return (
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
  );
};

export { getServerSideProps };
export default Page;
