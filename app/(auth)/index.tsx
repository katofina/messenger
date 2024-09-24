import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";

export default function InitialAuth() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const data = ["allChats"];

  const nick = useSelector((store: Store) => store.authState.nick);

  useEffect(() => {
    database()
      .ref("nicknames/" + nick)
      .update({ online: true });
    return () => {
      database()
        .ref("nicknames/" + nick)
        .update({ online: false });
    };
  }, []);

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
