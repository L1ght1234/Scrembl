export interface GameState {
  roomId: string;
  currentRound: number;
  totalRounds: number;
  status: GameStatus;
  currentWord?: string;
  currentArtist?: string;
  roundStartTime?: Date;
  roundEndTime?: Date;
}

export enum GameStatus {
  Waiting = 'Waiting',
  Starting = 'Starting',
  InProgress = 'InProgress',
  RoundEnd = 'RoundEnd',
  GameEnd = 'GameEnd',
}

export interface ChatMessage {
  id: string;
  content: string;
  playerName: string;
  playerId: string;
  timestamp: Date;
  isCorrectGuess: boolean;
}

export interface RoundResult {
  word: string;
  scores: Array<{
    playerName: string;
    score: number;
  }>;
}

