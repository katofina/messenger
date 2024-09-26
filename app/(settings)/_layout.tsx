import useLanguage from "@/hooks/useLanguage";
import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const { colors } = useThemeColor();
  const lang = useLanguage();

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerTitle: lang.settings,
          headerStyle: { backgroundColor: colors.headerBc },
          headerTintColor: colors.text
        }}
      />
    </Stack>
  );
}
