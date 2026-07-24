import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from 'expo-linking'

export default function GalleryGridScreen() {
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(false);

  const loadGallery = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }

    setLoading(true);
    try {
      const page = await MediaLibrary.getAssetsAsync({
        first: 20,
        mediaType: MediaLibrary.MediaType.photo,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]], // newest first
      });
      setAssets(page.assets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission?.granted) {
      loadGallery();
    }
  }, [permission?.granted]);

  if (!permission) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <ThemedText>
          Grant photo library access to browse your gallery.
        </ThemedText>
        <Button title="Grant access" onPress={requestPermission} />
      </ThemedView>
    );
  }

//   open settings to grant permission
  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1, padding: 12 }}>
        <ThemedText style={{ marginBottom: 8 }}>
          {assets.length} photos · access: {permission.accessPrivileges}
        </ThemedText>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={assets}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={{ gap: 4 }}
            contentContainerStyle={{ gap: 4 }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.uri }}
                style={{ flex: 1, aspectRatio: 1, borderRadius: 4 }}
                contentFit="cover"
              />
            )}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}


/**
 * TODO: See for multiselect of images in the gallery
 * TODO: current fetching only 20 photos but want to implemnt infinite scroll to fetch more photos
 */
