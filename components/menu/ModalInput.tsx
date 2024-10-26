import { NickReg } from "@/app/(sign)/constants";
import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import database from "@react-native-firebase/database";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Input } from "../sign/Input";
import auth from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "@/redux/AuthSlice";
import { Store } from "@/redux/Store";
import { AntDesign } from "@expo/vector-icons";
import useLanguage from "@/hooks/useLanguage";

interface Props {
  isOpen: boolean;
  close: (isChange: boolean) => void;
}

interface InputData {
  nickname: string;
}

export const ModalInput = ({ isOpen, close }: Props) => {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const height = useWindowDimensions().height;
  const translateY = useSharedValue(-height);
  useEffect(() => {
    if (isOpen) translateY.value = withSpring(height / 3);
    else translateY.value = withTiming(-height);
  }, [isOpen]);

  const [error, setError] = useState<string | null>(null);
  const [isExistNick, setIsExistNick] = useState(false);
  const user = useSelector((store: Store) => store.authState);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputData>();

  let nicknames: Array<string>;
  const dispatch = useDispatch();

  async function onSubmit(data: InputData) {
    await database()
      .ref("nicknames")
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        data && (nicknames = Object.keys(data));
      });
    const isAccessNick = nicknames.includes(data.nickname);
    if (!isAccessNick) {
      await auth()
        .currentUser?.updateProfile({ displayName: data.nickname })
        .then(() => {
          close(true);
          setIsExistNick(false);
          database()
            .ref("nicknames/" + data.nickname)
            .set({
              email: user.stringRef,
              nickname: data.nickname,
              photoURL: user.photoURL,
            });
          database()
            .ref("nicknames/" + user.nick)
            .remove();
          dispatch(authState.actions.setNick(data.nickname));
        })
        .catch((error) => setError(error));
    } else setIsExistNick(true);
  }

  const lang = useLanguage();

  return (
    <Animated.View
      style={[
        styles.modal,
        StyleSheet.absoluteFill,
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
        <Text style={styles.title}>{lang.newNick}</Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: NickReg,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={lang.nickname}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              isError={!!errors.nickname}
            />
          )}
          name="nickname"
        />
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.textButton}>{lang.change}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {errors.nickname && (
        <Text style={styles.errorText}>{lang.errorNick}</Text>
      )}
      {isExistNick && (
        <Text style={styles.errorText}>{lang.errorExistNick}</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
};

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    modal: {
      alignItems: "center",
      justifyContent: "center",
      height: 220,
      width: "100%",
      zIndex: 1
    },
    container: {
      width: 300,
      height: "100%",
      backgroundColor: colors.background,
      shadowColor: colors.shadowColor,
      elevation: 10,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 20,
    },
    titleView: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      paddingTop: 20,
    },
    title: {
      color: colors.text,
      fontSize: 20,
    },
    viewButton: {
      width: "100%",
      alignItems: "center",
      height: 50,
      justifyContent: "center",
      paddingTop: 10,
    },
    button: {
      backgroundColor: colors.button,
      shadowColor: colors.shadowColor,
      elevation: 10,
      width: 100,
      alignItems: "center",
      justifyContent: "center",
      height: 40,
    },
    textButton: {
      color: colors.text,
      fontSize: 15,
    },
    errorText: {
      color: colors.error,
      paddingLeft: 10,
      paddingRight: 10,
    },
  });
