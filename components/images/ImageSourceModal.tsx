import { ObjectColor } from "@/constants/theme/types";
import useLanguage from "@/hooks/useLanguage";
import useThemeColor from "@/hooks/useThemeColor";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import uploadPhoto from "@/functions/firebase/uploadPhoto";

export type PromiseObject =
  | {
      isSuccess: boolean;
      url: string;
      error?: undefined;
    }
  | {
      isSuccess: boolean;
      error: string;
      url?: undefined;
    };

interface Prop {
  isOpen: boolean;
  onLoad: (isLoad: PromiseObject) => void;
  closeModal: () => void;
}

const WIDTH_MODAL = 230;

export const ImageSourceModal = ({ isOpen, onLoad, closeModal }: Prop) => {
  const width = useWindowDimensions().width;
  const leftGap = (width - WIDTH_MODAL) / 2;

  const { colors } = useThemeColor();
  const styles = getStyles(colors, leftGap);
  const lang = useLanguage();

  const height = useWindowDimensions().height / 3;
  const translateY = useSharedValue(-height);
  useEffect(() => {
    if (isOpen) translateY.value = withSpring(height);
    else translateY.value = withTiming(-height);
  }, [isOpen]);

  const [isLoading, setIsLoading] = useState(false);
  const isCancelRef = useRef<null | boolean>(null);
  const pickGalery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      getResultLoad(result.assets[0].uri);
    } else closeModal();
  };
  const pickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      getResultLoad(result.assets[0].uri);
    } else closeModal();
  };
  async function getResultLoad(uri: string) {
    const id = "id" + Math.random().toString(16).slice(2);
    const resultLoad = await uploadPhoto(uri, id);
    if (!isCancelRef.current) {
      setIsLoading(false);
      onLoad(resultLoad);
    } else {
      closeModal();
      isCancelRef.current = null;
      setIsLoading(false);
    }
  }

  function cancelLoad() {
    isCancelRef.current = true;
    setIsLoading(false);
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{lang.chooseSource}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={pickGalery}>
        <Text style={styles.text}>{lang.setPhotoGalery}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickCamera}>
        <Text style={styles.text}>{lang.setPhotoCamera}</Text>
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.containerLoad}>
          <ActivityIndicator size={"small"} color={colors.success} />
          <Pressable style={styles.cancelButton} onPress={cancelLoad}>
            <Text style={styles.text}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </Animated.View>
  );
};

const getStyles = (colors: ObjectColor, leftGap: number) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      width: WIDTH_MODAL,
      backgroundColor: colors.background,
      shadowColor: colors.shadowColor,
      shadowOpacity: 0.5,
      elevation: 10,
      top: 0,
      left: leftGap,
      zIndex: 20,
    },
    headerContainer: {
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.borderInput,
    },
    headerText: {
      color: colors.text,
      fontSize: 18,
    },
    button: {
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.borderInput,
    },
    text: {
      color: colors.text,
    },
    containerLoad: {
      flexDirection: "row",
      width: "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "space-around",
    },
    cancelButton: {
      width: 100,
      height: 40,
      borderWidth: 1,
      borderColor: colors.error,
      alignItems: "center",
      justifyContent: "center",
    },
  });
