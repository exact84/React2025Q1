import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
