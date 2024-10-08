import { StyleSheet, Pressable, useWindowDimensions } from "react-native";

interface Prop {
  close: () => void;
}

export const Overlay = ({ close }: Prop) => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const styles = getStyles(height, width);

  return <Pressable style={styles.overlay} onPress={close} />;
};

const getStyles = (height: number, width: number) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: "transparent",
      height: height,
      width: width,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
    },
  });
