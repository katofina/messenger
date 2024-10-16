import database from "@react-native-firebase/database";

export default function addToContacts(stringRef: string, emailOther: string, otherNick: string, userNick: string) {
  database()
    .ref(stringRef + "/chats/" + emailOther)
    .update({
      info: { nick: otherNick },
    });
  database()
    .ref(emailOther + "/chats/" + stringRef)
    .update({
      info: {nick: userNick},
    });
}
