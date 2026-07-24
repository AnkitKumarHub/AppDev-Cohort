import { File } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

type PickMode = 'any' | 'image' | 'pdf';

const MODES: { id: PickMode; label: string; type: string }[] = [
  { id: 'any', label: 'Any', type: '*/*' },
  { id: 'image', label: 'Images', type: 'image/*' },
  { id: 'pdf', label: 'PDF', type: 'application/pdf' },
];

function formatBytes(size?: number) {
  if (size === undefined) return '—';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

type FileDetails = {
  name: string;
  mimeType: string;
  size: string;
  exists: boolean;
  uri: string;
  textPreview?: string;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView style={{ marginBottom: 8 }}>
      <ThemedText style={{ fontSize: 12, opacity: 0.6 }}>{label}</ThemedText>
      <ThemedText selectable>{value}</ThemedText>
    </ThemedView>
  );
}

export default function FileHandlingScreen() {
  const [mode, setMode] = useState<PickMode>('any');
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [selected, setSelected] = useState<FileDetails | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const pickDocuments = async () => {
    const selectedMode = MODES.find((m) => m.id === mode) ?? MODES[0];

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: selectedMode.type,
        multiple: allowMultiple,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setStatus('Canceled — no file chosen.');
        return;
      }

      setFiles(result.assets);
      setStatus(`${result.assets.length} file(s) selected.`);
      await inspectFile(result.assets[0]);
    } catch (error) {
      Alert.alert('Pick failed', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const inspectFile = async (asset: DocumentPicker.DocumentPickerAsset) => {
    try {
      const file = new File(asset.uri);
      const info = file.info();

      const isText =
        asset.mimeType?.startsWith('text/') ||
        asset.name.endsWith('.txt') ||
        asset.name.endsWith('.json') ||
        asset.name.endsWith('.md');

      let textPreview: string | undefined;
      if (isText && info.exists) {
        textPreview = (await file.text()).slice(0, 240);
      }

      setSelected({
        name: asset.name,
        mimeType: asset.mimeType ?? 'Unknown',
        size: formatBytes(asset.size),
        exists: info.exists,
        uri: asset.uri,
        textPreview,
      });
    } catch (error) {
      Alert.alert(
        'Read failed',
        error instanceof Error ? error.message : 'Could not read file',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
      <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>File handling</ThemedText>
      <ThemedText>Pick a file, then inspect it with expo-file-system.</ThemedText>

      {/* File type filter */}
      <ThemedView style={{ flexDirection: 'row', gap: 8 }}>
        {MODES.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setMode(item.id)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: mode === item.id ? '#208AEF' : '#eee',
            }}>
            <ThemedText style={{ color: mode === item.id ? '#fff' : '#000' }}>
              {item.label}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Switch value={allowMultiple} onValueChange={setAllowMultiple} />
        <ThemedText>Pick multiple files</ThemedText>
      </ThemedView>

      <Button title="Pick file" onPress={pickDocuments} />
      {status && <ThemedText>{status}</ThemedText>}

      {/* File list */}
      {files.length > 0 && (
        <ThemedView style={{ gap: 8 }}>
          <ThemedText style={{ fontWeight: '600' }}>Selected files</ThemedText>
          {files.map((file, index) => (
            <Pressable
              key={`${file.uri}-${index}`}
              onPress={() => inspectFile(file)}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: selected?.uri === file.uri ? '#3E5F44' : '#f5f5f5',
              }}>
              <ThemedText style={{ fontWeight: '500' }}>{file.name}</ThemedText>
              <ThemedText style={{ fontSize: 12, opacity: 0.6 }}>{formatBytes(file.size)}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      )}

      {/* File details — one label per row, not one big string */}
      {selected && (
        <ThemedView
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: '#f9f9f9',
            gap: 4,
          }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 8 }}>File details</ThemedText>

          <InfoRow label="Name" value={selected.name} />
          <InfoRow label="Type" value={selected.mimeType} />
          <InfoRow label="Size" value={selected.size} />
          <InfoRow label="Readable" value={selected.exists ? 'Yes' : 'No'} />
          <InfoRow label="Path" value={selected.uri} />

          {selected.textPreview && (
            <View style={{ marginTop: 8 }}>
              <ThemedText style={{ fontSize: 12, opacity: 0.6 }}>Preview</ThemedText>
              <ThemedText selectable style={{ marginTop: 4 }}>
                {selected.textPreview}
              </ThemedText>
            </View>
          )}
        </ThemedView>
      )}
    </ScrollView>
  );
}