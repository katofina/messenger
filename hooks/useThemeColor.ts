import { Colors } from "@/constants/Colors";
import { Store } from "@/redux/Store";
import { useSelector } from "react-redux";

export function useThemeColor() {
  const theme = useSelector((store: Store) => store.themeState.theme);

  switch (theme) {
    case 'light': return Colors.light
    case 'dark': return Colors.dark
    default: return Colors.light
  }
};
