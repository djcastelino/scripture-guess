import { useState, useRef, useEffect } from 'react';
import { getAllCharacterNames } from '../data/characters';
import './GuessInput.css';

interface GuessInputProps {
  onGuess: (name: string) => void;
  disabled: boolean;
}

export default function GuessInput({ onGuess, disabled }: GuessInputProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allNames = getAllCharacterNames();

  useEffect(() => {
    if (input.length > 0) {
      const filtered = allNames.filter(name =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  const handleSubmit = (name: string) => {
    if (name.trim()) {
      onGuess(name.trim());
      setInput('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSubmit(suggestions[0]);
      } else {
        handleSubmit(input);
      }
    }
  };

  return (
    <div className="guess-input-container">
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type character name..."
          disabled={disabled}
          className="guess-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-autocomplete="none"
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((name) => (
              <li
                key={name}
                onClick={() => handleSubmit(name)}
                className="suggestion-item"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

