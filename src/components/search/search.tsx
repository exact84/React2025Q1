import { Component, ReactNode } from 'react';
import ResultPage from '../Result-page/Result-page';
import { Character } from '../../types/characterTypes';
import styles from './search.module.css';
import loadingGif from '../../assets/star-wars-disney.gif';

const baseUrl = 'https://swapi.dev/api/people/';

interface State {
  queryString: string;
  result: Character[];
  isLoading: boolean;
}

interface Props {
  queryString?: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      queryString:
        props.queryString || localStorage.getItem('queryString') || '',
      result: [],
      isLoading: false,
    };
  }

  componentDidMount(): void {
    if (this.state.queryString.trim() !== '') this.handleRequestAPI();
  }

  handleRequestAPI = async () => {
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
    this.setState({ queryString: event.target.value });
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
          <button onClick={this.handleRequestAPI}>Search</button>
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
