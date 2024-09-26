import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";
import { Avatar } from "@/components/menu/Avatar";
import divideMessage from "@/functions/firebase/divideMessage";
import { Link, router } from "expo-router";

interface UserData {
  info: UserInfo;
  messages: string[];
}

interface UserInfo {
  email: string;
  nick: string;
  online: string;
  photo: string;
}

export default function InitialAuth() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const [nicks, setNicks] = useState<string[] | null>(null);
  const [data, setData] = useState(null);
  const nick = useSelector((store: Store) => store.authState.nick);

  useEffect(() => {
    database()
      .ref("nicknames/" + nick)
      .update({ online: true });
    database()
      .ref(nick + "/chats")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const keys = Object.keys(data);
          setNicks(keys);
          setData(data);
        }
      });
    return () => {
      database()
        .ref("nicknames/" + nick)
        .update({ online: false });
    };
  }, []);

  return (
    <View style={styles.container}>
      {nicks && data ? (
        <FlatList
          data={nicks}
          renderItem={({ item }) => {
            const userData: UserData = data[item];
            const info: UserInfo = userData.info;
            const { text } = divideMessage(userData.messages.at(-1)!);
            return (
              <Link
                href={{
                  pathname: "/(chat)",
                  params: {
                    nick: info.nick,
                    email: info.email,
                    photo: info.photo,
                    online: info.online,
                  },
                }}
                asChild
              >
                <Pressable style={styles.chat}>
                  <Avatar photo={info.photo} sizeImg={50} sizeView={50} />
                  <View style={styles.textView}>
                    {info.online === "true" ? (
                      <Text style={[styles.status, { color: colors.online }]}>
                        Online
                      </Text>
                    ) : (
                      <Text style={[styles.status, { color: colors.offline }]}>
                        Offline
                      </Text>
                    )}
                    <Text style={styles.nick}>{info.nick}</Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.message}
                    >
                      {text}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            );
          }}
        />
      ) : (
        <Text style={styles.text}>You don't have any chat yet.</Text>
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
