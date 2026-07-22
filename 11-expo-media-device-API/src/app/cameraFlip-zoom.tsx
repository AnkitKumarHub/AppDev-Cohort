import { CameraView, useCameraPermissions, type CameraType } from "expo-camera";
import { useState } from "react";
import { Button, View, Text } from "react-native";

export default function FlipZoomScreen() {
  const [permission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [zoom, setZoom] = useState(0);

  if (!permission?.granted) return null;

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        zoom={zoom}
        mirror={facing === "front"}
      />

      <Button
        title="Flip"
        onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
      />

      <Button
        title="Zoom -"
        onPress={() => setZoom((z) => Math.max(0, z - 0.1))}
      />
      <Button
        title="Zoom +"
        onPress={() => setZoom((z) => Math.min(1, z + 0.1))}
      />

      <Text>Zoom: {(zoom * 100).toFixed(0)}%</Text>
    </View>
  );
}


/**
 * Gesture controlling 
 * Hitslop
 * react-native-gesture-handler for gesture detection have to do some research about this 
 * react native reanimated for animation
 */
