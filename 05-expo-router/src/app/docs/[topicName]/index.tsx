import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const TopicNameScreen = () => {
    const {topicName} = useLocalSearchParams();
  return (
    <View>
      <Text>TopicNameScreen: {topicName}</Text>
    </View>
  )
}

export default TopicNameScreen

const styles = StyleSheet.create({})