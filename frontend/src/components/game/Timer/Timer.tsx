import React from 'react';
import { useTimer } from '../../../hooks/useTimer';
import styles from './Timer.module.css';

interface TimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialSeconds = 60,
  onComplete,
  autoStart = false,
}) => {
  const { seconds, formattedTime, isRunning, start } = useTimer(
    initialSeconds,
    onComplete
  );

  React.useEffect(() => {
    if (autoStart && !isRunning) {
      start();
    }
  }, [autoStart, isRunning, start]);

  const isLowTime = seconds <= 10;

  return (
    <div className={`${styles.container} ${isLowTime ? styles.lowTime : ''}`}>
      <div className={styles.time}>{formattedTime}</div>
      {!isRunning && seconds > 0 && (
        <button className={styles.startButton} onClick={start}>
          Start
        </button>
      )}
    </div>
  );
};

