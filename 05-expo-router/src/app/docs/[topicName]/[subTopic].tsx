import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const SubTopicScreen = () => {
    const {topicName, subTopic} = useLocalSearchParams(); // can get topicName && subTopic name too 

  return (
    <View>
      <Text>{topicName}  {subTopic}</Text>
    </View>
  )
}

export default SubTopicScreen

const styles = StyleSheet.create({})