import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Platform
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={{ flex: 1, justifyContent: 'flex-end', padding: 24 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
                        Login
                    </Text>

                    <TextInput
                        placeholder='Email'
                        style={{
                            borderWidth: 1,
                            borderColor: '#ddd',
                            padding: 14,
                            marginBottom: 12,
                            borderRadius: 10,
                            fontSize: 16,
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                        }}
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        style={{
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 10,
                            padding: 14,
                            marginBottom: 20,
                            fontSize: 16,
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                        }}
                    />

                    <Pressable
                        style={{
                            backgroundColor: '#6c63ff',
                            padding: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})


// KeyboardAvoidingView is a component that allows the user to scroll the screen when the keyboard is visible.
// for ios we use 'padding' and for android we use 'height'
//safeAreaView if imported from react-native then will wokr only in ios not in android(breaks) --> we uses package "react-native-safe-area-context" so in expo you can directly use from "react-native-safe-area-context"
//safeAreaView is a component that allows the user to scroll the screen when the keyboard is visible. 

