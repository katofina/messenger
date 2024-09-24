import { Redirect } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authState } from "@/redux/AuthSlice";

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const dispatch = useDispatch();

  auth().onAuthStateChanged((user) => {
    if (user) {
      setIsAuth(true);
      user.displayName &&
        dispatch(authState.actions.setNick(user.displayName!));
      dispatch(authState.actions.setEmail(user.email!));
      dispatch(authState.actions.setPhoto(user.photoURL!));
    } else setIsAuth(false);
  });

  return (
    <>
      {isAuth ? (
        <Redirect href="/(auth)" />
      ) : (
        <Redirect href="/InitialNotAuth" />
      )}
    </>
  );
}
