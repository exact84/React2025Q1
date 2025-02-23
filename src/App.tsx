import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import ResultPage from './components/Result-page/Result-page';
import Details from './components/Details/Details';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useRestoreSearch } from './hooks/useRestoreSearch';
import getPageCount from './utils/pages';
import { useCharacters } from './services/swapi';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [queryString, setQueryString] = useRestoreSearch();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setQueryString(query);
  }, [query, setQueryString]);

  const { data, error, isLoading } = useCharacters(query, page);

  const handleSearch = (query: string) => {
    navigate(`/?query=${encodeURIComponent(query)}&page=1`);
  };

  function handleError(error: Error) {
    console.error('Error caught in App:', error);
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
      searchQuery={query}
    >
      <Header />
      <Search onSearch={handleSearch} searchQuery={query} />
      <Routes>
        <Route
          path="/"
          element={
            <ResultPage
              characters={data?.results || []}
              errorAPI={error ? getErrorMessage(error) : ''}
              isLoading={isLoading}
              currentPage={page}
              totalPages={getPageCount(data?.count, 10)}
              onPageChange={(newPage) => {
                navigate(
                  `/?query=${encodeURIComponent(query)}&page=${newPage}`
                );
              }}
              searchQuery={queryString}
            />
          }
        >
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
