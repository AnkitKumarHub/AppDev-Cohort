import { FontAwesome } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <FontAwesome size={16} name="home" color={color} />
          ),
        }}
      />
        <Drawer.Screen
          name="explore" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Explore',
            title: 'Explore',
            drawerIcon: ({ color, size }) => (
              <FontAwesome size={16} name="compass" color={color} />
            ),
          }}
        />
      <Drawer.Screen
        name="about" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'About',
          title: 'About',
          drawerIcon: ({ color, size }) => (
            <FontAwesome size={16} name="info-circle" color={color} />
          ),
        }}
      />
    </Drawer>
  )
}
