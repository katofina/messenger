import { store } from "@/redux/Store";
import { Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
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
                <TouchableOpacity>
                  <Octicons name="search" size={24} color="black" />
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity>
                  <SimpleLineIcons name="menu" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="(sign)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
