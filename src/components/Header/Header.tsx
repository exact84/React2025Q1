import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/global.css';

export default function Header() {
  const context = useContext(ThemeContext);

  return (
    <div className="rowBox">
      <h1>Task3 &quot;Redux. Context api.&quot;</h1>
      <button onClick={context.toggleTheme}>Change Theme</button>
    </div>
  );
}
