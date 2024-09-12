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
import { useState } from "react";
import { Link } from "expo-router";
import useThemeColor from "@/hooks/useThemeColor";
import { ObjectColor } from "@/constants/theme/types";

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

  function onSubmit(data: SignUpData) {
    if (data.confirm_password === data.password) console.log(data);
    else setIsConfirPass(false);
  }

  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Create Account</Text>
      <View style={styles.form}>
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

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: EmailReg,
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
            pattern: PassReg,
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

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              placeholder="Confirm password"
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
          <Text style={styles.simpleText}>Create</Text>
        </TouchableOpacity>
        <Link href="/(sign)/SignIn" style={styles.link}>
          Do you have account?
        </Link>
      </View>
      {errors.email && (
        <Text style={styles.errorText}>
          *You need enter truly email. Email is required.
        </Text>
      )}
      {errors.nickname && (
        <Text style={styles.errorText}>
          *Nickname should contain at least 6 characters.
        </Text>
      )}
      {errors.password && (
        <Text style={styles.errorText}>
          *Password must contains one digit, lowercase charachter and 7
          characters at all.
        </Text>
      )}
      {errors.confirm_password && (
        <Text style={styles.errorText}>*You need to confirm password.</Text>
      )}
      {isConfirmPass || (
        <Text style={styles.errorText}>*Passwords are not matched.</Text>
      )}
    </SafeAreaView>
  );
}

const getStyles = (colors: ObjectColor) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  text: {
    fontSize: 25,
    color: colors.text
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
    color: colors.text
  }
});
