import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DetailScreen = ({route}: any) => {
    const naviagtion = useNavigation<any>()
    const {username} = route.params; 
  return (
    <View>
      <Text>{username}: DetailScreen</Text>
      {/* <Button title="Go Back" onPress={() => naviagtion.goBack()} /> */}
      <Button title="Go Profile" onPress={() => naviagtion.navigate("Profile")} />
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})