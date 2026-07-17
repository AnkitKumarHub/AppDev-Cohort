import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const [output, setOutput] = useState<String>("");

  // 1. Save Token
  const saveToken = async()=>{
    await SecureStore.setItemAsync('token', '123456')
    setOutput('Token saved')
  }

  // 2. Get Token
  const getToken= async()=>{
    const value = await SecureStore.getItemAsync('token')
    setOutput(value!)
  }

  // 3. Delete Token
  const deleteToken = async()=>{
    await SecureStore.deleteItemAsync('token')
    setOutput('Token deleted')
  }

  // 4. Check Availability  --> good practice before setting any item to check if the secure store is available or not 
  const checkAvailability = async()=>{
    const isAvailable = await SecureStore.isAvailableAsync();  // returns boolean this simply checks if the secure store api is available on the device
    setOutput(isAvailable ? 'Secure store is available' : 'Secure store is not available')
  }

  // 5. Save Object
  const saveObject =async()=>{
    const user = {
        name: 'code snippet',
        email: 'code@snippet.com',
        age: 30
    }
    await SecureStore.setItemAsync('user', JSON.stringify(user))
    setOutput('User saved')
  }

  // 6. Get Object
  const getObject = async()=>{
    const value = await SecureStore.getItemAsync('user')

    if(!value) return setOutput('No user found')

    const user = JSON.parse(value)
    setOutput(`User: ${user.name}, ${user.email}, ${user.age}`)
  }



   return (
    <SafeAreaView
    style={{
      flex: 1,
    }}
  >
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        SecureStore Demo
      </Text>

      <Button
        title="Save Token"
        onPress={saveToken}
      />

      <Button
        title="Get Token"
        onPress={getToken}
      />

      <Button
        title="Delete Token"
        onPress={deleteToken}
      />

      <Button
        title="Check Availability"
        onPress={checkAvailability}
      />

      <Button
        title="Save Object"
        onPress={saveObject}
      />

      <Button
        title="Get Object"
        onPress={getObject}
      />

      <View
        style={{
          marginTop: 30,
          padding: 20,
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Output
        </Text>

        <Text
          style={{
            fontSize: 16,
          }}
        >
          {output}
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default index;

const styles = StyleSheet.create({});
