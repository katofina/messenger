import { ObjectColor } from "@/constants/theme/types";
import divideMessage from "@/functions/firebase/divideMessage";
import useThemeColor from "@/hooks/useThemeColor";
import {
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  useWindowDimensions,
} from "react-native";
import { MessageMenu } from "./MessageMenu";
import { useRef, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Hint } from "../Hint";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Props {
  data: string[][];
  stringRef: string;
}

export const AllMessages = ({ data, stringRef }: Props) => {
  const { colors } = useThemeColor();
  const { height, width } = useWindowDimensions();
  const styles = getStyles(colors, height, width);

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
    const {text} = divideMessage(message[1]);
    await Clipboard.setStringAsync(text);
    setIsHint(true);
    closeMenu();
  }
  const [isHint, setIsHint] = useState(false);
  const closeHint = () => setIsHint(false);

  return (
    <GestureHandlerRootView>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={data}
        CellRendererComponent={({ children }) => children}
        renderItem={({ item, index }) => {
          const { date, user, text } = divideMessage(item[1]);
          if (user === stringRef) {
            return (
              <Pressable
                style={[styles.viewText, { zIndex: -index }]}
                onPress={(event: GestureResponderEvent) =>
                  openMenu(event, item[0])
                }
              >
                <Text
                  textBreakStrategy="simple"
                  style={[
                    styles.text,
                    { borderBottomLeftRadius: 20, left: "20%" },
                  ]}
                >
                  {text}
                </Text>
                <Text style={[styles.dateText, { left: "25%" }]}>{date}</Text>
              </Pressable>
            );
          } else {
            return (
              <Pressable
                style={[styles.viewText, { zIndex: -index }]}
                onPress={(event: GestureResponderEvent) =>
                  openMenu(event, item[0])
                }
              >
                <Text style={[styles.text, { borderBottomRightRadius: 20 }]}>
                  {text}
                </Text>
                <Text style={[styles.dateText, { left: 10 }]}>{date}</Text>
              </Pressable>
            );
          }
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
      {isOpen && <Pressable style={styles.overlay} onPress={closeMenu} />}
      <Hint
        bcColor={colors.success}
        text={"Successfully copy to clipboard."}
        isOpen={isHint}
        close={closeHint}
      />
    </GestureHandlerRootView>
  );
};

const getStyles = (colors: ObjectColor, height: number, width: number) =>
  StyleSheet.create({
    flatList: {
      gap: 10,
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
    overlay: {
      backgroundColor: "transparent",
      height: height,
      width: width,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
    },
  });
