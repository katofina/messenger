import { MenuButton } from "@/components/headerButtons/MenuButton";
import { SearchButton } from "@/components/headerButtons/searchButton";
import { store } from "@/redux/Store";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack initialRouteName="index">
          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
              headerTitle: "",
              headerRight: () => (
                <SearchButton />
              ),
              headerLeft: () => (
                <MenuButton />
              ),
            }}
          />
          <Stack.Screen name="(sign)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}