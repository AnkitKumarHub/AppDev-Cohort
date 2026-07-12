import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

//Best Practice for Dynamic Nested Routes is to use [...slug] without creating so meany nested folder --> because it will be difficult to manage and scale

// ...slug is a wildcard route that will match any number of segments in the URL
// slug is an array of strings that will be passed to the component
// slug[0] is the first segment of the URL
// slug[1] is the second segment of the URL
// slug[2] is the third segment of the URL
// and so on
// so if the URL is /doc-02/ankit/kumar/bookmarks, then slug will be ['ankit', 'kumar', 'bookmarks']



const DynamicNestedRoutesForScalable = () => {
    const {slug} = useLocalSearchParams()
    console.log(slug)
  return (
    <View>
      <Text>DynamicNestedRoutesForScalable: {slug} &&  {Array.isArray(slug) ? slug.join('/') : slug}</Text>
    </View>
  )
}

export default DynamicNestedRoutesForScalable

const styles = StyleSheet.create({})