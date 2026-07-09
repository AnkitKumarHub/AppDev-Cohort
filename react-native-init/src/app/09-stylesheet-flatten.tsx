import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styleA = StyleSheet.create({text: {color: 'red', fontSize: 16}})
const styleB = StyleSheet.create({text: {fontWeight: 'bold', fontSize: 24}})

const flat = StyleSheet.flatten([styleA.text, styleB.text])

const HomeScreen = () => {
  return (
    // one -way to apply styles 
    //   <Text style={styleA.text}>Flattened Style</Text>
    //   <Text style={styleB.text}>Flattened Style</Text>

    //flattened - jb aap 2 designs ko merge/flat krke apply krte ho toh use kro  -> kind of spread operator or like tailwind merge  
      <Text style={flat}>Flattened Style</Text>

  )
}

export default HomeScreen

