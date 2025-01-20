import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { chatMenuState } from "@/redux/ChatMenuSlice";
import ChatMenu from "@/components/chats/ChatMenu";
import useLanguage from "@/hooks/useLanguage";
import { Store } from "@/redux/Store";
import { Overlay } from "@/components/overlay/Overlay";
import { ResizingImage } from "@/components/images/ResizingImage";
import { BackButton } from "@/components/headerButtons/BackButton";

export default function ChatLayout() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const lang = useLanguage();

  const { nick, photo, online } = useLocalSearchParams<{
    nick: string;
    email: string;
    photo: string;
    online: string;
  }>()

  const dispatch = useDispatch();
  function openMenu() {
    dispatch(chatMenuState.actions.openChatMenu());
  }
  const isOpenMenu = useSelector((store: Store) => store.chatMenuState.isOpenChatMenu);

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
              <TouchableOpacity style={styles.container}>
                <ResizingImage url={photo} sizeImg={40} sizeView={40} />
                <View style={styles.textView}>
                  <Text style={styles.nick}>{nick}</Text>
                  {online === "true" ? (
                    <Text style={styles.online}>{lang.online}</Text>
                  ) : (
                    <Text style={styles.offline}>{lang.offline}</Text>
                  )}
                </View>
                <TouchableOpacity style={styles.buttonMenu} onPress={openMenu}>
                  <Entypo name="menu" size={24} color={colors.icon} />
                </TouchableOpacity>
              </TouchableOpacity>
              <ChatMenu />
              {isOpenMenu && <Overlay close={() => dispatch(chatMenuState.actions.closeChatMenu())} />}
            </>
          ),
          headerLeft: () => <BackButton />
        }}
      />
    </Stack>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: 300,
      justifyContent: "flex-start",
      zIndex: 1
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
      padding: 10,
    },
  });
