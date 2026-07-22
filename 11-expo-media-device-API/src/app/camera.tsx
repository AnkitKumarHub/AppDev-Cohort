import { StyleSheet, Text, View, Button } from "react-native";
import React, { useRef, useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
  type BarcodeScanningResult,
} from "expo-camera";
import { Image } from "expo-image";

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false); // Camera is ready to take photos and we are tracking because cant click photos before camera is ready
  const cameraRef = useRef<CameraView>(null); // for persisting the old value we use useRef
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [videoUri, setVideoUri] = useState<string | null>(null); // for storing the video uri
  const [recording, setRecording] = useState(false); // for tracking the recording state

  const [result, setResult] = useState<BarcodeScanningResult | null>(null);
  const lastscanned = useRef<string | null>(null); // for storing the last scanned barcode

  if (!permission) return <ThemedText>No access to camera</ThemedText>;
  if (!permission.granted) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}
      >
        <ThemedText style={{ fontSize: 18, fontWeight: "600" }}>
          Camera access
        </ThemedText>
        <ThemedText>We need camera access to take a photo.</ThemedText>
        <Button title="Grant camera access" onPress={requestPermission} />
      </ThemedView>
    );
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 1 });
    if (photo?.uri) setPhotoUri(photo.uri); // set the photo uri to the state
  };

  const startRecording = async () => {
    if (!micPermission?.granted) {
      const result = await requestMicPermission();
      if (!result?.granted) return;
    }

    setRecording(true);
    const video = await cameraRef.current?.recordAsync({ maxDuration: 15 });
    setVideoUri(video?.uri ?? null);
    setRecording(false);
  };

  const stopRecording = async () => {
    cameraRef.current?.stopRecording();
  };

  const onBarCodeScanned = (scan: BarcodeScanningResult) => {
    if (lastscanned.current === scan.data) return;
    lastscanned.current = scan.data;
    setResult(scan);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        // mode="video"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={onBarCodeScanned}
        onCameraReady={() => setReady(true)}
        onMountError={({ message }) => console.warn(message)}
      />

      {/* <Button title="Take Photo" onPress={takePhoto} disabled={!ready}/>
      {photoUri && (
        <Image source={{uri: photoUri}} 
        style={{height: 200 }}
        contentFit = "cover"
        />
      )} */}

      {/* <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        disabled={!ready}
        onPress={recording ? stopRecording : startRecording}
      /> */}

      {/* {videoUri && <ThemedText selectable>{videoUri}</ThemedText>} */}

      {/* Display the result of the barcode scanning */}
      {result && <ThemedText selectable>{result.data}</ThemedText>}

      <ThemedText style={{ padding: 12 }}>
        {ready ? "camera ready" : "starting camera..."}
      </ThemedText>
    </ThemedView>
  );
};

export default Camera;

const styles = StyleSheet.create({});
