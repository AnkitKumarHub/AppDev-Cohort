import { Text, View, StyleSheet, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

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
        subtitle: "From ankit",
        body: "This is my first notification!",
        data: {
          screen: "/profile",
          userId: 42,
        },
        sound: false, // false means no sound, defaultRingtone & defaultCritical are IOS specific for now
        badge: 3, // only works on ios
        priority: Notifications.AndroidNotificationPriority.HIGH,
        sticky: true
      },
      trigger: null,
    });
  }

  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      console.log(data);
      //  when user clicks on the notification, we can navigate to the screen specified in the data
      //  const url = response.notification.request.content.data.url;
      // Linking.openURL(url);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={example1} />
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
