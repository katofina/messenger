import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Input } from "@/components/sign/Input";
import { PasswordInput } from "@/components/sign/PasswordInput";
import { Link } from "expo-router";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import { useState } from "react";

interface SignInData {
  email: string;
  password: string;
}

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(data: SignInData) {
    try {
      auth().signInWithEmailAndPassword(data.email, data.password);
      router.replace('/(auth)');
    } catch (error) {
      setError(error as string);
    }
  }

  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              placeholder="Password"
              onBlur={onBlur}
              onChange={(value) => onChange(value)}
              value={value}
              isError={!!errors.password}
            />
          )}
          name="password"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.simpleText}>Sign In</Text>
        </TouchableOpacity>
        <Link href="/(sign)/SignUp" style={styles.link}>
          You don't have account?
        </Link>
      </View>
      {errors.email && (
        <Text style={styles.errorText}>
          *You need to enter email to sign in.
        </Text>
      )}
      {errors.password && (
        <Text style={styles.errorText}>
          *You need to enter password to sign in.
        </Text>
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
