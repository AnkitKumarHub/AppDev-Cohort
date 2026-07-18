import { Text, View, StyleSheet } from "react-native";
import { Accelerometer } from 'expo-sensors';
import { useAccelerometer } from "@/hooks/use-accelerometer";
import { StatusBar } from "expo-status-bar";
import { TiltGame } from "@/components/tilt-game";


// isAvailable
//subscribe to the data/sensor


export default function Index() {
  // const{ available, x, y, z} = useAccelerometer();

  // console.log(available, x, y, z)




  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TiltGame/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
  },
});
