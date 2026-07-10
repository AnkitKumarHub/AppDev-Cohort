import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailScreen from "../../screens/DetailScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";

const Stack = createNativeStackNavigator({
  initialRouteName: "Home", // initial screen to show when the app starts --> Splash screen
  screens: {
    Home: HomeScreen,
    Details: DetailScreen,
    Profile: ProfileScreen,
  },
});

const Naviagtion = createStaticNavigation(Stack);

export default function StaticStackNavigator() {
  return <Naviagtion />;
}
