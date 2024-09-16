import { store } from "@/redux/Store";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="InitialNotAuth" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(sign)" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
