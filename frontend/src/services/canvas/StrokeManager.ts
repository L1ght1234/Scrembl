import { Point } from '../../types/canvas.types';

export interface Stroke {
  points: Point[];
  color: string;
  lineWidth: number;
  timestamp: number;
}

export class StrokeManager {
  private strokes: Stroke[] = [];
  private batchSize: number;
  private batchDelay: number;
  private batchTimer: NodeJS.Timeout | null = null;
  private pendingStroke: Partial<Stroke> | null = null;

  constructor(batchSize: number = 10, batchDelay: number = 50) {
    this.batchSize = batchSize;
    this.batchDelay = batchDelay;
  }

  addPoint(point: Point, color: string, lineWidth: number): void {
    if (!this.pendingStroke) {
      this.pendingStroke = {
        points: [],
        color,
        lineWidth,
        timestamp: Date.now(),
      };
    }

    this.pendingStroke.points.push(point);

    if (this.pendingStroke.points.length >= this.batchSize) {
      this.flushBatch();
    } else {
      this.scheduleBatch();
    }
  }

  completeStroke(): Stroke | null {
    if (!this.pendingStroke || this.pendingStroke.points.length === 0) {
      return null;
    }

    const stroke: Stroke = {
      points: this.pendingStroke.points,
      color: this.pendingStroke.color!,
      lineWidth: this.pendingStroke.lineWidth!,
      timestamp: this.pendingStroke.timestamp!,
    };

    this.pendingStroke = null;
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    return stroke;
  }

  private scheduleBatch(): void {
    if (this.batchTimer) return;

    this.batchTimer = setTimeout(() => {
      this.flushBatch();
    }, this.batchDelay);
  }

  private flushBatch(): void {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    // Batch is handled by completeStroke
    // This method can be used to send intermediate batches if needed
  }

  getAllStrokes(): Stroke[] {
    return [...this.strokes];
  }

  clear(): void {
    this.strokes = [];
    this.pendingStroke = null;
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
  }
}

