import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';

export default function NetworkScreen() {
  const liveState = Network.useNetworkState();
  const [snapshot, setSnapshot] = useState<Network.NetworkState | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [airplaneMode, setAirplaneMode] = useState<boolean | null>(null);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const subscription = Network.addNetworkStateListener((state) => {
      const line = `${state.type ?? 'UNKNOWN'} · connected=${String(state.isConnected)} · internet=${String(state.isInternetReachable)}`;
      setEvents((current) => [line, ...current].slice(0, 5));
    });

    return () => subscription.remove();
  }, []);

  const refreshSnapshot = async () => {
    const state = await Network.getNetworkStateAsync();
    setSnapshot(state);
  };

  const refreshIp = async () => {
    try {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    } catch (error) {
      setIpAddress(error instanceof Error ? error.message : 'Unavailable');
    }
  };

  const refreshAirplaneMode = async () => {
    if (Platform.OS !== 'android') {
      setAirplaneMode(null);
      return;
    }
    const enabled = await Network.isAirplaneModeEnabledAsync();
    setAirplaneMode(enabled);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Network (live)</Text>
      <Text>Type: {liveState.type ?? 'unknown'}</Text>
      <Text>Connected: {String(liveState.isConnected)}</Text>
      <Text>Internet reachable: {String(liveState.isInternetReachable)}</Text>

      <Button title="Fetch one-time snapshot" onPress={refreshSnapshot} />
      {snapshot && (
        <Text>
          Snapshot: {snapshot.type} · connected={String(snapshot.isConnected)}
        </Text>
      )}

      <Button title="Get IP address" onPress={refreshIp} />
      {ipAddress && <Text selectable>IP: {ipAddress}</Text>}

      {Platform.OS === 'android' && (
        <>
          <Button title="Check airplane mode" onPress={refreshAirplaneMode} />
          {airplaneMode !== null && (
            <Text>Airplane mode: {airplaneMode ? 'On' : 'Off'}</Text>
          )}
        </>
      )}

      <Text style={{ fontWeight: '600', marginTop: 8 }}>Recent events</Text>
      {events.length === 0 ? (
        <Text>No changes yet.</Text>
      ) : (
        events.map((event, index) => <Text key={index}>{event}</Text>)
      )}
    </ScrollView>
  );
}