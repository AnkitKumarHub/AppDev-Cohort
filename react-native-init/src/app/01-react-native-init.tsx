import { useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native"

export default function HomeScreen() {
  const [name, setName] = useState("");
  return(
    <View>
      <Text numberOfLines={3} > Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam pariatur adipisci voluptate corporis dicta enim numquam eos minus debitis, minima itaque modi sit quo eaque alias tempore rerum ea. Ut! </Text> 

      {/* Remote Image */}
      <Image
      source={{uri: "https://www.masterji.co/images/home-page/iphone-home.png"}}
      width={200}
      height={200}
      blurRadius={2}
      />

      {/* Local Image */}
      <Image
      source={require("@/assets/images/icon.png")}
      style={{width: 200, height: 200}}
      />

      {/* Base64 Image */}
      {/* <Image
      source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...", width: 200, height: 200}}
      /> */}

      <TextInput
      placeholder="Enter your name"
      placeholderTextColor={'slategrey'}
      value={name}
      onChangeText={setName} 
      style={{
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        

      }} // this is not css style but it is a react native style
      />
      {/* here you will use onChangeText to update the state not the onChange because its a lightweight component & if you want to access string directly use onChangeText but if you use onChange then we access for complete event object which is rarel needed  */}



      {/* Pressable Component --> it is a button component that can be pressed to perform an action */}
      <Pressable 
      // onLongPress={}
      // onPressIn={}
      // onPressOut={}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }} // this is a prop that is used to increase the hit area of the button. so if the button is pressed on the edge of the button, it will still be pressed. 
      onPress={() => alert("Button pressed")}
      style={
        ({pressed}) => ({backgroundColor: pressed ? "red" : "blue"})  // here pressed is a boolean value that is true if the button is pressed and false if the button is not pressed. and also have 2 states one is pressed and another hover 
      }>
        {/* <Text style={{color: "white"}}>Click me</Text> */}
        {({pressed}) => (
          pressed ? <Text style={{color: "white"}}> pressing...</Text> : <Text style={{color: "white"}}> click me </Text>
        )}
      </Pressable>
    </View>
  );
}
