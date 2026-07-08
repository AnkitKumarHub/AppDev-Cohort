import { Stack } from "expo-router";

export default function RootLayout() {
  // return <Stack  />;
  return <Stack screenOptions={{headerShown: false}} />; // this is used to hide the header of the stack navigator.
}
