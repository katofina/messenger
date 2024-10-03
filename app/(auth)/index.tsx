import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import { Avatar } from "@/components/menu/Avatar";
import { Link } from "expo-router";
import useLanguage from "@/hooks/useLanguage";
import { User } from "@/functions/firebase/searchByNick";
import divideMessage from "@/functions/firebase/divideMessage";

interface UserData {
  info: UserInfo;
  messages: string[];
}

interface UserInfo {
  email: string;
  nick: string;
  photoURL: string;
  online: string;
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
  const [data, setData] = useState();

  useEffect(() => {
    database()
      .ref(nick + "/chats")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const values: UserData[] = Object.values(data);
          const messagesFromValues = values
            .map((item) => {
              const nickname = item.info.nick;
              if (item.messages) {
                const lastMessage = Object.values(item.messages).at(-1);
                return { [nickname]: lastMessage! };
              } else return {[nickname]: null};
            });
          const nicksFromValues = values.map((item) => item.info.nick);
          setNicks(nicksFromValues);
          setMessages(messagesFromValues);
        }
      });
  }, []);

  async function createArrayInfo() {
    if (nicks.length) {
      const arrayUserInfo: User[] = [];
      for (let nick of nicks) {
        await database()
          .ref("nicknames")
          .once("value")
          .then((snapshot) => {
            const data = snapshot.val();
            arrayUserInfo.push(data[nick]);
          });
      };
      setUserInfo(arrayUserInfo);
    };
  };

  useEffect(() => {
    createArrayInfo();
  }, [nicks]);

  const lang = useLanguage();

  return (
    <View style={styles.container}>
      {(nicks.length && userInfo.length) ?  (
        <FlatList
          data={nicks}
          renderItem={({ item, index }) => {
            const infoOfUser = userInfo[index];
            const lastMessage = messages[index][infoOfUser.nickname];
            const dividedMessage = lastMessage && divideMessage(lastMessage);
            return (
              <Link
                href={{
                  pathname: "/(chat)",
                  params: {
                    nick: infoOfUser.nickname,
                    email: infoOfUser.email,
                    photo: infoOfUser.photoURL,
                    online: infoOfUser.online,
                  },
                }}
                asChild
              >
                <Pressable style={styles.chat}>
                  <Avatar
                    photo={infoOfUser.photoURL}
                    sizeImg={50}
                    sizeView={50}
                  />
                  <View style={styles.textView}>
                    {infoOfUser.online === "true" ? (
                      <Text style={[styles.status, { color: colors.online }]}>
                        {lang.online}
                      </Text>
                    ) : (
                      <Text style={[styles.status, { color: colors.offline }]}>
                        {lang.offline}
                      </Text>
                    )}
                    <Text style={styles.nick}>
                      {infoOfUser.nickname}
                    </Text>
                    {dividedMessage ? (
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.message}
                      >
                        {dividedMessage.text}
                      </Text>
                    ) : null}
                  </View>
                </Pressable>
              </Link>
            );
          }}
        />
      ) : null}
    </View>
  );
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
      padding: 20,
    },
    chat: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.borderInput,
      width: "100%",
      padding: 10,
      flexDirection: "row",
      gap: 10,
    },
    textView: {
      width: "80%",
    },
    nick: {
      fontSize: 18,
      color: colors.text,
    },
    message: {
      color: colors.offline,
    },
    status: {
      position: "absolute",
      right: 0,
    },
  });
