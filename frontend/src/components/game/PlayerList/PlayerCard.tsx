import React from 'react';
import type { Player } from '../../../types/player.types';
import styles from './PlayerList.module.css';

interface PlayerCardProps {
  player: Player;
  isCurrentPlayer?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isCurrentPlayer = false,
}) => {
  return (
    <div
      className={`${styles.playerCard} ${
        isCurrentPlayer ? styles.currentPlayer : ''
      }`}
    >
      <div className={styles.playerInfo}>
        <span className={styles.playerName}>{player.name}</span>
        {player.isHost && <span className={styles.hostBadge}>Host</span>}
        {player.role && (
          <span className={styles.roleBadge}>{player.role}</span>
        )}
      </div>
      <div className={styles.playerScore}>{player.score} pts</div>
    </div>
  );
};

