import { useState, useEffect } from 'react';
import type { GameState, Character } from './types';
import { getDailyCharacter } from './data/characters';
import { loadGameState, saveGameState, isNewDay, updateStats } from './utils/storage';
import Header from './components/Header';
import ClueDisplay from './components/ClueDisplay';
import GuessInput from './components/GuessInput';
import GuessList from './components/GuessList';
import GameOver from './components/GameOver';
import TestMode from './components/TestMode';
import './App.css';

const MAX_GUESSES = 6;

function App() {
  const [gameState, setGameState] = useState<GameState>({
    targetCharacter: null,
    guesses: [],
    isComplete: false,
    isWon: false,
    currentStreak: 0,
    maxStreak: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    lastPlayedDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  function initGame() {
    try {
      const savedState = loadGameState();
      const todayDateOnly = new Date().toISOString().split('T')[0];

      const shouldStartNewGame = !savedState || 
                                !savedState.targetCharacter || 
                                !savedState.lastPlayedDate ||
                                isNewDay(savedState.lastPlayedDate);

      if (shouldStartNewGame) {
        const dailyCharacter = getDailyCharacter();
        
        const newState: GameState = {
          targetCharacter: dailyCharacter,
          guesses: [],
          isComplete: false,
          isWon: false,
          currentStreak: savedState?.currentStreak || 0,
          maxStreak: savedState?.maxStreak || 0,
          gamesPlayed: savedState?.gamesPlayed || 0,
          gamesWon: savedState?.gamesWon || 0,
          lastPlayedDate: todayDateOnly,
        };
        
        setGameState(newState);
        saveGameState(newState);
      } else if (savedState.targetCharacter) {
        setGameState(savedState);
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      setLoading(false);
    }
  }

  function getVisibleClueCount(guessCount: number): number {
    if (guessCount === 0) return 1;
    if (guessCount === 1) return 2;
    if (guessCount === 2) return 3;
    if (guessCount === 3) return 4;
    if (guessCount === 4) return 5;
    return 6;
  }

  function handleGuess(guessName: string) {
    if (!gameState.targetCharacter || gameState.isComplete) return;

    const isCorrect = guessName.toLowerCase() === gameState.targetCharacter.name.toLowerCase();
    const newGuesses = [...gameState.guesses, guessName];
    const isComplete = isCorrect || newGuesses.length >= MAX_GUESSES;

    const newState: GameState = {
      ...gameState,
      guesses: newGuesses,
      isComplete,
      isWon: isCorrect,
    };

    if (isComplete && !testMode) {
      updateStats(isCorrect, newGuesses.length);
      const stats = JSON.parse(localStorage.getItem('biblele-stats') || '{}');
      newState.currentStreak = stats.currentStreak || 0;
      newState.maxStreak = stats.maxStreak || 0;
      newState.gamesPlayed = stats.gamesPlayed || 0;
      newState.gamesWon = stats.gamesWon || 0;
    }

    setGameState(newState);
    if (!testMode) {
      saveGameState(newState);
    }
  }

  function getPuzzleNumber(): number {
    const startDate = new Date('2024-11-26');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function handleTestCharacter(character: Character) {
    setTestMode(true);
    const newState: GameState = {
      ...gameState,
      targetCharacter: character,
      guesses: [],
      isComplete: false,
      isWon: false,
    };
    setGameState(newState);
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Biblele...</p>
      </div>
    );
  }

  if (!gameState.targetCharacter) {
    return (
      <div className="error-screen">
        <p>Failed to load game. Please refresh the page.</p>
      </div>
    );
  }

  const visibleClues = getVisibleClueCount(gameState.guesses.length);

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {testMode && (
          <div className="test-mode-banner">
            🧪 Test Mode Active - Stats won't be saved
            <button onClick={() => { setTestMode(false); initGame(); }} className="exit-test">
              Exit Test Mode
            </button>
          </div>
        )}

        <ClueDisplay 
          character={gameState.targetCharacter} 
          visibleClueCount={visibleClues}
        />

        {!gameState.isComplete && (
          <GuessInput
            onGuess={handleGuess}
            disabled={gameState.isComplete}
          />
        )}

        <GuessList 
          guesses={gameState.guesses} 
          maxGuesses={MAX_GUESSES}
          isComplete={gameState.isComplete}
          isWon={gameState.isWon}
        />

        {gameState.isComplete && (
          <GameOver
            isWon={gameState.isWon}
            character={gameState.targetCharacter}
            guessCount={gameState.guesses.length}
            puzzleNumber={getPuzzleNumber()}
            guesses={gameState.guesses}
          />
        )}
      </main>

      <TestMode 
        onSelectCharacter={handleTestCharacter}
        currentCharacterId={gameState.targetCharacter?.id || null}
      />
    </div>
  );
}

export default App;
