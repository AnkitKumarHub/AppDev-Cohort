import { Tabs } from "expo-router";
import {FontAwesome} from '@expo/vector-icons';

export default function TabLayout() {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: 'orange' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="compass" color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="info-circle" color={color} />,
          }}
        />
      </Tabs>
    );
  }