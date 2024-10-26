import { ObjectColor } from "@/constants/theme/types";
import useLanguage from "@/hooks/useLanguage";
import useThemeColor from "@/hooks/useThemeColor";
import { chatMenuState } from "@/redux/ChatMenuSlice";
import { Store } from "@/redux/Store";
import { useEffect } from "react";
import { Pressable, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function ChatMenu() {
  const lang = useLanguage();
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const isOpen = useSelector((store: Store) => store.chatMenuState.isOpenChatMenu);
  useEffect(() => {
    if (isOpen) translateX.value = withTiming(0);
    else translateX.value = withTiming(width);
  }, [isOpen]);

  const width = useWindowDimensions().width;
  const translateX = useSharedValue(width);

  const dispatch = useDispatch();
  function openModule() {
    dispatch(chatMenuState.actions.openConfirmModule());
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <Pressable style={styles.button} onPress={openModule}>
        <Text style={styles.text}>{lang.deleteAllMessages}</Text>
      </Pressable>
    </Animated.View>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      backgroundColor: colors.background,
      right: 0,
      height: 40,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    },
    button: {
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: colors.text,
    },
  });
