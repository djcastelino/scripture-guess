import './GuessList.css';

interface GuessListProps {
  guesses: string[];
  maxGuesses: number;
}

export default function GuessList({ guesses, maxGuesses }: GuessListProps) {
  if (guesses.length === 0) return null;

  return (
    <div className="guess-list">
      <h3 className="guess-list-title">Your Guesses:</h3>
      <ul className="guesses">
        {guesses.map((guess, index) => (
          <li key={index} className="guess-item">
            ❌ {guess}
          </li>
        ))}
      </ul>
      <p className="remaining-guesses">
        Remaining: {maxGuesses - guesses.length}/{maxGuesses}
      </p>
    </div>
  );
}

