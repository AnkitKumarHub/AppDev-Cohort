import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList
} from 'react-native';

export default function PaginatedGalleryScreen() {
  const [permission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPage = useCallback(
    async (append = false) => {
      setLoading(true);
      try {
        const page = await MediaLibrary.getAssetsAsync({
          first: 12,
          after: append ? endCursor : undefined,
          mediaType: MediaLibrary.MediaType.photo,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        });

        // console.log('page', page);

        setAssets((current) => (append ? [...current, ...page.assets] : page.assets));
        setEndCursor(page.endCursor);
        setHasNextPage(page.hasNextPage);
      } finally {
        setLoading(false);
      }
    },
    [endCursor],
  );

  useEffect(() => {
    if (permission?.granted) {
      loadPage(false);
    }
  }, [permission?.granted]);

  if (!permission?.granted) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <ThemedText>Grant media library access first.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ gap: 4 }}
        contentContainerStyle={{ gap: 4, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={{ flex: 1, aspectRatio: 1 }}
            contentFit="cover"
          />
        )}
        ListFooterComponent={
          hasNextPage ? (
            <Button
              title={loading ? 'Loading…' : 'Load more'}
              onPress={() => loadPage(true)}
              disabled={loading}
            />
          ) : null
        }
      />
    </ThemedView>
  );
}


/**
 * OnDemand Loading of images
 */