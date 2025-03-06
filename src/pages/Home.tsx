import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header, Search, ErrorBoundary } from '../components';
import { useRestoreSearch } from '../hooks/useRestoreSearch';
import getPageCount from '../utils/pages';
import ResultPage from '../components/ResultPage/ResultPage';
import { Character } from 'types/characterTypes';

export default function Home({
  characters = [],
  count,
  // character,
  children,
}: {
  characters: Character[];
  count: number;
  // character?: Character;
  children?: ReactNode;
}) {
  const router = useRouter();
  const { query = '', page = '1' } = router.query;
  const queryParam = Array.isArray(query) ? query[0] : query;

  const [queryString, setQueryString] = useRestoreSearch();

  useEffect(() => {
    if (typeof query === 'string') setQueryString(query);
  }, [query, setQueryString]);

  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setSearchLoading(false);
  }, [characters]);

  const handleSearch = (query: string) => {
    router.replace(`/?query=${encodeURIComponent(query)}&page=1`, undefined, {
      shallow: false,
    });
  };

  function handleError(error: Error) {
    console.error('Error caught in Home:', error);
  }

  return (
    <ErrorBoundary
      onError={handleError}
      onSearch={handleSearch}
      searchQuery={query as string}
    >
      <div className="list">
        <Header />
        <Search onSearch={handleSearch} searchQuery={query as string} />
        <ResultPage
          characters={characters || []}
          isLoading={searchLoading}
          currentPage={Number(page)}
          totalPages={getPageCount(count, 10)}
          onPageChange={(newPage) => {
            router.push(
              `/?query=${encodeURIComponent(queryParam)}&page=${newPage}`
            );
          }}
          searchQuery={queryString}
        />
      </div>
      {children}
    </ErrorBoundary>
  );
}
