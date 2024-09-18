import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Store } from "@/redux/Store";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database";
interface Props {
  sizeImg: number;
  sizeView: number;
}

export const Avatar = ({ sizeImg, sizeView }: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors, sizeView);
  const nick = useSelector((store: Store) => {
    return store.authState.nick;
  });

  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    database()
      .ref(nick)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUrl(data.photoUrl);
        }
      });
  }, []);

  return (
    <View style={styles.avatar}>
      {url ? (
        <Image source={{ uri: url }} height={sizeImg} width={sizeImg} style={styles.image} />
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
      borderRadius: 50
    }
  });
