import { MenuButton } from "@/components/headerButtons/MenuButton";
import { SearchButton } from "@/components/headerButtons/SearchButton";
import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function authLayout() {
  const { colors } = useThemeColor();

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: colors.headerBc,
          },
          headerRight: () => <SearchButton />,
          headerLeft: () => <MenuButton />,
        }}
      />
    </Stack>
  );
}
