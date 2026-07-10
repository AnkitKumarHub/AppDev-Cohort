import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/HomeScreen';
import DetailScreen from '../../screens/DetailScreen';
import ProfileScreen from '../../screens/ProfileScreen';


const Stack = createNativeStackNavigator();

function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Details' component={DetailScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

export default function DynamicStackNavigator(){
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}
