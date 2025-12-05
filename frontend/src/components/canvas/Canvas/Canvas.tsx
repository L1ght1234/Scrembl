import React, { useRef, useEffect } from 'react';
import { useDrawing } from '../../../hooks/useDrawing';
import styles from './Canvas.module.css';

interface CanvasProps {
  width?: number;
  height?: number;
  onStrokeComplete?: (points: Array<{ x: number; y: number }>) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  width = 800,
  height = 600,
  onStrokeComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initialize, startDrawing, continueDrawing, stopDrawing } = useDrawing(canvasRef);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    if (canvasRef.current) {
      initialize();
    }
  }, [initialize]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    isDrawingRef.current = true;
    startDrawing({ x, y }, '#000000', 6);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    continueDrawing({ x, y });
  };

  const handleMouseUp = () => {
    if (isDrawingRef.current) {
      const points = stopDrawing();
      if (points && onStrokeComplete) {
        onStrokeComplete(points);
      }
      isDrawingRef.current = false;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

