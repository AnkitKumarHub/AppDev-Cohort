import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const UserIdScreen = () => {
    const {userId} = useLocalSearchParams();  //here {userId} is the parameter passed in the link and should be same with the [userId] in the file 
  return (
    <View>
      <Text>UserIdScreen: {userId}</Text>
    </View>
  )
}

export default UserIdScreen

const styles = StyleSheet.create({})