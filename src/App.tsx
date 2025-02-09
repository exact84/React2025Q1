import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import ResultPage from './components/Result-page/Result-page';
import { Character } from './types/characterTypes';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './components/Details/Details';
import { useRestoreSearch } from './hooks/useRestoreSearch';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorAPI, setErrorAPI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [queryString, setQueryString] = useRestoreSearch();

  const baseUrl = 'https://swapi.dev/api/people/?';

  const handleSearch = (query: string) => {
    setQueryString(query);
    setCurrentPage(1);
  };

  function handleError(error: Error) {
    console.error('Error caught in App:', error);
  }

  const handleRequestAPI = useCallback(
    async (page: number) => {
      setIsLoading(true);
      let url = baseUrl;
      if (queryString.trim()) {
        url += 'search=' + encodeURIComponent(queryString) + '&';
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
    handleRequestAPI(currentPage);
  }, [currentPage, handleRequestAPI]);

  const basename = import.meta.env.BASE_URL || '/';

  console.log('рендер App');
  return (
    <ErrorBoundary onError={handleError}>
      <h1>Task2 &quot;React Routing. Tests.&quot;</h1>
      <Router basename={basename}>
        <Search onSearch={handleSearch} />
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
                onPageChange={setCurrentPage}
                searchQuery={queryString}
              />
            }
          >
            <Route path="details/:id" element={<Details />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
