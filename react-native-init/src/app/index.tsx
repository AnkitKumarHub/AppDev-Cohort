import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
    return (
        <SafeAreaView>
            {/* <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />  */}
            <StatusBar style="dark" />
            <View style={styles.card}>
                <Text style={styles.title}>HomeScreen</Text>
                <Text style={styles.subtitle}>Hello world </Text>
            </View>
        </SafeAreaView>
    )
}

// NOTE: never use StyleSheet.create() inside a component, always use it outside the component? --> because multiple times this component will be rendered then multiple times this styles object will also be rendered then it will take more memory and performance will be degraded
// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: 'white',
//         padding: 20,
//         borderRadius: 16,
//         margin: 16,
//         elevation: 16, // for Android only --> used to give a shadow effect to the card
//         shadowColor: '#000',// for iOS only --> used to give a shadow effect to the card via shadow color, opacity, radius
//         shadowOffset: { width: 0, height: 2 }, 
//         shadowOpacity: 0.25,
//         shadowRadius: 8
//     },
//     title:{
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     subtitle:{
//         fontSize: 16,
//         color: 'gray',
//     },


// })

export default HomeScreen

// here it will be created 1 time only 
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        margin: 16,
        elevation: 16, // for Android only --> used to give a shadow effect to the card
        shadowColor: '#000',// for iOS only --> used to give a shadow effect to the card via shadow color, opacity, radius
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginTop: 4,
    },


})


//NOTE:
// StyleSheet --> is a module that is used to style the components in the React Native application
// StyleSheet.create --> is a function that is used to create a style sheet for the components in the React Native application


// Status bar is also provided via the expo --> 
