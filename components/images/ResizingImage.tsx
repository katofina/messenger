import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "../menu/Avatar";
import { useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";
import { Overlay } from "../overlay/Overlay";
import { AntDesign } from "@expo/vector-icons";

interface Prop {
  url: string;
  sizeImg: number;
  sizeView: number;
}

export const ResizingImage = ({ url, sizeImg, sizeView }: Prop) => {
  const [isOpenModal, setIsOpenModule] = useState(false);

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const { colors } = useThemeColor();
  const styles = getStyles(width, height, colors);

  function closeModule() {
    setIsOpenModule(false);
  }

  return (
    <>
      {url && (
        <Modal visible={isOpenModal} transparent={true} animationType="slide">
          <Overlay close={closeModule} />
          <View style={styles.container}>
            <TouchableOpacity style={styles.close} onPress={closeModule}>
              <AntDesign name="close" size={40} color={colors.icon} />
            </TouchableOpacity>
            <Image source={{ uri: url }} style={styles.image} />
          </View>
        </Modal>
      )}
      <Pressable onPress={() => setIsOpenModule(true)}>
        <Avatar photo={url} sizeImg={sizeImg} sizeView={sizeView} />
      </Pressable>
    </>
  );
};

const getStyles = (width: number, height: number, colors: ObjectColor) => {
  const heightContainer = height * 0.6;
  const widthContainer = width * 0.8;
  const topContainer = (height - heightContainer) / 2;
  const leftContainer = (width - widthContainer) / 2;

  return StyleSheet.create({
    container: {
      height: heightContainer,
      width: widthContainer,
      backgroundColor: colors.headerBc,
      position: "relative",
      top: topContainer,
      left: leftContainer,
      zIndex: 1,
    },
    close: {
      position: "absolute",
      right: 0,
      padding: 10,
      zIndex: 2,
    },
    image: {
      resizeMode: "contain",
      width: widthContainer,
      height: "100%",
    },
  });
};
