export type PlayerRole = 'Artist' | 'Guesser' | 'Spectator';

export interface Player {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
  isHost: boolean;
  role?: PlayerRole;
}
