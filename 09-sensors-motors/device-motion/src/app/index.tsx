import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ShakeDetector } from "@/components/shake-detector";


export default function Index() {
/** 
  useEffect(()=>{
    void(async()=>{
      const isAvailable = await DeviceMotion.isAvailableAsync();
      console.log("isAvailable", isAvailable);
      if(!isAvailable) return;

      DeviceMotion.setUpdateInterval(100);
      const subscription = DeviceMotion.addListener((event) => {
        console.log("event", event);
      });
    })()
  }, [])
  */
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ShakeDetector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
});
