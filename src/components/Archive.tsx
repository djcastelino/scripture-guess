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

  const handlePuzzleClick = (puzzle: typeof puzzles[0]) => {
    // Don't allow playing today's puzzle from archive (use main game)
    if (puzzle.number === todayPuzzleNumber) {
      alert("This is today's puzzle! Complete it on the main screen to maintain your streak.");
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
          💡 Previous puzzles are for practice - they don't affect your streak!
        </div>

        <div className="archive-list">
          {puzzles.map((puzzle, index) => (
            <div
              key={puzzle.number}
              className={`archive-item ${puzzle.number === todayPuzzleNumber ? 'today' : ''} ${puzzle.completed ? 'completed' : ''}`}
              onClick={() => handlePuzzleClick(puzzle)}
            >
              <div className="archive-item-number">
                {index === 0 ? '📅 Today' : `Day ${index}`}
              </div>
              <div className="archive-item-name">
                {puzzle.completed ? puzzle.character.name : 'Mystery Character'}
              </div>
              <div className="archive-item-status">
                {puzzle.number === todayPuzzleNumber ? (
                  <span className="today-badge">Play on main screen</span>
                ) : puzzle.completed ? (
                  puzzle.completed.solved ? (
                    <span className="solved">✅ {puzzle.completed.guesses}/6</span>
                  ) : (
                    <span className="failed">❌ Failed</span>
                  )
                ) : (
                  <span className="not-played">❓ Not played</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="archive-footer">
          All {puzzles.length} puzzles available FREE! 🎉
        </div>
      </div>
    </div>
  );
}

