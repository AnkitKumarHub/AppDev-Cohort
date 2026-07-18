export type Difficulty = "easy" | "normal" | "hard";

export type DifficultyConfig = {
  label: string;
  /** How far tilt moves the ball (pixels per g). */
  sensitivity: number;
  targetSize: number;
  roundSeconds: number;
  /** Extra points multiplier when collecting. */
  scoreMultiplier: number;
};

export const DIFFICULTY: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: "Easy",
    sensitivity: 140,
    targetSize: 36,
    roundSeconds: 60,
    scoreMultiplier: 1,
  },
  normal: {
    label: "Normal",
    sensitivity: 180,
    targetSize: 28,
    roundSeconds: 45,
    scoreMultiplier: 2,
  },
  hard: {
    label: "Hard",
    sensitivity: 220,
    targetSize: 22,
    roundSeconds: 30,
    scoreMultiplier: 3,
  },
};

export const BALL_SIZE = 40;
export const DIFFICULTIES: Difficulty[] = ["easy", "normal", "hard"];
