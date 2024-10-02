import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "../menu/Avatar";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";
import { Entypo, Feather } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import useLanguage from "@/hooks/useLanguage";
import database from "@react-native-firebase/database";

export function DrawerContent() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const lang = useLanguage();

  const user = useSelector((store: Store) => store.authState);

  function goToSettings() {
    router.navigate("/(settings)");
  }

  function logOut() {
    auth()
      .signOut()
      .then(() => router.replace("/InitialNotAuth"));
    database()
        .ref("nicknames/" + user.nick)
        .update({ online: false });
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.avatarView}>
          <Avatar photo={user.photoURL} sizeImg={80} sizeView={80} />
          <Text style={styles.nick}>{user.nick}</Text>
        </View>
        <DrawerItem
          icon={() => <Feather name="settings" size={18} color={colors.icon} />}
          label={lang.settings}
          labelStyle={styles.label}
          onPress={goToSettings}
        />
        <DrawerItem
          icon={() => <Entypo name="log-out" size={18} color={colors.icon} />}
          label={lang.logout}
          labelStyle={styles.label}
          onPress={logOut}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    avatarView: {
      backgroundColor: colors.headerBc,
      padding: 10,
    },
    name: {
      color: colors.text,
    },
    nick: {
      color: colors.borderInput,
    },
    label: {
      color: colors.text,
    },
  });
