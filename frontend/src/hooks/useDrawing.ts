import { useRef, useCallback } from 'react';
import { CanvasService } from '../services/canvas/CanvasService';
import { StrokeManager } from '../services/canvas/StrokeManager';
import { LineSimplifier } from '../services/canvas/LineSimplifier';
import { Point } from '../types/canvas.types';

export const useDrawing = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const canvasServiceRef = useRef<CanvasService | null>(null);
  const strokeManagerRef = useRef<StrokeManager | null>(null);
  const isDrawingRef = useRef(false);

  const initialize = useCallback(() => {
    if (!canvasRef.current) return;

    const service = new CanvasService();
    service.initialize(canvasRef.current);
    canvasServiceRef.current = service;

    const manager = new StrokeManager(10, 50);
    strokeManagerRef.current = manager;
  }, [canvasRef]);

  const startDrawing = useCallback((point: Point, color: string, lineWidth: number) => {
    if (!canvasServiceRef.current) return;

    isDrawingRef.current = true;
    canvasServiceRef.current.startDrawing(point, color, lineWidth);
  }, []);

  const continueDrawing = useCallback((point: Point) => {
    if (!canvasServiceRef.current || !isDrawingRef.current) return;
    canvasServiceRef.current.continueDrawing(point);
  }, []);

  const stopDrawing = useCallback((): Point[] | null => {
    if (!canvasServiceRef.current || !isDrawingRef.current) return null;

    isDrawingRef.current = false;
    return canvasServiceRef.current.stopDrawing();
  }, []);

  const drawStroke = useCallback((points: Point[], color: string, lineWidth: number) => {
    if (!canvasServiceRef.current) return;

    const simplified = LineSimplifier.simplify(points, 2.0);
    canvasServiceRef.current.drawStroke(simplified, color, lineWidth);
  }, []);

  const clearCanvas = useCallback(() => {
    if (!canvasServiceRef.current) return;
    canvasServiceRef.current.clear();
  }, []);

  const resizeCanvas = useCallback(() => {
    if (!canvasServiceRef.current) return;
    canvasServiceRef.current.resize();
  }, []);

  return {
    initialize,
    startDrawing,
    continueDrawing,
    stopDrawing,
    drawStroke,
    clearCanvas,
    resizeCanvas,
  };
};

