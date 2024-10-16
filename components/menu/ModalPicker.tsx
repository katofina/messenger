import { ObjectColor } from "@/constants/theme/types";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import { Fontisto } from "@expo/vector-icons";

interface Props {
  isOpen: boolean;
  data: string[];
  title: string;
  active: string;
  onChange: (item: string) => void;
}

export const ModalPicker = ({
  isOpen,
  data,
  title,
  active,
  onChange,
}: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const height = useWindowDimensions().height;
  const translateY = useSharedValue(-height);
  useEffect(() => {
    if (isOpen) translateY.value = withSpring(height / 4);
    else translateY.value = withTiming(-height);
  }, [isOpen]);

  return (
    <Animated.View
      style={[
        { transform: [{ translateY }] },
        styles.animView,
        StyleSheet.absoluteFill,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {data.map((item, index) => (
          <Pressable
            key={index}
            style={styles.button}
            onPress={() => onChange(item)}
          >
            {item === active ? (
              <Fontisto name="radio-btn-active" size={18} color={colors.icon} />
            ) : (
              <Fontisto
                name="radio-btn-passive"
                size={18}
                color={colors.icon}
              />
            )}
            <Text style={styles.text}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
};

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    animView: {
      height: 250,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1
    },
    titleView: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    title: {
      color: colors.text,
      fontSize: 20,
    },
    container: {
      minHeight: 200,
      maxHeight: 400,
      width: "70%",
      backgroundColor: colors.background,
      shadowColor: colors.shadowColor,
      elevation: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      height: 50,
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      flexDirection: "row",
      gap: 10,
      paddingLeft: 20,
    },
    text: {
      color: colors.text,
      fontSize: 15,
    },
  });
