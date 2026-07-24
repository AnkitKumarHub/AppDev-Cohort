import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as MediaLibrary from 'expo-media-library';
import { ActivityIndicator, Button, Linking, Text, View } from 'react-native';

export default function GalleryPermissionScreen() {
  const [permission, requestPermission] = MediaLibrary.usePermissions(); // check if the user has granted permission to access the media library

  if (!permission) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <ThemedText>Checking media library permission…</ThemedText>
      </ThemedView>
    );
  }

  if (!permission.granted) {
    const deniedPermanently = !permission.canAskAgain;

    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
        <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>Photo library access</ThemedText>
        <ThemedText>
          We need access to show your photos and videos inside the app.
        </ThemedText>

        {deniedPermanently ? (
          <>
            <ThemedText>Access was denied. Enable it in Settings.</ThemedText>
            <Button title="Open Settings" onPress={() => Linking.openSettings()} />
          </>
        ) : (
          <Button title="Grant access" onPress={requestPermission} />
        )}
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <ThemedText>Access level: {permission.accessPrivileges ?? 'unknown'}</ThemedText>
      <ThemedText>Permission granted — mount your gallery grid here.</ThemedText>
    </ThemedView>
  );
}


/**
 * For Android:
 * Access Level: ALL
 * Permission Granted - mount your gallery grid here.
 */