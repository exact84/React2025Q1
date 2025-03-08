import Header from '@components/Header/Header';
import { ThemeProvider } from '@/context/ThemeProvider';
import Head from 'next/head';
import { ReactNode, StrictMode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StrictMode>
        <ThemeProvider>
          <main className="main">
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </StrictMode>
    </>
  );
}
