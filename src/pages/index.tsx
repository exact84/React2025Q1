import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Header, Search, ResultPage, ErrorBoundary } from '../components';
import { useRestoreSearch } from '../hooks/useRestoreSearch';
import getPageCount from '../utils/pages';
import { useCharacters } from '../services/swapi';

export default function Home() {
  const router = useRouter();
  const { query = '', page = '1' } = router.query;
  const queryParam = Array.isArray(query) ? query[0] : query;

  const [queryString, setQueryString] = useRestoreSearch();

  useEffect(() => {
    if (typeof query === 'string') setQueryString(query);
  }, [query, setQueryString]);

  const { data, error, isLoading } = useCharacters(
    typeof query === 'string' ? query : '',
    Number(page)
  );

  const handleSearch = (query: string) => {
    router.push(`/?query=${encodeURIComponent(query)}&page=1`);
  };

  function handleError(error: Error) {
    console.error('Error caught in Home:', error);
  }

  const getErrorMessage = (error: unknown) => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'status' in error)
      return `Error ${error.status}`;
    return 'An unknown error occurred';
  };

  return (
    <ErrorBoundary
      onError={handleError}
      onSearch={handleSearch}
      searchQuery={query as string}
    >
      <Header />
      <Search onSearch={handleSearch} searchQuery={query as string} />
      <ResultPage
        characters={data?.results || []}
        errorAPI={error ? getErrorMessage(error) : ''}
        isLoading={isLoading}
        currentPage={Number(page)}
        totalPages={getPageCount(data?.count, 10)}
        onPageChange={(newPage) => {
          router.push(
            `/?query=${encodeURIComponent(queryParam)}&page=${newPage}`
          );
        }}
        searchQuery={queryString}
      />
    </ErrorBoundary>
  );
}
