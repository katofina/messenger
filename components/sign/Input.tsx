import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
  isError: boolean;
}

export const Input = ({
  placeholder,
  onBlur,
  onChange,
  value,
  isError,
}: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(isError, colors);

  return (
    <TextInput
      style={styles.textInput}
      autoCapitalize="none"
      onBlur={onBlur}
      autoCorrect={false}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholder}
      onChangeText={(value) => onChange(value)}
      value={value}
      cursorColor={colors.cursor}
    />
  );
};

const getStyles = (isError: boolean, colors: ObjectColor) => StyleSheet.create({
  textInput: {
    width: "80%",
    borderBottomColor: isError ? colors.error : colors.borderInput,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    color: colors.text
  },
});
