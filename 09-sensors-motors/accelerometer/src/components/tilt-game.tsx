import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccelerometer } from "@/hooks/use-accelerometer";
import {
  BALL_SIZE,
  DIFFICULTIES,
  DIFFICULTY,
  type Difficulty,
} from "@/utils/tilt-game-config";
import {
  accelerationMagnitude,
  circlesOverlap,
  clampBallCenter,
  formatTime,
  randomTargetPosition,
  tiltToOffset,
  type Point,
} from "@/utils/tilt-math";

type GameStatus = "ready" | "playing" | "paused" | "finished";

export function TiltGame() {
  const insets = useSafeAreaInsets();
  const { available, x, y, z } = useAccelerometer();

  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [status, setStatus] = useState<GameStatus>("ready");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(
    DIFFICULTY.normal.roundSeconds,
  );
  const [playSize, setPlaySize] = useState({ width: 0, height: 0 });
  const [target, setTarget] = useState<Point | null>(null);
  const [justScored, setJustScored] = useState(false);

  const config = DIFFICULTY[difficulty];
  const ballRadius = BALL_SIZE / 2;
  const targetRadius = config.targetSize / 2;
  const magnitude = accelerationMagnitude(x, y, z);

  const ballCenter = useMemo(() => {
    if (playSize.width === 0 || playSize.height === 0) {
      return { x: 0, y: 0 };
    }

    const centerX = playSize.width / 2;
    const centerY = playSize.height / 2;
    const { offsetX, offsetY } = tiltToOffset(x, y, config.sensitivity);

    return clampBallCenter(
      centerX + offsetX,
      centerY + offsetY,
      ballRadius,
      playSize.width,
      playSize.height,
    );
  }, [x, y, playSize, config.sensitivity, ballRadius]);

  const spawnTarget = useCallback(
    (avoid: Point) => {
      if (playSize.width === 0 || playSize.height === 0) return;
      setTarget(
        randomTargetPosition(
          playSize.width,
          playSize.height,
          targetRadius,
          avoid.x,
          avoid.y,
          BALL_SIZE + config.targetSize,
        ),
      );
    },
    [playSize, targetRadius, config.targetSize],
  );

  const onPlayLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setPlaySize({ width, height });
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setSecondsLeft(config.roundSeconds);
    setStatus("playing");
    setJustScored(false);
    const start = {
      x: playSize.width / 2 || 0,
      y: playSize.height / 2 || 0,
    };
    spawnTarget(start);
  };

  const resetGame = () => {
    setStatus("ready");
    setScore(0);
    setStreak(0);
    setSecondsLeft(config.roundSeconds);
    setTarget(null);
    setJustScored(false);
  };

  const togglePause = () => {
    if (status === "playing") setStatus("paused");
    else if (status === "paused") setStatus("playing");
  };

  // Countdown while playing
  useEffect(() => {
    if (status !== "playing") return;

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [status]);

  // Track best score when a round ends
  useEffect(() => {
    if (status === "finished") {
      setBestScore((prev) => Math.max(prev, score));
    }
  }, [status, score]);

  // Collect target when ball overlaps it
  useEffect(() => {
    if (status !== "playing" || !target) return;

    const hit = circlesOverlap(
      ballCenter.x,
      ballCenter.y,
      ballRadius,
      target.x,
      target.y,
      targetRadius,
    );

    if (!hit) return;

    const points = (1 + streak) * config.scoreMultiplier;
    setScore((prev) => prev + points);
    setStreak((prev) => {
      const next = prev + 1;
      setBestStreak((best) => Math.max(best, next));
      return next;
    });
    setJustScored(true);
    spawnTarget(ballCenter);

    const flash = setTimeout(() => setJustScored(false), 180);
    return () => clearTimeout(flash);
  }, [
    ballCenter,
    target,
    status,
    ballRadius,
    targetRadius,
    streak,
    config.scoreMultiplier,
    spawnTarget,
  ]);

  // Respawn target once the play area is measured
  useEffect(() => {
    if (
      status === "playing" &&
      !target &&
      playSize.width > 0 &&
      playSize.height > 0
    ) {
      spawnTarget({
        x: playSize.width / 2,
        y: playSize.height / 2,
      });
    }
  }, [status, target, playSize, spawnTarget]);

  const statusLabel =
    status === "ready"
      ? "Tilt to aim · press Start"
      : status === "playing"
        ? "Collect the amber targets"
        : status === "paused"
          ? "Paused"
          : "Time's up!";

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.title}>Tilt the Ball</Text>
      <Text style={styles.subtitle}>{statusLabel}</Text>

      <View style={styles.statsRow}>
        <Stat label="Score" value={String(score)} accent={justScored} />
        <Stat label="Time" value={formatTime(secondsLeft)} />
        <Stat label="Streak" value={String(streak)} />
        <Stat label="Best" value={String(bestScore)} />
      </View>

      <View style={styles.difficultyRow}>
        {DIFFICULTIES.map((level) => {
          const active = difficulty === level;
          return (
            <Pressable
              key={level}
              disabled={status === "playing"}
              onPress={() => {
                setDifficulty(level);
                setSecondsLeft(DIFFICULTY[level].roundSeconds);
              }}
              style={[
                styles.difficultyChip,
                active && styles.difficultyChipActive,
                status === "playing" && styles.difficultyChipDisabled,
              ]}
            >
              <Text
                style={[
                  styles.difficultyText,
                  active && styles.difficultyTextActive,
                ]}
              >
                {DIFFICULTY[level].label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.sensorBox}>
        <Text style={styles.sensorTitle}>Accelerometer (g)</Text>
        <Text style={styles.sensorLine}>x: {x.toFixed(2)}</Text>
        <Text style={styles.sensorLine}>y: {y.toFixed(2)}</Text>
        <Text style={styles.sensorLine}>z: {z.toFixed(2)}</Text>
        <Text style={styles.sensorLine}>|a|: {magnitude.toFixed(2)}</Text>
        <Text style={styles.sensorHint}>
          Flat on table → z ≈ 1. Tilt left/right → x. Tilt forward/back → y.
          Collect amber orbs before time runs out. Streak multiplies points.
        </Text>
        {available === false && (
          <Text style={styles.warning}>
            Accelerometer unavailable on this device / simulator.
          </Text>
        )}
      </View>

      <View
        style={[styles.playBox, justScored && styles.playBoxFlash]}
        onLayout={onPlayLayout}
      >
        {target && (status === "playing" || status === "paused") && (
          <View
            style={[
              styles.target,
              {
                width: config.targetSize,
                height: config.targetSize,
                borderRadius: targetRadius,
                left: target.x - targetRadius,
                top: target.y - targetRadius,
              },
            ]}
          />
        )}

        {playSize.width > 0 && (
          <View
            style={[
              styles.ball,
              justScored && styles.ballFlash,
              {
                left: ballCenter.x - ballRadius,
                top: ballCenter.y - ballRadius,
              },
            ]}
          />
        )}

        {status === "finished" && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Round over</Text>
            <Text style={styles.overlayBody}>
              Score {score} · Best streak {bestStreak}
            </Text>
          </View>
        )}

        {status === "ready" && playSize.width > 0 && (
          <View style={styles.overlay}>
            <Text style={styles.overlayBody}>Press Start, then tilt</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        {(status === "ready" || status === "finished") && (
          <Pressable style={styles.primaryBtn} onPress={startGame}>
            <Text style={styles.primaryBtnText}>
              {status === "finished" ? "Play again" : "Start"}
            </Text>
          </Pressable>
        )}

        {(status === "playing" || status === "paused") && (
          <>
            <Pressable style={styles.secondaryBtn} onPress={togglePause}>
              <Text style={styles.secondaryBtnText}>
                {status === "paused" ? "Resume" : "Pause"}
              </Text>
            </Pressable>
            <Pressable style={styles.secondaryBtn} onPress={resetGame}>
              <Text style={styles.secondaryBtnText}>Reset</Text>
            </Pressable>
          </>
        )}
      </View>

      <Text style={styles.footer}>
        Tip: hold the phone upright and tilt gently — hard mode is faster &
        smaller targets.
      </Text>
    </View>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, accent && styles.statValueAccent]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0b1220",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  stat: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  statLabel: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statValue: {
    color: "#e2e8f0",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 2,
    fontFamily: "monospace",
  },
  statValueAccent: {
    color: "#fbbf24",
  },
  difficultyRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  difficultyChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#111827",
    alignItems: "center",
  },
  difficultyChipActive: {
    borderColor: "#38bdf8",
    backgroundColor: "#0c4a6e",
  },
  difficultyChipDisabled: {
    opacity: 0.55,
  },
  difficultyText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },
  difficultyTextActive: {
    color: "#e0f2fe",
  },
  sensorBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  sensorTitle: {
    color: "#38bdf8",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  sensorLine: {
    color: "#e2e8f0",
    fontSize: 15,
    fontFamily: "monospace",
  },
  sensorHint: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 8,
    lineHeight: 17,
  },
  warning: {
    color: "#fbbf24",
    marginTop: 8,
    fontSize: 13,
  },
  playBox: {
    flex: 1,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#334155",
    backgroundColor: "#111827",
    overflow: "hidden",
    position: "relative",
  },
  playBoxFlash: {
    borderColor: "#fbbf24",
  },
  ball: {
    position: "absolute",
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: "#22d3ee",
  },
  ballFlash: {
    backgroundColor: "#fde047",
  },
  target: {
    position: "absolute",
    backgroundColor: "#f59e0b",
    borderWidth: 2,
    borderColor: "#fde68a",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    paddingHorizontal: 16,
  },
  overlayTitle: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "700",
  },
  overlayBody: {
    color: "#cbd5e1",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#38bdf8",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});

//translate properties in css
//also can play with other cos, sin value
//TODO: there will be multiple ball and if blue ball touches yellow ball then you will get coins
//TODO: also can add a timer and if you don't touch the ball for 10 seconds then you will lose the game
//TODO: also can add a score and if you touch the ball then you will get 1 point
//TODO: also can add a high score and if you touch the ball then you will get 1 point
//TODO: also can add a sound and if you touch the ball then you will get 1 point
//TODO: also can add a music and if you touch the ball then you will get 1 point
//TODO: also can add a sound and if you touch the ball then you will get 1 point
//TODO: also can add a sound and if you touch the ball then you will get 1 point
