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
import deleteNickname from "@/functions/firebase/deleteNickname";
import { Store } from "@/redux/Store";

interface Props {
  isOpen: boolean;
  close: () => void;
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
  const nick = useSelector((store: Store) => store.authState.nick);

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
        data && (nicknames = Object.values(data));
      });
    const isAccessNick = nicknames.includes(data.nickname);
    if (!isAccessNick) {
      await auth()
        .currentUser?.updateProfile({ displayName: data.nickname })
        .then(() => {
          close();
          setIsExistNick(false);
          database().ref("nicknames").push(data.nickname);
          dispatch(authState.actions.setNick(data.nickname));
          deleteNickname(nick);
        })
        .catch((error) => setError(error));
    } else setIsExistNick(true);
  }

  return (
    <Animated.View
      style={[
        styles.modal,
        StyleSheet.absoluteFill,
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Enter a new nickname:</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: NickReg,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Nickname"
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
            <Text style={styles.textButton}>Change</Text>
          </TouchableOpacity>
        </View>
        {errors.nickname && (
          <Text style={styles.errorText}>
            *Nickname should contain at least 6 characters.
          </Text>
        )}
        {isExistNick && (
          <Text style={styles.errorText}>*This nick already exists.</Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
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
    },
    container: {
      width: 300,
      height: "100%",
      backgroundColor: colors.background,
      shadowColor: colors.shadowColor,
      elevation: 10,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    text: {
      color: colors.text,
      fontSize: 25,
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
