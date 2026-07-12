// import { Stack } from "expo-router";
import { Slot, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold' }
  }}>
    {/* <Stack.Screen name="index" options={{ title: 'Home' }} />  here you can set the design per screen in options */}
    <Stack.Screen name="index" options={{ title: 'Home' }} /> 
    <Stack.Screen name="about" options={{ title: 'About' }} />
  </Stack>
  // return (
  //   <View style={{flex: 1}}>
  //   <Text>Header</Text>
  //     <Slot/>;
  //   <Text>Footer</Text>
  //   </View>
  // );
}
