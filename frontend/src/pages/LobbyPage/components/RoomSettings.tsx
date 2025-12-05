import React, { useState } from 'react';
import { Input } from '../../../components/common/Input/Input';
import { Button } from '../../../components/common/Button/Button';
import styles from './RoomSettings.module.css';

interface RoomSettingsProps {
  onStart: (settings: {
    roomName: string;
    maxPlayers: number;
    roundTime: number;
    rounds: number;
  }) => void;
  onCancel?: () => void;
}

export const RoomSettings: React.FC<RoomSettingsProps> = ({
  onStart,
  onCancel,
}) => {
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [roundTime, setRoundTime] = useState(60);
  const [rounds, setRounds] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      roomName,
      maxPlayers,
      roundTime,
      rounds,
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Room Settings</h2>
      
      <div className={styles.field}>
        <label htmlFor="roomName" className={styles.label}>
          Room Name
        </label>
        <Input
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="maxPlayers" className={styles.label}>
          Max Players: {maxPlayers}
        </label>
        <input
          id="maxPlayers"
          type="range"
          min="2"
          max="10"
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="roundTime" className={styles.label}>
          Round Time: {roundTime}s
        </label>
        <input
          id="roundTime"
          type="range"
          min="30"
          max="120"
          step="10"
          value={roundTime}
          onChange={(e) => setRoundTime(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="rounds" className={styles.label}>
          Number of Rounds: {rounds}
        </label>
        <input
          id="rounds"
          type="range"
          min="1"
          max="10"
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          Create Room
        </Button>
      </div>
    </form>
  );
};

