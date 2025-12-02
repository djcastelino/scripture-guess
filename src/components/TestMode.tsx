import { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/characters';
import type { Character } from '../types';
import './TestMode.css';

interface TestModeProps {
  onSelectCharacter: (character: Character) => void;
  currentCharacterId: number | null;
}

export default function TestMode({ onSelectCharacter }: TestModeProps) {
  const [filterTestament, setFilterTestament] = useState<'all' | 'Old' | 'New'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  useEffect(() => {
    let currentCharacters = CHARACTERS;

    if (filterTestament !== 'all') {
      currentCharacters = currentCharacters.filter(c => c.testament === filterTestament);
    }
    if (filterDifficulty !== 'all') {
      currentCharacters = currentCharacters.filter(c => c.difficulty === filterDifficulty);
    }
    setFilteredCharacters(currentCharacters);
  }, [filterTestament, filterDifficulty]);

  const characterCounts = CHARACTERS.reduce((acc, char) => {
    acc.total++;
    if (char.testament === 'Old') acc.oldTestament++;
    if (char.testament === 'New') acc.newTestament++;
    if (char.difficulty === 'easy') acc.easy++;
    if (char.difficulty === 'medium') acc.medium++;
    if (char.difficulty === 'hard') acc.hard++;
    return acc;
  }, { total: 0, oldTestament: 0, newTestament: 0, easy: 0, medium: 0, hard: 0 });

  return (
    <div className="test-mode-overlay">
      <div className="test-mode-modal">
        <div className="test-mode-header">
          <h2>🧪 ScriptureGuess Test Mode</h2>
          <p className="test-mode-info">Review all {CHARACTERS.length} Bible characters. (Does not affect stats)</p>
        </div>

        <div className="test-mode-stats">
          <p>Total Characters: {characterCounts.total}</p>
          <p>Old Testament: {characterCounts.oldTestament} | New Testament: {characterCounts.newTestament}</p>
          <p>Easy: {characterCounts.easy} | Medium: {characterCounts.medium} | Hard: {characterCounts.hard}</p>
        </div>

        <div className="test-mode-filters">
          <label>
            Testament:
            <select value={filterTestament} onChange={(e) => setFilterTestament(e.target.value as 'all' | 'Old' | 'New')}>
              <option value="all">All</option>
              <option value="Old">Old Testament</option>
              <option value="New">New Testament</option>
            </select>
          </label>
          <label>
            Difficulty:
            <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value as 'all' | 'easy' | 'medium' | 'hard')}>
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        <div className="test-mode-grid">
          {filteredCharacters.map((character) => (
            <div key={character.id} className={`test-mode-card ${character.difficulty}`} onClick={() => onSelectCharacter(character)}>
              <div className="card-header">
                <span className="character-id">#{character.id}</span>
                <span className={`difficulty-badge ${character.difficulty}`}>{character.difficulty.charAt(0).toUpperCase() + character.difficulty.slice(1)}</span>
              </div>
              <div className="card-content">
                <span className="character-icon">
                  {character.testament === 'Old' && '📜'}
                  {character.testament === 'New' && '✝️'}
                </span>
                <h3 className="character-name">{character.name}</h3>
                <p className="character-meta">{character.testament} Testament | {character.role}</p>
                <p className="character-famous">{character.famousFor}</p>
              </div>
              <button className="test-button">Test This Character</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

