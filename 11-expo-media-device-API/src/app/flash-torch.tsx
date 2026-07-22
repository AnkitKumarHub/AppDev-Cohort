import {CameraView, useCameraPermissions, type FlashMode} from "expo-camera";
import { useState } from "react";
import {Button, View} from 'react-native';


export default function FlashTorchScreen(){
    const [permission ] = useCameraPermissions();
    const [flash, setFlash] = useState<FlashMode>("off");
    const [torch, setTorch] = useState(false); // for tracking the torch state

    if(!permission?.granted) return null;

    const cycleFlash=()=>{
        setFlash((f) => (f ==="off" ? "on" : f === "on" ? "auto" : "off"));  // cycle through the flash modes 
    }


    return (
        <View style={{flex:1}}>
            <CameraView style={{flex:1}} facing="back" flash={flash} enableTorch={torch} />
            <Button title={`Flash: ${flash}`} onPress={cycleFlash}/>
            <Button title={`Torch: ${torch ? "On" : "Off"}`} onPress={()=>setTorch(!torch)}/>
        </View>
    )

}