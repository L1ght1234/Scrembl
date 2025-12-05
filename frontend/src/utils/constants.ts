export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
} as const;

export const CANVAS_COLORS = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFA500',
  '#800080',
  '#FFC0CB',
  '#A52A2A',
  '#808080',
] as const;

export const BRUSH_SIZES = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32] as const;

export const DEFAULT_BRUSH_SIZE = 6;
export const DEFAULT_COLOR = '#000000';
export const MIN_BRUSH_SIZE = 2;
export const MAX_BRUSH_SIZE = 32;

export const TIMINGS = {
  ROUND_START_DELAY: 3000,
  ROUND_END_DELAY: 5000,
  GAME_END_DELAY: 10000,
  RECONNECT_DELAY: 3000,
} as const;

export const SIZES = {
  CANVAS_MIN_WIDTH: 400,
  CANVAS_MIN_HEIGHT: 400,
  CANVAS_MAX_WIDTH: 1200,
  CANVAS_MAX_HEIGHT: 800,
} as const;

export const VALIDATION = {
  MIN_PLAYER_NAME_LENGTH: 2,
  MAX_PLAYER_NAME_LENGTH: 20,
  MIN_ROOM_NAME_LENGTH: 3,
  MAX_ROOM_NAME_LENGTH: 30,
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 10,
  MIN_ROUND_TIME: 30,
  MAX_ROUND_TIME: 120,
  MIN_ROUNDS: 1,
  MAX_ROUNDS: 10,
} as const;

