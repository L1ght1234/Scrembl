import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button/Button';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/lobby?action=create');
  };

  const handleJoinRoom = () => {
    navigate('/lobby?action=join');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Scriblio</h1>
        <p className={styles.subtitle}>
          Draw, guess, and have fun with friends!
        </p>
        <div className={styles.actions}>
          <Button onClick={handleCreateRoom} variant="primary" size="large">
            Create Room
          </Button>
          <Button onClick={handleJoinRoom} variant="secondary" size="large">
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

