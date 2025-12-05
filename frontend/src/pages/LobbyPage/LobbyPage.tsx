import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RoomSettings } from './components/RoomSettings';
import { PlayerWaiting } from './components/PlayerWaiting';
import styles from './LobbyPage.module.css';

export const LobbyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  const [roomCreated, setRoomCreated] = useState(false);
  const [players, setPlayers] = useState<Array<{ id: string; name: string; isReady: boolean }>>([]);

  const handleCreateRoom = (settings: {
    roomName: string;
    maxPlayers: number;
    roundTime: number;
    rounds: number;
  }) => {
    // TODO: Implement room creation logic
    console.log('Creating room with settings:', settings);
    setRoomCreated(true);
  };

  const handleReady = () => {
    // TODO: Implement ready logic
    console.log('Player ready');
  };

  const handleStart = () => {
    // TODO: Implement start game logic
    console.log('Starting game');
  };

  if (action === 'create' && !roomCreated) {
    return (
      <div className={styles.container}>
        <RoomSettings onStart={handleCreateRoom} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PlayerWaiting
        players={players}
        currentPlayerId="current" // TODO: Get from store/context
        onReady={handleReady}
        onStart={handleStart}
        canStart={true} // TODO: Check if user is host
      />
    </div>
  );
};

