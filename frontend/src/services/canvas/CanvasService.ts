import { Point } from '../../types/canvas.types';

export class CanvasService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private currentPath: Point[] = [];

  initialize(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) {
      throw new Error('Could not get 2d context from canvas');
    }
    this.setupCanvas();
  }

  private setupCanvas(): void {
    if (!this.canvas || !this.ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  startDrawing(point: Point, color: string, lineWidth: number): void {
    if (!this.ctx) return;

    this.isDrawing = true;
    this.currentPath = [point];
    
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(point.x, point.y);
  }

  continueDrawing(point: Point): void {
    if (!this.ctx || !this.isDrawing) return;

    this.currentPath.push(point);
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
  }

  stopDrawing(): Point[] {
    this.isDrawing = false;
    const path = [...this.currentPath];
    this.currentPath = [];
    return path;
  }

  drawStroke(points: Point[], color: string, lineWidth: number): void {
    if (!this.ctx || points.length === 0) return;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }

    this.ctx.stroke();
  }

  clear(): void {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resize(): void {
    this.setupCanvas();
  }
}

