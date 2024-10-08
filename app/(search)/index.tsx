import { ObjectColor } from "@/constants/theme/types";
import useThemeColor from "@/hooks/useThemeColor";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/menu/Avatar";
import useLanguage from "@/hooks/useLanguage";
import searchByNick, { User } from "@/functions/firebase/searchByNick";
import addToContacts from "@/functions/firebase/addToContacts";
import { useSelector } from "react-redux";
import { Store } from "@/redux/Store";

export default function Search() {
  const { colors } = useThemeColor();
  const styles = getStyles(colors);

  const params = useLocalSearchParams<{ input: string }>();
  const stringRef = useSelector((store: Store) => store.authState.stringRef);

  const [data, setData] = useState<User[]>([]);

  const getUsers = async () => {
    if (params.input) {
      const users = await searchByNick(params.input);
      setData(users);
    }
  };

  useEffect(() => {
    getUsers();
  }, [params.input]);

  const lang = useLanguage();

  if (data.length) {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/(chat)",
                params: {
                  nick: item.nickname,
                  email: item.email,
                  photo: item.photoURL,
                  online: String(item.online),
                },
              }}
              asChild
              replace={true}
            >
              <Pressable style={styles.userView} onPress={() => addToContacts(stringRef, item.email,item.nickname)}>
                <Avatar photo={item.photoURL} sizeImg={55} sizeView={55} />
                <View style={styles.textView}>
                  <Text style={styles.text}>{item.nickname}</Text>
                  {item.online ? (
                    <Text style={styles.online}>{lang.online}</Text>
                  ) : (
                    <Text style={styles.offline}>{lang.offline}</Text>
                  )}
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    );
  } else {
    return <View style={styles.container}></View>;
  }
}

const getStyles = (colors: ObjectColor) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      height: "100%",
    },
    userView: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.borderInput,
      padding: 10,
      gap: 20,
    },
    textView: {
      gap: 7,
    },
    text: {
      color: colors.text,
      fontSize: 17,
    },
    online: {
      color: colors.online,
      fontSize: 15,
    },
    offline: {
      fontSize: 15,
      color: colors.offline,
    },
  });
