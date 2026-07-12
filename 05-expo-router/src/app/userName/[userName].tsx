import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const UserNameScreen = () => {
    const {userName} = useLocalSearchParams();
  return (
    <View>
      <Text>UserNameScreen: {userName}</Text>
    </View>
  )
}

export default UserNameScreen

const styles = StyleSheet.create({})