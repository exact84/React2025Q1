import { useTheme } from '../../context';
import '../../styles/global.css';

export default function Header() {
  const { toggleTheme } = useTheme();

  return (
    <div className="rowBox">
      <h1>Task2 &quot;Redux. Context api.&quot;</h1>
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  );
}
