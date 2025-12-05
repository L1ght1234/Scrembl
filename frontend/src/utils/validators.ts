import { VALIDATION } from './constants';

export const validatePlayerName = (name: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Player name is required' };
  }

  if (name.trim().length < VALIDATION.MIN_PLAYER_NAME_LENGTH) {
    return {
      valid: false,
      error: `Player name must be at least ${VALIDATION.MIN_PLAYER_NAME_LENGTH} characters`,
    };
  }

  if (name.length > VALIDATION.MAX_PLAYER_NAME_LENGTH) {
    return {
      valid: false,
      error: `Player name must be at most ${VALIDATION.MAX_PLAYER_NAME_LENGTH} characters`,
    };
  }

  if (!/^[a-zA-Z0-9_\s-]+$/.test(name)) {
    return {
      valid: false,
      error: 'Player name can only contain letters, numbers, spaces, hyphens, and underscores',
    };
  }

  return { valid: true };
};

export const validateRoomName = (name: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Room name is required' };
  }

  if (name.trim().length < VALIDATION.MIN_ROOM_NAME_LENGTH) {
    return {
      valid: false,
      error: `Room name must be at least ${VALIDATION.MIN_ROOM_NAME_LENGTH} characters`,
    };
  }

  if (name.length > VALIDATION.MAX_ROOM_NAME_LENGTH) {
    return {
      valid: false,
      error: `Room name must be at most ${VALIDATION.MAX_ROOM_NAME_LENGTH} characters`,
    };
  }

  return { valid: true };
};

export const validateRoomSettings = (settings: {
  maxPlayers: number;
  roundTime: number;
  rounds: number;
}): { valid: boolean; error?: string } => {
  if (
    settings.maxPlayers < VALIDATION.MIN_PLAYERS ||
    settings.maxPlayers > VALIDATION.MAX_PLAYERS
  ) {
    return {
      valid: false,
      error: `Max players must be between ${VALIDATION.MIN_PLAYERS} and ${VALIDATION.MAX_PLAYERS}`,
    };
  }

  if (
    settings.roundTime < VALIDATION.MIN_ROUND_TIME ||
    settings.roundTime > VALIDATION.MAX_ROUND_TIME
  ) {
    return {
      valid: false,
      error: `Round time must be between ${VALIDATION.MIN_ROUND_TIME} and ${VALIDATION.MAX_ROUND_TIME} seconds`,
    };
  }

  if (settings.rounds < VALIDATION.MIN_ROUNDS || settings.rounds > VALIDATION.MAX_ROUNDS) {
    return {
      valid: false,
      error: `Rounds must be between ${VALIDATION.MIN_ROUNDS} and ${VALIDATION.MAX_ROUNDS}`,
    };
  }

  return { valid: true };
};

export const validateRoomId = (roomId: string): { valid: boolean; error?: string } => {
  if (!roomId || roomId.trim().length === 0) {
    return { valid: false, error: 'Room ID is required' };
  }

  // Room ID format validation (adjust based on your backend)
  if (!/^[a-zA-Z0-9-]+$/.test(roomId)) {
    return { valid: false, error: 'Invalid room ID format' };
  }

  return { valid: true };
};

