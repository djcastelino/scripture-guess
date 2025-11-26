import type { Character } from '../types';
import './ClueDisplay.css';

interface ClueDisplayProps {
  character: Character;
  visibleClueCount: number;
}

export default function ClueDisplay({ character, visibleClueCount }: ClueDisplayProps) {
  return (
    <div className="clue-display">
      <h2 className="mystery-title">Today's Puzzle</h2>
      
      <div className="clues-container">
        <h3 className="clues-heading">Clues:</h3>
        <ul className="clues-list">
          {character.clues.map((clue, index) => (
            <li 
              key={index} 
              className={`clue-item ${index < visibleClueCount ? 'visible' : 'locked'}`}
            >
              <span className="clue-number">{index + 1}.</span>
              {index < visibleClueCount ? (
                <span className="clue-text">{clue}</span>
              ) : (
                <span className="clue-locked">
                  🔒 Make another guess to reveal
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

