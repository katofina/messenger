import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import storage from '@react-native-firebase/storage';
import * as ImagePicker from "expo-image-picker";

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
      const ref = storage().ref(nick);
      try {
        await ref.putFile(result.assets[0].uri);
        const url = await ref.getDownloadURL();
        await database().ref(nick).set({
          photoUrl: url
        });
        console.log('success');
      } catch (error) {
        console.log(error);
      };
    };
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      database().ref(nick).set({ photo: result.assets[0].uri });
    }
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
