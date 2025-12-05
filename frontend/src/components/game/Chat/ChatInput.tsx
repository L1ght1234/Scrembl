import React, { useState, FormEvent } from 'react';
import styles from './Chat.module.css';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type your guess...',
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      <button
        type="submit"
        className={styles.sendButton}
        disabled={disabled || !message.trim()}
      >
        Send
      </button>
    </form>
  );
};

