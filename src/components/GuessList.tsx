import './GuessList.css';

interface GuessListProps {
  guesses: string[];
  maxGuesses: number;
  isComplete: boolean;
  isWon: boolean;
}

export default function GuessList({ guesses, maxGuesses, isComplete, isWon }: GuessListProps) {
  if (guesses.length === 0) return null;

  return (
    <div className="guess-list">
      <h3 className="guess-list-title">Your Guesses:</h3>
      <ul className="guesses">
        {guesses.map((guess, index) => {
          const isLastGuess = index === guesses.length - 1;
          const isCorrectGuess = isComplete && isWon && isLastGuess;
          
          return (
            <li key={index} className={`guess-item ${isCorrectGuess ? 'correct' : ''}`}>
              {isCorrectGuess ? '✅' : '❌'} {guess}
            </li>
          );
        })}
      </ul>
      <p className="remaining-guesses">
        Remaining: {maxGuesses - guesses.length}/{maxGuesses}
      </p>
    </div>
  );
}

