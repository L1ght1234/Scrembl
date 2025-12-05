import React, { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import styles from './WordSelector.module.css';

interface WordSelectorProps {
  words: string[];
  onSelect: (word: string) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export const WordSelector: React.FC<WordSelectorProps> = ({
  words,
  onSelect,
  isOpen,
  onClose,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleSelect = (word: string) => {
    setSelectedWord(word);
    onSelect(word);
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Select a Word to Draw</h2>
        <p className={styles.subtitle}>Choose one word from the list below:</p>
        <div className={styles.wordsGrid}>
          {words.map((word, index) => (
            <button
              key={index}
              className={`${styles.wordButton} ${
                selectedWord === word ? styles.selected : ''
              }`}
              onClick={() => handleSelect(word)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

