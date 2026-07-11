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
/**  
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
*/

//* Top Tabs Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home Screen</Text>
    </View>
  );
}

function ReelsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Reels Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
