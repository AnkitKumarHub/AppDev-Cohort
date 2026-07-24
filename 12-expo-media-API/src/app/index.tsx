import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
} from 'react-native';

export default function AlbumBrowserScreen() {
  const [permission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(null);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAlbums = async () => {
    const list = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true });
    setAlbums(list);
  };

  const loadAssets = async (album: MediaLibrary.Album | null) => {
    setLoading(true);
    try {
      const page = await MediaLibrary.getAssetsAsync({
        first: 12,
        album: album ?? undefined,
        mediaType: MediaLibrary.MediaType.photo,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });
      setAssets(page.assets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission?.granted) {
      loadAlbums();
      loadAssets(null); // "Recent" — no album filter
    }
  }, [permission?.granted]);

  const selectAlbum = (album: MediaLibrary.Album | null) => {
    setSelectedAlbum(album);
    loadAssets(album);
  };

  if (!permission?.granted) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <ThemedText>Grant media library access first.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, padding: 12, gap: 8 }}>
      <ThemedText style={{ fontWeight: '600' }}>Albums</ThemedText>

      <FlatList
        horizontal
        data={[{ id: 'recent', title: 'Recent' } as MediaLibrary.Album, ...albums]}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => {
          const isRecent = item.id === 'recent';
          const selected = isRecent
            ? selectedAlbum === null
            : selectedAlbum?.id === item.id;

          return (
            <Pressable
              onPress={() => selectAlbum(isRecent ? null : item)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor: selected ? '#208AEF' : '#eee',
              }}>
              <ThemedText style={{ color: selected ? '#fff' : '#000' }}>
                {item.title}
              </ThemedText>
            </Pressable>
          );
        }}
      />

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
              style={{ flex: 1, aspectRatio: 1 }}
              contentFit="cover"
            />
          )}
        />
      )}
    </ThemedView>
  );
}