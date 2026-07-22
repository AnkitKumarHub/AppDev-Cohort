import { StyleSheet, Text, View, Button } from "react-native";
import React, { useRef, useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false); // Camera is ready to take photos and we are tracking because cant click photos before camera is ready
  const cameraRef = useRef<CameraView>(null);  // for persisting the old value we use useRef 
  const [photoUri, setPhotoUri] = useState <string | null> (null);

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

  const takePhoto = async()=>{
    const photo = await cameraRef.current?.takePictureAsync({quality: 1})
    if(photo?.uri) setPhotoUri(photo.uri); // set the photo uri to the state
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        onCameraReady={() => setReady(true)}
        onMountError={({ message }) => console.warn(message)}
      />

      <Button title="Take Photo" onPress={takePhoto} disabled={!ready}/>
      {photoUri && (
        <Image source={{uri: photoUri}} 
        style={{height: 200 }}
        contentFit = "cover"
        />
      )}

      <ThemedText style={{ padding: 12 }}>
        {ready ? "camera ready" : "starting camera..."}
      </ThemedText>
    </ThemedView>
  );
};

export default Camera;

const styles = StyleSheet.create({});
