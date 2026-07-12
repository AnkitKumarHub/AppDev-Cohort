import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      {/* <Link href={'/about'}>Go to About Page</Link> */}
      <Link href={'/login'}>Go to Login Page</Link>
      {/* <Link href={"/userId/123"}>UserId Page</Link> */}
      {/* here we are passing for username route but how expo router will identify it and pass it to the UserNameScreen ? */}
      {/* still moving to the userId page only so there is conflict --> fix: move to nested routes & if you still want so keep only 1 dynamic route at root level */}
      {/* <Link href={"/userName/John"}>UserName Page</Link>  */}
      {/* <Link href={"/docs/expo-router"}>Go to expo-router docs Page</Link>  */}
      {/* <Link href={"/docs/expo-router/installation"}>Go to expo-router/installation Page</Link>  */}
      {/* <Link href={'/Doc-02/ankit'}>Go to Ankit Page</Link> */}
      {/* <Link href={'/Doc-02/ankit/kumar'}>Go to Ankit Kumar Page</Link> */}
      {/* <Link href={'/Doc-02/ankit/kumar/bookmarks'}>Go to Ankit Kumar Bookmarks Page</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
