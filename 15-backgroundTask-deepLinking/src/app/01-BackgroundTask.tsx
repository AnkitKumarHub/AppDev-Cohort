import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. Define a background task with a unique name
const TASK_NAME = "sync-data-task";

async function syncData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
  });

  const data = await response.json();

  console.log("Fetched", data.length, "items");
  return data.length;
}

// 2. Register the background task with the system
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    console.log("Background task started");
    await syncData();

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("Background task failed", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

const index = () => {
  const [registered, setregistered] = useState(false);
  const [devResult, setdevResult] = useState<String | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const isRegister = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
    setregistered(isRegister);
  }

  async function registerTask() {
    try {
      await BackgroundTask.registerTaskAsync(TASK_NAME, {
        minimumInterval: 15, //15 minutes
      });

      Alert.alert("success", "BackGround Task registered successfully");
      setregistered(true);
    } catch (error) {
      console.error("Failed to register background task", error);
      Alert.alert("error", error.message);
    }
  }

  async function testInDev() {
    try {
      const count = await syncData();
      setdevResult(`Synced ${count} items at ${new Date().toISOString()}`);

      const status = await BackgroundTask.getStatusAsync();
      console.log(status);

      const triggered = await BackgroundTask.triggerTaskWorkerForTestingAsync();
      console.log("Native Work Triggered:", triggered);
    } catch (error) {
      console.error("Failed to test in dev", error);
      setdevResult(`Failed: ${error.message}`);
    }
  }
  return (
    <SafeAreaView>
      <Text style={styles.status}>
        Status: {registered ? "Registered ✅" : "Not Registered ❌"}
      </Text>
      <View style={{ height: 20 }} />
      <Button title="Register Task" onPress={registerTask} />
      {__DEV__ ? (
        <>
          <View style={{ height: 20 }} />
          <Button
            title="Test Task now (DEV)"
            color="#6E56CF"
            onPress={testInDev}
          />

          {devResult ? (
            <Text style={styles.devResult}> {devResult}</Text>
          ) : null}
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
  },
  devResult: {
    marginTop: 16,
    fontSize: 15,
    color: "#6E56CF",
    fontWeight: "600",
  },
});
