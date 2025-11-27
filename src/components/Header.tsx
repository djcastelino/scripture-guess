import { getStats } from '../utils/storage';
import './Header.css';

export default function Header() {
  const stats = getStats();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-center">
          <h1 className="title">
            <span className="icon">🙏</span>
            BIBLELE
          </h1>
          <p className="subtitle">Daily Challenge</p>
          {stats.currentStreak > 0 && (
            <div className="streak">
              🔥 {stats.currentStreak} day streak
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

