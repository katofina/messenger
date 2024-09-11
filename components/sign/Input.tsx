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
  const bottomColor = isError ? 'red' : 'green';

  const styles = getStyles(bottomColor);

  return (
    <TextInput
      style={styles.textInput}
      autoCapitalize="none"
      onBlur={onBlur}
      autoCorrect={false}
      placeholder={placeholder}
      onChangeText={(value) => onChange(value)}
      value={value}
      cursorColor="grey"
    />
  );
};

const getStyles = (bottomColor: string) => StyleSheet.create({
  textInput: {
    width: "80%",
    borderBottomColor: bottomColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
  },
});
