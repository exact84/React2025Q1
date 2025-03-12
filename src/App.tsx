import { useState } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function ErrorThrower({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('This is a test error to check ErrorBoundary!');
  }
  return null;
}

function App() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <ErrorBoundary onReset={() => setShouldThrow(false)}>
      <div>
        <h1>React Forms Project</h1>
        <div className="card">
          <button
            onClick={() => setShouldThrow(true)}
            className="btn btn-danger"
          >
            Throw Error
          </button>
          <ErrorThrower shouldThrow={shouldThrow} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
