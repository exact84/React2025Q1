'use client';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export default function Header() {
  const context = useContext(ThemeContext);

  return (
    <div className="rowBox">
      <h1 data-testid="header">Task4 &quot;Next.js. SSR.&quot;</h1>
      <button onClick={context.toggleTheme}>Change Theme</button>
    </div>
  );
}
