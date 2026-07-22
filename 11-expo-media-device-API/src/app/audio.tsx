import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useAudioPlayer } from "expo-audio";

// const SAMPLE_URL =
//   "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

const audioSource = require("@/assets/Low Fade - Karan Aujla.mp3")

const audio = () => {
//   const player = useAudioPlayer(SAMPLE_URL, { downloadFirst: true });
  const player = useAudioPlayer(audioSource);

  return (
    <View style={{ flex: 1, justifyContent: "center", gap: 8, padding: 24 }}>
      <Button title="Play" onPress={() => player.play()} />
      <Button title="Pause" onPress={() => player.pause()} />
      <Button
        title="Replay"
        onPress={() => {
          player.seekTo(0);
          player.play();
        }}
      />
    </View>
  );
};

export default audio;

const styles = StyleSheet.create({});
