import useThemeColor from "@/hooks/useThemeColor";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";

export const SearchButton = () => {
  const { colors } = useThemeColor();

  return (
    <TouchableOpacity style={styles.button}>
      <Octicons name="search" size={20} color={colors.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingRight: 20,
  }
})
