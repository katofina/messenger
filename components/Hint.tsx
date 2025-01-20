import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { useEffect } from "react";
import { useWindowDimensions, Text, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  isOpen: boolean;
  close: () => void;
  bcColor: string;
  text: string;
}

export const Hint = ({ isOpen, close, text, bcColor }: Props) => {
  const width = useWindowDimensions().width;
  const translateX = useSharedValue(-width);
  useEffect(() => {
    if (isOpen) {
      translateX.value = withSpring(40);
      setTimeout(() => {
        translateX.value = withTiming(width);
        close();
      }, 5000);
    }
  }, [isOpen]);

  const { colors } = useThemeColor();
  const styles = getStyles(colors, bcColor);

  const changeTranslation = () => (translateX.value = withTiming(width));
  const pan = Gesture.Pan().onTouchesMove(() => {
    runOnJS(changeTranslation)();
    runOnJS(close)();
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          { transform: [{ translateX }] },
          StyleSheet.absoluteFill,
          styles.animView,
        ]}
      >
        <View style={styles.view} />
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const getStyles = (colors: ObjectColor, bcColor: string) =>
  StyleSheet.create({
    animView: {
      width: "80%",
      backgroundColor: colors.headerBc,
      flexDirection: "row",
      borderColor: colors.borderInput,
      height: 50,
      alignItems: "center",
      zIndex: 10,
      marginTop: 10,
    },
    view: {
      height: "100%",
      width: 15,
      backgroundColor: bcColor,
    },
    text: {
      color: colors.text,
      paddingLeft: 20,
    },
  });
