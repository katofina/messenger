import { colors } from "@/constants/theme/colors";
import { ThemeString } from "@/constants/theme/types";
import { useColorScheme } from "react-native";

export default function getThemeColor(theme: ThemeString) {
  const systemTheme = useColorScheme();

  switch (theme) {
    case 'light': return colors.light
    case 'dark': return colors.dark
    case 'system': {
      if (systemTheme === 'dark') return colors.dark;
      else return colors.light
    }
    default: return colors.light
  };
};
