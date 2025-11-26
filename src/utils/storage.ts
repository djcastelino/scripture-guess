import type { GameState } from '../types';

const STORAGE_KEY = 'biblele-game-state';
const STATS_KEY = 'biblele-stats';

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function loadGameState(): GameState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
}

export function isNewDay(lastPlayedDate: string): boolean {
  if (!lastPlayedDate) return true;
  
  const today = new Date().toISOString().split('T')[0];
  const lastPlayed = lastPlayedDate.split('T')[0];
  
  return today !== lastPlayed;
}

export function updateStats(isWon: boolean, guessCount: number): void {
  try {
    const statsStr = localStorage.getItem(STATS_KEY);
    const stats = statsStr ? JSON.parse(statsStr) : {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: {}
    };

    stats.gamesPlayed++;
    
    if (isWon) {
      stats.gamesWon++;
      stats.currentStreak++;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
      stats.guessDistribution[guessCount] = (stats.guessDistribution[guessCount] || 0) + 1;
    } else {
      stats.currentStreak = 0;
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to update stats:', error);
  }
}

export function getStats() {
  try {
    const statsStr = localStorage.getItem(STATS_KEY);
    return statsStr ? JSON.parse(statsStr) : {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: {}
    };
  } catch (error) {
    console.error('Failed to get stats:', error);
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: {}
    };
  }
}

export function generateShareText(isWon: boolean, guesses: string[], puzzleNumber: number): string {
  const guessCount = guesses.length;
  const result = isWon ? `${guessCount}/6` : 'X/6';
  
  let grid = '';
  for (let i = 0; i < 6; i++) {
    if (i < guesses.length - 1) {
      grid += '⬜';
    } else if (i === guesses.length - 1) {
      grid += isWon ? '🟩' : '⬜';
    } else {
      grid += '⬛';
    }
    if ((i + 1) % 3 === 0 && i < 5) grid += '\n';
  }
  
  return `Biblele #${puzzleNumber} ${result}\n\n${grid}\n\nGuess the Bible character! 🙏\nPlay daily at: biblele.vercel.app`;
}

