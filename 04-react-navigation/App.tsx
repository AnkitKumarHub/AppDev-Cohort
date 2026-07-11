import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
import DynamicStackNavigator from './src/navigator/stack/DynamicStackNavigator';
import StaticStackNavigator from './src/navigator/stack/StaticStackNavigator';

import {
  createBottomTabNavigator,
  createBottomTabScreen,
} from '@react-navigation/bottom-tabs';
import { Button } from '@react-navigation/elements';
import DynamicTabNavigator from './src/navigator/tabs/DynamicTabNavigator';
import DynamicTabWithStack from './src/navigator/tabs/02-DynamicTabWithStack';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const RootStack = createNativeStackNavigator({
//   screens: {
//     Home: HomeScreen,
//   },
// });

// const Navigation = createStaticNavigation(RootStack);

// export default function App() {
//   return <Navigation />;
// }




// export default function App(){
//   return <StaticStackNavigator/>
//   // return <DynamicStackNavigator/>
// }



//!Bottom Tab Navigator

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Profile')}>
        Go to Profile
      </Button>
    </View>
  );
}

function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
    </View>
  );
}

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: createBottomTabScreen({
      screen: HomeScreen,
    }),
    Profile: createBottomTabScreen({
      screen: ProfileScreen,
    }),
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  // return <Navigation />;
  // return <DynamicTabNavigator />
  return <DynamicTabWithStack/>
}
  