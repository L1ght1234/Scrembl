import React from 'react';
import styles from './GameLayout.module.css';

interface GameLayoutProps {
  canvas: React.ReactNode;
  playerList: React.ReactNode;
  chat: React.ReactNode;
  timer: React.ReactNode;
  wordHint?: React.ReactNode;
  drawingTools?: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  canvas,
  playerList,
  chat,
  timer,
  wordHint,
  drawingTools,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.timerSection}>{timer}</div>
        {wordHint && <div className={styles.wordHintSection}>{wordHint}</div>}
        <div className={styles.playerListSection}>{playerList}</div>
        <div className={styles.chatSection}>{chat}</div>
      </div>
      
      <div className={styles.main}>
        <div className={styles.canvasContainer}>
          {canvas}
          {drawingTools && (
            <div className={styles.drawingTools}>{drawingTools}</div>
          )}
        </div>
      </div>
    </div>
  );
};

