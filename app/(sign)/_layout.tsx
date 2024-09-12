import { Stack } from "expo-router";

export default function SignLayout() {
  return (
    <Stack initialRouteName="SignUp">
      <Stack.Screen name="SignUp" options={{headerShown: false}}/>
      <Stack.Screen name="SignIn" options={{headerShown: false}}/>
    </Stack>
  );
}
