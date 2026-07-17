import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [data, setData] = useState("")

  //* whenever you will store the data in the async storage, it will be in a string format 

  const myObj = {
    name: "Ankit",
    age: 25,
    isDeveloper: true,
  }

  //Set Item 
  const saveData = async ()=>{
    // await AsyncStorage.setItem("user", "Ankit");
    await AsyncStorage.setItem("user", JSON.stringify(myObj));
  }

  //Get Item
  const getData = async()=>{
    const value = await AsyncStorage.getItem("user");
    setData(value!)
  }

  //Remove Item
  const removeData = async()=>{
    await AsyncStorage.removeItem('user')
    setData("")
  }

  //Clear Async storage completely
  const clearStorage = async()=>{
    await AsyncStorage.clear();
    setData("")
  }

  //Get All Keys
  const getAllKeys = async()=>{
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys)
  }

  //save multiple items/data
  const saveMultipleItems = async()=>{
    await AsyncStorage.multiSet([
      ['user', 'Ankit'],
      ['age', '20'],
      ['city', 'New York']
    ])
  }

  //get multiple items/data
  const getMultipleItems = async()=>{
    const values = await AsyncStorage.multiGet([
      'user',
      'age',
      'city'
    ])
    console.log(values)
    // OUTPUT: [["user", "Ankit"], ["age", "20"], ["city", "New York"]] now you can flatten the array to get the data
  }
  
  return (
    <SafeAreaView
    style={{
      flex: 1,
      justifyContent: "center",
      padding: 20,
      gap: 12,
    }}
  >
    <Button title="Save Data" onPress={saveData} />

    <Button title="Get Data" onPress={getData} />

    <Button title="Remove Data" onPress={removeData} />

    <Button title="Clear Storage" onPress={clearStorage} />

    <Button title="Get All Keys" onPress={getAllKeys} />

    <Button title="Multi Set" onPress={saveMultipleItems} />

    <Button title="Multi Get" onPress={getMultipleItems} />

    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Output:
      </Text>

      <Text>{data}</Text>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
