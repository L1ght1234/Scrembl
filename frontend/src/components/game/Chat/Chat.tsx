import React from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '../../../hooks/useChat';
import styles from './Chat.module.css';

interface ChatProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
}

export const Chat: React.FC<ChatProps> = ({ onSendMessage, disabled = false }) => {
  const { messages, sendMessage } = useChat();

  const handleSend = (content: string) => {
    // TODO: Get player info from store/context
    const message = sendMessage(content, 'Player', 'player-id');
    if (onSendMessage) {
      onSendMessage(content);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSend={handleSend} disabled={disabled} />
    </div>
  );
};

