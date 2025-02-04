import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import ResultPage from './components/Result-page/Result-page';
import { Character } from './types/characterTypes';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    characters: [],
    errorAPI: '',
    isError: false,
    isLoading: false,
  };

  handleSearch = (
    characters: Character[],
    errorAPI: string,
    isLoading: boolean
  ) => {
    this.setState({ characters, errorAPI, isLoading });
  };

  handleError = (error: Error) => {
    console.error('Error caught in App:', error);
    this.setState({ isError: true });
  };

  resetError = () => {
    this.setState({ isError: false });
  };

  render() {
    console.log('рендер App');
    return (
      <>
        <h1>Task &quot;Class components&quot;</h1>
        <ErrorBoundary onError={this.handleError} onSearch={this.handleSearch}>
          <Search onSearch={this.handleSearch} />
          <ResultPage
            characters={this.state.characters}
            errorAPI={this.state.errorAPI}
            isLoading={this.state.isLoading}
          />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
