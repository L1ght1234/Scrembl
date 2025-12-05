import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  logo?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Scriblio',
  logo,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {logo && (
          <img src={logo} alt="Logo" className={styles.logo} />
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
};

