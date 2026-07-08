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

const HomeScreen = () => {
    return (
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
    )
}

export default HomeScreen

const styles = StyleSheet.create({})


// KeyboardAvoidingView is a component that allows the user to scroll the screen when the keyboard is visible. 