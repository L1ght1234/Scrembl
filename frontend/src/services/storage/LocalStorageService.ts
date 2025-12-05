export class LocalStorageService {
  private static prefix = 'scriblio_';

  static setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serialized);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Convenience methods for common data
  static setPlayerName(name: string): void {
    this.setItem('playerName', name);
  }

  static getPlayerName(): string | null {
    return this.getItem<string>('playerName');
  }

  static setRoomId(roomId: string): void {
    this.setItem('roomId', roomId);
  }

  static getRoomId(): string | null {
    return this.getItem<string>('roomId');
  }
}

