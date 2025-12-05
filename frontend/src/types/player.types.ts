export interface Player {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
  isHost: boolean;
  role?: PlayerRole;
}

export enum PlayerRole {
  Artist = 'Artist',
  Guesser = 'Guesser',
  Spectator = 'Spectator',
}

