import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game.types';

export const useGameState = (initialState?: GameState) => {
  const [gameState, setGameState] = useState<GameState | null>(initialState || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateGameState = useCallback((newState: Partial<GameState>) => {
    setGameState((prev) => {
      if (!prev) return null;
      return { ...prev, ...newState };
    });
  }, []);

  const resetGameState = useCallback(() => {
    setGameState(null);
    setError(null);
  }, []);

  return {
    gameState,
    isLoading,
    error,
    setGameState,
    updateGameState,
    resetGameState,
    setIsLoading,
    setError,
  };
};

