/** Keep a value inside [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Euclidean distance between two points. */
export function distanceBetween(
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

/** True when two circles overlap (center + radius). */
export function circlesOverlap(
  ax: number,
  ay: number,
  ar: number,
  bx: number,
  by: number,
  br: number,
): boolean {
  return distanceBetween(ax, ay, bx, by) <= ar + br;
}

/** Ignore tiny accelerometer noise under the deadzone. */
export function applyDeadzone(value: number, deadzone = 0.05): number {
  return Math.abs(value) < deadzone ? 0 : value;
}

/**
 * Map tilt (g) to a pixel offset from the play-area center.
 * Invert Y so tilting the top of the phone forward moves the ball down.
 */
export function tiltToOffset(
  x: number,
  y: number,
  sensitivity: number,
): { offsetX: number; offsetY: number } {
  return {
    offsetX: applyDeadzone(x) * sensitivity,
    offsetY: applyDeadzone(-y) * sensitivity,
  };
}

/** Clamp ball center so it stays fully inside the play box. */
export function clampBallCenter(
  centerX: number,
  centerY: number,
  ballRadius: number,
  width: number,
  height: number,
): { x: number; y: number } {
  return {
    x: clamp(centerX, ballRadius, Math.max(ballRadius, width - ballRadius)),
    y: clamp(centerY, ballRadius, Math.max(ballRadius, height - ballRadius)),
  };
}

export type Point = { x: number; y: number };

/** Spawn a target away from the ball so it isn't instantly collected. */
export function randomTargetPosition(
  width: number,
  height: number,
  targetRadius: number,
  avoidX: number,
  avoidY: number,
  minDistance: number,
): Point {
  const padding = targetRadius + 8;
  let x = width / 2;
  let y = height / 2;

  for (let attempt = 0; attempt < 24; attempt++) {
    x = padding + Math.random() * Math.max(0, width - padding * 2);
    y = padding + Math.random() * Math.max(0, height - padding * 2);
    if (distanceBetween(x, y, avoidX, avoidY) >= minDistance) {
      return { x, y };
    }
  }

  return { x, y };
}

/** Magnitude of the acceleration vector (≈1g when flat / at rest). */
export function accelerationMagnitude(x: number, y: number, z: number): number {
  return Math.sqrt(x * x + y * y + z * z);
}

/** Format seconds as m:ss. */
export function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
