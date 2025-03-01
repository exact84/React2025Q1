/* eslint-disable react-refresh/only-export-components */
import { useRouter } from 'next/router';
import { Character } from 'types/characterTypes';
import styles from '../ResultPage.module.css';
import { getServerSideProps } from '../characterData';

// export async function getStaticPaths() {
//   const pages = Array.from({ length: 9 }, (_, i) =>
//     fetch(`https://swapi.dev/api/people/?page=${i + 1}`).then((res) =>
//       res.json()
//     )
//   );

//   const results = await Promise.all(pages);
//   const characters = results.flatMap((page) => page.results);

//   const paths = characters.map((character) => ({
//     params: { id: extractIdFromUrl(character.url) },
//   }));

//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const res = await fetch(`https://swapi.dev/api/people/${params.id}`);
//   const character = await res.json();

//   return { props: { character } };
// }

const Page = ({ character }: { character: Character }) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(location.search);

  const searchQuery = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  // console.log('isFallback:', router.isFallback);

  // if (router.isFallback || !character) {
  //   return <Loader />; // не работает
  // }

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
