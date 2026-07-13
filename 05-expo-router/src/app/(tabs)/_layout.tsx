import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { View, Text, TouchableOpacity } from "react-native";

/** 
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "orange" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="compass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="info-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
*/

/** NativeTabs Example */
/** 
export default function TabLayout() {
  return (
  // explore more properties of NativeTabs apart from tintColor and backgroundColor
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
        <NativeTabs.Trigger.Badge>10</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
*/

/**Custom Tabs Example */
function MyCustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>

      {/* Render the tabs */}
      {state.routes.map((route, index) => {

        // console.log(route);

        //check the active tabs
        const isFocused = state.index === index;

        //get screen options route.key => name = "Home", "About", "Explore"
        const { options } = descriptors[route.key];

        return (
          <TouchableOpacity
            key={route.key}

            //Navigate screen
            onPress={() => navigation.navigate(route.name)}

            style={{ flex: 1, alignItems: "center" }}
          >
            <Text style={{ color: isFocused ? "tomato" : "gray" }}>
              {options.title}
            </Text>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => (<MyCustomTabBar {...props} />)}> 
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
    </Tabs>
  );
}

// you can give to AI to create a interactive tab bar and check the result 
