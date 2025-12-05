import { CanvasConfig } from '../types/canvas.types';

export const CANVAS_CONFIG: CanvasConfig = {
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  defaultColor: '#000000',
  defaultLineWidth: 6,
  minLineWidth: 2,
  maxLineWidth: 32,
} as const;

export const getCanvasConfig = (): CanvasConfig => {
  return { ...CANVAS_CONFIG };
};

