import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect, useRef, useState } from "react";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import divideMessage from "@/functions/firebase/divideMessage";
import useLanguage from "@/hooks/useLanguage";

export default function Chat() {
  const { email } = useLocalSearchParams();
  const stringRef = useSelector((store: Store) => store.authState.stringRef);

  const headerHeight = useHeaderHeight();
  const height = useWindowDimensions().height;
  const bodyHeight = height - headerHeight;

  const { colors } = useThemeColor();
  const styles = getStyles(colors, bodyHeight);

  const [text, setText] = useState<string>("");
  function onChangeText(text: string) {
    setText(text);
  }

  const [data, setData] = useState<Array<string>>([]);
  function getMessages() {
    database()
      .ref(stringRef + "/chats/" + email + "/messages")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const values: string[] = Object.values(data);
          const messages = values.filter((item) => item !== null);
          setData(messages);
        }
      });
  }
  useEffect(() => {
    getMessages();
  }, []);

  function sendMessage() {
    if (text.length) {
      const date = new Date().toString();
      const position = data.length + 1;
      database()
        .ref(stringRef + "/chats/" + email + "/messages")
        .update({ [position]: `${date}/${stringRef}:${text}` });
      database()
        .ref(email + "/chats/" + stringRef + "/messages")
        .update({ [position]: `${date}/${stringRef}:${text}` });
      setText("");
      getMessages();
    }
  }

  const lang = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.messagesView}>
        {data.length ? (
          <FlatList
            contentContainerStyle={styles.flatList}
            data={data}
            renderItem={({ item }) => {
              const { date, user, text } = divideMessage(item);
              if (user === stringRef) {
                return (
                  <View style={styles.viewText}>
                    <Text
                      textBreakStrategy="simple"
                      style={[
                        styles.text,
                        { borderBottomLeftRadius: 20, left: "20%" },
                      ]}
                    >
                      {text}
                    </Text>
                    <Text style={[styles.dateText, { left: "25%" }]}>
                      {date}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.viewText}>
                    <Text
                      style={[styles.text, { borderBottomRightRadius: 20 }]}
                    >
                      {text}
                    </Text>
                    <Text style={[styles.dateText, { left: 10 }]}>{date}</Text>
                  </View>
                );
              }
            }}
          />
        ) : (
          <Text>{lang.startDialog}</Text>
        )}
      </View>
      <View style={styles.bottom}>
        <TextInput
          onChangeText={onChangeText}
          placeholder={lang.message}
          placeholderTextColor={colors.placeholder}
          cursorColor={colors.cursor}
          style={styles.input}
          value={text}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (colors: ObjectColor, bodyHeight: number) =>
  StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.background,
    },
    flatList: {
      gap: 10,
    },
    messagesView: {
      height: bodyHeight * 0.93,
      backgroundColor: colors.chatBc,
      padding: 10,
    },
    bottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: bodyHeight * 0.07,
      backgroundColor: colors.background,
      shadowColor: colors.shadowColor,
      elevation: 10,
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    input: {
      height: 70,
      fontSize: 20,
      paddingLeft: 10,
      color: colors.text,
      width: "90%",
    },
    viewText: {
      position: "relative",
      width: "100%",
    },
    text: {
      color: colors.text,
      padding: 7,
      paddingLeft: 10,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: colors.headerBc,
      width: "80%",
    },
    dateText: {
      color: colors.text,
      position: "relative",
    },
  });
