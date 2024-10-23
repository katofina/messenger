import { ObjectColor } from "@/constants/theme/types";
import divideMessage from "@/functions/firebase/divideMessage";
import useThemeColor from "@/hooks/useThemeColor";
import {
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  Image,
  View,
  Share,
} from "react-native";
import { MessageMenu } from "./MessageMenu";
import { useEffect, useRef, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Hint } from "../Hint";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import { chatMenuState } from "@/redux/ChatMenuSlice";
import { ConfirmModule } from "./ConfirmModule";
import { Overlay } from "../overlay/Overlay";
import useLanguage from "@/hooks/useLanguage";

interface Props {
  data: string[][];
  stringRef: string;
}

export const AllMessages = ({ data, stringRef }: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const lang = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const layoutY = useRef(0);
  const messageInfo = useRef({message: "", position: ""});

  function openMenu(event: GestureResponderEvent, index: string) {
    layoutY.current = event.nativeEvent.pageY;
    const message = data.find((item) => item[0] === index)!;
    const { text } = divideMessage(message[1]);
    messageInfo.current = {message: text, position: index};
    setIsOpen(true);
  }
  function closeMenu() {
    setIsOpen(false);
  }

  async function copy() {
    await Clipboard.setStringAsync(messageInfo.current.message);
    setIsHint(true);
    closeMenu();
  }
  const [isHint, setIsHint] = useState(false);
  const closeHint = () => setIsHint(false);

  const isOpenChatMenu = useSelector((store: Store) => store.chatMenuState);
  const dispatch = useDispatch();
  const closeMenuChat = () => {
    dispatch(chatMenuState.actions.closeChatMenu());
    dispatch(chatMenuState.actions.closeConfirmModule());
  };

  const refFlat = useRef<FlatList<string[]>>(null);
  function scrollEnd() {
    refFlat.current && refFlat.current.scrollToEnd({ animated: true });
  }
  useEffect(() => {
    scrollEnd;
  }, [data]);

  function share() {
    Share.share({message: messageInfo.current.message, title: lang.share});
  };

  return (
    <GestureHandlerRootView>
      <FlatList
        contentContainerStyle={styles.flatList}
        ref={refFlat}
        data={data}
        inverted={true}
        renderItem={({ item, index }) => {
          const { stringWithoutGMT, user, text } = divideMessage(item[1]);
          const isImage = text.includes("imageURL:");
          const isOwnMess = user === stringRef;
          return (
            <Pressable
              style={[styles.viewText, { zIndex: -index }]}
              onPress={(event: GestureResponderEvent) =>
                openMenu(event, item[0])
              }
            >
              {isImage ? (
                <Image
                  source={{ uri: text.slice(9) }}
                  style={[
                    styles.image,
                    {
                      left: isOwnMess ? "20%" : 0,
                      borderBottomRightRadius: isOwnMess ? 0 : 20,
                      borderBottomLeftRadius: isOwnMess ? 20 : 0,
                      borderColor: isOwnMess
                        ? colors.headerBc
                        : colors.messageOutside,
                    },
                  ]}
                />
              ) : (
                <Text
                  style={[
                    styles.text,
                    {
                      borderBottomRightRadius: isOwnMess ? 0 : 20,
                      borderBottomLeftRadius: isOwnMess ? 20 : 0,
                      left: isOwnMess ? "20%" : 0,
                      backgroundColor: isOwnMess
                        ? colors.headerBc
                        : colors.messageOutside,
                    },
                  ]}
                >
                  {text}
                </Text>
              )}
              <View style={{alignItems: isOwnMess ? "flex-end" : "flex-start"}}>
                <Text style={[styles.dateText]}>
                  {stringWithoutGMT}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
      <MessageMenu
        isOpen={isOpen}
        layoutY={layoutY.current}
        stringRef={stringRef}
        position={messageInfo.current.position}
        closeMenu={closeMenu}
        copy={copy}
        share={share}
      />
      {isOpen && <Overlay close={closeMenu} />}
      <Hint
        bcColor={colors.success}
        text={"Successfully copy to clipboard."}
        isOpen={isHint}
        close={closeHint}
      />
      {(isOpenChatMenu.isOpenChatMenu ||
        isOpenChatMenu.isOpenConfirmModule) && (
        <Overlay close={closeMenuChat} />
      )}
      <ConfirmModule />
    </GestureHandlerRootView>
  );
};

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    flatList: {
      gap: 10,
    },
    viewText: {
      position: "relative",
      width: "100%",
    },
    image: {
      width: 300,
      height: 300,
      borderWidth: 5,
      borderRadius: 20,
    },
    text: {
      color: colors.text,
      padding: 7,
      paddingLeft: 10,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      width: "80%",
      shadowColor: colors.shadowColor,
      elevation: 10,
    },
    dateText: {
      color: colors.text,
    },
  });
