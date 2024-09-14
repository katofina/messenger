import { MenuButton } from "@/components/headerButtons/MenuButton";
import { SearchButton } from "@/components/headerButtons/SearchButton";
import { store } from "@/redux/Store";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  auth().onAuthStateChanged((user) => {
    if (user) setInitialRoute('(auth)')
    else setInitialRoute('InitialNotAuth')
  });

  if (initialRoute) return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
          <Stack.Screen name="InitialNotAuth"/>
          <Stack.Screen name="(auth)"/>
          <Stack.Screen name="(sign)"/>
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}