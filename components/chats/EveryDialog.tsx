import { Link } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Avatar } from "../menu/Avatar";
import useLanguage from "@/hooks/useLanguage";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";
import { useDispatch } from "react-redux";
import { chatMenuState } from "@/redux/ChatMenuSlice";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  nick: string;
  photo: string | undefined;
  email: string;
  online: string | undefined;
  dividedMessage:
    | ""
    | {
        stringWithoutGMT: string;
        user: string;
        text: string;
      }
    | null;
  isImage: string | boolean | null;
}

export const EveryDialog = ({
  nick,
  photo,
  email,
  online,
  dividedMessage,
  isImage,
}: Props) => {
  const lang = useLanguage();
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const dispatch = useDispatch();

  return (
    <Swipeable
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          dispatch(chatMenuState.actions.openConfirmModule());
        }
      }}
      renderRightActions={() => (
        <View style={styles.deleteView}>
          <AntDesign
            name="delete"
            size={24}
            color={colors.icon}
            style={{ marginRight: 10 }}
          />
        </View>
      )}
    >
      <Link
        href={{
          pathname: "/(chat)",
          params: {
            nick,
            email,
            photo,
            online,
          },
        }}
        asChild
      >
        <Pressable style={styles.chat}>
          <Avatar photo={photo} sizeImg={50} sizeView={50} />
          <View style={styles.textView}>
            {online ? (
              <Text style={[styles.status, { color: colors.online }]}>
                {lang.online}
              </Text>
            ) : (
              <Text style={[styles.status, { color: colors.offline }]}>
                {lang.offline}
              </Text>
            )}
            <Text style={styles.nick}>{nick}</Text>
            {dividedMessage ? (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.message}
              >
                {isImage ? "image" : dividedMessage.text}
              </Text>
            ) : null}
          </View>
        </Pressable>
      </Link>
    </Swipeable>
  );
};

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    chat: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.borderInput,
      width: "100%",
      padding: 10,
      flexDirection: "row",
      gap: 10,
      zIndex: 5,
      backgroundColor: colors.background,
    },
    deleteView: {
      backgroundColor: colors.error,
      justifyContent: "center",
      width: "100%",
      alignItems: "flex-end",
    },
    textView: {
      width: "80%",
    },
    nick: {
      fontSize: 18,
      color: colors.text,
    },
    message: {
      color: colors.offline,
    },
    status: {
      position: "absolute",
      right: 0,
    },
  });
