import { getDailyCharacter } from '../data/characters';
import type { Character } from '../types';
import './Archive.css';

interface ArchiveProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPuzzle: (character: Character, puzzleNumber: number) => void;
}

export default function Archive({ isOpen, onClose, onSelectPuzzle }: ArchiveProps) {
  if (!isOpen) return null;

  // Get completed puzzles from localStorage
  const getCompletedPuzzles = (): Record<number, { solved: boolean; guesses: number }> => {
    const saved = localStorage.getItem('scriptureguess-archive');
    return saved ? JSON.parse(saved) : {};
  };

  const completedPuzzles = getCompletedPuzzles();

  // Generate list of all available puzzles (only PAST puzzles, not future!)
  const generatePuzzleList = () => {
    const puzzles: Array<{ number: number; character: Character; completed?: { solved: boolean; guesses: number } }> = [];
    const today = new Date();
    
    // Get today's puzzle number (days since epoch % 50)
    const todayPuzzleNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    
    // Only show today and PAST puzzles (not future ones!)
    // Start from today (i=0) and go backwards 49 days (total 50 puzzles)
    for (let i = 0; i < 50; i++) {
      const puzzleNumber = todayPuzzleNumber - i;
      const date = new Date(puzzleNumber * 24 * 60 * 60 * 1000);
      const character = getDailyCharacter(date);
      
      puzzles.push({
        number: puzzleNumber,
        character,
        completed: completedPuzzles[puzzleNumber]
      });
    }
    
    return puzzles;
  };

  const puzzles = generatePuzzleList();
  const todayPuzzleNumber = puzzles[0].number;

  const handlePuzzleClick = (puzzle: typeof puzzles[0], index: number) => {
    // Don't allow playing today's puzzle from archive (use main game)
    if (puzzle.number === todayPuzzleNumber) {
      alert("This is today's puzzle! Complete it on the main screen to maintain your streak.");
      return;
    }
    
    // Only allow yesterday's puzzle (index 1) - all others are locked!
    if (index !== 1) {
      alert("🔒 Only yesterday's puzzle is available for catch-up! Complete today's puzzle first, then come back tomorrow for more past puzzles.");
      return;
    }
    
    onSelectPuzzle(puzzle.character, puzzle.number);
  };

  return (
    <div className="archive-overlay" onClick={onClose}>
      <div className="archive-modal" onClick={(e) => e.stopPropagation()}>
        <div className="archive-header">
          <h2>📚 Previous Puzzles</h2>
          <button className="archive-close" onClick={onClose}>✕</button>
        </div>

        <div className="archive-info">
          💡 Yesterday's puzzle available for catch-up! (Doesn't affect streak)
        </div>

        <div className="archive-list">
          {puzzles.map((puzzle, index) => {
            const isToday = puzzle.number === todayPuzzleNumber;
            const isYesterday = index === 1;
            const isLocked = !isToday && !isYesterday;
            
            return (
              <div
                key={puzzle.number}
                className={`archive-item ${isToday ? 'today' : ''} ${puzzle.completed ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={() => handlePuzzleClick(puzzle, index)}
              >
                <div className="archive-item-number">
                  {isToday ? '📅 Today' : isYesterday ? '⏮️ Yesterday' : `🔒 Day ${index}`}
                </div>
                <div className="archive-item-name">
                  {puzzle.completed ? puzzle.character.name : isLocked ? '🔒 Locked' : 'Mystery Character'}
                </div>
                <div className="archive-item-status">
                  {isToday ? (
                    <span className="today-badge">Play on main screen</span>
                  ) : isLocked ? (
                    <span className="locked-badge">🔒 Coming soon</span>
                  ) : puzzle.completed ? (
                    puzzle.completed.solved ? (
                      <span className="solved">✅ {puzzle.completed.guesses}/6</span>
                    ) : (
                      <span className="failed">❌ Failed</span>
                    )
                  ) : (
                    <span className="not-played">❓ Available now!</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="archive-footer">
          New previous puzzle unlocks daily! Play regularly to build your collection! 📖
        </div>
      </div>
    </div>
  );
}

