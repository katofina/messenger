import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { EmailReg, NickReg, PassReg } from "./constants";
import { Input } from "@/components/sign/Input";
import { PasswordInput } from "@/components/sign/PasswordInput";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import database from "@react-native-firebase/database";
import getStringRef from "@/functions/firebase/getStringRef";
import { useDispatch } from "react-redux";
import { authState } from "@/redux/AuthSlice";
import includesNick from "@/functions/firebase/includesNick";
import useLanguage from "@/hooks/useLanguage";

interface SignUpData {
  confirm_password: string;
  email: string;
  nickname: string;
  password: string;
}

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  const [isConfirmPass, setIsConfirPass] = useState(true);
  const [isExistNick, setIsExistNick] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  async function onSubmit(data: SignUpData) {
    const equalPass = data.confirm_password === data.password;
    const isAccessNick = await includesNick(data.nickname);

    if (equalPass && !isAccessNick) {
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((result) => {
          dispatch(authState.actions.setNick(data.nickname));
          router.replace("/");

          database()
            .ref("nicknames/" + data.nickname)
            .set({ email: getStringRef(data.email), nickname: data.nickname });
            
          return result.user.updateProfile({
            displayName: data.nickname,
          });
        })
        .catch((error) => setError(String(error)));
    } else if (!equalPass) setIsConfirPass(false);
    else setIsExistNick(true);
  }

  const { colors } = useThemeColor();
  const styles = getStyles(colors);
  const lang = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{lang.createAccount}</Text>
      <View style={styles.form}>
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

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: EmailReg,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={lang.email}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              isError={!!errors.email}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: PassReg,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              placeholder={lang.password}
              onBlur={onBlur}
              onChange={(value) => onChange(value)}
              value={value}
              isError={!!errors.password}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              placeholder={lang.confirmPassword}
              onBlur={onBlur}
              onChange={(value) => onChange(value)}
              value={value}
              isError={!!errors.confirm_password || !isConfirmPass}
            />
          )}
          name="confirm_password"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.simpleText}>{lang.create}</Text>
        </TouchableOpacity>
        <Link href="/(sign)/SignIn" style={styles.link}>
          {lang.doYouHaveAccount}
        </Link>
      </View>
      {errors.email && <Text style={styles.errorText}>{lang.errorEmail}</Text>}
      {errors.nickname && (
        <Text style={styles.errorText}>{lang.errorNick}</Text>
      )}
      {errors.password && (
        <Text style={styles.errorText}>{lang.errorPass}</Text>
      )}
      {errors.confirm_password && (
        <Text style={styles.errorText}>{lang.confirmPassword}</Text>
      )}
      {isConfirmPass || <Text style={styles.errorText}>{lang.errorMatch}</Text>}
      {isExistNick && (
        <Text style={styles.errorText}>{lang.errorExistNick}</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    },
    text: {
      fontSize: 25,
      color: colors.text,
    },
    form: {
      shadowColor: colors.shadowColor,
      elevation: 10,
      backgroundColor: colors.background,
      width: "80%",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: 350,
    },
    button: {
      shadowColor: colors.shadowColor,
      elevation: 5,
      backgroundColor: colors.button,
      width: 150,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: colors.error,
      paddingLeft: 10,
      paddingRight: 10,
    },
    link: {
      fontSize: 13,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.linkBottom,
      color: colors.link,
    },
    simpleText: {
      color: colors.text,
    },
  });
