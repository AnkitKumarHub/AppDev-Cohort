import { useState, useEffect } from "react";
import { Gyroscope } from "expo-sensors";

export function useGyroscope(updateIntervalMs = 32) {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  useEffect(() => {
    let subscription: { remove: () => void } | undefined;

    (async () => {
      const isAvailable = await Gyroscope.isAvailableAsync();
      setAvailable(isAvailable);
      if (!isAvailable) return;

      Gyroscope.setUpdateInterval(updateIntervalMs);

      subscription = Gyroscope.addListener((data) => {
        setX(data.x);
        setY(data.y);
        setZ(data.z);
      });
    })();

    return () => {
      subscription?.remove();
    };
  }, [updateIntervalMs]);

  return { available, x, y, z };
}
