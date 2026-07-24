import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable
} from 'react-native';

export default function AssetFileAccessScreen() {
  const [permission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [selected, setSelected] = useState<MediaLibrary.AssetInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    if (!permission?.granted) return;

    MediaLibrary.getAssetsAsync({
      first: 9,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
    }).then((page) => setAssets(page.assets));
  }, [permission?.granted]);

  const openAsset = async (asset: MediaLibrary.Asset) => {
    setLoadingInfo(true);
    try {
      const info = await MediaLibrary.getAssetInfoAsync(asset, {
        shouldDownloadFromNetwork: true, // download iCloud photos on iOS
      });
      setSelected(info);
    } catch (error) {
      Alert.alert(
        'Could not read file',
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      setLoadingInfo(false);
    }
  };

  const useFile = () => {
    if (!selected?.localUri) {
      Alert.alert('No local file', 'localUri is not available yet. Try again or check iCloud download.');
      return;
    }

    // Example: upload, share, or read with expo-file-system
    Alert.alert('File ready', selected.localUri);
  };

  if (!permission?.granted) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <ThemedText>Grant media library access first.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, padding: 12, gap: 12 }}>
      <ThemedText style={{ fontWeight: '600' }}>Tap a photo to get its file path</ThemedText>

      <ThemedView style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
        {assets.map((asset) => (
          <Pressable key={asset.id} onPress={() => openAsset(asset)} style={{ width: '32%' }}>
            <Image source={{ uri: asset.uri }} style={{ aspectRatio: 1 }} />
          </Pressable>
        ))}
      </ThemedView>

      {loadingInfo && <ActivityIndicator />}

      {selected && (
        <ThemedView style={{ gap: 8 }}>
          <ThemedText>Filename: {selected.filename}</ThemedText>
          <ThemedText>Size: {selected.width}×{selected.height}</ThemedText>
          <ThemedText selectable numberOfLines={3}>
            PreThemedView URI: {selected.uri}
          </ThemedText>
          <ThemedText selectable numberOfLines={3}>
            File URI: {selected.localUri ?? 'Not downloaded yet'}
          </ThemedText>
          <Button title="Use file (upload / share)" onPress={useFile} />
        </ThemedView>
      )}
    </ThemedView>
  );
}