import { StyleSheet, Text, View, ScrollView, Button, Switch } from 'react-native'
import React, { useState } from 'react'

const HomeScreen = () => {
  const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`); // this is a array of 20 items from 1 to 20.
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    // replacing view by scrollview & default scrollview is vertical but we can make it horizontal by passing the prop horizontal={true} and also we can pass the prop showsVerticalScrollIndicator={false} to hide the scroll indicator.
    //flex1 is used to make the scrollview take up the full height of the screen which means the scrollview will be as long as the content is.
    <ScrollView style={{ flex: 1, backgroundColor: '' }} contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      {
        items.map((item) => (
          <View
            key={item}
            style={{
              backgroundColor: 'white',
              padding: 10,
              margin: 10,
              borderRadius: 5,
              shadowOpacity: 0.5,
              shadowColor: '#000',
              shadowRadius: 4,
              elevation: 2
            }}
          >
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </View>
        ))
      }
      <Button title="Click me" color={'green'} onPress={() => alert('Button pressed')} />
      {/* but pressable is more prefered anyday because its gives you much customization and control over the button you dont have more control with button  */}

      {/* Switch component --> it is a component that is used to toggle a boolean value. */}
      <Switch
      value={isDarkMode}
      onValueChange={setIsDarkMode}
      trackColor={{true: '#6c63ff', false: '#ddd'}}
      thumbColor={isDarkMode ? '#fff' : '#000'}
      />
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})


// scrollview component --> it is a component that is used to display a list of items in a scrollable view adding scroll functionality to the view.