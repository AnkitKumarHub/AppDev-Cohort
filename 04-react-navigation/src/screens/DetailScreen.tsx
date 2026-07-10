import { Button, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const DetailScreen = ({ route }: any) => {
  const naviagtion = useNavigation<any>();
  const { username } = route.params;

  useLayoutEffect(() => {
    naviagtion.setOptions({
      // title: `${username} Details`,
      title: "Ankit Details",
      headerStyle: {
        backgroundColor: "#01579B",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, [naviagtion]);
  // this useLayoutEffect is used to set the options for the header in this case we are setting the title, headerStyle, headerTintColor, headerTitleStyle
  return (
    <View>
      <Text>{username}: DetailScreen</Text>
      {/* <Button title="Go Back" onPress={() => naviagtion.goBack()} /> */}
      <Button
        title="Go Profile"
        onPress={() => naviagtion.navigate("Profile")}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
