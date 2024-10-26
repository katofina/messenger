import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  AppState,
  RefreshControl,
} from "react-native";
import database from "@react-native-firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import useLanguage from "@/hooks/useLanguage";
import { User } from "@/functions/firebase/searchByNick";
import divideMessage from "@/functions/firebase/divideMessage";
import { EveryDialog } from "@/components/chats/EveryDialog";
import { ConfirmModule } from "@/components/chats/ConfirmModule";
import { Overlay } from "@/components/overlay/Overlay";
import { chatMenuState } from "@/redux/ChatMenuSlice";
interface UserData {
  info: UserInfo;
  messages: string[];
}

interface UserInfo {
  email: string;
  nick: string;
  photoURL: string;
  online: boolean;
}

interface Messages {
  [x: string]: string | null;
}

export default function InitialAuth() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const [nicks, setNicks] = useState<string[]>([]);
  const [messages, setMessages] = useState<Messages[]>([]);
  const nick = useSelector((store: Store) => store.authState.nick);
  const [userInfo, setUserInfo] = useState<User[]>([]); //indexes like nicks
  const [isLoad, setIsLoad] = useState(true);

  const loadNicksAndMessages = useCallback(() => {
    const chatRef = database().ref(nick + "/chats");

    chatRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const values: UserData[] = Object.values(data);

        const messagesFromValues = values.map((item) => {
          const lastMessage = item.messages
            ? Object.values(item.messages).at(-1)
            : null;
          return { [item.info.nick]: lastMessage! };
        });

        const nicksFromValues = values.map((item) => item.info.nick);

        setNicks(nicksFromValues);
        setMessages(messagesFromValues);
      } else {
        setNicks([]);
      }
      setIsLoad(false);
    });
  }, [nick]);

  const updateOnlineStatus = useCallback(
    (isOnline: boolean) => {
      database()
        .ref("nicknames/" + nick)
        .update({ online: isOnline });
    },
    [nick],
  );

  useEffect(() => {
    loadNicksAndMessages();

    const subscription = AppState.addEventListener("change", (state) => {
      updateOnlineStatus(state === "active");
    });
    return () => {
      subscription.remove();
    };
  }, []);

  function createArrayInfo() {
    if (nicks.length) {
      database()
        .ref("nicknames")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          const arrayUserInfo: User[] = [];
          for (let nick of nicks) {
            arrayUserInfo.push(data[nick]);
          }
          setUserInfo(arrayUserInfo);
        });
    }
  }

  useEffect(() => {
    createArrayInfo();
  }, [nicks]);

  const lang = useLanguage();

  const isOpenConfirmModule = useSelector(
    (store: Store) => store.chatMenuState.isOpenConfirmModule,
  );
  const dispatch = useDispatch();
  const emailRef = useRef("");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      {isLoad && (
        <ActivityIndicator
          style={styles.indicator}
          size={"large"}
          color={colors.text}
        />
      )}
      {nicks.length && userInfo.length && !isLoad ? (
        <FlatList
          data={nicks}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => {
            const infoOfUser = userInfo[index];
            if (infoOfUser) {
              emailRef.current = infoOfUser.email;
              const lastMessage = messages[index][infoOfUser.nickname];
              const dividedMessage = lastMessage && divideMessage(lastMessage);
              const isImage =
                dividedMessage && dividedMessage!.text.includes("imageURL:");
              return (
                <EveryDialog
                  nick={infoOfUser.nickname}
                  email={infoOfUser.email}
                  photo={infoOfUser.photoURL}
                  online={infoOfUser.online}
                  dividedMessage={dividedMessage}
                  isImage={isImage}
                />
              );
            } else return null;
          }}
        />
      ) : (
        !isLoad && (
          <View style={styles.absenceDialogs}>
            <Text style={styles.text}>{lang.absenceDialogs}</Text>
          </View>
        )
      )}
      <ConfirmModule />
      {isOpenConfirmModule && (
        <Overlay
          close={() => dispatch(chatMenuState.actions.closeConfirmModule())}
        />
      )}
    </View>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.background,
    },
    indicator: {
      margin: 20,
    },
    text: {
      color: colors.text,
      padding: 20,
    },
    absenceDialogs: {
      width: "100%",
      alignItems: "center",
    },
  });
