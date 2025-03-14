import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserList } from './pages/UserList';
import { ControlledForm } from './pages/ControlledForm';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';
import { UncontrolledForm } from './pages/UncontrolledForm';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<UserList />} />
              {/* <Route
                path="/uncontrolled-form"
                element={<div>Uncontrolled Form</div>}
              /> */}
              <Route path="/controlled-form" element={<ControlledForm />} />
              <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
