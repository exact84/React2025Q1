import { useContext } from 'react';
import { ThemeContext } from '../../context';
import '../../styles/global.css';

export default function Header() {
  const context = useContext(ThemeContext);

  return (
    <div className="rowBox">
      <h1>Task2 &quot;Redux. Context api.&quot;</h1>
      <button onClick={context.toggleTheme}>Change Theme</button>
    </div>
  );
}
