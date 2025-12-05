export interface Room {
  id: string;
  name: string;
  hostId: string;
  maxPlayers: number;
  currentPlayers: number;
  roundTime: number;
  rounds: number;
  status: RoomStatus;
  createdAt: Date;
}

export enum RoomStatus {
  Waiting = 'Waiting',
  Starting = 'Starting',
  InGame = 'InGame',
  Finished = 'Finished',
}

export interface RoomSettings {
  name: string;
  maxPlayers: number;
  roundTime: number;
  rounds: number;
}

