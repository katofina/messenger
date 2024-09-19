import database from "@react-native-firebase/database";

export default function deleteNickname(nickname: string) {
  var ref = database().ref("nicknames");

  ref
    .orderByValue()
    .equalTo(nickname)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const ref = database().ref("nicknames/" + key);
          ref.remove();
          return true;
        });
      }
    });
}
