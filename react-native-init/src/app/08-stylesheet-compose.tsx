import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    const isActive = true;

    // StyleSheet.compose is a function that composes multiple styles into a single style
    const buttonStyle = StyleSheet.compose(
        styles.button,
        isActive ? styles.activeButton : null
    )

    return (
        <View style={styles.container}>
            {/* <View style={[styles.button, isActive && styles.activeButton]}> --> not readable much will use via compose */}
             {/* @ts-ignore */}
            <View style={buttonStyle}>
                <Text style={styles.buttonText}>Composed Style</Text>
            </View>
        </View>
    )
}

export default HomeScreen

// const styles = StyleSheet.create({})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: "#ccc"     //default grey 
    },
    activeButton: {
        backgroundColor: '#E67E22'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})


// TODO: mera button agr active he toh keep button design intact and also keep activeButton style  Done using compose 