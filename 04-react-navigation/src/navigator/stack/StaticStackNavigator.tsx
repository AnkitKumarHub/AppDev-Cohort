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
    Home: {
      // this is the way to set the options for the screen for the static stack navigator
      screen: HomeScreen,
      options: {
        title: 'Overview',
        headerStyle: {
          backgroundColor: '#0E0E10', // black color #18181B
        },
        headerTintColor: '#FB923C',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: 'Back',
        headerBackTitleStyle: {
          fontSize: 16,
        },
      },
    },
    Details: DetailScreen,
    Profile: ProfileScreen,
  },
});

const Naviagtion = createStaticNavigation(Stack);

export default function StaticStackNavigator() {
  return <Naviagtion />;
}
