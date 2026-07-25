import { Text, View, StyleSheet, Button } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Index() {
  async function example1() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome!",
        body: "This is my first notification!",
      },
      trigger: null,
    });
  }
  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={example1}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
