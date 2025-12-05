import React from 'react';
import styles from './RoundResults.module.css';

interface RoundResultsProps {
  scores: Array<{ playerName: string; score: number }>;
  word: string;
  onNextRound?: () => void;
}

export const RoundResults: React.FC<RoundResultsProps> = ({
  scores,
  word,
  onNextRound,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Round Results</h2>
      <div className={styles.wordReveal}>
        <p className={styles.wordLabel}>The word was:</p>
        <p className={styles.word}>{word}</p>
      </div>
      <div className={styles.scores}>
        <h3 className={styles.scoresTitle}>Scores</h3>
        <ul className={styles.scoresList}>
          {scores.map((entry, index) => (
            <li key={index} className={styles.scoreItem}>
              <span className={styles.playerName}>{entry.playerName}</span>
              <span className={styles.score}>+{entry.score}</span>
            </li>
          ))}
        </ul>
      </div>
      {onNextRound && (
        <button className={styles.nextButton} onClick={onNextRound}>
          Next Round
        </button>
      )}
    </div>
  );
};

