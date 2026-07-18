import { useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";

export const useAccelerometer = () => {

    const [available, setAvailable] = useState <boolean | null>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);


    useEffect(()=>{
        let subscription: {remove: () => void } | undefined;

        //iffy function 
        //kitne der me mujhe update chaiye wo add kar rha hu via the add event listner 
        (async()=>{
            // check if the accelerometer is available 
            const isAvailable= await Accelerometer.isAvailableAsync();
            setAvailable(isAvailable)

            if(!isAvailable) return;

            Accelerometer.setUpdateInterval(32);

            subscription= Accelerometer.addListener((data)=>{
                setX(data.x);
                setY(data.y);
                setZ(data.z);
            })
        })()

        return ()=>{
            subscription?.remove() // remove the subscription
        }
    },[])
    
    return {available, x, y, z}
}