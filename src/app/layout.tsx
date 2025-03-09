import Header from '@/app/components/Header/Header';
import { ThemeProvider } from '@/context/ThemeProvider';
import Head from 'next/head';
import { ReactNode } from 'react';
import '../styles/global.css';
import { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Next.js App Router Api Integration',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Exact84" />
      </Head>
      <body>
        <ThemeProvider>
          <main className="main">
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
