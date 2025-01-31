import { Component, ReactNode } from 'react';
import ResultPage from '../result-page/result-page';
import { Character } from '../../types/characterTypes';

let url = 'https://swapi.dev/api/people/';

interface State {
  queryString: string;
  result: Character[];
}

class Search extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      queryString: '',
      result: [],
    };
  }
  requestAPI = () => {
    const { queryString } = this.state;
    if (!queryString.trim()) {
      url += '';
    }
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log('API Data: ', response);
        this.setState({ result: response.results });
      })
      .catch((error) => {
        console.error('API Error: ', error);
      });
  };

  checkData = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ queryString: event.target.value }, () =>
      console.log('Data: ', this.state.queryString)
    );
  };

  render(): ReactNode {
    return (
      <>
        <section>
          <h2>Search: </h2>
          <input
            type="text"
            value={this.state.queryString}
            onChange={this.checkData}
            placeholder="Enter request..."
          ></input>
          <button onClick={this.requestAPI}>Search</button>
        </section>
        <section>
          <ResultPage characters={this.state.result} />
        </section>
      </>
    );
  }
}

export default Search;
