import { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  PermissionsAndroid,
} from "react-native";
import { Pedometer } from "expo-sensors";

export default function Index() {
  const [sensorAvailable, setSensorAvailable] = useState<boolean | null>(null);
  const [permission, setPermission] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState<number | null>(null);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<{ remove: () => void } | null>(null);

  const startWatching = useCallback(async () => {
    setError(null);
    setCurrentStepCount(0);
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;

    // 1) Physical activity permission (Android 10+)
    const granted = await ensurePedometerPermission();
    setPermission(granted ? "granted" : "denied");
    if (!granted) {
      setError(
        "Physical activity permission denied. Tap Grant or enable it in Settings → Apps → Expo Go → Permissions.",
      );
      return;
    }

    // 2) Does this device have a step counter?
    const isAvailable = await Pedometer.isAvailableAsync();
    setSensorAvailable(isAvailable);
    if (!isAvailable) {
      setError(
        "No step counter on this device/emulator. Try a real phone — many emulators have no pedometer sensor.",
      );
      return;
    }

    // 3) Historical steps — iOS only
    if (Platform.OS === "ios") {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);
      const past = await Pedometer.getStepCountAsync(start, end);
      if (past) setPastStepCount(past.steps);
    } else {
      setPastStepCount(null);
    }

    // 4) Live steps — Android + iOS
    subscriptionRef.current = Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });
  }, []);

  useEffect(() => {
    void startWatching().catch((e) => {
      setError(e instanceof Error ? e.message : "Pedometer error");
    });

    return () => {
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
    };
  }, [startWatching]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedometer</Text>
      <Text style={styles.line}>
        Sensor available:{" "}
        {sensorAvailable === null ? "checking…" : String(sensorAvailable)}
      </Text>
      <Text style={styles.line}>Permission: {permission}</Text>
      <Text style={styles.line}>Platform: {Platform.OS}</Text>

      {Platform.OS === "ios" ? (
        <Text style={styles.line}>
          Steps in last 24h: {pastStepCount ?? "…"}
        </Text>
      ) : (
        <Text style={styles.line}>
          Last 24h steps: n/a on Android (expo-sensors) — live watch only
        </Text>
      )}

      <Text style={styles.live}>Live steps this session: {currentStepCount}</Text>
      <Text style={styles.hint}>
        Walk with the app open. On Android, allow “Physical activity”.
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.actions}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            void startWatching().catch((e) => {
              setError(e instanceof Error ? e.message : "Retry failed");
            });
          }}
        >
          <Text style={styles.btnTextDark}>Grant / Retry</Text>
        </Pressable>

        <Pressable
          style={styles.btnSecondary}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.btnTextLight}>Open Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * Android: PermissionsAndroid shows the real ACTIVITY_RECOGNITION dialog.
 * Pedometer.requestPermissionsAsync often fails to prompt in Expo Go.
 * iOS: Pedometer.requestPermissionsAsync (Motion & Fitness).
 */
async function ensurePedometerPermission(): Promise<boolean> {
  if (Platform.OS === "android") {
    const already = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
    );
    if (already) return true;

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: "Step counter permission",
        message:
          "Allow Physical activity so the app can count your steps while you walk.",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      },
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  const { granted } = await Pedometer.requestPermissionsAsync();
  return granted;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#0b1220",
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  line: {
    color: "#e2e8f0",
    textAlign: "center",
  },
  live: {
    color: "#22d3ee",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  hint: {
    color: "#64748b",
    fontSize: 13,
    textAlign: "center",
  },
  error: {
    color: "#fbbf24",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  btn: {
    backgroundColor: "#22d3ee",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  btnSecondary: {
    backgroundColor: "#1e293b",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  btnTextDark: {
    color: "#0f172a",
    fontWeight: "700",
  },
  btnTextLight: {
    color: "#e2e8f0",
    fontWeight: "700",
  },
});
