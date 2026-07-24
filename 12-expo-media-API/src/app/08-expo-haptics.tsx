import { StyleSheet, View, Button } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';

export default function App() {
  return (
    <View style={styles.container}>
      <ThemedText >Haptics.selectionAsync</ThemedText>
      <View style={styles.buttonContainer}>
        <Button title="Selection" onPress={() =>  Haptics.selectionAsync() } />
      </View>
      <ThemedText >Haptics.notificationAsync</ThemedText>
      <View style={styles.buttonContainer}>
        <Button
          title="Success"
          onPress={
            () =>
               Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              ) 
          }
        />
        <Button
          title="Error"
          onPress={
            () =>
               Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
              ) 
          }
        />
        <Button
          title="Warning"
          onPress={
            () =>
               Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              ) 
          }
        />
      </View>
      <ThemedText>Haptics.impactAsync</ThemedText>
      <View style={styles.buttonContainer}>
        <Button
          title="Light"
          onPress={
            () =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) 
          }
        />
        <Button
          title="Medium"
          onPress={
            () =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) 
          }
        />
        <Button
          title="Heavy"
          onPress={
            () =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy) 
          }
        />
        <Button
          title="Rigid"
          onPress={
            () =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid) 
          }
        />
        <Button
          title="Soft"
          onPress={
            () =>  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft) 
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
});
