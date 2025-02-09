import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import ResultPage from './components/Result-page/Result-page';
import { Character } from './types/characterTypes';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Details from './components/Details/Details';
import { useRestoreSearch } from './hooks/useRestoreSearch';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorAPI, setErrorAPI] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [queryString, setQueryString] = useRestoreSearch();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setQueryString(query);
    setCurrentPage(page);
  }, [query, page, setQueryString, setCurrentPage]);

  const baseUrl = 'https://swapi.dev/api/people/?';

  const handleSearch = (query: string) => {
    navigate(`/?query=${encodeURIComponent(query)}&page=1`);
  };

  function handleError(error: Error) {
    console.error('Error caught in App:', error);
  }

  const handleRequestAPI = useCallback(
    async (page: number, query: string) => {
      setIsLoading(true);
      let url = baseUrl;
      if (queryString.trim()) {
        url += 'search=' + encodeURIComponent(query) + '&';
      }
      url += 'page=' + page;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        if (error instanceof Error) {
          console.error('API Error: ', error.message);
          setErrorAPI(error.message);
        } else {
          console.error('An unknown error occurred: ', error);
          setErrorAPI('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [queryString]
  );

  useEffect(() => {
    handleRequestAPI(page, query);
  }, [page, query, handleRequestAPI]);

  console.log('рендер App');
  return (
    <ErrorBoundary onError={handleError}>
      <h1>Task2 &quot;React Routing. Tests.&quot;</h1>
      <Search onSearch={handleSearch} searchQuery={query} />
      <Routes>
        <Route
          path="/"
          element={
            <ResultPage
              characters={characters}
              errorAPI={errorAPI}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
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
