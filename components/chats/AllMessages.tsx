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

interface Props {
  data: string[][];
  stringRef: string;
}

export const AllMessages = ({ data, stringRef }: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const [isOpen, setIsOpen] = useState(false);
  const layoutY = useRef(0);
  const position = useRef("");

  function openMenu(event: GestureResponderEvent, index: string) {
    layoutY.current = event.nativeEvent.pageY;
    position.current = index;
    setIsOpen(true);
  }
  function closeMenu() {
    setIsOpen(false);
  }

  async function copy() {
    const message = data.find((item) => item[0] === position.current)!;
    const { text } = divideMessage(message[1]);
    await Clipboard.setStringAsync(text);
    setIsHint(true);
    closeMenu();
  }
  const [isHint, setIsHint] = useState(false);
  const closeHint = () => setIsHint(false);

  const isOpenChatMenu = useSelector((store: Store) => store.chatMenuState);
  const dispatch = useDispatch();
  const closeMenuChat = () => {
    dispatch(chatMenuState.actions.closeChatMenu());
    dispatch(chatMenuState.actions.closeModule());
  };

  const refFlat = useRef<FlatList<string[]>>(null);
  function scrollEnd() {
    refFlat.current && refFlat.current.scrollToEnd({ animated: true });
  }
  useEffect(() => {
    scrollEnd;
  }, [data]);

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
                    },
                  ]}
                >
                  {text}
                </Text>
              )}
              <Text style={[styles.dateText, { left: isOwnMess ? "25%" : 10 }]}>
                {stringWithoutGMT}
              </Text>
            </Pressable>
          );
        }}
      />
      <MessageMenu
        isOpen={isOpen}
        layoutY={layoutY.current}
        stringRef={stringRef}
        position={position.current}
        closeMenu={closeMenu}
        copy={copy}
      />
      {isOpen && <Overlay close={closeMenu} />}
      <Hint
        bcColor={colors.success}
        text={"Successfully copy to clipboard."}
        isOpen={isHint}
        close={closeHint}
      />
      {(isOpenChatMenu.isOpen || isOpenChatMenu.isOpenModule) && (
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
      borderColor: colors.headerBc,
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
