/** Keep a value inside [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Ignore tiny sensor noise under the deadzone. */
export function applyDeadzone(value: number, deadzone = 0.04): number {
  return Math.abs(value) < deadzone ? 0 : value;
}

/** Magnitude of the rotation-rate vector (rad/s). */
export function rotationMagnitude(x: number, y: number, z: number): number {
  return Math.sqrt(x * x + y * y + z * z);
}

/** Convert radians/sec → degrees/sec for display. */
export function radPerSecToDeg(radPerSec: number): number {
  return radPerSec * (180 / Math.PI);
}

/**
 * Map gyro rates (rad/s) to card tilt angles (deg).
 * Clamped so the card never flips wildly.
 */
export function gyroToCardTilt(
  x: number,
  y: number,
  sensitivity: number,
  maxTilt = 28,
): { rotateX: number; rotateY: number } {
  return {
    rotateX: clamp(applyDeadzone(y) * sensitivity, -maxTilt, maxTilt),
    rotateY: clamp(applyDeadzone(-x) * sensitivity, -maxTilt, maxTilt),
  };
}

/** 0–1 activity level for an axis meter. */
export function axisActivity(value: number, fullScale = 2.5): number {
  return clamp(Math.abs(value) / fullScale, 0, 1);
}

/** Smooth toward a target (simple low-pass filter). */
export function lerp(current: number, target: number, amount: number): number {
  return current + (target - current) * amount;
}
