import React from 'react';
import { GameLayout } from './GameLayout';
import { Canvas } from '../../components/canvas/Canvas/Canvas';
import { DrawingTools } from '../../components/canvas/DrawingTools/DrawingTools';
import { PlayerList } from '../../components/game/PlayerList/PlayerList';
import { Chat } from '../../components/game/Chat/Chat';
import { Timer } from '../../components/game/Timer/Timer';
import { WordHint } from '../../components/game/WordHint/WordHint';
import styles from './GamePage.module.css';

export const GamePage: React.FC = () => {
  // TODO: Get game state from store/context
  const isArtist = false; // TODO: Get from state
  const showWordHint = true; // TODO: Get from state

  return (
    <div className={styles.container}>
      <GameLayout
        canvas={<Canvas />}
        playerList={<PlayerList />}
        chat={<Chat />}
        timer={<Timer />}
        wordHint={showWordHint ? <WordHint hint="_ _ _ _ _" /> : undefined}
        drawingTools={isArtist ? <DrawingTools /> : undefined}
      />
    </div>
  );
};

