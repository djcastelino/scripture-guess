import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-S78VP637D3';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (page: string) => {
  ReactGA.send({ hitType: 'pageview', page });
};

// Track game events
export const trackGameStart = () => {
  ReactGA.event({
    category: 'Game',
    action: 'game_started',
  });
};

export const trackGameComplete = (won: boolean, guesses: number) => {
  ReactGA.event({
    category: 'Game',
    action: won ? 'game_won' : 'game_lost',
    label: `Guesses: ${guesses}`,
    value: guesses,
  });
};

export const trackGuess = (correct: boolean, guessNumber: number) => {
  ReactGA.event({
    category: 'Gameplay',
    action: 'guess_made',
    label: correct ? 'correct' : 'incorrect',
    value: guessNumber,
  });
};

export const trackShare = () => {
  ReactGA.event({
    category: 'Social',
    action: 'result_shared',
  });
};

export const trackStatsView = () => {
  ReactGA.event({
    category: 'Engagement',
    action: 'stats_viewed',
  });
};

export const trackCharacterView = (characterName: string, difficulty: string) => {
  ReactGA.event({
    category: 'Content',
    action: 'character_viewed',
    label: characterName,
    value: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
  });
};

