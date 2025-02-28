import { StrictMode } from 'react';
import '../styles/global.css';
import { Provider } from 'react-redux';
import { store } from '../store/indexStore';
import { ThemeProvider } from '../context/ThemeProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="root-container">
            <Component {...pageProps} />
          </div>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default MyApp;
