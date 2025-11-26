export interface Character {
  id: number;
  name: string;
  testament: "Old" | "New";
  clues: string[];
  books: string[];
  role: string;
  famousFor: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface GameState {
  targetCharacter: Character | null;
  guesses: string[];
  isComplete: boolean;
  isWon: boolean;
  currentStreak: number;
  maxStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  lastPlayedDate: string;
}

export interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: { [key: number]: number };
}

