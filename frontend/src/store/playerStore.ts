import React from 'react';
import { Player } from '../types/player.types';

interface PlayerStore {
  currentPlayer: Player | null;
  players: Player[];
  setCurrentPlayer: (player: Player | null) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  resetPlayers: () => void;
}

// Simple store implementation - can be replaced with Zustand
class PlayerStoreImpl implements PlayerStore {
  private currentPlayerState: Player | null = null;
  private playersState: Player[] = [];
  private listeners: Set<() => void> = new Set();

  get currentPlayer(): Player | null {
    return this.currentPlayerState;
  }

  get players(): Player[] {
    return this.playersState;
  }

  setCurrentPlayer(player: Player | null): void {
    this.currentPlayerState = player;
    this.notify();
  }

  setPlayers(players: Player[]): void {
    this.playersState = players;
    this.notify();
  }

  addPlayer(player: Player): void {
    if (this.playersState.find((p) => p.id === player.id)) {
      return;
    }
    this.playersState = [...this.playersState, player];
    this.notify();
  }

  removePlayer(playerId: string): void {
    this.playersState = this.playersState.filter((p) => p.id !== playerId);
    this.notify();
  }

  updatePlayer(playerId: string, updates: Partial<Player>): void {
    this.playersState = this.playersState.map((p) =>
      p.id === playerId ? { ...p, ...updates } : p
    );
    this.notify();
  }

  resetPlayers(): void {
    this.currentPlayerState = null;
    this.playersState = [];
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

export const playerStore = new PlayerStoreImpl();

// Hook to use the store
export const usePlayerStore = () => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const unsubscribe = playerStore.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, []);

  return {
    currentPlayer: playerStore.currentPlayer,
    players: playerStore.players,
    setCurrentPlayer: playerStore.setCurrentPlayer.bind(playerStore),
    setPlayers: playerStore.setPlayers.bind(playerStore),
    addPlayer: playerStore.addPlayer.bind(playerStore),
    removePlayer: playerStore.removePlayer.bind(playerStore),
    updatePlayer: playerStore.updatePlayer.bind(playerStore),
    resetPlayers: playerStore.resetPlayers.bind(playerStore),
  };
};

