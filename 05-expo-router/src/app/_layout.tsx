// import { Stack } from "expo-router";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = true;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* <Stack.Screen name="index" options={{ title: 'Home' }} />  here you can set the design per screen in options */}

      {/* Header hidden for complete auth routes so that user don't see the header for entire auth routes */}
      {/* guard is a true/false check — if it's true, the user can see those screens; if false, Expo Router blocks access and redirects them. */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* if user is logged in then they can access the home page and about page */}
      <Stack.Protected guard={isLoggedIn}>
        {/* <Stack.Screen name="index" />
        <Stack.Screen name="about" /> */}

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
  // return (
  //   <View style={{flex: 1}}>
  //   <Text>Header</Text>
  //     <Slot/>;
  //   <Text>Footer</Text>
  //   </View>
  // );
}
