export interface SignalRHubMethods {
  // Room methods
  JoinRoom: (roomId: string, playerName: string) => Promise<void>;
  LeaveRoom: (roomId: string) => Promise<void>;
  CreateRoom: (settings: {
    name: string;
    maxPlayers: number;
    roundTime: number;
    rounds: number;
  }) => Promise<string>;

  // Game methods
  StartGame: (roomId: string) => Promise<void>;
  SelectWord: (roomId: string, word: string) => Promise<void>;
  SendGuess: (roomId: string, guess: string) => Promise<void>;
  SendDrawing: (roomId: string, stroke: {
    points: Array<{ x: number; y: number }>;
    color: string;
    lineWidth: number;
  }) => Promise<void>;
  ClearCanvas: (roomId: string) => Promise<void>;
  PlayerReady: (roomId: string, isReady: boolean) => Promise<void>;
}

export interface SignalRHubEvents {
  PlayerJoined: (player: { id: string; name: string }) => void;
  PlayerLeft: (playerId: string) => void;
  GameStarted: (gameState: any) => void;
  RoundStarted: (roundData: {
    word: string;
    artist: string;
    roundTime: number;
  }) => void;
  RoundEnded: (results: any) => void;
  GameEnded: (finalScores: any) => void;
  DrawingReceived: (stroke: {
    points: Array<{ x: number; y: number }>;
    color: string;
    lineWidth: number;
  }) => void;
  CanvasCleared: () => void;
  GuessReceived: (guess: {
    playerId: string;
    playerName: string;
    guess: string;
    isCorrect: boolean;
  }) => void;
  PlayerReadyChanged: (playerId: string, isReady: boolean) => void;
}

