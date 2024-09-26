import database from "@react-native-firebase/database";

export interface User {
  email: string;
  nickname: string;
  photoURL?: string;
  online?: string;
};

export default async function getInfoByNick(input: string) {
  const users: Array<User> = [];
  await database()
    .ref("nicknames")
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      for (let user in data) {
        if (user.toLowerCase().includes(input.toLowerCase())) users.push(data[user]);
      }
    });
  return users;
}
