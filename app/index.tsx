import { Redirect } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authState } from "@/redux/AuthSlice";

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {console.log(isAuth)}, [isAuth])

  auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      setIsAuth(true);
      user.displayName && dispatch(authState.actions.setNick(user.displayName!));
      dispatch(authState.actions.setEmail(user.email!));
      dispatch(authState.actions.setPhoto(user.photoURL!));
    } else setIsAuth(false);
  });

  return (
    <>{isAuth ? <Redirect href='/(auth)'/> : <Redirect href='/InitialNotAuth'/>}</>
  )
}
