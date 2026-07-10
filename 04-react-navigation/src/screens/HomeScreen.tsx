import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { Link, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const naviagtion = useNavigation<any>();
  return (
    <View>
      <Text>HomeScreen</Text>
      {/* <Button screen={"Details"}> Go to Details</Button> */}
      {/* <Link screen={"Details"}>Go to Details</Link> */}

      {/* //* navigate("Details", {username: "chaiCode"}) - pass the data to the details screen */}
      <Button
        onPress={() => naviagtion.navigate("Details", { username: "chaiCode" })}
      >
        Go to Details
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

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

//TODO: if by any chance you forgot to send the dynamic data (in this case username)
// <Button onPress={() => naviagtion.navigate("Details", {})}>Go to Details</Button> --> sending empty object --> you will see nothing in the screen
// but you can also send by default data also to the screen

/**
 ** The problem
 * <Button onPress={() => naviagtion.navigate("Details", {username: "chaiCode"})}>Go to Details</Button> --> HomeScreen.tsx --> HomeScreen send the data when navigating 
 ** --> DetailsScreen.tsx --> DetailsScreen receive the data and display it
 * const DetailScreen = ({route}: any) => {
    const naviagtion = useNavigation<any>()
    const {username} = route.params; 
  return (
    <View>
      <Text>{username}: DetailScreen</Text>

  ** If you forget params:
  navigation.navigate("Details")        // no params
  navigation.navigate("Details", {})    // empty object
** then username is undefined → screen shows : DetailScreen with nothing before it.
 */

/**
 * * There is something called - initialParams  = fallback default values for a screen --sets default data for a screen when you navigate without passing params

Used when:
You navigate without params
You pass an empty object {}
Deep link opens the screen with missing data

**How to set it (your static navigator)**
In App.tsx, change the Details screen config:
const Stack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: HomeScreen,
    Details: {
      screen: DetailScreen,
      initialParams: { username: "Guest" },  // default fallback
    },
    Profile: ProfileScreen,
  },
});


OR 

Safer reading in the screen
Even with initialParams, it's good practice to use a default in the component:

const DetailScreen = ({ route }: any) => {
  const { username = "Guest" } = route.params ?? {};
  // ...
};


OR
Or with useRoute:
import { useRoute } from '@react-navigation/native';

const route = useRoute();
const username = route.params?.username ?? "Guest";
 */
