import { GetServerSideProps } from 'next';
import { getCharacterData } from '../utils/characterData';
import { Character } from 'types/characterTypes';
import { ErrorBoundary, Search } from '@components/index';
import ResultPage from '@components/ResultPage/ResultPage';

import getPageCount from 'utils/pages';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { props } = await getCharacterData(context);

  return { props };
};

export default function Home({
  characters,
  count,
}: {
  characters: Character[];
  count: number;
}) {
  return (
    <div className="list">
      <Search />
      <ErrorBoundary>
        <ResultPage
          characters={characters || []}
          totalPages={getPageCount(count, 10)}
        />
      </ErrorBoundary>
    </div>
  );
}
