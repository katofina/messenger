import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import useLanguage from "@/hooks/useLanguage";

export default function SearchLayout() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  function sendInput(input: string) {
    router.setParams({ input });
  };

  const lang = useLanguage();

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.headerBc },
          headerTintColor: colors.text,
          headerRight: () => (
            <TextInput
              onChangeText={sendInput}
              placeholder={lang.search}
              placeholderTextColor={colors.placeholder}
              cursorColor={colors.cursor}
              style={styles.input}
              autoFocus={true}
            />
          ),
        }}
      />
    </Stack>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    input: {
      width: "85%",
      fontSize: 20,
      color: colors.text,
    },
  });
