import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: true }} />
      <View style={styles.container}>
        <Text style={styles.mainText}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: 'white'
  },
  mainText: {
    fontSize: 25
  },
  link: {
    marginTop: 15,
    borderBottomColor: 'purple',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
});
