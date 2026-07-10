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
        <Stack.Navigator 
        screenOptions={{
            // global options for all the screens
            headerStyle: {
                backgroundColor: '#0147A7',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerBackTitle: 'Back',
            headerBackTitleStyle: {
                fontSize: 16,
            },
        }}
        >
            <Stack.Screen name='Home' component={HomeScreen} 
            options={{
                //NOTE: these will be only for that specific screen and will override the global options
                // headerShown: false, to hide the header
                title: 'Overview',
                headerStyle: {
                    backgroundColor: '#01579B',
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                // font specific to the header title in this case we are making it bold
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerBackTitle: 'Back',
                headerBackTitleStyle: {
                    fontSize: 16,
                },
            }} />
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
