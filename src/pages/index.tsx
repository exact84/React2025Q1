/* eslint-disable react-refresh/only-export-components */
import { GetServerSideProps } from 'next';
import { getCharacterData } from '../utils/characterData';
import { Character } from 'types/characterTypes';
import { ErrorBoundary, Search } from '@components/index';
import ResultPage from '@components/ResultPage/ResultPage';
import ReduxProvider from '@components/ReduxProvider/ReduxProvider';
import getPageCount from '@/utils/pages';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await getCharacterData(context);
  if ('notFound' in result) {
    return { notFound: true };
  }
  return { props: result.props };
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
        <ReduxProvider>
          <ResultPage
            characters={characters || []}
            totalPages={getPageCount(count, 10)}
          />
        </ReduxProvider>
      </ErrorBoundary>
    </div>
  );
}
