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

  // Only show yesterday's puzzle (catch-up feature)
  const generatePuzzleList = () => {
    const puzzles: Array<{ number: number; character: Character; completed?: { solved: boolean; guesses: number } }> = [];
    const today = new Date();
    
    // Get today's puzzle number (days since epoch % 50)
    const todayPuzzleNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    
    // Only show yesterday's puzzle for catch-up
    const yesterdayPuzzleNumber = todayPuzzleNumber - 1;
    const yesterday = new Date((yesterdayPuzzleNumber) * 24 * 60 * 60 * 1000);
    const yesterdayCharacter = getDailyCharacter(yesterday);
    
    puzzles.push({
      number: yesterdayPuzzleNumber,
      character: yesterdayCharacter,
      completed: completedPuzzles[yesterdayPuzzleNumber]
    });
    
    return puzzles;
  };

  const puzzles = generatePuzzleList();

  const handlePuzzleClick = (puzzle: typeof puzzles[0]) => {
    // Allow playing yesterday's puzzle
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
          💡 Missed yesterday? Play it now! (Doesn't affect your streak)
        </div>

        <div className="archive-list">
          {puzzles.map((puzzle) => {
            return (
              <div
                key={puzzle.number}
                className={`archive-item ${puzzle.completed ? 'completed' : ''}`}
                onClick={() => handlePuzzleClick(puzzle)}
              >
                <div className="archive-item-number">
                  ⏮️ Yesterday
                </div>
                <div className="archive-item-name">
                  {puzzle.completed ? puzzle.character.name : 'Mystery Character'}
                </div>
                <div className="archive-item-status">
                  {puzzle.completed ? (
                    puzzle.completed.solved ? (
                      <span className="solved">✅ {puzzle.completed.guesses}/6</span>
                    ) : (
                      <span className="failed">❌ Failed</span>
                    )
                  ) : (
                    <span className="not-played">❓ Tap to play!</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="archive-footer">
          Come back tomorrow for another catch-up puzzle! 📖
        </div>
      </div>
    </div>
  );
}

