export interface Point {
  x: number;
  y: number;
}

export interface DrawStroke {
  points: Point[];
  color: string;
  lineWidth: number;
  timestamp: number;
}

export interface CanvasConfig {
  width: number;
  height: number;
  backgroundColor: string;
  defaultColor: string;
  defaultLineWidth: number;
  minLineWidth: number;
  maxLineWidth: number;
}

