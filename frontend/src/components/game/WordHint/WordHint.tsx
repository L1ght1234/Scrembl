import React from 'react';
import styles from './WordHint.module.css';

interface WordHintProps {
  hint: string; // e.g., "_ _ _ _ _"
  revealedLetters?: number[];
}

export const WordHint: React.FC<WordHintProps> = ({ hint, revealedLetters }) => {
  return (
    <div className={styles.container}>
      <div className={styles.hint}>
        {hint.split('').map((char, index) => (
          <span
            key={index}
            className={`${styles.letter} ${
              char !== '_' && char !== ' ' ? styles.revealed : ''
            }`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

