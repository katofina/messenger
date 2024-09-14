import InitialAuth from "@/components/initialScreens/InitialAuth";
import InitialNotAuth from "@/components/initialScreens/InitialNotAuth";
import useThemeColor from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

export default function initiallScreen() {
  const [isAuth, setIsAuth] = useState(false);
  const { colors } = useThemeColor();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.headerBc,
      },
    });
  }, [colors]);

  auth().onAuthStateChanged((user) => {
    if (user) setIsAuth(true)
    else setIsAuth(false)
  });

  if (isAuth) return <InitialAuth />;
  else
    return (
      <SafeAreaView>
        <InitialNotAuth />
      </SafeAreaView>
    );
}
