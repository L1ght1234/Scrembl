import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

export const useKeyboard = (key: string, handler: KeyHandler, enabled: boolean = true) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key && enabled) {
        handler(event);
      }
    },
    [key, handler, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, enabled]);
};

export const useKeyboardShortcuts = (shortcuts: Record<string, KeyHandler>) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const handler = shortcuts[event.key];
      if (handler) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [shortcuts]);
};

