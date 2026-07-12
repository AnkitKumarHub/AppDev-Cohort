import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { NativeTabs } from "expo-router/unstable-native-tabs";

// export default function TabLayout() {
//   return (
//     <Tabs screenOptions={{ tabBarActiveTintColor: "orange" }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <FontAwesome size={28} name="home" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color }) => (
//             <FontAwesome size={28} name="compass" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="about"
//         options={{
//           title: "About",
//           tabBarIcon: ({ color }) => (
//             <FontAwesome size={28} name="info-circle" color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

export default function TabLayout() {
    return (
      <NativeTabs tintColor={"tomato"} backgroundColor={"#111827"}>
        <NativeTabs.Trigger name="index">

          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="house.fill" md="home" />

        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="about">

          <NativeTabs.Trigger.Icon sf="info.circle" md="info" />
          <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>

        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="explore">
            <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf="globe" md="globe" />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }
