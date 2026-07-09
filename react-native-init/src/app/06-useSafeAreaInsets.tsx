import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets, initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const inset = useSafeAreaInsets();

  console.log(inset);
  console.log(initialWindowMetrics);
  return (
    <View 
    style={{
      flex: 1, // this covers the entire screen else it will take only the content area
      // backgroundColor: 'red',
      paddingTop: inset.top + 4,
      paddingBottom: inset.bottom
    }}
    >
      {/* to change color of the status bar we use barStyle prop */}
      <StatusBar barStyle={'dark-content'} /> 
      <Text>HomeScreen</Text>
    </View>
  )

  //* Using SafeAreaProvider (not recommended)
  // return (
  //   <SafeAreaProvider initialMetrics={initialWindowMetrics}>
  //     <Text>HomeScreen</Text>
  //   </SafeAreaProvider>
  // )
}

export default HomeScreen

const styles = StyleSheet.create({})

//useSafeAreaInsets --> this hook is used to get the safe area insets for the device basically workarea insets which is the area of the device that is not occupied by the status bar, navigation bar, etc.
//it returns an object with the following properties: top, bottom, left, right--> Read-Only Value & Asynchronous in nature --> helful for the particular component to position itself correctly on the screen with respect to the safe area insets 

// initialWindowMetrics --> this is a read-only value and is used to get the initial window metrics for the device and want fast wit no-delay then can use initialWindowMetrics 

// StatusBar --> this is component that is used to display the status bar for the device and want to change the color of the status bar then can use StatusBar(props) component --> props: barStyle, backgroundColor, hidden, translucent, etc.