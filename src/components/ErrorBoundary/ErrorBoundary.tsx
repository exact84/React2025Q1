import { Component, ReactNode } from 'react';
import { Character } from 'src/types/characterTypes';
import Search from '../Search/Search';

interface Props {
  children: ReactNode;
  onError: (error: Error) => void;
  onSearch: (
    characters: Character[],
    errorAPI: string,
    isLoading: boolean
  ) => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    this.props.onError(error);
  }

  render() {
    console.log('рендер Boundary');
    if (this.state.hasError)
      return (
        <>
          <Search onSearch={this.props.onSearch} />
          <h1>An Error occurred but handled</h1>
          <div>------------------------------</div>
          <button
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            Return
          </button>
        </>
      );
    return this.props.children;
  }
}
