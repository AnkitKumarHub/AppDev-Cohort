import { Text, View, Button } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

const SAMPLE_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function PlaybackStatusScreen() {
  const player = useAudioPlayer(SAMPLE_URL, { downloadFirst: true });
  const status = useAudioPlayerStatus(player);

  const toggle = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", gap: 12, padding: 24 }}>
      <ThemedText>
        {status.playing ? "Playing" : "Paused"} ·{" "}
        {formatTime(status.currentTime)} / {formatTime(status.duration)}
      </ThemedText>

      <Button title={status.playing ? "Pause" : "Play"} onPress={toggle} />

      {status.didJustFinish && <ThemedText>Track finished.</ThemedText>}
    </ThemedView>
  );
}
