// import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{flex: 1}}>
    <Text>Header</Text>
      <Slot/>;
    <Text>Footer</Text>
    </View>
  );
}
