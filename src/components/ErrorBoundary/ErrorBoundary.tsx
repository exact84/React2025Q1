import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
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
    console.log('Caught by ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError)
      return (
        <>
          <h1>An Error occurred</h1>
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
