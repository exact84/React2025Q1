import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Search from './components/search/search';

const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(
  <StrictMode>
    <Search />
    <App />
  </StrictMode>
);
