pnpm create-expo-app -t blank-typescript@sdk-55
pnpm expo start
pnpm add @react-navigation/native 
pnpm expo install react-native-screens react-native-safe-area-context


Now we have to set up navigators --> 
pnpm add @react-navigation/native-stack
pnpm add @react-navigation/elements

Static naviagtor - 
code copy from the DOCS



1. navigate("") - go to screen by Name.
2. goBack() - will go to previous screen 
3. push("") - Always adds a new instance (always adds a new screen on top of the stack, even if that screen already exists below)
4. replace("") - replace the current screen --> splash screen Home , Login --> app
5. popToTop() - go back to first screen 
6. popTo("") - accepts args 
7. reset() - wipe the whole stack - want to return to the root screen 