import useThemeColor from "@/hooks/useThemeColor";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export const SearchButton = () => {
  const { colors } = useThemeColor();

  function goToSearch() {
    router.push("/(search)");
  }

  return (
    <TouchableOpacity style={styles.button} onPress={goToSearch}>
      <Octicons name="search" size={20} color={colors.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingRight: 20,
  },
});
