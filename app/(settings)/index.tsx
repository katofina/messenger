import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uploadPhoto from "@/functions/firebase/uploadPhoto";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import { useState } from "react";
import { ModalInput } from "@/components/menu/ModalInput";

export default function Settings() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const stringRef = useSelector((store: Store) => store.authState.stringRef);
  const [isModal, setIsModal] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadPhoto(result.assets[0].uri, stringRef);
    }
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      uploadPhoto(result.assets[0].uri, stringRef);
    }
  };

  const changeNickname = () => {
    setIsModal(true);
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
      <TouchableOpacity style={styles.button} onPress={changeNickname}>
        <Feather name="edit-3" size={24} color={colors.icon} />
        <Text style={styles.text}>Edit Nickname</Text>
      </TouchableOpacity>
      <ModalInput isOpen={isModal} close={() => setIsModal(false)} />
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
