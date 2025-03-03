import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { useEffect } from "react";
import { Pressable, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import useLanguage from "@/hooks/useLanguage";
import database from "@react-native-firebase/database";
import { useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

interface Prop {
  isOpen: boolean;
  layoutY: number;
  stringRef: string;
  position: string;
  closeMenu: () => void;
  copy: () => void;
  share: () => void;
}

const MENU_HEIGHT = 160;

export const MessageMenu = ({
  isOpen,
  layoutY,
  stringRef,
  position,
  closeMenu,
  copy,
  share,
}: Prop) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const lang = useLanguage();

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const translateX = useSharedValue(width);
  const headerHeight = useHeaderHeight();
  const bottomHeight = (height - headerHeight) * 0.07;
  const bodyHeight = height - headerHeight - bottomHeight;
  let top = layoutY - headerHeight;

  useEffect(() => {
    if (isOpen) translateX.value = withTiming(0);
    else translateX.value = withTiming(width);
  }, [isOpen]);

  const { email } = useLocalSearchParams();
  function deleteForYourSelf() {
    database()
      .ref(stringRef + "/chats/" + email + "/messages")
      .update({ [position]: null });
    closeMenu();
  }
  function deleteForBoth() {
    deleteForYourSelf();
    database()
      .ref(email + "/chats/" + stringRef + "/messages")
      .update({ [position]: null });
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX }],
          top: top + MENU_HEIGHT > bodyHeight ? top - MENU_HEIGHT : top,
        },
      ]}
    >
      <Pressable style={styles.button} onPress={share}>
        <Text style={styles.text}>{lang.share}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={copy}>
        <Text style={styles.text}>{lang.copy}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={deleteForYourSelf}>
        <Text style={styles.text}>{lang.deleteForYouself}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={deleteForBoth}>
        <Text style={styles.text}>{lang.deleteForBoth}</Text>
      </Pressable>
    </Animated.View>
  );
};

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      height: MENU_HEIGHT,
      backgroundColor: colors.background,
      position: "absolute",
      left: "40%",
      shadowColor: colors.shadowColor,
      elevation: 10,
      width: 150,
      zIndex: 10,
    },
    button: {
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    text: {
      color: colors.text,
    },
  });
