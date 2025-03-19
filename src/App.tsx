import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Provider store={store}>
          <Router>
            <div className="app">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </Router>
        </Provider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
