import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorder,
    useAudioRecorderState,
  } from 'expo-audio';
  import { useEffect } from 'react';
  import { Alert, Button, Text } from 'react-native';
  
  export default function RecordScreen() {
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const state = useAudioRecorderState(recorder);
  
    useEffect(() => {
      (async () => {
        const permission = await AudioModule.requestRecordingPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Microphone required', 'Grant mic access to record audio.');
          return;
        }
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });
      })();
    }, []);
  
    const start = async () => {
      await recorder.prepareToRecordAsync();
      recorder.record();
    };
  
    const stop = async () => {
      await recorder.stop();
      Alert.alert('Saved', recorder.uri ?? 'No URI');
    };
  
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', gap: 12, padding: 24 }}>
        <ThemedText>
          {state.isRecording ? 'Recording…' : 'Ready'} ·{' '}
          {Math.round(state.durationMillis / 1000)}s
        </ThemedText>
  
        <Button
          title={state.isRecording ? 'Stop' : 'Start recording'}
          onPress={state.isRecording ? stop : start}
        />
  
        {recorder.uri && (
          <ThemedText selectable numberOfLines={2}>
            {recorder.uri}
          </ThemedText>
        )}
      </ThemedView>
    );
  }