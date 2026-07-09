import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@react-navigation/elements'

const ProfileScreen = () => {
    const naviagtion = useNavigation<any>()
  return (
    <View>
      <Text>ProfileScreen</Text>

      {/* popTo is used to pop to the home screen --> directly jumping to the home screen */}
      {/* <Button onPress={()=>{naviagtion.popTo("Home")}}>Go to Home</Button>  */}

      {/* popToTOp will take you to the root screen when you are in deep nested stack then use this */}
      {/* <Button onPress={()=>{naviagtion.popToTop("Home")}}>Go to Home</Button>  */}
      
      {/* replace is used to remove the current screen replace = swap the current screen only 
      [Home, Details, Profile]   ← you are here
      [Home, Details, Home]   ← you are here */}
      <Button onPress={()=>{naviagtion.replace("Home")}}>Go to Home</Button> 

      {/* navigate is used to navigate to the home screen but here you can see a problem while navigation which is Home stack is being added to navigation stack (uske upar hi stack add kar diya ) */} 
      <Button onPress={()=>{naviagtion.navigate("Home")}}>Go Home</Button> 

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})