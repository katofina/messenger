import { Text, View, StyleSheet, FlatList } from "react-native";

export default function InitialAuth() {
  const data = ["allChats"];
  console.log("p");

  return (
    <View style={styles.container}>
      <Text>Chats:</Text>
      <FlatList data={data} renderItem={({ item }) => <Text>{item}</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});
