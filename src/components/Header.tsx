import { getStats } from '../utils/storage';
import './Header.css';

interface HeaderProps {
  onStatsClick: () => void;
}

export default function Header({ onStatsClick }: HeaderProps) {
  const stats = getStats();

  return (
    <header className="header">
      <div className="header-content">
        <button onClick={onStatsClick} className="stats-btn" title="View Statistics">
          📊
        </button>
        
        <div className="header-center">
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
      </div>
    </header>
  );
}

