import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export const BackButton = () => {
  const { colors } = useThemeColor();

  function back() {
    router.back();
  }

  return (
    <TouchableOpacity style={styles.button} onPress={back}>
      <Ionicons name="chevron-back" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingRight: 20,
  },
});