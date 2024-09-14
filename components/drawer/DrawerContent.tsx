import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "../menu/Avatar";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";
import { Feather } from "@expo/vector-icons";

export function DrawerContent() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  function goToSettings(){}

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.avatarView}>
          <Avatar sizeImg={35} sizeView={80}/>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.nick}>Nick</Text>
        </View>
        <DrawerItem
          icon={() => <Feather name="settings" size={18} color={colors.icon} />}
          label='Settings'
          labelStyle={styles.label}
          onPress={goToSettings}
        />
      </DrawerContentScrollView>
    </View>
  );
}
const getStyles = (colors: ObjectColor) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  avatarView: {
    backgroundColor: colors.headerBc,
    padding: 10
  },
  name: {
    color: colors.text
  },
  nick: {
    color: colors.borderInput
  },
  label: {
    color: colors.text
  }
})