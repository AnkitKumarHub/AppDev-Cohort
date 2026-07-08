import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

function UnSafeScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#1c1c1e' }}>
            <Text style={{ color: '#fff', fontSize: 18, padding: 16 }}>
                Header (bleeds under notch!)
            </Text>
            <Text style={{ color: '#aaa', padding: 16 }}>
                The content might be hidden behind the status bar in dark mode
            </Text>
        </View>
    )
}

function SafeScreen() {
    return (
        <SafeAreaView
            edges={['top', 'bottom']}
            style={{ flex: 1, backgroundColor: '#1c1c1e' }}
        >
            <Text style={{ color: '#fff', fontSize: 18, padding: 16 }}>
                Header (bleeds under notch! ✅)
            </Text>
            <Text style={{ color: '#aaa', padding: 16 }}>
                This content respects the safe area on all devices.
            </Text>
        </SafeAreaView>
    )
}

const HomeScreen = () => {
    return (
        <>
            <SafeScreen />
            {/* <UnSafeScreen /> */}
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})