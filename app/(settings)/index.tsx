import { ObjectColor, ThemeString } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uploadPhoto from "@/functions/firebase/uploadPhoto";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import { useState } from "react";
import { ModalInput } from "@/components/menu/ModalInput";
import { ModalTheme } from "@/components/menu/ModalTheme";
import { themeState } from "@/redux/ThemeSlice";
import { Hint } from "@/components/Hint";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { authState } from "@/redux/AuthSlice";
import database from "@react-native-firebase/database";
import useLanguage from "@/hooks/useLanguage";
import { langState } from "@/redux/LanguageSlice";
import { LanguageString } from "@/constants/language/types";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Settings() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const user = useSelector((store: Store) => store.authState);

  const [isInputModal, setIsInputModal] = useState(false);

  const theme = useSelector((store: Store) => store.themeState.theme);
  const [isThemeModal, setIsThemeModal] = useState(false);
  const dispatch = useDispatch();

  const uploadAndShow = async (uri: string) => {
    const isUpload = await uploadPhoto(uri, user.stringRef);
    if (isUpload.isSuccess) {
      setHint({
        color: colors.success,
        text: "Photo is successfully uploaded.",
        isOpen: true,
      });
      dispatch(authState.actions.setPhoto(isUpload.url!));
      database()
            .ref("nicknames/" + user.nick)
            .update({photoURL: isUpload.url});
    } else {
      setHint({
        color: colors.error,
        text: isUpload.error!,
        isOpen: true,
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadAndShow(result.assets[0].uri);
    }
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      uploadAndShow(result.assets[0].uri);
    }
  };

  const openInput = () => {
    setIsInputModal(true);
  };
  const changeName = (isChanged: boolean) => {
    setIsInputModal(false);
    setTimeout(() => {
      isChanged &&
        setHint({
          color: colors.success,
          text: "Nickname is successfully updated.",
          isOpen: true,
        });
    }, 1000);
  };

  const changeTheme = () => {
    setIsThemeModal(true);
  };

  function onChangeTheme(item: string) {
    dispatch(themeState.actions.setTheme(item as ThemeString));
    setIsThemeModal(false);
    AsyncStorage.setItem('theme', item);
  };

  const [hint, setHint] = useState({ color: "", text: "", isOpen: false });
  const closeHint = () =>
    setHint((prev) => Object.assign(prev, { isOpen: false }));

  const lang = useLanguage();
  const currLang = useSelector((store: Store) => store.langState.lang);
  const [isLangModal, setIsLangModal] = useState(false);
  const changeLang = () => {
    setIsLangModal(true);
  };
  const onChangeLang = (item: string) => {
    dispatch(langState.actions.setLang(item as LanguageString));
    setIsLangModal(false);
    AsyncStorage.setItem('lang', item);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Hint
          bcColor={hint.color}
          text={hint.text}
          isOpen={hint.isOpen}
          close={closeHint}
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <MaterialIcons name="add-a-photo" size={24} color={colors.icon} />
          <Text style={styles.text}>{lang.setPhotoGalery}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickPhoto}>
          <MaterialIcons name="add-a-photo" size={24} color={colors.icon} />
          <Text style={styles.text}>{lang.setPhotoCamera}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openInput}>
          <Feather name="edit-3" size={24} color={colors.icon} />
          <Text style={styles.text}>{lang.editNick}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeTheme}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color={colors.icon}
          />
          <Text style={styles.text}>{lang.changeTheme}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeLang}>
          <FontAwesome name="language" size={24} color={colors.icon} />
          <Text style={styles.text}>{lang.changeLang}</Text>
        </TouchableOpacity>
        <ModalInput isOpen={isInputModal} close={changeName} />
        <ModalTheme
          isOpen={isThemeModal}
          close={() => setIsThemeModal(false)}
          data={["system", "dark", "light"]}
          title={lang.chooseTheme}
          active={theme}
          onChange={onChangeTheme}
        />
        <ModalTheme
          isOpen={isLangModal}
          close={() => setIsLangModal(false)}
          data={["english", "russian"]}
          title={lang.chooseLang}
          active={currLang}
          onChange={onChangeLang}
        />
      </View>
    </GestureHandlerRootView>
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
