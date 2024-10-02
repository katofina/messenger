import { Avatar } from "@/components/menu/Avatar";
import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Store } from "@/redux/Store";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import database from "@react-native-firebase/database";
import { Entypo } from "@expo/vector-icons";
import { chatMenuState } from "@/redux/ChatMenuSlice";
import ChatMenu from "@/components/chats/ChatMenu";

export default function ChatLayout() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const user = useSelector((store: Store) => store.authState);
  const { nick, email, photo, online } = useLocalSearchParams<{
    nick: string;
    email: string;
    photo: string;
    online: string;
  }>();

  useEffect(() => {
    database()
      .ref(user.stringRef + "/chats/" + email)
      .update({
        info: { nick: nick, email: email, photo: photo, online: online },
      });
    database()
      .ref(email + "/chats/" + user.stringRef)
      .update({
        info: {
          nick: user.nick,
          email: user.stringRef,
          photo: user.photoURL,
          online: "true",
        },
      });
  }, []);

  const dispatch = useDispatch();
  function openMenu() {
    dispatch(chatMenuState.actions.openChatMenu());
  }

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.headerBc },
          headerTintColor: colors.text,
          headerRight: () => (
            <>
              <View style={styles.container}>
                <Avatar photo={photo} sizeImg={45} sizeView={45} />
                <View style={styles.textView}>
                  <Text style={styles.nick}>{nick}</Text>
                  {online === "true" ? (
                    <Text style={styles.online}>Online</Text>
                  ) : (
                    <Text style={styles.offline}>Offline</Text>
                  )}
                </View>
              </View>
              <Pressable style={styles.buttonMenu} onPress={openMenu}>
                <Entypo name="menu" size={24} color={colors.icon} />
              </Pressable>
              <ChatMenu />
            </>
          ),
        }}
      />
    </Stack>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "85%",
      zIndex: 0,
      justifyContent: "flex-start",
    },
    textView: {
      paddingLeft: 15,
    },
    nick: {
      color: colors.text,
      fontSize: 19,
    },
    online: {
      color: colors.online,
    },
    offline: {
      color: colors.offline,
    },
    buttonMenu: {
      height: "100%",
      justifyContent: "center",
      position: "absolute",
      right: 0,
    },
  });
