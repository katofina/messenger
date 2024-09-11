import InitialAuth from "@/components/initialScreens/InitialAuth";
import InitialNotAuth from "@/components/initialScreens/InitialNotAuth";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function initiallScreen() {
  const [auth, setAuth] = useState(false); //from asyncStorage or firebase

  if (auth) return <InitialAuth />
  else return (
    <SafeAreaView>
      <InitialNotAuth />
    </SafeAreaView>
  );
}
