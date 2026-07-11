import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View>
      <Text>Search Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    // initialRouteName is used to set the initial screen of the tab navigator
    // <Tab.Navigator initialRouteName="Search" screenOptions={{ headerShown: true,}}>
    <Tab.Navigator initialRouteName="Search" screenOptions={
        ({route}) => ({
            tabBarActiveTintColor: '#FB923C',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle:{
                // backgroundColor: '#18181B',
                // borderTopColor: '#FB923C',
                // borderTopWidth: 1,
                // paddingBottom: 10,
                // you can set it via inset property ...etc
            },

            tabBarIcon: ({focused, color, size}) =>{
                const icon = route.name === 'Home' ? focused ? 'home' : 'home-outline' : 
                route.name === 'Search' ? focused ? 'search': 'search-outline' :
                // focused ? 'person' : 'person-outline';
                focused ? 'chatbubble' : 'chatbubble-outline';
                return <Ionicons name={icon} size={size} color={color} />;
            } 
        })
    }>
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        title: 'Dashboard', // if headerShown == true --> This will be title of the screen and if tabbarlabel is not given by default this will be label for tab bar also as a fallback mechanism 
        tabBarLabel: 'Home' // This is the label of the tab bar
      }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={
        {
            tabBarBadge: 5, // this is used to show the badge on the tab bar
            tabBarBadgeStyle: {
                backgroundColor: '#FB923C',
                color: '#18181B',
                fontSize: 12,
                fontWeight: 'bold',
                paddingHorizontal: 6,
                paddingVertical: 1,
                borderRadius: 10,
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1000,
            }
        }
      }/>
    </Tab.Navigator>
  );
}

export default function DynamicTabNavigator() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
