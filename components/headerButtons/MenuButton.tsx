import useThemeColor from "@/hooks/useThemeColor";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const MenuButton = () => {
  const { colors } = useThemeColor();

  return (
    <TouchableOpacity>
      <SimpleLineIcons name="menu" size={24} color={colors.icon} />
    </TouchableOpacity>
  );
};
