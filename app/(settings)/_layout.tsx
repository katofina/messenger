import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const { colors } = useThemeColor();

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Settings",
          headerStyle: { backgroundColor: colors.headerBc },
          headerTintColor: colors.text
        }}
      />
    </Stack>
  );
}
