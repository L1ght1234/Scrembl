import React from 'react';
import { GameState, GameStatus } from '../types/game.types';

interface GameStore {
  gameState: GameState | null;
  setGameState: (state: GameState | null) => void;
  updateGameState: (updates: Partial<GameState>) => void;
  resetGameState: () => void;
}

// Simple store implementation - can be replaced with Zustand
class GameStoreImpl implements GameStore {
  private state: GameState | null = null;
  private listeners: Set<() => void> = new Set();

  get gameState(): GameState | null {
    return this.state;
  }

  setGameState(state: GameState | null): void {
    this.state = state;
    this.notify();
  }

  updateGameState(updates: Partial<GameState>): void {
    if (!this.state) {
      return;
    }
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  resetGameState(): void {
    this.state = null;
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const gameStore = new GameStoreImpl();

// Hook to use the store
export const useGameStore = () => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const unsubscribe = gameStore.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, []);

  return {
    gameState: gameStore.gameState,
    setGameState: gameStore.setGameState.bind(gameStore),
    updateGameState: gameStore.updateGameState.bind(gameStore),
    resetGameState: gameStore.resetGameState.bind(gameStore),
  };
};

