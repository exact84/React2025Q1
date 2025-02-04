import { Component, FormEvent, ReactNode } from 'react';
import { Character } from '../../types/characterTypes';
import styles from './Search.module.css';

const baseUrl = 'https://swapi.dev/api/people/';

interface State {
  queryString: string;
  result: Character[];
  errorAPI: string;
}

interface Props {
  onSearch: (
    characters: Character[],
    errorAPI: string,
    isLoading: boolean
  ) => void;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      queryString: localStorage.getItem('queryString') || '',
      result: [],
      errorAPI: '',
    };
  }

  componentDidMount(): void {
    this.handleRequestAPI(new Event('submit') as unknown as FormEvent);
  }

  handleRequestAPI = async (event: FormEvent) => {
    event.preventDefault();
    const { queryString } = this.state;
    let url = baseUrl;
    if (queryString.trim()) {
      url += '?search=' + encodeURIComponent(queryString);
      localStorage.setItem('queryString', queryString);
    }
    this.props.onSearch([], '', true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const filteredCharacters = data.results;
      this.props.onSearch(filteredCharacters, '', false);
    } catch (error) {
      console.error('API Error: ', error);
      this.props.onSearch([], 'Ошибка загрузки данных!', false);
    }
  };

  checkData = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ queryString: event.target.value });
  };

  render(): ReactNode {
    console.log('рендер Search');
    return (
      <>
        <section className={styles.top}>
          <form onSubmit={this.handleRequestAPI}>
            <input
              type="text"
              value={this.state.queryString}
              onChange={this.checkData}
              placeholder="Enter request..."
            ></input>
            <button type="submit">Search</button>
          </form>
        </section>
      </>
    );
  }
}

export default Search;
