import { useState, useCallback, useEffect } from 'react';
import type { ChatMessage } from '../types/game.types';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const sendMessage = useCallback((content: string, playerName: string, playerId: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      playerName,
      playerId,
      timestamp: new Date(),
      isCorrectGuess: false,
    };
    addMessage(message);
    return message;
  }, [addMessage]);

  const markAsCorrectGuess = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isCorrectGuess: true } : msg
      )
    );
  }, []);

  return {
    messages,
    isTyping,
    addMessage,
    clearMessages,
    sendMessage,
    markAsCorrectGuess,
    setIsTyping,
  };
};

