import useThemeColor from "@/hooks/useThemeColor";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const SearchButton = () => {
  const { colors } = useThemeColor();

  return (
    <TouchableOpacity>
      <Octicons name="search" size={24} color={colors.icon} />
    </TouchableOpacity>
  );
};
