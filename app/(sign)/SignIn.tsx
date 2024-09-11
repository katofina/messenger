import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { EmailReg, PassReg } from "./constants";
import { Input } from "@/components/sign/Input";
import { PasswordInput } from "@/components/sign/PasswordInput";
import { Link } from "expo-router";

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

  function onSubmit(data: SignInData) {
    console.log(data); //checking email and password from store
  }

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
          <Text>Sign In</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  text: {
    fontSize: 25,
  },
  form: {
    shadowColor: "grey",
    elevation: 10,
    backgroundColor: "white",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 350,
  },
  button: {
    shadowColor: "grey",
    elevation: 5,
    backgroundColor: "white",
    width: 150,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    paddingLeft: 10,
    paddingRight: 10,
  },
  link: {
    fontSize: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#023047",
    color: "grey",
  },
});
