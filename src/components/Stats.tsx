import { getStats } from '../utils/storage';
import { trackStatsView } from '../utils/analytics';
import './Stats.css';

interface StatsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Stats({ isOpen, onClose }: StatsProps) {
  if (!isOpen) return null;

  // Track stats view
  trackStatsView();

  const stats = getStats();
  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  // Calculate average guesses (only for wins)
  const totalGuesses = Object.entries(stats.guessDistribution).reduce(
    (sum, [guesses, count]) => sum + (parseInt(guesses) * (count as number)),
    0
  );
  const averageGuesses = stats.gamesWon > 0 
    ? (totalGuesses / stats.gamesWon).toFixed(1) 
    : '0';

  // Find max count for scaling the bars
  const maxCount = Math.max(...(Object.values(stats.guessDistribution) as number[]), 1);

  return (
    <div className="stats-overlay" onClick={onClose}>
      <div className="stats-modal" onClick={(e) => e.stopPropagation()}>
        <div className="stats-header">
          <h2>📊 Your Statistics</h2>
          <button onClick={onClose} className="stats-close-btn">✕</button>
        </div>

        <div className="stats-summary">
          <div className="stat-box">
            <div className="stat-value">{stats.gamesPlayed}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{winRate}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.maxStreak}</div>
            <div className="stat-label">Max Streak</div>
          </div>
        </div>

        <div className="stats-details">
          <h3>Average Guesses: {averageGuesses}</h3>
          <h3>Guess Distribution</h3>
          <div className="guess-distribution">
            {[1, 2, 3, 4, 5, 6].map((guessNum) => {
              const count = stats.guessDistribution[guessNum] || 0;
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
              
              return (
                <div key={guessNum} className="distribution-row">
                  <span className="guess-number">{guessNum}</span>
                  <div className="bar-container">
                    <div 
                      className="bar" 
                      style={{ width: `${Math.max(percentage, count > 0 ? 10 : 0)}%` }}
                    >
                      <span className="bar-count">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {stats.gamesPlayed === 0 && (
          <div className="no-stats">
            <p>🎮 Play your first game to see stats!</p>
          </div>
        )}
      </div>
    </div>
  );
}

