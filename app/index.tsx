import InitialAuth from "@/components/initialScreens/InitialAuth";
import InitialNotAuth from "@/components/initialScreens/InitialNotAuth";
import { themeState } from "@/redux/ThemeSlice";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function initiallScreen() {
  const [auth, setAuth] = useState(false); //from asyncStorage or firebase
  const theme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    theme ? dispatch(themeState.actions.setTheme(theme)) :
      dispatch(themeState.actions.setTheme('light'));
  }, [theme]);

  if (auth) return <InitialAuth />;
  else
    return (
      <SafeAreaView>
        <InitialNotAuth />
      </SafeAreaView>
    );
}
