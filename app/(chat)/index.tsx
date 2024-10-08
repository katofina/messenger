import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect, useRef, useState } from "react";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import useLanguage from "@/hooks/useLanguage";
import { AllMessages } from "@/components/chats/AllMessages";
import { Keyboard } from "react-native";
import {
  ImageSourceModal,
  PromiseObject,
} from "@/components/images/ImageSourceModal";
import { Overlay } from "@/components/overlay/Overlay";

export default function Chat() {
  const { email } = useLocalSearchParams();
  const stringRef = useSelector((store: Store) => store.authState.stringRef);

  const headerHeight = useHeaderHeight();
  const height = useWindowDimensions().height;
  const bodyHeight = height - headerHeight;

  const { colors } = useThemeColor();
  const styles = getStyles(colors, bodyHeight);

  const [text, setText] = useState<string>("");
  function onChangeText(text: string) {
    setText(text);
  }

  const lastSave = useRef("0");

  const [data, setData] = useState<string[][]>([]);
  function getMessages() {
    database()
      .ref(stringRef + "/chats/" + email + "/messages")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const values: string[][] = Object.entries(data);
          const messages = values.filter((item) => item[1] !== null).reverse();
          setData(messages);
        } else setData([]);
      });
    database()
      .ref(email + "/chats/" + stringRef + "/messages")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const keys: string[] = Object.keys(data);
          lastSave.current = keys.at(-1)!;
        }
      });
  }

  function sendMessage(mess: string) {
    const lastPosition = data.length ? data[0][0] : "0";
    if (mess.length) {
      const date = new Date().toString();
      let position;
      if (lastSave.current > lastPosition!) position = +lastSave.current + 1;
      else position = +lastPosition! + 1;
      database()
        .ref(stringRef + "/chats/" + email + "/messages")
        .update({ [position]: `${date}/${stringRef}:${mess}` });
      database()
        .ref(email + "/chats/" + stringRef + "/messages")
        .update({ [position]: `${date}/${stringRef}:${mess}` });
      setText("");
      Keyboard.dismiss();
    }
  }

  function addImage() {
    setIsOpenModal(true);
  }
  const [isOpenModal, setIsOpenModal] = useState(false);
  function closeModal() {
    setIsOpenModal(false);
  }
  function sendImage(loadObject: PromiseObject) {
    if (loadObject.isSuccess) {
      closeModal();
      const textImage = "imageURL:" + loadObject.url;
      sendMessage(textImage);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  const lang = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.messagesView}>
        {data.length ? (
          <AllMessages data={data} stringRef={stringRef} />
        ) : (
          <View style={styles.spareView}>
            <Text style={styles.text}>{lang.startDialog}</Text>
          </View>
        )}
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={addImage}>
          <MaterialCommunityIcons
            name="image-plus"
            size={24}
            color={colors.icon}
          />
        </TouchableOpacity>
        <TextInput
          onChangeText={onChangeText}
          placeholder={lang.message}
          placeholderTextColor={colors.placeholder}
          cursorColor={colors.cursor}
          style={styles.input}
          value={text}
          multiline={true}
          numberOfLines={1}
        />
        <TouchableOpacity onPress={() => sendMessage(text)}>
          <Ionicons name="send" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>
      <ImageSourceModal
        isOpen={isOpenModal}
        onLoad={sendImage}
        closeModal={closeModal}
      />
      {isOpenModal && <Overlay close={closeModal} />}
    </View>
  );
}

const getStyles = (colors: ObjectColor, bodyHeight: number) =>
  StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.background,
    },
    messagesView: {
      height: "93%",
      backgroundColor: colors.chatBc,
      padding: 10,
    },
    bottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: bodyHeight * 0.07,
      backgroundColor: colors.background,
      shadowColor: colors.shadowColor,
      elevation: 10,
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingRight: 10,
      paddingLeft: 10,
    },
    input: {
      height: 70,
      fontSize: 20,
      paddingLeft: 10,
      color: colors.text,
      width: "85%",
    },
    text: {
      color: colors.text,
    },
    spareView: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: "50%",
    },
  });
