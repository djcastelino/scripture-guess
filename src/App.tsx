import { useState, useEffect } from 'react';
import type { GameState } from './types';
import { getDailyCharacter } from './data/characters';
import { loadGameState, saveGameState, isNewDay, updateStats } from './utils/storage';
import Header from './components/Header';
import ClueDisplay from './components/ClueDisplay';
import GuessInput from './components/GuessInput';
import GuessList from './components/GuessList';
import GameOver from './components/GameOver';
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
    if (guessCount === 1) return 3;
    if (guessCount === 2) return 4;
    if (guessCount === 3) return 5;
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

    if (isComplete) {
      updateStats(isCorrect, newGuesses.length);
      const stats = JSON.parse(localStorage.getItem('biblele-stats') || '{}');
      newState.currentStreak = stats.currentStreak || 0;
      newState.maxStreak = stats.maxStreak || 0;
      newState.gamesPlayed = stats.gamesPlayed || 0;
      newState.gamesWon = stats.gamesWon || 0;
    }

    setGameState(newState);
    saveGameState(newState);
  }

  function getPuzzleNumber(): number {
    const startDate = new Date('2024-11-26');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
    </div>
  );
}

export default App;
