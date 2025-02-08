import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import ResultPage from './components/Result-page/Result-page';
import { Character } from './types/characterTypes';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorAPI, setErrorAPI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [queryString, setQueryString] = useState(
    localStorage.getItem('queryString') || ''
  );

  const baseUrl = 'https://swapi.dev/api/people/?';

  const handleSearch = (query: string) => {
    setQueryString(query);
    setCurrentPage(1);
  };

  function handleError(error: Error) {
    console.error('Error caught in App:', error);
    // setIsError(true);
  }

  async function handleRequestAPI(page: number) {
    setIsLoading(true);
    let url = baseUrl;
    if (queryString.trim()) {
      url += 'search=' + encodeURIComponent(queryString) + '&';
      localStorage.setItem('queryString', queryString);
    }
    url += 'page=' + page;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      // props.onSearch(filteredCharacters, '', false);
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
    // props.onSearch([], errorAPI, false);
  }

  useEffect(() => {
    handleRequestAPI(currentPage);
  }, [currentPage, queryString]);

  // function resetError() {
  //   setIsError(false);
  // }

  console.log('рендер App');
  return (
    <>
      <ErrorBoundary onError={handleError}>
        <h1>Task2 &quot;React Routing. Tests.&quot;</h1>
        <Search onSearch={handleSearch} />
        <ResultPage
          characters={characters}
          errorAPI={errorAPI}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </ErrorBoundary>
    </>
  );
}

export default App;
