import { useState } from 'react';
import { CHARACTERS } from '../data/characters';
import type { Character } from '../types';
import './TestMode.css';

interface TestModeProps {
  onSelectCharacter: (character: Character) => void;
  currentCharacterId: number | null;
}

export default function TestMode({ onSelectCharacter, currentCharacterId }: TestModeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="test-mode">
      <button 
        className="test-mode-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🧪 Test Mode
      </button>

      {isOpen && (
        <div className="test-mode-panel">
          <div className="test-mode-header">
            <h3>Test All Characters</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">✕</button>
          </div>
          
          <div className="character-list">
            {CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => {
                  onSelectCharacter(char);
                  setIsOpen(false);
                }}
                className={`character-btn ${currentCharacterId === char.id ? 'active' : ''}`}
              >
                <span className="char-number">#{char.id}</span>
                <span className="char-name">{char.name}</span>
                <span className={`char-difficulty ${char.difficulty}`}>
                  {char.difficulty}
                </span>
                <span className="char-testament">{char.testament}</span>
              </button>
            ))}
          </div>
          
          <div className="test-mode-footer">
            <p>⚠️ Test mode only - changes won't affect your stats</p>
          </div>
        </div>
      )}
    </div>
  );
}

