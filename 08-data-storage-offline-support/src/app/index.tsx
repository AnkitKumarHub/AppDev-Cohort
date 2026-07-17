import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";

const db = SQLite.openDatabaseSync("demo.db");

const index = () => {
  const [output, setOutput] = useState("");

  // 1. Create Table
  const createTable = async () => {
    db.execSync(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER
            )`);
    setOutput("Table created successfully");
  };

  // 2. Insert Data
  const insertUser = async ()=>{
    db.runSync(
        "INSERT INTO users (name, age) VALUES (? , ?)",
        "Ankit",
        20
    )
    setOutput("User inserted successfully");
  }

  const getUsers = async ()=>{
    const users = db.getAllSync(
        "SELECT * FROM users"
    )
    setOutput(JSON.stringify(users, null, 2));
  }

  const getFirstUser = async()=>{
    const firstUser = db.getFirstSync(
        "SELECT * FROM users LIMIT 1"
    )
    setOutput(JSON.stringify(firstUser, null, 2));
  }

  const updateUser = async()=>{
    db.runSync(
        "UPDATE users SET age = ? WHERE id = ? ",
        25,
        1
    );
    setOutput("User updated successfully");
  }

  const deleteUser = async()=>{
    db.runSync(
        "DELETE FROM users WHERE id = ?",
        1
    );
    setOutput("User deleted successfully");
  }

//   const closeDatabase = async()=>{
//     db.closeSync();
//     setOutput("Database closed successfully");
//   }

  const dropTable = async()=>{
    db.execSync(
        "DROP TABLE IF EXISTS users"
    );
    setOutput("Table dropped successfully");
  }

  useEffect(()=>{
    createTable
  }, [])


  return (
    <SafeAreaView
    style={{
      flex: 1,
    }}
  >
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        SQLite Demo
      </Text>

      <Button
        title="Create Table"
        onPress={createTable}
      />

      <Button
        title="Insert User"
        onPress={insertUser}
      />

      <Button
        title="Get All Users"
        onPress={getUsers}
      />

      <Button
        title="Get First User"
        onPress={getFirstUser}
      />

      <Button
        title="Update User"
        onPress={updateUser}
      />

      <Button
        title="Delete User"
        onPress={deleteUser}
      />

 
      <Button
        title="Drop Table"
        onPress={dropTable}
      />

      <View
        style={{
          marginTop: 20,
          padding: 16,
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Output
        </Text>

        <Text
          selectable
          style={{
            fontSize: 14,
          }}
        >
          {output}
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default index;

const styles = StyleSheet.create({});

//TODO: yh to chalo mene locally save krwa liya but ab isko agr DB ke sath sync karna hai to kese karna hai?
//? You read about TURSO DB and this SQlite database both are different but you can use this SQlite database to store data locally and then sync it with the TURSO DB.
//there is something push pull mechanism which will help to save locally and then simultaneously sync it with the TURSO DB.

//case 1: User is offline and you want to save the data locally

//case 2: User is online and you want to sync the data with the TURSO DB

//case 3: User is offline and first save the data locally and then later when user is online sync the data with the TURSO DB

// or add a button push-pull => push on demand and pull on demand
