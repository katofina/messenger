import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native";
interface Props {
  sizeImg: number;
  sizeView: number;
  photo?: string;
}

export const Avatar = ({ sizeImg, sizeView, photo }: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors, sizeView);

  return (
    <View style={styles.avatar}>
      {photo ? (
        <Image
          source={{ uri: photo }}
          height={sizeImg}
          width={sizeImg}
          style={styles.image}
        />
      ) : (
        <AntDesign name="user" size={sizeImg - 20} color={colors.icon} />
      )}
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
    image: {
      borderRadius: 50,
    },
  });
