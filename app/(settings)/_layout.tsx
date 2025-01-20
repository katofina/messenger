import useLanguage from "@/hooks/useLanguage";
import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import {BackButton} from "../../components/headerButtons/BackButton";

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
          headerTintColor: colors.text,
          headerLeft: () => (
            <BackButton/>
          )
        }}
      />
    </Stack>
  );
}
