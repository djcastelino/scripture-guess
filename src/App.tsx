import { useState, useEffect } from 'react';
import type { GameState, Character } from './types';
import { getDailyCharacter } from './data/characters';
import { loadGameState, saveGameState, isNewDay, updateStats } from './utils/storage';
import { initGA, trackPageView, trackGameStart, trackGameComplete, trackGuess, trackCharacterView } from './utils/analytics';
import Header from './components/Header';
import CharacterImage from './components/CharacterImage';
import ClueDisplay from './components/ClueDisplay';
import GuessInput from './components/GuessInput';
import GuessList from './components/GuessList';
import GameOver from './components/GameOver';
import TestMode from './components/TestMode';
import Stats from './components/Stats';
import Archive from './components/Archive';
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
  const [showTestGrid, setShowTestGrid] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveMode, setArchiveMode] = useState(false);
  const [archivePuzzleNumber, setArchivePuzzleNumber] = useState<number | null>(null);

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    trackPageView('/');
    
    // Check for test mode URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'true') {
      setTestMode(true);
      setShowTestGrid(true);
      setLoading(false);
    } else {
      initGame();
    }
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
        
        // Track new game start
        trackGameStart();
        trackCharacterView(dailyCharacter.name, dailyCharacter.difficulty);
        
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

    // Track the guess
    trackGuess(isCorrect, newGuesses.length);

    const newState: GameState = {
      ...gameState,
      guesses: newGuesses,
      isComplete,
      isWon: isCorrect,
    };

    if (isComplete && !testMode && !archiveMode) {
      updateStats(isCorrect, newGuesses.length);
      
      // Track game completion
      trackGameComplete(isCorrect, newGuesses.length);
      
      const stats = JSON.parse(localStorage.getItem('biblele-stats') || '{}');
      newState.currentStreak = stats.currentStreak || 0;
      newState.maxStreak = stats.maxStreak || 0;
      newState.gamesPlayed = stats.gamesPlayed || 0;
      newState.gamesWon = stats.gamesWon || 0;
    }

    // Save archive puzzle completion (doesn't affect stats/streak)
    if (isComplete && archiveMode && archivePuzzleNumber) {
      const archiveData = JSON.parse(localStorage.getItem('scriptureguess-archive') || '{}');
      archiveData[archivePuzzleNumber] = {
        solved: isCorrect,
        guesses: newGuesses.length
      };
      localStorage.setItem('scriptureguess-archive', JSON.stringify(archiveData));
    }

    setGameState(newState);
    if (!testMode && !archiveMode) {
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
    const newState: GameState = {
      ...gameState,
      targetCharacter: character,
      guesses: [],
      isComplete: false,
      isWon: false,
    };
    setGameState(newState);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading ScriptureGuess...</p>
      </div>
    );
  }

  if (showTestGrid) {
    return (
      <TestMode 
        onSelectCharacter={(character) => {
          setShowTestGrid(false);
          handleTestCharacter(character);
        }}
        currentCharacterId={gameState.targetCharacter?.id || null}
      />
    );
  }

  if (!gameState.targetCharacter) {
    return (
      <div className="error-screen">
        <p>Failed to load game. Please refresh the page.</p>
      </div>
    );
  }

  // If game is won, show clues based on guesses BEFORE the correct one
  // If game is lost, show all clues
  const visibleClues = gameState.isComplete && gameState.isWon
    ? getVisibleClueCount(gameState.guesses.length - 1)
    : gameState.isComplete && !gameState.isWon
    ? 6
    : getVisibleClueCount(gameState.guesses.length);

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {testMode && (
          <div className="test-mode-banner">
            🧪 Test Mode Active - Stats won't be saved
            <button onClick={() => setShowTestGrid(true)} className="back-to-grid">
              ← Back to Grid
            </button>
            <button onClick={() => { 
              setTestMode(false); 
              setShowTestGrid(false);
              initGame(); 
            }} className="exit-test">
              Exit Test Mode
            </button>
          </div>
        )}

        <CharacterImage
          imageUrl={gameState.targetCharacter?.imageUrl}
          wrongGuesses={gameState.guesses.length - (gameState.isWon ? 1 : 0)}
          isComplete={gameState.isComplete}
          characterName={gameState.targetCharacter?.name || ''}
        />

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

        {gameState.isComplete && !archiveMode && (
          <GameOver
            isWon={gameState.isWon}
            character={gameState.targetCharacter}
            guessCount={gameState.guesses.length}
            puzzleNumber={getPuzzleNumber()}
            guesses={gameState.guesses}
            onStatsClick={() => setShowStats(true)}
            onArchiveClick={() => setShowArchive(true)}
          />
        )}

        {gameState.isComplete && archiveMode && (
          <div className="archive-game-complete">
            <p>✅ Archive puzzle complete! (Doesn't affect streak)</p>
            <button onClick={() => {
              setArchiveMode(false);
              setArchivePuzzleNumber(null);
              initGame();
            }} className="back-to-today">
              ← Back to Today's Puzzle
            </button>
            <button onClick={() => setShowArchive(true)} className="browse-archive">
              📚 Browse More Puzzles
            </button>
          </div>
        )}
      </main>

      <Stats 
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />

      <Archive
        isOpen={showArchive}
        onClose={() => setShowArchive(false)}
        onSelectPuzzle={(character, puzzleNumber) => {
          setShowArchive(false);
          setArchiveMode(true);
          setArchivePuzzleNumber(puzzleNumber);
          setGameState({
            ...gameState,
            targetCharacter: character,
            guesses: [],
            isComplete: false,
            isWon: false,
          });
        }}
      />
    </div>
  );
}

export default App;
