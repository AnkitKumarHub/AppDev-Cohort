import { StyleSheet, Switch, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Background } from '@react-navigation/elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const themes ={
    light:{
        background: '#FFFFFF',
        card: '#F5F5F5',
        text: '#1A1A1A',
        subtext: '#666666',
        // accent: '#007AFF',
        accent: '#000000',
    },
    dark:{
        background: '#121212',
        card: '#1E1E1E',
        text: '#FFFFFF',
        subtext: '#AAAAAA',
        accent: '#FF4500',
    }
}

const HomeScreen = () => {

    const systemScheme = useColorScheme()  // 'light' or 'dark'
    console.log({ systemScheme })

    const [manualDark, setManualDark] = useState<boolean | null>(null)
    const isDark = manualDark !== null ? manualDark : systemScheme === 'dark'

    const theme = isDark ? themes.dark : themes.light
    
    return (
        <SafeAreaView
          style={[styles.container, { backgroundColor: theme.background }]}
        >
          <StatusBar style={manualDark ? "light" : "dark"} />
          {/* Header */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.title, { color: theme.text }]}>
              {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Text>
            <Text style={[styles.subtitle, { color: theme.subtext }]}>
              System preference: {systemScheme ?? "unknown"}
            </Text>
          </View>
    
          {/* Toggle Row */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.row}>
              <Text style={[styles.label, { color: theme.text }]}>
                Override system theme
              </Text>
              <Switch
                value={manualDark ?? systemScheme === "dark"}
                onValueChange={setManualDark}
                trackColor={{ false: "#ddd", true: theme.accent }}
                thumbColor="white"
              />
            </View>
          </View>
    
          {/* Content Card */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.title, { color: theme.accent }]}>
              Themed Card 🎨
            </Text>
            <Text style={[styles.subtitle, { color: theme.subtext }]}>
              Colors adapt to dark/light mode automatically
            </Text>
          </View>
        </SafeAreaView>
      );
    };


export default HomeScreen

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    card: { padding: 20, borderRadius: 16 },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: { fontSize: 20, fontWeight: "bold" },
    subtitle: { fontSize: 14, marginTop: 4 },
    label: { fontSize: 16 },
  });

// Hook - useColorScheme() -> gives you the color scheme of the app

/**
 * ImageBackground 
 * TouchableOpacity 
*/
