import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { File, Directory, Paths } from "expo-file-system";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image';

const index = () => {
  const [output, setOutput] = useState<string>("");
  const [downloadedImageUri, setDownloadedImageUri] = useState<string | null>(
    null,
  );

  //creating file instance
  const demoFile = new File(Paths.document, "demo.txt");
  console.log(Paths.document);

  const copiedFile = new File(Paths.document, "copy-demo.txt");
  console.log(copiedFile);

  const movedFile = new File(Paths.document, "moved-demo.txt");

  //* Directory
  const notesDirectory = new Directory(Paths.document, "notes");
  console.log(notesDirectory);

  //* Write in file
  const writeFile = async () => {
    demoFile.write("Hello expo file system ");
    setOutput("File written successfully");
  };

  //* Read from file
  const readFile = async () => {
    const data = await demoFile.text();
    setOutput(data);
    return data;
  };

  //* Append to file
  const appendFile = async () => {
    // const oldData = await readFile();
    const oldData = await demoFile.text();
    demoFile.write(oldData + "\n  new data added");

    setOutput("File appended successfully");
  };

  //* Copy file
  const copyFile = async () => {
    demoFile.copy(copiedFile);
    setOutput("File copied successfully");
  };

  //* Move file
  const moveFile = async () => {
    copiedFile.move(movedFile);
    setOutput("File moved successfully");
  };

  //* Delete all files
  const deleteAllFile = async () => {
    const filesToRemove = [movedFile, copiedFile, demoFile];
    let deletedCount = 0;

    for (const file of filesToRemove) {
      if (!file.exists) continue;
      try {
        file.delete();
        deletedCount += 1;
      } catch (error) {
        console.error(`Failed to delete ${file.uri}`, error);
      }
    }

    setOutput(
      deletedCount > 0
        ? `Deleted ${deletedCount} file(s)`
        : "No files to delete (none exist)",
    );
  };

  //* Get file info
  const getFileInfo = async () => {
    const info = {
      exists: demoFile.exists,
      size: demoFile.size,
      uri: demoFile.uri,
      name: demoFile.name,
    };

    setOutput(JSON.stringify(info, null, 2));
  };

  //* Create folder
  const createFolder = () => {
    notesDirectory.create();
    setOutput("Folder created successfully");
  };

  //* Read directory
  const readDir = () => {
    const files = notesDirectory.list();
    setOutput(JSON.stringify(files.map((f) => f.uri), null, 2))
  };

  //* Download file
  const downloadFile = async () => {
    const folder = new Directory(Paths.cache, "images(copy)");
    folder.create();

    const downloadedFile = await File.downloadFileAsync(
      "https://picsum.photos/200/300?grayscale",
      folder,
    );

    setDownloadedImageUri(downloadedFile.uri);

    console.log(downloadedFile.uri);
    console.log(downloadedFile.exists);
    console.log(downloadedFile.size);

    setOutput(
      JSON.stringify(
        {
          uri: downloadedFile.uri,
          exists: downloadedFile.exists,
          size: downloadedFile.size,
        },
        null,
        2,
      ),
    );
  };

  //* Upload file
  const uploadFile = async()=>{
    try {
        // const uploadedfile = await File.pickFileAsync()
        // const content = await uploadedfile.text();
        // console.log(content);
        // setOutput(`Picked: ${uploadedfile.name}\n${content}`);

        const picked = await File.pickFileAsync(); // or */* etc.
        const uploadedFile = Array.isArray(picked) ? picked[0] : picked;
        if (!uploadedFile) {
          setOutput('No file selected');
          return;
        }
        const content = await uploadedFile.text();
        setOutput(`Picked: ${uploadedFile.name}\n${content}`);    
    } catch (error) {
      // handle user cancel vs real errors
      console.error(error);
      setOutput(String(error));
    }
  };

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
          Expo FileSystem Modern API
        </Text>

        <Button title="1. Write File" onPress={writeFile} />
        <Button title="2. Read File" onPress={readFile} />
        <Button title="3. Append File" onPress={appendFile} />
        <Button title="4. Get File Info" onPress={getFileInfo} />
        <Button title="5. Copy File" onPress={copyFile} />
        <Button title="6. Move File" onPress={moveFile} />
        <Button title="7. Create Folder" onPress={createFolder} />
        <Button title="8. Read Directory" onPress={readDir} />
        <Button title="9. Download File" onPress={downloadFile} />
        <Button title="10. Pick File" onPress={uploadFile} />
        <Button title="11. Delete All Files" onPress={deleteAllFile} />

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

          <Text selectable>{output}</Text>
        </View>

        {downloadedImageUri ? (
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Downloaded Image
            </Text>

            <Image
              source={{ uri: downloadedImageUri }}
              style={{
                width: 300,
                height: 300,
                borderRadius: 10,
              }}
              contentFit="cover"
            />
          </View>
        ) : null}

        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Paths.document
          </Text>

          <Text selectable>{Paths.document.uri}</Text>

          <Text
            style={{
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Paths.cache
          </Text>

          <Text selectable>{Paths.cache.uri}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

// you can also search about stream to send  in chunks
