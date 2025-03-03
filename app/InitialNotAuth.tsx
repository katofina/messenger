import { ObjectColor } from "@/constants/theme/types";
import useLanguage from "@/hooks/useLanguage";
import useThemeColor from "@/hooks/useThemeColor";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function InitialNotAuth() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const marginLeft = useSharedValue(0);
  useEffect(() => {
    marginLeft.value = withTiming(40,{ duration: 1000 },
      () => (marginLeft.value = withSpring(0)),
    );
  }, [marginLeft]);

  const lang = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{lang.welcome}</Text>
      <Link href="/(sign)/SignUp" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>{lang.start}</Text>
          <Animated.View style={[styles.animView, {marginLeft}]}>
            <Entypo name="chevron-small-right" size={24} color={colors.icon} />
          </Animated.View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 50,
    },
    mainText: {
      fontSize: 30,
      color: colors.text,
    },
    animView: {
      backgroundColor: colors.background,
    },
    button: {
      width: 150,
      height: 40,
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      backgroundColor: colors.button,
      shadowColor: "grey",
      shadowOpacity: 0.5,
      elevation: 10,
    },
    text: {
      color: colors.text,
    },
  });
