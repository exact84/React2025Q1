import { StrictMode } from 'react';
import { useEffect, useState } from 'react';
import '../styles/global.css';
import { Provider } from 'react-redux';
import { store } from '../store/indexStore';
import { ThemeProvider } from '../context/ThemeProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Loader from '@components/Loader/Loader';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="main">
            {loading ? <Loader /> : <Component {...pageProps} />}
          </main>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default MyApp;
