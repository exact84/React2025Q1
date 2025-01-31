import { Component, ReactNode } from 'react';
import ResultPage from '../result-page/result-page';
import { Character } from '../../types/characterTypes';
import styles from './search.module.css';
import loadingGif from '../../assets/star-wars-disney.gif';

const baseUrl = 'https://swapi.dev/api/people/';

interface State {
  queryString: string;
  result: Character[];
  isLoading: boolean;
}

class Search extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      queryString: localStorage.getItem('queryString') || '',
      result: [],
      isLoading: false,
    };
  }

  componentDidMount(): void {
    if (this.state.queryString) this.requestAPI();
  }

  requestAPI = async () => {
    const { queryString } = this.state;
    let url = baseUrl;
    if (queryString.trim()) {
      url += '?search=' + encodeURIComponent(queryString);
      localStorage.setItem('queryString', queryString);
    }
    this.setState({ isLoading: true });
    try {
      const response = await fetch(url);
      const data = await response.json();
      const filteredCharacters = data.results;

      this.setState({ result: filteredCharacters, isLoading: false });
    } catch (error) {
      console.error('API Error: ', error);
      this.setState({ isLoading: false });
    }
  };

  checkData = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ queryString: event.target.value }, () =>
      console.log('Data: ', this.state.queryString)
    );
  };

  render(): ReactNode {
    return (
      <>
        <section className={styles.top}>
          <input
            type="text"
            value={this.state.queryString}
            onChange={this.checkData}
            placeholder="Enter request..."
          ></input>
          <button onClick={this.requestAPI}>Search</button>
        </section>
        <section className={styles.results}>
          {this.state.isLoading ? (
            <div className={styles.loading_container}>
              <img width="300px" src={loadingGif} alt="Loader"></img>
              <div>Loading, please wait...</div>
            </div>
          ) : (
            <ResultPage characters={this.state.result} />
          )}
        </section>
      </>
    );
  }
}

export default Search;
