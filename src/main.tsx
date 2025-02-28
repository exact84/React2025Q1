import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/indexStore';
import { ThemeProvider } from './context/ThemeProvider';

const basename = process.env.BASE_URL || '/';
const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
