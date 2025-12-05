import React from 'react';
import { PlayerCard } from './PlayerCard';
import type { Player } from '../../../types/player.types';
import styles from './PlayerList.module.css';

interface PlayerListProps {
  players: Player[];
  currentPlayerId?: string;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  currentPlayerId,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Players ({players.length})</h3>
      <div className={styles.list}>
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isCurrentPlayer={player.id === currentPlayerId}
          />
        ))}
      </div>
    </div>
  );
};

