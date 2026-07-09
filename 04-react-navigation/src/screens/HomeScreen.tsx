import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Button} from '@react-navigation/elements'
import { Link, useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const naviagtion = useNavigation<any>()
  return (
    <View>
      <Text>HomeScreen</Text>
      {/* <Button screen={"Details"}> Go to Details</Button> */}
      {/* <Link screen={"Details"}>Go to Details</Link> */}

      {/* //* navigate("Details", {username: "chaiCode"}) - pass the data to the details screen */}
      <Button onPress={() => naviagtion.navigate("Details", {username: "chaiCode"})}>Go to Details</Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})

/**
 * Way-1 : Using Button Component
 * Way-2 : Using Link Component
 * Way-3 : Using useNavigation Hook
 * 
 * Way-1 :
 * <Button screen={"Details"}> Go to Details</Button>
 * 
 * Way-2 :
 * <Link screen={"Details"}>Go to Details</Link>
 * 
 * Way-3 :
 * const naviagtion = useNavigation()
 * naviagtion.navigate("Details")
 */