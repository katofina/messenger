import database from "@react-native-firebase/database";

export default async function includesNick(nickname: string) {
  const nicknames = await database()
    .ref("nicknames")
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) return Object.keys(data);
      return null;
    });
  return nicknames ? nicknames.includes(nickname) : false;
}
