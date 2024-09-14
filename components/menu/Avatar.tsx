import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

interface Props {
  sizeImg: number;
  sizeView: number;
};

export const Avatar = ({sizeImg, sizeView}: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors, sizeView);

  return (
    <View style={styles.avatar}>
      <AntDesign name="user" size={sizeImg} color={colors.icon} />
    </View>
  );
};

const getStyles = (colors: ObjectColor, sizeView: number) =>
  StyleSheet.create({
    avatar: {
      borderWidth: 1,
      width: sizeView,
      height: sizeView,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      backgroundColor: colors.avatar,
    },
  });
