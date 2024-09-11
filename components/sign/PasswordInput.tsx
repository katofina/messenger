import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { IconEye } from "./IconEye";
import { useState } from "react";

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

  const bottomColor = isError ? "red" : "green";

  const styles = getStyles(bottomColor);

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
        cursorColor="grey"
      />
      <Pressable onPress={changeSecure}>
        <IconEye isClose={isSecure} />
      </Pressable>
    </View>
  );
};

const getStyles = (bottomColor: string) =>
  StyleSheet.create({
    viewInput: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      borderBottomColor: bottomColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      fontSize: 15,
    },
    textInput: {
      width: "90%",
    },
  });
