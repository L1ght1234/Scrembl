import { useRef, useCallback } from 'react';
import { CanvasService } from '../../../services/canvas/CanvasService';
import { Point } from '../../../types/canvas.types';

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvasServiceRef = useRef<CanvasService | null>(null);

  const initialize = useCallback(() => {
    if (!canvasRef.current) return;

    const service = new CanvasService();
    service.initialize(canvasRef.current);
    canvasServiceRef.current = service;
  }, [canvasRef]);

  const drawPoint = useCallback((point: Point, color: string, lineWidth: number) => {
    if (!canvasServiceRef.current) return;
    canvasServiceRef.current.startDrawing(point, color, lineWidth);
  }, []);

  const clear = useCallback(() => {
    if (!canvasServiceRef.current) return;
    canvasServiceRef.current.clear();
  }, []);

  return {
    initialize,
    drawPoint,
    clear,
    canvasService: canvasServiceRef.current,
  };
};

