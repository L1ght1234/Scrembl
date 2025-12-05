import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../../types/game.types';
import { formatRelativeTime } from '../../../utils/formatters';
import styles from './Chat.module.css';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`${styles.message} ${
        message.isCorrectGuess ? styles.correctGuess : ''
      }`}
    >
      <div className={styles.messageHeader}>
        <span className={styles.playerName}>{message.playerName}</span>
        <span className={styles.timestamp}>
          {formatRelativeTime(message.timestamp)}
        </span>
      </div>
      <div className={styles.messageContent}>{message.content}</div>
    </div>
  );
};

