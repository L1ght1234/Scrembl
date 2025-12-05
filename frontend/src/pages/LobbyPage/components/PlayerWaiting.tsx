import React from 'react';
import styles from './PlayerWaiting.module.css';

interface Player {
  id: string;
  name: string;
  isReady: boolean;
}

interface PlayerWaitingProps {
  players: Player[];
  currentPlayerId: string;
  onReady?: () => void;
  onStart?: () => void;
  canStart?: boolean;
}

export const PlayerWaiting: React.FC<PlayerWaitingProps> = ({
  players,
  currentPlayerId,
  onReady,
  onStart,
  canStart = false,
}) => {
  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const allReady = players.length > 0 && players.every((p) => p.isReady);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Waiting for Players</h2>
      
      <div className={styles.playersList}>
        {players.map((player) => (
          <div
            key={player.id}
            className={`${styles.playerCard} ${
              player.id === currentPlayerId ? styles.currentPlayer : ''
            }`}
          >
            <span className={styles.playerName}>{player.name}</span>
            {player.isReady ? (
              <span className={styles.readyBadge}>Ready</span>
            ) : (
              <span className={styles.waitingBadge}>Waiting...</span>
            )}
          </div>
        ))}
      </div>

      {currentPlayer && !currentPlayer.isReady && onReady && (
        <button className={styles.readyButton} onClick={onReady}>
          I'm Ready
        </button>
      )}

      {canStart && allReady && onStart && (
        <button className={styles.startButton} onClick={onStart}>
          Start Game
        </button>
      )}
    </div>
  );
};

