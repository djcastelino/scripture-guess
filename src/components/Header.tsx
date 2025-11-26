import { getStats } from '../utils/storage';
import './Header.css';

export default function Header() {
  const stats = getStats();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          <span className="icon">🙏</span>
          BIBLELE
        </h1>
        <p className="subtitle">Daily Bible Character Game</p>
        {stats.currentStreak > 0 && (
          <div className="streak">
            🔥 {stats.currentStreak} day streak
          </div>
        )}
      </div>
    </header>
  );
}

