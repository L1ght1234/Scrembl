import type { Point } from '../../types/canvas.types';

/**
 * Douglas-Peucker algorithm for line simplification
 */
export class LineSimplifier {
  /**
   * Simplifies a path of points using the Douglas-Peucker algorithm
   * @param points Array of points to simplify
   * @param tolerance Distance tolerance for simplification
   * @returns Simplified array of points
   */
  static simplify(points: Point[], tolerance: number = 2.0): Point[] {
    if (points.length <= 2) {
      return points;
    }

    return this.douglasPeucker(points, tolerance);
  }

  /**
   * Downsample points by keeping every nth point
   * @param points Array of points to downsample
   * @param step Keep every nth point (e.g., step=2 keeps every 2nd point)
   * @returns Downsampled array of points
   */
  static downsample(points: Point[], step: number = 2): Point[] {
    if (step <= 1) return points;
    
    const result: Point[] = [];
    for (let i = 0; i < points.length; i += step) {
      result.push(points[i]);
    }
    
    // Always include the last point
    if (result[result.length - 1] !== points[points.length - 1]) {
      result.push(points[points.length - 1]);
    }
    
    return result;
  }

  private static douglasPeucker(points: Point[], tolerance: number): Point[] {
    if (points.length <= 2) {
      return points;
    }

    let maxDistance = 0;
    let maxIndex = 0;
    const end = points.length - 1;

    for (let i = 1; i < end; i++) {
      const distance = this.perpendicularDistance(
        points[i],
        points[0],
        points[end]
      );
      
      if (distance > maxDistance) {
        maxIndex = i;
        maxDistance = distance;
      }
    }

    if (maxDistance > tolerance) {
      const left = this.douglasPeucker(points.slice(0, maxIndex + 1), tolerance);
      const right = this.douglasPeucker(points.slice(maxIndex), tolerance);
      
      return [...left.slice(0, -1), ...right];
    } else {
      return [points[0], points[end]];
    }
  }

  private static perpendicularDistance(
    point: Point,
    lineStart: Point,
    lineEnd: Point
  ): number {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    
    if (dx === 0 && dy === 0) {
      return Math.sqrt(
        Math.pow(point.x - lineStart.x, 2) + Math.pow(point.y - lineStart.y, 2)
      );
    }

    const numerator = Math.abs(
      dy * point.x - dx * point.y + lineEnd.x * lineStart.y - lineEnd.y * lineStart.x
    );
    const denominator = Math.sqrt(dx * dx + dy * dy);
    
    return numerator / denominator;
  }
}

