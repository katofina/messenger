import { Redirect } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authState } from "@/redux/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeState } from "@/redux/ThemeSlice";
import { ThemeString } from "@/constants/theme/types";
import { langState } from "@/redux/LanguageSlice";
import { LanguageString } from "@/constants/language/types";
import database from "@react-native-firebase/database";

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const dispatch = useDispatch();

  async function getFromStorage() {
    try {
      const [theme, lang] = await Promise.all([
        AsyncStorage.getItem("theme"),
        AsyncStorage.getItem("lang"),
      ]);
      if (theme) dispatch(themeState.actions.setTheme(theme as ThemeString));
      if (lang) dispatch(langState.actions.setLang(lang as LanguageString));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFromStorage();
  }, []);
  
  auth().onAuthStateChanged((user) => {
    if (user) {
      setOnline(user.displayName!);
      setIsAuth(true);
      dispatch(authState.actions.setNick(user.displayName!));
      dispatch(authState.actions.setEmail(user.email!));
      if (user.photoURL) dispatch(authState.actions.setPhoto(user.photoURL!));
    } else setIsAuth(false);
  });
  function setOnline(nick: string) {
    database()
      .ref("nicknames/" + nick)
      .update({ online: true })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {isAuth ? (
        <Redirect href="/(auth)" />
      ) : (
        <Redirect href="/InitialNotAuth" />
      )}
    </>
  );
}
