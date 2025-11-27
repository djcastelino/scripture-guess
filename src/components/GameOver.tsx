import type { Character } from '../types';
import { generateShareText } from '../utils/storage';
import './GameOver.css';

interface GameOverProps {
  isWon: boolean;
  character: Character;
  guessCount: number;
  puzzleNumber: number;
  guesses: string[];
  onStatsClick: () => void;
}

export default function GameOver({ isWon, character, guessCount, puzzleNumber, guesses, onStatsClick }: GameOverProps) {
  const handleShare = () => {
    const shareText = generateShareText(isWon, guesses, puzzleNumber);
    
    if (navigator.share) {
      navigator.share({
        text: shareText
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        alert('Copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="game-over">
      <div className={`result-banner ${isWon ? 'won' : 'lost'}`}>
        {isWon ? (
          <>
            <div className="result-icon">🎉</div>
            <h2 className="result-title">Correct!</h2>
            <p className="result-subtitle">You got it in {guessCount} {guessCount === 1 ? 'guess' : 'guesses'}!</p>
          </>
        ) : (
          <>
            <div className="result-icon">😔</div>
            <h2 className="result-title">The answer was:</h2>
          </>
        )}
      </div>

      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-role">{character.role}</p>
        
        <div className="character-details">
          <p className="character-famous">
            <strong>Famous for:</strong> {character.famousFor}
          </p>
          <p className="character-books">
            <strong>Books:</strong> {character.books.join(', ')}
          </p>
          <p className="character-testament">
            <strong>Testament:</strong> {character.testament}
          </p>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleShare} className="share-button">
          📤 Share Result & Invite Friends
        </button>

        <button onClick={onStatsClick} className="stats-button">
          📊 View Stats
        </button>
      </div>

      <p className="next-puzzle">
        Come back tomorrow for a new puzzle!
      </p>
    </div>
  );
}

