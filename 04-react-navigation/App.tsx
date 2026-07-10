import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DynamicStackNavigator from './src/navigator/stack/DynamicStackNavigator';
import StaticStackNavigator from './src/navigator/stack/StaticStackNavigator';

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




export default function App(){
  return <StaticStackNavigator/>
  // return <DynamicStackNavigator/>
}