import { ObjectColor } from "@/constants/theme/types";
import useLanguage from "@/hooks/useLanguage";
import useThemeColor from "@/hooks/useThemeColor";
import { chatMenuState } from "@/redux/ChatMenuSlice";
import { Store } from "@/redux/Store";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import database from "@react-native-firebase/database";
import { useLocalSearchParams } from "expo-router";

export const ConfirmModule = () => {
  const [isDeleteBoth, setIsDeleteBoth] = useState(false);
  function checkDeleteForBoth() {
    setIsDeleteBoth((prev) => !prev);
  };


  const { email } = useLocalSearchParams();
  const user = useSelector((store: Store) => store.authState);
  const deletedEmail = useSelector((store: Store) => store.chatMenuState.email);


  function deleteAllMessages() {
    const neededEmail = email || deletedEmail;
    const userRef = user.stringRef + "/chats/" + neededEmail;
    const contactRef = neededEmail + "/chats/" + user.stringRef;
    
    if (isDeleteBoth) {
      if (email) {
        database()
          .ref(userRef + "/messages")
          .remove();
        database()
          .ref(contactRef + "/messages")
          .remove();
      }
      if (deletedEmail) {
        database().ref(userRef).remove();
        database().ref(contactRef).remove();
      }
    } else {
      email && database().ref(userRef + "/messages").remove();
      deletedEmail && database().ref(userRef).remove();
    }
    closeModule();
  }

  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const lang = useLanguage();

  const isOpen = useSelector(
    (store: Store) => store.chatMenuState.isOpenConfirmModule,
  );
  const height = useWindowDimensions().height;
  const translateY = useSharedValue(height);
  useEffect(() => {
    if (isOpen) translateY.value = withSpring(height / 3);
    else translateY.value = withTiming(height);
  }, [isOpen]);

  const dispatch = useDispatch();
  function closeModule() {
    dispatch(chatMenuState.actions.closeConfirmModule());
    dispatch(chatMenuState.actions.closeChatMenu());
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Text style={styles.mainText}>{lang.confirmOfDeleteAll}</Text>
      <Pressable style={styles.confirmView} onPress={checkDeleteForBoth}>
        {isDeleteBoth ? (
          <Feather name="check-square" size={24} color={colors.icon} />
        ) : (
          <Feather name="square" size={24} color={colors.icon} />
        )}
        <Text style={styles.text}>{lang.deleteForAll}</Text>
      </Pressable>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={deleteAllMessages}>
          <Text style={styles.text}>{lang.yes}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={closeModule}>
          <Text style={styles.text}>{lang.no}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      shadowColor: colors.shadowColor,
      elevation: 10,
      height: 200,
      width: "70%",
      left: "15%",
      position: "absolute",
      alignItems: "center",
      gap: 10,
      zIndex: 1,
    },
    mainText: {
      color: colors.text,
      fontSize: 20,
      padding: 15,
    },
    confirmView: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colors.text,
      fontSize: 20,
    },
    buttonView: {
      flexDirection: "row",
      gap: 20,
    },
    button: {
      backgroundColor: colors.button,
      shadowColor: colors.shadowColor,
      elevation: 10,
      width: 55,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
  });
