import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';

function stateLabel(state: Battery.BatteryState) {
  switch (state) {
    case Battery.BatteryState.CHARGING:
      return 'Charging';
    case Battery.BatteryState.FULL:
      return 'Full';
    case Battery.BatteryState.UNPLUGGED:
      return 'Unplugged';
    default:
      return 'Unknown';
  }
}

export default function BatteryScreen() {
  const level = Battery.useBatteryLevel();
  const state = Battery.useBatteryState();
  const lowPowerMode = Battery.useLowPowerMode();
  const powerState = Battery.usePowerState();

  const [available, setAvailable] = useState<boolean | null>(null);
  const [optimization, setOptimization] = useState<boolean | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    Battery.isAvailableAsync().then(setAvailable);

    const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setEvents((current) =>
        [`Level: ${Math.round(batteryLevel * 100)}%`, ...current].slice(0, 4),
      );
    });

    const stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
      setEvents((current) =>
        [`State: ${stateLabel(batteryState)}`, ...current].slice(0, 4),
      );
    });

    const powerSub = Battery.addLowPowerModeListener(({ lowPowerMode: enabled }) => {
      setEvents((current) =>
        [`Low power: ${enabled ? 'On' : 'Off'}`, ...current].slice(0, 4),
      );
    });

    return () => {
      levelSub.remove();
      stateSub.remove();
      powerSub.remove();
    };
  }, []);

  const refreshPowerState = async () => {
    const result = await Battery.getPowerStateAsync();
    setStatus(
      `Power state: ${Math.round(result.batteryLevel * 100)}% · ${stateLabel(result.batteryState)} · low power ${result.lowPowerMode ? 'on' : 'off'}`,
    );
  };

  const refreshOptimization = async () => {
    if (Platform.OS !== 'android') {
      setStatus('Battery optimization check is Android-only.');
      return;
    }
    const enabled = await Battery.isBatteryOptimizationEnabledAsync();
    setOptimization(enabled);
    setStatus(enabled ? 'Battery optimization is ON' : 'Battery optimization is OFF');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Battery</Text>
      <Text>Available: {available === null ? '…' : available ? 'Yes' : 'No'}</Text>
      <Text>Level: {level < 0 ? 'Unavailable' : `${Math.round(level * 100)}%`}</Text>
      <Text>State: {stateLabel(state)}</Text>
      <Text>Low power mode: {lowPowerMode ? 'On' : 'Off'}</Text>
      <Text>
        Hook bundle: {Math.round(powerState.batteryLevel * 100)}% ·{' '}
        {stateLabel(powerState.batteryState)}
      </Text>

      <Button title="Refresh power state" onPress={refreshPowerState} />
      {Platform.OS === 'android' && (
        <Button title="Check battery optimization" onPress={refreshOptimization} />
      )}
      {optimization !== null && (
        <Text>Optimization enabled: {optimization ? 'Yes' : 'No'}</Text>
      )}

      {status && <Text>{status}</Text>}

      <Text style={{ fontWeight: '600', marginTop: 8 }}>Recent events</Text>
      {events.length === 0 ? (
        <Text>No changes yet.</Text>
      ) : (
        events.map((event, index) => <Text key={index}>{event}</Text>)
      )}
    </ScrollView>
  );
}