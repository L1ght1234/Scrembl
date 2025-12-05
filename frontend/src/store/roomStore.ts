import React from 'react';
import { Room, RoomStatus } from '../types/room.types';

interface RoomStore {
  currentRoom: Room | null;
  setCurrentRoom: (room: Room | null) => void;
  updateRoom: (updates: Partial<Room>) => void;
  resetRoom: () => void;
}

// Simple store implementation - can be replaced with Zustand
class RoomStoreImpl implements RoomStore {
  private state: Room | null = null;
  private listeners: Set<() => void> = new Set();

  get currentRoom(): Room | null {
    return this.state;
  }

  setCurrentRoom(room: Room | null): void {
    this.state = room;
    this.notify();
  }

  updateRoom(updates: Partial<Room>): void {
    if (!this.state) {
      return;
    }
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  resetRoom(): void {
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

export const roomStore = new RoomStoreImpl();

// Hook to use the store
export const useRoomStore = () => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const unsubscribe = roomStore.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, []);

  return {
    currentRoom: roomStore.currentRoom,
    setCurrentRoom: roomStore.setCurrentRoom.bind(roomStore),
    updateRoom: roomStore.updateRoom.bind(roomStore),
    resetRoom: roomStore.resetRoom.bind(roomStore),
  };
};

