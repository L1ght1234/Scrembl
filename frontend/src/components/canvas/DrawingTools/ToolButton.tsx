import React from 'react';
import styles from './DrawingTools.module.css';

interface ToolButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ToolButton: React.FC<ToolButtonProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={styles.toolButton}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

