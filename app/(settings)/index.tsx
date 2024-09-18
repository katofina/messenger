import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uploadPhoto from "@/functions/firebase/uploadPhoto";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";

export default function Settings() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const nick = useSelector((store: Store) => store.authState.nick);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadPhoto(result.assets[0].uri, nick);
    };
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      uploadPhoto(result.assets[0].uri, nick);
    };
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <MaterialIcons name="add-a-photo" size={24} color={colors.icon} />
        <Text style={styles.text}>Set Profile Photo from Galery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickPhoto}>
        <MaterialIcons name="add-a-photo" size={24} color={colors.icon} />
        <Text style={styles.text}>Set Profile Photo from Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Feather name="edit-3" size={24} color={colors.icon} />
        <Text style={styles.text}>Edit Nickname</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    button: {
      width: "100%",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.borderInput,
      height: 50,
      alignItems: "center",
      paddingLeft: 20,
      flexDirection: "row",
      gap: 20,
    },
    text: {
      color: colors.text,
    },
  });
