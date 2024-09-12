import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Text, View, StyleSheet, FlatList } from "react-native";

export default function InitialAuth() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const data = ["allChats"];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chats:</Text>
      <FlatList data={data} renderItem={({ item }) => <Text>{item}</Text>} />
    </View>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  });
