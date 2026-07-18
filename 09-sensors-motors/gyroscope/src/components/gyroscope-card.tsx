import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useGyroscope } from "@/hooks/use-gyroscope";
import {
  axisActivity,
  clamp,
  gyroToCardTilt,
  lerp,
  radPerSecToDeg,
  rotationMagnitude,
} from "@/utils/gyro-math";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 180;
const SENSITIVITY = 14;
const SPIN_HAPTIC_THRESHOLD = 1.8; // rad/s — strong twist
const HAPTIC_COOLDOWN_MS = 450;

type Sensitivity = "soft" | "normal" | "snappy";

const SENSITIVITY_MAP: Record<Sensitivity, number> = {
  soft: 9,
  normal: SENSITIVITY,
  snappy: 20,
};

export function GyroscopeCard() {
  const insets = useSafeAreaInsets();
  const { available, x, y, z } = useGyroscope(32);

  const [feel, setFeel] = useState<Sensitivity>("normal");
  const [hapticsOn, setHapticsOn] = useState(true);
  const [spinCount, setSpinCount] = useState(0);
  const [peakSpin, setPeakSpin] = useState(0);

  // Smoothed tilt so the card doesn't jitter
  const [smoothX, setSmoothX] = useState(0);
  const [smoothY, setSmoothY] = useState(0);
  const lastHapticAt = useRef(0);

  const magnitude = rotationMagnitude(x, y, z);
  const sensitivity = SENSITIVITY_MAP[feel];

  useEffect(() => {
    setSmoothX((prev) => lerp(prev, x, 0.35));
    setSmoothY((prev) => lerp(prev, y, 0.35));
  }, [x, y]);

  const { rotateX, rotateY } = useMemo(
    () => gyroToCardTilt(smoothX, smoothY, sensitivity),
    [smoothX, smoothY, sensitivity],
  );

  // Shine slides across the card with tilt
  const shineX = clamp(50 + rotateY * 1.4, 10, 90);
  const shineY = clamp(40 - rotateX * 1.2, 10, 80);

  // Haptic pulse on a strong spin (twist around Z is common)
  useEffect(() => {
    if (!hapticsOn || available === false) return;
    if (magnitude < SPIN_HAPTIC_THRESHOLD) return;

    const now = Date.now();
    if (now - lastHapticAt.current < HAPTIC_COOLDOWN_MS) return;

    lastHapticAt.current = now;
    setSpinCount((n) => n + 1);
    setPeakSpin((prev) => Math.max(prev, magnitude));

    void Haptics.impactAsync(
      magnitude > 3
        ? Haptics.ImpactFeedbackStyle.Heavy
        : Haptics.ImpactFeedbackStyle.Medium,
    );
  }, [magnitude, hapticsOn, available]);

  // Track session peak even without haptic
  useEffect(() => {
    setPeakSpin((prev) => Math.max(prev, magnitude));
  }, [magnitude]);

  const activityX = axisActivity(x);
  const activityY = axisActivity(y);
  const activityZ = axisActivity(z);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.title}>3D Card (Gyroscope)</Text>
      <Text style={styles.subtitle}>
        Rotate the phone slowly — the card tilts with your spin. Stop moving and
        it flattens. Strong twists trigger haptic feedback.
      </Text>

      <View style={styles.statsRow}>
        <Stat label="|ω|" value={magnitude.toFixed(2)} />
        <Stat label="°/s" value={radPerSecToDeg(magnitude).toFixed(0)} />
        <Stat label="Spins" value={String(spinCount)} />
        <Stat label="Peak" value={peakSpin.toFixed(2)} />
      </View>

      <View style={styles.sensorBox}>
        <Text style={styles.sensorTitle}>Gyroscope (rad/s)</Text>
        <AxisMeter label="x" value={x} activity={activityX} color="#38bdf8" />
        <AxisMeter label="y" value={y} activity={activityY} color="#a78bfa" />
        <AxisMeter label="z" value={z} activity={activityZ} color="#f472b6" />
        <Text style={styles.sensorHint}>
          Still phone → near 0. Twist (yaw) → z. Tilt forward/back or left/right →
          x / y. Units are radians per second (how fast you rotate).
        </Text>
      </View>

      {available === false && (
        <Text style={styles.warning}>
          Gyroscope not available on this device / simulator.
        </Text>
      )}

      <View style={styles.controls}>
        {(["soft", "normal", "snappy"] as Sensitivity[]).map((level) => {
          const active = feel === level;
          return (
            <Pressable
              key={level}
              onPress={() => setFeel(level)}
              style={[styles.chipBtn, active && styles.chipBtnActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {level}
              </Text>
            </Pressable>
          );
        })}

        <Pressable
          onPress={() => {
            setHapticsOn((on) => !on);
            void Haptics.selectionAsync();
          }}
          style={[styles.chipBtn, hapticsOn && styles.chipBtnHaptic]}
        >
          <Text style={[styles.chipText, hapticsOn && styles.chipTextActive]}>
            haptics {hapticsOn ? "on" : "off"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.stage}>
        <View
          style={[
            styles.cardShadow,
            {
              transform: [
                { perspective: 1000 },
                { rotateX: `${rotateX}deg` },
                { rotateY: `${rotateY}deg` },
              ],
            },
          ]}
        >
          <View style={styles.card}>
            <View
              style={[
                styles.shine,
                {
                  left: `${shineX}%`,
                  top: `${shineY}%`,
                },
              ]}
            />
            <View style={styles.chip} />
            <Text style={styles.brand}>CHAICODE</Text>
            <Text style={styles.number}>4921 8834 1209 5502</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.name}>Sensors Lab</Text>
              <Text style={styles.tiltBadge}>
                {rotateX.toFixed(0)}° / {rotateY.toFixed(0)}°
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>
        Card tilt uses smoothed gyro: rotateX = y × {sensitivity}, rotateY = -x
        × {sensitivity}. Haptics fire when |ω| ≥ {SPIN_HAPTIC_THRESHOLD}.
      </Text>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function AxisMeter({
  label,
  value,
  activity,
  color,
}: {
  label: string;
  value: number;
  activity: number;
  color: string;
}) {
  return (
    <View style={styles.axisRow}>
      <Text style={styles.axisLabel}>
        {label}: {value.toFixed(2)}
      </Text>
      <View style={styles.meterTrack}>
        <View
          style={[
            styles.meterFill,
            { width: `${activity * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#09090f",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: "#f4f4f5",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#a1a1aa",
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
    backgroundColor: "#18181b",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#27272a",
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  statLabel: {
    color: "#71717a",
    fontSize: 11,
    fontWeight: "600",
  },
  statValue: {
    color: "#e4e4e7",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
    fontFamily: "monospace",
  },
  sensorBox: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  sensorTitle: {
    color: "#a78bfa",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  axisRow: {
    marginBottom: 8,
  },
  axisLabel: {
    color: "#e4e4e7",
    fontSize: 15,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  meterTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#27272a",
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: 999,
  },
  sensorHint: {
    color: "#71717a",
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  warning: {
    color: "#fbbf24",
    marginTop: 8,
    fontSize: 13,
  },
  controls: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  chipBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#27272a",
    backgroundColor: "#111113",
  },
  chipBtnActive: {
    borderColor: "#a78bfa",
    backgroundColor: "#2e1065",
  },
  chipBtnHaptic: {
    borderColor: "#f472b6",
    backgroundColor: "#4a044e",
  },
  chipText: {
    color: "#a1a1aa",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  chipTextActive: {
    color: "#fafafa",
  },
  stage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardShadow: {
    shadowColor: "#a78bfa",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: "#5b21b6",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    padding: 24,
  },
  shine: {
    position: "absolute",
    width: 120,
    height: 120,
    marginLeft: -60,
    marginTop: -60,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  chip: {
    width: 40,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#fbbf24",
    marginBottom: 20,
  },
  brand: {
    color: "#fafafa",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "right",
    marginTop: -40,
  },
  number: {
    color: "#fafafa",
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 36,
    fontWeight: "600",
  },
  cardFooter: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },
  tiltBadge: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    fontFamily: "monospace",
  },
  footer: {
    color: "#71717a",
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
  },
});
