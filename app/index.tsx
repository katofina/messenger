import InitialAuth from "@/components/initialScreens/InitialAuth";
import InitialNotAuth from "@/components/initialScreens/InitialNotAuth";
import useThemeColor from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function initiallScreen() {
  const [auth, setAuth] = useState(false); //from asyncStorage or firebase
  const { colors } = useThemeColor();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.headerBc,
      },
    });
  }, [colors]);

  if (auth) return <InitialAuth />;
  else
    return (
      <SafeAreaView>
        <InitialNotAuth />
      </SafeAreaView>
    );
}
