import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { IconEye } from "./IconEye";
import { useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";

interface Props {
  placeholder: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
  isError: boolean;
}

export const PasswordInput = ({
  placeholder,
  onBlur,
  onChange,
  value,
  isError,
}: Props) => {
  const [isSecure, setIsSecure] = useState(true);

  const changeSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const { colors } = useThemeColor();
  const styles = getStyles(isError, colors);

  return (
    <View style={styles.viewInput}>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={isSecure}
        onBlur={onBlur}
        onChangeText={(value) => onChange(value)}
        value={value}
        cursorColor={colors.cursor}
        placeholderTextColor={colors.placeholder}
      />
      <Pressable onPress={changeSecure}>
        <IconEye isClose={isSecure} color={colors.icon}/>
      </Pressable>
    </View>
  );
};

const getStyles = (isError: boolean, colors: ObjectColor) =>
  StyleSheet.create({
    viewInput: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      borderBottomColor: isError ? colors.error : colors.borderInput,
      borderBottomWidth: StyleSheet.hairlineWidth,
      fontSize: 15,
    },
    textInput: {
      width: "90%",
    },
  });
